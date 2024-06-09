import {
  Currency,
  SetPageInErrorPayload,
  SetStepsInErrorPayload,
  StepperChild,
} from "../../types";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import {
  CaseSidePanel,
  CaseType,
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

type AdditionalFieldsOperation =
  | "add"
  | "delete"
  | "insert"
  | "slideDown"
  | "slideUp"
  | "update";

type AdditionalFieldsAdd = {
  operation: AdditionalFieldsOperation;
  productCategory: ProductCategory;
};

type AdditionalFieldsDelete = {
  dynamicIndexes: number[];
  operation: AdditionalFieldsOperation;
  productCategory: ProductCategory;
};

type AdditionalFieldsInsert = AdditionalFieldsDelete;
type AdditionalFieldsSlideDown = AdditionalFieldsDelete;
type AdditionalFieldsSlideUp = AdditionalFieldsDelete;

type AdditionalFieldsUpdate = {
  dynamicIndexes: number[];
  kind: "fieldName" | "fieldValue";
  operation: AdditionalFieldsOperation;
  productCategory: ProductCategory;
  value: string;
};

type AdditionalFieldsPayload =
  | AdditionalFieldsAdd
  | AdditionalFieldsDelete
  | AdditionalFieldsInsert
  | AdditionalFieldsSlideDown
  | AdditionalFieldsSlideUp
  | AdditionalFieldsUpdate;

type AdditionalFieldsFormDataPayload = {
  productCategory: ProductCategory;
  value: FormData;
};

type CreateProductDispatch =
  | {
      action: CreateProductAction["addStepperChild"];
      payload: {
        dynamicIndexes: number[];
        value: StepperChild;
      };
    }
  | {
      action: CreateProductAction["modifyAdditionalFieldsMap"];
      payload: AdditionalFieldsPayload;
    }
  | {
      action: CreateProductAction["setAccessoryColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setAccessoryInterface"];
      payload: PeripheralsInterface;
    }
  | {
      action: CreateProductAction["setAccessoryType"];
      payload: string;
    }
  | {
      action: CreateProductAction["setAdditionalComments"];
      payload: string;
    }
  | {
      action: CreateProductAction["setAdditionalFieldsFormDataMap"];
      payload: AdditionalFieldsFormDataPayload;
    }
  | {
      action: CreateProductAction["setAvailability"];
      payload: ProductAvailability;
    }
  | {
      action: CreateProductAction["setBrand"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCaseColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCaseSidePanel"];
      payload: CaseSidePanel;
    }
  | {
      action: CreateProductAction["setCaseType"];
      payload: CaseType;
    }
  | {
      action: CreateProductAction["setCpuCores"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuFrequency"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuL1CacheCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuL1CacheCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setCpuL2CacheCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuL2CacheCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setCpuL3CacheCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuL3CacheCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setCpuSocket"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCpuWattage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setCurrency"];
      payload: Currency;
    }
  | {
      action: CreateProductAction["setDescription"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDimensionHeight"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDimensionHeightUnit"];
      payload: DimensionUnit;
    }
  | {
      action: CreateProductAction["setDimensionLength"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDimensionLengthUnit"];
      payload: DimensionUnit;
    }
  | {
      action: CreateProductAction["setDimensionWidth"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDimensionWidthUnit"];
      payload: DimensionUnit;
    }
  | {
      action: CreateProductAction["setDisplayAspectRatio"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplayPanelType"];
      payload: DisplayPanelType;
    }
  | {
      action: CreateProductAction["setDisplayRefreshRate"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplayResolutionHorizontal"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplayResolutionVertical"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplayResponseTime"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplaySize"];
      payload: string;
    }
  | {
      action: CreateProductAction["setGpuBoostClock"];
      payload: string;
    }
  | {
      action: CreateProductAction["setGpuChipset"];
      payload: string;
    }
  | {
      action: CreateProductAction["setGpuCoreClock"];
      payload: string;
    }
  | {
      action: CreateProductAction["setGpuMemoryCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setGpuMemoryCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setGpuTdp"];
      payload: string;
    }
  | {
      action: CreateProductAction["setHeadphoneColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setHeadphoneDriver"];
      payload: string;
    }
  | {
      action: CreateProductAction["setHeadphoneFrequencyResponse"];
      payload: string;
    }
  | {
      action: CreateProductAction["setHeadphoneImpedance"];
      payload: string;
    }
  | {
      action: CreateProductAction["setHeadphoneInterface"];
      payload: HeadphoneInterface;
    }
  | {
      action: CreateProductAction["setHeadphoneType"];
      payload: HeadphoneType;
    }
  | {
      action: CreateProductAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: CreateProductAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: CreateProductAction["setKeyboardBacklight"];
      payload: KeyboardBacklight;
    }
  | {
      action: CreateProductAction["setKeyboardInterface"];
      payload: PeripheralsInterface;
    }
  | {
      action: CreateProductAction["setKeyboardLayout"];
      payload: KeyboardLayout;
    }
  | {
      action: CreateProductAction["setKeyboardSwitch"];
      payload: KeyboardSwitch;
    }
  | {
      action: CreateProductAction["setMicrophoneColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMicrophoneFrequencyResponse"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMicrophoneInterface"];
      payload: MicrophoneInterface;
    }
  | {
      action: CreateProductAction["setMicrophonePolarPattern"];
      payload: MicrophonePolarPattern;
    }
  | {
      action: CreateProductAction["setMicrophoneType"];
      payload: MicrophoneType;
    }
  | {
      action: CreateProductAction["setModel"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardChipset"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardFormFactor"];
      payload: MotherboardFormFactor;
    }
  | {
      action: CreateProductAction["setMotherboardM2Slots"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardMemoryMaxCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardMemoryMaxCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setMotherboardMemorySlots"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardMemoryType"];
      payload: MemoryType;
    }
  | {
      action: CreateProductAction["setMotherboardPcie3Slots"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardPcie4Slots"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardPcie5Slots"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardSataPorts"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMotherboardSocket"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMouseButtons"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMouseColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMouseDpi"];
      payload: string;
    }
  | {
      action: CreateProductAction["setMouseInterface"];
      payload: PeripheralsInterface;
    }
  | {
      action: CreateProductAction["setMouseSensor"];
      payload: MouseSensor;
    }
  | {
      action: CreateProductAction["setPrice"];
      payload: string;
    }
  | {
      action: CreateProductAction["setPsuEfficiency"];
      payload: PsuEfficiency;
    }
  | {
      action: CreateProductAction["setPsuFormFactor"];
      payload: PsuFormFactor;
    }
  | {
      action: CreateProductAction["setPsuModularity"];
      payload: PsuModularity;
    }
  | {
      action: CreateProductAction["setPsuWattage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setQuantity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamDataRate"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamModulesCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamModulesCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setRamModulesQuantity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamTiming"];
      payload: string;
    }
  | {
      action: CreateProductAction["setRamType"];
      payload: MemoryType;
    }
  | {
      action: CreateProductAction["setRamVoltage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerFrequencyResponse"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerInterface"];
      payload: SpeakerInterface;
    }
  | {
      action: CreateProductAction["setSpeakerTotalWattage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerType"];
      payload: SpeakerType;
    }
  | {
      action: CreateProductAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: CreateProductAction["setStorageCacheCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setStorageCacheCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setStorageCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setStorageCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setStorageFormFactor"];
      payload: StorageFormFactor;
    }
  | {
      action: CreateProductAction["setStorageInterface"];
      payload: StorageInterface;
    }
  | {
      action: CreateProductAction["setStorageType"];
      payload: StorageType;
    }
  | {
      action: CreateProductAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: CreateProductAction["setWebcamColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setWebcamFrameRate"];
      payload: WebcamFrameRate;
    }
  | {
      action: CreateProductAction["setWebcamInterface"];
      payload: WebcamInterface;
    }
  | {
      action: CreateProductAction["setWebcamMicrophone"];
      payload: WebcamMicrophone;
    }
  | {
      action: CreateProductAction["setWebcamResolution"];
      payload: WebcamResolution;
    }
  | {
      action: CreateProductAction["setWeight"];
      payload: string;
    }
  | {
      action: CreateProductAction["setWeightUnit"];
      payload: WeightUnit;
    };

export type {
  AdditionalFieldsAdd,
  AdditionalFieldsDelete,
  AdditionalFieldsFormDataPayload,
  AdditionalFieldsInsert,
  AdditionalFieldsOperation,
  AdditionalFieldsPayload,
  AdditionalFieldsSlideDown,
  AdditionalFieldsSlideUp,
  AdditionalFieldsUpdate,
  CreateProductDispatch,
  SetStepsInErrorPayload,
};
