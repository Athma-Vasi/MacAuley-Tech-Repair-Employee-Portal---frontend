/**
 * type DesktopComputerSchema  = {
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

// rest of the  fields will be selected from other productCategory schemas

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */
import { v4 as uuidv4 } from "uuid";

import {
	DesktopComputerSchema,
	ProductCategorySpecifications,
} from "../../product/types";
import { CASE_ARRAY } from "./case";
import { CPUS_ARRAY } from "./cpu";
import { DISPLAYS_ARRAY } from "./display";
import { GPUS_ARRAY } from "./gpu";
import { KEYBOARDS_ARRAY } from "./keyboard";
import { MOTHERBOARDS_ARRAY } from "./motherboard";
import { MOUSE_ARRAY } from "./mouse";
import { PSUS_ARRAY } from "./psu";
import { RAMS_ARRAY } from "./ram";
import { SPEAKERS_ARRAY } from "./speaker";
import { STORAGE_ARRAY } from "./storage";

const DESKTOP_COMPUTERS_ARRAY: Omit<ProductCategorySpecifications, "sku">[] = [
	{
		brand: "Dell",
		model: "Inspiron 5000",
		description: "Versatile desktop for daily computing needs.",
		price: 699.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 5.0,
		weightUnit: "kg",
		length: 220,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 320,
		heightUnit: "mm",
		additionalComments: "Suitable for home or small office use.",
		additionalFields: {
			connectivity: "Wi-Fi 5, Bluetooth 4.2",
			color: "Black",
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
		brand: "HP",
		model: "Pavilion 6000",
		description: "High-performance desktop for multimedia tasks.",
		price: 899.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 7.5,
		weightUnit: "kg",
		length: 250,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 350,
		heightUnit: "mm",
		additionalComments: "Great for gaming and video editing.",
		additionalFields: {
			color: "Silver",
			warranty: "2 years",
			includedSoftware: "Microsoft Office",
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
		model: "Essential E550",
		description: "Budget-friendly desktop for everyday tasks.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 4.2,
		weightUnit: "kg",
		length: 210,
		lengthUnit: "mm",
		width: 80,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments: "Compact design, suitable for small spaces.",
		additionalFields: {
			color: "White",
			warranty: "1 year",
			includedAccessories: "Wireless mouse and keyboard",
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
		model: "IdeaCentre 5",
		description: "Powerful desktop for multitasking and productivity.",
		price: 799.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 6.0,
		weightUnit: "kg",
		length: 240,
		lengthUnit: "mm",
		width: 95,
		widthUnit: "mm",
		height: 330,
		heightUnit: "mm",
		additionalComments: "Ideal for home office use.",
		additionalFields: {
			color: "Black",
			warranty: "2 years",
			includedSoftware: "Windows 10 Pro",
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
		model: "Inspiron 5000",
		description: "Versatile desktop for home and office use.",
		price: 699.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 5.5,
		weightUnit: "kg",
		length: 220,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 310,
		heightUnit: "mm",
		additionalComments: "Includes a DVD drive and multiple USB ports.",
		additionalFields: {
			color: "Silver",
			warranty: "1 year",
			wirelessConnectivity: "Wi-Fi 6",
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
		brand: "HP",
		model: "Pavilion 27 All-in-One",
		description: "Sleek all-in-one desktop with a large display.",
		price: 1299.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 8.2,
		weightUnit: "kg",
		length: 650,
		lengthUnit: "mm",
		width: 200,
		widthUnit: "mm",
		height: 500,
		heightUnit: "mm",
		additionalComments: "Perfect for multimedia and entertainment.",
		additionalFields: {
			color: "Black",
			warranty: "2 years",
			touchScreen: "Yes",
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
		model: "Aspire Pro",
		description: "Powerful desktop for professional use.",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 7.8,
		weightUnit: "kg",
		length: 300,
		lengthUnit: "mm",
		width: 150,
		widthUnit: "mm",
		height: 400,
		heightUnit: "mm",
		additionalComments: "Includes a high-speed SSD for quick performance.",
		additionalFields: {
			color: "Gray",
			warranty: "3 years",
			ports: "USB-C, HDMI, DisplayPort",
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
		model: "IdeaCentre 5",
		description: "Versatile desktop for home and office use.",
		price: 699.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 6.2,
		weightUnit: "kg",
		length: 250,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 350,
		heightUnit: "mm",
		additionalComments:
			"Features a compact design and energy-efficient components.",
		additionalFields: {
			color: "Black",
			warranty: "2 years",
			connectivity: "Bluetooth 5.0",
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
		brand: "HP",
		model: "EliteDesk 800 G5",
		description: "Compact and powerful desktop for business use.",
		price: 1249.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 5.5,
		weightUnit: "kg",
		length: 200,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments:
			"Equipped with advanced security features for business environments.",
		additionalFields: {
			color: "Silver",
			warranty: "3 years",
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
		brand: "Dell",
		model: "Inspiron 27 7000",
		description: "All-in-one desktop with a sleek design and large display.",
		price: 1699.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 8.2,
		weightUnit: "kg",
		length: 600,
		lengthUnit: "mm",
		width: 50,
		widthUnit: "mm",
		height: 400,
		heightUnit: "mm",
		additionalComments: "Perfect for home entertainment and productivity.",
		additionalFields: {
			color: "Black",
			displaySize: "27 inches",
			touchScreen: "Yes",
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
		model: "Aspire TC-895",
		description: "Compact desktop for everyday computing tasks.",
		price: 599.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 4.0,
		weightUnit: "kg",
		length: 150,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments: "Includes a DVD-RW drive for multimedia needs.",
		additionalFields: {
			color: "Black",
			ports: "USB 3.1, HDMI, VGA",
			wireless: "802.11ac Wi-Fi",
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
		model: "IdeaCentre 5",
		description: "Powerful desktop for work and entertainment.",
		price: 849.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 6.5,
		weightUnit: "kg",
		length: 180,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 350,
		heightUnit: "mm",
		additionalComments: "High-performance processor for multitasking.",
		additionalFields: {
			color: "Silver",
			storageType: "SSD + HDD",
			graphics: "Integrated Intel UHD",
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
		model: "Inspiron 5000",
		description: "Versatile desktop for home and office use.",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 5.2,
		weightUnit: "kg",
		length: 160,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 320,
		heightUnit: "mm",
		additionalComments: "Sleek design with ample storage space.",
		additionalFields: {
			color: "Silver",
			connectivity: "Wi-Fi, Bluetooth",
			warranty: "1-year limited warranty",
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
		brand: "HP",
		model: "Pavilion 27",
		description: "All-in-one desktop with a stunning display.",
		price: 1299.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 7.0,
		weightUnit: "kg",
		length: 180,
		lengthUnit: "mm",
		width: 70,
		widthUnit: "mm",
		height: 480,
		heightUnit: "mm",
		additionalComments: "27-inch IPS display for vibrant visuals.",
		additionalFields: {
			color: "White",
			storageType: "SSD",
			webcam: "HD pop-up webcam",
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
		model: "IdeaCentre 5",
		description: "Powerful desktop for multitasking and productivity.",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 6.8,
		weightUnit: "kg",
		length: 200,
		lengthUnit: "mm",
		width: 80,
		widthUnit: "mm",
		height: 350,
		heightUnit: "mm",
		additionalComments: "Fast and reliable performance.",
		additionalFields: {
			color: "Black",
			storageType: "HDD",
			ports: "USB 3.0, HDMI, Ethernet",
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
		model: "VivoPC X",
		description: "Compact gaming desktop with high-performance graphics.",
		price: 1299.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 4.2,
		weightUnit: "kg",
		length: 150,
		lengthUnit: "mm",
		width: 70,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments: "Ideal for gaming enthusiasts.",
		additionalFields: {
			color: "Red",
			graphicsCard: "NVIDIA GeForce GTX 1660 Ti",
			coolingSystem: "Liquid cooling",
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
		model: "Inspiron 5000",
		description: "Versatile desktop for home and office use.",
		price: 749.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 5.5,
		weightUnit: "kg",
		length: 180,
		lengthUnit: "mm",
		width: 75,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments: "Efficient and reliable performance.",
		additionalFields: {
			color: "Silver",
			ports: "USB 3.1, HDMI, VGA",
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
		brand: "HP",
		model: "Pavilion Gaming Desktop",
		description: "Powerful gaming desktop for immersive experiences.",
		price: 1199.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 8.2,
		weightUnit: "kg",
		length: 200,
		lengthUnit: "mm",
		width: 80,
		widthUnit: "mm",
		height: 350,
		heightUnit: "mm",
		additionalComments: "Ideal for gaming enthusiasts.",
		additionalFields: {
			color: "Black",
			graphicsCard: "NVIDIA GeForce RTX 3060",
			coolingSystem: "Air cooling",
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
		model: "Aspire Pro",
		description: "Business-oriented desktop for productivity.",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 7.8,
		weightUnit: "kg",
		length: 190,
		lengthUnit: "mm",
		width: 85,
		widthUnit: "mm",
		height: 320,
		heightUnit: "mm",
		additionalComments:
			"Designed for corporate use with advanced security features.",
		additionalFields: {
			color: "Black",
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
		brand: "Lenovo",
		model: "IdeaCentre 5",
		description: "Versatile desktop for home and entertainment.",
		price: 749.95,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 6.2,
		weightUnit: "kg",
		length: 200,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 300,
		heightUnit: "mm",
		additionalComments: "Suitable for family use with a sleek design.",
		additionalFields: {
			color: "Silver",
			webcam: "720p HD",
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

function returnDesktopComputerSchemas(
	desktopComputersArray: typeof DESKTOP_COMPUTERS_ARRAY,
) {
	return desktopComputersArray.map((desktopComputer, idx) => {
		const sku = uuidv4();

		// random case specs
		const { caseColor, caseSidePanel, caseType } =
			CASE_ARRAY[Math.floor(Math.random() * CASE_ARRAY.length)];

		// random cpu specs
		const {
			cpuCores,
			cpuFrequency,
			cpuL1Cache,
			cpuL1CacheUnit,
			cpuL2Cache,
			cpuL2CacheUnit,
			cpuL3Cache,
			cpuL3CacheUnit,
			cpuSocket,
			cpuWattage,
		} = CPUS_ARRAY[Math.floor(Math.random() * CPUS_ARRAY.length)];

		// random display specs
		const {
			displayAspectRatio,
			displayHorizontalResolution,
			displayPanelType,
			displayRefreshRate,
			displayResponseTime,
			displaySize,
			displayVerticalResolution,
		} = DISPLAYS_ARRAY[Math.floor(Math.random() * DISPLAYS_ARRAY.length)];

		// random gpu specs
		const {
			gpuBoostClock,
			gpuChipset,
			gpuCoreClock,
			gpuMemory,
			gpuMemoryUnit,
			gpuTdp,
		} = GPUS_ARRAY[Math.floor(Math.random() * GPUS_ARRAY.length)];

		// random keyboard specs
		const {
			keyboardBacklight,
			keyboardInterface,
			keyboardLayout,
			keyboardSwitch,
		} = KEYBOARDS_ARRAY[Math.floor(Math.random() * KEYBOARDS_ARRAY.length)];

		// random motherboard specs
		const {
			motherboardChipset,
			motherboardFormFactor,
			motherboardM2Slots,
			motherboardMemoryMax,
			motherboardMemoryMaxUnit,
			motherboardMemorySlots,
			motherboardMemoryType,
			motherboardPcie3Slots,
			motherboardPcie4Slots,
			motherboardPcie5Slots,
			motherboardSataPorts,
			motherboardSocket,
		} =
			MOTHERBOARDS_ARRAY[Math.floor(Math.random() * MOTHERBOARDS_ARRAY.length)];

		// random mouse specs
		const { mouseButtons, mouseColor, mouseDpi, mouseInterface, mouseSensor } =
			MOUSE_ARRAY[Math.floor(Math.random() * MOUSE_ARRAY.length)];

		// random psu specs
		const { psuEfficiency, psuFormFactor, psuModularity, psuWattage } =
			PSUS_ARRAY[Math.floor(Math.random() * PSUS_ARRAY.length)];

		// random ram specs
		const {
			ramColor,
			ramDataRate,
			ramModulesCapacity,
			ramModulesCapacityUnit,
			ramModulesQuantity,
			ramTiming,
			ramType,
			ramVoltage,
		} = RAMS_ARRAY[Math.floor(Math.random() * RAMS_ARRAY.length)];

		// random speaker specs
		const {
			speakerColor,
			speakerFrequencyResponse,
			speakerInterface,
			speakerTotalWattage,
			speakerType,
		} = SPEAKERS_ARRAY[Math.floor(Math.random() * SPEAKERS_ARRAY.length)];

		// random storage specs
		const {
			storageCache,
			storageCacheUnit,
			storageCapacity,
			storageCapacityUnit,
			storageFormFactor,
			storageInterface,
			storageType,
		} = STORAGE_ARRAY[Math.floor(Math.random() * STORAGE_ARRAY.length)];

		const desktopComputerSchema: DesktopComputerSchema = {
			...desktopComputer,
			sku,

			// random case specs
			caseColor,
			caseSidePanel,
			caseType,

			// random cpu specs
			cpuCores,
			cpuFrequency,
			cpuL1Cache,
			cpuL1CacheUnit,
			cpuL2Cache,
			cpuL2CacheUnit,
			cpuL3Cache,
			cpuL3CacheUnit,
			cpuSocket,
			cpuWattage,

			// random display specs
			displayAspectRatio,
			displayHorizontalResolution,
			displayPanelType,
			displayRefreshRate,
			displayResponseTime,
			displaySize,
			displayVerticalResolution,

			// random gpu specs
			gpuBoostClock,
			gpuChipset,
			gpuCoreClock,
			gpuMemory,
			gpuMemoryUnit,
			gpuTdp,

			// random keyboard specs
			keyboardBacklight,
			keyboardInterface,
			keyboardLayout,
			keyboardSwitch,

			// random motherboard specs
			motherboardChipset,
			motherboardFormFactor,
			motherboardM2Slots,
			motherboardMemoryMax,
			motherboardMemoryMaxUnit,
			motherboardMemorySlots,
			motherboardMemoryType,
			motherboardPcie3Slots,
			motherboardPcie4Slots,
			motherboardPcie5Slots,
			motherboardSataPorts,
			motherboardSocket,

			// random mouse specs
			mouseButtons,
			mouseColor,
			mouseDpi,
			mouseInterface,
			mouseSensor,

			// random psu specs
			psuEfficiency,
			psuFormFactor,
			psuModularity,
			psuWattage,

			// random ram specs
			ramColor,
			ramDataRate,
			ramModulesCapacity,
			ramModulesCapacityUnit,
			ramModulesQuantity,
			ramTiming,
			ramType,
			ramVoltage,

			// random speaker specs
			speakerColor,
			speakerFrequencyResponse: speakerFrequencyResponse.length
				? speakerFrequencyResponse
				: "20Hz - 20kHz",
			speakerInterface,
			speakerTotalWattage,
			speakerType,

			// random storage specs
			storageCache,
			storageCacheUnit,
			storageCapacity,
			storageCapacityUnit,
			storageFormFactor,
			storageInterface,
			storageType,
		};

		return desktopComputerSchema;
	});
}

const DESKTOP_COMPUTER_REVIEWS = [
	{
		productReview:
			"This desktop computer exceeded my expectations! The case design is sleek, and the CPU performance is outstanding.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The GPU in this computer delivers exceptional graphics for gaming. I'm impressed with the display quality and smooth gameplay.",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid build quality, and the motherboard supports future upgrades. The RAM and storage specifications are perfect for multitasking and fast data access.",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for the money! The keyboard and mouse included are of good quality. This desktop is a fantastic deal for both work and play.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The PSU is reliable, and the computer runs quietly. The case has ample space for cable management, making it easy to keep everything organized.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressive speed and responsiveness with the SSD storage. The speakers deliver clear audio. I'm extremely satisfied with this desktop computer.",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system, ensuring the CPU stays cool even during intense tasks. The GPU handles graphic-intensive applications flawlessly.",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The included mouse is ergonomic, providing a comfortable grip. The display is vibrant, and the overall performance is top-notch.",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The motherboard has plenty of USB ports, and the case design is both functional and aesthetically pleasing. A great purchase for any tech enthusiast.",
		productRating: "4.5",
		helpfulVotes: 11,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Excellent customer service! Had a minor issue, and the support team resolved it promptly. Highly recommend this desktop computer and the brand.",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The sleek design of the case caught my eye, and the powerful CPU inside delivers exceptional performance. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"I am impressed with the GPU's capability, providing a smooth gaming experience. The keyboard and mouse included are of high quality. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The motherboard's support for future upgrades is a big plus. The RAM and storage specifications ensure fast multitasking. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for the money! The included keyboard and mouse are ergonomic, making this desktop perfect for work and play. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The PSU is reliable, and the computer runs quietly. Ample storage space and efficient cooling. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Blazing fast with SSD storage! The speakers provide clear audio. Extremely satisfied with the performance. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system ensures optimal CPU performance. GPU handles graphics-intensive tasks flawlessly. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The included mouse is comfortable, and the display is vibrant. Overall, a great purchase. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Plenty of USB ports on the motherboard, and the case design is both functional and stylish. Highly recommend. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 13,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service! Resolved a minor issue promptly. Highly recommend both the desktop and the brand. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This desktop computer is a beast! The case design is futuristic, and the CPU handles heavy tasks with ease. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The GPU in this desktop is a gaming powerhouse. The keyboard and mouse provided are responsive and comfortable. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the motherboard's capabilities. The RAM and storage specs ensure quick multitasking. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for money! The included keyboard is mechanical, and the mouse has customizable buttons. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Reliable PSU and efficient cooling. The storage space is ample, and the case allows for easy cable management. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Blazing fast with SSD storage! The speakers deliver immersive audio. Extremely satisfied with the overall performance. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system ensures optimal CPU performance. The GPU handles graphics-intensive tasks seamlessly. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The included mouse is ergonomic, and the display is vibrant. A great purchase for work and play. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Plenty of USB ports on the motherboard, and the case design is both functional and stylish. Highly recommend. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 13,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service! Resolved a minor issue promptly. Highly recommend both the desktop and the brand. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This desktop is a powerhouse! The case design is modern, and the CPU delivers excellent performance. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Gaming on this desktop is a dream! The GPU handles high-end graphics effortlessly. The keyboard and mouse are a nice bonus. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The motherboard supports future upgrades seamlessly. The RAM and storage specifications ensure smooth multitasking. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Incredible value for the price! The included mechanical keyboard and customizable mouse enhance the overall experience. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Reliable PSU and efficient cooling keep the system running smoothly. Ample storage and easy cable management in the case. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Blazing fast with SSD storage! The speakers produce rich sound. Extremely satisfied with the overall performance. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system ensures optimal CPU performance. The GPU handles graphics-intensive tasks seamlessly. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The included ergonomic mouse and vibrant display make this desktop a great purchase for both work and play. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Plenty of USB ports on the motherboard, and the case design is both functional and stylish. Highly recommend. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 13,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service! Resolved a minor issue promptly. Highly recommend both the desktop and the brand. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolutely impressed with this desktop! The case design is sleek, and the CPU performance is top-notch. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The GPU in this computer is a beast! Gaming is a joy, and the included keyboard and mouse are great additions. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Upgradable motherboard and impressive RAM and storage specs. Multitasking is a breeze. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for money! The mechanical keyboard and customizable mouse are a nice touch. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 15,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Reliable PSU and efficient cooling. Ample storage space and tidy cable management. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Blazing fast with SSD storage! The speakers deliver immersive sound. Extremely satisfied. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system for optimal CPU performance. GPU handles graphics seamlessly. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Ergonomic mouse and vibrant display make this desktop a great purchase. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Stylish case design with plenty of USB ports on the motherboard. Highly recommend. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 13,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service! Resolved an issue promptly. Highly recommend. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"This desktop is a game-changer! The case design is modern, and the CPU's speed is impressive. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The GPU in this computer is a beast! It handles graphic-intensive tasks effortlessly. The keyboard and mouse combo is a nice touch. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The motherboard's upgradability is a standout feature. The RAM and storage specifications ensure smooth multitasking. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Incredible value for the price! The mechanical keyboard and customizable mouse enhance the overall experience. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Reliable PSU and efficient cooling. Ample storage space and easy cable management in the case. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 9,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Blazing fast with SSD storage! The speakers deliver immersive sound. Extremely satisfied with the overall performance. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient cooling system ensures optimal CPU performance. The GPU handles graphics-intensive tasks seamlessly. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"The included ergonomic mouse and vibrant display make this desktop a great purchase. Rated 4 stars!",
		productRating: "4",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Stylish case design with plenty of USB ports on the motherboard. Highly recommend. Rated 4.5 stars!",
		productRating: "4.5",
		helpfulVotes: 13,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service! Resolved an issue promptly. Highly recommend. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
];

export {
	DESKTOP_COMPUTER_REVIEWS,
	DESKTOP_COMPUTERS_ARRAY,
	returnDesktopComputerSchemas,
};
