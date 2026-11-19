// Data store for UNITBV & TSG University Event Management Platform
// Bilingual event data, schedules, speakers, venues, and attendees

export const EVENT_CATEGORIES = [
  { id: 'all', ro: 'Toate Evenimentele', en: 'All Events', badgeRo: 'TOATE', badgeEn: 'ALL', icon: 'sparkles' },
  { id: 'conferinte', ro: 'Conferințe Academice', en: 'Academic Conferences', badgeRo: 'CONFERINȚE', badgeEn: 'CONFERENCES', icon: 'graduation-cap' },
  { id: 'hackathons', ro: 'Hackathoane & Tech', en: 'Hackathons & Tech', badgeRo: 'HACKATHOANE', badgeEn: 'HACKATHONS', icon: 'terminal' },
  { id: 'cultura', ro: 'Serate Culturale & Muzică', en: 'Culture & Music Evenings', badgeRo: 'CULTURĂ', badgeEn: 'CULTURE', icon: 'music' },
  { id: 'cariera', ro: 'Târguri de Carieră & Joburi', en: 'Career Fairs & Internships', badgeRo: 'CARIERĂ', badgeEn: 'CAREER', icon: 'briefcase' },
  { id: 'workshops', ro: 'Workshop-uri & Practică', en: 'Workshops & Hands-On', badgeRo: 'WORKSHOPS', badgeEn: 'WORKSHOPS', icon: 'wrench' }
];

export const FACULTIES = [
  { id: 'all', ro: 'Toate Facultățile (18)', en: 'All Faculties (18)' },
  { id: 'iesc', ro: 'Facultatea de Inginerie Electrică și Știința Calculatoarelor (IESC)', en: 'Faculty of Electrical Engineering and Computer Science (IESC)' },
  { id: 'mi', ro: 'Facultatea de Matematică și Informatică', en: 'Faculty of Mathematics and Computer Science' },
  { id: 'seaa', ro: 'Facultatea de Științe Economice și Administrarea Afacerilor (SEAA)', en: 'Faculty of Economic Sciences and Business Administration (SEAA)' },
  { id: 'mecanica', ro: 'Facultatea de Inginerie Mecanică', en: 'Faculty of Mechanical Engineering' },
  { id: 'itmi', ro: 'Facultatea de Inginerie Tehnologică și Management Industrial', en: 'Faculty of Technological Engineering and Industrial Management' },
  { id: 'dpdm', ro: 'Facultatea de Design de Produs și Mediu', en: 'Faculty of Product Design and Environment' },
  { id: 'dmil', ro: 'Facultatea de Design de Mobilier și Inginerie a Lemnului', en: 'Faculty of Furniture Design and Wood Engineering' },
  { id: 'silvicultura', ro: 'Facultatea de Silvicultură și Exploatări Forestiere', en: 'Faculty of Silviculture and Forestry' },
  { id: 'constructii', ro: 'Facultatea de Construcții', en: 'Faculty of Civil Engineering' },
  { id: 'sim', ro: 'Facultatea de Știința și Ingineria Materialelor', en: 'Faculty of Materials Science and Engineering' },
  { id: 'at', ro: 'Facultatea de Alimentație și Turism', en: 'Faculty of Food and Tourism' },
  { id: 'medicina', ro: 'Facultatea de Medicină', en: 'Faculty of Medicine' },
  { id: 'drept', ro: 'Facultatea de Drept', en: 'Faculty of Law' },
  { id: 'litere', ro: 'Facultatea de Litere', en: 'Faculty of Letters' },
  { id: 'pse', ro: 'Facultatea de Psihologie și Științele Educației', en: 'Faculty of Psychology and Education Sciences' },
  { id: 'sc', ro: 'Facultatea de Sociologie și Comunicare', en: 'Faculty of Sociology and Communication' },
  { id: 'efsm', ro: 'Facultatea de Educație Fizică și Sporturi Montane', en: 'Faculty of Physical Education and Mountain Sports' },
  { id: 'muzica', ro: 'Facultatea de Muzică', en: 'Faculty of Music' }
];

