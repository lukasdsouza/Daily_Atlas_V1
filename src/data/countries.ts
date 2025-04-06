// Define countries and their coordinates
export interface Country {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  isCity?: boolean;
  continent?: string;
}

// Add Rio de Janeiro as a featured city
export const countries: Country[] = [
  { id: "rio", name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, description: "A cidade maravilhosa", isCity: true, continent: "América do Sul" },
  { id: "br", name: "Brasil", latitude: -14.235, longitude: -51.9253, description: "O maior país da América do Sul", continent: "América do Sul" },
  { id: "us", name: "Estados Unidos", latitude: 37.0902, longitude: -95.7129, description: "Uma potência mundial com paisagens diversas", continent: "América do Norte" },
  { id: "gb", name: "Reino Unido", latitude: 55.3781, longitude: -3.4360, description: "Um país insular com rica história", continent: "Europa" },
  { id: "fr", name: "França", latitude: 46.2276, longitude: 2.2137, description: "País conhecido por sua cultura e gastronomia", continent: "Europa" },
  { id: "de", name: "Alemanha", latitude: 51.1657, longitude: 10.4515, description: "Famosa por sua eficiência e tecnologia", continent: "Europa" },
  { id: "jp", name: "Japão", latitude: 36.2048, longitude: 138.2529, description: "Uma mistura de tradição e modernidade", continent: "Ásia" },
  { id: "au", name: "Austrália", latitude: -25.2744, longitude: 133.7751, description: "Um continente inteiro com paisagens únicas", continent: "Oceania" },
  { id: "za", name: "África do Sul", latitude: -30.5595, longitude: 22.9375, description: "Um país com incrível diversidade", continent: "África" },
  { id: "in", name: "Índia", latitude: 20.5937, longitude: 78.9629, description: "Um país de cores, sabores e culturas", continent: "Ásia" },
  { id: "cn", name: "China", latitude: 35.8617, longitude: 104.1954, description: "Uma das civilizações mais antigas do mundo", continent: "Ásia" },
  { id: "nyc", name: "Nova York", latitude: 40.7128, longitude: -74.0060, description: "A cidade que nunca dorme", isCity: true, continent: "América do Norte" },
  { id: "paris", name: "Paris", latitude: 48.8566, longitude: 2.3522, description: "A cidade da luz e do romance", isCity: true, continent: "Europa" },
  { id: "tokyo", name: "Tóquio", latitude: 35.6762, longitude: 139.6503, description: "A maior metrópole do mundo", isCity: true, continent: "Ásia" },
  { id: "london", name: "Londres", latitude: 51.5074, longitude: -0.1278, description: "Uma cidade histórica e cosmopolita", isCity: true, continent: "Europa" },
  { id: "sydney", name: "Sydney", latitude: -33.8688, longitude: 151.2093, description: "A maior cidade da Austrália", isCity: true, continent: "Oceania" },
  { id: "capetown", name: "Cidade do Cabo", latitude: -33.9249, longitude: 18.4241, description: "Uma das cidades mais bonitas da África", isCity: true, continent: "África" },
  { id: "mumbai", name: "Mumbai", latitude: 19.0760, longitude: 72.8777, description: "O coração financeiro da Índia", isCity: true, continent: "Ásia" },
  { id: "rome", name: "Roma", latitude: 41.9028, longitude: 12.4964, description: "A cidade eterna", isCity: true, continent: "Europa" },
  { id: "cairo", name: "Cairo", latitude: 30.0444, longitude: 31.2357, description: "Lar das pirâmides e do Nilo", isCity: true, continent: "África" },
  { id: "beijing", name: "Pequim", latitude: 39.9042, longitude: 116.4074, description: "A capital milenar da China", isCity: true, continent: "Ásia" },
  { id: "dubai", name: "Dubai", latitude: 25.2048, longitude: 55.2708, description: "Uma cidade futurista no deserto", isCity: true, continent: "Ásia" },
  { id: "moscow", name: "Moscou", latitude: 55.7558, longitude: 37.6173, description: "A maior cidade da Rússia", isCity: true, continent: "Europa" },
  { id: "sp", name: "São Paulo", latitude: -23.5505, longitude: -46.6333, description: "A maior metrópole da América do Sul", isCity: true, continent: "América do Sul" },
  { id: "mexico", name: "Cidade do México", latitude: 19.4326, longitude: -99.1332, description: "Uma das maiores cidades do mundo", isCity: true, continent: "América do Norte" }
];

