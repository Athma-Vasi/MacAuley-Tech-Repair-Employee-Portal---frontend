import { Currency, FileUploadDocument, StepperPage } from "../../types";
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

type AccessorySpecifications = {
  accessoryType: string;
  accessoryColor: string;
  accessoryInterface: PeripheralsInterface;
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
    uploadedFilesIds: string[];
  };

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
    uploadedFilesIds: string[];
  };

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
    uploadedFilesIds: string[];
  };

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
    uploadedFilesIds: string[];
  };

type AdditionalFieldsMap = Map<
  ProductCategory,
  Array<[string, string]> // Array<[fieldName, fieldValue]>
>;

type AdditionalFieldsFormDataMap = Map<ProductCategory, FormData>;

type CreateProductState = {
  accessoryColor: string;
  accessoryInterface: PeripheralsInterface;
  accessoryType: string;
  additionalComments: string;
  additionalFieldsMap: AdditionalFieldsMap;
  additionalFieldsFormDataMap: AdditionalFieldsFormDataMap;
  availability: ProductAvailability;
  brand: string;
  caseColor: string;
  caseSidePanel: CaseSidePanel;
  caseType: CaseType;
  cpuCores: string;
  cpuFrequency: string;
  cpuL1CacheCapacity: string;
  cpuL1CacheCapacityUnit: MemoryUnit;
  cpuL2CacheCapacity: string;
  cpuL2CacheCapacityUnit: MemoryUnit;
  cpuL3CacheCapacity: string;
  cpuL3CacheCapacityUnit: MemoryUnit;
  cpuSocket: string;
  cpuWattage: string;
  currency: Currency;
  description: string;
  dimensionHeight: string;
  dimensionHeightUnit: DimensionUnit;
  dimensionLength: string;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: string;
  dimensionWidthUnit: DimensionUnit;
  displayAspectRatio: string;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string;
  gpuBoostClock: string;
  gpuChipset: string;
  gpuCoreClock: string;
  gpuMemoryCapacity: string;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuTdp: string;
  headphoneColor: string;
  headphoneDriver: string;
  headphoneFrequencyResponse: string;
  headphoneImpedance: string;
  headphoneInterface: HeadphoneInterface;
  headphoneType: HeadphoneType;
  isSubmitting: boolean;
  isSuccessful: boolean;
  keyboardBacklight: KeyboardBacklight;
  keyboardInterface: PeripheralsInterface;
  keyboardLayout: KeyboardLayout;
  keyboardSwitch: KeyboardSwitch;
  microphoneColor: string;
  microphoneFrequencyResponse: string;
  microphoneInterface: MicrophoneInterface;
  microphonePolarPattern: MicrophonePolarPattern;
  microphoneType: MicrophoneType;
  model: string;
  motherboardChipset: string;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardM2Slots: string;
  motherboardMemoryMaxCapacity: string;
  motherboardMemoryMaxCapacityUnit: MemoryUnit;
  motherboardMemorySlots: string;
  motherboardMemoryType: MemoryType;
  motherboardPcie3Slots: string;
  motherboardPcie4Slots: string;
  motherboardPcie5Slots: string;
  motherboardSataPorts: string;
  motherboardSocket: string;
  mouseButtons: string;
  mouseColor: string;
  mouseDpi: string;
  mouseInterface: PeripheralsInterface;
  mouseSensor: MouseSensor;
  pagesInError: Set<number>;
  price: string;
  psuEfficiency: PsuEfficiency;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;
  quantity: string;
  ramColor: string;
  ramDataRate: string;
  ramModulesCapacity: string;
  ramModulesCapacityUnit: MemoryUnit;
  ramModulesQuantity: string;
  ramTiming: string;
  ramType: MemoryType;
  ramVoltage: string;
  speakerColor: string;
  speakerFrequencyResponse: string;
  speakerInterface: SpeakerInterface;
  speakerTotalWattage: string;
  speakerType: SpeakerType;
  stepperPages: StepperPage[];
  storageCacheCapacity: string;
  storageCacheCapacityUnit: MemoryUnit;
  storageCapacity: string;
  storageCapacityUnit: MemoryUnit;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;
  storageType: StorageType;
  triggerFormSubmit: boolean;
  webcamColor: string;
  webcamFrameRate: WebcamFrameRate;
  webcamInterface: WebcamInterface;
  webcamMicrophone: WebcamMicrophone;
  webcamResolution: WebcamResolution;
  weight: string;
  weightUnit: WeightUnit;
};

export type {
  AccessoryDocument,
  AccessoryRequestBody,
  AccessorySchema,
  AccessorySpecifications,
  AdditionalFieldsMap,
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
