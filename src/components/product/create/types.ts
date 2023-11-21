import { Action, Currency, SetStepsInErrorPayload, User } from '../../../types';
import { ActionsDashboard } from '../../../types/actions.types';
import { ProductCategory } from '../../dashboard/types';

type DesktopComputerSpecifications = {
  cpu: CpuSpecifications;
  gpu: GpuSpecifications;
  motherboard: MotherboardSpecifications;
  ram: RamSpecifications;
  storage: StorageSpecifications;
  psu: PsuSpecifications;
  case: CaseSpecifications;
  display: DisplaySpecifications;
  keyboard: KeyboardSpecifications;
  mouse: MouseSpecifications;
  speaker: SpeakerSpecifications;
};

type LaptopSpecifications = {
  cpu: CpuSpecifications;
  gpu: GpuSpecifications;
  ram: RamSpecifications;
  storage: StorageSpecifications;
  display: DisplaySpecifications;
};

type MemoryUnit = 'KB' | 'MB' | 'GB' | 'TB';

type CpuSpecifications = {
  socket: string; // LGA 1200, AM4, etc.
  frequency: number; // 3.6 GHz, 4.2 GHz, etc.
  cores: number; // 6 cores, 8 cores, etc.
  l1Cache: string; // 384, 512, etc.
  l1CacheUnit: MemoryUnit; // KB, etc.
  l2Cache: string; // 1.5, 2, etc.
  l2CacheUnit: MemoryUnit; // MB, etc.
  l3Cache: string; // 12, 16, etc.
  l3CacheUnit: MemoryUnit; // MB, etc.
  wattage: number; // 65 W, 95 W, etc.
};

type GpuSpecifications = {
  chipset: string; // NVIDIA GeForce RTX 3080, AMD Radeon RX 6800 XT, etc.
  memory: number; // 10 GB, 16 GB, etc.
  memoryUnit: MemoryUnit; // GB, etc.
  coreClock: number; // 1440 MHz, 1770 MHz, etc.
  boostClock: number; // 1710 MHz, 2250 MHz, etc.
  tdp: number; // 320 W, 350 W, etc.
};

type MotherboardFormFactor =
  | 'ATX'
  | 'Micro ATX'
  | 'Mini ITX'
  | 'E-ATX'
  | 'XL-ATX';
type MemoryType = 'DDR5' | 'DDR4' | 'DDR3' | 'DDR2' | 'DDR';
type MotherboardSpecifications = {
  socket: string; // LGA 1200, AM4, etc.
  chipset: string; // Intel Z490, AMD B550, etc.
  formFactor: MotherboardFormFactor; // ATX, Micro ATX, etc.
  memoryMax: number; // 128, 256, etc.
  memoryMaxUnit: MemoryUnit; // GB, etc.
  memorySlots: number; // 4, 8, etc.
  memoryType: MemoryType; // DDR4, etc.
  sataPorts: number; // 6, 8, etc.
  m2Slots: number; // 2, 3, etc.
  pcie3Slots: number; // 2, 3, etc.
  pcie4Slots: number; // 1, 2, etc.
  pcie5Slots: number; // 0, 1, etc.
};

