export interface HoroscopePoints {
  all: string;
  love: string;
  career: string;
  fortune: string;
}

export interface HoroscopeContents {
  all: string;
  love: string | { desc: string };
  career: string | { desc: string };
  fortune: string | { desc: string };
}

export interface HoroscopeData {
  luckly_time?: string;
  dayTimestamp?: number;
  searchIndex?: string;
  zodiacSign?: string;
  friends?: string;
  luckly_color?: string;
  points: HoroscopePoints;
  dateType?: string;
  contents: HoroscopeContents;
  shorts?: string;
  zodiacSignId?: number;
  direction?: string;
  numbers?: string;
}

export interface HoroscopeResponse {
  flag: boolean;
  msg: string;
  data: HoroscopeData;
}

export interface GetHoroscopeParams {
  zodiacSignId: number;
  date: string;
  dateType: string;
  lang?: string;
}

export type DateTab = 'today' | 'tomorrow' | 'week' | 'month';

export interface ZodiacSign {
  id: number;
  name: string;
  symbol: string;
  emoji: string;
  dateRange: string;
}
