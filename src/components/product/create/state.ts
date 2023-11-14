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
  // page 1 -> price, currency, availability, quantity
  price: '',
  isPriceValid: false,
  isPriceFocused: false,
  currency: 'CAD',
  availability: true,
  quantity: 0,
  // page 1 -> weight
  weight: 0,
  weightUnit: 'g',
  // page 1 -> dimension
  dimensionHeight: 0,
  dimensionHeightUnit: 'cm',
  dimensionWidth: 0,
  dimensionWidthUnit: 'cm',
  dimensionLength: 0,
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
  cpuFrequency: 0, // GHz
  cpuCores: 2,
  cpuL1CacheCapacity: 0,
  cpuL1CacheCapacityUnit: 'KB',
  cpuL2CacheCapacity: 0,
  cpuL2CacheCapacityUnit: 'KB',
  cpuL3CacheCapacity: 0,
  cpuL3CacheCapacityUnit: 'KB',
  cpuWattage: 0,

  // page 2 -> specifications -> gpu
  gpuChipset: '',
  isGpuChipsetFocused: false,
  isGpuChipsetValid: false,
  gpuMemoryCapacity: 0,
  gpuMemoryCapacityUnit: 'GB',
  gpuCoreClock: 0, // MHz
  gpuBoostClock: 0, // MHz
  gpuTdp: 0,

  // page 2 -> specifications -> motherboard
  motherboardSocket: '',
  isMotherboardSocketFocused: false,
  isMotherboardSocketValid: false,
  motherboardChipset: '',
  isMotherboardChipsetFocused: false,
  isMotherboardChipsetValid: false,
  motherboardFormFactor: 'ATX',
  motherboardMemoryMaxCapacity: 0,
  motherboardMemoryMaxCapacityUnit: 'GB',
  motherboardMemorySlots: 0,
  motherboardMemoryType: 'DDR4',
  motherboardSataPorts: 0,
  motherboardM2Slots: 0,
  motherboardPcie3Slots: 0,
  motherboardPcie4Slots: 0,
  motherboardPcie5Slots: 0,

  // page 2 -> specifications -> ram
  ramDataRate: 0, // MHz
  ramModulesQuantity: 0,
  ramModulesCapacity: 0,
  ramModulesCapacityUnit: 'GB',
  ramType: 'DDR4',
  ramColor: '',
  isRamColorFocused: false,
  isRamColorValid: false,
  ramVoltage: 0,
  ramTiming: '',
  isRamTimingFocused: false,
  isRamTimingValid: false,

  // page 2 -> specifications -> storage
  storageType: 'SSD',
  storageCapacity: 0,
  storageCapacityUnit: 'GB',
  storageCacheCapacity: 0,
  storageCacheCapacityUnit: 'MB',
  storageFormFactor: 'M.2 2280',
  storageInterface: 'PCIe 3.0 x4',

  // page 2 -> specifications -> psu
  psuWattage: 0,
  psuEfficiency: '80+ Bronze',
  psuModularity: 'Full',
  psuFormFactor: 'ATX',

  // page 2 -> specifications -> case
  caseColor: '',
  isCaseColorFocused: false,
  isCaseColorValid: false,
  caseType: 'Mid Tower',
  caseSidePanel: 'Solid',

  // page 2 -> specifications -> monitor
  monitorSize: 0,
  monitorResolutionHorizontal: 0,
  monitorResolutionVertical: 0,
  monitorRefreshRate: 0,
  monitorPanelType: 'IPS',
  monitorResponseTime: 0,
  monitorAspectRatio: '',
  isMonitorAspectRatioFocused: false,
  isMonitorAspectRatioValid: false,

  // page 2 -> specifications -> keyboard
  keyboardBacklight: 'RGB',
  keyboardInterface: 'USB',
  keyboardLayout: 'ISO',
  keyboardSwitch: 'Cherry MX Red',

  // page 2 -> specifications -> mouse
  mouseDpi: 0,
  mouseButtons: 0,
  mouseInterface: 'USB',
  mouseColor: '',
  isMouseColorFocused: false,
  isMouseColorValid: false,
  mouseSensor: 'Optical',

  // page 2 -> specifications -> headphone
  headphoneType: 'Over-ear',
  headphoneColor: '',
  isHeadphoneColorFocused: false,
  isHeadphoneColorValid: false,
  headphoneInterface: 'USB',
  headphoneDriver: 0,
  headphoneFrequencyResponse: '',
  isHeadphoneFrequencyResponseFocused: false,
  isHeadphoneFrequencyResponseValid: false,
  headphoneImpedance: 0,

  // page 2 -> specifications -> speaker
  speakerType: '2.0',
  speakerColor: '',
  isSpeakerColorFocused: false,
  isSpeakerColorValid: false,
  speakerInterface: 'USB',
  speakerFrequencyResponse: '',
  isSpeakerFrequencyResponseFocused: false,
  isSpeakerFrequencyResponseValid: false,
  speakerTotalWattage: 0,

  // page 2 -> specifications -> smartphone
  smartphoneBatteryCapacity: 0,
  smartphoneCamera: '',
  isSmartphoneCameraFocused: false,
  isSmartphoneCameraValid: false,
  smartphoneChipset: '',
  isSmartphoneChipsetFocused: false,
  isSmartphoneChipsetValid: false,
  smartphoneColor: '',
  isSmartphoneColorFocused: false,
  isSmartphoneColorValid: false,
  smartphoneDisplay: 0,
  smartphoneResolutionHorizontal: 0,
  smartphoneResolutionVertical: 0,
  smartphoneOs: 'iOS',
  smartphoneRamCapacity: 0,
  smartphoneRamCapacityUnit: 'GB',
  smartphoneStorageCapacity: 0,

  // page 2 -> specifications -> tablet
  tabletBatteryCapacity: 0,
  tabletCamera: '',
  isTabletCameraFocused: false,
  isTabletCameraValid: false,
  tabletChipset: '',
  isTabletChipsetFocused: false,
  isTabletChipsetValid: false,
  tabletColor: '',
  isTabletColorFocused: false,
  isTabletColorValid: false,
  tabletDisplay: 0,
  tabletResolutionHorizontal: 0,
  tabletResolutionVertical: 0,
  tabletOs: 'iOS',
  tabletRamCapacity: 0,
  tabletRamCapacityUnit: 'GB',
  tabletStorageCapacity: 0,

  // page 2 -> specifications -> accessories
  accessoryColor: '',
  isAccessoryColorFocused: false,
  isAccessoryColorValid: false,
  accessoryInterface: 'USB',
  accessoryType: '',
  isAccessoryTypeFocused: false,
  isAccessoryTypeValid: false,

  // page 3
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
  setQuantity: 'setQuantity',
  // page 1 -> weight
  setWeight: 'setWeight',
  setWeightUnit: 'setWeightUnit',
  // page 1 -> dimensions
  setDimensionLength: 'setDimensionLength',
  setDimensionLengthUnit: 'setDimensionLengthUnit',
  setDimensionWidth: 'setDimensionWidth',
  setDimensionWidthUnit: 'setDimensionWidthUnit',
  setDimensionHeight: 'setDimensionHeight',
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
  setCpuCores: 'setCpuCores',
  setCpuL1CacheCapacity: 'setCpuL1CacheCapacity',
  setCpuL1CacheCapacityUnit: 'setCpuL1CacheCapacityUnit',
  setCpuL2CacheCapacity: 'setCpuL2CacheCapacity',
  setCpuL2CacheCapacityUnit: 'setCpuL2CacheCapacityUnit',
  setCpuL3CacheCapacity: 'setCpuL3CacheCapacity',
  setCpuL3CacheCapacityUnit: 'setCpuL3CacheCapacityUnit',
  setCpuWattage: 'setCpuWattage',

  // page 2 -> specifications -> gpu
  setGpuChipset: 'setGpuChipset',
  setIsGpuChipsetValid: 'setIsGpuChipsetValid',
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused',
  setGpuMemoryCapacity: 'setGpuMemoryCapacity',
  setGpuMemoryCapacityUnit: 'setGpuMemoryCapacityUnit',
  setGpuCoreClock: 'setGpuCoreClock',
  setGpuBoostClock: 'setGpuBoostClock',
  setGpuTdp: 'setGpuTdp',

  // page 2 -> specifications -> motherboard
  setMotherboardSocket: 'setMotherboardSocket',
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused',
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid',
  setMotherboardChipset: 'setMotherboardChipset',
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused',
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid',
  setMotherboardFormFactor: 'setMotherboardFormFactor',
  setMotherboardMemoryMaxCapacity: 'setMotherboardMemoryMaxCapacity',
  setMotherboardMemoryMaxCapacityUnit: 'setMotherboardMemoryMaxCapacityUnit',
  setMotherboardMemorySlots: 'setMotherboardMemorySlots',
  setMotherboardMemoryType: 'setMotherboardMemoryType',
  setMotherboardSataPorts: 'setMotherboardSataPorts',
  setMotherboardM2Slots: 'setMotherboardM2Slots',
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots',
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots',
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots',

  // page 2 -> specifications -> ram
  setRamDataRate: 'setRamDataRate',
  setRamModulesQuantity: 'setRamModulesQuantity',
  setRamModulesCapacity: 'setRamModulesCapacity',
  setRamModulesCapacityUnit: 'setRamModulesCapacityUnit',
  setRamType: 'setRamType',
  setRamColor: 'setRamColor',
  setIsRamColorValid: 'setIsRamColorValid',
  setIsRamColorFocused: 'setIsRamColorFocused',
  setRamVoltage: 'setRamVoltage',
  setRamTiming: 'setRamTiming',
  setIsRamTimingValid: 'setIsRamTimingValid',
  setIsRamTimingFocused: 'setIsRamTimingFocused',

  // page 2 -> specifications -> storage
  setStorageType: 'setStorageType',
  setStorageCapacity: 'setStorageCapacity',
  setStorageCapacityUnit: 'setStorageCapacityUnit',
  setStorageCacheCapacity: 'setStorageCacheCapacity',
  setStorageCacheCapacityUnit: 'setStorageCacheCapacityUnit',
  setStorageFormFactor: 'setStorageFormFactor',
  setStorageInterface: 'setStorageInterface',

  // page 2 -> specifications -> psu
  setPsuWattage: 'setPsuWattage',
  setPsuEfficiency: 'setPsuEfficiency',
  setPsuFormFactor: 'setPsuFormFactor',
  setPsuModularity: 'setPsuModularity',

  // page 2 -> specifications -> case
  setCaseColor: 'setCaseColor',
  setIsCaseColorValid: 'setIsCaseColorValid',
  setIsCaseColorFocused: 'setIsCaseColorFocused',
  setCaseType: 'setCaseType',
  setCaseSidePanel: 'setCaseSidePanel',

  // page 2 -> specifications -> monitor
  setMonitorSize: 'setMonitorSize',
  setMonitorResolutionHorizontal: 'setMonitorResolutionHorizontal',
  setMonitorResolutionVertical: 'setMonitorResolutionVertical',
  setMonitorRefreshRate: 'setMonitorRefreshRate',
  setMonitorPanelType: 'setMonitorPanelType',
  setMonitorResponseTime: 'setMonitorResponseTime',
  setMonitorAspectRatio: 'setMonitorAspectRatio',
  setIsMonitorAspectRatioValid: 'setIsMonitorAspectRatioValid',
  setIsMonitorAspectRatioFocused: 'setIsMonitorAspectRatioFocused',

  // page 2 -> specifications -> keyboard
  setKeyboardSwitch: 'setKeyboardSwitch',
  setKeyboardLayout: 'setKeyboardLayout',
  setKeyboardBacklight: 'setKeyboardBacklight',
  setKeyboardInterface: 'setKeyboardInterface',

  // page 2 -> specifications -> mouse
  setMouseSensor: 'setMouseSensor',
  setMouseDpi: 'setMouseDpi',
  setMouseButtons: 'setMouseButtons',
  setMouseColor: 'setMouseColor',
  setIsMouseColorValid: 'setIsMouseColorValid',
  setIsMouseColorFocused: 'setIsMouseColorFocused',
  setMouseInterface: 'setMouseInterface',

  // page 2 -> specifications -> headphone
  setHeadphoneType: 'setHeadphoneType',
  setHeadphoneDriver: 'setHeadphoneDriver',
  setHeadphoneFrequencyResponse: 'setHeadphoneFrequencyResponse',
  setIsHeadphoneFrequencyResponseValid: 'setIsHeadphoneFrequencyResponseValid',
  setIsHeadphoneFrequencyResponseFocused:
    'setIsHeadphoneFrequencyResponseFocused',
  setHeadphoneImpedance: 'setHeadphoneImpedance',
  setHeadphoneColor: 'setHeadphoneColor',
  setIsHeadphoneColorValid: 'setIsHeadphoneColorValid',
  setIsHeadphoneColorFocused: 'setIsHeadphoneColorFocused',
  setHeadphoneInterface: 'setHeadphoneInterface',

  // page 2 -> specifications -> speaker
  setSpeakerType: 'setSpeakerType',
  setSpeakerTotalWattage: 'setSpeakerTotalWattage',
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
  setSmartphoneResolutionHorizontal: 'setSmartphoneResolutionHorizontal',
  setSmartphoneResolutionVertical: 'setSmartphoneResolutionVertical',
  setSmartphoneRamCapacity: 'setSmartphoneRamCapacity',
  setSmartphoneRamCapacityUnit: 'setSmartphoneRamCapacityUnit',
  setSmartphoneStorageCapacity: 'setSmartphoneStorageCapacity',
  setSmartphoneBatteryCapacity: 'setSmartphoneBatteryCapacity',
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
  setTabletResolutionHorizontal: 'setTabletResolutionHorizontal',
  setTabletResolutionVertical: 'setTabletResolutionVertical',
  setTabletRamCapacity: 'setTabletRamCapacity',
  setTabletRamCapacityUnit: 'setTabletRamCapacityUnit',
  setTabletStorageCapacity: 'setTabletStorageCapacity',
  setTabletBatteryCapacity: 'setTabletBatteryCapacity',
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

  // page 3
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

    case createProductAction.setQuantity:
      return {
        ...state,
        quantity: action.payload,
      };

    // page 1 -> weight
    case createProductAction.setWeight:
      return {
        ...state,
        weight: action.payload,
      };
    case createProductAction.setWeightUnit:
      return {
        ...state,
        weightUnit: action.payload,
      };

    // page 1 -> dimension
    case createProductAction.setDimensionHeight:
      return {
        ...state,
        dimensionHeight: action.payload,
      };
    case createProductAction.setDimensionHeightUnit:
      return {
        ...state,
        dimensionHeightUnit: action.payload,
      };
    case createProductAction.setDimensionWidth:
      return {
        ...state,
        dimensionWidth: action.payload,
      };
    case createProductAction.setDimensionWidthUnit:
      return {
        ...state,
        dimensionWidthUnit: action.payload,
      };
    case createProductAction.setDimensionLength:
      return {
        ...state,
        dimensionLength: action.payload,
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
    case createProductAction.setCpuFrequency:
      return {
        ...state,
        cpuFrequency: action.payload,
      };
    case createProductAction.setCpuCores:
      return {
        ...state,
        cpuCores: action.payload,
      };
    case createProductAction.setCpuL1CacheCapacity:
      return {
        ...state,
        cpuL1CacheCapacity: action.payload,
      };
    case createProductAction.setCpuL1CacheCapacityUnit:
      return {
        ...state,
        cpuL1CacheCapacityUnit: action.payload,
      };
    case createProductAction.setCpuL2CacheCapacity:
      return {
        ...state,
        cpuL2CacheCapacity: action.payload,
      };
    case createProductAction.setCpuL2CacheCapacityUnit:
      return {
        ...state,
        cpuL2CacheCapacityUnit: action.payload,
      };
    case createProductAction.setCpuL3CacheCapacity:
      return {
        ...state,
        cpuL3CacheCapacity: action.payload,
      };
    case createProductAction.setCpuL3CacheCapacityUnit:
      return {
        ...state,
        cpuL3CacheCapacityUnit: action.payload,
      };
    case createProductAction.setCpuWattage:
      return {
        ...state,
        cpuWattage: action.payload,
      };

    // page 2 -> specifications -> gpu
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
    case createProductAction.setGpuMemoryCapacity:
      return {
        ...state,
        gpuMemoryCapacity: action.payload,
      };
    case createProductAction.setGpuMemoryCapacityUnit:
      return {
        ...state,
        gpuMemoryCapacityUnit: action.payload,
      };
    case createProductAction.setGpuCoreClock:
      return {
        ...state,
        gpuCoreClock: action.payload,
      };
    case createProductAction.setGpuBoostClock:
      return {
        ...state,
        gpuBoostClock: action.payload,
      };
    case createProductAction.setGpuTdp:
      return {
        ...state,
        gpuTdp: action.payload,
      };

    // page 2 -> specifications -> motherboard
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
    case createProductAction.setMotherboardFormFactor:
      return {
        ...state,
        motherboardFormFactor: action.payload,
      };
    case createProductAction.setMotherboardMemoryMaxCapacity:
      return {
        ...state,
        motherboardMemoryMaxCapacity: action.payload,
      };
    case createProductAction.setMotherboardMemoryMaxCapacityUnit:
      return {
        ...state,
        motherboardMemoryMaxCapacityUnit: action.payload,
      };
    case createProductAction.setMotherboardMemorySlots:
      return {
        ...state,
        motherboardMemorySlots: action.payload,
      };
    case createProductAction.setMotherboardMemoryType:
      return {
        ...state,
        motherboardMemoryType: action.payload,
      };
    case createProductAction.setMotherboardSataPorts:
      return {
        ...state,
        motherboardSataPorts: action.payload,
      };
    case createProductAction.setMotherboardM2Slots:
      return {
        ...state,
        motherboardM2Slots: action.payload,
      };
    case createProductAction.setMotherboardPcie3Slots:
      return {
        ...state,
        motherboardPcie3Slots: action.payload,
      };
    case createProductAction.setMotherboardPcie4Slots:
      return {
        ...state,
        motherboardPcie4Slots: action.payload,
      };
    case createProductAction.setMotherboardPcie5Slots:
      return {
        ...state,
        motherboardPcie5Slots: action.payload,
      };

    // page 2 -> specifications -> ram
    case createProductAction.setRamDataRate:
      return {
        ...state,
        ramDataRate: action.payload,
      };
    case createProductAction.setRamModulesQuantity:
      return {
        ...state,
        ramModulesQuantity: action.payload,
      };
    case createProductAction.setRamModulesCapacity:
      return {
        ...state,
        ramModulesCapacity: action.payload,
      };
    case createProductAction.setRamModulesCapacityUnit:
      return {
        ...state,
        ramModulesCapacityUnit: action.payload,
      };
    case createProductAction.setRamType:
      return {
        ...state,
        ramType: action.payload,
      };
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
    case createProductAction.setRamVoltage:
      return {
        ...state,
        ramVoltage: action.payload,
      };
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
    case createProductAction.setStorageType:
      return {
        ...state,
        storageType: action.payload,
      };
    case createProductAction.setStorageCapacity:
      return {
        ...state,
        storageCapacity: action.payload,
      };
    case createProductAction.setStorageCapacityUnit:
      return {
        ...state,
        storageCapacityUnit: action.payload,
      };
    case createProductAction.setStorageCacheCapacity:
      return {
        ...state,
        storageCacheCapacity: action.payload,
      };
    case createProductAction.setStorageCacheCapacityUnit:
      return {
        ...state,
        storageCacheCapacityUnit: action.payload,
      };
    case createProductAction.setStorageFormFactor:
      return {
        ...state,
        storageFormFactor: action.payload,
      };
    case createProductAction.setStorageInterface:
      return {
        ...state,
        storageInterface: action.payload,
      };

    // page 2 -> specifications -> psu
    case createProductAction.setPsuWattage:
      return {
        ...state,
        psuWattage: action.payload,
      };
    case createProductAction.setPsuEfficiency:
      return {
        ...state,
        psuEfficiency: action.payload,
      };
    case createProductAction.setPsuFormFactor:
      return {
        ...state,
        psuFormFactor: action.payload,
      };
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

    // page 2 -> specifications -> monitor
    case createProductAction.setMonitorSize:
      return {
        ...state,
        monitorSize: action.payload,
      };
    case createProductAction.setMonitorResolutionHorizontal:
      return {
        ...state,
        monitorResolutionHorizontal: action.payload,
      };
    case createProductAction.setMonitorResolutionVertical:
      return {
        ...state,
        monitorResolutionVertical: action.payload,
      };
    case createProductAction.setMonitorRefreshRate:
      return {
        ...state,
        monitorRefreshRate: action.payload,
      };
    case createProductAction.setMonitorPanelType:
      return {
        ...state,
        monitorPanelType: action.payload,
      };
    case createProductAction.setMonitorResponseTime:
      return {
        ...state,
        monitorResponseTime: action.payload,
      };
    case createProductAction.setMonitorAspectRatio:
      return {
        ...state,
        monitorAspectRatio: action.payload,
      };
    case createProductAction.setIsMonitorAspectRatioFocused:
      return {
        ...state,
        isMonitorAspectRatioFocused: action.payload,
      };
    case createProductAction.setIsMonitorAspectRatioValid:
      return {
        ...state,
        isMonitorAspectRatioValid: action.payload,
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
    case createProductAction.setMouseSensor:
      return {
        ...state,
        mouseSensor: action.payload,
      };
    case createProductAction.setMouseDpi:
      return {
        ...state,
        mouseDpi: action.payload,
      };
    case createProductAction.setMouseButtons:
      return {
        ...state,
        mouseButtons: action.payload,
      };
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
    case createProductAction.setMouseInterface:
      return {
        ...state,
        mouseInterface: action.payload,
      };

    // page 2 -> specifications -> headphone
    case createProductAction.setHeadphoneType:
      return {
        ...state,
        headphoneType: action.payload,
      };
    case createProductAction.setHeadphoneDriver:
      return {
        ...state,
        headphoneDriver: action.payload,
      };
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
    case createProductAction.setHeadphoneImpedance:
      return {
        ...state,
        headphoneImpedance: action.payload,
      };
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
    case createProductAction.setHeadphoneInterface:
      return {
        ...state,
        headphoneInterface: action.payload,
      };

    // page 2 -> specifications -> speaker
    case createProductAction.setSpeakerType:
      return {
        ...state,
        speakerType: action.payload,
      };
    case createProductAction.setSpeakerTotalWattage:
      return {
        ...state,
        speakerTotalWattage: action.payload,
      };
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
    case createProductAction.setSpeakerInterface:
      return {
        ...state,
        speakerInterface: action.payload,
      };

    // page 2 -> specifications -> smartphone
    case createProductAction.setSmartphoneOs:
      return {
        ...state,
        smartphoneOs: action.payload,
      };
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
    case createProductAction.setSmartphoneDisplay:
      return {
        ...state,
        smartphoneDisplay: action.payload,
      };
    case createProductAction.setSmartphoneResolutionHorizontal:
      return {
        ...state,
        smartphoneResolutionHorizontal: action.payload,
      };
    case createProductAction.setSmartphoneResolutionVertical:
      return {
        ...state,
        smartphoneResolutionVertical: action.payload,
      };
    case createProductAction.setSmartphoneRamCapacity:
      return {
        ...state,
        smartphoneRamCapacity: action.payload,
      };
    case createProductAction.setSmartphoneRamCapacityUnit:
      return {
        ...state,
        smartphoneRamCapacityUnit: action.payload,
      };
    case createProductAction.setSmartphoneStorageCapacity:
      return {
        ...state,
        smartphoneStorageCapacity: action.payload,
      };
    case createProductAction.setSmartphoneBatteryCapacity:
      return {
        ...state,
        smartphoneBatteryCapacity: action.payload,
      };
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
    case createProductAction.setTabletOs:
      return {
        ...state,
        tabletOs: action.payload,
      };
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
    case createProductAction.setTabletDisplay:
      return {
        ...state,
        tabletDisplay: action.payload,
      };
    case createProductAction.setTabletResolutionHorizontal:
      return {
        ...state,
        tabletResolutionHorizontal: action.payload,
      };
    case createProductAction.setTabletResolutionVertical:
      return {
        ...state,
        tabletResolutionVertical: action.payload,
      };
    case createProductAction.setTabletRamCapacity:
      return {
        ...state,
        tabletRamCapacity: action.payload,
      };
    case createProductAction.setTabletRamCapacityUnit:
      return {
        ...state,
        tabletRamCapacityUnit: action.payload,
      };
    case createProductAction.setTabletStorageCapacity:
      return {
        ...state,
        tabletStorageCapacity: action.payload,
      };
    case createProductAction.setTabletBatteryCapacity:
      return {
        ...state,
        tabletBatteryCapacity: action.payload,
      };
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

    // page 2 -> specifications -> accessory
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
    case createProductAction.setAccessoryInterface:
      return {
        ...state,
        accessoryInterface: action.payload,
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
