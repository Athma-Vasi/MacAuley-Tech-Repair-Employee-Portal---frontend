import { Currency, SetPageInErrorPayload, StepperChild } from "../../types";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import {
  AdditionalFieldsDelete,
  AdditionalFieldsFormDataPayload,
  AdditionalFieldsInsert,
  AdditionalFieldsPayload,
  AdditionalFieldsSlideDown,
  AdditionalFieldsSlideUp,
  AdditionalFieldsUpdate,
  CreateProductDispatch,
} from "./dispatch";
import { createProductAction } from "./state";
import {
  CaseSidePanel,
  CaseType,
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
  [createProductAction.setBrand, setBrand_createProductReducer],
  [createProductAction.setModel, setModel_createProductReducer],
  [createProductAction.setDescription, setDescription_createProductReducer],
  [createProductAction.setPrice, setPrice_createProductReducer],
  [createProductAction.setCurrency, setCurrency_createProductReducer],
  [createProductAction.setAvailability, setAvailability_createProductReducer],
  [createProductAction.setQuantity, setQuantity_createProductReducer],
  [createProductAction.setWeight, setWeight_createProductReducer],
  [createProductAction.setWeightUnit, setWeightUnit_createProductReducer],
  [createProductAction.setDimensionHeight, setDimensionHeight_createProductReducer],
  [
    createProductAction.setDimensionHeightUnit,
    setDimensionHeightUnit_createProductReducer,
  ],
  [createProductAction.setDimensionWidth, setDimensionWidth_createProductReducer],
  [createProductAction.setDimensionWidthUnit, setDimensionWidthUnit_createProductReducer],
  [createProductAction.setDimensionLength, setDimensionLength_createProductReducer],
  [
    createProductAction.setDimensionLengthUnit,
    setDimensionLengthUnit_createProductReducer,
  ],
  [createProductAction.setAdditionalComments, setAdditionalComments_createProductReducer],

  // page 2
  [createProductAction.setProductCategory, setProductCategory_createProductReducer],
  [createProductAction.addStepperChild, addStepperChild_createProductReducer],
  [
    createProductAction.modifyAdditionalFieldsMap,
    modifyAdditionalFieldsMap_createProductReducer,
  ],
  [
    createProductAction.setAdditionalFieldsFormDataMap,
    setAdditionalFieldsFormDataMap_createProductReducer,
  ],

  [createProductAction.setAccessoryType, setAccessoryType_createProductReducer],
  [createProductAction.setAccessoryColor, setAccessoryColor_createProductReducer],
  [createProductAction.setAccessoryInterface, setAccessoryInterface_createProductReducer],

  [createProductAction.setCpuSocket, setCpuSocket_createProductReducer],
  [createProductAction.setCpuFrequency, setCpuFrequency_createProductReducer],
  [createProductAction.setCpuCores, setCpuCores_createProductReducer],
  [createProductAction.setCpuL1CacheCapacity, setCpuL1CacheCapacity_createProductReducer],
  [
    createProductAction.setCpuL1CacheCapacityUnit,
    setCpuL1CacheCapacityUnit_createProductReducer,
  ],
  [createProductAction.setCpuL2CacheCapacity, setCpuL2CacheCapacity_createProductReducer],
  [
    createProductAction.setCpuL2CacheCapacityUnit,
    setCpuL2CacheCapacityUnit_createProductReducer,
  ],
  [createProductAction.setCpuL3CacheCapacity, setCpuL3CacheCapacity_createProductReducer],
  [
    createProductAction.setCpuL3CacheCapacityUnit,
    setCpuL3CacheCapacityUnit_createProductReducer,
  ],
  [createProductAction.setCpuWattage, setCpuWattage_createProductReducer],

  [createProductAction.setCaseType, setCaseType_createProductReducer],
  [createProductAction.setCaseColor, setCaseColor_createProductReducer],
  [createProductAction.setCaseSidePanel, setCaseSidePanel_createProductReducer],

  [createProductAction.setDisplaySize, setDisplaySize_createProductReducer],
  [
    createProductAction.setDisplayResolutionHorizontal,
    setDisplayResolutionHorizontal_createProductReducer,
  ],
  [
    createProductAction.setDisplayResolutionVertical,
    setDisplayResolutionVertical_createProductReducer,
  ],
  [createProductAction.setDisplayRefreshRate, setDisplayRefreshRate_createProductReducer],
  [createProductAction.setDisplayPanelType, setDisplayPanelType_createProductReducer],
  [
    createProductAction.setDisplayResponseTime,
    setDisplayResponseTime_createProductReducer,
  ],
  [createProductAction.setDisplayAspectRatio, setDisplayAspectRatio_createProductReducer],

  [createProductAction.setGpuChipset, setGpuChipset_createProductReducer],
  [createProductAction.setGpuMemoryCapacity, setGpuMemoryCapacity_createProductReducer],
  [
    createProductAction.setGpuMemoryCapacityUnit,
    setGpuMemoryCapacityUnit_createProductReducer,
  ],
  [createProductAction.setGpuCoreClock, setGpuCoreClock_createProductReducer],
  [createProductAction.setGpuBoostClock, setGpuBoostClock_createProductReducer],
  [createProductAction.setGpuTdp, setGpuTdp_createProductReducer],

  [createProductAction.setHeadphoneType, setHeadphoneType_createProductReducer],
  [createProductAction.setHeadphoneDriver, setHeadphoneDriver_createProductReducer],
  [
    createProductAction.setHeadphoneFrequencyResponse,
    setHeadphoneFrequencyResponse_createProductReducer,
  ],
  [createProductAction.setHeadphoneImpedance, setHeadphoneImpedance_createProductReducer],
  [createProductAction.setHeadphoneColor, setHeadphoneColor_createProductReducer],
  [createProductAction.setHeadphoneInterface, setHeadphoneInterface_createProductReducer],

  [createProductAction.setKeyboardSwitch, setKeyboardSwitch_createProductReducer],
  [createProductAction.setKeyboardLayout, setKeyboardLayout_createProductReducer],
  [createProductAction.setKeyboardBacklight, setKeyboardBacklight_createProductReducer],
  [createProductAction.setKeyboardInterface, setKeyboardInterface_createProductReducer],

  [createProductAction.setMicrophoneType, setMicrophoneType_createProductReducer],
  [
    createProductAction.setMicrophonePolarPattern,
    setMicrophonePolarPattern_createProductReducer,
  ],
  [
    createProductAction.setMicrophoneInterface,
    setMicrophoneInterface_createProductReducer,
  ],
  [createProductAction.setMicrophoneColor, setMicrophoneColor_createProductReducer],
  [
    createProductAction.setMicrophoneFrequencyResponse,
    setMicrophoneFrequencyResponse_createProductReducer,
  ],

  [createProductAction.setMotherboardSocket, setMotherboardSocket_createProductReducer],
  [createProductAction.setMotherboardChipset, setMotherboardChipset_createProductReducer],
  [
    createProductAction.setMotherboardFormFactor,
    setMotherboardFormFactor_createProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryMaxCapacity,
    setMotherboardMemoryMaxCapacity_createProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryMaxCapacityUnit,
    setMotherboardMemoryMaxCapacityUnit_createProductReducer,
  ],
  [
    createProductAction.setMotherboardMemorySlots,
    setMotherboardMemorySlots_createProductReducer,
  ],
  [
    createProductAction.setMotherboardMemoryType,
    setMotherboardMemoryType_createProductReducer,
  ],
  [
    createProductAction.setMotherboardSataPorts,
    setMotherboardSataPorts_createProductReducer,
  ],
  [createProductAction.setMotherboardM2Slots, setMotherboardM2Slots_createProductReducer],
  [
    createProductAction.setMotherboardPcie3Slots,
    setMotherboardPcie3Slots_createProductReducer,
  ],
  [
    createProductAction.setMotherboardPcie4Slots,
    setMotherboardPcie4Slots_createProductReducer,
  ],
  [
    createProductAction.setMotherboardPcie5Slots,
    setMotherboardPcie5Slots_createProductReducer,
  ],

  [createProductAction.setMouseSensor, setMouseSensor_createProductReducer],
  [createProductAction.setMouseDpi, setMouseDpi_createProductReducer],
  [createProductAction.setMouseButtons, setMouseButtons_createProductReducer],
  [createProductAction.setMouseColor, setMouseColor_createProductReducer],
  [createProductAction.setMouseInterface, setMouseInterface_createProductReducer],

  [createProductAction.setPsuWattage, setPsuWattage_createProductReducer],
  [createProductAction.setPsuEfficiency, setPsuEfficiency_createProductReducer],
  [createProductAction.setPsuFormFactor, setPsuFormFactor_createProductReducer],
  [createProductAction.setPsuModularity, setPsuModularity_createProductReducer],

  [createProductAction.setRamDataRate, setRamDataRate_createProductReducer],
  [createProductAction.setRamModulesQuantity, setRamModulesQuantity_createProductReducer],
  [createProductAction.setRamModulesCapacity, setRamModulesCapacity_createProductReducer],
  [
    createProductAction.setRamModulesCapacityUnit,
    setRamModulesCapacityUnit_createProductReducer,
  ],
  [createProductAction.setRamType, setRamType_createProductReducer],
  [createProductAction.setRamColor, setRamColor_createProductReducer],
  [createProductAction.setRamVoltage, setRamVoltage_createProductReducer],
  [createProductAction.setRamTiming, setRamTiming_createProductReducer],

  [createProductAction.setSpeakerType, setSpeakerType_createProductReducer],
  [
    createProductAction.setSpeakerTotalWattage,
    setSpeakerTotalWattage_createProductReducer,
  ],
  [
    createProductAction.setSpeakerFrequencyResponse,
    setSpeakerFrequencyResponse_createProductReducer,
  ],
  [createProductAction.setSpeakerColor, setSpeakerColor_createProductReducer],
  [createProductAction.setSpeakerInterface, setSpeakerInterface_createProductReducer],

  [createProductAction.setStorageType, setStorageType_createProductReducer],
  [createProductAction.setStorageCapacity, setStorageCapacity_createProductReducer],
  [
    createProductAction.setStorageCapacityUnit,
    setStorageCapacityUnit_createProductReducer,
  ],
  [
    createProductAction.setStorageCacheCapacity,
    setStorageCacheCapacity_createProductReducer,
  ],
  [
    createProductAction.setStorageCacheCapacityUnit,
    setStorageCacheCapacityUnit_createProductReducer,
  ],
  [createProductAction.setStorageFormFactor, setStorageFormFactor_createProductReducer],
  [createProductAction.setStorageInterface, setStorageInterface_createProductReducer],

  [createProductAction.setWebcamResolution, setWebcamResolution_createProductReducer],
  [createProductAction.setWebcamInterface, setWebcamInterface_createProductReducer],
  [createProductAction.setWebcamMicrophone, setWebcamMicrophone_createProductReducer],
  [createProductAction.setWebcamFrameRate, setWebcamFrameRate_createProductReducer],
  [createProductAction.setWebcamColor, setWebcamColor_createProductReducer],

  [createProductAction.setTriggerFormSubmit, setTriggerFormSubmit_createProductReducer],
  [createProductAction.setPageInError, setPageInError_createProductReducer],
  [createProductAction.setIsSubmitting, setIsSubmitting_createProductReducer],
  [createProductAction.setIsSuccessful, setIsSuccessful_createProductReducer],
]);

