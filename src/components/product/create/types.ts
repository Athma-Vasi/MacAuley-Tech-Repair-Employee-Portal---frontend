import { Action, Currency } from '../../../types';
import { ActionsDashboard } from '../../../types/actions.types';
import { ProductCategory } from '../../dashboard/types';

type ColorVariant =
  | 'Black'
  | 'White'
  | 'Silver'
  | 'Gold'
  | 'Space Gray'
  | 'Blue'
  | 'Green'
  | 'Red';

type MemoryUnit = 'KB' | 'MB' | 'GB' | 'TB';
type ClockFrequencyUnit = 'MHz' | 'GHz';

type CpuSpecifications = {
  socket: string; // LGA 1200, AM4, etc.
  speed: string; // 3.6 GHz, 4.2 GHz, etc.
  cores: number; // 6 cores, 8 cores, etc.
  l1Cache: string; // 384 KB, 512 KB, etc.
  l2Cache: string; // 3 MB, 4 MB, etc.
  l3Cache: string; // 12 MB, 16 MB, etc.
  wattage: string; // 65 W, 95 W, etc.
};

type GpuSpecifications = {
  chipset: string; // NVIDIA GeForce RTX 3080, AMD Radeon RX 6800 XT, etc.
  memory: string; // 10 GB, 16 GB, etc.
  coreClock: string; // 1440 MHz, 1770 MHz, etc.
  boostClock: string; // 1710 MHz, 2250 MHz, etc.
  tdp: string; // 320 W, 350 W, etc.
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
  memoryMax: string; // 128 GB, 256 GB, etc.
  memorySlots: number; // 4, 8, etc.
  memoryType: MemoryType; // DDR4, etc.
  sataPorts: number; // 6, 8, etc.
  m2Slots: number; // 2, 3, etc.
  pcie3Slots: number; // 2, 3, etc.
  pcie4Slots: number; // 1, 2, etc.
  pcie5Slots: number; // 0, 1, etc.
};

type RamSpecifications = {
  speed: string; // 3200 MHz, 3600 MHz, etc.
  modules: string; // 2 x 8 GB, 4 x 8 GB, etc.
  ramType: MemoryType; // DDR4, etc.
  color: ColorVariant; // Black, White, etc.
  voltage: string; // 1.35 V, etc.
  timing: string; // 16-18-18-38, etc.
};

type StorageType = 'SSD' | 'HDD' | 'SSHD' | 'NVMe SSD' | 'SATA SSD' | 'M.2 SSD';
type StorageFormFactor =
  | '2.5"'
  | 'M.2 2280'
  | 'M.2 22110'
  | 'M.2 2242'
  | 'M.2 2230';
type StorageInterface =
  | 'SATA III'
  | 'PCIe 3.0 x4'
  | 'PCIe 4.0 x4'
  | 'PCIe 3.0 x2'
  | 'PCIe 3.0 x1';
type StorageSpecifications = {
  storageType: StorageType; // SSD, HDD, etc.
  capacity: string; // 1 TB, 2 TB, etc.
  cache: string; // 64 MB, 128 MB, etc.
  formFactor: StorageFormFactor; // 2.5", M.2 2280, etc.
  interface: StorageInterface; // SATA III, PCIe 3.0 x4, etc.
};

type PsuEfficiency =
  | '80+ Bronze'
  | '80+ Gold'
  | '80+ Platinum'
  | '80+ Titanium';
type PsuModular = 'Full' | 'Semi' | 'None';
type PsuSpecifications = {
  wattage: string; // 650 W, 750 W, etc.
  efficiency: PsuEfficiency; // 80+ Gold, 80+ Platinum, etc.
  modular: PsuModular; // Full, Semi, etc.
};

type CaseType =
  | 'Mid Tower'
  | 'Full Tower'
  | 'Mini Tower'
  | 'Cube'
  | 'Slim'
  | 'Desktop';
type CaseSidePanel = 'Windowed' | 'Solid';
type CaseSpecifications = {
  caseType: CaseType; // Mid Tower, Full Tower, etc.
  color: ColorVariant; // Black, White, etc.
  sidePanel: CaseSidePanel; // windowed or not
};

type MonitorPanelType = 'IPS' | 'TN' | 'VA';
type MonitorSpecifications = {
  size: string; // 24", 27", etc.
  resolution: string; // 1920 x 1080, 2560 x 1440, etc.
  refreshRate: string; // 144 Hz, 165 Hz, etc.
  panelType: MonitorPanelType; // IPS, TN, etc.
  responseTime: string; // 1 ms, 4 ms, etc.
  aspectRatio: string; // 16:9, 21:9, etc.
};

