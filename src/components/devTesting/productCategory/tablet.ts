/**
 * type TabletSchema  = {
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

tabletOs: "Other" | "Android" | "iOS" | "Windows" | "Linux";
tabletChipset: /^[a-zA-Z0-9\s.,'()-]{2,30}$/;
tabletDisplay: /^(?!^$|^0*$)[0-9]{1,3}(.[0-9]{1,2})?$/;
tabletHorizontalResolution: /^(?!^$|^0*$)[0-9]{1,6}$/;
tabletVerticalResolution: /^(?!^$|^0*$)[0-9]{1,6}$/;
tabletRamCapacity: /^(?!^$|^0*$)[0-9]{1,4}$/;
tabletRamCapacityUnit: "KB" | "MB" | "GB" | "TB";
tabletStorage: /^(?!^$|^0*$)[0-9]{1,4}$/;
tabletBattery: /^(?!^$|^0*$)[0-9]{1,6}$/;
tabletCamera: /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){1,12}$/;
tabletColor: /^[a-zA-Z0-9#()%,.\s-]{2,30}$/;

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */

import { v4 as uuidv4 } from "uuid";

import {
	ProductCategorySpecifications,
	TabletSchema,
	TabletSpecifications,
} from "../../product/types";

const TABLETS_ARRAY: Omit<
	ProductCategorySpecifications & TabletSpecifications,
	"sku"
