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
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-indigo-500/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-6">
      {/* Cosmic background glow effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TITLE & DATE ABOVE LUCK SCORE */}
      <div className="relative z-10 flex flex-col gap-1 border-b border-zinc-200/80 dark:border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-indigo-600 dark:text-indigo-400 font-serif" aria-hidden="true">
              {sign.symbol}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-zinc-900 dark:text-white uppercase">
              {sign.name}
            </h1>
            <span className="text-xl">{sign.emoji}</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            {sign.dateRange}
          </span>
        </div>
        <p className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-300 uppercase mt-1">
          {dateLabel}
        </p>
      </div>

      {/* 2. LUCK SCORE METER & RATING */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        <LuckScore points={data.points?.all || '0'} label="Luck Today" />

        {/* Short summary quote */}
        {data.shorts && (
          <div className="flex-1 max-w-sm">
            <blockquote className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed italic border-l-2 border-indigo-500/60 pl-3.5 py-1 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-r-xl">
              &ldquo;{data.shorts}&rdquo;
            </blockquote>
          </div>
        )}
      </div>

      {/* 3. MINI CATEGORY SCORES */}
      {data.points && (
        <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-b border-zinc-200/80 dark:border-white/10 py-3.5">
          <MiniScore label="Love" points={data.points.love} emoji="❤️" />
          <MiniScore label="Career" points={data.points.career} emoji="💼" />
          <MiniScore label="Wealth" points={data.points.fortune} emoji="💰" />
        </div>
      )}

      {/* 4. QUICK STATS GRID */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {data.luckly_color && (
          <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Lucky Color</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white mt-0.5 flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block shadow-sm flex-shrink-0" />
              {data.luckly_color}
            </span>
          </div>
        )}

        {data.luckly_time && (
          <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Lucky Time</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
              {data.luckly_time}
            </span>
          </div>
        )}

        {data.direction && (
          <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Direction</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
              {data.direction}
            </span>
          </div>
        )}

        {data.friends && (
          <div className="flex flex-col p-2.5 rounded-xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Compatible</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
              {data.friends}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniScore({ label, points, emoji }: { label: string; points: string; emoji: string }) {
  const pct = Math.round(parseFloat(points || '0') * 20);
  const stars = Math.round(parseFloat(points || '0'));
  return (
    <div className="flex flex-col items-center text-center gap-0.5">
      <span className="text-base">{emoji}</span>
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
