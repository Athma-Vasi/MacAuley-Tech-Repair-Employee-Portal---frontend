import { Currency, SetPageInErrorPayload } from "../../types";
import { ProductCategory } from "../dashboard/types";
import { StepsInErrorPayload } from "../endorsement/create/types";
import {
  AdditionalFieldsAdd,
  AdditionalFieldsPayload,
  AdditionalFieldsRemove,
  AdditionalFieldsUpdate,
  AdditionalFieldsValidFocusedAdd,
  AdditionalFieldsValidFocusedPayload,
  AdditionalFieldsValidFocusedRemove,
  AdditionalFieldsValidFocusedUpdate,
  CreateProductDispatch,
} from "./dispatch";
import { createProductAction } from "./state";
import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
  CreateProductState,
  DimensionUnit,
  DisplayPanelType,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  ProductAvailability,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
  WeightUnit,
} from "./types";

function createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const reducer = createProductReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const createProductReducersMap = new Map<
  CreateProductAction[keyof CreateProductAction],
  (state: CreateProductState, dispatch: CreateProductDispatch) => CreateProductState
>([
  [createProductAction.setBrand, setBrand_CreateProductReducer],
  [createProductAction.setModel, setModel_CreateProductReducer],
  [createProductAction.setDescription, setDescription_CreateProductReducer],
  [createProductAction.setPrice, setPrice_CreateProductReducer],
  [createProductAction.setCurrency, setCurrency_CreateProductReducer],
  [createProductAction.setAvailability, setAvailability_CreateProductReducer],
  [createProductAction.setQuantity, setQuantity_CreateProductReducer],
  [createProductAction.setWeight, setWeight_CreateProductReducer],
  [createProductAction.setWeightUnit, setWeightUnit_CreateProductReducer],
  [createProductAction.setDimensionHeight, setDimensionHeight_CreateProductReducer],
  [
    createProductAction.setDimensionHeightUnit,
    setDimensionHeightUnit_CreateProductReducer,
  ],
  [createProductAction.setDimensionWidth, setDimensionWidth_CreateProductReducer],
  [createProductAction.setDimensionWidthUnit, setDimensionWidthUnit_CreateProductReducer],
  [createProductAction.setDimensionLength, setDimensionLength_CreateProductReducer],
  [
    createProductAction.setDimensionLengthUnit,
    setDimensionLengthUnit_CreateProductReducer,
  ],
  [createProductAction.setAdditionalComments, setAdditionalComments_CreateProductReducer],

  // page 2
  [createProductAction.setProductCategory, setProductCategory_CreateProductReducer],

  [createProductAction.setAccessoryType, setAccessoryType_CreateProductReducer],
  [createProductAction.setAccessoryColor, setAccessoryColor_CreateProductReducer],
  [createProductAction.setAccessoryInterface, setAccessoryInterface_CreateProductReducer],
  [
    createProductAction.setAccessoryFieldsAdditionalMap,
    setAccessoryFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setCpuSocket, setCpuSocket_CreateProductReducer],
  [createProductAction.setCpuFrequency, setCpuFrequency_CreateProductReducer],
  [createProductAction.setCpuCores, setCpuCores_CreateProductReducer],
  [createProductAction.setCpuL1CacheCapacity, setCpuL1CacheCapacity_CreateProductReducer],
  [
    createProductAction.setCpuL1CacheCapacityUnit,
    setCpuL1CacheCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setCpuL2CacheCapacity, setCpuL2CacheCapacity_CreateProductReducer],
  [
    createProductAction.setCpuL2CacheCapacityUnit,
    setCpuL2CacheCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setCpuL3CacheCapacity, setCpuL3CacheCapacity_CreateProductReducer],
  [
    createProductAction.setCpuL3CacheCapacityUnit,
    setCpuL3CacheCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setCpuWattage, setCpuWattage_CreateProductReducer],
  [
    createProductAction.setCpuFieldsAdditionalMap,
    setCpuFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setCaseType, setCaseType_CreateProductReducer],
  [createProductAction.setCaseColor, setCaseColor_CreateProductReducer],
  [createProductAction.setCaseSidePanel, setCaseSidePanel_CreateProductReducer],
  [
    createProductAction.setCaseFieldsAdditionalMap,
    setCaseFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setDisplaySize, setDisplaySize_CreateProductReducer],
  [
    createProductAction.setDisplayResolutionHorizontal,
    setDisplayResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setDisplayResolutionVertical,
    setDisplayResolutionVertical_CreateProductReducer,
  ],
  [createProductAction.setDisplayRefreshRate, setDisplayRefreshRate_CreateProductReducer],
  [createProductAction.setDisplayPanelType, setDisplayPanelType_CreateProductReducer],
  [
    createProductAction.setDisplayResponseTime,
    setDisplayResponseTime_CreateProductReducer,
  ],
  [createProductAction.setDisplayAspectRatio, setDisplayAspectRatio_CreateProductReducer],
  [
    createProductAction.setDisplayFieldsAdditionalMap,
    setDisplayFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setGpuChipset, setGpuChipset_CreateProductReducer],
  [createProductAction.setGpuMemoryCapacity, setGpuMemoryCapacity_CreateProductReducer],
  [
    createProductAction.setGpuMemoryCapacityUnit,
    setGpuMemoryCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setGpuCoreClock, setGpuCoreClock_CreateProductReducer],
  [createProductAction.setGpuBoostClock, setGpuBoostClock_CreateProductReducer],
  [createProductAction.setGpuTdp, setGpuTdp_CreateProductReducer],
  [
    createProductAction.setGpuFieldsAdditionalMap,
    setGpuFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setHeadphoneType, setHeadphoneType_CreateProductReducer],
  [createProductAction.setHeadphoneDriver, setHeadphoneDriver_CreateProductReducer],
  [
    createProductAction.setHeadphoneFrequencyResponse,
    setHeadphoneFrequencyResponse_CreateProductReducer,
  ],
  [createProductAction.setHeadphoneImpedance, setHeadphoneImpedance_CreateProductReducer],
  [createProductAction.setHeadphoneColor, setHeadphoneColor_CreateProductReducer],
  [createProductAction.setHeadphoneInterface, setHeadphoneInterface_CreateProductReducer],
  [
    createProductAction.setHeadphoneFieldsAdditionalMap,
    setHeadphoneFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setKeyboardSwitch, setKeyboardSwitch_CreateProductReducer],
  [createProductAction.setKeyboardLayout, setKeyboardLayout_CreateProductReducer],
  [createProductAction.setKeyboardBacklight, setKeyboardBacklight_CreateProductReducer],
  [createProductAction.setKeyboardInterface, setKeyboardInterface_CreateProductReducer],
  [
    createProductAction.setKeyboardFieldsAdditionalMap,
    setKeyboardFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setMicrophoneType, setMicrophoneType_CreateProductReducer],
  [
    createProductAction.setMicrophonePolarPattern,
    setMicrophonePolarPattern_CreateProductReducer,
  ],
  [
    createProductAction.setMicrophoneInterface,
    setMicrophoneInterface_CreateProductReducer,
  ],
  [createProductAction.setMicrophoneColor, setMicrophoneColor_CreateProductReducer],
  [
    createProductAction.setMicrophoneFrequencyResponse,
    setMicrophoneFrequencyResponse_CreateProductReducer,
  ],
  [
    createProductAction.setMicrophoneFieldsAdditionalMap,
    setMicrophoneFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setMotherboardSocket, setMotherboardSocket_CreateProductReducer],
  [createProductAction.setMotherboardChipset, setMotherboardChipset_CreateProductReducer],
  [
    createProductAction.setMotherboardFormFactor,
    setMotherboardFormFactor_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryMaxCapacity,
    setMotherboardMemoryMaxCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryMaxCapacityUnit,
    setMotherboardMemoryMaxCapacityUnit_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardMemorySlots,
    setMotherboardMemorySlots_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryType,
    setMotherboardMemoryType_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardSataPorts,
    setMotherboardSataPorts_CreateProductReducer,
  ],
  [createProductAction.setMotherboardM2Slots, setMotherboardM2Slots_CreateProductReducer],
  [
    createProductAction.setMotherboardPcie3Slots,
    setMotherboardPcie3Slots_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardPcie4Slots,
    setMotherboardPcie4Slots_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardPcie5Slots,
    setMotherboardPcie5Slots_CreateProductReducer,
  ],
  [
    createProductAction.setMotherboardFieldsAdditionalMap,
    setMotherboardFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setMouseSensor, setMouseSensor_CreateProductReducer],
  [createProductAction.setMouseDpi, setMouseDpi_CreateProductReducer],
  [createProductAction.setMouseButtons, setMouseButtons_CreateProductReducer],
  [createProductAction.setMouseColor, setMouseColor_CreateProductReducer],
  [createProductAction.setMouseInterface, setMouseInterface_CreateProductReducer],
  [
    createProductAction.setMouseFieldsAdditionalMap,
    setMouseFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setPsuWattage, setPsuWattage_CreateProductReducer],
  [createProductAction.setPsuEfficiency, setPsuEfficiency_CreateProductReducer],
  [createProductAction.setPsuFormFactor, setPsuFormFactor_CreateProductReducer],
  [createProductAction.setPsuModularity, setPsuModularity_CreateProductReducer],
  [
    createProductAction.setPsuFieldsAdditionalMap,
    setPsuFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setRamDataRate, setRamDataRate_CreateProductReducer],
  [createProductAction.setRamModulesQuantity, setRamModulesQuantity_CreateProductReducer],
  [createProductAction.setRamModulesCapacity, setRamModulesCapacity_CreateProductReducer],
  [
    createProductAction.setRamModulesCapacityUnit,
    setRamModulesCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setRamType, setRamType_CreateProductReducer],
  [createProductAction.setRamColor, setRamColor_CreateProductReducer],
  [createProductAction.setRamVoltage, setRamVoltage_CreateProductReducer],
  [createProductAction.setRamTiming, setRamTiming_CreateProductReducer],
  [
    createProductAction.setRamFieldsAdditionalMap,
    setRamFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setSmartphoneOs, setSmartphoneOs_CreateProductReducer],
  [createProductAction.setSmartphoneChipset, setSmartphoneChipset_CreateProductReducer],
  [createProductAction.setSmartphoneDisplay, setSmartphoneDisplay_CreateProductReducer],
  [
    createProductAction.setSmartphoneResolutionHorizontal,
    setSmartphoneResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setSmartphoneResolutionVertical,
    setSmartphoneResolutionVertical_CreateProductReducer,
  ],
  [
    createProductAction.setSmartphoneRamCapacity,
    setSmartphoneRamCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setSmartphoneRamCapacityUnit,
    setSmartphoneRamCapacityUnit_CreateProductReducer,
  ],
  [
    createProductAction.setSmartphoneStorageCapacity,
    setSmartphoneStorageCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setSmartphoneBatteryCapacity,
    setSmartphoneBatteryCapacity_CreateProductReducer,
  ],
  [createProductAction.setSmartphoneCamera, setSmartphoneCamera_CreateProductReducer],
  [createProductAction.setSmartphoneColor, setSmartphoneColor_CreateProductReducer],
  [
    createProductAction.setSmartphoneFieldsAdditionalMap,
    setSmartphoneFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setSpeakerType, setSpeakerType_CreateProductReducer],
  [
    createProductAction.setSpeakerTotalWattage,
    setSpeakerTotalWattage_CreateProductReducer,
  ],
  [
    createProductAction.setSpeakerFrequencyResponse,
    setSpeakerFrequencyResponse_CreateProductReducer,
  ],
  [createProductAction.setSpeakerColor, setSpeakerColor_CreateProductReducer],
  [createProductAction.setSpeakerInterface, setSpeakerInterface_CreateProductReducer],
  [
    createProductAction.setSpeakerFieldsAdditionalMap,
    setSpeakerFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setStorageType, setStorageType_CreateProductReducer],
  [createProductAction.setStorageCapacity, setStorageCapacity_CreateProductReducer],
  [
    createProductAction.setStorageCapacityUnit,
    setStorageCapacityUnit_CreateProductReducer,
  ],
  [
    createProductAction.setStorageCacheCapacity,
    setStorageCacheCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setStorageCacheCapacityUnit,
    setStorageCacheCapacityUnit_CreateProductReducer,
  ],
  [createProductAction.setStorageFormFactor, setStorageFormFactor_CreateProductReducer],
  [createProductAction.setStorageInterface, setStorageInterface_CreateProductReducer],
  [
    createProductAction.setStorageFieldsAdditionalMap,
    setStorageFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setTabletOs, setTabletOs_CreateProductReducer],
  [createProductAction.setTabletChipset, setTabletChipset_CreateProductReducer],
  [createProductAction.setTabletDisplay, setTabletDisplay_CreateProductReducer],
  [
    createProductAction.setTabletResolutionHorizontal,
    setTabletResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setTabletResolutionVertical,
    setTabletResolutionVertical_CreateProductReducer,
  ],
  [createProductAction.setTabletRamCapacity, setTabletRamCapacity_CreateProductReducer],
  [
    createProductAction.setTabletRamCapacityUnit,
    setTabletRamCapacityUnit_CreateProductReducer,
  ],
  [
    createProductAction.setTabletStorageCapacity,
    setTabletStorageCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setTabletBatteryCapacity,
    setTabletBatteryCapacity_CreateProductReducer,
  ],
  [createProductAction.setTabletCamera, setTabletCamera_CreateProductReducer],
  [createProductAction.setTabletColor, setTabletColor_CreateProductReducer],
  [
    createProductAction.setTabletFieldsAdditionalMap,
    setTabletFieldsAdditionalMap_CreateProductReducer,
  ],

  [createProductAction.setWebcamResolution, setWebcamResolution_CreateProductReducer],
  [createProductAction.setWebcamInterface, setWebcamInterface_CreateProductReducer],
  [createProductAction.setWebcamMicrophone, setWebcamMicrophone_CreateProductReducer],
  [createProductAction.setWebcamFrameRate, setWebcamFrameRate_CreateProductReducer],
  [createProductAction.setWebcamColor, setWebcamColor_CreateProductReducer],
  [
    createProductAction.setWebcamFieldsAdditionalMap,
    setWebcamFieldsAdditionalMap_CreateProductReducer,
  ],

  // page 3
  [createProductAction.setImgFormDataArray, setImgFormDataArray_CreateProductReducer],

  [createProductAction.setTriggerFormSubmit, setTriggerFormSubmit_CreateProductReducer],
  [createProductAction.setPageInError, setPageInError_CreateProductReducer],
  [createProductAction.setIsSubmitting, setIsSubmitting_CreateProductReducer],
  [createProductAction.setIsSuccessful, setIsSuccessful_CreateProductReducer],
]);

