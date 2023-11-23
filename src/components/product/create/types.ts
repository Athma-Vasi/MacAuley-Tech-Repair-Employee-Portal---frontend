import {
  Currency,
  FileUploadDocument,
  SetStepsInErrorPayload,
} from '../../../types';
import { ProductCategory } from '../../dashboard/types';

// ╔═════════════════════════════════════════════════════════════════╗
//   PRODUCT CATEGORY TYPES
// ╚═════════════════════════════════════════════════════════════════╝

type ProductAvailability =
  | 'In Stock'
  | 'Out of Stock'
  | 'Pre-order'
  | 'Discontinued'
  | 'Other';

type DimensionUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft';
type WeightUnit = 'g' | 'kg' | 'lb';

type ProductReview = {
  userId: string;
  username: string;
  rating: number;
  review: string;
};

type MemoryType = 'DDR5' | 'DDR4' | 'DDR3' | 'DDR2' | 'DDR';
type MemoryUnit = 'KB' | 'MB' | 'GB' | 'TB';

type PeripheralsInterface = 'USB' | 'Bluetooth' | 'PS/2' | 'Other';

type MobileOs = 'Android' | 'iOS' | 'Windows' | 'Linux' | 'Other';

type ProductServerResponse<
  Doc extends Record<string, any> = Record<string, any>
> = Doc & {
  fileUploads: FileUploadDocument[];
};

/**
 * @description - Contains shared properties between all product categories.
 *  - all product categories have these properties and their own specifications
 */
