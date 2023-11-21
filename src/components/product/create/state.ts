import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
} from './types';

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
  cpuFieldsAdditional: new Map<number, [string, string]>(),
  areCpuFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areCpuFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  gpuFieldsAdditional: new Map<number, [string, string]>(),
  areGpuFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areGpuFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  motherboardFieldsAdditional: new Map<number, [string, string]>(),
  areMotherboardFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areMotherboardFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  ramFieldsAdditional: new Map<number, [string, string]>(),
  areRamFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areRamFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  storageFieldsAdditional: new Map<number, [string, string]>(),
  areStorageFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areStorageFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> psu
  psuWattage: '',
  isPsuWattageFocused: false,
  isPsuWattageValid: false,
  psuEfficiency: '80+ Bronze',
  psuModularity: 'Full',
  psuFormFactor: 'ATX',
  psuFieldsAdditional: new Map<number, [string, string]>(),
  arePsuFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  arePsuFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> case
  caseColor: '',
  isCaseColorFocused: false,
  isCaseColorValid: false,
  caseType: 'Mid Tower',
  caseSidePanel: 'Solid',
  caseFieldsAdditional: new Map<number, [string, string]>(),
  areCaseFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areCaseFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  displayFieldsAdditional: new Map<number, [string, string]>(),
  areDisplayFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areDisplayFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> keyboard
  keyboardBacklight: 'RGB',
  keyboardInterface: 'USB',
  keyboardLayout: 'QWERTY',
  keyboardSwitch: 'Cherry MX Brown',
  keyboardFieldsAdditional: new Map<number, [string, string]>(),
  areKeyboardFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areKeyboardFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  mouseFieldsAdditional: new Map<number, [string, string]>(),
  areMouseFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areMouseFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  headphoneFieldsAdditional: new Map<number, [string, string]>(),
  areHeadphoneFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areHeadphoneFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  speakerFieldsAdditional: new Map<number, [string, string]>(),
  areSpeakerFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areSpeakerFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  smartphoneFieldsAdditional: new Map<number, [string, string]>(),
  areSmartphoneFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areSmartphoneFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  tabletFieldsAdditional: new Map<number, [string, string]>(),
  areTabletFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areTabletFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

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
  webcamFieldsAdditional: new Map<number, [string, string]>(),
  areWebcamFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areWebcamFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> microphone
  microphoneColor: '',
  isMicrophoneColorFocused: false,
  isMicrophoneColorValid: false,
  microphoneInterface: 'USB',
  microphoneType: 'Condenser',
  microphonePolarPattern: 'Cardioid',
  microphoneFrequencyResponse: '',
  isMicrophoneFrequencyResponseFocused: false,
  isMicrophoneFrequencyResponseValid: false,
  microphoneFieldsAdditional: new Map<number, [string, string]>(),
  areMicrophoneFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areMicrophoneFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),

  // page 3
  imgFormDataArray: [],
  areImagesValid: false,

  // misc
  currentlySelectedAdditionalFieldIndex: 0,
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
  setCpuFieldsAdditional: 'setCpuFieldsAdditional',
  setAreCpuFieldsAdditionalFocused: 'setAreCpuFieldsAdditionalFocused',
  setAreCpuFieldsAdditionalValid: 'setAreCpuFieldsAdditionalValid',

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
  setGpuFieldsAdditional: 'setGpuFieldsAdditional',
  setAreGpuFieldsAdditionalFocused: 'setAreGpuFieldsAdditionalFocused',
  setAreGpuFieldsAdditionalValid: 'setAreGpuFieldsAdditionalValid',

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
  setMotherboardFieldsAdditional: 'setMotherboardFieldsAdditional',
  setAreMotherboardFieldsAdditionalFocused:
    'setAreMotherboardFieldsAdditionalFocused',
  setAreMotherboardFieldsAdditionalValid:
    'setAreMotherboardFieldsAdditionalValid',

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
  setRamFieldsAdditional: 'setRamFieldsAdditional',
  setAreRamFieldsAdditionalFocused: 'setAreRamFieldsAdditionalFocused',
  setAreRamFieldsAdditionalValid: 'setAreRamFieldsAdditionalValid',

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
  setStorageFieldsAdditional: 'setStorageFieldsAdditional',
  setAreStorageFieldsAdditionalFocused: 'setAreStorageFieldsAdditionalFocused',
  setAreStorageFieldsAdditionalValid: 'setAreStorageFieldsAdditionalValid',

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage',
  setIsPsuWattageValid: 'setIsPsuWattageValid',
  setIsPsuWattageFocused: 'setIsPsuWattageFocused',
  setPsuEfficiency: 'setPsuEfficiency',
  setPsuFormFactor: 'setPsuFormFactor',
  setPsuModularity: 'setPsuModularity',
  setPsuFieldsAdditional: 'setPsuFieldsAdditional',
  setArePsuFieldsAdditionalFocused: 'setArePsuFieldsAdditionalFocused',
  setArePsuFieldsAdditionalValid: 'setArePsuFieldsAdditionalValid',

  // page 2 -> specifications -> case
  setCaseColor: 'setCaseColor',
  setIsCaseColorValid: 'setIsCaseColorValid',
  setIsCaseColorFocused: 'setIsCaseColorFocused',
  setCaseType: 'setCaseType',
  setCaseSidePanel: 'setCaseSidePanel',
  setCaseFieldsAdditional: 'setCaseFieldsAdditional',
  setAreCaseFieldsAdditionalFocused: 'setAreCaseFieldsAdditionalFocused',
  setAreCaseFieldsAdditionalValid: 'setAreCaseFieldsAdditionalValid',

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
  setDisplayFieldsAdditional: 'setDisplayFieldsAdditional',
  setAreDisplayFieldsAdditionalFocused: 'setAreDisplayFieldsAdditionalFocused',
  setAreDisplayFieldsAdditionalValid: 'setAreDisplayFieldsAdditionalValid',

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch',
  setKeyboardLayout: 'setKeyboardLayout',
  setKeyboardBacklight: 'setKeyboardBacklight',
  setKeyboardInterface: 'setKeyboardInterface',
  setKeyboardFieldsAdditional: 'setKeyboardFieldsAdditional',
  setAreKeyboardFieldsAdditionalFocused:
    'setAreKeyboardFieldsAdditionalFocused',
  setAreKeyboardFieldsAdditionalValid: 'setAreKeyboardFieldsAdditionalValid',

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
  setMouseFieldsAdditional: 'setMouseFieldsAdditional',
  setAreMouseFieldsAdditionalFocused: 'setAreMouseFieldsAdditionalFocused',
  setAreMouseFieldsAdditionalValid: 'setAreMouseFieldsAdditionalValid',

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
  setHeadphoneFieldsAdditional: 'setHeadphoneFieldsAdditional',
  setAreHeadphoneFieldsAdditionalFocused:
    'setAreHeadphoneFieldsAdditionalFocused',
  setAreHeadphoneFieldsAdditionalValid: 'setAreHeadphoneFieldsAdditionalValid',

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
  setSpeakerFieldsAdditional: 'setSpeakerFieldsAdditional',
  setAreSpeakerFieldsAdditionalFocused: 'setAreSpeakerFieldsAdditionalFocused',
  setAreSpeakerFieldsAdditionalValid: 'setAreSpeakerFieldsAdditionalValid',

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
  setSmartphoneFieldsAdditional: 'setSmartphoneFieldsAdditional',
  setAreSmartphoneFieldsAdditionalFocused:
    'setAreSmartphoneFieldsAdditionalFocused',
  setAreSmartphoneFieldsAdditionalValid:
    'setAreSmartphoneFieldsAdditionalValid',

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
  setTabletFieldsAdditional: 'setTabletFieldsAdditional',
  setAreTabletFieldsAdditionalFocused: 'setAreTabletFieldsAdditionalFocused',
  setAreTabletFieldsAdditionalValid: 'setAreTabletFieldsAdditionalValid',

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
  setCurrentlySelectedAdditionalFieldIndex:
    'setCurrentlySelectedAdditionalFieldIndex',

  // page 2 -> specifications -> webcam
  setWebcamResolution: 'setWebcamResolution',
  setWebcamInterface: 'setWebcamInterface',
  setWebcamMicrophone: 'setWebcamMicrophone',
  setWebcamFrameRate: 'setWebcamFrameRate',
  setWebcamColor: 'setWebcamColor',
  setIsWebcamColorValid: 'setIsWebcamColorValid',
  setIsWebcamColorFocused: 'setIsWebcamColorFocused',
  setWebcamFieldsAdditional: 'setWebcamFieldsAdditional',
  setAreWebcamFieldsAdditionalFocused: 'setAreWebcamFieldsAdditionalFocused',
  setAreWebcamFieldsAdditionalValid: 'setAreWebcamFieldsAdditionalValid',

  // page 2 -> specifications -> microphone
  setMicrophoneType: 'setMicrophoneType',
  setMicrophonePolarPattern: 'setMicrophonePolarPattern',
  setMicrophoneInterface: 'setMicrophoneInterface',
  setMicrophoneColor: 'setMicrophoneColor',
  setIsMicrophoneColorValid: 'setIsMicrophoneColorValid',
  setIsMicrophoneColorFocused: 'setIsMicrophoneColorFocused',
  setMicrophoneFrequencyResponse: 'setMicrophoneFrequencyResponse',
  setIsMicrophoneFrequencyResponseValid:
    'setIsMicrophoneFrequencyResponseValid',
  setIsMicrophoneFrequencyResponseFocused:
    'setIsMicrophoneFrequencyResponseFocused',
  setMicrophoneFieldsAdditional: 'setMicrophoneFieldsAdditional',
  setAreMicrophoneFieldsAdditionalFocused:
    'setAreMicrophoneFieldsAdditionalFocused',
  setAreMicrophoneFieldsAdditionalValid:
    'setAreMicrophoneFieldsAdditionalValid',

  // page 3
  setImgFormDataArray: 'setImgFormDataArray',
  setAreImagesValid: 'setAreImagesValid',

  // misc.
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

    // page 2 -> specifications -> cpu -> additional fields
    case createProductAction.setCpuFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const cpuFieldsAdditionalClone = structuredClone(
            state.cpuFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = cpuFieldsAdditionalClone.size;
          cpuFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            cpuFieldsAdditional: cpuFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const cpuFieldsAdditionalClone = structuredClone(
            state.cpuFieldsAdditional
          );

          const { index } = action.payload;
          cpuFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredCpuFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(cpuFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredCpuFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            cpuFieldsAdditional: filteredCpuFieldsAdditional,
          };
        }
        case 'update': {
          const cpuFieldsAdditionalClone = structuredClone(
            state.cpuFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = cpuFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? cpuFieldsAdditionalClone.set(index, [data, prevValue])
            : cpuFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            cpuFieldsAdditional: cpuFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCpuFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCpuFieldsAdditionalFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areCpuFieldsAdditionalFocusedClone.size;
          areCpuFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areCpuFieldsAdditionalFocused: areCpuFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areCpuFieldsAdditionalFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areCpuFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCpuFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCpuFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCpuFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCpuFieldsAdditionalFocused:
              filteredAreCpuFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areCpuFieldsAdditionalFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCpuFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCpuFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : areCpuFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCpuFieldsAdditionalFocused: areCpuFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCpuFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCpuFieldsAdditionalValidClone = structuredClone(
            state.areCpuFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areCpuFieldsAdditionalValidClone.size;
          areCpuFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areCpuFieldsAdditionalValid: areCpuFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areCpuFieldsAdditionalValidClone = structuredClone(
            state.areCpuFieldsAdditionalValid
          );

          const { index } = action.payload;
          areCpuFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCpuFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCpuFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCpuFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCpuFieldsAdditionalValid: filteredAreCpuFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areCpuFieldsAdditionalValidClone = structuredClone(
            state.areCpuFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCpuFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCpuFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areCpuFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCpuFieldsAdditionalValid: areCpuFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> gpu -> additional fields
    case createProductAction.setGpuFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const gpuFieldsAdditionalClone = structuredClone(
            state.gpuFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = gpuFieldsAdditionalClone.size;
          gpuFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            gpuFieldsAdditional: gpuFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const gpuFieldsAdditionalClone = structuredClone(
            state.gpuFieldsAdditional
          );

          const { index } = action.payload;
          gpuFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredGpuFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(gpuFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredGpuFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            gpuFieldsAdditional: filteredGpuFieldsAdditional,
          };
        }
        case 'update': {
          const gpuFieldsAdditionalClone = structuredClone(
            state.gpuFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = gpuFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? gpuFieldsAdditionalClone.set(index, [data, prevValue])
            : gpuFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            gpuFieldsAdditional: gpuFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreGpuFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areGpuFieldsAdditionalFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areGpuFieldsAdditionalFocusedClone.size;
          areGpuFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areGpuFieldsAdditionalFocused: areGpuFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areGpuFieldsAdditionalFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areGpuFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreGpuFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areGpuFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreGpuFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areGpuFieldsAdditionalFocused:
              filteredAreGpuFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areGpuFieldsAdditionalFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areGpuFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areGpuFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : areGpuFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areGpuFieldsAdditionalFocused: areGpuFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreGpuFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areGpuFieldsAdditionalValidClone = structuredClone(
            state.areGpuFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areGpuFieldsAdditionalValidClone.size;
          areGpuFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areGpuFieldsAdditionalValid: areGpuFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areGpuFieldsAdditionalValidClone = structuredClone(
            state.areGpuFieldsAdditionalValid
          );

          const { index } = action.payload;
          areGpuFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreGpuFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areGpuFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreGpuFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areGpuFieldsAdditionalValid: filteredAreGpuFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areGpuFieldsAdditionalValidClone = structuredClone(
            state.areGpuFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areGpuFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areGpuFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areGpuFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areGpuFieldsAdditionalValid: areGpuFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> motherboard -> additional fields
    case createProductAction.setMotherboardFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const motherboardFieldsAdditionalClone = structuredClone(
            state.motherboardFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = motherboardFieldsAdditionalClone.size;
          motherboardFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            motherboardFieldsAdditional: motherboardFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const motherboardFieldsAdditionalClone = structuredClone(
            state.motherboardFieldsAdditional
          );

          const { index } = action.payload;
          motherboardFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMotherboardFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(motherboardFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMotherboardFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            motherboardFieldsAdditional: filteredMotherboardFieldsAdditional,
          };
        }
        case 'update': {
          const motherboardFieldsAdditionalClone = structuredClone(
            state.motherboardFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = motherboardFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? motherboardFieldsAdditionalClone.set(index, [data, prevValue])
            : motherboardFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            motherboardFieldsAdditional: motherboardFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMotherboardFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areMotherboardFieldsAdditionalFocusedClone.size;
          areMotherboardFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMotherboardFieldsAdditionalFocused:
              areMotherboardFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areMotherboardFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMotherboardFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMotherboardFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMotherboardFieldsAdditionalFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMotherboardFieldsAdditionalFocused:
              filteredAreMotherboardFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMotherboardFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMotherboardFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areMotherboardFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMotherboardFieldsAdditionalFocused:
              areMotherboardFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMotherboardFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMotherboardFieldsAdditionalValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areMotherboardFieldsAdditionalValidClone.size;
          areMotherboardFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areMotherboardFieldsAdditionalValid:
              areMotherboardFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areMotherboardFieldsAdditionalValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalValid
          );

          const { index } = action.payload;
          areMotherboardFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMotherboardFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMotherboardFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMotherboardFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMotherboardFieldsAdditionalValid:
              filteredAreMotherboardFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areMotherboardFieldsAdditionalValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMotherboardFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMotherboardFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areMotherboardFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMotherboardFieldsAdditionalValid:
              areMotherboardFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> ram -> additional fields
    case createProductAction.setRamFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const ramFieldsAdditionalClone = structuredClone(
            state.ramFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = ramFieldsAdditionalClone.size;
          ramFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            ramFieldsAdditional: ramFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const ramFieldsAdditionalClone = structuredClone(
            state.ramFieldsAdditional
          );

          const { index } = action.payload;
          ramFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredRamFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(ramFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredRamFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            ramFieldsAdditional: filteredRamFieldsAdditional,
          };
        }
        case 'update': {
          const ramFieldsAdditionalClone = structuredClone(
            state.ramFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = ramFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? ramFieldsAdditionalClone.set(index, [data, prevValue])
            : ramFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            ramFieldsAdditional: ramFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreRamFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areRamFieldsAdditionalFocusedClone = structuredClone(
            state.areRamFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areRamFieldsAdditionalFocusedClone.size;
          areRamFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areRamFieldsAdditionalFocused: areRamFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areRamFieldsAdditionalFocusedClone = structuredClone(
            state.areRamFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areRamFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreRamFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areRamFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreRamFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areRamFieldsAdditionalFocused:
              filteredAreRamFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areRamFieldsAdditionalFocusedClone = structuredClone(
            state.areRamFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areRamFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areRamFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : areRamFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areRamFieldsAdditionalFocused: areRamFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreRamFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areRamFieldsAdditionalValidClone = structuredClone(
            state.areRamFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areRamFieldsAdditionalValidClone.size;
          areRamFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areRamFieldsAdditionalValid: areRamFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areRamFieldsAdditionalValidClone = structuredClone(
            state.areRamFieldsAdditionalValid
          );

          const { index } = action.payload;
          areRamFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreRamFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areRamFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreRamFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areRamFieldsAdditionalValid: filteredAreRamFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areRamFieldsAdditionalValidClone = structuredClone(
            state.areRamFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areRamFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areRamFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areRamFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areRamFieldsAdditionalValid: areRamFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> storage -> additional fields
    case createProductAction.setStorageFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const storageFieldsAdditionalClone = structuredClone(
            state.storageFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = storageFieldsAdditionalClone.size;
          storageFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            storageFieldsAdditional: storageFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const storageFieldsAdditionalClone = structuredClone(
            state.storageFieldsAdditional
          );

          const { index } = action.payload;
          storageFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredStorageFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(storageFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredStorageFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            storageFieldsAdditional: filteredStorageFieldsAdditional,
          };
        }
        case 'update': {
          const storageFieldsAdditionalClone = structuredClone(
            state.storageFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = storageFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? storageFieldsAdditionalClone.set(index, [data, prevValue])
            : storageFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            storageFieldsAdditional: storageFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreStorageFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areStorageFieldsAdditionalFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areStorageFieldsAdditionalFocusedClone.size;
          areStorageFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areStorageFieldsAdditionalFocused:
              areStorageFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areStorageFieldsAdditionalFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areStorageFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreStorageFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areStorageFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreStorageFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areStorageFieldsAdditionalFocused:
              filteredAreStorageFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areStorageFieldsAdditionalFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areStorageFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areStorageFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areStorageFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areStorageFieldsAdditionalFocused:
              areStorageFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreStorageFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areStorageFieldsAdditionalValidClone = structuredClone(
            state.areStorageFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areStorageFieldsAdditionalValidClone.size;
          areStorageFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areStorageFieldsAdditionalValid:
              areStorageFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areStorageFieldsAdditionalValidClone = structuredClone(
            state.areStorageFieldsAdditionalValid
          );

          const { index } = action.payload;
          areStorageFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreStorageFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areStorageFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreStorageFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areStorageFieldsAdditionalValid:
              filteredAreStorageFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areStorageFieldsAdditionalValidClone = structuredClone(
            state.areStorageFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areStorageFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areStorageFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areStorageFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areStorageFieldsAdditionalValid:
              areStorageFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> psu -> additional fields
    case createProductAction.setPsuFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const psuFieldsAdditionalClone = structuredClone(
            state.psuFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = psuFieldsAdditionalClone.size;
          psuFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            psuFieldsAdditional: psuFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const psuFieldsAdditionalClone = structuredClone(
            state.psuFieldsAdditional
          );

          const { index } = action.payload;
          psuFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredPsuFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(psuFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredPsuFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            psuFieldsAdditional: filteredPsuFieldsAdditional,
          };
        }
        case 'update': {
          const psuFieldsAdditionalClone = structuredClone(
            state.psuFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = psuFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? psuFieldsAdditionalClone.set(index, [data, prevValue])
            : psuFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            psuFieldsAdditional: psuFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setArePsuFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const arePsuFieldsAdditionalFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = arePsuFieldsAdditionalFocusedClone.size;
          arePsuFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            arePsuFieldsAdditionalFocused: arePsuFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const arePsuFieldsAdditionalFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalFocused
          );

          const { index } = action.payload;
          arePsuFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredArePsuFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(arePsuFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredArePsuFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            arePsuFieldsAdditionalFocused:
              filteredArePsuFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const arePsuFieldsAdditionalFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = arePsuFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? arePsuFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : arePsuFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            arePsuFieldsAdditionalFocused: arePsuFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setArePsuFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const arePsuFieldsAdditionalValidClone = structuredClone(
            state.arePsuFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = arePsuFieldsAdditionalValidClone.size;
          arePsuFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            arePsuFieldsAdditionalValid: arePsuFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const arePsuFieldsAdditionalValidClone = structuredClone(
            state.arePsuFieldsAdditionalValid
          );

          const { index } = action.payload;
          arePsuFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredArePsuFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(arePsuFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredArePsuFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            arePsuFieldsAdditionalValid: filteredArePsuFieldsAdditionalValid,
          };
        }
        case 'update': {
          const arePsuFieldsAdditionalValidClone = structuredClone(
            state.arePsuFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = arePsuFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? arePsuFieldsAdditionalValidClone.set(index, [data, prevValue])
            : arePsuFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            arePsuFieldsAdditionalValid: arePsuFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> case -> additional fields
    case createProductAction.setCaseFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const caseFieldsAdditionalClone = structuredClone(
            state.caseFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = caseFieldsAdditionalClone.size;
          caseFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            caseFieldsAdditional: caseFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const caseFieldsAdditionalClone = structuredClone(
            state.caseFieldsAdditional
          );

          const { index } = action.payload;
          caseFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredCaseFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(caseFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredCaseFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            caseFieldsAdditional: filteredCaseFieldsAdditional,
          };
        }
        case 'update': {
          const caseFieldsAdditionalClone = structuredClone(
            state.caseFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = caseFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? caseFieldsAdditionalClone.set(index, [data, prevValue])
            : caseFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            caseFieldsAdditional: caseFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCaseFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCaseFieldsAdditionalFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areCaseFieldsAdditionalFocusedClone.size;
          areCaseFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areCaseFieldsAdditionalFocused: areCaseFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areCaseFieldsAdditionalFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areCaseFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCaseFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCaseFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCaseFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCaseFieldsAdditionalFocused:
              filteredAreCaseFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areCaseFieldsAdditionalFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCaseFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCaseFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : areCaseFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCaseFieldsAdditionalFocused: areCaseFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCaseFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCaseFieldsAdditionalValidClone = structuredClone(
            state.areCaseFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areCaseFieldsAdditionalValidClone.size;
          areCaseFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areCaseFieldsAdditionalValid: areCaseFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areCaseFieldsAdditionalValidClone = structuredClone(
            state.areCaseFieldsAdditionalValid
          );

          const { index } = action.payload;
          areCaseFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCaseFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCaseFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCaseFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCaseFieldsAdditionalValid: filteredAreCaseFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areCaseFieldsAdditionalValidClone = structuredClone(
            state.areCaseFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCaseFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCaseFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areCaseFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCaseFieldsAdditionalValid: areCaseFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> display -> additional fields
    case createProductAction.setDisplayFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const displayFieldsAdditionalClone = structuredClone(
            state.displayFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = displayFieldsAdditionalClone.size;
          displayFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            displayFieldsAdditional: displayFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const displayFieldsAdditionalClone = structuredClone(
            state.displayFieldsAdditional
          );

          const { index } = action.payload;
          displayFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredDisplayFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(displayFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredDisplayFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            displayFieldsAdditional: filteredDisplayFieldsAdditional,
          };
        }
        case 'update': {
          const displayFieldsAdditionalClone = structuredClone(
            state.displayFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = displayFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? displayFieldsAdditionalClone.set(index, [data, prevValue])
            : displayFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            displayFieldsAdditional: displayFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreDisplayFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areDisplayFieldsAdditionalFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areDisplayFieldsAdditionalFocusedClone.size;
          areDisplayFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areDisplayFieldsAdditionalFocused:
              areDisplayFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areDisplayFieldsAdditionalFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areDisplayFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreDisplayFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areDisplayFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreDisplayFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areDisplayFieldsAdditionalFocused:
              filteredAreDisplayFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areDisplayFieldsAdditionalFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areDisplayFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areDisplayFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areDisplayFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areDisplayFieldsAdditionalFocused:
              areDisplayFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreDisplayFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areDisplayFieldsAdditionalValidClone = structuredClone(
            state.areDisplayFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areDisplayFieldsAdditionalValidClone.size;
          areDisplayFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areDisplayFieldsAdditionalValid:
              areDisplayFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areDisplayFieldsAdditionalValidClone = structuredClone(
            state.areDisplayFieldsAdditionalValid
          );

          const { index } = action.payload;
          areDisplayFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreDisplayFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areDisplayFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreDisplayFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areDisplayFieldsAdditionalValid:
              filteredAreDisplayFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areDisplayFieldsAdditionalValidClone = structuredClone(
            state.areDisplayFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areDisplayFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areDisplayFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areDisplayFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areDisplayFieldsAdditionalValid:
              areDisplayFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> keyboard -> additional fields
    case createProductAction.setKeyboardFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const keyboardFieldsAdditionalClone = structuredClone(
            state.keyboardFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = keyboardFieldsAdditionalClone.size;
          keyboardFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            keyboardFieldsAdditional: keyboardFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const keyboardFieldsAdditionalClone = structuredClone(
            state.keyboardFieldsAdditional
          );

          const { index } = action.payload;
          keyboardFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredKeyboardFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(keyboardFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredKeyboardFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            keyboardFieldsAdditional: filteredKeyboardFieldsAdditional,
          };
        }
        case 'update': {
          const keyboardFieldsAdditionalClone = structuredClone(
            state.keyboardFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = keyboardFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? keyboardFieldsAdditionalClone.set(index, [data, prevValue])
            : keyboardFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            keyboardFieldsAdditional: keyboardFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreKeyboardFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areKeyboardFieldsAdditionalFocusedClone.size;
          areKeyboardFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areKeyboardFieldsAdditionalFocused:
              areKeyboardFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areKeyboardFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreKeyboardFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areKeyboardFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreKeyboardFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areKeyboardFieldsAdditionalFocused:
              filteredAreKeyboardFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areKeyboardFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areKeyboardFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areKeyboardFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areKeyboardFieldsAdditionalFocused:
              areKeyboardFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreKeyboardFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areKeyboardFieldsAdditionalValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areKeyboardFieldsAdditionalValidClone.size;
          areKeyboardFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areKeyboardFieldsAdditionalValid:
              areKeyboardFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areKeyboardFieldsAdditionalValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalValid
          );

          const { index } = action.payload;
          areKeyboardFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreKeyboardFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areKeyboardFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreKeyboardFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areKeyboardFieldsAdditionalValid:
              filteredAreKeyboardFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areKeyboardFieldsAdditionalValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areKeyboardFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areKeyboardFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areKeyboardFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areKeyboardFieldsAdditionalValid:
              areKeyboardFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> mouse -> additional fields
    case createProductAction.setMouseFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const mouseFieldsAdditionalClone = structuredClone(
            state.mouseFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = mouseFieldsAdditionalClone.size;
          mouseFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            mouseFieldsAdditional: mouseFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const mouseFieldsAdditionalClone = structuredClone(
            state.mouseFieldsAdditional
          );

          const { index } = action.payload;
          mouseFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMouseFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(mouseFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMouseFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            mouseFieldsAdditional: filteredMouseFieldsAdditional,
          };
        }
        case 'update': {
          const mouseFieldsAdditionalClone = structuredClone(
            state.mouseFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = mouseFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? mouseFieldsAdditionalClone.set(index, [data, prevValue])
            : mouseFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            mouseFieldsAdditional: mouseFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMouseFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMouseFieldsAdditionalFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areMouseFieldsAdditionalFocusedClone.size;
          areMouseFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMouseFieldsAdditionalFocused:
              areMouseFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areMouseFieldsAdditionalFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areMouseFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMouseFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMouseFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMouseFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMouseFieldsAdditionalFocused:
              filteredAreMouseFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areMouseFieldsAdditionalFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areMouseFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMouseFieldsAdditionalFocusedClone.set(index, [data, prevValue])
            : areMouseFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areMouseFieldsAdditionalFocused:
              areMouseFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMouseFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMouseFieldsAdditionalValidClone = structuredClone(
            state.areMouseFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areMouseFieldsAdditionalValidClone.size;
          areMouseFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areMouseFieldsAdditionalValid: areMouseFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areMouseFieldsAdditionalValidClone = structuredClone(
            state.areMouseFieldsAdditionalValid
          );

          const { index } = action.payload;
          areMouseFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMouseFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMouseFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMouseFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMouseFieldsAdditionalValid:
              filteredAreMouseFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areMouseFieldsAdditionalValidClone = structuredClone(
            state.areMouseFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areMouseFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMouseFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areMouseFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areMouseFieldsAdditionalValid: areMouseFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> headphone -> additional fields
    case createProductAction.setHeadphoneFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const headphoneFieldsAdditionalClone = structuredClone(
            state.headphoneFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = headphoneFieldsAdditionalClone.size;
          headphoneFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            headphoneFieldsAdditional: headphoneFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const headphoneFieldsAdditionalClone = structuredClone(
            state.headphoneFieldsAdditional
          );

          const { index } = action.payload;
          headphoneFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredHeadphoneFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(headphoneFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredHeadphoneFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            headphoneFieldsAdditional: filteredHeadphoneFieldsAdditional,
          };
        }
        case 'update': {
          const headphoneFieldsAdditionalClone = structuredClone(
            state.headphoneFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = headphoneFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? headphoneFieldsAdditionalClone.set(index, [data, prevValue])
            : headphoneFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            headphoneFieldsAdditional: headphoneFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreHeadphoneFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areHeadphoneFieldsAdditionalFocusedClone.size;
          areHeadphoneFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areHeadphoneFieldsAdditionalFocused:
              areHeadphoneFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areHeadphoneFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreHeadphoneFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areHeadphoneFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreHeadphoneFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areHeadphoneFieldsAdditionalFocused:
              filteredAreHeadphoneFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areHeadphoneFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areHeadphoneFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areHeadphoneFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areHeadphoneFieldsAdditionalFocused:
              areHeadphoneFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreHeadphoneFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areHeadphoneFieldsAdditionalValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areHeadphoneFieldsAdditionalValidClone.size;
          areHeadphoneFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areHeadphoneFieldsAdditionalValid:
              areHeadphoneFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areHeadphoneFieldsAdditionalValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalValid
          );

          const { index } = action.payload;
          areHeadphoneFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreHeadphoneFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areHeadphoneFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreHeadphoneFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areHeadphoneFieldsAdditionalValid:
              filteredAreHeadphoneFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areHeadphoneFieldsAdditionalValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areHeadphoneFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areHeadphoneFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areHeadphoneFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areHeadphoneFieldsAdditionalValid:
              areHeadphoneFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> speaker -> additional fields
    case createProductAction.setSpeakerFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const speakerFieldsAdditionalClone = structuredClone(
            state.speakerFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = speakerFieldsAdditionalClone.size;
          speakerFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            speakerFieldsAdditional: speakerFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const speakerFieldsAdditionalClone = structuredClone(
            state.speakerFieldsAdditional
          );

          const { index } = action.payload;
          speakerFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredSpeakerFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(speakerFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredSpeakerFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            speakerFieldsAdditional: filteredSpeakerFieldsAdditional,
          };
        }
        case 'update': {
          const speakerFieldsAdditionalClone = structuredClone(
            state.speakerFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = speakerFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? speakerFieldsAdditionalClone.set(index, [data, prevValue])
            : speakerFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            speakerFieldsAdditional: speakerFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSpeakerFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areSpeakerFieldsAdditionalFocusedClone.size;
          areSpeakerFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areSpeakerFieldsAdditionalFocused:
              areSpeakerFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areSpeakerFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSpeakerFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSpeakerFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSpeakerFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areSpeakerFieldsAdditionalFocused:
              filteredAreSpeakerFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areSpeakerFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSpeakerFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areSpeakerFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSpeakerFieldsAdditionalFocused:
              areSpeakerFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSpeakerFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSpeakerFieldsAdditionalValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areSpeakerFieldsAdditionalValidClone.size;
          areSpeakerFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areSpeakerFieldsAdditionalValid:
              areSpeakerFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areSpeakerFieldsAdditionalValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalValid
          );

          const { index } = action.payload;
          areSpeakerFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSpeakerFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSpeakerFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSpeakerFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areSpeakerFieldsAdditionalValid:
              filteredAreSpeakerFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areSpeakerFieldsAdditionalValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areSpeakerFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSpeakerFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areSpeakerFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areSpeakerFieldsAdditionalValid:
              areSpeakerFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> smartphone -> additional fields
    case createProductAction.setSmartphoneFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const smartphoneFieldsAdditionalClone = structuredClone(
            state.smartphoneFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = smartphoneFieldsAdditionalClone.size;
          smartphoneFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            smartphoneFieldsAdditional: smartphoneFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const smartphoneFieldsAdditionalClone = structuredClone(
            state.smartphoneFieldsAdditional
          );

          const { index } = action.payload;
          smartphoneFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredSmartphoneFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(smartphoneFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredSmartphoneFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            smartphoneFieldsAdditional: filteredSmartphoneFieldsAdditional,
          };
        }
        case 'update': {
          const smartphoneFieldsAdditionalClone = structuredClone(
            state.smartphoneFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = smartphoneFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? smartphoneFieldsAdditionalClone.set(index, [data, prevValue])
            : smartphoneFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            smartphoneFieldsAdditional: smartphoneFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSmartphoneFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areSmartphoneFieldsAdditionalFocusedClone.size;
          areSmartphoneFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areSmartphoneFieldsAdditionalFocused:
              areSmartphoneFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areSmartphoneFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSmartphoneFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSmartphoneFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSmartphoneFieldsAdditionalFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areSmartphoneFieldsAdditionalFocused:
              filteredAreSmartphoneFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areSmartphoneFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSmartphoneFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areSmartphoneFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSmartphoneFieldsAdditionalFocused:
              areSmartphoneFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSmartphoneFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSmartphoneFieldsAdditionalValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areSmartphoneFieldsAdditionalValidClone.size;
          areSmartphoneFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areSmartphoneFieldsAdditionalValid:
              areSmartphoneFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areSmartphoneFieldsAdditionalValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalValid
          );

          const { index } = action.payload;
          areSmartphoneFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSmartphoneFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSmartphoneFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSmartphoneFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areSmartphoneFieldsAdditionalValid:
              filteredAreSmartphoneFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areSmartphoneFieldsAdditionalValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areSmartphoneFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSmartphoneFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areSmartphoneFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSmartphoneFieldsAdditionalValid:
              areSmartphoneFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> tablet -> additional fields
    case createProductAction.setTabletFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const tabletFieldsAdditionalClone = structuredClone(
            state.tabletFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = tabletFieldsAdditionalClone.size;
          tabletFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            tabletFieldsAdditional: tabletFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const tabletFieldsAdditionalClone = structuredClone(
            state.tabletFieldsAdditional
          );

          const { index } = action.payload;
          tabletFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredTabletFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(tabletFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredTabletFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            tabletFieldsAdditional: filteredTabletFieldsAdditional,
          };
        }
        case 'update': {
          const tabletFieldsAdditionalClone = structuredClone(
            state.tabletFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = tabletFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? tabletFieldsAdditionalClone.set(index, [data, prevValue])
            : tabletFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            tabletFieldsAdditional: tabletFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreTabletFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areTabletFieldsAdditionalFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areTabletFieldsAdditionalFocusedClone.size;
          areTabletFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areTabletFieldsAdditionalFocused:
              areTabletFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areTabletFieldsAdditionalFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areTabletFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreTabletFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areTabletFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreTabletFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areTabletFieldsAdditionalFocused:
              filteredAreTabletFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areTabletFieldsAdditionalFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areTabletFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areTabletFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areTabletFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areTabletFieldsAdditionalFocused:
              areTabletFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreTabletFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areTabletFieldsAdditionalValidClone = structuredClone(
            state.areTabletFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areTabletFieldsAdditionalValidClone.size;
          areTabletFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areTabletFieldsAdditionalValid: areTabletFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areTabletFieldsAdditionalValidClone = structuredClone(
            state.areTabletFieldsAdditionalValid
          );

          const { index } = action.payload;
          areTabletFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreTabletFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areTabletFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreTabletFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areTabletFieldsAdditionalValid:
              filteredAreTabletFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areTabletFieldsAdditionalValidClone = structuredClone(
            state.areTabletFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areTabletFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areTabletFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areTabletFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areTabletFieldsAdditionalValid: areTabletFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

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

    // page 2 -> specifications -> webcam -> microphone
    case createProductAction.setWebcamMicrophone:
      return {
        ...state,
        webcamMicrophone: action.payload,
      };

    // page 2 -> specifications -> webcam -> additional fields
    case createProductAction.setWebcamFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const webcamFieldsAdditionalClone = structuredClone(
            state.webcamFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = webcamFieldsAdditionalClone.size;
          webcamFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            webcamFieldsAdditional: webcamFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const webcamFieldsAdditionalClone = structuredClone(
            state.webcamFieldsAdditional
          );

          const { index } = action.payload;
          webcamFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredWebcamFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(webcamFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredWebcamFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            webcamFieldsAdditional: filteredWebcamFieldsAdditional,
          };
        }
        case 'update': {
          const webcamFieldsAdditionalClone = structuredClone(
            state.webcamFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = webcamFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? webcamFieldsAdditionalClone.set(index, [data, prevValue])
            : webcamFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            webcamFieldsAdditional: webcamFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreWebcamFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areWebcamFieldsAdditionalFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areWebcamFieldsAdditionalFocusedClone.size;
          areWebcamFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areWebcamFieldsAdditionalFocused:
              areWebcamFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areWebcamFieldsAdditionalFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areWebcamFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreWebcamFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areWebcamFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreWebcamFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areWebcamFieldsAdditionalFocused:
              filteredAreWebcamFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areWebcamFieldsAdditionalFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areWebcamFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areWebcamFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areWebcamFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areWebcamFieldsAdditionalFocused:
              areWebcamFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreWebcamFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areWebcamFieldsAdditionalValidClone = structuredClone(
            state.areWebcamFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areWebcamFieldsAdditionalValidClone.size;
          areWebcamFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areWebcamFieldsAdditionalValid: areWebcamFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areWebcamFieldsAdditionalValidClone = structuredClone(
            state.areWebcamFieldsAdditionalValid
          );

          const { index } = action.payload;
          areWebcamFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreWebcamFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areWebcamFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreWebcamFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areWebcamFieldsAdditionalValid:
              filteredAreWebcamFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areWebcamFieldsAdditionalValidClone = structuredClone(
            state.areWebcamFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areWebcamFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areWebcamFieldsAdditionalValidClone.set(index, [data, prevValue])
            : areWebcamFieldsAdditionalValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areWebcamFieldsAdditionalValid: areWebcamFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

    // page 2 -> specifications -> microphone

    // page 2 -> specifications -> microphone -> type
    case createProductAction.setMicrophoneType:
      return {
        ...state,
        microphoneType: action.payload,
      };

    // page 2 -> specifications -> microphone -> frequency response
    case createProductAction.setMicrophoneFrequencyResponse:
      return {
        ...state,
        microphoneFrequencyResponse: action.payload,
      };
    case createProductAction.setIsMicrophoneFrequencyResponseFocused:
      return {
        ...state,
        isMicrophoneFrequencyResponseFocused: action.payload,
      };
    case createProductAction.setIsMicrophoneFrequencyResponseValid:
      return {
        ...state,
        isMicrophoneFrequencyResponseValid: action.payload,
      };

    // page 2 -> specifications -> microphone -> color
    case createProductAction.setMicrophoneColor:
      return {
        ...state,
        microphoneColor: action.payload,
      };
    case createProductAction.setIsMicrophoneColorFocused:
      return {
        ...state,
        isMicrophoneColorFocused: action.payload,
      };
    case createProductAction.setIsMicrophoneColorValid:
      return {
        ...state,
        isMicrophoneColorValid: action.payload,
      };

    // page 2 -> specifications -> microphone -> interface
    case createProductAction.setMicrophoneInterface:
      return {
        ...state,
        microphoneInterface: action.payload,
      };

    // page 2 -> specifications -> microphone -> additional fields
    case createProductAction.setMicrophoneFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const microphoneFieldsAdditionalClone = structuredClone(
            state.microphoneFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = microphoneFieldsAdditionalClone.size;
          microphoneFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            microphoneFieldsAdditional: microphoneFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const microphoneFieldsAdditionalClone = structuredClone(
            state.microphoneFieldsAdditional
          );

          const { index } = action.payload;
          microphoneFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMicrophoneFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(microphoneFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMicrophoneFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            microphoneFieldsAdditional: filteredMicrophoneFieldsAdditional,
          };
        }
        case 'update': {
          const microphoneFieldsAdditionalClone = structuredClone(
            state.microphoneFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = microphoneFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? microphoneFieldsAdditionalClone.set(index, [data, prevValue])
            : microphoneFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            microphoneFieldsAdditional: microphoneFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMicrophoneFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areMicrophoneFieldsAdditionalFocusedClone.size;
          areMicrophoneFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMicrophoneFieldsAdditionalFocused:
              areMicrophoneFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areMicrophoneFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMicrophoneFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMicrophoneFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMicrophoneFieldsAdditionalFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMicrophoneFieldsAdditionalFocused:
              filteredAreMicrophoneFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMicrophoneFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMicrophoneFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areMicrophoneFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMicrophoneFieldsAdditionalFocused:
              areMicrophoneFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMicrophoneFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMicrophoneFieldsAdditionalValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areMicrophoneFieldsAdditionalValidClone.size;
          areMicrophoneFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areMicrophoneFieldsAdditionalValid:
              areMicrophoneFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areMicrophoneFieldsAdditionalValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalValid
          );

          const { index } = action.payload;
          areMicrophoneFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMicrophoneFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMicrophoneFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMicrophoneFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMicrophoneFieldsAdditionalValid:
              filteredAreMicrophoneFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areMicrophoneFieldsAdditionalValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areMicrophoneFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMicrophoneFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areMicrophoneFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMicrophoneFieldsAdditionalValid:
              areMicrophoneFieldsAdditionalValidClone,
          };
        }
        default:
          return state;
      }
    }

    // page 2 -> specifications -> microphone -> polar pattern
    case createProductAction.setMicrophonePolarPattern:
      return {
        ...state,
        microphonePolarPattern: action.payload,
      };

    // page 3
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

    // misc.
    case createProductAction.setCurrentlySelectedAdditionalFieldIndex:
      return {
        ...state,
        currentlySelectedAdditionalFieldIndex: action.payload,
      };

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