function setBrand_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    brand: dispatch.payload as string,
  };
}

function setModel_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    model: dispatch.payload as string,
  };
}

function setDescription_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    description: dispatch.payload as string,
  };
}

function setPrice_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    price: dispatch.payload as string,
  };
}

function setCurrency_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currency: dispatch.payload as Currency,
  };
}

function setAvailability_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    availability: dispatch.payload as ProductAvailability,
  };
}

function setQuantity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    quantity: dispatch.payload as string,
  };
}

function setWeight_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weight: dispatch.payload as string,
  };
}

function setWeightUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weightUnit: dispatch.payload as WeightUnit,
  };
}

function setDimensionHeight_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeight: dispatch.payload as string,
  };
}

function setDimensionHeightUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeightUnit: dispatch.payload as DimensionUnit,
  };
}

function setDimensionWidth_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidth: dispatch.payload as string,
  };
}

function setDimensionWidthUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidthUnit: dispatch.payload as DimensionUnit,
  };
}

function setDimensionLength_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLength: dispatch.payload as string,
  };
}

function setDimensionLengthUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLengthUnit: dispatch.payload as DimensionUnit,
  };
}

function setAdditionalComments_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    additionalComments: dispatch.payload as string,
  };
}

function setProductCategory_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    productCategory: dispatch.payload as ProductCategory,
  };
}

