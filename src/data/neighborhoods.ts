
// Interface para representar bairros do Rio de Janeiro
export interface Neighborhood {
  id: string;
  name: string;
  zone: "sul" | "norte" | "oeste" | "central";
  description: string;
  x: number; // Posição X no modelo 3D
  z: number; // Posição Z no modelo 3D
  size: number; // Tamanho do bairro no modelo 3D
  subNeighborhoods?: SubNeighborhood[];
}

export interface SubNeighborhood {
  id: string;
  name: string;
  description: string;
}

// Interface para lugares/atrações
export interface Place {
  id: string;
  name: string;
  type: "tourist" | "restaurant" | "nightclub" | "event";
  description: string;
  address: string;
  neighborhood: string; // ID do bairro
  price?: string;
  rating: number;
  openingHours?: string;
  reviews: Review[];
}

// Interface para avaliações de lugares
export interface Review {
  user: string;
  rating: number;
  date: string;
  comment: string;
}

// Lista de bairros do Rio de Janeiro
export const neighborhoods: Neighborhood[] = [
  {
    id: "copacabana",
    name: "Copacabana",
    zone: "sul",
    description: "Famoso bairro com praia mundialmente conhecida e calçadão icônico.",
    x: -1.5,
    z: 1.2,
    size: 0.8,
  },
  {
    id: "ipanema",
    name: "Ipanema",
    zone: "sul",
    description: "Bairro sofisticado com praia famosa, conhecido pela música Garota de Ipanema.",
    x: -2.2,
    z: 0.6,
    size: 0.7,
  },
  {
    id: "leblon",
    name: "Leblon",
    zone: "sul",
    description: "Bairro de alto padrão com uma das praias mais exclusivas da cidade.",
    x: -2.5,
    z: -0.1,
    size: 0.6,
  },
  {
    id: "lapa",
    name: "Lapa",
    zone: "central",
    description: "Centro da vida noturna carioca, com os famosos Arcos da Lapa.",
    x: 0.2,
    z: 0.8,
    size: 0.6,
  },
  {
    id: "centro",
    name: "Centro",
    zone: "central",
    description: "Região histórica e comercial da cidade, com diversos pontos turísticos.",
    x: 0.2,
    z: -0.2,
    size: 0.9,
  },
  {
    id: "tijuca",
    name: "Tijuca",
    zone: "norte",
    description: "Grande bairro arborizado próximo à floresta da Tijuca.",
    x: 0.8,
    z: -1.2,
    size: 1.0,
  },
  {
    id: "barra",
    name: "Barra da Tijuca",
    zone: "oeste",
    description: "Bairro moderno com praias extensas e grandes shoppings.",
    x: -1.2,
    z: -2.0,
    size: 1.2,
  },
  {
    id: "botafogo",
    name: "Botafogo",
    zone: "sul",
    description: "Bairro tradicional com vista para o Pão de Açúcar.",
    x: -0.5,
    z: 0.3,
    size: 0.7,
  },
  {
    id: "flamengo",
    name: "Flamengo",
    zone: "sul",
    description: "Bairro residencial com grande parque à beira da baía.",
    x: -0.1,
    z: 0.3,
    size: 0.6,
  },
  {
    id: "maracana",
    name: "Maracanã",
    zone: "norte",
    description: "Bairro conhecido pelo famoso estádio de futebol.",
    x: 1.5,
    z: 0.1,
    size: 0.7,
  },
  {
    id: "gavea",
    name: "Gávea",
    zone: "sul",
    description: "Bairro nobre próximo à Lagoa Rodrigo de Freitas.",
    x: -1.8,
    z: -0.8,
    size: 0.5,
  },
  {
    id: "santateresa",
    name: "Santa Teresa",
    zone: "central",
    description: "Bairro histórico nas colinas com vista panorâmica e bondinho.",
    x: 0.6,
    z: 0.5,
    size: 0.5,
  },
  {
    id: "recreio",
    name: "Recreio",
    zone: "oeste",
    description: "Bairro com belas praias e natureza preservada.",
    x: -2.0,
    z: -2.6,
    size: 0.8,
  },
  {
    id: "meier",
    name: "Méier",
    zone: "norte",
    description: "Bairro comercial importante da Zona Norte.",
    x: 1.8,
    z: -0.8,
    size: 0.6,
  },
];

