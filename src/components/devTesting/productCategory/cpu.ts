/**
 * type CpuSchema  = {
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

cpuSocket: /^[a-zA-Z0-9\s.,'()-]{2,30}$/i;
cpuFrequency: /^(?!^$|^0*$)[0-9]{1,2}(.[0-9]{1,2})?$/;
cpuCores: /^(?!^$|^0*$)[0-9]{1,2}$/;
cpuL1Cache: /^(?!^$|^0*$)[0-9]{1,4}$/;
cpuL1CacheUnit: "KB" | "MB" | "GB" | "TB";
cpuL2Cache: /^(?!^$|^0*$)[0-9]{1,4}$/;
cpuL2CacheUnit: "KB" | "MB" | "GB" | "TB";
cpuL3Cache: /^(?!^$|^0*$)[0-9]{1,4}$/;
cpuL3CacheUnit: "KB" | "MB" | "GB" | "TB";
cpuWattage: /^(?!^$|^0*$)[0-9]{1,4}$/;

additionalFields: {
    [key: string]: string;
  };
reviewsIds:[];
uploadedFilesIds:[];
};
 */

import { v4 as uuidv4 } from "uuid";

import {
	CpuSchema,
	CpuSpecifications,
	ProductCategorySpecifications,
} from "../../product/types";

const CPUS_ARRAY: Omit<
	ProductCategorySpecifications & CpuSpecifications,
	"sku"
