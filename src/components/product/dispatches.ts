import { Currency, SetStepsInErrorPayload } from '../../types';
import { ProductCategory } from '../dashboard/types';
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
} from './types';

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//     CREATE PRODUCT DISPATCH TYPES
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// Possible action shapes are organized using discriminated union types.
// 'type' property is a literal type and acts as the discriminant.
// This centralisation of action types allows:
//  - type inference for payload type at calling locations (event handlers, etc.)
//  - type inference at receiving locations (reducers) when using conditional statements
//  - consistency, maintainability, readability and accuracy
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

type AdditionalFieldsAdd = {
  operation: 'add';
  data: [string, string];
};
type AdditionalFieldsRemove = {
  operation: 'remove';
  index: number;
};
type AdditionalFieldsUpdate = {
  operation: 'update';
  kind: 'key' | 'value';
  index: number;
  data: string;
};
type AdditionalFieldsPayload =
  | AdditionalFieldsAdd
  | AdditionalFieldsRemove
  | AdditionalFieldsUpdate;

type AdditionalFieldsValidFocusedAdd = {
  operation: 'add';
  data: [boolean, boolean];
};
type AdditionalFieldsValidFocusedRemove = {
  operation: 'remove';
  index: number;
};
type AdditionalFieldsValidFocusedUpdate = {
  operation: 'update';
  kind: 'key' | 'value';
  index: number;
  data: boolean;
};
type AdditionalFieldsValidFocusedPayload =
  | AdditionalFieldsValidFocusedAdd
  | AdditionalFieldsValidFocusedRemove
  | AdditionalFieldsValidFocusedUpdate;

