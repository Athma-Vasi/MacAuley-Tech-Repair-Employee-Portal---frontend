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

type MemoryUnits = 'KB' | 'MB' | 'GB' | 'TB';
type ClockFrequencyUnits = 'MHz' | 'GHz';

type CpuSpecifications = {
  socket: string; // LGA 1200, AM4, etc.
  speed: string; // 3.6 GHz, 4.2 GHz, etc.
  cores: string; // 6 cores, 8 cores, etc.
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

type MotherboardSpecifications = {
  socket: string; // LGA 1200, AM4, etc.
  chipset: string; // Intel Z490, AMD B550, etc.
  formFactor: string; // ATX, Micro ATX, etc.
  memoryMax: string; // 128 GB, 256 GB, etc.
  memorySlots: string; // 4, 8, etc.
  memoryType: string; // DDR4, etc.
  sataPorts: string; // 6, 8, etc.
  m2Slots: string; // 2, 3, etc.
  pcie3Slots: string; // 2, 3, etc.
  pcie4Slots: string; // 1, 2, etc.
};

type RamType = 'DDR5' | 'DDR4' | 'DDR3' | 'DDR2' | 'DDR';
type RamSpecifications = {
  speed: string; // 3200 MHz, 3600 MHz, etc.
  modules: string; // 2 x 8 GB, 4 x 8 GB, etc.
  ramType: RamType; // DDR4, etc.
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
  cpuSpeed: number;
  cpuCores: number;
  cpuL1Cache: number;
  cpuL1CacheUnits: Omit<MemoryUnits, 'TB' | 'GB'>;
  cpuL2Cache: number;
  cpuL2CacheUnits: Omit<MemoryUnits, 'TB' | 'GB'>;
  cpuL3Cache: number;
  cpuL3CacheUnits: Omit<MemoryUnits, 'TB' | 'GB'>;
  cpuWattage: number;

  // specifications -> gpu
  gpuChipset: string;
  isGpuChipsetValid: boolean;
  isGpuChipsetFocused: boolean;
  gpuMemory: number;
  gpuMemoryUnits: Omit<MemoryUnits, 'TB'>;
  gpuCoreClock: number;
  gpuCoreClockUnits: ClockFrequencyUnits;
  gpuBoostClock: number;
  gpuBoostClockUnits: ClockFrequencyUnits;
  gpuTdp: number;

  // specifications -> motherboard

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
  setCpuCores: 'setCpuCores';
  setCpuL1Cache: 'setCpuL1Cache';
  setCpuL1CacheUnits: 'setCpuL1CacheUnits';
  setCpuL2Cache: 'setCpuL2Cache';
  setCpuL2CacheUnits: 'setCpuL2CacheUnits';
  setCpuL3Cache: 'setCpuL3Cache';
  setCpuL3CacheUnits: 'setCpuL3CacheUnits';
  setCpuWattage: 'setCpuWattage';

  // specifications -> gpu
  setGpuChipset: 'setGpuChipset';
  setIsGpuChipsetValid: 'setIsGpuChipsetValid';
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused';
  setGpuMemory: 'setGpuMemory';
  setGpuMemoryUnits: 'setGpuMemoryUnits';
  setGpuCoreClock: 'setGpuCoreClock';
  setGpuCoreClockUnits: 'setGpuCoreClockUnits';
  setGpuBoostClock: 'setGpuBoostClock';
  setGpuBoostClockUnits: 'setGpuBoostClockUnits';
  setGpuTdp: 'setGpuTdp';

  // specifications -> motherboard

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
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuCores'];
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuL1Cache'];
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuL1CacheUnits'];
      payload: Omit<MemoryUnits, 'TB' | 'GB'>;
    }
  | {
      type: CreateProductAction['setCpuL2Cache'];
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuL2CacheUnits'];
      payload: Omit<MemoryUnits, 'TB' | 'GB'>;
    }
  | {
      type: CreateProductAction['setCpuL3Cache'];
      payload: number;
    }
  | {
      type: CreateProductAction['setCpuL3CacheUnits'];
      payload: Omit<MemoryUnits, 'TB' | 'GB'>;
    }
  | {
      type: CreateProductAction['setCpuWattage'];
      payload: number;
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
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuMemoryUnits'];
      payload: Omit<MemoryUnits, 'TB'>;
    }
  | {
      type: CreateProductAction['setGpuCoreClock'];
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuCoreClockUnits'];
      payload: ClockFrequencyUnits;
    }
  | {
      type: CreateProductAction['setGpuBoostClock'];
      payload: number;
    }
  | {
      type: CreateProductAction['setGpuBoostClockUnits'];
      payload: ClockFrequencyUnits;
    }
  | {
      type: CreateProductAction['setGpuTdp'];
      payload: number;
    }
  // specifications -> motherboard

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
  GpuSpecifications,
  HeadphoneInterface,
  HeadphoneSpecifications,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSpecifications,
  KeyboardSwitch,
  MonitorSpecifications,
  MotherboardSpecifications,
  MouseSensor,
  MouseSpecifications,
  PeripheralsInterface,
  CreateProductAction,
  ProductDimensions,
  CreateProductDispatch,
  ProductDocument,
  ProductReview,
  ProductSchema,
  CreateProductState,
  PsuEfficiency,
  PsuModular,
  PsuSpecifications,
  RamSpecifications,
  RamType,
  SmartphoneSpecifications,
  SpeakerSpecifications,
  Specifications,
  StorageFormFactor,
  StorageInterface,
  StorageSpecifications,
  StorageType,
  TabletSpecifications,
};
