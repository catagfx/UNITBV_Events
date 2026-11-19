import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, ExternalLink, Calendar, Building2, Search, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { BRASOV_GEOJSON } from '../data/brasovBoundary.js';


// Complete list of official UNITBV campus locations in Brașov across 5 institutional zones
export const UNITBV_BUILDINGS = [
  {
    id: 'rectorat',
    venueId: 'rectorat',
    code: 'Rectorat',
    zone: 'centru',
    lat: 45.645301,
    lng: 25.589095,
    name: { ro: 'Rectoratul UNITBV & Casierie Rectorat', en: 'UNITBV Rectorate & Cashier Office' },
    address: 'B-dul Eroilor nr. 29, Brașov',
    faculties: { ro: 'Conducerea Universității, Sala Senatului, Casierie Rectorat', en: 'University Leadership, Senate Hall, Rectorate Cashier' },
    mapsQuery: '45.645301,25.589095'
  },
  {
    id: 'centru-multicultural',
    venueId: 'centru-multicultural',
    code: 'CM',
    zone: 'centru',
    lat: 45.64545,
    lng: 25.58955,
    name: { ro: 'Centrul Multicultural al UNITBV', en: 'UNITBV Multicultural Center' },
    address: 'B-dul Eroilor nr. 29 (Aripa de Nord), Brașov',
    faculties: { ro: 'Expoziții, colocvii, lansări de carte și concerte camerale', en: 'Exhibitions, colloquiums, book launches & chamber concerts' },
    mapsQuery: 'Centrul+Multicultural+Universitatea+Transilvania+Brasov'
  },
  {
    id: 'aula',
    venueId: 'aula',
    code: 'Aula',
    zone: 'aula',
    lat: 45.651083,
    lng: 25.60308,
    name: { ro: 'Aula Universității „Sergiu Chiriacescu”', en: 'UNITBV "Sergiu Chiriacescu" Aula' },
    address: 'Str. Iuliu Maniu nr. 41A, Brașov (Tel: 0268 476 050)',
    faculties: { ro: 'Centrul de conferințe internaționale, gale academice și concerte', en: 'International conference center, academic galas & concerts' },
    mapsQuery: '45.651083,25.60308'
  },
  {
    id: 'biblioteca-univ',
    venueId: 'biblioteca-univ',
    code: 'Biblio',
    zone: 'aula',
    lat: 45.651042,
    lng: 25.602817,
    name: { ro: 'Biblioteca Universității Transilvania & Tipografie', en: 'Transilvania University Library & Printing Office' },
    address: 'Str. Iuliu Maniu nr. 41A, Brașov',
    faculties: { ro: 'Sală cu acces direct la colecții (08:00–20:00), Centru împrumut publicații, Tipografie', en: 'Direct collection access hall (08:00–20:00), Loan center, Printing office' },
    mapsQuery: '45.651042,25.602817'
  },
  {
    id: 'icdt',
    venueId: 'icdt',
    code: 'ICDT',
    zone: 'nord',
    lat: 45.6722,
    lng: 25.5542,
    name: { ro: 'Institutul de Cercetare-Dezvoltare al UNITBV (ICDT)', en: 'UNITBV R&D Institute (ICDT Genius Campus)' },
    address: 'Str. Institutului nr. 10, Brașov',
    faculties: { ro: '30 de centre de cercetare avansată, laboratoare AI, Energie Regenerabilă & Prototipare', en: '30 advanced research centers, AI labs, Renewable Energy & Prototyping' },
    mapsQuery: 'Institutul+de+Cercetare+Dezvoltare+UNITBV+Strada+Institutului+10+Brasov'
  },
  {
    id: 'corp-a',
    venueId: 'corp-a',
    code: 'Corp A',
    zone: 'colina',
    lat: 45.653693,
    lng: 25.597984,
    name: { ro: 'Corpul A – Colina Universității', en: 'Building A – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Facultatea de Inginerie Tehnologică și Management Industrial, Facultatea de Științe Economice și Administrarea Afacerilor', en: 'Technological Engineering & Industrial Management, Economic Sciences (SEAA)' },
    mapsQuery: '45.653693,25.597984'
  },
  {
    id: 'corp-b',
    venueId: 'corp-b',
    code: 'Corp B',
    zone: 'colina',
    lat: 45.653928,
    lng: 25.597868,
    name: { ro: 'Corpul B – Colina Universității', en: 'Building B – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Săli de curs, seminarii și laboratoare – Campus Colina', en: 'Lecture halls, seminar rooms & laboratories – Colina Campus' },
    mapsQuery: '45.653928,25.597868'
  },
  {
    id: 'corp-c',
    venueId: 'corp-c',
    code: 'Corp C',
    zone: 'colina',
    lat: 45.65449,
    lng: 25.59833,
    name: { ro: 'Corpul C – Colina Universității', en: 'Building C – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Amfiteatre, săli de curs și laboratoare – Campus Colina', en: 'Amphitheaters, lecture halls & laboratories – Colina Campus' },
    mapsQuery: '45.65449,25.59833'
  },
  {
    id: 'corp-d',
    venueId: 'corp-d',
    code: 'Corp D',
    zone: 'colina',
    lat: 45.654803,
    lng: 25.597302,
    name: { ro: 'Corpul D – Colina Universității', en: 'Building D – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Laboratoare didactice și săli de seminar – Campus Colina', en: 'Teaching laboratories & seminar rooms – Colina Campus' },
    mapsQuery: '45.654803,25.597302'
  },
  {
    id: 'corp-e',
    venueId: 'corp-e',
    code: 'Corp E',
    zone: 'colina',
    lat: 45.654739,
    lng: 25.596865,
    name: { ro: 'Corpul E – Colina Universității', en: 'Building E – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Săli de curs și laboratoare – Campus Colina', en: 'Lecture rooms & laboratories – Colina Campus' },
    mapsQuery: '45.654739,25.596865'
  },
  {
    id: 'corp-f',
    venueId: 'corp-f',
    code: 'Corp F',
    zone: 'colina',
    lat: 45.655015,
    lng: 25.596651,
    name: { ro: 'Corpul F – Educație Fizică și Sporturi Montane', en: 'Building F – Physical Education & Mountain Sports' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Facultatea de Educație Fizică și Sporturi Montane, săli de sport', en: 'Faculty of Physical Education and Mountain Sports' },
    mapsQuery: '45.655015,25.596651'
  },
  {
    id: 'corp-g',
    venueId: 'corp-g',
    code: 'Corp G',
    zone: 'colina',
    lat: 45.654351,
    lng: 25.596675,
    name: { ro: 'Corpul G – Colina Universității', en: 'Building G – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Laboratoare inginerești și săli de curs – Campus Colina', en: 'Engineering laboratories & lecture rooms – Colina Campus' },
    mapsQuery: '45.654351,25.596675'
  },
  {
    id: 'corp-h',
    venueId: 'corp-h',
    code: 'Corp H',
    zone: 'colina',
    lat: 45.654852,
    lng: 25.596178,
    name: { ro: 'Corpul H – Colina Universității', en: 'Building H – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Săli de curs și laboratoare – Campus Colina', en: 'Lecture rooms & laboratories – Colina Campus' },
    mapsQuery: '45.654852,25.596178'
  },
  {
    id: 'corp-i',
    venueId: 'corp-i',
    code: 'Corp I',
    zone: 'colina',
    lat: 45.655332,
    lng: 25.595948,
    name: { ro: 'Corpul I – Colina Universității', en: 'Building I – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Săli de seminar și laboratoare – Campus Colina', en: 'Seminar rooms & laboratories – Colina Campus' },
    mapsQuery: '45.655332,25.595948'
  },
  {
    id: 'corp-j',
    venueId: 'corp-j',
    code: 'Corp J',
    zone: 'nord',
    lat: 45.662617,
    lng: 25.616909,
    name: { ro: 'Corpul J – Facultatea de Construcții', en: 'Building J – Faculty of Civil Engineering' },
    address: 'Str. Turnului nr. 5, Brașov',
    faculties: { ro: 'Facultatea de Construcții, Biblioteca Facultății de Construcții', en: 'Faculty of Civil Engineering & Library' },
    mapsQuery: '45.662617,25.616909'
  },
  {
    id: 'corp-k',
    venueId: 'corp-k',
    code: 'Corp K',
    zone: 'centru',
    lat: 45.642683,
    lng: 25.59572,
    name: { ro: 'Corpul K – Medicină & Psihologie și Științele Educației', en: 'Building K – Medicine & Psychology and Education Sciences' },
    address: 'Str. Nicolae Bălcescu nr. 56, Brașov',
    faculties: { ro: 'Facultatea de Medicină, Facultatea de Psihologie și Științele Educației', en: 'Faculty of Medicine, Faculty of Psychology and Education Sciences' },
    mapsQuery: '45.642683,25.59572'
  },
  {
    id: 'corp-l',
    venueId: 'corp-l',
    code: 'Corp L',
    zone: 'colina',
    lat: 45.653997,
    lng: 25.596905,
    name: { ro: 'Corpul L – Design de Mobilier și Inginerie a Lemnului', en: 'Building L – Furniture Design and Wood Engineering' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Facultatea de Industria Lemnului / Design de Mobilier și Inginerie a Lemnului', en: 'Faculty of Wood Engineering & Furniture Design' },
    mapsQuery: '45.653997,25.596905'
  },
  {
    id: 'corp-m',
    venueId: 'corp-m',
    code: 'Corp M',
    zone: 'aula',
    lat: 45.646418,
    lng: 25.598617,
    name: { ro: 'Corpul M – Mihai Viteazul', en: 'Building M – Mihai Viteazul' },
    address: 'Str. Mihai Viteazul, Brașov',
    faculties: { ro: 'Laboratoare și spații didactice UNITBV', en: 'UNITBV teaching & laboratory spaces' },
    mapsQuery: '45.646418,25.598617'
  },
  {
    id: 'corp-n',
    venueId: 'corp-n',
    code: 'Corp N',
    zone: 'centru',
    lat: 45.644288,
    lng: 25.595387,
    name: { ro: 'Corpul N – IESC, Inginerie Mecanică & Alimentație și Turism', en: 'Building N – IESC, Mechanical Eng. & Food and Tourism' },
    address: 'Str. Politehnicii nr. 1, Brașov',
    faculties: { ro: 'Facultatea de Inginerie Electrică și Știința Calculatoarelor (IESC), Inginerie Mecanică, Alimentație și Turism', en: 'Electrical Engineering & Computer Science (IESC), Mechanical Engineering, Food & Tourism' },
    mapsQuery: '45.644288,25.595387'
  },
  {
    id: 'corp-p',
    venueId: 'corp-p',
    code: 'Corp P',
    zone: 'aula',
    lat: 45.649261,
    lng: 25.60146,
    name: { ro: 'Corpul P – Facultatea de Matematică și Informatică', en: 'Building P – Faculty of Mathematics and Computer Science' },
    address: 'Str. Iuliu Maniu nr. 50, Brașov',
    faculties: { ro: 'Facultatea de Matematică și Informatică', en: 'Faculty of Mathematics and Computer Science' },
    mapsQuery: '45.649261,25.60146'
  },
  {
    id: 'corp-r',
    venueId: 'corp-r',
    code: 'Corp R',
    zone: 'centru',
    lat: 45.642728,
    lng: 25.597179,
    name: { ro: 'Corpul R – Castelului', en: 'Building R – Castelului' },
    address: 'Str. Castelului nr. 148, Brașov',
    faculties: { ro: 'Săli de curs și laboratoare universitare', en: 'University lecture rooms & laboratories' },
    mapsQuery: '45.642728,25.597179'
  },
  {
    id: 'corp-s',
    venueId: 'corp-s',
    code: 'Corp S',
    zone: 'centru',
    lat: 45.639915,
    lng: 25.58571,
    name: { ro: 'Corpul S – Facultatea de Silvicultură și Exploatări Forestiere', en: 'Building S – Faculty of Silviculture & Forestry' },
    address: 'Șirul Beethoven nr. 1, Brașov',
    faculties: { ro: 'Facultatea de Silvicultură și Exploatări Forestiere', en: 'Faculty of Silviculture and Forestry Engineering' },
    mapsQuery: '45.639915,25.58571'
  },
  {
    id: 'corp-t',
    venueId: 'corp-t',
    code: 'Corp T',
    zone: 'centru',
    lat: 45.645001,
    lng: 25.59249,
    name: { ro: 'Corpul T – Facultatea de Drept, Sociologie & Litere', en: 'Building T – Law, Sociology & Letters' },
    address: 'B-dul Eroilor nr. 25, Brașov',
    faculties: { ro: 'Facultatea de Drept, Facultatea de Sociologie și Comunicare, Facultatea de Litere', en: 'Faculty of Law, Sociology and Communication, Faculty of Letters' },
    mapsQuery: '45.645001,25.59249'
  },
  {
    id: 'colina',
    venueId: 'colina',
    code: 'Corp V',
    zone: 'colina',
    lat: 45.655246,
    lng: 25.59958,
    name: { ro: 'Corpul V – Colina Universității (IESC & SEAA)', en: 'Building V – University Hill (IESC & SEAA)' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Hackathon UNITBV x TSG, IESC, SEAA, Amfiteatre și Laboratoare IT', en: 'UNITBV x TSG Hackathon, IESC, SEAA, Amphitheaters & IT Labs' },
    mapsQuery: '45.655246,25.59958'
  },
  {
    id: 'corp-w',
    venueId: 'corp-w',
    code: 'Corp W',
    zone: 'colina',
    lat: 45.656648,
    lng: 25.595452,
    name: { ro: 'Corpul W – Colina Universității', en: 'Building W – University Hill' },
    address: 'Str. Universității nr. 1 (Colina Universității), Brașov',
    faculties: { ro: 'Spații universitare și administrative – Complex Colina', en: 'Academic & administrative spaces – Colina Complex' },
    mapsQuery: '45.656648,25.595452'
  },
  {
    id: 'corp-z',
    venueId: 'corp-z',
    code: 'Corp Z',
    zone: 'centru',
    lat: 45.638745,
    lng: 25.583596,
    name: { ro: 'Corpul Z – Facultatea de Muzică', en: 'Building Z – Faculty of Music' },
    address: 'Str. Andrei Șaguna nr. 2, Brașov',
    faculties: { ro: 'Facultatea de Muzică, Biblioteca Facultății de Muzică, săli de audiție', en: 'Faculty of Music, Music Library & recital rooms' },
    mapsQuery: '45.638745,25.583596'
  },
  {
    id: 'camin-colina',
    venueId: 'camin-colina',
    code: 'Cămine Colina',
    zone: 'colina',
    lat: 45.655684,
    lng: 25.594969,
    name: { ro: 'Căminele Studențești Colina (C11, C12, C14, C15, C16)', en: 'Colina Student Dormitories (C11, C12, C14, C15, C16)' },
    address: 'Str. Universității nr. 1 (Complex Colina), Brașov',
    faculties: { ro: 'C11 – mixt, C12 – mixt, C14 – mixt, C15 – mixt, C16 – regim hotel / studenți străini', en: 'C11, C12, C14, C15 mixed dorms, C16 international student residence' },
    mapsQuery: '45.655684,25.594969'
  },
  {
    id: 'cantina-colina',
    venueId: 'cantina-colina',
    code: 'Cantina Colina',
    zone: 'colina',
    lat: 45.656648,
    lng: 25.595242,
    name: { ro: 'Cantina Studențească Colina', en: 'Colina Student Canteen' },
    address: 'Str. Universității nr. 1 (Complex Colina), Brașov',
    faculties: { ro: 'Cantina studențească din campusul Colina Universității', en: 'Student dining hall in the Colina University campus' },
    mapsQuery: '45.656648,25.595242'
  },
  {
    id: 'casierie-colina',
    venueId: 'casierie-colina',
    code: 'Casierie Colina',
    zone: 'colina',
    lat: 45.654824,
    lng: 25.597048,
    name: { ro: 'Casierie Colina Universității', en: 'Colina Campus Cashier Office' },
    address: 'Str. Universității nr. 1, Brașov',
    faculties: { ro: 'Taxe școlarizare și regie cămin – Complexul Colina', en: 'Tuition & dormitory fees – Colina Complex' },
    mapsQuery: '45.654824,25.597048'
  },
  {
    id: 'camine-memo',
    venueId: 'camine-memo',
    code: 'Cămine Memo',
    zone: 'memorandului',
    lat: 45.652696,
    lng: 25.582931,
    name: { ro: 'Căminele Studențești Memorandului I & II (C1–C10)', en: 'Memorandului I & II Student Dormitories (C1–C10)' },
    address: 'Str. Memorandului nr. 15–43, Brașov',
    faculties: { ro: 'Memorandului II (C1–C5) și Memorandului I (C8, C9, C10)', en: 'Memorandului II (C1–C5) and Memorandului I (C8, C9, C10) student dorms' },
    mapsQuery: '45.652696,25.582931'
  },
  {
    id: 'cantina-memo',
    venueId: 'cantina-memo',
    code: 'Cantina Memo',
    zone: 'memorandului',
    lat: 45.654353,
    lng: 25.581472,
    name: { ro: 'Cantina Studențească Memorandului', en: 'Memorandului Student Canteen' },
    address: 'Str. Memorandului, Brașov',
    faculties: { ro: 'Cantina studențească din complexul Memorandului', en: 'Student dining hall in the Memorandului complex' },
    mapsQuery: '45.654353,25.581472'
  },
  {
    id: 'casierie-memo',
    venueId: 'casierie-memo',
    code: 'Casierie Memo',
    zone: 'memorandului',
    lat: 45.654863,
    lng: 25.580742,
    name: { ro: 'Casierie Complex Memorandului', en: 'Memorandului Complex Cashier Office' },
    address: 'Str. Memorandului, Brașov',
    faculties: { ro: 'Casierie pentru taxe și regie cămin – Complexul Memorandului', en: 'Cashier office for tuition & dorm fees – Memorandului Complex' },
    mapsQuery: '45.654863,25.580742'
  },
  {
    id: 'dispensar',
    venueId: 'dispensar',
    code: 'Dispensar',
    zone: 'memorandului',
    lat: 45.65589,
    lng: 25.580198,
    name: { ro: 'Dispensar Studențesc UNITBV', en: 'UNITBV Student Medical Clinic' },
    address: 'Str. Memorandului nr. 43, parter cam. 10 (Tel: 0268 413 672)',
    faculties: { ro: 'Medicină generală studenți: dr. Liliana Vrânceanu, dr. Dorina Modval, dr. Elena Mânjina', en: 'General medicine clinic for students' },
    mapsQuery: '45.65589,25.580198'
  },
  {
    id: 'stomatologie',
    venueId: 'stomatologie',
    code: 'Stomatologie',
    zone: 'memorandului',
    lat: 45.656014,
    lng: 25.58012,
    name: { ro: 'Cabinet Stomatologie Studenți UNITBV', en: 'UNITBV Student Dental Clinic' },
    address: 'Str. Memorandului nr. 43 (Tel: 0268 413 672, Program L–V 08:00–16:00)',
    faculties: { ro: 'Medici stomatologi: dr. Marian Bădărău, dr. Maura Coca, dr. Sorana Bertleff', en: 'Student dental care clinic (Mon–Fri 08:00–16:00)' },
    mapsQuery: '45.656014,25.58012'
  },
  {
    id: 'casa-baiulescu',
    venueId: 'casa-baiulescu',
    code: 'Baiulescu',
    zone: 'centru',
    lat: 45.645378,
    lng: 25.587807,
    name: { ro: 'Biblioteca Casa Baiulescu & George Barițiu', en: 'Casa Baiulescu & George Barițiu Library' },
    address: 'B-dul Eroilor nr. 33–35, Brașov (Program 08:00–19:45)',
    faculties: { ro: 'Bibliotecă, centru cultural, centru de limbi străine, mediatecă și săli de lectură', en: 'Library, cultural center, foreign language center & reading halls' },
    mapsQuery: '45.645378,25.587807'
  }
];

const OVERVIEW_CENTER = [45.6455, 25.5920];
const OVERVIEW_ZOOM = 11.75;

function getBrasovLatLngRings() {
  const rings = [];
  if (BRASOV_GEOJSON.type === 'MultiPolygon') {
    for (const poly of BRASOV_GEOJSON.coordinates) {
      if (poly[0]) rings.push(poly[0].map(([lng, lat]) => [lat, lng]));
    }
  } else if (BRASOV_GEOJSON.type === 'Polygon') {
    if (BRASOV_GEOJSON.coordinates[0]) {
      rings.push(BRASOV_GEOJSON.coordinates[0].map(([lng, lat]) => [lat, lng]));
    }
  }
  return rings;
}

export function BrasovMapPanel({ events = [], onFilterVenueEvents }) {
  const { lang, getLocalized } = useLanguage();
  const { effectiveTheme } = useTheme();
  const LText = (ro, en) => (lang === 'ro' ? ro : en);

  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [activeZone, setActiveZone] = useState('all');
  const [buildingSearch, setBuildingSearch] = useState('');
  const [mapStyle, setMapStyle] = useState('official'); // 'official' (Google clean no-POI) | 'carto' (Carto Voyager with API key)
  const [currentZoom, setCurrentZoom] = useState(OVERVIEW_ZOOM);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const boundaryLayerRef = useRef(null);

  const visibleBuildings = UNITBV_BUILDINGS.filter(b => {
    if (activeZone !== 'all' && b.zone !== activeZone) return false;
    if (buildingSearch.trim()) {
      const q = buildingSearch.toLowerCase();
      const text = `${b.code} ${b.name.ro} ${b.name.en} ${b.address} ${b.faculties.ro} ${b.faculties.en}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  const selectedBuilding = UNITBV_BUILDINGS.find(b => b.id === selectedBuildingId) || null;
  const buildingEvents = selectedBuilding
    ? events.filter(e => e.venueId === selectedBuilding.venueId)
    : [];

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: OVERVIEW_CENTER,
      zoom: OVERVIEW_ZOOM,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 0.25,
      zoomDelta: 0.5
    });

    map.on('zoomend', () => setCurrentZoom(map.getZoom()));

    boundaryLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const ro = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    ro.observe(mapContainerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch between Official Clean Map and Carto HD (via backend proxy /api/carto) & adapt to Light/Dark theme
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (mapStyle === 'carto') {
      const cartoTheme = effectiveTheme === 'dark' ? 'dark_all' : 'rastertiles/voyager';
      tileLayerRef.current = L.tileLayer(
        `/api/carto/${cartoTheme}/{z}/{x}/{y}{r}.png`,
        { maxZoom: 19 }
      ).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ro&scale=2&apistyle=s.t:2%7Cp.v:off%2Cs.t:4%7Cp.v:off',
        { maxZoom: 19, subdomains: ['0', '1', '2', '3'] }
      ).addTo(map);
    }
  }, [mapStyle, effectiveTheme]);

  // Render exact pixel-calibrated Brașov + Poiana Brașov urban boundary + exterior dimming mask
  useEffect(() => {
    const group = boundaryLayerRef.current;
    if (!group) return;
    group.clearLayers();

    const rings = getBrasovLatLngRings();
    const worldRing = [[90, -180], [90, 180], [-90, 180], [-90, -180]];

    // Exterior dimming mask outside Brașov & Poiana Brașov
    L.polygon([worldRing, ...rings], {
      fillColor: effectiveTheme === 'dark' ? '#020617' : '#0f172a',
      fillOpacity: effectiveTheme === 'dark' ? 0.42 : 0.15,
      stroke: false,
      interactive: false
    }).addTo(group);

    // Outer halo along the official Brașov boundary
    L.geoJSON(BRASOV_GEOJSON, {
      style: {
        color: '#dc2626',
        weight: 5,
        opacity: 0.18,
        fillOpacity: 0,
        interactive: false
      }
    }).addTo(group);

    // Exact dotted red boundary of Brașov & Poiana Brașov
    L.geoJSON(BRASOV_GEOJSON, {
      style: {
        color: '#d93025',
        weight: 2.5,
        opacity: 0.95,
        dashArray: '3, 5',
        fillOpacity: 0,
        interactive: false
      }
    }).addTo(group);
  }, [effectiveTheme]);

  // Render all 35 official UNITBV markers (smart label density at overview zoom vs zoomed-in view)
  useEffect(() => {
    const group = markersLayerRef.current;
    const map = mapInstanceRef.current;
    if (!group || !map) return;
    group.clearLayers();

    const isDark = effectiveTheme === 'dark';
    const showAllLabels = currentZoom >= 14 || visibleBuildings.length <= 15;
    const keyHubs = new Set(['rectorat', 'aula', 'colina', 'icdt', 'corp-j', 'corp-s', 'corp-k', 'corp-n', 'corp-t', 'camine-memo']);

    visibleBuildings.forEach(b => {
      const isSelected = b.id === selectedBuildingId;
      const showPill = isSelected || showAllLabels || keyHubs.has(b.id);
      const bg = isSelected
        ? (isDark ? '#fbbf24' : '#005A9C')
        : '#003C7E';
      const fg = isSelected && isDark ? '#0b1220' : '#ffffff';
      const ring = isSelected
        ? (isDark ? '0 0 0 4px rgba(251,191,36,0.42), 0 4px 12px rgba(0,0,0,0.35)' : '0 0 0 4px rgba(0,90,156,0.35), 0 4px 12px rgba(0,0,0,0.3)')
        : '0 2px 5px rgba(0,0,0,0.28)';

      const html = showPill
        ? `
          <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);cursor:pointer;">
            <div style="background:${bg};color:${fg};font-family:'UT Sans',sans-serif;font-weight:700;font-size:10.5px;line-height:1;padding:3.5px 6.5px;border-radius:6px;border:1.5px solid #ffffff;box-shadow:${ring};white-space:nowrap;">
              ${b.code}
            </div>
            <div style="width:0;height:0;border-left:4.5px solid transparent;border-right:4.5px solid transparent;border-top:5.5px solid ${bg};margin-top:-1px;"></div>
          </div>
        `
        : `
          <div title="${b.code}" style="width:13px;height:13px;border-radius:9999px;background:${bg};border:2px solid #ffffff;box-shadow:${ring};transform:translate(-50%,-50%);cursor:pointer;"></div>
        `;

      const icon = L.divIcon({
        className: 'unitbv-map-pin-wrapper',
        html,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([b.lat, b.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : (showPill ? 300 : 100)
      });

      marker.on('click', () => {
        setSelectedBuildingId(b.id);
        map.flyTo([b.lat, b.lng], Math.max(map.getZoom(), 16), { duration: 0.55 });
      });

      marker.addTo(group);
    });
  }, [visibleBuildings, selectedBuildingId, effectiveTheme, currentZoom]);

  const handleSelectBuildingFromList = (b) => {
    setSelectedBuildingId(b.id);
    mapInstanceRef.current?.flyTo([b.lat, b.lng], 16, { duration: 0.6 });
  };

  const handleResetView = () => {
    setActiveZone('all');
    setBuildingSearch('');
    setSelectedBuildingId(null);
    mapInstanceRef.current?.flyTo(OVERVIEW_CENTER, OVERVIEW_ZOOM, { duration: 0.6 });
  };

  const card = 'glass-surface';
  const accentText = 'text-[#005A9C] dark:text-amber-400';

  const zones = [
    ['all', LText(`Toate locațiile (${UNITBV_BUILDINGS.length})`, `All locations (${UNITBV_BUILDINGS.length})`)],
    ['colina', LText('Colina (Corp A–I, L, V, W, Cămine)', 'Colina Hill (A–I, L, V, W, Dorms)')],
    ['centru', LText('Rectorat & Centru (K, N, R, S, T, Z)', 'Rectorate & Center (K, N, R, S, T, Z)')],
    ['memorandului', LText('Memorandului (Cămine, Cantină, Dispensar)', 'Memorandului (Dorms, Canteen, Clinic)')],
    ['aula', LText('Aula, Bibliotecă & Corp M, P', 'Aula, Library & Buildings M, P')],
    ['nord', LText('ICDT & Corp J Construcții', 'ICDT & Building J Civil Eng.')]
  ];

  const handleZoneFilter = (zoneId) => {
    setActiveZone(zoneId);
    setSelectedBuildingId(null);
    const map = mapInstanceRef.current;
    if (!map) return;
    if (zoneId === 'all') {
      map.flyTo(OVERVIEW_CENTER, OVERVIEW_ZOOM, { duration: 0.6 });
    } else {
      const subset = UNITBV_BUILDINGS.filter(b => b.zone === zoneId);
      if (subset.length === 1) {
        map.flyTo([subset[0].lat, subset[0].lng], 16, { duration: 0.6 });
      } else if (subset.length > 1) {
        const bounds = L.latLngBounds(subset.map(b => [b.lat, b.lng]));
        map.flyToBounds(bounds.pad(0.35), { duration: 0.6, maxZoom: 16 });
      }
    }
  };

  return (
    <section id="campus-venues-section" className="scroll-mt-28 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${accentText}`}>
            {LText('Harta Oficială Brașov & Toate Cele 35 Locații UNITBV', 'Official Brașov Map & All 35 UNITBV Locations')}
          </p>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            {LText('Corpurile, Căminele, Cantinele și Bibliotecile UNITBV pe Harta Brașovului', 'UNITBV Buildings, Dorms, Canteens & Libraries on the Brașov Map')}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {LText(
              'Conturul exact al Municipiului Brașov și Poiana Brașov față de localitățile limitrofe, incluzând toate corpurile (A–Z), Aula, bibliotecile, căminele, cantinele, casieriile și dispensarul studențesc.',
              'Exact outline of Brașov Municipality and Poiana Brașov against neighboring towns, including all university buildings (A–Z), Aula, libraries, dormitories, canteens, cashiers, and the student clinic.'
            )}
          </p>
        </div>

        {/* Zone Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {zones.map(([id, label]) => {
            const active = activeZone === id;
            return (
              <button
                key={id}
                onClick={() => handleZoneFilter(id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#005A9C] border-[#005A9C] text-white dark:bg-amber-400 dark:border-amber-400 dark:text-slate-950'
                    : 'glass-subtle text-slate-700 dark:text-slate-300 hover:border-[#005A9C] dark:hover:border-amber-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map + Interactive Directory Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Real Interactive Map of Brașov + Exact Boundary + All 35 UNITBV Pinpoints + Pop-up */}
        <div className={`lg:col-span-8 ${card} relative overflow-hidden`}>
          {/* Map Top Legend, Tile Switcher & Zoom Controls */}
          <div className="px-4 py-2.5 border-b border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 bg-white/35 dark:bg-slate-950/35 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <span className="w-4 h-0.5 border-b-2 border-dotted border-[#d93025] inline-block" />
                {LText('Contur Brașov & Poiana Brașov', 'Brașov & Poiana Brașov Outline')}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#005A9C] dark:bg-amber-400 inline-block" />
                {LText(`${UNITBV_BUILDINGS.length} Obiective UNITBV`, `${UNITBV_BUILDINGS.length} UNITBV Locations`)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* Basemap Switcher: Official Clean Map vs Carto Voyager (API Key) */}
              <div className="flex items-center p-0.5 rounded-md glass-subtle shrink-0">
                <button
                  onClick={() => setMapStyle('official')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                    mapStyle === 'official'
                      ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {LText('Hartă Oficială', 'Official Map')}
                </button>
                <button
                  onClick={() => setMapStyle('carto')}
                  className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                    mapStyle === 'carto'
                      ? 'bg-[#005A9C] text-white dark:bg-amber-400 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Carto HD
                </button>
              </div>

              <button
                onClick={() => mapInstanceRef.current?.zoomIn()}
                title={LText('Mărește harta', 'Zoom in')}
                className="p-1.5 rounded-md glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 cursor-pointer shrink-0"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => mapInstanceRef.current?.zoomOut()}
                title={LText('Micșorează harta', 'Zoom out')}
                className="p-1.5 rounded-md glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 cursor-pointer shrink-0"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetView}
                title={LText('Vederea generală Brașov', 'Full Brașov overview')}
                className="px-2 py-1 rounded-md glass-subtle text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-amber-400 cursor-pointer flex items-center gap-1 font-semibold whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>{LText('Tot Brașovul', 'Full Map')}</span>
              </button>
            </div>
          </div>

          {/* Real Interactive Leaflet Map Canvas */}
          <div className={`relative w-full h-[380px] sm:h-[480px] lg:h-[560px] ${mapStyle === "official" ? "map-official-tiles" : ""}`} data-lenis-prevent data-lenis-prevent-wheel>
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* INTERACTIVE POP-UP WHEN A PINPOINT IS CLICKED */}
            {selectedBuilding && (
              <div
                id="map-pin-popup"
                className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-auto sm:w-[320px] rounded-xl sm:rounded-2xl glass-modal p-3 sm:p-4 z-[500]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${accentText}`}>
                      {selectedBuilding.code} · {LText('Obiectiv UNITBV Brașov', 'UNITBV Location Brașov')}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug mt-0.5">
                      {getLocalized(selectedBuilding.name)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedBuildingId(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${accentText}`} />
                  <span>{selectedBuilding.address}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {getLocalized(selectedBuilding.faculties)}
                </p>

                {/* Interactive Pop-up Actions */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex flex-col gap-1.5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedBuilding.mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline py-2 px-3 text-xs flex items-center justify-center gap-1.5 text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{LText('Vezi pe Google Maps', 'View on Google Maps')}</span>
                  </a>

                  <button
                    onClick={() => onFilterVenueEvents?.(selectedBuilding.venueId)}
                    className="btn-primary py-2 px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {LText('Vezi evenimentele din această locație', 'View events at this location')} ({buildingEvents.length})
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 4 cols: Searchable Directory of All 35 UNITBV Locations */}
        <div className={`lg:col-span-4 ${card} overflow-hidden flex flex-col max-h-[420px] lg:max-h-[610px]`}>
          <div className="p-3.5 border-b border-slate-200/70 dark:border-white/10 bg-white/35 dark:bg-white/[0.03] space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className={`w-4 h-4 ${accentText}`} />
                <span>{LText('Toate Obiectivele UNITBV', 'All UNITBV Locations')}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {visibleBuildings.length} / {UNITBV_BUILDINGS.length}
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                type="text"
                value={buildingSearch}
                onChange={e => setBuildingSearch(e.target.value)}
                placeholder={LText('Caută corp (A–Z), cămin, cantină, facultate...', 'Search building (A–Z), dorm, canteen...')}
                className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-y-auto divide-y divide-slate-200/60 dark:divide-white/10 flex-1" data-lenis-prevent data-lenis-prevent-wheel>
            {visibleBuildings.map(b => {
              const active = b.id === selectedBuildingId;
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBuildingFromList(b)}
                  className={`w-full text-left p-3 transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                    active
                      ? 'bg-[#005A9C]/10 dark:bg-amber-400/10 border-l-4 border-[#005A9C] dark:border-amber-400'
                      : 'hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold shrink-0 ${accentText}`}>{b.code}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {getLocalized(b.name)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {getLocalized(b.faculties)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