type RamSpecifications = {
  dataRate: number; // 3200 MT/s, 3600 MT/s, etc.
  modulesQuantity: number;
  modulesCapacity: number;
  modulesCapacityUnit: MemoryUnit; // GB, etc.
  ramType: MemoryType; // DDR4, etc.
  color: string; // Black, White, etc.
  voltage: number; // 1.35 V, etc.
  timing: string; // 16-18-18-38, etc.
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
type StorageSpecifications = {
  storageType: StorageType; // SSD, HDD, etc.
  capacity: number; // 1, 2, etc.
  capacityUnit: MemoryUnit; // TB, etc.
  cache: number; // 64 MB, 128 MB, etc.
  cacheUnit: MemoryUnit; // MB, etc.
  formFactor: StorageFormFactor; // 2.5", M.2 2280, etc.
  interface: StorageInterface; // SATA III, PCIe 3.0 x4, etc.
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
type PsuSpecifications = {
  wattage: number; // 650 W, 750 W, etc.
  efficiency: PsuEfficiency; // 80+ Gold, 80+ Platinum, etc.
  formFactor: PsuFormFactor; // ATX, SFX, etc.
  modularity: PsuModularity; // Full, Semi, etc.
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
type CaseSpecifications = {
  caseType: CaseType; // Mid Tower, Full Tower, etc.
  color: string; // Black, White, etc.
  sidePanel: CaseSidePanel; // windowed or not
};

type DisplayPanelType = 'IPS' | 'TN' | 'VA' | 'OLED' | 'QLED' | 'Other';

type DisplaySpecifications = {
  size: number; // 24", 27", etc.
  horizontalResolution: number;
  verticalResolution: number;
  refreshRate: number; // 144 Hz, 165 Hz, etc.
  panelType: DisplayPanelType; // IPS, TN, etc.
  responseTime: number; // 1 ms, 4 ms, etc.
  aspectRatio: string; // 16:9, 21:9, etc.
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
type PeripheralsInterface = 'USB' | 'Bluetooth' | 'PS/2' | 'Other';
type KeyboardSpecifications = {
  switch: KeyboardSwitch; // Cherry MX Red, Cherry MX Blue, etc.
  layout: KeyboardLayout; // ANSI, ISO, etc.
  backlight: KeyboardBacklight; // RGB, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type MouseSensor = 'Optical' | 'Laser' | 'Infrared' | 'Other';
type MouseSpecifications = {
  sensor: MouseSensor; // Optical, Laser, etc.
  dpi: number; // 800, 1600, etc.
  buttons: number; // 6, 8, etc.
  color: string; // Black, White, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type HeadphoneType = 'Over-ear' | 'On-ear' | 'In-ear' | 'Other';
type HeadphoneInterface =
  | 'USB'
  | 'Bluetooth'
  | '3.5 mm'
  | '2.5 mm'
  | 'MMCX'
  | 'Other';
type HeadphoneSpecifications = {
  headphoneType: HeadphoneType; // Over-ear, On-ear, etc.
  driver: number; // 50 mm, 53 mm, etc.
  frequencyResponse: string; // 20 Hz - 20 kHz, etc.
  impedance: number; // 32 Ohm, 64 Ohm, etc.
  color: string; // Black, White, etc.
  interface: HeadphoneInterface; // USB, Bluetooth, etc.
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
type SpeakerSpecifications = {
  speakerType: SpeakerType; // 2.0, 2.1, etc.
  totalWattage: number; // 10 W, 20 W, etc.
  frequencyResponse: string; // 20 Hz - 20 kHz, etc.
  color: string; // Black, White, etc.
  interface: SpeakerInterface; // USB, Bluetooth, etc.
};

type MobileOs = 'Android' | 'iOS' | 'Windows' | 'Linux' | 'Other';
type SmartphoneSpecifications = {
  os: MobileOs; // Android, iOS, etc.
  chipset: string; // Snapdragon 888, Apple A14 Bionic, etc.
  display: number; // 6.7", 6.9", etc.
  horizontalResolution: number;
  verticalResolution: number;
  ramCapacity: number; // 12, 16, etc.
  ramCapacityUnit: MemoryUnit; // GB, etc.
  storage: number; // 128 GB, 256 GB, etc.
  battery: number; // 5000 mAh, 6000 mAh, etc.
  camera: string; // 108 MP, 64 MP, etc.
  color: string; // Black, White, etc.
};

type TabletSpecifications = SmartphoneSpecifications;

type AccessorySpecifications = {
  accessoryType: string; // Headphones, Speakers, etc.
  color: string; // Black, White, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type Specifications = {
  desktopComputer?: DesktopComputerSpecifications;
  laptop?: LaptopSpecifications;
  cpu?: CpuSpecifications;
  gpu?: GpuSpecifications;
  motherboard?: MotherboardSpecifications;
  ram?: RamSpecifications;
  storage?: StorageSpecifications;
  psu?: PsuSpecifications;
  case?: CaseSpecifications;
  display?: DisplaySpecifications;
  keyboard?: KeyboardSpecifications;
  mouse?: MouseSpecifications;
  headphone?: HeadphoneSpecifications;
  speaker?: SpeakerSpecifications;
  smartphone?: SmartphoneSpecifications;
  tablet?: TabletSpecifications;
  accessory?: AccessorySpecifications;
};

type DimensionUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft';
type WeightUnit = 'g' | 'kg' | 'lb';

type WebcamResolution = '720p' | '1080p' | '1440p' | '4K' | 'Other';
type WebcamFrameRate = '30 fps' | '60 fps' | '120 fps' | '240 fps' | 'Other';
type WebcamInterface = 'USB' | 'Bluetooth' | 'Other';
type WebcamMicrophone = 'Yes' | 'No';

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

type ProductReview = {
  userId: string;
  username: string;
  rating: number;
  review: string;
};

type MerchandiseAvailability =
  | 'In Stock'
  | 'Out of Stock'
  | 'Pre-order'
  | 'Discontinued'
  | 'Other';

// /**
//  * @description used to keep track of the currently selected additional field index for each product category.
//  * - consumed in the validation useEffect to
//  */
// type CurrentlySelectedAdditionalFieldObj = {
//   Accessories: number;
//   'Central Processing Units (CPUs)': number;
//   'Computer Cases': number;
//   'Desktop Computers': {
//     cpu: number;
//     gpu: number;
//     motherboard: number;
//     ram: number;
//     storage: number;
//     psu: number;
//     case: number;
//     display: number;
//     keyboard: number;
//     mouse: number;
//     speaker: number;
//   };
//   'Graphics Processing Units (GPUs)': number;
//   Headphones: number;
//   Keyboards: number;
//   Laptops: {
//     cpu: number;
//     gpu: number;
//     ram: number;
//     storage: number;
//     display: number;
//   };
//   'Memory(RAM)': number;
//   Mice: number;
//   Microphones: number;
//   Displays: number;
//   Motherboards: number;
//   'Power Supplies': number;
//   Smartphones: number;
//   Speakers: number;
//   Storage: number;
//   Tablets: number;
//   Webcams: number;
// };

type ProductSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsDashboard;

  // page 1
  brand: string;
  model: string;
  description: string;
  price: string;
  currency: Currency;
  availability: MerchandiseAvailability;
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

  // page 2
  productCategory: ProductCategory;
  specifications: Specifications;

  // page 3
  reviews: ProductReview[];
  uploadedFilesIds: string[];
};

type ProductDocument = ProductSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateProductState = {
  // page 1

  // page 1 -> brand
  brand: string;
  isBrandValid: boolean;
  isBrandFocused: boolean;
  // page 1 -> model
  model: string;
  isModelValid: boolean;
  isModelFocused: boolean;
  // page 1 -> description
  description: string;
  isDescriptionValid: boolean;
  isDescriptionFocused: boolean;
  // page 1 -> price, currency, availability, quantity
  price: string;
  isPriceValid: boolean;
  isPriceFocused: boolean;
  currency: Currency;
  availability: MerchandiseAvailability;
  quantity: string;
  isQuantityValid: boolean;
  isQuantityFocused: boolean;
  // page 1 -> weight
  weight: string;
  isWeightValid: boolean;
  isWeightFocused: boolean;
  weightUnit: WeightUnit;
  // page 1 -> dimensions
  dimensionLength: string;
  isDimensionLengthValid: boolean;
  isDimensionLengthFocused: boolean;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: string;
  isDimensionWidthValid: boolean;
  isDimensionWidthFocused: boolean;
  dimensionWidthUnit: DimensionUnit;
  dimensionHeight: string;
  isDimensionHeightValid: boolean;
  isDimensionHeightFocused: boolean;
  dimensionHeightUnit: DimensionUnit;
  // page 1 -> additional comments
  additionalComments: string;
  isAdditionalCommentsValid: boolean;
  isAdditionalCommentsFocused: boolean;

  // page 2

  // page 2 -> product category
  productCategory: ProductCategory;

  // page 2 -> specifications

  // page 2 -> specifications -> cpu
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
  cpuFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areCpuFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areCpuFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> gpu
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
  gpuFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areGpuFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areGpuFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> motherboard
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
  motherboardFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areMotherboardFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areMotherboardFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> ram
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
  ramFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areRamFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areRamFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> storage
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
  storageFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areStorageFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areStorageFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> psu
  psuWattage: string;
  isPsuWattageValid: boolean;
  isPsuWattageFocused: boolean;
  psuEfficiency: PsuEfficiency;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  arePsuFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  arePsuFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> case
  caseType: CaseType;
  caseColor: string;
  isCaseColorValid: boolean;
  isCaseColorFocused: boolean;
  caseSidePanel: CaseSidePanel;
  caseFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areCaseFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areCaseFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> display
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
  displayFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areDisplayFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areDisplayFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> keyboard
  keyboardSwitch: KeyboardSwitch;
  keyboardLayout: KeyboardLayout;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;
  keyboardFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areKeyboardFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areKeyboardFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> mouse
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
  mouseFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areMouseFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areMouseFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> headphone
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
  headphoneFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areHeadphoneFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areHeadphoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> speaker
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
  speakerFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areSpeakerFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areSpeakerFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> smartphone
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
  smartphoneFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areSmartphoneFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areSmartphoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> tablet
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
  tabletFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areTabletFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areTabletFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> accessory
  accessoryType: string;
  isAccessoryTypeValid: boolean;
  isAccessoryTypeFocused: boolean;
  accessoryColor: string;
  isAccessoryColorValid: boolean;
  isAccessoryColorFocused: boolean;
  accessoryInterface: PeripheralsInterface;
  accessoryFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areAccessoryFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areAccessoryFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> webcam
  webcamResolution: WebcamResolution;
  webcamInterface: WebcamInterface;
  webcamMicrophone: WebcamMicrophone;
  webcamFrameRate: WebcamFrameRate;
  webcamColor: string;
  isWebcamColorValid: boolean;
  isWebcamColorFocused: boolean;
  webcamFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areWebcamFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areWebcamFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 2 -> specifications -> microphone
  microphoneType: MicrophoneType;
  microphonePolarPattern: MicrophonePolarPattern;
  microphoneInterface: MicrophoneInterface;
  microphoneColor: string;
  isMicrophoneColorValid: boolean;
  isMicrophoneColorFocused: boolean;
  microphoneFrequencyResponse: string;
  isMicrophoneFrequencyResponseValid: boolean;
  isMicrophoneFrequencyResponseFocused: boolean;
  microphoneFieldsAdditional: Map<number, [string, string]>; // Map<index, [name, value]>
  areMicrophoneFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isNameValid, isValueValid]>
  areMicrophoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isNameFocused, isValueFocused]>

  // page 3
  imgFormDataArray: FormData[];
  areImagesValid: boolean;

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

type CreateProductAction = {
  // page 1
  // page 1 -> brand
  setBrand: 'setBrand';
  setIsBrandValid: 'setIsBrandValid';
  setIsBrandFocused: 'setIsBrandFocused';
  // page 1 -> model, product category
  setModel: 'setModel';
  setIsModelValid: 'setIsModelValid';
  setIsModelFocused: 'setIsModelFocused';
  setProductCategory: 'setProductCategory';
  // page 1 -> description
  setDescription: 'setDescription';
  setIsDescriptionValid: 'setIsDescriptionValid';
  setIsDescriptionFocused: 'setIsDescriptionFocused';
  // page 1 -> price, currency, availability
  setPrice: 'setPrice';
  setIsPriceValid: 'setIsPriceValid';
  setIsPriceFocused: 'setIsPriceFocused';
  setCurrency: 'setCurrency';
  setAvailability: 'setAvailability';
  // page 1 -> quantity
  setQuantity: 'setQuantity';
  setIsQuantityValid: 'setIsQuantityValid';
  setIsQuantityFocused: 'setIsQuantityFocused';
  // page 1 -> weight
  setWeight: 'setWeight';
  setIsWeightValid: 'setIsWeightValid';
  setIsWeightFocused: 'setIsWeightFocused';
  setWeightUnit: 'setWeightUnit';
  // page 1 -> dimensions
  setDimensionLength: 'setDimensionLength';
  setIsDimensionLengthValid: 'setIsDimensionLengthValid';
  setIsDimensionLengthFocused: 'setIsDimensionLengthFocused';
  setDimensionLengthUnit: 'setDimensionLengthUnit';
  setDimensionWidth: 'setDimensionWidth';
  setIsDimensionWidthValid: 'setIsDimensionWidthValid';
  setIsDimensionWidthFocused: 'setIsDimensionWidthFocused';
  setDimensionWidthUnit: 'setDimensionWidthUnit';
  setDimensionHeight: 'setDimensionHeight';
  setIsDimensionHeightValid: 'setIsDimensionHeightValid';
  setIsDimensionHeightFocused: 'setIsDimensionHeightFocused';
  setDimensionHeightUnit: 'setDimensionHeightUnit';
  // page 1 -> additional comments
  setAdditionalComments: 'setAdditionalComments';
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  // page 2

  // page 2 -> specifications

  // page 2 -> specifications -> cpu
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
  setCpuFieldsAdditional: 'setCpuFieldsAdditional';
  setAreCpuFieldsAdditionalValid: 'setAreCpuFieldsAdditionalValid';
  setAreCpuFieldsAdditionalFocused: 'setAreCpuFieldsAdditionalFocused';

  // page 2 -> specifications -> gpu
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
  setGpuFieldsAdditional: 'setGpuFieldsAdditional';
  setAreGpuFieldsAdditionalValid: 'setAreGpuFieldsAdditionalValid';
  setAreGpuFieldsAdditionalFocused: 'setAreGpuFieldsAdditionalFocused';

  // page 2 -> specifications -> motherboard
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
  setMotherboardFieldsAdditional: 'setMotherboardFieldsAdditional';
  setAreMotherboardFieldsAdditionalValid: 'setAreMotherboardFieldsAdditionalValid';
  setAreMotherboardFieldsAdditionalFocused: 'setAreMotherboardFieldsAdditionalFocused';

  // page 2 -> specifications -> ram
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
  setRamFieldsAdditional: 'setRamFieldsAdditional';
  setAreRamFieldsAdditionalValid: 'setAreRamFieldsAdditionalValid';
  setAreRamFieldsAdditionalFocused: 'setAreRamFieldsAdditionalFocused';

  // page 2 -> specifications -> storage
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
  setStorageFieldsAdditional: 'setStorageFieldsAdditional';
  setAreStorageFieldsAdditionalValid: 'setAreStorageFieldsAdditionalValid';
  setAreStorageFieldsAdditionalFocused: 'setAreStorageFieldsAdditionalFocused';

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage';
  setIsPsuWattageValid: 'setIsPsuWattageValid';
  setIsPsuWattageFocused: 'setIsPsuWattageFocused';
  setPsuEfficiency: 'setPsuEfficiency';
  setPsuFormFactor: 'setPsuFormFactor';
  setPsuModularity: 'setPsuModularity';
  setPsuFieldsAdditional: 'setPsuFieldsAdditional';
  setArePsuFieldsAdditionalValid: 'setArePsuFieldsAdditionalValid';
  setArePsuFieldsAdditionalFocused: 'setArePsuFieldsAdditionalFocused';

  // page 2 -> specifications -> case
  setCaseType: 'setCaseType';
  setCaseColor: 'setCaseColor';
  setIsCaseColorValid: 'setIsCaseColorValid';
  setIsCaseColorFocused: 'setIsCaseColorFocused';
  setCaseSidePanel: 'setCaseSidePanel';
  setCaseFieldsAdditional: 'setCaseFieldsAdditional';
  setAreCaseFieldsAdditionalValid: 'setAreCaseFieldsAdditionalValid';
  setAreCaseFieldsAdditionalFocused: 'setAreCaseFieldsAdditionalFocused';

  // page 2 -> specifications -> display
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
  setDisplayFieldsAdditional: 'setDisplayFieldsAdditional';
  setAreDisplayFieldsAdditionalValid: 'setAreDisplayFieldsAdditionalValid';
  setAreDisplayFieldsAdditionalFocused: 'setAreDisplayFieldsAdditionalFocused';

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch';
  setKeyboardLayout: 'setKeyboardLayout';
  setKeyboardBacklight: 'setKeyboardBacklight';
  setKeyboardInterface: 'setKeyboardInterface';
  setKeyboardFieldsAdditional: 'setKeyboardFieldsAdditional';
  setAreKeyboardFieldsAdditionalValid: 'setAreKeyboardFieldsAdditionalValid';
  setAreKeyboardFieldsAdditionalFocused: 'setAreKeyboardFieldsAdditionalFocused';

  // page 2 -> specifications -> mouse
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
  setMouseFieldsAdditional: 'setMouseFieldsAdditional';
  setAreMouseFieldsAdditionalValid: 'setAreMouseFieldsAdditionalValid';
  setAreMouseFieldsAdditionalFocused: 'setAreMouseFieldsAdditionalFocused';

  // page 2 -> specifications -> headphone
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
  setHeadphoneFieldsAdditional: 'setHeadphoneFieldsAdditional';
  setAreHeadphoneFieldsAdditionalValid: 'setAreHeadphoneFieldsAdditionalValid';
  setAreHeadphoneFieldsAdditionalFocused: 'setAreHeadphoneFieldsAdditionalFocused';

  // page 2 -> specifications -> speaker
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
  setSpeakerFieldsAdditional: 'setSpeakerFieldsAdditional';
  setAreSpeakerFieldsAdditionalValid: 'setAreSpeakerFieldsAdditionalValid';
  setAreSpeakerFieldsAdditionalFocused: 'setAreSpeakerFieldsAdditionalFocused';

  // page 2 -> specifications -> smartphone
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
  setSmartphoneFieldsAdditional: 'setSmartphoneFieldsAdditional';
  setAreSmartphoneFieldsAdditionalValid: 'setAreSmartphoneFieldsAdditionalValid';
  setAreSmartphoneFieldsAdditionalFocused: 'setAreSmartphoneFieldsAdditionalFocused';

  // page 2 -> specifications -> tablet
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
  setTabletFieldsAdditional: 'setTabletFieldsAdditional';
  setAreTabletFieldsAdditionalValid: 'setAreTabletFieldsAdditionalValid';
  setAreTabletFieldsAdditionalFocused: 'setAreTabletFieldsAdditionalFocused';

  // page 2 -> specifications -> accessory
  setAccessoryType: 'setAccessoryType';
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid';
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused';
  setAccessoryColor: 'setAccessoryColor';
  setIsAccessoryColorValid: 'setIsAccessoryColorValid';
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused';
  setAccessoryInterface: 'setAccessoryInterface';
  setAccessoryFieldsAdditional: 'setAccessoryFieldsAdditional';
  setAreAccessoryFieldsAdditionalValid: 'setAreAccessoryFieldsAdditionalValid';
  setAreAccessoryFieldsAdditionalFocused: 'setAreAccessoryFieldsAdditionalFocused';

  // page 2 -> specifications -> webcam
  setWebcamResolution: 'setWebcamResolution';
  setWebcamInterface: 'setWebcamInterface';
  setWebcamMicrophone: 'setWebcamMicrophone';
  setWebcamFrameRate: 'setWebcamFrameRate';
  setWebcamColor: 'setWebcamColor';
  setIsWebcamColorValid: 'setIsWebcamColorValid';
  setIsWebcamColorFocused: 'setIsWebcamColorFocused';
  setWebcamFieldsAdditional: 'setWebcamFieldsAdditional';
  setAreWebcamFieldsAdditionalValid: 'setAreWebcamFieldsAdditionalValid';
  setAreWebcamFieldsAdditionalFocused: 'setAreWebcamFieldsAdditionalFocused';

  // page 2 -> specifications -> microphone
  setMicrophoneType: 'setMicrophoneType';
  setMicrophonePolarPattern: 'setMicrophonePolarPattern';
  setMicrophoneInterface: 'setMicrophoneInterface';
  setMicrophoneColor: 'setMicrophoneColor';
  setIsMicrophoneColorValid: 'setIsMicrophoneColorValid';
  setIsMicrophoneColorFocused: 'setIsMicrophoneColorFocused';
  setMicrophoneFrequencyResponse: 'setMicrophoneFrequencyResponse';
  setIsMicrophoneFrequencyResponseValid: 'setIsMicrophoneFrequencyResponseValid';
  setIsMicrophoneFrequencyResponseFocused: 'setIsMicrophoneFrequencyResponseFocused';
  setMicrophoneFieldsAdditional: 'setMicrophoneFieldsAdditional';
  setAreMicrophoneFieldsAdditionalValid: 'setAreMicrophoneFieldsAdditionalValid';
  setAreMicrophoneFieldsAdditionalFocused: 'setAreMicrophoneFieldsAdditionalFocused';

  // page 3
  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';

  // misc.
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

type AdditionalFieldsPayload =
  | {
      operation: 'add';
      data: [string, string];
    }
  | {
      operation: 'remove';
      index: number;
    }
  | {
      operation: 'update';
      kind: 'key' | 'value';
      index: number;
      data: string;
    };

type AdditionalFieldsValidFocusedPayload =
  | {
      operation: 'add';
      data: [boolean, boolean];
    }
  | {
      operation: 'remove';
      index: number;
    }
  | {
      operation: 'update';
      kind: 'key' | 'value';
      index: number;
      data: boolean;
    };

type CreateProductDispatch =
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
  | {
      type: CreateProductAction['setProductCategory'];
      payload: ProductCategory;
    }
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
  | {
      type: CreateProductAction['setCurrency'];
      payload: Currency;
    }
  | {
      type: CreateProductAction['setAvailability'];
      payload: MerchandiseAvailability;
    }
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
  | {
      type: CreateProductAction['setWeightUnit'];
      payload: WeightUnit;
    }
  | {
      type: CreateProductAction['setDimensionLength'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDimensionLengthFocused']
        | CreateProductAction['setIsDimensionLengthValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDimensionLengthUnit'];
      payload: DimensionUnit;
    }
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
  | {
      type: CreateProductAction['setDimensionWidthUnit'];
      payload: DimensionUnit;
    }
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
  | {
      type: CreateProductAction['setDimensionHeightUnit'];
      payload: DimensionUnit;
    }
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
  // page 2
  // specifications
  // specifications -> cpu
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
      type: CreateProductAction['setCpuFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCpuFieldsAdditionalValid']
        | CreateProductAction['setAreCpuFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> gpu
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
      type: CreateProductAction['setGpuFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreGpuFieldsAdditionalValid']
        | CreateProductAction['setAreGpuFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> motherboard
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
      type: CreateProductAction['setMotherboardFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMotherboardFieldsAdditionalValid']
        | CreateProductAction['setAreMotherboardFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> ram
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
      type: CreateProductAction['setRamFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreRamFieldsAdditionalValid']
        | CreateProductAction['setAreRamFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> storage
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
      type: CreateProductAction['setStorageFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreStorageFieldsAdditionalValid']
        | CreateProductAction['setAreStorageFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> psu
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
      type: CreateProductAction['setPsuFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setArePsuFieldsAdditionalValid']
        | CreateProductAction['setArePsuFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> case
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
      type: CreateProductAction['setCaseFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCaseFieldsAdditionalValid']
        | CreateProductAction['setAreCaseFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> display
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
      type: CreateProductAction['setDisplayFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreDisplayFieldsAdditionalValid']
        | CreateProductAction['setAreDisplayFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> keyboard
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
      type: CreateProductAction['setKeyboardFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreKeyboardFieldsAdditionalValid']
        | CreateProductAction['setAreKeyboardFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> mouse
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
      type: CreateProductAction['setMouseFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMouseFieldsAdditionalValid']
        | CreateProductAction['setAreMouseFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> headphone
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
      type: CreateProductAction['setHeadphoneFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreHeadphoneFieldsAdditionalValid']
        | CreateProductAction['setAreHeadphoneFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> speaker
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
      type: CreateProductAction['setSpeakerFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSpeakerFieldsAdditionalValid']
        | CreateProductAction['setAreSpeakerFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> smartphone
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
      type: CreateProductAction['setSmartphoneFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSmartphoneFieldsAdditionalValid']
        | CreateProductAction['setAreSmartphoneFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> tablet
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
      type: CreateProductAction['setTabletFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreTabletFieldsAdditionalValid']
        | CreateProductAction['setAreTabletFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> accessory
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
      type: CreateProductAction['setAccessoryFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreAccessoryFieldsAdditionalValid']
        | CreateProductAction['setAreAccessoryFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> webcam
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
      type: CreateProductAction['setWebcamFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreWebcamFieldsAdditionalValid']
        | CreateProductAction['setAreWebcamFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // specifications -> microphone
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
      type: CreateProductAction['setMicrophoneFieldsAdditional'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMicrophoneFieldsAdditionalValid']
        | CreateProductAction['setAreMicrophoneFieldsAdditionalFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // page 3
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
  //
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
  AccessorySpecifications,
  AdditionalFieldsPayload,
  AdditionalFieldsValidFocusedPayload,
  CaseSidePanel,
  CaseSpecifications,
  CaseType,
  CpuSpecifications,
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
  DesktopComputerSpecifications,
  DimensionUnit,
  DisplayPanelType,
  DisplaySpecifications,
  GpuSpecifications,
  HeadphoneInterface,
  HeadphoneSpecifications,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSpecifications,
  KeyboardSwitch,
  LaptopSpecifications,
  MemoryType,
  MemoryUnit,
  MerchandiseAvailability,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardFormFactor,
  MotherboardSpecifications,
  MouseSensor,
  MouseSpecifications,
  PeripheralsInterface,
  ProductDocument,
  ProductReview,
  ProductSchema,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  PsuSpecifications,
  RamSpecifications,
  SmartphoneSpecifications,
  SpeakerInterface,
  SpeakerSpecifications,
  SpeakerType,
  Specifications,
  StorageFormFactor,
  StorageInterface,
  StorageSpecifications,
  StorageType,
  TabletSpecifications,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
  WeightUnit,
};