function setBrand_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    brand: dispatch.payload as string,
  };
}

function setModel_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    model: dispatch.payload as string,
  };
}

function setDescription_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    description: dispatch.payload as string,
  };
}

function setPrice_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    price: dispatch.payload as string,
  };
}

function setCurrency_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currency: dispatch.payload as Currency,
  };
}

function setAvailability_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    availability: dispatch.payload as ProductAvailability,
  };
}

function setQuantity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    quantity: dispatch.payload as string,
  };
}

function setWeight_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weight: dispatch.payload as string,
  };
}

function setWeightUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weightUnit: dispatch.payload as WeightUnit,
  };
}

function setDimensionHeight_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeight: dispatch.payload as string,
  };
}

function setDimensionHeightUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeightUnit: dispatch.payload as DimensionUnit,
  };
}

function setDimensionWidth_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidth: dispatch.payload as string,
  };
}

function setDimensionWidthUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidthUnit: dispatch.payload as DimensionUnit,
  };
}

function setDimensionLength_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLength: dispatch.payload as string,
  };
}

function setDimensionLengthUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLengthUnit: dispatch.payload as DimensionUnit,
  };
}

function setAdditionalComments_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    additionalComments: dispatch.payload as string,
  };
}

function setProductCategory_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    productCategory: dispatch.payload as ProductCategory,
  };
}

