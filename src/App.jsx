import React, { useState, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Header } from './components/Header.jsx';
import { FeaturedEvent } from './components/FeaturedEvent.jsx';
import { CampusInfo } from './components/CampusInfo.jsx';
import { BrasovMapPanel } from './components/BrasovMapPanel.jsx';
import { CategoryFilterBar } from './components/CategoryFilterBar.jsx';
import { FilterToolbar } from './components/FilterToolbar.jsx';
import { EventCard } from './components/EventCard.jsx';
import { CalendarView } from './components/CalendarView.jsx';
import { EventDetailModal } from './components/EventDetailModal.jsx';
import { RsvpModal } from './components/RsvpModal.jsx';
import { MobileSimulatorView } from './components/MobileSimulatorView.jsx';
import { UxDocsView } from './components/UxDocsView.jsx';
import { Footer } from './components/Footer.jsx';
import { ThreeIntro } from './components/ThreeIntro.jsx';
import { OrganizerView } from './components/OrganizerView.jsx';
import { useCampusStore } from './store.js';
import { useLanguage } from './context/LanguageContext.jsx';

export default function App() {
  const { lang, t, getLocalized } = useLanguage();
  const lenisRef = useRef(null);
  const store = useCampusStore();
  const { events } = store;

  // Intro state
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('unitbv_intro_seen');
  });

  // View state: 'web' | 'mobile' | 'ux-docs'
  const [currentView, setCurrentView] = useState('web');
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [currentView]);
  const [role, setRole] = useState('student');
  const handleToggleRole = () => {
    const next = role === 'student' ? 'organizer' : 'student';
    setRole(next);
    setCurrentView(next === 'organizer' ? 'organizer' : 'web');
  };

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'calendar'

  // Modals state
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [rsvpEventId, setRsvpEventId] = useState(null);

  // Stop Lenis background page scrolling whenever a modal is open
  useEffect(() => {
    if (selectedEventId || rsvpEventId) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedEventId, rsvpEventId]);

  const handleFilterVenueEvents = (venueId) => {
    setSelectedCategory('all');
    setSelectedFaculty('all');
    setSelectedFormat('all');
    setSearchQuery('');
    setSelectedVenue(venueId);
    setCurrentView('web');
    setTimeout(() => document.getElementById('evenimente')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };
  const [favorites, setFavorites] = useState(['evt-1']);

  // High-performance 60fps Smooth Scroll with Lenis + GSAP Ticker synchronization
  useEffect(() => {
    if (showIntro) return;

    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });
      lenisRef.current = lenis;

      // Synchronize Lenis with GSAP ticker for locked 60fps / 120fps compositor rendering
      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      };
    } catch (err) {
      console.warn('Lenis init warning:', err);
    }
  }, [showIntro]);

  // Featured Event (Hackathon)
  const featuredEvent = useMemo(() => {
    return events.find(e => e.featured) || events[0];
  }, [events]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Category filter
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
      // Faculty filter
      if (selectedFaculty !== 'all' && evt.faculty !== selectedFaculty) return false;
      // Venue filter
      if (selectedVenue !== 'all' && evt.venueId !== selectedVenue) return false;
      // Format filter
      if (selectedFormat !== 'all' && evt.format !== selectedFormat) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleRo = (evt.title.ro || '').toLowerCase();
        const titleEn = (evt.title.en || '').toLowerCase();
        const descRo = (evt.description.ro || '').toLowerCase();
        const descEn = (evt.description.en || '').toLowerCase();
        const matches = titleRo.includes(q) || titleEn.includes(q) || descRo.includes(q) || descEn.includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [events, selectedCategory, selectedFaculty, selectedVenue, selectedFormat, searchQuery]);

  // GSAP Card Stagger Animation using @gsap/react
  const eventsContainerRef = useRef(null);
  useGSAP(() => {
    if (currentView === 'web' && viewMode === 'grid') {
      gsap.from('.event-card', {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out'
      });
    }
  }, { scope: eventsContainerRef, dependencies: [filteredEvents, viewMode, currentView] });

  // Toggle Favorite
  const handleToggleFavorite = (id) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedFaculty('all');
    setSelectedVenue('all');
    setSelectedFormat('all');
    setSearchQuery('');
  };

  const selectedEventObj = useMemo(() => {
    return events.find(e => e.id === selectedEventId) || null;
  }, [events, selectedEventId]);

  const rsvpEventObj = useMemo(() => {
    return events.find(e => e.id === rsvpEventId) || null;
  }, [events, rsvpEventId]);

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      {/* Ambient Glassmorphism Refraction Light Field */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-28 -left-24 w-[480px] h-[480px] rounded-full bg-[#005A9C]/20 dark:bg-amber-400/10 blur-[110px]" />
        <div className="absolute top-[18%] -right-28 w-[520px] h-[520px] rounded-full bg-sky-400/20 dark:bg-white/[0.04] blur-[125px]" />
        <div className="absolute bottom-[-10%] left-[24%] w-[560px] h-[440px] rounded-full bg-amber-300/15 dark:bg-amber-500/8 blur-[130px]" />
      </div>
      
      {/* 3D Cinematic Scroll Intro */}
      {showIntro && (
        <ThreeIntro
          onFinish={() => {
            setShowIntro(false);
          }}
        />
      )}

      {/* Top Header */}
      <Header
        currentView={currentView}
        notifications={store.notifications}
        onMarkAllRead={store.markAllRead}
        onViewChange={setCurrentView}
        role={role}
        onToggleRole={handleToggleRole}
        onOpenReplayIntro={() => {
          sessionStorage.removeItem('unitbv_intro_seen');
          setShowIntro(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] 2xl:max-w-[1320px] w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 relative z-10 space-y-8 sm:space-y-12 min-w-0">
        
        {/* VIEW 1: Web Dashboard */}
        {currentView === 'web' && (
          <>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white">
                {lang === 'ro' ? 'Evenimente în campus' : 'Campus Events'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {lang === 'ro'
                  ? 'Conferințe, ateliere, concerte și competiții organizate în Universitatea Transilvania din Brașov. Înregistrarea se face cu contul instituțional.'
                  : 'Conferences, workshops, concerts, and competitions hosted at Transilvania University of Brașov. Register using your university account.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
              <aside className="glass-surface p-3.5 sm:p-4 space-y-4 sm:space-y-5 lg:sticky lg:top-28 self-start min-w-0 w-full">
                <CategoryFilterBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <FilterToolbar
                  selectedFaculty={selectedFaculty}
                  onFacultyChange={setSelectedFaculty}
                  selectedVenue={selectedVenue}
                  onVenueChange={setSelectedVenue}
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onResetFilters={handleResetFilters}
                />
              </aside>

              <div className="space-y-10 min-w-0">
                <FeaturedEvent
                  event={featuredEvent}
                  onOpenDetails={(id) => setSelectedEventId(id)}
                  onOpenRsvp={(id) => setRsvpEventId(id)}
                />

                <section id="evenimente" ref={eventsContainerRef} className="scroll-mt-32 space-y-4">
                  <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
                    {lang === 'ro' ? 'Următoarele evenimente' : 'Upcoming events'}
                    <span className="ml-2 text-sm font-sans font-normal text-slate-500 dark:text-slate-400">
                      {filteredEvents.length} {t('resultsCount', 'evenimente găsite')}
                    </span>
                  </h2>

                  {filteredEvents.length === 0 ? (
                    <div className="glass-surface p-8 text-center space-y-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {lang === 'ro'
                          ? 'Nu există evenimente programate momentan pentru această selecție / locație.'
                          : 'There are currently no events scheduled for this selection / location.'}
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="btn-outline px-4 py-2 text-xs cursor-pointer"
                      >
                        {lang === 'ro' ? 'Resetează filtrele și vezi toate evenimentele' : 'Reset filters and view all events'}
                      </button>
                    </div>
                  ) : viewMode === 'grid' ? (
                    <div className="space-y-3">
                      {filteredEvents.map(evt => (
                        <EventCard
                          key={evt.id}
                          event={evt}
                          isFavorite={favorites.includes(evt.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onOpenDetails={(id) => setSelectedEventId(id)}
                          onOpenRsvp={(id) => setRsvpEventId(id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <CalendarView
                      events={filteredEvents}
                      onOpenDetails={(id) => setSelectedEventId(id)}
                      onOpenRsvp={(id) => setRsvpEventId(id)}
                    />
                  )}
                </section>

                <CampusInfo myTickets={store.myTickets} events={events} onOpenTicket={(id) => setRsvpEventId(id)} />
              </div>
            </div>
          </>
        )}

        {/* VIEW 1B: Dedicated Locații & Hartă Brașov Panel */}
        {currentView === 'venues' && (
          <div className="space-y-10">
            <BrasovMapPanel events={events} onFilterVenueEvents={handleFilterVenueEvents} />
            <CampusInfo myTickets={store.myTickets} events={events} onOpenTicket={(id) => setRsvpEventId(id)} />
          </div>
        )}

        {/* VIEW 2: Mobile Viewport Simulator */}
        {currentView === 'mobile' && (
          <MobileSimulatorView
            events={events}
            myTickets={store.myTickets}
            questions={store.questions}
            onAsk={store.askQuestion}
            onUpvote={store.upvoteQuestion}
            onOpenDetails={(id) => setSelectedEventId(id)}
            onOpenRsvp={(id) => setRsvpEventId(id)}
            onOpenReplayIntro={() => setShowIntro(true)}
            onToggleRole={handleToggleRole}
            role={role}
          />
        )}

        {currentView === 'organizer' && <OrganizerView store={store} />}

        {/* VIEW 3: UX Documentation & Case Study */}
        {currentView === 'ux-docs' && (
          <UxDocsView />
        )}

      </main>

      {/* Footer */}
      <Footer onViewChange={setCurrentView} />

      {/* Modals */}
      <EventDetailModal
        event={selectedEventObj}
        isOpen={Boolean(selectedEventId)}
        onClose={() => setSelectedEventId(null)}
        onOpenRsvp={(id) => {
          setSelectedEventId(null);
          setRsvpEventId(id);
        }}
        isFavorite={selectedEventId ? favorites.includes(selectedEventId) : false}
        onToggleFavorite={handleToggleFavorite}
        isRegistered={store.myTickets.some(r => r.eventId === selectedEventId)}
        questions={store.questions.filter(q => q.eventId === selectedEventId)}
        onAsk={store.askQuestion}
        onUpvote={store.upvoteQuestion}
      />

      <RsvpModal
        event={rsvpEventObj}
        isOpen={Boolean(rsvpEventId)}
        onClose={() => setRsvpEventId(null)}
        ticket={store.myTickets.find(r => r.eventId === rsvpEventId)}
        onRegister={store.register}
        onCancel={(id) => { store.cancelRegistration(id); setRsvpEventId(null); }}
      />

    </div>
  );
}
