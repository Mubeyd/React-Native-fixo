const Images = [
  {image: require('../assets/banners/service-banner1.jpeg')},
  {image: require('../assets/banners/service-banner2.jpeg')},
  {image: require('../assets/banners/service-banner3.jpeg')},
  {image: require('../assets/banners/service-banner4.jpeg')},
  {image: require('../assets/banners/service-banner5.jpeg')},
];

export const markers = [
  {
    coordinate: {
      latitude: 37.03137,
      longitude: 37.32139,
    },
    title: 'Pikachu',
    description: 'Pikachu are a species of Pokémon, fictional creatures',
    image: Images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 37.032924,
      longitude: 37.319036,
    },
    title: 'Eevee',
    description: 'Eevee is a Pokémon species in Nintendo and Game Freak',
    image: Images[1].image,
    rating: 5,
    reviews: 102,
  },
  {
    coordinate: {
      latitude: 37.034341,
      longitude: 37.320393,
    },
    title: 'Snorlax',
    description: 'a type of Pocket Monster, in Nintendo',
    image: Images[2].image,
    rating: 3,
    reviews: 220,
  },
  {
    coordinate: {
      latitude: 37.035137,
      longitude: 37.319047,
    },
    title: 'Charizard',
    description: 'is a Pokémon in Nintendo Freak.\'s Pokémon franchise',
    image: Images[3].image,
    rating: 4,
    reviews: 48,
  },
  {
    coordinate: {
      latitude: 37.035942,
      longitude: 37.320769,
    },
    title: 'Squirtle',
    description: 'It was designed by Atsuko Nishida Atsuko Nishida',
    image: Images[4].image,
    rating: 4,
    reviews: 178,
  },
];
