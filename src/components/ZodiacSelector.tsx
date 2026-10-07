'use client';

import { ZODIAC_SIGNS } from '@/lib/zodiac';
import type { ZodiacSign } from '@/types/horoscope';

interface ZodiacSelectorProps {
  selectedId: number;
  onSelect: (sign: ZodiacSign) => void;
}

export default function ZodiacSelector({ selectedId, onSelect }: ZodiacSelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex gap-2 min-w-max px-2 sm:px-0 sm:grid sm:grid-cols-6 md:grid-cols-12 sm:min-w-0">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = sign.id === selectedId;
          return (
            <button
              key={sign.id}
              id={`zodiac-${sign.name.toLowerCase()}`}
              onClick={() => onSelect(sign)}
              className={`
                flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-2xl transition-all duration-200
                min-w-[76px] sm:min-w-0 cursor-pointer
                ${isSelected
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400 scale-[1.03]'
                  : 'bg-white/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/10 border border-zinc-200/60 dark:border-white/5'
                }
              `}
            >
              <span className="text-2xl leading-none font-serif">{sign.symbol}</span>
              <span className="text-[11px] font-semibold tracking-wide">{sign.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