>[] = [
	{
		brand: "Intel",
		model: "Core i9-9900K",
		description: "High-performance processor for gaming and multitasking.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 50,
		weight: 0.75,
		weightUnit: "kg",
		length: 100,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 50,
		heightUnit: "mm",
		additionalComments: "Comes with a cooling fan.",
		cpuSocket: "LGA 1151",
		cpuFrequency: 3.6,
		cpuCores: 8,
		cpuL1Cache: 512,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 4096,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16384,
		cpuL3CacheUnit: "KB",
		cpuWattage: 95,
		additionalFields: {
			warranty: "2 years",
			overclocking: "Supported",
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
		model: "Ryzen 5 5600X",
		description: "Mid-range processor with 6 cores and 12 threads.",
		price: 299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 30,
		weight: 0.5,
		weightUnit: "kg",
		length: 80,
		lengthUnit: "mm",
		width: 80,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Great for gaming and multitasking.",
		cpuSocket: "AM4",
		cpuFrequency: 3.7,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 3072,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16384,
		cpuL3CacheUnit: "KB",
		cpuWattage: 65,
		additionalFields: {
			warranty: "1 year",
			integratedGraphics: "No",
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
		brand: "Intel",
		model: "Core i7-10700K",
		description: "High-performance processor for gaming and content creation.",
		price: 399.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 25,
		weight: 0.8,
		weightUnit: "kg",
		length: 120,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 60,
		heightUnit: "mm",
		additionalComments: "Overclocking capabilities for enthusiasts.",
		cpuSocket: "LGA 1200",
		cpuFrequency: 3.8,
		cpuCores: 8,
		cpuL1Cache: 512,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 4096,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16384,
		cpuL3CacheUnit: "KB",
		cpuWattage: 125,
		additionalFields: {
			warranty: "3 years",
			hyperThreading: "Yes",
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
		model: "Ryzen 9 5950X",
		description: "High-end processor for gaming and professional workloads.",
		price: 699.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 1.2,
		weightUnit: "kg",
		length: 150,
		lengthUnit: "mm",
		width: 150,
		widthUnit: "mm",
		height: 70,
		heightUnit: "mm",
		additionalComments: "Ideal for content creators and gamers.",
		cpuSocket: "AM4",
		cpuFrequency: 4.9,
		cpuCores: 16,
		cpuL1Cache: 1024,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 8192,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 65536,
		cpuL3CacheUnit: "KB",
		cpuWattage: 105,
		additionalFields: {
			warranty: "5 years",
			multitasking: "Optimized",
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
		brand: "Intel",
		model: "Core i9-10900K",
		description: "High-performance processor for gaming and multitasking.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 0.1,
		weightUnit: "kg",
		length: 100,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Unlocked for overclocking enthusiasts.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.7,
		cpuCores: 10,
		cpuL1Cache: 640,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 2560,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 20,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			architecture: "Comet Lake",
			integratedGraphics: "UHD Graphics 630",
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
		model: "Ryzen 5 3600",
		description:
			"Mid-range processor for excellent price-to-performance ratio.",
		price: 199.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.08,
		weightUnit: "kg",
		length: 90,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Perfect for gaming and content creation.",
		cpuSocket: "AM4",
		cpuFrequency: 3.6,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 3072,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 32,
		cpuL3CacheUnit: "MB",
		cpuWattage: 65,
		additionalFields: {
			architecture: "Zen 2",
			multithreading: "Yes",
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
		model: "Ryzen 9 5950X",
		description: "Flagship processor for extreme performance and multitasking.",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 5,
		weight: 0.12,
		weightUnit: "kg",
		length: 110,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments:
			"Ideal for professional workloads and gaming enthusiasts.",
		cpuSocket: "AM4",
		cpuFrequency: 3.4,
		cpuCores: 16,
		cpuL1Cache: 1024,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 8192,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 64,
		cpuL3CacheUnit: "MB",
		cpuWattage: 105,
		additionalFields: {
			architecture: "Zen 3",
			multithreading: "Yes",
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
		model: "Ryzen 7 5800X",
		description: "High-performance CPU for gaming and content creation.",
		price: 449.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.1,
		weightUnit: "kg",
		length: 100,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Ideal for multitasking and high-end applications.",
		cpuSocket: "AM4",
		cpuFrequency: 3.8,
		cpuCores: 8,
		cpuL1Cache: 512,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 4096,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 32,
		cpuL3CacheUnit: "MB",
		cpuWattage: 105,
		additionalFields: {
			architecture: "Zen 3",
			multithreading: "Yes",
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
		brand: "Intel",
		model: "Core i5-11600K",
		description: "Mid-range CPU with strong single-core performance.",
		price: 299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.09,
		weightUnit: "kg",
		length: 95,
		lengthUnit: "mm",
		width: 95,
		widthUnit: "mm",
		height: 25,
		heightUnit: "mm",
		additionalComments: "Great for gaming and everyday tasks.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.9,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 3072,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 12,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			architecture: "Rocket Lake",
			integratedGraphics: "UHD Graphics 730",
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
		model: "Threadripper 3990X",
		description: "Extreme-performance CPU for professional workloads.",
		price: 3999.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 5,
		weight: 0.2,
		weightUnit: "kg",
		length: 120,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Designed for heavy rendering and computation tasks.",
		cpuSocket: "sTRX4",
		cpuFrequency: 2.9,
		cpuCores: 64,
		cpuL1Cache: 4096,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 32768,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 256,
		cpuL3CacheUnit: "MB",
		cpuWattage: 280,
		additionalFields: {
			architecture: "Zen 2",
			multithreading: "Yes",
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
		brand: "Intel",
		model: "Core i7-10700K",
		description: "High-performance CPU for gaming and multitasking.",
		price: 399.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.08,
		weightUnit: "kg",
		length: 95,
		lengthUnit: "mm",
		width: 95,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Unlocked for overclocking enthusiasts.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.8,
		cpuCores: 8,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 8192,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			hyperThreading: "Yes",
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
		model: "Ryzen 5 5600X",
		description: "Mid-range CPU for smooth gaming and productivity.",
		price: 279.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.07,
		weightUnit: "kg",
		length: 85,
		lengthUnit: "mm",
		width: 85,
		widthUnit: "mm",
		height: 25,
		heightUnit: "mm",
		additionalComments: "Excellent price-to-performance ratio.",
		cpuSocket: "AM4",
		cpuFrequency: 3.7,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 3072,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 32,
		cpuL3CacheUnit: "MB",
		cpuWattage: 65,
		additionalFields: {
			architecture: "Zen 3",
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
		brand: "Intel",
		model: "Xeon E-2278G",
		description: "Server-grade CPU for professional workloads.",
		price: 799.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 0.1,
		weightUnit: "kg",
		length: 110,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Designed for stability and reliability.",
		cpuSocket: "LGA1151",
		cpuFrequency: 3.4,
		cpuCores: 8,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 8192,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16,
		cpuL3CacheUnit: "MB",
		cpuWattage: 80,
		additionalFields: {
			eccSupport: "Yes",
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
		model: "Ryzen 9 5900X",
		description: "High-end CPU for gaming and content creation.",
		price: 549.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 0.1,
		weightUnit: "kg",
		length: 100,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Boost clock up to 4.8 GHz for maximum performance.",
		cpuSocket: "AM4",
		cpuFrequency: 3.7,
		cpuCores: 12,
		cpuL1Cache: 768,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 6144,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 64,
		cpuL3CacheUnit: "MB",
		cpuWattage: 105,
		additionalFields: {
			multitaskingSupport: "Yes",
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
		brand: "Intel",
		model: "Core i5-11600K",
		description: "Mid-range CPU for gaming and productivity.",
		price: 299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.08,
		weightUnit: "kg",
		length: 95,
		lengthUnit: "mm",
		width: 95,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Unlocked for overclocking enthusiasts.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.9,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 6144,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 12,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			integratedGraphics: "Yes",
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
		model: "Ryzen 3 3300X",
		description: "Budget-friendly CPU for entry-level gaming.",
		price: 129.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.05,
		weightUnit: "kg",
		length: 85,
		lengthUnit: "mm",
		width: 85,
		widthUnit: "mm",
		height: 25,
		heightUnit: "mm",
		additionalComments: "Quad-core processor with a base clock of 3.8 GHz.",
		cpuSocket: "AM4",
		cpuFrequency: 3.8,
		cpuCores: 4,
		cpuL1Cache: 256,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 2048,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16,
		cpuL3CacheUnit: "MB",
		cpuWattage: 65,
		additionalFields: {
			lowPowerConsumption: "Yes",
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
		brand: "Intel",
		model: "Core i9-11900K",
		description: "High-performance CPU for gaming and multitasking.",
		price: 599.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 8,
		weight: 0.12,
		weightUnit: "kg",
		length: 110,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Unlocked for overclocking enthusiasts.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.5,
		cpuCores: 8,
		cpuL1Cache: 512,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 8192,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			hyperThreading: "Yes",
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
		model: "Ryzen 5 5600X",
		description: "Mid-range CPU for gaming and content creation.",
		price: 299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 12,
		weight: 0.1,
		weightUnit: "kg",
		length: 105,
		lengthUnit: "mm",
		width: 105,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Six cores and twelve threads for optimal performance.",
		cpuSocket: "AM4",
		cpuFrequency: 3.7,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 6144,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 32,
		cpuL3CacheUnit: "MB",
		cpuWattage: 65,
		additionalFields: {
			PCIeGen4Support: "Yes",
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
		brand: "Intel",
		model: "Pentium Gold G6400",
		description: "Budget-friendly CPU for basic computing tasks.",
		price: 79.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.08,
		weightUnit: "kg",
		length: 90,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 25,
		heightUnit: "mm",
		additionalComments: "Dual-core processor for entry-level use.",
		cpuSocket: "LGA1200",
		cpuFrequency: 4.0,
		cpuCores: 2,
		cpuL1Cache: 128,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 512,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 4,
		cpuL3CacheUnit: "MB",
		cpuWattage: 54,
		additionalFields: {
			integratedGraphics: "Yes",
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
		model: "Ryzen 9 5900X",
		description: "High-performance CPU for gaming and content creation.",
		price: 649.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 10,
		weight: 0.15,
		weightUnit: "kg",
		length: 120,
		lengthUnit: "mm",
		width: 120,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments:
			"Twelve cores and twenty-four threads for multitasking.",
		cpuSocket: "AM4",
		cpuFrequency: 3.7,
		cpuCores: 12,
		cpuL1Cache: 768,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 6144,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 64,
		cpuL3CacheUnit: "MB",
		cpuWattage: 105,
		additionalFields: {
			architecture: "Zen 3",
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
		brand: "Intel",
		model: "Core i5-11600K",
		description: "Mid-range CPU for gaming and productivity tasks.",
		price: 299.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.1,
		weightUnit: "kg",
		length: 110,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Six cores and twelve threads for optimal performance.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.9,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 6144,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 12,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			overclockingSupport: "Yes",
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
		model: "Athlon 3000G",
		description: "Budget-friendly CPU for basic computing tasks.",
		price: 59.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.08,
		weightUnit: "kg",
		length: 90,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Dual-core processor for entry-level use.",
		cpuSocket: "AM4",
		cpuFrequency: 3.5,
		cpuCores: 2,
		cpuL1Cache: 128,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 512,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 4,
		cpuL3CacheUnit: "MB",
		cpuWattage: 35,
		additionalFields: {
			integratedGraphics: "Yes",
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
		brand: "Intel",
		model: "Core i7-11700K",
		description: "High-performance CPU for gaming and multitasking.",
		price: 499.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 8,
		weight: 0.12,
		weightUnit: "kg",
		length: 110,
		lengthUnit: "mm",
		width: 110,
		widthUnit: "mm",
		height: 40,
		heightUnit: "mm",
		additionalComments: "Eight cores and sixteen threads for power users.",
		cpuSocket: "LGA1200",
		cpuFrequency: 3.6,
		cpuCores: 8,
		cpuL1Cache: 512,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 4096,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 16,
		cpuL3CacheUnit: "MB",
		cpuWattage: 125,
		additionalFields: {
			overclockingSupport: "Yes",
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
		model: "Ryzen 5 3600",
		description: "Mid-range CPU with excellent price-to-performance ratio.",
		price: 249.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 15,
		weight: 0.1,
		weightUnit: "kg",
		length: 100,
		lengthUnit: "mm",
		width: 100,
		widthUnit: "mm",
		height: 35,
		heightUnit: "mm",
		additionalComments: "Six cores and twelve threads for smooth multitasking.",
		cpuSocket: "AM4",
		cpuFrequency: 3.6,
		cpuCores: 6,
		cpuL1Cache: 384,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 3072,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 32,
		cpuL3CacheUnit: "MB",
		cpuWattage: 65,
		additionalFields: {
			integratedGraphics: "No",
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
		brand: "Intel",
		model: "Pentium Gold G6400",
		description: "Budget-friendly CPU for basic computing needs.",
		price: 89.99,
		currency: "USD",
		availability: "In Stock",
		quantity: 20,
		weight: 0.08,
		weightUnit: "kg",
		length: 90,
		lengthUnit: "mm",
		width: 90,
		widthUnit: "mm",
		height: 30,
		heightUnit: "mm",
		additionalComments: "Dual-core processor for everyday tasks.",
		cpuSocket: "LGA1200",
		cpuFrequency: 4.0,
		cpuCores: 2,
		cpuL1Cache: 128,
		cpuL1CacheUnit: "KB",
		cpuL2Cache: 512,
		cpuL2CacheUnit: "KB",
		cpuL3Cache: 4,
		cpuL3CacheUnit: "MB",
		cpuWattage: 58,
		additionalFields: {
			integratedGraphics: "Yes",
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

function returnCpuSchemas(cpusArray: typeof CPUS_ARRAY) {
	return cpusArray.map((cpuDoc) => {
		const cpuSchema: CpuSchema = {
			...cpuDoc,
			sku: uuidv4(),
		};

		return cpuSchema;
	});
}

const CPU_REVIEWS = [
	{
		productReview:
			"This CPU is amazing! Lightning-fast performance and great value for the price.",
		productRating: "5",
		helpfulVotes: 15,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good performance but slightly overpriced. Would recommend for high-end gaming setups.",
		productRating: "4",
		helpfulVotes: 10,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU. Does the job but nothing extraordinary. Decent for everyday tasks.",
		productRating: "3",
		helpfulVotes: 5,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Not impressed with the performance. Expected better speed and multitasking capabilities.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Terrible CPU! Constant overheating issues. Would not recommend to anyone.",
		productRating: "1",
		helpfulVotes: 0,
		unhelpfulVotes: 12,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Solid mid-range CPU. Handles gaming and productivity tasks well without breaking the bank.",
		productRating: "4.5",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Impressive performance for the price. Exceeded my expectations in gaming and rendering.",
		productRating: "4.5",
		helpfulVotes: 12,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great budget CPU. Perfect for entry-level gaming rigs. No complaints so far.",
		productRating: "4",
		helpfulVotes: 7,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Smooth multitasking and low power consumption. Ideal for energy-efficient builds.",
		productRating: "4",
		helpfulVotes: 6,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for the price. Gets the job done without breaking the bank.",
		productRating: "3.5",
		helpfulVotes: 4,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Outstanding performance, this CPU is a game-changer! Blazing fast and efficient.",
		productRating: "5",
		helpfulVotes: 25,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid CPU choice for a mid-range build. Balanced performance and reasonable price.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU, but gets the job done. Decent for everyday tasks and light gaming.",
		productRating: "3",
		helpfulVotes: 5,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Disappointing. Expected better performance for the price. Not recommended.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 10,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Absolute nightmare! Constant crashes and overheating issues. Avoid at all costs.",
		productRating: "1",
		helpfulVotes: 0,
		unhelpfulVotes: 12,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Impressive budget CPU. Surprisingly good performance for the cost. Thumbs up!",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Exceeded expectations. Powerful CPU, excellent for gaming and content creation.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great value for money. Perfect for gaming enthusiasts on a budget.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient and reliable. This CPU is a workhorse, handling all tasks smoothly.",
		productRating: "4",
		helpfulVotes: 8,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for the price. Good for casual users. No major complaints.",
		productRating: "3.5",
		helpfulVotes: 6,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"This CPU exceeded my expectations! Lightning-fast and efficient. Worth every penny.",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great mid-range CPU. Solid performance for gaming and multitasking. Happy with my purchase.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for the price. Handles everyday tasks well, but not ideal for heavy gaming.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the performance. Expected more power for the cost. Not recommended.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 12,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Avoid this CPU! Constant issues with overheating. Regretful purchase.",
		productRating: "1",
		helpfulVotes: 0,
		unhelpfulVotes: 15,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Impressive budget-friendly CPU. Surprisingly fast and reliable. Happy with the value.",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Top-notch performance! Great for gaming and demanding tasks. Highly recommended.",
		productRating: "5",
		helpfulVotes: 25,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for money. Reliable CPU for casual gaming and daily use.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient and powerful CPU. No issues so far. Perfect for my needs.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU. Gets the job done but not exceptional. Suitable for basic tasks.",
		productRating: "3",
		helpfulVotes: 6,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"This CPU is a beast! Unmatched performance and speed. Perfect for gaming enthusiasts.",
		productRating: "5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid choice for a mid-range build. Handles multitasking well, and the price is reasonable.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for the price. Good for everyday tasks, but not the best for heavy gaming.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the performance. Expected more power for the cost. Not recommended.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 12,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Avoid this CPU! Constant overheating issues. Regretful purchase. 0/5 stars.",
		productRating: "1",
		helpfulVotes: 0,
		unhelpfulVotes: 15,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Excellent budget-friendly CPU. Surprisingly fast and reliable. Great value for money.",
		productRating: "4.5",
		helpfulVotes: 10,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Top-tier performance! Ideal for gaming and demanding tasks. Highly recommended.",
		productRating: "5",
		helpfulVotes: 25,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for money. Reliable CPU for casual gaming and daily use.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient and powerful CPU. No issues so far. Perfect for my needs.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU. Gets the job done but not exceptional. Suitable for basic tasks.",
		productRating: "3",
		helpfulVotes: 6,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"This CPU is a powerhouse! Lightning-fast and efficient. Exceeded my expectations.",
		productRating: "5",
		helpfulVotes: 25,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Great mid-range CPU. Perfect for gaming and multitasking. Value for money.",
		productRating: "4.5",
		helpfulVotes: 18,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for everyday use. Handles tasks well, but not for heavy gaming.",
		productRating: "3.5",
		helpfulVotes: 10,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Disappointed with the performance. Expected better speed. Not recommended.",
		productRating: "2",
		helpfulVotes: 2,
		unhelpfulVotes: 12,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Avoid at all costs! Constant overheating issues. Worst purchase ever.",
		productRating: "1",
		helpfulVotes: 0,
		unhelpfulVotes: 15,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Impressive budget CPU. Surprisingly good speed and reliability. Highly satisfied.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Top-tier performance! Ideal for gaming and demanding tasks. No regrets.",
		productRating: "5",
		helpfulVotes: 30,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for money. Reliable CPU for daily use and light gaming.",
		productRating: "4",
		helpfulVotes: 12,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient and powerful CPU. No issues so far. Perfect for my needs.",
		productRating: "4.5",
		helpfulVotes: 20,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU. Gets the job done but not exceptional. Suitable for basic tasks.",
		productRating: "3",
		helpfulVotes: 8,
		unhelpfulVotes: 1,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Absolutely fantastic CPU! Blazing speed and reliability. Best purchase ever!",
		productRating: "5",
		helpfulVotes: 28,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Solid mid-range CPU. Performs exceptionally well for the price. Highly recommended.",
		productRating: "4.5",
		helpfulVotes: 20,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Decent CPU for everyday use. Handles tasks efficiently. Good value for money.",
		productRating: "4",
		helpfulVotes: 15,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Slightly disappointed with the performance. Expected better speed and multitasking.",
		productRating: "3.5",
		helpfulVotes: 8,
		unhelpfulVotes: 3,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Avoid this CPU! Constant overheating issues. Worst investment I've made.",
		productRating: "1",
		helpfulVotes: 2,
		unhelpfulVotes: 30,
		isVerifiedPurchase: false,
	},
	{
		productReview:
			"Impressive budget CPU. Surprisingly good performance. Great bang for the buck!",
		productRating: "4.5",
		helpfulVotes: 25,
		unhelpfulVotes: 1,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Top-notch performance! Ideal for gaming and heavy multitasking. No regrets here.",
		productRating: "5",
		helpfulVotes: 35,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Good value for money. Reliable CPU for daily use and moderate gaming.",
		productRating: "4",
		helpfulVotes: 18,
		unhelpfulVotes: 0,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Efficient and powerful CPU. No issues so far. Perfect for my needs.",
		productRating: "4.5",
		helpfulVotes: 22,
		unhelpfulVotes: 2,
		isVerifiedPurchase: true,
	},
	{
		productReview:
			"Average CPU. Gets the job done but not exceptional. Suitable for basic tasks.",
		productRating: "3",
		helpfulVotes: 10,
		unhelpfulVotes: 2,
		isVerifiedPurchase: false,
	},
];

export { CPU_REVIEWS, CPUS_ARRAY, returnCpuSchemas };
