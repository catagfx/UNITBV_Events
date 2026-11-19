import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import QRCode from 'qrcode';
import { X } from 'lucide-react';
import { UNITBV_ACADEMIC_CATALOG } from '../data/unitbvAcademicData.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { CURRENT_USER } from '../store.js';

const field = 'w-full h-10 glass-input rounded-lg px-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none';
const selectField = `${field} truncate pr-7 cursor-pointer`;
const label = 'block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 truncate';

const ROMAN_YEARS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// Opens on the form, or straight on the ticket when the student is already registered (`ticket`).
export function RsvpModal({ event, isOpen, onClose, ticket, onRegister, onCancel }) {
  const { lang, getLocalized } = useLanguage();
  const L = (ro, en) => (lang === 'ro' ? ro : en);

  const [name] = useState(CURRENT_USER.name);
  const [email] = useState(CURRENT_USER.email);
  const [facultyId, setFacultyId] = useState('iesc');
  const [programKey, setProgramKey] = useState('licenta_if');
  const [specialization, setSpecialization] = useState(
    UNITBV_ACADEMIC_CATALOG[0].programs.licenta_if.specializations[0].name
  );
  const [studyYear, setStudyYear] = useState(2);

  const [error, setError] = useState('');
  const [qr, setQr] = useState('');

  useEffect(() => {
    if (ticket) QRCode.toDataURL(ticket.ticketCode, { margin: 1, width: 200 }).then(setQr);
    else setQr('');
  }, [ticket]);

  const selectedFacultyObj = UNITBV_ACADEMIC_CATALOG.find(f => f.id === facultyId) || UNITBV_ACADEMIC_CATALOG[0];
  const programEntries = Object.entries(selectedFacultyObj.programs);
  const activeProgramKey = selectedFacultyObj.programs[programKey] ? programKey : programEntries[0][0];
  const activeProgramObj = selectedFacultyObj.programs[activeProgramKey];
  const specializationsList = activeProgramObj.specializations;
  const activeSpecObj = specializationsList.find(s => s.name === specialization) || specializationsList[0];
  const maxYears = activeSpecObj.years;
  const activeYear = Math.min(studyYear, maxYears);

  const handleFacultyChange = (e) => {
    const newFacId = e.target.value;
    const facObj = UNITBV_ACADEMIC_CATALOG.find(f => f.id === newFacId) || UNITBV_ACADEMIC_CATALOG[0];
    const nextProgKey = facObj.programs[programKey] ? programKey : Object.keys(facObj.programs)[0];
    const nextSpec = facObj.programs[nextProgKey].specializations[0];
    setFacultyId(newFacId);
    setProgramKey(nextProgKey);
    setSpecialization(nextSpec.name);
    setStudyYear(prev => Math.min(prev, nextSpec.years));
  };

  const handleProgramChange = (e) => {
    const nextProgKey = e.target.value;
    const progObj = selectedFacultyObj.programs[nextProgKey];
    const nextSpec = progObj.specializations[0];
    setProgramKey(nextProgKey);
    setSpecialization(nextSpec.name);
    setStudyYear(prev => Math.min(prev, nextSpec.years));
  };

  const handleSpecializationChange = (e) => {
    const nextSpecName = e.target.value;
    const specObj = specializationsList.find(s => s.name === nextSpecName) || specializationsList[0];
    setSpecialization(specObj.name);
    setStudyYear(prev => Math.min(prev, specObj.years));
  };

  if (!event) return null;

  const submit = (e) => {
    e.preventDefault();
    const facLabel = getLocalized(selectedFacultyObj.name);
    const progLabel = getLocalized(activeProgramObj.label).split(' (')[0];
    const yearLabel = `${L('Anul', 'Year')} ${ROMAN_YEARS[activeYear - 1]}`;
    const fullAcademicInfo = `${facLabel} · ${activeSpecObj.name} (${progLabel}, ${yearLabel})`;

    const ok = onRegister(event.id, {
      name,
      email,
      faculty: fullAcademicInfo,
      facultyId,
      program: progLabel,
      specialization: activeSpecObj.name,
      studyYear: yearLabel
    });
    setError(ok ? '' : L('Evenimentul nu mai are locuri disponibile.', 'This event is full.'));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) { setError(''); onClose(); } }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 modal-backdrop" />
        <Dialog.Content
          data-lenis-prevent
          data-lenis-prevent-wheel
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
          aria-describedby={undefined}
        >
          <div className="relative w-full max-w-xl glass-modal rounded-2xl p-6 my-auto">
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-1.5 rounded-lg glass-subtle text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white cursor-pointer" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            <p className="text-xs text-slate-500 dark:text-slate-400">{getLocalized(event.dateDisplay)}</p>
            <Dialog.Title className="mt-1 pr-8 font-heading text-xl font-semibold text-slate-900 dark:text-white">
              {getLocalized(event.title)}
            </Dialog.Title>

            {ticket ? (
              <div className="mt-5 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {L('Ești înscris. Prezintă codul la intrare.', 'You are registered. Show this code at the entrance.')}
                </p>
                <div className="mt-4 inline-block p-3 bg-white rounded-lg border border-slate-200">
                  {qr && <img src={qr} alt={`QR ${ticket.ticketCode}`} className="w-44 h-44" />}
                </div>
                <p className="mt-3 font-medium text-slate-900 dark:text-white">{ticket.name}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">{ticket.faculty}</p>
                <p className="mt-1 text-sm tabular-nums font-semibold text-[#005A9C] dark:text-amber-400">{ticket.ticketCode}</p>
                <div className="mt-5 flex gap-3">
                  <button onClick={onClose} className="btn-primary flex-1 py-2.5 text-sm cursor-pointer">
                    {L('Închide', 'Close')}
                  </button>
                  <button
                    onClick={() => onCancel(ticket.id)}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-lg glass-subtle text-slate-700 dark:text-slate-200 hover:border-red-500 hover:text-red-500 cursor-pointer"
                  >
                    {L('Anulează înscrierea', 'Cancel registration')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label className={label}>{L('Nume și prenume (cont instituțional)', 'Full name (university account)')}</label>
                  <input readOnly value={name} className={field} />
                </div>
                <div>
                  <label className={label}>{L('Email instituțional', 'University email')}</label>
                  <input readOnly type="email" value={email} className={field} />
                </div>

                {/* Symmetrical 2x2 Grid (2 Columns x 2 Rows) for the 4 Official Academic Dropdowns */}
                <div id="rsvp-dropdowns-grid" className="grid grid-cols-2 gap-3.5 pt-1">
                  {/* 1. Facultate (All 18 UNITBV Faculties) */}
                  <div className="min-w-0">
                    <label htmlFor="rsvp-faculty-select" className={label}>
                      {L('Facultate', 'Faculty')}
                    </label>
                    <select
                      id="rsvp-faculty-select"
                      value={facultyId}
                      onChange={handleFacultyChange}
                      className={selectField}
                    >
                      {UNITBV_ACADEMIC_CATALOG.map(fac => (
                        <option key={fac.id} value={fac.id}>
                          {getLocalized(fac.name)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Program de studii (Licență IF / ID-IFR / Masterat / Doctorat) */}
                  <div className="min-w-0">
                    <label htmlFor="rsvp-program-select" className={label}>
                      {L('Program de studii', 'Study program')}
                    </label>
                    <select
                      id="rsvp-program-select"
                      value={activeProgramKey}
                      onChange={handleProgramChange}
                      className={selectField}
                    >
                      {programEntries.map(([key, prog]) => (
                        <option key={key} value={key}>
                          {getLocalized(prog.label)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Specializare (Official specializations of the chosen Faculty & Study Program) */}
                  <div className="min-w-0">
                    <label htmlFor="rsvp-specialization-select" className={label}>
                      {L('Specializare', 'Specialization')}
                    </label>
                    <select
                      id="rsvp-specialization-select"
                      value={activeSpecObj.name}
                      onChange={handleSpecializationChange}
                      className={selectField}
                    >
                      {specializationsList.map(spec => (
                        <option key={spec.name} value={spec.name}>
                          {spec.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. An universitar (1..N matching the exact accredited duration of the chosen specialization) */}
                  <div className="min-w-0">
                    <label htmlFor="rsvp-year-select" className={label}>
                      {L('An universitar', 'Academic year')}
                    </label>
                    <select
                      id="rsvp-year-select"
                      value={activeYear}
                      onChange={(e) => setStudyYear(Number(e.target.value))}
                      className={selectField}
                    >
                      {Array.from({ length: maxYears }, (_, idx) => idx + 1).map(yr => (
                        <option key={yr} value={yr}>
                          {L(`Anul ${ROMAN_YEARS[yr - 1]} (2026–2027)`, `Year ${ROMAN_YEARS[yr - 1]} (2026–2027)`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                <button type="submit" className="btn-primary w-full py-2.5 text-sm cursor-pointer mt-2">
                  {L('Confirmă înscrierea', 'Confirm registration')}
                </button>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