type KeyboardSwitch =
  | 'Cherry MX Red'
  | 'Cherry MX Blue'
  | 'Cherry MX Brown'
  | 'Cherry MX Speed'
  | 'Cherry MX Black'
  | 'Membrane';
type KeyboardLayout = 'ANSI' | 'ISO';
type KeyboardBacklight = 'RGB' | 'Single Color';
type PeripheralsInterface = 'USB' | 'Bluetooth';
type KeyboardSpecifications = {
  switch: KeyboardSwitch; // Cherry MX Red, Cherry MX Blue, etc.
  layout: KeyboardLayout; // ANSI, ISO, etc.
  backlight: KeyboardBacklight; // RGB, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type MouseSensor = 'Optical' | 'Laser' | 'Infrared';
type MouseSpecifications = {
  sensor: MouseSensor; // Optical, Laser, etc.
  dpi: string; // 800, 1600, etc.
  buttons: string; // 6, 8, etc.
  color: ColorVariant; // Black, White, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type HeadphoneType = 'Over-ear' | 'On-ear' | 'In-ear';
type HeadphoneInterface = 'USB' | 'Bluetooth' | '3.5 mm' | '2.5 mm';
type HeadphoneSpecifications = {
  headphoneType: HeadphoneType; // Over-ear, On-ear, etc.
  driver: string; // 50 mm, 53 mm, etc.
  frequencyResponse: string; // 20 Hz - 20 kHz, etc.
  impedance: string; // 32 Ohm, 64 Ohm, etc.
  color: ColorVariant; // Black, White, etc.
  interface: HeadphoneInterface; // USB, Bluetooth, etc.
};

type SpeakerType = '2.0' | '2.1' | '5.1' | '7.1';
type SpeakerInterface = HeadphoneInterface;
type SpeakerSpecifications = {
  speakerType: SpeakerType; // 2.0, 2.1, etc.
  totalWattage: string; // 10 W, 20 W, etc.
  frequencyResponse: string; // 20 Hz - 20 kHz, etc.
  color: ColorVariant; // Black, White, etc.
  interface: SpeakerInterface; // USB, Bluetooth, etc.
};

type SmartphoneSpecifications = {
  os: string; // Android, iOS, etc.
  chipset: string; // Snapdragon 888, Apple A14 Bionic, etc.
  display: string; // 6.7", 6.9", etc.
  resolution: string; // 1440 x 3200, 1170 x 2532, etc.
  ram: string; // 12 GB, 16 GB, etc.
  storage: string; // 128 GB, 256 GB, etc.
  battery: string; // 5000 mAh, 6000 mAh, etc.
  camera: string; // 108 MP, 64 MP, etc.
  color: ColorVariant; // Black, White, etc.
};

type TabletSpecifications = SmartphoneSpecifications;

type AccessorySpecifications = {
  accessoryType: string; // Headphones, Speakers, etc.
  color: ColorVariant; // Black, White, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};

type Specifications = {
  cpu?: CpuSpecifications;
  gpu?: GpuSpecifications;
  motherboard?: MotherboardSpecifications;
  ram?: RamSpecifications;
  storage?: StorageSpecifications;
  psu?: PsuSpecifications;
  case?: CaseSpecifications;
  monitor?: MonitorSpecifications;
  keyboard?: KeyboardSpecifications;
  mouse?: MouseSpecifications;
  headphone?: HeadphoneSpecifications;
  speaker?: SpeakerSpecifications;
  smartphone?: SmartphoneSpecifications;
  tablet?: TabletSpecifications;
  accessory?: AccessorySpecifications;
};

type DimensionUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft';
type ProductDimensions = {
  length: string;
  width: string;
  height: string;
};

type ProductReview = {
  userId: string;
  username: string;
  rating: number;
  review: string;
};

type ProductSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsDashboard;

  // page 1
  brand: string;
  model: string;
  productCategory: ProductCategory;
  description: string;
  price: string;
  currency: Currency;
  availability: boolean;
  quantity: number;
  weight: string;
  dimensions: ProductDimensions;
  additionalComments: string;

  // page 2
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
  productCategory: ProductCategory;
  // page 1 -> description
  description: string;
  isDescriptionValid: boolean;
  isDescriptionFocused: boolean;
  // page 1 -> price
  price: string;
  isPriceValid: boolean;
  isPriceFocused: boolean;
  currency: Currency;
  availability: boolean;
  quantity: number;
  // page 1 -> weight
  weight: string;
  isWeightValid: boolean;
  isWeightFocused: boolean;
  // page 1 -> dimensions
  dimensionLength: number;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: number;
  dimensionWidthUnit: DimensionUnit;
  dimensionHeight: number;
  dimensionHeightUnit: DimensionUnit;
  // page 1 -> additional comments
  additionalComments: string;
  isAdditionalCommentsValid: boolean;
  isAdditionalCommentsFocused: boolean;

  // page 2

  // specifications

  // specifications -> cpu
  cpuSocket: string;
  isCpuSocketValid: boolean;
  isCpuSocketFocused: boolean;
  cpuSpeed: string;
  isCpuSpeedValid: boolean;
  isCpuSpeedFocused: boolean;
  cpuCores: number;
  cpuL1Cache: string;
  isCpuL1CacheValid: boolean;
  isCpuL1CacheFocused: boolean;
  cpuL2Cache: string;
  isCpuL2CacheValid: boolean;
  isCpuL2CacheFocused: boolean;
  cpuL3Cache: string;
  isCpuL3CacheValid: boolean;
  isCpuL3CacheFocused: boolean;
  cpuWattage: string;
  isCpuWattageValid: boolean;
  isCpuWattageFocused: boolean;

  // specifications -> gpu
  gpuChipset: string;
  isGpuChipsetValid: boolean;
  isGpuChipsetFocused: boolean;
  gpuMemory: string;
  isGpuMemoryValid: boolean;
  isGpuMemoryFocused: boolean;
  gpuCoreClock: string;
  isGpuCoreClockValid: boolean;
  isGpuCoreClockFocused: boolean;
  gpuBoostClock: string;
  isGpuBoostClockValid: boolean;
  isGpuBoostClockFocused: boolean;
  gpuTdp: string;
  isGpuTdpValid: boolean;
  isGpuTdpFocused: boolean;

  // specifications -> motherboard
  motherboardSocket: string;
  isMotherboardSocketValid: boolean;
  isMotherboardSocketFocused: boolean;
  motherboardChipset: string;
  isMotherboardChipsetValid: boolean;
  isMotherboardChipsetFocused: boolean;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardMemoryMax: string;
  isMotherboardMemoryMaxValid: boolean;
  isMotherboardMemoryMaxFocused: boolean;
  motherboardMemorySlots: number;
  motherboardMemoryType: MemoryType;
  motherboardSataPorts: number;
  motherboardM2Slots: number;
  motherboardPcie3Slots: number;
  motherboardPcie4Slots: number;
  motherboardPcie5Slots: number;

  // specifications -> ram
  ramSpeed: string;
  isRamSpeedValid: boolean;
  isRamSpeedFocused: boolean;
  ramModules: string; // 2 x 8 GB, 4 x 8 GB, etc.
  isRamModulesValid: boolean;
  isRamModulesFocused: boolean;
  ramType: MemoryType;
  ramColor: ColorVariant;
  ramVoltage: string;
  isRamVoltageValid: boolean;
  isRamVoltageFocused: boolean;
  ramTiming: string;
  isRamTimingValid: boolean;
  isRamTimingFocused: boolean;

  // specifications -> storage
  storageType: StorageType;
  storageCapacity: string;
  isStorageCapacityValid: boolean;
  isStorageCapacityFocused: boolean;
  storageCache: string;
  isStorageCacheValid: boolean;
  isStorageCacheFocused: boolean;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;

  // page 3
  imgFormDataArray: FormData[];
  areImagesValid: boolean;
};

type CreateProductAction = {
  // page 1
  setBrand: 'setBrand';
  setIsBrandValid: 'setIsBrandValid';
  setIsBrandFocused: 'setIsBrandFocused';
  setModel: 'setModel';
  setIsModelValid: 'setIsModelValid';
  setIsModelFocused: 'setIsModelFocused';
  setProductCategory: 'setProductCategory';
  setDescription: 'setDescription';
  setIsDescriptionValid: 'setIsDescriptionValid';
  setIsDescriptionFocused: 'setIsDescriptionFocused';
  setPrice: 'setPrice';
  setIsPriceValid: 'setIsPriceValid';
  setIsPriceFocused: 'setIsPriceFocused';
  setCurrency: 'setCurrency';
  setAvailability: 'setAvailability';
  setQuantity: 'setQuantity';
  setWeight: 'setWeight';
  setIsWeightValid: 'setIsWeightValid';
  setIsWeightFocused: 'setIsWeightFocused';
  setDimensionLength: 'setDimensionLength';
  setDimensionLengthUnit: 'setDimensionLengthUnit';
  setDimensionWidth: 'setDimensionWidth';
  setDimensionWidthUnit: 'setDimensionWidthUnit';
  setDimensionHeight: 'setDimensionHeight';
  setDimensionHeightUnit: 'setDimensionHeightUnit';
  setAdditionalComments: 'setAdditionalComments';
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  // page 2

  // specifications

  // specifications -> cpu
  setCpuSocket: 'setCpuSocket';
  setIsCpuSocketValid: 'setIsCpuSocketValid';
  setIsCpuSocketFocused: 'setIsCpuSocketFocused';
  setCpuSpeed: 'setCpuSpeed';
  setIsCpuSpeedValid: 'setIsCpuSpeedValid';
  setIsCpuSpeedFocused: 'setIsCpuSpeedFocused';
  setCpuCores: 'setCpuCores';
  setCpuL1Cache: 'setCpuL1Cache';
  setIsCpuL1CacheValid: 'setIsCpuL1CacheValid';
  setIsCpuL1CacheFocused: 'setIsCpuL1CacheFocused';
  setCpuL2Cache: 'setCpuL2Cache';
  setIsCpuL2CacheValid: 'setIsCpuL2CacheValid';
  setIsCpuL2CacheFocused: 'setIsCpuL2CacheFocused';
  setCpuL3Cache: 'setCpuL3Cache';
  setIsCpuL3CacheValid: 'setIsCpuL3CacheValid';
  setIsCpuL3CacheFocused: 'setIsCpuL3CacheFocused';
  setCpuWattage: 'setCpuWattage';
  setIsCpuWattageValid: 'setIsCpuWattageValid';
  setIsCpuWattageFocused: 'setIsCpuWattageFocused';

  // specifications -> gpu
  setGpuChipset: 'setGpuChipset';
  setIsGpuChipsetValid: 'setIsGpuChipsetValid';
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused';
  setGpuMemory: 'setGpuMemory';
  setIsGpuMemoryValid: 'setIsGpuMemoryValid';
  setIsGpuMemoryFocused: 'setIsGpuMemoryFocused';
  setGpuCoreClock: 'setGpuCoreClock';
  setIsGpuCoreClockValid: 'setIsGpuCoreClockValid';
  setIsGpuCoreClockFocused: 'setIsGpuCoreClockFocused';
  setGpuBoostClock: 'setGpuBoostClock';
  setIsGpuBoostClockValid: 'setIsGpuBoostClockValid';
  setIsGpuBoostClockFocused: 'setIsGpuBoostClockFocused';
  setGpuTdp: 'setGpuTdp';
  setIsGpuTdpValid: 'setIsGpuTdpValid';
  setIsGpuTdpFocused: 'setIsGpuTdpFocused';

  // specifications -> motherboard
  setMotherboardSocket: 'setMotherboardSocket';
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid';
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused';
  setMotherboardChipset: 'setMotherboardChipset';
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid';
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused';
  setMotherboardFormFactor: 'setMotherboardFormFactor';
  setMotherboardMemoryMax: 'setMotherboardMemoryMax';
  setIsMotherboardMemoryMaxValid: 'setIsMotherboardMemoryMaxValid';
  setIsMotherboardMemoryMaxFocused: 'setIsMotherboardMemoryMaxFocused';
  setMotherboardMemorySlots: 'setMotherboardMemorySlots';
  setMotherboardMemoryType: 'setMotherboardMemoryType';
  setMotherboardSataPorts: 'setMotherboardSataPorts';
  setMotherboardM2Slots: 'setMotherboardM2Slots';
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots';
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots';
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots';

  // specifications -> ram
  setRamSpeed: 'setRamSpeed';
  setIsRamSpeedValid: 'setIsRamSpeedValid';
  setIsRamSpeedFocused: 'setIsRamSpeedFocused';
  setRamModules: 'setRamModules';
  setIsRamModulesValid: 'setIsRamModulesValid';
  setIsRamModulesFocused: 'setIsRamModulesFocused';
  setRamType: 'setRamType';
  setRamColor: 'setRamColor';
  setRamVoltage: 'setRamVoltage';
  setIsRamVoltageValid: 'setIsRamVoltageValid';
  setIsRamVoltageFocused: 'setIsRamVoltageFocused';
  setRamTiming: 'setRamTiming';
  setIsRamTimingValid: 'setIsRamTimingValid';
  setIsRamTimingFocused: 'setIsRamTimingFocused';

  // specifications -> storage
  setStorageType: 'setStorageType';
  setStorageCapacity: 'setStorageCapacity';
  setIsStorageCapacityValid: 'setIsStorageCapacityValid';
  setIsStorageCapacityFocused: 'setIsStorageCapacityFocused';
  setStorageCache: 'setStorageCache';
  setIsStorageCacheValid: 'setIsStorageCacheValid';
  setIsStorageCacheFocused: 'setIsStorageCacheFocused';
  setStorageFormFactor: 'setStorageFormFactor';
  setStorageInterface: 'setStorageInterface';

  // page 3
  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';
};

type CreateProductDispatch =
  | {
      type: CreateProductAction['setBrand'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsBrandValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsBrandFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setModel'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsModelValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsModelFocused'];
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
      type: CreateProductAction['setIsDescriptionValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsDescriptionFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setPrice'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsPriceValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsPriceFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCurrency'];
      payload: Currency;
    }
  | {
      type: CreateProductAction['setAvailability'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setQuantity'];
      payload: number;
    }
  | {
      type: CreateProductAction['setWeight'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsWeightValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsWeightFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDimensionLength'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDimensionLengthUnit'];
      payload: DimensionUnit;
    }
  | {
      type: CreateProductAction['setDimensionWidth'];
      payload: number;
    }
  | {
      type: CreateProductAction['setDimensionWidthUnit'];
      payload: DimensionUnit;
    }
  | {
      type: CreateProductAction['setDimensionHeight'];
      payload: number;
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
      type: CreateProductAction['setIsAdditionalCommentsValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsAdditionalCommentsFocused'];
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
      type: CreateProductAction['setIsCpuSocketValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuSpeed'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsCpuSpeedValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuSpeedFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuCores'];
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuL1Cache'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsCpuL1CacheValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuL1CacheFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuL2Cache'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsCpuL2CacheValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuL2CacheFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuL3Cache'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsCpuL3CacheValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuL3CacheFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuWattage'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsCpuWattageValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsCpuWattageFocused'];
      payload: boolean;
    }
  // specifications -> gpu
  | {
      type: CreateProductAction['setGpuChipset'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsGpuChipsetValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsGpuChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuMemory'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsGpuMemoryValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsGpuMemoryFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuCoreClock'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsGpuCoreClockValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsGpuCoreClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuBoostClock'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsGpuBoostClockValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsGpuBoostClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuTdp'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsGpuTdpValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsGpuTdpFocused'];
      payload: boolean;
    }
  // specifications -> motherboard
  | {
      type: CreateProductAction['setMotherboardSocket'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsMotherboardSocketValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsMotherboardSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardChipset'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsMotherboardChipsetValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsMotherboardChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardFormFactor'];
      payload: MotherboardFormFactor;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMax'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsMotherboardMemoryMaxValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsMotherboardMemoryMaxFocused'];
      payload: boolean;
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
      type: CreateProductAction['setRamSpeed'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsRamSpeedValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsRamSpeedFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModules'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsRamModulesValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsRamModulesFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setRamColor'];
      payload: ColorVariant;
    }
  | {
      type: CreateProductAction['setRamVoltage'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsRamVoltageValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsRamVoltageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamTiming'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsRamTimingValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsRamTimingFocused'];
      payload: boolean;
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
      type: CreateProductAction['setIsStorageCapacityValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageCache'];
      payload: string;
    }
  | {
      type: CreateProductAction['setIsStorageCacheValid'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setIsStorageCacheFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageFormFactor'];
      payload: StorageFormFactor;
    }
  | {
      type: CreateProductAction['setStorageInterface'];
      payload: StorageInterface;
    }
  // page 3
  | {
      type: CreateProductAction['setImgFormDataArray'];
      payload: FormData[];
    }
  | {
      type: CreateProductAction['setAreImagesValid'];
      payload: boolean;
    };

export type {
  AccessorySpecifications,
  CaseSidePanel,
  CaseSpecifications,
  CaseType,
  ColorVariant,
  CpuSpecifications,
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
  GpuSpecifications,
  HeadphoneInterface,
  HeadphoneSpecifications,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSpecifications,
  KeyboardSwitch,
  MemoryType,
  MonitorSpecifications,
  MotherboardFormFactor,
  MotherboardSpecifications,
  MouseSensor,
  MouseSpecifications,
  PeripheralsInterface,
  ProductDimensions,
  ProductDocument,
  ProductReview,
  ProductSchema,
  PsuEfficiency,
  PsuModular,
  PsuSpecifications,
  RamSpecifications,
  SmartphoneSpecifications,
  SpeakerSpecifications,
  Specifications,
  StorageFormFactor,
  StorageInterface,
  StorageSpecifications,
  StorageType,
  TabletSpecifications,
};
