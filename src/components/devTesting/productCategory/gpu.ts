/**
 * type GpuSchema  = {
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

gpuChipset: /^[a-zA-Z0-9\s.,'()-]{2,30}$/;
gpuMemory: /^(?!^$|^0*$)[0-9]{1,2}$/;
gpuMemoryUnit: "KB" | "MB" | "GB" | "TB";
gpuCoreClock: /^(?!^$|^0*$)[0-9]{1,4}$/;
gpuBoostClock: /^(?!^$|^0*$)[0-9]{1,4}$/;
gpuTdp: /^(?!^$|^0*$)[0-9]{1,4}$/;

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */

import { v4 as uuidv4 } from "uuid";

import {
	GpuSchema,
	GpuSpecifications,
	ProductCategorySpecifications,
} from "../../product/types";

const GPUS_ARRAY: Omit<
	ProductCategorySpecifications & GpuSpecifications,
	"sku"
>[] = [
	{
		brand: "NVIDIA",
		model: "GeForce RTX 3080",
		description: "High-performance gaming GPU with ray tracing capabilities",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 1.2,
		weightUnit: "kg",
		length: 280,
		lengthUnit: "mm",
		width: 111,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Ideal for gaming enthusiasts and content creators.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 10,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1710,
		gpuBoostClock: 1740,
		gpuTdp: 320,
		additionalFields: {},
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
		brand: "AMD",
		model: "Radeon RX 6700 XT",
		description: "Mid-range gaming GPU with advanced graphics features",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 1.5,
		weightUnit: "kg",
		length: 275,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Great performance at a competitive price point.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 12,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2424,
		gpuBoostClock: 2581,
		gpuTdp: 230,
		additionalFields: {},
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
		brand: "EVGA",
		model: "GeForce GTX 1660 Super",
		description: "Budget-friendly GPU for mainstream gaming",
		price: 249.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 50,
		weight: 0.9,
		weightUnit: "kg",
		length: 204,
		lengthUnit: "mm",
		width: 111,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Balanced performance for a smooth gaming experience.",
		gpuChipset: "NVIDIA Turing",
		gpuMemory: 6,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1530,
		gpuBoostClock: 1785,
		gpuTdp: 125,
		additionalFields: {},
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
		brand: "ASUS",
		model: "ROG Strix RX 6800 XT",
		description: "High-end gaming GPU with RGB lighting and advanced cooling",
		price: 899.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 2.5,
		weightUnit: "kg",
		length: 325,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments:
			"Premium design for enthusiasts seeking top-tier performance.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1822,
		gpuBoostClock: 2365,
		gpuTdp: 300,
		additionalFields: {},
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
		brand: "MSI",
		model: "GeForce GTX 1650",
		description: "Entry-level GPU for casual gaming",
		price: 179.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 0.8,
		weightUnit: "kg",
		length: 200,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Affordable option for budget-conscious gamers.",
		gpuChipset: "NVIDIA Turing",
		gpuMemory: 4,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1485,
		gpuBoostClock: 1665,
		gpuTdp: 75,
		additionalFields: {
			videoOutputs: "HDMI, DisplayPort",
			coolingSolution: "Single Fan",
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
		brand: "Gigabyte",
		model: "AORUS GeForce RTX 3080 XTREME",
		description: "High-end GPU with extreme performance and RGB lighting",
		price: 1299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 2.2,
		weightUnit: "kg",
		length: 320,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments:
			"Premium features for enthusiasts seeking top-tier gaming.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 10,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1905,
		gpuBoostClock: 1935,
		gpuTdp: 370,
		additionalFields: {
			lightingEffects: "RGB Fusion 2.0",
			powerConnectors: "2x 8-pin",
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
		brand: "ZOTAC",
		model: "GAMING GeForce RTX 3060",
		description: "Mid-range GPU for gaming and content creation",
		price: 349.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 40,
		weight: 1.5,
		weightUnit: "kg",
		length: 280,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Balanced performance for a variety of applications.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 12,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1320,
		gpuBoostClock: 1780,
		gpuTdp: 170,
		additionalFields: {
			ports: "3x DisplayPort, 1x HDMI",
			formFactor: "Dual-Slot",
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
		brand: "PowerColor",
		model: "Red Devil Radeon RX 6700 XT",
		description: "Premium AMD GPU with advanced cooling and performance",
		price: 579.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 2.8,
		weightUnit: "kg",
		length: 310,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Optimized for gaming and demanding workloads.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2321,
		gpuBoostClock: 2622,
		gpuTdp: 250,
		additionalFields: {
			coolingType: "Triple-Fan",
			backplate: "Yes",
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
		brand: "ASRock",
		model: "Phantom Gaming X Radeon RX 6900 XT",
		description: "High-end gaming GPU with advanced features",
		price: 1299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 2.7,
		weightUnit: "kg",
		length: 310,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments:
			"Extreme gaming performance with cutting-edge technology.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2015,
		gpuBoostClock: 2360,
		gpuTdp: 300,
		additionalFields: {
			lighting: "RGB Fusion",
			coolingSystem: "Triple-Fan",
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
		brand: "Palit",
		model: "GeForce RTX 3070 GamingPro OC",
		description: "Mid-range GPU with overclocking for gaming enthusiasts",
		price: 649.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 1.8,
		weightUnit: "kg",
		length: 285,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 45,
		heightUnit: "mm",
		additionalComments:
			"Optimized for high-performance gaming and smooth visuals.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 8,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1500,
		gpuBoostClock: 1725,
		gpuTdp: 220,
		additionalFields: {
			connectors: "3x DisplayPort, 1x HDMI",
			powerRequirement: "650W PSU",
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
		brand: "XFX",
		model: "Speedster MERC319 Radeon RX 6800 XT",
		description: "High-performance AMD GPU with a sleek design",
		price: 849.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 12,
		weight: 2.3,
		weightUnit: "kg",
		length: 320,
		lengthUnit: "mm",
		width: 135,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Designed for gaming and content creation enthusiasts.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2015,
		gpuBoostClock: 2360,
		gpuTdp: 300,
		additionalFields: {
			backplate: "Yes",
			warranty: "3 years",
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
		brand: "ZOTAC",
		model: "GAMING GeForce GTX 1660 Ti",
		description: "Budget-friendly GPU for mainstream gaming",
		price: 279.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 1.2,
		weightUnit: "kg",
		length: 210,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Great value for performance in popular gaming titles.",
		gpuChipset: "NVIDIA Turing",
		gpuMemory: 6,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1770,
		gpuBoostClock: 1845,
		gpuTdp: 120,
		additionalFields: {
			formFactor: "Dual-Slot",
			VRReady: "Yes",
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
		brand: "Sapphire",
		model: "NITRO+ Radeon RX 6700 XT",
		description: "High-performance GPU for gaming and content creation",
		price: 579.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 2.0,
		weightUnit: "kg",
		length: 290,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 45,
		heightUnit: "mm",
		additionalComments: "Top-tier performance with a sleek design.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 12,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2424,
		gpuBoostClock: 2581,
		gpuTdp: 230,
		additionalFields: {
			cooling: "Triple-Fan",
			ports: "2x HDMI, 2x DisplayPort",
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
		brand: "GAINWARD",
		model: "GeForce RTX 3060 Phantom GS",
		description: "Mid-range GPU with efficient cooling and performance",
		price: 349.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 1.5,
		weightUnit: "kg",
		length: 280,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Great value for smooth gaming experiences.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 8,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1320,
		gpuBoostClock: 1780,
		gpuTdp: 170,
		additionalFields: {
			connectors: "3x DisplayPort, 1x HDMI",
			powerRequirement: "500W PSU",
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
		brand: "GIGABYTE",
		model: "AORUS GeForce RTX 3090 XTREME",
		description: "Extreme gaming GPU with massive video memory",
		price: 1599.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 3.5,
		weightUnit: "kg",
		length: 320,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 60,
		heightUnit: "mm",
		additionalComments:
			"Unmatched performance for gaming enthusiasts and professionals.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 24,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1785,
		gpuBoostClock: 1875,
		gpuTdp: 350,
		additionalFields: {
			lighting: "RGB Fusion 2.0",
			powerConnectors: "3x 8-pin",
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
		brand: "ASUS",
		model: "ROG Strix Radeon RX 6800",
		description: "High-end AMD GPU with advanced cooling and RGB lighting",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 2.2,
		weightUnit: "kg",
		length: 310,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Premium design for immersive gaming experiences.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 2015,
		gpuBoostClock: 2360,
		gpuTdp: 300,
		additionalFields: {
			backplate: "Yes",
			VRReady: "Yes",
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
		brand: "NVIDIA",
		model: "GeForce GTX 1660 Super",
		description: "Mid-range GPU with excellent performance for gaming",
		price: 289.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 1.5,
		weightUnit: "kg",
		length: 230,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Ideal for 1080p gaming with a compact design.",
		gpuChipset: "NVIDIA Turing",
		gpuMemory: 6,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1530,
		gpuBoostClock: 1785,
		gpuTdp: 125,
		additionalFields: {
			cooling: "Dual-Fan",
			ports: "1x HDMI, 3x DisplayPort",
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
		brand: "MSI",
		model: "RADEON RX 5700 XT GAMING X",
		description: "High-performance AMD GPU with advanced cooling",
		price: 399.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 18,
		weight: 2.0,
		weightUnit: "kg",
		length: 297,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Perfect for 1440p gaming with a sleek design.",
		gpuChipset: "AMD RDNA",
		gpuMemory: 8,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1605,
		gpuBoostClock: 1905,
		gpuTdp: 225,
		additionalFields: {
			lighting: "Mystic Light RGB",
			powerConnectors: "1x 8-pin, 1x 6-pin",
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
		brand: "EVGA",
		model: "GeForce RTX 3080 FTW3 ULTRA GAMING",
		description: "High-end GPU for enthusiasts with exceptional power",
		price: 849.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 12,
		weight: 3.2,
		weightUnit: "kg",
		length: 300,
		lengthUnit: "mm",
		width: 138,
		widthUnit: "mm",
		height: 58,
		heightUnit: "mm",
		additionalComments: "Unleash the power of ray tracing and AI.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 10,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1710,
		gpuBoostClock: 1905,
		gpuTdp: 320,
		additionalFields: {
			VRReady: "Yes",
			warranty: "5 years",
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
		brand: "ASRock",
		model: "Radeon RX 5500 XT Challenger D 4G OC",
		description: "Budget-friendly GPU for entry-level gaming",
		price: 179.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 1.0,
		weightUnit: "kg",
		length: 210,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Great value for casual gaming and multimedia tasks.",
		gpuChipset: "AMD RDNA",
		gpuMemory: 4,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1717,
		gpuBoostClock: 1845,
		gpuTdp: 130,
		additionalFields: {
			connectors: "2x HDMI, 2x DisplayPort",
			powerRequirement: "450W PSU",
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
		brand: "NVIDIA",
		model: "GeForce RTX 3060",
		description: "High-performance GPU for gaming and content creation",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 1.2,
		weightUnit: "kg",
		length: 250,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Ideal for 1440p gaming and video editing.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 12,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1320,
		gpuBoostClock: 1777,
		gpuTdp: 170,
		additionalFields: {
			cooling: "Dual-Fan",
			ports: "1x HDMI, 3x DisplayPort",
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
		brand: "AMD",
		model: "Radeon RX 6800 XT",
		description: "Enthusiast-level GPU for high-end gaming and VR experiences",
		price: 649.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 1.5,
		weightUnit: "kg",
		length: 280,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments:
			"Unleash the power of ray tracing and high refresh rates.",
		gpuChipset: "AMD RDNA 2",
		gpuMemory: 16,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1820,
		gpuBoostClock: 2250,
		gpuTdp: 300,
		additionalFields: {
			lighting: "RGB Fusion",
			powerConnectors: "2x 8-pin",
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
		brand: "ASUS",
		model: "ROG Strix GeForce RTX 3090",
		description:
			"Extreme-performance GPU for 4K gaming and professional workloads",
		price: 1499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 2.5,
		weightUnit: "kg",
		length: 320,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 60,
		heightUnit: "mm",
		additionalComments:
			"Built for the most demanding tasks and gaming experiences.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 24,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1695,
		gpuBoostClock: 1860,
		gpuTdp: 350,
		additionalFields: {
			VRReady: "Yes",
			warranty: "3 years",
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
		brand: "NVIDIA",
		model: "GeForce GTX 1660",
		description: "Mid-range GPU for budget gaming builds",
		price: 249.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 800,
		weightUnit: "g",
		length: 210,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Ideal for 1080p gaming at a budget-friendly price.",
		gpuChipset: "Turing",
		gpuMemory: 6,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1530,
		gpuBoostClock: 1785,
		gpuTdp: 120,
		additionalFields: {
			powerConnectors: "1x 8-pin",
			outputPorts: "1x HDMI, 1x DisplayPort, 1x DVI",
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
		brand: "AMD",
		model: "Radeon RX 5500 XT",
		description: "Entry-level GPU for casual gaming and multimedia tasks",
		price: 179.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 700,
		weightUnit: "g",
		length: 190,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Efficient GPU for small form factor builds.",
		gpuChipset: "RDNA",
		gpuMemory: 4,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1607,
		gpuBoostClock: 1845,
		gpuTdp: 130,
		additionalFields: {
			cooling: "Single-Fan",
			DirectXSupport: "12",
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
		brand: "ASUS",
		model: "ROG Strix Radeon RX 5700 XT",
		description: "High-performance GPU for 1440p gaming and content creation",
		price: 399.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 950,
		weightUnit: "g",
		length: 280,
		lengthUnit: "mm",
		width: 130,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Experience smooth gaming with ray tracing support.",
		gpuChipset: "RDNA",
		gpuMemory: 8,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1605,
		gpuBoostClock: 1905,
		gpuTdp: 225,
		additionalFields: {
			RGBLighting: "Yes",
			FreeSyncSupport: "Yes",
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
		brand: "Gigabyte",
		model: "AORUS GeForce RTX 3080",
		description: "Enthusiast GPU for 4K gaming and real-time ray tracing",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 1200,
		weightUnit: "g",
		length: 320,
		lengthUnit: "mm",
		width: 140,
		widthUnit: "mm",
		height: 60,
		heightUnit: "mm",
		additionalComments: "Unleash the power of DLSS and AI-enhanced graphics.",
		gpuChipset: "NVIDIA Ampere",
		gpuMemory: 10,
		gpuMemoryUnit: "GB",
		gpuCoreClock: 1440,
		gpuBoostClock: 1710,
		gpuTdp: 320,
		additionalFields: {
			RayTracingCores: "Yes",
			VRReady: "Yes",
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

function returnGpuSchemas(gpusArray: typeof GPUS_ARRAY) {
	return gpusArray.map((gpu) => {
		const gpuSchema: GpuSchema = {
			...gpu,
			sku: uuidv4(),
		};

		return gpuSchema;
	});
}

const GPU_REVIEWS = [
	{
		productReview:
			"Excellent performance and value for money! Can handle the latest games with ease.",
		productRating: "5",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average GPU, does the job but not outstanding. Decent for its price.",
		productRating: "3.5",
		helpfulVotes: 5,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Highly disappointed with the performance. Not as advertised. Would not recommend.",
		productRating: "2",
		helpfulVotes: 1,
		unhelpfulVotes: 8,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great GPU for gaming enthusiasts! Fast delivery and well-packaged.",
		productRating: "4.5",
		helpfulVotes: 8,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid mid-range GPU. Runs quietly and handles multitasking effectively.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Easy installation and setup. Works flawlessly with my gaming rig.",
		productRating: "4.5",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not the best for high-end gaming. Struggles with AAA titles at max settings.",
		productRating: "3",
		helpfulVotes: 3,
		unhelpfulVotes: 5,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressive performance but a bit overpriced. Happy with the purchase overall.",
		productRating: "4",
		helpfulVotes: 6,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding GPU! Exceeded my expectations in terms of speed and graphics quality.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Poor customer service. Had issues with the GPU and the support was unhelpful.",
		productRating: "1.5",
		helpfulVotes: 0,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Fantastic GPU! I've never experienced such smooth gameplay. Highly recommended!",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent performance for the price. Can handle most games well. Satisfied overall.",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointing GPU. Constant crashes and poor customer support. Avoid this product.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid mid-range GPU. Runs quietly, and the graphics are impressive for the cost.",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Easy setup, excellent performance. The best GPU I've owned so far!",
		productRating: "5",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for the money. Handles gaming and multitasking well.",
		productRating: "3.5",
		helpfulVotes: 5,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not suitable for high-end gaming. Struggles with graphics-intensive titles.",
		productRating: "2.5",
		helpfulVotes: 3,
		unhelpfulVotes: 6,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the GPU's performance. Quick delivery and hassle-free installation.",
		productRating: "4.5",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding customer service. Resolved my GPU issue promptly. Happy with the purchase.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Below-average GPU. Overheats quickly, and the graphics quality is subpar.",
		productRating: "1.5",
		helpfulVotes: 1,
		unhelpfulVotes: 9,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolutely stellar GPU! Unmatched performance and reliability. A solid 5 out of 5!",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good GPU for the price. Handles most games well. I'd rate it a solid 4.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointing experience. Constant crashes and poor support. Rated 2 for frustration.",
		productRating: "2",
		helpfulVotes: 1,
		unhelpfulVotes: 15,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressive mid-range GPU. Runs quietly and graphics are above average. A strong 4.5!",
		productRating: "4.5",
		helpfulVotes: 14,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceeded expectations! Quick setup, excellent performance. Easily a 5-star GPU.",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Bang for the buck! Handles gaming and multitasking without breaking a sweat. 4 stars!",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not for serious gamers. Struggles with high-end titles. A 2.5 from my experience.",
		productRating: "2.5",
		helpfulVotes: 4,
		unhelpfulVotes: 6,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Highly satisfied! Impressive performance, quick delivery, and hassle-free installation. 4.5!",
		productRating: "4.5",
		helpfulVotes: 16,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceptional customer service! Resolved my GPU issue promptly. A solid 4 stars.",
		productRating: "4",
		helpfulVotes: 13,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Avoid at all costs. Overheats, poor graphics. Regretful purchase. A generous 1.5 rating.",
		productRating: "1.5",
		helpfulVotes: 0,
		unhelpfulVotes: 17,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Outstanding GPU! Exceeded my expectations in every aspect. A solid 5-star rating.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent performance for the price. Handles most games well. Rated 4 stars.",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the GPU. Constant crashes and poor customer support. Rated 2 stars.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid mid-range GPU. Runs quietly, and the graphics are impressive. A 4.5 rating.",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Easy setup and impressive performance. The best GPU I've owned so far. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for the money. Handles gaming and multitasking well. A 3.5 rating.",
		productRating: "3.5",
		helpfulVotes: 5,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not suitable for high-end gaming. Struggles with graphics-intensive titles. A 2.5 rating.",
		productRating: "2.5",
		helpfulVotes: 3,
		unhelpfulVotes: 5,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the GPU's performance. Quick delivery and hassle-free installation. 4.5 stars.",
		productRating: "4.5",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceptional customer service! Resolved my GPU issue promptly. A solid 4-star rating.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Below-average GPU. Overheats quickly, and the graphics quality is subpar. A 1.5 rating.",
		productRating: "1.5",
		helpfulVotes: 1,
		unhelpfulVotes: 9,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolutely phenomenal GPU! Blew my mind with its performance. A solid 5-star rating.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for the money. Handles all my games smoothly. Rated 4 stars.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointing purchase. Constant crashes and lackluster support. Rated 2 stars.",
		productRating: "2",
		helpfulVotes: 1,
		unhelpfulVotes: 12,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid mid-range GPU. Impressed with its quiet operation and graphics quality. A 4.5 rating.",
		productRating: "4.5",
		helpfulVotes: 11,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceeded expectations! Easy setup, and the performance is outstanding. Rated 5 stars!",
		productRating: "5",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good GPU for casual gaming. Handles multitasking well. A 3.5 rating.",
		productRating: "3.5",
		helpfulVotes: 5,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Not for high-end gaming. Struggles with graphics-intensive titles. A 2.5 rating.",
		productRating: "2.5",
		helpfulVotes: 3,
		unhelpfulVotes: 5,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressed with the GPU's performance. Quick delivery and hassle-free installation. 4.5 stars.",
		productRating: "4.5",
		helpfulVotes: 9,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceptional customer service! Resolved my GPU issue promptly. A solid 4-star rating.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Below-average GPU. Overheats quickly, and the graphics quality is subpar. A 1.5 rating.",
		productRating: "1.5",
		helpfulVotes: 1,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
];

export { GPU_REVIEWS, GPUS_ARRAY, returnGpuSchemas };
