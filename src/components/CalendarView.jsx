import React from 'react';
import { MapPin, Calendar as CalendarIcon, Ticket, ChevronRight } from 'lucide-react';
import { VENUES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function CalendarView({ events, onOpenDetails, onOpenRsvp }) {
  const { t, getLocalized, getCategoryBadge } = useLanguage();

  return (
    <div className="liquid-glass rounded-3xl p-6 divide-y divide-slate-200/60 dark:divide-white/10">
      {events.map(evt => {
        const title = getLocalized(evt.title);
        const dateDisplay = getLocalized(evt.dateDisplay);
        const timeDisplay = getLocalized(evt.timeDisplay);
        const venue = VENUES.find(v => v.id === evt.venueId);

        const parts = dateDisplay.split(' ');
        const dayNumber = parts[0] || '28';
        const monthName = parts[1] || 'NOV';

        return (
          <div
            key={evt.id}
            className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/5 px-3 rounded-2xl transition"
          >
            <div className="flex items-start space-x-4">
              <div className="glass-subtle text-[#005A9C] dark:text-amber-400 rounded-2xl p-3 text-center min-w-[75px]">
                <span className="block text-xs font-bold uppercase text-[#005A9C] dark:text-amber-400">{monthName}</span>
                <span className="block text-xl font-black font-mono">{dayNumber}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase glass-subtle text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                    {getCategoryBadge(evt.category)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{timeDisplay}</span>
                </div>
                <h4
                  onClick={() => onOpenDetails(evt.id)}
                  className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer hover:text-[#005A9C] dark:hover:text-amber-400"
                >
                  {title}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{venue ? venue.name : 'Campus UNITBV'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onOpenDetails(evt.id)}
                className="px-3 py-1.5 rounded-xl glass-subtle text-xs font-bold hover:border-[#005A9C] dark:hover:border-amber-400 transition cursor-pointer"
              >
                {t('viewEventDetails', 'Detalii')}
              </button>
              <button
                onClick={() => onOpenRsvp(evt.id)}
                className="btn-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>{t('heroRsvpQuick', 'Înscrie-te')}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
