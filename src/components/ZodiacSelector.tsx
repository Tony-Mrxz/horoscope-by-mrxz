'use client';

import { useState, useRef, useEffect } from 'react';
import { ZODIAC_SIGNS } from '@/lib/zodiac';
import type { ZodiacSign } from '@/types/horoscope';

interface ZodiacSelectorProps {
  selectedId: number;
  onSelect: (sign: ZodiacSign) => void;
}

export default function ZodiacSelector({ selectedId, onSelect }: ZodiacSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSign = ZODIAC_SIGNS.find((s) => s.id === selectedId) || ZODIAC_SIGNS[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (sign: ZodiacSign) => {
    onSelect(sign);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        id="zodiac-dropdown-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 shadow-lg shadow-indigo-500/5 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-200 cursor-pointer text-left group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-serif">
            {currentSign.symbol}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {currentSign.name}
              </span>
              <span className="text-sm">{currentSign.emoji}</span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentSign.dateRange}
            </span>
          </div>
        </div>

        {/* Chevron Icon */}
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          role="listbox"
          id="zodiac-dropdown-menu"
          className="absolute left-0 right-0 top-full mt-2 z-50 max-h-80 overflow-y-auto rounded-2xl bg-white/95 dark:bg-[#12131a]/95 border border-zinc-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150"
        >
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = sign.id === selectedId;
            return (
              <button
                key={sign.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(sign)}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left
                  ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20'
                      : 'hover:bg-indigo-50 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center font-serif">{sign.symbol}</span>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span>{sign.name}</span>
                      <span className="text-xs">{sign.emoji}</span>
                    </div>
                    <div
                      className={`text-[11px] ${
                        isSelected ? 'text-indigo-100' : 'text-zinc-400 dark:text-zinc-400'
                      }`}
                    >
                      {sign.dateRange}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-sm font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