function setAccessoryType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryType: dispatch.payload as string,
  };
}

function setAccessoryColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryColor: dispatch.payload as string,
  };
}

function setAccessoryInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryInterface: dispatch.payload as PeripheralsInterface,
  };
}

function setAccessoryFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = accessoryFieldsAdditionalMapClone.size;
      accessoryFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        accessoryFieldsAdditionalMap: accessoryFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      accessoryFieldsAdditionalMapClone.delete(index);

      const filteredAccessoryFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(accessoryFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredAccessoryFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        accessoryFieldsAdditionalMap: filteredAccessoryFieldsAdditionalMap,
      };
    }
    case "update": {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = accessoryFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setCpuSocket_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuSocket: dispatch.payload as string,
  };
}

function setCpuFrequency_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuFrequency: dispatch.payload as string,
  };
}

function setCpuCores_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuCores: dispatch.payload as string,
  };
}

function setCpuL1CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL1CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuL2CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL2CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuL3CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL3CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuWattage_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuWattage: dispatch.payload as string,
  };
}

function setCpuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const cpuFieldsAdditionalMapClone = structuredClone(state.cpuFieldsAdditionalMap);

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = cpuFieldsAdditionalMapClone.size;
      cpuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        cpuFieldsAdditionalMap: cpuFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const cpuFieldsAdditionalMapClone = structuredClone(state.cpuFieldsAdditionalMap);

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      cpuFieldsAdditionalMapClone.delete(index);

      const filteredCpuFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(cpuFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredCpuFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        cpuFieldsAdditionalMap: filteredCpuFieldsAdditionalMap,
      };
    }
    case "update": {
      const cpuFieldsAdditionalMapClone = structuredClone(state.cpuFieldsAdditionalMap);

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = cpuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setCaseType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseType: dispatch.payload as CaseType,
  };
}

function setCaseColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseColor: dispatch.payload as string,
  };
}

function setCaseSidePanel_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseSidePanel: dispatch.payload as CaseSidePanel,
  };
}

function setCaseFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const caseFieldsAdditionalMapClone = structuredClone(state.caseFieldsAdditionalMap);

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = caseFieldsAdditionalMapClone.size;
      caseFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        caseFieldsAdditionalMap: caseFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const caseFieldsAdditionalMapClone = structuredClone(state.caseFieldsAdditionalMap);

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      caseFieldsAdditionalMapClone.delete(index);

      const filteredCaseFieldsAdditionalMap = new Map<number, [string, string]>();
      Array.from(caseFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

        filteredCaseFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        caseFieldsAdditionalMap: filteredCaseFieldsAdditionalMap,
      };
    }
    case "update": {
      const caseFieldsAdditionalMapClone = structuredClone(state.caseFieldsAdditionalMap);

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = caseFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setDisplaySize_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displaySize: dispatch.payload as string,
  };
}

function setDisplayResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionHorizontal: dispatch.payload as string,
  };
}

function setDisplayResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionVertical: dispatch.payload as string,
  };
}

function setDisplayRefreshRate_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayRefreshRate: dispatch.payload as string,
  };
}

function setDisplayPanelType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayPanelType: dispatch.payload as DisplayPanelType,
  };
}

function setDisplayResponseTime_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResponseTime: dispatch.payload as string,
  };
}

function setDisplayAspectRatio_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayAspectRatio: dispatch.payload as string,
  };
}

function setDisplayFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = displayFieldsAdditionalMapClone.size;
      displayFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        displayFieldsAdditionalMap: displayFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      displayFieldsAdditionalMapClone.delete(index);

      const filteredDisplayFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(displayFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredDisplayFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        displayFieldsAdditionalMap: filteredDisplayFieldsAdditionalMap,
      };
    }
    case "update": {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = displayFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setGpuChipset_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuChipset: dispatch.payload as string,
  };
}

function setGpuMemoryCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacity: dispatch.payload as string,
  };
}

function setGpuMemoryCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setGpuCoreClock_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuCoreClock: dispatch.payload as string,
  };
}

function setGpuBoostClock_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuBoostClock: dispatch.payload as string,
  };
}

function setGpuTdp_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuTdp: dispatch.payload as string,
  };
}

function setGpuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const gpuFieldsAdditionalMapClone = structuredClone(state.gpuFieldsAdditionalMap);

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = gpuFieldsAdditionalMapClone.size;
      gpuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        gpuFieldsAdditionalMap: gpuFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const gpuFieldsAdditionalMapClone = structuredClone(state.gpuFieldsAdditionalMap);

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      gpuFieldsAdditionalMapClone.delete(index);

      const filteredGpuFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(gpuFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredGpuFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        gpuFieldsAdditionalMap: filteredGpuFieldsAdditionalMap,
      };
    }
    case "update": {
      const gpuFieldsAdditionalMapClone = structuredClone(state.gpuFieldsAdditionalMap);

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = gpuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setHeadphoneType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneType: dispatch.payload as HeadphoneType,
  };
}

