export const pieces = [
  { title: "Miedo", display: "MIEDO", image: "/img/miedo.webp" },
  { title: "Claridad", display: "CLARIDAD", image: "/img/claridad.webp" },
  { title: "Poder", display: "PODER", image: "/img/poder.webp" },
  { title: "Vejez", display: "VEJEZ", image: "/img/vejez.webp" },
];

export const timeline = [
  { step: "01", title: "Dirección visual", body: "Universo, tono y narrativa general ya definidos." },
  { step: "02", title: "Piezas principales", body: "Los cuatro enemigos ya están presentados en esta versión." },
  { step: "03", title: "Tapas y mockups", body: "Exploración abierta para comparar cierres posibles." },
  { step: "04", title: "Siguiente etapa", body: "Ajustes finos, feedback y definición de entregables finales." },
];

export const projectTimeline = [
  {
    date: "02/02/2026",
    title: "Inicio del proyecto",
    body: "Recepción de la seña.",
    status: "done",
  },
  {
    date: "12/02/2026",
    title: "Primera entrega",
    body: "Cuatro Enemigos.",
    status: "done",
  },
  {
    date: "13/02/2026",
    title: "Definición de tapa",
    body: "Se define posible tapa de Vestigios y una idea de tapa general. Se evaluará sistema.",
    status: "done",
  },
  {
    date: "13/02/2026",
    title: "Parte intermedia",
    body: "Recepción de 125.000. Preparar repositorio de archivos en alta.",
    status: "done",
  },
  {
    date: "09/03/2026",
    title: "Pre-entrega acordada",
    body: "Unir todo el sistema. Generar archivos. Estructurar historia.",
    status: "done",
  },
  {
    date: "19/03/2026 · 23:00",
    title: "Revision de cambios",
    body: "Entrega de cambios y pre entrega de tapa.",
    status: "done",
  },
  {
    date: "27/03/2026 · 23:00",
    title: "Pre-entrega de iconografía y tapa final",
    body: "Entrega tentativa de iconografía y pre-entrega de tapa final.",
    status: "done",
  },
  {
    date: "31/03/2026 · 23:00",
    title: "Cierre final del portal",
    body: "Correcciones menores, última tapa y carga final de entregables.",
    status: "current",
  },
];

export const materials = [
  {
    label: "Materialidad — Miedo",
    title: "Piel del miedo",
    image: "/img/mood_animales.webp",
    body: "Textura / tensión. Grano áspero, marcas y sombras. La materia se siente como presencia: algo te mira antes de que vos decidas mirar.",
  },
  {
    label: "Materialidad — Claridad",
    title: "Blanco que ciega",
    image: "/img/mood_montana.webp",
    body: "Luz / vacío. Superficie limpia, casi quirúrgica. La claridad no te salva: te prueba. Entender no alcanza si todavía no ves.",
  },
  {
    label: "Materialidad — Poder",
    title: "Decisión en silencio",
    image: "/img/mood_bosque.webp",
    body: "Peso / control. Material denso, contraste y corte preciso. El poder no se anuncia: ya está. No empuja… sostiene.",
  },
  {
    label: "Materialidad — Vejez",
    title: "Integración",
    image: "/img/mood_chaman.webp",
    body: "Tiempo / tejido. Capas, desgaste noble, unión de partes. No es decadencia: es mapa completo. El chamán ve el sistema entero.",
  },
];

export const covers = [
  { label: "Opción I", title: "OPCION PORTADA A", image: "/img/tapa_a.webp" },
  { label: "Opción II", title: "OPCION PORTADA B", image: "/img/tapa_b.webp" },
];

export const downloads = ["PDF de concepto", "Tapas finales", "Pack de mockups"];

