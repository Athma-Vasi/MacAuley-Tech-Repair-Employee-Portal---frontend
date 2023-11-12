import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
} from './types';

const initialProductState: CreateProductState = {
  // page 1
  brand: '',
  isBrandValid: false,
  isBrandFocused: false,
  model: '',
  isModelValid: false,
  isModelFocused: false,
  productCategory: 'Accessories',
  description: '',
  isDescriptionValid: false,
  isDescriptionFocused: false,
  price: '',
  isPriceValid: false,
  isPriceFocused: false,
  currency: 'CAD',
  availability: true,
  quantity: 0,
  weight: '',
  isWeightValid: false,
  isWeightFocused: false,
  dimensionHeight: 0,
  dimensionHeightUnit: 'cm',
  dimensionWidth: 0,
  dimensionWidthUnit: 'cm',
  dimensionLength: 0,
  dimensionLengthUnit: 'cm',
  additionalComments: '',
  isAdditionalCommentsFocused: false,
  isAdditionalCommentsValid: false,

  // page 2
  // specifications
  // specifications -> cpu
  cpuSocket: '',
  isCpuSocketFocused: false,
  isCpuSocketValid: false,
  cpuSpeed: 0,
  cpuCores: 2,
  cpuL1Cache: 0,
  cpuL1CacheUnits: 'KB',
  cpuL2Cache: 0,
  cpuL2CacheUnits: 'KB',
  cpuL3Cache: 0,
  cpuL3CacheUnits: 'KB',
  cpuWattage: 0,

  // specifications -> gpu
  gpuChipset: '',
  isGpuChipsetFocused: false,
  isGpuChipsetValid: false,
  gpuMemory: 0,
  gpuMemoryUnits: 'GB',
  gpuCoreClock: 0,
  gpuCoreClockUnits: 'MHz',
  gpuBoostClock: 0,
  gpuBoostClockUnits: 'MHz',
  gpuTdp: 0,

  // specifications -> motherboard

  // specifications -> memory

  // specifications -> storage

  // specifications -> case

  // specifications -> power supply

  // page 3
  imgFormDataArray: [],
  areImagesValid: false,
};

const createProductAction: CreateProductAction = {
  setBrand: 'setBrand',
  setIsBrandValid: 'setIsBrandValid',
  setIsBrandFocused: 'setIsBrandFocused',
  setModel: 'setModel',
  setIsModelValid: 'setIsModelValid',
  setIsModelFocused: 'setIsModelFocused',
  setProductCategory: 'setProductCategory',
  setDescription: 'setDescription',
  setIsDescriptionValid: 'setIsDescriptionValid',
  setIsDescriptionFocused: 'setIsDescriptionFocused',
  setPrice: 'setPrice',
  setIsPriceValid: 'setIsPriceValid',
  setIsPriceFocused: 'setIsPriceFocused',
  setCurrency: 'setCurrency',
  setAvailability: 'setAvailability',
  setQuantity: 'setQuantity',
  setWeight: 'setWeight',
  setIsWeightValid: 'setIsWeightValid',
  setIsWeightFocused: 'setIsWeightFocused',
  setDimensionHeight: 'setDimensionHeight',
  setDimensionHeightUnit: 'setDimensionHeightUnit',
  setDimensionWidth: 'setDimensionWidth',
  setDimensionWidthUnit: 'setDimensionWidthUnit',
  setDimensionLength: 'setDimensionLength',
  setDimensionLengthUnit: 'setDimensionLengthUnit',
  setAdditionalComments: 'setAdditionalComments',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid',

  // page 2
  // specifications
  // specifications -> cpu
  setCpuSocket: 'setCpuSocket',
  setIsCpuSocketFocused: 'setIsCpuSocketFocused',
  setIsCpuSocketValid: 'setIsCpuSocketValid',
  setCpuSpeed: 'setCpuSpeed',
  setCpuCores: 'setCpuCores',
  setCpuL1Cache: 'setCpuL1Cache',
  setCpuL1CacheUnits: 'setCpuL1CacheUnits',
  setCpuL2Cache: 'setCpuL2Cache',
  setCpuL2CacheUnits: 'setCpuL2CacheUnits',
  setCpuL3Cache: 'setCpuL3Cache',
  setCpuL3CacheUnits: 'setCpuL3CacheUnits',
  setCpuWattage: 'setCpuWattage',

  // specifications -> gpu
  setGpuChipset: 'setGpuChipset',
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused',
  setIsGpuChipsetValid: 'setIsGpuChipsetValid',
  setGpuMemory: 'setGpuMemory',
  setGpuMemoryUnits: 'setGpuMemoryUnits',
  setGpuCoreClock: 'setGpuCoreClock',
  setGpuCoreClockUnits: 'setGpuCoreClockUnits',
  setGpuBoostClock: 'setGpuBoostClock',
  setGpuBoostClockUnits: 'setGpuBoostClockUnits',
  setGpuTdp: 'setGpuTdp',

  // specifications -> motherboard

  // page 3
  setImgFormDataArray: 'setImgFormDataArray',
  setAreImagesValid: 'setAreImagesValid',
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
    // specifications
    // specifications -> cpu
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
    case createProductAction.setCpuSpeed:
      return {
        ...state,
        cpuSpeed: action.payload,
      };
    case createProductAction.setCpuCores:
      return {
        ...state,
        cpuCores: action.payload,
      };
    case createProductAction.setCpuL1Cache:
      return {
        ...state,
        cpuL1Cache: action.payload,
      };
    case createProductAction.setCpuL1CacheUnits:
      return {
        ...state,
        cpuL1CacheUnits: action.payload,
      };
    case createProductAction.setCpuL2Cache:
      return {
        ...state,
        cpuL2Cache: action.payload,
      };
    case createProductAction.setCpuL2CacheUnits:
      return {
        ...state,
        cpuL2CacheUnits: action.payload,
      };
    case createProductAction.setCpuL3Cache:
      return {
        ...state,
        cpuL3Cache: action.payload,
      };
    case createProductAction.setCpuL3CacheUnits:
      return {
        ...state,
        cpuL3CacheUnits: action.payload,
      };
    case createProductAction.setCpuWattage:
      return {
        ...state,
        cpuWattage: action.payload,
      };

    // specifications -> gpu
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
    case createProductAction.setGpuMemory:
      return {
        ...state,
        gpuMemory: action.payload,
      };
    case createProductAction.setGpuMemoryUnits:
      return {
        ...state,
        gpuMemoryUnits: action.payload,
      };
    case createProductAction.setGpuCoreClock:
      return {
        ...state,
        gpuCoreClock: action.payload,
      };
    case createProductAction.setGpuCoreClockUnits:
      return {
        ...state,
        gpuCoreClockUnits: action.payload,
      };
    case createProductAction.setGpuBoostClock:
      return {
        ...state,
        gpuBoostClock: action.payload,
      };
    case createProductAction.setGpuBoostClockUnits:
      return {
        ...state,
        gpuBoostClockUnits: action.payload,
      };
    case createProductAction.setGpuTdp:
      return {
        ...state,
        gpuTdp: action.payload,
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

    default:
      return state;
  }
}

export { createProductAction, createProductReducer, initialProductState };
