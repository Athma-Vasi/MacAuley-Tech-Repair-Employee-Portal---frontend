import { Currency, SetPageInErrorPayload, SetStepsInErrorPayload } from "../../types";
import { ProductCategory } from "../dashboard/types";
import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
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

type AdditionalFieldsAdd = {
  operation: "add";
  data: [string, string];
};
type AdditionalFieldsRemove = {
  operation: "remove";
  index: number;
};
type AdditionalFieldsUpdate = {
  operation: "update";
  kind: "key" | "value";
  index: number;
  data: string;
};
type AdditionalFieldsPayload =
  | AdditionalFieldsAdd
  | AdditionalFieldsRemove
  | AdditionalFieldsUpdate;

type AdditionalFieldsValidFocusedAdd = {
  operation: "add";
  data: [boolean, boolean];
};
type AdditionalFieldsValidFocusedRemove = {
  operation: "remove";
  index: number;
};
type AdditionalFieldsValidFocusedUpdate = {
  operation: "update";
  kind: "key" | "value";
  index: number;
  data: boolean;
};
type AdditionalFieldsValidFocusedPayload =
  | AdditionalFieldsValidFocusedAdd
  | AdditionalFieldsValidFocusedRemove
  | AdditionalFieldsValidFocusedUpdate;

/**
   * type CreateProductAction = {
  setAccessoryColor: "setAccessoryColor";
  setAccessoryFieldsAdditionalMap: "setAccessoryFieldsAdditionalMap";
  setAccessoryInterface: "setAccessoryInterface";
  setAccessoryType: "setAccessoryType";
  setAdditionalComments: "setAdditionalComments";
  setAvailability: "setAvailability";
  setBrand: "setBrand";
  setCaseColor: "setCaseColor";
  setCaseFieldsAdditionalMap: "setCaseFieldsAdditionalMap";
  setCaseSidePanel: "setCaseSidePanel";
  setCaseType: "setCaseType";
  setCpuCores: "setCpuCores";
  setCpuFieldsAdditionalMap: "setCpuFieldsAdditionalMap";
  setCpuFrequency: "setCpuFrequency";
  setCpuL1CacheCapacity: "setCpuL1CacheCapacity";
  setCpuL1CacheCapacityUnit: "setCpuL1CacheCapacityUnit";
  setCpuL2CacheCapacity: "setCpuL2CacheCapacity";
  setCpuL2CacheCapacityUnit: "setCpuL2CacheCapacityUnit";
  setCpuL3CacheCapacity: "setCpuL3CacheCapacity";
  setCpuL3CacheCapacityUnit: "setCpuL3CacheCapacityUnit";
  setCpuSocket: "setCpuSocket";
  setCpuWattage: "setCpuWattage";
  setCurrency: "setCurrency";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setCurrentlySelectedAdditionalFieldIndex: "setCurrentlySelectedAdditionalFieldIndex";
  setDescription: "setDescription";
  setDimensionHeight: "setDimensionHeight";
  setDimensionHeightUnit: "setDimensionHeightUnit";
  setDimensionLength: "setDimensionLength";
  setDimensionLengthUnit: "setDimensionLengthUnit";
  setDimensionWidth: "setDimensionWidth";
  setDimensionWidthUnit: "setDimensionWidthUnit";
  setDisplayAspectRatio: "setDisplayAspectRatio";
  setDisplayFieldsAdditionalMap: "setDisplayFieldsAdditionalMap";
  setDisplayPanelType: "setDisplayPanelType";
  setDisplayRefreshRate: "setDisplayRefreshRate";
  setDisplayResolutionHorizontal: "setDisplayResolutionHorizontal";
  setDisplayResolutionVertical: "setDisplayResolutionVertical";
  setDisplayResponseTime: "setDisplayResponseTime";
  setDisplaySize: "setDisplaySize";
  setGpuBoostClock: "setGpuBoostClock";
  setGpuChipset: "setGpuChipset";
  setGpuCoreClock: "setGpuCoreClock";
  setGpuFieldsAdditionalMap: "setGpuFieldsAdditionalMap";
  setGpuMemoryCapacity: "setGpuMemoryCapacity";
  setGpuMemoryCapacityUnit: "setGpuMemoryCapacityUnit";
  setGpuTdp: "setGpuTdp";
  setHeadphoneColor: "setHeadphoneColor";
  setHeadphoneDriver: "setHeadphoneDriver";
  setHeadphoneFieldsAdditionalMap: "setHeadphoneFieldsAdditionalMap";
  setHeadphoneFrequencyResponse: "setHeadphoneFrequencyResponse";
  setHeadphoneImpedance: "setHeadphoneImpedance";
  setHeadphoneInterface: "setHeadphoneInterface";
  setHeadphoneType: "setHeadphoneType";
  setImgFormDataArray: "setImgFormDataArray";
  setIsSubmitting: "setIsSubmitting";
  setIsSuccessful: "setIsSuccessful";
  setKeyboardBacklight: "setKeyboardBacklight";
  setKeyboardFieldsAdditionalMap: "setKeyboardFieldsAdditionalMap";
  setKeyboardInterface: "setKeyboardInterface";
  setKeyboardLayout: "setKeyboardLayout";
  setKeyboardSwitch: "setKeyboardSwitch";
  setMicrophoneColor: "setMicrophoneColor";
  setMicrophoneFieldsAdditionalMap: "setMicrophoneFieldsAdditionalMap";
  setMicrophoneFrequencyResponse: "setMicrophoneFrequencyResponse";
  setMicrophoneInterface: "setMicrophoneInterface";
  setMicrophonePolarPattern: "setMicrophonePolarPattern";
  setMicrophoneType: "setMicrophoneType";
  setModel: "setModel";
  setMotherboardChipset: "setMotherboardChipset";
  setMotherboardFieldsAdditionalMap: "setMotherboardFieldsAdditionalMap";
  setMotherboardFormFactor: "setMotherboardFormFactor";
  setMotherboardM2Slots: "setMotherboardM2Slots";
  setMotherboardMemoryMaxCapacity: "setMotherboardMemoryMaxCapacity";
  setMotherboardMemoryMaxCapacityUnit: "setMotherboardMemoryMaxCapacityUnit";
  setMotherboardMemorySlots: "setMotherboardMemorySlots";
  setMotherboardMemoryType: "setMotherboardMemoryType";
  setMotherboardPcie3Slots: "setMotherboardPcie3Slots";
  setMotherboardPcie4Slots: "setMotherboardPcie4Slots";
  setMotherboardPcie5Slots: "setMotherboardPcie5Slots";
  setMotherboardSataPorts: "setMotherboardSataPorts";
  setMotherboardSocket: "setMotherboardSocket";
  setMouseButtons: "setMouseButtons";
  setMouseColor: "setMouseColor";
  setMouseDpi: "setMouseDpi";
  setMouseFieldsAdditionalMap: "setMouseFieldsAdditionalMap";
  setMouseInterface: "setMouseInterface";
  setMouseSensor: "setMouseSensor";
  setPrice: "setPrice";
  setProductCategory: "setProductCategory";
  setPsuEfficiency: "setPsuEfficiency";
  setPsuFieldsAdditionalMap: "setPsuFieldsAdditionalMap";
  setPsuFormFactor: "setPsuFormFactor";
  setPsuModularity: "setPsuModularity";
  setPsuWattage: "setPsuWattage";
  setQuantity: "setQuantity";
  setRamColor: "setRamColor";
  setRamDataRate: "setRamDataRate";
  setRamFieldsAdditionalMap: "setRamFieldsAdditionalMap";
  setRamModulesCapacity: "setRamModulesCapacity";
  setRamModulesCapacityUnit: "setRamModulesCapacityUnit";
  setRamModulesQuantity: "setRamModulesQuantity";
  setRamTiming: "setRamTiming";
  setRamType: "setRamType";
  setRamVoltage: "setRamVoltage";
  setSmartphoneBatteryCapacity: "setSmartphoneBatteryCapacity";
  setSmartphoneCamera: "setSmartphoneCamera";
  setSmartphoneChipset: "setSmartphoneChipset";
  setSmartphoneColor: "setSmartphoneColor";
  setSmartphoneDisplay: "setSmartphoneDisplay";
  setSmartphoneFieldsAdditionalMap: "setSmartphoneFieldsAdditionalMap";
  setSmartphoneOs: "setSmartphoneOs";
  setSmartphoneRamCapacity: "setSmartphoneRamCapacity";
  setSmartphoneRamCapacityUnit: "setSmartphoneRamCapacityUnit";
  setSmartphoneResolutionHorizontal: "setSmartphoneResolutionHorizontal";
  setSmartphoneResolutionVertical: "setSmartphoneResolutionVertical";
  setSmartphoneStorageCapacity: "setSmartphoneStorageCapacity";
  setSpeakerColor: "setSpeakerColor";
  setSpeakerFieldsAdditionalMap: "setSpeakerFieldsAdditionalMap";
  setSpeakerFrequencyResponse: "setSpeakerFrequencyResponse";
  setSpeakerInterface: "setSpeakerInterface";
  setSpeakerTotalWattage: "setSpeakerTotalWattage";
  setSpeakerType: "setSpeakerType";
  setPageInError: "setPageInError";
  setStorageCacheCapacity: "setStorageCacheCapacity";
  setStorageCacheCapacityUnit: "setStorageCacheCapacityUnit";
  setStorageCapacity: "setStorageCapacity";
  setStorageCapacityUnit: "setStorageCapacityUnit";
  setStorageFieldsAdditionalMap: "setStorageFieldsAdditionalMap";
  setStorageFormFactor: "setStorageFormFactor";
  setStorageInterface: "setStorageInterface";
  setStorageType: "setStorageType";
  setSubmitMessage: "setSubmitMessage";
  setSuccessMessage: "setSuccessMessage";
  setTabletBatteryCapacity: "setTabletBatteryCapacity";
  setTabletCamera: "setTabletCamera";
  setTabletChipset: "setTabletChipset";
  setTabletColor: "setTabletColor";
  setTabletDisplay: "setTabletDisplay";
  setTabletFieldsAdditionalMap: "setTabletFieldsAdditionalMap";
  setTabletOs: "setTabletOs";
  setTabletRamCapacity: "setTabletRamCapacity";
  setTabletRamCapacityUnit: "setTabletRamCapacityUnit";
  setTabletResolutionHorizontal: "setTabletResolutionHorizontal";
  setTabletResolutionVertical: "setTabletResolutionVertical";
  setTabletStorageCapacity: "setTabletStorageCapacity";
  setTriggerFormSubmit: "setTriggerFormSubmit";
  setWebcamColor: "setWebcamColor";
  setWebcamFieldsAdditionalMap: "setWebcamFieldsAdditionalMap";
  setWebcamFrameRate: "setWebcamFrameRate";
  setWebcamInterface: "setWebcamInterface";
  setWebcamMicrophone: "setWebcamMicrophone";
  setWebcamResolution: "setWebcamResolution";
  setWeight: "setWeight";
  setWeightUnit: "setWeightUnit";
};
   */

