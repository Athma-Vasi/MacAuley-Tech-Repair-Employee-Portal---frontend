/**
 * 
type Accessory  = {
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

accessoryType: 'Wireless Charging Pad' | 'Gaming Mousepad' | 'USB-C Hub' | 'Surge Protector' | 'Fitness Tracker' | 'Smart Home Security Camera';
accessoryColor: /^[a-zA-Z0-9#()%,.\s-]{2,30}$/;
accessoryInterface: "Other" | "USB" | "Bluetooth" | "PS/2"|'Wi-Fi';
additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
};
 */

import { Currency } from '../../../types';
import { DirectoryUserDocument } from '../../directory/types';
import { AccessorySchema, PeripheralsInterface } from '../../product/types';

type AccessoryArrays = {
  brand: string;
  model: string;
  description: string;
  price: string;
  currency: Currency;
  availability:
    | 'In Stock'
    | 'Out of Stock'
    | 'Pre-order'
    | 'Discontinued'
    | 'Other';
  quantity: string;
  weight: string;
  weightUnit: 'g' | 'kg' | 'lb';
  length: string;
  lengthUnit: 'mm' | 'cm' | 'm' | 'in' | 'ft';
  width: string;
  widthUnit: 'mm' | 'cm' | 'm' | 'in' | 'ft';
  height: string;
  heightUnit: 'mm' | 'cm' | 'm' | 'in' | 'ft';

  accessoryType: string;
  accessoryColor: string;
  accessoryInterface: PeripheralsInterface;
  additionalComments: string;
  reviewsIds: [];
  additionalFields: {
    [key: string]: string;
  };
}[];

