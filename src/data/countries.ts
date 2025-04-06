
// Define countries and their coordinates
export interface Country {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  isCity?: boolean;
}

// Add Rio de Janeiro as a featured city
export const countries: Country[] = [
  { id: "rio", name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, description: "A cidade maravilhosa", isCity: true },
  { id: "br", name: "Brasil", latitude: -14.235, longitude: -51.9253 },
  { id: "us", name: "United States", latitude: 37.0902, longitude: -95.7129 },
  { id: "gb", name: "United Kingdom", latitude: 55.3781, longitude: -3.4360 },
  { id: "fr", name: "France", latitude: 46.2276, longitude: 2.2137 },
  { id: "de", name: "Germany", latitude: 51.1657, longitude: 10.4515 },
  { id: "jp", name: "Japan", latitude: 36.2048, longitude: 138.2529 },
  { id: "au", name: "Australia", latitude: -25.2744, longitude: 133.7751 },
  { id: "za", name: "South Africa", latitude: -30.5595, longitude: 22.9375 },
  { id: "in", name: "India", latitude: 20.5937, longitude: 78.9629 },
  { id: "cn", name: "China", latitude: 35.8617, longitude: 104.1954 },
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
