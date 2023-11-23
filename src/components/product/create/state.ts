import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
} from './types';

const initialCreateProductState: CreateProductState = {
  // page 1

  // brand
  brand: '',
  isBrandValid: false,
  isBrandFocused: false,
  // model, product category
  model: '',
  isModelValid: false,
  isModelFocused: false,
  productCategory: 'Accessory',
  // description
  description: '',
  isDescriptionValid: false,
  isDescriptionFocused: false,
  // price, currency, availability
  price: '',
  isPriceValid: false,
  isPriceFocused: false,
  currency: 'CAD',
  availability: 'In Stock',
  // quantity
  quantity: '',
  isQuantityFocused: false,
  isQuantityValid: false,
  // weight
  weight: '',
  isWeightFocused: false,
  isWeightValid: false,
  weightUnit: 'g',
  // dimension
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
  // additional comments
  additionalComments: '',
  isAdditionalCommentsFocused: false,
  isAdditionalCommentsValid: false,

  // page 2

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   TABLET
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
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
  cpuFieldsAdditionalMap: new Map<number, [string, string]>(),
  areCpuFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areCpuFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  gpuFieldsAdditionalMap: new Map<number, [string, string]>(),
  areGpuFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areGpuFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  motherboardFieldsAdditionalMap: new Map<number, [string, string]>(),
  areMotherboardFieldsAdditionalMapFocused: new Map<
    number,
    [boolean, boolean]
  >(),
  areMotherboardFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  ramFieldsAdditionalMap: new Map<number, [string, string]>(),
  areRamFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areRamFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  storageFieldsAdditionalMap: new Map<number, [string, string]>(),
  areStorageFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areStorageFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> psu
  psuWattage: '',
  isPsuWattageFocused: false,
  isPsuWattageValid: false,
  psuEfficiency: '80+ Bronze',
  psuModularity: 'Full',
  psuFormFactor: 'ATX',
  psuFieldsAdditionalMap: new Map<number, [string, string]>(),
  arePsuFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  arePsuFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> case
  caseColor: '',
  isCaseColorFocused: false,
  isCaseColorValid: false,
  caseType: 'Mid Tower',
  caseSidePanel: 'Solid',
  caseFieldsAdditionalMap: new Map<number, [string, string]>(),
  areCaseFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areCaseFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  displayFieldsAdditionalMap: new Map<number, [string, string]>(),
  areDisplayFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areDisplayFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> keyboard
  keyboardBacklight: 'RGB',
  keyboardInterface: 'USB',
  keyboardLayout: 'QWERTY',
  keyboardSwitch: 'Cherry MX Brown',
  keyboardFieldsAdditionalMap: new Map<number, [string, string]>(),
  areKeyboardFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areKeyboardFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  mouseFieldsAdditionalMap: new Map<number, [string, string]>(),
  areMouseFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areMouseFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  headphoneFieldsAdditionalMap: new Map<number, [string, string]>(),
  areHeadphoneFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areHeadphoneFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  speakerFieldsAdditionalMap: new Map<number, [string, string]>(),
  areSpeakerFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areSpeakerFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  smartphoneFieldsAdditionalMap: new Map<number, [string, string]>(),
  areSmartphoneFieldsAdditionalMapFocused: new Map<
    number,
    [boolean, boolean]
  >(),
  areSmartphoneFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  tabletFieldsAdditionalMap: new Map<number, [string, string]>(),
  areTabletFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areTabletFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> accessories
  accessoryColor: '',
  isAccessoryColorFocused: false,
  isAccessoryColorValid: false,
  accessoryInterface: 'USB',
  accessoryType: '',
  isAccessoryTypeFocused: false,
  isAccessoryTypeValid: false,
  accessoryFieldsAdditionalMap: new Map<number, [string, string]>(),
  areAccessoryFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areAccessoryFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

  // page 2 -> specifications -> webcam
  webcamColor: '',
  isWebcamColorFocused: false,
  isWebcamColorValid: false,
  webcamFrameRate: '60 fps',
  webcamInterface: 'USB',
  webcamMicrophone: 'Yes',
  webcamResolution: '1080p',
  webcamFieldsAdditionalMap: new Map<number, [string, string]>(),
  areWebcamFieldsAdditionalMapFocused: new Map<number, [boolean, boolean]>(),
  areWebcamFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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
  microphoneFieldsAdditionalMap: new Map<number, [string, string]>(),
  areMicrophoneFieldsAdditionalMapFocused: new Map<
    number,
    [boolean, boolean]
  >(),
  areMicrophoneFieldsAdditionalMapValid: new Map<number, [boolean, boolean]>(),

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

  // brand
  setBrand: 'setBrand',
  setIsBrandValid: 'setIsBrandValid',
  setIsBrandFocused: 'setIsBrandFocused',
  // model, product category
  setModel: 'setModel',
  setIsModelValid: 'setIsModelValid',
  setIsModelFocused: 'setIsModelFocused',
  setProductCategory: 'setProductCategory',
  // description
  setDescription: 'setDescription',
  setIsDescriptionValid: 'setIsDescriptionValid',
  setIsDescriptionFocused: 'setIsDescriptionFocused',
  // price, currency, availability, quantity
  setPrice: 'setPrice',
  setIsPriceValid: 'setIsPriceValid',
  setIsPriceFocused: 'setIsPriceFocused',
  setCurrency: 'setCurrency',
  setAvailability: 'setAvailability',
  // quantity
  setQuantity: 'setQuantity',
  setIsQuantityValid: 'setIsQuantityValid',
  setIsQuantityFocused: 'setIsQuantityFocused',
  // weight
  setWeight: 'setWeight',
  setIsWeightValid: 'setIsWeightValid',
  setIsWeightFocused: 'setIsWeightFocused',
  setWeightUnit: 'setWeightUnit',
  // dimensions
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
  // additional comments
  setAdditionalComments: 'setAdditionalComments',
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',

  // page 2

  // ╭─────────────────────────────────────────────────────────────────╮
  //   ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DESKTOP COMPUTER
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   LAPTOP
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   TABLET
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
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
  setCpuFieldsAdditionalMap: 'setCpuFieldsAdditionalMap',
  setAreCpuFieldsAdditionalMapFocused: 'setAreCpuFieldsAdditionalMapFocused',
  setAreCpuFieldsAdditionalMapValid: 'setAreCpuFieldsAdditionalMapValid',

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
  setGpuFieldsAdditionalMap: 'setGpuFieldsAdditionalMap',
  setAreGpuFieldsAdditionalMapFocused: 'setAreGpuFieldsAdditionalMapFocused',
  setAreGpuFieldsAdditionalMapValid: 'setAreGpuFieldsAdditionalMapValid',

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
  setMotherboardFieldsAdditionalMap: 'setMotherboardFieldsAdditionalMap',
  setAreMotherboardFieldsAdditionalMapFocused:
    'setAreMotherboardFieldsAdditionalMapFocused',
  setAreMotherboardFieldsAdditionalMapValid:
    'setAreMotherboardFieldsAdditionalMapValid',

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
  setRamFieldsAdditionalMap: 'setRamFieldsAdditionalMap',
  setAreRamFieldsAdditionalMapFocused: 'setAreRamFieldsAdditionalMapFocused',
  setAreRamFieldsAdditionalMapValid: 'setAreRamFieldsAdditionalMapValid',

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
  setStorageFieldsAdditionalMap: 'setStorageFieldsAdditionalMap',
  setAreStorageFieldsAdditionalMapFocused:
    'setAreStorageFieldsAdditionalMapFocused',
  setAreStorageFieldsAdditionalMapValid:
    'setAreStorageFieldsAdditionalMapValid',

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage',
  setIsPsuWattageValid: 'setIsPsuWattageValid',
  setIsPsuWattageFocused: 'setIsPsuWattageFocused',
  setPsuEfficiency: 'setPsuEfficiency',
  setPsuFormFactor: 'setPsuFormFactor',
  setPsuModularity: 'setPsuModularity',
  setPsuFieldsAdditionalMap: 'setPsuFieldsAdditionalMap',
  setArePsuFieldsAdditionalMapFocused: 'setArePsuFieldsAdditionalMapFocused',
  setArePsuFieldsAdditionalMapValid: 'setArePsuFieldsAdditionalMapValid',

  // page 2 -> specifications -> case
  setCaseColor: 'setCaseColor',
  setIsCaseColorValid: 'setIsCaseColorValid',
  setIsCaseColorFocused: 'setIsCaseColorFocused',
  setCaseType: 'setCaseType',
  setCaseSidePanel: 'setCaseSidePanel',
  setCaseFieldsAdditionalMap: 'setCaseFieldsAdditionalMap',
  setAreCaseFieldsAdditionalMapFocused: 'setAreCaseFieldsAdditionalMapFocused',
  setAreCaseFieldsAdditionalMapValid: 'setAreCaseFieldsAdditionalMapValid',

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
  setDisplayFieldsAdditionalMap: 'setDisplayFieldsAdditionalMap',
  setAreDisplayFieldsAdditionalMapFocused:
    'setAreDisplayFieldsAdditionalMapFocused',
  setAreDisplayFieldsAdditionalMapValid:
    'setAreDisplayFieldsAdditionalMapValid',

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch',
  setKeyboardLayout: 'setKeyboardLayout',
  setKeyboardBacklight: 'setKeyboardBacklight',
  setKeyboardInterface: 'setKeyboardInterface',
  setKeyboardFieldsAdditionalMap: 'setKeyboardFieldsAdditionalMap',
  setAreKeyboardFieldsAdditionalMapFocused:
    'setAreKeyboardFieldsAdditionalMapFocused',
  setAreKeyboardFieldsAdditionalMapValid:
    'setAreKeyboardFieldsAdditionalMapValid',

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
  setMouseFieldsAdditionalMap: 'setMouseFieldsAdditionalMap',
  setAreMouseFieldsAdditionalMapFocused:
    'setAreMouseFieldsAdditionalMapFocused',
  setAreMouseFieldsAdditionalMapValid: 'setAreMouseFieldsAdditionalMapValid',

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
  setHeadphoneFieldsAdditionalMap: 'setHeadphoneFieldsAdditionalMap',
  setAreHeadphoneFieldsAdditionalMapFocused:
    'setAreHeadphoneFieldsAdditionalMapFocused',
  setAreHeadphoneFieldsAdditionalMapValid:
    'setAreHeadphoneFieldsAdditionalMapValid',

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
  setSpeakerFieldsAdditionalMap: 'setSpeakerFieldsAdditionalMap',
  setAreSpeakerFieldsAdditionalMapFocused:
    'setAreSpeakerFieldsAdditionalMapFocused',
  setAreSpeakerFieldsAdditionalMapValid:
    'setAreSpeakerFieldsAdditionalMapValid',

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
  setSmartphoneFieldsAdditionalMap: 'setSmartphoneFieldsAdditionalMap',
  setAreSmartphoneFieldsAdditionalMapFocused:
    'setAreSmartphoneFieldsAdditionalMapFocused',
  setAreSmartphoneFieldsAdditionalMapValid:
    'setAreSmartphoneFieldsAdditionalMapValid',

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
  setTabletFieldsAdditionalMap: 'setTabletFieldsAdditionalMap',
  setAreTabletFieldsAdditionalMapFocused:
    'setAreTabletFieldsAdditionalMapFocused',
  setAreTabletFieldsAdditionalMapValid: 'setAreTabletFieldsAdditionalMapValid',

  // page 2 -> specifications -> accessory
  setAccessoryType: 'setAccessoryType',
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid',
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused',
  setAccessoryColor: 'setAccessoryColor',
  setIsAccessoryColorValid: 'setIsAccessoryColorValid',
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused',
  setAccessoryInterface: 'setAccessoryInterface',
  setAccessoryFieldsAdditionalMap: 'setAccessoryFieldsAdditionalMap',
  setAreAccessoryFieldsAdditionalMapFocused:
    'setAreAccessoryFieldsAdditionalMapFocused',
  setAreAccessoryFieldsAdditionalMapValid:
    'setAreAccessoryFieldsAdditionalMapValid',
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
  setWebcamFieldsAdditionalMap: 'setWebcamFieldsAdditionalMap',
  setAreWebcamFieldsAdditionalMapFocused:
    'setAreWebcamFieldsAdditionalMapFocused',
  setAreWebcamFieldsAdditionalMapValid: 'setAreWebcamFieldsAdditionalMapValid',

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
  setMicrophoneFieldsAdditionalMap: 'setMicrophoneFieldsAdditionalMap',
  setAreMicrophoneFieldsAdditionalMapFocused:
    'setAreMicrophoneFieldsAdditionalMapFocused',
  setAreMicrophoneFieldsAdditionalMapValid:
    'setAreMicrophoneFieldsAdditionalMapValid',

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
    // brand
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

    // model
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

    // description
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

    // price
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

    // quantity
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

    // weight
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

    // dimension

    // dimension -> height
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

    // dimension -> width
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

    // dimension -> length
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

    // additional comments
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
    case createProductAction.setCpuFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const cpuFieldsAdditionalMapClone = structuredClone(
            state.cpuFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = cpuFieldsAdditionalMapClone.size;
          cpuFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            cpuFieldsAdditionalMap: cpuFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const cpuFieldsAdditionalMapClone = structuredClone(
            state.cpuFieldsAdditionalMap
          );

          const { index } = action.payload;
          cpuFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredCpuFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(cpuFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredCpuFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            cpuFieldsAdditionalMap: filteredCpuFieldsAdditionalMap,
          };
        }
        case 'update': {
          const cpuFieldsAdditionalMapClone = structuredClone(
            state.cpuFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = cpuFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? cpuFieldsAdditionalMapClone.set(index, [data, prevValue])
            : cpuFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            cpuFieldsAdditionalMap: cpuFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCpuFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areCpuFieldsAdditionalMapFocusedClone.size;
          areCpuFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areCpuFieldsAdditionalMapFocused:
              areCpuFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areCpuFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCpuFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCpuFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCpuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCpuFieldsAdditionalMapFocused:
              filteredAreCpuFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCpuFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCpuFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCpuFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areCpuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCpuFieldsAdditionalMapFocused:
              areCpuFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCpuFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCpuFieldsAdditionalMapValidClone = structuredClone(
            state.areCpuFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areCpuFieldsAdditionalMapValidClone.size;
          areCpuFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areCpuFieldsAdditionalMapValid: areCpuFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areCpuFieldsAdditionalMapValidClone = structuredClone(
            state.areCpuFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areCpuFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCpuFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCpuFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCpuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCpuFieldsAdditionalMapValid:
              filteredAreCpuFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areCpuFieldsAdditionalMapValidClone = structuredClone(
            state.areCpuFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCpuFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCpuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
            : areCpuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCpuFieldsAdditionalMapValid: areCpuFieldsAdditionalMapValidClone,
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
    case createProductAction.setGpuFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const gpuFieldsAdditionalMapClone = structuredClone(
            state.gpuFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = gpuFieldsAdditionalMapClone.size;
          gpuFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            gpuFieldsAdditionalMap: gpuFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const gpuFieldsAdditionalMapClone = structuredClone(
            state.gpuFieldsAdditionalMap
          );

          const { index } = action.payload;
          gpuFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredGpuFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(gpuFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredGpuFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            gpuFieldsAdditionalMap: filteredGpuFieldsAdditionalMap,
          };
        }
        case 'update': {
          const gpuFieldsAdditionalMapClone = structuredClone(
            state.gpuFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = gpuFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? gpuFieldsAdditionalMapClone.set(index, [data, prevValue])
            : gpuFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            gpuFieldsAdditionalMap: gpuFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreGpuFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areGpuFieldsAdditionalMapFocusedClone.size;
          areGpuFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areGpuFieldsAdditionalMapFocused:
              areGpuFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areGpuFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreGpuFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areGpuFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreGpuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areGpuFieldsAdditionalMapFocused:
              filteredAreGpuFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
            state.areGpuFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areGpuFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areGpuFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areGpuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areGpuFieldsAdditionalMapFocused:
              areGpuFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreGpuFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areGpuFieldsAdditionalMapValidClone = structuredClone(
            state.areGpuFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areGpuFieldsAdditionalMapValidClone.size;
          areGpuFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areGpuFieldsAdditionalMapValid: areGpuFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areGpuFieldsAdditionalMapValidClone = structuredClone(
            state.areGpuFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areGpuFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreGpuFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areGpuFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreGpuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areGpuFieldsAdditionalMapValid:
              filteredAreGpuFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areGpuFieldsAdditionalMapValidClone = structuredClone(
            state.areGpuFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areGpuFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areGpuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
            : areGpuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areGpuFieldsAdditionalMapValid: areGpuFieldsAdditionalMapValidClone,
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
    case createProductAction.setMotherboardFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const motherboardFieldsAdditionalMapClone = structuredClone(
            state.motherboardFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = motherboardFieldsAdditionalMapClone.size;
          motherboardFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            motherboardFieldsAdditionalMap: motherboardFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const motherboardFieldsAdditionalMapClone = structuredClone(
            state.motherboardFieldsAdditionalMap
          );

          const { index } = action.payload;
          motherboardFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMotherboardFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(motherboardFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMotherboardFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            motherboardFieldsAdditionalMap:
              filteredMotherboardFieldsAdditionalMap,
          };
        }
        case 'update': {
          const motherboardFieldsAdditionalMapClone = structuredClone(
            state.motherboardFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = motherboardFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? motherboardFieldsAdditionalMapClone.set(index, [data, prevValue])
            : motherboardFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            motherboardFieldsAdditionalMap: motherboardFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMotherboardFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areMotherboardFieldsAdditionalMapFocusedClone.size;
          areMotherboardFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMotherboardFieldsAdditionalMapFocused:
              areMotherboardFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areMotherboardFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMotherboardFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMotherboardFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMotherboardFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMotherboardFieldsAdditionalMapFocused:
              filteredAreMotherboardFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMotherboardFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMotherboardFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areMotherboardFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMotherboardFieldsAdditionalMapFocused:
              areMotherboardFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMotherboardFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areMotherboardFieldsAdditionalMapValidClone.size;
          areMotherboardFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areMotherboardFieldsAdditionalMapValid:
              areMotherboardFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areMotherboardFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMotherboardFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMotherboardFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMotherboardFieldsAdditionalMapValid.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMotherboardFieldsAdditionalMapValid:
              filteredAreMotherboardFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
            state.areMotherboardFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMotherboardFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMotherboardFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areMotherboardFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMotherboardFieldsAdditionalMapValid:
              areMotherboardFieldsAdditionalMapValidClone,
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
    case createProductAction.setRamFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const ramFieldsAdditionalMapClone = structuredClone(
            state.ramFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = ramFieldsAdditionalMapClone.size;
          ramFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            ramFieldsAdditionalMap: ramFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const ramFieldsAdditionalMapClone = structuredClone(
            state.ramFieldsAdditionalMap
          );

          const { index } = action.payload;
          ramFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredRamFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(ramFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredRamFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            ramFieldsAdditionalMap: filteredRamFieldsAdditionalMap,
          };
        }
        case 'update': {
          const ramFieldsAdditionalMapClone = structuredClone(
            state.ramFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = ramFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? ramFieldsAdditionalMapClone.set(index, [data, prevValue])
            : ramFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            ramFieldsAdditionalMap: ramFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreRamFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areRamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areRamFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areRamFieldsAdditionalMapFocusedClone.size;
          areRamFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areRamFieldsAdditionalMapFocused:
              areRamFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areRamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areRamFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areRamFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreRamFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areRamFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreRamFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areRamFieldsAdditionalMapFocused:
              filteredAreRamFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areRamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areRamFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areRamFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areRamFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areRamFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            areRamFieldsAdditionalMapFocused:
              areRamFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreRamFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areRamFieldsAdditionalMapValidClone = structuredClone(
            state.areRamFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areRamFieldsAdditionalMapValidClone.size;
          areRamFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areRamFieldsAdditionalMapValid: areRamFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areRamFieldsAdditionalMapValidClone = structuredClone(
            state.areRamFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areRamFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreRamFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areRamFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreRamFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areRamFieldsAdditionalMapValid:
              filteredAreRamFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areRamFieldsAdditionalMapValidClone = structuredClone(
            state.areRamFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areRamFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areRamFieldsAdditionalMapValidClone.set(index, [data, prevValue])
            : areRamFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areRamFieldsAdditionalMapValid: areRamFieldsAdditionalMapValidClone,
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
    case createProductAction.setStorageFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const storageFieldsAdditionalMapClone = structuredClone(
            state.storageFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = storageFieldsAdditionalMapClone.size;
          storageFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            storageFieldsAdditionalMap: storageFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const storageFieldsAdditionalMapClone = structuredClone(
            state.storageFieldsAdditionalMap
          );

          const { index } = action.payload;
          storageFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredStorageFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(storageFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredStorageFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            storageFieldsAdditionalMap: filteredStorageFieldsAdditionalMap,
          };
        }
        case 'update': {
          const storageFieldsAdditionalMapClone = structuredClone(
            state.storageFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = storageFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? storageFieldsAdditionalMapClone.set(index, [data, prevValue])
            : storageFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            storageFieldsAdditionalMap: storageFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreStorageFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areStorageFieldsAdditionalMapFocusedClone.size;
          areStorageFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areStorageFieldsAdditionalMapFocused:
              areStorageFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areStorageFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreStorageFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areStorageFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreStorageFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areStorageFieldsAdditionalMapFocused:
              filteredAreStorageFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
            state.areStorageFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areStorageFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areStorageFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areStorageFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areStorageFieldsAdditionalMapFocused:
              areStorageFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreStorageFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areStorageFieldsAdditionalMapValidClone = structuredClone(
            state.areStorageFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areStorageFieldsAdditionalMapValidClone.size;
          areStorageFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areStorageFieldsAdditionalMapValid:
              areStorageFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areStorageFieldsAdditionalMapValidClone = structuredClone(
            state.areStorageFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areStorageFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreStorageFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areStorageFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreStorageFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areStorageFieldsAdditionalMapValid:
              filteredAreStorageFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areStorageFieldsAdditionalMapValidClone = structuredClone(
            state.areStorageFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areStorageFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areStorageFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areStorageFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areStorageFieldsAdditionalMapValid:
              areStorageFieldsAdditionalMapValidClone,
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
    case createProductAction.setPsuFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const psuFieldsAdditionalMapClone = structuredClone(
            state.psuFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = psuFieldsAdditionalMapClone.size;
          psuFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            psuFieldsAdditionalMap: psuFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const psuFieldsAdditionalMapClone = structuredClone(
            state.psuFieldsAdditionalMap
          );

          const { index } = action.payload;
          psuFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredPsuFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(psuFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredPsuFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            psuFieldsAdditionalMap: filteredPsuFieldsAdditionalMap,
          };
        }
        case 'update': {
          const psuFieldsAdditionalMapClone = structuredClone(
            state.psuFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = psuFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? psuFieldsAdditionalMapClone.set(index, [data, prevValue])
            : psuFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            psuFieldsAdditionalMap: psuFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setArePsuFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = arePsuFieldsAdditionalMapFocusedClone.size;
          arePsuFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            arePsuFieldsAdditionalMapFocused:
              arePsuFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          arePsuFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredArePsuFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(arePsuFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredArePsuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            arePsuFieldsAdditionalMapFocused:
              filteredArePsuFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
            state.arePsuFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = arePsuFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? arePsuFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : arePsuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

          return {
            ...state,
            arePsuFieldsAdditionalMapFocused:
              arePsuFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setArePsuFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const arePsuFieldsAdditionalMapValidClone = structuredClone(
            state.arePsuFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = arePsuFieldsAdditionalMapValidClone.size;
          arePsuFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            arePsuFieldsAdditionalMapValid: arePsuFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const arePsuFieldsAdditionalMapValidClone = structuredClone(
            state.arePsuFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          arePsuFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredArePsuFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(arePsuFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredArePsuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            arePsuFieldsAdditionalMapValid:
              filteredArePsuFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const arePsuFieldsAdditionalMapValidClone = structuredClone(
            state.arePsuFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = arePsuFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? arePsuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
            : arePsuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            arePsuFieldsAdditionalMapValid: arePsuFieldsAdditionalMapValidClone,
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
    case createProductAction.setCaseFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const caseFieldsAdditionalMapClone = structuredClone(
            state.caseFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = caseFieldsAdditionalMapClone.size;
          caseFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            caseFieldsAdditionalMap: caseFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const caseFieldsAdditionalMapClone = structuredClone(
            state.caseFieldsAdditionalMap
          );

          const { index } = action.payload;
          caseFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredCaseFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(caseFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredCaseFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            caseFieldsAdditionalMap: filteredCaseFieldsAdditionalMap,
          };
        }
        case 'update': {
          const caseFieldsAdditionalMapClone = structuredClone(
            state.caseFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = caseFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? caseFieldsAdditionalMapClone.set(index, [data, prevValue])
            : caseFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            caseFieldsAdditionalMap: caseFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCaseFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areCaseFieldsAdditionalMapFocusedClone.size;
          areCaseFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areCaseFieldsAdditionalMapFocused:
              areCaseFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areCaseFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCaseFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCaseFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCaseFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCaseFieldsAdditionalMapFocused:
              filteredAreCaseFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areCaseFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCaseFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCaseFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areCaseFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areCaseFieldsAdditionalMapFocused:
              areCaseFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreCaseFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areCaseFieldsAdditionalMapValidClone = structuredClone(
            state.areCaseFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areCaseFieldsAdditionalMapValidClone.size;
          areCaseFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areCaseFieldsAdditionalMapValid:
              areCaseFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areCaseFieldsAdditionalMapValidClone = structuredClone(
            state.areCaseFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areCaseFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreCaseFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areCaseFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreCaseFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areCaseFieldsAdditionalMapValid:
              filteredAreCaseFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areCaseFieldsAdditionalMapValidClone = structuredClone(
            state.areCaseFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areCaseFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areCaseFieldsAdditionalMapValidClone.set(index, [data, prevValue])
            : areCaseFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areCaseFieldsAdditionalMapValid:
              areCaseFieldsAdditionalMapValidClone,
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
    case createProductAction.setDisplayFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const displayFieldsAdditionalMapClone = structuredClone(
            state.displayFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = displayFieldsAdditionalMapClone.size;
          displayFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            displayFieldsAdditionalMap: displayFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const displayFieldsAdditionalMapClone = structuredClone(
            state.displayFieldsAdditionalMap
          );

          const { index } = action.payload;
          displayFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredDisplayFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(displayFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredDisplayFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            displayFieldsAdditionalMap: filteredDisplayFieldsAdditionalMap,
          };
        }
        case 'update': {
          const displayFieldsAdditionalMapClone = structuredClone(
            state.displayFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = displayFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? displayFieldsAdditionalMapClone.set(index, [data, prevValue])
            : displayFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            displayFieldsAdditionalMap: displayFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreDisplayFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areDisplayFieldsAdditionalMapFocusedClone.size;
          areDisplayFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areDisplayFieldsAdditionalMapFocused:
              areDisplayFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areDisplayFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreDisplayFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areDisplayFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreDisplayFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areDisplayFieldsAdditionalMapFocused:
              filteredAreDisplayFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
            state.areDisplayFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areDisplayFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areDisplayFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areDisplayFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areDisplayFieldsAdditionalMapFocused:
              areDisplayFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreDisplayFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areDisplayFieldsAdditionalMapValidClone = structuredClone(
            state.areDisplayFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areDisplayFieldsAdditionalMapValidClone.size;
          areDisplayFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areDisplayFieldsAdditionalMapValid:
              areDisplayFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areDisplayFieldsAdditionalMapValidClone = structuredClone(
            state.areDisplayFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areDisplayFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreDisplayFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areDisplayFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreDisplayFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areDisplayFieldsAdditionalMapValid:
              filteredAreDisplayFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areDisplayFieldsAdditionalMapValidClone = structuredClone(
            state.areDisplayFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areDisplayFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areDisplayFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areDisplayFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areDisplayFieldsAdditionalMapValid:
              areDisplayFieldsAdditionalMapValidClone,
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
    case createProductAction.setKeyboardFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const keyboardFieldsAdditionalMapClone = structuredClone(
            state.keyboardFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = keyboardFieldsAdditionalMapClone.size;
          keyboardFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            keyboardFieldsAdditionalMap: keyboardFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const keyboardFieldsAdditionalMapClone = structuredClone(
            state.keyboardFieldsAdditionalMap
          );

          const { index } = action.payload;
          keyboardFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredKeyboardFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(keyboardFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredKeyboardFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            keyboardFieldsAdditionalMap: filteredKeyboardFieldsAdditionalMap,
          };
        }
        case 'update': {
          const keyboardFieldsAdditionalMapClone = structuredClone(
            state.keyboardFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = keyboardFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? keyboardFieldsAdditionalMapClone.set(index, [data, prevValue])
            : keyboardFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            keyboardFieldsAdditionalMap: keyboardFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreKeyboardFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areKeyboardFieldsAdditionalMapFocusedClone.size;
          areKeyboardFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areKeyboardFieldsAdditionalMapFocused:
              areKeyboardFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areKeyboardFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreKeyboardFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areKeyboardFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreKeyboardFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areKeyboardFieldsAdditionalMapFocused:
              filteredAreKeyboardFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areKeyboardFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areKeyboardFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areKeyboardFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areKeyboardFieldsAdditionalMapFocused:
              areKeyboardFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreKeyboardFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areKeyboardFieldsAdditionalMapValidClone.size;
          areKeyboardFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areKeyboardFieldsAdditionalMapValid:
              areKeyboardFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areKeyboardFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreKeyboardFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areKeyboardFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreKeyboardFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areKeyboardFieldsAdditionalMapValid:
              filteredAreKeyboardFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
            state.areKeyboardFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areKeyboardFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areKeyboardFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areKeyboardFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areKeyboardFieldsAdditionalMapValid:
              areKeyboardFieldsAdditionalMapValidClone,
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
    case createProductAction.setMouseFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const mouseFieldsAdditionalMapClone = structuredClone(
            state.mouseFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = mouseFieldsAdditionalMapClone.size;
          mouseFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            mouseFieldsAdditionalMap: mouseFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const mouseFieldsAdditionalMapClone = structuredClone(
            state.mouseFieldsAdditionalMap
          );

          const { index } = action.payload;
          mouseFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMouseFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(mouseFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMouseFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            mouseFieldsAdditionalMap: filteredMouseFieldsAdditionalMap,
          };
        }
        case 'update': {
          const mouseFieldsAdditionalMapClone = structuredClone(
            state.mouseFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = mouseFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? mouseFieldsAdditionalMapClone.set(index, [data, prevValue])
            : mouseFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            mouseFieldsAdditionalMap: mouseFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMouseFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areMouseFieldsAdditionalMapFocusedClone.size;
          areMouseFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMouseFieldsAdditionalMapFocused:
              areMouseFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areMouseFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMouseFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMouseFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMouseFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMouseFieldsAdditionalMapFocused:
              filteredAreMouseFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMouseFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areMouseFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMouseFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areMouseFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMouseFieldsAdditionalMapFocused:
              areMouseFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMouseFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMouseFieldsAdditionalMapValidClone = structuredClone(
            state.areMouseFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areMouseFieldsAdditionalMapValidClone.size;
          areMouseFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areMouseFieldsAdditionalMapValid:
              areMouseFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areMouseFieldsAdditionalMapValidClone = structuredClone(
            state.areMouseFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areMouseFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMouseFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMouseFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMouseFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areMouseFieldsAdditionalMapValid:
              filteredAreMouseFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areMouseFieldsAdditionalMapValidClone = structuredClone(
            state.areMouseFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areMouseFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMouseFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areMouseFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

          return {
            ...state,
            areMouseFieldsAdditionalMapValid:
              areMouseFieldsAdditionalMapValidClone,
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
    case createProductAction.setHeadphoneFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const headphoneFieldsAdditionalMapClone = structuredClone(
            state.headphoneFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = headphoneFieldsAdditionalMapClone.size;
          headphoneFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            headphoneFieldsAdditionalMap: headphoneFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const headphoneFieldsAdditionalMapClone = structuredClone(
            state.headphoneFieldsAdditionalMap
          );

          const { index } = action.payload;
          headphoneFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredHeadphoneFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(headphoneFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredHeadphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            headphoneFieldsAdditionalMap: filteredHeadphoneFieldsAdditionalMap,
          };
        }
        case 'update': {
          const headphoneFieldsAdditionalMapClone = structuredClone(
            state.headphoneFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = headphoneFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? headphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
            : headphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            headphoneFieldsAdditionalMap: headphoneFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreHeadphoneFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areHeadphoneFieldsAdditionalMapFocusedClone.size;
          areHeadphoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapFocused:
              areHeadphoneFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areHeadphoneFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreHeadphoneFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areHeadphoneFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreHeadphoneFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapFocused:
              filteredAreHeadphoneFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areHeadphoneFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areHeadphoneFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areHeadphoneFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapFocused:
              areHeadphoneFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreHeadphoneFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areHeadphoneFieldsAdditionalMapValidClone.size;
          areHeadphoneFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapValid:
              areHeadphoneFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areHeadphoneFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreHeadphoneFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areHeadphoneFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreHeadphoneFieldsAdditionalMapValid.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapValid:
              filteredAreHeadphoneFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areHeadphoneFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areHeadphoneFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areHeadphoneFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areHeadphoneFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areHeadphoneFieldsAdditionalMapValid:
              areHeadphoneFieldsAdditionalMapValidClone,
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
    case createProductAction.setSpeakerFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const speakerFieldsAdditionalMapClone = structuredClone(
            state.speakerFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = speakerFieldsAdditionalMapClone.size;
          speakerFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            speakerFieldsAdditionalMap: speakerFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const speakerFieldsAdditionalMapClone = structuredClone(
            state.speakerFieldsAdditionalMap
          );

          const { index } = action.payload;
          speakerFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredSpeakerFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(speakerFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredSpeakerFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            speakerFieldsAdditionalMap: filteredSpeakerFieldsAdditionalMap,
          };
        }
        case 'update': {
          const speakerFieldsAdditionalMapClone = structuredClone(
            state.speakerFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = speakerFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? speakerFieldsAdditionalMapClone.set(index, [data, prevValue])
            : speakerFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            speakerFieldsAdditionalMap: speakerFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSpeakerFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areSpeakerFieldsAdditionalMapFocusedClone.size;
          areSpeakerFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areSpeakerFieldsAdditionalMapFocused:
              areSpeakerFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areSpeakerFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSpeakerFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSpeakerFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSpeakerFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areSpeakerFieldsAdditionalMapFocused:
              filteredAreSpeakerFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areSpeakerFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSpeakerFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areSpeakerFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSpeakerFieldsAdditionalMapFocused:
              areSpeakerFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSpeakerFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areSpeakerFieldsAdditionalMapValidClone.size;
          areSpeakerFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areSpeakerFieldsAdditionalMapValid:
              areSpeakerFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areSpeakerFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSpeakerFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSpeakerFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSpeakerFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areSpeakerFieldsAdditionalMapValid:
              filteredAreSpeakerFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
            state.areSpeakerFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areSpeakerFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSpeakerFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areSpeakerFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSpeakerFieldsAdditionalMapValid:
              areSpeakerFieldsAdditionalMapValidClone,
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
    case createProductAction.setSmartphoneFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const smartphoneFieldsAdditionalMapClone = structuredClone(
            state.smartphoneFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = smartphoneFieldsAdditionalMapClone.size;
          smartphoneFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            smartphoneFieldsAdditionalMap: smartphoneFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const smartphoneFieldsAdditionalMapClone = structuredClone(
            state.smartphoneFieldsAdditionalMap
          );

          const { index } = action.payload;
          smartphoneFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredSmartphoneFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(smartphoneFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredSmartphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            smartphoneFieldsAdditionalMap:
              filteredSmartphoneFieldsAdditionalMap,
          };
        }
        case 'update': {
          const smartphoneFieldsAdditionalMapClone = structuredClone(
            state.smartphoneFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = smartphoneFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? smartphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
            : smartphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            smartphoneFieldsAdditionalMap: smartphoneFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSmartphoneFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areSmartphoneFieldsAdditionalMapFocusedClone.size;
          areSmartphoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapFocused:
              areSmartphoneFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areSmartphoneFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSmartphoneFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSmartphoneFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSmartphoneFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapFocused:
              filteredAreSmartphoneFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areSmartphoneFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSmartphoneFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areSmartphoneFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapFocused:
              areSmartphoneFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreSmartphoneFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areSmartphoneFieldsAdditionalMapValidClone.size;
          areSmartphoneFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapValid:
              areSmartphoneFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areSmartphoneFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreSmartphoneFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areSmartphoneFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreSmartphoneFieldsAdditionalMapValid.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapValid:
              filteredAreSmartphoneFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
            state.areSmartphoneFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areSmartphoneFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areSmartphoneFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areSmartphoneFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areSmartphoneFieldsAdditionalMapValid:
              areSmartphoneFieldsAdditionalMapValidClone,
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
    case createProductAction.setTabletFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const tabletFieldsAdditionalMapClone = structuredClone(
            state.tabletFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = tabletFieldsAdditionalMapClone.size;
          tabletFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            tabletFieldsAdditionalMap: tabletFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const tabletFieldsAdditionalMapClone = structuredClone(
            state.tabletFieldsAdditionalMap
          );

          const { index } = action.payload;
          tabletFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredTabletFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(tabletFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredTabletFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            tabletFieldsAdditionalMap: filteredTabletFieldsAdditionalMap,
          };
        }
        case 'update': {
          const tabletFieldsAdditionalMapClone = structuredClone(
            state.tabletFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = tabletFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? tabletFieldsAdditionalMapClone.set(index, [data, prevValue])
            : tabletFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            tabletFieldsAdditionalMap: tabletFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreTabletFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areTabletFieldsAdditionalMapFocusedClone.size;
          areTabletFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areTabletFieldsAdditionalMapFocused:
              areTabletFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areTabletFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreTabletFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areTabletFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreTabletFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areTabletFieldsAdditionalMapFocused:
              filteredAreTabletFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
            state.areTabletFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areTabletFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areTabletFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areTabletFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areTabletFieldsAdditionalMapFocused:
              areTabletFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreTabletFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areTabletFieldsAdditionalMapValidClone = structuredClone(
            state.areTabletFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areTabletFieldsAdditionalMapValidClone.size;
          areTabletFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areTabletFieldsAdditionalMapValid:
              areTabletFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areTabletFieldsAdditionalMapValidClone = structuredClone(
            state.areTabletFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areTabletFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreTabletFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areTabletFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreTabletFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areTabletFieldsAdditionalMapValid:
              filteredAreTabletFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areTabletFieldsAdditionalMapValidClone = structuredClone(
            state.areTabletFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areTabletFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areTabletFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areTabletFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areTabletFieldsAdditionalMapValid:
              areTabletFieldsAdditionalMapValidClone,
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
    case createProductAction.setAccessoryFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const accessoryFieldsAdditionalMapClone = structuredClone(
            state.accessoryFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = accessoryFieldsAdditionalMapClone.size;
          accessoryFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            accessoryFieldsAdditionalMap: accessoryFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const accessoryFieldsAdditionalMapClone = structuredClone(
            state.accessoryFieldsAdditionalMap
          );

          const { index } = action.payload;
          accessoryFieldsAdditionalMapClone.delete(index);

          const filteredAccessoryFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();

          Array.from(accessoryFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredAccessoryFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            accessoryFieldsAdditionalMap: filteredAccessoryFieldsAdditionalMap,
          };
        }
        case 'update': {
          const accessoryFieldsAdditionalMapClone = structuredClone(
            state.accessoryFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = accessoryFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? accessoryFieldsAdditionalMapClone.set(index, [data, prevValue])
            : accessoryFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            accessoryFieldsAdditionalMap: accessoryFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreAccessoryFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalMapFocusedClone.size;
          areAccessoryFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalMapFocused:
              areAccessoryFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalMapFocused:
              filteredAreAccessoryFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areAccessoryFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalMapFocused:
              areAccessoryFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreAccessoryFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalMapValidClone.size;
          areAccessoryFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalMapValid:
              areAccessoryFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalMapValid.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalMapValid:
              filteredAreAccessoryFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areAccessoryFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalMapValid:
              areAccessoryFieldsAdditionalMapValidClone,
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
    case createProductAction.setWebcamFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const webcamFieldsAdditionalMapClone = structuredClone(
            state.webcamFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = webcamFieldsAdditionalMapClone.size;
          webcamFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            webcamFieldsAdditionalMap: webcamFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const webcamFieldsAdditionalMapClone = structuredClone(
            state.webcamFieldsAdditionalMap
          );

          const { index } = action.payload;
          webcamFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredWebcamFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(webcamFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredWebcamFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            webcamFieldsAdditionalMap: filteredWebcamFieldsAdditionalMap,
          };
        }
        case 'update': {
          const webcamFieldsAdditionalMapClone = structuredClone(
            state.webcamFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = webcamFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? webcamFieldsAdditionalMapClone.set(index, [data, prevValue])
            : webcamFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            webcamFieldsAdditionalMap: webcamFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreWebcamFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areWebcamFieldsAdditionalMapFocusedClone.size;
          areWebcamFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areWebcamFieldsAdditionalMapFocused:
              areWebcamFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areWebcamFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreWebcamFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areWebcamFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreWebcamFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areWebcamFieldsAdditionalMapFocused:
              filteredAreWebcamFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
            state.areWebcamFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areWebcamFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areWebcamFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areWebcamFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areWebcamFieldsAdditionalMapFocused:
              areWebcamFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreWebcamFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areWebcamFieldsAdditionalMapValidClone = structuredClone(
            state.areWebcamFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areWebcamFieldsAdditionalMapValidClone.size;
          areWebcamFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areWebcamFieldsAdditionalMapValid:
              areWebcamFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areWebcamFieldsAdditionalMapValidClone = structuredClone(
            state.areWebcamFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areWebcamFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreWebcamFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areWebcamFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreWebcamFieldsAdditionalMapValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areWebcamFieldsAdditionalMapValid:
              filteredAreWebcamFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areWebcamFieldsAdditionalMapValidClone = structuredClone(
            state.areWebcamFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areWebcamFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areWebcamFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areWebcamFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areWebcamFieldsAdditionalMapValid:
              areWebcamFieldsAdditionalMapValidClone,
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
    case createProductAction.setMicrophoneFieldsAdditionalMap: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const microphoneFieldsAdditionalMapClone = structuredClone(
            state.microphoneFieldsAdditionalMap
          );

          const { data } = action.payload;
          const prevSize = microphoneFieldsAdditionalMapClone.size;
          microphoneFieldsAdditionalMapClone.set(prevSize, data);

          return {
            ...state,
            microphoneFieldsAdditionalMap: microphoneFieldsAdditionalMapClone,
          };
        }
        case 'remove': {
          const microphoneFieldsAdditionalMapClone = structuredClone(
            state.microphoneFieldsAdditionalMap
          );

          const { index } = action.payload;
          microphoneFieldsAdditionalMapClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredMicrophoneFieldsAdditionalMap = new Map<
            number,
            [string, string]
          >();
          Array.from(microphoneFieldsAdditionalMapClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredMicrophoneFieldsAdditionalMap.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            microphoneFieldsAdditionalMap:
              filteredMicrophoneFieldsAdditionalMap,
          };
        }
        case 'update': {
          const microphoneFieldsAdditionalMapClone = structuredClone(
            state.microphoneFieldsAdditionalMap
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = microphoneFieldsAdditionalMapClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? microphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
            : microphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

          return {
            ...state,
            microphoneFieldsAdditionalMap: microphoneFieldsAdditionalMapClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMicrophoneFieldsAdditionalMapFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapFocused
          );

          const { data } = action.payload;
          const prevSize = areMicrophoneFieldsAdditionalMapFocusedClone.size;
          areMicrophoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapFocused:
              areMicrophoneFieldsAdditionalMapFocusedClone,
          };
        }
        case 'remove': {
          const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapFocused
          );

          const { index } = action.payload;
          areMicrophoneFieldsAdditionalMapFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMicrophoneFieldsAdditionalMapFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMicrophoneFieldsAdditionalMapFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMicrophoneFieldsAdditionalMapFocused.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapFocused:
              filteredAreMicrophoneFieldsAdditionalMapFocused,
          };
        }
        case 'update': {
          const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMicrophoneFieldsAdditionalMapFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMicrophoneFieldsAdditionalMapFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areMicrophoneFieldsAdditionalMapFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapFocused:
              areMicrophoneFieldsAdditionalMapFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createProductAction.setAreMicrophoneFieldsAdditionalMapValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapValid
          );

          const { data } = action.payload;
          const prevSize = areMicrophoneFieldsAdditionalMapValidClone.size;
          areMicrophoneFieldsAdditionalMapValidClone.set(prevSize, data);

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapValid:
              areMicrophoneFieldsAdditionalMapValidClone,
          };
        }
        case 'remove': {
          const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapValid
          );

          const { index } = action.payload;
          areMicrophoneFieldsAdditionalMapValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreMicrophoneFieldsAdditionalMapValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areMicrophoneFieldsAdditionalMapValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreMicrophoneFieldsAdditionalMapValid.set(
                arrayIdx,
                keyVal
              );
            }
          );

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapValid:
              filteredAreMicrophoneFieldsAdditionalMapValid,
          };
        }
        case 'update': {
          const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
            state.areMicrophoneFieldsAdditionalMapValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areMicrophoneFieldsAdditionalMapValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areMicrophoneFieldsAdditionalMapValidClone.set(index, [
                data,
                prevValue,
              ])
            : areMicrophoneFieldsAdditionalMapValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areMicrophoneFieldsAdditionalMapValid:
              areMicrophoneFieldsAdditionalMapValidClone,
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
