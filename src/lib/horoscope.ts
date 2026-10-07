import type { GetHoroscopeParams, HoroscopeResponse } from '@/types/horoscope';

export async function getHoroscope({
  zodiacSignId,
  date,
  dateType = 'day',
  lang = 'EN',
}: GetHoroscopeParams): Promise<HoroscopeResponse> {
  const response = await fetch('/api/horoscope', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateType,
      zodiacSignId: String(zodiacSignId),
      day: date,
      lang,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: HoroscopeResponse = await response.json();

  if (!data.flag || !data.data) {
    throw new Error(data.msg || 'Unable to load today\'s horoscope.');
  }

  return data;
}

export function getToday(): string {
  const now = new Date();
  return formatDate(now);
}

export function getTomorrow(): string {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function getContentText(content: string | { desc?: string } | undefined | null): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content.desc) return content.desc;
  return '';
}

export function pointsToPercentage(points: string | number): number {
  const num = typeof points === 'string' ? parseFloat(points) : points;
  return Math.round(num * 20);
}

export function pointsToStars(points: string | number): number {
  const num = typeof points === 'string' ? parseFloat(points) : points;
  return Math.round(num);
}
