import { Currency, FileUploadDocument } from "../../types";
import { ProductCategory } from "../dashboard/types";

// ╔═════════════════════════════════════════════════════════════════╗
//    PRODUCT CATEGORY TYPES
// ╚═════════════════════════════════════════════════════════════════╝

type ProductAvailability =
	| "In Stock"
	| "Out of Stock"
	| "Pre-order"
	| "Discontinued"
	| "Other";

type DimensionUnit = "mm" | "cm" | "m" | "in" | "ft";
type WeightUnit = "g" | "kg" | "lb";

type RatingKind =
	| "0.5"
	| "1"
	| "1.5"
	| "2"
	| "2.5"
	| "3"
	| "3.5"
	| "4"
	| "4.5"
	| "5";

type ProductReviewSchema = {
	userId: string; // customer id
	username: string; // customer username
	productId: string;
	productCategory: ProductCategory;
	productBrand: string;
	productModel: string;
	productReview: string;
	productRating: RatingKind;
	helpfulVotes: number;
	unhelpfulVotes: number;
	isVerifiedPurchase: boolean;
};

type MemoryType = "DDR5" | "DDR4" | "DDR3" | "DDR2" | "DDR";
type MemoryUnit = "KB" | "MB" | "GB" | "TB";

type PeripheralsInterface = "USB" | "Bluetooth" | "PS/2" | "Wi-Fi" | "Other";

type MobileOs = "Android" | "iOS" | "Windows" | "Linux" | "Other";

type ProductServerResponse<
	Doc extends Record<string, any> = Record<string, any>,
> = Doc & {
	fileUploads: FileUploadDocument[];
};

type ProductCategoryPage1Specifications = {
	sku: string;
	brand: string;
	model: string;
	description: string;
	price: number;
	currency: Currency;
	availability: ProductAvailability;
	quantity: number;
	weight: number;
	weightUnit: WeightUnit;
	length: number;
	lengthUnit: DimensionUnit;
	width: number;
	widthUnit: DimensionUnit;
	height: number;
	heightUnit: DimensionUnit;
	additionalComments: string;
};

type StarRatingsCount = {
	"0.5": number;
	"1.0": number;
	"1.5": number;
	"2.0": number;
	"2.5": number;
	"3.0": number;
	"3.5": number;
	"4.0": number;
	"4.5": number;
	"5.0": number;
};

/**
 * @description - Contains shared properties between all product categories.
 *  - all product categories have these properties and their own specifications
 */
type ProductCategorySpecifications = ProductCategoryPage1Specifications & {
	// page 1 specifications here

	// product category specifications
	// with user defined additional fields (page 2) here
	additionalFields: {
		[key: string]: string;
	};

	starRatingsCount: StarRatingsCount;
	reviewsIds: string[];
	uploadedFilesIds: string[];
};

type ProductDocument =
	| AccessoryDocument
	| CpuDocument
	| ComputerCaseDocument
	| DesktopComputerDocument
	| DisplayDocument
	| GpuDocument
	| HeadphoneDocument
	| KeyboardDocument
	| LaptopDocument
	| MicrophoneDocument
	| MotherboardDocument
	| MouseDocument
	| PsuDocument
	| RamDocument
	| SmartphoneDocument
	| SpeakerDocument
	| StorageDocument
	| TabletDocument
	| WebcamDocument;

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY
// ╰─────────────────────────────────────────────────────────────────╯