function setAccessoryType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryType: dispatch.payload as string,
  };
}

function setAccessoryColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryColor: dispatch.payload as string,
  };
}

function setAccessoryInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryInterface: dispatch.payload as PeripheralsInterface,
  };
}

function modifyAdditionalFieldsMap_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { operation, productCategory } = dispatch.payload as AdditionalFieldsPayload;
  const clonedAdditionalFieldsMap = new Map(state.additionalFieldsMap);
  const additionalFields = structuredClone(
    clonedAdditionalFieldsMap.get(productCategory)
  );

  if (!additionalFields) {
    return state;
  }

  console.group("modifyAdditionalFieldsMap_createProductReducer");
  console.log("dispatch.payload", dispatch.payload);
  console.log("additionalFields", additionalFields);
  console.groupEnd();

  switch (operation) {
    case "add": {
      additionalFields.push(["", ""]);
      const additionalFieldsMap = clonedAdditionalFieldsMap.set(
        productCategory,
        additionalFields
      );

      return {
        ...state,
        additionalFieldsMap,
      };
    }

    case "delete": {
      const {
        dynamicIndexes: [inputIndex],
      } = dispatch.payload as AdditionalFieldsDelete;

      return {
        ...state,
      };
    }

    case "insert": {
      const {
        dynamicIndexes: [inputIndex],
      } = dispatch.payload as AdditionalFieldsInsert;

      return {
        ...state,
      };
    }

    case "update": {
      const {
        dynamicIndexes: [inputIndex],
        kind,
        value,
      } = dispatch.payload as AdditionalFieldsUpdate;

      const tuple = additionalFields[inputIndex];
      kind === "fieldName" ? (tuple[0] = value) : (tuple[1] = value);

      const additionalFieldsMap = state.additionalFieldsMap.set(
        productCategory,
        additionalFields
      );

      return {
        ...state,
        additionalFieldsMap,
      };
    }

    case "slideDown": {
      const {
        dynamicIndexes: [inputIndex],
      } = dispatch.payload as AdditionalFieldsSlideDown;

      // if (inputIndex === clonedAdditionalFields.length - 1) {
      //   return state;
      // }

      // const newAdditionalFields = clonedAdditionalFields.map(
      //   (field: [string, string], index: number) => {
      //     if (index === inputIndex) {
      //       return clonedAdditionalFields[inputIndex + 1];
      //     } else if (index === inputIndex + 1) {
      //       return clonedAdditionalFields[inputIndex];
      //     } else {
      //       return field;
      //     }
      //   }
      // ) as Array<[string, string]>;

      // const additionalFieldsMap = state.additionalFieldsMap.set(
      //   productCategory,
      //   newAdditionalFields
      // );

      return {
        ...state,
        // additionalFieldsMap,
      };
    }

    case "slideUp": {
      const {
        dynamicIndexes: [inputIndex],
      } = dispatch.payload as AdditionalFieldsSlideUp;

      // if (inputIndex === 0) {
      //   return state;
      // }

      // const newAdditionalFields = clonedAdditionalFields.map(
      //   (field: [string, string], index: number) => {
      //     if (index === inputIndex) {
      //       return clonedAdditionalFields[inputIndex - 1];
      //     } else if (index === inputIndex - 1) {
      //       return clonedAdditionalFields[inputIndex];
      //     } else {
      //       return field;
      //     }
      //   }
      // ) as Array<[string, string]>;

      // const additionalFieldsMap = state.additionalFieldsMap.set(
      //   productCategory,
      //   newAdditionalFields
      // );

      return {
        ...state,
        // additionalFieldsMap,
      };
    }

    default:
      return state;
  }
}

