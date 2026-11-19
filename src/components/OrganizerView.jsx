import React, { useState } from 'react';
import { EVENT_CATEGORIES, FACULTIES, VENUES } from '../data/events.js';
import { UNITBV_BUILDINGS } from './BrasovMapPanel.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const field = 'w-full glass-input rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none';
const label = 'block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1';
const card = 'glass-surface';
const linkBtn = 'font-semibold text-[#005A9C] dark:text-amber-400 hover:underline underline-offset-2 cursor-pointer';

const EMPTY = {
  title: '', subtitle: '', description: '', category: 'conferinte', faculty: 'all', venueId: VENUES[0].id, venueRoom: '',
  date: '', startTime: '10:00', endTime: '12:00', format: 'physical', capacity: 100,
};

const toForm = (e) => ({
  title: e.title.ro, subtitle: e.subtitle.ro, description: e.description.ro, category: e.category, faculty: e.faculty,
  venueId: e.venueId, venueRoom: e.venueRoom?.ro ?? '', date: e.startDate.slice(0, 10), startTime: e.startDate.slice(11, 16),
  endTime: e.endDate.slice(11, 16), format: e.format, capacity: e.capacity,
});

function EventForm({ initial, editing, onSave, onCancel, L, lang }) {
  const [f, setF] = useState(initial);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const badTime = f.endTime <= f.startTime;
  const minCap = editing?.registeredCount ?? 1;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!badTime) onSave(f); }}
      className={`${card} p-5 grid sm:grid-cols-2 gap-4`}
    >
      <h2 className="sm:col-span-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">
        {editing ? L('Editează evenimentul', 'Edit event') : L('Eveniment nou', 'New event')}
      </h2>
      <div className="sm:col-span-2">
        <label className={label}>{L('Titlu', 'Title')} *</label>
        <input required value={f.title} onChange={set('title')} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>{L('Descriere', 'Description')} *</label>
        <textarea required rows={3} value={f.description} onChange={set('description')} className={field} />
      </div>
      <div>
        <label className={label}>{L('Categorie', 'Category')}</label>
        <select value={f.category} onChange={set('category')} className={field}>
          {EVENT_CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{lang === 'ro' ? c.ro : c.en}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>{L('Facultate', 'Faculty')}</label>
        <select value={f.faculty} onChange={set('faculty')} className={field}>
          {FACULTIES.map(c => <option key={c.id} value={c.id}>{lang === 'ro' ? c.ro : c.en}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>{L('Locație', 'Venue')}</label>
        <select value={f.venueId} onChange={set('venueId')} className={field}>
          {UNITBV_BUILDINGS.map(v => <option key={v.id} value={v.id}>{lang === 'ro' ? v.name.ro : v.name.en}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>{L('Sală / etaj', 'Room / floor')}</label>
        <input value={f.venueRoom} onChange={set('venueRoom')} className={field} />
      </div>
      <div>
        <label className={label}>{L('Data', 'Date')} *</label>
        <input required type="date" value={f.date} onChange={set('date')} className={field} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>{L('De la', 'From')}</label>
          <input required type="time" value={f.startTime} onChange={set('startTime')} className={field} />
        </div>
        <div>
          <label className={label}>{L('Până la', 'To')}</label>
          <input required type="time" value={f.endTime} onChange={set('endTime')} className={field} />
        </div>
      </div>
      <div>
        <label className={label}>{L('Format', 'Format')}</label>
        <select value={f.format} onChange={set('format')} className={field}>
          <option value="physical">{L('Fizic', 'In person')}</option>
          <option value="hybrid">{L('Hibrid', 'Hybrid')}</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div>
        <label className={label}>{L('Număr de locuri', 'Capacity')}</label>
        <input required type="number" min={minCap} value={f.capacity} onChange={set('capacity')} className={field} />
      </div>
      {badTime && <p role="alert" className="sm:col-span-2 text-sm text-red-600 dark:text-red-400">{L('Ora de final trebuie să fie după ora de start.', 'End time must be after start time.')}</p>}
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm cursor-pointer">{L('Salvează', 'Save')}</button>
        <button type="button" onClick={onCancel} className="btn-outline px-5 py-2.5 text-sm cursor-pointer">{L('Renunță', 'Cancel')}</button>
      </div>
    </form>
  );
}

export function OrganizerView({ store }) {
  const { lang, getLocalized } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  const { events, registrations, questions } = store;

  const [formFor, setFormFor] = useState(null); // null | 'new' | event id
  const [selectedId, setSelectedId] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [answers, setAnswers] = useState({});

  const sorted = [...events].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const selected = events.find(e => e.id === selectedId);
  const roster = registrations.filter(r => r.eventId === selectedId);
  const eventQuestions = questions.filter(q => q.eventId === selectedId);
  const editing = formFor && formFor !== 'new' ? events.find(e => e.id === formFor) : undefined;
  const th = 'text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-slate-900 dark:text-white">{L('Panou organizator', 'Organiser dashboard')}</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-slate-600 dark:text-slate-300">
            {L('Creează și editează evenimente, promovează-le, gestionează participanții și comunică cu ei.', 'Create and edit events, promote them, manage attendees and message them.')}
          </p>
        </div>
        <button onClick={() => setFormFor('new')} className="btn-primary px-5 py-2.5 text-sm cursor-pointer">{L('Eveniment nou', 'New event')}</button>
      </div>

      {formFor && (
        <EventForm
          key={formFor}
          initial={editing ? toForm(editing) : EMPTY}
          editing={editing}
          L={L}
          lang={lang}
          onCancel={() => setFormFor(null)}
          onSave={(f) => { store.saveEvent(f, editing); setFormFor(null); }}
        />
      )}

      <div className={`${card} overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200/70 dark:border-white/10 bg-white/40 dark:bg-white/[0.04]">
            <tr>
              <th className={th}>{L('Eveniment', 'Event')}</th>
              <th className={th}>{L('Data', 'Date')}</th>
              <th className={`${th} text-right`}>{L('Înscriși', 'Registered')}</th>
              <th className={`${th} text-right`}>Check-in</th>
              <th className={th} />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-white/10">
            {sorted.map(e => {
              const r = registrations.filter(x => x.eventId === e.id);
              return (
                <tr key={e.id} className={e.id === selectedId ? 'bg-[#005A9C]/5 dark:bg-amber-400/10' : ''}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {getLocalized(e.title)}
                    {e.featured && <span className="ml-2 text-xs font-normal text-[#005A9C] dark:text-amber-400">{L('promovat', 'promoted')}</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">{getLocalized(e.dateDisplay)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{e.registeredCount} / {e.capacity}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.filter(x => x.checkedIn).length} / {r.length}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap space-x-4">
                    <button onClick={() => setSelectedId(e.id)} className={linkBtn}>{L('Participanți', 'Attendees')}</button>
                    <button onClick={() => setFormFor(e.id)} className={linkBtn}>{L('Editează', 'Edit')}</button>
                    <button onClick={() => store.promoteEvent(e.id)} disabled={e.featured} className={`${linkBtn} disabled:opacity-40 disabled:no-underline disabled:cursor-default`}>{L('Promovează', 'Promote')}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">{L('Participanți', 'Attendees')}: {getLocalized(selected.title)}</h2>
            <div className={`${card} divide-y divide-slate-200/60 dark:divide-white/10`}>
              {roster.length === 0 && <p className="p-4 text-sm text-slate-500 dark:text-slate-400">{L('Niciun participant înregistrat.', 'No registered attendees.')}</p>}
              {roster.map(r => (
                <div key={r.id} className="p-4 flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{r.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{r.faculty} · <span className="tabular-nums">{r.ticketCode}</span></p>
                  </div>
                  <button
                    onClick={() => store.toggleCheckIn(r.id)}
                    className={`shrink-0 px-3 py-1.5 text-xs rounded-lg cursor-pointer ${r.checkedIn ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {r.checkedIn ? L('Prezent', 'Present') : L('Validează', 'Check in')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <form
              onSubmit={(e) => { e.preventDefault(); if (announcement.trim()) { store.sendAnnouncement(selected.id, announcement.trim()); setAnnouncement(''); } }}
              className="space-y-3"
            >
              <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">{L('Anunț către participanți', 'Announcement to attendees')}</h2>
              <textarea rows={3} value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder={L('Ex.: Sala s-a schimbat, ne vedem în Corpul V.', 'E.g. The room has changed.')} className={field} />
              <button type="submit" className="btn-primary px-5 py-2.5 text-sm cursor-pointer">{L(`Trimite (${roster.length} participanți)`, `Send (${roster.length} attendees)`)}</button>
            </form>

            <div className="space-y-3">
              <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">{L('Întrebări de la participanți', 'Attendee questions')}</h2>
              <div className={`${card} divide-y divide-slate-200/60 dark:divide-white/10`}>
                {eventQuestions.length === 0 && <p className="p-4 text-sm text-slate-500 dark:text-slate-400">{L('Nu există întrebări.', 'No questions.')}</p>}
                {eventQuestions.map(q => (
                  <div key={q.id} className="p-4 text-sm space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{q.author}</p>
                    <p className="text-slate-900 dark:text-white">{getLocalized(q.question)}</p>
                    {q.answer ? (
                      <p className="text-slate-600 dark:text-slate-300 border-l-2 border-[#005A9C] dark:border-amber-400 pl-3">{getLocalized(q.answer)}</p>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); if (answers[q.id]?.trim()) { store.answerQuestion(q.id, answers[q.id].trim()); } }} className="flex gap-2">
                        <input value={answers[q.id] ?? ''} onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })} placeholder={L('Răspunsul tău', 'Your answer')} className={field} />
                        <button type="submit" className="btn-outline px-4 text-sm cursor-pointer">{L('Răspunde', 'Reply')}</button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