type CreateProductDispatch =
  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝
  // brand
  | {
      type: CreateProductAction['setBrand'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsBrandValid']
        | CreateProductAction['setIsBrandFocused'];
      payload: boolean;
    }
  // model
  | {
      type: CreateProductAction['setModel'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsModelValid']
        | CreateProductAction['setIsModelFocused'];
      payload: boolean;
    }
  // description
  | {
      type: CreateProductAction['setDescription'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDescriptionValid']
        | CreateProductAction['setIsDescriptionFocused'];
      payload: boolean;
    }
  // price
  | {
      type: CreateProductAction['setPrice'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsPriceValid']
        | CreateProductAction['setIsPriceFocused'];
      payload: boolean;
    }
  // currency
  | {
      type: CreateProductAction['setCurrency'];
      payload: Currency;
    }
  // availability
  | {
      type: CreateProductAction['setAvailability'];
      payload: ProductAvailability;
    }
  // quantity
  | {
      type: CreateProductAction['setQuantity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsQuantityValid']
        | CreateProductAction['setIsQuantityFocused'];
      payload: boolean;
    }
  // weight
  | {
      type: CreateProductAction['setWeight'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsWeightValid']
        | CreateProductAction['setIsWeightFocused'];
      payload: boolean;
    }
  // weight unit
  | {
      type: CreateProductAction['setWeightUnit'];
      payload: WeightUnit;
    }
  | {
      type: CreateProductAction['setDimensionLength'];
      payload: string;
    }
  // dimension length
  | {
      type:
        | CreateProductAction['setIsDimensionLengthFocused']
        | CreateProductAction['setIsDimensionLengthValid'];
      payload: boolean;
    }
  // dimension length unit
  | {
      type: CreateProductAction['setDimensionLengthUnit'];
      payload: DimensionUnit;
    }
  // dimension width
  | {
      type: CreateProductAction['setDimensionWidth'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDimensionWidthValid']
        | CreateProductAction['setIsDimensionWidthFocused'];
      payload: boolean;
    }
  // dimension width unit
  | {
      type: CreateProductAction['setDimensionWidthUnit'];
      payload: DimensionUnit;
    }
  // dimension height
  | {
      type: CreateProductAction['setDimensionHeight'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDimensionHeightValid']
        | CreateProductAction['setIsDimensionHeightFocused'];
      payload: boolean;
    }
  // dimension height unit
  | {
      type: CreateProductAction['setDimensionHeightUnit'];
      payload: DimensionUnit;
    }
  // additional comments
  | {
      type: CreateProductAction['setAdditionalComments'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAdditionalCommentsValid']
        | CreateProductAction['setIsAdditionalCommentsFocused'];
      payload: boolean;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝
  // product category
  | {
      type: CreateProductAction['setProductCategory'];
      payload: ProductCategory;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setAccessoryType'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAccessoryTypeValid']
        | CreateProductAction['setIsAccessoryTypeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setAccessoryColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsAccessoryColorValid']
        | CreateProductAction['setIsAccessoryColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setAccessoryInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setAccessoryFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreAccessoryFieldsAdditionalMapValid']
        | CreateProductAction['setAreAccessoryFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setCpuSocket'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuSocketValid']
        | CreateProductAction['setIsCpuSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuFrequency'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuFrequencyValid']
        | CreateProductAction['setIsCpuFrequencyFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuCores'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuCoresValid']
        | CreateProductAction['setIsCpuCoresFocused'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setCpuL1CacheCapacity']
        | CreateProductAction['setCpuL2CacheCapacity']
        | CreateProductAction['setCpuL3CacheCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuL1CacheCapacityValid']
        | CreateProductAction['setIsCpuL1CacheCapacityFocused']
        | CreateProductAction['setIsCpuL2CacheCapacityValid']
        | CreateProductAction['setIsCpuL2CacheCapacityFocused']
        | CreateProductAction['setIsCpuL3CacheCapacityValid']
        | CreateProductAction['setIsCpuL3CacheCapacityFocused'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setCpuL1CacheCapacityUnit']
        | CreateProductAction['setCpuL2CacheCapacityUnit']
        | CreateProductAction['setCpuL3CacheCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setCpuWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCpuWattageValid']
        | CreateProductAction['setIsCpuWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCpuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCpuFieldsAdditionalMapValid']
        | CreateProductAction['setAreCpuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setCaseType'];
      payload: CaseType;
    }
  | {
      type: CreateProductAction['setCaseColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsCaseColorValid']
        | CreateProductAction['setIsCaseColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCaseSidePanel'];
      payload: CaseSidePanel;
    }
  | {
      type: CreateProductAction['setCaseFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreCaseFieldsAdditionalMapValid']
        | CreateProductAction['setAreCaseFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setDisplaySize'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplaySizeValid']
        | CreateProductAction['setIsDisplaySizeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResolutionHorizontalValid']
        | CreateProductAction['setIsDisplayResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResolutionVerticalValid']
        | CreateProductAction['setIsDisplayResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayRefreshRate'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayRefreshRateValid']
        | CreateProductAction['setIsDisplayRefreshRateFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayPanelType'];
      payload: DisplayPanelType;
    }
  | {
      type: CreateProductAction['setDisplayResponseTime'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayResponseTimeValid']
        | CreateProductAction['setIsDisplayResponseTimeFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayAspectRatio'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsDisplayAspectRatioValid']
        | CreateProductAction['setIsDisplayAspectRatioFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setDisplayFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreDisplayFieldsAdditionalMapValid']
        | CreateProductAction['setAreDisplayFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setGpuChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuChipsetValid']
        | CreateProductAction['setIsGpuChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuMemoryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuMemoryCapacityValid']
        | CreateProductAction['setIsGpuMemoryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuMemoryCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setGpuCoreClock'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuCoreClockValid']
        | CreateProductAction['setIsGpuCoreClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuBoostClock'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuBoostClockValid']
        | CreateProductAction['setIsGpuBoostClockFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuTdp'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsGpuTdpValid']
        | CreateProductAction['setIsGpuTdpFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setGpuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreGpuFieldsAdditionalMapValid']
        | CreateProductAction['setAreGpuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setHeadphoneType'];
      payload: HeadphoneType;
    }
  | {
      type: CreateProductAction['setHeadphoneDriver'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneDriverValid']
        | CreateProductAction['setIsHeadphoneDriverFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneFrequencyResponseValid']
        | CreateProductAction['setIsHeadphoneFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneImpedance'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneImpedanceValid']
        | CreateProductAction['setIsHeadphoneImpedanceFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsHeadphoneColorValid']
        | CreateProductAction['setIsHeadphoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setHeadphoneInterface'];
      payload: HeadphoneInterface;
    }
  | {
      type: CreateProductAction['setHeadphoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreHeadphoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreHeadphoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setKeyboardSwitch'];
      payload: KeyboardSwitch;
    }
  | {
      type: CreateProductAction['setKeyboardLayout'];
      payload: KeyboardLayout;
    }
  | {
      type: CreateProductAction['setKeyboardBacklight'];
      payload: KeyboardBacklight;
    }
  | {
      type: CreateProductAction['setKeyboardInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setKeyboardFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreKeyboardFieldsAdditionalMapValid']
        | CreateProductAction['setAreKeyboardFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setRamDataRate'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamDataRateValid']
        | CreateProductAction['setIsRamDataRateFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesQuantity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamModulesQuantityValid']
        | CreateProductAction['setIsRamModulesQuantityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamModulesCapacityValid']
        | CreateProductAction['setIsRamModulesCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamModulesCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setRamType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setRamColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamColorValid']
        | CreateProductAction['setIsRamColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamVoltage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamVoltageValid']
        | CreateProductAction['setIsRamVoltageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamTiming'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsRamTimingValid']
        | CreateProductAction['setIsRamTimingFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setRamFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreRamFieldsAdditionalMapValid']
        | CreateProductAction['setAreRamFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMicrophoneType'];
      payload: MicrophoneType;
    }
  | {
      type: CreateProductAction['setMicrophonePolarPattern'];
      payload: MicrophonePolarPattern;
    }
  | {
      type: CreateProductAction['setMicrophoneInterface'];
      payload: MicrophoneInterface;
    }
  | {
      type: CreateProductAction['setMicrophoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMicrophoneColorValid']
        | CreateProductAction['setIsMicrophoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMicrophoneFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMicrophoneFrequencyResponseValid']
        | CreateProductAction['setIsMicrophoneFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMicrophoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMicrophoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreMicrophoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMotherboardSocket'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardSocketValid']
        | CreateProductAction['setIsMotherboardSocketFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardChipsetValid']
        | CreateProductAction['setIsMotherboardChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardFormFactor'];
      payload: MotherboardFormFactor;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMaxCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardMemoryMaxCapacityValid']
        | CreateProductAction['setIsMotherboardMemoryMaxCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryMaxCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setMotherboardMemorySlots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardMemorySlotsValid']
        | CreateProductAction['setIsMotherboardMemorySlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardMemoryType'];
      payload: MemoryType;
    }
  | {
      type: CreateProductAction['setMotherboardSataPorts'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardSataPortsValid']
        | CreateProductAction['setIsMotherboardSataPortsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardM2Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardM2SlotsValid']
        | CreateProductAction['setIsMotherboardM2SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie3Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie3SlotsValid']
        | CreateProductAction['setIsMotherboardPcie3SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie4Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie4SlotsValid']
        | CreateProductAction['setIsMotherboardPcie4SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardPcie5Slots'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMotherboardPcie5SlotsValid']
        | CreateProductAction['setIsMotherboardPcie5SlotsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMotherboardFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMotherboardFieldsAdditionalMapValid']
        | CreateProductAction['setAreMotherboardFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setMouseSensor'];
      payload: MouseSensor;
    }
  | {
      type: CreateProductAction['setMouseDpi'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseDpiValid']
        | CreateProductAction['setIsMouseDpiFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseButtons'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseButtonsValid']
        | CreateProductAction['setIsMouseButtonsFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsMouseColorValid']
        | CreateProductAction['setIsMouseColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setMouseInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateProductAction['setMouseFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreMouseFieldsAdditionalMapValid']
        | CreateProductAction['setAreMouseFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setPsuWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsPsuWattageValid']
        | CreateProductAction['setIsPsuWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setPsuEfficiency'];
      payload: PsuEfficiency;
    }
  | {
      type: CreateProductAction['setPsuFormFactor'];
      payload: PsuFormFactor;
    }
  | {
      type: CreateProductAction['setPsuModularity'];
      payload: PsuModularity;
    }
  | {
      type: CreateProductAction['setPsuFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setArePsuFieldsAdditionalMapValid']
        | CreateProductAction['setArePsuFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setSmartphoneOs'];
      payload: MobileOs;
    }
  | {
      type: CreateProductAction['setSmartphoneChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneChipsetValid']
        | CreateProductAction['setIsSmartphoneChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneDisplay'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneDisplayValid']
        | CreateProductAction['setIsSmartphoneDisplayFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneResolutionHorizontalValid']
        | CreateProductAction['setIsSmartphoneResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneResolutionVerticalValid']
        | CreateProductAction['setIsSmartphoneResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneRamCapacityValid']
        | CreateProductAction['setIsSmartphoneRamCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setSmartphoneStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneStorageCapacityValid']
        | CreateProductAction['setIsSmartphoneStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneBatteryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneBatteryCapacityValid']
        | CreateProductAction['setIsSmartphoneBatteryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneCamera'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneCameraValid']
        | CreateProductAction['setIsSmartphoneCameraFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSmartphoneColorValid']
        | CreateProductAction['setIsSmartphoneColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSmartphoneFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSmartphoneFieldsAdditionalMapValid']
        | CreateProductAction['setAreSmartphoneFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setSpeakerType'];
      payload: SpeakerType;
    }
  | {
      type: CreateProductAction['setSpeakerTotalWattage'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerTotalWattageValid']
        | CreateProductAction['setIsSpeakerTotalWattageFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerFrequencyResponse'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerFrequencyResponseValid']
        | CreateProductAction['setIsSpeakerFrequencyResponseFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsSpeakerColorValid']
        | CreateProductAction['setIsSpeakerColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setSpeakerInterface'];
      payload: SpeakerInterface;
    }
  | {
      type: CreateProductAction['setSpeakerFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreSpeakerFieldsAdditionalMapValid']
        | CreateProductAction['setAreSpeakerFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setStorageType'];
      payload: StorageType;
    }
  | {
      type: CreateProductAction['setStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsStorageCapacityValid']
        | CreateProductAction['setIsStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setStorageCacheCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsStorageCacheCapacityValid']
        | CreateProductAction['setIsStorageCacheCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setStorageCacheCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setStorageFormFactor'];
      payload: StorageFormFactor;
    }
  | {
      type: CreateProductAction['setStorageInterface'];
      payload: StorageInterface;
    }
  | {
      type: CreateProductAction['setStorageFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreStorageFieldsAdditionalMapValid']
        | CreateProductAction['setAreStorageFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setTabletOs'];
      payload: MobileOs;
    }
  | {
      type: CreateProductAction['setTabletChipset'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletChipsetValid']
        | CreateProductAction['setIsTabletChipsetFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletDisplay'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletDisplayValid']
        | CreateProductAction['setIsTabletDisplayFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletResolutionHorizontal'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletResolutionHorizontalValid']
        | CreateProductAction['setIsTabletResolutionHorizontalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletResolutionVertical'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletResolutionVerticalValid']
        | CreateProductAction['setIsTabletResolutionVerticalFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletRamCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletRamCapacityValid']
        | CreateProductAction['setIsTabletRamCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletRamCapacityUnit'];
      payload: MemoryUnit;
    }
  | {
      type: CreateProductAction['setTabletStorageCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletStorageCapacityValid']
        | CreateProductAction['setIsTabletStorageCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletBatteryCapacity'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletBatteryCapacityValid']
        | CreateProductAction['setIsTabletBatteryCapacityFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletCamera'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletCameraValid']
        | CreateProductAction['setIsTabletCameraFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsTabletColorValid']
        | CreateProductAction['setIsTabletColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setTabletFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreTabletFieldsAdditionalMapValid']
        | CreateProductAction['setAreTabletFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
  | {
      type: CreateProductAction['setWebcamResolution'];
      payload: WebcamResolution;
    }
  | {
      type: CreateProductAction['setWebcamInterface'];
      payload: WebcamInterface;
    }
  | {
      type: CreateProductAction['setWebcamMicrophone'];
      payload: WebcamMicrophone;
    }
  | {
      type: CreateProductAction['setWebcamFrameRate'];
      payload: WebcamFrameRate;
    }
  | {
      type: CreateProductAction['setWebcamColor'];
      payload: string;
    }
  | {
      type:
        | CreateProductAction['setIsWebcamColorValid']
        | CreateProductAction['setIsWebcamColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setWebcamFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateProductAction['setAreWebcamFieldsAdditionalMapValid']
        | CreateProductAction['setAreWebcamFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝
  | {
      type: CreateProductAction['setCurrentlySelectedAdditionalFieldIndex'];
      payload: number;
    }
  | {
      type: CreateProductAction['setImgFormDataArray'];
      payload: FormData[];
    }
  | {
      type: CreateProductAction['setAreImagesValid'];
      payload: boolean;
    }
  // ╔═════════════════════════════════════════════════════════════════╗
  //    MISC.
  // ╚═════════════════════════════════════════════════════════════════╝
  | {
      type: CreateProductAction['setTriggerFormSubmit'];
      payload: boolean;
    }
  | {
      type: CreateProductAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateProductAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | CreateProductAction['setIsSubmitting']
        | CreateProductAction['setIsSuccessful'];
      payload: boolean;
    }
  | {
      type:
        | CreateProductAction['setSubmitMessage']
        | CreateProductAction['setSuccessMessage'];
      payload: string;
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
