// UX Documentation, User Flow diagrams, Personas, Empathy Maps, and Design System Tokens

export const UX_DOCS_DATA = {
  flows: [
    {
      id: 'student-flow',
      title: {
        ro: 'Fluxul Studentului: Descoperire → Înscriere → Bilet QR → Notificări',
        en: 'Student Journey Flow: Discovery → RSVP → QR Pass → Live Notifications'
      },
      description: {
        ro: 'Experiența studentului pe platforma web și aplicația mobilă UNITBV x TSG, optimizată pentru a reduce timpul de înregistrare la sub 30 de secunde și pentru a elimina complet listele fizice pe hârtie.',
        en: 'The student end-to-end journey on Web and Mobile, optimized to reduce registration time below 30 seconds and eliminate paper sign-in rosters.'
      },
      steps: [
        {
          num: '01',
          title: { ro: 'Punct de Intrare & Descoperire', en: 'Entry Point & Discovery' },
          web: { ro: 'Dashboard Desktop: Căutare instantanee (tasta /), filtrare după facultate (ex: IESC) și carusel evenimente recomandate.', en: 'Desktop Dashboard: Instant search (key /), faculty filter (e.g. IESC), and curated campus hero banner.' },
          mobile: { ro: 'Ecran Explorează: Povești campus, swipe orizontal carduri evenimente și push alerts.', en: 'Discover Screen: Campus stories, horizontal swipe event cards, and notification pills.' }
        },
        {
          num: '02',
          title: { ro: 'Inspecție Detalii Eveniment', en: 'Event Details Inspection' },
          web: { ro: 'Drawer / Pagină dedicată: Agendă pe ore, speakeri verificați, hartă interactivă Aula/Corp V și indicator locuri libere.', en: 'Drawer / Dedicated View: Timetable timeline, verified speaker bios, interactive campus transit, and live seat meter.' },
          mobile: { ro: 'Bottom Sheet expansibil: Vizualizare rapidă a orelor, buton sticky „Înregistrează-te” și detalii sală.', en: 'Expandable Bottom Sheet: Fast schedule scan, sticky "Register" CTA, and venue directions.' }
        },
        {
          num: '03',
          title: { ro: 'Înregistrare cu 1 Click', en: '1-Click Registration' },
          web: { ro: 'Modal pre-populat cu contul universitar (@student.unitbv.ro), selectare tip bilet și acord regulament.', en: 'Pre-populated modal with university account (@student.unitbv.ro), ticket type selection, and campus terms.' },
          mobile: { ro: 'Autentificare biometrică / profil student salvat, confirmare imediată.', en: 'Biometric / saved student profile confirmation in one tap.' }
        },
        {
          num: '04',
          title: { ro: 'Generare Bilet Digital QR', en: 'Digital QR Pass Generation' },
          web: { ro: 'Card de acces securizat cu cod QR SVG dinamic, cod alfanumeric (UTBV-2026-XXXX), descărcare PDF și sync Google Calendar.', en: 'Secure pass card with dynamic SVG QR code, alphanumeric ID, PDF download, and Google Calendar sync.' },
          mobile: { ro: 'Biletul este salvat automat în tab-ul „Biletele Mele” și compatibil cu Apple Wallet / Google Wallet.', en: 'Pass is automatically vaulted into "My Passes" tab, ready for offline Apple/Google Wallet export.' }
        },
        {
          num: '05',
          title: { ro: 'Ziua Evenimentului & Check-in', en: 'Day of Event & Check-in' },
          web: { ro: 'Participanții hibrizi accesează stream-ul video și transmit întrebări în live Q&A.', en: 'Hybrid attendees access live stream link and participate via interactive live Q&A.' },
          mobile: { ro: 'Scanare rapidă a codului QR la intrarea în Aula Sergiu Chiriacescu. Validare sub 1 secundă.', en: 'Rapid QR scan at the Sergiu Chiriacescu Auditorium entrance. Sub-second check-in confirmation.' }
        }
      ]
    },
    {
      id: 'organizer-flow',
      title: {
        ro: 'Fluxul Organizatorului: Creare Eveniment → Promovare → Scanare QR → Anunțuri',
        en: 'Organizer Journey Flow: Event Creation → Publishing → QR Check-in → Broadcast'
      },
      description: {
        ro: 'Panoul dedicat echipelor TSG și cadrelor didactice UNITBV pentru administrarea evenimentelor academice și culturale.',
        en: 'The administrative command center for TSG leads and UNITBV faculty to manage campus and cultural events.'
      },
      steps: [
        {
          num: '01',
          title: { ro: 'Creare Eveniment (Wizard 3 Pași)', en: 'Create Event (3-Step Wizard)' },
          web: { ro: 'Introducere date bilingve (RO/EN), alegere amfiteatru (Aula, Rectorat, Corp V), configurare capacitate maximă.', en: 'Bilingual metadata input (RO/EN), campus hall selector (Aula, Rectorate, Building V), capacity thresholds.' },
          mobile: { ro: 'Formular optimizat mobil pentru lansare rapidă a meetup-urilor studențești.', en: 'Mobile-optimized rapid publishing for student meetups and pop-up sessions.' }
        },
        {
          num: '02',
          title: { ro: 'Publicare & Alocare Automată', en: 'Publish & Multi-Channel Distribution' },
          web: { ro: 'Evenimentul apare instantaneu în Dashboard, notificări trimise studenților din facultatea vizată.', en: 'Event appears instantly in Discovery feed; push alerts dispatched to targeted faculty students.' },
          mobile: { ro: 'Banner dedicat în poveștile campusului pe mobil.', en: 'Featured in top story pills across the mobile app.' }
        },
        {
          num: '03',
          title: { ro: 'Monitorizare Înscrieri & Prezență', en: 'Roster Monitoring & Live Check-in' },
          web: { ro: 'Tabel în timp real cu status participanți, filtru pe facultăți, buton de validare QR și export CSV.', en: 'Live attendee roster with attendance status, faculty filtering, manual check-in toggle, and CSV export.' },
          mobile: { ro: 'Scanner QR integrat prin camera telefonului pentru voluntarii de la intrare.', en: 'Integrated camera QR scanner for student volunteers at hall entrance.' }
        },
        {
          num: '04',
          title: { ro: 'Comunicare Live & Anunțuri Urgente', en: 'Live Communication & Broadcast Alerts' },
          web: { ro: 'Trimitere notificări push către toți participanții (ex: „Sesiunea se mută în Amfiteatrul 1”). Moderare întrebări Q&A.', en: 'Push notification broadcast to all registered attendees (e.g. "Session moved to Hall 1"). Q&A moderation.' },
          mobile: { ro: 'Răspunsuri rapide la întrebările din chat direct de pe telefonul coordonatorului.', en: 'Instant replies to student questions directly from organizer mobile device.' }
        }
      ]
    }
  ],

  personas: [
    {
      id: 'persona-1',
      name: 'Alexandru Popa',
      role: { ro: 'Student Anul II, Facultatea de IESC UNITBV', en: '2nd Year Student, Faculty of IESC UNITBV' },
      age: 20,
      avatar: '/assets/images/avatar-1.jpg',
      quote: {
        ro: '„Vreau să aflu din timp despre hackathoane și workshop-uri tech din Brașov fără să trebuiască să caut prin zeci de grupuri de WhatsApp sau aviziere vechi.”',
        en: '“I want to discover hackathons and tech workshops in Brașov in advance without hunting through dozens of WhatsApp groups and old bulletin boards.”'
      },
      goals: [
        { ro: 'Să găsească rapid evenimente tech și de carieră relevante pentru profilul lui.', en: 'Quickly discover tech & career events tailored to his major.' },
        { ro: 'Înscriere instantanee cu adresa universitară și bilet salvat pe telefon.', en: 'Instant 1-click RSVP with university email and mobile pass.' },
        { ro: 'Să poată pune întrebări speakerilor înainte și în timpul prezentărilor.', en: 'Ask speakers questions before and during keynotes via live Q&A.' }
      ],
      frustrations: [
        { ro: 'Informații fragmentate pe afișe tipărite pe holurile universității sau pe site-uri învechite.', en: 'Fragmented info across physical paper posters in hallways or legacy portals.' },
        { ro: 'Formulare lungi pe Google Forms unde nu primea nicio confirmare sau bilet.', en: 'Tedious Google Forms with zero instant confirmation or digital ticket pass.' },
        { ro: 'Lipsa detaliilor clare despre sală, program orar sau acces RATBv.', en: 'Unclear room locations, schedule delays, or lack of transit directions.' }
      ],
      empathy: {
        says: { ro: '„Sper că mai sunt locuri libere la Hackathonul TSG!”', en: '“I hope there are still spots left for the TSG Hackathon!”' },
        thinks: { ro: '„Am nevoie de contacte în industrie și stagii plătite de practică în Brașov.”', en: '“I need industry connections and paid internships here in Brașov.”' },
        does: { ro: 'Folosește telefonul 90% din timp între cursuri; verifică calendarul și notificările.', en: 'Uses smartphone 90% of time between lectures; checks calendar and push alerts.' },
        feels: { ro: 'Entuziasmat de inovație, dar copleșit când evenimentele se suprapun cu orarul.', en: 'Excited by innovation, yet overwhelmed when events clash with lecture schedules.' }
      }
    },
    {
      id: 'persona-2',
      name: 'Conf. Univ. Dr. Elena Munteanu',
      role: { ro: 'Prodecan Cercetare & Coordonator Conferințe Academice', en: 'Vice-Dean for Research & Academic Conference Director' },
      age: 44,
      avatar: '/assets/images/avatar-2.jpg',
      quote: {
        ro: '„Avem nevoie de rigoare academică, o imagine impecabilă în fața oaspeților internaționali și un proces fluid de prezență la Aula Sergiu Chiriacescu.”',
        en: '“We need academic rigor, an impeccable visual identity for international guests, and a friction-free check-in flow at the Sergiu Chiriacescu Auditorium.”'
      },
      goals: [
        { ro: 'Să publice agende academice structurate pe secțiuni paralele și speakeri internaționali.', en: 'Publish structured symposium agendas with parallel tracks and keynote profiles.' },
        { ro: 'Să poată exporta lista verificată a participanților pentru acordarea diplomelor de participare.', en: 'Export verified participant roster for issuing accredited certificates.' },
        { ro: 'Să comunice prompt dacă o sesiune își schimbă sala sau ora de începere.', en: 'Communicate schedule adjustments or room relocations in real-time.' }
      ],
      frustrations: [
        { ro: 'Cozi mari la intrarea în Aulă din cauza listelor printate și a biletelor pe hârtie.', en: 'Long bottlenecks at auditorium doors due to printed paper sign-in sheets.' },
        { ro: 'Dificultăți în monitorizarea numărului real de participanți fizici vs. online.', en: 'Difficulty tracking real turnout between in-person and hybrid attendees.' }
      ],
      empathy: {
        says: { ro: '„Conferința trebuie să respecte standardele de brand ale universității și să fie bilingvă.”', en: '“The conference must respect UNITBV branding standards and be fully bilingual.”' },
        thinks: { ro: '„Vreau ca Universitatea Transilvania să fie percepută ca un pol european de excelență.”', en: '“I want Transilvania University to stand as a European beacon of excellence.”' },
        does: { ro: 'Planifică din timp, verifică fiecare detaliu pe desktop și monitorizează desfășurătorul.', en: 'Plans months ahead, verifies details on desktop, and monitors agenda execution.' },
        feels: { ro: 'Responsabilă pentru reputația facultății și confortul conferențiarilor străini.', en: 'Responsible for faculty prestige and visiting keynote experience.' }
      }
    },
    {
      id: 'persona-3',
      name: 'Radu Teodorescu',
      role: { ro: 'Lider Parteneriate & Evenimente, Transilvania Star Group (TSG)', en: 'Lead Partnerships & Events, Transilvania Star Group (TSG)' },
      age: 31,
      avatar: '/assets/images/avatar-3.jpg',
      quote: {
        ro: '„Colaborarea dintre TSG și UNITBV conectează cei mai buni studenți cu proiecte de anvergură mondială. Experiența lor digitală trebuie să fie impecabilă.”',
        en: '“The TSG x UNITBV partnership bridges top students with world-class engineering projects. Their digital journey must be flawless.”'
      },
      goals: [
        { ro: 'Promovarea hackathoanelor și a stagiilor plătite către studenții calificați.', en: 'Promote hackathons and paid internships to qualified student candidates.' },
        { ro: 'Validare instantanee a biletelor QR la intrare prin scanner mobil.', en: 'Instant check-in of attendees via mobile QR barcode scanner.' },
        { ro: 'Măsurarea impactului: prezență reală, feedback și networking interactiv.', en: 'Measure event ROI: actual attendance rates, live feedback, and talent networking.' }
      ],
      frustrations: [
        { ro: 'Rată de absență (no-show) mare când înscrierea se face pe platforme generice fără reminder.', en: 'High no-show rates on generic platforms lacking push reminders and calendar sync.' },
        { ro: 'Lipsa unui canal de comunicare în timp real cu participanții în timpul maratoanelor tech.', en: 'No real-time announcements channel during 48h tech marathons.' }
      ],
      empathy: {
        says: { ro: '„Trebuie să oferim o experiență de nivel Silicon Valley, adaptată campusului din Brașov.”', en: '“We must deliver a Silicon Valley-grade digital experience rooted in Brașov.”' },
        thinks: { ro: '„Studentul de azi este colegul nostru de echipă de mâine.”', en: '“Today’s student is our team colleague tomorrow.”' },
        does: { ro: 'Rulează rapid pe laptop și mobil, testează funcționalitățile și ține legătura cu mentorii.', en: 'Operates fast on laptop and phone, stresses reliability, coordinates mentors.' },
        feels: { ro: 'Motivat să construiască o comunitate tehnologică vibrantă în Transilvania.', en: 'Driven to foster a vibrant tech ecosystem in Transylvania.' }
      }
    }
  ],

  designSystem: {
    colors: [
      { name: 'UNITBV Royal Navy', hex: '#003C7E', role: 'Culoare primară instituțională UNITBV (Manual Brand)', rgb: '0, 60, 126', usage: 'Header, titluri principale, butoane primare' },
      { name: 'TSG Star Navy', hex: '#0C2442', role: 'Culoare primară partener Transilvania Star Group', rgb: '12, 36, 66', usage: 'Suprafețe hero, carduri premium, footer' },
      { name: 'TSG Star Gold', hex: '#FAD027', role: 'Accent de înalt contrast & energie TSG', rgb: '250, 208, 39', usage: 'Insigne featured, countdown, CTA-uri de conversie' },
      { name: 'UNITBV Cyan Blue', hex: '#288ABA', role: 'Culoare secundară academică UNITBV', rgb: '40, 138, 186', usage: 'Link-uri, tag-uri active, hover states' },
      { name: 'Campus Emerald', hex: '#1DA63F', role: 'Feedback succes, check-in confirmat, locuri libere', rgb: '29, 166, 63', usage: 'Bilete validate, badge-uri de disponibilitate' },
      { name: 'Pure Snow & Off-White', hex: '#FFFFFF / #F8FAFC', role: 'Suprafețe carduri, fundal curat, spațiere generoasă', rgb: '248, 250, 252', usage: 'Fundaluri, containere, delimitare clară' },
      { name: 'Deep Slate Contrast', hex: '#0F172A', role: 'Text principal, contrast WCAG 2.1 AAA (14.2:1)', rgb: '15, 23, 42', usage: 'Titluri, paragrafe, etichete formulare' }
    ],
    typography: [
      { level: 'Display Hero', font: 'UT Sans (Oficial UNITBV)', weight: '700 Bold / Extra', size: '36px - 48px', tracking: '-0.025em', usage: 'Titluri principale hero, spotlight, banner' },
      { level: 'Heading 1 (H1)', font: 'UT Sans (Oficial UNITBV)', weight: '700 Bold', size: '28px - 32px', tracking: '-0.02em', usage: 'Titluri de secțiuni, titluri evenimente detalii' },
      { level: 'Heading 2 (H2)', font: 'UT Sans (Oficial UNITBV)', weight: '700 Bold / 500 Medium', size: '20px - 24px', tracking: '-0.01em', usage: 'Titluri carduri eveniment, titluri modale' },
      { level: 'Heading 3 (H3)', font: 'UT Sans (Oficial UNITBV)', weight: '500 Medium', size: '16px - 18px', tracking: 'normal', usage: 'Subtitluri, etichete categorii, orar agendă' },
      { level: 'Body Regular', font: 'UT Sans (Oficial UNITBV)', weight: '400 Regular / 300 Light', size: '14px - 15px', tracking: 'normal', usage: 'Descrieri, paragrafe, formulare, recenzii' },
      { level: 'Code & Pass ID', font: 'UT Sans (Oficial UNITBV)', weight: '500 Medium, cifre tabulare', size: '12px - 14px', tracking: '0.05em', usage: 'Coduri bilet (UTBV-2026-XXXX), ore exacte, QR badge' }
    ],
    spacingScale: [
      { token: 'space-1', value: '4px', usage: 'Micro-margini, insigne interne' },
      { token: 'space-2', value: '8px', usage: 'Grupuri strânse de elemente, spațiu icon-label' },
      { token: 'space-3', value: '12px', usage: 'Padding intern butoane mici, spațiere tag-uri' },
      { token: 'space-4', value: '16px', usage: 'Padding containere mobile, formulare, spacing bază (8pt grid)' },
      { token: 'space-6', value: '24px', usage: 'Padding carduri desktop, spațiere între grile' },
      { token: 'space-8', value: '32px', usage: 'Distanță între secțiuni interne, headere' },
      { token: 'space-12', value: '48px', usage: 'Spațiere majoră de bloc pe ecran desktop' }
    ],
    heuristics: [
      {
        rule: 'Vizibilitatea Stării Sistemului (Nielsen #1)',
        solution: 'Progress bar în timp real pentru locurile rămase în sală, indicator live de check-in, counter unread la notificări și feedback instant la copiere link.'
      },
      {
        rule: 'Potrivire între Sistem și Lumea Reală (Nielsen #2)',
        solution: 'Locații reale și recunoscute din Brașov (Aula Sergiu Chiriacescu, Rectorat Eroilor, Corpul V Colina), linii exacte de autobuz RATBv și numere de săli.'
      },
      {
        rule: 'Control și Libertate pentru Utilizator (Nielsen #3)',
        solution: 'Resetare rapidă a tuturor filtrelor cu 1 click, închidere modale cu tasta ESC sau click pe fundal, posibilitate de anulare bilet.'
      },
      {
        rule: 'Consistență și Standarde (Nielsen #4)',
        solution: 'Un singur sistem vizual strict: butoane primare cu aceeași rază de rotunjire (12px), umbre cu deplasare reală și blur fin (nu halo-uri plate), text secundar nuanțat din paletă.'
      },
      {
        rule: 'Prevenirea Erorilor (Nielsen #5)',
        solution: 'Validare în timp real a emailului universitar (@unitbv.ro sau format valid), confirmare vizuală înainte de transmiterea notificărilor push de către organizatori.'
      },
      {
        rule: 'Accesibilitate WCAG 2.1 AA & Contrast Ridicat',
        solution: 'Raport de contrast minim de 4.5:1 pentru text normal și peste 10:1 pentru titluri pe suprafețe albastre/aurii; ținte tactile de minim 44x44px pe mobil; suport complet pentru navigare din tastatură.'
      }
    ]
  }
};
