import React, { useRef, useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Search, Moon, Sun, Monitor, Check, Bell, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export function Header({
  currentView,
  onViewChange,
  role,
  onToggleRole,
  onOpenReplayIntro,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkAllRead
}) {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  const searchInputRef = useRef(null);
  const compactSearchRef = useRef(null);
  const [compactSearchOpen, setCompactSearchOpen] = useState(false);

  // Press "/" anywhere outside an input to focus the visible search bar
  useEffect(() => {
    const onKeyDown = (e) => {
      const el = document.activeElement;
      const tag = el?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT' && !el?.isContentEditable) {
        e.preventDefault();
        onViewChange('web');
        if (window.innerWidth >= 1280) {
          searchInputRef.current?.focus();
        } else {
          setCompactSearchOpen(true);
          setTimeout(() => compactSearchRef.current?.focus(), 40);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onViewChange]);

  const goTo = (id) => {
    onViewChange('web');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  const utilityLink = 'hover:underline underline-offset-2 whitespace-nowrap';
  const activeNav = '!border-[#005A9C] dark:!border-amber-400 text-[#005A9C] dark:text-amber-400';
  const navLink = 'py-4 md:py-5 text-xs lg:text-[13px] xl:text-sm font-semibold text-slate-700 dark:text-slate-200 border-b-2 border-transparent hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap';
  const mobilePill = (active) =>
    `shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
      active
        ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10'
    }`;
  const unread = notifications.filter(n => !n.read).length;
  const themeItem = 'flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none';

  return (
    <header className="sticky top-0 z-40 w-full glass-header">
      {/* Utility strip: UNITBV Blue in Light Mode, Intro Gold in Dark Mode */}
      <div className="bg-[#003C7E] dark:bg-amber-400 text-white dark:text-slate-950 text-[11px] font-medium transition-colors">
        <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-3 sm:px-6 h-8 flex items-center justify-between gap-2 sm:gap-4">
          <span className="truncate font-semibold hidden sm:inline">
            {L('Universitatea Transilvania din Brașov', 'Transilvania University of Brașov')}
          </span>
          <span className="truncate font-semibold sm:hidden">
            UNITBV Brașov
          </span>
          <nav className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a href="https://intranet.unitbv.ro" target="_blank" rel="noreferrer" className={`hidden sm:inline ${utilityLink}`}>Intranet</a>
            <a href="https://www.unitbv.ro" target="_blank" rel="noreferrer" className={`hidden sm:inline ${utilityLink}`}>unitbv.ro</a>
            <button onClick={onOpenReplayIntro} className={`cursor-pointer ${utilityLink}`}>
              <span className="sm:hidden">{L('Intro 3D', '3D Intro')}</span>
              <span className="hidden sm:inline">{t('introReplay', L('Reia Intro 3D', 'Replay 3D Intro'))}</span>
            </button>
            <button id="lang-switch-btn" onClick={toggleLang} className={`cursor-pointer font-bold ${utilityLink}`}>
              {lang === 'ro' ? '🇷🇴 RO' : '🇬🇧 EN'}
            </button>
          </nav>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-[1200px] 2xl:max-w-[1320px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewChange('web');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
        >
          <img src="/assets/branding/unitbv-symbol.png" alt="UNITBV" className="h-7 sm:h-9 w-auto dark:hidden shrink-0" />
          <img src="/assets/branding/unitbv-symbol-white.png" alt="UNITBV" className="h-7 sm:h-9 w-auto hidden dark:block shrink-0" />
          <span className="leading-tight min-w-0">
            <span className="block font-heading text-[14px] sm:text-[16px] xl:text-[17px] font-semibold text-slate-900 dark:text-white truncate">
              {L('Evenimente UNITBV', 'UNITBV Events')}
            </span>
            <span className="hidden xl:block text-[11px] text-slate-500 dark:text-slate-400">
              {L('în parteneriat cu Transilvania Star Group', 'in partnership with Transilvania Star Group')}
            </span>
          </span>
        </a>

        {/* Desktop & Landscape Tablet Primary Navigation (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 self-stretch shrink-0">
          <button onClick={() => goTo('evenimente')} className={`${navLink} ${currentView === 'web' ? activeNav : ''}`}>
            {L('Evenimente', 'Events')}
          </button>
          <button
            onClick={() => {
              onViewChange('venues');
              window.scrollTo({ top: 0 });
            }}
            className={`${navLink} ${currentView === 'venues' ? activeNav : ''}`}
          >
            {L('Locații', 'Venues')}
          </button>
          <button onClick={() => goTo('digital-wallet-section')} className={navLink}>
            {L('Biletele mele', 'My Tickets')}
          </button>
          <button
            onClick={() => {
              onViewChange('mobile');
              window.scrollTo({ top: 0 });
            }}
            className={`${navLink} ${currentView === 'mobile' ? activeNav : ''}`}
          >
            {L('Simulator mobil', 'Mobile Simulator')}
          </button>
          {role === 'organizer' && (
            <button
              onClick={() => {
                onViewChange('organizer');
                window.scrollTo({ top: 0 });
              }}
              className={`${navLink} ${currentView === 'organizer' ? activeNav : ''}`}
            >
              {L('Panou organizator', 'Organiser Panel')}
            </button>
          )}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Inline wide search input on >= xl (1280px+) where full placeholder fits with zero squeeze */}
          <div className="relative hidden xl:block w-64 2xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              ref={searchInputRef}
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchPlaceholder', L('Caută evenimente (Apasă /)...', 'Search events (Press /)...'))}
              className="w-full glass-input rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          {/* Search toggle icon on mobile, tablet & <1280px laptops */}
          <button
            type="button"
            onClick={() => {
              setCompactSearchOpen(prev => {
                const next = !prev;
                if (next) setTimeout(() => compactSearchRef.current?.focus(), 40);
                return next;
              });
            }}
            className={`xl:hidden p-1.5 sm:p-2 rounded-lg glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors cursor-pointer ${
              compactSearchOpen || searchQuery ? 'border-[#005A9C] dark:border-amber-400 text-[#005A9C] dark:text-amber-400' : ''
            }`}
            aria-label={L('Caută evenimente', 'Search events')}
          >
            {compactSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleRole}
            className="px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap"
          >
            {role === 'student' ? t('roleStudent', 'Student') : t('roleOrganizer', 'Organizator')}
          </button>

          <DropdownMenu.Root onOpenChange={(open) => !open && onMarkAllRead()}>
            <DropdownMenu.Trigger asChild>
              <button
                className="relative p-1.5 sm:p-2 rounded-lg glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors focus:outline-none cursor-pointer"
                aria-label="Notificări"
              >
                <Bell className="w-4 h-4" />
                {unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#005A9C] dark:bg-amber-400 text-white dark:text-slate-950 text-[10px] font-semibold flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={6}
                className="w-[min(320px,calc(100vw-24px))] max-h-96 overflow-y-auto glass-modal rounded-xl z-50 divide-y divide-slate-200/50 dark:divide-white/10"
              >
                {notifications.length === 0 && (
                  <p className="p-4 text-sm text-slate-500">{L('Nu ai notificări.', 'No notifications.')}</p>
                )}
                {notifications.map(n => (
                  <div key={n.id} className="p-3 text-sm">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {n.from} · {n.time}{!n.read && (lang === 'ro' ? ' · nou' : ' · new')}
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                    <p className="text-slate-600 dark:text-slate-300">{n.body}</p>
                  </div>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="p-1.5 sm:p-2 rounded-lg glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 transition-colors focus:outline-none cursor-pointer"
                aria-label="Theme"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[140px] glass-modal rounded-xl p-1 z-50 text-xs font-medium text-slate-700 dark:text-slate-200"
                sideOffset={6}
                align="end"
              >
                {[
                  ['light', Sun, t('themeLight', 'Luminos')],
                  ['dark', Moon, t('themeDark', 'Întunecat')],
                  ['system', Monitor, t('themeSystem', 'Sistem')]
                ].map(([id, Icon, label]) => (
                  <DropdownMenu.Item key={id} onClick={() => setTheme(id)} className={themeItem}>
                    <span className="flex items-center gap-2"><Icon className="w-3.5 h-3.5" /> {label}</span>
                    {theme === id && <Check className="w-3.5 h-3.5 text-[#005A9C] dark:text-amber-400" />}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Expandable Search Bar for Mobile, Tablet & Laptops < 1280px */}
      {(compactSearchOpen || Boolean(searchQuery)) && (
        <div className="xl:hidden border-t border-slate-200/70 dark:border-white/10 px-3 sm:px-6 py-2 max-w-[1200px] mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              ref={compactSearchRef}
              id="compact-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onViewChange('web');
                onSearchChange(e.target.value);
              }}
              placeholder={t('searchPlaceholder', L('Caută evenimente (Apasă /)...', 'Search events (Press /)...'))}
              className="w-full glass-input rounded-lg pl-9 pr-8 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                aria-label="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile & Portrait Tablet Navigation Strip (< 1024px so all 5 tabs fit cleanly) */}
      <nav
        aria-label={L('Navigare mobilă', 'Mobile navigation')}
        className="lg:hidden border-t border-slate-200/70 dark:border-white/10 px-3 sm:px-6 py-1.5 max-w-[1200px] mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none"
      >
        <button onClick={() => goTo('evenimente')} className={mobilePill(currentView === 'web')}>
          {L('Evenimente', 'Events')}
        </button>
        <button
          onClick={() => {
            onViewChange('venues');
            window.scrollTo({ top: 0 });
          }}
          className={mobilePill(currentView === 'venues')}
        >
          {L('Locații', 'Venues')}
        </button>
        <button onClick={() => goTo('digital-wallet-section')} className={mobilePill(false)}>
          {L('Biletele mele', 'My Tickets')}
        </button>
        <button
          onClick={() => {
            onViewChange('mobile');
            window.scrollTo({ top: 0 });
          }}
          className={mobilePill(currentView === 'mobile')}
        >
          {L('Simulator mobil', 'Mobile')}
        </button>
        {role === 'organizer' && (
          <button
            onClick={() => {
              onViewChange('organizer');
              window.scrollTo({ top: 0 });
            }}
            className={mobilePill(currentView === 'organizer')}
          >
            {L('Panou organizator', 'Organiser')}
          </button>
        )}
      </nav>
    </header>
  );
}