function setHeadphoneDriver_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneDriver: dispatch.payload as string,
  };
}

function setHeadphoneFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneFrequencyResponse: dispatch.payload as string,
  };
}

function setHeadphoneImpedance_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneImpedance: dispatch.payload as string,
  };
}

function setHeadphoneColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneColor: dispatch.payload as string,
  };
}

function setHeadphoneInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneInterface: dispatch.payload as HeadphoneInterface,
  };
}

function setHeadphoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = headphoneFieldsAdditionalMapClone.size;
      headphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        headphoneFieldsAdditionalMap: headphoneFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      headphoneFieldsAdditionalMapClone.delete(index);

      const filteredHeadphoneFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(headphoneFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredHeadphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        headphoneFieldsAdditionalMap: filteredHeadphoneFieldsAdditionalMap,
      };
    }
    case "update": {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = headphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setKeyboardSwitch_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardSwitch: dispatch.payload as KeyboardSwitch,
  };
}

function setKeyboardLayout_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardLayout: dispatch.payload as KeyboardLayout,
  };
}

function setKeyboardBacklight_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardBacklight: dispatch.payload as KeyboardBacklight,
  };
}

function setKeyboardInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardInterface: dispatch.payload as PeripheralsInterface,
  };
}

function setKeyboardFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = keyboardFieldsAdditionalMapClone.size;
      keyboardFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        keyboardFieldsAdditionalMap: keyboardFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      keyboardFieldsAdditionalMapClone.delete(index);

      const filteredKeyboardFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(keyboardFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredKeyboardFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        keyboardFieldsAdditionalMap: filteredKeyboardFieldsAdditionalMap,
      };
    }
    case "update": {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = keyboardFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setRamDataRate_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramDataRate: dispatch.payload as string,
  };
}

function setRamModulesQuantity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesQuantity: dispatch.payload as string,
  };
}

function setRamModulesCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacity: dispatch.payload as string,
  };
}

function setRamModulesCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setRamType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramType: dispatch.payload as MemoryType,
  };
}

function setRamColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramColor: dispatch.payload as string,
  };
}

function setRamVoltage_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramVoltage: dispatch.payload as string,
  };
}

function setRamTiming_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramTiming: dispatch.payload as string,
  };
}

function setRamFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case "add": {
      const ramFieldsAdditionalMapClone = structuredClone(state.ramFieldsAdditionalMap);

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = ramFieldsAdditionalMapClone.size;
      ramFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        ramFieldsAdditionalMap: ramFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const ramFieldsAdditionalMapClone = structuredClone(state.ramFieldsAdditionalMap);

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      ramFieldsAdditionalMapClone.delete(index);

      const filteredRamFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(ramFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredRamFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        ramFieldsAdditionalMap: filteredRamFieldsAdditionalMap,
      };
    }
    case "update": {
      const ramFieldsAdditionalMapClone = structuredClone(state.ramFieldsAdditionalMap);

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = ramFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setMicrophoneType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneType: dispatch.payload as MicrophoneType,
  };
}

function setMicrophonePolarPattern_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphonePolarPattern: dispatch.payload as MicrophonePolarPattern,
  };
}

function setMicrophoneFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneFrequencyResponse: dispatch.payload as string,
  };
}

function setMicrophoneInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneInterface: dispatch.payload as MicrophoneInterface,
  };
}

function setMicrophoneColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneColor: dispatch.payload as string,
  };
}

function setMicrophoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = microphoneFieldsAdditionalMapClone.size;
      microphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        microphoneFieldsAdditionalMap: microphoneFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      microphoneFieldsAdditionalMapClone.delete(index);

      const filteredMicrophoneFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(microphoneFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredMicrophoneFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        microphoneFieldsAdditionalMap: filteredMicrophoneFieldsAdditionalMap,
      };
    }
    case "update": {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = microphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setMotherboardSocket_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSocket: dispatch.payload as string,
  };
}

function setMotherboardChipset_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardChipset: dispatch.payload as string,
  };
}

function setMotherboardFormFactor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardFormFactor: dispatch.payload as MotherboardFormFactor,
  };
}

function setMotherboardMemoryMaxCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacity: dispatch.payload as string,
  };
}

function setMotherboardMemoryMaxCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setMotherboardMemorySlots_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemorySlots: dispatch.payload as string,
  };
}

function setMotherboardMemoryType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryType: dispatch.payload as MemoryType,
  };
}

function setMotherboardSataPorts_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSataPorts: dispatch.payload as string,
  };
}

function setMotherboardM2Slots_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardM2Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie3Slots_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie3Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie4Slots_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie4Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie5Slots_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie5Slots: dispatch.payload as string,
  };
}

function setMotherboardFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = motherboardFieldsAdditionalMapClone.size;
      motherboardFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        motherboardFieldsAdditionalMap: motherboardFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      motherboardFieldsAdditionalMapClone.delete(index);

      const filteredMotherboardFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(motherboardFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMotherboardFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        motherboardFieldsAdditionalMap: filteredMotherboardFieldsAdditionalMap,
      };
    }
    case "update": {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = motherboardFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setMouseSensor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseSensor: dispatch.payload as MouseSensor,
  };
}

