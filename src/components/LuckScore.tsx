'use client';

interface LuckScoreProps {
  points: string;
  label?: string;
}

export default function LuckScore({ points, label = 'Overall' }: LuckScoreProps) {
  const numPoints = parseFloat(points || '0');
  const percentage = Math.round(numPoints * 20);
  const filledStars = Math.round(numPoints);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Circular luck meter */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className="stroke-zinc-200 dark:stroke-white/10"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#luckGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.max(0, Math.min(100, percentage)) / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <defs>
            <linearGradient id="luckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tabular-nums tracking-tight">
            {percentage}%
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mt-0.5">
            {label}
          </span>
        </div>
      </div>

      {/* Star rating */}
      <div className="flex gap-1" aria-label={`${filledStars} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg transition-colors ${
              i < filledStars ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