export const finalFiles: Array<{
  slug: string;
  label: string;
  iconSrc: string;
  availability: string;
  progress: number;
  href?: string;
}> = [
  {
    slug: "cuatro-enemigos",
    label: "Cuatro Enemigos",
    iconSrc: "/img/icons/cuatro.png",
    availability: "Disponible en drive",
    progress: 100,
    href: "https://drive.google.com/drive/folders/1iyMW-Sd7NTnMhPdleOI7NgOzMsFcMjDb?usp=sharing",
  },
  {
    slug: "los-giles",
    label: "Los Giles",
    iconSrc: "/img/icons/giles.png",
    availability: "Disponible en drive",
    progress: 100,
    href: "https://drive.google.com/drive/folders/1Fja_VjlGdbYTmMH1R2KpSZQLpToomYHv?usp=sharing",
  },
  {
    slug: "nunca-mas",
    label: "Nunca más me iré",
    iconSrc: "/img/icons/nunca.png",
    availability: "Disponible en drive",
    progress: 100,
    href: "https://drive.google.com/drive/folders/1kHjONvRBGRxHLRPTXLal85hWX8xxHAOV?usp=sharing",
  },
  {
    slug: "vestigios",
    label: "Vestigios",
    iconSrc: "/img/icons/vestigios.png",
    availability: "Disponible en drive",
    progress: 100,
    href: "https://drive.google.com/drive/folders/1VOWaL1ocri4ZFyivUXrZoQV2BKoKmHWy?usp=sharing",
  },
  {
    slug: "asi-veras",
    label: "EP general",
    iconSrc: "/img/icons/veras.png",
    availability: "Pendiente",
    progress: 31,
  },
];

export const symbologySystem = [
  {
    track: "Cuatro Enemigos",
    icon: "/img/icons/glyph-eye.svg",
    title: "Ojo del umbral",
    body: "Icono para la apertura de conciencia y la estructura central del sistema de los cuatro enemigos.",
  },
  {
    track: "Los Giles",
    icon: "/img/icons/glyph-loop.svg",
    title: "Ruta de la tribu",
    body: "Lectura de viaje, marcha colectiva y repeticion del movimiento humano hacia el horizonte.",
  },
  {
    track: "Nunca más me iré",
    icon: "/img/icons/glyph-threshold.svg",
    title: "Puerta de mutacion",
    body: "Marca del cruce sin regreso: la vieja forma cae y el nuevo hombre aparece.",
  },
  {
    track: "Vestigios",
    icon: "/img/icons/glyph-core.svg",
    title: "Nucleo ritual",
    body: "Simbolo para el altar, la energia residual y la memoria de la batalla espiritual.",
  },
];

export const tracks = [
  {
    slug: "cuatro-enemigos",
    title: "Cuatro Enemigos",
    subtitle: "Núcleo conceptual del EP",
    descriptor: "Miedo → Claridad → Poder → Vejez → Ver",
    status: "Final",
    image: "/img/cuatro.webp",
    reviewer: "Mariano Borserini",
    lastUpdate: "2026-03-29",
  },
  {
    slug: "los-giles",
    title: "Los Giles",
    subtitle: "Dimensión humana / tribal",
    descriptor: "Muchos caminan toda la vida sin despertar. Otros descubren que el camino también es una batalla.",
    status: "Final",
    image: "/img/giles.webp",
    reviewer: "Mariano Borserini",
    lastUpdate: "2026-03-29",
  },
  {
    slug: "nunca-mas",
    title: "Nunca más me iré",
    subtitle: "Ruptura y transformación",
    descriptor: "El punto de quiebre: dejar atrás la forma anterior para mutar.",
    status: "Final",
    image: "/img/nunca.webp",
    reviewer: "Mariano Borserini",
    lastUpdate: "2026-03-29",
  },
  {
    slug: "vestigios",
    title: "Vestigios",
    subtitle: "Huellas de la guerra ritual",
    descriptor: "Lo que queda después del conflicto interno: símbolos, materia y rastro.",
    status: "Final",
    image: "/img/Vestigios.webp",
    reviewer: "Mariano Borserini",
    lastUpdate: "2026-03-29",
  },
  {
    slug: "asi-veras",
    title: "BORSE EP",
    subtitle: "Te comparto la propuesta final de tapa.",
    descriptor: "Trabajé sobre una línea minimalista, priorizando los símbolos como eje y manteniendo el fondo como soporte sutil.",
    status: "Revisión",
    image: "/img/Tapa_borse-ep.jpg",
    imageFull: "/img/BORSE_EP.webp",
    reviewer: "Mariano Borserini",
    lastUpdate: "2026-03-29",
    featured: true,
  },
];