function setMouseDpi_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseDpi: dispatch.payload as string,
  };
}

function setMouseButtons_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseButtons: dispatch.payload as string,
  };
}

function setMouseColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseColor: dispatch.payload as string,
  };
}

function setMouseInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseInterface: dispatch.payload as PeripheralsInterface,
  };
}

function setMouseFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = mouseFieldsAdditionalMapClone.size;
      mouseFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        mouseFieldsAdditionalMap: mouseFieldsAdditionalMapClone,
      };
    }

    case "remove": {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      mouseFieldsAdditionalMapClone.delete(index);

      const filteredMouseFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(mouseFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredMouseFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        mouseFieldsAdditionalMap: filteredMouseFieldsAdditionalMap,
      };
    }
    case "update": {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = mouseFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setPsuWattage_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuWattage: dispatch.payload as string,
  };
}

function setPsuEfficiency_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuEfficiency: dispatch.payload as PsuEfficiency,
  };
}

function setPsuFormFactor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuFormFactor: dispatch.payload as PsuFormFactor,
  };
}

function setPsuModularity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuModularity: dispatch.payload as PsuModularity,
  };
}

function setPsuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const psuFieldsAdditionalMapClone = structuredClone(state.psuFieldsAdditionalMap);

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = psuFieldsAdditionalMapClone.size;
      psuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        psuFieldsAdditionalMap: psuFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const psuFieldsAdditionalMapClone = structuredClone(state.psuFieldsAdditionalMap);

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      psuFieldsAdditionalMapClone.delete(index);

      const filteredPsuFieldsAdditionalMap = new Map<number, [string, string]>();
      Array.from(psuFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

        filteredPsuFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        psuFieldsAdditionalMap: filteredPsuFieldsAdditionalMap,
      };
    }
    case "update": {
      const psuFieldsAdditionalMapClone = structuredClone(state.psuFieldsAdditionalMap);

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = psuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setSmartphoneOs_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneOs: dispatch.payload as MobileOs,
  };
}

function setSmartphoneChipset_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneChipset: dispatch.payload as string,
  };
}

function setSmartphoneDisplay_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneDisplay: dispatch.payload as string,
  };
}

function setSmartphoneResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneResolutionHorizontal: dispatch.payload as string,
  };
}

function setSmartphoneResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneResolutionVertical: dispatch.payload as string,
  };
}

function setSmartphoneRamCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneRamCapacity: dispatch.payload as string,
  };
}

function setSmartphoneRamCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneRamCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setSmartphoneStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneStorageCapacity: dispatch.payload as string,
  };
}

function setSmartphoneBatteryCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneBatteryCapacity: dispatch.payload as string,
  };
}

function setSmartphoneCamera_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneCamera: dispatch.payload as string,
  };
}

function setSmartphoneColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneColor: dispatch.payload as string,
  };
}

function setSmartphoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = smartphoneFieldsAdditionalMapClone.size;
      smartphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        smartphoneFieldsAdditionalMap: smartphoneFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      smartphoneFieldsAdditionalMapClone.delete(index);

      const filteredSmartphoneFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(smartphoneFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredSmartphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        smartphoneFieldsAdditionalMap: filteredSmartphoneFieldsAdditionalMap,
      };
    }
    case "update": {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = smartphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setSpeakerType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerType: dispatch.payload as SpeakerType,
  };
}

function setSpeakerTotalWattage_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerTotalWattage: dispatch.payload as string,
  };
}

function setSpeakerFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerFrequencyResponse: dispatch.payload as string,
  };
}

function setSpeakerColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerColor: dispatch.payload as string,
  };
}

function setSpeakerInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerInterface: dispatch.payload as SpeakerInterface,
  };
}

function setSpeakerFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = speakerFieldsAdditionalMapClone.size;
      speakerFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        speakerFieldsAdditionalMap: speakerFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      speakerFieldsAdditionalMapClone.delete(index);

      const filteredSpeakerFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(speakerFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredSpeakerFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        speakerFieldsAdditionalMap: filteredSpeakerFieldsAdditionalMap,
      };
    }
    case "update": {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = speakerFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setStorageType_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageType: dispatch.payload as StorageType,
  };
}

function setStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacity: dispatch.payload as string,
  };
}

function setStorageCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setStorageCacheCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacity: dispatch.payload as string,
  };
}

function setStorageCacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setStorageFormFactor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageFormFactor: dispatch.payload as StorageFormFactor,
  };
}

function setStorageInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageInterface: dispatch.payload as StorageInterface,
  };
}

function setStorageFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = storageFieldsAdditionalMapClone.size;
      storageFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        storageFieldsAdditionalMap: storageFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      storageFieldsAdditionalMapClone.delete(index);

      const filteredStorageFieldsAdditionalMap = new Map<number, [string, string]>();

      Array.from(storageFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredStorageFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        storageFieldsAdditionalMap: filteredStorageFieldsAdditionalMap,
      };
    }
    case "update": {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = storageFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setTabletOs_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletOs: dispatch.payload as MobileOs,
  };
}

function setTabletChipset_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletChipset: dispatch.payload as string,
  };
}

