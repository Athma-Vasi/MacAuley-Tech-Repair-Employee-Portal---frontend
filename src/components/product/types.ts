import { Action, Currency, SetStepsInErrorPayload, User } from '../../types';
import { ActionsDashboard } from '../../types/actions.types';
import { ProductCategory } from '../dashboard/types';

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

type ProductReview = {
  userId: string;
  username: string;
  rating: number;
  review: string;
};

type ProductAvailability =
  | 'In Stock'
  | 'Out of Stock'
  | 'Pre-order'
  | 'Discontinued'
  | 'Other';

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
  availability: ProductAvailability;
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

  // page 2 -> specifications -> gpu
  gpuChipset: string;
  isGpuChipsetValid: boolean;
  isGpuChipsetFocused: boolean;
  gpuMemoryCapacity: number;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuCoreClock: number;
  gpuBoostClock: number;
  gpuTdp: number;

  // page 2 -> specifications -> motherboard
  motherboardSocket: string;
  isMotherboardSocketValid: boolean;
  isMotherboardSocketFocused: boolean;
  motherboardChipset: string;
  isMotherboardChipsetValid: boolean;
  isMotherboardChipsetFocused: boolean;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardMemoryMaxCapacity: number;
  motherboardMemoryMaxCapacityUnit: MemoryUnit;
  motherboardMemorySlots: number;
  motherboardMemoryType: MemoryType;
  motherboardSataPorts: number;
  motherboardM2Slots: number;
  motherboardPcie3Slots: number;
  motherboardPcie4Slots: number;
  motherboardPcie5Slots: number;

  // page 2 -> specifications -> ram
  ramDataRate: number;
  ramModulesQuantity: number;
  ramModulesCapacity: number;
  ramModulesCapacityUnit: MemoryUnit;
  ramType: MemoryType;
  ramColor: string;
  isRamColorValid: boolean;
  isRamColorFocused: boolean;
  ramVoltage: number;
  ramTiming: string;
  isRamTimingValid: boolean;
  isRamTimingFocused: boolean;

  // page 2 -> specifications -> storage
  storageType: StorageType;
  storageCapacity: number;
  storageCapacityUnit: MemoryUnit;
  storageCacheCapacity: number;
  storageCacheCapacityUnit: MemoryUnit;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;

  // page 2 -> specifications -> psu
  psuWattage: number;
  psuEfficiency: PsuEfficiency;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;

  // page 2 -> specifications -> case
  caseType: CaseType;
  caseColor: string;
  isCaseColorValid: boolean;
  isCaseColorFocused: boolean;
  caseSidePanel: CaseSidePanel;

  // page 2 -> specifications -> display
  displaySize: number; // inches
  displayResolutionHorizontal: number;
  displayResolutionVertical: number;
  displayRefreshRate: number;
  displayPanelType: DisplayPanelType;
  displayResponseTime: number;
  displayAspectRatio: string;
  isDisplayAspectRatioValid: boolean;
  isDisplayAspectRatioFocused: boolean;

  // page 2 -> specifications -> keyboard
  keyboardSwitch: KeyboardSwitch;
  keyboardLayout: KeyboardLayout;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;

  // page 2 -> specifications -> mouse
  mouseSensor: MouseSensor;
  mouseDpi: number;
  mouseButtons: number;
  mouseColor: string;
  isMouseColorValid: boolean;
  isMouseColorFocused: boolean;
  mouseInterface: PeripheralsInterface;

  // page 2 -> specifications -> headphone
  headphoneType: HeadphoneType;
  headphoneDriver: number;
  headphoneFrequencyResponse: string;
  isHeadphoneFrequencyResponseValid: boolean;
  isHeadphoneFrequencyResponseFocused: boolean;
  headphoneImpedance: number;
  headphoneColor: string;
  isHeadphoneColorValid: boolean;
  isHeadphoneColorFocused: boolean;
  headphoneInterface: HeadphoneInterface;

  // page 2 -> specifications -> speaker
  speakerType: SpeakerType;
  speakerTotalWattage: number;
  speakerFrequencyResponse: string;
  isSpeakerFrequencyResponseValid: boolean;
  isSpeakerFrequencyResponseFocused: boolean;
  speakerColor: string;
  isSpeakerColorValid: boolean;
  isSpeakerColorFocused: boolean;
  speakerInterface: SpeakerInterface;

  // page 2 -> specifications -> smartphone
  smartphoneOs: MobileOs;
  smartphoneChipset: string;
  isSmartphoneChipsetValid: boolean;
  isSmartphoneChipsetFocused: boolean;
  smartphoneDisplay: number;
  smartphoneResolutionHorizontal: number;
  smartphoneResolutionVertical: number;
  smartphoneRamCapacity: number;
  smartphoneRamCapacityUnit: MemoryUnit;
  smartphoneStorageCapacity: number; // GB
  smartphoneBatteryCapacity: number; // mAh
  smartphoneCamera: string; // 108 MP, 64 MP, etc.
  isSmartphoneCameraValid: boolean;
  isSmartphoneCameraFocused: boolean;
  smartphoneColor: string;
  isSmartphoneColorValid: boolean;
  isSmartphoneColorFocused: boolean;

  // page 2 -> specifications -> tablet
  tabletOs: MobileOs;
  tabletChipset: string;
  isTabletChipsetValid: boolean;
  isTabletChipsetFocused: boolean;
  tabletDisplay: number;
  tabletResolutionHorizontal: number;
  tabletResolutionVertical: number;
  tabletRamCapacity: number;
  tabletRamCapacityUnit: MemoryUnit;
  tabletStorageCapacity: number; // GB
  tabletBatteryCapacity: number; // mAh
  tabletCamera: string; // 108 MP, 64 MP, etc.
  isTabletCameraValid: boolean;
  isTabletCameraFocused: boolean;
  tabletColor: string;
  isTabletColorValid: boolean;
  isTabletColorFocused: boolean;

  // page 2 -> specifications -> accessory
  accessoryType: string;
  isAccessoryTypeValid: boolean;
  isAccessoryTypeFocused: boolean;
  accessoryColor: string;
  isAccessoryColorValid: boolean;
  isAccessoryColorFocused: boolean;
  accessoryInterface: PeripheralsInterface;
  accessoryFieldsAdditional: Map<number, [string, string]>; // Map<index, [field, value]>
  areAccessoryFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isFieldValid, isValueValid]>
  areAccessoryFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isFieldFocused, isValueFocused]>

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

  // page 2 -> specifications -> gpu
  setGpuChipset: 'setGpuChipset';
  setIsGpuChipsetValid: 'setIsGpuChipsetValid';
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused';
  setGpuMemoryCapacity: 'setGpuMemoryCapacity';
  setGpuMemoryCapacityUnit: 'setGpuMemoryCapacityUnit';
  setGpuCoreClock: 'setGpuCoreClock';
  setGpuBoostClock: 'setGpuBoostClock';
  setGpuTdp: 'setGpuTdp';

  // page 2 -> specifications -> motherboard
  setMotherboardSocket: 'setMotherboardSocket';
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid';
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused';
  setMotherboardChipset: 'setMotherboardChipset';
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid';
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused';
  setMotherboardFormFactor: 'setMotherboardFormFactor';
  setMotherboardMemoryMaxCapacity: 'setMotherboardMemoryMaxCapacity';
  setMotherboardMemoryMaxCapacityUnit: 'setMotherboardMemoryMaxCapacityUnit';
  setMotherboardMemorySlots: 'setMotherboardMemorySlots';
  setMotherboardMemoryType: 'setMotherboardMemoryType';
  setMotherboardSataPorts: 'setMotherboardSataPorts';
  setMotherboardM2Slots: 'setMotherboardM2Slots';
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots';
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots';
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots';

  // page 2 -> specifications -> ram
  setRamDataRate: 'setRamDataRate';
  setRamModulesQuantity: 'setRamModulesQuantity';
  setRamModulesCapacity: 'setRamModulesCapacity';
  setRamModulesCapacityUnit: 'setRamModulesCapacityUnit';
  setRamType: 'setRamType';
  setRamColor: 'setRamColor';
  setIsRamColorValid: 'setIsRamColorValid';
  setIsRamColorFocused: 'setIsRamColorFocused';
  setRamVoltage: 'setRamVoltage';
  setRamTiming: 'setRamTiming';
  setIsRamTimingValid: 'setIsRamTimingValid';
  setIsRamTimingFocused: 'setIsRamTimingFocused';

  // page 2 -> specifications -> storage
  setStorageType: 'setStorageType';
  setStorageCapacity: 'setStorageCapacity';
  setStorageCapacityUnit: 'setStorageCapacityUnit';
  setStorageCacheCapacity: 'setStorageCacheCapacity';
  setStorageCacheCapacityUnit: 'setStorageCacheCapacityUnit';
  setStorageFormFactor: 'setStorageFormFactor';
  setStorageInterface: 'setStorageInterface';

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage';
  setPsuEfficiency: 'setPsuEfficiency';
  setPsuFormFactor: 'setPsuFormFactor';
  setPsuModularity: 'setPsuModularity';

  // page 2 -> specifications -> case
  setCaseType: 'setCaseType';
  setCaseColor: 'setCaseColor';
  setIsCaseColorValid: 'setIsCaseColorValid';
  setIsCaseColorFocused: 'setIsCaseColorFocused';
  setCaseSidePanel: 'setCaseSidePanel';

  // page 2 -> specifications -> display
  setDisplaySize: 'setDisplaySize';
  setDisplayResolutionHorizontal: 'setDisplayResolutionHorizontal';
  setDisplayResolutionVertical: 'setDisplayResolutionVertical';
  setDisplayRefreshRate: 'setDisplayRefreshRate';
  setDisplayPanelType: 'setDisplayPanelType';
  setDisplayResponseTime: 'setDisplayResponseTime';
  setDisplayAspectRatio: 'setDisplayAspectRatio';
  setIsDisplayAspectRatioValid: 'setIsDisplayAspectRatioValid';
  setIsDisplayAspectRatioFocused: 'setIsDisplayAspectRatioFocused';

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch';
  setKeyboardLayout: 'setKeyboardLayout';
  setKeyboardBacklight: 'setKeyboardBacklight';
  setKeyboardInterface: 'setKeyboardInterface';

  // page 2 -> specifications -> mouse
  setMouseSensor: 'setMouseSensor';
  setMouseDpi: 'setMouseDpi';
  setMouseButtons: 'setMouseButtons';
  setMouseColor: 'setMouseColor';
  setIsMouseColorValid: 'setIsMouseColorValid';
  setIsMouseColorFocused: 'setIsMouseColorFocused';
  setMouseInterface: 'setMouseInterface';

  // page 2 -> specifications -> headphone
  setHeadphoneType: 'setHeadphoneType';
  setHeadphoneDriver: 'setHeadphoneDriver';
  setHeadphoneFrequencyResponse: 'setHeadphoneFrequencyResponse';
  setIsHeadphoneFrequencyResponseValid: 'setIsHeadphoneFrequencyResponseValid';
  setIsHeadphoneFrequencyResponseFocused: 'setIsHeadphoneFrequencyResponseFocused';
  setHeadphoneImpedance: 'setHeadphoneImpedance';
  setHeadphoneColor: 'setHeadphoneColor';
  setIsHeadphoneColorValid: 'setIsHeadphoneColorValid';
  setIsHeadphoneColorFocused: 'setIsHeadphoneColorFocused';
  setHeadphoneInterface: 'setHeadphoneInterface';

  // page 2 -> specifications -> speaker
  setSpeakerType: 'setSpeakerType';
  setSpeakerTotalWattage: 'setSpeakerTotalWattage';
  setSpeakerFrequencyResponse: 'setSpeakerFrequencyResponse';
  setIsSpeakerFrequencyResponseValid: 'setIsSpeakerFrequencyResponseValid';
  setIsSpeakerFrequencyResponseFocused: 'setIsSpeakerFrequencyResponseFocused';
  setSpeakerColor: 'setSpeakerColor';
  setIsSpeakerColorValid: 'setIsSpeakerColorValid';
  setIsSpeakerColorFocused: 'setIsSpeakerColorFocused';
  setSpeakerInterface: 'setSpeakerInterface';

  // page 2 -> specifications -> smartphone
  setSmartphoneOs: 'setSmartphoneOs';
  setSmartphoneChipset: 'setSmartphoneChipset';
  setIsSmartphoneChipsetValid: 'setIsSmartphoneChipsetValid';
  setIsSmartphoneChipsetFocused: 'setIsSmartphoneChipsetFocused';
  setSmartphoneDisplay: 'setSmartphoneDisplay';
  setSmartphoneResolutionHorizontal: 'setSmartphoneResolutionHorizontal';
  setSmartphoneResolutionVertical: 'setSmartphoneResolutionVertical';
  setSmartphoneRamCapacity: 'setSmartphoneRamCapacity';
  setSmartphoneRamCapacityUnit: 'setSmartphoneRamCapacityUnit';
  setSmartphoneStorageCapacity: 'setSmartphoneStorageCapacity';
  setSmartphoneBatteryCapacity: 'setSmartphoneBatteryCapacity';
  setSmartphoneCamera: 'setSmartphoneCamera';
  setIsSmartphoneCameraValid: 'setIsSmartphoneCameraValid';
  setIsSmartphoneCameraFocused: 'setIsSmartphoneCameraFocused';
  setSmartphoneColor: 'setSmartphoneColor';
  setIsSmartphoneColorValid: 'setIsSmartphoneColorValid';
  setIsSmartphoneColorFocused: 'setIsSmartphoneColorFocused';

  // page 2 -> specifications -> tablet
  setTabletOs: 'setTabletOs';
  setTabletChipset: 'setTabletChipset';
  setIsTabletChipsetValid: 'setIsTabletChipsetValid';
  setIsTabletChipsetFocused: 'setIsTabletChipsetFocused';
  setTabletDisplay: 'setTabletDisplay';
  setTabletResolutionHorizontal: 'setTabletResolutionHorizontal';
  setTabletResolutionVertical: 'setTabletResolutionVertical';
  setTabletRamCapacity: 'setTabletRamCapacity';
  setTabletRamCapacityUnit: 'setTabletRamCapacityUnit';
  setTabletStorageCapacity: 'setTabletStorageCapacity';
  setTabletBatteryCapacity: 'setTabletBatteryCapacity';
  setTabletCamera: 'setTabletCamera';
  setIsTabletCameraValid: 'setIsTabletCameraValid';
  setIsTabletCameraFocused: 'setIsTabletCameraFocused';
  setTabletColor: 'setTabletColor';
  setIsTabletColorValid: 'setIsTabletColorValid';
  setIsTabletColorFocused: 'setIsTabletColorFocused';

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
  setCurrentlySelectedAdditionalFieldIndex: 'setCurrentlySelectedAdditionalFieldIndex';

  // page 3
  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';

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
      payload: ProductAvailability;
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
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuMemoryCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setGpuCoreClock'];
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuBoostClock'];
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuTdp'];
      payload: number;
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
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMaxCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setMotherboardMemorySlots'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setMotherboardSataPorts'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardM2Slots'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardPcie3Slots'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardPcie4Slots'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMotherboardPcie5Slots'];
      payload: number;
    }
  // specifications -> ram
  | {
      type: CreateProductAction['setRamDataRate'];
      payload: number;
    }
  | {
      type: CreateProductAction['setRamModulesQuantity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setRamModulesCapacity'];
      payload: number;
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
      payload: number;
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
  // specifications -> storage
  | {
      type: CreateProductAction['setStorageType'];
      payload: StorageType;
    }
  | {
      type: CreateProductAction['setStorageCapacity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setStorageCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setStorageCacheCapacity'];
      payload: number;
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
  // specifications -> psu
  | {
      type: CreateProductAction['setPsuWattage'];
      payload: number;
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
  // specifications -> display
  | {
      type: CreateProductAction['setDisplaySize'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDisplayResolutionHorizontal'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDisplayResolutionVertical'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDisplayRefreshRate'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDisplayPanelType'];
      payload: DisplayPanelType;
    }
  | {
      type: CreateProductAction['setDisplayResponseTime'];
      payload: number;
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
  // specifications -> mouse
  | {
      type: CreateProductAction['setMouseSensor'];
      payload: MouseSensor;
    }
  | {
      type: CreateProductAction['setMouseDpi'];
      payload: number;
    }
  | {
      type: CreateProductAction['setMouseButtons'];
      payload: number;
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
  // specifications -> headphone
  | {
      type: CreateProductAction['setHeadphoneType'];
      payload: HeadphoneType;
    }
  | {
      type: CreateProductAction['setHeadphoneDriver'];
      payload: number;
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
      payload: number;
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
  // specifications -> speaker
  | {
      type: CreateProductAction['setSpeakerType'];
      payload: SpeakerType;
    }
  | {
      type: CreateProductAction['setSpeakerTotalWattage'];
      payload: number;
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
      payload: number;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionHorizontal'];
      payload: number;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionVertical'];
      payload: number;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setSmartphoneStorageCapacity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setSmartphoneBatteryCapacity'];
      payload: number;
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
      payload: number;
    }
  | {
      type: CreateProductAction['setTabletResolutionHorizontal'];
      payload: number;
    }
  | {
      type: CreateProductAction['setTabletResolutionVertical'];
      payload: number;
    }
  | {
      type: CreateProductAction['setTabletRamCapacity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setTabletRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setTabletStorageCapacity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setTabletBatteryCapacity'];
      payload: number;
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
  | {
      type: CreateProductAction['setCurrentlySelectedAdditionalFieldIndex'];
      payload: number;
    }
  // page 3
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
  MobileOs,
  MotherboardFormFactor,
  MotherboardSpecifications,
  MouseSensor,
  MouseSpecifications,
  PeripheralsInterface,
  ProductAvailability,
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
  WeightUnit,
};
