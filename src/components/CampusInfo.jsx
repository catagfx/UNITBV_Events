import React from 'react';
import { VENUES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function CampusInfo({ myTickets, events, onOpenTicket }) {
  const { lang, getLocalized } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  const th = 'text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400';

  return (
    <section className="grid lg:grid-cols-3 gap-6">
      <div id="campus-venues-section" className="lg:col-span-2 scroll-mt-32">
        <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">{L('Locații în campus', 'Campus venues')}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {L('Adresele și capacitatea sălilor în care se desfășoară evenimentele.', 'Addresses and hall capacity for event venues.')}
        </p>
        <div className="mt-4 overflow-x-auto glass-surface">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200/70 dark:border-white/10 bg-white/40 dark:bg-white/5">
              <tr>
                <th className={th}>{L('Locație', 'Venue')}</th>
                <th className={th}>{L('Adresă', 'Address')}</th>
                <th className={`${th} text-right`}>{L('Locuri', 'Seats')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-white/10">
              {VENUES.map(v => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{v.name.split(' - ')[0]}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{v.address}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700 dark:text-slate-200">{v.hallCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="digital-wallet-section" className="scroll-mt-32">
        <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">{L('Biletele mele', 'My tickets')}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {L('Biletul tău pentru evenimentele la care te-ai înscris.', 'Your tickets for events you registered for.')}
        </p>
        <ul className="mt-4 space-y-3">
          {myTickets.length === 0 && (
            <li className="glass-surface p-5 text-sm text-slate-500 dark:text-slate-400">
              {L('Nu ești înscris la niciun eveniment încă.', 'You have not registered for any event yet.')}
            </li>
          )}
          {myTickets.map(tk => {
            const evt = events.find(e => e.id === tk.eventId);
            return (
              <li key={tk.id} className="glass-surface p-4">
                <p className="font-medium text-slate-900 dark:text-white">{evt ? getLocalized(evt.title) : tk.eventId}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{evt && getLocalized(evt.dateDisplay)} · <span className="tabular-nums">{tk.ticketCode}</span></p>
                <button onClick={() => onOpenTicket(tk.eventId)} className="btn-outline mt-3 w-full py-2 text-sm cursor-pointer">
                  {L('Afișează biletul', 'Show ticket')}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