type AccessorySpecifications = {
	accessoryType: string; // Headphones, Speakers, etc.
	accessoryColor: string; // Black, White, etc.
	accessoryInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type AccessorySchema = ProductCategorySpecifications & AccessorySpecifications;

type AccessoryDocument = AccessorySchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type AccessoryRequestBody = ProductCategoryPage1Specifications &
	AccessorySpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    CENTRAL PROCESSING UNIT (CPU)
// ╰─────────────────────────────────────────────────────────────────╯

type CpuSpecifications = {
	cpuSocket: string; // LGA 1200, AM4, etc.
	cpuFrequency: number; // 3.6 GHz, 4.2 GHz, etc.
	cpuCores: number; // 6 cores, 8 cores, etc.
	cpuL1Cache: number; // 384, 512, etc.
	cpuL1CacheUnit: MemoryUnit; // KB, etc.
	cpuL2Cache: number; // 1.5, 2, etc.
	cpuL2CacheUnit: MemoryUnit; // MB, etc.
	cpuL3Cache: number; // 12, 16, etc.
	cpuL3CacheUnit: MemoryUnit; // MB, etc.
	cpuWattage: number; // 65 W, 95 W, etc.
};

type CpuSchema = ProductCategorySpecifications & CpuSpecifications;

type CpuDocument = CpuSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type CpuRequestBody = ProductCategoryPage1Specifications &
	CpuSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    COMPUTER CASE
// ╰─────────────────────────────────────────────────────────────────╯

type CaseType =
	| "Mid Tower"
	| "Full Tower"
	| "Mini Tower"
	| "Cube"
	| "Slim"
	| "Desktop"
	| "Other";
type CaseSidePanel = "Windowed" | "Solid";

type CaseSpecifications = {
	caseType: CaseType; // Mid Tower, Full Tower, etc.
	caseColor: string; // Black, White, etc.
	caseSidePanel: CaseSidePanel; // windowed or not
};

type ComputerCaseSchema = ProductCategorySpecifications & CaseSpecifications;

type ComputerCaseDocument = ComputerCaseSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type ComputerCaseRequestBody = ProductCategoryPage1Specifications &
	CaseSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    DESKTOP COMPUTER
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * @description - Contains all specifications for a desktop computer.
 * - which consist of following product categories:
 * - Case
 * - Central Processing Unit (CPU)
 * - Display
 * - Graphics Processing Unit (GPU)
 * - Keyboard
 * - Motherboard
 * - Mouse
 * - Power Supply Unit (PSU)
 * - Memory (RAM)
 * - Speaker
 * - Storage
 */
type DesktopComputerSpecifications = CaseSpecifications &
	CpuSpecifications &
	DisplaySpecifications &
	GpuSpecifications &
	KeyboardSpecifications &
	MotherboardSpecifications &
	MouseSpecifications &
	PsuSpecifications &
	RamSpecifications &
	SpeakerSpecifications &
	StorageSpecifications;

type DesktopComputerSchema = ProductCategorySpecifications &
	DesktopComputerSpecifications;

type DesktopComputerDocument = DesktopComputerSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type DesktopComputerRequestBody = ProductCategoryPage1Specifications &
	DesktopComputerSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯

type DisplayPanelType = "IPS" | "TN" | "VA" | "OLED" | "QLED" | "Other";

type DisplaySpecifications = {
	displaySize: number; // 24", 27", etc.
	displayHorizontalResolution: number;
	displayVerticalResolution: number;
	displayRefreshRate: number; // 144 Hz, 165 Hz, etc.
	displayPanelType: DisplayPanelType; // IPS, TN, etc.
	displayResponseTime: number; // 1 ms, 4 ms, etc.
	displayAspectRatio: string; // 16:9, 21:9, etc.
};

type DisplaySchema = ProductCategorySpecifications & DisplaySpecifications;

type DisplayDocument = DisplaySchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type DisplayRequestBody = ProductCategoryPage1Specifications &
	DisplaySpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    GRAPHICS PROCESSING UNIT (GPU)
// ╰─────────────────────────────────────────────────────────────────╯

type GpuSpecifications = {
	gpuChipset: string; // NVIDIA GeForce RTX 3080,
	gpuMemory: number; // 10 GB, 16 GB, etc.
	gpuMemoryUnit: MemoryUnit; // GB, etc.
	gpuCoreClock: number; // 1440 MHz, 1770 MHz, etc.
	gpuBoostClock: number; // 1710 MHz, 2250 MHz, etc.
	gpuTdp: number; // 320 W, 350 W, etc.
};

type GpuSchema = ProductCategorySpecifications & GpuSpecifications;

type GpuDocument = GpuSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type GpuRequestBody = ProductCategoryPage1Specifications &
	GpuSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONE
// ╰─────────────────────────────────────────────────────────────────╯

type HeadphoneType = "Over-ear" | "On-ear" | "In-ear" | "Other";
type HeadphoneInterface =
	| "USB"
	| "Bluetooth"
	| "3.5 mm"
	| "2.5 mm"
	| "MMCX"
	| "Other";

type HeadphoneSpecifications = {
	headphoneType: HeadphoneType; // Over-ear, On-ear, etc.
	headphoneDriver: number; // 50 mm, 53 mm, etc.
	headphoneFrequencyResponse: string; // 20 Hz - 20 kHz, etc.
	headphoneImpedance: number; // 32 Ohm, 64 Ohm, etc.
	headphoneColor: string; // Black, White, etc.
	headphoneInterface: HeadphoneInterface; // USB, Bluetooth, etc.
};

type HeadphoneSchema = ProductCategorySpecifications & HeadphoneSpecifications;

type HeadphoneDocument = HeadphoneSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type HeadphoneRequestBody = ProductCategoryPage1Specifications &
	HeadphoneSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD
// ╰─────────────────────────────────────────────────────────────────╯

type KeyboardSwitch =
	| "Cherry MX Red"
	| "Cherry MX Blue"
	| "Cherry MX Brown"
	| "Cherry MX Silent Red"
	| "Cherry MX Black"
	| "Cherry MX Clear"
	| "Membrane"
	| "Other";
type KeyboardLayout =
	| "QWERTY"
	| "HHKB"
	| "Dvorak"
	| "Colemak"
	| "Workman"
	| "CARPALX"
	| "NORMAN"
	| "Other";
type KeyboardBacklight = "RGB" | "Single Color" | "None";

type KeyboardSpecifications = {
	keyboardSwitch: KeyboardSwitch; // Cherry MX Red, Cherry MX Blue, etc.
	keyboardLayout: KeyboardLayout; // ANSI, ISO, etc.
	keyboardBacklight: KeyboardBacklight; // RGB, etc.
	keyboardInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type KeyboardSchema = ProductCategorySpecifications & KeyboardSpecifications;

type KeyboardDocument = KeyboardSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type KeyboardRequestBody = ProductCategoryPage1Specifications &
	KeyboardSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    LAPTOP
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * @description - Contains all specifications for a laptop.
 * - which consist of following product categories:
 * - Central Processing Unit (CPU)
 * - Display
 * - Graphics Processing Unit (GPU)
 * - Memory (RAM)
 * - Storage
 */
type LaptopSpecifications = CpuSpecifications &
	DisplaySpecifications &
	GpuSpecifications &
	RamSpecifications &
	StorageSpecifications;

type LaptopSchema = ProductCategorySpecifications & LaptopSpecifications;

type LaptopDocument = LaptopSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type LaptopRequestBody = ProductCategoryPage1Specifications &
	LaptopSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    MEMORY (RAM)
// ╰─────────────────────────────────────────────────────────────────╯

type RamSpecifications = {
	ramDataRate: number; // 3200 MT/s, 3600 MT/s, etc.
	ramModulesQuantity: number;
	ramModulesCapacity: number;
	ramModulesCapacityUnit: MemoryUnit; // GB, etc.
	ramType: MemoryType; // DDR4, etc.
	ramColor: string; // Black, White, etc.
	ramVoltage: number; // 1.35 V, etc.
	ramTiming: string; // 16-18-18-38, etc.
};

type RamSchema = ProductCategorySpecifications & RamSpecifications;

type RamDocument = RamSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type RamRequestBody = ProductCategoryPage1Specifications &
	RamSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯

type MicrophoneType =
	| "Condenser"
	| "Dynamic"
	| "Ribbon"
	| "USB"
	| "Wireless"
	| "Other";
type MicrophonePolarPattern =
	| "Cardioid"
	| "Supercardioid"
	| "Hypercardioid"
	| "Omnidirectional"
	| "Bidirectional"
	| "Other";
type MicrophoneInterface = "XLR" | "USB" | "3.5mm" | "Wireless" | "Other";

type MicrophoneSpecifications = {
	microphoneType: MicrophoneType; // Condenser, Dynamic, etc.
	microphonePolarPattern: MicrophonePolarPattern; // Cardioid, etc.
	microphoneFrequencyResponse: string; // 20Hz-20kHz, etc.
	microphoneColor: string; // Black, White, etc.
	microphoneInterface: MicrophoneInterface; // XLR, USB, etc.
};

type MicrophoneSchema = ProductCategorySpecifications &
	MicrophoneSpecifications;

type MicrophoneDocument = MicrophoneSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type MicrophoneRequestBody = ProductCategoryPage1Specifications &
	MicrophoneSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD
// ╰─────────────────────────────────────────────────────────────────╯

type MotherboardFormFactor =
	| "ATX"
	| "Micro ATX"
	| "Mini ITX"
	| "E-ATX"
	| "XL-ATX";

type MotherboardSpecifications = {
	motherboardSocket: string; // LGA 1200, AM4, etc.
	motherboardChipset: string; // Intel Z490, AMD B550, etc.
	motherboardFormFactor: MotherboardFormFactor; // ATX, Micro ATX, etc.
	motherboardMemoryMax: number; // 128, 256, etc.
	motherboardMemoryMaxUnit: MemoryUnit; // GB, etc.
	motherboardMemorySlots: number; // 4, 8, etc.
	motherboardMemoryType: MemoryType; // DDR4, etc.
	motherboardSataPorts: number; // 6, 8, etc.
	motherboardM2Slots: number; // 2, 3, etc.
	motherboardPcie3Slots: number; // 2, 3, etc.
	motherboardPcie4Slots: number; // 1, 2, etc.
	motherboardPcie5Slots: number; // 0, 1, etc.
};

type MotherboardSchema = ProductCategorySpecifications &
	MotherboardSpecifications;

type MotherboardDocument = MotherboardSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type MotherboardRequestBody = ProductCategoryPage1Specifications &
	MotherboardSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE
// ╰─────────────────────────────────────────────────────────────────╯

type MouseSensor = "Optical" | "Laser" | "Infrared" | "Other";

type MouseSpecifications = {
	mouseSensor: MouseSensor; // Optical, Laser, etc.
	mouseDpi: number; // 800, 1600, etc.
	mouseButtons: number; // 6, 8, etc.
	mouseColor: string; // Black, White, etc.
	mouseInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type MouseSchema = ProductCategorySpecifications & MouseSpecifications;

type MouseDocument = MouseSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type MouseRequestBody = ProductCategoryPage1Specifications &
	MouseSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    POWER SUPPLY UNIT (PSU)
// ╰─────────────────────────────────────────────────────────────────╯

type PsuEfficiency =
	| "80+"
	| "80+ Bronze"
	| "80+ Silver"
	| "80+ Gold"
	| "80+ Platinum"
	| "80+ Titanium";
type PsuModularity = "Full" | "Semi" | "None" | "Other";
type PsuFormFactor = "ATX" | "SFX" | "SFX-L" | "TFX" | "Flex ATX" | "Other";

type PsuSpecifications = {
	psuWattage: number; // 650 W, 750 W, etc.
	psuEfficiency: PsuEfficiency; // 80+ Gold, 80+ Platinum, etc.
	psuFormFactor: PsuFormFactor; // ATX, SFX, etc.
	psuModularity: PsuModularity; // Full, Semi, etc.
};

type PsuSchema = ProductCategorySpecifications & PsuSpecifications;

type PsuDocument = PsuSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type PsuRequestBody = ProductCategoryPage1Specifications &
	PsuSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE
// ╰─────────────────────────────────────────────────────────────────╯

type SmartphoneSpecifications = {
	smartphoneOs: MobileOs; // Android, iOS, etc.
	smartphoneChipset: string; // Snapdragon 888, Apple A14 Bionic, etc.
	smartphoneDisplay: number; // 6.7", 6.9", etc.
	smartphoneHorizontalResolution: number;
	smartphoneVerticalResolution: number;
	smartphoneRamCapacity: number; // 12, 16, etc.
	smartphoneRamCapacityUnit: MemoryUnit; // GB, etc.
	smartphoneStorage: number; // 128 GB, 256 GB, etc.
	smartphoneBattery: number; // 5000 mAh, 6000 mAh, etc.
	smartphoneCamera: string; // 108 MP, 64 MP, etc.
	smartphoneColor: string; // Black, White, etc.
};

type SmartphoneSchema = ProductCategorySpecifications &
	SmartphoneSpecifications;

type SmartphoneDocument = SmartphoneSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type SmartphoneRequestBody = ProductCategoryPage1Specifications &
	SmartphoneSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER
// ╰─────────────────────────────────────────────────────────────────╯

type SpeakerType = "2.0" | "2.1" | "3.1" | "4.1" | "5.1" | "7.1" | "Other";
type SpeakerInterface =
	| "USB"
	| "Bluetooth"
	| "3.5 mm"
	| "2.5 mm"
	| "RCA"
	| "TRS"
	| "Wi-Fi"
	| "Other";

type SpeakerSpecifications = {
	speakerType: SpeakerType; // 2.0, 2.1, etc.
	speakerTotalWattage: number; // 10 W, 20 W, etc.
	speakerFrequencyResponse: string; // 20 Hz - 20 kHz, etc.
	speakerColor: string; // Black, White, etc.
	speakerInterface: SpeakerInterface; // USB, Bluetooth, etc.
};

type SpeakerSchema = ProductCategorySpecifications & SpeakerSpecifications;

type SpeakerDocument = SpeakerSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type SpeakerRequestBody = ProductCategoryPage1Specifications &
	SpeakerSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    STORAGE
// ╰─────────────────────────────────────────────────────────────────╯

type StorageType = "SSD" | "HDD" | "SSHD" | "Other";
type StorageFormFactor =
	| '2.5"'
	| '3.5"'
	| "M.2 2280"
	| "M.2 22110"
	| "M.2 2242"
	| "M.2 2230"
	| "mSATA"
	| "U.2"
	| "Other";
type StorageInterface =
	| "SATA III"
	| "NVMe"
	| "PCIe"
	| "U.2"
	| "SATA-Express"
	| "M.2"
	| "mSATA"
	| "Other";

type StorageSpecifications = {
	storageType: StorageType; // SSD, HDD, etc.
	storageCapacity: number; // 1, 2, etc.
	storageCapacityUnit: MemoryUnit; // TB, etc.
	storageCache: number; // 64 MB, 128 MB, etc.
	storageCacheUnit: MemoryUnit; // MB, etc.
	storageFormFactor: StorageFormFactor; // 2.5", M.2 2280, etc.
	storageInterface: StorageInterface; // SATA III, PCIe 3.0 x4, etc.
};

type StorageSchema = ProductCategorySpecifications & StorageSpecifications;

type StorageDocument = StorageSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type StorageRequestBody = ProductCategoryPage1Specifications &
	StorageSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    TABLET
// ╰─────────────────────────────────────────────────────────────────╯

type TabletSpecifications = {
	tabletOs: MobileOs; // Android, iOS, etc.
	tabletChipset: string; // Snapdragon 888, Apple A14 Bionic, etc.
	tabletDisplay: number; // 6.7", 6.9", etc.
	tabletHorizontalResolution: number;
	tabletVerticalResolution: number;
	tabletRamCapacity: number; // 12, 16, etc.
	tabletRamCapacityUnit: MemoryUnit; // GB, etc.
	tabletStorage: number; // 128 GB, 256 GB, etc.
	tabletBattery: number; // 5000 mAh, 6000 mAh, etc.
	tabletCamera: string; // 108 MP, 64 MP, etc.
	tabletColor: string; // Black, White, etc.
};

type TabletSchema = ProductCategorySpecifications & TabletSpecifications;

type TabletDocument = TabletSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type TabletRequestBody = ProductCategoryPage1Specifications &
	TabletSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ╭─────────────────────────────────────────────────────────────────╮
//    WEBCAM
// ╰─────────────────────────────────────────────────────────────────╯

type WebcamResolution = "720p" | "1080p" | "1440p" | "4K" | "Other";
type WebcamFrameRate = "30 fps" | "60 fps" | "120 fps" | "240 fps" | "Other";
type WebcamInterface = "USB" | "Bluetooth" | "Wi-Fi" | "Other";
type WebcamMicrophone = "Yes" | "No";

type WebcamSpecifications = {
	webcamResolution: WebcamResolution; // 720p, 1080p, etc.
	webcamInterface: WebcamInterface; // USB, Bluetooth, etc.
	webcamMicrophone: WebcamMicrophone; // Yes, No
	webcamFrameRate: WebcamFrameRate; // 30 fps, 60 fps, etc.
	webcamColor: string; // Black, White, etc.
};

type WebcamSchema = ProductCategorySpecifications & WebcamSpecifications;

type WebcamDocument = WebcamSchema & {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type WebcamRequestBody = ProductCategoryPage1Specifications &
	WebcamSpecifications & {
		additionalFields: {
			[key: string]: string;
		};
		reviewsIds: string[];
		uploadedFilesIds: string[];
	};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//     CREATE PRODUCT STATE TYPES
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type AdditionalFieldsMap = Map<number, [string, string]>; // Map<index, [name, value]>
type AdditionalFieldsValidMap = Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
type AdditionalFieldsFocusedMap = Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

type CreateProductState = {
	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 1
	// ╚═════════════════════════════════════════════════════════════════╝

	// brand
	brand: string;
	isBrandValid: boolean;
	isBrandFocused: boolean;
	// model
	model: string;
	isModelValid: boolean;
	isModelFocused: boolean;
	// description
	description: string;
	isDescriptionValid: boolean;
	isDescriptionFocused: boolean;
	// price
	price: string;
	isPriceValid: boolean;
	isPriceFocused: boolean;
	// currency
	currency: Currency;
	// availability
	availability: ProductAvailability;
	// quantity
	quantity: string;
	isQuantityValid: boolean;
	isQuantityFocused: boolean;
	// weight
	weight: string;
	isWeightValid: boolean;
	isWeightFocused: boolean;
	weightUnit: WeightUnit;
	// dimensions
	// length
	dimensionLength: string;
	isDimensionLengthValid: boolean;
	isDimensionLengthFocused: boolean;
	// length unit
	dimensionLengthUnit: DimensionUnit;
	// width
	dimensionWidth: string;
	isDimensionWidthValid: boolean;
	isDimensionWidthFocused: boolean;
	// width unit
	dimensionWidthUnit: DimensionUnit;
	// height
	dimensionHeight: string;
	isDimensionHeightValid: boolean;
	isDimensionHeightFocused: boolean;
	// height unit
	dimensionHeightUnit: DimensionUnit;
	// additional comments
	additionalComments: string;
	isAdditionalCommentsValid: boolean;
	isAdditionalCommentsFocused: boolean;

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 2
	// ╚═════════════════════════════════════════════════════════════════╝

	// product category
	productCategory: ProductCategory;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    ACCESSORY
	// ╰─────────────────────────────────────────────────────────────────╯
	accessoryType: string;
	isAccessoryTypeValid: boolean;
	isAccessoryTypeFocused: boolean;
	accessoryColor: string;
	isAccessoryColorValid: boolean;
	isAccessoryColorFocused: boolean;
	accessoryInterface: PeripheralsInterface;
	accessoryFieldsAdditionalMap: AdditionalFieldsMap;
	areAccessoryFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areAccessoryFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    CENTRAL PROCESSING UNIT (CPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	cpuSocket: string;
	isCpuSocketValid: boolean;
	isCpuSocketFocused: boolean;
	cpuFrequency: string;
	isCpuFrequencyValid: boolean;
	isCpuFrequencyFocused: boolean;
	cpuCores: string;
	isCpuCoresValid: boolean;
	isCpuCoresFocused: boolean;
	cpuL1CacheCapacity: string;
	isCpuL1CacheCapacityValid: boolean;
	isCpuL1CacheCapacityFocused: boolean;
	cpuL1CacheCapacityUnit: MemoryUnit;
	cpuL2CacheCapacity: string;
	isCpuL2CacheCapacityValid: boolean;
	isCpuL2CacheCapacityFocused: boolean;
	cpuL2CacheCapacityUnit: MemoryUnit;
	cpuL3CacheCapacity: string;
	isCpuL3CacheCapacityValid: boolean;
	isCpuL3CacheCapacityFocused: boolean;
	cpuL3CacheCapacityUnit: MemoryUnit;
	cpuWattage: string;
	isCpuWattageValid: boolean;
	isCpuWattageFocused: boolean;
	cpuFieldsAdditionalMap: AdditionalFieldsMap;
	areCpuFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areCpuFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    COMPUTER CASE
	// ╰─────────────────────────────────────────────────────────────────╯
	caseType: CaseType;
	caseColor: string;
	isCaseColorValid: boolean;
	isCaseColorFocused: boolean;
	caseSidePanel: CaseSidePanel;
	caseFieldsAdditionalMap: AdditionalFieldsMap;
	areCaseFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areCaseFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    DISPLAY
	// ╰─────────────────────────────────────────────────────────────────╯
	displaySize: string; // inches
	isDisplaySizeValid: boolean;
	isDisplaySizeFocused: boolean;
	displayResolutionHorizontal: string;
	isDisplayResolutionHorizontalValid: boolean;
	isDisplayResolutionHorizontalFocused: boolean;
	displayResolutionVertical: string;
	isDisplayResolutionVerticalValid: boolean;
	isDisplayResolutionVerticalFocused: boolean;
	displayRefreshRate: string;
	isDisplayRefreshRateValid: boolean;
	isDisplayRefreshRateFocused: boolean;
	displayPanelType: DisplayPanelType;
	displayResponseTime: string;
	isDisplayResponseTimeValid: boolean;
	isDisplayResponseTimeFocused: boolean;
	displayAspectRatio: string;
	isDisplayAspectRatioValid: boolean;
	isDisplayAspectRatioFocused: boolean;
	displayFieldsAdditionalMap: AdditionalFieldsMap;
	areDisplayFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areDisplayFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    GRAPHICS PROCESSING UNIT (GPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	gpuChipset: string;
	isGpuChipsetValid: boolean;
	isGpuChipsetFocused: boolean;
	gpuMemoryCapacity: string;
	isGpuMemoryCapacityValid: boolean;
	isGpuMemoryCapacityFocused: boolean;
	gpuMemoryCapacityUnit: MemoryUnit;
	gpuCoreClock: string;
	isGpuCoreClockValid: boolean;
	isGpuCoreClockFocused: boolean;
	gpuBoostClock: string;
	isGpuBoostClockValid: boolean;
	isGpuBoostClockFocused: boolean;
	gpuTdp: string;
	isGpuTdpValid: boolean;
	isGpuTdpFocused: boolean;
	gpuFieldsAdditionalMap: AdditionalFieldsMap;
	areGpuFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areGpuFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    HEADPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	headphoneType: HeadphoneType;
	headphoneDriver: string;
	isHeadphoneDriverValid: boolean;
	isHeadphoneDriverFocused: boolean;
	headphoneFrequencyResponse: string;
	isHeadphoneFrequencyResponseValid: boolean;
	isHeadphoneFrequencyResponseFocused: boolean;
	headphoneImpedance: string;
	isHeadphoneImpedanceValid: boolean;
	isHeadphoneImpedanceFocused: boolean;
	headphoneColor: string;
	isHeadphoneColorValid: boolean;
	isHeadphoneColorFocused: boolean;
	headphoneInterface: HeadphoneInterface;
	headphoneFieldsAdditionalMap: AdditionalFieldsMap;
	areHeadphoneFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areHeadphoneFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    KEYBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	keyboardSwitch: KeyboardSwitch;
	keyboardLayout: KeyboardLayout;
	keyboardBacklight: KeyboardBacklight;
	keyboardInterface: PeripheralsInterface;
	keyboardFieldsAdditionalMap: AdditionalFieldsMap;
	areKeyboardFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areKeyboardFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MEMORY (RAM)
	// ╰─────────────────────────────────────────────────────────────────╯
	ramDataRate: string;
	isRamDataRateValid: boolean;
	isRamDataRateFocused: boolean;
	ramModulesQuantity: string;
	isRamModulesQuantityValid: boolean;
	isRamModulesQuantityFocused: boolean;
	ramModulesCapacity: string;
	isRamModulesCapacityValid: boolean;
	isRamModulesCapacityFocused: boolean;
	ramModulesCapacityUnit: MemoryUnit;
	ramType: MemoryType;
	ramColor: string;
	isRamColorValid: boolean;
	isRamColorFocused: boolean;
	ramVoltage: string;
	isRamVoltageValid: boolean;
	isRamVoltageFocused: boolean;
	ramTiming: string;
	isRamTimingValid: boolean;
	isRamTimingFocused: boolean;
	ramFieldsAdditionalMap: AdditionalFieldsMap;
	areRamFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areRamFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MICROPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	microphoneType: MicrophoneType;
	microphonePolarPattern: MicrophonePolarPattern;
	microphoneInterface: MicrophoneInterface;
	microphoneColor: string;
	isMicrophoneColorValid: boolean;
	isMicrophoneColorFocused: boolean;
	microphoneFrequencyResponse: string;
	isMicrophoneFrequencyResponseValid: boolean;
	isMicrophoneFrequencyResponseFocused: boolean;
	microphoneFieldsAdditionalMap: AdditionalFieldsMap;
	areMicrophoneFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areMicrophoneFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOTHERBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	motherboardSocket: string;
	isMotherboardSocketValid: boolean;
	isMotherboardSocketFocused: boolean;
	motherboardChipset: string;
	isMotherboardChipsetValid: boolean;
	isMotherboardChipsetFocused: boolean;
	motherboardFormFactor: MotherboardFormFactor;
	motherboardMemoryMaxCapacity: string;
	isMotherboardMemoryMaxCapacityValid: boolean;
	isMotherboardMemoryMaxCapacityFocused: boolean;
	motherboardMemoryMaxCapacityUnit: MemoryUnit;
	motherboardMemorySlots: string;
	isMotherboardMemorySlotsValid: boolean;
	isMotherboardMemorySlotsFocused: boolean;
	motherboardMemoryType: MemoryType;
	motherboardSataPorts: string;
	isMotherboardSataPortsValid: boolean;
	isMotherboardSataPortsFocused: boolean;
	motherboardM2Slots: string;
	isMotherboardM2SlotsValid: boolean;
	isMotherboardM2SlotsFocused: boolean;
	motherboardPcie3Slots: string;
	isMotherboardPcie3SlotsValid: boolean;
	isMotherboardPcie3SlotsFocused: boolean;
	motherboardPcie4Slots: string;
	isMotherboardPcie4SlotsValid: boolean;
	isMotherboardPcie4SlotsFocused: boolean;
	motherboardPcie5Slots: string;
	isMotherboardPcie5SlotsValid: boolean;
	isMotherboardPcie5SlotsFocused: boolean;
	motherboardFieldsAdditionalMap: AdditionalFieldsMap;
	areMotherboardFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areMotherboardFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOUSE
	// ╰─────────────────────────────────────────────────────────────────╯
	mouseSensor: MouseSensor;
	mouseDpi: string;
	isMouseDpiValid: boolean;
	isMouseDpiFocused: boolean;
	mouseButtons: string;
	isMouseButtonsValid: boolean;
	isMouseButtonsFocused: boolean;
	mouseColor: string;
	isMouseColorValid: boolean;
	isMouseColorFocused: boolean;
	mouseInterface: PeripheralsInterface;
	mouseFieldsAdditionalMap: AdditionalFieldsMap;
	areMouseFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areMouseFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    POWER SUPPLY UNIT (PSU)
	// ╰─────────────────────────────────────────────────────────────────╯
	psuWattage: string;
	isPsuWattageValid: boolean;
	isPsuWattageFocused: boolean;
	psuEfficiency: PsuEfficiency;
	psuFormFactor: PsuFormFactor;
	psuModularity: PsuModularity;
	psuFieldsAdditionalMap: AdditionalFieldsMap;
	arePsuFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	arePsuFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SMARTPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	smartphoneOs: MobileOs;
	smartphoneChipset: string;
	isSmartphoneChipsetValid: boolean;
	isSmartphoneChipsetFocused: boolean;
	smartphoneDisplay: string;
	isSmartphoneDisplayValid: boolean;
	isSmartphoneDisplayFocused: boolean;
	smartphoneResolutionHorizontal: string;
	isSmartphoneResolutionHorizontalValid: boolean;
	isSmartphoneResolutionHorizontalFocused: boolean;
	smartphoneResolutionVertical: string;
	isSmartphoneResolutionVerticalValid: boolean;
	isSmartphoneResolutionVerticalFocused: boolean;
	smartphoneRamCapacity: string;
	isSmartphoneRamCapacityValid: boolean;
	isSmartphoneRamCapacityFocused: boolean;
	smartphoneRamCapacityUnit: MemoryUnit;
	smartphoneStorageCapacity: string; // GB
	isSmartphoneStorageCapacityValid: boolean;
	isSmartphoneStorageCapacityFocused: boolean;
	smartphoneBatteryCapacity: string; // mAh
	isSmartphoneBatteryCapacityValid: boolean;
	isSmartphoneBatteryCapacityFocused: boolean;
	smartphoneCamera: string; // 108 MP, 64 MP, etc.
	isSmartphoneCameraValid: boolean;
	isSmartphoneCameraFocused: boolean;
	smartphoneColor: string;
	isSmartphoneColorValid: boolean;
	isSmartphoneColorFocused: boolean;
	smartphoneFieldsAdditionalMap: AdditionalFieldsMap;
	areSmartphoneFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areSmartphoneFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SPEAKER
	// ╰─────────────────────────────────────────────────────────────────╯
	speakerType: SpeakerType;
	speakerTotalWattage: string;
	isSpeakerTotalWattageValid: boolean;
	isSpeakerTotalWattageFocused: boolean;
	speakerFrequencyResponse: string;
	isSpeakerFrequencyResponseValid: boolean;
	isSpeakerFrequencyResponseFocused: boolean;
	speakerColor: string;
	isSpeakerColorValid: boolean;
	isSpeakerColorFocused: boolean;
	speakerInterface: SpeakerInterface;
	speakerFieldsAdditionalMap: AdditionalFieldsMap;
	areSpeakerFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areSpeakerFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    STORAGE
	// ╰─────────────────────────────────────────────────────────────────╯
	storageType: StorageType;
	storageCapacity: string;
	isStorageCapacityValid: boolean;
	isStorageCapacityFocused: boolean;
	storageCapacityUnit: MemoryUnit;
	storageCacheCapacity: string;
	isStorageCacheCapacityValid: boolean;
	isStorageCacheCapacityFocused: boolean;
	storageCacheCapacityUnit: MemoryUnit;
	storageFormFactor: StorageFormFactor;
	storageInterface: StorageInterface;
	storageFieldsAdditionalMap: AdditionalFieldsMap;
	areStorageFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areStorageFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    TABLET
	// ╰─────────────────────────────────────────────────────────────────╯
	tabletOs: MobileOs;
	tabletChipset: string;
	isTabletChipsetValid: boolean;
	isTabletChipsetFocused: boolean;
	tabletDisplay: string;
	isTabletDisplayValid: boolean;
	isTabletDisplayFocused: boolean;
	tabletResolutionHorizontal: string;
	isTabletResolutionHorizontalValid: boolean;
	isTabletResolutionHorizontalFocused: boolean;
	tabletResolutionVertical: string;
	isTabletResolutionVerticalValid: boolean;
	isTabletResolutionVerticalFocused: boolean;
	tabletRamCapacity: string;
	isTabletRamCapacityValid: boolean;
	isTabletRamCapacityFocused: boolean;
	tabletRamCapacityUnit: MemoryUnit;
	tabletStorageCapacity: string; // GB
	isTabletStorageCapacityValid: boolean;
	isTabletStorageCapacityFocused: boolean;
	tabletBatteryCapacity: string; // mAh
	isTabletBatteryCapacityValid: boolean;
	isTabletBatteryCapacityFocused: boolean;
	tabletCamera: string; // 108 MP, 64 MP, etc.
	isTabletCameraValid: boolean;
	isTabletCameraFocused: boolean;
	tabletColor: string;
	isTabletColorValid: boolean;
	isTabletColorFocused: boolean;
	tabletFieldsAdditionalMap: AdditionalFieldsMap;
	areTabletFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areTabletFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╭─────────────────────────────────────────────────────────────────╮
	//    WEBCAM
	// ╰─────────────────────────────────────────────────────────────────╯
	webcamResolution: WebcamResolution;
	webcamInterface: WebcamInterface;
	webcamMicrophone: WebcamMicrophone;
	webcamFrameRate: WebcamFrameRate;
	webcamColor: string;
	isWebcamColorValid: boolean;
	isWebcamColorFocused: boolean;
	webcamFieldsAdditionalMap: AdditionalFieldsMap;
	areWebcamFieldsAdditionalMapValid: AdditionalFieldsValidMap;
	areWebcamFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 3
	// ╚═════════════════════════════════════════════════════════════════╝
	imgFormDataArray: FormData[];
	areImagesValid: boolean;

	// ╔═════════════════════════════════════════════════════════════════╗
	//    MISC.
	// ╚═════════════════════════════════════════════════════════════════╝
	currentlySelectedAdditionalFieldIndex: number; // currently updating idx
	triggerFormSubmit: boolean;
	currentStepperPosition: number;
	stepsInError: Set<number>;

	isSubmitting: boolean;
	submitMessage: string;
	isSuccessful: boolean;
	successMessage: string;
};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//     CREATE PRODUCT ACTION TYPE
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type CreateProductAction = {
	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 1
	// ╚═════════════════════════════════════════════════════════════════╝

	// brand
	setBrand: "setBrand";
	setIsBrandValid: "setIsBrandValid";
	setIsBrandFocused: "setIsBrandFocused";
	// model
	setModel: "setModel";
	setIsModelValid: "setIsModelValid";
	setIsModelFocused: "setIsModelFocused";
	// description
	setDescription: "setDescription";
	setIsDescriptionValid: "setIsDescriptionValid";
	setIsDescriptionFocused: "setIsDescriptionFocused";
	// price
	setPrice: "setPrice";
	setIsPriceValid: "setIsPriceValid";
	setIsPriceFocused: "setIsPriceFocused";
	// currency
	setCurrency: "setCurrency";
	// availability
	setAvailability: "setAvailability";
	// quantity
	setQuantity: "setQuantity";
	setIsQuantityValid: "setIsQuantityValid";
	setIsQuantityFocused: "setIsQuantityFocused";
	// weight
	setWeight: "setWeight";
	setIsWeightValid: "setIsWeightValid";
	setIsWeightFocused: "setIsWeightFocused";
	setWeightUnit: "setWeightUnit";
	// dimensions
	// length
	setDimensionLength: "setDimensionLength";
	setIsDimensionLengthValid: "setIsDimensionLengthValid";
	setIsDimensionLengthFocused: "setIsDimensionLengthFocused";
	// length unit
	setDimensionLengthUnit: "setDimensionLengthUnit";
	// width
	setDimensionWidth: "setDimensionWidth";
	setIsDimensionWidthValid: "setIsDimensionWidthValid";
	setIsDimensionWidthFocused: "setIsDimensionWidthFocused";
	// width unit
	setDimensionWidthUnit: "setDimensionWidthUnit";
	// height
	setDimensionHeight: "setDimensionHeight";
	setIsDimensionHeightValid: "setIsDimensionHeightValid";
	setIsDimensionHeightFocused: "setIsDimensionHeightFocused";
	// height unit
	setDimensionHeightUnit: "setDimensionHeightUnit";
	// additional comments
	setAdditionalComments: "setAdditionalComments";
	setIsAdditionalCommentsValid: "setIsAdditionalCommentsValid";
	setIsAdditionalCommentsFocused: "setIsAdditionalCommentsFocused";

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 2
	// ╚═════════════════════════════════════════════════════════════════╝

	// product category
	setProductCategory: "setProductCategory";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    ACCESSORY
	// ╰─────────────────────────────────────────────────────────────────╯
	setAccessoryType: "setAccessoryType";
	setIsAccessoryTypeValid: "setIsAccessoryTypeValid";
	setIsAccessoryTypeFocused: "setIsAccessoryTypeFocused";
	setAccessoryColor: "setAccessoryColor";
	setIsAccessoryColorValid: "setIsAccessoryColorValid";
	setIsAccessoryColorFocused: "setIsAccessoryColorFocused";
	setAccessoryInterface: "setAccessoryInterface";
	setAccessoryFieldsAdditionalMap: "setAccessoryFieldsAdditionalMap";
	setAreAccessoryFieldsAdditionalMapValid: "setAreAccessoryFieldsAdditionalMapValid";
	setAreAccessoryFieldsAdditionalMapFocused: "setAreAccessoryFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    CENTRAL PROCESSING UNIT (CPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setCpuSocket: "setCpuSocket";
	setIsCpuSocketValid: "setIsCpuSocketValid";
	setIsCpuSocketFocused: "setIsCpuSocketFocused";
	setCpuFrequency: "setCpuFrequency";
	setIsCpuFrequencyValid: "setIsCpuFrequencyValid";
	setIsCpuFrequencyFocused: "setIsCpuFrequencyFocused";
	setCpuCores: "setCpuCores";
	setIsCpuCoresValid: "setIsCpuCoresValid";
	setIsCpuCoresFocused: "setIsCpuCoresFocused";
	setCpuL1CacheCapacity: "setCpuL1CacheCapacity";
	setIsCpuL1CacheCapacityValid: "setIsCpuL1CacheCapacityValid";
	setIsCpuL1CacheCapacityFocused: "setIsCpuL1CacheCapacityFocused";
	setCpuL1CacheCapacityUnit: "setCpuL1CacheCapacityUnit";
	setCpuL2CacheCapacity: "setCpuL2CacheCapacity";
	setIsCpuL2CacheCapacityValid: "setIsCpuL2CacheCapacityValid";
	setIsCpuL2CacheCapacityFocused: "setIsCpuL2CacheCapacityFocused";
	setCpuL2CacheCapacityUnit: "setCpuL2CacheCapacityUnit";
	setCpuL3CacheCapacity: "setCpuL3CacheCapacity";
	setIsCpuL3CacheCapacityValid: "setIsCpuL3CacheCapacityValid";
	setIsCpuL3CacheCapacityFocused: "setIsCpuL3CacheCapacityFocused";
	setCpuL3CacheCapacityUnit: "setCpuL3CacheCapacityUnit";
	setCpuWattage: "setCpuWattage";
	setIsCpuWattageValid: "setIsCpuWattageValid";
	setIsCpuWattageFocused: "setIsCpuWattageFocused";
	setCpuFieldsAdditionalMap: "setCpuFieldsAdditionalMap";
	setAreCpuFieldsAdditionalMapValid: "setAreCpuFieldsAdditionalMapValid";
	setAreCpuFieldsAdditionalMapFocused: "setAreCpuFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    COMPUTER CASE
	// ╰─────────────────────────────────────────────────────────────────╯
	setCaseType: "setCaseType";
	setCaseColor: "setCaseColor";
	setIsCaseColorValid: "setIsCaseColorValid";
	setIsCaseColorFocused: "setIsCaseColorFocused";
	setCaseSidePanel: "setCaseSidePanel";
	setCaseFieldsAdditionalMap: "setCaseFieldsAdditionalMap";
	setAreCaseFieldsAdditionalMapValid: "setAreCaseFieldsAdditionalMapValid";
	setAreCaseFieldsAdditionalMapFocused: "setAreCaseFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    DISPLAY
	// ╰─────────────────────────────────────────────────────────────────╯
	setDisplaySize: "setDisplaySize";
	setIsDisplaySizeValid: "setIsDisplaySizeValid";
	setIsDisplaySizeFocused: "setIsDisplaySizeFocused";
	setDisplayResolutionHorizontal: "setDisplayResolutionHorizontal";
	setIsDisplayResolutionHorizontalValid: "setIsDisplayResolutionHorizontalValid";
	setIsDisplayResolutionHorizontalFocused: "setIsDisplayResolutionHorizontalFocused";
	setDisplayResolutionVertical: "setDisplayResolutionVertical";
	setIsDisplayResolutionVerticalValid: "setIsDisplayResolutionVerticalValid";
	setIsDisplayResolutionVerticalFocused: "setIsDisplayResolutionVerticalFocused";
	setDisplayRefreshRate: "setDisplayRefreshRate";
	setIsDisplayRefreshRateValid: "setIsDisplayRefreshRateValid";
	setIsDisplayRefreshRateFocused: "setIsDisplayRefreshRateFocused";
	setDisplayPanelType: "setDisplayPanelType";
	setDisplayResponseTime: "setDisplayResponseTime";
	setIsDisplayResponseTimeValid: "setIsDisplayResponseTimeValid";
	setIsDisplayResponseTimeFocused: "setIsDisplayResponseTimeFocused";
	setDisplayAspectRatio: "setDisplayAspectRatio";
	setIsDisplayAspectRatioValid: "setIsDisplayAspectRatioValid";
	setIsDisplayAspectRatioFocused: "setIsDisplayAspectRatioFocused";
	setDisplayFieldsAdditionalMap: "setDisplayFieldsAdditionalMap";
	setAreDisplayFieldsAdditionalMapValid: "setAreDisplayFieldsAdditionalMapValid";
	setAreDisplayFieldsAdditionalMapFocused: "setAreDisplayFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    GRAPHICS PROCESSING UNIT (GPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setGpuChipset: "setGpuChipset";
	setIsGpuChipsetValid: "setIsGpuChipsetValid";
	setIsGpuChipsetFocused: "setIsGpuChipsetFocused";
	setGpuMemoryCapacity: "setGpuMemoryCapacity";
	setIsGpuMemoryCapacityValid: "setIsGpuMemoryCapacityValid";
	setIsGpuMemoryCapacityFocused: "setIsGpuMemoryCapacityFocused";
	setGpuMemoryCapacityUnit: "setGpuMemoryCapacityUnit";
	setGpuCoreClock: "setGpuCoreClock";
	setIsGpuCoreClockValid: "setIsGpuCoreClockValid";
	setIsGpuCoreClockFocused: "setIsGpuCoreClockFocused";
	setGpuBoostClock: "setGpuBoostClock";
	setIsGpuBoostClockValid: "setIsGpuBoostClockValid";
	setIsGpuBoostClockFocused: "setIsGpuBoostClockFocused";
	setGpuTdp: "setGpuTdp";
	setIsGpuTdpValid: "setIsGpuTdpValid";
	setIsGpuTdpFocused: "setIsGpuTdpFocused";
	setGpuFieldsAdditionalMap: "setGpuFieldsAdditionalMap";
	setAreGpuFieldsAdditionalMapValid: "setAreGpuFieldsAdditionalMapValid";
	setAreGpuFieldsAdditionalMapFocused: "setAreGpuFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    HEADPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setHeadphoneType: "setHeadphoneType";
	setHeadphoneDriver: "setHeadphoneDriver";
	setIsHeadphoneDriverValid: "setIsHeadphoneDriverValid";
	setIsHeadphoneDriverFocused: "setIsHeadphoneDriverFocused";
	setHeadphoneFrequencyResponse: "setHeadphoneFrequencyResponse";
	setIsHeadphoneFrequencyResponseValid: "setIsHeadphoneFrequencyResponseValid";
	setIsHeadphoneFrequencyResponseFocused: "setIsHeadphoneFrequencyResponseFocused";
	setHeadphoneImpedance: "setHeadphoneImpedance";
	setIsHeadphoneImpedanceValid: "setIsHeadphoneImpedanceValid";
	setIsHeadphoneImpedanceFocused: "setIsHeadphoneImpedanceFocused";
	setHeadphoneColor: "setHeadphoneColor";
	setIsHeadphoneColorValid: "setIsHeadphoneColorValid";
	setIsHeadphoneColorFocused: "setIsHeadphoneColorFocused";
	setHeadphoneInterface: "setHeadphoneInterface";
	setHeadphoneFieldsAdditionalMap: "setHeadphoneFieldsAdditionalMap";
	setAreHeadphoneFieldsAdditionalMapValid: "setAreHeadphoneFieldsAdditionalMapValid";
	setAreHeadphoneFieldsAdditionalMapFocused: "setAreHeadphoneFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    KEYBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	setKeyboardSwitch: "setKeyboardSwitch";
	setKeyboardLayout: "setKeyboardLayout";
	setKeyboardBacklight: "setKeyboardBacklight";
	setKeyboardInterface: "setKeyboardInterface";
	setKeyboardFieldsAdditionalMap: "setKeyboardFieldsAdditionalMap";
	setAreKeyboardFieldsAdditionalMapValid: "setAreKeyboardFieldsAdditionalMapValid";
	setAreKeyboardFieldsAdditionalMapFocused: "setAreKeyboardFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MEMORY (RAM)
	// ╰─────────────────────────────────────────────────────────────────╯
	setRamDataRate: "setRamDataRate";
	setIsRamDataRateValid: "setIsRamDataRateValid";
	setIsRamDataRateFocused: "setIsRamDataRateFocused";
	setRamModulesQuantity: "setRamModulesQuantity";
	setIsRamModulesQuantityValid: "setIsRamModulesQuantityValid";
	setIsRamModulesQuantityFocused: "setIsRamModulesQuantityFocused";
	setRamModulesCapacity: "setRamModulesCapacity";
	setIsRamModulesCapacityValid: "setIsRamModulesCapacityValid";
	setIsRamModulesCapacityFocused: "setIsRamModulesCapacityFocused";
	setRamModulesCapacityUnit: "setRamModulesCapacityUnit";
	setRamType: "setRamType";
	setRamColor: "setRamColor";
	setIsRamColorValid: "setIsRamColorValid";
	setIsRamColorFocused: "setIsRamColorFocused";
	setRamVoltage: "setRamVoltage";
	setIsRamVoltageValid: "setIsRamVoltageValid";
	setIsRamVoltageFocused: "setIsRamVoltageFocused";
	setRamTiming: "setRamTiming";
	setIsRamTimingValid: "setIsRamTimingValid";
	setIsRamTimingFocused: "setIsRamTimingFocused";
	setRamFieldsAdditionalMap: "setRamFieldsAdditionalMap";
	setAreRamFieldsAdditionalMapValid: "setAreRamFieldsAdditionalMapValid";
	setAreRamFieldsAdditionalMapFocused: "setAreRamFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOUSE
	// ╰─────────────────────────────────────────────────────────────────╯
	setMouseSensor: "setMouseSensor";
	setMouseDpi: "setMouseDpi";
	setIsMouseDpiValid: "setIsMouseDpiValid";
	setIsMouseDpiFocused: "setIsMouseDpiFocused";
	setMouseButtons: "setMouseButtons";
	setIsMouseButtonsValid: "setIsMouseButtonsValid";
	setIsMouseButtonsFocused: "setIsMouseButtonsFocused";
	setMouseColor: "setMouseColor";
	setIsMouseColorValid: "setIsMouseColorValid";
	setIsMouseColorFocused: "setIsMouseColorFocused";
	setMouseInterface: "setMouseInterface";
	setMouseFieldsAdditionalMap: "setMouseFieldsAdditionalMap";
	setAreMouseFieldsAdditionalMapValid: "setAreMouseFieldsAdditionalMapValid";
	setAreMouseFieldsAdditionalMapFocused: "setAreMouseFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MICROPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setMicrophoneType: "setMicrophoneType";
	setMicrophonePolarPattern: "setMicrophonePolarPattern";
	setMicrophoneInterface: "setMicrophoneInterface";
	setMicrophoneColor: "setMicrophoneColor";
	setIsMicrophoneColorValid: "setIsMicrophoneColorValid";
	setIsMicrophoneColorFocused: "setIsMicrophoneColorFocused";
	setMicrophoneFrequencyResponse: "setMicrophoneFrequencyResponse";
	setIsMicrophoneFrequencyResponseValid: "setIsMicrophoneFrequencyResponseValid";
	setIsMicrophoneFrequencyResponseFocused: "setIsMicrophoneFrequencyResponseFocused";
	setMicrophoneFieldsAdditionalMap: "setMicrophoneFieldsAdditionalMap";
	setAreMicrophoneFieldsAdditionalMapValid: "setAreMicrophoneFieldsAdditionalMapValid";
	setAreMicrophoneFieldsAdditionalMapFocused: "setAreMicrophoneFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOTHERBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	setMotherboardSocket: "setMotherboardSocket";
	setIsMotherboardSocketValid: "setIsMotherboardSocketValid";
	setIsMotherboardSocketFocused: "setIsMotherboardSocketFocused";
	setMotherboardChipset: "setMotherboardChipset";
	setIsMotherboardChipsetValid: "setIsMotherboardChipsetValid";
	setIsMotherboardChipsetFocused: "setIsMotherboardChipsetFocused";
	setMotherboardFormFactor: "setMotherboardFormFactor";
	setMotherboardMemoryMaxCapacity: "setMotherboardMemoryMaxCapacity";
	setIsMotherboardMemoryMaxCapacityValid: "setIsMotherboardMemoryMaxCapacityValid";
	setIsMotherboardMemoryMaxCapacityFocused: "setIsMotherboardMemoryMaxCapacityFocused";
	setMotherboardMemoryMaxCapacityUnit: "setMotherboardMemoryMaxCapacityUnit";
	setMotherboardMemorySlots: "setMotherboardMemorySlots";
	setIsMotherboardMemorySlotsValid: "setIsMotherboardMemorySlotsValid";
	setIsMotherboardMemorySlotsFocused: "setIsMotherboardMemorySlotsFocused";
	setMotherboardMemoryType: "setMotherboardMemoryType";
	setMotherboardSataPorts: "setMotherboardSataPorts";
	setIsMotherboardSataPortsValid: "setIsMotherboardSataPortsValid";
	setIsMotherboardSataPortsFocused: "setIsMotherboardSataPortsFocused";
	setMotherboardM2Slots: "setMotherboardM2Slots";
	setIsMotherboardM2SlotsValid: "setIsMotherboardM2SlotsValid";
	setIsMotherboardM2SlotsFocused: "setIsMotherboardM2SlotsFocused";
	setMotherboardPcie3Slots: "setMotherboardPcie3Slots";
	setIsMotherboardPcie3SlotsValid: "setIsMotherboardPcie3SlotsValid";
	setIsMotherboardPcie3SlotsFocused: "setIsMotherboardPcie3SlotsFocused";
	setMotherboardPcie4Slots: "setMotherboardPcie4Slots";
	setIsMotherboardPcie4SlotsValid: "setIsMotherboardPcie4SlotsValid";
	setIsMotherboardPcie4SlotsFocused: "setIsMotherboardPcie4SlotsFocused";
	setMotherboardPcie5Slots: "setMotherboardPcie5Slots";
	setIsMotherboardPcie5SlotsValid: "setIsMotherboardPcie5SlotsValid";
	setIsMotherboardPcie5SlotsFocused: "setIsMotherboardPcie5SlotsFocused";
	setMotherboardFieldsAdditionalMap: "setMotherboardFieldsAdditionalMap";
	setAreMotherboardFieldsAdditionalMapValid: "setAreMotherboardFieldsAdditionalMapValid";
	setAreMotherboardFieldsAdditionalMapFocused: "setAreMotherboardFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    POWER SUPPLY UNIT (PSU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setPsuWattage: "setPsuWattage";
	setIsPsuWattageValid: "setIsPsuWattageValid";
	setIsPsuWattageFocused: "setIsPsuWattageFocused";
	setPsuEfficiency: "setPsuEfficiency";
	setPsuFormFactor: "setPsuFormFactor";
	setPsuModularity: "setPsuModularity";
	setPsuFieldsAdditionalMap: "setPsuFieldsAdditionalMap";
	setArePsuFieldsAdditionalMapValid: "setArePsuFieldsAdditionalMapValid";
	setArePsuFieldsAdditionalMapFocused: "setArePsuFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SMARTPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setSmartphoneOs: "setSmartphoneOs";
	setSmartphoneChipset: "setSmartphoneChipset";
	setIsSmartphoneChipsetValid: "setIsSmartphoneChipsetValid";
	setIsSmartphoneChipsetFocused: "setIsSmartphoneChipsetFocused";
	setSmartphoneDisplay: "setSmartphoneDisplay";
	setIsSmartphoneDisplayValid: "setIsSmartphoneDisplayValid";
	setIsSmartphoneDisplayFocused: "setIsSmartphoneDisplayFocused";
	setSmartphoneResolutionHorizontal: "setSmartphoneResolutionHorizontal";
	setIsSmartphoneResolutionHorizontalValid: "setIsSmartphoneResolutionHorizontalValid";
	setIsSmartphoneResolutionHorizontalFocused: "setIsSmartphoneResolutionHorizontalFocused";
	setSmartphoneResolutionVertical: "setSmartphoneResolutionVertical";
	setIsSmartphoneResolutionVerticalValid: "setIsSmartphoneResolutionVerticalValid";
	setIsSmartphoneResolutionVerticalFocused: "setIsSmartphoneResolutionVerticalFocused";
	setSmartphoneRamCapacity: "setSmartphoneRamCapacity";
	setIsSmartphoneRamCapacityValid: "setIsSmartphoneRamCapacityValid";
	setIsSmartphoneRamCapacityFocused: "setIsSmartphoneRamCapacityFocused";
	setSmartphoneRamCapacityUnit: "setSmartphoneRamCapacityUnit";
	setSmartphoneStorageCapacity: "setSmartphoneStorageCapacity";
	setIsSmartphoneStorageCapacityValid: "setIsSmartphoneStorageCapacityValid";
	setIsSmartphoneStorageCapacityFocused: "setIsSmartphoneStorageCapacityFocused";
	setSmartphoneBatteryCapacity: "setSmartphoneBatteryCapacity";
	setIsSmartphoneBatteryCapacityValid: "setIsSmartphoneBatteryCapacityValid";
	setIsSmartphoneBatteryCapacityFocused: "setIsSmartphoneBatteryCapacityFocused";
	setSmartphoneCamera: "setSmartphoneCamera";
	setIsSmartphoneCameraValid: "setIsSmartphoneCameraValid";
	setIsSmartphoneCameraFocused: "setIsSmartphoneCameraFocused";
	setSmartphoneColor: "setSmartphoneColor";
	setIsSmartphoneColorValid: "setIsSmartphoneColorValid";
	setIsSmartphoneColorFocused: "setIsSmartphoneColorFocused";
	setSmartphoneFieldsAdditionalMap: "setSmartphoneFieldsAdditionalMap";
	setAreSmartphoneFieldsAdditionalMapValid: "setAreSmartphoneFieldsAdditionalMapValid";
	setAreSmartphoneFieldsAdditionalMapFocused: "setAreSmartphoneFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SPEAKER
	// ╰─────────────────────────────────────────────────────────────────╯
	setSpeakerType: "setSpeakerType";
	setSpeakerTotalWattage: "setSpeakerTotalWattage";
	setIsSpeakerTotalWattageValid: "setIsSpeakerTotalWattageValid";
	setIsSpeakerTotalWattageFocused: "setIsSpeakerTotalWattageFocused";
	setSpeakerFrequencyResponse: "setSpeakerFrequencyResponse";
	setIsSpeakerFrequencyResponseValid: "setIsSpeakerFrequencyResponseValid";
	setIsSpeakerFrequencyResponseFocused: "setIsSpeakerFrequencyResponseFocused";
	setSpeakerColor: "setSpeakerColor";
	setIsSpeakerColorValid: "setIsSpeakerColorValid";
	setIsSpeakerColorFocused: "setIsSpeakerColorFocused";
	setSpeakerInterface: "setSpeakerInterface";
	setSpeakerFieldsAdditionalMap: "setSpeakerFieldsAdditionalMap";
	setAreSpeakerFieldsAdditionalMapValid: "setAreSpeakerFieldsAdditionalMapValid";
	setAreSpeakerFieldsAdditionalMapFocused: "setAreSpeakerFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    STORAGE
	// ╰─────────────────────────────────────────────────────────────────╯
	setStorageType: "setStorageType";
	setStorageCapacity: "setStorageCapacity";
	setIsStorageCapacityValid: "setIsStorageCapacityValid";
	setIsStorageCapacityFocused: "setIsStorageCapacityFocused";
	setStorageCapacityUnit: "setStorageCapacityUnit";
	setStorageCacheCapacity: "setStorageCacheCapacity";
	setIsStorageCacheCapacityValid: "setIsStorageCacheCapacityValid";
	setIsStorageCacheCapacityFocused: "setIsStorageCacheCapacityFocused";
	setStorageCacheCapacityUnit: "setStorageCacheCapacityUnit";
	setStorageFormFactor: "setStorageFormFactor";
	setStorageInterface: "setStorageInterface";
	setStorageFieldsAdditionalMap: "setStorageFieldsAdditionalMap";
	setAreStorageFieldsAdditionalMapValid: "setAreStorageFieldsAdditionalMapValid";
	setAreStorageFieldsAdditionalMapFocused: "setAreStorageFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    TABLET
	// ╰─────────────────────────────────────────────────────────────────╯
	setTabletOs: "setTabletOs";
	setTabletChipset: "setTabletChipset";
	setIsTabletChipsetValid: "setIsTabletChipsetValid";
	setIsTabletChipsetFocused: "setIsTabletChipsetFocused";
	setTabletDisplay: "setTabletDisplay";
	setIsTabletDisplayValid: "setIsTabletDisplayValid";
	setIsTabletDisplayFocused: "setIsTabletDisplayFocused";
	setTabletResolutionHorizontal: "setTabletResolutionHorizontal";
	setIsTabletResolutionHorizontalValid: "setIsTabletResolutionHorizontalValid";
	setIsTabletResolutionHorizontalFocused: "setIsTabletResolutionHorizontalFocused";
	setTabletResolutionVertical: "setTabletResolutionVertical";
	setIsTabletResolutionVerticalValid: "setIsTabletResolutionVerticalValid";
	setIsTabletResolutionVerticalFocused: "setIsTabletResolutionVerticalFocused";
	setTabletRamCapacity: "setTabletRamCapacity";
	setIsTabletRamCapacityValid: "setIsTabletRamCapacityValid";
	setIsTabletRamCapacityFocused: "setIsTabletRamCapacityFocused";
	setTabletRamCapacityUnit: "setTabletRamCapacityUnit";
	setTabletStorageCapacity: "setTabletStorageCapacity";
	setIsTabletStorageCapacityValid: "setIsTabletStorageCapacityValid";
	setIsTabletStorageCapacityFocused: "setIsTabletStorageCapacityFocused";
	setTabletBatteryCapacity: "setTabletBatteryCapacity";
	setIsTabletBatteryCapacityValid: "setIsTabletBatteryCapacityValid";
	setIsTabletBatteryCapacityFocused: "setIsTabletBatteryCapacityFocused";
	setTabletCamera: "setTabletCamera";
	setIsTabletCameraValid: "setIsTabletCameraValid";
	setIsTabletCameraFocused: "setIsTabletCameraFocused";
	setTabletColor: "setTabletColor";
	setIsTabletColorValid: "setIsTabletColorValid";
	setIsTabletColorFocused: "setIsTabletColorFocused";
	setTabletFieldsAdditionalMap: "setTabletFieldsAdditionalMap";
	setAreTabletFieldsAdditionalMapValid: "setAreTabletFieldsAdditionalMapValid";
	setAreTabletFieldsAdditionalMapFocused: "setAreTabletFieldsAdditionalMapFocused";

	// ╭─────────────────────────────────────────────────────────────────╮
	//    WEBCAM
	// ╰─────────────────────────────────────────────────────────────────╯
	setWebcamResolution: "setWebcamResolution";
	setWebcamInterface: "setWebcamInterface";
	setWebcamMicrophone: "setWebcamMicrophone";
	setWebcamFrameRate: "setWebcamFrameRate";
	setWebcamColor: "setWebcamColor";
	setIsWebcamColorValid: "setIsWebcamColorValid";
	setIsWebcamColorFocused: "setIsWebcamColorFocused";
	setWebcamFieldsAdditionalMap: "setWebcamFieldsAdditionalMap";
	setAreWebcamFieldsAdditionalMapValid: "setAreWebcamFieldsAdditionalMapValid";
	setAreWebcamFieldsAdditionalMapFocused: "setAreWebcamFieldsAdditionalMapFocused";

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 3
	// ╚═════════════════════════════════════════════════════════════════╝
	setImgFormDataArray: "setImgFormDataArray";
	setAreImagesValid: "setAreImagesValid";

	// ╔═════════════════════════════════════════════════════════════════╗
	//    MISC.
	// ╚═════════════════════════════════════════════════════════════════╝
	setCurrentlySelectedAdditionalFieldIndex: "setCurrentlySelectedAdditionalFieldIndex";
	setTriggerFormSubmit: "setTriggerFormSubmit";
	setCurrentStepperPosition: "setCurrentStepperPosition";
	setStepsInError: "setStepsInError";

	setIsSubmitting: "setIsSubmitting";
	setSubmitMessage: "setSubmitMessage";
	setIsSuccessful: "setIsSuccessful";
	setSuccessMessage: "setSuccessMessage";
};

export type {
	AccessoryDocument,
	AccessoryRequestBody,
	AccessorySchema,
	AccessorySpecifications,
	AdditionalFieldsFocusedMap,
	AdditionalFieldsMap,
	AdditionalFieldsValidMap,
	CaseSidePanel,
	CaseSpecifications,
	CaseType,
	ComputerCaseDocument,
	ComputerCaseRequestBody,
	ComputerCaseSchema,
	CpuDocument,
	CpuRequestBody,
	CpuSchema,
	CpuSpecifications,
	CreateProductAction,
	CreateProductState,
	DesktopComputerDocument,
	DesktopComputerRequestBody,
	DesktopComputerSchema,
	DesktopComputerSpecifications,
	DimensionUnit,
	DisplayDocument,
	DisplayPanelType,
	DisplayRequestBody,
	DisplaySchema,
	DisplaySpecifications,
	GpuDocument,
	GpuRequestBody,
	GpuSchema,
	GpuSpecifications,
	HeadphoneDocument,
	HeadphoneInterface,
	HeadphoneRequestBody,
	HeadphoneSchema,
	HeadphoneSpecifications,
	HeadphoneType,
	KeyboardBacklight,
	KeyboardDocument,
	KeyboardLayout,
	KeyboardRequestBody,
	KeyboardSchema,
	KeyboardSpecifications,
	KeyboardSwitch,
	LaptopDocument,
	LaptopRequestBody,
	LaptopSchema,
	LaptopSpecifications,
	MemoryType,
	MemoryUnit,
	MicrophoneDocument,
	MicrophoneInterface,
	MicrophonePolarPattern,
	MicrophoneRequestBody,
	MicrophoneSchema,
	MicrophoneSpecifications,
	MicrophoneType,
	MobileOs,
	MotherboardDocument,
	MotherboardFormFactor,
	MotherboardRequestBody,
	MotherboardSchema,
	MotherboardSpecifications,
	MouseDocument,
	MouseRequestBody,
	MouseSchema,
	MouseSensor,
	MouseSpecifications,
	PeripheralsInterface,
	ProductAvailability,
	ProductCategoryPage1Specifications,
	ProductCategorySpecifications,
	ProductDocument,
	ProductReviewSchema,
	ProductServerResponse,
	PsuDocument,
	PsuEfficiency,
	PsuFormFactor,
	PsuModularity,
	PsuRequestBody,
	PsuSchema,
	PsuSpecifications,
	RamDocument,
	RamRequestBody,
	RamSchema,
	RamSpecifications,
	SmartphoneDocument,
	SmartphoneRequestBody,
	SmartphoneSchema,
	SmartphoneSpecifications,
	SpeakerDocument,
	SpeakerInterface,
	SpeakerRequestBody,
	SpeakerSchema,
	SpeakerSpecifications,
	SpeakerType,
	StarRatingsCount,
	StorageDocument,
	StorageFormFactor,
	StorageInterface,
	StorageRequestBody,
	StorageSchema,
	StorageSpecifications,
	StorageType,
	TabletDocument,
	TabletRequestBody,
	TabletSchema,
	TabletSpecifications,
	WebcamDocument,
	WebcamFrameRate,
	WebcamInterface,
	WebcamMicrophone,
	WebcamRequestBody,
	WebcamResolution,
	WebcamSchema,
	WebcamSpecifications,
	WeightUnit,
};