>[] = [
	{
		brand: "Samsung",
		model: "Galaxy Tab S7",
		description:
			"A powerful Android tablet for productivity and entertainment.",
		price: 599.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 50,
		weight: 500,
		weightUnit: "g",
		length: 200,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 7.1,
		heightUnit: "mm",
		additionalComments: "Includes S Pen for enhanced functionality.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 865+",
		tabletDisplay: 11,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 8000,
		tabletCamera: "13 MP, 5 MP (Ultra-wide)",
		tabletColor: "Mystic Black",
		additionalFields: {
			warranty: "1 year",
			accessories: "Charger, USB-C cable",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Apple",
		model: "iPad Air (4th generation)",
		description:
			"A sleek and powerful iPad with a stunning Liquid Retina display.",
		price: 699.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 458,
		weightUnit: "g",
		length: 247.6,
		lengthUnit: "mm",
		width: 178.5,
		widthUnit: "mm",
		height: 6.1,
		heightUnit: "mm",
		additionalComments:
			"Supports Apple Pencil (2nd generation) and Magic Keyboard.",
		tabletOs: "iOS",
		tabletChipset: "A14 Bionic",
		tabletDisplay: 10.9,
		tabletHorizontalResolution: 2360,
		tabletVerticalResolution: 1640,
		tabletRamCapacity: 4,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 7200,
		tabletCamera: "12 MP (Wide)",
		tabletColor: "Sky Blue",
		additionalFields: {
			faceID: "Yes",
			connectivity: "Wi-Fi, Bluetooth 5.0",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Microsoft",
		model: "Surface Pro 7",
		description:
			"A versatile 2-in-1 laptop/tablet with a high-resolution PixelSense display.",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 775,
		weightUnit: "g",
		length: 292,
		lengthUnit: "mm",
		width: 201,
		widthUnit: "mm",
		height: 8.5,
		heightUnit: "mm",
		additionalComments: "Includes Type Cover for a laptop-like experience.",
		tabletOs: "Windows",
		tabletChipset: "Intel Core i5",
		tabletDisplay: 12.3,
		tabletHorizontalResolution: 2736,
		tabletVerticalResolution: 1824,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 7800,
		tabletCamera: "8 MP (1080p HD)",
		tabletColor: "Platinum",
		additionalFields: {
			ports: "USB-C, USB-A, Surface Connect",
			penSupport: "Surface Pen compatible",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Sony",
		model: "Xperia Tab X10",
		description: "Slim and lightweight Android tablet with a vibrant display.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 400,
		weightUnit: "g",
		length: 210,
		lengthUnit: "mm",
		width: 125,
		widthUnit: "mm",
		height: 8.5,
		heightUnit: "mm",
		additionalComments: "Dolby Atmos sound for an immersive audio experience.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 765",
		tabletDisplay: 10.1,
		tabletHorizontalResolution: 1920,
		tabletVerticalResolution: 1200,
		tabletRamCapacity: 4,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 6000,
		tabletCamera: "8 MP (Main), 5 MP (Front)",
		tabletColor: "Mystic Silver",
		additionalFields: {
			warranty: "2 years",
			accessories: "USB-C charger, user manual",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Lenovo",
		model: "Tab P11 Pro",
		description: "Premium Android tablet with a stunning 2K OLED display.",
		price: 749.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 485,
		weightUnit: "g",
		length: 264.3,
		lengthUnit: "mm",
		width: 171.4,
		widthUnit: "mm",
		height: 6.9,
		heightUnit: "mm",
		additionalComments: "Quad JBL speakers for immersive audio.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 730G",
		tabletDisplay: 11.5,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 8600,
		tabletCamera: "13 MP (Main), 8 MP (Front)",
		tabletColor: "Platinum Grey",
		additionalFields: {
			penSupport: "Lenovo Precision Pen 2 included",
			connectivity: "Wi-Fi 6, Bluetooth 5.1",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Asus",
		model: "ZenPad 3S 10",
		description:
			"Sleek and powerful Android tablet for multimedia and productivity.",
		price: 349.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 40,
		weight: 430,
		weightUnit: "g",
		length: 240.5,
		lengthUnit: "mm",
		width: 163.7,
		widthUnit: "mm",
		height: 7.2,
		heightUnit: "mm",
		additionalComments: "Fingerprint sensor for secure unlocking.",
		tabletOs: "Android",
		tabletChipset: "MediaTek MT8176",
		tabletDisplay: 9.7,
		tabletHorizontalResolution: 2048,
		tabletVerticalResolution: 1536,
		tabletRamCapacity: 4,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 64,
		tabletBattery: 5900,
		tabletCamera: "8 MP (Main), 5 MP (Front)",
		tabletColor: "Rose Gold",
		additionalFields: {
			specialFeatures: "Harman Kardon audio, ASUS Tru2Life technology",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Huawei",
		model: "MatePad Pro",
		description:
			"Premium Android tablet with a sleek design and powerful performance.",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 35,
		weight: 460,
		weightUnit: "g",
		length: 246,
		lengthUnit: "mm",
		width: 159,
		widthUnit: "mm",
		height: 7.2,
		heightUnit: "mm",
		additionalComments: "HarmonyOS for a seamless user experience.",
		tabletOs: "Other",
		tabletChipset: "Kirin 990",
		tabletDisplay: 10.8,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 7250,
		tabletCamera: "13 MP (Main), 8 MP (Front)",
		tabletColor: "Midnight Grey",
		additionalFields: {
			accessories: "M-Pencil, Smart Keyboard",
			warranty: "1 year",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Dell",
		model: "Latitude 7210 2-in-1",
		description:
			"Windows tablet with a detachable keyboard for ultimate flexibility.",
		price: 1199.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 850,
		weightUnit: "g",
		length: 292,
		lengthUnit: "mm",
		width: 208,
		widthUnit: "mm",
		height: 9.4,
		heightUnit: "mm",
		additionalComments: "Ideal for business professionals on the go.",
		tabletOs: "Windows",
		tabletChipset: "Intel Core i5",
		tabletDisplay: 12.3,
		tabletHorizontalResolution: 1920,
		tabletVerticalResolution: 1280,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 7500,
		tabletCamera: "8 MP (Main), 5 MP (Front)",
		tabletColor: "Titan Gray",
		additionalFields: {
			securityFeatures: "Fingerprint reader, TPM 2.0",
			connectivity: "Wi-Fi 6, Bluetooth 5.0",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Xiaomi",
		model: "MiPad 5 Pro",
		description:
			"Android tablet with a high-refresh-rate display and powerful Snapdragon processor.",
		price: 699.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 515,
		weightUnit: "g",
		length: 245,
		lengthUnit: "mm",
		width: 149,
		widthUnit: "mm",
		height: 8.2,
		heightUnit: "mm",
		additionalComments: "Supports Xiaomi Stylus for note-taking and drawing.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 870",
		tabletDisplay: 11,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 8600,
		tabletCamera: "13 MP (Main), 5 MP (Front)",
		tabletColor: "Cosmic Black",
		additionalFields: {
			specialFeatures: "120Hz refresh rate",
			warranty: "2 years",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Google",
		model: "Pixel Slate",
		description: "Versatile 2-in-1 Chrome OS tablet with a Pixelbook Keyboard.",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 731,
		weightUnit: "g",
		length: 202,
		lengthUnit: "mm",
		width: 290,
		widthUnit: "mm",
		height: 7,
		heightUnit: "mm",
		additionalComments: "12.3-inch Molecular Display for crisp visuals.",
		tabletOs: "Other",
		tabletChipset: "Intel Core i5",
		tabletDisplay: 12.3,
		tabletHorizontalResolution: 3000,
		tabletVerticalResolution: 2000,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 48,
		tabletCamera: "8 MP (Front and Rear)",
		tabletColor: "Midnight Blue",
		additionalFields: {
			keyboardIncluded: "Yes",
			stylusSupport: "Pixelbook Pen compatible",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Samsung",
		model: "Galaxy Tab A7",
		description:
			"Affordable Android tablet with a large display for entertainment.",
		price: 229.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 476,
		weightUnit: "g",
		length: 247.6,
		lengthUnit: "mm",
		width: 157.4,
		widthUnit: "mm",
		height: 7,
		heightUnit: "mm",
		additionalComments: "Quad speakers with Dolby Atmos for immersive audio.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 662",
		tabletDisplay: 10.4,
		tabletHorizontalResolution: 2000,
		tabletVerticalResolution: 1200,
		tabletRamCapacity: 3,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 64,
		tabletBattery: 7040,
		tabletCamera: "8 MP (Main), 5 MP (Front)",
		tabletColor: "Dark Gray",
		additionalFields: {
			expandableStorage: "MicroSD up to 1TB",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Apple",
		model: "iPad Pro 12.9 (5th generation)",
		description:
			"Powerful iPad Pro with M1 chip and Liquid Retina XDR display.",
		price: 1099.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 682,
		weightUnit: "g",
		length: 280.6,
		lengthUnit: "mm",
		width: 214.9,
		widthUnit: "mm",
		height: 6.4,
		heightUnit: "mm",
		additionalComments:
			"Thunderbolt 3 and 5G support for enhanced connectivity.",
		tabletOs: "iOS",
		tabletChipset: "Apple M1",
		tabletDisplay: 12.9,
		tabletHorizontalResolution: 2732,
		tabletVerticalResolution: 2048,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 10091,
		tabletCamera: "12 MP (Wide), 10 MP (Ultra-wide)",
		tabletColor: "Space Gray",
		additionalFields: {
			faceID: "Yes",
			pencilSupport: "Apple Pencil (2nd generation)",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Acer",
		model: "Iconia One 10",
		description: "Budget-friendly Android tablet for everyday use.",
		price: 199.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 50,
		weight: 550,
		weightUnit: "g",
		length: 259,
		lengthUnit: "mm",
		width: 167,
		widthUnit: "mm",
		height: 8.9,
		heightUnit: "mm",
		additionalComments: "Dual speakers for enhanced audio.",
		tabletOs: "Android",
		tabletChipset: "MediaTek MT8167B",
		tabletDisplay: 10.1,
		tabletHorizontalResolution: 1280,
		tabletVerticalResolution: 800,
		tabletRamCapacity: 2,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 32,
		tabletBattery: 6100,
		tabletCamera: "5 MP (Main), 2 MP (Front)",
		tabletColor: "Silver",
		additionalFields: {
			warranty: "1 year",
			accessories: "Power adapter, USB cable",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Microsoft",
		model: "Surface Go 2",
		description:
			"Compact Windows tablet with a detachable keyboard for productivity on the go.",
		price: 549.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 544,
		weightUnit: "g",
		length: 245,
		lengthUnit: "mm",
		width: 175,
		widthUnit: "mm",
		height: 8.3,
		heightUnit: "mm",
		additionalComments: "10.5-inch PixelSense display for vibrant visuals.",
		tabletOs: "Windows",
		tabletChipset: "Intel Pentium Gold",
		tabletDisplay: 10.5,
		tabletHorizontalResolution: 1920,
		tabletVerticalResolution: 1280,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 8000,
		tabletCamera: "8 MP (Rear), 5 MP (Front)",
		tabletColor: "Platinum",
		additionalFields: {
			penSupport: "Surface Pen compatible",
			connectivity: "Wi-Fi 6, Bluetooth 5.0",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Sony",
		model: "Xperia Z4 Tablet",
		description:
			"High-end Android tablet with a waterproof design and 2K display.",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 389,
		weightUnit: "g",
		length: 254,
		lengthUnit: "mm",
		width: 167,
		widthUnit: "mm",
		height: 6.1,
		heightUnit: "mm",
		additionalComments: "Snapdragon 810 processor for smooth performance.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 810",
		tabletDisplay: 10.1,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 3,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 32,
		tabletBattery: 6000,
		tabletCamera: "8 MP (Main), 5.1 MP (Front)",
		tabletColor: "Black",
		additionalFields: {
			waterResistance: "IP68",
			accessories: "Charging dock, Quick charger",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Samsung",
		model: "Galaxy Tab S7",
		description:
			"Premium Android tablet with S Pen support and AMOLED display.",
		price: 649.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 498,
		weightUnit: "g",
		length: 253.8,
		lengthUnit: "mm",
		width: 165.3,
		widthUnit: "mm",
		height: 6.3,
		heightUnit: "mm",
		additionalComments: "Snapdragon 865+ processor for powerful performance.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 865+",
		tabletDisplay: 11,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 8000,
		tabletCamera: "13 MP (Main), 8 MP (Front)",
		tabletColor: "Mystic Black",
		additionalFields: {
			dexMode: "Yes",
			keyboardIncluded: "No",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Apple",
		model: "iPad Air (4th generation)",
		description:
			"Thin and light iOS tablet with A14 Bionic chip and True Tone display.",
		price: 599.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 458,
		weightUnit: "g",
		length: 247.6,
		lengthUnit: "mm",
		width: 178.5,
		widthUnit: "mm",
		height: 6.1,
		heightUnit: "mm",
		additionalComments:
			"Touch ID integrated into the top button for secure unlocking.",
		tabletOs: "iOS",
		tabletChipset: "A14 Bionic",
		tabletDisplay: 10.9,
		tabletHorizontalResolution: 2360,
		tabletVerticalResolution: 1640,
		tabletRamCapacity: 4,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 7606,
		tabletCamera: "12 MP (Main), 7 MP (Front)",
		tabletColor: "Sky Blue",
		additionalFields: {
			pencilSupport: "Apple Pencil (2nd generation)",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Lenovo",
		model: "Tab P11 Pro",
		description:
			"Sleek Android tablet with OLED display and quad speakers for immersive entertainment.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 485,
		weightUnit: "g",
		length: 264.3,
		lengthUnit: "mm",
		width: 171.4,
		widthUnit: "mm",
		height: 5.8,
		heightUnit: "mm",
		additionalComments: "Dolby Atmos support for enhanced audio experience.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 730G",
		tabletDisplay: 11.5,
		tabletHorizontalResolution: 2560,
		tabletVerticalResolution: 1600,
		tabletRamCapacity: 6,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 8600,
		tabletCamera: "13 MP (Main), 8 MP (Front)",
		tabletColor: "Platinum Grey",
		additionalFields: {
			keyboardIncluded: "Optional",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Samsung",
		model: "Galaxy Tab A7",
		description: "Affordable Android tablet with a sleek design.",
		price: 199.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 50,
		weight: 476,
		weightUnit: "g",
		length: 247.6,
		lengthUnit: "mm",
		width: 157.4,
		widthUnit: "mm",
		height: 7,
		heightUnit: "mm",
		additionalComments: "Great for multimedia and everyday use.",
		tabletOs: "Android",
		tabletChipset: "Snapdragon 662",
		tabletDisplay: 10.4,
		tabletHorizontalResolution: 2000,
		tabletVerticalResolution: 1200,
		tabletRamCapacity: 3,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 64,
		tabletBattery: 7040,
		tabletCamera: "8 MP (Main), 5 MP (Front)",
		tabletColor: "Dark Gray",
		additionalFields: {
			warranty: "1 year",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Apple",
		model: "iPad Pro (5th generation)",
		description:
			"Powerful iOS tablet with M1 chip and Liquid Retina XDR display.",
		price: 1099.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 682,
		weightUnit: "g",
		length: 280.6,
		lengthUnit: "mm",
		width: 214.9,
		widthUnit: "mm",
		height: 6.4,
		heightUnit: "mm",
		additionalComments: "Professional-grade performance and stunning visuals.",
		tabletOs: "iOS",
		tabletChipset: "Apple M1",
		tabletDisplay: 12.9,
		tabletHorizontalResolution: 2732,
		tabletVerticalResolution: 2048,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 256,
		tabletBattery: 10090,
		tabletCamera:
			"12 MP (Wide), 10 MP (Ultra Wide), 2x optical zoom in, 2x optical zoom out",
		tabletColor: "Silver",
		additionalFields: {
			magicKeyboardIncluded: "No",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
	{
		brand: "Microsoft",
		model: "Surface Go 2",
		description: "Versatile Windows tablet with a compact design.",
		price: 549.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 544,
		weightUnit: "g",
		length: 245,
		lengthUnit: "mm",
		width: 175,
		widthUnit: "mm",
		height: 8.3,
		heightUnit: "mm",
		additionalComments: "Perfect for productivity on the go.",
		tabletOs: "Windows",
		tabletChipset: "Intel Pentium Gold 4425Y",
		tabletDisplay: 10.5,
		tabletHorizontalResolution: 1920,
		tabletVerticalResolution: 1280,
		tabletRamCapacity: 8,
		tabletRamCapacityUnit: "GB",
		tabletStorage: 128,
		tabletBattery: 7600,
		tabletCamera: "8 MP (Rear), 5 MP (Front)",
		tabletColor: "Platinum",
		additionalFields: {
			typeCoverIncluded: "No",
		},
		starRatingsCount: {
			"0.5": 0,
			"1.0": 0,
			"1.5": 0,
			"2.0": 0,
			"2.5": 0,
			"3.0": 0,
			"3.5": 0,
			"4.0": 0,
			"4.5": 0,
			"5.0": 0,
		},
		reviewsIds: [],
		uploadedFilesIds: [],
	},
];

function returnTabletSchemas(tabletsArray: typeof TABLETS_ARRAY) {
	return tabletsArray.map((tablet, index) => {
		const sku = uuidv4();

		const tabletSchema: TabletSchema = {
			...tablet,
			sku,
		};

		return tabletSchema;
	});
}

const TABLET_REVIEWS = [
	{
		productReview: "Great tablet! Excellent performance and battery life.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The screen resolution is impressive, but the battery drains quickly.",
		productRating: "3",
		helpfulVotes: 5,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview: "Solid build quality, but the camera could be better.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Amazing value for the price. Fast delivery and well-packaged.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not satisfied with the performance. Laggy experience overall.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 7,
		isVerifiedPurchase: true,
	},
	{
		productReview: "Love the sleek design, but the speakers could be louder.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average tablet. Nothing extraordinary, but gets the job done.",
		productRating: "3",
		helpfulVotes: 4,
		unhelpfulVotes: 4,
		isVerifiedPurchase: true,
	},
	{
		productReview: "Easy to use for daily tasks. Good for productivity.",
		productRating: "4.5",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Faulty product. Had to return it due to touchscreen issues.",
		productRating: "1.5",
		helpfulVotes: 1,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview: "Decent tablet for the price. No major complaints.",
		productRating: "3.5",
		helpfulVotes: 6,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This tablet exceeded my expectations! Lightning-fast performance and stunning display.",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointing battery life. I expected more from a premium tablet.",
		productRating: "2.5",
		helpfulVotes: 5,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for the money. Does everything I need without breaking the bank.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid build quality, but the software could use some improvement.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Fantastic tablet for gaming! Smooth graphics and responsive controls.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Slim and lightweight design, but the camera quality is mediocre.",
		productRating: "3",
		helpfulVotes: 6,
		unhelpfulVotes: 4,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Easy setup and user-friendly interface. Perfect for tech beginners.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Faulty touchscreen. Had issues from day one. Not recommended.",
		productRating: "1.5",
		helpfulVotes: 2,
		unhelpfulVotes: 15,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Excellent customer service! They quickly resolved an issue I had with the tablet.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average tablet. Nothing exceptional, but it gets the job done.",
		productRating: "3",
		helpfulVotes: 7,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The tablet is lightweight and easy to carry. However, the battery life is shorter than expected.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolutely love this tablet! It's perfect for watching movies on the go.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The build quality is top-notch, but the software occasionally lags.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the camera quality. Photos appear grainy, especially in low light.",
		productRating: "2.5",
		helpfulVotes: 3,
		unhelpfulVotes: 7,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Excellent tablet for productivity. The stylus is a game-changer for note-taking.",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for the price. I use it for both work and entertainment.",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The tablet froze a couple of times, but a quick restart resolved the issue.",
		productRating: "3",
		helpfulVotes: 5,
		unhelpfulVotes: 5,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Battery life is impressive. I can go a whole day without recharging.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The tablet is fast and responsive, but the speakers could be louder.",
		productRating: "3.5",
		helpfulVotes: 7,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Had some issues with the touchscreen accuracy. It needs improvement.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This tablet is a game-changer! Exceptional performance and sleek design.",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average tablet. It meets basic needs but lacks some advanced features.",
		productRating: "3",
		helpfulVotes: 6,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Incredible battery life! I can use it for hours without worrying about charging.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the build quality. Feels a bit flimsy and fragile.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 8,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Excellent value for money. This tablet competes with more expensive brands.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The tablet froze occasionally, but a software update seems to have fixed the issue.",
		productRating: "3.5",
		helpfulVotes: 7,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent camera quality for a tablet. Good for casual photography.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Smooth and responsive touchscreen. Makes navigation a breeze.",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not happy with the customer service. It took too long to resolve an issue.",
		productRating: "2.5",
		helpfulVotes: 3,
		unhelpfulVotes: 6,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the overall performance. Great for both work and entertainment.",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolutely love this tablet! It's sleek, lightweight, and perfect for both work and entertainment.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the battery life. It doesn't last as long as advertised.",
		productRating: "2.5",
		helpfulVotes: 5,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great tablet for gaming! The graphics are impressive, and it handles demanding games well.",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The camera quality is subpar. Photos lack detail, especially in low-light conditions.",
		productRating: "2",
		helpfulVotes: 3,
		unhelpfulVotes: 7,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid performance and a decent price point. A reliable tablet for everyday use.",
		productRating: "3.5",
		helpfulVotes: 10,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressive build quality! The tablet feels sturdy and durable in hand.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Had some initial software issues, but a quick update resolved them. Overall satisfied.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Battery life is excellent, lasting through a full day of use. Highly recommended!",
		productRating: "4.5",
		helpfulVotes: 20,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average tablet. It gets the job done, but nothing extraordinary to mention.",
		productRating: "3",
		helpfulVotes: 6,
		unhelpfulVotes: 4,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The tablet froze a couple of times, but a restart usually fixed the issue. Good for the price.",
		productRating: "3.5",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This tablet is a masterpiece! The display is stunning, and the performance is top-notch.",
		productRating: "5",
		helpfulVotes: 25,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the battery life. It drains quickly, especially when using resource-intensive apps.",
		productRating: "2.5",
		helpfulVotes: 5,
		unhelpfulVotes: 15,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid tablet for work and play. The multitasking capabilities are impressive.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Camera quality is below expectations. Photos lack sharpness and clarity.",
		productRating: "2",
		helpfulVotes: 3,
		unhelpfulVotes: 8,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Incredible value for the price! This tablet competes with more expensive options on the market.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the sleek design and lightweight feel. Perfect for on-the-go use.",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Experienced occasional software glitches. A firmware update is needed to address these issues.",
		productRating: "3",
		helpfulVotes: 7,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Battery life is satisfactory, lasting a full workday without needing to recharge.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The customer service was helpful in resolving a minor issue. Happy with the support.",
		productRating: "4.5",
		helpfulVotes: 20,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent tablet overall. It meets my needs for casual use, but not exceptional in any particular aspect.",
		productRating: "3",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
];

export { returnTabletSchemas, TABLET_REVIEWS, TABLETS_ARRAY };