export const VENUES = [
  {
    id: 'aula',
    name: 'Aula Sergiu Chiriacescu - UNITBV',
    address: 'Str. Iuliu Maniu 41A, Brașov',
    busLines: 'RATBv: 1, 4, 31, 34, 41 (Stația Primărie / Livada Poștei)',
    coords: '45.6495° N, 25.5975° E',
    hallCapacity: 550,
    wifi: 'Eduroam & UNITBV-Guest (1 Gbps)',
    parking: 'Parcare rezervată Aula & Subteran Regina Maria'
  },
  {
    id: 'rectorat',
    name: 'Rectoratul UNITBV (Sala Senatului)',
    address: 'B-dul Eroilor 25, Brașov',
    busLines: 'RATBv: 1, 2, 6, 17, 34 (Stația Teatrul Dramatic)',
    coords: '45.6450° N, 25.5910° E',
    hallCapacity: 250,
    wifi: 'Eduroam & UNITBV-Staff',
    parking: 'Curtea interioară a Rectoratului'
  },
  {
    id: 'colina',
    name: 'Colina Universității (Corpul V & Arena)',
    address: 'Str. Universității 1, Brașov',
    busLines: 'RATBv: 3, 7, 22 (Stația Colina)',
    coords: '45.6580° N, 25.5820° E',
    hallCapacity: 300,
    wifi: 'Eduroam & Colina-TechNet',
    parking: 'Parcare amplă Colina Universității'
  },
  {
    id: 'centru-multicultural',
    name: 'Centrul Multicultural al Universității Transilvania',
    address: 'B-dul Eroilor 29 (Rectorat, Aripa de Nord), Brașov',
    busLines: 'RATBv: 1, 2, 6, 31 (Stația Patria)',
    coords: '45.6455° N, 25.5925° E',
    hallCapacity: 120,
    wifi: 'Eduroam Cultural',
    parking: 'Parcare Eroilor / Parcul Central'
  },
  {
    id: 'icdt',
    name: 'Institutul CDI al UNITBV (ICDT)',
    address: 'Str. Institutului 10, Brașov',
    busLines: 'RATBv: 24, 28 (Stația Institutul de Cercetare)',
    coords: '45.6720° N, 25.5550° E',
    hallCapacity: 180,
    wifi: 'Eduroam R&D Gigabit',
    parking: 'Parcare dedicată Campus ICDT'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    category: 'hackathons',
    faculty: 'iesc',
    featured: true,
    title: {
      ro: 'Hackathon UNITBV x TSG 2026: Smart Campus & AI for Students',
      en: 'UNITBV x TSG Hackathon 2026: Smart Campus & AI for Students'
    },
    subtitle: {
      ro: '48 de ore de inovație intensivă, mentorat cu ingineri TSG și premii în valoare de 5.000 EUR.',
      en: '48 hours of intense innovation, mentorship from TSG engineers, and 5,000 EUR prize pool.'
    },
    description: {
      ro: 'Transilvania Star Group (TSG) și Universitatea Transilvania din Brașov unesc comunitatea de studenți și pasionați de tehnologie pentru un maraton de dezvoltare software și hardware. Tematicile ediției 2026 includ: optimizarea vieții de campus, asistenți digitali pentru studenți, eficiență energetică în cămine și mobilitate urbană inteligentă în Brașov. Echipele primesc acces gratuit la cloud, kituri hardware IoT și mentorat dedicat din partea experților TSG.',
      en: 'Transilvania Star Group (TSG) and Transilvania University of Brașov bring together the student and tech community for a 48-hour software and hardware development marathon. 2026 challenge tracks include: smart campus optimization, student AI copilots, dormitory energy efficiency, and intelligent urban mobility in Brașov. Teams receive complimentary cloud credits, IoT hardware kits, and hands-on mentorship from TSG engineers.'
    },
    bannerImage: 'assets/images/hackathon-tech.jpg',
    startDate: '2026-11-28T09:00:00',
    endDate: '2026-11-30T17:00:00',
    dateDisplay: {
      ro: '28 - 30 Noiembrie 2026',
      en: 'November 28 - 30, 2026'
    },
    timeDisplay: {
      ro: '09:00 (Vineri) - 17:00 (Duminică)',
      en: '09:00 AM (Fri) - 05:00 PM (Sun)'
    },
    venueId: 'colina',
    venueRoom: {
      ro: 'Corpul V (Etaj 2) & Colina Arena',
      en: 'Building V (2nd Floor) & Colina Arena'
    },
    format: 'physical',
    organizer: {
      name: 'TSG Engineering & Facultatea IESC UNITBV',
      contact: 'hackathon@tsg.unitbv.ro',
      verified: true
    },
    capacity: 160,
    registeredCount: 142,
    badgeText: {
      ro: 'Locuri aproape epuizate',
      en: 'Almost Sold Out'
    },
    isFree: true,
    tags: ['AI', 'Smart Campus', 'Hackathon', 'TSG Mentors', 'IoT'],
    speakers: [
      {
        name: 'Radu Teodorescu',
        role: { ro: 'Lead System Architect, TSG Group', en: 'Lead System Architect, TSG Group' },
        avatar: '/assets/images/avatar-1.jpg',
        bio: { ro: 'Specialist în arhitecturi cloud distribuite și mentor pentru zeci de echipe studențești.', en: 'Specialist in distributed cloud architectures and mentor to dozens of student teams.' }
      },
      {
        name: 'Conf. Univ. Dr. Elena Munteanu',
        role: { ro: 'Prodecan Cercetare IESC, UNITBV', en: 'Vice-Dean for Research, IESC UNITBV' },
        avatar: '/assets/images/avatar-2.jpg',
        bio: { ro: 'Coordonator de proiecte europene de digitalizare și robotică aplicată.', en: 'Coordinator of European digitalization and applied robotics projects.' }
      },
      {
        name: 'Andrei Moldovan',
        role: { ro: 'Senior UI/UX Director, TSG Digital', en: 'Senior UI/UX Director, TSG Digital' },
        avatar: '/assets/images/avatar-3.jpg',
        bio: { ro: 'Pasionat de Design Systems, accesibilitate și experiențe digitale centrate pe om.', en: 'Passionate about Design Systems, accessibility, and human-centered digital experiences.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Ziua 1 - 28 Noiembrie', en: 'Day 1 - Nov 28' },
        items: [
          { time: '09:00 - 10:00', title: { ro: 'Check-in participanți & Welcome Coffee', en: 'Attendee Check-in & Welcome Coffee' }, room: 'Foaier Corp V' },
          { time: '10:00 - 11:30', title: { ro: 'Ceremonia de Deschidere & Prezentare Teme TSG', en: 'Opening Ceremony & TSG Challenge Reveal' }, room: 'Colina Arena' },
          { time: '12:00', title: { ro: 'Start Coding! Dezvoltare proiecte & Sesiuni de mentorat 1-la-1', en: 'Hacking Begins! Project sprints & 1-on-1 mentorship' }, room: 'Laboratoarele V.II.1 - V.II.6' },
          { time: '19:30 - 20:30', title: { ro: 'Pizza Night & Team Checkpoint 1', en: 'Pizza Night & Team Checkpoint 1' }, room: 'Cafeteria Campus' }
        ]
      },
      {
        day: { ro: 'Ziua 2 - 29 Noiembrie', en: 'Day 2 - Nov 29' },
        items: [
          { time: '09:00 - 10:00', title: { ro: 'Mic dejun & Standup tehnic cu arhitecții TSG', en: 'Breakfast & Technical Standup with TSG Architects' }, room: 'Corpul V' },
          { time: '14:00 - 15:30', title: { ro: 'Workshop: Pitching your MVP to University Stakeholders', en: 'Workshop: Pitching your MVP to University Stakeholders' }, room: 'Sala Conferințe V.10' },
          { time: '20:00', title: { ro: 'Late-Night Coding Sprint & Code Freeze Countdown', en: 'Late-Night Coding Sprint & Code Freeze Countdown' }, room: 'Open Space Lab' }
        ]
      },
      {
        day: { ro: 'Ziua 3 - 30 Noiembrie', en: 'Day 3 - Nov 30' },
        items: [
          { time: '12:00', title: { ro: 'Code Freeze & Încărcare proiecte pe GitHub', en: 'Code Freeze & GitHub Project Submission' }, room: 'Online Portal' },
          { time: '13:00 - 15:30', title: { ro: 'Sesiune de Demo & Jurizare Live în fața juriului TSG x UNITBV', en: 'Live Demos & Judging before TSG x UNITBV Panel' }, room: 'Colina Arena' },
          { time: '16:00 - 17:00', title: { ro: 'Gala de Premiere & Networking Cocktail', en: 'Award Ceremony & Networking Cocktail' }, room: 'Colina Lounge' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Cine poate participa la hackathon?', en: 'Who can register for this hackathon?' },
        a: { ro: 'Toți studenții, masteranzii și doctoranzii Universității Transilvania din Brașov, precum și colaboratori externi pasionați de tech.', en: 'All undergraduate, master, and doctoral students of Transilvania University of Brașov, as well as external tech enthusiasts.' }
      },
      {
        q: { ro: 'Ce primesc participanții?', en: 'What do attendees receive?' },
        a: { ro: 'Kit de bun venit TSG, acces gratuit la mese și băuturi pe durata celor 48h, credite cloud AWS/GCP, bilet oficial digital și diplomă recunoscută.', en: 'TSG welcome kit, free meals & refreshments for 48h, AWS/GCP cloud credits, official digital pass, and accredited certificate.' }
      }
    ]
  },
  {
    id: 'evt-2',
    category: 'conferinte',
    faculty: 'iesc',
    featured: false,
    title: {
      ro: 'Conferința Internațională de Inovare și Tehnologie Brașov (TechTrans 2026)',
      en: 'Brașov International Innovation & Technology Conference (TechTrans 2026)'
    },
    subtitle: {
      ro: 'Peste 300 de cercetători, lideri din industrie și cadre didactice dezbat viitorul AI și roboticii.',
      en: 'Over 300 researchers, industry leaders, and faculty debate the frontier of AI and robotics.'
    },
    description: {
      ro: 'Ediția a VIII-a a conferinței anuale TechTrans reunește la Aula Sergiu Chiriacescu specialiști de renume mondial din inginerie, inteligență artificială aplicată, sisteme cyber-fizice și sustenabilitate. Lucrările acceptate vor fi indexate în baze de date internaționale (IEEE / Springer). Evenimentul oferă o punte directă între cercetarea fundamentală din UNITBV și soluțiile industriale dezvoltate de TSG.',
      en: 'The 8th annual TechTrans conference convenes at the Sergiu Chiriacescu Auditorium world-renowned researchers in applied AI, cyber-physical systems, and sustainability. Accepted papers will be indexed in international databases (IEEE / Springer). The symposium bridges academic discoveries at UNITBV with industrial scale-up at TSG.'
    },
    bannerImage: 'assets/images/aula-campus.jpg',
    startDate: '2026-11-24T09:30:00',
    endDate: '2026-11-24T18:00:00',
    dateDisplay: {
      ro: '24 Noiembrie 2026',
      en: 'November 24, 2026'
    },
    timeDisplay: {
      ro: '09:30 - 18:00',
      en: '09:30 AM - 06:00 PM'
    },
    venueId: 'aula',
    venueRoom: {
      ro: 'Amfiteatrul Mare „Sergiu Chiriacescu”',
      en: 'Great Auditorium „Sergiu Chiriacescu”'
    },
    format: 'hybrid',
    organizer: {
      name: 'Departamentul Cercetare UNITBV & TSG Labs',
      contact: 'techtrans@unitbv.ro',
      verified: true
    },
    capacity: 350,
    registeredCount: 288,
    badgeText: {
      ro: 'Conferință Hibridă',
      en: 'Hybrid Symposium'
    },
    isFree: true,
    tags: ['IEEE', 'Research', 'AI & Robotics', 'Keynote', 'Publications'],
    speakers: [
      {
        name: 'Prof. Univ. Dr. Ing. Ioan Abrudan',
        role: { ro: 'Rector, Universitatea Transilvania din Brașov', en: 'Rector, Transilvania University of Brașov' },
        avatar: '/assets/images/avatar-4.jpg',
        bio: { ro: 'Deschiderea oficială și viziunea strategică asupra polului universitar de inovație Brașov.', en: 'Keynote opening and strategic vision on the Brașov academic innovation hub.' }
      },
      {
        name: 'Dr. Sarah Van Der Bilt',
        role: { ro: 'Senior Director of Applied AI, EurAI Consortium', en: 'Senior Director of Applied AI, EurAI Consortium' },
        avatar: '/assets/images/avatar-5.jpg',
        bio: { ro: 'Pionier în modele generative sustenabile și calcul de înaltă performanță.', en: 'Pioneer in sustainable generative models and high-performance computing.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Program Conferință', en: 'Conference Schedule' },
        items: [
          { time: '09:30 - 10:15', title: { ro: 'Plenară inaugurală & Discursul conducerii UNITBV & TSG', en: 'Inaugural Plenary & UNITBV & TSG Executive Address' }, room: 'Aula Mare' },
          { time: '10:30 - 12:30', title: { ro: 'Keynote Session: Edge AI & Smart Mobility in Europe', en: 'Keynote Session: Edge AI & Smart Mobility in Europe' }, room: 'Aula Mare' },
          { time: '12:30 - 14:00', title: { ro: 'Pauză de prânz & Expoziție de postere științifice', en: 'Lunch Break & Scientific Poster Exhibition' }, room: 'Foaierul Aulei' },
          { time: '14:00 - 16:30', title: { ro: 'Track-uri paralele: Secțiunea Software & Secțiunea Hardware', en: 'Parallel Tracks: Software Section & Hardware Section' }, room: 'Sălile UI1 & UI2' },
          { time: '17:00 - 18:00', title: { ro: 'Panel de încheiere: Oportunități de granturi universitare', en: 'Closing Panel: University R&D Grant Opportunities' }, room: 'Aula Mare' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Se acordă certificat de participare?', en: 'Is a certificate of attendance provided?' },
        a: { ro: 'Da, toți participanții care fac check-in cu biletul QR generat pe platformă primesc certificatul oficial digital.', en: 'Yes, all attendees who scan their digital QR ticket at check-in receive an official accredited digital certificate.' }
      }
    ]
  },
  {
    id: 'evt-3',
    category: 'cultura',
    faculty: 'muzica',
    featured: false,
    title: {
      ro: 'Serata Culturală a Aulei: Dialoguri Muzicale & Seară Clasică de Toamnă',
      en: 'Aula Cultural Evening: Musical Dialogues & Autumn Classical Gala'
    },
    subtitle: {
      ro: 'Orchestra de Cameră a Facultății de Muzică UNITBV într-un concert simfonic excepțional.',
      en: 'The Chamber Orchestra of the UNITBV Faculty of Music in an extraordinary symphonic concert.'
    },
    description: {
      ro: 'Centrul Muzical al Universității Transilvania vă invită la o seară festivă de armonie și măiestrie artistică. Repertoriul include capodopere de Enescu, Mozart și Ceaikovski, interpretate de studenții premiați și cadrele didactice ale Facultății de Muzică. Intrarea este gratuită pentru întreaga comunitate academică și brașoveană, pe baza rezervării locului prin platforma digitală TSG x UNITBV.',
      en: 'The Music Center of Transilvania University invites the community to an evening of symphony and classical craft. The repertoire features masterpieces by Enescu, Mozart, and Tchaikovsky, performed by award-winning students and faculty members. Admission is complimentary for university members and the public upon reservation via this platform.'
    },
    bannerImage: 'assets/images/concert-aula.jpg',
    startDate: '2026-12-04T19:00:00',
    endDate: '2026-12-04T21:30:00',
    dateDisplay: {
      ro: '04 Decembrie 2026',
      en: 'December 04, 2026'
    },
    timeDisplay: {
      ro: '19:00 - 21:30',
      en: '07:00 PM - 09:30 PM'
    },
    venueId: 'aula',
    venueRoom: {
      ro: 'Sala de Concerte a Aulei Universității',
      en: 'Concert Hall of the University Auditorium'
    },
    format: 'physical',
    organizer: {
      name: 'Centrul Muzical UNITBV & TSG Cultural',
      contact: 'evenimente.culturale@unitbv.ro',
      verified: true
    },
    capacity: 400,
    registeredCount: 310,
    badgeText: {
      ro: 'Intrare Liberă cu Rezervare',
      en: 'Free Admission with RSVP'
    },
    isFree: true,
    tags: ['Muzică', 'Cultură', 'Concert Simfonic', 'Enescu', 'Arte'],
    speakers: [
      {
        name: 'Conf. Univ. Dr. Mădălina Rădulescu',
        role: { ro: 'Dirijor & Director Artistic, Centrul Muzical UNITBV', en: 'Conductor & Artistic Director, UNITBV Music Center' },
        avatar: '/assets/images/avatar-6.jpg',
        bio: { ro: 'Dirijoare aclamată pe scenele filarmonicilor din România și Europa centrală.', en: 'Acclaimed conductor across European philharmonic halls.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Program Artistic', en: 'Performance Program' },
        items: [
          { time: '18:30 - 19:00', title: { ro: 'Acces public & Foaier Welcome Reception', en: 'Public Seating & Foyer Welcome Reception' }, room: 'Foaier Aula' },
          { time: '19:00 - 20:00', title: { ro: 'Partea I: Suita simfonică George Enescu & Concertul pentru pian', en: 'Part I: George Enescu Symphonic Suite & Piano Concerto' }, room: 'Sala Mare' },
          { time: '20:00 - 20:20', title: { ro: 'Pauză festivă & Degustare vinuri din podgoriile Brașovului', en: 'Intermission & Transylvanian Wine Tasting' }, room: 'Foaier Corp A' },
          { time: '20:20 - 21:30', title: { ro: 'Partea a II-a: Valsuri și uverturi clasice vieneze', en: 'Part II: Classical Viennese Waltzes and Overtures' }, room: 'Sala Mare' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Există cod vestimentar?', en: 'Is there a dress code?' },
        a: { ro: 'Ținută elegantă / Smart Casual este recomandată pentru seratele de concert ale Aulei.', en: 'Smart Casual / Elegant attire is recommended for Auditorium gala concerts.' }
      }
    ]
  },
  {
    id: 'evt-4',
    category: 'cariera',
    faculty: 'all',
    featured: false,
    title: {
      ro: 'Târgul de Stagii și Carieră UNITBV Connect 2026',
      en: 'UNITBV Connect 2026: Internship & Career Expo'
    },
    subtitle: {
      ro: 'Peste 45 de companii partenere, sute de poziții de practică și interviuri accelerate pe loc.',
      en: 'Over 45 partner companies, hundreds of internship openings, and on-the-spot interviews.'
    },
    description: {
      ro: 'Evenimentul de referință pentru angajabilitatea studenților din Brașov! Transilvania Star Group împreună cu partenerii industriali internaționali (inginerie, IT, economie, medicină, design) oferă oportunități de stagii plătite, burse private și poziții entry-level. Vino cu CV-ul pregătit și scanează QR codurile standurilor pentru a aplica instantaneu!',
      en: 'The definitive career milestone for student employability in Brașov! Transilvania Star Group alongside international industrial partners (engineering, tech, finance, design, healthcare) present paid internships, academic scholarships, and full-time opportunities. Scan booth QR passes with your digital student wallet to submit credentials instantly.'
    },
    bannerImage: 'assets/images/career-fair.jpg',
    startDate: '2026-12-10T10:00:00',
    endDate: '2026-12-10T17:00:00',
    dateDisplay: {
      ro: '10 Decembrie 2026',
      en: 'December 10, 2026'
    },
    timeDisplay: {
      ro: '10:00 - 17:00',
      en: '10:00 AM - 05:00 PM'
    },
    venueId: 'rectorat',
    venueRoom: {
      ro: 'Sala Senatului & Galeriile Rectoratului',
      en: 'Senate Hall & Rectorate Galleries'
    },
    format: 'physical',
    organizer: {
      name: 'Centrul de Carieră UNITBV & TSG Human Capital',
      contact: 'cariera@unitbv.ro',
      verified: true
    },
    capacity: 800,
    registeredCount: 645,
    badgeText: {
      ro: 'Toate Specializările',
      en: 'All Majors Welcome'
    },
    isFree: true,
    tags: ['Carieră', 'Stagii de Practică', 'Joburi TSG', 'Interviuri', 'Networking'],
    speakers: [
      {
        name: 'Cristian Dumitrescu',
        role: { ro: 'Head of Talent Acquisition, TSG Group', en: 'Head of Talent Acquisition, TSG Group' },
        avatar: '/assets/images/avatar-1.jpg',
        bio: { ro: 'Peste 12 ani de experiență în recrutare tech și programe de mentorat universitar.', en: '12+ years leading tech recruitment and university internship programs.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Desfășurător Târg', en: 'Expo Timetable' },
        items: [
          { time: '10:00', title: { ro: 'Deschiderea oficială a standurilor expoziționale', en: 'Official Opening of Company Booths' }, room: 'Sala Senatului' },
          { time: '11:00 - 13:00', title: { ro: 'Workshop: Cum să-ți construiești un profil LinkedIn & portofoliu', en: 'Workshop: Crafting an impactful LinkedIn & UI/Code Portfolio' }, room: 'Sala 14' },
          { time: '14:00 - 16:30', title: { ro: 'Speed Interviews cu echipele de inginerie TSG', en: 'Speed Interviews with TSG Engineering Teams' }, room: 'Foaier Etaj 1' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Trebuie să fiu student în an terminal?', en: 'Do I need to be in my final year?' },
        a: { ro: 'Nu, sunt disponibile oportunități pentru toți anii de studiu, inclusiv stagii de vară pentru anii I și II.', en: 'No, internships and shadow programs are available for all study years, including freshmen and sophomores.' }
      }
    ]
  },
  {
    id: 'evt-5',
    category: 'workshops',
    faculty: 'dpdm',
    featured: false,
    title: {
      ro: 'Workshop Practic: Design de Sisteme UI/UX, Accesibilitate & Micro-Interacțiuni',
      en: 'Hands-on Workshop: UI/UX Design Systems, Accessibility & Micro-Interactions'
    },
    subtitle: {
      ro: 'Ghid practic de la wireframes la tokeni de design și micro-animații GSAP de înaltă performanță.',
      en: 'From wireframes to production design tokens and high-performance GSAP micro-animations.'
    },
    description: {
      ro: 'Un workshop intensiv de 4 ore dedicat studenților de la Design de Produs, Informatică Aplicată și pasionaților de frontend. Participanții vor învăța regulile esențiale de ierarhie vizuală, contrast WCAG 2.1 AA, arhitectură atomică și integrarea librăriilor de animație moderne. Fiecare participant lucrează direct pe un proiect aplicat pe nevoile reale ale campusului UNITBV.',
      en: 'An intensive 4-hour masterclass for Product Design and Computer Science students. Learn core visual hierarchy principles, WCAG 2.1 AA contrast rigor, atomic design tokens, and modern interactive animation. Attendees build a live prototype tailored to real-world UNITBV campus digital workflows.'
    },
    bannerImage: 'assets/images/workshop-ai.jpg',
    startDate: '2026-12-15T14:00:00',
    endDate: '2026-12-15T18:00:00',
    dateDisplay: {
      ro: '15 Decembrie 2026',
      en: 'December 15, 2026'
    },
    timeDisplay: {
      ro: '14:00 - 18:00',
      en: '02:00 PM - 06:00 PM'
    },
    venueId: 'icdt',
    venueRoom: {
      ro: 'Laboratorul de Inovare Digitală L3 (Campus ICDT)',
      en: 'Digital Innovation Lab L3 (ICDT Campus)'
    },
    format: 'hybrid',
    organizer: {
      name: 'TSG Design Studio x Facultatea DPDM',
      contact: 'design.lab@unitbv.ro',
      verified: true
    },
    capacity: 50,
    registeredCount: 48,
    badgeText: {
      ro: 'Doar 2 locuri libere',
      en: 'Only 2 Spots Remaining'
    },
    isFree: true,
    tags: ['UI/UX', 'Figma', 'Design Systems', 'GSAP', 'Accessibility'],
    speakers: [
      {
        name: 'Andrei Moldovan',
        role: { ro: 'Senior UI/UX Director, TSG Digital', en: 'Senior UI/UX Director, TSG Digital' },
        avatar: '/assets/images/avatar-2.jpg',
        bio: { ro: 'Creator de sisteme de design scalabile pentru produse cu peste 1M utilizatori activi.', en: 'Creator of design systems for products serving over 1M active users.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Agendă Workshop', en: 'Workshop Agenda' },
        items: [
          { time: '14:00 - 15:00', title: { ro: 'Principii de Design Systems: Arhitectură UI scalabilă', en: 'Design Systems Principles: Scalable UI Architecture' }, room: 'Lab L3' },
          { time: '15:15 - 16:30', title: { ro: 'Design Tokens & Atomic Components: Hands-on Figma', en: 'Design Tokens & Atomic Components: Hands-on Figma' }, room: 'Lab L3' },
          { time: '16:45 - 18:00', title: { ro: 'Choreografierea mișcării: GSAP & micro-interacțiuni interactive', en: 'Motion Choreography: GSAP & interactive micro-interactions' }, room: 'Lab L3' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Este necesar să am laptop propriu?', en: 'Do I need my own laptop?' },
        a: { ro: 'Laboratorul ICDT este dotat cu stații grafice de lucru, dar puteți aduce și propriul laptop.', en: 'The ICDT lab is equipped with high-end workstations, though you may also bring your own laptop.' }
      }
    ]
  },
  {
    id: 'evt-6',
    category: 'conferinte',
    faculty: 'seaa',
    featured: false,
    title: {
      ro: 'Colocviul Național al Tinerilor Cercetători în Științe Economice',
      en: 'National Colloquium of Young Researchers in Economic Sciences'
    },
    subtitle: {
      ro: 'Modele econometrice moderne, tranziție verde și antreprenoriat regional în Transilvania.',
      en: 'Modern econometric models, green transition, and regional entrepreneurship in Transylvania.'
    },
    description: {
      ro: 'Facultatea de Științe Economice și Administrarea Afacerilor împreună cu mediul de business din Brașov organizează sesiunea anuală de comunicări științifice. Tematica centrală vizează impactul transformării digitale asupra IMM-urilor locale și strategiile de dezvoltare sustenabilă în regiunea Centru.',
      en: 'The Faculty of Economic Sciences and Business Administration hosts its annual scientific communications session. Focus areas include the digital transition for local SMEs and sustainable economic roadmaps in the central region of Romania.'
    },
    bannerImage: 'assets/images/brasov-campus.jpg',
    startDate: '2026-12-18T11:00:00',
    endDate: '2026-12-18T16:30:00',
    dateDisplay: {
      ro: '18 Decembrie 2026',
      en: 'December 18, 2026'
    },
    timeDisplay: {
      ro: '11:00 - 16:30',
      en: '11:00 AM - 04:30 PM'
    },
    venueId: 'centru-multicultural',
    venueRoom: {
      ro: 'Galeria Mare a Centrului Multicultural',
      en: 'Main Gallery of the Multicultural Center'
    },
    format: 'physical',
    organizer: {
      name: 'Facultatea de SEAA UNITBV',
      contact: 'seaa.colocviu@unitbv.ro',
      verified: true
    },
    capacity: 120,
    registeredCount: 89,
    badgeText: {
      ro: 'Dezbateri & Cercetare',
      en: 'Debate & Research'
    },
    isFree: true,
    tags: ['Economie', 'Antreprenoriat', 'Transilvania', 'Publicații'],
    speakers: [
      {
        name: 'Prof. Univ. Dr. Gabriel Brătucu',
        role: { ro: 'Decan Facultatea de SEAA, UNITBV', en: 'Dean of SEAA Faculty, UNITBV' },
        avatar: '/assets/images/avatar-3.jpg',
        bio: { ro: 'Cercetător în politici economice regionale și comportamentul consumatorului.', en: 'Researcher in regional economic policies and consumer behavior.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Program Colocviu', en: 'Colloquium Schedule' },
        items: [
          { time: '11:00 - 11:30', title: { ro: 'Înregistrare & Cuvânt de deschidere', en: 'Registration & Welcome Address' }, room: 'Galeria Mare' },
          { time: '11:30 - 13:30', title: { ro: 'Prezentarea lucrărilor de cercetare (Sesiunea I)', en: 'Research Presentations (Session I)' }, room: 'Galeria Mare' },
          { time: '14:30 - 16:30', title: { ro: 'Masa rotundă cu liderii de business TSG & Premierea celor mai bune lucrări', en: 'Roundtable with TSG Business Leaders & Best Paper Awards' }, room: 'Sala Rotundă' }
        ]
      }
    ],
    faq: [
      {
        q: { ro: 'Cine poate asista la dezbateri?', en: 'Who can attend the panel sessions?' },
        a: { ro: 'Accesul este deschis tuturor studenților și cadrelor didactice, în limita locurilor disponibile.', en: 'Access is open to all university students and faculty members within hall capacity limits.' }
      }
    ]
  },
  {
    id: 'evt-7',
    category: 'conferinte',
    faculty: 'iesc',
    featured: false,
    title: {
      ro: 'Simpozionul de Algoritmi, Criptografie și Modele Matematice (Corpul P)',
      en: 'Symposium on Algorithms, Cryptography & Mathematical Modeling (Building P)'
    },
    subtitle: {
      ro: 'Prezentări de cercetare și ateliere de informatică teoretică organizate la Facultatea de Matematică și Informatică.',
      en: 'Research presentations and theoretical computer science workshops hosted at the Faculty of Mathematics and Computer Science.'
    },
    description: {
      ro: 'Facultatea de Matematică și Informatică din cadrul UNITBV organizează în Corpul P (Str. Iuliu Maniu nr. 50) sesiunea anuală dedicată algoritmilor avansați, securității criptografice și optimizării numerice, în colaborare cu specialiștii TSG.',
      en: 'The Faculty of Mathematics and Computer Science at UNITBV hosts in Building P (Iuliu Maniu St. 50) the annual session dedicated to advanced algorithms, cryptographic security, and numerical optimization, in collaboration with TSG specialists.'
    },
    bannerImage: 'assets/images/aula-campus.jpg',
    startDate: '2026-12-02T10:00:00',
    endDate: '2026-12-02T16:00:00',
    dateDisplay: { ro: '02 Decembrie 2026', en: 'December 2, 2026' },
    timeDisplay: { ro: '10:00 - 16:00', en: '10:00 AM - 04:00 PM' },
    venueId: 'corp-p',
    venueRoom: { ro: 'Corpul P – Amfiteatrul P.I.1 (Str. Iuliu Maniu nr. 50)', en: 'Building P – Amphitheater P.I.1 (Iuliu Maniu St. 50)' },
    format: 'hybrid',
    organizer: { name: 'Facultatea de Matematică și Informatică UNITBV', contact: 'fmi@unitbv.ro', verified: true },
    capacity: 140,
    registeredCount: 96,
    isFree: true,
    tags: ['Matematică', 'Informatică', 'Criptografie', 'Corpul P'],
    speakers: [
      {
        name: 'Prof. Univ. Dr. Marin Marin',
        role: { ro: 'Facultatea de Matematică și Informatică, UNITBV', en: 'Faculty of Mathematics and Computer Science, UNITBV' },
        avatar: '/assets/images/avatar-1.jpg',
        bio: { ro: 'Profesor și cercetător în modele matematice aplicate și informatică.', en: 'Professor and researcher in applied mathematical modeling and computer science.' }
      }
    ],
    schedule: [
      {
        day: { ro: 'Program Simpozion – Corpul P', en: 'Symposium Schedule – Building P' },
        items: [
          { time: '10:00 - 12:00', title: { ro: 'Sesiunea I: Criptografie post-cuantică și securitate', en: 'Session I: Post-quantum Cryptography & Security' }, room: 'Amfiteatrul P.I.1' },
          { time: '12:30 - 16:00', title: { ro: 'Sesiunea II: Algoritmi de optimizare și Machine Learning', en: 'Session II: Optimization Algorithms & Machine Learning' }, room: 'Laboratorul P.II.3' }
        ]
      }
    ],
    faq: []
  },
  {
    id: 'evt-8',
    category: 'workshops',
    faculty: 'iesc',
    featured: false,
    title: {
      ro: 'Atelier de Sisteme Embedded, Robotică și Telecomunicații (Corpul N)',
      en: 'Embedded Systems, Robotics & Telecommunications Workshop (Building N)'
    },
    subtitle: {
      ro: 'Sesiune practică în laboratoarele Facultății IESC din Corpul N (Str. Politehnicii nr. 1).',
      en: 'Hands-on session in the IESC Faculty laboratories in Building N (Politehnicii St. 1).'
    },
    description: {
      ro: 'Studenții facultății IESC și inginerii hardware lucrează direct pe microcontrolere, arhitecturi IoT și rețele de comunicații în laboratoarele din Corpul N.',
      en: 'IESC students and hardware engineers work hands-on with microcontrollers, IoT architectures, and communication networks in Building N laboratories.'
    },
    bannerImage: 'assets/images/hackathon-tech.jpg',
    startDate: '2026-12-07T12:00:00',
    endDate: '2026-12-07T17:00:00',
    dateDisplay: { ro: '07 Decembrie 2026', en: 'December 7, 2026' },
    timeDisplay: { ro: '12:00 - 17:00', en: '12:00 PM - 05:00 PM' },
    venueId: 'corp-n',
    venueRoom: { ro: 'Corpul N – Laboratorul N.II.4 (Str. Politehnicii nr. 1)', en: 'Building N – Lab N.II.4 (Politehnicii St. 1)' },
    format: 'physical',
    organizer: { name: 'Facultatea IESC UNITBV', contact: 'iesc@unitbv.ro', verified: true },
    capacity: 80,
    registeredCount: 64,
    isFree: true,
    tags: ['Embedded', 'IESC', 'Hardware', 'Corpul N'],
    speakers: [],
    schedule: [],
    faq: []
  },
  {
    id: 'evt-9',
    category: 'conferinte',
    faculty: 'medicina',
    featured: false,
    title: {
      ro: 'Conferința de Inovație Medicală și Psihologie Aplicată (Corpul K)',
      en: 'Medical Innovation & Applied Psychology Conference (Building K)'
    },
    subtitle: {
      ro: 'Dezbateri interdisciplinare găzduite în Corpul K (Str. Nicolae Bălcescu nr. 56).',
      en: 'Interdisciplinary panels hosted in Building K (Nicolae Bălcescu St. 56).'
    },
    description: {
      ro: 'Eveniment academic dedicat studenților și cadrelor didactice de la Facultatea de Medicină și Facultatea de Psihologie și Științele Educației.',
      en: 'Academic event dedicated to students and faculty from the Faculty of Medicine and Faculty of Psychology and Education Sciences.'
    },
    bannerImage: 'assets/images/concert-aula.jpg',
    startDate: '2026-12-12T09:30:00',
    endDate: '2026-12-12T15:30:00',
    dateDisplay: { ro: '12 Decembrie 2026', en: 'December 12, 2026' },
    timeDisplay: { ro: '09:30 - 15:30', en: '09:30 AM - 03:30 PM' },
    venueId: 'corp-k',
    venueRoom: { ro: 'Corpul K – Amfiteatrul K.I.1 (Str. Nicolae Bălcescu nr. 56)', en: 'Building K – Amphitheater K.I.1 (Nicolae Bălcescu St. 56)' },
    format: 'physical',
    organizer: { name: 'Facultatea de Medicină & Psihologie UNITBV', contact: 'medicina@unitbv.ro', verified: true },
    capacity: 150,
    registeredCount: 112,
    isFree: true,
    tags: ['Medicină', 'Psihologie', 'Corpul K'],
    speakers: [],
    schedule: [],
    faq: []
  }
];

const INITIAL_ATTENDEES = [
  { id: 'att-101', name: 'Alexandru Popa', email: 'alexandru.popa@student.unitbv.ro', faculty: 'IESC (Anul II)', eventId: 'evt-1', ticketCode: 'UTBV-2026-9812', checkedIn: true, time: '2026-11-28 09:12' },
  { id: 'att-102', name: 'Maria Ionescu', email: 'maria.ionescu@student.unitbv.ro', faculty: 'IESC (Anul III)', eventId: 'evt-1', ticketCode: 'UTBV-2026-9813', checkedIn: true, time: '2026-11-28 09:15' },
  { id: 'att-103', name: 'Vlad Miron', email: 'vlad.miron@student.unitbv.ro', faculty: 'Design de Produs (Anul I)', eventId: 'evt-1', ticketCode: 'UTBV-2026-9814', checkedIn: false, time: 'Înregistrat' },
  { id: 'att-104', name: 'Elena Dobre', email: 'elena.dobre@unitbv.ro', faculty: 'Cadru Didactic SEAA', eventId: 'evt-2', ticketCode: 'UTBV-2026-8740', checkedIn: true, time: '2026-11-24 09:35' },
  { id: 'att-105', name: 'Andrei Constantinescu', email: 'a.constantinescu@student.unitbv.ro', faculty: 'Mecanică (Master)', eventId: 'evt-4', ticketCode: 'UTBV-2026-7210', checkedIn: false, time: 'Înregistrat' }
];

const INITIAL_QA = [
  {
    id: 'qa-1',
    eventId: 'evt-1',
    author: 'Tudor Dumitrașcu (Student IESC)',
    avatar: '/assets/images/avatar-4.jpg',
    question: {
      ro: 'Se pot forma echipe multidisciplinare cu studenți de la alte facultăți (de exemplu Design sau SEAA)?',
      en: 'Can we create multidisciplinary teams with students from other faculties (e.g. Design or SEAA)?'
    },
    upvotes: 18,
    userUpvoted: false,
    timestamp: 'acum 2 ore',
    answer: {
      ro: 'Da, absolut! Echipele multidisciplinare sunt chiar recomandate și punctate suplimentar în criteriile de evaluare ale juriului TSG.',
      en: 'Yes, absolutely! Multidisciplinary teams are highly encouraged and receive bonus points in the TSG judging criteria.'
    },
    answeredBy: 'Radu Teodorescu (TSG Lead)'
  },
  {
    id: 'qa-2',
    eventId: 'evt-1',
    author: 'Ioana Vasilache (Studentă Anul I)',
    avatar: '/assets/images/avatar-5.jpg',
    question: {
      ro: 'Dacă nu am o echipă completă înainte de vineri, se pot forma echipe la fața locului în corpul V?',
      en: 'If I don’t have a full team before Friday, can we form teams on-site at Building V?'
    },
    upvotes: 12,
    userUpvoted: false,
    timestamp: 'acum 4 ore',
    answer: {
      ro: 'Sigur! Vineri între 10:00 și 11:30 organizăm o sesiune specială de Team Matchmaking pentru cei fără echipă.',
      en: 'Certainly! On Friday between 10:00 and 11:30 AM we host a dedicated Team Matchmaking session for individual participants.'
    },
    answeredBy: 'Echipa de Organizare TSG'
  }
];

export const EVENTS_DATA = INITIAL_EVENTS;
export const ATTENDEES_DATA = INITIAL_ATTENDEES;
export const QA_DATA = INITIAL_QA;

