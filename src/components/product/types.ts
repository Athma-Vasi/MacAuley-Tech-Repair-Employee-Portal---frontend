import { Currency, FileUploadDocument } from "../../types";
import { ProductCategory } from "../dashboard/types";





type ProductAvailability =
  | "In Stock"
  | "Out of Stock"
  | "Pre-order"
  | "Discontinued"
  | "Other";

type DimensionUnit = "mm" | "cm" | "m" | "in" | "ft";
type WeightUnit = "g" | "kg" | "lb";

type RatingKind =
  | "halfStar"
  | "oneStar"
  | "oneAndHalfStars"
  | "twoStars"
  | "twoAndHalfStars"
  | "threeStars"
  | "threeAndHalfStars"
  | "fourStars"
  | "fourAndHalfStars"
  | "fiveStars";

type ProductReviewSchema = {
  userId: string; 
  username: string; 
  productId: string;
  productCategory: ProductCategory;
  productSku: string;
  productBrand: string;
  productModel: string;
  productReview: string;
  productRating: RatingKind;
  helpfulVotes: number;
  unhelpfulVotes: number;
  isVerifiedPurchase: boolean;
};

type ProductReviewDocument = ProductReviewSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type MemoryType = "DDR5" | "DDR4" | "DDR3" | "DDR2" | "DDR";
type MemoryUnit = "KB" | "MB" | "GB" | "TB";

type PeripheralsInterface = "USB" | "Bluetooth" | "PS/2" | "Wi-Fi" | "Other";

type MobileOs = "Android" | "iOS" | "Windows" | "Linux" | "Other";

type ProductServerResponse<Doc extends Record<string, any> = Record<string, any>> =
  Doc & {
    fileUploads: FileUploadDocument[];
  };

type ProductCategoryPage1Specifications = {
  sku: string[];
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
  halfStar: number;
  oneStar: number;
  oneAndHalfStars: number;
  twoStars: number;
  twoAndHalfStars: number;
  threeStars: number;
  threeAndHalfStars: number;
  fourStars: number;
  fourAndHalfStars: number;
  fiveStars: number;
};

/**
 * @description - Contains shared properties between all product categories.
 *  - all product categories have these properties and their own specifications
 */
