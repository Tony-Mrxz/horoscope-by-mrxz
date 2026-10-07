'use client';

import type { HoroscopeData, ZodiacSign } from '@/types/horoscope';
import LuckScore from './LuckScore';

interface HoroscopeHeroProps {
  data: HoroscopeData;
  sign: ZodiacSign;
  dateLabel: string;
}

export default function HoroscopeHero({ data, sign, dateLabel }: HoroscopeHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8">
      {/* Ambient Cosmic Background Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Layout Grid: Left & Right Half */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Symbol Circle, Title, Date, Quote, 4 Stat Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            {/* Symbol Circle + Name & Date */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-500/20 flex items-center justify-center text-3xl sm:text-4xl font-serif shadow-sm flex-shrink-0">
                {sign.symbol}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-zinc-900 dark:text-white uppercase">
                  {sign.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide mt-0.5">
                  {dateLabel}
                </p>
              </div>
            </div>

            {/* Short Summary Quote */}
            {data.shorts && (
              <blockquote className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed italic border-l-2 border-indigo-500/60 pl-3.5 py-1.5 bg-indigo-50/70 dark:bg-indigo-500/10 rounded-r-xl mt-2">
                &ldquo;{data.shorts}&rdquo;
              </blockquote>
            )}
          </div>

          {/* Bottom Left: 4 Stat Cards in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-auto pt-2">
            {data.luckly_color && (
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">Lucky Color</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block flex-shrink-0" />
                  {data.luckly_color}
                </span>
              </div>
            )}

            {data.luckly_time && (
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">Lucky Time</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 truncate">
                  {data.luckly_time}
                </span>
              </div>
            )}

            {data.direction && (
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">Direction</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 truncate">
                  {data.direction}
                </span>
              </div>
            )}

            {data.friends && (
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">Compatible</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 truncate">
                  {data.friends}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Large Luck Score Meter Top/Center + 3 Mini Score Cards Bottom */}
        <div className="lg:col-span-6 flex flex-col justify-between items-center gap-6 lg:border-l border-zinc-200/80 dark:border-white/10 lg:pl-8 pt-4 lg:pt-0 border-t lg:border-t-0">
          
          {/* Top/Middle: Big Circular Luck Meter */}
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <LuckScore points={data.points?.all || '0'} label="Luck Today" />
          </div>

          {/* Bottom Right: 3 Mini Score Cards in a row */}
          {data.points && (
            <div className="grid grid-cols-3 gap-3 w-full mt-auto">
              <MiniScore label="Love" points={data.points.love} emoji="❤️" />
              <MiniScore label="Career" points={data.points.career} emoji="💼" />
              <MiniScore label="Wealth" points={data.points.fortune} emoji="💰" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function MiniScore({ label, points, emoji }: { label: string; points: string; emoji: string }) {
  const pct = Math.round(parseFloat(points || '0') * 20);
  const stars = Math.round(parseFloat(points || '0'));
  return (
    <div className="flex flex-col items-center text-center gap-1 p-3 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5 shadow-sm">
      <span className="text-lg">{emoji}</span>
      <span className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tabular-nums tracking-tight">
        {pct}%
      </span>
      <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-[10px] sm:text-xs ${i < stars ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">{label}</span>
    </div>
  );
}
