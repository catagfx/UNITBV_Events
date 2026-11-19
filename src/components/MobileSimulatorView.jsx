import React, { useState, useRef, useEffect } from 'react';
import {
  Compass, Ticket, MessageSquare, User, ChevronRight,
  Wifi, Battery, Bell, ThumbsUp
} from 'lucide-react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext.jsx';
import { EVENT_CATEGORIES, VENUES, QA_DATA } from '../data/events.js';
import { CURRENT_USER } from '../store.js';
import { ThreeIntro } from './ThreeIntro.jsx';

export function MobileSimulatorView({
  events,
  myTickets = [],
  questions = QA_DATA,
  onAsk,
  onUpvote,
  onOpenDetails,
  onOpenRsvp,
  onOpenReplayIntro,
  onToggleRole,
  role = 'student'
}) {
  const { lang, toggleLang, t, getLocalized, getCategoryBadge, getFormatBadge } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  const [mobileTab, setMobileTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scale, setScale] = useState(1);
  const [viewportFitScale, setViewportFitScale] = useState(1);
  const [showMobileIntro, setShowMobileIntro] = useState(false);
  const [mobileQuestion, setMobileQuestion] = useState('');
  const [qrMap, setQrMap] = useState({});

  const wrapperRef = useRef(null);
  const phoneChassisRef = useRef(null);
  const phoneScrollRef = useRef(null);

  // Auto-fit chassis proportionally on narrow mobile browsers (< 420px) so the 385px frame never clips
  useEffect(() => {
    const updateFit = () => {
      const avail = wrapperRef.current?.clientWidth || window.innerWidth - 24;
      setViewportFitScale(Math.min(1, Math.max(0.65, (avail - 8) / 385)));
    };
    updateFit();
    window.addEventListener('resize', updateFit);
    return () => window.removeEventListener('resize', updateFit);
  }, []);

  const effectiveScale = Math.min(scale, viewportFitScale);

  useEffect(() => {
    Promise.all(
      (myTickets || []).map(tk =>
        QRCode.toDataURL(tk.ticketCode, { margin: 1, width: 150 }).then(url => [tk.ticketCode, url])
      )
    ).then(entries => setQrMap(Object.fromEntries(entries)));
  }, [myTickets]);

  // 60/120fps inertial smooth scroll inside phone viewport
  const targetScrollTopRef = useRef(0);
  const currentScrollTopRef = useRef(0);
  const isWheelingRef = useRef(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const chassis = phoneChassisRef.current;
    if (!chassis) return;

    const smoothScrollLoop = () => {
      const el = phoneScrollRef.current;
      if (!el) {
        animFrameRef.current = null;
        isWheelingRef.current = false;
        return;
      }
      const diff = targetScrollTopRef.current - currentScrollTopRef.current;
      if (Math.abs(diff) > 0.4) {
        currentScrollTopRef.current += diff * 0.14;
        el.scrollTop = currentScrollTopRef.current;
        animFrameRef.current = requestAnimationFrame(smoothScrollLoop);
      } else {
        currentScrollTopRef.current = targetScrollTopRef.current;
        el.scrollTop = targetScrollTopRef.current;
        animFrameRef.current = null;
        isWheelingRef.current = false;
      }
    };

    const handleWheel = (e) => {
      const scrollEl = phoneScrollRef.current;
      if (!scrollEl) return;
      e.preventDefault();
      e.stopPropagation();

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (maxScroll <= 0) return;

      if (!isWheelingRef.current) {
        currentScrollTopRef.current = scrollEl.scrollTop;
        targetScrollTopRef.current = scrollEl.scrollTop;
        isWheelingRef.current = true;
      }

      targetScrollTopRef.current = Math.max(0, Math.min(maxScroll, targetScrollTopRef.current + e.deltaY * 0.9));
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(smoothScrollLoop);
      }
    };

    chassis.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      chassis.removeEventListener('wheel', handleWheel);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const featuredEvent = events.find(e => e.featured) || events[0];
  const filteredEvents = (selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory)
  ).slice().sort((a, b) => a.startDate.localeCompare(b.startDate));

  const locale = lang === 'ro' ? 'ro-RO' : 'en-GB';
  const card = 'glass-surface';
  const accentText = 'text-[#005A9C] dark:text-amber-400';

  return (
    <div className="space-y-6">
      {/* Top Simulator Toolbar */}
      <div className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
            {t('mobileSimTitle', 'Simulator aplicație mobilă UNITBV')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {L(
              'Interfața mobilă folosește același stil instituțional UNITBV și este sincronizată cu biletele și întrebările.',
              'The mobile interface uses the same UNITBV institutional style and syncs with your tickets and Q&A.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowMobileIntro(prev => !prev)}
            className="btn-outline px-3.5 py-1.5 text-xs cursor-pointer"
          >
            {showMobileIntro
              ? L('Închide Intro 3D Mobil', 'Close Mobile 3D Intro')
              : L('Testează Intro 3D pe Mobil', 'Test 3D Intro on Mobile')}
          </button>

          <div className="flex items-center gap-1 p-1 rounded-lg glass-subtle">
            {[
              { label: '100%', val: 1 },
              { label: '85%', val: 0.85 },
              { label: '75%', val: 0.75 }
            ].map(s => (
              <button
                key={s.label}
                onClick={() => setScale(s.val)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  scale === s.val
                    ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Phone Frame (auto-scales smoothly on narrow mobile screens) */}
      <div ref={wrapperRef} className="flex justify-center py-2 overflow-hidden w-full">
        <div
          style={{
            height: `${Math.round(810 * effectiveScale)}px`,
            width: `${Math.round(385 * effectiveScale)}px`
          }}
          className="relative flex justify-center shrink-0"
        >
          <div
            ref={phoneChassisRef}
            style={{ transform: `scale(${effectiveScale})`, transformOrigin: 'top center' }}
            className="transition-transform duration-300"
          >
          <div className="relative w-[385px] h-[810px] rounded-[52px] bg-[#161618] p-3 shadow-2xl border-[5px] border-[#27272a] ring-1 ring-white/10 select-none flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50 flex items-center justify-end px-2.5 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            {/* Inner Viewport */}
            <div className="relative w-full h-full bg-[#edf2f9] dark:bg-[#121212] rounded-[42px] overflow-hidden flex flex-col justify-between text-slate-900 dark:text-slate-100">
              {/* Ambient Glassmorphism Refraction Orbs inside Mobile Screen */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-12 -left-12 w-52 h-52 rounded-full bg-[#005A9C]/25 dark:bg-amber-400/15 blur-3xl" />
                <div className="absolute top-1/2 -right-14 w-56 h-56 rounded-full bg-sky-400/25 dark:bg-white/[0.05] blur-3xl" />
                <div className="absolute bottom-12 left-8 w-48 h-48 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl" />
              </div>
              {/* Mobile 3D Intro Overlay */}
              {showMobileIntro && (
                <div className="absolute inset-0 z-40 rounded-[42px] overflow-hidden bg-[#121212]">
                  <ThreeIntro embedded={true} onFinish={() => setShowMobileIntro(false)} />
                </div>
              )}

              {/* Status Bar (clear of centered Dynamic Island) */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold bg-[#003C7E] dark:bg-amber-400 text-white dark:text-slate-950 z-20 shrink-0">
                <span>09:41</span>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Institutional Sub-strip */}
              <div className="bg-[#003C7E] dark:bg-amber-400 text-white/95 dark:text-slate-950 text-[10px] px-4 pb-2 pt-0.5 flex items-center justify-between border-b border-white/10 dark:border-slate-950/15 font-medium shrink-0">
                <span className="truncate font-semibold">{L('Universitatea Transilvania din Brașov', 'Transilvania University of Brașov')}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowMobileIntro(true)}
                    className="px-1.5 py-0.5 rounded bg-white/15 dark:bg-slate-950/15 hover:bg-white/25 dark:hover:bg-slate-950/25 text-[9px] font-bold cursor-pointer"
                    title="Reia Intro 3D pe Mobil"
                  >
                    3D
                  </button>
                  <button
                    onClick={toggleLang}
                    className="px-1.5 py-0.5 rounded bg-white/15 dark:bg-slate-950/15 hover:bg-white/25 dark:hover:bg-slate-950/25 text-[9px] font-bold cursor-pointer"
                  >
                    {lang === 'ro' ? '🇷🇴 RO' : '🇬🇧 EN'}
                  </button>
                </div>
              </div>

              {/* Scrollable Mobile Content */}
              <div
                ref={phoneScrollRef}
                onScroll={(e) => {
                  if (!isWheelingRef.current) {
                    currentScrollTopRef.current = e.currentTarget.scrollTop;
                    targetScrollTopRef.current = e.currentTarget.scrollTop;
                  }
                }}
                className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-3.5 pt-3 pb-24 space-y-4 scrollbar-none"
              >
                {/* Institutional Mobile App Header */}
                <div className={`${card} p-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src="/assets/branding/unitbv-symbol.png" alt="UNITBV" className="h-7 w-auto dark:hidden shrink-0" />
                    <img src="/assets/branding/unitbv-symbol-white.png" alt="UNITBV" className="h-7 w-auto hidden dark:block shrink-0" />
                    <div className="min-w-0">
                      <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {L('Evenimente UNITBV', 'UNITBV Events')}
                      </h1>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {role === 'student' ? `${CURRENT_USER.name} · IESC` : L('Echipa de organizare', 'Organising team')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setMobileTab('passes')}
                      className="relative p-1.5 rounded-lg glass-subtle text-slate-600 dark:text-slate-300 cursor-pointer"
                      title={L('Biletele mele', 'My tickets')}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      {myTickets.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#005A9C] dark:bg-amber-400 text-white dark:text-slate-950 text-[9px] font-bold flex items-center justify-center">
                          {myTickets.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setMobileTab('profile')}
                      title={L('Deschide Profilul', 'Open Profile')}
                      className="w-7 h-7 rounded-full overflow-hidden border border-[#005A9C] dark:border-amber-400 cursor-pointer shrink-0"
                    >
                      <img
                        src={CURRENT_USER.avatar}
                        alt={CURRENT_USER.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                </div>

                {/* TAB 1: DISCOVER (EVENIMENTE) */}
                {mobileTab === 'discover' && (
                  <div className="space-y-4">
                    {/* Institutional Category Filter Pills */}
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                        {t('categoriesTitle', 'Explorează pe categorii')}
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {EVENT_CATEGORIES.map(cat => {
                          const isActive = selectedCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer border ${
                                isActive
                                  ? 'bg-[#005A9C] border-[#005A9C] text-white dark:bg-amber-400 dark:border-amber-400 dark:text-slate-950 font-semibold'
                                  : 'glass-subtle text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              {lang === 'ro' ? cat.ro : cat.en}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Featured Event Card (Institutional Style) */}
                    {featuredEvent && (
                      <div className={`${card} overflow-hidden`}>
                        <img
                          src={`/${featuredEvent.bannerImage}`}
                          alt=""
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3.5 space-y-2">
                          <p className={`text-[10px] font-semibold uppercase tracking-wider ${accentText}`}>
                            {L('Eveniment recomandat', 'Featured event')}
                          </p>
                          <h2 className="font-heading text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                            {getLocalized(featuredEvent.title)}
                          </h2>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {getLocalized(featuredEvent.dateDisplay)} · {VENUES.find(v => v.id === featuredEvent.venueId)?.name.split(' - ')[0] ?? 'Campus UNITBV'}
                          </p>
                          <div className="pt-2 border-t border-slate-200/70 dark:border-white/10 flex items-center gap-2">
                            <button
                              onClick={() => onOpenRsvp(featuredEvent.id)}
                              className="btn-primary px-3 py-1.5 text-[11px] cursor-pointer"
                            >
                              {L('Înregistrare', 'Register')}
                            </button>
                            <button
                              onClick={() => onOpenDetails(featuredEvent.id)}
                              className="btn-outline px-3 py-1.5 text-[11px] cursor-pointer"
                            >
                              {L('Detalii', 'Details')}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chronological Events List (Institutional Style) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                          {L('Următoarele evenimente', 'Upcoming events')}
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {filteredEvents.length} {L('evenimente', 'events')}
                        </span>
                      </div>

                      {filteredEvents.map(evt => {
                        const start = new Date(evt.startDate);
                        const venue = VENUES.find(v => v.id === evt.venueId);
                        const venueName = venue ? venue.name.split(' - ')[0] : 'Campus UNITBV';
                        const spotsLeft = evt.capacity - evt.registeredCount;

                        return (
                          <div
                            key={evt.id}
                            className={`${card} p-3 flex items-start gap-3`}
                          >
                            {/* Date column */}
                            <div className="shrink-0 w-10 text-center pt-0.5">
                              <div className={`text-lg font-heading font-semibold leading-none ${accentText}`}>
                                {start.getDate()}
                              </div>
                              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {start.toLocaleDateString(locale, { month: 'short' }).replace('.', '')}
                              </div>
                            </div>

                            {/* Details column */}
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {getCategoryBadge(evt.category)} · {getFormatBadge(evt.format)}
                              </p>
                              <h4
                                onClick={() => onOpenDetails(evt.id)}
                                className={`mt-0.5 text-xs font-semibold text-slate-900 dark:text-white leading-snug cursor-pointer hover:underline`}
                              >
                                {getLocalized(evt.title)}
                              </h4>
                              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {getLocalized(evt.timeDisplay)} · {venueName}
                              </p>
                              <div className="mt-2 flex items-center gap-3 text-[11px]">
                                <button
                                  onClick={() => onOpenDetails(evt.id)}
                                  className={`font-semibold ${accentText} hover:underline cursor-pointer`}
                                >
                                  {L('Detalii', 'Details')}
                                </button>
                                <button
                                  onClick={() => onOpenRsvp(evt.id)}
                                  className={`font-semibold ${accentText} hover:underline cursor-pointer`}
                                >
                                  {L('Înregistrare', 'Register')}
                                </button>
                                <span className="text-slate-400 text-[10px] ml-auto">
                                  {spotsLeft} {L('locuri', 'seats')}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: PASSES (BILETELE MELE) */}
                {mobileTab === 'passes' && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {L('Biletele mele', 'My tickets')}
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {L('Prezintă codul QR la intrarea în sală.', 'Present the QR code at the hall entrance.')}
                      </p>
                    </div>

                    {myTickets.length === 0 ? (
                      <div className={`${card} p-4 text-xs text-slate-500 dark:text-slate-400 text-center`}>
                        {L('Nu ai bilete active încă.', 'You have no active tickets yet.')}
                      </div>
                    ) : (
                      myTickets.map(tk => {
                        const evt = events.find(e => e.id === tk.eventId) || events[0];
                        return (
                          <div key={tk.id} className={`${card} p-3.5 space-y-3`}>
                            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-2">
                              <span className={`text-[11px] font-semibold tabular-nums ${accentText}`}>
                                {tk.ticketCode}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                {tk.checkedIn ? L('Prezent', 'Checked in') : L('Confirmat', 'Confirmed')}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                                {evt ? getLocalized(evt.title) : tk.eventId}
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {evt && getLocalized(evt.dateDisplay)} · {tk.name}
                              </p>
                            </div>

                            <div className="flex justify-center py-2.5 glass-subtle rounded-xl">
                              <div className="p-2 bg-white rounded-md border border-slate-200">
                                {qrMap[tk.ticketCode] ? (
                                  <img src={qrMap[tk.ticketCode]} alt={`QR ${tk.ticketCode}`} className="w-24 h-24 object-contain" />
                                ) : (
                                  <div className="w-24 h-24" />
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => onOpenRsvp?.(tk.eventId)}
                              className="btn-outline w-full py-1.5 text-xs cursor-pointer"
                            >
                              {L('Afișează sau anulează biletul', 'View or cancel ticket')}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* TAB 3: COMMUNITY (ÎNTREBĂRI Q&A) */}
                {mobileTab === 'community' && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {L('Întrebări pentru organizatori', 'Questions for organisers')}
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {L('Răspunsurile oficiale sunt vizibile pentru toți participanții.', 'Official replies are visible to all attendees.')}
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (mobileQuestion.trim() && onAsk) {
                          onAsk(events[0]?.id || 'evt-1', mobileQuestion.trim());
                          setMobileQuestion('');
                        }
                      }}
                      className="flex gap-1.5"
                    >
                      <input
                        value={mobileQuestion}
                        onChange={e => setMobileQuestion(e.target.value)}
                        placeholder={L('Adresează o întrebare...', 'Ask a question...')}
                        className="flex-1 glass-input rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                      />
                      <button type="submit" className="btn-primary px-3 py-1.5 text-xs cursor-pointer">
                        {L('Trimite', 'Send')}
                      </button>
                    </form>

                    <div className="space-y-2.5">
                      {questions.map(q => (
                        <div key={q.id} className={`${card} p-3 space-y-1.5`}>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{q.author}</span>
                            <button
                              onClick={() => onUpvote?.(q.id)}
                              className={`flex items-center gap-1 cursor-pointer ${q.upvotedByMe ? accentText : 'text-slate-400'}`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{q.upvotes}</span>
                            </button>
                          </div>

                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {q.question[lang] || q.question.ro}
                          </p>

                          {q.answer && (
                            <div className="border-l-2 border-[#005A9C] dark:border-amber-400 pl-2.5 pt-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                              <span className="font-semibold text-slate-900 dark:text-white block">
                                {q.answeredBy || L('Răspuns oficial', 'Official answer')}
                              </span>
                              <p>{q.answer[lang] || q.answer.ro}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: PROFILE (CONTUL MEU) */}
                {mobileTab === 'profile' && (
                  <div className="space-y-3">
                    <div className={`${card} p-4 flex items-center gap-3`}>
                      <img
                        src={CURRENT_USER.avatar}
                        className="w-12 h-12 rounded-full border border-[#005A9C] dark:border-amber-400 object-cover shrink-0"
                        alt={CURRENT_USER.name}
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{CURRENT_USER.name}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{CURRENT_USER.email}</p>
                        <p className={`text-[11px] font-semibold ${accentText}`}>Facultatea {CURRENT_USER.faculty.replace(' (', ' · ').replace(')', '')}</p>
                      </div>
                    </div>

                    <div className={`${card} divide-y divide-slate-200/70 dark:divide-white/10 text-xs overflow-hidden`}>
                      <button
                        onClick={() => setMobileTab('passes')}
                        className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {L('Biletele mele active', 'My active tickets')}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#005A9C] dark:bg-amber-400 text-white dark:text-slate-950 text-[10px] font-bold">
                          {myTickets.length}
                        </span>
                      </button>

                      <button
                        onClick={onToggleRole}
                        className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {L('Rol activ', 'Active role')}
                        </span>
                        <span className={`font-semibold ${accentText}`}>
                          {role === 'student' ? L('Student', 'Student') : L('Organizator', 'Organiser')}
                        </span>
                      </button>

                      <button
                        onClick={toggleLang}
                        className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {L('Limbă interfață', 'Interface language')}
                        </span>
                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                          {lang === 'ro' ? '🇷🇴 Română' : '🇬🇧 English'}
                        </span>
                      </button>

                      <button
                        onClick={() => setShowMobileIntro(true)}
                        className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {L('Reia introducerea 3D pe mobil', 'Replay 3D intro on mobile')}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Navigation Bar */}
              <div className="absolute bottom-0 inset-x-0 h-16 glass-header border-t border-white/60 dark:border-white/15 px-3 flex items-center justify-around z-30 rounded-b-[42px]">
                {[
                  ['discover', Compass, L('Evenimente', 'Events')],
                  ['passes', Ticket, L('Bilete', 'Tickets')],
                  ['community', MessageSquare, L('Întrebări', 'Q&A')],
                  ['profile', User, L('Profil', 'Profile')],
                ].map(([id, Icon, labelText]) => {
                  const active = mobileTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setMobileTab(id)}
                      className={`flex flex-col items-center justify-center py-1 px-2 text-[10px] transition cursor-pointer ${
                        active
                          ? `${accentText} font-bold`
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-0.5" />
                      <span>{labelText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
