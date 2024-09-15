import type { CheckboxRadioSelectData } from "../../types";

const QUERY_LIMIT_PER_PAGE_SELECT_DATA = ["10", "20", "30", "40", "50"];

// only for displaying Products page (productCategory fields)
// used to narrow down the fields displayed in select input
// in componentQueryData for the query operations in QueryBuilder component
// by default the componentQueryData obj has all fields in Product Schema

const productCategoryCpuFields = new Set([
  "cpuSocket",
  "cpuFrequency",
  "cpuCores",
  "cpuL1Cache",
  "cpuL1CacheUnit",
  "cpuL2Cache",
  "cpuL2CacheUnit",
  "cpuL3Cache",
  "cpuL3CacheUnit",
  "cpuWattage",
]);

const productCategoryGpuFields = new Set([
  "gpuChipset",
  "gpuMemory",
  "gpuMemoryUnit",
  "gpuCoreClock",
  "gpuBoostClock",
  "gpuTdp",
]);

const productCategoryMotherboardFields = new Set([
  "motherboardSocket",
  "motherboardChipset",
  "motherboardFormFactor",
  "motherboardMemoryMax",
  "motherboardMemoryMaxUnit",
  "motherboardMemorySlots",
  "motherboardMemoryType",
  "motherboardSataPorts",
  "motherboardM2Slots",
  "motherboardPcie3Slots",
  "motherboardPcie4Slots",
  "motherboardPcie5Slots",
]);

const productCategoryRamFields = new Set([
  "ramDataRate",
  "ramModulesQuantity",
  "ramModulesCapacity",
  "ramModulesCapacityUnit",
  "ramType",
  "ramColor",
  "ramVoltage",
  "ramTiming",
]);

const productCategoryStorageFields = new Set([
  "storageType",
  "storageCapacity",
  "storageCapacityUnit",
  "storageCache",
  "storageCacheUnit",
  "storageFormFactor",
  "storageInterface",
]);

const productCategoryPsuFields = new Set([
  "psuWattage",
  "psuEfficiency",
  "psuFormFactor",
  "psuModularity",
]);

const productCategoryCaseFields = new Set([
  "caseType",
  "caseColor",
  "caseSidePanel",
]);

const productCategoryDisplayFields = new Set([
  "monitorSize",
  "monitorHorizontalResolution",
  "monitorVerticalResolution",
  "monitorRefreshRate",
  "monitorPanelType",
  "monitorResponseTime",
  "monitorAspectRatio",
]);

const productCategoryKeyboardFields = new Set([
  "keyboardSwitch",
  "keyboardLayout",
  "keyboardBacklight",
  "keyboardInterface",
]);

const productCategoryMouseFields = new Set([
  "mouseSensor",
  "mouseDpi",
  "mouseButtons",
  "mouseColor",
  "mouseInterface",
]);

const productCategoryHeadphoneFields = new Set([
  "headphoneType",
  "headphoneDriver",
  "headphoneFrequencyResponse",
  "headphoneImpedance",
  "headphoneColor",
  "headphoneInterface",
]);

const productCategorySpeakerFields = new Set([
  "speakerType",
  "speakerTotalWattage",
  "speakerFrequencyResponse",
  "speakerColor",
  "speakerInterface",
]);

const productCategorySmartphoneFields = new Set([
  "smartphoneOs",
  "smartphoneChipset",
  "smartphoneDisplay",
  "smartphoneHorizontalResolution",
  "smartphoneVerticalResolution",
  "smartphoneRamCapacity",
  "smartphoneRamCapacityUnit",
  "smartphoneStorage",
  "smartphoneBattery",
  "smartphoneCamera",
  "smartphoneColor",
]);

const productCategoryTabletFields = new Set([
  "tabletOs",
  "tabletChipset",
  "tabletDisplay",
  "tabletHorizontalResolution",
  "tabletVerticalResolution",
  "tabletRamCapacity",
  "tabletRamCapacityUnit",
  "tabletStorage",
  "tabletBattery",
  "tabletCamera",
  "tabletColor",
]);

