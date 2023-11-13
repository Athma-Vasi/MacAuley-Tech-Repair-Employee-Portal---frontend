import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
} from './types';

const initialProductState: CreateProductState = {
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
  cpuFrequency: 0,
  cpuFrequencyUnit: 'GHz',
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
  gpuCoreClock: 0,
  gpuCoreClockUnit: 'MHz',
  gpuBoostClock: 0,
  gpuBoostClockUnit: 'MHz',
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
  ramFrequency: 0,
  ramFrequencyUnit: 'MHz',
  ramModulesQuantity: 0,
  ramModulesCapacity: 0,
  ramModulesCapacityUnit: 'GB',
  ramType: 'DDR4',
  ramColor: 'Black',
  ramVoltage: 0,
  ramTiming: '00-00-00-00',
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

  // page 3
  imgFormDataArray: [],
  areImagesValid: false,
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
  setCpuFrequencyUnit: 'setCpuFrequencyUnit',
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
  setGpuCoreClockUnit: 'setGpuCoreClockUnit',
  setGpuBoostClock: 'setGpuBoostClock',
  setGpuBoostClockUnit: 'setGpuBoostClockUnit',
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
  setRamFrequency: 'setRamFrequency',
  setRamFrequencyUnit: 'setRamFrequencyUnit',
  setRamModulesQuantity: 'setRamModulesQuantity',
  setRamModulesCapacity: 'setRamModulesCapacity',
  setRamModulesCapacityUnit: 'setRamModulesCapacityUnit',
  setRamType: 'setRamType',
  setRamColor: 'setRamColor',
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
    case createProductAction.setCpuFrequencyUnit:
      return {
        ...state,
        cpuFrequencyUnit: action.payload,
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
    case createProductAction.setGpuCoreClockUnit:
      return {
        ...state,
        gpuCoreClockUnit: action.payload,
      };
    case createProductAction.setGpuBoostClock:
      return {
        ...state,
        gpuBoostClock: action.payload,
      };
    case createProductAction.setGpuBoostClockUnit:
      return {
        ...state,
        gpuBoostClockUnit: action.payload,
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
    case createProductAction.setRamFrequency:
      return {
        ...state,
        ramFrequency: action.payload,
      };
    case createProductAction.setRamFrequencyUnit:
      return {
        ...state,
        ramFrequencyUnit: action.payload,
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
