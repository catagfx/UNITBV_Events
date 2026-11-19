// Official Academic Catalog of Universitatea Transilvania din Brașov (UNITBV)
// All 18 faculties, official study cycles (Licență IF, Licență ID/IFR, Masterat, Doctorat),
// official specializations, and exact accredited duration in years (2, 3, 4, or 6 years).

export const UNITBV_ACADEMIC_CATALOG = [
  {
    id: 'iesc',
    name: {
      ro: 'Facultatea de Inginerie Electrică și Știința Calculatoarelor (IESC)',
      en: 'Faculty of Electrical Engineering and Computer Science (IESC)'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Calculatoare', years: 4 },
          { name: 'Tehnologia informației', years: 4 },
          { name: 'Automatică și informatică aplicată', years: 4 },
          { name: 'Robotică', years: 4 },
          { name: 'Electronică aplicată', years: 4 },
          { name: 'Tehnologii și sisteme de telecomunicații', years: 4 },
          { name: 'Inginerie electrică și calculatoare (în limba engleză)', years: 4 },
          { name: 'Electrotehnică', years: 4 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ cu frecvență redusă – IFR)', en: 'Bachelor (Part-time – IFR)' },
        specializations: [
          { name: 'Automatică și informatică aplicată (IFR)', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Sisteme avansate în automatică și tehnologii informatice', years: 2 },
          { name: 'Sisteme electronice și de comunicații integrate', years: 2 },
          { name: 'Sisteme electrice avansate', years: 2 },
          { name: 'Cyber Security (în limba engleză)', years: 2 },
          { name: 'Embedded Systems (în limba engleză)', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Calculatoare și tehnologia informației', years: 3 },
          { name: 'Inginerie electronică, telecomunicații și tehnologii informaționale', years: 3 },
          { name: 'Ingineria sistemelor', years: 3 },
          { name: 'Inginerie electrică', years: 3 }
        ]
      }
    }
  },
  {
    id: 'mi',
    name: {
      ro: 'Facultatea de Matematică și Informatică',
      en: 'Faculty of Mathematics and Computer Science'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Informatică', years: 3 },
          { name: 'Informatică aplicată', years: 3 },
          { name: 'Informatică aplicată (în limba germană)', years: 3 },
          { name: 'Matematică informatică', years: 3 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ la distanță – ID)', en: 'Bachelor (Distance Learning – ID)' },
        specializations: [
          { name: 'Informatică (ID)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Tehnologii moderne în ingineria sistemelor soft', years: 2 },
          { name: 'Tehnologii internet (în limba engleză)', years: 2 },
          { name: 'Structuri matematice fundamentale și aplicații', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Informatică', years: 3 },
          { name: 'Matematică', years: 3 }
        ]
      }
    }
  },
  {
    id: 'seaa',
    name: {
      ro: 'Facultatea de Științe Economice și Administrarea Afacerilor (SEAA)',
      en: 'Faculty of Economic Sciences and Business Administration (SEAA)'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Informatică economică', years: 3 },
          { name: 'Finanțe și bănci', years: 3 },
          { name: 'Contabilitate și informatică de gestiune', years: 3 },
          { name: 'Management', years: 3 },
          { name: 'Marketing', years: 3 },
          { name: 'Economia comerțului, turismului și serviciilor', years: 3 },
          { name: 'Afaceri internaționale', years: 3 },
          { name: 'Administrarea afacerilor (în limba engleză)', years: 3 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ la distanță – ID / IFR)', en: 'Bachelor (Distance / Part-time – ID / IFR)' },
        specializations: [
          { name: 'Management (ID)', years: 3 },
          { name: 'Marketing (ID)', years: 3 },
          { name: 'Contabilitate și informatică de gestiune (ID)', years: 3 },
          { name: 'Finanțe și bănci (IFR)', years: 3 },
          { name: 'Economia comerțului, turismului și serviciilor (ID)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Sisteme informaționale integrate pentru afaceri', years: 2 },
          { name: 'Politici contabile, audit și control de gestiune', years: 2 },
          { name: 'Management și strategii de afaceri', years: 2 },
          { name: 'Politici și strategii de marketing', years: 2 },
          { name: 'Management financiar-bancar și de asigurări', years: 2 },
          { name: 'Relații economice internaționale', years: 2 },
          { name: 'Administrarea afacerilor în turism', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Marketing', years: 3 },
          { name: 'Finanțe', years: 3 },
          { name: 'Management', years: 3 }
        ]
      }
    }
  },
  {
    id: 'mecanica',
    name: {
      ro: 'Facultatea de Inginerie Mecanică',
      en: 'Faculty of Mechanical Engineering'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Autovehicule rutiere', years: 4 },
          { name: 'Autovehicule rutiere (în limba engleză)', years: 4 },
          { name: 'Ingineria transporturilor și a traficului', years: 4 },
          { name: 'Inginerie mecanică', years: 4 },
          { name: 'Inginerie mecanică (în limba engleză)', years: 4 },
          { name: 'Mașini și echipamente termice', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Autovehicule pentru o mobilitate durabilă', years: 2 },
          { name: 'Securitate rutieră, transport și interacțiunea cu mediul', years: 2 },
          { name: 'Simularea și testarea în ingineria mecanică', years: 2 },
          { name: 'Automotive Engineering (în limba engleză)', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Inginerie mecanică', years: 3 }
        ]
      }
    }
  },
  {
    id: 'itmi',
    name: {
      ro: 'Facultatea de Inginerie Tehnologică și Management Industrial',
      en: 'Faculty of Technological Engineering and Industrial Management'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Tehnologia construcțiilor de mașini', years: 4 },
          { name: 'Mașini-unelte și sisteme de producție', years: 4 },
          { name: 'Ingineria și managementul calității', years: 4 },
          { name: 'Inginerie economică industrială', years: 4 },
          { name: 'Ingineria și managementul afacerilor', years: 4 },
          { name: 'Tehnologii și echipamente neconvenționale', years: 4 },
          { name: 'Ingineria fabricației (în limba franceză)', years: 4 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ cu frecvență redusă – IFR)', en: 'Bachelor (Part-time – IFR)' },
        specializations: [
          { name: 'Tehnologia construcțiilor de mașini (IFR)', years: 4 },
          { name: 'Inginerie economică industrială (IFR)', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Ingineria fabricației inovative', years: 2 },
          { name: 'Managementul calității', years: 2 },
          { name: 'Managementul afacerilor în industrie', years: 2 },
          { name: 'Inginerie virtuală în proiectarea produselor (în limba engleză)', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Inginerie industrială', years: 3 },
          { name: 'Inginerie și management', years: 3 }
        ]
      }
    }
  },
  {
    id: 'dpdm',
    name: {
      ro: 'Facultatea de Design de Produs și Mediu',
      en: 'Faculty of Product Design and Environment'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Mecatronică', years: 4 },
          { name: 'Design industrial', years: 4 },
          { name: 'Design industrial (în limba engleză)', years: 4 },
          { name: 'Optometrie', years: 4 },
          { name: 'Inginerie medicală', years: 4 },
          { name: 'Ingineria sistemelor de energii regenerabile', years: 4 },
          { name: 'Ingineria și protecția mediului în industrie', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Sisteme mecatronice pentru industrie și medicină', years: 2 },
          { name: 'Design de produs pentru dezvoltare durabilă și protecția mediului', years: 2 },
          { name: 'Sisteme energetice durabile', years: 2 },
          { name: 'Optometrie avansată', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Mecatronică și robotică', years: 3 },
          { name: 'Inginerie mecanică (Sisteme de energii regenerabile)', years: 3 }
        ]
      }
    }
  },
  {
    id: 'dmil',
    name: {
      ro: 'Facultatea de Design de Mobilier și Inginerie a Lemnului',
      en: 'Faculty of Furniture Design and Wood Engineering'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Ingineria și designul produselor finite din lemn', years: 4 },
          { name: 'Ingineria prelucrării lemnului', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Eco-design de mobilier și restaurare', years: 2 },
          { name: 'Structuri avansate din lemn și tehnologii inovative', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Inginerie forestieră (Ingineria lemnului)', years: 3 }
        ]
      }
    }
  },
  {
    id: 'silvicultura',
    name: {
      ro: 'Facultatea de Silvicultură și Exploatări Forestiere',
      en: 'Faculty of Silviculture and Forestry'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Silvicultură', years: 4 },
          { name: 'Exploatări forestiere', years: 4 },
          { name: 'Cinegetică', years: 4 },
          { name: 'Măsurători terestre și cadastru', years: 4 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ cu frecvență redusă – IFR)', en: 'Bachelor (Part-time – IFR)' },
        specializations: [
          { name: 'Silvicultură (IFR)', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Managementul ecosistemelor forestiere', years: 2 },
          { name: 'Management și sisteme tehnice în exploatări forestiere', years: 2 },
          { name: 'Multiple Purpose Forest Management (în limba engleză)', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Silvicultură', years: 3 }
        ]
      }
    }
  },
  {
    id: 'constructii',
    name: {
      ro: 'Facultatea de Construcții',
      en: 'Faculty of Civil Engineering'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Construcții civile, industriale și agricole', years: 4 },
          { name: 'Căi ferate, drumuri și poduri', years: 4 },
          { name: 'Instalații pentru construcții', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Modernizarea energetică în mediul construit', years: 2 },
          { name: 'Reabilitarea și modernizarea construcțiilor și infrastructurii de transport', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Inginerie civilă și instalații', years: 3 }
        ]
      }
    }
  },
  {
    id: 'sim',
    name: {
      ro: 'Facultatea de Știința și Ingineria Materialelor',
      en: 'Faculty of Materials Science and Engineering'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Știința materialelor', years: 4 },
          { name: 'Ingineria biomaterialelor', years: 4 },
          { name: 'Ingineria securității în industrie', years: 4 },
          { name: 'Ingineria sudării', years: 4 },
          { name: 'Inginerie economică în domeniul mecanic', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Ingineria și managementul materialelor avansate metalice, ceramice și compozite', years: 2 },
          { name: 'Ingineria securității și sănătății în muncă', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Ingineria materialelor', years: 3 }
        ]
      }
    }
  },
  {
    id: 'at',
    name: {
      ro: 'Facultatea de Alimentație și Turism',
      en: 'Faculty of Food and Tourism'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Ingineria produselor alimentare', years: 4 },
          { name: 'Controlul și expertiza produselor alimentare', years: 4 },
          { name: 'Inginerie și management în alimentația publică și agroturism', years: 4 },
          { name: 'Inginerie și management în industria turismului', years: 4 },
          { name: 'Mașini și instalații pentru agricultură și industrie alimentară', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Sisteme de procesare și controlul calității produselor agroalimentare', years: 2 },
          { name: 'Management în ospitalitate și eco-agroturism', years: 2 },
          { name: 'Eco-biotechnologies in Agriculture and Food Industry (în limba engleză)', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Inginerie și management în agricultură și dezvoltare rurală', years: 3 }
        ]
      }
    }
  },
  {
    id: 'medicina',
    name: {
      ro: 'Facultatea de Medicină',
      en: 'Faculty of Medicine'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență / Ciclu Integrat (Învățământ cu frecvență – IF)', en: 'Bachelor / Integrated Degree (Full-time – IF)' },
        specializations: [
          { name: 'Medicină (Ciclu integrat – 6 ani)', years: 6 },
          { name: 'Asistență medicală generală (4 ani)', years: 4 },
          { name: 'Balneofiziokinetoterapie și recuperare (3 ani)', years: 3 },
          { name: 'Laborator clinic (3 ani)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Managementul strategiilor preventive și politici de sănătate', years: 2 },
          { name: 'Tehnici moderne de analiză în laboratorul clinic', years: 2 },
          { name: 'Managementul îngrijirilor de sănătate și al serviciilor sociale', years: 2 },
          { name: 'Terapie fizică și reabilitare funcțională', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – Medicină)', en: 'Doctorate (Cycle III – Medicine)' },
        specializations: [
          { name: 'Medicină (4 ani)', years: 4 }
        ]
      }
    }
  },
  {
    id: 'drept',
    name: {
      ro: 'Facultatea de Drept',
      en: 'Faculty of Law'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Drept (4 ani)', years: 4 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ la distanță – ID)', en: 'Bachelor (Distance Learning – ID)' },
        specializations: [
          { name: 'Drept (ID – 4 ani)', years: 4 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Sisteme și instituții de drept internațional și al Uniunii Europene', years: 2 },
          { name: 'Drept privat aprofundat', years: 2 },
          { name: 'Științe penale aprofundate', years: 2 },
          { name: 'Legislație europeană și carieră judiciară', years: 2 }
        ]
      }
    }
  },
  {
    id: 'litere',
    name: {
      ro: 'Facultatea de Litere',
      en: 'Faculty of Letters'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Limba și literatura română – O limbă și literatură modernă (Engleză / Franceză / Germană)', years: 3 },
          { name: 'Limba și literatura engleză – O limbă și literatură modernă (Franceză / Germană) sau Română', years: 3 },
          { name: 'Limbi moderne aplicate (Engleză – Franceză / Germană)', years: 3 },
          { name: 'Studii americane', years: 3 },
          { name: 'Limba și literatura chineză – O limbă și literatură modernă sau Română', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Studii de limba și literatura română', years: 2 },
          { name: 'Inovare culturală', years: 2 },
          { name: 'Studii lingvistice pentru comunicare interculturală (în limba engleză)', years: 2 },
          { name: 'Traducere și interpretariat din limba franceză în limba română', years: 2 },
          { name: 'Interferențe culturale și literare în spațiul de limbă germană', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Filologie', years: 3 }
        ]
      }
    }
  },
  {
    id: 'pse',
    name: {
      ro: 'Facultatea de Psihologie și Științele Educației',
      en: 'Faculty of Psychology and Education Sciences'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Psihologie', years: 3 },
          { name: 'Pedagogia învățământului primar și preșcolar', years: 3 },
          { name: 'Psihopedagogie specială', years: 3 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ la distanță – ID)', en: 'Bachelor (Distance Learning – ID)' },
        specializations: [
          { name: 'Psihologie (ID)', years: 3 },
          { name: 'Pedagogia învățământului primar și preșcolar (ID)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Psihologie clinică, consiliere psihologică și psihoterapie', years: 2 },
          { name: 'Psihologia muncii, organizațională și resurse umane', years: 2 },
          { name: 'Psihologia educației și consiliere în carieră', years: 2 },
          { name: 'Resurse umane în educație. Formare și management', years: 2 },
          { name: 'Educație timpurie și școlaritate mică', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Psihologie și științe ale educației', years: 3 }
        ]
      }
    }
  },
  {
    id: 'sc',
    name: {
      ro: 'Facultatea de Sociologie și Comunicare',
      en: 'Faculty of Sociology and Communication'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Comunicare și relații publice', years: 3 },
          { name: 'Media digitală', years: 3 },
          { name: 'Media digitală (în limba engleză)', years: 3 },
          { name: 'Sociologie', years: 3 },
          { name: 'Resurse umane', years: 3 },
          { name: 'Asistență socială', years: 3 }
        ]
      },
      licenta_id: {
        label: { ro: 'Licență (Învățământ la distanță – ID)', en: 'Bachelor (Distance Learning – ID)' },
        specializations: [
          { name: 'Comunicare și relații publice (ID)', years: 3 },
          { name: 'Sociologie (ID)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Managementul relațiilor publice și al campaniilor de comunicare', years: 2 },
          { name: 'Gestiunea și dezvoltarea resursei umane', years: 2 },
          { name: 'Asistență și dezvoltare comunitară', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Științe sociale', years: 3 }
        ]
      }
    }
  },
  {
    id: 'efsm',
    name: {
      ro: 'Facultatea de Educație Fizică și Sporturi Montane',
      en: 'Faculty of Physical Education and Mountain Sports'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Educație fizică și sportivă', years: 3 },
          { name: 'Sport și performanță motrică', years: 3 },
          { name: 'Kinetoterapie și motricitate specială', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Educație fizică și activități motrice de timp liber', years: 2 },
          { name: 'Performanță sportivă și management în sport', years: 2 },
          { name: 'Kinetoprofilaxie și recuperare fizică', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Știința sportului și educației fizice', years: 3 }
        ]
      }
    }
  },
  {
    id: 'muzica',
    name: {
      ro: 'Facultatea de Muzică',
      en: 'Faculty of Music'
    },
    programs: {
      licenta_if: {
        label: { ro: 'Licență (Învățământ cu frecvență – IF)', en: 'Bachelor (Full-time – IF)' },
        specializations: [
          { name: 'Interpretare muzicală – Instrumente (4 ani)', years: 4 },
          { name: 'Interpretare muzicală – Canto (4 ani)', years: 4 },
          { name: 'Muzică (3 ani)', years: 3 }
        ]
      },
      masterat: {
        label: { ro: 'Masterat (Ciclul II)', en: 'Master (Cycle II)' },
        specializations: [
          { name: 'Stil și performanță în interpretarea instrumentală și vocală', years: 2 },
          { name: 'Tehnica și arta muzicală în secolul XX', years: 2 },
          { name: 'Meloterapie', years: 2 }
        ]
      },
      doctorat: {
        label: { ro: 'Doctorat (Ciclul III – SDI)', en: 'Doctorate (Cycle III – PhD)' },
        specializations: [
          { name: 'Muzică', years: 3 }
        ]
      }
    }
  }
];