function setTabletDisplay_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletDisplay: dispatch.payload as string,
  };
}

function setTabletResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletResolutionHorizontal: dispatch.payload as string,
  };
}

function setTabletResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletResolutionVertical: dispatch.payload as string,
  };
}

function setTabletRamCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletRamCapacity: dispatch.payload as string,
  };
}

function setTabletRamCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletRamCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setTabletStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletStorageCapacity: dispatch.payload as string,
  };
}

function setTabletBatteryCapacity_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletBatteryCapacity: dispatch.payload as string,
  };
}

function setTabletCamera_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletCamera: dispatch.payload as string,
  };
}

function setTabletColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletColor: dispatch.payload as string,
  };
}

function setTabletFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = tabletFieldsAdditionalMapClone.size;
      tabletFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        tabletFieldsAdditionalMap: tabletFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      tabletFieldsAdditionalMapClone.delete(index);

      const filteredTabletFieldsAdditionalMap = new Map<number, [string, string]>();
      Array.from(tabletFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

        filteredTabletFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        tabletFieldsAdditionalMap: filteredTabletFieldsAdditionalMap,
      };
    }
    case "update": {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = tabletFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

function setWebcamResolution_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamResolution: dispatch.payload as WebcamResolution,
  };
}

function setWebcamInterface_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamInterface: dispatch.payload as WebcamInterface,
  };
}

function setWebcamMicrophone_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamMicrophone: dispatch.payload as WebcamMicrophone,
  };
}

function setWebcamFrameRate_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamFrameRate: dispatch.payload as WebcamFrameRate,
  };
}

function setWebcamColor_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamColor: dispatch.payload as string,
  };
}

function setWebcamFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation } = dispatch.payload as AdditionalFieldsPayload;

  switch (operation) {
    case "add": {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { data } = dispatch.payload as AdditionalFieldsAdd;
      const prevSize = webcamFieldsAdditionalMapClone.size;
      webcamFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        webcamFieldsAdditionalMap: webcamFieldsAdditionalMapClone,
      };
    }
    case "remove": {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { index } = dispatch.payload as AdditionalFieldsRemove;
      webcamFieldsAdditionalMapClone.delete(index);

      const filteredWebcamFieldsAdditionalMap = new Map<number, [string, string]>();
      Array.from(webcamFieldsAdditionalMapClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

        filteredWebcamFieldsAdditionalMap.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        webcamFieldsAdditionalMap: filteredWebcamFieldsAdditionalMap,
      };
    }
    case "update": {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { data, index, kind } = dispatch.payload as AdditionalFieldsUpdate;
      const prevKeyVal = webcamFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === "key"
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

// page 3
function setImgFormDataArray_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    imgFormDataArray: dispatch.payload as FormData[],
  };
}

function setTriggerFormSubmit_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function setPageInError_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function setIsSubmitting_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function setIsSuccessful_CreateProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

