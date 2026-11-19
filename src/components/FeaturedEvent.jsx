import React from 'react';
import { UNITBV_BUILDINGS } from './BrasovMapPanel.jsx';
import { VENUES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function FeaturedEvent({ event, onOpenDetails, onOpenRsvp }) {
  const { lang, getLocalized } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  if (!event) return null;

  const bld = UNITBV_BUILDINGS.find(b => b.id === event.venueId);
  const venue = VENUES.find(v => v.id === event.venueId) || (bld ? { id: bld.id, name: getLocalized(bld.name), address: bld.address, busLines: 'RATBv Campus', wifi: 'Eduroam UNITBV', parking: 'Campus UNITBV' } : null);
  const spotsLeft = event.capacity - event.registeredCount;

  const facts = [
    [L('Data', 'Date'), getLocalized(event.dateDisplay)],
    [L('Ora', 'Time'), getLocalized(event.timeDisplay)],
    [L('Locul', 'Venue'), [venue?.name.split(' - ')[0] ?? 'Campus UNITBV', getLocalized(event.venueRoom)].filter(Boolean).join(', ')],
    [L('Organizator', 'Organiser'), event.organizer.name],
  ];

  return (
    <section aria-labelledby="featured-title" className="grid md:grid-cols-5 glass-surface overflow-hidden">
      <img src={`/${event.bannerImage}`} alt="" className="md:col-span-2 w-full h-56 md:h-full object-cover" />

      <div className="md:col-span-3 p-4 sm:p-6 lg:p-8 flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#005A9C] dark:text-amber-400">
          {L('Eveniment recomandat', 'Featured event')}
        </p>
        <h2 id="featured-title" className="mt-2 font-heading text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-slate-900 dark:text-white">
          {getLocalized(event.title)}
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {getLocalized(event.subtitle)}
        </p>

        <dl className="mt-4 sm:mt-5 grid grid-cols-[76px_1fr] sm:grid-cols-[88px_1fr] gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
          {facts.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="text-slate-800 dark:text-slate-100">{v}</dd>
            </React.Fragment>
          ))}
        </dl>

        <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center gap-3">
          <button onClick={() => onOpenRsvp(event.id)} className="btn-primary px-5 py-2.5 text-sm cursor-pointer">
            {L('Înregistrare', 'Register')}
          </button>
          <button onClick={() => onOpenDetails(event.id)} className="btn-outline px-5 py-2.5 text-sm cursor-pointer">
            {L('Detalii și program', 'Details & schedule')}
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400 sm:ml-auto">
            {L(`${spotsLeft} locuri disponibile`, `${spotsLeft} places available`)}
          </span>
        </div>
      </div>
    </section>
  );
}