export const processModules = [
  {
    id: "cuatro-enemigos",
    title: "Cuatro Enemigos",
    eyebrow: "Módulo 01",
    descriptor: "Pieza central del sistema visual. El núcleo filosófico del EP.",
  },
  {
    id: "viaje-creativo",
    title: "El Viaje Creativo",
    eyebrow: "Módulo 02",
    descriptor: "Huellas físicas del viaje: materia, transición y superficie.",
  },
  {
    id: "vestigios",
    title: "Vestigios",
    eyebrow: "Módulo 03",
    descriptor: "Restos de la guerra ritual: símbolos, caos y altar quebrado.",
  },
  {
    id: "los-giles",
    title: "Los Giles",
    eyebrow: "Módulo 04",
    descriptor: "La dimensión humana, colectiva y tribal dentro del mito.",
  },
  {
    id: "nunca-mas",
    title: "Nunca más me iré",
    eyebrow: "Módulo 05",
    descriptor: "Ruptura, mudanza interior y abandono de la forma anterior.",
  },
  {
    id: "asi-veras",
    title: "ASÍ VERÁS",
    eyebrow: "Módulo 06",
    descriptor: "Cierre ritual del sistema: una secuencia que activa una transformación.",
  },
];

export type ProcessTrackPage = {
  slug: string;
  title: string;
  subtitle: string;
  status: "FINAL" | "EN PROCESO";
  concept: string[];
  keyLines: string[];
  explorations: string[];
  currentState: string[];
  nextSteps: string[];
  gallery?: Array<{ src: string; alt: string }>;
  revision?: {
    summary: string;
    items: string[];
    milestones: Array<{
      date: string;
      title: string;
      body: string;
      status: "done" | "current" | "upcoming";
    }>;
  };
};

