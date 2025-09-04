export interface Product {
  id: string;
  name: string;
  brand?: string;
  image?: string;
  ecoGrade: 'A' | 'B' | 'C' | 'D';
  carbonFootprint: number; // kg CO2 per unit
  tips: string[];
  category?: string;
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton T-Shirt',
    brand: 'EcoWear',
    ecoGrade: 'A',
    carbonFootprint: 2.1,
    tips: [
      'Look for GOTS certified organic cotton',
      'Wash in cold water to reduce energy use',
      'Air dry instead of using a dryer'
    ],
    category: 'Clothing'
  },
  {
    id: '2', 
    name: 'Plastic Water Bottle',
    brand: 'AquaCorp',
    ecoGrade: 'D',
    carbonFootprint: 0.8,
    tips: [
      'Switch to a reusable water bottle',
      'Look for recycled plastic alternatives',
      'Recycle properly after use'
    ],
    category: 'Beverages'
  },
  {
    id: '3',
    name: 'Bamboo Toothbrush',
    brand: 'GreenSmile',
    ecoGrade: 'A',
    carbonFootprint: 0.05,
    tips: [
      'Compost the bamboo handle after use',
      'Remove bristles before composting',
      'Lasts as long as plastic alternatives'
    ],
    category: 'Personal Care'
  },
  {
    id: '4',
    name: 'LED Light Bulb',
    brand: 'BrightEco',
    ecoGrade: 'B',
    carbonFootprint: 1.2,
    tips: [
      '80% less energy than incandescent bulbs',
      'Lasts 25 times longer',
      'Recycle at electronics stores'
    ],
    category: 'Home & Garden'
  },
  {
    id: '5',
    name: 'Fast Fashion Jeans',
    brand: 'TrendyDenim',
    ecoGrade: 'D',
    carbonFootprint: 33.4,
    tips: [
      'Consider second-hand alternatives',
      'Look for sustainable denim brands',
      'Repair instead of replacing'
    ],
    category: 'Clothing'
  },
  {
    id: '6',
    name: 'Reusable Glass Jar',
    brand: 'ZeroWaste Co',
    ecoGrade: 'A',
    carbonFootprint: 0.3,
    tips: [
      'Perfect for food storage',
      'Infinitely recyclable',
      'Reduces plastic packaging needs'
    ],
    category: 'Home & Garden'
  }
];

export const getRandomProduct = (): Product => {
  return sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
};

export const searchProducts = (query: string): Product[] => {
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.brand?.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase())
  );
};