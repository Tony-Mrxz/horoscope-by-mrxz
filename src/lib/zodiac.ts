import type { ZodiacSign } from '@/types/horoscope';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 1,  name: 'Aries',       symbol: '♈', emoji: '🐏', dateRange: 'Mar 21 – Apr 19' },
  { id: 2,  name: 'Taurus',      symbol: '♉', emoji: '🐂', dateRange: 'Apr 20 – May 20' },
  { id: 3,  name: 'Gemini',      symbol: '♊', emoji: '👯', dateRange: 'May 21 – Jun 20' },
  { id: 4,  name: 'Cancer',      symbol: '♋', emoji: '🦀', dateRange: 'Jun 21 – Jul 22' },
  { id: 5,  name: 'Leo',         symbol: '♌', emoji: '🦁', dateRange: 'Jul 23 – Aug 22' },
  { id: 6,  name: 'Virgo',       symbol: '♍', emoji: '🌾', dateRange: 'Aug 23 – Sep 22' },
  { id: 7,  name: 'Libra',       symbol: '♎', emoji: '⚖️', dateRange: 'Sep 23 – Oct 22' },
  { id: 8,  name: 'Scorpio',     symbol: '♏', emoji: '🦂', dateRange: 'Oct 23 – Nov 21' },
  { id: 9,  name: 'Sagittarius', symbol: '♐', emoji: '🏹', dateRange: 'Nov 22 – Dec 21' },
  { id: 10, name: 'Capricorn',   symbol: '♑', emoji: '🐐', dateRange: 'Dec 22 – Jan 19' },
  { id: 11, name: 'Aquarius',    symbol: '♒', emoji: '🏺', dateRange: 'Jan 20 – Feb 18' },
  { id: 12, name: 'Pisces',      symbol: '♓', emoji: '🐟', dateRange: 'Feb 19 – Mar 20' },
];