// Lista de lugares/atrações no Rio organizados por bairro
export const rioPlaces: Place[] = [
  // Copacabana
  {
    id: "copa1",
    name: "Praia de Copacabana",
    type: "tourist",
    description: "A famosa praia de 4km com calçadão de ondas em pedra portuguesa e quiosques.",
    address: "Av. Atlântica, Copacabana, Rio de Janeiro",
    neighborhood: "copacabana",
    rating: 4.7,
    reviews: [
      {
        user: "Maria S.",
        rating: 5,
        date: "2023-02-15",
        comment: "A praia mais icônica do Rio! O calçadão é lindo."
      },
      {
        user: "João P.",
        rating: 4,
        date: "2023-03-22",
        comment: "Sempre movimentada, ótimo para pessoas assistirem."
      }
    ]
  },
  {
    id: "copa2",
    name: "Forte de Copacabana",
    type: "tourist",
    description: "Forte militar histórico com museu e vista panorâmica para o mar.",
    address: "Praça Coronel Eugênio Franco, Copacabana",
    neighborhood: "copacabana",
    openingHours: "10:00 - 18:00",
    rating: 4.5,
    reviews: [
      {
        user: "Ana L.",
        rating: 5,
        date: "2023-04-10",
        comment: "Vista incrível e ótimo museu militar."
      }
    ]
  },
  {
    id: "copa3",
    name: "Copacabana Palace",
    type: "tourist",
    description: "Hotel histórico de luxo, marco arquitetônico da cidade.",
    address: "Av. Atlântica, 1702, Copacabana",
    neighborhood: "copacabana",
    rating: 4.8,
    reviews: [
      {
        user: "Roberto M.",
        rating: 5,
        date: "2023-01-30",
        comment: "Uma joia arquitetônica, mesmo que você não se hospede."
      }
    ]
  },
  {
    id: "copa4",
    name: "Churrascaria Palace",
    type: "restaurant",
    description: "Tradicional churrascaria com cortes premium e buffet completo.",
    address: "Rua Rodolfo Dantas, 16, Copacabana",
    neighborhood: "copacabana",
    price: "$$$$",
    openingHours: "12:00 - 00:00",
    rating: 4.6,
    reviews: [
      {
        user: "Carlos R.",
        rating: 5,
        date: "2023-05-12",
        comment: "Melhor churrasco que já comi! Serviço impecável."
      }
    ]
  },

  // Ipanema
  {
    id: "ipa1",
    name: "Praia de Ipanema",
    type: "tourist",
    description: "Praia famosa entre as montanhas Dois Irmãos e o Arpoador.",
    address: "Av. Vieira Souto, Ipanema, Rio de Janeiro",
    neighborhood: "ipanema",
    rating: 4.8,
    reviews: [
      {
        user: "Luiza K.",
        rating: 5,
        date: "2023-02-18",
        comment: "Pôr do sol no Arpoador é uma experiência única!"
      }
    ]
  },
  {
    id: "ipa2",
    name: "Bar Garota de Ipanema",
    type: "restaurant",
    description: "Bar histórico onde foi composta a famosa música Garota de Ipanema.",
    address: "Rua Vinícius de Moraes, 49, Ipanema",
    neighborhood: "ipanema",
    price: "$$$",
    openingHours: "12:00 - 02:00",
    rating: 4.3,
    reviews: [
      {
        user: "Thomas B.",
        rating: 4,
        date: "2023-03-05",
        comment: "Ótimo para sentir a história da bossa nova. Comida boa também."
      }
    ]
  },
  {
    id: "ipa3",
    name: "Feira Hippie de Ipanema",
    type: "tourist",
    description: "Feira de artesanato tradicional que acontece aos domingos.",
    address: "Praça General Osório, Ipanema",
    neighborhood: "ipanema",
    openingHours: "Dom 10:00 - 17:00",
    rating: 4.4,
    reviews: [
      {
        user: "Mariana T.",
        rating: 4,
        date: "2023-04-02",
        comment: "Ótima variedade de artesanato e souvenirs."
      }
    ]
  },

  // Centro
  {
    id: "centro1",
    name: "Museu do Amanhã",
    type: "tourist",
    description: "Museu de ciências aplicadas que explora as possibilidades de construção do futuro.",
    address: "Praça Mauá, 1, Centro",
    neighborhood: "centro",
    price: "$$",
    openingHours: "10:00 - 18:00 (Fechado às segundas)",
    rating: 4.6,
    reviews: [
      {
        user: "Felipe A.",
        rating: 5,
        date: "2023-03-14",
        comment: "Arquitetura impressionante e exposições interativas."
      }
    ]
  },
  {
    id: "centro2",
    name: "Teatro Municipal",
    type: "tourist",
    description: "Teatro histórico inspirado na Ópera de Paris.",
    address: "Praça Floriano, Centro",
    neighborhood: "centro",
    openingHours: "Depende da programação",
    rating: 4.7,
    reviews: [
      {
        user: "Beatriz C.",
        rating: 5,
        date: "2023-02-25",
        comment: "Um dos prédios mais bonitos do Rio. Tour guiado excelente."
      }
    ]
  },
  
  // Lapa
  {
    id: "lapa1",
    name: "Arcos da Lapa",
    type: "tourist",
    description: "Aqueduto histórico do século XVIII e símbolo da boemia carioca.",
    address: "Av. Mem de Sá, Lapa",
    neighborhood: "lapa",
    rating: 4.5,
    reviews: [
      {
        user: "Diego F.",
        rating: 4,
        date: "2023-05-20",
        comment: "Ponto de encontro para a vida noturna carioca."
      }
    ]
  },
  {
    id: "lapa2",
    name: "Rio Scenarium",
    type: "nightclub",
    description: "Casa de shows e restaurante em um casarão histórico com três andares.",
    address: "Rua do Lavradio, 20, Lapa",
    neighborhood: "lapa",
    price: "$$$",
    openingHours: "19:00 - 04:00",
    rating: 4.6,
    reviews: [
      {
        user: "Marcelo S.",
        rating: 5,
        date: "2023-04-18",
        comment: "Melhor casa para curtir música brasileira ao vivo!"
      }
    ]
  },
  {
    id: "lapa3",
    name: "Escadaria Selarón",
    type: "tourist",
    description: "Escadaria colorida coberta com azulejos de diversos países.",
    address: "Rua Joaquim Silva, Lapa",
    neighborhood: "lapa",
    rating: 4.7,
    reviews: [
      {
        user: "Julia M.",
        rating: 5,
        date: "2023-01-12",
        comment: "Uma obra de arte a céu aberto. Cores incríveis!"
      }
    ]
  },
  
  // Mais lugares para outros bairros
  // Barra da Tijuca
  {
    id: "barra1",
    name: "Praia da Barra",
    type: "tourist",
    description: "Praia extensa com águas limpas e ótima para surfistas.",
    address: "Av. Lúcio Costa, Barra da Tijuca",
    neighborhood: "barra",
    rating: 4.5,
    reviews: [
      {
        user: "Thiago B.",
        rating: 5,
        date: "2023-03-08",
        comment: "A melhor praia para surfar no Rio!"
      }
    ]
  },
  {
    id: "barra2",
    name: "Shopping BarraShopping",
    type: "tourist",
    description: "Um dos maiores shoppings do Brasil, com lojas, restaurantes e entretenimento.",
    address: "Av. das Américas, 4666, Barra da Tijuca",
    neighborhood: "barra",
    openingHours: "10:00 - 22:00",
    rating: 4.4,
    reviews: [
      {
        user: "Paula V.",
        rating: 4,
        date: "2023-02-14",
        comment: "Ótimas opções de compras e restaurantes."
      }
    ]
  },
  
  // Santa Teresa
  {
    id: "santa1",
    name: "Parque das Ruínas",
    type: "tourist",
    description: "Antigo casarão transformado em centro cultural com vista panorâmica.",
    address: "Rua Murtinho Nobre, 169, Santa Teresa",
    neighborhood: "santateresa",
    openingHours: "8:00 - 18:00 (Fechado às segundas)",
    rating: 4.6,
    reviews: [
      {
        user: "Renata P.",
        rating: 5,
        date: "2023-04-25",
        comment: "Vista incrível do Rio e exposições interessantes."
      }
    ]
  },
  {
    id: "santa2",
    name: "Bondinho de Santa Teresa",
    type: "tourist",
    description: "Bonde histórico que cruza o bairro em um passeio panorâmico.",
    address: "Largo dos Guimarães, Santa Teresa",
    neighborhood: "santateresa",
    rating: 4.5,
    reviews: [
      {
        user: "Eduardo N.",
        rating: 4,
        date: "2023-03-30",
        comment: "Experiência única e autêntica."
      }
    ]
  },
  
  // Eventos em vários bairros
  {
    id: "evento1",
    name: "Carnaval de Rua",
    type: "event",
    description: "Blocos de carnaval que desfilam pelas ruas da cidade.",
    address: "Diversos locais, Rio de Janeiro",
    neighborhood: "centro",
    openingHours: "Fevereiro/Março",
    rating: 4.9,
    reviews: [
      {
        user: "Leonardo T.",
        rating: 5,
        date: "2023-03-01",
        comment: "A melhor experiência do carnaval carioca!"
      }
    ]
  },
  {
    id: "evento2",
    name: "Festival do Rio",
    type: "event",
    description: "Festival internacional de cinema com exibições em diversos locais da cidade.",
    address: "Cinemas pela cidade, Rio de Janeiro",
    neighborhood: "ipanema",
    openingHours: "Setembro/Outubro",
    rating: 4.7,
    reviews: [
      {
        user: "Carolina A.",
        rating: 5,
        date: "2022-10-15",
        comment: "Programação incrível com filmes do mundo todo."
      }
    ]
  }
];

export function getPlacesByNeighborhood(neighborhoodId: string): Place[] {
  return rioPlaces.filter(place => place.neighborhood === neighborhoodId);
}
