import React, { useState } from 'react';
import { GitBranch, Users, Layers, Award, CheckCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { UX_DOCS_DATA } from '../data/uxDocsData.js';

export function UxDocsView() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('flows');

  const ds = UX_DOCS_DATA.designSystem;

  return (
    <div className="space-y-8">
      
      {/* UX Architecture Hero Header */}
      <div className="liquid-glass p-6 sm:p-10 rounded-3xl space-y-4">
        <div className="flex items-center space-x-2">
          <span className="glass-subtle text-[#005A9C] dark:text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            UI/UX Case Study
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500 font-semibold">Standarde & Heuristics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          {t('uxDocsTitle', 'Studiu de Caz UI/UX & Arhitectura Sistemului')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t('uxDocsSubtitle', 'Documentație exhaustivă a procesului de design, cercetării utilizatorilor, fluxurilor de navigație pentru mediul web & mobil și sistemului atomic de componente.')}
        </p>

        {/* UX Navigation Tabs */}
        <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/70 dark:border-white/10 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('flows')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer select-none ${
              activeTab === 'flows'
                ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 shadow-md'
                : 'glass-subtle text-slate-700 dark:text-slate-300'
            }`}
          >
            {t('uxTabFlows', 'User Flow Diagrams')}
          </button>
          <button
            onClick={() => setActiveTab('personas')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer select-none ${
              activeTab === 'personas'
                ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 shadow-md'
                : 'glass-subtle text-slate-700 dark:text-slate-300'
            }`}
          >
            {t('uxTabPersonas', 'Personas & Empathy Maps')}
          </button>
          <button
            onClick={() => setActiveTab('designSystem')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer select-none ${
              activeTab === 'designSystem'
                ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 shadow-md'
                : 'glass-subtle text-slate-700 dark:text-slate-300'
            }`}
          >
            {t('uxTabDesignSystem', 'Atomic Design & Tokens')}
          </button>
          <button
            onClick={() => setActiveTab('heuristics')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer select-none ${
              activeTab === 'heuristics'
                ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950 shadow-md'
                : 'glass-subtle text-slate-700 dark:text-slate-300'
            }`}
          >
            {t('uxTabHeuristics', 'Heuristici & Accesibilitate')}
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: USER FLOW DIAGRAMS */}
      {activeTab === 'flows' && (
        <div className="space-y-8">
          {UX_DOCS_DATA.flows.map(flow => (
            <div key={flow.id} className="glass-surface p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  {flow.title[lang] || flow.title.ro}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {flow.description[lang] || flow.description.ro}
                </p>
              </div>

              {/* Visual Flow Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {flow.steps.map((st, i) => (
                  <div key={i} className="p-4 glass-subtle rounded-2xl relative flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#005A9C] dark:text-amber-400 glass-subtle px-2.5 py-0.5 rounded-md">
                        {st.num}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden md:block" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                        {st.title[lang] || st.title.ro}
                      </h4>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 leading-snug">
                        <p><strong className="text-slate-800 dark:text-slate-100">Web:</strong> {st.web[lang] || st.web.ro}</p>
                        <p><strong className="text-[#005A9C] dark:text-amber-400">Mobile:</strong> {st.mobile[lang] || st.mobile.ro}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: PERSONAS & EMPATHY MAPS */}
      {activeTab === 'personas' && (
        <div className="space-y-8">
          {UX_DOCS_DATA.personas.map(p => {
            const roleStr = typeof p.role === 'object' ? (p.role[lang] || p.role.ro) : p.role;
            const quoteStr = typeof p.quote === 'object' ? (p.quote[lang] || p.quote.ro) : p.quote;
            const goalsList = Array.isArray(p.goals) 
              ? p.goals.map(g => (typeof g === 'object' ? (g[lang] || g.ro) : g))
              : [];
            const frustrationsList = Array.isArray(p.frustrations)
              ? p.frustrations.map(f => (typeof f === 'object' ? (f[lang] || f.ro) : f))
              : (Array.isArray(p.painPoints) ? p.painPoints.map(f => (typeof f === 'object' ? (f[lang] || f.ro) : f)) : []);
            
            const empathySays = p.empathy?.says ? (typeof p.empathy.says === 'object' ? (p.empathy.says[lang] || p.empathy.says.ro) : p.empathy.says) : null;
            const empathyThinks = p.empathy?.thinks ? (typeof p.empathy.thinks === 'object' ? (p.empathy.thinks[lang] || p.empathy.thinks.ro) : p.empathy.thinks) : null;
            const empathyDoes = p.empathy?.does ? (typeof p.empathy.does === 'object' ? (p.empathy.does[lang] || p.empathy.does.ro) : p.empathy.does) : null;
            const empathyFeels = p.empathy?.feels ? (typeof p.empathy.feels === 'object' ? (p.empathy.feels[lang] || p.empathy.feels.ro) : p.empathy.feels) : null;

            return (
              <div key={p.id} className="glass-surface p-6 sm:p-8 rounded-3xl space-y-6">
                
                {/* Persona Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={p.avatar} 
                      alt={p.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#005A9C] dark:border-amber-400 shadow-sm shrink-0" 
                    />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                        {p.name} <span className="text-xs text-slate-400 font-normal">({p.age} ani)</span>
                      </h3>
                      <span className="text-xs text-[#005A9C] dark:text-amber-400 font-semibold block mt-0.5">
                        {roleStr}
                      </span>
                    </div>
                  </div>
                  <div className="glass-subtle p-3.5 rounded-2xl max-w-md">
                    <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                      "{quoteStr}"
                    </p>
                  </div>
                </div>

                {/* Goals & Frustrations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Goals */}
                  <div className="p-5 glass-subtle rounded-2xl space-y-2.5">
                    <span className="font-bold text-[#005A9C] dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      Obiective Principale (Goals)
                    </span>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      {goalsList.map((g, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#005A9C] dark:text-amber-400 font-bold">·</span>
                          <span className="leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Frustrations */}
                  <div className="p-5 glass-subtle rounded-2xl space-y-2.5">
                    <span className="font-bold text-[#005A9C] dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      Puncte de Fricțiune (Frustrations)
                    </span>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      {frustrationsList.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#005A9C] dark:text-amber-400 font-bold">·</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empathy Map 4-Quadrant */}
                {p.empathy && (
                  <div className="space-y-3 pt-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block font-heading">
                      Empathy Map · Matrice Cognitivă
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-4 glass-subtle rounded-2xl space-y-1">
                        <span className="font-bold text-[#005A9C] dark:text-amber-400 text-[11px] block">Ce Spune (Says):</span>
                        <p className="text-slate-700 dark:text-slate-300 italic">"{empathySays}"</p>
                      </div>
                      <div className="p-4 glass-subtle rounded-2xl space-y-1">
                        <span className="font-bold text-[#005A9C] dark:text-amber-400 text-[11px] block">Ce Gândește (Thinks):</span>
                        <p className="text-slate-700 dark:text-slate-300 italic">"{empathyThinks}"</p>
                      </div>
                      <div className="p-4 glass-subtle rounded-2xl space-y-1">
                        <span className="font-bold text-[#005A9C] dark:text-amber-400 text-[11px] block">Ce Face (Does):</span>
                        <p className="text-slate-700 dark:text-slate-300">{empathyDoes}</p>
                      </div>
                      <div className="p-4 glass-subtle rounded-2xl space-y-1">
                        <span className="font-bold text-[#005A9C] dark:text-amber-400 text-[11px] block">Ce Simte (Feels):</span>
                        <p className="text-slate-700 dark:text-slate-300">{empathyFeels}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 3: DESIGN SYSTEM & TOKENS */}
      {activeTab === 'designSystem' && (
        <div className="space-y-8">
          {/* Color Palette Tokens */}
          <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Design Tokens: Paleta Cromatică Oficială (UNITBV & TSG)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ds.colors.map(c => (
                <div key={c.name} className="p-4 rounded-2xl glass-subtle space-y-2.5">
                  <div 
                    className="h-14 rounded-xl shadow-inner border border-black/10" 
                    style={{ backgroundColor: c.hex.split('/')[0].trim() }} 
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">{c.name}</span>
                    <span className="font-mono text-[11px] text-[#005A9C] dark:text-amber-400 font-bold block">{c.hex}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight mt-1">{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Hierarchy */}
          <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Ierarhie Tipografică Instituțională (UT Sans - Oficial UNITBV)
            </h3>
            <div className="divide-y divide-slate-200/70 dark:divide-white/10 text-xs">
              {ds.typography.map(ty => (
                <div key={ty.level} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">{ty.level}</span>
                    <span className="text-slate-500 dark:text-slate-400">{ty.font} · {ty.weight} · {ty.size}</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 italic">{ty.usage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing Scale */}
          <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Grilă & Scală de Spațiere (8pt Spatial System)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              {ds.spacingScale.map(s => (
                <div key={s.token} className="p-3 glass-subtle rounded-xl space-y-1">
                  <span className="font-mono font-bold text-xs text-[#005A9C] dark:text-amber-400 block">{s.token}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white block">{s.value}</span>
                  <span className="text-[10px] text-slate-400 block">{s.usage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: HEURISTICS & ACCESSIBILITY AUDIT */}
      {activeTab === 'heuristics' && (
        <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Verificare Heuristici Nielsen Norman & Standarde UI/UX
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Audit de uzabilitate aplicat la crearea platformei digitale pentru Universitatea Transilvania.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ds.heuristics.map((h, i) => (
              <div key={i} className="p-4 glass-subtle rounded-2xl space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#005A9C] dark:bg-amber-400 text-white dark:text-slate-950 font-mono text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{h.rule}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{h.solution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
