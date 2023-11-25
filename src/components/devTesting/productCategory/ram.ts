/**
 * type RamSchema  = {
brand: /^[a-zA-Z0-9- ]{2,30}$/;
  model: /^(?!^\s*$)[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[]^_`{|}~]{1,100}$/i;
  description: /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i;
  price: /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY';
  availability: "In Stock" | "Out of Stock" | "Pre-order" | "Discontinued" | "Other";
  quantity: /^(?!^$|^0*$)[0-9]{1,6}$/;
  weight: /^(?!^$|^0*$)[0-9]{1,6}(.[0-9]{1,2})?$/;
  weightUnit: "g" | "kg" | "lb";
  length: /^(?!^$|^0*$)[0-9]{1,3}(.[0-9]{1,2})?$/;
  lengthUnit: "mm" | "cm" | "m" | "in" | "ft";
  width: /^(?!^$|^0*$)[0-9]{1,3}(.[0-9]{1,2})?$/;
  widthUnit: "mm" | "cm" | "m" | "in" | "ft";
  height: /^(?!^$|^0*$)[0-9]{1,3}(.[0-9]{1,2})?$/;
  heightUnit: "mm" | "cm" | "m" | "in" | "ft";
  additionalComments: /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i;

ramDataRate: /^(?!^$|^0*$)[0-9]{1,4}$/;
ramModulesQuantity: /^(?!^$|^0*$)[0-9]{1,2}$/;
ramModulesCapacity:/^(?!^$|^0*$)[0-9]{1,4}$/;
ramModulesCapacityUnit: "KB" | "MB" | "GB" | "TB";
ramType: "DDR5" | "DDR4" | "DDR3" | "DDR2" | "DDR";
ramColor: /^[a-zA-Z0-9#()%,.\s-]{2,30}$/;
ramVoltage: /^(?!^$|^0*$)[0-1]{1}(.[0-9]{1,2})?$/;
ramTiming: /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}$/;

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */

import { DirectoryUserDocument } from '../../directory/types';
import {
  ProductCategorySpecifications,
  RamSchema,
  RamSpecifications,
} from '../../product/types';