type ProductCategorySchema = {
  userId: string;
  username: string;

  // page 1
  brand: string;
  model: string;
  description: string;
  price: Number;
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

  // product category specifications
  // with user defined additional fields (page 2)
  additionalFields: {
    [key: string]: string;
  };

  // page 3
  reviews: ProductReview[];
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
//   ACCESSORY
// ╰─────────────────────────────────────────────────────────────────╯

type AccessorySpecifications = {
  accessoryType: string; // Headphones, Speakers, etc.
  accessoryColor: string; // Black, White, etc.
  accessoryInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type AccessorySchema = ProductCategorySchema & AccessorySpecifications;

type AccessoryDocument = AccessorySchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   CENTRAL PROCESSING UNIT (CPU)
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

type CpuSchema = ProductCategorySchema & CpuSpecifications;

type CpuDocument = CpuSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   COMPUTER CASE
// ╰─────────────────────────────────────────────────────────────────╯

type CaseSpecifications = {
  caseType: CaseType; // Mid Tower, Full Tower, etc.
  caseColor: string; // Black, White, etc.
  caseSidePanel: CaseSidePanel; // windowed or not
};

type ComputerCaseSchema = ProductCategorySchema & CaseSpecifications;

type ComputerCaseDocument = ComputerCaseSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CaseType =
  | 'Mid Tower'
  | 'Full Tower'
  | 'Mini Tower'
  | 'Cube'
  | 'Slim'
  | 'Desktop'
  | 'Other';
type CaseSidePanel = 'Windowed' | 'Solid';

// ╭─────────────────────────────────────────────────────────────────╮
//   DESKTOP COMPUTER
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

type DesktopComputerSchema = ProductCategorySchema &
  DesktopComputerSpecifications;

type DesktopComputerDocument = DesktopComputerSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯

type DisplaySpecifications = {
  displaySize: number; // 24", 27", etc.
  displayHorizontalResolution: number;
  displayVerticalResolution: number;
  displayRefreshRate: number; // 144 Hz, 165 Hz, etc.
  displayPanelType: DisplayPanelType; // IPS, TN, etc.
  displayResponseTime: number; // 1 ms, 4 ms, etc.
  displayAspectRatio: string; // 16:9, 21:9, etc.
};

type DisplaySchema = ProductCategorySchema & DisplaySpecifications;

type DisplayDocument = DisplaySchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type DisplayPanelType = 'IPS' | 'TN' | 'VA' | 'OLED' | 'QLED' | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   GRAPHICS PROCESSING UNIT (GPU)
// ╰─────────────────────────────────────────────────────────────────╯

type GpuSpecifications = {
  gpuChipset: string; // NVIDIA GeForce RTX 3080,
  gpuMemory: number; // 10 GB, 16 GB, etc.
  gpuMemoryUnit: MemoryUnit; // GB, etc.
  gpuCoreClock: number; // 1440 MHz, 1770 MHz, etc.
  gpuBoostClock: number; // 1710 MHz, 2250 MHz, etc.
  gpuTdp: number; // 320 W, 350 W, etc.
};

type GpuSchema = ProductCategorySchema & GpuSpecifications;

type GpuDocument = GpuSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   HEADPHONE
// ╰─────────────────────────────────────────────────────────────────╯

type HeadphoneSpecifications = {
  headphoneType: HeadphoneType; // Over-ear, On-ear, etc.
  headphoneDriver: number; // 50 mm, 53 mm, etc.
  headphoneFrequencyResponse: string; // 20 Hz - 20 kHz, etc.
  headphoneImpedance: number; // 32 Ohm, 64 Ohm, etc.
  headphoneColor: string; // Black, White, etc.
  headphoneInterface: HeadphoneInterface; // USB, Bluetooth, etc.
};

type HeadphoneSchema = ProductCategorySchema & HeadphoneSpecifications;

type HeadphoneDocument = HeadphoneSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type HeadphoneType = 'Over-ear' | 'On-ear' | 'In-ear' | 'Other';
type HeadphoneInterface =
  | 'USB'
  | 'Bluetooth'
  | '3.5 mm'
  | '2.5 mm'
  | 'MMCX'
  | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   KEYBOARD
// ╰─────────────────────────────────────────────────────────────────╯

type KeyboardSpecifications = {
  keyboardSwitch: KeyboardSwitch; // Cherry MX Red, Cherry MX Blue, etc.
  keyboardLayout: KeyboardLayout; // ANSI, ISO, etc.
  keyboardBacklight: KeyboardBacklight; // RGB, etc.
  keyboardInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type KeyboardSchema = ProductCategorySchema & KeyboardSpecifications;

type KeyboardDocument = KeyboardSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type KeyboardSwitch =
  | 'Cherry MX Red'
  | 'Cherry MX Blue'
  | 'Cherry MX Brown'
  | 'Cherry MX Silent Red'
  | 'Cherry MX Black'
  | 'Cherry MX Clear'
  | 'Membrane'
  | 'Other';
type KeyboardLayout =
  | 'QWERTY'
  | 'HHKB'
  | 'Dvorak'
  | 'Colemak'
  | 'Workman'
  | 'CARPALX'
  | 'NORMAN'
  | 'Other';
type KeyboardBacklight = 'RGB' | 'Single Color' | 'None';

// ╭─────────────────────────────────────────────────────────────────╮
//   LAPTOP
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

type LaptopSchema = ProductCategorySchema & LaptopSpecifications;

type LaptopDocument = LaptopSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   MEMORY (RAM)
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

type RamSchema = ProductCategorySchema & RamSpecifications;

type RamDocument = RamSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   MOUSE
// ╰─────────────────────────────────────────────────────────────────╯

type MouseSpecifications = {
  mouseSensor: MouseSensor; // Optical, Laser, etc.
  mouseDpi: number; // 800, 1600, etc.
  mouseButtons: number; // 6, 8, etc.
  mouseColor: string; // Black, White, etc.
  mouseInterface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type MouseSchema = ProductCategorySchema & MouseSpecifications;

type MouseDocument = MouseSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type MouseSensor = 'Optical' | 'Laser' | 'Infrared' | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯

type MicrophoneSpecifications = {
  microphoneType: MicrophoneType; // Condenser, Dynamic, etc.
  microphonePolarPattern: MicrophonePolarPattern; // Cardioid, etc.
  microphoneFrequencyResponse: string; // 20Hz-20kHz, etc.
  microphoneColor: string; // Black, White, etc.
  microphoneInterface: MicrophoneInterface; // XLR, USB, etc.
};

type MicrophoneSchema = ProductCategorySchema & MicrophoneSpecifications;

type MicrophoneDocument = MicrophoneSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type MicrophoneType =
  | 'Condenser'
  | 'Dynamic'
  | 'Ribbon'
  | 'USB'
  | 'Wireless'
  | 'Other';
type MicrophonePolarPattern =
  | 'Cardioid'
  | 'Supercardioid'
  | 'Hypercardioid'
  | 'Omnidirectional'
  | 'Bidirectional'
  | 'Other';
type MicrophoneInterface = 'XLR' | 'USB' | '3.5mm' | 'Wireless' | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   MOTHERBOARD
// ╰─────────────────────────────────────────────────────────────────╯

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

type MotherboardSchema = ProductCategorySchema & MotherboardSpecifications;

type MotherboardDocument = MotherboardSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type MotherboardFormFactor =
  | 'ATX'
  | 'Micro ATX'
  | 'Mini ITX'
  | 'E-ATX'
  | 'XL-ATX';

// ╭─────────────────────────────────────────────────────────────────╮
//   POWER SUPPLY UNIT (PSU)
// ╰─────────────────────────────────────────────────────────────────╯

type PsuSpecifications = {
  psuWattage: number; // 650 W, 750 W, etc.
  psuEfficiency: PsuEfficiency; // 80+ Gold, 80+ Platinum, etc.
  psuFormFactor: PsuFormFactor; // ATX, SFX, etc.
  psuModularity: PsuModularity; // Full, Semi, etc.
};

type PsuSchema = ProductCategorySchema & PsuSpecifications;

type PsuDocument = PsuSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type PsuEfficiency =
  | '80+'
  | '80+ Bronze'
  | '80+ Silver'
  | '80+ Gold'
  | '80+ Platinum'
  | '80+ Titanium';
type PsuModularity = 'Full' | 'Semi' | 'None' | 'Other';
type PsuFormFactor = 'ATX' | 'SFX' | 'SFX-L' | 'TFX' | 'Flex ATX' | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   SMARTPHONE
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

type SmartphoneSchema = ProductCategorySchema & SmartphoneSpecifications;

type SmartphoneDocument = SmartphoneSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   SPEAKER
// ╰─────────────────────────────────────────────────────────────────╯

type SpeakerSpecifications = {
  speakerType: SpeakerType; // 2.0, 2.1, etc.
  speakerTotalWattage: number; // 10 W, 20 W, etc.
  speakerFrequencyResponse: string; // 20 Hz - 20 kHz, etc.
  speakerColor: string; // Black, White, etc.
  speakerInterface: SpeakerInterface; // USB, Bluetooth, etc.
};

type SpeakerSchema = ProductCategorySchema & SpeakerSpecifications;

type SpeakerDocument = SpeakerSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type SpeakerType = '2.0' | '2.1' | '3.1' | '4.1' | '5.1' | '7.1' | 'Other';
type SpeakerInterface =
  | 'USB'
  | 'Bluetooth'
  | '3.5 mm'
  | '2.5 mm'
  | 'RCA'
  | 'TRS'
  | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE
// ╰─────────────────────────────────────────────────────────────────╯

type StorageSpecifications = {
  storageType: StorageType; // SSD, HDD, etc.
  storageCapacity: number; // 1, 2, etc.
  storageCapacityUnit: MemoryUnit; // TB, etc.
  storageCache: number; // 64 MB, 128 MB, etc.
  storageCacheUnit: MemoryUnit; // MB, etc.
  storageFormFactor: StorageFormFactor; // 2.5", M.2 2280, etc.
  storageInterface: StorageInterface; // SATA III, PCIe 3.0 x4, etc.
};

type StorageSchema = ProductCategorySchema & StorageSpecifications;

type StorageDocument = StorageSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type StorageType = 'SSD' | 'HDD' | 'SSHD' | 'Other';
type StorageFormFactor =
  | '2.5"'
  | '3.5"'
  | 'M.2 2280'
  | 'M.2 22110'
  | 'M.2 2242'
  | 'M.2 2230'
  | 'mSATA'
  | 'U.2'
  | 'Other';
type StorageInterface =
  | 'SATA III'
  | 'NVMe'
  | 'PCIe'
  | 'U.2'
  | 'SATA-Express'
  | 'M.2'
  | 'mSATA'
  | 'Other';

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET
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

type TabletSchema = ProductCategorySchema & TabletSpecifications;

type TabletDocument = TabletSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM
// ╰─────────────────────────────────────────────────────────────────╯

type WebcamSpecifications = {
  webcamResolution: WebcamResolution; // 720p, 1080p, etc.
  webcamInterface: WebcamInterface; // USB, Bluetooth, etc.
  webcamMicrophone: WebcamMicrophone; // Yes, No
  webcamFrameRate: WebcamFrameRate; // 30 fps, 60 fps, etc.
  webcamColor: string; // Black, White, etc.
};

type WebcamSchema = ProductCategorySchema & WebcamSpecifications;

type WebcamDocument = WebcamSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type WebcamResolution = '720p' | '1080p' | '1440p' | '4K' | 'Other';
type WebcamFrameRate = '30 fps' | '60 fps' | '120 fps' | '240 fps' | 'Other';
type WebcamInterface = 'USB' | 'Bluetooth' | 'Other';
type WebcamMicrophone = 'Yes' | 'No';

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    CREATE PRODUCT STATE TYPES
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type AdditionalFieldsMap = Map<number, [string, string]>; // Map<index, [name, value]>
type AdditionalFieldsValidMap = Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
type AdditionalFieldsFocusedMap = Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

type CreateProductState = {
  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 1
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
  //   PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  // product category
  productCategory: ProductCategory;

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
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
  //   CENTRAL PROCESSING UNIT (CPU)
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
  //   COMPUTER CASE
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
  //   DISPLAY
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
  //   GRAPHICS PROCESSING UNIT (GPU)
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
  //   HEADPHONE
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
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  keyboardSwitch: KeyboardSwitch;
  keyboardLayout: KeyboardLayout;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;
  keyboardFieldsAdditionalMap: AdditionalFieldsMap;
  areKeyboardFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  areKeyboardFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MEMORY (RAM)
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
  //   MOUSE
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
  //   MICROPHONE
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
  //   MOTHERBOARD
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
  //   POWER SUPPLY UNIT (PSU)
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
  //   SMARTPHONE
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
  //   SPEAKER
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
  //   STORAGE
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
  //   TABLET
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
  //   WEBCAM
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
  //   PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝
  imgFormDataArray: FormData[];
  areImagesValid: boolean;

  // ╔═════════════════════════════════════════════════════════════════╗
  //   MISC.
  // ╚═════════════════════════════════════════════════════════════════╝

  currentlySelectedAdditionalFieldIndex: number; // currently updating idx
  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    CREATE PRODUCT ACTION TYPE
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type CreateProductAction = {
  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝

  // brand
  setBrand: 'setBrand';
  setIsBrandValid: 'setIsBrandValid';
  setIsBrandFocused: 'setIsBrandFocused';
  // model
  setModel: 'setModel';
  setIsModelValid: 'setIsModelValid';
  setIsModelFocused: 'setIsModelFocused';
  // description
  setDescription: 'setDescription';
  setIsDescriptionValid: 'setIsDescriptionValid';
  setIsDescriptionFocused: 'setIsDescriptionFocused';
  // price
  setPrice: 'setPrice';
  setIsPriceValid: 'setIsPriceValid';
  setIsPriceFocused: 'setIsPriceFocused';
  // currency
  setCurrency: 'setCurrency';
  // availability
  setAvailability: 'setAvailability';
  // quantity
  setQuantity: 'setQuantity';
  setIsQuantityValid: 'setIsQuantityValid';
  setIsQuantityFocused: 'setIsQuantityFocused';
  // weight
  setWeight: 'setWeight';
  setIsWeightValid: 'setIsWeightValid';
  setIsWeightFocused: 'setIsWeightFocused';
  setWeightUnit: 'setWeightUnit';
  // dimensions
  // length
  setDimensionLength: 'setDimensionLength';
  setIsDimensionLengthValid: 'setIsDimensionLengthValid';
  setIsDimensionLengthFocused: 'setIsDimensionLengthFocused';
  // length unit
  setDimensionLengthUnit: 'setDimensionLengthUnit';
  // width
  setDimensionWidth: 'setDimensionWidth';
  setIsDimensionWidthValid: 'setIsDimensionWidthValid';
  setIsDimensionWidthFocused: 'setIsDimensionWidthFocused';
  // width unit
  setDimensionWidthUnit: 'setDimensionWidthUnit';
  // height
  setDimensionHeight: 'setDimensionHeight';
  setIsDimensionHeightValid: 'setIsDimensionHeightValid';
  setIsDimensionHeightFocused: 'setIsDimensionHeightFocused';
  // height unit
  setDimensionHeightUnit: 'setDimensionHeightUnit';
  // additional comments
  setAdditionalComments: 'setAdditionalComments';
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  // product category
  setProductCategory: 'setProductCategory';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯
  setAccessoryType: 'setAccessoryType';
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid';
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused';
  setAccessoryColor: 'setAccessoryColor';
  setIsAccessoryColorValid: 'setIsAccessoryColorValid';
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused';
  setAccessoryInterface: 'setAccessoryInterface';
  setAccessoryFieldsAdditionalMap: 'setAccessoryFieldsAdditionalMap';
  setAreAccessoryFieldsAdditionalMapValid: 'setAreAccessoryFieldsAdditionalMapValid';
  setAreAccessoryFieldsAdditionalMapFocused: 'setAreAccessoryFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  setCpuSocket: 'setCpuSocket';
  setIsCpuSocketValid: 'setIsCpuSocketValid';
  setIsCpuSocketFocused: 'setIsCpuSocketFocused';
  setCpuFrequency: 'setCpuFrequency';
  setIsCpuFrequencyValid: 'setIsCpuFrequencyValid';
  setIsCpuFrequencyFocused: 'setIsCpuFrequencyFocused';
  setCpuCores: 'setCpuCores';
  setIsCpuCoresValid: 'setIsCpuCoresValid';
  setIsCpuCoresFocused: 'setIsCpuCoresFocused';
  setCpuL1CacheCapacity: 'setCpuL1CacheCapacity';
  setIsCpuL1CacheCapacityValid: 'setIsCpuL1CacheCapacityValid';
  setIsCpuL1CacheCapacityFocused: 'setIsCpuL1CacheCapacityFocused';
  setCpuL1CacheCapacityUnit: 'setCpuL1CacheCapacityUnit';
  setCpuL2CacheCapacity: 'setCpuL2CacheCapacity';
  setIsCpuL2CacheCapacityValid: 'setIsCpuL2CacheCapacityValid';
  setIsCpuL2CacheCapacityFocused: 'setIsCpuL2CacheCapacityFocused';
  setCpuL2CacheCapacityUnit: 'setCpuL2CacheCapacityUnit';
  setCpuL3CacheCapacity: 'setCpuL3CacheCapacity';
  setIsCpuL3CacheCapacityValid: 'setIsCpuL3CacheCapacityValid';
  setIsCpuL3CacheCapacityFocused: 'setIsCpuL3CacheCapacityFocused';
  setCpuL3CacheCapacityUnit: 'setCpuL3CacheCapacityUnit';
  setCpuWattage: 'setCpuWattage';
  setIsCpuWattageValid: 'setIsCpuWattageValid';
  setIsCpuWattageFocused: 'setIsCpuWattageFocused';
  setCpuFieldsAdditionalMap: 'setCpuFieldsAdditionalMap';
  setAreCpuFieldsAdditionalMapValid: 'setAreCpuFieldsAdditionalMapValid';
  setAreCpuFieldsAdditionalMapFocused: 'setAreCpuFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯
  setCaseType: 'setCaseType';
  setCaseColor: 'setCaseColor';
  setIsCaseColorValid: 'setIsCaseColorValid';
  setIsCaseColorFocused: 'setIsCaseColorFocused';
  setCaseSidePanel: 'setCaseSidePanel';
  setCaseFieldsAdditionalMap: 'setCaseFieldsAdditionalMap';
  setAreCaseFieldsAdditionalMapValid: 'setAreCaseFieldsAdditionalMapValid';
  setAreCaseFieldsAdditionalMapFocused: 'setAreCaseFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  setDisplaySize: 'setDisplaySize';
  setIsDisplaySizeValid: 'setIsDisplaySizeValid';
  setIsDisplaySizeFocused: 'setIsDisplaySizeFocused';
  setDisplayResolutionHorizontal: 'setDisplayResolutionHorizontal';
  setIsDisplayResolutionHorizontalValid: 'setIsDisplayResolutionHorizontalValid';
  setIsDisplayResolutionHorizontalFocused: 'setIsDisplayResolutionHorizontalFocused';
  setDisplayResolutionVertical: 'setDisplayResolutionVertical';
  setIsDisplayResolutionVerticalValid: 'setIsDisplayResolutionVerticalValid';
  setIsDisplayResolutionVerticalFocused: 'setIsDisplayResolutionVerticalFocused';
  setDisplayRefreshRate: 'setDisplayRefreshRate';
  setIsDisplayRefreshRateValid: 'setIsDisplayRefreshRateValid';
  setIsDisplayRefreshRateFocused: 'setIsDisplayRefreshRateFocused';
  setDisplayPanelType: 'setDisplayPanelType';
  setDisplayResponseTime: 'setDisplayResponseTime';
  setIsDisplayResponseTimeValid: 'setIsDisplayResponseTimeValid';
  setIsDisplayResponseTimeFocused: 'setIsDisplayResponseTimeFocused';
  setDisplayAspectRatio: 'setDisplayAspectRatio';
  setIsDisplayAspectRatioValid: 'setIsDisplayAspectRatioValid';
  setIsDisplayAspectRatioFocused: 'setIsDisplayAspectRatioFocused';
  setDisplayFieldsAdditionalMap: 'setDisplayFieldsAdditionalMap';
  setAreDisplayFieldsAdditionalMapValid: 'setAreDisplayFieldsAdditionalMapValid';
  setAreDisplayFieldsAdditionalMapFocused: 'setAreDisplayFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  setGpuChipset: 'setGpuChipset';
  setIsGpuChipsetValid: 'setIsGpuChipsetValid';
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused';
  setGpuMemoryCapacity: 'setGpuMemoryCapacity';
  setIsGpuMemoryCapacityValid: 'setIsGpuMemoryCapacityValid';
  setIsGpuMemoryCapacityFocused: 'setIsGpuMemoryCapacityFocused';
  setGpuMemoryCapacityUnit: 'setGpuMemoryCapacityUnit';
  setGpuCoreClock: 'setGpuCoreClock';
  setIsGpuCoreClockValid: 'setIsGpuCoreClockValid';
  setIsGpuCoreClockFocused: 'setIsGpuCoreClockFocused';
  setGpuBoostClock: 'setGpuBoostClock';
  setIsGpuBoostClockValid: 'setIsGpuBoostClockValid';
  setIsGpuBoostClockFocused: 'setIsGpuBoostClockFocused';
  setGpuTdp: 'setGpuTdp';
  setIsGpuTdpValid: 'setIsGpuTdpValid';
  setIsGpuTdpFocused: 'setIsGpuTdpFocused';
  setGpuFieldsAdditionalMap: 'setGpuFieldsAdditionalMap';
  setAreGpuFieldsAdditionalMapValid: 'setAreGpuFieldsAdditionalMapValid';
  setAreGpuFieldsAdditionalMapFocused: 'setAreGpuFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  setHeadphoneType: 'setHeadphoneType';
  setHeadphoneDriver: 'setHeadphoneDriver';
  setIsHeadphoneDriverValid: 'setIsHeadphoneDriverValid';
  setIsHeadphoneDriverFocused: 'setIsHeadphoneDriverFocused';
  setHeadphoneFrequencyResponse: 'setHeadphoneFrequencyResponse';
  setIsHeadphoneFrequencyResponseValid: 'setIsHeadphoneFrequencyResponseValid';
  setIsHeadphoneFrequencyResponseFocused: 'setIsHeadphoneFrequencyResponseFocused';
  setHeadphoneImpedance: 'setHeadphoneImpedance';
  setIsHeadphoneImpedanceValid: 'setIsHeadphoneImpedanceValid';
  setIsHeadphoneImpedanceFocused: 'setIsHeadphoneImpedanceFocused';
  setHeadphoneColor: 'setHeadphoneColor';
  setIsHeadphoneColorValid: 'setIsHeadphoneColorValid';
  setIsHeadphoneColorFocused: 'setIsHeadphoneColorFocused';
  setHeadphoneInterface: 'setHeadphoneInterface';
  setHeadphoneFieldsAdditionalMap: 'setHeadphoneFieldsAdditionalMap';
  setAreHeadphoneFieldsAdditionalMapValid: 'setAreHeadphoneFieldsAdditionalMapValid';
  setAreHeadphoneFieldsAdditionalMapFocused: 'setAreHeadphoneFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  setKeyboardSwitch: 'setKeyboardSwitch';
  setKeyboardLayout: 'setKeyboardLayout';
  setKeyboardBacklight: 'setKeyboardBacklight';
  setKeyboardInterface: 'setKeyboardInterface';
  setKeyboardFieldsAdditionalMap: 'setKeyboardFieldsAdditionalMap';
  setAreKeyboardFieldsAdditionalMapValid: 'setAreKeyboardFieldsAdditionalMapValid';
  setAreKeyboardFieldsAdditionalMapFocused: 'setAreKeyboardFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯
  setRamDataRate: 'setRamDataRate';
  setIsRamDataRateValid: 'setIsRamDataRateValid';
  setIsRamDataRateFocused: 'setIsRamDataRateFocused';
  setRamModulesQuantity: 'setRamModulesQuantity';
  setIsRamModulesQuantityValid: 'setIsRamModulesQuantityValid';
  setIsRamModulesQuantityFocused: 'setIsRamModulesQuantityFocused';
  setRamModulesCapacity: 'setRamModulesCapacity';
  setIsRamModulesCapacityValid: 'setIsRamModulesCapacityValid';
  setIsRamModulesCapacityFocused: 'setIsRamModulesCapacityFocused';
  setRamModulesCapacityUnit: 'setRamModulesCapacityUnit';
  setRamType: 'setRamType';
  setRamColor: 'setRamColor';
  setIsRamColorValid: 'setIsRamColorValid';
  setIsRamColorFocused: 'setIsRamColorFocused';
  setRamVoltage: 'setRamVoltage';
  setIsRamVoltageValid: 'setIsRamVoltageValid';
  setIsRamVoltageFocused: 'setIsRamVoltageFocused';
  setRamTiming: 'setRamTiming';
  setIsRamTimingValid: 'setIsRamTimingValid';
  setIsRamTimingFocused: 'setIsRamTimingFocused';
  setRamFieldsAdditionalMap: 'setRamFieldsAdditionalMap';
  setAreRamFieldsAdditionalMapValid: 'setAreRamFieldsAdditionalMapValid';
  setAreRamFieldsAdditionalMapFocused: 'setAreRamFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯
  setMouseSensor: 'setMouseSensor';
  setMouseDpi: 'setMouseDpi';
  setIsMouseDpiValid: 'setIsMouseDpiValid';
  setIsMouseDpiFocused: 'setIsMouseDpiFocused';
  setMouseButtons: 'setMouseButtons';
  setIsMouseButtonsValid: 'setIsMouseButtonsValid';
  setIsMouseButtonsFocused: 'setIsMouseButtonsFocused';
  setMouseColor: 'setMouseColor';
  setIsMouseColorValid: 'setIsMouseColorValid';
  setIsMouseColorFocused: 'setIsMouseColorFocused';
  setMouseInterface: 'setMouseInterface';
  setMouseFieldsAdditionalMap: 'setMouseFieldsAdditionalMap';
  setAreMouseFieldsAdditionalMapValid: 'setAreMouseFieldsAdditionalMapValid';
  setAreMouseFieldsAdditionalMapFocused: 'setAreMouseFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  setMicrophoneType: 'setMicrophoneType';
  setMicrophonePolarPattern: 'setMicrophonePolarPattern';
  setMicrophoneInterface: 'setMicrophoneInterface';
  setMicrophoneColor: 'setMicrophoneColor';
  setIsMicrophoneColorValid: 'setIsMicrophoneColorValid';
  setIsMicrophoneColorFocused: 'setIsMicrophoneColorFocused';
  setMicrophoneFrequencyResponse: 'setMicrophoneFrequencyResponse';
  setIsMicrophoneFrequencyResponseValid: 'setIsMicrophoneFrequencyResponseValid';
  setIsMicrophoneFrequencyResponseFocused: 'setIsMicrophoneFrequencyResponseFocused';
  setMicrophoneFieldsAdditionalMap: 'setMicrophoneFieldsAdditionalMap';
  setAreMicrophoneFieldsAdditionalMapValid: 'setAreMicrophoneFieldsAdditionalMapValid';
  setAreMicrophoneFieldsAdditionalMapFocused: 'setAreMicrophoneFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  setMotherboardSocket: 'setMotherboardSocket';
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid';
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused';
  setMotherboardChipset: 'setMotherboardChipset';
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid';
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused';
  setMotherboardFormFactor: 'setMotherboardFormFactor';
  setMotherboardMemoryMaxCapacity: 'setMotherboardMemoryMaxCapacity';
  setIsMotherboardMemoryMaxCapacityValid: 'setIsMotherboardMemoryMaxCapacityValid';
  setIsMotherboardMemoryMaxCapacityFocused: 'setIsMotherboardMemoryMaxCapacityFocused';
  setMotherboardMemoryMaxCapacityUnit: 'setMotherboardMemoryMaxCapacityUnit';
  setMotherboardMemorySlots: 'setMotherboardMemorySlots';
  setIsMotherboardMemorySlotsValid: 'setIsMotherboardMemorySlotsValid';
  setIsMotherboardMemorySlotsFocused: 'setIsMotherboardMemorySlotsFocused';
  setMotherboardMemoryType: 'setMotherboardMemoryType';
  setMotherboardSataPorts: 'setMotherboardSataPorts';
  setIsMotherboardSataPortsValid: 'setIsMotherboardSataPortsValid';
  setIsMotherboardSataPortsFocused: 'setIsMotherboardSataPortsFocused';
  setMotherboardM2Slots: 'setMotherboardM2Slots';
  setIsMotherboardM2SlotsValid: 'setIsMotherboardM2SlotsValid';
  setIsMotherboardM2SlotsFocused: 'setIsMotherboardM2SlotsFocused';
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots';
  setIsMotherboardPcie3SlotsValid: 'setIsMotherboardPcie3SlotsValid';
  setIsMotherboardPcie3SlotsFocused: 'setIsMotherboardPcie3SlotsFocused';
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots';
  setIsMotherboardPcie4SlotsValid: 'setIsMotherboardPcie4SlotsValid';
  setIsMotherboardPcie4SlotsFocused: 'setIsMotherboardPcie4SlotsFocused';
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots';
  setIsMotherboardPcie5SlotsValid: 'setIsMotherboardPcie5SlotsValid';
  setIsMotherboardPcie5SlotsFocused: 'setIsMotherboardPcie5SlotsFocused';
  setMotherboardFieldsAdditionalMap: 'setMotherboardFieldsAdditionalMap';
  setAreMotherboardFieldsAdditionalMapValid: 'setAreMotherboardFieldsAdditionalMapValid';
  setAreMotherboardFieldsAdditionalMapFocused: 'setAreMotherboardFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯
  setPsuWattage: 'setPsuWattage';
  setIsPsuWattageValid: 'setIsPsuWattageValid';
  setIsPsuWattageFocused: 'setIsPsuWattageFocused';
  setPsuEfficiency: 'setPsuEfficiency';
  setPsuFormFactor: 'setPsuFormFactor';
  setPsuModularity: 'setPsuModularity';
  setPsuFieldsAdditionalMap: 'setPsuFieldsAdditionalMap';
  setArePsuFieldsAdditionalMapValid: 'setArePsuFieldsAdditionalMapValid';
  setArePsuFieldsAdditionalMapFocused: 'setArePsuFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  setSmartphoneOs: 'setSmartphoneOs';
  setSmartphoneChipset: 'setSmartphoneChipset';
  setIsSmartphoneChipsetValid: 'setIsSmartphoneChipsetValid';
  setIsSmartphoneChipsetFocused: 'setIsSmartphoneChipsetFocused';
  setSmartphoneDisplay: 'setSmartphoneDisplay';
  setIsSmartphoneDisplayValid: 'setIsSmartphoneDisplayValid';
  setIsSmartphoneDisplayFocused: 'setIsSmartphoneDisplayFocused';
  setSmartphoneResolutionHorizontal: 'setSmartphoneResolutionHorizontal';
  setIsSmartphoneResolutionHorizontalValid: 'setIsSmartphoneResolutionHorizontalValid';
  setIsSmartphoneResolutionHorizontalFocused: 'setIsSmartphoneResolutionHorizontalFocused';
  setSmartphoneResolutionVertical: 'setSmartphoneResolutionVertical';
  setIsSmartphoneResolutionVerticalValid: 'setIsSmartphoneResolutionVerticalValid';
  setIsSmartphoneResolutionVerticalFocused: 'setIsSmartphoneResolutionVerticalFocused';
  setSmartphoneRamCapacity: 'setSmartphoneRamCapacity';
  setIsSmartphoneRamCapacityValid: 'setIsSmartphoneRamCapacityValid';
  setIsSmartphoneRamCapacityFocused: 'setIsSmartphoneRamCapacityFocused';
  setSmartphoneRamCapacityUnit: 'setSmartphoneRamCapacityUnit';
  setSmartphoneStorageCapacity: 'setSmartphoneStorageCapacity';
  setIsSmartphoneStorageCapacityValid: 'setIsSmartphoneStorageCapacityValid';
  setIsSmartphoneStorageCapacityFocused: 'setIsSmartphoneStorageCapacityFocused';
  setSmartphoneBatteryCapacity: 'setSmartphoneBatteryCapacity';
  setIsSmartphoneBatteryCapacityValid: 'setIsSmartphoneBatteryCapacityValid';
  setIsSmartphoneBatteryCapacityFocused: 'setIsSmartphoneBatteryCapacityFocused';
  setSmartphoneCamera: 'setSmartphoneCamera';
  setIsSmartphoneCameraValid: 'setIsSmartphoneCameraValid';
  setIsSmartphoneCameraFocused: 'setIsSmartphoneCameraFocused';
  setSmartphoneColor: 'setSmartphoneColor';
  setIsSmartphoneColorValid: 'setIsSmartphoneColorValid';
  setIsSmartphoneColorFocused: 'setIsSmartphoneColorFocused';
  setSmartphoneFieldsAdditionalMap: 'setSmartphoneFieldsAdditionalMap';
  setAreSmartphoneFieldsAdditionalMapValid: 'setAreSmartphoneFieldsAdditionalMapValid';
  setAreSmartphoneFieldsAdditionalMapFocused: 'setAreSmartphoneFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯
  setSpeakerType: 'setSpeakerType';
  setSpeakerTotalWattage: 'setSpeakerTotalWattage';
  setIsSpeakerTotalWattageValid: 'setIsSpeakerTotalWattageValid';
  setIsSpeakerTotalWattageFocused: 'setIsSpeakerTotalWattageFocused';
  setSpeakerFrequencyResponse: 'setSpeakerFrequencyResponse';
  setIsSpeakerFrequencyResponseValid: 'setIsSpeakerFrequencyResponseValid';
  setIsSpeakerFrequencyResponseFocused: 'setIsSpeakerFrequencyResponseFocused';
  setSpeakerColor: 'setSpeakerColor';
  setIsSpeakerColorValid: 'setIsSpeakerColorValid';
  setIsSpeakerColorFocused: 'setIsSpeakerColorFocused';
  setSpeakerInterface: 'setSpeakerInterface';
  setSpeakerFieldsAdditionalMap: 'setSpeakerFieldsAdditionalMap';
  setAreSpeakerFieldsAdditionalMapValid: 'setAreSpeakerFieldsAdditionalMapValid';
  setAreSpeakerFieldsAdditionalMapFocused: 'setAreSpeakerFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  setStorageType: 'setStorageType';
  setStorageCapacity: 'setStorageCapacity';
  setIsStorageCapacityValid: 'setIsStorageCapacityValid';
  setIsStorageCapacityFocused: 'setIsStorageCapacityFocused';
  setStorageCapacityUnit: 'setStorageCapacityUnit';
  setStorageCacheCapacity: 'setStorageCacheCapacity';
  setIsStorageCacheCapacityValid: 'setIsStorageCacheCapacityValid';
  setIsStorageCacheCapacityFocused: 'setIsStorageCacheCapacityFocused';
  setStorageCacheCapacityUnit: 'setStorageCacheCapacityUnit';
  setStorageFormFactor: 'setStorageFormFactor';
  setStorageInterface: 'setStorageInterface';
  setStorageFieldsAdditionalMap: 'setStorageFieldsAdditionalMap';
  setAreStorageFieldsAdditionalMapValid: 'setAreStorageFieldsAdditionalMapValid';
  setAreStorageFieldsAdditionalMapFocused: 'setAreStorageFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   TABLET
  // ╰─────────────────────────────────────────────────────────────────╯
  setTabletOs: 'setTabletOs';
  setTabletChipset: 'setTabletChipset';
  setIsTabletChipsetValid: 'setIsTabletChipsetValid';
  setIsTabletChipsetFocused: 'setIsTabletChipsetFocused';
  setTabletDisplay: 'setTabletDisplay';
  setIsTabletDisplayValid: 'setIsTabletDisplayValid';
  setIsTabletDisplayFocused: 'setIsTabletDisplayFocused';
  setTabletResolutionHorizontal: 'setTabletResolutionHorizontal';
  setIsTabletResolutionHorizontalValid: 'setIsTabletResolutionHorizontalValid';
  setIsTabletResolutionHorizontalFocused: 'setIsTabletResolutionHorizontalFocused';
  setTabletResolutionVertical: 'setTabletResolutionVertical';
  setIsTabletResolutionVerticalValid: 'setIsTabletResolutionVerticalValid';
  setIsTabletResolutionVerticalFocused: 'setIsTabletResolutionVerticalFocused';
  setTabletRamCapacity: 'setTabletRamCapacity';
  setIsTabletRamCapacityValid: 'setIsTabletRamCapacityValid';
  setIsTabletRamCapacityFocused: 'setIsTabletRamCapacityFocused';
  setTabletRamCapacityUnit: 'setTabletRamCapacityUnit';
  setTabletStorageCapacity: 'setTabletStorageCapacity';
  setIsTabletStorageCapacityValid: 'setIsTabletStorageCapacityValid';
  setIsTabletStorageCapacityFocused: 'setIsTabletStorageCapacityFocused';
  setTabletBatteryCapacity: 'setTabletBatteryCapacity';
  setIsTabletBatteryCapacityValid: 'setIsTabletBatteryCapacityValid';
  setIsTabletBatteryCapacityFocused: 'setIsTabletBatteryCapacityFocused';
  setTabletCamera: 'setTabletCamera';
  setIsTabletCameraValid: 'setIsTabletCameraValid';
  setIsTabletCameraFocused: 'setIsTabletCameraFocused';
  setTabletColor: 'setTabletColor';
  setIsTabletColorValid: 'setIsTabletColorValid';
  setIsTabletColorFocused: 'setIsTabletColorFocused';
  setTabletFieldsAdditionalMap: 'setTabletFieldsAdditionalMap';
  setAreTabletFieldsAdditionalMapValid: 'setAreTabletFieldsAdditionalMapValid';
  setAreTabletFieldsAdditionalMapFocused: 'setAreTabletFieldsAdditionalMapFocused';

  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
  setWebcamResolution: 'setWebcamResolution';
  setWebcamInterface: 'setWebcamInterface';
  setWebcamMicrophone: 'setWebcamMicrophone';
  setWebcamFrameRate: 'setWebcamFrameRate';
  setWebcamColor: 'setWebcamColor';
  setIsWebcamColorValid: 'setIsWebcamColorValid';
  setIsWebcamColorFocused: 'setIsWebcamColorFocused';
  setWebcamFieldsAdditionalMap: 'setWebcamFieldsAdditionalMap';
  setAreWebcamFieldsAdditionalMapValid: 'setAreWebcamFieldsAdditionalMapValid';
  setAreWebcamFieldsAdditionalMapFocused: 'setAreWebcamFieldsAdditionalMapFocused';

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝
  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';

  // ╔═════════════════════════════════════════════════════════════════╗
  //   MISC.
  // ╚═════════════════════════════════════════════════════════════════╝
  setCurrentlySelectedAdditionalFieldIndex: 'setCurrentlySelectedAdditionalFieldIndex';
  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    CREATE PRODUCT DISPATCH TYPES
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type AdditionalFieldsAdd = {
  operation: 'add';
  data: [string, string];
};
type AdditionalFieldsRemove = {
  operation: 'remove';
  index: number;
};
type AdditionalFieldsUpdate = {
  operation: 'update';
  kind: 'key' | 'value';
  index: number;
  data: string;
};
type AdditionalFieldsPayload =
  | AdditionalFieldsAdd
  | AdditionalFieldsRemove
  | AdditionalFieldsUpdate;

type AdditionalFieldsValidFocusedAdd = {
  operation: 'add';
  data: [boolean, boolean];
};
type AdditionalFieldsValidFocusedRemove = {
  operation: 'remove';
  index: number;
};
type AdditionalFieldsValidFocusedUpdate = {
  operation: 'update';
  kind: 'key' | 'value';
  index: number;
  data: boolean;
};
type AdditionalFieldsValidFocusedPayload =
  | AdditionalFieldsValidFocusedAdd
  | AdditionalFieldsValidFocusedRemove
  | AdditionalFieldsValidFocusedUpdate;

type CreateProductDispatch =
  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝
  // brand
  | {
      type: CreateProductAction['setBrand'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsBrandValid']
        | CreateProductAction['setIsBrandFocused'];
      payload: boolean;
    }
  // model
  | {
      type: CreateProductAction['setModel'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsModelValid']
        | CreateProductAction['setIsModelFocused'];
      payload: boolean;
    }
  // description
  | {
      type: CreateProductAction['setDescription'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDescriptionValid']
        | CreateProductAction['setIsDescriptionFocused'];
      payload: boolean;
    }
  // price
  | {
      type: CreateProductAction['setPrice'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsPriceValid']
        | CreateProductAction['setIsPriceFocused'];
      payload: boolean;
    }
  // currency
  | {
      type: CreateProductAction['setCurrency'];
      payload: Currency;
    }
  // availability
  | {
      type: CreateProductAction['setAvailability'];
      payload: ProductAvailability;
    }
  // quantity
  | {
      type: CreateProductAction['setQuantity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsQuantityValid']
        | CreateProductAction['setIsQuantityFocused'];
      payload: boolean;
    }
  // weight
  | {
      type: CreateProductAction['setWeight'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsWeightValid']
        | CreateProductAction['setIsWeightFocused'];
      payload: boolean;
    }
  // weight unit
  | {
      type: CreateProductAction['setWeightUnit'];
      payload: WeightUnit;
    }
  | {
      type: CreateProductAction['setDimensionLength'];
      payload: string;
    }
  // dimension length
  | {
      type:
        | CreateProductAction['setIsDimensionLengthFocused']
        | CreateProductAction['setIsDimensionLengthValid'];
      payload: boolean;
    }
  // dimension length unit
  | {
      type: CreateProductAction['setDimensionLengthUnit'];
      payload: DimensionUnit;
    }
  // dimension width
  | {
      type: CreateProductAction['setDimensionWidth'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDimensionWidthValid']
        | CreateProductAction['setIsDimensionWidthFocused'];
      payload: boolean;
    }
  // dimension width unit
  | {
      type: CreateProductAction['setDimensionWidthUnit'];
      payload: DimensionUnit;
    }
  // dimension height
  | {
      type: CreateProductAction['setDimensionHeight'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDimensionHeightValid']
        | CreateProductAction['setIsDimensionHeightFocused'];
      payload: boolean;
    }
  // dimension height unit
  | {
      type: CreateProductAction['setDimensionHeightUnit'];
      payload: DimensionUnit;
    }
  // additional comments
  | {
      type: CreateProductAction['setAdditionalComments'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAdditionalCommentsValid']
        | CreateProductAction['setIsAdditionalCommentsFocused'];
      payload: boolean;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝
  // product category
  | {
      type: CreateProductAction['setProductCategory'];
      payload: ProductCategory;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setAccessoryType'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAccessoryTypeValid']
        | CreateProductAction['setIsAccessoryTypeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setAccessoryColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAccessoryColorValid']
        | CreateProductAction['setIsAccessoryColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setAccessoryInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setAccessoryFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreAccessoryFieldsAdditionalMapValid']
        | CreateProductAction['setAreAccessoryFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setCpuSocket'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuSocketValid']
        | CreateProductAction['setIsCpuSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuFrequency'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuFrequencyValid']
        | CreateProductAction['setIsCpuFrequencyFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuCores'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuCoresValid']
        | CreateProductAction['setIsCpuCoresFocused'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setCpuL1CacheCapacity']
        | CreateProductAction['setCpuL2CacheCapacity']
        | CreateProductAction['setCpuL3CacheCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuL1CacheCapacityValid']
        | CreateProductAction['setIsCpuL1CacheCapacityFocused']
        | CreateProductAction['setIsCpuL2CacheCapacityValid']
        | CreateProductAction['setIsCpuL2CacheCapacityFocused']
        | CreateProductAction['setIsCpuL3CacheCapacityValid']
        | CreateProductAction['setIsCpuL3CacheCapacityFocused'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setCpuL1CacheCapacityUnit']
        | CreateProductAction['setCpuL2CacheCapacityUnit']
        | CreateProductAction['setCpuL3CacheCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setCpuWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuWattageValid']
        | CreateProductAction['setIsCpuWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCpuFieldsAdditionalMapValid']
        | CreateProductAction['setAreCpuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setCaseType'];
      payload: CaseType;
    }
  | {
      type: CreateProductAction['setCaseColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCaseColorValid']
        | CreateProductAction['setIsCaseColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCaseSidePanel'];
      payload: CaseSidePanel;
    }
  | {
      type: CreateProductAction['setCaseFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCaseFieldsAdditionalMapValid']
        | CreateProductAction['setAreCaseFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setDisplaySize'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplaySizeValid']
        | CreateProductAction['setIsDisplaySizeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResolutionHorizontalValid']
        | CreateProductAction['setIsDisplayResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResolutionVerticalValid']
        | CreateProductAction['setIsDisplayResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayRefreshRate'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayRefreshRateValid']
        | CreateProductAction['setIsDisplayRefreshRateFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayPanelType'];
      payload: DisplayPanelType;
    }
  | {
      type: CreateProductAction['setDisplayResponseTime'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResponseTimeValid']
        | CreateProductAction['setIsDisplayResponseTimeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayAspectRatio'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayAspectRatioValid']
        | CreateProductAction['setIsDisplayAspectRatioFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreDisplayFieldsAdditionalMapValid']
        | CreateProductAction['setAreDisplayFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setGpuChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuChipsetValid']
        | CreateProductAction['setIsGpuChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuMemoryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuMemoryCapacityValid']
        | CreateProductAction['setIsGpuMemoryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuMemoryCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setGpuCoreClock'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuCoreClockValid']
        | CreateProductAction['setIsGpuCoreClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuBoostClock'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuBoostClockValid']
        | CreateProductAction['setIsGpuBoostClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuTdp'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuTdpValid']
        | CreateProductAction['setIsGpuTdpFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreGpuFieldsAdditionalMapValid']
        | CreateProductAction['setAreGpuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setHeadphoneType'];
      payload: HeadphoneType;
    }
  | {
      type: CreateProductAction['setHeadphoneDriver'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneDriverValid']
        | CreateProductAction['setIsHeadphoneDriverFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneFrequencyResponseValid']
        | CreateProductAction['setIsHeadphoneFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneImpedance'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneImpedanceValid']
        | CreateProductAction['setIsHeadphoneImpedanceFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneColorValid']
        | CreateProductAction['setIsHeadphoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneInterface'];
      payload: HeadphoneInterface;
    }
  | {
      type: CreateProductAction['setHeadphoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreHeadphoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreHeadphoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setKeyboardSwitch'];
      payload: KeyboardSwitch;
    }
  | {
      type: CreateProductAction['setKeyboardLayout'];
      payload: KeyboardLayout;
    }
  | {
      type: CreateProductAction['setKeyboardBacklight'];
      payload: KeyboardBacklight;
    }
  | {
      type: CreateProductAction['setKeyboardInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setKeyboardFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreKeyboardFieldsAdditionalMapValid']
        | CreateProductAction['setAreKeyboardFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setRamDataRate'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamDataRateValid']
        | CreateProductAction['setIsRamDataRateFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesQuantity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamModulesQuantityValid']
        | CreateProductAction['setIsRamModulesQuantityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamModulesCapacityValid']
        | CreateProductAction['setIsRamModulesCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setRamType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setRamColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamColorValid']
        | CreateProductAction['setIsRamColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamVoltage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamVoltageValid']
        | CreateProductAction['setIsRamVoltageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamTiming'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamTimingValid']
        | CreateProductAction['setIsRamTimingFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreRamFieldsAdditionalMapValid']
        | CreateProductAction['setAreRamFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMouseSensor'];
      payload: MouseSensor;
    }
  | {
      type: CreateProductAction['setMouseDpi'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseDpiValid']
        | CreateProductAction['setIsMouseDpiFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseButtons'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseButtonsValid']
        | CreateProductAction['setIsMouseButtonsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseColorValid']
        | CreateProductAction['setIsMouseColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setMouseFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMouseFieldsAdditionalMapValid']
        | CreateProductAction['setAreMouseFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMicrophoneType'];
      payload: MicrophoneType;
    }
  | {
      type: CreateProductAction['setMicrophonePolarPattern'];
      payload: MicrophonePolarPattern;
    }
  | {
      type: CreateProductAction['setMicrophoneInterface'];
      payload: MicrophoneInterface;
    }
  | {
      type: CreateProductAction['setMicrophoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMicrophoneColorValid']
        | CreateProductAction['setIsMicrophoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMicrophoneFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMicrophoneFrequencyResponseValid']
        | CreateProductAction['setIsMicrophoneFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMicrophoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMicrophoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreMicrophoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMotherboardSocket'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardSocketValid']
        | CreateProductAction['setIsMotherboardSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardChipsetValid']
        | CreateProductAction['setIsMotherboardChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardFormFactor'];
      payload: MotherboardFormFactor;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMaxCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardMemoryMaxCapacityValid']
        | CreateProductAction['setIsMotherboardMemoryMaxCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMaxCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setMotherboardMemorySlots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardMemorySlotsValid']
        | CreateProductAction['setIsMotherboardMemorySlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setMotherboardSataPorts'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardSataPortsValid']
        | CreateProductAction['setIsMotherboardSataPortsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardM2Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardM2SlotsValid']
        | CreateProductAction['setIsMotherboardM2SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie3Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie3SlotsValid']
        | CreateProductAction['setIsMotherboardPcie3SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie4Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie4SlotsValid']
        | CreateProductAction['setIsMotherboardPcie4SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie5Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie5SlotsValid']
        | CreateProductAction['setIsMotherboardPcie5SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMotherboardFieldsAdditionalMapValid']
        | CreateProductAction['setAreMotherboardFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setPsuWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsPsuWattageValid']
        | CreateProductAction['setIsPsuWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setPsuEfficiency'];
      payload: PsuEfficiency;
    }
  | {
      type: CreateProductAction['setPsuFormFactor'];
      payload: PsuFormFactor;
    }
  | {
      type: CreateProductAction['setPsuModularity'];
      payload: PsuModularity;
    }
  | {
      type: CreateProductAction['setPsuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setArePsuFieldsAdditionalMapValid']
        | CreateProductAction['setArePsuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setSmartphoneOs'];
      payload: MobileOs;
    }
  | {
      type: CreateProductAction['setSmartphoneChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneChipsetValid']
        | CreateProductAction['setIsSmartphoneChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneDisplay'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneDisplayValid']
        | CreateProductAction['setIsSmartphoneDisplayFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneResolutionHorizontalValid']
        | CreateProductAction['setIsSmartphoneResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneResolutionVerticalValid']
        | CreateProductAction['setIsSmartphoneResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneRamCapacityValid']
        | CreateProductAction['setIsSmartphoneRamCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setSmartphoneStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneStorageCapacityValid']
        | CreateProductAction['setIsSmartphoneStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneBatteryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneBatteryCapacityValid']
        | CreateProductAction['setIsSmartphoneBatteryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneCamera'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneCameraValid']
        | CreateProductAction['setIsSmartphoneCameraFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneColorValid']
        | CreateProductAction['setIsSmartphoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSmartphoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreSmartphoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setSpeakerType'];
      payload: SpeakerType;
    }
  | {
      type: CreateProductAction['setSpeakerTotalWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerTotalWattageValid']
        | CreateProductAction['setIsSpeakerTotalWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerFrequencyResponseValid']
        | CreateProductAction['setIsSpeakerFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerColorValid']
        | CreateProductAction['setIsSpeakerColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerInterface'];
      payload: SpeakerInterface;
    }
  | {
      type: CreateProductAction['setSpeakerFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSpeakerFieldsAdditionalMapValid']
        | CreateProductAction['setAreSpeakerFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setStorageType'];
      payload: StorageType;
    }
  | {
      type: CreateProductAction['setStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsStorageCapacityValid']
        | CreateProductAction['setIsStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setStorageCacheCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsStorageCacheCapacityValid']
        | CreateProductAction['setIsStorageCacheCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageCacheCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setStorageFormFactor'];
      payload: StorageFormFactor;
    }
  | {
      type: CreateProductAction['setStorageInterface'];
      payload: StorageInterface;
    }
  | {
      type: CreateProductAction['setStorageFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreStorageFieldsAdditionalMapValid']
        | CreateProductAction['setAreStorageFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   TABLET
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setTabletOs'];
      payload: MobileOs;
    }
  | {
      type: CreateProductAction['setTabletChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletChipsetValid']
        | CreateProductAction['setIsTabletChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletDisplay'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletDisplayValid']
        | CreateProductAction['setIsTabletDisplayFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletResolutionHorizontalValid']
        | CreateProductAction['setIsTabletResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletResolutionVerticalValid']
        | CreateProductAction['setIsTabletResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletRamCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletRamCapacityValid']
        | CreateProductAction['setIsTabletRamCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setTabletStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletStorageCapacityValid']
        | CreateProductAction['setIsTabletStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletBatteryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletBatteryCapacityValid']
        | CreateProductAction['setIsTabletBatteryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletCamera'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletCameraValid']
        | CreateProductAction['setIsTabletCameraFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletColorValid']
        | CreateProductAction['setIsTabletColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreTabletFieldsAdditionalMapValid']
        | CreateProductAction['setAreTabletFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setWebcamResolution'];
      payload: WebcamResolution;
    }
  | {
      type: CreateProductAction['setWebcamInterface'];
      payload: WebcamInterface;
    }
  | {
      type: CreateProductAction['setWebcamMicrophone'];
      payload: WebcamMicrophone;
    }
  | {
      type: CreateProductAction['setWebcamFrameRate'];
      payload: WebcamFrameRate;
    }
  | {
      type: CreateProductAction['setWebcamColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsWebcamColorValid']
        | CreateProductAction['setIsWebcamColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setWebcamFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreWebcamFieldsAdditionalMapValid']
        | CreateProductAction['setAreWebcamFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //   PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝
  | {
      type: CreateProductAction['setCurrentlySelectedAdditionalFieldIndex'];
      payload: number;
    }
  | {
      type: CreateProductAction['setImgFormDataArray'];
      payload: FormData[];
    }
  | {
      type: CreateProductAction['setAreImagesValid'];
      payload: boolean;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //   MISC.
  // ╚═════════════════════════════════════════════════════════════════╝
  | {
      type: CreateProductAction['setTriggerFormSubmit'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateProductAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | CreateProductAction['setIsSubmitting']
        | CreateProductAction['setIsSuccessful']
        | CreateProductAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setSubmitMessage']
        | CreateProductAction['setSuccessMessage']
        | CreateProductAction['setLoadingMessage'];
      payload: string;
    };

export type {
  AccessoryDocument,
  AccessorySpecifications,
  AdditionalFieldsAdd,
  AdditionalFieldsPayload,
  AdditionalFieldsRemove,
  AdditionalFieldsUpdate,
  AdditionalFieldsValidFocusedAdd,
  AdditionalFieldsValidFocusedPayload,
  AdditionalFieldsValidFocusedRemove,
  AdditionalFieldsValidFocusedUpdate,
  CaseSidePanel,
  CaseSpecifications,
  CaseType,
  ComputerCaseDocument,
  CpuDocument,
  CpuSpecifications,
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
  DesktopComputerDocument,
  DesktopComputerSpecifications,
  DimensionUnit,
  DisplayDocument,
  DisplayPanelType,
  DisplaySpecifications,
  GpuDocument,
  GpuSpecifications,
  HeadphoneDocument,
  HeadphoneInterface,
  HeadphoneSpecifications,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardDocument,
  KeyboardLayout,
  KeyboardSpecifications,
  KeyboardSwitch,
  LaptopDocument,
  LaptopSpecifications,
  MemoryType,
  MemoryUnit,
  MicrophoneDocument,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardDocument,
  MotherboardFormFactor,
  MotherboardSpecifications,
  MouseDocument,
  MouseSensor,
  MouseSpecifications,
  PeripheralsInterface,
  ProductAvailability,
  ProductDocument,
  ProductReview,
  PsuDocument,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  PsuSpecifications,
  RamDocument,
  RamSpecifications,
  SmartphoneDocument,
  SmartphoneSpecifications,
  SpeakerDocument,
  SpeakerInterface,
  SpeakerSpecifications,
  SpeakerType,
  StorageDocument,
  StorageFormFactor,
  StorageInterface,
  StorageSpecifications,
  StorageType,
  TabletDocument,
  TabletSpecifications,
  WebcamDocument,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
  WeightUnit,
};
