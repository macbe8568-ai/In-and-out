/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Material, Project, Service } from './types';

export const LUXURY_MATERIALS: Material[] = [
  {
    id: 'mat-1',
    name: 'Pristine Makrana White Marble',
    category: 'stone',
    description: 'The legendary, ultra-dense calcite marble known for its translucent radiance and age-defying durability. Sourced directly from Rajasthan, it carries classical prestige and an ethereal shine.',
    origin: 'Makrana, Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    finishes: ['Mirror Mirror Polish', 'Honed Smooth', 'Velvet Brushed']
  },
  {
    id: 'mat-2',
    name: 'Premium Central Indian Teakwood',
    category: 'wood',
    description: 'Golden-brown timber chosen from heritage Madhya Pradesh forests. Exceptionally rich in natural oils, framing spaces with tight, gorgeous straight grains and unparalleled dampness resistance.',
    origin: 'Hoshangabad, Madhya Pradesh, India',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600',
    finishes: ['Linseed Hand-Rubbed', 'Dead Matte Polyurethane', 'Distressed Antique']
  },
  {
    id: 'mat-3',
    name: 'Satin Antique Brushed Brass',
    category: 'metal',
    description: 'An elegant alloy hand-relieved to form soft, golden-bronze micro-textures. Captures ambient lighting with a silent, warm gleam, avoiding modern gaudiness.',
    origin: 'Aligarh, Uttar Pradesh, India',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600',
    finishes: ['Satin Hairline', 'Microlastic Sand Blasted', 'Aged Lacquer Patina']
  },
  {
    id: 'mat-4',
    name: 'Raw Organic Khadi Linen',
    category: 'fabric',
    description: 'Hand-spun and hand-woven textured yarn displaying natural variations. Exudes organic elegance with outstanding breathability, providing tactile calmness to modular living spaces.',
    origin: 'Wardha, Maharashtra, India',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    finishes: ['Raw Unbleached Textured', 'Softened Enzyme Wash']
  },
  {
    id: 'mat-5',
    name: 'Gwalior Mint Sandstone',
    category: 'stone',
    description: 'An architectural sandstone highlighting clean ivory and mint hues. Perfect for transition portals, linking indoor drawing rooms to beautiful courtyard gardens.',
    origin: 'Gwalior, Madhya Pradesh, India',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
    finishes: ['Shot-Blasted Grip', 'Fine Diamond Honed', 'Chiseled Ashlar Edge']
  },
  {
    id: 'mat-6',
    name: 'Heartland Walnut Burl',
    category: 'wood',
    description: 'Selected from rare, swirling root growth patterns. Delivers dark chocolate, espresso, and deep amber grain figures for statement cabinetry and focal doors.',
    origin: 'Kashmir Valley, India',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    finishes: ['Satin Friction French Polish', 'High-Gloss Polyester Armor']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'The Baldeobagh Duplex',
    location: 'Baldeobagh, Jabalpur',
    category: 'Full Interior Architecture',
    description: 'A spectacular double-height residence integrating an internal green atrium. Highlights absolute spatial transparency where interior framing gracefully dissolves into open sky views.',
    imageUrl: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/69e1b52d-44e6-436d-a1ee-b97f311e5491_800w.jpg?w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200'
    ],
    materials: ['Pristine Makrana White Marble', 'Premium Central Indian Teakwood', 'Raw Organic Khadi Linen'],
    details: [
      'Scope: Comprehensive spatial layout, custom internal bridge, floating marble treads, modular kitchen.',
      'Signature Move: A 20-foot tall double-height screen hand-chiseled from pristine Makrana Marble blocks.',
      'Atmosphere: Luminous sunlit ivory, warm golden teakwood accents, soothing indoor breeze plays.'
    ]
  },
  {
    id: 'proj-2',
    title: 'The Sheetalpuri Oasis',
    location: 'Sheetalpuri, Jabalpur',
    category: 'Bespoke Private Residence',
    description: 'A modern multi-generational sanctuary balancing physical wellness and rich cultural privacy. Features massive sliding portals that transform the living salon into an outdoor garden lounge.',
    imageUrl: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2fbe262d-7505-472d-8cb8-ae33debebd2b_800w.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    materials: ['Gwalior Mint Sandstone', 'Heartland Walnut Burl', 'Satin Antique Brushed Brass'],
    details: [
      'Scope: Space design, high-end false ceiling integrations, bespoke wardrobe designs, and garden deck transition.',
      'Signature Move: Intricately designed walnut burl doors detailed with recessed antique brass strips.',
      'Atmosphere: Deep forest green hues, warm sandstone textures, glowing golden shadow rings.'
    ]
  },
  {
    id: 'proj-3',
    title: 'Civil Lines Executive Suite',
    location: 'Civil Lines, Jabalpur',
    category: 'Commercial interior design',
    description: 'A prestigious, modern administrative hub built for critical corporate decisions. Exudes focus and timeless luxury through clean, linear geometries and sound-absorbing acoustics.',
    imageUrl: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5775e82a-16c6-412d-8987-28040a74f758_800w.jpg?w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
    ],
    materials: ['Premium Central Indian Teakwood', 'Heartland Walnut Burl', 'Satin Antique Brushed Brass'],
    details: [
      'Scope: Spatial zoning, acoustically structured wall boards, customized reception desk, and window design.',
      'Signature Move: Suspended timber grid ceiling incorporating micro-dimmed absolute anti-glare task guides.',
      'Atmosphere: Executive charcoal shades, pristine natural wood grains, and flawless linear brass guides.'
    ]
  }
];

