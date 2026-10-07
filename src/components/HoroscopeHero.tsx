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
    <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-indigo-500/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
      {/* Cosmic background glow effect */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: sign info + summary + quick stats */}
        <div className="flex-1 flex flex-col gap-5 text-center md:text-left w-full">
          {/* Header row */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="text-5xl sm:text-6xl text-indigo-600 dark:text-indigo-400 font-serif leading-none" aria-hidden="true">
              {sign.symbol}
            </span>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-zinc-900 dark:text-white uppercase">
                  {sign.name}
                </h1>
                <span className="text-xl">{sign.emoji}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">{sign.dateRange}</p>
            </div>
          </div>

          {/* Date */}
          <div className="inline-flex items-center justify-center md:justify-start">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              {dateLabel}
            </span>
          </div>

          {/* Short summary quote */}
          {data.shorts && (
            <blockquote className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed italic border-l-2 border-indigo-500/60 pl-4 py-1 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-r-xl">
              &ldquo;{data.shorts}&rdquo;
            </blockquote>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {data.luckly_color && (
              <div className="flex flex-col p-3 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Lucky Color</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white mt-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow-sm" />
                  {data.luckly_color}
                </span>
              </div>
            )}

            {data.luckly_time && (
              <div className="flex flex-col p-3 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Lucky Time</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
                  {data.luckly_time}
                </span>
              </div>
            )}

            {data.direction && (
              <div className="flex flex-col p-3 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Direction</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
                  {data.direction}
                </span>
              </div>
            )}

            {data.friends && (
              <div className="flex flex-col p-3 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Compatible</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
                  {data.friends}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Luck Score Circle & Breakdown */}
        <div className="flex flex-col items-center gap-6 bg-zinc-100/60 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200/60 dark:border-white/10 min-w-[260px] w-full md:w-auto">
          <LuckScore points={data.points?.all || '0'} label="Luck Score" />

          {/* Category mini scores */}
          {data.points && (
            <div className="grid grid-cols-3 gap-3 w-full border-t border-zinc-200 dark:border-white/10 pt-4">
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
    <div className="flex flex-col items-center text-center gap-0.5">
      <span className="text-lg">{emoji}</span>
      <span className="text-xs font-bold text-zinc-900 dark:text-white">{pct}%</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-[9px] ${i < stars ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}>
            ★
          </span>
        ))}
      </div>
      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{label}</span>
    </div>
  );
}
