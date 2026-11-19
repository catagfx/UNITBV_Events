import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const IDENTITATE = 'https://intranet.unitbv.ro/Intranet/Identitate-vizuala';

export function Footer({ onViewChange }) {
  const { lang } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);
  const link = 'text-slate-300 hover:text-white hover:underline underline-offset-2';
  const prototype = (view, label) => (
    <button onClick={() => { onViewChange(view); window.scrollTo({ top: 0 }); }} className={`${link} cursor-pointer`}>{label}</button>
  );

  const columns = [
    [L('Universitate', 'University'), [
      [L('Portal unitbv.ro', 'unitbv.ro Portal'), 'https://www.unitbv.ro'],
      [L('Facultatea IESC', 'IESC Faculty'), 'https://iesc.unitbv.ro'],
      ['Intranet', 'https://intranet.unitbv.ro'],
    ]],
    [L('Identitate vizuală', 'Visual Identity'), [
      [L('Manual de identitate vizuală', 'Brand Identity Manual'), `${IDENTITATE}/Manual-de-identitate vizuala`],
      [L('Fonturi oficiale', 'Official Fonts'), `${IDENTITATE}/Fonturi`],
      [L('Fotografii UNITBV', 'UNITBV Photo Archive'), `${IDENTITATE}/Fotografii-UniTBv`],
    ]],
  ];

  return (
    <footer className="mt-20 bg-[#003C7E] dark:bg-[#0d0d0d] border-t border-transparent dark:border-white/10 text-sm text-slate-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-4">
            <img src="/assets/branding/unitbv-symbol-white.png" alt="UNITBV" className="h-9 w-auto" />
            <span className="h-6 w-px bg-white/30" />
            <img src="/assets/branding/tsg-logo-white.png" alt="Transilvania Star Group" className="h-5 w-auto" />
          </div>
          <p className="max-w-md leading-relaxed">
            {L('Universitatea Transilvania din Brașov', 'Transilvania University of Brașov')}<br />
            B-dul Eroilor nr. 29, 500036 Brașov
          </p>
          <p className="max-w-md leading-relaxed text-slate-400">
            {L(
              'Calendarul evenimentelor este realizat în parteneriat cu Transilvania Star Group.',
              'The university events calendar is developed in partnership with Transilvania Star Group.'
            )}
          </p>
        </div>

        {columns.map(([title, links]) => (
          <div key={title}>
            <h3 className="font-heading text-base font-semibold text-white mb-3">{title}</h3>
            <ul className="space-y-2">
              {links.map(([label, href]) => (
                <li key={label}><a href={href} target="_blank" rel="noreferrer" className={link}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs text-slate-300">
          <p>© 2026 {L('Universitatea Transilvania din Brașov', 'Transilvania University of Brașov')}</p>
          <p className="flex gap-4">
            <span className="text-slate-400">{L('Prototip:', 'Prototype:')}</span>
            {prototype('mobile', L('Aplicație mobilă', 'Mobile App'))}
            {prototype('ux-docs', L('Documentație UX', 'UX Documentation'))}
          </p>
        </div>
      </div>
    </footer>
  );
}