function setAdditionalFieldsFormDataMap_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const { productCategory, value } = dispatch.payload as AdditionalFieldsFormDataPayload;

  return {
    ...state,
    additionalFieldsFormDataMap: state.additionalFieldsFormDataMap.set(
      productCategory,
      value
    ),
  };
}

function addStepperChild_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as {
    dynamicIndexes: number[];
    value: StepperChild;
  };

  const stepperPages = state.stepperPages;
  stepperPages[pageIndex].children.push(value);

  return {
    ...state,
    stepperPages,
  };
}

function setCpuSocket_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuSocket: dispatch.payload as string,
  };
}

function setCpuFrequency_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuFrequency: dispatch.payload as string,
  };
}

function setCpuCores_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuCores: dispatch.payload as string,
  };
}

function setCpuL1CacheCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL1CacheCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuL2CacheCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL2CacheCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuL3CacheCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacity: dispatch.payload as string,
  };
}

function setCpuL3CacheCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setCpuWattage_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuWattage: dispatch.payload as string,
  };
}

function setCaseType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseType: dispatch.payload as CaseType,
  };
}

function setCaseColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseColor: dispatch.payload as string,
  };
}

function setCaseSidePanel_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseSidePanel: dispatch.payload as CaseSidePanel,
  };
}

