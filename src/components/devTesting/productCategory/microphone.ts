/**
 * type MicrophoneSchema  = {
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

microphoneType: "Other" | "USB" | "Condenser" | "Dynamic" | "Ribbon" | "Wireless";
microphonePolarPattern: "Other" | "Cardioid" | "Supercardioid" | "Hypercardioid" | "Omnidirectional" | "Bidirectional";
microphoneFrequencyResponse: /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/;
microphoneColor: /^[a-zA-Z0-9#()%,.\s-]{2,30}$/;
microphoneInterface: "Other" | "USB" | "Wireless" | "XLR" | "3.5mm";

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */

import { DirectoryUserDocument } from '../../directory/types';
import {
  MicrophoneSchema,
  MicrophoneSpecifications,
  ProductCategorySpecifications,
} from '../../product/types';

const MICROPHONES_ARRAY: (ProductCategorySpecifications &
  MicrophoneSpecifications)[] = [
  {
    brand: 'Audio-Technica',
    model: 'AT2020',
    description:
      'A popular cardioid condenser microphone for studio recording.',
    price: 149.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.75,
    weightUnit: 'kg',
    length: 150,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 200,
    heightUnit: 'mm',
    additionalComments: 'Comes with a shock mount and carrying pouch.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'XLR',
    additionalFields: {
      connectorType: 'Gold-plated XLR',
      powerRequirements: '48V Phantom Power',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Shure',
    model: 'SM7B',
    description:
      'A legendary dynamic microphone with a smooth, flat, wide-range frequency response appropriate for music and speech.',
    price: 399.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 30,
    weight: 0.6,
    weightUnit: 'kg',
    length: 100,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 200,
    heightUnit: 'mm',
    additionalComments:
      'Ideal for both studio recording and live broadcasting.',
    microphoneType: 'Dynamic',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '50Hz - 20kHz',
    microphoneColor: 'Dark Gray',
    microphoneInterface: 'XLR',
    additionalFields: {
      includedAccessories: 'Windscreen and yoke mount included.',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Blue',
    model: 'Yeti',
    description:
      'A versatile USB microphone with multiple pattern selection for various recording situations.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 20,
    weight: 1.2,
    weightUnit: 'kg',
    length: 120,
    lengthUnit: 'mm',
    width: 120,
    widthUnit: 'mm',
    height: 280,
    heightUnit: 'mm',
    additionalComments: 'Plug-and-play design for easy setup and use.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Other',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Silver',
    microphoneInterface: 'USB',
    additionalFields: {
      compatibility: 'Compatible with Windows and Mac',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Sennheiser',
    model: 'MK4',
    description:
      'A high-quality condenser microphone with a cardioid polar pattern for precise sound capture.',
    price: 299.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 25,
    weight: 0.8,
    weightUnit: 'kg',
    length: 180,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 220,
    heightUnit: 'mm',
    additionalComments:
      'Ideal for professional studio recordings with a sleek black finish.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'XLR',
    additionalFields: {
      sensitivity: '25 mV/Pa',
      maxSPL: '140 dB',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Rode',
    model: 'NT-USB',
    description:
      'A versatile USB microphone with studio-quality recording capabilities, suitable for podcasting and voiceovers.',
    price: 199.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 40,
    weight: 0.5,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 40,
    widthUnit: 'mm',
    height: 200,
    heightUnit: 'mm',
    additionalComments:
      'Plug-and-play convenience with a pop shield included for clear recordings.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Silver',
    microphoneInterface: 'USB',
    additionalFields: {
      compatibleSoftware: 'Works with all major audio software',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'AKG',
    model: 'C414 XLII',
    description:
      'A legendary multi-pattern condenser microphone with a wide frequency range, suitable for various recording applications.',
    price: 999.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 15,
    weight: 1.2,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 60,
    widthUnit: 'mm',
    height: 230,
    heightUnit: 'mm',
    additionalComments:
      'Nine selectable polar patterns and three attenuation levels for versatile recording.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Other',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Gold',
    microphoneInterface: 'XLR',
    additionalFields: {
      includedAccessories: 'Aluminum carrying case, shock mount, windscreen',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Audio-Technica',
    model: 'ATR2100x-USB',
    description:
      'A dynamic USB/XLR microphone with a cardioid polar pattern, suitable for both home and professional use.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 35,
    weight: 0.3,
    weightUnit: 'kg',
    length: 180,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments:
      'Dual USB/XLR connectivity for flexibility and convenience.',
    microphoneType: 'Dynamic',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '50Hz - 15kHz',
    microphoneColor: 'Silver',
    microphoneInterface: 'Other',
    additionalFields: {
      headphoneJack: '3.5mm',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Shure',
    model: 'SM58',
    description:
      'A legendary dynamic microphone known for its durability and clear, bright sound.',
    price: 99.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.3,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments: 'Ideal for live performances and vocal recordings.',
    microphoneType: 'Dynamic',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '50Hz - 15kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'XLR',
    additionalFields: {
      cableLength: '3 meters',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Razer',
    model: 'Seiren Elite',
    description:
      'A sleek USB microphone designed for streaming and professional-grade recording.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 30,
    weight: 0.8,
    weightUnit: 'kg',
    length: 200,
    lengthUnit: 'mm',
    width: 60,
    widthUnit: 'mm',
    height: 180,
    heightUnit: 'mm',
    additionalComments:
      'Built-in shock mount for enhanced stability and audio clarity.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Quartz Pink',
    microphoneInterface: 'USB',
    additionalFields: {
      lighting: 'RGB lighting with customizable effects',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Blue',
    model: 'Snowball iCE',
    description:
      'A budget-friendly USB microphone with plug-and-play simplicity for entry-level recording.',
    price: 49.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 60,
    weight: 0.5,
    weightUnit: 'kg',
    length: 120,
    lengthUnit: 'mm',
    width: 80,
    widthUnit: 'mm',
    height: 120,
    heightUnit: 'mm',
    additionalComments:
      'Perfect for podcasting and voice chats with a cardioid polar pattern.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '40Hz - 18kHz',
    microphoneColor: 'White',
    microphoneInterface: 'USB',
    additionalFields: {
      compatibility: 'Windows and Mac',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Slate Digital',
    model: 'VMS ML-1',
    description:
      'A high-end modeling microphone with state-of-the-art emulations of classic studio microphones.',
    price: 1499.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 10,
    weight: 1.0,
    weightUnit: 'kg',
    length: 180,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 220,
    heightUnit: 'mm',
    additionalComments:
      'Emulates famous microphones with unparalleled accuracy for studio professionals.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Graphite',
    microphoneInterface: 'XLR',
    additionalFields: {
      emulatedMicrophones: 'Various classic studio microphones',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Behringer',
    model: 'XM8500',
    description:
      'A budget-friendly dynamic microphone with a cardioid polar pattern, suitable for vocals and instruments.',
    price: 29.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 100,
    weight: 0.3,
    weightUnit: 'kg',
    length: 160,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments:
      'Durable construction with a wide frequency response for versatile use.',
    microphoneType: 'Dynamic',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '50Hz - 15kHz',
    microphoneColor: 'Silver',
    microphoneInterface: 'XLR',
    additionalFields: {
      connectorType: 'Gold-plated XLR',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Audio-Technica',
    model: 'ATR2500x',
    description:
      'A versatile USB microphone with cardioid polar pattern and headphone monitoring, ideal for podcasting and voiceovers.',
    price: 129.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.5,
    weightUnit: 'kg',
    length: 180,
    lengthUnit: 'mm',
    width: 50,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments:
      'Plug-and-play design with convenient volume control and mute button.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '30Hz - 15kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'USB',
    additionalFields: {
      compatibleSoftware: 'Compatible with major recording software',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Neumann',
    model: 'U87 Ai',
    description:
      'A legendary condenser microphone known for its smooth frequency response and versatility in professional studios.',
    price: 3499.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 20,
    weight: 0.8,
    weightUnit: 'kg',
    length: 200,
    lengthUnit: 'mm',
    width: 60,
    widthUnit: 'mm',
    height: 50,
    heightUnit: 'mm',
    additionalComments:
      'Three selectable polar patterns and low self-noise for exceptional recording quality.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Other',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Nickel',
    microphoneInterface: 'XLR',
    additionalFields: {
      includedAccessories: 'Wooden case, shock mount, windscreen',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Saramonic',
    model: 'Blink 500 B2',
    description:
      'A wireless dual-channel microphone system for content creators, featuring compact transmitters and a receiver.',
    price: 249.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 30,
    weight: 0.2,
    weightUnit: 'kg',
    length: 100,
    lengthUnit: 'mm',
    width: 60,
    widthUnit: 'mm',
    height: 30,
    heightUnit: 'mm',
    additionalComments:
      'Ideal for vlogging and interviews with reliable 2.4GHz digital wireless technology.',
    microphoneType: 'Wireless',
    microphonePolarPattern: 'Omnidirectional',
    microphoneFrequencyResponse: '20Hz - 16kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'Wireless',
    additionalFields: {
      wirelessRange: 'Up to 70 meters',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Sony',
    model: 'ECM-CS3',
    description:
      'A compact and lightweight clip-on microphone, perfect for capturing clear audio in various situations.',
    price: 49.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 75,
    weight: 0.02,
    weightUnit: 'kg',
    length: 50,
    lengthUnit: 'mm',
    width: 10,
    widthUnit: 'mm',
    height: 150,
    heightUnit: 'mm',
    additionalComments:
      'Hands-free recording solution with a convenient clip design.',
    microphoneType: 'Other',
    microphonePolarPattern: 'Omnidirectional',
    microphoneFrequencyResponse: '50Hz - 15kHz',
    microphoneColor: 'Black',
    microphoneInterface: '3.5mm',
    additionalFields: {
      cableLength: '1.5 meters',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Blue',
    model: 'Yeti Nano',
    description:
      'A compact USB microphone with a stylish design, suitable for desktop recording and streaming.',
    price: 79.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 50,
    weight: 0.55,
    weightUnit: 'kg',
    length: 120,
    lengthUnit: 'mm',
    width: 100,
    widthUnit: 'mm',
    height: 220,
    heightUnit: 'mm',
    additionalComments:
      'Plug-and-play convenience with selectable pickup patterns for versatile use.',
    microphoneType: 'USB',
    microphonePolarPattern: 'Other',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Cubano Gold',
    microphoneInterface: 'USB',
    additionalFields: {
      headphoneJack: '3.5mm',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Shure',
    model: 'SM7B',
    description:
      'A renowned dynamic microphone with a flat, wide-range frequency response, ideal for professional vocal recording.',
    price: 399.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 30,
    weight: 1.1,
    weightUnit: 'kg',
    length: 190,
    lengthUnit: 'mm',
    width: 96,
    widthUnit: 'mm',
    height: 200,
    heightUnit: 'mm',
    additionalComments:
      'Effective shielding against electromagnetic hum, suitable for broadcast and studio use.',
    microphoneType: 'Dynamic',
    microphonePolarPattern: 'Cardioid',
    microphoneFrequencyResponse: '50Hz - 20kHz',
    microphoneColor: 'Dark Gray',
    microphoneInterface: 'XLR',
    additionalFields: {
      includedAccessories: 'Windscreen, close-talk windscreen',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
  {
    brand: 'Rode',
    model: 'NTG5',
    description:
      'A shotgun microphone designed for professional audio recording in the field, featuring ultra-lightweight construction.',
    price: 499.99,
    currency: 'USD',
    availability: 'In Stock',
    quantity: 20,
    weight: 0.76,
    weightUnit: 'kg',
    length: 203,
    lengthUnit: 'mm',
    width: 19,
    widthUnit: 'mm',
    height: 19,
    heightUnit: 'mm',
    additionalComments:
      'RF-bias technology for superior performance in humid conditions.',
    microphoneType: 'Condenser',
    microphonePolarPattern: 'Supercardioid',
    microphoneFrequencyResponse: '20Hz - 20kHz',
    microphoneColor: 'Black',
    microphoneInterface: 'XLR',
    additionalFields: {
      shockMount: 'Included',
    },
    reviewsIds: [],
    uploadedFilesIds: [],
  },
];

function returnMicrophoneSchemas({
  microphonesArray,
  usersDocs,
}: {
  microphonesArray: typeof MICROPHONES_ARRAY;
  usersDocs: DirectoryUserDocument[];
}) {
  return microphonesArray.map((microphone) => {
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

    const microphoneSchema: MicrophoneSchema = {
      ...microphone,
      userId,
      username,
    };

    return microphoneSchema;
  });
}

export { MICROPHONES_ARRAY, returnMicrophoneSchemas };
