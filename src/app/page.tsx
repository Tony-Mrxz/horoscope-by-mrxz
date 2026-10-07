'use client';

import { useState, useEffect, useCallback } from 'react';
import ZodiacSelector from '@/components/ZodiacSelector';
import HoroscopeHero from '@/components/HoroscopeHero';
import HoroscopeCard from '@/components/HoroscopeCard';
import HoroscopeTabs from '@/components/HoroscopeTabs';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorState from '@/components/ErrorState';
import ThemeToggle from '@/components/ThemeToggle';
import { ZODIAC_SIGNS } from '@/lib/zodiac';
import {
  getHoroscope,
  getToday,
  getTomorrow,
  formatDisplayDate,
  getContentText,
} from '@/lib/horoscope';
import type { HoroscopeData, ZodiacSign } from '@/types/horoscope';

export default function Home() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);
  const [activeTab, setActiveTab] = useState<string>('today');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [dateLabel, setDateLabel] = useState<string>('');

  // Sync dark class on html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Determine date string based on tab
  const getDateForTab = useCallback((tab: string) => {
    if (tab === 'tomorrow') {
      return getTomorrow();
    }
    return getToday();
  }, []);

  const fetchHoroscopeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHoroscope(null); // prevent flashing old content

    const targetDate = getDateForTab(activeTab);
    setDateLabel(formatDisplayDate(targetDate));

    try {
      const res = await getHoroscope({
        zodiacSignId: selectedSign.id,
        date: targetDate,
        dateType: 'day',
      });
      setHoroscope(res.data);
    } catch (err) {
      console.error('Failed to fetch horoscope:', err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load today's horoscope."
      );
    } finally {
      setLoading(false);
    }
  }, [selectedSign, activeTab, getDateForTab]);

  useEffect(() => {
    fetchHoroscopeData();
  }, [fetchHoroscopeData]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
      {/* Background ambient cosmic glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#090a0f]/80 border-b border-zinc-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-serif text-lg shadow-md shadow-indigo-500/20">
              ✨
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              Constella
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
              Daily Celestial Insights
            </span>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ZODIAC SELECTOR */}
        <section className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-center justify-between w-full max-w-md px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Zodiac Sign
            </h2>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              {selectedSign.name} ({selectedSign.symbol})
            </span>
          </div>
          <ZodiacSelector
            selectedId={selectedSign.id}
            onSelect={(sign) => setSelectedSign(sign)}
          />
        </section>

        {/* DATE TABS */}
        <section className="flex justify-center max-w-md mx-auto w-full">
          <HoroscopeTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />
        </section>

        {/* CONTENT STATES */}
        <div className="w-full">
          {loading && <LoadingSkeleton />}

          {!loading && error && (
            <ErrorState message={error} onRetry={fetchHoroscopeData} />
          )}

          {!loading && !error && horoscope && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* HERO SECTION */}
              <HoroscopeHero
                data={horoscope}
                sign={selectedSign}
                dateLabel={dateLabel}
              />

              {/* THREE MAIN CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HoroscopeCard
                  title="Love Horoscope"
                  emoji="❤️"
                  content={
                    getContentText(horoscope.contents?.love) ||
                    'Love insights unavailable for this date.'
                  }
                  points={horoscope.points?.love}
                  accentColor="rose"
                />

                <HoroscopeCard
                  title="Career Horoscope"
                  emoji="💼"
                  content={
                    getContentText(horoscope.contents?.career) ||
                    'Career insights unavailable for this date.'
                  }
                  points={horoscope.points?.career}
                  accentColor="sky"
                />

                <HoroscopeCard
                  title="Wealth Horoscope"
                  emoji="💰"
                  content={
                    getContentText(horoscope.contents?.fortune) ||
                    'Wealth insights unavailable for this date.'
                  }
                  points={horoscope.points?.fortune}
                  accentColor="amber"
                />
              </div>

              {/* OVERALL HOROSCOPE */}
              {horoscope.contents?.all && (
                <HoroscopeCard
                  title="Overall Daily Insight"
                  emoji="✨"
                  content={getContentText(horoscope.contents.all)}
                  points={horoscope.points?.all}
                  accentColor="indigo"
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-200/80 dark:border-white/10 py-8 px-4 text-center mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Constella</span>
            <span>—</span>
            <span>Real-time Horoscope & Celestial Energy</span>
          </div>
          <p>© 2026 Constella. Powered by real celestial data.</p>
        </div>
      </footer>
    </div>
  );
}