function setDisplaySize_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displaySize: dispatch.payload as string,
  };
}

function setDisplayResolutionHorizontal_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionHorizontal: dispatch.payload as string,
  };
}

function setDisplayResolutionVertical_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionVertical: dispatch.payload as string,
  };
}

function setDisplayRefreshRate_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayRefreshRate: dispatch.payload as string,
  };
}

function setDisplayPanelType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayPanelType: dispatch.payload as DisplayPanelType,
  };
}

function setDisplayResponseTime_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResponseTime: dispatch.payload as string,
  };
}

function setDisplayAspectRatio_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayAspectRatio: dispatch.payload as string,
  };
}

function setGpuChipset_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuChipset: dispatch.payload as string,
  };
}

function setGpuMemoryCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacity: dispatch.payload as string,
  };
}

function setGpuMemoryCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setGpuCoreClock_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuCoreClock: dispatch.payload as string,
  };
}

function setGpuBoostClock_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuBoostClock: dispatch.payload as string,
  };
}

function setGpuTdp_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuTdp: dispatch.payload as string,
  };
}

function setHeadphoneType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneType: dispatch.payload as HeadphoneType,
  };
}

function setHeadphoneDriver_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneDriver: dispatch.payload as string,
  };
}

function setHeadphoneFrequencyResponse_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneFrequencyResponse: dispatch.payload as string,
  };
}

function setHeadphoneImpedance_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneImpedance: dispatch.payload as string,
  };
}

function setHeadphoneColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneColor: dispatch.payload as string,
  };
}

function setHeadphoneInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneInterface: dispatch.payload as HeadphoneInterface,
  };
}

function setKeyboardSwitch_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardSwitch: dispatch.payload as KeyboardSwitch,
  };
}

function setKeyboardLayout_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardLayout: dispatch.payload as KeyboardLayout,
  };
}

function setKeyboardBacklight_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardBacklight: dispatch.payload as KeyboardBacklight,
  };
}

function setKeyboardInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardInterface: dispatch.payload as PeripheralsInterface,
  };
}

function setRamDataRate_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramDataRate: dispatch.payload as string,
  };
}

function setRamModulesQuantity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesQuantity: dispatch.payload as string,
  };
}

function setRamModulesCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacity: dispatch.payload as string,
  };
}

function setRamModulesCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setRamType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramType: dispatch.payload as MemoryType,
  };
}

function setRamColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramColor: dispatch.payload as string,
  };
}

function setRamVoltage_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramVoltage: dispatch.payload as string,
  };
}

function setRamTiming_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramTiming: dispatch.payload as string,
  };
}

function setMicrophoneType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneType: dispatch.payload as MicrophoneType,
  };
}

function setMicrophonePolarPattern_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphonePolarPattern: dispatch.payload as MicrophonePolarPattern,
  };
}

function setMicrophoneFrequencyResponse_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneFrequencyResponse: dispatch.payload as string,
  };
}

function setMicrophoneInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneInterface: dispatch.payload as MicrophoneInterface,
  };
}

function setMicrophoneColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneColor: dispatch.payload as string,
  };
}

function setMotherboardSocket_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSocket: dispatch.payload as string,
  };
}

function setMotherboardChipset_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardChipset: dispatch.payload as string,
  };
}

function setMotherboardFormFactor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardFormFactor: dispatch.payload as MotherboardFormFactor,
  };
}

function setMotherboardMemoryMaxCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacity: dispatch.payload as string,
  };
}

function setMotherboardMemoryMaxCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setMotherboardMemorySlots_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemorySlots: dispatch.payload as string,
  };
}

function setMotherboardMemoryType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryType: dispatch.payload as MemoryType,
  };
}

function setMotherboardSataPorts_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSataPorts: dispatch.payload as string,
  };
}

function setMotherboardM2Slots_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardM2Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie3Slots_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie3Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie4Slots_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie4Slots: dispatch.payload as string,
  };
}

function setMotherboardPcie5Slots_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie5Slots: dispatch.payload as string,
  };
}

function setMouseSensor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseSensor: dispatch.payload as MouseSensor,
  };
}

function setMouseDpi_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseDpi: dispatch.payload as string,
  };
}

function setMouseButtons_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseButtons: dispatch.payload as string,
  };
}

function setMouseColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseColor: dispatch.payload as string,
  };
}

function setMouseInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseInterface: dispatch.payload as PeripheralsInterface,
  };
}

function setPsuWattage_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuWattage: dispatch.payload as string,
  };
}

function setPsuEfficiency_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuEfficiency: dispatch.payload as PsuEfficiency,
  };
}

function setPsuFormFactor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuFormFactor: dispatch.payload as PsuFormFactor,
  };
}

function setPsuModularity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuModularity: dispatch.payload as PsuModularity,
  };
}

function setSpeakerType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerType: dispatch.payload as SpeakerType,
  };
}

function setSpeakerTotalWattage_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerTotalWattage: dispatch.payload as string,
  };
}

function setSpeakerFrequencyResponse_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerFrequencyResponse: dispatch.payload as string,
  };
}

function setSpeakerColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerColor: dispatch.payload as string,
  };
}

function setSpeakerInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerInterface: dispatch.payload as SpeakerInterface,
  };
}

function setStorageType_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageType: dispatch.payload as StorageType,
  };
}

function setStorageCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacity: dispatch.payload as string,
  };
}

function setStorageCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setStorageCacheCapacity_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacity: dispatch.payload as string,
  };
}

function setStorageCacheCapacityUnit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacityUnit: dispatch.payload as MemoryUnit,
  };
}

function setStorageFormFactor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageFormFactor: dispatch.payload as StorageFormFactor,
  };
}

function setStorageInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageInterface: dispatch.payload as StorageInterface,
  };
}

function setWebcamResolution_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamResolution: dispatch.payload as WebcamResolution,
  };
}

function setWebcamInterface_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamInterface: dispatch.payload as WebcamInterface,
  };
}

function setWebcamMicrophone_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamMicrophone: dispatch.payload as WebcamMicrophone,
  };
}

function setWebcamFrameRate_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamFrameRate: dispatch.payload as WebcamFrameRate,
  };
}

function setWebcamColor_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamColor: dispatch.payload as string,
  };
}