export const IN_OUT_SERVICES: Service[] = [
  // Category 1: Space & Planning (core)
  {
    id: 'srv-1',
    name: 'Space planning',
    category: 'core',
    description: 'Master analysis of physical dimensions, architectural flow, and structural traffic to map layout options before any design commitment.',
    icon: 'solar:chair-left-bold-duotone'
  },
  {
    id: 'srv-2',
    name: 'Room planning',
    category: 'core',
    description: 'Detailed zoning and 3D positioning templates focusing on individual rooms to maximize daily usage, view angles, and acoustic harmony.',
    icon: 'solar:square-layout-line-duotone'
  },
  {
    id: 'srv-3',
    name: 'Refurbishment',
    category: 'core',
    description: 'Thoughtful restoration and structural revitalization of mature properties, seamlessly updating engineering specs with refined aesthetics.',
    icon: 'solar:magic-stick-3-bold-duotone'
  },
  {
    id: 'srv-4',
    name: 'Home staging',
    category: 'core',
    description: 'Styling spaces with highly curated, premium furnishings to dramatically amplify visual magnetism, physical scale, and commercial property allure.',
    icon: 'solar:gallery-bold-duotone'
  },

  // Category 2: Living & Private Areas (living)
  {
    id: 'srv-5',
    name: 'Living room design',
    category: 'living',
    description: 'Designing high-concept formal lounges, custom entertainment backdrops, and conversational seating arrangements around natural vistas.',
    icon: 'solar:sofa-2-bold-duotone'
  },
  {
    id: 'srv-6',
    name: 'Bedroom design',
    category: 'living',
    description: 'Crafting highly personal sleep sanctuaries incorporating bespoke bedheads, integrated lighting controls, and noise-damping wall skins.',
    icon: 'solar:bedside-table-2-bold-duotone'
  },
  {
    id: 'srv-7',
    name: 'Dining room design',
    category: 'living',
    description: 'Orchestrating warm social gathering layouts featuring monumental marble tables, custom credenzas, and statement pendant coordinates.',
    icon: 'solar:glass-bold-duotone'
  },
  {
    id: 'srv-8',
    name: 'Kitchen design',
    category: 'living',
    description: 'Designing premium modular culinary platforms with luxury stone islands, soft-glide utility systems, and seamless chimney integrations.',
    icon: 'solar:fridge-bold-duotone'
  },
  {
    id: 'srv-9',
    name: 'Bathroom design',
    category: 'living',
    description: 'Detailing tranquil spa-like sanctuaries incorporating concealed drainage systems, microcement walls, rain wellness, and custom vanities.',
    icon: 'solar:bath-bold-duotone'
  },
  {
    id: 'srv-10',
    name: 'Wardrobe design',
    category: 'living',
    description: 'Bespoke walk-in wardrobe architectures with continuous warm-lit glass sliders, dehumidified systems, and customized accessory trays.',
    icon: 'solar:hanger-bold-duotone'
  },

  // Category 3: Fittings, Finishes & Accent (fittings)
  {
    id: 'srv-11',
    name: 'Cabinetry and hardware design',
    category: 'fittings',
    description: 'Precision millwork, bespoke handles, hand-crafted timber joinery, and magnetic kitchen hardware selected for timeless mechanical feel.',
    icon: 'solar:widget-3-bold-duotone'
  },
  {
    id: 'srv-12',
    name: 'Flooring selection',
    category: 'fittings',
    description: 'Curating noble, durable grounds from single-slab Rajasthan marbles, smoked hardwood planks, and premium seamless terrazzo layouts.',
    icon: 'solar:layers-bold-duotone'
  },
  {
    id: 'srv-13',
    name: 'Door design',
    category: 'fittings',
    description: 'Custom monumental entry doors utilizing walnut slabs, pivoting solid handles, secure hardware, and sound-insulating internal fillers.',
    icon: 'solar:exit-bold-duotone'
  },
  {
    id: 'srv-14',
    name: 'Window design',
    category: 'fittings',
    description: 'Strategic framing of natural lights incorporating thermal-break double glazed panes, custom drapes, and automated solar track panels.',
    icon: 'solar:sun-fog-bold-duotone'
  },
  {
    id: 'srv-15',
    name: 'Lighting design',
    category: 'fittings',
    description: 'Concocting custom luxury lighting layouts involving indirect warm LED guide tracks, accent spots, and architectural shadow lines.',
    icon: 'solar:lamp-bold-duotone'
  },
  {
    id: 'srv-16',
    name: 'Interior painting',
    category: 'fittings',
    description: 'Exquisite lime-washed textures, breathable eco-friendly mineral coatings, and satin-finished color plays emphasizing subtle depth.',
    icon: 'solar:palette-bold-duotone'
  },
  {
    id: 'srv-17',
    name: 'Interior decorating',
    category: 'fittings',
    description: 'The final, cohesive aesthetic layer of hand-selected fine art pieces, raw ceramic planters, hand-knotted rugs, and custom accent details.',
    icon: 'solar:umbrella-bold-duotone'
  },
  {
    id: 'srv-18',
    name: 'Home decor selection',
    category: 'fittings',
    description: 'Bespoke procurement pathways linking master craft creators to secure authentic objects of heritage, texture, with high sentimental value.',
    icon: 'solar:star-fall-bold-duotone'
  },

  // Category 4: Commercial & Hospitality Spaces (commercial)
  {
    id: 'srv-19',
    name: 'Commercial interior design',
    category: 'commercial',
    description: 'Aesthetic positioning for brand authority. Perfect brand identity projection combined with functional work mechanics and layout speed.',
    icon: 'solar:buildings-bold-duotone'
  },
  {
    id: 'srv-20',
    name: 'Office space design',
    category: 'commercial',
    description: 'High-focus workstation layouts, ergonomic corporate partitions, acoustic executive cabins, and creative brainstorming hub modules.',
    icon: 'solar:folder-with-files-bold-duotone'
  },
  {
    id: 'srv-21',
    name: 'Hospitality design',
    category: 'commercial',
    description: 'Crafting welcoming hotel lobby spaces, concierge structures, and guest suites focused on first-impact and comfortable leisure.',
    icon: 'solar:cup-bold-duotone'
  },
  {
    id: 'srv-22',
    name: 'Restaurant design',
    category: 'commercial',
    description: 'Immersive culinary environments balancing functional waiter flows, mood lighting setups, kitchen connectivity, and acoustic control.',
    icon: 'solar:wineglass-bold-duotone'
  }
];