const RAMS_ARRAY: (ProductCategorySpecifications & RamSpecifications)[] = [
  {
    brand: 'Corsair',
    model: 'Vengeance LPX',
    description: 'High-performance DDR4 RAM for gaming enthusiasts.',
    price: 89.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.1,
    weightUnit: 'kg',
    length: 133.5,
    lengthUnit: 'mm',
    width: 7,
    widthUnit: 'mm',
    height: 34,
    heightUnit: 'mm',
    additionalComments: 'Low-profile design for easy installation.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 8,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#0000FF',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: '2 years',
      casLatency: 'CL16',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Crucial',
    model: 'Ballistix Sport',
    description: 'Reliable DDR4 RAM for mainstream users and gamers.',
    price: 64.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.12,
    weightUnit: 'kg',
    length: 138,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'mm',
    height: 40,
    heightUnit: 'mm',
    additionalComments: 'XMP 2.0 support for easy overclocking.',
    ramDataRate: 3000,
    ramModulesQuantity: 1,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#00FF00',
    ramVoltage: 1.2,
    ramTiming: '15-16-16-35',
    additionalFields: {
      heatSpreader: 'Aluminum',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Kingston',
    model: 'HyperX Fury',
    description: 'High-speed DDR4 RAM for gaming and multitasking.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 150,
    weight: 0.15,
    weightUnit: 'kg',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'mm',
    height: 42,
    heightUnit: 'mm',
    additionalComments: 'Overclocking support for performance enthusiasts.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FFA500',
    ramVoltage: 1.35,
    ramTiming: '18-22-22-42',
    additionalFields: {
      heatSpreader: 'Black',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'G.Skill',
    model: 'Ripjaws V',
    description: 'DDR4 RAM with sleek design and excellent performance.',
    price: 92.5,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.12,
    weightUnit: 'kg',
    length: 145,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'mm',
    height: 40,
    heightUnit: 'mm',
    additionalComments: 'XMP 2.0 support for easy overclocking.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF0000',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-38',
    additionalFields: {
      warranty: 'Lifetime',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'HyperX',
    model: 'Predator RGB',
    description: 'High-performance DDR4 RAM with customizable RGB lighting.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 75,
    weight: 0.18,
    weightUnit: 'kg',
    length: 150,
    lengthUnit: 'mm',
    width: 12,
    widthUnit: 'mm',
    height: 45,
    heightUnit: 'mm',
    additionalComments: 'Sync RGB effects with your gaming setup.',
    ramDataRate: 4000,
    ramModulesQuantity: 4,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF1493',
    ramVoltage: 1.4,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: '3 years',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'ADATA',
    model: 'XPG Spectrix',
    description:
      'DDR4 RAM with stunning RGB lighting and heat spreader design.',
    price: 94.5,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 90,
    weight: 0.16,
    weightUnit: 'kg',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'mm',
    height: 40,
    heightUnit: 'mm',
    additionalComments: 'Supports Intel XMP 2.0 for easy overclocking.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#008080',
    ramVoltage: 1.35,
    ramTiming: '18-20-20-40',
    additionalFields: {
      ledPattern: 'Rainbow Wave',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Crucial',
    model: 'Ballistix Elite',
    description:
      'High-performance DDR4 RAM designed for gaming and content creation.',
    price: 149.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.2,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 12,
    widthUnit: 'mm',
    height: 45,
    heightUnit: 'mm',
    additionalComments:
      'Integrated heat spreader for efficient heat dissipation.',
    ramDataRate: 4266,
    ramModulesQuantity: 4,
    ramModulesCapacity: 64,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FFD700',
    ramVoltage: 1.45,
    ramTiming: '16-18-18-38',
    additionalFields: {
      warranty: 'Limited Lifetime',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Corsair',
    model: 'DominatX',
    description:
      'Extreme-performance DDR5 RAM for cutting-edge applications and gaming.',
    price: 199.99,
    currency: 'USD',
    availability: 'Pre-order',
    quantity: 20,
    weight: 0.25,
    weightUnit: 'kg',
    length: 170,
    lengthUnit: 'mm',
    width: 14,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments: 'Next-gen memory technology for unparalleled speed.',
    ramDataRate: 8400,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR5',
    ramColor: '#4169E1',
    ramVoltage: 1.6,
    ramTiming: '14-16-16-36',
    additionalFields: {
      RGBLighting: 'Customizable',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'TeamGroup',
    model: 'T-Force Delta',
    description:
      'Affordable DDR4 RAM with a stylish design for entry-level gaming.',
    price: 59.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 120,
    weight: 0.15,
    weightUnit: 'kg',
    length: 150,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'mm',
    height: 40,
    heightUnit: 'mm',
    additionalComments: 'Unique RGB lighting for added aesthetics.',
    ramDataRate: 3000,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#4B0082',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-38',
    additionalFields: {
      certification: 'XMP 2.0',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Patriot',
    model: 'Viper Steel',
    description: 'High-speed DDR4 RAM with a sleek and durable design.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 80,
    weight: 0.17,
    weightUnit: 'kg',
    length: 155,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'mm',
    height: 45,
    heightUnit: 'mm',
    additionalComments: 'Aluminum heat spreader for efficient cooling.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#228B22',
    ramVoltage: 1.4,
    ramTiming: '18-22-22-42',
    additionalFields: {
      warranty: 'Limited Lifetime',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'ADATA',
    model: 'XPG Gammix D45',
    description:
      'DDR4 RAM with a futuristic design and high-speed performance.',
    price: 89.5,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.16,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 12,
    widthUnit: 'mm',
    height: 42,
    heightUnit: 'mm',
    additionalComments: 'Diamond-cut edges for a premium look.',
    ramDataRate: 4000,
    ramModulesQuantity: 4,
    ramModulesCapacity: 64,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF4500',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-38',
    additionalFields: {
      lighting: 'RGB Fusion',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Kingston',
    model: 'HyperX Fury',
    description:
      'High-speed DDR4 RAM for gaming enthusiasts with a sleek design.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.18,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'mm',
    height: 45,
    heightUnit: 'mm',
    additionalComments: 'XMP-ready for easy overclocking.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#008000',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: 'Lifetime',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'G.Skill',
    model: 'Trident Z RGB',
    description:
      'Premium DDR4 RAM featuring customizable RGB lighting and high performance.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.22,
    weightUnit: 'kg',
    length: 170,
    lengthUnit: 'mm',
    width: 12,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments:
      'Extreme overclocking capabilities with a stylish design.',
    ramDataRate: 3600,
    ramModulesQuantity: 4,
    ramModulesCapacity: 64,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#1E90FF',
    ramVoltage: 1.4,
    ramTiming: '18-22-22-42',
    additionalFields: {
      cooling: 'Aluminum Heat Spreader',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Crucial',
    model: 'Ballistix Max',
    description:
      'DDR4 RAM designed for high-performance applications and multitasking.',
    price: 149.99,
    currency: 'USD',
    availability: 'Out of Stock',
    quantity: 0,
    weight: 0.2,
    weightUnit: 'kg',
    length: 155,
    lengthUnit: 'mm',
    width: 14,
    widthUnit: 'mm',
    height: 48,
    heightUnit: 'mm',
    additionalComments:
      'Integrated thermal sensors for temperature monitoring.',
    ramDataRate: 4000,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF1493',
    ramVoltage: 1.45,
    ramTiming: '16-18-18-38',
    additionalFields: {
      compatibility: 'XMP 3.0',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Corsair',
    model: 'Vengeance LPX',
    description: 'High-performance DDR4 RAM for gaming and content creation.',
    price: 89.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 150,
    weight: 0.25,
    weightUnit: 'lb',
    length: 133,
    lengthUnit: 'mm',
    width: 7,
    widthUnit: 'cm',
    height: 34,
    heightUnit: 'mm',
    additionalComments:
      'Low-profile design for compatibility with various CPU coolers.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FFA500',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: 'Lifetime',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'HyperX',
    model: 'Impact SODIMM',
    description:
      'Compact and high-speed DDR4 RAM designed for laptops and small form factor systems.',
    price: 69.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.03,
    weightUnit: 'kg',
    length: 67,
    lengthUnit: 'mm',
    width: 30,
    widthUnit: 'mm',
    height: 4,
    heightUnit: 'cm',
    additionalComments: 'XMP-ready for easy overclocking on supported systems.',
    ramDataRate: 2666,
    ramModulesQuantity: 1,
    ramModulesCapacity: 8,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#008000',
    ramVoltage: 1.2,
    ramTiming: '15-17-17-35',
    additionalFields: {
      compatibility: 'Intel and AMD platforms',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'TeamGroup',
    model: 'T-Force Delta RGB',
    description:
      'DDR4 RAM with vibrant RGB lighting for a visually stunning gaming setup.',
    price: 109.99,
    currency: 'USD',
    availability: 'Pre-order',
    quantity: 0,
    weight: 0.22,
    weightUnit: 'kg',
    length: 147,
    lengthUnit: 'mm',
    width: 49,
    widthUnit: 'mm',
    height: 7,
    heightUnit: 'cm',
    additionalComments: 'Customizable RGB effects via software control.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF00FF',
    ramVoltage: 1.35,
    ramTiming: '18-20-20-44',
    additionalFields: {
      lighting: 'Addressable RGB',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Kingston',
    model: 'HyperX Fury',
    description:
      'High-performance DDR4 RAM with aggressive styling for gaming enthusiasts.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 200,
    weight: 0.3,
    weightUnit: 'lb',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'cm',
    height: 36,
    heightUnit: 'mm',
    additionalComments: 'XMP 2.0 support for easy overclocking.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#0000FF',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: 'Limited Lifetime Warranty',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Crucial',
    model: 'Ballistix RGB',
    description:
      'DDR4 RAM with customizable RGB lighting for a stylish and personalized PC build.',
    price: 94.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 120,
    weight: 0.25,
    weightUnit: 'lb',
    length: 148,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'cm',
    height: 40,
    heightUnit: 'mm',
    additionalComments:
      'Integrated heat spreader for improved thermal performance.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#00FF00',
    ramVoltage: 1.4,
    ramTiming: '18-22-22-42',
    additionalFields: {
      lightingControl: 'Mystic Light Sync',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'G.Skill',
    model: 'Trident Z Neo',
    description:
      'DDR4 RAM optimized for AMD Ryzen processors, featuring a sleek and futuristic design.',
    price: 109.99,
    currency: 'USD',
    availability: 'Pre-order',
    quantity: 0,
    weight: 0.28,
    weightUnit: 'lb',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'cm',
    height: 44,
    heightUnit: 'mm',
    additionalComments:
      'Supports XMP 2.0 and features high-quality aluminum heat spreaders.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF0000',
    ramVoltage: 1.45,
    ramTiming: '16-19-19-39',
    additionalFields: {
      compatibility: 'AMD Ryzen 3000 Series',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Corsair',
    model: 'Vengeance RGB Pro',
    description:
      'High-performance DDR4 RAM with customizable RGB lighting for gaming enthusiasts.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 150,
    weight: 0.35,
    weightUnit: 'lb',
    length: 135,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'cm',
    height: 42,
    heightUnit: 'mm',
    additionalComments:
      'Dynamic multi-zone RGB lighting with support for Corsair iCUE software.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF9900',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: 'Limited Lifetime Warranty',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'HyperX',
    model: 'Predator',
    description:
      'DDR4 RAM designed for extreme performance, ideal for gaming and high-performance systems.',
    price: 149.99,
    currency: 'USD',
    availability: 'Out of Stock',
    quantity: 0,
    weight: 0.4,
    weightUnit: 'lb',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'cm',
    height: 45,
    heightUnit: 'mm',
    additionalComments:
      'Fierce aluminum heat spreader for improved heat dissipation.',
    ramDataRate: 4000,
    ramModulesQuantity: 2,
    ramModulesCapacity: 64,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF0000',
    ramVoltage: 1.4,
    ramTiming: '19-21-21-41',
    additionalFields: {
      overclocking: 'XMP 2.0 support',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'TeamGroup',
    model: 'T-Force Delta RGB',
    description:
      'DDR4 RAM with stunning RGB lighting and a unique full mirror design.',
    price: 119.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.38,
    weightUnit: 'lb',
    length: 133,
    lengthUnit: 'mm',
    width: 7,
    widthUnit: 'cm',
    height: 40,
    heightUnit: 'mm',
    additionalComments:
      'Supports ASUS Aura Sync and MSI Mystic Light for synchronized lighting effects.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#0088FF',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-38',
    additionalFields: {
      certification: 'T-FORCE CAPTAIN RGB control software',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Kingston',
    model: 'HyperX Fury',
    description:
      'High-performance DDR4 RAM for gaming enthusiasts with a sleek design.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 200,
    weight: 0.3,
    weightUnit: 'lb',
    length: 133,
    lengthUnit: 'mm',
    width: 7,
    widthUnit: 'cm',
    height: 40,
    heightUnit: 'mm',
    additionalComments:
      'Designed for overclocking and efficient heat dissipation.',
    ramDataRate: 3000,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#00FF00',
    ramVoltage: 1.35,
    ramTiming: '15-17-17-35',
    additionalFields: {
      warranty: 'Limited Lifetime Warranty',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Crucial',
    model: 'Ballistix RGB',
    description:
      'DDR4 RAM with customizable RGB lighting for a vibrant gaming setup.',
    price: 89.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 150,
    weight: 0.35,
    weightUnit: 'lb',
    length: 138,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'cm',
    height: 42,
    heightUnit: 'mm',
    additionalComments:
      'Ideal for gamers seeking both performance and aesthetics.',
    ramDataRate: 3200,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#0000FF',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      lightingControl: 'Mystic Light Sync compatible',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'G.SKILL',
    model: 'Trident Z Neo',
    description:
      'DDR4 RAM designed for AMD Ryzen processors with striking RGB lighting.',
    price: 129.99,
    currency: 'USD',
    availability: 'Out of Stock',
    quantity: 0,
    weight: 0.4,
    weightUnit: 'lb',
    length: 140,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'cm',
    height: 45,
    heightUnit: 'mm',
    additionalComments:
      'Optimized for maximum compatibility with AMD Ryzen platforms.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 64,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF00FF',
    ramVoltage: 1.4,
    ramTiming: '18-22-22-42',
    additionalFields: {
      compatibility: 'AMD Ryzen Ready',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Corsair',
    model: 'Vengeance RGB Pro',
    description:
      'High-performance DDR4 RAM with customizable RGB lighting for gaming enthusiasts.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 150,
    weight: 0.35,
    weightUnit: 'lb',
    length: 138,
    lengthUnit: 'mm',
    width: 8,
    widthUnit: 'cm',
    height: 42,
    heightUnit: 'mm',
    additionalComments:
      'Designed for overclocking and enhanced system aesthetics.',
    ramDataRate: 3600,
    ramModulesQuantity: 2,
    ramModulesCapacity: 32,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#FF0000',
    ramVoltage: 1.35,
    ramTiming: '16-18-18-36',
    additionalFields: {
      warranty: 'Limited Lifetime Warranty',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'ADATA',
    model: 'XPG Gammix D10',
    description:
      'Affordable DDR4 RAM with a sleek design and reliable performance.',
    price: 69.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 200,
    weight: 0.3,
    weightUnit: 'lb',
    length: 133,
    lengthUnit: 'mm',
    width: 7,
    widthUnit: 'cm',
    height: 40,
    heightUnit: 'mm',
    additionalComments:
      'Ideal for budget-conscious users without compromising on quality.',
    ramDataRate: 3000,
    ramModulesQuantity: 2,
    ramModulesCapacity: 16,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#008000',
    ramVoltage: 1.35,
    ramTiming: '15-17-17-35',
    additionalFields: {
      certification: 'XMP 2.0 Support',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'HyperX',
    model: 'Fury Black',
    description:
      'Reliable DDR4 RAM with a minimalist design, perfect for mainstream users.',
    price: 49.99,
    currency: 'USD',
    availability: 'Pre-order',
    quantity: 0,
    weight: 0.25,
    weightUnit: 'lb',
    length: 120,
    lengthUnit: 'mm',
    width: 6,
    widthUnit: 'cm',
    height: 38,
    heightUnit: 'mm',
    additionalComments:
      'Budget-friendly option without compromising on performance.',
    ramDataRate: 2666,
    ramModulesQuantity: 2,
    ramModulesCapacity: 8,
    ramModulesCapacityUnit: 'GB',
    ramType: 'DDR4',
    ramColor: '#000000',
    ramVoltage: 1.2,
    ramTiming: '14-16-16-35',
    additionalFields: {
      heatSpreader: 'Low-profile design',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
];

function returnRamSchemas({
  ramsArray,
  usersDocs,
}: {
  ramsArray: typeof RAMS_ARRAY;
  usersDocs: DirectoryUserDocument[];
}) {
  return ramsArray.map((ram, index) => {
    // assume only office administration or customer service employees or manager/admins can create accessory products
    const filteredUsersDocs = usersDocs.filter(
      (userDoc) =>
        userDoc.department === 'Office Administration' ||
        userDoc.department === 'Customer Service' ||
        userDoc.roles.includes('Admin') ||
        userDoc.roles.includes('Manager')
    );

    const randomUserDoc =
      filteredUsersDocs[Math.floor(Math.random() * filteredUsersDocs.length)];
    const { username, _id: userId } = randomUserDoc;

    const ramSchema: RamSchema = {
      ...ram,
      userId,
      username,
    };

    return ramSchema;
  });
}

export { RAMS_ARRAY, returnRamSchemas };
