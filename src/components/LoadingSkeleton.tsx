'use client';

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Hero skeleton */}
      <div className="rounded-3xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/8 p-6 sm:p-10 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-300 dark:bg-white/10" />
            <div className="space-y-2">
              <div className="h-7 w-32 bg-zinc-300 dark:bg-white/10 rounded-lg" />
              <div className="h-4 w-24 bg-zinc-200 dark:bg-white/6 rounded-md" />
            </div>
          </div>
          <div className="h-6 w-28 bg-zinc-200 dark:bg-white/6 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-200 dark:bg-white/8 rounded-md" />
            <div className="h-4 w-4/5 bg-zinc-200 dark:bg-white/8 rounded-md" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-zinc-200 dark:bg-white/5 rounded-2xl" />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 min-w-[260px]">
          <div className="w-36 h-36 rounded-full bg-zinc-300 dark:bg-white/10" />
          <div className="grid grid-cols-3 gap-3 w-full pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-zinc-200 dark:bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/8 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-28 bg-zinc-300 dark:bg-white/10 rounded-lg" />
              <div className="h-5 w-12 bg-zinc-300 dark:bg-white/10 rounded-full" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-zinc-200 dark:bg-white/6 rounded" />
              <div className="h-3 w-4/5 bg-zinc-200 dark:bg-white/6 rounded" />
              <div className="h-3 w-3/5 bg-zinc-200 dark:bg-white/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
