'use client';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({
  message = "Unable to load today's horoscope.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-6 text-center rounded-3xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-xl">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <span className="text-3xl text-rose-500">✦</span>
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Unable to load today&apos;s horoscope</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{message}</p>
      </div>
      <button
        id="retry-button"
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
