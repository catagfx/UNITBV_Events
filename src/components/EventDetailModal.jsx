import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { X, Calendar, Clock, MapPin, Share2, Bookmark, CheckCircle, ThumbsUp, Send, Bus, Wifi, Car } from 'lucide-react';
import { UNITBV_BUILDINGS } from './BrasovMapPanel.jsx';
import { VENUES, FACULTIES } from '../data/events.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export function EventDetailModal({ event, isOpen, onClose, onOpenRsvp, isFavorite, onToggleFavorite, isRegistered, questions = [], onAsk, onUpvote }) {
  const { lang, t, getLocalized, getCategoryBadge, getFormatBadge } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');
  const [copied, setCopied] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

  if (!event) return null;

  const bld = UNITBV_BUILDINGS.find(b => b.id === event.venueId);
  const venue = VENUES.find(v => v.id === event.venueId) || (bld ? { id: bld.id, name: getLocalized(bld.name), address: bld.address, busLines: 'RATBv Campus', wifi: 'Eduroam UNITBV', parking: 'Campus UNITBV' } : null);
  const facultyObj = FACULTIES.find(f => f.id === event.faculty);
  const facultyName = facultyObj ? (lang === 'ro' ? facultyObj.ro : facultyObj.en) : 'Universitatea Transilvania din Brașov';

  const title = getLocalized(event.title);
  const desc = getLocalized(event.description);
  const dateDisplay = getLocalized(event.dateDisplay);
  const timeDisplay = getLocalized(event.timeDisplay);
  const venueRoom = getLocalized(event.venueRoom);

  const spotsRemaining = event.capacity - event.registeredCount;
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onAsk(event.id, newQuestionText.trim());
    setNewQuestionText('');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 modal-backdrop" />
        <Dialog.Content data-lenis-prevent data-lenis-prevent-wheel className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div className="relative w-full max-w-5xl glass-modal rounded-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
            
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-subtle text-slate-700 dark:text-white hover:scale-105 transition focus:outline-none cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            {/* Scrollable Container */}
            <div id="event-detail-scroll-panel" data-lenis-prevent data-lenis-prevent-wheel className="overflow-y-auto overscroll-contain flex-1">
              
              {/* Event header: photo, then plain text (no overlay) */}
              <img src={event.bannerImage} alt="" className="w-full h-44 sm:h-64 object-cover" />
              <div className="px-4 sm:px-8 pt-4 sm:pt-6">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#005A9C] dark:text-amber-400">
                  <span id="detail-category-badge">{getCategoryBadge(event.category)}</span>
                  {' · '}
                  <span id="detail-format-badge">{getFormatBadge(event.format)}</span>
                  {' · '}
                  <span id="detail-faculty-tag">{facultyName}</span>
                </p>
                <h1 id="detail-title" className="mt-2 font-heading text-xl sm:text-3xl font-semibold text-slate-900 dark:text-white leading-snug">
                  {title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400 shrink-0" /><span id="detail-date-display">{dateDisplay}</span></span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400 shrink-0" /><span id="detail-time-display">{timeDisplay}</span></span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400 shrink-0" /><span id="detail-venue-room">{venueRoom}</span></span>
                </div>
              </div>

              {/* Main Modal Grid */}
              <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Left 2 Cols: Tabs Navigation & Content */}
                <div className="lg:col-span-2 space-y-6 min-w-0">
                  <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    
                    {/* Navigation Tabs Header */}
                    <Tabs.List className="flex items-center space-x-2 border-b border-slate-200/70 dark:border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold">
                      <Tabs.Trigger
                        value="about"
                        className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl transition cursor-pointer select-none ${
                          activeTab === 'about'
                            ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t('tabAbout', 'Despre')}
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        value="schedule"
                        className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl transition cursor-pointer select-none ${
                          activeTab === 'schedule'
                            ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t('tabSchedule', 'Program & Agendă')}
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        value="speakers"
                        className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl transition cursor-pointer select-none ${
                          activeTab === 'speakers'
                            ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t('tabSpeakers', 'Vorbitori')}
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        value="venue"
                        className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl transition cursor-pointer select-none ${
                          activeTab === 'venue'
                            ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t('tabVenue', 'Locație & Acces')}
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        value="qa"
                        className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl transition cursor-pointer select-none ${
                          activeTab === 'qa'
                            ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t('tabQA', 'Live Q&A')}
                      </Tabs.Trigger>
                    </Tabs.List>

                    {/* Tab 1: About */}
                    <Tabs.Content value="about" className="pt-4 space-y-4 focus:outline-none">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        {desc}
                      </p>

                      <div className="pt-4">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                          {t('tagsAndThemes', 'Tag-uri & Teme')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map(tag => (
                            <span key={tag} className="glass-subtle text-slate-700 dark:text-slate-200 text-xs px-3 py-1 rounded-xl font-semibold">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* FAQ Accordion */}
                      {event.faq && event.faq.length > 0 && (
                        <div className="pt-6 border-t border-slate-200/70 dark:border-white/10">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 font-heading">
                            {t('faqTitle', 'Întrebări Frecvente (FAQ)')}
                          </h3>
                          <div className="space-y-3">
                            {event.faq.map((item, idx) => (
                              <div key={idx} className="p-4 glass-subtle rounded-xl space-y-1">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                                  {getLocalized(item.q)}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  {getLocalized(item.a)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Tabs.Content>

                    {/* Tab 2: Schedule */}
                    <Tabs.Content value="schedule" className="pt-4 space-y-4 focus:outline-none">
                      <div className="space-y-4">
                        {(!event.schedule || event.schedule.length === 0) && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {dateDisplay} · {timeDisplay}
                          </p>
                        )}
                        {(event.schedule || []).map((block, bIdx) => (
                          block.items ? (
                            <div key={bIdx} className="space-y-2.5">
                              {block.day && (
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#005A9C] dark:text-amber-400">
                                  {getLocalized(block.day)}
                                </h4>
                              )}
                              {block.items.map((item, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl glass-subtle flex items-start justify-between gap-4">
                                  <div>
                                    <span className="font-mono text-xs font-bold text-[#005A9C] dark:text-amber-400 block mb-0.5">
                                      {item.time}
                                    </span>
                                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                      {getLocalized(item.title)}
                                    </h5>
                                    {item.room && (
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {getLocalized(item.room)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div key={bIdx} className="p-3.5 rounded-xl glass-subtle">
                              <span className="font-mono text-xs font-bold text-[#005A9C] dark:text-amber-400 block mb-0.5">{block.time}</span>
                              <h5 className="font-bold text-sm text-slate-900 dark:text-white">{getLocalized(block.title)}</h5>
                              {block.room && <span className="text-xs text-slate-500 dark:text-slate-400">{getLocalized(block.room)}</span>}
                            </div>
                          )
                        ))}
                      </div>
                    </Tabs.Content>

                    {/* Tab 3: Speakers */}
                    <Tabs.Content value="speakers" className="pt-4 space-y-4 focus:outline-none">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {event.speakers.map((spk, idx) => (
                          <div key={idx} className="p-4 rounded-xl glass-subtle flex items-center gap-3">
                            <img src={spk.avatar} alt={spk.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                                {spk.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {getLocalized(spk.role)}
                              </p>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                                <CheckCircle className="w-3 h-3" />
                                <span>{t('verifiedAcademic', 'Cadru Didactic / Expert')}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tabs.Content>

                    {/* Tab 4: Venue */}
                    <Tabs.Content value="venue" className="pt-4 space-y-4 focus:outline-none">
                      {venue && (
                        <div className="p-5 rounded-xl glass-subtle space-y-3 text-xs text-slate-700 dark:text-slate-300">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                            {venue.name}
                          </h4>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600 dark:text-amber-400 shrink-0" />
                            <span>{venue.address}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Bus className="w-4 h-4 text-[#005A9C] dark:text-amber-400 shrink-0" />
                            <span>{venue.busLines}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{venue.wifi}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-purple-500 shrink-0" />
                            <span>{venue.parking}</span>
                          </p>
                        </div>
                      )}
                    </Tabs.Content>

                    {/* Tab 5: Live Q&A */}
                    <Tabs.Content value="qa" className="pt-4 space-y-4 focus:outline-none">
                      <form onSubmit={handleAddQuestion} className="flex gap-2">
                        <input
                          type="text"
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder={t('askQuestionPlaceholder', 'Scrie întrebarea ta legată de acest eveniment...')}
                          className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                        />
                        <button type="submit" className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                          <Send className="w-3.5 h-3.5" />
                          <span>{t('submitQuestion', 'Trimite')}</span>
                        </button>
                      </form>

                      <div className="space-y-3 pt-2">
                        {questions.length === 0 && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ro' ? 'Nu există întrebări încă. Fii primul care întreabă.' : 'No questions yet. Be the first to ask.'}</p>
                        )}
                        {questions.map(q => (
                          <div key={q.id} className="p-3.5 rounded-xl glass-subtle">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                              <span>{q.author}</span>
                              <button
                                onClick={() => onUpvote(q.id)}
                                aria-pressed={q.upvotedByMe}
                                className={`flex items-center gap-1 cursor-pointer ${q.upvotedByMe ? 'text-[#005A9C] dark:text-amber-400' : 'text-slate-400'}`}
                              >
                                <ThumbsUp className="w-3 h-3" /> {q.upvotes}
                              </button>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{getLocalized(q.question)}</p>
                            {q.answer && (
                              <p className="mt-2 pl-3 border-l-2 border-[#005A9C] dark:border-amber-400 text-sm text-slate-600 dark:text-slate-300">
                                <strong>{t('officialAnswer', 'Răspuns oficial')}:</strong> {getLocalized(q.answer)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </Tabs.Content>

                  </Tabs.Root>
                </div>

                {/* Right Col: Registration & Capacity Sidebar */}
                <div className="space-y-5">
                  <div className="p-5 rounded-xl glass-subtle space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {t('accessType', 'Tip Acces')}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {t('freeWithRsvp', 'Gratuit cu Înregistrare')}
                      </span>
                    </div>

                    {/* Capacity text strictly localized */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span id="detail-capacity-text">
                          {lang === 'ro'
                            ? `${event.registeredCount} / ${event.capacity} locuri ocupate`
                            : `${event.registeredCount} / ${event.capacity} seats filled`}
                        </span>
                        <span className="text-slate-500">{percentFilled}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          id="detail-capacity-bar"
                          className="bg-[#005A9C] dark:bg-amber-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                      <span id="detail-spots-remaining" className="text-[11px] font-semibold text-slate-500 block">
                        {lang === 'ro'
                          ? `${spotsRemaining} locuri rămase disponibile!`
                          : `${spotsRemaining} spots remaining!`}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenRsvp(event.id)}
                      className="w-full btn-primary py-2.5 px-4 text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{isRegistered ? (lang === 'ro' ? 'Vezi biletul tău' : 'View your ticket') : t('registerNowCta', 'Înregistrare')}</span>
                    </button>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onToggleFavorite(event.id)}
                        className="flex-1 py-2 px-3 rounded-xl glass-subtle text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#005A9C] dark:hover:border-amber-400 transition cursor-pointer"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#005A9C] text-[#005A9C] dark:fill-amber-400 dark:text-amber-400' : ''}`} />
                        <span>{isFavorite ? t('savedFavorite', 'Salvat') : t('saveFavorite', 'Salvează')}</span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="p-2 rounded-xl glass-subtle hover:border-[#005A9C] dark:hover:border-amber-400 transition text-slate-600 dark:text-slate-300 cursor-pointer"
                        title={t('shareEvent', 'Distribuie')}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {copied && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block text-center font-semibold animate-pulse">
                        {t('linkCopied', 'Link copiat!')}
                      </span>
                    )}
                  </div>

                  {/* Organizer Card */}
                  <div className="p-4 rounded-xl glass-subtle space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      {t('organizerLabel', 'Organizator')}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {event.organizer.name}
                    </h4>
                    <p className="text-[11px] text-blue-600 dark:text-amber-400">
                      {event.organizer.contact}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
