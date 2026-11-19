import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18N } from '../data/i18n.js';
import { EVENT_CATEGORIES } from '../data/events.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('unitbv_lang_preference') || 'ro';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('unitbv_lang_preference', newLang);
  };

  const toggleLang = () => {
    const next = lang === 'ro' ? 'en' : 'ro';
    setLang(next);
  };

  const dict = I18N[lang] || I18N.ro;

  const t = (key, fallback = '') => {
    return dict[key] || fallback || key;
  };

  const getLocalized = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.ro || '';
  };

  const getCategoryBadge = (categoryId) => {
    const isRo = lang === 'ro';
    const cat = EVENT_CATEGORIES.find(c => c.id === categoryId);
    if (!cat) return categoryId ? categoryId.toUpperCase() : '';
    return isRo ? cat.badgeRo : cat.badgeEn;
  };

  const getFormatBadge = (format) => {
    const isRo = lang === 'ro';
    switch (format) {
      case 'physical': return isRo ? 'FIZIC' : 'PHYSICAL';
      case 'hybrid': return isRo ? 'HIBRID' : 'HYBRID';
      case 'online': return isRo ? 'ONLINE' : 'ONLINE';
      default: return format ? format.toUpperCase() : '';
    }
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      toggleLang,
      dict,
      t,
      getLocalized,
      getCategoryBadge,
      getFormatBadge
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
