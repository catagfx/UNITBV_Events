import React from 'react';
import { Bookmark } from 'lucide-react';
import { UNITBV_BUILDINGS } from './BrasovMapPanel.jsx';
import { VENUES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function EventCard({ event, isFavorite, onToggleFavorite, onOpenDetails, onOpenRsvp }) {
  const { lang, t, getLocalized, getCategoryBadge, getFormatBadge } = useLanguage();

  const bld = UNITBV_BUILDINGS.find(b => b.id === event.venueId);
  const venue = VENUES.find(v => v.id === event.venueId) || (bld ? { id: bld.id, name: getLocalized(bld.name), address: bld.address, busLines: 'RATBv Campus', wifi: 'Eduroam UNITBV', parking: 'Campus UNITBV' } : null);
  const venueName = venue ? venue.name.split(' - ')[0] : 'Campus UNITBV';
  const spotsLeft = event.capacity - event.registeredCount;
  const start = new Date(event.startDate);
  const locale = lang === 'ro' ? 'ro-RO' : 'en-GB';

  return (
    <article className="event-card flex gap-3 sm:gap-5 p-3.5 sm:p-5">
      {/* Date block */}
      <div className="shrink-0 w-11 sm:w-14 text-center pt-0.5">
        <div className="text-xl sm:text-2xl font-heading font-semibold leading-none text-[#005A9C] dark:text-amber-400">{start.getDate()}</div>
        <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {start.toLocaleDateString(locale, { month: 'short' }).replace('.', '')}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
          {getCategoryBadge(event.category)} · {getFormatBadge(event.format)}
        </p>
        <h3
          onClick={() => onOpenDetails(event.id)}
          className="mt-1 font-heading text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-white hover:text-[#005A9C] dark:hover:text-amber-400 cursor-pointer transition-colors"
        >
          {getLocalized(event.title)}
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {getLocalized(event.timeDisplay)} · {venueName}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <button onClick={() => onOpenDetails(event.id)} className="font-semibold text-[#005A9C] dark:text-amber-400 hover:underline underline-offset-2 cursor-pointer">
            {t('viewEventDetails', 'Detalii')}
          </button>
          <button onClick={() => onOpenRsvp(event.id)} className="font-semibold text-[#005A9C] dark:text-amber-400 hover:underline underline-offset-2 cursor-pointer">
            {t('heroRsvpQuick', 'Înregistrare')}
          </button>
          <span className="text-slate-500 dark:text-slate-400">
            {spotsLeft <= 20
              ? (lang === 'ro' ? `Doar ${spotsLeft} locuri rămase` : `Only ${spotsLeft} places left`)
              : (lang === 'ro' ? `${spotsLeft} locuri disponibile` : `${spotsLeft} places available`)}
          </span>
        </div>
      </div>

      <img src={`/${event.bannerImage}`} alt="" className="hidden sm:block shrink-0 w-32 h-24 rounded-lg object-cover self-center" />

      <button
        onClick={() => onToggleFavorite(event.id)}
        title={t('saveFavorite', 'Salvează')}
        aria-pressed={isFavorite}
        className="shrink-0 self-start p-1.5 text-slate-400 hover:text-[#005A9C] dark:hover:text-amber-400 transition-colors cursor-pointer"
      >
        <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-[#005A9C] text-[#005A9C] dark:fill-amber-400 dark:text-amber-400' : ''}`} />
      </button>
    </article>
  );
}
