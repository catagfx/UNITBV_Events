import React from 'react';
import { EVENT_CATEGORIES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function CategoryFilterBar({ selectedCategory, onSelectCategory }) {
  const { lang, t } = useLanguage();

  return (
    <div className="min-w-0 w-full">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
        {t('categoriesTitle', 'Categorii')}
      </h2>
      <ul className="flex lg:flex-col gap-1.5 lg:gap-1 overflow-x-auto lg:overflow-visible scrollbar-none pb-1 lg:pb-0 w-full min-w-0">
        {EVENT_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <li key={cat.id} className="shrink-0 lg:w-full">
              <button
                onClick={() => onSelectCategory(cat.id)}
                aria-current={isActive}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap border lg:border-0 lg:border-l-2 ${
                  isActive
                    ? 'border-[#005A9C] bg-[#005A9C]/10 text-[#005A9C] dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-400 font-semibold'
                    : 'border-slate-200/70 dark:border-white/10 lg:border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {lang === 'ro' ? cat.ro : cat.en}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