const ACCESSORY_ARRAYS: AccessoryArrays = [
  {
    brand: 'TechCharge',
    model: 'WCP-3000',
    description: 'Premium wireless charging pad with fast charging capability.',
    price: '59.99',
    currency: 'USD',
    availability: 'In Stock',
    quantity: '25',
    weight: '200',
    weightUnit: 'g',
    length: '120',
    lengthUnit: 'mm',
    width: '120',
    widthUnit: 'mm',
    height: '10',
    heightUnit: 'mm',
    additionalComments: 'Compatible with a wide range of Qi-enabled devices.',
    accessoryType: 'Wireless Charging Pad',
    accessoryColor: 'Black',
    accessoryInterface: 'Other',
    reviewsIds: [],
    additionalFields: {
      chargingSpeed: '15W',
      material: 'Aluminum',
    },
  },
  {
    brand: 'GamerElite',
    model: 'MP-X5 RGB',
    description: 'Ultra-large gaming mousepad with customizable RGB lighting.',
    price: '39.99',
    currency: 'EUR',
    availability: 'In Stock',
    quantity: '20',
    weight: '350',
    weightUnit: 'g',
    length: '800',
    lengthUnit: 'mm',
    width: '400',
    widthUnit: 'mm',
    height: '5',
    heightUnit: 'mm',
    additionalComments: 'Optimized for both speed and control during gaming.',
    accessoryType: 'Gaming Mousepad',
    accessoryColor: 'Red',
    accessoryInterface: 'USB',
    reviewsIds: [],
    additionalFields: {
      lightingModes: 'RGB Spectrum',
      surfaceTexture: 'Smooth',
    },
  },
  {
    brand: 'ConnectEase',
    model: 'Hub-10000',
    description: 'Advanced USB-C hub with 10 ports for efficient connectivity.',
    price: '79.99',
    currency: 'GBP',
    availability: 'In Stock',
    quantity: '15',
    weight: '150',
    weightUnit: 'g',
    length: '150',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '15',
    heightUnit: 'mm',
    additionalComments:
      'Connect multiple devices seamlessly with high-speed data transfer.',
    accessoryType: 'USB-C Hub',
    accessoryColor: 'Silver',
    accessoryInterface: 'USB',
    reviewsIds: [],
    additionalFields: {
      portTypes: 'USB-A, USB-C, HDMI, Ethernet',
      dataTransferSpeed: 'Up to 10 Gbps',
    },
  },
  {
    brand: 'SafeGuard',
    model: 'Surge-1000',
    description: 'Heavy-duty surge protector with 1000 joules of protection.',
    price: '89.99',
    currency: 'CAD',
    availability: 'In Stock',
    quantity: '10',
    weight: '800',
    weightUnit: 'g',
    length: '200',
    lengthUnit: 'mm',
    width: '120',
    widthUnit: 'mm',
    height: '50',
    heightUnit: 'mm',
    additionalComments: 'Protect your devices from power spikes and surges.',
    accessoryType: 'Surge Protector',
    accessoryColor: 'White',
    accessoryInterface: 'Other',
    reviewsIds: [],
    additionalFields: {
      outlets: '8',
      USBPorts: '4',
    },
  },
  {
    brand: 'FitPro',
    model: 'TrackerZ',
    description:
      'Advanced fitness tracker with heart rate, GPS, and sleep tracking.',
    price: '129.99',
    currency: 'AUD',
    availability: 'In Stock',
    quantity: '30',
    weight: '25',
    weightUnit: 'g',
    length: '40',
    lengthUnit: 'mm',
    width: '15',
    widthUnit: 'mm',
    height: '8',
    heightUnit: 'mm',
    additionalComments: 'Monitor your health and fitness with precision.',
    accessoryType: 'Fitness Tracker',
    accessoryColor: 'Blue',
    accessoryInterface: 'Bluetooth',
    reviewsIds: [],
    additionalFields: {
      displayType: 'AMOLED',
      waterResistance: 'IP68',
    },
  },
  {
    brand: 'HomeWatch',
    model: 'CamSecure-4K',
    description:
      '4K Smart home security camera with AI-powered motion detection.',
    price: '199.99',
    currency: 'JPY',
    availability: 'In Stock',
    quantity: '15',
    weight: '300',
    weightUnit: 'g',
    length: '120',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '80',
    heightUnit: 'mm',
    additionalComments:
      'Ensure the security of your home with crystal-clear video.',
    accessoryType: 'Smart Home Security Camera',
    accessoryColor: 'Gray',
    accessoryInterface: 'Other',
    reviewsIds: [],
    additionalFields: {
      resolution: '4K Ultra HD',
      smartFeatures: 'AI Motion Detection, Two-Way Audio',
    },
  },
  {
    brand: 'TechCharge',
    model: 'WCP-5000',
    description: 'High-speed wireless charging pad with sleek design.',
    price: '49.99',
    currency: 'USD',
    availability: 'In Stock',
    quantity: '50',
    weight: '150',
    weightUnit: 'g',
    length: '150',
    lengthUnit: 'mm',
    width: '150',
    widthUnit: 'mm',
    height: '10',
    heightUnit: 'mm',
    additionalComments: 'Qi-certified for reliable and efficient charging.',
    accessoryType: 'Wireless Charging Pad',
    accessoryColor: 'White',
    accessoryInterface: 'Other',
    additionalFields: {
      chargingSpeed: '10W',
      material: 'Plastic',
    },
    reviewsIds: [],
  },
  {
    brand: 'GamerZone',
    model: 'SpeedMaster Pro',
    description: 'Professional gaming mousepad with precision surface.',
    price: '29.99',
    currency: 'EUR',
    availability: 'In Stock',
    quantity: '30',
    weight: '300',
    weightUnit: 'g',
    length: '800',
    lengthUnit: 'mm',
    width: '400',
    widthUnit: 'mm',
    height: '5',
    heightUnit: 'mm',
    additionalComments: 'Optimized for low friction and high accuracy.',
    accessoryType: 'Gaming Mousepad',
    accessoryColor: 'Black',
    accessoryInterface: 'USB',
    additionalFields: {
      surfaceMaterial: 'Microfiber',
      antiSlipBase: 'Yes',
    },
    reviewsIds: [],
  },
  {
    brand: 'ConnectHub',
    model: 'HubPro-2000',
    description: 'Advanced USB-C hub with 8 high-speed ports.',
    price: '79.99',
    currency: 'GBP',
    availability: 'In Stock',
    quantity: '20',
    weight: '200',
    weightUnit: 'g',
    length: '120',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '15',
    heightUnit: 'mm',
    additionalComments:
      'Effortlessly connect peripherals with USB-C convenience.',
    accessoryType: 'USB-C Hub',
    accessoryColor: 'Silver',
    accessoryInterface: 'USB',
    additionalFields: {
      portTypes: 'USB-A, USB-C, HDMI',
      dataTransferSpeed: 'Up to 10 Gbps',
    },
    reviewsIds: [],
  },
  {
    brand: 'PowerGuard',
    model: 'SurgeShield-1500',
    description:
      'Compact surge protector with 1500 joules of surge protection.',
    price: '59.99',
    currency: 'CAD',
    availability: 'In Stock',
    quantity: '15',
    weight: '500',
    weightUnit: 'g',
    length: '180',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '40',
    heightUnit: 'mm',
    additionalComments:
      'Protects your devices from power spikes and electrical surges.',
    accessoryType: 'Surge Protector',
    accessoryColor: 'Gray',
    accessoryInterface: 'Other',
    additionalFields: {
      outlets: '6',
      cordLength: '2 meters',
    },
    reviewsIds: [],
  },
  {
    brand: 'FitLife',
    model: 'TrackerX Pro',
    description: 'Premium fitness tracker with advanced health monitoring.',
    price: '129.99',
    currency: 'AUD',
    availability: 'In Stock',
    quantity: '25',
    weight: '30',
    weightUnit: 'g',
    length: '40',
    lengthUnit: 'mm',
    width: '20',
    widthUnit: 'mm',
    height: '10',
    heightUnit: 'mm',
    additionalComments:
      'Tracks steps, heart rate, sleep, and more for a healthier lifestyle.',
    accessoryType: 'Fitness Tracker',
    accessoryColor: 'Blue',
    accessoryInterface: 'Bluetooth',
    additionalFields: {
      displayType: 'OLED',
      waterResistance: 'IP67',
    },
    reviewsIds: [],
  },
  {
    brand: 'SecureHome',
    model: 'CamGuard-1080',
    description: '1080p Smart home security camera with night vision.',
    price: '179.99',
    currency: 'JPY',
    availability: 'In Stock',
    quantity: '10',
    weight: '250',
    weightUnit: 'g',
    length: '100',
    lengthUnit: 'mm',
    width: '60',
    widthUnit: 'mm',
    height: '60',
    heightUnit: 'mm',
    additionalComments:
      'Enhanced security with motion detection and two-way audio.',
    accessoryType: 'Smart Home Security Camera',
    accessoryColor: 'Black',
    accessoryInterface: 'Other',
    additionalFields: {
      resolution: '1080p',
      nightVision: 'Yes',
    },
    reviewsIds: [],
  },
  {
    brand: 'ChargeMaster',
    model: 'SwiftCharge-2000',
    description: 'High-speed wireless charging pad with LED indicator.',
    price: '39.99',
    currency: 'USD',
    availability: 'In Stock',
    quantity: '100',
    weight: '200',
    weightUnit: 'g',
    length: '150',
    lengthUnit: 'mm',
    width: '150',
    widthUnit: 'mm',
    height: '10',
    heightUnit: 'mm',
    additionalComments: 'Qi-certified for safe and efficient charging.',
    accessoryType: 'Wireless Charging Pad',
    accessoryColor: 'Black',
    accessoryInterface: 'Other',
    additionalFields: {
      chargingSpeed: '15W',
      material: 'Plastic',
    },
    reviewsIds: [],
  },
  {
    brand: 'GamePro',
    model: 'SpeedElite X',
    description: 'Premium gaming mousepad with RGB lighting.',
    price: '49.99',
    currency: 'EUR',
    availability: 'In Stock',
    quantity: '50',
    weight: '400',
    weightUnit: 'g',
    length: '900',
    lengthUnit: 'mm',
    width: '400',
    widthUnit: 'mm',
    height: '5',
    heightUnit: 'mm',
    additionalComments:
      'Enhance your gaming setup with customizable RGB effects.',
    accessoryType: 'Gaming Mousepad',
    accessoryColor: 'RGB',
    accessoryInterface: 'USB',
    additionalFields: {
      surfaceMaterial: 'Fabric',
      antiSlipBase: 'Yes',
    },
    reviewsIds: [],
  },
  {
    brand: 'ConnectPro',
    model: 'HubXpress-3000',
    description: 'Compact USB-C hub with 6 ports and power delivery.',
    price: '69.99',
    currency: 'GBP',
    availability: 'In Stock',
    quantity: '30',
    weight: '150',
    weightUnit: 'g',
    length: '100',
    lengthUnit: 'mm',
    width: '60',
    widthUnit: 'mm',
    height: '15',
    heightUnit: 'mm',
    additionalComments:
      'Effortlessly connect your devices with USB-C convenience.',
    accessoryType: 'USB-C Hub',
    accessoryColor: 'Silver',
    accessoryInterface: 'USB',
    additionalFields: {
      portTypes: 'USB-A, USB-C, HDMI',
      powerDelivery: '60W',
    },
    reviewsIds: [],
  },
  {
    brand: 'SafeGuard',
    model: 'SurgeShield-3000',
    description: 'Powerful surge protector with 3000 joules of protection.',
    price: '79.99',
    currency: 'CAD',
    availability: 'In Stock',
    quantity: '20',
    weight: '600',
    weightUnit: 'g',
    length: '200',
    lengthUnit: 'mm',
    width: '100',
    widthUnit: 'mm',
    height: '40',
    heightUnit: 'mm',
    additionalComments: 'Protect your devices from power surges and spikes.',
    accessoryType: 'Surge Protector',
    accessoryColor: 'White',
    accessoryInterface: 'Other',
    additionalFields: {
      outlets: '8',
      cordLength: '3 meters',
    },
    reviewsIds: [],
  },
  {
    brand: 'FitTrack',
    model: 'HealthMaster Plus',
    description: 'Advanced fitness tracker with heart rate monitoring.',
    price: '129.99',
    currency: 'AUD',
    availability: 'In Stock',
    quantity: '15',
    weight: '25',
    weightUnit: 'g',
    length: '50',
    lengthUnit: 'mm',
    width: '25',
    widthUnit: 'mm',
    height: '10',
    heightUnit: 'mm',
    additionalComments:
      'Stay fit with real-time health tracking on your wrist.',
    accessoryType: 'Fitness Tracker',
    accessoryColor: 'Blue',
    accessoryInterface: 'Bluetooth',
    additionalFields: {
      displayType: 'Color OLED',
      waterResistance: 'IP68',
    },
    reviewsIds: [],
  },
  {
    brand: 'SecureView',
    model: 'CamGuard-4K',
    description: '4K UHD smart home security camera with night vision.',
    price: '199.99',
    currency: 'JPY',
    availability: 'In Stock',
    quantity: '10',
    weight: '300',
    weightUnit: 'g',
    length: '120',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '80',
    heightUnit: 'mm',
    additionalComments: 'Monitor your home with crystal-clear 4K resolution.',
    accessoryType: 'Smart Home Security Camera',
    accessoryColor: 'Black',
    accessoryInterface: 'Other',
    additionalFields: {
      resolution: '4K UHD',
      nightVision: 'Yes',
    },
    reviewsIds: [],
  },
  {
    brand: 'PowerCharge',
    model: 'SwiftCharge-3000',
    description: 'Fast wireless charging pad with stylish design.',
    price: '49.99',
    currency: 'USD',
    availability: 'In Stock',
    quantity: '100',
    weight: '300',
    weightUnit: 'g',
    length: '160',
    lengthUnit: 'mm',
    width: '160',
    widthUnit: 'mm',
    height: '12',
    heightUnit: 'mm',
    additionalComments: 'Qi-certified for safe and efficient charging.',
    accessoryType: 'Wireless Charging Pad',
    accessoryColor: 'White',
    accessoryInterface: 'Wi-Fi',
    additionalFields: {
      chargingSpeed: '18W',
      material: 'Plastic',
    },
    reviewsIds: [],
  },
  {
    brand: 'GameElite',
    model: 'SpeedMaster X',
    description: 'Large gaming mousepad with RGB lighting and USB interface.',
    price: '59.99',
    currency: 'EUR',
    availability: 'In Stock',
    quantity: '50',
    weight: '450',
    weightUnit: 'g',
    length: '1000',
    lengthUnit: 'mm',
    width: '500',
    widthUnit: 'mm',
    height: '6',
    heightUnit: 'mm',
    additionalComments:
      'Immerse yourself in gaming with customizable RGB effects.',
    accessoryType: 'Gaming Mousepad',
    accessoryColor: 'Black',
    accessoryInterface: 'USB',
    additionalFields: {
      surfaceMaterial: 'Microfiber',
      antiSlipBase: 'Yes',
    },
    reviewsIds: [],
  },
  {
    brand: 'ConnectHub',
    model: 'HubMaster-5000',
    description: 'Powerful USB-C hub with multiple ports and sleek design.',
    price: '79.99',
    currency: 'GBP',
    availability: 'In Stock',
    quantity: '30',
    weight: '200',
    weightUnit: 'g',
    length: '120',
    lengthUnit: 'mm',
    width: '80',
    widthUnit: 'mm',
    height: '15',
    heightUnit: 'mm',
    additionalComments:
      'Effortlessly connect all your devices with USB-C convenience.',
    accessoryType: 'USB-C Hub',
    accessoryColor: 'Silver',
    accessoryInterface: 'USB',
    additionalFields: {
      portTypes: 'USB-A, USB-C, HDMI',
      powerDelivery: '100W',
    },
    reviewsIds: [],
  },
  {
    brand: 'SafeGuard',
    model: 'SurgeShield-4000',
    description: 'Advanced surge protector with 4000 joules of protection.',
    price: '89.99',
    currency: 'CAD',
    availability: 'In Stock',
    quantity: '20',
    weight: '800',
    weightUnit: 'g',
    length: '250',
    lengthUnit: 'mm',
    width: '120',
    widthUnit: 'mm',
    height: '50',
    heightUnit: 'mm',
    additionalComments:
      'Protect your valuable devices from power surges and spikes.',
    accessoryType: 'Surge Protector',
    accessoryColor: 'Black',
    accessoryInterface: 'Other',
    additionalFields: {
      outlets: '10',
      cordLength: '4 meters',
    },
    reviewsIds: [],
  },
  {
    brand: 'FitTrack',
    model: 'HealthPro X',
    description:
      'Premium fitness tracker with heart rate monitoring and Bluetooth.',
    price: '139.99',
    currency: 'AUD',
    availability: 'In Stock',
    quantity: '15',
    weight: '30',
    weightUnit: 'g',
    length: '60',
    lengthUnit: 'mm',
    width: '30',
    widthUnit: 'mm',
    height: '15',
    heightUnit: 'mm',
    additionalComments:
      'Achieve your fitness goals with advanced health tracking features.',
    accessoryType: 'Fitness Tracker',
    accessoryColor: 'Blue',
    accessoryInterface: 'Bluetooth',
    additionalFields: {
      displayType: 'AMOLED',
      waterResistance: 'IP67',
    },
    reviewsIds: [],
  },
  {
    brand: 'SecureGuard',
    model: 'CamShield-4K',
    description:
      '4K UHD smart home security camera with night vision and Wi-Fi.',
    price: '199.99',
    currency: 'JPY',
    availability: 'In Stock',
    quantity: '10',
    weight: '350',
    weightUnit: 'g',
    length: '150',
    lengthUnit: 'mm',
    width: '100',
    widthUnit: 'mm',
    height: '80',
    heightUnit: 'mm',
    additionalComments:
      'Monitor your home in crystal-clear 4K resolution with night vision.',
    accessoryType: 'Smart Home Security Camera',
    accessoryColor: 'Gray',
    accessoryInterface: 'Wi-Fi',
    additionalFields: {
      resolution: '4K UHD',
      nightVision: 'Yes',
    },
    reviewsIds: [],
  },
];

function returnAccessorySchemas({
  accessoryArrays,
  usersDocs,
}: {
  accessoryArrays: AccessoryArrays;
  usersDocs: DirectoryUserDocument[];
}) {
  // pool of accessory types

  return accessoryArrays.reduce<AccessorySchema[]>(
    (schemasAcc, accessoryArray, accessoryArrayIdx) => {
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

      const accessorySchema: AccessorySchema = {
        ...accessoryArray,
        userId,
        username,
        price: parseFloat(accessoryArray.price),
        quantity: parseInt(accessoryArray.quantity),
        weight: parseFloat(accessoryArray.weight),
        length: parseFloat(accessoryArray.length),
        width: parseFloat(accessoryArray.width),
        height: parseFloat(accessoryArray.height),
        uploadedFilesIds: [],
      };

      schemasAcc.push(accessorySchema);

      return schemasAcc;
    },
    []
  );
}

export { ACCESSORY_ARRAYS, returnAccessorySchemas };