// Add Rio de Janeiro places of interest
export interface Place {
  id: string;
  name: string;
  type: 'tourist' | 'restaurant' | 'nightclub' | 'event';
  description: string;
  rating: number;
  reviews: Review[];
  address: string;
  openingHours?: string;
  price?: string; // $ to $$$$$
  image?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export const rioPlaces: Place[] = [
  {
    id: "christ",
    name: "Cristo Redentor",
    type: "tourist",
    description: "Uma das Sete Maravilhas do Mundo Moderno, com vista incrível da cidade.",
    rating: 4.8,
    reviews: [
      { user: "Maria S.", rating: 5, comment: "Vista incrível de toda a cidade!", date: "2023-08-15" },
      { user: "João P.", rating: 4, comment: "Lotado mas vale a pena.", date: "2023-07-22" }
    ],
    address: "Parque Nacional da Tijuca - Alto da Boa Vista",
    openingHours: "8:00 - 19:00",
    price: "$$",
    image: "cristo-redentor.jpg",
    coordinates: { latitude: -22.9519, longitude: -43.2106 }
  },
  {
    id: "sugar",
    name: "Pão de Açúcar",
    type: "tourist",
    description: "Complexo de montanhas com teleférico e vistas panorâmicas.",
    rating: 4.7,
    reviews: [
      { user: "Carlos M.", rating: 5, comment: "O pôr do sol daqui é inesquecível!", date: "2023-09-05" },
      { user: "Ana R.", rating: 4.5, comment: "Experiência incrível no teleférico.", date: "2023-06-12" }
    ],
    address: "Av. Pasteur, 520 - Urca",
    openingHours: "8:00 - 21:00",
    price: "$$",
    image: "pao-de-acucar.jpg",
    coordinates: { latitude: -22.9491, longitude: -43.1546 }
  },
  {
    id: "lapa",
    name: "Arcos da Lapa",
    type: "nightclub",
    description: "Centro da vida noturna carioca, com vários bares e casas noturnas.",
    rating: 4.5,
    reviews: [
      { user: "Pedro H.", rating: 5, comment: "Melhor lugar para curtir a noite carioca!", date: "2023-08-28" },
      { user: "Fernanda L.", rating: 4, comment: "Muita música boa e ambiente animado.", date: "2023-07-15" }
    ],
    address: "Lapa, Centro",
    openingHours: "18:00 - 04:00",
    price: "$",
    image: "arcos-lapa.jpg",
    coordinates: { latitude: -22.9139, longitude: -43.1809 }
  },
  {
    id: "copa",
    name: "Praia de Copacabana",
    type: "tourist",
    description: "Uma das praias mais famosas do mundo.",
    rating: 4.6,
    reviews: [
      { user: "Luisa K.", rating: 5, comment: "Praia linda e animada!", date: "2023-09-10" },
      { user: "Roberto S.", rating: 4, comment: "Muitas opções de lazer e ótimos quiosques.", date: "2023-08-05" }
    ],
    address: "Av. Atlântica - Copacabana",
    price: "$",
    image: "copacabana.jpg",
    coordinates: { latitude: -22.9701, longitude: -43.1829 }
  },
  {
    id: "marius",
    name: "Marius Degustare",
    type: "restaurant",
    description: "Tradicional restaurante de frutos do mar e churrasco.",
    rating: 4.7,
    reviews: [
      { user: "Claudia R.", rating: 5, comment: "Melhor rodízio da cidade!", date: "2023-07-20" },
      { user: "Marcelo T.", rating: 4.5, comment: "Custo-benefício excelente, muita variedade.", date: "2023-08-18" }
    ],
    address: "Av. Atlântica, 290 - Leme",
    openingHours: "12:00 - 00:00",
    price: "$$$",
    image: "marius.jpg",
    coordinates: { latitude: -22.9634, longitude: -43.1728 }
  },
  {
    id: "rio-scenarium",
    name: "Rio Scenarium",
    type: "nightclub",
    description: "Casa de shows com música ao vivo e ambiente vintage.",
    rating: 4.8,
    reviews: [
      { user: "Bianca M.", rating: 5, comment: "Decoração incrível e música brasileira de primeira!", date: "2023-09-02" },
      { user: "Rafael G.", rating: 4.5, comment: "Ótima programação de samba e choro.", date: "2023-08-12" }
    ],
    address: "R. do Lavradio, 20 - Centro",
    openingHours: "19:00 - 03:00",
    price: "$$",
    image: "rio-scenarium.jpg",
    coordinates: { latitude: -22.9076, longitude: -43.1833 }
  },
  {
    id: "carnaval-2025",
    name: "Carnaval Rio 2025",
    type: "event",
    description: "A maior festa popular do Brasil, com desfiles de escolas de samba.",
    rating: 4.9,
    reviews: [
      { user: "James S.", rating: 5, comment: "Experiência incrível, melhor festa do mundo!", date: "2023-02-22" },
      { user: "Maria J.", rating: 5, comment: "Não há nada igual no planeta, incrível!", date: "2023-02-20" }
    ],
    address: "Sambódromo da Marquês de Sapucaí",
    openingHours: "19:00 - 05:00",
    price: "$$$",
    image: "carnaval.jpg",
    coordinates: { latitude: -22.9122, longitude: -43.1965 }
  },
  {
    id: "rock-in-rio",
    name: "Rock in Rio 2025",
    type: "event",
    description: "Um dos maiores festivais de música do mundo.",
    rating: 4.7,
    reviews: [
      { user: "Thiago P.", rating: 5, comment: "Line-up sempre incrível!", date: "2022-09-10" },
      { user: "Carolina A.", rating: 4.5, comment: "Organização impecável e shows maravilhosos.", date: "2022-09-09" }
    ],
    address: "Parque Olímpico - Barra da Tijuca",
    openingHours: "14:00 - 02:00",
    price: "$$$",
    image: "rock-in-rio.jpg",
    coordinates: { latitude: -22.9770, longitude: -43.3936 }
  }
];

// Adicionar pontos turísticos para outras cidades
export const nycPlaces: Place[] = [
  {
    id: "times-square",
    name: "Times Square",
    type: "tourist",
    description: "Um dos lugares mais visitados do mundo, com seus enormes painéis digitais.",
    rating: 4.6,
    reviews: [
      { user: "Pedro L.", rating: 5, comment: "Incrível, principalmente à noite!", date: "2023-07-15" },
      { user: "Carla M.", rating: 4, comment: "Muito movimentado mas vale a pena.", date: "2023-08-22" }
    ],
    address: "Manhattan, NY 10036",
    openingHours: "24 horas",
    price: "$",
    image: "times-square.jpg",
    coordinates: { latitude: 40.7580, longitude: -73.9855 }
  },
  {
    id: "central-park",
    name: "Central Park",
    type: "tourist",
    description: "Um oásis verde no meio da selva de pedra de Manhattan.",
    rating: 4.8,
    reviews: [
      { user: "Fernanda S.", rating: 5, comment: "Lugar perfeito para relaxar!", date: "2023-09-05" },
      { user: "Ricardo P.", rating: 5, comment: "Imperdível em qualquer estação do ano.", date: "2023-06-18" }
    ],
    address: "Manhattan, NY",
    openingHours: "6:00 - 22:00",
    price: "$",
    image: "central-park.jpg",
    coordinates: { latitude: 40.7829, longitude: -73.9654 }
  },
  {
    id: "broadway",
    name: "Broadway Shows",
    type: "event",
    description: "Os famosos musicais que são referência mundial.",
    rating: 4.9,
    reviews: [
      { user: "Laura B.", rating: 5, comment: "Experiência única e inesquecível!", date: "2023-08-30" },
      { user: "Thiago M.", rating: 5, comment: "Produções impressionantes.", date: "2023-07-12" }
    ],
    address: "Theatre District, Manhattan",
    openingHours: "Varia conforme o espetáculo",
    price: "$$$",
    image: "broadway.jpg",
    coordinates: { latitude: 40.7590, longitude: -73.9845 }
  }
];

export const parisPlaces: Place[] = [
  {
    id: "eiffel",
    name: "Torre Eiffel",
    type: "tourist",
    description: "O símbolo mais famoso de Paris e da França.",
    rating: 4.7,
    reviews: [
      { user: "Ana R.", rating: 5, comment: "Vista espetacular, principalmente ao anoitecer!", date: "2023-08-20" },
      { user: "Paulo C.", rating: 4, comment: "Filas longas, mas vale a pena.", date: "2023-07-10" }
    ],
    address: "Champ de Mars, 5 Avenue Anatole France",
    openingHours: "9:00 - 23:45",
    price: "$$",
    image: "eiffel.jpg",
    coordinates: { latitude: 48.8584, longitude: 2.2945 }
  },
  {
    id: "louvre",
    name: "Museu do Louvre",
    type: "tourist",
    description: "O maior museu de arte do mundo e lar da Mona Lisa.",
    rating: 4.8,
    reviews: [
      { user: "Bianca L.", rating: 5, comment: "Um dia não é suficiente para ver tudo!", date: "2023-09-15" },
      { user: "Rodrigo S.", rating: 5, comment: "Impressionante coleção de arte.", date: "2023-06-25" }
    ],
    address: "Rue de Rivoli, 75001",
    openingHours: "9:00 - 18:00 (fechado às terças)",
    price: "$$",
    image: "louvre.jpg",
    coordinates: { latitude: 48.8606, longitude: 2.3376 }
  }
];

export const tokyoPlaces: Place[] = [
  {
    id: "shibuya",
    name: "Cruzamento de Shibuya",
    type: "tourist",
    description: "O cruzamento mais movimentado do mundo.",
    rating: 4.5,
    reviews: [
      { user: "Fernando K.", rating: 5, comment: "Experiência única ver tantas pessoas atravessando ao mesmo tempo!", date: "2023-08-05" },
      { user: "Mariana T.", rating: 4, comment: "Muito movimentado, mas incrível de se ver.", date: "2023-07-22" }
    ],
    address: "Shibuya, Tóquio",
    openingHours: "24 horas",
    price: "$",
    image: "shibuya.jpg",
    coordinates: { latitude: 35.6595, longitude: 139.7004 }
  },
  {
    id: "tokyo-skytree",
    name: "Tokyo Skytree",
    type: "tourist",
    description: "Uma das torres mais altas do mundo com vista panorâmica.",
    rating: 4.6,
    reviews: [
      { user: "Rafael N.", rating: 5, comment: "Vista impressionante de toda Tóquio!", date: "2023-09-10" },
      { user: "Catarina P.", rating: 4, comment: "Espetacular, principalmente ao pôr do sol.", date: "2023-06-15" }
    ],
    address: "1 Chome-1-2 Oshiage, Sumida City",
    openingHours: "10:00 - 21:00",
    price: "$$",
    image: "tokyo-skytree.jpg",
    coordinates: { latitude: 35.7101, longitude: 139.8107 }
  }
];

// Função para obter lugares por cidade
export const getPlacesByCity = (cityId: string): Place[] => {
  switch(cityId) {
    case "rio": return rioPlaces;
    case "nyc": return nycPlaces;
    case "paris": return parisPlaces;
    case "tokyo": return tokyoPlaces;
    default: return [];
  }
};

// Lista de continentes
export const continents = [
  "Todos",
  "América do Norte",
  "América do Sul",
  "Europa",
  "Ásia",
  "África",
  "Oceania"
];