type CreateProductDispatch =
  | {
      action: CreateProductAction["setAccessoryColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setAccessoryFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setCaseFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setCpuFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setCurrentStepperPosition"];
      payload: number;
    }
  | {
      action: CreateProductAction["setCurrentlySelectedAdditionalFieldIndex"];
      payload: number;
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
      action: CreateProductAction["setDisplayAspectRatio"];
      payload: string;
    }
  | {
      action: CreateProductAction["setDisplayFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setGpuFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setHeadphoneFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setImgFormDataArray"];
      payload: FormData[];
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
      action: CreateProductAction["setKeyboardFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setMicrophoneFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setMotherboardFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setMouseFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setProductCategory"];
      payload: ProductCategory;
    }
  | {
      action: CreateProductAction["setPsuEfficiency"];
      payload: PsuEfficiency;
    }
  | {
      action: CreateProductAction["setPsuFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setRamFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setSmartphoneBatteryCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneCamera"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneChipset"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneDisplay"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
    }
  | {
      action: CreateProductAction["setSmartphoneOs"];
      payload: MobileOs;
    }
  | {
      action: CreateProductAction["setSmartphoneRamCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneRamCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setSmartphoneResolutionHorizontal"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneResolutionVertical"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSmartphoneStorageCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSpeakerFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setStorageFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
      action: CreateProductAction["setSubmitMessage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setSuccessMessage"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletBatteryCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletCamera"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletChipset"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletColor"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletDisplay"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
    }
  | {
      action: CreateProductAction["setTabletOs"];
      payload: MobileOs;
    }
  | {
      action: CreateProductAction["setTabletRamCapacity"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletRamCapacityUnit"];
      payload: MemoryUnit;
    }
  | {
      action: CreateProductAction["setTabletResolutionHorizontal"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletResolutionVertical"];
      payload: string;
    }
  | {
      action: CreateProductAction["setTabletStorageCapacity"];
      payload: string;
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
      action: CreateProductAction["setWebcamFieldsAdditionalMap"];
      payload: AdditionalFieldsPayload;
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
  AdditionalFieldsPayload,
  AdditionalFieldsRemove,
  AdditionalFieldsUpdate,
  AdditionalFieldsValidFocusedAdd,
  AdditionalFieldsValidFocusedPayload,
  AdditionalFieldsValidFocusedRemove,
  AdditionalFieldsValidFocusedUpdate,
  CreateProductDispatch,
  SetStepsInErrorPayload,
};