type ProductCategorySpecifications = ProductCategoryPage1Specifications & {
  additionalFields: {
    [key: string]: string;
  };
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











type CpuSpecifications = {
  cpuSocket: string; 
  cpuFrequency: number; 
  cpuCores: number; 
  cpuL1Cache: number; 
  cpuL1CacheUnit: MemoryUnit; 
  cpuL2Cache: number; 
  cpuL2CacheUnit: MemoryUnit; 
  cpuL3Cache: number; 
  cpuL3CacheUnit: MemoryUnit; 
  cpuWattage: number; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
  caseType: CaseType; 
  caseColor: string; 
  caseSidePanel: CaseSidePanel; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type DisplayPanelType = "IPS" | "TN" | "VA" | "OLED" | "QLED" | "Other";

type DisplaySpecifications = {
  displaySize: number; 
  displayHorizontalResolution: number;
  displayVerticalResolution: number;
  displayRefreshRate: number; 
  displayPanelType: DisplayPanelType; 
  displayResponseTime: number; 
  displayAspectRatio: string; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type GpuSpecifications = {
  gpuChipset: string; 
  gpuMemory: number; 
  gpuMemoryUnit: MemoryUnit; 
  gpuCoreClock: number; 
  gpuBoostClock: number; 
  gpuTdp: number; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type HeadphoneType = "Over-ear" | "On-ear" | "In-ear" | "Other";
type HeadphoneInterface = "USB" | "Bluetooth" | "3.5 mm" | "2.5 mm" | "MMCX" | "Other";

type HeadphoneSpecifications = {
  headphoneType: HeadphoneType; 
  headphoneDriver: number; 
  headphoneFrequencyResponse: string; 
  headphoneImpedance: number; 
  headphoneColor: string; 
  headphoneInterface: HeadphoneInterface; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
  keyboardSwitch: KeyboardSwitch; 
  keyboardLayout: KeyboardLayout; 
  keyboardBacklight: KeyboardBacklight; 
  keyboardInterface: PeripheralsInterface; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type RamSpecifications = {
  ramDataRate: number; 
  ramModulesQuantity: number;
  ramModulesCapacity: number;
  ramModulesCapacityUnit: MemoryUnit; 
  ramType: MemoryType; 
  ramColor: string; 
  ramVoltage: number; 
  ramTiming: string; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type MicrophoneType = "Condenser" | "Dynamic" | "Ribbon" | "USB" | "Wireless" | "Other";
type MicrophonePolarPattern =
  | "Cardioid"
  | "Supercardioid"
  | "Hypercardioid"
  | "Omnidirectional"
  | "Bidirectional"
  | "Other";
type MicrophoneInterface = "XLR" | "USB" | "3.5mm" | "Wireless" | "Other";

type MicrophoneSpecifications = {
  microphoneType: MicrophoneType; 
  microphonePolarPattern: MicrophonePolarPattern; 
  microphoneFrequencyResponse: string; 
  microphoneColor: string; 
  microphoneInterface: MicrophoneInterface; 
};

type MicrophoneSchema = ProductCategorySpecifications & MicrophoneSpecifications;

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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type MotherboardFormFactor = "ATX" | "Micro ATX" | "Mini ITX" | "E-ATX" | "XL-ATX";

type MotherboardSpecifications = {
  motherboardSocket: string; 
  motherboardChipset: string; 
  motherboardFormFactor: MotherboardFormFactor; 
  motherboardMemoryMax: number; 
  motherboardMemoryMaxUnit: MemoryUnit; 
  motherboardMemorySlots: number; 
  motherboardMemoryType: MemoryType; 
  motherboardSataPorts: number; 
  motherboardM2Slots: number; 
  motherboardPcie3Slots: number; 
  motherboardPcie4Slots: number; 
  motherboardPcie5Slots: number; 
};

type MotherboardSchema = ProductCategorySpecifications & MotherboardSpecifications;

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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type MouseSensor = "Optical" | "Laser" | "Infrared" | "Other";

type MouseSpecifications = {
  mouseSensor: MouseSensor; 
  mouseDpi: number; 
  mouseButtons: number; 
  mouseColor: string; 
  mouseInterface: PeripheralsInterface; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
  psuWattage: number; 
  psuEfficiency: PsuEfficiency; 
  psuFormFactor: PsuFormFactor; 
  psuModularity: PsuModularity; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type SmartphoneSpecifications = {
  smartphoneOs: MobileOs; 
  smartphoneChipset: string; 
  smartphoneDisplay: number; 
  smartphoneHorizontalResolution: number;
  smartphoneVerticalResolution: number;
  smartphoneRamCapacity: number; 
  smartphoneRamCapacityUnit: MemoryUnit; 
  smartphoneStorage: number; 
  smartphoneBattery: number; 
  smartphoneCamera: string; 
  smartphoneColor: string; 
};

type SmartphoneSchema = ProductCategorySpecifications & SmartphoneSpecifications;

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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
  speakerType: SpeakerType; 
  speakerTotalWattage: number; 
  speakerFrequencyResponse: string; 
  speakerColor: string; 
  speakerInterface: SpeakerInterface; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





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
  storageType: StorageType; 
  storageCapacity: number; 
  storageCapacityUnit: MemoryUnit; 
  storageCache: number; 
  storageCacheUnit: MemoryUnit; 
  storageFormFactor: StorageFormFactor; 
  storageInterface: StorageInterface; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type TabletSpecifications = {
  tabletOs: MobileOs; 
  tabletChipset: string; 
  tabletDisplay: number; 
  tabletHorizontalResolution: number;
  tabletVerticalResolution: number;
  tabletRamCapacity: number; 
  tabletRamCapacityUnit: MemoryUnit; 
  tabletStorage: number; 
  tabletBattery: number; 
  tabletCamera: string; 
  tabletColor: string; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };





type WebcamResolution = "720p" | "1080p" | "1440p" | "4K" | "Other";
type WebcamFrameRate = "30 fps" | "60 fps" | "120 fps" | "240 fps" | "Other";
type WebcamInterface = "USB" | "Bluetooth" | "Wi-Fi" | "Other";
type WebcamMicrophone = "Yes" | "No";

type WebcamSpecifications = {
  webcamResolution: WebcamResolution; 
  webcamInterface: WebcamInterface; 
  webcamMicrophone: WebcamMicrophone; 
  webcamFrameRate: WebcamFrameRate; 
  webcamColor: string; 
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
    productReviewsIds: string[];
    uploadedFilesIds: string[];
  };







type AdditionalFieldsMap = Map<number, [string, string]>; 
type AdditionalFieldsValidMap = Map<number, [boolean, boolean]>; 
type AdditionalFieldsFocusedMap = Map<number, [boolean, boolean]>; isValueFocused]>

type CreateProductState = {
  
  
  

  
  brand: string;
  isBrandValid: boolean;
  isBrandFocused: boolean;
  
  model: string;
  isModelValid: boolean;
  isModelFocused: boolean;
  
  description: string;
  isDescriptionValid: boolean;
  isDescriptionFocused: boolean;
  
  price: string;
  isPriceValid: boolean;
  isPriceFocused: boolean;
  
  currency: Currency;
  
  availability: ProductAvailability;
  
  quantity: string;
  isQuantityValid: boolean;
  isQuantityFocused: boolean;
  
  weight: string;
  isWeightValid: boolean;
  isWeightFocused: boolean;
  weightUnit: WeightUnit;
  
  
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
  
  additionalComments: string;
  isAdditionalCommentsValid: boolean;
  isAdditionalCommentsFocused: boolean;

  
  
  

  
  productCategory: ProductCategory;

  
  
  
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

  
  
  
  caseType: CaseType;
  caseColor: string;
  isCaseColorValid: boolean;
  isCaseColorFocused: boolean;
  caseSidePanel: CaseSidePanel;
  caseFieldsAdditionalMap: AdditionalFieldsMap;
  areCaseFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  areCaseFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  
  
  
  displaySize: string; 
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

  
  
  
  keyboardSwitch: KeyboardSwitch;
  keyboardLayout: KeyboardLayout;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;
  keyboardFieldsAdditionalMap: AdditionalFieldsMap;
  areKeyboardFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  areKeyboardFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  
  
  
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

  
  
  
  psuWattage: string;
  isPsuWattageValid: boolean;
  isPsuWattageFocused: boolean;
  psuEfficiency: PsuEfficiency;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuFieldsAdditionalMap: AdditionalFieldsMap;
  arePsuFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  arePsuFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  
  
  
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
  smartphoneStorageCapacity: string; 
  isSmartphoneStorageCapacityValid: boolean;
  isSmartphoneStorageCapacityFocused: boolean;
  smartphoneBatteryCapacity: string; 
  isSmartphoneBatteryCapacityValid: boolean;
  isSmartphoneBatteryCapacityFocused: boolean;
  smartphoneCamera: string; 
  isSmartphoneCameraValid: boolean;
  isSmartphoneCameraFocused: boolean;
  smartphoneColor: string;
  isSmartphoneColorValid: boolean;
  isSmartphoneColorFocused: boolean;
  smartphoneFieldsAdditionalMap: AdditionalFieldsMap;
  areSmartphoneFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  areSmartphoneFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  
  
  
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
  tabletStorageCapacity: string; 
  isTabletStorageCapacityValid: boolean;
  isTabletStorageCapacityFocused: boolean;
  tabletBatteryCapacity: string; 
  isTabletBatteryCapacityValid: boolean;
  isTabletBatteryCapacityFocused: boolean;
  tabletCamera: string; 
  isTabletCameraValid: boolean;
  isTabletCameraFocused: boolean;
  tabletColor: string;
  isTabletColorValid: boolean;
  isTabletColorFocused: boolean;
  tabletFieldsAdditionalMap: AdditionalFieldsMap;
  areTabletFieldsAdditionalMapValid: AdditionalFieldsValidMap;
  areTabletFieldsAdditionalMapFocused: AdditionalFieldsFocusedMap;

  
  
  
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

  
  
  
  imgFormDataArray: FormData[];
  areImagesValid: boolean;

  
  
  
  currentlySelectedAdditionalFieldIndex: number; 
  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};







type CreateProductAction = {
  
  
  

  
  setBrand: "setBrand";
  setIsBrandValid: "setIsBrandValid";
  setIsBrandFocused: "setIsBrandFocused";
  
  setModel: "setModel";
  setIsModelValid: "setIsModelValid";
  setIsModelFocused: "setIsModelFocused";
  
  setDescription: "setDescription";
  setIsDescriptionValid: "setIsDescriptionValid";
  setIsDescriptionFocused: "setIsDescriptionFocused";
  
  setPrice: "setPrice";
  setIsPriceValid: "setIsPriceValid";
  setIsPriceFocused: "setIsPriceFocused";
  
  setCurrency: "setCurrency";
  
  setAvailability: "setAvailability";
  
  setQuantity: "setQuantity";
  setIsQuantityValid: "setIsQuantityValid";
  setIsQuantityFocused: "setIsQuantityFocused";
  
  setWeight: "setWeight";
  setIsWeightValid: "setIsWeightValid";
  setIsWeightFocused: "setIsWeightFocused";
  setWeightUnit: "setWeightUnit";
  
  
  setDimensionLength: "setDimensionLength";
  setIsDimensionLengthValid: "setIsDimensionLengthValid";
  setIsDimensionLengthFocused: "setIsDimensionLengthFocused";
  
  setDimensionLengthUnit: "setDimensionLengthUnit";
  
  setDimensionWidth: "setDimensionWidth";
  setIsDimensionWidthValid: "setIsDimensionWidthValid";
  setIsDimensionWidthFocused: "setIsDimensionWidthFocused";
  
  setDimensionWidthUnit: "setDimensionWidthUnit";
  
  setDimensionHeight: "setDimensionHeight";
  setIsDimensionHeightValid: "setIsDimensionHeightValid";
  setIsDimensionHeightFocused: "setIsDimensionHeightFocused";
  
  setDimensionHeightUnit: "setDimensionHeightUnit";
  
  setAdditionalComments: "setAdditionalComments";
  setIsAdditionalCommentsValid: "setIsAdditionalCommentsValid";
  setIsAdditionalCommentsFocused: "setIsAdditionalCommentsFocused";

  
  
  

  
  setProductCategory: "setProductCategory";

  
  
  
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

  
  
  
  setCaseType: "setCaseType";
  setCaseColor: "setCaseColor";
  setIsCaseColorValid: "setIsCaseColorValid";
  setIsCaseColorFocused: "setIsCaseColorFocused";
  setCaseSidePanel: "setCaseSidePanel";
  setCaseFieldsAdditionalMap: "setCaseFieldsAdditionalMap";
  setAreCaseFieldsAdditionalMapValid: "setAreCaseFieldsAdditionalMapValid";
  setAreCaseFieldsAdditionalMapFocused: "setAreCaseFieldsAdditionalMapFocused";

  
  
  
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

  
  
  
  setKeyboardSwitch: "setKeyboardSwitch";
  setKeyboardLayout: "setKeyboardLayout";
  setKeyboardBacklight: "setKeyboardBacklight";
  setKeyboardInterface: "setKeyboardInterface";
  setKeyboardFieldsAdditionalMap: "setKeyboardFieldsAdditionalMap";
  setAreKeyboardFieldsAdditionalMapValid: "setAreKeyboardFieldsAdditionalMapValid";
  setAreKeyboardFieldsAdditionalMapFocused: "setAreKeyboardFieldsAdditionalMapFocused";

  
  
  
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

  
  
  
  setPsuWattage: "setPsuWattage";
  setIsPsuWattageValid: "setIsPsuWattageValid";
  setIsPsuWattageFocused: "setIsPsuWattageFocused";
  setPsuEfficiency: "setPsuEfficiency";
  setPsuFormFactor: "setPsuFormFactor";
  setPsuModularity: "setPsuModularity";
  setPsuFieldsAdditionalMap: "setPsuFieldsAdditionalMap";
  setArePsuFieldsAdditionalMapValid: "setArePsuFieldsAdditionalMapValid";
  setArePsuFieldsAdditionalMapFocused: "setArePsuFieldsAdditionalMapFocused";

  
  
  
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

  
  
  
  setImgFormDataArray: "setImgFormDataArray";
  setAreImagesValid: "setAreImagesValid";

  
  
  
  setCurrentlySelectedAdditionalFieldIndex: "setCurrentlySelectedAdditionalFieldIndex";
  setTriggerFormSubmit: "setTriggerFormSubmit";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setPageInError: "setPageInError";

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
  ProductReviewDocument,
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
  RatingKind,
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
