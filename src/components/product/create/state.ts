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
  cpuSpeed: '3.5 GHz',
  isCpuSpeedFocused: false,
  isCpuSpeedValid: false,
  cpuCores: 2,
  cpuL1Cache: '256 KB',
  isCpuL1CacheFocused: false,
  isCpuL1CacheValid: false,
  cpuL2Cache: '1 MB',
  isCpuL2CacheFocused: false,
  isCpuL2CacheValid: false,
  cpuL3Cache: '4 MB',
  isCpuL3CacheFocused: false,
  isCpuL3CacheValid: false,
  cpuWattage: '65 W',
  isCpuWattageFocused: false,
  isCpuWattageValid: false,

  // specifications -> gpu
  gpuChipset: '',
  isGpuChipsetFocused: false,
  isGpuChipsetValid: false,
  gpuMemory: '8 GB',
  isGpuMemoryFocused: false,
  isGpuMemoryValid: false,
  gpuCoreClock: '1500 MHz',
  isGpuCoreClockFocused: false,
  isGpuCoreClockValid: false,
  gpuBoostClock: '1800 MHz',
  isGpuBoostClockFocused: false,
  isGpuBoostClockValid: false,
  gpuTdp: '150 W',
  isGpuTdpFocused: false,
  isGpuTdpValid: false,

  // specifications -> motherboard
  motherboardSocket: '',
  isMotherboardSocketFocused: false,
  isMotherboardSocketValid: false,
  motherboardChipset: '',
  isMotherboardChipsetFocused: false,
  isMotherboardChipsetValid: false,
  motherboardFormFactor: 'ATX',
  motherboardMemoryMax: '128 GB',
  isMotherboardMemoryMaxFocused: false,
  isMotherboardMemoryMaxValid: false,
  motherboardMemorySlots: 0,
  motherboardMemoryType: 'DDR4',
  motherboardSataPorts: 0,
  motherboardM2Slots: 0,
  motherboardPcie3Slots: 0,
  motherboardPcie4Slots: 0,
  motherboardPcie5Slots: 0,

  // specifications -> ram
  ramSpeed: '3200 MHz',
  isRamSpeedFocused: false,
  isRamSpeedValid: false,
  ramModules: '2x 8 GB',
  isRamModulesFocused: false,
  isRamModulesValid: false,
  ramType: 'DDR4',
  ramColor: 'Black',
  ramVoltage: '1.35 V',
  isRamVoltageFocused: false,
  isRamVoltageValid: false,
  ramTiming: '16-18-18-38',
  isRamTimingFocused: false,
  isRamTimingValid: false,

  // specifications -> storage
  storageType: 'SSD',
  storageCapacity: '1 TB',
  isStorageCapacityFocused: false,
  isStorageCapacityValid: false,
  storageCache: '32 MB',
  isStorageCacheFocused: false,
  isStorageCacheValid: false,
  storageFormFactor: 'M.2 2280',
  storageInterface: 'PCIe 3.0 x4',

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
  setIsCpuSocketValid: 'setIsCpuSocketValid',
  setIsCpuSocketFocused: 'setIsCpuSocketFocused',
  setCpuSpeed: 'setCpuSpeed',
  setIsCpuSpeedValid: 'setIsCpuSpeedValid',
  setIsCpuSpeedFocused: 'setIsCpuSpeedFocused',
  setCpuCores: 'setCpuCores',
  setCpuL1Cache: 'setCpuL1Cache',
  setIsCpuL1CacheValid: 'setIsCpuL1CacheValid',
  setIsCpuL1CacheFocused: 'setIsCpuL1CacheFocused',
  setCpuL2Cache: 'setCpuL2Cache',
  setIsCpuL2CacheValid: 'setIsCpuL2CacheValid',
  setIsCpuL2CacheFocused: 'setIsCpuL2CacheFocused',
  setCpuL3Cache: 'setCpuL3Cache',
  setIsCpuL3CacheValid: 'setIsCpuL3CacheValid',
  setIsCpuL3CacheFocused: 'setIsCpuL3CacheFocused',
  setCpuWattage: 'setCpuWattage',
  setIsCpuWattageValid: 'setIsCpuWattageValid',
  setIsCpuWattageFocused: 'setIsCpuWattageFocused',

  // specifications -> gpu
  setGpuChipset: 'setGpuChipset',
  setIsGpuChipsetValid: 'setIsGpuChipsetValid',
  setIsGpuChipsetFocused: 'setIsGpuChipsetFocused',
  setGpuMemory: 'setGpuMemory',
  setIsGpuMemoryValid: 'setIsGpuMemoryValid',
  setIsGpuMemoryFocused: 'setIsGpuMemoryFocused',
  setGpuCoreClock: 'setGpuCoreClock',
  setIsGpuCoreClockValid: 'setIsGpuCoreClockValid',
  setIsGpuCoreClockFocused: 'setIsGpuCoreClockFocused',
  setGpuBoostClock: 'setGpuBoostClock',
  setIsGpuBoostClockValid: 'setIsGpuBoostClockValid',
  setIsGpuBoostClockFocused: 'setIsGpuBoostClockFocused',
  setGpuTdp: 'setGpuTdp',
  setIsGpuTdpValid: 'setIsGpuTdpValid',
  setIsGpuTdpFocused: 'setIsGpuTdpFocused',

  // specifications -> motherboard
  setMotherboardSocket: 'setMotherboardSocket',
  setIsMotherboardSocketFocused: 'setIsMotherboardSocketFocused',
  setIsMotherboardSocketValid: 'setIsMotherboardSocketValid',
  setMotherboardChipset: 'setMotherboardChipset',
  setIsMotherboardChipsetFocused: 'setIsMotherboardChipsetFocused',
  setIsMotherboardChipsetValid: 'setIsMotherboardChipsetValid',
  setMotherboardFormFactor: 'setMotherboardFormFactor',
  setMotherboardMemoryMax: 'setMotherboardMemoryMax',
  setIsMotherboardMemoryMaxFocused: 'setIsMotherboardMemoryMaxFocused',
  setIsMotherboardMemoryMaxValid: 'setIsMotherboardMemoryMaxValid',
  setMotherboardMemorySlots: 'setMotherboardMemorySlots',
  setMotherboardMemoryType: 'setMotherboardMemoryType',
  setMotherboardSataPorts: 'setMotherboardSataPorts',
  setMotherboardM2Slots: 'setMotherboardM2Slots',
  setMotherboardPcie3Slots: 'setMotherboardPcie3Slots',
  setMotherboardPcie4Slots: 'setMotherboardPcie4Slots',
  setMotherboardPcie5Slots: 'setMotherboardPcie5Slots',

  // specifications -> ram
  setRamSpeed: 'setRamSpeed',
  setIsRamSpeedValid: 'setIsRamSpeedValid',
  setIsRamSpeedFocused: 'setIsRamSpeedFocused',
  setRamModules: 'setRamModules',
  setIsRamModulesValid: 'setIsRamModulesValid',
  setIsRamModulesFocused: 'setIsRamModulesFocused',
  setRamType: 'setRamType',
  setRamColor: 'setRamColor',
  setRamVoltage: 'setRamVoltage',
  setIsRamVoltageValid: 'setIsRamVoltageValid',
  setIsRamVoltageFocused: 'setIsRamVoltageFocused',
  setRamTiming: 'setRamTiming',
  setIsRamTimingValid: 'setIsRamTimingValid',
  setIsRamTimingFocused: 'setIsRamTimingFocused',

  // specifications -> storage
  setStorageType: 'setStorageType',
  setStorageCapacity: 'setStorageCapacity',
  setIsStorageCapacityValid: 'setIsStorageCapacityValid',
  setIsStorageCapacityFocused: 'setIsStorageCapacityFocused',
  setStorageCache: 'setStorageCache',
  setIsStorageCacheValid: 'setIsStorageCacheValid',
  setIsStorageCacheFocused: 'setIsStorageCacheFocused',
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
    case createProductAction.setIsCpuSpeedFocused:
      return {
        ...state,
        isCpuSpeedFocused: action.payload,
      };
    case createProductAction.setIsCpuSpeedValid:
      return {
        ...state,
        isCpuSpeedValid: action.payload,
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
    case createProductAction.setIsCpuL1CacheFocused:
      return {
        ...state,
        isCpuL1CacheFocused: action.payload,
      };
    case createProductAction.setIsCpuL1CacheValid:
      return {
        ...state,
        isCpuL1CacheValid: action.payload,
      };
    case createProductAction.setCpuL2Cache:
      return {
        ...state,
        cpuL2Cache: action.payload,
      };
    case createProductAction.setIsCpuL2CacheFocused:
      return {
        ...state,
        isCpuL2CacheFocused: action.payload,
      };
    case createProductAction.setIsCpuL2CacheValid:
      return {
        ...state,
        isCpuL2CacheValid: action.payload,
      };
    case createProductAction.setCpuL3Cache:
      return {
        ...state,
        cpuL3Cache: action.payload,
      };
    case createProductAction.setIsCpuL3CacheFocused:
      return {
        ...state,
        isCpuL3CacheFocused: action.payload,
      };
    case createProductAction.setIsCpuL3CacheValid:
      return {
        ...state,
        isCpuL3CacheValid: action.payload,
      };
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
    case createProductAction.setIsGpuMemoryFocused:
      return {
        ...state,
        isGpuMemoryFocused: action.payload,
      };
    case createProductAction.setIsGpuMemoryValid:
      return {
        ...state,
        isGpuMemoryValid: action.payload,
      };
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

    // specifications -> motherboard
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
    case createProductAction.setMotherboardMemoryMax:
      return {
        ...state,
        motherboardMemoryMax: action.payload,
      };
    case createProductAction.setIsMotherboardMemoryMaxFocused:
      return {
        ...state,
        isMotherboardMemoryMaxFocused: action.payload,
      };
    case createProductAction.setIsMotherboardMemoryMaxValid:
      return {
        ...state,
        isMotherboardMemoryMaxValid: action.payload,
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

    // specifications -> ram
    case createProductAction.setRamSpeed:
      return {
        ...state,
        ramSpeed: action.payload,
      };
    case createProductAction.setIsRamSpeedFocused:
      return {
        ...state,
        isRamSpeedFocused: action.payload,
      };
    case createProductAction.setIsRamSpeedValid:
      return {
        ...state,
        isRamSpeedValid: action.payload,
      };
    case createProductAction.setRamModules:
      return {
        ...state,
        ramModules: action.payload,
      };
    case createProductAction.setIsRamModulesFocused:
      return {
        ...state,
        isRamModulesFocused: action.payload,
      };
    case createProductAction.setIsRamModulesValid:
      return {
        ...state,
        isRamModulesValid: action.payload,
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

    // specifications -> storage
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
    case createProductAction.setStorageCache:
      return {
        ...state,
        storageCache: action.payload,
      };
    case createProductAction.setIsStorageCacheFocused:
      return {
        ...state,
        isStorageCacheFocused: action.payload,
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
