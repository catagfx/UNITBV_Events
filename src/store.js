import { useState, useEffect } from 'react';
import { EVENTS_DATA, ATTENDEES_DATA, QA_DATA } from './data/events.js';

// Demo session: the signed-in student. A real build would read this from the university SSO.
export const CURRENT_USER = {
  name: 'Alexandru Popa',
  email: 'alexandru.popa@student.unitbv.ro',
  faculty: 'IESC (Anul II)',
  avatar: '/assets/images/avatar-1.jpg',
};

const DEFAULT_BANNERS = {
  hackathons: 'assets/images/hackathon-tech.jpg',
  conferinte: 'assets/images/aula-campus.jpg',
  cultura: 'assets/images/concert-aula.jpg',
  cariera: 'assets/images/career-fair.jpg',
  workshops: 'assets/images/workshop-ai.jpg',
};

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

const now = () => new Date().toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' });
const cap = (s) => s.replace(/ ([a-zăâîșț])/, (_, c) => ` ${c.toUpperCase()}`);

// Builds the bilingual display fields the rest of the UI expects from a plain form.
function buildEvent(form, existing) {
  const start = new Date(`${form.date}T${form.startTime}`);
  const fmt = (loc) => cap(start.toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' }));
  const both = (v) => ({ ro: v, en: v });
  return {
    tags: [], speakers: [], schedule: [], faq: [], isFree: true,
    ...existing,
    id: existing?.id ?? `evt-${Date.now()}`,
    category: form.category,
    faculty: form.faculty,
    title: both(form.title),
    subtitle: both(form.subtitle || form.description.slice(0, 120)),
    description: both(form.description),
    bannerImage: existing?.bannerImage ?? DEFAULT_BANNERS[form.category] ?? DEFAULT_BANNERS.conferinte,
    startDate: `${form.date}T${form.startTime}:00`,
    endDate: `${form.date}T${form.endTime}:00`,
    dateDisplay: { ro: fmt('ro-RO'), en: start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    timeDisplay: both(`${form.startTime} - ${form.endTime}`),
    venueId: form.venueId,
    venueRoom: both(form.venueRoom || ''),
    format: form.format,
    organizer: existing?.organizer ?? { name: 'Organizator UNITBV', contact: CURRENT_USER.email, verified: true },
    capacity: Number(form.capacity),
    registeredCount: existing?.registeredCount ?? 0,
  };
}

export function useCampusStore() {
  const [events, setEvents] = usePersisted('unitbv_events', EVENTS_DATA);
  const [registrations, setRegistrations] = usePersisted('unitbv_registrations', ATTENDEES_DATA);
  const [notifications, setNotifications] = usePersisted('unitbv_notifications', [
    { id: 'n-0', title: 'Hackathon UNITBV x TSG 2026', body: 'Check-in-ul începe vineri la 09:00, în Corpul V.', from: 'Organizator', time: '18.11.2026, 09:00', read: false, eventId: 'evt-1' },
  ]);
  const [questions, setQuestions] = usePersisted('unitbv_questions', QA_DATA);

  const notify = (n) => setNotifications(list => [{ id: `n-${Date.now()}`, read: false, time: now(), ...n }, ...list]);
  const bumpCount = (eventId, delta) =>
    setEvents(list => list.map(e => (e.id === eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount + delta) } : e)));
  const titleOf = (eventId) => events.find(e => e.id === eventId)?.title.ro ?? '';

  return {
    events,
    registrations,
    notifications,
    questions,
    myTickets: registrations.filter(r => r.email === CURRENT_USER.email),

    // Returns the registration, or null when the event is full.
    register(eventId, form) {
      const existing = registrations.find(r => r.eventId === eventId && r.email === form.email);
      if (existing) return existing;
      const event = events.find(e => e.id === eventId);
      if (!event || event.registeredCount >= event.capacity) return null;
      const reg = {
        id: `att-${Date.now()}`, eventId, name: form.name, email: form.email, faculty: form.faculty,
        ticketCode: `UTBV-2026-${Math.floor(1000 + Math.random() * 9000)}`, checkedIn: false, time: 'Înregistrat',
      };
      setRegistrations(list => [...list, reg]);
      bumpCount(eventId, 1);
      notify({ title: titleOf(eventId), body: `Înscrierea ta este confirmată. Cod bilet: ${reg.ticketCode}`, from: 'Sistem', eventId });
      return reg;
    },
    cancelRegistration(id) {
      const reg = registrations.find(r => r.id === id);
      if (!reg) return;
      setRegistrations(list => list.filter(r => r.id !== id));
      bumpCount(reg.eventId, -1);
    },
    toggleCheckIn(id) {
      setRegistrations(list => list.map(r => (r.id === id
        ? { ...r, checkedIn: !r.checkedIn, time: r.checkedIn ? 'Înregistrat' : now() }
        : r)));
    },

    saveEvent(form, existing) {
      const evt = buildEvent(form, existing);
      setEvents(list => (existing ? list.map(e => (e.id === evt.id ? evt : e)) : [...list, evt]));
    },
    promoteEvent(id) {
      setEvents(list => list.map(e => ({ ...e, featured: e.id === id })));
      notify({ title: titleOf(id), body: 'Evenimentul a fost promovat pe pagina principală.', from: 'Organizator', eventId: id });
    },
    sendAnnouncement(eventId, body) {
      notify({ title: titleOf(eventId), body, from: 'Organizator', eventId });
    },
    markAllRead() {
      setNotifications(list => list.map(n => ({ ...n, read: true })));
    },

    askQuestion(eventId, text) {
      setQuestions(list => [
        { id: `qa-${Date.now()}`, eventId, author: `${CURRENT_USER.name} (Student IESC)`, question: { ro: text, en: text }, upvotes: 0, upvotedByMe: false, answer: null },
        ...list,
      ]);
    },
    upvoteQuestion(id) {
      setQuestions(list => list.map(q => (q.id === id
        ? { ...q, upvotedByMe: !q.upvotedByMe, upvotes: q.upvotes + (q.upvotedByMe ? -1 : 1) }
        : q)));
    },
    answerQuestion(id, text) {
      setQuestions(list => list.map(q => (q.id === id
        ? { ...q, answer: { ro: text, en: text }, answeredBy: 'Echipa de organizare' }
        : q)));
      const q = questions.find(x => x.id === id);
      if (q?.author.startsWith(CURRENT_USER.name)) notify({ title: titleOf(q.eventId), body: `Răspuns la întrebarea ta: ${text}`, from: 'Organizator', eventId: q.eventId });
    },
  };
}
