'use client';

interface HoroscopeCardProps {
  title: string;
  emoji: string;
  content: string;
  points?: string;
  accentColor?: 'indigo' | 'rose' | 'amber' | 'sky';
}

export default function HoroscopeCard({
  title,
  emoji,
  content,
  points,
  accentColor = 'indigo',
}: HoroscopeCardProps) {
  const pct = points ? Math.round(parseFloat(points) * 20) : null;
  const stars = points ? Math.round(parseFloat(points)) : null;

  const colorStyles: Record<string, { card: string; badge: string }> = {
    indigo: {
      card: 'border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-950/20',
      badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
    },
    rose: {
      card: 'border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    },
    amber: {
      card: 'border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    },
    sky: {
      card: 'border-sky-500/20 bg-sky-500/5 dark:bg-sky-950/20',
      badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    },
  };

  const style = colorStyles[accentColor] || colorStyles.indigo;

  return (
    <div className={`
      relative rounded-2xl p-6 border backdrop-blur-sm
      bg-white/80 dark:bg-zinc-900/70
      shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5
      ${style.card}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/60 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{emoji}</span>
          <h3 className="font-bold text-zinc-900 dark:text-white text-base tracking-wide">{title}</h3>
        </div>
        {pct !== null && (
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${style.badge}`}>
              {pct}%
            </span>
            <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-[11px] ${i < (stars ?? 0) ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm font-normal">
        {content}
      </p>
    </div>
  );
}
