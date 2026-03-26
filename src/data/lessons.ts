export interface FlashCard {
  id: string;
  arabic: string;
  transliteration: string;
  spanish: string;
  note?: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  type: "arabic-to-spanish" | "spanish-to-arabic" | "transliteration";
}

export interface Unit {
  id: number;
  title: string;
  titleArabic?: string;
  description: string;
  icon: string;
  dirhamsReward: number;
  cards: FlashCard[];
  quiz: LessonQuiz[];
}

export const units: Unit[] = [
  {
    id: 1,
    title: "El Alifato",
    titleArabic: "الأبجدية",
    description: "El alfabeto árabe: aprende las 28 letras",
    icon: "✏️",
    dirhamsReward: 50,
    cards: [
      { id: "1-1", arabic: "ا", transliteration: "Alif", spanish: "Letra auxiliar (como la A)" },
      { id: "1-2", arabic: "ب", transliteration: "Baa'", spanish: "B española" },
      { id: "1-3", arabic: "ت", transliteration: "Taa'", spanish: "T inglesa" },
      { id: "1-4", arabic: "ث", transliteration: "Zaa'", spanish: "Z española" },
      { id: "1-5", arabic: "ج", transliteration: "Yiim", spanish: "Como la J suave" },
      { id: "1-6", arabic: "ح", transliteration: "Haa'", spanish: "H aspirada fuerte" },
      { id: "1-7", arabic: "خ", transliteration: "Jaa'", spanish: "J española" },
      { id: "1-8", arabic: "د", transliteration: "Daal", spanish: "D española" },
      { id: "1-9", arabic: "ذ", transliteration: "Dhaal", spanish: "Th inglesa suave" },
      { id: "1-10", arabic: "ر", transliteration: "Raa'", spanish: "R española" },
      { id: "1-11", arabic: "ز", transliteration: "Zaai", spanish: "Z francesa" },
      { id: "1-12", arabic: "س", transliteration: "Siin", spanish: "S española" },
      { id: "1-13", arabic: "ش", transliteration: "Shiin", spanish: "Sh inglesa" },
      { id: "1-14", arabic: "ص", transliteration: "Saad", spanish: "S fuerte enfática" },
    ],
    quiz: [
      { question: "¿Cuál es la letra 'Baa'?", options: ["ا", "ب", "ت", "ث"], correctIndex: 1, type: "spanish-to-arabic" },
      { question: "¿Qué letra es esta: ج ?", options: ["Daal", "Yiim", "Haa'", "Raa'"], correctIndex: 1, type: "arabic-to-spanish" },
      { question: "¿Cuál es la 'J española'?", options: ["ح", "خ", "ج", "ذ"], correctIndex: 1, type: "spanish-to-arabic" },
      { question: "¿Qué letra es esta: ش ?", options: ["Siin", "Saad", "Shiin", "Zaai"], correctIndex: 2, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 2,
    title: "Las vocales cortas",
    titleArabic: "الحركات القصيرة",
    description: "Fatha, Kasra y Damma: los 3 sonidos vocálicos",
    icon: "🔤",
    dirhamsReward: 50,
    cards: [
      { id: "2-1", arabic: "ـَ", transliteration: "Fatha", spanish: "Vocal A — va encima de la letra", note: "Representa el sonido (a)" },
      { id: "2-2", arabic: "ـِ", transliteration: "Kasra", spanish: "Vocal I — va debajo de la letra", note: "Representa el sonido (i)" },
      { id: "2-3", arabic: "ـُ", transliteration: "Damma", spanish: "Vocal U — va encima de la letra", note: "Representa el sonido (u)" },
      { id: "2-4", arabic: "بَ", transliteration: "Ba", spanish: "Baa' con Fatha = Ba" },
      { id: "2-5", arabic: "بِ", transliteration: "Bi", spanish: "Baa' con Kasra = Bi" },
      { id: "2-6", arabic: "بُ", transliteration: "Bu", spanish: "Baa' con Damma = Bu" },
    ],
    quiz: [
      { question: "¿Qué vocal representa la Fatha?", options: ["U", "I", "A", "O"], correctIndex: 2, type: "transliteration" },
      { question: "¿Dónde se coloca la Kasra?", options: ["Encima", "Debajo", "Al lado", "Dentro"], correctIndex: 1, type: "transliteration" },
      { question: "بُ se lee como:", options: ["Ba", "Bi", "Bu", "Bo"], correctIndex: 2, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 3,
    title: "Uniendo letras",
    titleArabic: "توصيل الحروف",
    description: "Cómo se conectan las letras para formar palabras",
    icon: "🔗",
    dirhamsReward: 60,
    cards: [
      { id: "3-1", arabic: "كتب", transliteration: "Kataba", spanish: "Escribir", note: "ك + ت + ب unidas" },
      { id: "3-2", arabic: "بيت", transliteration: "Bait", spanish: "Casa" },
      { id: "3-3", arabic: "باب", transliteration: "Baab", spanish: "Puerta" },
      { id: "3-4", arabic: "كتاب", transliteration: "Kitaab", spanish: "Libro" },
      { id: "3-5", arabic: "قلم", transliteration: "Qalam", spanish: "Bolígrafo / Pluma" },
    ],
    quiz: [
      { question: "¿Qué significa كتب?", options: ["Casa", "Puerta", "Escribir", "Libro"], correctIndex: 2, type: "arabic-to-spanish" },
      { question: "¿Cómo se dice 'Casa' en árabe?", options: ["باب", "بيت", "كتاب", "قلم"], correctIndex: 1, type: "spanish-to-arabic" },
      { question: "¿Qué significa كتاب?", options: ["Bolígrafo", "Puerta", "Escribir", "Libro"], correctIndex: 3, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 4,
    title: "Las vocales largas",
    titleArabic: "الحركات الطويلة",
    description: "Alif, Wau, Yaa como vocales largas",
    icon: "📏",
    dirhamsReward: 60,
    cards: [
      { id: "4-1", arabic: "ا", transliteration: "Alif", spanish: "Vocal larga AA", note: "Extiende el sonido 'a'" },
      { id: "4-2", arabic: "و", transliteration: "Wau", spanish: "Vocal larga UU", note: "Extiende el sonido 'u'" },
      { id: "4-3", arabic: "ي", transliteration: "Yaa", spanish: "Vocal larga II", note: "Extiende el sonido 'i'" },
      { id: "4-4", arabic: "نار", transliteration: "Naar", spanish: "Fuego" },
      { id: "4-5", arabic: "نور", transliteration: "Nuur", spanish: "Luz" },
    ],
    quiz: [
      { question: "¿Qué letra extiende el sonido 'u'?", options: ["ا", "و", "ي", "ب"], correctIndex: 1, type: "transliteration" },
      { question: "¿Qué significa نار?", options: ["Luz", "Fuego", "Agua", "Tierra"], correctIndex: 1, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 5,
    title: "Tanwiin",
    titleArabic: "التنوين",
    description: "La indeterminación: los sonidos -an, -in, -un",
    icon: "🔔",
    dirhamsReward: 70,
    cards: [
      { id: "5-1", arabic: "ـً", transliteration: "Tanwiin Fatha", spanish: "Sonido -an al final", note: "Doble Fatha" },
      { id: "5-2", arabic: "ـٍ", transliteration: "Tanwiin Kasra", spanish: "Sonido -in al final", note: "Doble Kasra" },
      { id: "5-3", arabic: "ـٌ", transliteration: "Tanwiin Damma", spanish: "Sonido -un al final", note: "Doble Damma" },
      { id: "5-4", arabic: "كتابٌ", transliteration: "Kitaabun", spanish: "Un libro (indeterminado)" },
      { id: "5-5", arabic: "بيتًا", transliteration: "Baitan", spanish: "Una casa (acusativo)" },
    ],
    quiz: [
      { question: "¿Qué sonido produce el Tanwiin Fatha?", options: ["-un", "-in", "-an", "-on"], correctIndex: 2, type: "transliteration" },
      { question: "كتابٌ significa:", options: ["El libro", "Un libro", "Los libros", "Mi libro"], correctIndex: 1, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 6,
    title: "El Sukuun",
    titleArabic: "السكون",
    description: "La ausencia de vocal: consonante sin sonido vocálico",
    icon: "⭕",
    dirhamsReward: 70,
    cards: [
      { id: "6-1", arabic: "ـْ", transliteration: "Sukuun", spanish: "Sin vocal: la consonante se pronuncia sola", note: "Pequeño círculo encima" },
      { id: "6-2", arabic: "بَحْر", transliteration: "Bahr", spanish: "Mar", note: "La ح lleva Sukuun" },
      { id: "6-3", arabic: "شَمْس", transliteration: "Shams", spanish: "Sol", note: "La م lleva Sukuun" },
      { id: "6-4", arabic: "نَجْم", transliteration: "Najm", spanish: "Estrella" },
    ],
    quiz: [
      { question: "¿Qué indica el Sukuun?", options: ["Vocal larga", "Sin vocal", "Vocal doble", "Énfasis"], correctIndex: 1, type: "transliteration" },
      { question: "¿Qué significa شَمْس?", options: ["Mar", "Luna", "Sol", "Estrella"], correctIndex: 2, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 7,
    title: "La Shaddah",
    titleArabic: "الشدة",
    description: "La duplicación de consonantes",
    icon: "✨",
    dirhamsReward: 70,
    cards: [
      { id: "7-1", arabic: "ـّ", transliteration: "Shaddah", spanish: "Duplica la consonante", note: "Pequeña W encima de la letra" },
      { id: "7-2", arabic: "سَلَّم", transliteration: "Sallam", spanish: "Escalera", note: "La ل se duplica" },
      { id: "7-3", arabic: "قِطَّة", transliteration: "Qittah", spanish: "Gata" },
      { id: "7-4", arabic: "جَنَّة", transliteration: "Jannah", spanish: "Paraíso / Jardín" },
    ],
    quiz: [
      { question: "¿Qué hace la Shaddah?", options: ["Alarga la vocal", "Duplica la consonante", "Elimina la vocal", "Cambia el tono"], correctIndex: 1, type: "transliteration" },
      { question: "¿Qué significa جَنَّة?", options: ["Gata", "Escalera", "Paraíso", "Puerta"], correctIndex: 2, type: "arabic-to-spanish" },
    ],
  },
  {
    id: 8,
    title: "Ta Marbuuta",
    titleArabic: "التاء المربوطة",
    description: "La T femenina: marca de género femenino",
    icon: "👩",
    dirhamsReward: 80,
    cards: [
      { id: "8-1", arabic: "ة", transliteration: "Ta marbuuta", spanish: "T atada — marca femenino", note: "Se pronuncia 'a' o 'at'" },
      { id: "8-2", arabic: "مَدْرَسَة", transliteration: "Madrasa", spanish: "Escuela" },
      { id: "8-3", arabic: "سَيَّارَة", transliteration: "Sayyaara", spanish: "Coche" },
      { id: "8-4", arabic: "مَدِينَة", transliteration: "Madiina", spanish: "Ciudad" },
      { id: "8-5", arabic: "غُرْفَة", transliteration: "Ghurfa", spanish: "Habitación" },
    ],
    quiz: [
      { question: "¿Qué indica la Ta marbuuta?", options: ["Masculino", "Plural", "Femenino", "Pasado"], correctIndex: 2, type: "transliteration" },
      { question: "¿Qué significa مَدِينَة?", options: ["Escuela", "Coche", "Ciudad", "Habitación"], correctIndex: 2, type: "arabic-to-spanish" },
      { question: "¿Cómo se dice 'Escuela'?", options: ["سَيَّارَة", "مَدْرَسَة", "غُرْفَة", "مَدِينَة"], correctIndex: 1, type: "spanish-to-arabic" },
    ],
  },
];

export const glossaryItems = [
  { arabic: "مَرْحَبًا", transliteration: "Marhaban", spanish: "Hola", category: "Saludos" },
  { arabic: "السَّلَامُ عَلَيْكُم", transliteration: "As-salaamu 'alaikum", spanish: "La paz sea contigo", category: "Saludos" },
  { arabic: "شُكْرًا", transliteration: "Shukran", spanish: "Gracias", category: "Cortesía" },
  { arabic: "لا، شُكْرًا", transliteration: "La, shukran", spanish: "No, gracias", category: "Cortesía" },
  { arabic: "مِنْ فَضْلِك", transliteration: "Min fadlik", spanish: "Por favor", category: "Cortesía" },
  { arabic: "نَعَم", transliteration: "Na'am", spanish: "Sí", category: "Cortesía" },
  { arabic: "لا", transliteration: "La", spanish: "No", category: "Cortesía" },
  { arabic: "كَمْ؟", transliteration: "Kam?", spanish: "¿Cuánto?", category: "Compras" },
  { arabic: "غَالِي", transliteration: "Ghaali", spanish: "Caro", category: "Compras" },
  { arabic: "رَخِيص", transliteration: "Rakhiis", spanish: "Barato", category: "Compras" },
  { arabic: "أُرِيد", transliteration: "Uriid", spanish: "Quiero", category: "Compras" },
  { arabic: "وَاحِد", transliteration: "Waahid", spanish: "Uno (1)", category: "Números" },
  { arabic: "اِثْنَان", transliteration: "Iznaan", spanish: "Dos (2)", category: "Números" },
  { arabic: "ثَلَاثَة", transliteration: "Zalaaza", spanish: "Tres (3)", category: "Números" },
  { arabic: "أَرْبَعَة", transliteration: "Arba'a", spanish: "Cuatro (4)", category: "Números" },
  { arabic: "خَمْسَة", transliteration: "Khamsa", spanish: "Cinco (5)", category: "Números" },
  { arabic: "سِتَّة", transliteration: "Sitta", spanish: "Seis (6)", category: "Números" },
  { arabic: "سَبْعَة", transliteration: "Sab'a", spanish: "Siete (7)", category: "Números" },
  { arabic: "ثَمَانِيَة", transliteration: "Zamaaniya", spanish: "Ocho (8)", category: "Números" },
  { arabic: "تِسْعَة", transliteration: "Tis'a", spanish: "Nueve (9)", category: "Números" },
  { arabic: "عَشَرَة", transliteration: "'Ashara", spanish: "Diez (10)", category: "Números" },
  { arabic: "مَاء", transliteration: "Maa'", spanish: "Agua", category: "Viaje" },
  { arabic: "طَعَام", transliteration: "Ta'aam", spanish: "Comida", category: "Viaje" },
  { arabic: "فُنْدُق", transliteration: "Funduq", spanish: "Hotel", category: "Viaje" },
  { arabic: "حَمَّام", transliteration: "Hammaam", spanish: "Baño", category: "Viaje" },
  { arabic: "سُوق", transliteration: "Suuq", spanish: "Mercado / Zoco", category: "Viaje" },
  { arabic: "شَاي", transliteration: "Shaai", spanish: "Té", category: "Viaje" },
];

export interface MarketItem {
  id: string;
  name: string;
  nameArabic: string;
  basePrice: number;
  emoji: string;
  description: string;
}

export const marketItems: MarketItem[] = [
  { id: "tea", name: "Té moruno", nameArabic: "شَاي مَغْرِبِي", basePrice: 30, emoji: "🍵", description: "Té verde con hierbabuena y mucho azúcar" },
  { id: "babouche", name: "Babuchas", nameArabic: "بَلْغَة", basePrice: 80, emoji: "👟", description: "Zapatillas tradicionales de cuero" },
  { id: "lamp", name: "Lámpara", nameArabic: "مِصْبَاح", basePrice: 120, emoji: "🏮", description: "Lámpara de metal con vidrio de colores" },
  { id: "spices", name: "Especias", nameArabic: "تَوَابِل", basePrice: 45, emoji: "🌶️", description: "Mezcla de ras el hanout y comino" },
  { id: "carpet", name: "Alfombra", nameArabic: "زَرْبِيَّة", basePrice: 200, emoji: "🧶", description: "Alfombra bereber tejida a mano" },
  { id: "tajine", name: "Tajín", nameArabic: "طَاجِين", basePrice: 90, emoji: "🥘", description: "Plato de cerámica pintado a mano" },
  { id: "argan", name: "Aceite de argán", nameArabic: "زَيْت أَرْغَان", basePrice: 60, emoji: "🫒", description: "Oro líquido de Marruecos" },
  { id: "leather", name: "Bolso de cuero", nameArabic: "حَقِيبَة جِلْد", basePrice: 150, emoji: "👜", description: "Bolso artesanal de la curtidería" },
];

export const haggleDialogues = {
  greetings: [
    { arabic: "مَرْحَبًا! أَهْلًا وَسَهْلًا", transliteration: "Marhaban! Ahlan wa sahlan", spanish: "¡Hola! ¡Bienvenido!" },
  ],
  tooExpensive: [
    { arabic: "غَالِي بِزَّاف!", transliteration: "Ghaali bizzaaf!", spanish: "¡Muy caro!" },
    { arabic: "لا، شُكْرًا", transliteration: "La, shukran", spanish: "No, gracias" },
  ],
  numbers: [
    { value: 5, arabic: "خَمْسَة", transliteration: "Khamsa" },
    { value: 10, arabic: "عَشَرَة", transliteration: "'Ashara" },
    { value: 15, arabic: "خَمْسَة عْشَر", transliteration: "Khamsa 'ashar" },
    { value: 20, arabic: "عِشْرِين", transliteration: "'Ishriin" },
    { value: 25, arabic: "خَمْسَة وَعِشْرِين", transliteration: "Khamsa wa 'ishriin" },
    { value: 30, arabic: "ثَلَاثِين", transliteration: "Zalaaziin" },
    { value: 40, arabic: "أَرْبَعِين", transliteration: "Arba'iin" },
    { value: 50, arabic: "خَمْسِين", transliteration: "Khamsiin" },
  ],
};