export const processTrackPages: ProcessTrackPage[] = [
  {
    slug: "cuatro-enemigos",
    title: "Cuatro Enemigos",
    subtitle: "Núcleo conceptual del EP",
    status: "FINAL",
    concept: [
      "El tema explora la idea de los cuatro enemigos del hombre en el camino del conocimiento.",
      "Miedo, claridad, poder y vejez representan etapas que el ser humano debe atravesar.",
      "El símbolo central es el ojo.",
      "Durante el proceso el ojo permanece cerrado. La verdadera visión solo aparece en la última etapa: la vejez.",
      "No se trata de visión física sino de apertura mental, espiritual y sensorial.",
      "Miedo → Claridad → Poder → Vejez → Ver.",
      "La vejez no representa decadencia sino sabiduría y evolución máxima.",
    ],
    keyLines: [
      "HUYE MIEDO",
      "ASÍ VERÁS",
      "QUIEN VIVE DEL PODER",
      "INOCENCIA",
      "TOMA EL CONTROL",
      "ALMAS DE TERROR",
      "NO ES HUMANO",
      "EL MIEDO",
      "SI TE QUEBRO TE SUPERO",
      "CLARIDAD QUE CIEGA AL TORPE",
      "LA VEJEZ AL FINAL",
    ],
    explorations: [
      "Sistema visual basado en cuatro cuadrantes.",
      "Cada cuadrante representa un enemigo.",
      "MIEDO: ojo cerrado, atmósfera oscura.",
      "CLARIDAD: ojo cerrado, textura clara / dibujo.",
      "PODER: ojo cerrado, plumas / energía / fuerza.",
      "VEJEZ: ojo abierto, revelación / sabiduría.",
      "El ojo se abre únicamente en VEJEZ.",
    ],
    currentState: [
      "Visual aprobado para el concepto general del sistema.",
      "El ojo funciona como símbolo unificador del EP.",
    ],
    nextSteps: [
      "Integrar este sistema con el resto de los temas del EP.",
    ],
    gallery: [
      { src: "/img/BORSE_IMGS/cuatroenemigos.webp", alt: "Cuatro Enemigos visual principal" },
    ],
  },
  {
    slug: "los-giles",
    title: "Los Giles",
    subtitle: "Dimensión humana / tribal",
    status: "EN PROCESO",
    concept: [
      "Hay personas que no saben exactamente hacia dónde van. Pero siguen caminando.",
      "Avanzan por el mundo sin mapas, sin certezas y sin comprender del todo el paisaje que atraviesan.",
      "Mientras caminan, existen fuerzas, entidades y presencias observándolos desde dimensiones que ellos no pueden percibir. Pero no tienen el poder de verlas.",
      "Los Giles representa ese momento permanente del viaje humano en el que el movimiento es más fuerte que la certeza.",
      "No hay héroes individuales ni figuras míticas dominando la escena. Hay personas comunes atravesando un paisaje inmenso.",
      "El sendero desciende hacia el mar como una promesa. El horizonte no es un destino claro, sino una dirección.",
      "No buscan dominar el mundo. Buscan llegar.",
      "Pero este momento no ocurre antes ni después de nada. Sucede al mismo tiempo que todo.",
      "Mientras algunos atraviesan sus batallas interiores, enfrentan sus miedos y evolucionan, muchos otros nunca despiertan completamente. Permanecen dentro del tránsito eterno de la vida.",
      "Caminan sin rumbo, pero caminando.",
      "La tribu avanza cargando historias, sueños y derrotas. La comunidad. La resistencia silenciosa. El honor de seguir adelante incluso cuando no se conoce el final.",
      "Los Giles son los que caminan. Los que miran el mar. Los que creen que las ideas pueden cumplir sueños.",
      "Y tal vez, sin saberlo, algunos de ellos también se están acercando al momento en que deberán enfrentar a sus verdaderos enemigos.",
    ],
    keyLines: [
      "SOMOS LOS QUE PELEAN POR SU HONOR",
      "NUNCA ES NUNCA MÁS",
      "VIAJAMOS SIN VOLAR",
      "LAS IDEAS CUMPLEN SUEÑOS",
      "SOMOS LOS QUE MIRAMOS AL MAR",
      "VIAJAMOS SIN VOLAR",
    ],
    explorations: [
      "Viaje",
      "Horizonte",
      "Mar",
      "Tribu",
      "Soñadores",
      "Movimiento",
      "Contrapunto entre realidad vs sueño.",
    ],
    currentState: [
      "Concepto narrativo definido.",
      "Exploración visual pendiente.",
    ],
    nextSteps: [
      "Desarrollar visual que represente movimiento.",
      "Desarrollar visual que represente tribu.",
      "Desarrollar visual que represente idea de viaje interior.",
    ],
    gallery: [
      { src: "/img/BORSE_IMGS/logiles.webp", alt: "Los Giles visual principal" },
    ],
  },
  {
    slug: "nunca-mas",
    title: "Nunca más me iré",
    subtitle: "Ruptura y transformación",
    status: "EN PROCESO",
    concept: [
      "Después de la guerra llega la transformación.",
      "La batalla no fue visible para todos. No dejó ejércitos ni ciudades en ruinas. Fue una guerra interior, librada en silencio entre fuerzas que habitan dentro del hombre desde siempre.",
      "Miedo. Claridad. Poder.",
      "Cuando esas fuerzas chocan, algo dentro del ser se quiebra. El antiguo yo ya no puede sostenerse.",
      "Debe morir.",
      "Nunca Más representa ese instante en el que el viejo hombre se consume y el nuevo comienza a emerger.",
      "De la tierra, de la roca y de las raíces, cuerpos se levantan como si el propio suelo los estuviera dando a luz. La piel del pasado se quema, se desintegra, se vuelve polvo.",
      "Lo que queda es luz.",
      "No es un despertar individual. Es un despertar que ocurre al mismo tiempo en muchos.",
      "Algunos lo atraviesan. Otros siguen caminando sin verlo. Pero en ese momento el mundo cambia.",
      "Bailabas. Tu sombra hablaba. El viento atravesaba el paisaje.",
      "Aunque me fui, dejé mi alma ahí.",
      "Desde la cima del camino el viajero observa todo lo que fue. Ha visto su vida pasar frente a sus ojos.",
      "Ya no busca dominar el mundo. Comprende que cada paso lo ha llevado hasta este instante.",
      "El momento en que el hombre deja atrás su antigua forma.",
      "Nunca más.",
      "Porque quien atraviesa el fuego de su propia transformación ya no vuelve a ser el mismo.",
      "El viejo yo muere.",
      "Y el nuevo hombre emerge.",
    ],
    keyLines: [
      "BAILABAS",
      "TU SOMBRA HABLABA",
      "VIENTO",
      "AUNQUE ME FUI DEJÉ MI ALMA AHÍ",
      "EN ESA CIMA ESTOY",
      "ME CUIDA MI ANIMAL",
      "DEJANDO TODO ATRÁS",
      "VERTE DE VUELTA",
      "VI MI VIDA PASAR",
      "SOLO SER UNA HUELLA MÁS",
      "NO IMPORTA DONDE ESTÉ LLEGARÉ",
    ],
    explorations: [
      "Montaña",
      "Cumbre",
      "Viento",
      "Figura solitaria",
      "Animal espiritual",
      "Momento de transformación.",
    ],
    currentState: [
      "Concepto narrativo claro.",
      "Visual en desarrollo.",
    ],
    nextSteps: [
      "Explorar visual de transición / ascenso.",
    ],
    gallery: [
      { src: "/img/BORSE_IMGS/nuncamasmeire.webp", alt: "Nunca más me iré visual principal" },
    ],
  },
  {
    slug: "vestigios",
    title: "Vestigios",
    subtitle: "Huellas de la guerra ritual",
    status: "EN PROCESO",
    concept: [
      "La escena representa el momento posterior a una guerra espiritual. No se trata de una batalla física, sino de un enfrentamiento de fuerzas primitivas: naturaleza, energía y ritual.",
      "El círculo tallado en el suelo funciona como un antiguo altar chamánico, ahora fracturado, del que aún emanan restos de energía. Plumas, humo y símbolos dispersos en el paisaje actúan como huellas de aquello que ocurrió.",
      "Las figuras con cuernos que aparecen entre la niebla no se presentan como enemigos, sino como guardianes o testigos del ritual. Observan el escenario en silencio mientras el cielo se abre con una descarga de luz que divide la escena, reforzando la tensión entre dos fuerzas opuestas.",
      "Esta imagen dialoga con la idea presente en la letra del tema: dos cielos sobre el cerro, uno pide paz, el otro sangre.",
      "Dentro del sistema conceptual del EP, Vestigios representa las huellas de una guerra chamánica entre elementos y fuerzas. La misma batalla que atraviesa el hombre en su proceso de evolución —entre miedo, claridad, poder y vejez— también ocurre en el plano simbólico de la naturaleza.",
      "Lo que vemos en la escena son los restos de ese enfrentamiento: energía residual, símbolos encendidos, fragmentos de un ritual que ya ocurrió.",
      "Vestigios no es solamente el final de una batalla, sino también el rastro que queda después de toda transformación.",
      "Porque todo proceso de cambio deja marcas.",
      "Y a veces, esos restos no son el final de algo, sino el comienzo de algo nuevo.",
    ],
    keyLines: [
      "DOS CIELOS SOBRE EL CERRO",
      "SOPLA EL VIENTO",
      "UNO PIDE PAZ EL OTRO SANGRE",
      "CAE EL SOL",
      "AHÍ ESTABA SU BENDICIÓN",
      "DESTROZÓ MI ALMA",
      "SE ENCIENDE BOSQUE ETERNO",
      "LA LLUVIA NO DETENDRÁ AL GUERRERO",
      "REÍR / LLORAR",
      "NUBES LO ABRAZAN",
      "LA VIDA NO DETIENE EL TIEMPO",
      "CIELOS ABRIERON MISTERIOS",
    ],
    explorations: [
      "Campo de batalla espiritual.",
      "Altar ritual circular roto.",
      "Símbolos tallados.",
      "Plumas.",
      "Humo.",
      "Cielo dividido.",
      "Guerrero en distancia.",
    ],
    currentState: [
      "Primer visual exploratorio creado.",
      "Concepto visual en evolución.",
    ],
    nextSteps: [
      "Refinar altar ritual y simbolismo chamánico.",
    ],
    gallery: [
      { src: "/img/BORSE_IMGS/vestigios.webp", alt: "Vestigios visual principal" },
    ],
  },
  {
    slug: "asi-veras",
    title: "ASÍ VERÁS",
    subtitle: "Ritual de transformación",
    status: "FINAL",
    concept: [
      "No es un concepto.",
      "No es una estética.",
      "No es una historia.",
      "Es un proceso.",
      "Durante todo el recorrido, nada aparece por azar.",
      "Cada símbolo, cada escena, cada fragmento responde a una misma estructura invisible: un ritual.",
      "El umbral abre.",
      "La espiral prepara.",
      "La energía irrumpe.",
      "El círculo contiene.",
      "Y en el centro... alguien cambia.",
      "No se trata de entender lo que ves. Se trata de atravesarlo.",
      "Porque lo que parecía separado -las canciones, los símbolos, las imágenes- en realidad forma parte de un mismo acto.",
      "Una secuencia.",
      "Una activación.",
      "El cuerpo no representa.",
      "El cuerpo evidencia.",
      "Algo ocurrió.",
      "Algo se sostuvo.",
      "Algo emergió.",
      "Al final no hay explicación.",
      "Hay una certeza:",
      "Nunca fue una suma de partes.",
      "Siempre fue un ritual.",
      "Y una vez que lo ves... ya no podés volver atrás.",
    ],
    keyLines: [
      "NO ES UN CONCEPTO",
      "ES UN PROCESO",
      "SE TRATA DE ATRAVESARLO",
      "UNA SECUENCIA",
      "UNA ACTIVACIÓN",
      "EL CUERPO EVIDENCIA",
      "NUNCA FUE UNA SUMA DE PARTES",
      "SIEMPRE FUE UN RITUAL",
      "YA NO PODÉS VOLVER ATRÁS",
    ],
    explorations: [
      "Umbral.",
      "Espiral.",
      "Energía en irrupción.",
      "Círculo como contención.",
      "Cuerpo como evidencia del cambio.",
      "Tensión entre secuencia y activación.",
    ],
    currentState: [
      "Manifiesto conceptual definido.",
      "Dirección narrativa consolidada como cierre del recorrido del EP.",
    ],
    nextSteps: [
      "Desarrollar adaptaciones visuales del manifiesto en piezas de comunicación.",
      "Ajustar la composición final de tapa y aplicaciones editoriales.",
    ],
    gallery: [
      { src: "/img/4simbolos.webp", alt: "Sistema de cuatro símbolos" },
      { src: "/img/symbol-asiveras.webp", alt: "Símbolo ASÍ VERÁS" },
    ],
  },
];

