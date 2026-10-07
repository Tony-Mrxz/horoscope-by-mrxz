import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Constella — Daily Horoscope',
  description: 'Discover your daily horoscope, luck score, love, career and wealth insights.',
  openGraph: {
    title: 'Constella — Daily Horoscope',
    description: 'Discover your daily horoscope, luck score, love, career and wealth insights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
