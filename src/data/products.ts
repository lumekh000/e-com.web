import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Acoustic Clarity Noise Cancelling Headphones',
    slug: 'acoustic-clarity-noise-cancelling-headphones',
    brand: 'Lumina Tech',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 249.00,
    originalPrice: 349.00,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Immerse yourself in pristine, studio-grade acoustics. Engineered with hybrid active noise cancellation, custom 40mm titanium drivers, and 45 hours of continuous wireless playback.',
    features: [
      'Hybrid Active Noise Cancellation (ANC) with 3 ambient modes',
      'Custom 40mm Titanium Drivers for deep bass and crystal clear highs',
      '45-hour battery life with 10-minute quick charge (adds 5 hours)',
      'Memory foam ear cushions wrapped in breathable protein leather',
      'Multi-point Bluetooth 5.3 instant device switching'
    ],
    specifications: {
      'Driver Unit': '40mm Titanium Dynamic',
      'Frequency Response': '10 Hz - 40,000 Hz',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.3, 3.5mm Aux, USB-C Audio',
      'Battery Life': '45 Hours (ANC On)'
    },
    colors: ['Forest Green', 'Matte Black', 'Sand Ivory'],
    inStock: true,
    stockCount: 18,
    isTopPick: true,
    isFeatured: true,
    isDeal: true,
    tags: ['wireless', 'audio', 'headphones', 'anc'],
    createdAt: '2026-09-01'
  },
  {
    id: 'p2',
    name: 'French Flax Linen Casual Shirt',
    slug: 'french-flax-linen-casual-shirt',
    brand: 'Atelier Linen',
    category: 'fashion',
    categoryName: 'Fashion',
    price: 89.00,
    originalPrice: 120.00,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Woven from 100% Normandy French flax linen, garment-dyed and stone-washed for supreme softness and effortless drape. A breathable staple built to age gracefully.',
    features: [
      '100% Certified French Flax Linen',
      'Pre-washed stone finish for zero shrinkage',
      'Mother-of-pearl buttons with reinforced cross-stitching',
      'Relaxed tailored fit suitable for warm days or layered outfits'
    ],
    specifications: {
      'Material': '100% French Flax Linen',
      'Fit': 'Relaxed Modern',
      'Care': 'Machine wash cold, tumble dry low',
      'Origin': 'Ethically crafted in Portugal'
    },
    colors: ['Sage Green', 'Warm Beige', 'Crisp White', 'Deep Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 32,
    isTopPick: true,
    isNewArrival: true,
    tags: ['clothing', 'linen', 'shirt', 'sustainable'],
    createdAt: '2026-09-15'
  },
  {
    id: 'p3',
    name: 'Minimalist 10% Niacinamide + Zinc Serum',
    slug: 'minimalist-niacinamide-zinc-serum',
    brand: 'Botanica Organics',
    category: 'beauty',
    categoryName: 'Beauty',
    price: 34.00,
    originalPrice: 45.00,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A concentrated bio-active facial elixir that refines skin texture, balances oil production, and minimizes pore appearance without dryness.',
    features: [
      '10% Pure Niacinamide (Vitamin B3) + 1% Zinc PCA',
      'Infused with Hyaluronic Acid & Organic Green Tea Extract',
      '100% Vegan, Cruelty-Free, and fragrance-free formula',
      'Dermatologically tested for sensitive and acne-prone skin'
    ],
    specifications: {
      'Volume': '50ml / 1.7 fl. oz.',
      'Skin Type': 'All Skin Types',
      'Texture': 'Lightweight Water Gel',
      'Key Ingredients': 'Niacinamide, Zinc PCA, Hyaluronic Acid'
    },
    colors: ['Clear Bottle'],
    inStock: true,
    stockCount: 45,
    isTopPick: true,
    isFeatured: true,
    tags: ['skincare', 'serum', 'beauty', 'organic'],
    createdAt: '2026-08-20'
  },
  {
    id: 'p4',
    name: 'Artisanal Compact Espresso Coffee Maker',
    slug: 'artisanal-compact-espresso-coffee-maker',
    brand: 'Nordique Living',
    category: 'home-living',
    categoryName: 'Home & Living',
    price: 189.00,
    originalPrice: 240.00,
    discountPercentage: 21,
    rating: 4.7,
    reviewCount: 86,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Bring specialty cafe espresso home. Compact footprint with 19-bar Italian pump pressure, thermo-block fast heating in 25 seconds, and integrated milk steam wand.',
    features: [
      '19-Bar Italian Extraction Pump for rich crema',
      'Fast 25-second thermo-block heating system',
      'Micro-foam steam wand for silky lattes and cappuccinos',
      'Solid brushed stainless steel chassis with forest green accent trim'
    ],
    specifications: {
      'Water Tank Capacity': '1.2 Liters',
      'Pump Pressure': '19 Bar',
      'Dimensions': '15 x 30 x 28 cm',
      'Power': '1350W'
    },
    colors: ['Forest Green', 'Matte Ivory', 'Stainless Steel'],
    inStock: true,
    stockCount: 14,
    isTopPick: true,
    isDeal: true,
    tags: ['coffee', 'espresso', 'kitchen', 'home'],
    createdAt: '2026-08-28'
  },
  {
    id: 'p5',
    name: 'Modular Urban Travel Backpack 30L',
    slug: 'modular-urban-travel-backpack-30l',
    brand: 'Aegis Travel',
    category: 'sports',
    categoryName: 'Sports',
    price: 139.00,
    originalPrice: 180.00,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed for commuting, weekend getaways, and remote work travel. Features waterproof Cordura fabric, 16-inch padded laptop sleeve, expandable 30L compartment, and hidden passport security pocket.',
    features: [
      'Weatherproof 900D Recycled Cordura Fabric',
      'TSA-friendly 180-degree flat opening for easy packing',
      'Padded sleeve fits laptops up to 16 inches',
      'Luggage pass-through strap and ergonomic airflow back panel'
    ],
    specifications: {
      'Capacity': '24L - 30L (Expandable)',
      'Dimensions': '48 x 32 x 18 cm',
      'Weight': '1.1 kg',
      'Laptop Size': 'Up to 16" MacBook Pro'
    },
    colors: ['Deep Forest', 'Charcoal Slate', 'Khaki Tan'],
    inStock: true,
    stockCount: 22,
    isTopPick: true,
    isNewArrival: true,
    tags: ['backpack', 'travel', 'luggage', 'waterproof'],
    createdAt: '2026-09-10'
  },
  {
    id: 'p6',
    name: 'Minimalist Ceramic Table Lamp & Wireless Charger',
    slug: 'minimalist-ceramic-table-lamp-wireless-charger',
    brand: 'Nordique Living',
    category: 'home-living',
    categoryName: 'Home & Living',
    price: 119.00,
    originalPrice: 150.00,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculptural ceramic bedside lamp featuring 3-step dimmable warm LED glow and a seamless 15W Qi fast wireless charging base.',
    features: [
      'Handcrafted terracotta ceramic base with matte glaze',
      'Integrated 15W Qi wireless charging pad',
      'Touch-sensitive 3-stage dimmer switch (2700K Warm Glow)',
      'Energy efficient 6W LED bulb included'
    ],
    specifications: {
      'Height': '32 cm',
      'Base Diameter': '16 cm',
      'Charger Output': '15W Max Fast Charge',
      'Bulb Base': 'Integrated LED'
    },
    colors: ['Sand Beige', 'Sage Green'],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    tags: ['home', 'lamp', 'lighting', 'decor'],
    createdAt: '2026-08-15'
  },
  {
    id: 'p7',
    name: 'VIVA Signature Smart Fitness Tracker & Watch',
    slug: 'viva-signature-smart-fitness-tracker-watch',
    brand: 'VIVA Studio',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 199.00,
    originalPrice: 260.00,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-slim titanium smartwatch with Sapphire glass display. Tracks heart rate variability, sleep stages, VO2 max, and delivers 14-day battery life on a single charge.',
    features: [
      'Always-On 1.4" AMOLED display with 1000 nits peak brightness',
      'Aerospace titanium bezel with scratch-resistant Sapphire glass',
      'Comprehensive 24/7 health tracking (ECG, SpO2, Sleep Score)',
      '50m Water Resistance (5 ATM rated for swimming)'
    ],
    specifications: {
      'Display': '1.4" AMOLED Sapphire',
      'Battery Life': 'Up to 14 Days',
      'Waterproof': '5 ATM (50m)',
      'Compatibility': 'iOS & Android'
    },
    colors: ['Titanium Olive', 'Midnight Black', 'Earthy Beige'],
    inStock: true,
    stockCount: 28,
    isNewArrival: true,
    isFeatured: true,
    tags: ['smartwatch', 'fitness', 'tech', 'wearable'],
    createdAt: '2026-09-18'
  },
  {
    id: 'p8',
    name: 'Organic Botanical Hydrating Body Oil',
    slug: 'organic-botanical-hydrating-body-oil',
    brand: 'Botanica Organics',
    category: 'beauty',
    categoryName: 'Beauty',
    price: 42.00,
    originalPrice: 55.00,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 78,
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cold-pressed blend of Jojoba, Rosehip seed, and Marula oils infused with Bergamot and Vetiver. Delivers deep moisture with a velvety, non-greasy finish.',
    features: [
      '100% Organic Cold-Pressed Botanical Oils',
      'Rich in Essential Fatty Acids & Vitamin E',
      'Fast-absorbing dry oil texture',
      'Subtle natural scent of Bergamot and Cedar'
    ],
    specifications: {
      'Volume': '100ml / 3.4 fl. oz.',
      'Scent Profile': 'Citrus & Earthy Vetiver',
      'Certifications': 'Ecocert Organic & Cruelty Free'
    },
    colors: ['Amber Glass'],
    inStock: true,
    stockCount: 35,
    isDeal: true,
    tags: ['bodyoil', 'beauty', 'skincare', 'organic'],
    createdAt: '2026-07-22'
  },
  {
    id: 'p9',
    name: 'Sustainable Wooden Building Blocks Set',
    slug: 'sustainable-wooden-building-blocks-set',
    brand: 'VIVA Studio',
    category: 'toys-kids',
    categoryName: 'Toys & Kids',
    price: 49.00,
    originalPrice: 65.00,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 43,
    images: [
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '50-piece architectural block set hand-carved from FSC-certified sustainable beech wood. Treated with non-toxic organic vegetable stains.',
    features: [
      '50 precision-cut geometric building blocks',
      'FSC-certified sustainable solid beech wood',
      'Child-safe non-toxic organic waterborne stains',
      'Includes linen storage drawstring pouch'
    ],
    specifications: {
      'Piece Count': '50 Blocks',
      'Age Recommendation': '2+ Years',
      'Material': 'FSC Beech Wood'
    },
    colors: ['Pastel Wood'],
    inStock: true,
    stockCount: 16,
    isNewArrival: true,
    tags: ['toys', 'kids', 'wooden', 'montessori'],
    createdAt: '2026-09-08'
  },
  {
    id: 'p10',
    name: 'The Art of Minimalist Living - Hardcover Book',
    slug: 'the-art-of-minimalist-living-hardcover-book',
    brand: 'VIVA Studio',
    category: 'books',
    categoryName: 'Books',
    price: 38.00,
    originalPrice: 45.00,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A coffee-table monograph exploring architectural simplicity, sustainable design principles, and curated spaces across Tokyo, Copenhagen, and Kyoto.',
    features: [
      '280 pages of full-color architectural photography',
      'Linen-bound hardcover with gold foil embossing',
      'Printed on heavy 170gsm archival matte paper'
    ],
    specifications: {
      'Pages': '280',
      'Dimensions': '24 x 30 cm',
      'Publisher': 'VIVA Editions'
    },
    colors: ['Linen Cover'],
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    tags: ['book', 'design', 'architecture', 'coffee-table'],
    createdAt: '2026-08-01'
  },
  {
    id: 'p11',
    name: 'Orthopedic Linen Pet Bed & Memory Foam Cushion',
    slug: 'orthopedic-linen-pet-bed-memory-foam',
    brand: 'VIVA Studio',
    category: 'pet-supplies',
    categoryName: 'Pet Supplies',
    price: 98.00,
    originalPrice: 130.00,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-density orthopedic memory foam dog mattress wrapped in a removable, machine-washable heavy French linen cover.',
    features: [
      '3-layer orthopedic memory foam core for joint relief',
      'Durable, chew-resistant French linen outer cover',
      'Non-slip rubber grip base',
      'Waterproof internal protective liner'
    ],
    specifications: {
      'Sizes Available': 'Medium (75x60cm), Large (95x75cm)',
      'Cover Material': '100% Heavyweight Linen',
      'Core': 'High Density Orthopedic Foam'
    },
    colors: ['Sage Green', 'Warm Beige', 'Slate Gray'],
    sizes: ['Medium', 'Large'],
    inStock: true,
    stockCount: 20,
    isDeal: true,
    tags: ['pets', 'dogbed', 'linen', 'orthopedic'],
    createdAt: '2026-08-10'
  },
  {
    id: 'p12',
    name: 'Pro-Series Lightweight Carbon Tennis Racket',
    slug: 'pro-series-lightweight-carbon-tennis-racket',
    brand: 'Aegis Travel',
    category: 'sports',
    categoryName: 'Sports',
    price: 175.00,
    originalPrice: 220.00,
    discountPercentage: 20,
    rating: 4.7,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Precision carbon-graphite frame designed for explosive spin, control, and vibration dampening. Used by competitive players worldwide.',
    features: [
      '100% High-Modulus Japanese Carbon Fiber Frame',
      'Vibration dampening handle insert reduces wrist fatigue',
      '16x19 open string pattern for spin generation'
    ],
    specifications: {
      'Weight': '300g (Unstrung)',
      'Head Size': '100 sq. in.',
      'Balance': '320mm'
    },
    colors: ['Forest Green & Gold'],
    inStock: true,
    stockCount: 11,
    isNewArrival: true,
    tags: ['tennis', 'sports', 'racket', 'carbon'],
    createdAt: '2026-09-12'
  }
];
