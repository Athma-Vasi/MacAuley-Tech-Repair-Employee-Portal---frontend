import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
} from '../types';

const initialCreateProductState: CreateProductState = {
  // page 1

  // page 1 -> brand
  brand: '',
  isBrandValid: false,
  isBrandFocused: false,
  // page 1 -> model, product category
  model: '',
  isModelValid: false,
  isModelFocused: false,
  productCategory: 'Accessories',
  // page 1 -> description
  description: '',
  isDescriptionValid: false,
  isDescriptionFocused: false,
  // page 1 -> price, currency, availability
  price: '',
  isPriceValid: false,
  isPriceFocused: false,
  currency: 'CAD',
  availability: 'In Stock',
  // page 1 -> quantity
  quantity: '',
  isQuantityFocused: false,
  isQuantityValid: false,
  // page 1 -> weight
  weight: '',
  isWeightFocused: false,
  isWeightValid: false,
  weightUnit: 'g',
  // page 1 -> dimension
  dimensionHeight: '',
  isDimensionHeightFocused: false,
  isDimensionHeightValid: false,
  dimensionHeightUnit: 'cm',
  dimensionWidth: '',
  isDimensionWidthFocused: false,
  isDimensionWidthValid: false,
  dimensionWidthUnit: 'cm',
  dimensionLength: '',
  isDimensionLengthFocused: false,
  isDimensionLengthValid: false,
  dimensionLengthUnit: 'cm',
  // page 1 -> additional comments
  additionalComments: '',
  isAdditionalCommentsFocused: false,
  isAdditionalCommentsValid: false,

  // page 2

  // page 2 -> specifications
  // page 2 -> specifications -> cpu
  cpuSocket: '',
  isCpuSocketFocused: false,
  isCpuSocketValid: false,
  cpuFrequency: '', // GHz
  isCpuFrequencyFocused: false,
  isCpuFrequencyValid: false,
  cpuCores: '',
  isCpuCoresFocused: false,
  isCpuCoresValid: false,
  cpuL1CacheCapacity: '',
  isCpuL1CacheCapacityFocused: false,
  isCpuL1CacheCapacityValid: false,
  cpuL1CacheCapacityUnit: 'KB',
  cpuL2CacheCapacity: '',
  isCpuL2CacheCapacityFocused: false,
  isCpuL2CacheCapacityValid: false,
  cpuL2CacheCapacityUnit: 'KB',
  cpuL3CacheCapacity: '',
  isCpuL3CacheCapacityFocused: false,
  isCpuL3CacheCapacityValid: false,
  cpuL3CacheCapacityUnit: 'KB',
  cpuWattage: '',
  isCpuWattageFocused: false,
  isCpuWattageValid: false,

  // page 2 -> specifications -> gpu
  gpuChipset: '',
  isGpuChipsetFocused: false,
  isGpuChipsetValid: false,
  gpuMemoryCapacity: '',
  isGpuMemoryCapacityFocused: false,
  isGpuMemoryCapacityValid: false,
  gpuMemoryCapacityUnit: 'GB',
  gpuCoreClock: '', // MHz
  isGpuCoreClockFocused: false,
  isGpuCoreClockValid: false,
  gpuBoostClock: '', // MHz
  isGpuBoostClockFocused: false,
  isGpuBoostClockValid: false,
  gpuTdp: '',
  isGpuTdpFocused: false,
  isGpuTdpValid: false,

  // page 2 -> specifications -> motherboard
  motherboardSocket: '',
  isMotherboardSocketFocused: false,
  isMotherboardSocketValid: false,
  motherboardChipset: '',
  isMotherboardChipsetFocused: false,
  isMotherboardChipsetValid: false,
  motherboardFormFactor: 'ATX',
  motherboardMemoryMaxCapacity: '',
  isMotherboardMemoryMaxCapacityFocused: false,
  isMotherboardMemoryMaxCapacityValid: false,
  motherboardMemoryMaxCapacityUnit: 'GB',
  motherboardMemorySlots: '',
  isMotherboardMemorySlotsFocused: false,
  isMotherboardMemorySlotsValid: false,
  motherboardMemoryType: 'DDR4',
  motherboardSataPorts: '',
  isMotherboardSataPortsFocused: false,
  isMotherboardSataPortsValid: false,
  motherboardM2Slots: '',
  isMotherboardM2SlotsFocused: false,
  isMotherboardM2SlotsValid: false,
  motherboardPcie3Slots: '',
  isMotherboardPcie3SlotsFocused: false,
  isMotherboardPcie3SlotsValid: false,
  motherboardPcie4Slots: '',
  isMotherboardPcie4SlotsFocused: false,
  isMotherboardPcie4SlotsValid: false,
  motherboardPcie5Slots: '',
  isMotherboardPcie5SlotsFocused: false,
  isMotherboardPcie5SlotsValid: false,

  // page 2 -> specifications -> ram
  ramDataRate: '', // MHz
  isRamDataRateFocused: false,
  isRamDataRateValid: false,
  ramModulesQuantity: '',
  isRamModulesQuantityFocused: false,
  isRamModulesQuantityValid: false,
  ramModulesCapacity: '',
  isRamModulesCapacityFocused: false,
  isRamModulesCapacityValid: false,
  ramModulesCapacityUnit: 'GB',
  ramType: 'DDR4',
  ramColor: '',
  isRamColorFocused: false,
  isRamColorValid: false,
  ramVoltage: '',
  isRamVoltageFocused: false,
  isRamVoltageValid: false,
  ramTiming: '',
  isRamTimingFocused: false,
  isRamTimingValid: false,

  // page 2 -> specifications -> storage
  storageType: 'SSD',
  storageCapacity: '',
  isStorageCapacityFocused: false,
  isStorageCapacityValid: false,
  storageCapacityUnit: 'GB',
  storageCacheCapacity: '',
  isStorageCacheCapacityFocused: false,
  isStorageCacheCapacityValid: false,
  storageCacheCapacityUnit: 'MB',
  storageFormFactor: 'M.2 2280',
  storageInterface: 'M.2',

  // page 2 -> specifications -> psu
  psuWattage: '',
  isPsuWattageFocused: false,
  isPsuWattageValid: false,
  psuEfficiency: '80+ Bronze',
  psuModularity: 'Full',
  psuFormFactor: 'ATX',

  // page 2 -> specifications -> case
  caseColor: '',
  isCaseColorFocused: false,
  isCaseColorValid: false,
  caseType: 'Mid Tower',
  caseSidePanel: 'Solid',

  // page 2 -> specifications -> display
  displaySize: '',
  isDisplaySizeFocused: false,
  isDisplaySizeValid: false,
  displayResolutionHorizontal: '',
  isDisplayResolutionHorizontalFocused: false,
  isDisplayResolutionHorizontalValid: false,
  displayResolutionVertical: '',
  isDisplayResolutionVerticalFocused: false,
  isDisplayResolutionVerticalValid: false,
  displayRefreshRate: '',
  isDisplayRefreshRateFocused: false,
  isDisplayRefreshRateValid: false,
  displayPanelType: 'IPS',
  displayResponseTime: '',
  isDisplayResponseTimeFocused: false,
  isDisplayResponseTimeValid: false,
  displayAspectRatio: '',
  isDisplayAspectRatioFocused: false,
  isDisplayAspectRatioValid: false,

  // page 2 -> specifications -> keyboard
  keyboardBacklight: 'RGB',
  keyboardInterface: 'USB',
  keyboardLayout: 'QWERTY',
  keyboardSwitch: 'Cherry MX Red',

  // page 2 -> specifications -> mouse
  mouseSensor: 'Optical',
  mouseDpi: '',
  isMouseDpiFocused: false,
  isMouseDpiValid: false,
  mouseButtons: '',
  isMouseButtonsFocused: false,
  isMouseButtonsValid: false,
  mouseColor: '',
  isMouseColorFocused: false,
  isMouseColorValid: false,
  mouseInterface: 'USB',

  // page 2 -> specifications -> headphone
  headphoneType: 'Over-ear',
  headphoneColor: '',
  isHeadphoneColorFocused: false,
  isHeadphoneColorValid: false,
  headphoneDriver: '',
  isHeadphoneDriverFocused: false,
  isHeadphoneDriverValid: false,
  headphoneFrequencyResponse: '',
  isHeadphoneFrequencyResponseFocused: false,
  isHeadphoneFrequencyResponseValid: false,
  headphoneImpedance: '',
  isHeadphoneImpedanceFocused: false,
  isHeadphoneImpedanceValid: false,
  headphoneInterface: 'USB',

  // page 2 -> specifications -> speaker
  speakerType: '2.0',
  speakerColor: '',
  isSpeakerColorFocused: false,
  isSpeakerColorValid: false,
  speakerFrequencyResponse: '',
  isSpeakerFrequencyResponseFocused: false,
  isSpeakerFrequencyResponseValid: false,
  speakerTotalWattage: '',
  isSpeakerTotalWattageFocused: false,
  isSpeakerTotalWattageValid: false,
  speakerInterface: 'USB',

  // page 2 -> specifications -> smartphone
  smartphoneBatteryCapacity: '',
  isSmartphoneBatteryCapacityFocused: false,
  isSmartphoneBatteryCapacityValid: false,
  smartphoneCamera: '',
  isSmartphoneCameraFocused: false,
  isSmartphoneCameraValid: false,
  smartphoneChipset: '',
  isSmartphoneChipsetFocused: false,
  isSmartphoneChipsetValid: false,
  smartphoneColor: '',
  isSmartphoneColorFocused: false,
  isSmartphoneColorValid: false,
  smartphoneDisplay: '',
  isSmartphoneDisplayFocused: false,
  isSmartphoneDisplayValid: false,
  smartphoneResolutionHorizontal: '',
  isSmartphoneResolutionHorizontalFocused: false,
  isSmartphoneResolutionHorizontalValid: false,
  smartphoneResolutionVertical: '',
  isSmartphoneResolutionVerticalFocused: false,
  isSmartphoneResolutionVerticalValid: false,
  smartphoneOs: 'iOS',
  smartphoneRamCapacity: '',
  isSmartphoneRamCapacityFocused: false,
  isSmartphoneRamCapacityValid: false,
  smartphoneRamCapacityUnit: 'GB',
  smartphoneStorageCapacity: '',
  isSmartphoneStorageCapacityFocused: false,
  isSmartphoneStorageCapacityValid: false,

  // page 2 -> specifications -> tablet
  tabletBatteryCapacity: '',
  isTabletBatteryCapacityFocused: false,
  isTabletBatteryCapacityValid: false,
  tabletCamera: '',
  isTabletCameraFocused: false,
  isTabletCameraValid: false,
  tabletChipset: '',
  isTabletChipsetFocused: false,
  isTabletChipsetValid: false,
  tabletColor: '',
  isTabletColorFocused: false,
  isTabletColorValid: false,
  tabletDisplay: '',
  isTabletDisplayFocused: false,
  isTabletDisplayValid: false,
  tabletResolutionHorizontal: '',
  isTabletResolutionHorizontalFocused: false,
  isTabletResolutionHorizontalValid: false,
  tabletResolutionVertical: '',
  isTabletResolutionVerticalFocused: false,
  isTabletResolutionVerticalValid: false,
  tabletOs: 'iOS',
  tabletRamCapacity: '',
  isTabletRamCapacityFocused: false,
  isTabletRamCapacityValid: false,
  tabletRamCapacityUnit: 'GB',
  tabletStorageCapacity: '',
  isTabletStorageCapacityFocused: false,
  isTabletStorageCapacityValid: false,

  // page 2 -> specifications -> accessories
  accessoryColor: '',
  isAccessoryColorFocused: false,
  isAccessoryColorValid: false,
  accessoryInterface: 'USB',
  accessoryType: '',
  isAccessoryTypeFocused: false,
  isAccessoryTypeValid: false,
  accessoryFieldsAdditional: new Map<number, [string, string]>(),
  areAccessoryFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areAccessoryFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> webcam
  webcamColor: '',
  isWebcamColorFocused: false,
  isWebcamColorValid: false,
  webcamFrameRate: '60 fps',
  webcamInterface: 'USB',
  webcamMicrophone: 'Yes',
  webcamResolution: '1080p',

  // page 3
  currentlySelectedAdditionalFieldIndex: 0,
  imgFormDataArray: [],
  areImagesValid: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const createProductAction: CreateProductAction = {
  // page 1

  // page 1 -> brand
  setBrand: 'setBrand',
  setIsBrandValid: 'setIsBrandValid',
  setIsBrandFocused: 'setIsBrandFocused',
  // page 1 -> model, product category
  setModel: 'setModel',
  setIsModelValid: 'setIsModelValid',
  setIsModelFocused: 'setIsModelFocused',
  setProductCategory: 'setProductCategory',
  // page 1 -> description
  setDescription: 'setDescription',
  setIsDescriptionValid: 'setIsDescriptionValid',
  setIsDescriptionFocused: 'setIsDescriptionFocused',
  // page 1 -> price, currency, availability, quantity
  setPrice: 'setPrice',
  setIsPriceValid: 'setIsPriceValid',
  setIsPriceFocused: 'setIsPriceFocused',
  setCurrency: 'setCurrency',
  setAvailability: 'setAvailability',
  // page 1 -> quantity
  setQuantity: 'setQuantity',
  setIsQuantityValid: 'setIsQuantityValid',
  setIsQuantityFocused: 'setIsQuantityFocused',
  // page 1 -> weight
  setWeight: 'setWeight',
  setIsWeightValid: 'setIsWeightValid',
  setIsWeightFocused: 'setIsWeightFocused',
  setWeightUnit: 'setWeightUnit',
  // page 1 -> dimensions
  setDimensionLength: 'setDimensionLength',
  setIsDimensionLengthValid: 'setIsDimensionLengthValid',
  setIsDimensionLengthFocused: 'setIsDimensionLengthFocused',
  setDimensionLengthUnit: 'setDimensionLengthUnit',
  setDimensionWidth: 'setDimensionWidth',
  setIsDimensionWidthValid: 'setIsDimensionWidthValid',
  setIsDimensionWidthFocused: 'setIsDimensionWidthFocused',
  setDimensionWidthUnit: 'setDimensionWidthUnit',
  setDimensionHeight: 'setDimensionHeight',
  setIsDimensionHeightValid: 'setIsDimensionHeightValid',
  setIsDimensionHeightFocused: 'setIsDimensionHeightFocused',
  setDimensionHeightUnit: 'setDimensionHeightUnit',
  // page 1 -> additional comments
  setAdditionalComments: 'setAdditionalComments',
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',

  // page 2

  // page 2 -> specifications

  // page 2 -> specifications -> cpu
  setCpuSocket: 'setCpuSocket',
  setIsCpuSocketValid: 'setIsCpuSocketValid',
  setIsCpuSocketFocused: 'setIsCpuSocketFocused',
  setCpuFrequency: 'setCpuFrequency',
  setIsCpuFrequencyValid: 'setIsCpuFrequencyValid',
  setIsCpuFrequencyFocused: 'setIsCpuFrequencyFocused',
  setCpuCores: 'setCpuCores',
  setIsCpuCoresValid: 'setIsCpuCoresValid',
  setIsCpuCoresFocused: 'setIsCpuCoresFocused',
  setCpuL1CacheCapacity: 'setCpuL1CacheCapacity',
  setIsCpuL1CacheCapacityValid: 'setIsCpuL1CacheCapacityValid',
  setIsCpuL1CacheCapacityFocused: 'setIsCpuL1CacheCapacityFocused',
  setCpuL1CacheCapacityUnit: 'setCpuL1CacheCapacityUnit',
  setCpuL2CacheCapacity: 'setCpuL2CacheCapacity',
  setIsCpuL2CacheCapacityValid: 'setIsCpuL2CacheCapacityValid',
  setIsCpuL2CacheCapacityFocused: 'setIsCpuL2CacheCapacityFocused',
  setCpuL2CacheCapacityUnit: 'setCpuL2CacheCapacityUnit',
  setCpuL3CacheCapacity: 'setCpuL3CacheCapacity',
  setIsCpuL3CacheCapacityValid: 'setIsCpuL3CacheCapacityValid',
  setIsCpuL3CacheCapacityFocused: 'setIsCpuL3CacheCapacityFocused',
  setCpuL3CacheCapacityUnit: 'setCpuL3CacheCapacityUnit',
  setCpuWattage: 'setCpuWattage',
  setIsCpuWattageValid: 'setIsCpuWattageValid',
  setIsCpuWattageFocused: 'setIsCpuWattageFocused',

  // page 2 -> specifications -> gpu
  setGpuChipset: 'setGpuChipset',
  setIsGpuChipsetValid: 'setIsGpuChipsetValid',
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused',
  setGpuMemoryCapacity: 'setGpuMemoryCapacity',
  setIsGpuMemoryCapacityValid: 'setIsGpuMemoryCapacityValid',
  setIsGpuMemoryCapacityFocused: 'setIsGpuMemoryCapacityFocused',
  setGpuMemoryCapacityUnit: 'setGpuMemoryCapacityUnit',
  setGpuCoreClock: 'setGpuCoreClock',
  setIsGpuCoreClockValid: 'setIsGpuCoreClockValid',
  setIsGpuCoreClockFocused: 'setIsGpuCoreClockFocused',
  setGpuBoostClock: 'setGpuBoostClock',
  setIsGpuBoostClockValid: 'setIsGpuBoostClockValid',
  setIsGpuBoostClockFocused: 'setIsGpuBoostClockFocused',
  setGpuTdp: 'setGpuTdp',
  setIsGpuTdpValid: 'setIsGpuTdpValid',
  setIsGpuTdpFocused: 'setIsGpuTdpFocused',

  // page 2 -> specifications -> motherboard
  setMotherboardSocket: 'setMotherboardSocket',
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid',
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused',
  setMotherboardChipset: 'setMotherboardChipset',
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid',
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused',
  setMotherboardFormFactor: 'setMotherboardFormFactor',
  setMotherboardMemoryMaxCapacity: 'setMotherboardMemoryMaxCapacity',
  setIsMotherboardMemoryMaxCapacityValid:
    'setIsMotherboardMemoryMaxCapacityValid',
  setIsMotherboardMemoryMaxCapacityFocused:
    'setIsMotherboardMemoryMaxCapacityFocused',
  setMotherboardMemoryMaxCapacityUnit: 'setMotherboardMemoryMaxCapacityUnit',
  setMotherboardMemorySlots: 'setMotherboardMemorySlots',
  setIsMotherboardMemorySlotsValid: 'setIsMotherboardMemorySlotsValid',
  setIsMotherboardMemorySlotsFocused: 'setIsMotherboardMemorySlotsFocused',
  setMotherboardMemoryType: 'setMotherboardMemoryType',
  setMotherboardSataPorts: 'setMotherboardSataPorts',
  setIsMotherboardSataPortsValid: 'setIsMotherboardSataPortsValid',
  setIsMotherboardSataPortsFocused: 'setIsMotherboardSataPortsFocused',
  setMotherboardM2Slots: 'setMotherboardM2Slots',
  setIsMotherboardM2SlotsValid: 'setIsMotherboardM2SlotsValid',
  setIsMotherboardM2SlotsFocused: 'setIsMotherboardM2SlotsFocused',
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots',
  setIsMotherboardPcie3SlotsValid: 'setIsMotherboardPcie3SlotsValid',
  setIsMotherboardPcie3SlotsFocused: 'setIsMotherboardPcie3SlotsFocused',
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots',
  setIsMotherboardPcie4SlotsValid: 'setIsMotherboardPcie4SlotsValid',
  setIsMotherboardPcie4SlotsFocused: 'setIsMotherboardPcie4SlotsFocused',
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots',
  setIsMotherboardPcie5SlotsValid: 'setIsMotherboardPcie5SlotsValid',
  setIsMotherboardPcie5SlotsFocused: 'setIsMotherboardPcie5SlotsFocused',

  // page 2 -> specifications -> ram
  setRamDataRate: 'setRamDataRate',
  setIsRamDataRateValid: 'setIsRamDataRateValid',
  setIsRamDataRateFocused: 'setIsRamDataRateFocused',
  setRamModulesQuantity: 'setRamModulesQuantity',
  setIsRamModulesQuantityValid: 'setIsRamModulesQuantityValid',
  setIsRamModulesQuantityFocused: 'setIsRamModulesQuantityFocused',
  setRamModulesCapacity: 'setRamModulesCapacity',
  setIsRamModulesCapacityValid: 'setIsRamModulesCapacityValid',
  setIsRamModulesCapacityFocused: 'setIsRamModulesCapacityFocused',
  setRamModulesCapacityUnit: 'setRamModulesCapacityUnit',
  setRamType: 'setRamType',
  setRamColor: 'setRamColor',
  setIsRamColorValid: 'setIsRamColorValid',
  setIsRamColorFocused: 'setIsRamColorFocused',
  setRamVoltage: 'setRamVoltage',
  setIsRamVoltageValid: 'setIsRamVoltageValid',
  setIsRamVoltageFocused: 'setIsRamVoltageFocused',
  setRamTiming: 'setRamTiming',
  setIsRamTimingValid: 'setIsRamTimingValid',
  setIsRamTimingFocused: 'setIsRamTimingFocused',

  // page 2 -> specifications -> storage
  setStorageType: 'setStorageType',
  setStorageCapacity: 'setStorageCapacity',
  setIsStorageCapacityValid: 'setIsStorageCapacityValid',
  setIsStorageCapacityFocused: 'setIsStorageCapacityFocused',
  setStorageCapacityUnit: 'setStorageCapacityUnit',
  setStorageCacheCapacity: 'setStorageCacheCapacity',
  setIsStorageCacheCapacityValid: 'setIsStorageCacheCapacityValid',
  setIsStorageCacheCapacityFocused: 'setIsStorageCacheCapacityFocused',
  setStorageCacheCapacityUnit: 'setStorageCacheCapacityUnit',
  setStorageFormFactor: 'setStorageFormFactor',
  setStorageInterface: 'setStorageInterface',

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage',
  setIsPsuWattageValid: 'setIsPsuWattageValid',
  setIsPsuWattageFocused: 'setIsPsuWattageFocused',
  setPsuEfficiency: 'setPsuEfficiency',
  setPsuFormFactor: 'setPsuFormFactor',
  setPsuModularity: 'setPsuModularity',

  // page 2 -> specifications -> case
  setCaseColor: 'setCaseColor',
  setIsCaseColorValid: 'setIsCaseColorValid',
  setIsCaseColorFocused: 'setIsCaseColorFocused',
  setCaseType: 'setCaseType',
  setCaseSidePanel: 'setCaseSidePanel',

  // page 2 -> specifications -> display
  setDisplaySize: 'setDisplaySize',
  setIsDisplaySizeValid: 'setIsDisplaySizeValid',
  setIsDisplaySizeFocused: 'setIsDisplaySizeFocused',
  setDisplayResolutionHorizontal: 'setDisplayResolutionHorizontal',
  setIsDisplayResolutionHorizontalValid:
    'setIsDisplayResolutionHorizontalValid',
  setIsDisplayResolutionHorizontalFocused:
    'setIsDisplayResolutionHorizontalFocused',
  setDisplayResolutionVertical: 'setDisplayResolutionVertical',
  setIsDisplayResolutionVerticalValid: 'setIsDisplayResolutionVerticalValid',
  setIsDisplayResolutionVerticalFocused:
    'setIsDisplayResolutionVerticalFocused',
  setDisplayRefreshRate: 'setDisplayRefreshRate',
  setIsDisplayRefreshRateValid: 'setIsDisplayRefreshRateValid',
  setIsDisplayRefreshRateFocused: 'setIsDisplayRefreshRateFocused',
  setDisplayPanelType: 'setDisplayPanelType',
  setDisplayResponseTime: 'setDisplayResponseTime',
  setIsDisplayResponseTimeValid: 'setIsDisplayResponseTimeValid',
  setIsDisplayResponseTimeFocused: 'setIsDisplayResponseTimeFocused',
  setDisplayAspectRatio: 'setDisplayAspectRatio',
  setIsDisplayAspectRatioValid: 'setIsDisplayAspectRatioValid',
  setIsDisplayAspectRatioFocused: 'setIsDisplayAspectRatioFocused',

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch',
  setKeyboardLayout: 'setKeyboardLayout',
  setKeyboardBacklight: 'setKeyboardBacklight',
  setKeyboardInterface: 'setKeyboardInterface',

  // page 2 -> specifications -> mouse
  setMouseSensor: 'setMouseSensor',
  setMouseDpi: 'setMouseDpi',
  setIsMouseDpiValid: 'setIsMouseDpiValid',
  setIsMouseDpiFocused: 'setIsMouseDpiFocused',
  setMouseButtons: 'setMouseButtons',
  setIsMouseButtonsValid: 'setIsMouseButtonsValid',
  setIsMouseButtonsFocused: 'setIsMouseButtonsFocused',
  setMouseColor: 'setMouseColor',
  setIsMouseColorValid: 'setIsMouseColorValid',
  setIsMouseColorFocused: 'setIsMouseColorFocused',
  setMouseInterface: 'setMouseInterface',

  // page 2 -> specifications -> headphone
  setHeadphoneType: 'setHeadphoneType',
  setHeadphoneDriver: 'setHeadphoneDriver',
  setIsHeadphoneDriverValid: 'setIsHeadphoneDriverValid',
  setIsHeadphoneDriverFocused: 'setIsHeadphoneDriverFocused',
  setHeadphoneFrequencyResponse: 'setHeadphoneFrequencyResponse',
  setIsHeadphoneFrequencyResponseValid: 'setIsHeadphoneFrequencyResponseValid',
  setIsHeadphoneFrequencyResponseFocused:
    'setIsHeadphoneFrequencyResponseFocused',
  setHeadphoneImpedance: 'setHeadphoneImpedance',
  setIsHeadphoneImpedanceValid: 'setIsHeadphoneImpedanceValid',
  setIsHeadphoneImpedanceFocused: 'setIsHeadphoneImpedanceFocused',
  setHeadphoneColor: 'setHeadphoneColor',
  setIsHeadphoneColorValid: 'setIsHeadphoneColorValid',
  setIsHeadphoneColorFocused: 'setIsHeadphoneColorFocused',
  setHeadphoneInterface: 'setHeadphoneInterface',

  // page 2 -> specifications -> speaker
  setSpeakerType: 'setSpeakerType',
  setSpeakerTotalWattage: 'setSpeakerTotalWattage',
  setIsSpeakerTotalWattageValid: 'setIsSpeakerTotalWattageValid',
  setIsSpeakerTotalWattageFocused: 'setIsSpeakerTotalWattageFocused',
  setSpeakerFrequencyResponse: 'setSpeakerFrequencyResponse',
  setIsSpeakerFrequencyResponseValid: 'setIsSpeakerFrequencyResponseValid',
  setIsSpeakerFrequencyResponseFocused: 'setIsSpeakerFrequencyResponseFocused',
  setSpeakerColor: 'setSpeakerColor',
  setIsSpeakerColorValid: 'setIsSpeakerColorValid',
  setIsSpeakerColorFocused: 'setIsSpeakerColorFocused',
  setSpeakerInterface: 'setSpeakerInterface',

  // page 2 -> specifications -> smartphone
  setSmartphoneOs: 'setSmartphoneOs',
  setSmartphoneChipset: 'setSmartphoneChipset',
  setIsSmartphoneChipsetValid: 'setIsSmartphoneChipsetValid',
  setIsSmartphoneChipsetFocused: 'setIsSmartphoneChipsetFocused',
  setSmartphoneDisplay: 'setSmartphoneDisplay',
  setIsSmartphoneDisplayValid: 'setIsSmartphoneDisplayValid',
  setIsSmartphoneDisplayFocused: 'setIsSmartphoneDisplayFocused',
  setSmartphoneResolutionHorizontal: 'setSmartphoneResolutionHorizontal',
  setIsSmartphoneResolutionHorizontalValid:
    'setIsSmartphoneResolutionHorizontalValid',
  setIsSmartphoneResolutionHorizontalFocused:
    'setIsSmartphoneResolutionHorizontalFocused',
  setSmartphoneResolutionVertical: 'setSmartphoneResolutionVertical',
  setIsSmartphoneResolutionVerticalValid:
    'setIsSmartphoneResolutionVerticalValid',
  setIsSmartphoneResolutionVerticalFocused:
    'setIsSmartphoneResolutionVerticalFocused',
  setSmartphoneRamCapacity: 'setSmartphoneRamCapacity',
  setIsSmartphoneRamCapacityValid: 'setIsSmartphoneRamCapacityValid',
  setIsSmartphoneRamCapacityFocused: 'setIsSmartphoneRamCapacityFocused',
  setSmartphoneRamCapacityUnit: 'setSmartphoneRamCapacityUnit',
  setSmartphoneStorageCapacity: 'setSmartphoneStorageCapacity',
  setIsSmartphoneStorageCapacityValid: 'setIsSmartphoneStorageCapacityValid',
  setIsSmartphoneStorageCapacityFocused:
    'setIsSmartphoneStorageCapacityFocused',
  setSmartphoneBatteryCapacity: 'setSmartphoneBatteryCapacity',
  setIsSmartphoneBatteryCapacityValid: 'setIsSmartphoneBatteryCapacityValid',
  setIsSmartphoneBatteryCapacityFocused:
    'setIsSmartphoneBatteryCapacityFocused',
  setSmartphoneCamera: 'setSmartphoneCamera',
  setIsSmartphoneCameraValid: 'setIsSmartphoneCameraValid',
  setIsSmartphoneCameraFocused: 'setIsSmartphoneCameraFocused',
  setSmartphoneColor: 'setSmartphoneColor',
  setIsSmartphoneColorValid: 'setIsSmartphoneColorValid',
  setIsSmartphoneColorFocused: 'setIsSmartphoneColorFocused',

  // page 2 -> specifications -> tablet
  setTabletOs: 'setTabletOs',
  setTabletChipset: 'setTabletChipset',
  setIsTabletChipsetValid: 'setIsTabletChipsetValid',
  setIsTabletChipsetFocused: 'setIsTabletChipsetFocused',
  setTabletDisplay: 'setTabletDisplay',
  setIsTabletDisplayValid: 'setIsTabletDisplayValid',
  setIsTabletDisplayFocused: 'setIsTabletDisplayFocused',
  setTabletResolutionHorizontal: 'setTabletResolutionHorizontal',
  setIsTabletResolutionHorizontalValid: 'setIsTabletResolutionHorizontalValid',
  setIsTabletResolutionHorizontalFocused:
    'setIsTabletResolutionHorizontalFocused',
  setTabletResolutionVertical: 'setTabletResolutionVertical',
  setIsTabletResolutionVerticalValid: 'setIsTabletResolutionVerticalValid',
  setIsTabletResolutionVerticalFocused: 'setIsTabletResolutionVerticalFocused',
  setTabletRamCapacity: 'setTabletRamCapacity',
  setIsTabletRamCapacityValid: 'setIsTabletRamCapacityValid',
  setIsTabletRamCapacityFocused: 'setIsTabletRamCapacityFocused',
  setTabletRamCapacityUnit: 'setTabletRamCapacityUnit',
  setTabletStorageCapacity: 'setTabletStorageCapacity',
  setIsTabletStorageCapacityValid: 'setIsTabletStorageCapacityValid',
  setIsTabletStorageCapacityFocused: 'setIsTabletStorageCapacityFocused',
  setTabletBatteryCapacity: 'setTabletBatteryCapacity',
  setIsTabletBatteryCapacityValid: 'setIsTabletBatteryCapacityValid',
  setIsTabletBatteryCapacityFocused: 'setIsTabletBatteryCapacityFocused',
  setTabletCamera: 'setTabletCamera',
  setIsTabletCameraValid: 'setIsTabletCameraValid',
  setIsTabletCameraFocused: 'setIsTabletCameraFocused',
  setTabletColor: 'setTabletColor',
  setIsTabletColorValid: 'setIsTabletColorValid',
  setIsTabletColorFocused: 'setIsTabletColorFocused',

  // page 2 -> specifications -> accessory
  setAccessoryType: 'setAccessoryType',
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid',
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused',
  setAccessoryColor: 'setAccessoryColor',
  setIsAccessoryColorValid: 'setIsAccessoryColorValid',
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused',
  setAccessoryInterface: 'setAccessoryInterface',
  setAccessoryFieldsAdditional: 'setAccessoryFieldsAdditional',
  setAreAccessoryFieldsAdditionalFocused:
    'setAreAccessoryFieldsAdditionalFocused',
  setAreAccessoryFieldsAdditionalValid: 'setAreAccessoryFieldsAdditionalValid',

  // page 2 -> specifications -> webcam
  setWebcamResolution: 'setWebcamResolution',
  setWebcamInterface: 'setWebcamInterface',
  setWebcamMicrophone: 'setWebcamMicrophone',
  setWebcamFrameRate: 'setWebcamFrameRate',
  setWebcamColor: 'setWebcamColor',
  setIsWebcamColorValid: 'setIsWebcamColorValid',
  setIsWebcamColorFocused: 'setIsWebcamColorFocused',

  // page 3
  setCurrentlySelectedAdditionalFieldIndex:
    'setCurrentlySelectedAdditionalFieldIndex',
  setImgFormDataArray: 'setImgFormDataArray',
  setAreImagesValid: 'setAreImagesValid',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  switch (action.type) {
    // page 1
    // page 1 -> brand
    case createProductAction.setBrand:
      return {
        ...state,
        brand: action.payload,
      };
    case createProductAction.setIsBrandValid:
      return {
        ...state,
        isBrandValid: action.payload,
      };
    case createProductAction.setIsBrandFocused:
      return {
        ...state,
        isBrandFocused: action.payload,
      };

    // page 1 -> model
    case createProductAction.setModel:
      return {
        ...state,
        model: action.payload,
      };
    case createProductAction.setIsModelValid:
      return {
        ...state,
        isModelValid: action.payload,
      };
    case createProductAction.setIsModelFocused:
      return {
        ...state,
        isModelFocused: action.payload,
      };

    case createProductAction.setProductCategory:
      return {
        ...state,
        productCategory: action.payload,
      };

    // page 1 -> description
    case createProductAction.setDescription:
      return {
        ...state,
        description: action.payload,
      };
    case createProductAction.setIsDescriptionValid:
      return {
        ...state,
        isDescriptionValid: action.payload,
      };
    case createProductAction.setIsDescriptionFocused:
      return {
        ...state,
        isDescriptionFocused: action.payload,
      };

    // page 1 -> price
    case createProductAction.setPrice:
      return {
        ...state,
        price: action.payload,
      };
    case createProductAction.setIsPriceValid:
      return {
        ...state,
        isPriceValid: action.payload,
      };
    case createProductAction.setIsPriceFocused:
      return {
        ...state,
        isPriceFocused: action.payload,
      };

    case createProductAction.setCurrency:
      return {
        ...state,
        currency: action.payload,
      };

    case createProductAction.setAvailability:
      return {
        ...state,
        availability: action.payload,
      };

    // page 1 -> quantity
    case createProductAction.setQuantity:
      return {
        ...state,
        quantity: action.payload,
      };
    case createProductAction.setIsQuantityValid:
      return {
        ...state,
        isQuantityValid: action.payload,
      };
    case createProductAction.setIsQuantityFocused:
      return {
        ...state,
        isQuantityFocused: action.payload,
      };

    // page 1 -> weight
    case createProductAction.setWeight:
      return {
        ...state,
        weight: action.payload,
      };
    case createProductAction.setIsWeightValid:
      return {
        ...state,
        isWeightValid: action.payload,
      };
    case createProductAction.setIsWeightFocused:
      return {
        ...state,
        isWeightFocused: action.payload,
      };
    case createProductAction.setWeightUnit:
      return {
        ...state,
        weightUnit: action.payload,
      };

    // page 1 -> dimension

    // page 1 -> dimension -> height
    case createProductAction.setDimensionHeight:
      return {
        ...state,
        dimensionHeight: action.payload,
      };
    case createProductAction.setIsDimensionHeightValid:
      return {
        ...state,
        isDimensionHeightValid: action.payload,
      };
    case createProductAction.setIsDimensionHeightFocused:
      return {
        ...state,
        isDimensionHeightFocused: action.payload,
      };
    case createProductAction.setDimensionHeightUnit:
      return {
        ...state,
        dimensionHeightUnit: action.payload,
      };

    // page 1 -> dimension -> width
    case createProductAction.setDimensionWidth:
      return {
        ...state,
        dimensionWidth: action.payload,
      };
    case createProductAction.setIsDimensionWidthValid:
      return {
        ...state,
        isDimensionWidthValid: action.payload,
      };
    case createProductAction.setIsDimensionWidthFocused:
      return {
        ...state,
        isDimensionWidthFocused: action.payload,
      };
    case createProductAction.setDimensionWidthUnit:
      return {
        ...state,
        dimensionWidthUnit: action.payload,
      };

    // page 1 -> dimension -> length
    case createProductAction.setDimensionLength:
      return {
        ...state,
        dimensionLength: action.payload,
      };
    case createProductAction.setIsDimensionLengthValid:
      return {
        ...state,
        isDimensionLengthValid: action.payload,
      };
    case createProductAction.setIsDimensionLengthFocused:
      return {
        ...state,
        isDimensionLengthFocused: action.payload,
      };
    case createProductAction.setDimensionLengthUnit:
      return {
        ...state,
        dimensionLengthUnit: action.payload,
      };

    // page 1 -> additional comments
    case createProductAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case createProductAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };
    case createProductAction.setIsAdditionalCommentsValid:
      return {
        ...state,
        isAdditionalCommentsValid: action.payload,
      };

    // page 2

    // page 2 -> specifications

    // page 2 -> specifications -> cpu

    // page 2 -> specifications -> cpu -> socket
    case createProductAction.setCpuSocket:
      return {
        ...state,
        cpuSocket: action.payload,
      };
    case createProductAction.setIsCpuSocketFocused:
      return {
        ...state,
        isCpuSocketFocused: action.payload,
      };
    case createProductAction.setIsCpuSocketValid:
      return {
        ...state,
        isCpuSocketValid: action.payload,
      };

    // page 2 -> specifications -> cpu -> frequency
    case createProductAction.setCpuFrequency:
      return {
        ...state,
        cpuFrequency: action.payload,
      };
    case createProductAction.setIsCpuFrequencyFocused:
      return {
        ...state,
        isCpuFrequencyFocused: action.payload,
      };
    case createProductAction.setIsCpuFrequencyValid:
      return {
        ...state,
        isCpuFrequencyValid: action.payload,
      };

    // page 2 -> specifications -> cpu -> cores
    case createProductAction.setCpuCores:
      return {
        ...state,
        cpuCores: action.payload,
      };
    case createProductAction.setIsCpuCoresFocused:
      return {
        ...state,
        isCpuCoresFocused: action.payload,
      };
    case createProductAction.setIsCpuCoresValid:
      return {
        ...state,
        isCpuCoresValid: action.payload,
      };

    // page 2 -> specifications -> cpu -> cache

    // page 2 -> specifications -> cpu -> cache -> l1
    case createProductAction.setCpuL1CacheCapacity:
      return {
        ...state,
        cpuL1CacheCapacity: action.payload,
      };
    case createProductAction.setIsCpuL1CacheCapacityFocused:
      return {
        ...state,
        isCpuL1CacheCapacityFocused: action.payload,
      };
    case createProductAction.setIsCpuL1CacheCapacityValid:
      return {
        ...state,
        isCpuL1CacheCapacityValid: action.payload,
      };
    case createProductAction.setCpuL1CacheCapacityUnit:
      return {
        ...state,
        cpuL1CacheCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> cpu -> cache -> l2
    case createProductAction.setCpuL2CacheCapacity:
      return {
        ...state,
        cpuL2CacheCapacity: action.payload,
      };
    case createProductAction.setIsCpuL2CacheCapacityFocused:
      return {
        ...state,
        isCpuL2CacheCapacityFocused: action.payload,
      };
    case createProductAction.setIsCpuL2CacheCapacityValid:
      return {
        ...state,
        isCpuL2CacheCapacityValid: action.payload,
      };
    case createProductAction.setCpuL2CacheCapacityUnit:
      return {
        ...state,
        cpuL2CacheCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> cpu -> cache -> l3
    case createProductAction.setCpuL3CacheCapacity:
      return {
        ...state,
        cpuL3CacheCapacity: action.payload,
      };
    case createProductAction.setIsCpuL3CacheCapacityFocused:
      return {
        ...state,
        isCpuL3CacheCapacityFocused: action.payload,
      };
    case createProductAction.setIsCpuL3CacheCapacityValid:
      return {
        ...state,
        isCpuL3CacheCapacityValid: action.payload,
      };
    case createProductAction.setCpuL3CacheCapacityUnit:
      return {
        ...state,
        cpuL3CacheCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> cpu -> wattage
    case createProductAction.setCpuWattage:
      return {
        ...state,
        cpuWattage: action.payload,
      };
    case createProductAction.setIsCpuWattageFocused:
      return {
        ...state,
        isCpuWattageFocused: action.payload,
      };
    case createProductAction.setIsCpuWattageValid:
      return {
        ...state,
        isCpuWattageValid: action.payload,
      };

    // page 2 -> specifications -> gpu

    // page 2 -> specifications -> gpu -> chipset
    case createProductAction.setGpuChipset:
      return {
        ...state,
        gpuChipset: action.payload,
      };
    case createProductAction.setIsGpuChipsetFocused:
      return {
        ...state,
        isGpuChipsetFocused: action.payload,
      };
    case createProductAction.setIsGpuChipsetValid:
      return {
        ...state,
        isGpuChipsetValid: action.payload,
      };

    // page 2 -> specifications -> gpu -> memory
    case createProductAction.setGpuMemoryCapacity:
      return {
        ...state,
        gpuMemoryCapacity: action.payload,
      };
    case createProductAction.setIsGpuMemoryCapacityFocused:
      return {
        ...state,
        isGpuMemoryCapacityFocused: action.payload,
      };
    case createProductAction.setIsGpuMemoryCapacityValid:
      return {
        ...state,
        isGpuMemoryCapacityValid: action.payload,
      };
    case createProductAction.setGpuMemoryCapacityUnit:
      return {
        ...state,
        gpuMemoryCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> gpu -> core clock
    case createProductAction.setGpuCoreClock:
      return {
        ...state,
        gpuCoreClock: action.payload,
      };
    case createProductAction.setIsGpuCoreClockFocused:
      return {
        ...state,
        isGpuCoreClockFocused: action.payload,
      };
    case createProductAction.setIsGpuCoreClockValid:
      return {
        ...state,
        isGpuCoreClockValid: action.payload,
      };

    //  page 2 -> specifications -> gpu -> boost clock
    case createProductAction.setGpuBoostClock:
      return {
        ...state,
        gpuBoostClock: action.payload,
      };
    case createProductAction.setIsGpuBoostClockFocused:
      return {
        ...state,
        isGpuBoostClockFocused: action.payload,
      };
    case createProductAction.setIsGpuBoostClockValid:
      return {
        ...state,
        isGpuBoostClockValid: action.payload,
      };

    // page 2 -> specifications -> gpu -> tdp
    case createProductAction.setGpuTdp:
      return {
        ...state,
        gpuTdp: action.payload,
      };
    case createProductAction.setIsGpuTdpFocused:
      return {
        ...state,
        isGpuTdpFocused: action.payload,
      };
    case createProductAction.setIsGpuTdpValid:
      return {
        ...state,
        isGpuTdpValid: action.payload,
      };

    // page 2 -> specifications -> motherboard

    // page 2 -> specifications -> motherboard -> socket
    case createProductAction.setMotherboardSocket:
      return {
        ...state,
        motherboardSocket: action.payload,
      };
    case createProductAction.setIsMotherboardSocketFocused:
      return {
        ...state,
        isMotherboardSocketFocused: action.payload,
      };
    case createProductAction.setIsMotherboardSocketValid:
      return {
        ...state,
        isMotherboardSocketValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> chipset
    case createProductAction.setMotherboardChipset:
      return {
        ...state,
        motherboardChipset: action.payload,
      };
    case createProductAction.setIsMotherboardChipsetFocused:
      return {
        ...state,
        isMotherboardChipsetFocused: action.payload,
      };
    case createProductAction.setIsMotherboardChipsetValid:
      return {
        ...state,
        isMotherboardChipsetValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> form factor
    case createProductAction.setMotherboardFormFactor:
      return {
        ...state,
        motherboardFormFactor: action.payload,
      };

    // page 2 -> specifications -> motherboard -> memory max capacity
    case createProductAction.setMotherboardMemoryMaxCapacity:
      return {
        ...state,
        motherboardMemoryMaxCapacity: action.payload,
      };
    case createProductAction.setIsMotherboardMemoryMaxCapacityFocused:
      return {
        ...state,
        isMotherboardMemoryMaxCapacityFocused: action.payload,
      };
    case createProductAction.setIsMotherboardMemoryMaxCapacityValid:
      return {
        ...state,
        isMotherboardMemoryMaxCapacityValid: action.payload,
      };
    case createProductAction.setMotherboardMemoryMaxCapacityUnit:
      return {
        ...state,
        motherboardMemoryMaxCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> motherboard -> memory slots
    case createProductAction.setMotherboardMemorySlots:
      return {
        ...state,
        motherboardMemorySlots: action.payload,
      };
    case createProductAction.setIsMotherboardMemorySlotsFocused:
      return {
        ...state,
        isMotherboardMemorySlotsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardMemorySlotsValid:
      return {
        ...state,
        isMotherboardMemorySlotsValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> memory type
    case createProductAction.setMotherboardMemoryType:
      return {
        ...state,
        motherboardMemoryType: action.payload,
      };

    // page 2 -> specifications -> motherboard -> sata ports
    case createProductAction.setMotherboardSataPorts:
      return {
        ...state,
        motherboardSataPorts: action.payload,
      };
    case createProductAction.setIsMotherboardSataPortsFocused:
      return {
        ...state,
        isMotherboardSataPortsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardSataPortsValid:
      return {
        ...state,
        isMotherboardSataPortsValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> m2 slots
    case createProductAction.setMotherboardM2Slots:
      return {
        ...state,
        motherboardM2Slots: action.payload,
      };
    case createProductAction.setIsMotherboardM2SlotsFocused:
      return {
        ...state,
        isMotherboardM2SlotsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardM2SlotsValid:
      return {
        ...state,
        isMotherboardM2SlotsValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> pcie3 slots
    case createProductAction.setMotherboardPcie3Slots:
      return {
        ...state,
        motherboardPcie3Slots: action.payload,
      };
    case createProductAction.setIsMotherboardPcie3SlotsFocused:
      return {
        ...state,
        isMotherboardPcie3SlotsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardPcie3SlotsValid:
      return {
        ...state,
        isMotherboardPcie3SlotsValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> pcie4 slots
    case createProductAction.setMotherboardPcie4Slots:
      return {
        ...state,
        motherboardPcie4Slots: action.payload,
      };
    case createProductAction.setIsMotherboardPcie4SlotsFocused:
      return {
        ...state,
        isMotherboardPcie4SlotsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardPcie4SlotsValid:
      return {
        ...state,
        isMotherboardPcie4SlotsValid: action.payload,
      };

    // page 2 -> specifications -> motherboard -> pcie5 slots
    case createProductAction.setMotherboardPcie5Slots:
      return {
        ...state,
        motherboardPcie5Slots: action.payload,
      };
    case createProductAction.setIsMotherboardPcie5SlotsFocused:
      return {
        ...state,
        isMotherboardPcie5SlotsFocused: action.payload,
      };
    case createProductAction.setIsMotherboardPcie5SlotsValid:
      return {
        ...state,
        isMotherboardPcie5SlotsValid: action.payload,
      };

    // page 2 -> specifications -> ram

    // page 2 -> specifications -> ram -> data rate
    case createProductAction.setRamDataRate:
      return {
        ...state,
        ramDataRate: action.payload,
      };
    case createProductAction.setIsRamDataRateFocused:
      return {
        ...state,
        isRamDataRateFocused: action.payload,
      };
    case createProductAction.setIsRamDataRateValid:
      return {
        ...state,
        isRamDataRateValid: action.payload,
      };

    // page 2 -> specifications -> ram -> modules quantity
    case createProductAction.setRamModulesQuantity:
      return {
        ...state,
        ramModulesQuantity: action.payload,
      };
    case createProductAction.setIsRamModulesQuantityFocused:
      return {
        ...state,
        isRamModulesQuantityFocused: action.payload,
      };
    case createProductAction.setIsRamModulesQuantityValid:
      return {
        ...state,
        isRamModulesQuantityValid: action.payload,
      };

    // page 2 -> specifications -> ram -> modules capacity
    case createProductAction.setRamModulesCapacity:
      return {
        ...state,
        ramModulesCapacity: action.payload,
      };
    case createProductAction.setIsRamModulesCapacityFocused:
      return {
        ...state,
        isRamModulesCapacityFocused: action.payload,
      };
    case createProductAction.setIsRamModulesCapacityValid:
      return {
        ...state,
        isRamModulesCapacityValid: action.payload,
      };
    case createProductAction.setRamModulesCapacityUnit:
      return {
        ...state,
        ramModulesCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> ram -> type
    case createProductAction.setRamType:
      return {
        ...state,
        ramType: action.payload,
      };

    // page 2 -> specifications -> ram -> color
    case createProductAction.setRamColor:
      return {
        ...state,
        ramColor: action.payload,
      };
    case createProductAction.setIsRamColorFocused:
      return {
        ...state,
        isRamColorFocused: action.payload,
      };
    case createProductAction.setIsRamColorValid:
      return {
        ...state,
        isRamColorValid: action.payload,
      };

    // page 2 -> specifications -> ram -> voltage
    case createProductAction.setRamVoltage:
      return {
        ...state,
        ramVoltage: action.payload,
      };
    case createProductAction.setIsRamVoltageFocused:
      return {
        ...state,
        isRamVoltageFocused: action.payload,
      };
    case createProductAction.setIsRamVoltageValid:
      return {
        ...state,
        isRamVoltageValid: action.payload,
      };

    // page 2 -> specifications -> ram -> timing
    case createProductAction.setRamTiming:
      return {
        ...state,
        ramTiming: action.payload,
      };
    case createProductAction.setIsRamTimingFocused:
      return {
        ...state,
        isRamTimingFocused: action.payload,
      };
    case createProductAction.setIsRamTimingValid:
      return {
        ...state,
        isRamTimingValid: action.payload,
      };

    // page 2 -> specifications -> storage

    // page 2 -> specifications -> storage -> type
    case createProductAction.setStorageType:
      return {
        ...state,
        storageType: action.payload,
      };

    // page 2 -> specifications -> storage -> capacity
    case createProductAction.setStorageCapacity:
      return {
        ...state,
        storageCapacity: action.payload,
      };
    case createProductAction.setIsStorageCapacityFocused:
      return {
        ...state,
        isStorageCapacityFocused: action.payload,
      };
    case createProductAction.setIsStorageCapacityValid:
      return {
        ...state,
        isStorageCapacityValid: action.payload,
      };
    case createProductAction.setStorageCapacityUnit:
      return {
        ...state,
        storageCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> storage -> cache capacity
    case createProductAction.setStorageCacheCapacity:
      return {
        ...state,
        storageCacheCapacity: action.payload,
      };
    case createProductAction.setIsStorageCacheCapacityFocused:
      return {
        ...state,
        isStorageCacheCapacityFocused: action.payload,
      };
    case createProductAction.setIsStorageCacheCapacityValid:
      return {
        ...state,
        isStorageCacheCapacityValid: action.payload,
      };
    case createProductAction.setStorageCacheCapacityUnit:
      return {
        ...state,
        storageCacheCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> storage -> form factor
    case createProductAction.setStorageFormFactor:
      return {
        ...state,
        storageFormFactor: action.payload,
      };

    // page 2 -> specifications -> storage -> interface
    case createProductAction.setStorageInterface:
      return {
        ...state,
        storageInterface: action.payload,
      };

    // page 2 -> specifications -> psu

    // page 2 -> specifications -> psu -> wattage
    case createProductAction.setPsuWattage:
      return {
        ...state,
        psuWattage: action.payload,
      };
    case createProductAction.setIsPsuWattageFocused:
      return {
        ...state,
        isPsuWattageFocused: action.payload,
      };
    case createProductAction.setIsPsuWattageValid:
      return {
        ...state,
        isPsuWattageValid: action.payload,
      };

    // page 2 -> specifications -> psu -> efficiency
    case createProductAction.setPsuEfficiency:
      return {
        ...state,
        psuEfficiency: action.payload,
      };

    // page 2 -> specifications -> psu -> form factor
    case createProductAction.setPsuFormFactor:
      return {
        ...state,
        psuFormFactor: action.payload,
      };

    // page 2 -> specifications -> psu -> modularity
    case createProductAction.setPsuModularity:
      return {
        ...state,
        psuModularity: action.payload,
      };

    // page 2 -> specifications -> case
    case createProductAction.setCaseColor:
      return {
        ...state,
        caseColor: action.payload,
      };
    case createProductAction.setIsCaseColorFocused:
      return {
        ...state,
        isCaseColorFocused: action.payload,
      };
    case createProductAction.setIsCaseColorValid:
      return {
        ...state,
        isCaseColorValid: action.payload,
      };
    case createProductAction.setCaseType:
      return {
        ...state,
        caseType: action.payload,
      };
    case createProductAction.setCaseSidePanel:
      return {
        ...state,
        caseSidePanel: action.payload,
      };

    // page 2 -> specifications -> display

    // page 2 -> specifications -> display -> size
    case createProductAction.setDisplaySize:
      return {
        ...state,
        displaySize: action.payload,
      };
    case createProductAction.setIsDisplaySizeFocused:
      return {
        ...state,
        isDisplaySizeFocused: action.payload,
      };
    case createProductAction.setIsDisplaySizeValid:
      return {
        ...state,
        isDisplaySizeValid: action.payload,
      };

    // page 2 -> specifications -> display -> resolution

    // page 2 -> specifications -> display -> resolution -> horizontal
    case createProductAction.setDisplayResolutionHorizontal:
      return {
        ...state,
        displayResolutionHorizontal: action.payload,
      };
    case createProductAction.setIsDisplayResolutionHorizontalFocused:
      return {
        ...state,
        isDisplayResolutionHorizontalFocused: action.payload,
      };
    case createProductAction.setIsDisplayResolutionHorizontalValid:
      return {
        ...state,
        isDisplayResolutionHorizontalValid: action.payload,
      };

    // page 2 -> specifications -> display -> resolution -> vertical
    case createProductAction.setDisplayResolutionVertical:
      return {
        ...state,
        displayResolutionVertical: action.payload,
      };
    case createProductAction.setIsDisplayResolutionVerticalFocused:
      return {
        ...state,
        isDisplayResolutionVerticalFocused: action.payload,
      };
    case createProductAction.setIsDisplayResolutionVerticalValid:
      return {
        ...state,
        isDisplayResolutionVerticalValid: action.payload,
      };

    // page 2 -> specifications -> display -> refresh rate
    case createProductAction.setDisplayRefreshRate:
      return {
        ...state,
        displayRefreshRate: action.payload,
      };
    case createProductAction.setIsDisplayRefreshRateFocused:
      return {
        ...state,
        isDisplayRefreshRateFocused: action.payload,
      };
    case createProductAction.setIsDisplayRefreshRateValid:
      return {
        ...state,
        isDisplayRefreshRateValid: action.payload,
      };

    // page 2 -> specifications -> display -> panel type
    case createProductAction.setDisplayPanelType:
      return {
        ...state,
        displayPanelType: action.payload,
      };

    // page 2 -> specifications -> display -> response time
    case createProductAction.setDisplayResponseTime:
      return {
        ...state,
        displayResponseTime: action.payload,
      };
    case createProductAction.setIsDisplayResponseTimeFocused:
      return {
        ...state,
        isDisplayResponseTimeFocused: action.payload,
      };
    case createProductAction.setIsDisplayResponseTimeValid:
      return {
        ...state,
        isDisplayResponseTimeValid: action.payload,
      };

    // page 2 -> specifications -> display -> aspect ratio
    case createProductAction.setDisplayAspectRatio:
      return {
        ...state,
        displayAspectRatio: action.payload,
      };
    case createProductAction.setIsDisplayAspectRatioFocused:
      return {
        ...state,
        isDisplayAspectRatioFocused: action.payload,
      };
    case createProductAction.setIsDisplayAspectRatioValid:
      return {
        ...state,
        isDisplayAspectRatioValid: action.payload,
      };

    // page 2 -> specifications -> keyboard
    case createProductAction.setKeyboardSwitch:
      return {
        ...state,
        keyboardSwitch: action.payload,
      };
    case createProductAction.setKeyboardLayout:
      return {
        ...state,
        keyboardLayout: action.payload,
      };
    case createProductAction.setKeyboardBacklight:
      return {
        ...state,
        keyboardBacklight: action.payload,
      };
    case createProductAction.setKeyboardInterface:
      return {
        ...state,
        keyboardInterface: action.payload,
      };

    // page 2 -> specifications -> mouse

    // page 2 -> specifications -> mouse -> sensor
    case createProductAction.setMouseSensor:
      return {
        ...state,
        mouseSensor: action.payload,
      };

    // page 2 -> specifications -> mouse -> dpi
    case createProductAction.setMouseDpi:
      return {
        ...state,
        mouseDpi: action.payload,
      };
    case createProductAction.setIsMouseDpiFocused:
      return {
        ...state,
        isMouseDpiFocused: action.payload,
      };
    case createProductAction.setIsMouseDpiValid:
      return {
        ...state,
        isMouseDpiValid: action.payload,
      };

    // page 2 -> specifications -> mouse -> buttons
    case createProductAction.setMouseButtons:
      return {
        ...state,
        mouseButtons: action.payload,
      };
    case createProductAction.setIsMouseButtonsFocused:
      return {
        ...state,
        isMouseButtonsFocused: action.payload,
      };
    case createProductAction.setIsMouseButtonsValid:
      return {
        ...state,
        isMouseButtonsValid: action.payload,
      };

    // page 2 -> specifications -> mouse -> color
    case createProductAction.setMouseColor:
      return {
        ...state,
        mouseColor: action.payload,
      };
    case createProductAction.setIsMouseColorFocused:
      return {
        ...state,
        isMouseColorFocused: action.payload,
      };
    case createProductAction.setIsMouseColorValid:
      return {
        ...state,
        isMouseColorValid: action.payload,
      };

    // page 2 -> specifications -> mouse -> interface
    case createProductAction.setMouseInterface:
      return {
        ...state,
        mouseInterface: action.payload,
      };

    // page 2 -> specifications -> headphone

    // page 2 -> specifications -> headphone -> type
    case createProductAction.setHeadphoneType:
      return {
        ...state,
        headphoneType: action.payload,
      };

    // page 2 -> specifications -> headphone -> driver
    case createProductAction.setHeadphoneDriver:
      return {
        ...state,
        headphoneDriver: action.payload,
      };
    case createProductAction.setIsHeadphoneDriverFocused:
      return {
        ...state,
        isHeadphoneDriverFocused: action.payload,
      };
    case createProductAction.setIsHeadphoneDriverValid:
      return {
        ...state,
        isHeadphoneDriverValid: action.payload,
      };

    // page 2 -> specifications -> headphone -> frequency response
    case createProductAction.setHeadphoneFrequencyResponse:
      return {
        ...state,
        headphoneFrequencyResponse: action.payload,
      };
    case createProductAction.setIsHeadphoneFrequencyResponseFocused:
      return {
        ...state,
        isHeadphoneFrequencyResponseFocused: action.payload,
      };
    case createProductAction.setIsHeadphoneFrequencyResponseValid:
      return {
        ...state,
        isHeadphoneFrequencyResponseValid: action.payload,
      };

    // page 2 -> specifications -> headphone -> impedance
    case createProductAction.setHeadphoneImpedance:
      return {
        ...state,
        headphoneImpedance: action.payload,
      };
    case createProductAction.setIsHeadphoneImpedanceFocused:
      return {
        ...state,
        isHeadphoneImpedanceFocused: action.payload,
      };
    case createProductAction.setIsHeadphoneImpedanceValid:
      return {
        ...state,
        isHeadphoneImpedanceValid: action.payload,
      };

    // page 2 -> specifications -> headphone -> color
    case createProductAction.setHeadphoneColor:
      return {
        ...state,
        headphoneColor: action.payload,
      };
    case createProductAction.setIsHeadphoneColorFocused:
      return {
        ...state,
        isHeadphoneColorFocused: action.payload,
      };
    case createProductAction.setIsHeadphoneColorValid:
      return {
        ...state,
        isHeadphoneColorValid: action.payload,
      };

    // page 2 -> specifications -> headphone -> interface
    case createProductAction.setHeadphoneInterface:
      return {
        ...state,
        headphoneInterface: action.payload,
      };

    // page 2 -> specifications -> speaker

    // page 2 -> specifications -> speaker -> type
    case createProductAction.setSpeakerType:
      return {
        ...state,
        speakerType: action.payload,
      };

    // page 2 -> specifications -> speaker -> wattage
    case createProductAction.setSpeakerTotalWattage:
      return {
        ...state,
        speakerTotalWattage: action.payload,
      };
    case createProductAction.setIsSpeakerTotalWattageFocused:
      return {
        ...state,
        isSpeakerTotalWattageFocused: action.payload,
      };
    case createProductAction.setIsSpeakerTotalWattageValid:
      return {
        ...state,
        isSpeakerTotalWattageValid: action.payload,
      };

    // page 2 -> specifications -> speaker -> frequency response
    case createProductAction.setSpeakerFrequencyResponse:
      return {
        ...state,
        speakerFrequencyResponse: action.payload,
      };
    case createProductAction.setIsSpeakerFrequencyResponseFocused:
      return {
        ...state,
        isSpeakerFrequencyResponseFocused: action.payload,
      };
    case createProductAction.setIsSpeakerFrequencyResponseValid:
      return {
        ...state,
        isSpeakerFrequencyResponseValid: action.payload,
      };

    // page 2 -> specifications -> speaker -> color
    case createProductAction.setSpeakerColor:
      return {
        ...state,
        speakerColor: action.payload,
      };
    case createProductAction.setIsSpeakerColorFocused:
      return {
        ...state,
        isSpeakerColorFocused: action.payload,
      };
    case createProductAction.setIsSpeakerColorValid:
      return {
        ...state,
        isSpeakerColorValid: action.payload,
      };

    // page 2 -> specifications -> speaker -> interface
    case createProductAction.setSpeakerInterface:
      return {
        ...state,
        speakerInterface: action.payload,
      };

    // page 2 -> specifications -> smartphone

    // page 2 -> specifications -> smartphone -> os
    case createProductAction.setSmartphoneOs:
      return {
        ...state,
        smartphoneOs: action.payload,
      };

    // page 2 -> specifications -> smartphone -> chipset
    case createProductAction.setSmartphoneChipset:
      return {
        ...state,
        smartphoneChipset: action.payload,
      };
    case createProductAction.setIsSmartphoneChipsetFocused:
      return {
        ...state,
        isSmartphoneChipsetFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneChipsetValid:
      return {
        ...state,
        isSmartphoneChipsetValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> display
    case createProductAction.setSmartphoneDisplay:
      return {
        ...state,
        smartphoneDisplay: action.payload,
      };
    case createProductAction.setIsSmartphoneDisplayFocused:
      return {
        ...state,
        isSmartphoneDisplayFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneDisplayValid:
      return {
        ...state,
        isSmartphoneDisplayValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> resolution

    // page 2 -> specifications -> smartphone -> resolution -> horizontal
    case createProductAction.setSmartphoneResolutionHorizontal:
      return {
        ...state,
        smartphoneResolutionHorizontal: action.payload,
      };
    case createProductAction.setIsSmartphoneResolutionHorizontalFocused:
      return {
        ...state,
        isSmartphoneResolutionHorizontalFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneResolutionHorizontalValid:
      return {
        ...state,
        isSmartphoneResolutionHorizontalValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> resolution -> vertical
    case createProductAction.setSmartphoneResolutionVertical:
      return {
        ...state,
        smartphoneResolutionVertical: action.payload,
      };
    case createProductAction.setIsSmartphoneResolutionVerticalFocused:
      return {
        ...state,
        isSmartphoneResolutionVerticalFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneResolutionVerticalValid:
      return {
        ...state,
        isSmartphoneResolutionVerticalValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> ram
    case createProductAction.setSmartphoneRamCapacity:
      return {
        ...state,
        smartphoneRamCapacity: action.payload,
      };
    case createProductAction.setIsSmartphoneRamCapacityFocused:
      return {
        ...state,
        isSmartphoneRamCapacityFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneRamCapacityValid:
      return {
        ...state,
        isSmartphoneRamCapacityValid: action.payload,
      };
    case createProductAction.setSmartphoneRamCapacityUnit:
      return {
        ...state,
        smartphoneRamCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> smartphone -> storage
    case createProductAction.setSmartphoneStorageCapacity:
      return {
        ...state,
        smartphoneStorageCapacity: action.payload,
      };
    case createProductAction.setIsSmartphoneStorageCapacityFocused:
      return {
        ...state,
        isSmartphoneStorageCapacityFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneStorageCapacityValid:
      return {
        ...state,
        isSmartphoneStorageCapacityValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> battery
    case createProductAction.setSmartphoneBatteryCapacity:
      return {
        ...state,
        smartphoneBatteryCapacity: action.payload,
      };
    case createProductAction.setIsSmartphoneBatteryCapacityFocused:
      return {
        ...state,
        isSmartphoneBatteryCapacityFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneBatteryCapacityValid:
      return {
        ...state,
        isSmartphoneBatteryCapacityValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> camera
    case createProductAction.setSmartphoneCamera:
      return {
        ...state,
        smartphoneCamera: action.payload,
      };
    case createProductAction.setIsSmartphoneCameraFocused:
      return {
        ...state,
        isSmartphoneCameraFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneCameraValid:
      return {
        ...state,
        isSmartphoneCameraValid: action.payload,
      };

    // page 2 -> specifications -> smartphone -> color
    case createProductAction.setSmartphoneColor:
      return {
        ...state,
        smartphoneColor: action.payload,
      };
    case createProductAction.setIsSmartphoneColorFocused:
      return {
        ...state,
        isSmartphoneColorFocused: action.payload,
      };
    case createProductAction.setIsSmartphoneColorValid:
      return {
        ...state,
        isSmartphoneColorValid: action.payload,
      };

    // page 2 -> specifications -> tablet

    // page 2 -> specifications -> tablet -> os
    case createProductAction.setTabletOs:
      return {
        ...state,
        tabletOs: action.payload,
      };

    // page 2 -> specifications -> tablet -> chipset
    case createProductAction.setTabletChipset:
      return {
        ...state,
        tabletChipset: action.payload,
      };
    case createProductAction.setIsTabletChipsetFocused:
      return {
        ...state,
        isTabletChipsetFocused: action.payload,
      };
    case createProductAction.setIsTabletChipsetValid:
      return {
        ...state,
        isTabletChipsetValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> display
    case createProductAction.setTabletDisplay:
      return {
        ...state,
        tabletDisplay: action.payload,
      };
    case createProductAction.setIsTabletDisplayFocused:
      return {
        ...state,
        isTabletDisplayFocused: action.payload,
      };
    case createProductAction.setIsTabletDisplayValid:
      return {
        ...state,
        isTabletDisplayValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> resolution

    // page 2 -> specifications -> tablet -> resolution -> horizontal
    case createProductAction.setTabletResolutionHorizontal:
      return {
        ...state,
        tabletResolutionHorizontal: action.payload,
      };
    case createProductAction.setIsTabletResolutionHorizontalFocused:
      return {
        ...state,
        isTabletResolutionHorizontalFocused: action.payload,
      };
    case createProductAction.setIsTabletResolutionHorizontalValid:
      return {
        ...state,
        isTabletResolutionHorizontalValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> resolution -> vertical
    case createProductAction.setTabletResolutionVertical:
      return {
        ...state,
        tabletResolutionVertical: action.payload,
      };
    case createProductAction.setIsTabletResolutionVerticalFocused:
      return {
        ...state,
        isTabletResolutionVerticalFocused: action.payload,
      };
    case createProductAction.setIsTabletResolutionVerticalValid:
      return {
        ...state,
        isTabletResolutionVerticalValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> ram
    case createProductAction.setTabletRamCapacity:
      return {
        ...state,
        tabletRamCapacity: action.payload,
      };
    case createProductAction.setIsTabletRamCapacityFocused:
      return {
        ...state,
        isTabletRamCapacityFocused: action.payload,
      };
    case createProductAction.setIsTabletRamCapacityValid:
      return {
        ...state,
        isTabletRamCapacityValid: action.payload,
      };
    case createProductAction.setTabletRamCapacityUnit:
      return {
        ...state,
        tabletRamCapacityUnit: action.payload,
      };

    // page 2 -> specifications -> tablet -> storage
    case createProductAction.setTabletStorageCapacity:
      return {
        ...state,
        tabletStorageCapacity: action.payload,
      };
    case createProductAction.setIsTabletStorageCapacityFocused:
      return {
        ...state,
        isTabletStorageCapacityFocused: action.payload,
      };
    case createProductAction.setIsTabletStorageCapacityValid:
      return {
        ...state,
        isTabletStorageCapacityValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> battery
    case createProductAction.setTabletBatteryCapacity:
      return {
        ...state,
        tabletBatteryCapacity: action.payload,
      };
    case createProductAction.setIsTabletBatteryCapacityFocused:
      return {
        ...state,
        isTabletBatteryCapacityFocused: action.payload,
      };
    case createProductAction.setIsTabletBatteryCapacityValid:
      return {
        ...state,
        isTabletBatteryCapacityValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> camera
    case createProductAction.setTabletCamera:
      return {
        ...state,
        tabletCamera: action.payload,
      };
    case createProductAction.setIsTabletCameraFocused:
      return {
        ...state,
        isTabletCameraFocused: action.payload,
      };
    case createProductAction.setIsTabletCameraValid:
      return {
        ...state,
        isTabletCameraValid: action.payload,
      };

    // page 2 -> specifications -> tablet -> color
    case createProductAction.setTabletColor:
      return {
        ...state,
        tabletColor: action.payload,
      };
    case createProductAction.setIsTabletColorFocused:
      return {
        ...state,
        isTabletColorFocused: action.payload,
      };
    case createProductAction.setIsTabletColorValid:
      return {
        ...state,
        isTabletColorValid: action.payload,
      };

    // page 2 -> specifications -> accessory

    // page 2 -> specifications -> accessory -> type
    case createProductAction.setAccessoryType:
      return {
        ...state,
        accessoryType: action.payload,
      };
    case createProductAction.setIsAccessoryTypeFocused:
      return {
        ...state,
        isAccessoryTypeFocused: action.payload,
      };
    case createProductAction.setIsAccessoryTypeValid:
      return {
        ...state,
        isAccessoryTypeValid: action.payload,
      };

    // page 2 -> specifications -> accessory -> color
    case createProductAction.setAccessoryColor:
      return {
        ...state,
        accessoryColor: action.payload,
      };
    case createProductAction.setIsAccessoryColorFocused:
      return {
        ...state,
        isAccessoryColorFocused: action.payload,
      };
    case createProductAction.setIsAccessoryColorValid:
      return {
        ...state,
        isAccessoryColorValid: action.payload,
      };

    // page 2 -> specifications -> accessory -> interface
    case createProductAction.setAccessoryInterface:
      return {
        ...state,
        accessoryInterface: action.payload,
      };

    // page 2 -> specifications -> accessory -> additional fields
    case createProductAction.setAccessoryFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = accessoryFieldsAdditionalClone.size;
          accessoryFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            accessoryFieldsAdditional: accessoryFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { index } = action.payload;
          accessoryFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAccessoryFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(accessoryFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredAccessoryFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            accessoryFieldsAdditional: filteredAccessoryFieldsAdditional,
          };
        }
        case 'update': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = accessoryFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? accessoryFieldsAdditionalClone.set(index, [data, prevValue])
            : accessoryFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            accessoryFieldsAdditional: accessoryFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreAccessoryFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalFocusedClone.size;
          areAccessoryFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              areAccessoryFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              filteredAreAccessoryFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areAccessoryFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              areAccessoryFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreAccessoryFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalValidClone.size;
          areAccessoryFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              areAccessoryFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              filteredAreAccessoryFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areAccessoryFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              areAccessoryFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

    // page 2 -> specifications -> webcam

    // page 2 -> specifications -> webcam -> resolution
    case createProductAction.setWebcamResolution:
      return {
        ...state,
        webcamResolution: action.payload,
      };

    // page 2 -> specifications -> webcam -> frame rate
    case createProductAction.setWebcamFrameRate:
      return {
        ...state,
        webcamFrameRate: action.payload,
      };

    // page 2 -> specifications -> webcam -> color
    case createProductAction.setWebcamColor:
      return {
        ...state,
        webcamColor: action.payload,
      };
    case createProductAction.setIsWebcamColorFocused:
      return {
        ...state,
        isWebcamColorFocused: action.payload,
      };
    case createProductAction.setIsWebcamColorValid:
      return {
        ...state,
        isWebcamColorValid: action.payload,
      };

    // page 2 -> specifications -> webcam -> interface
    case createProductAction.setWebcamInterface:
      return {
        ...state,
        webcamInterface: action.payload,
      };

    // page 2 -> specifications -> microphone
    case createProductAction.setWebcamMicrophone:
      return {
        ...state,
        webcamMicrophone: action.payload,
      };

    // page 3

    case createProductAction.setCurrentlySelectedAdditionalFieldIndex:
      return {
        ...state,
        currentlySelectedAdditionalFieldIndex: action.payload,
      };

    case createProductAction.setImgFormDataArray:
      return {
        ...state,
        imgFormDataArray: action.payload,
      };
    case createProductAction.setAreImagesValid:
      return {
        ...state,
        areImagesValid: action.payload,
      };

    //
    case createProductAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createProductAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createProductAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createProductAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createProductAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createProductAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createProductAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createProductAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createProductAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export { createProductAction, createProductReducer, initialCreateProductState };
