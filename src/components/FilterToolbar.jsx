import React from 'react';
import { LayoutGrid, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { FACULTIES } from '../data/events.js';
import { UNITBV_BUILDINGS } from './BrasovMapPanel.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export function FilterToolbar({
  selectedFaculty,
  onFacultyChange,
  selectedVenue,
  onVenueChange,
  selectedFormat,
  onFormatChange,
  viewMode,
  onViewModeChange,
  onResetFilters
}) {
  const { lang, t } = useLanguage();

  return (
    <section className="space-y-4 min-w-0 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 min-w-0">
        
        {/* Faculty Filter */}
        <div className="min-w-0">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider !font-semibold !text-slate-500 dark:!text-slate-400">
            {t('filterFaculty', 'Facultate')}
          </label>
          <select
            value={selectedFaculty}
            onChange={(e) => onFacultyChange(e.target.value)}
            className="w-full max-w-full min-w-0 truncate glass-input rounded-lg px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            {FACULTIES.map(f => (
              <option key={f.id} value={f.id}>
                {lang === 'ro' ? f.ro : f.en}
              </option>
            ))}
          </select>
        </div>

        {/* Venue Filter */}
        <div className="min-w-0">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider !font-semibold !text-slate-500 dark:!text-slate-400">
            {t('filterVenue', 'Locație Campus')}
          </label>
          <select
            value={selectedVenue}
            onChange={(e) => onVenueChange(e.target.value)}
            className="w-full max-w-full min-w-0 truncate glass-input rounded-lg px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">{t('filterVenueAll', 'Toate Sălile & Amfiteatrele')}</option>
            {UNITBV_BUILDINGS.map(v => (
              <option key={v.id} value={v.id}>{lang === 'ro' ? v.name.ro : v.name.en}</option>
            ))}
          </select>
        </div>

        {/* Format Filter */}
        <div className="min-w-0">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider !font-semibold !text-slate-500 dark:!text-slate-400">
            {t('filterFormat', 'Format Desfășurare')}
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full max-w-full min-w-0 truncate glass-input rounded-lg px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">{t('filterFormatAll', 'Toate Formatele')}</option>
            <option value="physical">{t('filterFormatPhysical', 'Fizic în Campus')}</option>
            <option value="hybrid">{t('filterFormatHybrid', 'Hibrid (Sală + Online)')}</option>
            <option value="online">{t('filterFormatOnline', 'Online')}</option>
          </select>
        </div>

        {/* Actions & View Toggles */}
        <div className="flex items-end justify-between gap-2 sm:col-span-3 lg:col-span-1">
          <button
            onClick={onResetFilters}
            title={t('resetFilters', 'Resetează filtrele')}
            className="p-2.5 rounded-lg glass-subtle text-slate-600 dark:text-slate-300 hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center p-1 rounded-lg glass-subtle">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('calendar')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
