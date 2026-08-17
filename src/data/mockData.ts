import { Product, Coupon, UserReview } from '../types/ecommerce';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Gulmohar Handblock Mul Cotton Saree',
    slug: 'gulmohar-handblock-mul-cotton-saree',
    category: 'mul-cotton-sarees',
    subcategory: 'Bagru Print Sarees',
    fabric: 'Pure Mul Cotton',
    pattern: 'Hand Block Floral',
    craftDetails: 'Authentic 100% natural vegetable dyes hand-pressed by master artisans in Bagru, Rajasthan.',
    description: 'Immerse yourself in featherlight luxury with our signature Mul Cotton Saree. Breathable, exceptionally soft, and detailed with delicate floral motifs inspired by royal Mughal gardens.',
    specifications: {
      fit: 'Relaxed & Fluid Drape',
      length: '5.5 Metres Saree with 80cm matching blouse piece',
      weave: '100s Count Superfine Mul',
      blousePiece: 'Unstitched matching fabric included',
      transparency: 'Semi-sheer & Breathable'
    },
    careInstructions: [
      'First wash dry clean recommended for color vibrancy',
      'Subsequent washes: gentle hand wash in cold water using mild liquid detergent',
      'Dry in shade inside-out',
      'Medium iron while slightly damp'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 3499,
    sellingPrice: 2299,
    discountPercentage: 34,
    gstRate: 5,
    hsnCode: '5208',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 42,
    tags: ['mul-cotton', 'saree', 'handblock', 'sustainable', 'summer-essential'],
    seoTitle: 'Gulmohar Handblock Mul Cotton Saree - TIRZAH Luxury Indian Ethnic',
    seoDescription: 'Handcrafted pure Mul cotton saree in ruby pink and earthy tones. Ultra-soft breathable fabric crafted for the modern Indian woman.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-10T12:00:00Z',
    variants: [
      {
        id: 'var-001-fs-red',
        productId: 'prod-001',
        size: 'Free Size',
        colorName: 'Gulmohar Crimson',
        colorHex: '#8B1E2F',
        sku: 'TRZ-MUL-GUL-FS-CRIM',
        barcode: '8907654321011',
        mrp: 3499,
        sellingPrice: 2299,
        costPrice: 1100,
        stock: 24,
        reservedStock: 2,
        lowStockThreshold: 5,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'var-001-fs-mustard',
        productId: 'prod-001',
        size: 'Free Size',
        colorName: 'Haldi Ochre',
        colorHex: '#D49B28',
        sku: 'TRZ-MUL-GUL-FS-OCHR',
        barcode: '8907654321012',
        mrp: 3499,
        sellingPrice: 2299,
        costPrice: 1100,
        stock: 14,
        reservedStock: 0,
        lowStockThreshold: 4,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Nysa Indigo Printed Modal Co-ord Set',
    slug: 'nysa-indigo-printed-modal-coord-set',
    category: 'coord-sets',
    subcategory: 'Lounge & Festive Co-ords',
    fabric: 'Modal Silk',
    pattern: 'Dabu Geometric Motifs',
    craftDetails: 'Mud resist Dabu printing cured under Rajasthan desert sunshine.',
    description: 'Effortlessly chic 2-piece co-ord set featuring a contemporary notch-collar tunic paired with straight-cut culottes with elasticated comfort waist and deep side pockets.',
    specifications: {
      fit: 'Relaxed Comfort Fit',
      length: 'Top: 32 inches, Pants: 38 inches',
      neckline: 'V-Notch Collar',
      sleeve: '3/4th Sleeves with cuff detail',
      lining: 'Breathable Mul lining on top'
    },
    careInstructions: [
      'Machine wash gentle cycle in cold water',
      'Wash dark colors separately',
      'Line dry in shade',
      'Warm steam iron'
    ],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 3999,
    sellingPrice: 2799,
    discountPercentage: 30,
    gstRate: 5,
    hsnCode: '6204',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 31,
    tags: ['coord-set', 'indigo', 'modal-silk', 'resort-wear', 'work-wear'],
    seoTitle: 'Nysa Indigo Modal Silk Co-ord Set - TIRZAH',
    seoDescription: 'Handcrafted Indigo modal silk 2-piece co-ord set for contemporary festive and everyday luxury.',
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-12T12:00:00Z',
    variants: [
      {
        id: 'var-002-s',
        productId: 'prod-002',
        size: 'S',
        colorName: 'Royal Indigo',
        colorHex: '#1B365D',
        sku: 'TRZ-CRD-NYS-S-IND',
        barcode: '8907654322011',
        mrp: 3999,
        sellingPrice: 2799,
        costPrice: 1250,
        stock: 12,
        reservedStock: 1,
        lowStockThreshold: 3
      },
      {
        id: 'var-002-m',
        productId: 'prod-002',
        size: 'M',
        colorName: 'Royal Indigo',
        colorHex: '#1B365D',
        sku: 'TRZ-CRD-NYS-M-IND',
        barcode: '8907654322012',
        mrp: 3999,
        sellingPrice: 2799,
        costPrice: 1250,
        stock: 18,
        reservedStock: 0,
        lowStockThreshold: 4
      },
      {
        id: 'var-002-l',
        productId: 'prod-002',
        size: 'L',
        colorName: 'Royal Indigo',
        colorHex: '#1B365D',
        sku: 'TRZ-CRD-NYS-L-IND',
        barcode: '8907654322013',
        mrp: 3999,
        sellingPrice: 2799,
        costPrice: 1250,
        stock: 8,
        reservedStock: 0,
        lowStockThreshold: 3
      },
      {
        id: 'var-002-xl',
        productId: 'prod-002',
        size: 'XL',
        colorName: 'Royal Indigo',
        colorHex: '#1B365D',
        sku: 'TRZ-CRD-NYS-XL-IND',
        barcode: '8907654322014',
        mrp: 3999,
        sellingPrice: 2799,
        costPrice: 1250,
        stock: 4,
        reservedStock: 0,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'Anarkali Zari-Embroidered Chanderi Kurti',
    slug: 'anarkali-zari-embroidered-chanderi-kurti',
    category: 'kurtis',
    subcategory: 'Festive Kurtis',
    fabric: 'Chanderi Silk',
    pattern: 'Gold Zari Boota & Floral Yoke',
    craftDetails: 'Delicate hand-embroidery using antique gold zari thread by master Zardozi craftsmen.',
    description: 'A regal A-line Anarkali Kurti woven in pristine Chanderi silk with shimmering gold zari motifs on the yoke and hemline. Perfect for festive soirees and family celebrations.',
    specifications: {
      fit: 'Flared Anarkali Silhouette',
      length: 'Calf Length (46 inches)',
      neckline: 'Sweetheart Neck with Keyhole',
      sleeve: 'Full Sleeves with Zari Border',
      lining: 'Soft Cotton Shantoon full lining'
    },
    careInstructions: [
      'Dry clean only',
      'Store in a breathable cotton garment bag',
      'Do not spray perfume directly on metallic zari work'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 4999,
    sellingPrice: 3299,
    discountPercentage: 34,
    gstRate: 5,
    hsnCode: '6204',
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 58,
    tags: ['kurti', 'chanderi', 'festive', 'zari', 'anarkali'],
    seoTitle: 'Regal Chanderi Anarkali Kurti - TIRZAH Festive Collection',
    seoDescription: 'Handcrafted Chanderi silk Kurti embellished with antique gold zari embroidery for timeless Indian celebrations.',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-14T12:00:00Z',
    variants: [
      {
        id: 'var-003-s-emerald',
        productId: 'prod-003',
        size: 'S',
        colorName: 'Panna Emerald',
        colorHex: '#0B4F3A',
        sku: 'TRZ-KRT-ARK-S-EMR',
        barcode: '8907654323011',
        mrp: 4999,
        sellingPrice: 3299,
        costPrice: 1500,
        stock: 10,
        reservedStock: 0,
        lowStockThreshold: 3
      },
      {
        id: 'var-003-m-emerald',
        productId: 'prod-003',
        size: 'M',
        colorName: 'Panna Emerald',
        colorHex: '#0B4F3A',
        sku: 'TRZ-KRT-ARK-M-EMR',
        barcode: '8907654323012',
        mrp: 4999,
        sellingPrice: 3299,
        costPrice: 1500,
        stock: 15,
        reservedStock: 1,
        lowStockThreshold: 4
      },
      {
        id: 'var-003-l-emerald',
        productId: 'prod-003',
        size: 'L',
        colorName: 'Panna Emerald',
        colorHex: '#0B4F3A',
        sku: 'TRZ-KRT-ARK-L-EMR',
        barcode: '8907654323013',
        mrp: 4999,
        sellingPrice: 3299,
        costPrice: 1500,
        stock: 7,
        reservedStock: 0,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Kalamkari Handprinted Linen Saree',
    slug: 'kalamkari-handprinted-linen-saree',
    category: 'printed-sarees',
    subcategory: 'Linen Printed Sarees',
    fabric: 'Linen Cotton',
    pattern: 'Sri Kalahasti Kalamkari Tree of Life',
    craftDetails: 'Handcrafted with organic bamboo pens using fermented tamarind seed paste and natural mineral dyes.',
    description: 'A poetic celebration of Andhra artistry, this saree portrays organic Tree of Life motifs over a structured yet breathable organic linen base with a contrasting gold pallu border.',
    specifications: {
      fit: 'Crisp, structured yet airy drape',
      length: '6.3 Metres (includes 80cm designer blouse piece)',
      weave: '60 Lea Pure Linen Blend',
      blousePiece: 'Included in contrasting natural ochre tone',
      transparency: 'Opaque'
    },
    careInstructions: [
      'Dry clean only for initial 2 washes',
      'Store rolled with acid-free tissue paper',
      'Medium heat iron inside out'
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 5499,
    sellingPrice: 3899,
    discountPercentage: 29,
    gstRate: 5,
    hsnCode: '5208',
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 19,
    tags: ['kalamkari', 'printed-saree', 'linen', 'handcrafted', 'artisanal'],
    seoTitle: 'Authentic Kalamkari Linen Saree - TIRZAH Handlooms',
    seoDescription: 'Intricately handprinted Kalamkari floral linen saree. Breathable heritage luxury for connoisseurs of Indian craft.',
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-02-15T12:00:00Z',
    variants: [
      {
        id: 'var-004-fs-terracotta',
        productId: 'prod-004',
        size: 'Free Size',
        colorName: 'Terracotta Earth',
        colorHex: '#C85A32',
        sku: 'TRZ-SAR-KLM-FS-TER',
        barcode: '8907654324011',
        mrp: 5499,
        sellingPrice: 3899,
        costPrice: 1900,
        stock: 9,
        reservedStock: 0,
        lowStockThreshold: 3
      }
    ]
  },
  {
    id: 'prod-005',
    name: 'Mira Floral Pure Cotton Straight Kurti',
    slug: 'mira-floral-pure-cotton-straight-kurti',
    category: 'kurtis',
    subcategory: 'Daily Wear Kurtis',
    fabric: 'Pure Mul Cotton',
    pattern: 'Sanganeri Jaal Handblock',
    craftDetails: 'Crafted from 100% fine cotton yarn with Sanganeri wooden block impression.',
    description: 'A versatile straight-cut everyday kurta designed with side slits, breathable comfort, and subtle mother-of-pearl buttons along the placket.',
    specifications: {
      fit: 'Straight Regular Fit',
      length: '44 inches',
      neckline: 'Mandarin Collar with split V',
      sleeve: '3/4th Sleeves with turnback cuffs',
      lining: 'Unlined for maximum summer breathability'
    },
    careInstructions: [
      'Gentle machine wash with like colors',
      'Do not bleach',
      'Warm iron'
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 2199,
    sellingPrice: 1499,
    discountPercentage: 32,
    gstRate: 5,
    hsnCode: '6204',
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    isPublished: true,
    rating: 4.7,
    reviewCount: 84,
    tags: ['kurti', 'daily-wear', 'cotton', 'summer', 'sanganeri'],
    seoTitle: 'Mira Floral Cotton Everyday Kurti - TIRZAH',
    seoDescription: 'Lightweight Sanganeri block printed pure cotton straight kurti. Best suited for office and casual days.',
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-02-16T12:00:00Z',
    variants: [
      {
        id: 'var-005-xs',
        productId: 'prod-005',
        size: 'XS',
        colorName: 'Sage Mint',
        colorHex: '#9CAF88',
        sku: 'TRZ-KRT-MIR-XS-SGE',
        barcode: '8907654325010',
        mrp: 2199,
        sellingPrice: 1499,
        costPrice: 650,
        stock: 8,
        reservedStock: 0,
        lowStockThreshold: 2
      },
      {
        id: 'var-005-s',
        productId: 'prod-005',
        size: 'S',
        colorName: 'Sage Mint',
        colorHex: '#9CAF88',
        sku: 'TRZ-KRT-MIR-S-SGE',
        barcode: '8907654325011',
        mrp: 2199,
        sellingPrice: 1499,
        costPrice: 650,
        stock: 22,
        reservedStock: 1,
        lowStockThreshold: 5
      },
      {
        id: 'var-005-m',
        productId: 'prod-005',
        size: 'M',
        colorName: 'Sage Mint',
        colorHex: '#9CAF88',
        sku: 'TRZ-KRT-MIR-M-SGE',
        barcode: '8907654325012',
        mrp: 2199,
        sellingPrice: 1499,
        costPrice: 650,
        stock: 25,
        reservedStock: 0,
        lowStockThreshold: 5
      },
      {
        id: 'var-005-l',
        productId: 'prod-005',
        size: 'L',
        colorName: 'Sage Mint',
        colorHex: '#9CAF88',
        sku: 'TRZ-KRT-MIR-L-SGE',
        barcode: '8907654325013',
        mrp: 2199,
        sellingPrice: 1499,
        costPrice: 650,
        stock: 14,
        reservedStock: 0,
        lowStockThreshold: 3
      },
      {
        id: 'var-005-xl',
        productId: 'prod-005',
        size: 'XL',
        colorName: 'Sage Mint',
        colorHex: '#9CAF88',
        sku: 'TRZ-KRT-MIR-XL-SGE',
        barcode: '8907654325014',
        mrp: 2199,
        sellingPrice: 1499,
        costPrice: 650,
        stock: 6,
        reservedStock: 0,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-006',
    name: 'Zoya Tiered Peplum Co-ord Set',
    slug: 'zoya-tiered-peplum-coord-set',
    category: 'coord-sets',
    subcategory: 'Summer Festive Sets',
    fabric: 'Pure Mul Cotton',
    pattern: 'Ajrakh Geometric',
    craftDetails: 'Handcrafted natural indigo and madder root dye block prints from Kutch artisans.',
    description: 'An enchanting flared peplum tunic paired with cropped tulip dhoti pants. Features delicate lace inserts and handcrafted cloth tassels on the side ties.',
    specifications: {
      fit: 'Flared Peplum Fit',
      length: 'Top: 28 inches, Pants: 37 inches',
      neckline: 'Round Neck with Keyhole Tassel',
      sleeve: 'Flared Elbow Length Sleeves',
      lining: '100% fine cotton lining'
    },
    careInstructions: [
      'Gentle hand wash separately in cold water',
      'Do not soak for long durations',
      'Shade dry'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    mrp: 4499,
    sellingPrice: 2999,
    discountPercentage: 33,
    gstRate: 5,
    hsnCode: '6204',
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 22,
    tags: ['coord-set', 'ajrakh', 'mul-cotton', 'peplum', 'festive'],
    seoTitle: 'Zoya Tiered Peplum Co-ord Set - TIRZAH Ethnic',
    seoDescription: 'Breathable tiered Peplum Ajrakh set with tulip pants for breezy festive celebrations.',
    createdAt: '2025-01-28T10:00:00Z',
    updatedAt: '2025-02-17T12:00:00Z',
    variants: [
      {
        id: 'var-006-s',
        productId: 'prod-006',
        size: 'S',
        colorName: 'Madder Maroon',
        colorHex: '#6B2D2D',
        sku: 'TRZ-CRD-ZY-S-MRN',
        barcode: '8907654326011',
        mrp: 4499,
        sellingPrice: 2999,
        costPrice: 1350,
        stock: 14,
        reservedStock: 0,
        lowStockThreshold: 3
      },
      {
        id: 'var-006-m',
        productId: 'prod-006',
        size: 'M',
        colorName: 'Madder Maroon',
        colorHex: '#6B2D2D',
        sku: 'TRZ-CRD-ZY-M-MRN',
        barcode: '8907654326012',
        mrp: 4499,
        sellingPrice: 2999,
        costPrice: 1350,
        stock: 18,
        reservedStock: 1,
        lowStockThreshold: 4
      },
      {
        id: 'var-006-l',
        productId: 'prod-006',
        size: 'L',
        colorName: 'Madder Maroon',
        colorHex: '#6B2D2D',
        sku: 'TRZ-CRD-ZY-L-MRN',
        barcode: '8907654326013',
        mrp: 4499,
        sellingPrice: 2999,
        costPrice: 1350,
        stock: 9,
        reservedStock: 0,
        lowStockThreshold: 3
      }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FIRST10',
    description: '10% off on your first order with TIRZAH (Min ₹1,999)',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1999,
    maxDiscount: 500,
    expiresAt: '2025-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'FESTIVE500',
    description: 'Flat ₹500 discount on orders above ₹3,499',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 3499,
    expiresAt: '2025-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'TIRZAHROYAL',
    description: '15% privilege discount for premium handlooms (Min ₹4,999)',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 4999,
    maxDiscount: 1200,
    expiresAt: '2025-12-31T23:59:59Z',
    isActive: true
  }
];

export const INITIAL_REVIEWS: Record<string, UserReview[]> = {
  'prod-001': [
    {
      id: 'rev-101',
      productId: 'prod-001',
      userName: 'Ananya Sharma',
      rating: 5,
      title: 'So featherlight, received compliments all day!',
      comment: 'The mul cotton fabric is unreal! It drapes so easily and does not puff up. The hand block print looks so rich and authentic in person.',
      verifiedPurchase: true,
      date: '2025-02-02'
    },
    {
      id: 'rev-102',
      productId: 'prod-001',
      userName: 'Rhea Sen',
      rating: 5,
      title: 'True luxury at an honest price',
      comment: 'Fast delivery to Mumbai within 3 days. Loved the eco-friendly muslin bag packaging as well!',
      verifiedPurchase: true,
      date: '2025-01-29'
    }
  ],
  'prod-002': [
    {
      id: 'rev-201',
      productId: 'prod-002',
      userName: 'Pooja Iyer',
      rating: 5,
      title: 'Perfect work and travel co-ord',
      comment: 'The fit on the culottes is extremely flattering. Pockets are deep enough for my phone! Modal silk feels so soft against the skin.',
      verifiedPurchase: true,
      date: '2025-02-05'
    }
  ]
};

export const CATEGORIES_META = [
  {
    id: 'kurtis',
    title: 'Kurtis & Tunics',
    subtitle: 'From breezy daily pure cottons to zari-touched celebratory silhouettes',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    count: '32+ Styles'
  },
  {
    id: 'coord-sets',
    title: 'Coordinated Sets',
    subtitle: 'Contemporary 2-piece ensembles tailored for modern Indian luxury',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    count: '24+ Styles'
  },
  {
    id: 'mul-cotton-sarees',
    title: 'Mul Cotton Sarees',
    subtitle: '100s count superfine artisanal mul drapes crafted for all-day grace',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    count: '40+ Styles'
  },
  {
    id: 'printed-sarees',
    title: 'Printed Sarees',
    subtitle: 'Kalamkari, Bagru, Ajrakh and floral heritage hand-prints',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    count: '28+ Styles'
  }
];