export {
  createProductReducer,
  createProductReducersMap,
  setAccessoryColor_CreateProductReducer,
  setAccessoryFieldsAdditionalMap_CreateProductReducer,
  setAccessoryInterface_CreateProductReducer,
  setAccessoryType_CreateProductReducer,
  setAdditionalComments_CreateProductReducer,
  setAvailability_CreateProductReducer,
  setBrand_CreateProductReducer,
  setCpuCores_CreateProductReducer,
  setCpuFieldsAdditionalMap_CreateProductReducer,
  setCpuFrequency_CreateProductReducer,
  setCpuL1CacheCapacity_CreateProductReducer,
  setCpuL1CacheCapacityUnit_CreateProductReducer,
  setCpuL2CacheCapacity_CreateProductReducer,
  setCpuL2CacheCapacityUnit_CreateProductReducer,
  setCpuL3CacheCapacity_CreateProductReducer,
  setCpuL3CacheCapacityUnit_CreateProductReducer,
  setCpuSocket_CreateProductReducer,
  setCpuWattage_CreateProductReducer,
  setCurrency_CreateProductReducer,
  setDescription_CreateProductReducer,
  setDimensionHeight_CreateProductReducer,
  setDimensionHeightUnit_CreateProductReducer,
  setDimensionLength_CreateProductReducer,
  setDimensionLengthUnit_CreateProductReducer,
  setDimensionWidth_CreateProductReducer,
  setDimensionWidthUnit_CreateProductReducer,
  setDisplayAspectRatio_CreateProductReducer,
  setDisplayFieldsAdditionalMap_CreateProductReducer,
  setDisplayPanelType_CreateProductReducer,
  setDisplayRefreshRate_CreateProductReducer,
  setDisplayResolutionHorizontal_CreateProductReducer,
  setDisplayResolutionVertical_CreateProductReducer,
  setDisplayResponseTime_CreateProductReducer,
  setDisplaySize_CreateProductReducer,
  setGpuBoostClock_CreateProductReducer,
  setGpuChipset_CreateProductReducer,
  setGpuCoreClock_CreateProductReducer,
  setGpuFieldsAdditionalMap_CreateProductReducer,
  setGpuMemoryCapacity_CreateProductReducer,
  setGpuMemoryCapacityUnit_CreateProductReducer,
  setGpuTdp_CreateProductReducer,
  setHeadphoneColor_CreateProductReducer,
  setHeadphoneDriver_CreateProductReducer,
  setHeadphoneFieldsAdditionalMap_CreateProductReducer,
  setHeadphoneFrequencyResponse_CreateProductReducer,
  setHeadphoneImpedance_CreateProductReducer,
  setHeadphoneInterface_CreateProductReducer,
  setHeadphoneType_CreateProductReducer,
  setImgFormDataArray_CreateProductReducer,
  setIsSubmitting_CreateProductReducer,
  setIsSuccessful_CreateProductReducer,
  setKeyboardBacklight_CreateProductReducer,
  setKeyboardFieldsAdditionalMap_CreateProductReducer,
  setKeyboardInterface_CreateProductReducer,
  setKeyboardLayout_CreateProductReducer,
  setKeyboardSwitch_CreateProductReducer,
  setMicrophoneColor_CreateProductReducer,
  setMicrophoneFieldsAdditionalMap_CreateProductReducer,
  setMicrophoneFrequencyResponse_CreateProductReducer,
  setMicrophoneInterface_CreateProductReducer,
  setMicrophonePolarPattern_CreateProductReducer,
  setMicrophoneType_CreateProductReducer,
  setModel_CreateProductReducer,
  setMotherboardChipset_CreateProductReducer,
  setMotherboardFieldsAdditionalMap_CreateProductReducer,
  setMotherboardFormFactor_CreateProductReducer,
  setMotherboardM2Slots_CreateProductReducer,
  setMotherboardMemoryMaxCapacity_CreateProductReducer,
  setMotherboardMemoryMaxCapacityUnit_CreateProductReducer,
  setMotherboardMemorySlots_CreateProductReducer,
  setMotherboardMemoryType_CreateProductReducer,
  setMotherboardPcie3Slots_CreateProductReducer,
  setMotherboardPcie4Slots_CreateProductReducer,
  setMotherboardPcie5Slots_CreateProductReducer,
  setMotherboardSataPorts_CreateProductReducer,
  setMotherboardSocket_CreateProductReducer,
  setMouseButtons_CreateProductReducer,
  setMouseColor_CreateProductReducer,
  setMouseDpi_CreateProductReducer,
  setMouseFieldsAdditionalMap_CreateProductReducer,
  setMouseInterface_CreateProductReducer,
  setMouseSensor_CreateProductReducer,
  setPrice_CreateProductReducer,
  setProductCategory_CreateProductReducer,
  setQuantity_CreateProductReducer,
  setRamColor_CreateProductReducer,
  setRamDataRate_CreateProductReducer,
  setRamFieldsAdditionalMap_CreateProductReducer,
  setRamModulesCapacity_CreateProductReducer,
  setRamModulesCapacityUnit_CreateProductReducer,
  setRamModulesQuantity_CreateProductReducer,
  setRamTiming_CreateProductReducer,
  setRamType_CreateProductReducer,
  setRamVoltage_CreateProductReducer,
  setSmartphoneBatteryCapacity_CreateProductReducer,
  setSmartphoneCamera_CreateProductReducer,
  setSmartphoneChipset_CreateProductReducer,
  setSmartphoneColor_CreateProductReducer,
  setSmartphoneDisplay_CreateProductReducer,
  setSmartphoneFieldsAdditionalMap_CreateProductReducer,
  setSmartphoneOs_CreateProductReducer,
  setSmartphoneRamCapacity_CreateProductReducer,
  setSmartphoneRamCapacityUnit_CreateProductReducer,
  setSmartphoneResolutionHorizontal_CreateProductReducer,
  setSmartphoneResolutionVertical_CreateProductReducer,
  setSmartphoneStorageCapacity_CreateProductReducer,
  setSpeakerColor_CreateProductReducer,
  setSpeakerFieldsAdditionalMap_CreateProductReducer,
  setSpeakerFrequencyResponse_CreateProductReducer,
  setSpeakerInterface_CreateProductReducer,
  setSpeakerTotalWattage_CreateProductReducer,
  setSpeakerType_CreateProductReducer,
  setPageInError_CreateProductReducer,
  setStorageCacheCapacity_CreateProductReducer,
  setStorageCacheCapacityUnit_CreateProductReducer,
  setStorageCapacity_CreateProductReducer,
  setStorageCapacityUnit_CreateProductReducer,
  setStorageFieldsAdditionalMap_CreateProductReducer,
  setStorageFormFactor_CreateProductReducer,
  setStorageInterface_CreateProductReducer,
  setStorageType_CreateProductReducer,
  setTabletBatteryCapacity_CreateProductReducer,
  setTabletCamera_CreateProductReducer,
  setTabletChipset_CreateProductReducer,
  setTabletColor_CreateProductReducer,
  setTabletDisplay_CreateProductReducer,
  setTabletFieldsAdditionalMap_CreateProductReducer,
  setTabletOs_CreateProductReducer,
  setTabletRamCapacity_CreateProductReducer,
  setTabletRamCapacityUnit_CreateProductReducer,
  setTabletResolutionHorizontal_CreateProductReducer,
  setTabletResolutionVertical_CreateProductReducer,
  setTabletStorageCapacity_CreateProductReducer,
  setTriggerFormSubmit_CreateProductReducer,
  setWeight_CreateProductReducer,
  setWeightUnit_CreateProductReducer,
};