export const processTrackPagesBySlug = Object.fromEntries(
  processTrackPages.map((item) => [item.slug, item]),
) as Record<string, ProcessTrackPage>;

export const processTrackNav: Array<{
  slug: string;
  label: string;
  short: string;
  href: string;
  image: string;
  tone: string;
  disabled?: boolean;
}> = [
  {
    slug: "cuatro-enemigos",
    label: "Cuatro Enemigos",
    short: "CE",
    href: "/proceso-creativo/cuatro-enemigos",
    image: "/img/icon_cuatroenemigos.webp",
    tone: "gold",
  },
  {
    slug: "los-giles",
    label: "Los Giles",
    short: "LG",
    href: "/proceso-creativo/los-giles",
    image: "/img/icon_losgiles.webp",
    tone: "blue",
  },
  {
    slug: "nunca-mas",
    label: "Nunca más me iré",
    short: "NM",
    href: "/proceso-creativo/nunca-mas",
    image: "/img/icon_nuncamasmeire.webp",
    tone: "emerald",
  },
  {
    slug: "vestigios",
    label: "Vestigios",
    short: "V",
    href: "/proceso-creativo/vestigios",
    image: "/img/icon_vestigios.webp",
    tone: "ember",
  },
  {
    slug: "asi-veras",
    label: "Asi Veras",
    short: "AV",
    href: "/proceso-creativo/asi-veras",
    image: "/img/icon_asiveras.webp",
    tone: "violet",
  },
  {
    slug: "manuscrito",
    label: "Manuscrito",
    short: "M",
    href: "/manuscrito",
    image: "/img/manuscrito.webp",
    tone: "gold",
  },
];
