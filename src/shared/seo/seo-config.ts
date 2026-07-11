export const SEO_CONFIG = {
  home: {
    title: 'Cars for Sale in Zambia | Buy and Sell Vehicles | CarTradez',
    description:
      'Find the best cars for sale in Zambia on CarTradez. Browse used cars, SUVs, trucks and more. Buy from local sellers or post your vehicle for sale online today.',
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
      'Browse used cars for sale in Zambia on CarTradez. Compare vehicles, view photos, contact sellers and post your car for sale online.',
    path: '/vehicles/all',
    image: '/images/og/vehicles.jpg',
    keywords: [
      'used cars for sale Zambia',
      'cars for sale Zambia',
      'buy used cars Zambia',
      'vehicle marketplace Zambia',
      'car listings Zambia',
    ],
  },

  managedByCartradez: {
    title: 'Managed Cars for Sale in Zambia | CarTradez',
    description:
      'Browse vehicles managed by CarTradez in Zambia. Find verified car listings with photos, details and seller support.',
    path: '/vehicles/managed-by-cartradez',
    image: '/images/og/vehicles.jpg',
    keywords: [
      'managed cars Zambia',
      'verified cars for sale Zambia',
      'CarTradez managed vehicles',
      'cars for sale Zambia',
    ],
  },

  contact: {
    title: 'Contact CarTradez | Vehicle Listing Support',
    description:
      'Contact CarTradez for vehicle listing support, buying assistance and seller information in Zambia.',
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

  faq: {
    title: 'Car Buying and Selling FAQs | CarTradez Zambia',
    description:
      'Find answers to common questions about buying, selling and listing vehicles on CarTradez in Zambia.',
    path: '/faq',
    image: '/images/og/home.jpg',
    keywords: [
      'CarTradez FAQs',
      'car buying questions Zambia',
      'selling car questions Zambia',
      'vehicle listing help',
    ],
  },

  guidelines: {
    title: 'Buyer and Seller Guide | CarTradez Zambia',
    description:
      'Read CarTradez buyer and seller guidelines for safer vehicle transactions, car listings and online vehicle deals in Zambia.',
    path: '/guidelines',
    image: '/images/og/home.jpg',
    keywords: [
      'car buyer guide Zambia',
      'car seller guide Zambia',
      'vehicle safety guide',
      'buy and sell cars safely',
    ],
  },

  privacy: {
    title: 'Privacy Policy | CarTradez',
    description:
      'Read the CarTradez privacy policy to understand how user information is collected, used and protected.',
    path: '/privacy',
    image: '/images/og/home.jpg',
    keywords: ['CarTradez privacy policy', 'vehicle website privacy policy'],
  },

  terms: {
    title: 'Terms and Conditions | CarTradez',
    description:
      'Read the CarTradez terms and conditions for using the website, vehicle listings and related services.',
    path: '/terms',
    image: '/images/og/home.jpg',
    keywords: ['CarTradez terms', 'vehicle listing terms', 'car website terms'],
  },

  refund: {
    title: 'Refund Policy | CarTradez',
    description:
      'Read the CarTradez refund policy for information about payments, listing services and refund conditions.',
    path: '/refund',
    image: '/images/og/home.jpg',
    keywords: ['CarTradez refund policy', 'vehicle listing refund policy'],
  },
} as const;

export type SEOPageName = keyof typeof SEO_CONFIG;