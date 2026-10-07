'use client';

interface HoroscopeTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'today',    label: 'Today',      available: true  },
  { id: 'tomorrow', label: 'Tomorrow',   available: true  },
  { id: 'week',     label: 'This Week',  available: false },
  { id: 'month',    label: 'This Month', available: false },
];

export default function HoroscopeTabs({ activeTab, onTabChange }: HoroscopeTabsProps) {
  return (
    <div className="flex gap-1.5 bg-zinc-200/60 dark:bg-white/5 rounded-2xl p-1.5 backdrop-blur-sm border border-zinc-300/40 dark:border-white/10 shadow-inner">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => tab.available && onTabChange(tab.id)}
            disabled={!tab.available}
            className={`
              flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
              ${isActive
                ? 'bg-white dark:bg-white/15 text-indigo-600 dark:text-white shadow-sm border border-zinc-200/80 dark:border-white/20'
                : tab.available
                  ? 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/40 dark:hover:bg-white/5'
                  : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60'
              }
            `}
          >
            {tab.label}
            {!tab.available && (
              <span className="ml-1 text-[9px] uppercase font-normal opacity-60 font-sans">soon</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
