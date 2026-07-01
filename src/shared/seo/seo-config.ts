export const SEO_CONFIG = {
  home: {
    title: 'Cars for Sale in Zambia | Buy and Sell Vehicles | CarTradez',
    description:
      'Find the best cars for sale in Zambia on CarTradez. Browse used cars SUVs trucks and more. Buy from local sellers or post your vehicle for sale online today.',
    path: '/',
    image: '/images/og/home.jpg',
    keywords: [
      'cars for sale in Zambia',
      'used cars Zambia',
      'buy cars in Zambia',
      'sell cars in Zambia',
      'SUVs for sale Zambia',
      'trucks for sale Zambia',
      'CarTradez',
    ],
  },

  about: {
    title: 'About CarTradez | Trusted Vehicle Marketplace in Zambia',
    description:
      'Learn about CarTradez, a trusted online vehicle marketplace in Zambia helping buyers and sellers connect easily for cars, SUVs, trucks and other vehicles.',
    path: '/about',
    image: '/images/og/about.jpg',
    keywords: [
      'about CarTradez',
      'CarTradez Zambia',
      'vehicle marketplace Zambia',
      'used car platform Zambia',
      'buy and sell cars Zambia',
      'trusted car marketplace',
    ],
  },

  vehicles: {
    title: 'Used Cars for Sale in Zambia | CarTradez',
    description:
      'Browse used cars for sale in Zambia on CarTradez. Compare vehicles, contact sellers and post your car for sale online.',
    path: '/vehicles',
    image: '/images/og/vehicles.jpg',
    keywords: [
      'used cars for sale Zambia',
      'cars for sale',
      'buy used cars',
      'vehicle marketplace Zambia',
    ],
  },

contact: {
  title: 'Contact CarTradez | Vehicle Listing Support',
  description:
    'Contact CarTradez for vehicle listing support, buying assistance and seller information.',
  path: '/contact',
  image: '/images/og/contact.jpg',
  keywords: [
    'contact CarTradez',
    'car listing support Zambia',
    'vehicle listing support',
    'buy car support Zambia',
    'sell car support Zambia',
  ],
},
} as const;

export type SEOPageName = keyof typeof SEO_CONFIG;