const productCategoryAccessoryFields = new Set([
  "accessoryType",
  "accessoryColor",
  "accessoryInterface",
]);

const productCategoryWebcamFields = new Set([
  "webcamResolution",
  "webcamInterface",
  "webcamMicrophone",
  "webcamFrameRate",
  "webcamColor",
]);

const productCategoryMicrophoneFields = new Set([
  "microphoneType",
  "microphonePolarPattern",
  "microphoneFrequencyResponse",
  "microphoneColor",
  "microphoneInterface",
]);

const productCategoryDesktopComputerFields = new Set([
  ...productCategoryCpuFields,
  ...productCategoryGpuFields,
  ...productCategoryMotherboardFields,
  ...productCategoryRamFields,
  ...productCategoryStorageFields,
  ...productCategoryPsuFields,
  ...productCategoryCaseFields,
  ...productCategoryDisplayFields,
  ...productCategoryKeyboardFields,
  ...productCategoryMouseFields,
  ...productCategorySpeakerFields,
]);

const productCategoryLaptopFields = new Set([
  ...productCategoryCpuFields,
  ...productCategoryGpuFields,
  ...productCategoryRamFields,
  ...productCategoryStorageFields,
  ...productCategoryDisplayFields,
]);

const PRODUCT_CATEGORY_FIELDS_OBJ: Record<string, Set<string>> = {
  cpu: productCategoryCpuFields,
  case: productCategoryCaseFields,
  "desktop-computer": productCategoryDesktopComputerFields,
  gpu: productCategoryGpuFields,
  ram: productCategoryRamFields,
  psu: productCategoryPsuFields,
  accessory: productCategoryAccessoryFields,
  display: productCategoryDisplayFields,
  headphone: productCategoryHeadphoneFields,
  keyboard: productCategoryKeyboardFields,
  laptop: productCategoryLaptopFields,
  mouse: productCategoryMouseFields,
  microphone: productCategoryMicrophoneFields,
  motherboard: productCategoryMotherboardFields,
  smartphone: productCategorySmartphoneFields,
  speaker: productCategorySpeakerFields,
  storage: productCategoryStorageFields,
  tablet: productCategoryTabletFields,
  webcam: productCategoryWebcamFields,
};

const PRODUCT_CATEGORY_ROUTE_SELECT_DATA: CheckboxRadioSelectData = [
  { label: "Accessory", value: "accessory" },
  { label: "Central Processing Unit (CPU)", value: "cpu" },
  { label: "Computer Case", value: "computer-case" },
  { label: "Desktop Computer", value: "desktop-computer" },
  { label: "Display", value: "display" },
  { label: "Graphics Processing Unit (GPU)", value: "gpu" },
  { label: "Headphone", value: "headphone" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Laptop", value: "laptop" },
  { label: "Memory (RAM)", value: "ram" },
  { label: "Mouse", value: "mouse" },
  { label: "Microphone", value: "microphone" },
  { label: "Motherboard", value: "motherboard" },
  { label: "Power Supply Unit (PSU)", value: "psu" },
  { label: "Smartphone", value: "smartphone" },
  { label: "Speaker", value: "speaker" },
  { label: "Storage", value: "storage" },
  { label: "Tablet", value: "tablet" },
  { label: "Webcam", value: "webcam" },
];

// used to map resource ids to backend route paths to fetch data from
// in the DisplayResource component
const RESOURCE_IDS_ROUTE_MAP = {
  completedSurveys: "survey",
  customerId: "customer",
  dislikedUserIds: "user",
  likedUserIds: "user",
  productReviewsIds: "product-review",
  purchaseDocumentId: "purchase",
  purchaseHistoryIds: "purchase",
  reportedUserIds: "user",
  rmaHistoryIds: "rma",
  uploadedFilesIds: "file-upload",
  userId: "user",
};

export {
  PRODUCT_CATEGORY_FIELDS_OBJ,
  PRODUCT_CATEGORY_ROUTE_SELECT_DATA,
  QUERY_LIMIT_PER_PAGE_SELECT_DATA,
  RESOURCE_IDS_ROUTE_MAP,
};