function setTriggerFormSubmit_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function setPageInError_createProductReducer(
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

function setIsSubmitting_createProductReducer(
  state: CreateProductState,
  dispatch: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function setIsSuccessful_createProductReducer(
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
  setAccessoryColor_createProductReducer,
  setAccessoryInterface_createProductReducer,
  setAccessoryType_createProductReducer,
  setAdditionalComments_createProductReducer,
  setAvailability_createProductReducer,
  setBrand_createProductReducer,
  setCpuCores_createProductReducer,
  setCpuFrequency_createProductReducer,
  setCpuL1CacheCapacity_createProductReducer,
  setCpuL1CacheCapacityUnit_createProductReducer,
  setCpuL2CacheCapacity_createProductReducer,
  setCpuL2CacheCapacityUnit_createProductReducer,
  setCpuL3CacheCapacity_createProductReducer,
  setCpuL3CacheCapacityUnit_createProductReducer,
  setCpuSocket_createProductReducer,
  setCpuWattage_createProductReducer,
  setCurrency_createProductReducer,
  setDescription_createProductReducer,
  setDimensionHeight_createProductReducer,
  setDimensionHeightUnit_createProductReducer,
  setDimensionLength_createProductReducer,
  setDimensionLengthUnit_createProductReducer,
  setDimensionWidth_createProductReducer,
  setDimensionWidthUnit_createProductReducer,
  setDisplayAspectRatio_createProductReducer,
  setDisplayPanelType_createProductReducer,
  setDisplayRefreshRate_createProductReducer,
  setDisplayResolutionHorizontal_createProductReducer,
  setDisplayResolutionVertical_createProductReducer,
  setDisplayResponseTime_createProductReducer,
  setDisplaySize_createProductReducer,
  setGpuBoostClock_createProductReducer,
  setGpuChipset_createProductReducer,
  setGpuCoreClock_createProductReducer,
  setGpuMemoryCapacity_createProductReducer,
  setGpuMemoryCapacityUnit_createProductReducer,
  setGpuTdp_createProductReducer,
  setHeadphoneColor_createProductReducer,
  setHeadphoneDriver_createProductReducer,
  setHeadphoneFrequencyResponse_createProductReducer,
  setHeadphoneImpedance_createProductReducer,
  setHeadphoneInterface_createProductReducer,
  setHeadphoneType_createProductReducer,
  setIsSubmitting_createProductReducer,
  setIsSuccessful_createProductReducer,
  setKeyboardBacklight_createProductReducer,
  setKeyboardInterface_createProductReducer,
  setKeyboardLayout_createProductReducer,
  setKeyboardSwitch_createProductReducer,
  setMicrophoneColor_createProductReducer,
  setMicrophoneFrequencyResponse_createProductReducer,
  setMicrophoneInterface_createProductReducer,
  setMicrophonePolarPattern_createProductReducer,
  setMicrophoneType_createProductReducer,
  setModel_createProductReducer,
  setMotherboardChipset_createProductReducer,
  setMotherboardFormFactor_createProductReducer,
  setMotherboardM2Slots_createProductReducer,
  setMotherboardMemoryMaxCapacity_createProductReducer,
  setMotherboardMemoryMaxCapacityUnit_createProductReducer,
  setMotherboardMemorySlots_createProductReducer,
  setMotherboardMemoryType_createProductReducer,
  setMotherboardPcie3Slots_createProductReducer,
  setMotherboardPcie4Slots_createProductReducer,
  setMotherboardPcie5Slots_createProductReducer,
  setMotherboardSataPorts_createProductReducer,
  setMotherboardSocket_createProductReducer,
  setMouseButtons_createProductReducer,
  setMouseColor_createProductReducer,
  setMouseDpi_createProductReducer,
  setMouseInterface_createProductReducer,
  setMouseSensor_createProductReducer,
  setPageInError_createProductReducer,
  setPrice_createProductReducer,
  setProductCategory_createProductReducer,
  setQuantity_createProductReducer,
  setRamColor_createProductReducer,
  setRamDataRate_createProductReducer,
  setRamModulesCapacity_createProductReducer,
  setRamModulesCapacityUnit_createProductReducer,
  setRamModulesQuantity_createProductReducer,
  setRamTiming_createProductReducer,
  setRamType_createProductReducer,
  setRamVoltage_createProductReducer,
  setSpeakerColor_createProductReducer,
  setSpeakerFrequencyResponse_createProductReducer,
  setSpeakerInterface_createProductReducer,
  setSpeakerTotalWattage_createProductReducer,
  setSpeakerType_createProductReducer,
  setStorageCacheCapacity_createProductReducer,
  setStorageCacheCapacityUnit_createProductReducer,
  setStorageCapacity_createProductReducer,
  setStorageCapacityUnit_createProductReducer,
  setStorageFormFactor_createProductReducer,
  setStorageInterface_createProductReducer,
  setStorageType_createProductReducer,
  setTriggerFormSubmit_createProductReducer,
  setWeight_createProductReducer,
  setWeightUnit_createProductReducer,
};
