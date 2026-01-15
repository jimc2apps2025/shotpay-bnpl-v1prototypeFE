export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'rifle' | 'pistol' | 'ammunition' | 'accessory' | 'target';
  description: string;
  image: string;
  features: string[];
  specifications: {
    caliber?: string;
    capacity?: string;
    barrelLength?: string;
    weight?: string;
    action?: string;
    finish?: string;
    rounds?: number;
    grain?: number | string;
    type?: string;
    size?: string;
    material?: string;
  };
  inStock: boolean;
  fflRequired: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Glock 19 Gen 5 9mm Pistol',
    price: 549.99,
    category: 'pistol',
    image: '/images/products/glock-19-gen5.png',
    description: 'The Glock 19 Gen 5 is a compact, versatile 9mm pistol perfect for concealed carry and home defense. This fifth generation model features improved ergonomics, enhanced grip texture, and the Glock Marksman Barrel for improved accuracy. The ambidextrous slide stop lever makes it suitable for both right and left-handed shooters.',
    features: [
      '9mm Luger caliber',
      '15+1 round capacity',
      '4.02" barrel length',
      'Modular backstrap system',
      'Glock Marksman Barrel (GMB)',
      'nDLC finish for enhanced durability',
      'Ambidextrous slide stop lever',
      'No finger grooves for improved grip',
    ],
    specifications: {
      caliber: '9mm Luger',
      capacity: '15+1 rounds',
      barrelLength: '4.02 inches',
      weight: '24.83 oz (unloaded)',
      action: 'Safe Action',
      finish: 'nDLC',
    },
    inStock: true,
    fflRequired: true,
  },
  {
    id: 2,
    name: 'Smith & Wesson M&P15 Sport II AR-15',
    price: 749.99,
    category: 'rifle',
    image: '/images/products/smith-wesson-mp15.jpg',
    description: 'The M&P15 Sport II is a reliable, feature-rich AR-15 platform rifle built for performance and value. This modern sporting rifle features a 16" barrel, Magpul MBUS flip-up sights, and a 6-position collapsible stock. Perfect for target shooting, home defense, and recreational use.',
    features: [
      '5.56 NATO / .223 Remington caliber',
      '16" barrel with 1:9 twist rate',
      '30-round Magpul PMAG included',
      'Magpul MBUS flip-up sights',
      '6-position collapsible stock',
      'Forward assist and dust cover',
      'Hard-coat anodized finish',
      'M4 feed ramps',
    ],
    specifications: {
      caliber: '5.56 NATO / .223 Rem',
      capacity: '30+1 rounds',
      barrelLength: '16 inches',
      weight: '6.5 lbs',
      action: 'Semi-automatic',
      finish: 'Hard-coat anodized',
    },
    inStock: true,
    fflRequired: true,
  },
  {
    id: 3,
    name: 'Remington 870 Express 12 Gauge Shotgun',
    price: 429.99,
    category: 'rifle',
    image: '/images/products/remington-870.png',
    description: 'The Remington 870 Express is one of the most popular pump-action shotguns ever made. Known for its reliability and versatility, this 12-gauge shotgun is perfect for hunting, home defense, and sport shooting. Features a durable synthetic stock and matte finish.',
    features: [
      '12 gauge chamber',
      '3" chamber accepts 2-3/4" and 3" shells',
      '28" vent rib barrel',
      'Pump-action mechanism',
      'Synthetic stock and forend',
      'Bead sight',
      '4+1 capacity',
      'Crossbolt safety',
    ],
    specifications: {
      caliber: '12 Gauge',
      capacity: '4+1 rounds',
      barrelLength: '28 inches',
      weight: '7.5 lbs',
      action: 'Pump-action',
      finish: 'Matte blue',
    },
    inStock: true,
    fflRequired: true,
  },
  {
    id: 7,
    name: 'Sig Sauer P320 Compact 9mm Pistol',
    price: 599.99,
    category: 'pistol',
    image: '/images/products/sig-p320.jpg',
    description: 'The Sig Sauer P320 Compact is a modular, striker-fired pistol that offers exceptional ergonomics and reliability. The P320 features a removable fire control unit that allows for easy customization. This compact model is perfect for concealed carry.',
    features: [
      '9mm Luger caliber',
      '15+1 round capacity',
      '3.9" barrel length',
      'Modular fire control unit',
      'Striker-fired action',
      'Nitron finish',
      'Interchangeable grip modules',
      'SIGLITE night sights',
    ],
    specifications: {
      caliber: '9mm Luger',
      capacity: '15+1 rounds',
      barrelLength: '3.9 inches',
      weight: '25.8 oz (unloaded)',
      action: 'Striker-fired',
      finish: 'Nitron',
    },
    inStock: true,
    fflRequired: true,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

