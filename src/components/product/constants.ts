import { CURRENCY_DATA } from "../../constants/data";
import type {
  CheckboxRadioSelectData,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import type { ProductCategory } from "../dashboard/types";
import type {
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
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  ProductAvailability,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  RatingKind,
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

const PRODUCT_ROLE_RESOURCE_PATHS: RoleResourceRoutePaths = {
  admin: "/product-category",
  employee: "/product-category/user",
  manager: "/product-category",
};

function createProductStepperPages(): StepperPage[] {
  const accessoryColor: StepperChild = {
    inputType: "text",
    name: "accessoryColor",
    validationKey: "colorVariant",
  };

  const accessoryInterface: StepperChild = {
    inputType: "select",
    name: "accessoryInterface",
    selectInputData: PERIPHERALS_INTERFACE_DATA,
  };

  const accessoryType: StepperChild = {
    inputType: "text",
    name: "accessoryType",
    validationKey: "accessoryType",
  };

  const accessoryFieldName1: StepperChild = {
    inputType: "text",
    name: "Additional Field Name 1",
    validationKey: "textAreaInput",
  };

  const accessoryFieldValue1: StepperChild = {
    inputType: "text",
    name: "Additional Field Value 1",
    validationKey: "textAreaInput",
  };

  const additionalComments: StepperChild = {
    inputType: "text",
    name: "additionalComments",
    validationKey: "textAreaInput",
  };

  const availability: StepperChild = {
    inputType: "select",
    name: "availability",
    selectInputData: PRODUCT_AVAILABILITY_DATA,
  };

  const brand: StepperChild = {
    inputType: "text",
    name: "brand",
    validationKey: "brand",
  };

  const caseColor: StepperChild = {
    inputType: "text",
    name: "caseColor",
    validationKey: "colorVariant",
  };

  const caseSidePanel: StepperChild = {
    inputType: "select",
    name: "caseSidePanel",
    selectInputData: CASE_SIDE_PANEL_DATA,
  };

  const caseType: StepperChild = {
    inputType: "select",
    name: "caseType",
    selectInputData: CASE_TYPE_DATA,
  };

  const cpuCores: StepperChild = {
    inputType: "number",
    name: "cpuCores",
    validationKey: "smallInteger",
  };

  const cpuFrequency: StepperChild = {
    inputType: "number",
    name: "cpuFrequency",
    validationKey: "cpuFrequency",
  };

  const cpuL1CacheCapacity: StepperChild = {
    inputType: "number",
    name: "cpuL1CacheCapacity",
    validationKey: "mediumInteger",
  };

  const cpuL1CacheCapacityUnit: StepperChild = {
    inputType: "select",
    name: "cpuL1CacheCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const cpuL2CacheCapacity: StepperChild = {
    inputType: "number",
    name: "cpuL2CacheCapacity",
    validationKey: "mediumInteger",
  };

  const cpuL2CacheCapacityUnit: StepperChild = {
    inputType: "select",
    name: "cpuL2CacheCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const cpuL3CacheCapacity: StepperChild = {
    inputType: "number",
    name: "cpuL3CacheCapacity",
    validationKey: "mediumInteger",
  };

  const cpuL3CacheCapacityUnit: StepperChild = {
    inputType: "select",
    name: "cpuL3CacheCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const cpuSocket: StepperChild = {
    inputType: "text",
    name: "cpuSocket",
    validationKey: "cpuSocket",
  };

  const cpuWattage: StepperChild = {
    inputType: "number",
    name: "cpuWattage",
    validationKey: "smallInteger",
  };

  const currency: StepperChild = {
    inputType: "select",
    name: "currency",
    selectInputData: CURRENCY_DATA,
  };

  const description: StepperChild = {
    inputType: "text",
    name: "description",
    validationKey: "textAreaInput",
  };

  const dimensionHeight: StepperChild = {
    inputType: "text",
    name: "dimensionHeight",
    validationKey: "dimensions",
  };

  const dimensionHeightUnit: StepperChild = {
    inputType: "select",
    name: "dimensionHeightUnit",
    selectInputData: DIMENSION_UNIT_DATA,
  };

  const dimensionLength: StepperChild = {
    inputType: "text",
    name: "dimensionLength",
    validationKey: "dimensions",
  };

  const dimensionLengthUnit: StepperChild = {
    inputType: "select",
    name: "dimensionLengthUnit",
    selectInputData: DIMENSION_UNIT_DATA,
  };

  const dimensionWidth: StepperChild = {
    inputType: "text",
    name: "dimensionWidth",
    validationKey: "dimensions",
  };

  const dimensionWidthUnit: StepperChild = {
    inputType: "select",
    name: "dimensionWidthUnit",
    selectInputData: DIMENSION_UNIT_DATA,
  };

  const displayAspectRatio: StepperChild = {
    inputType: "text",
    name: "displayAspectRatio",
    validationKey: "displayAspectRatio",
  };

  const displayPanelType: StepperChild = {
    inputType: "select",
    name: "displayPanelType",
    selectInputData: DISPLAY_PANEL_TYPE_DATA,
  };

  const displayRefreshRate: StepperChild = {
    inputType: "text",
    name: "displayRefreshRate",
    validationKey: "mediumInteger",
  };

  const displayResolutionHorizontal: StepperChild = {
    inputType: "text",
    name: "displayResolutionHorizontal",
    validationKey: "smallInteger",
  };

  const displayResolutionVertical: StepperChild = {
    inputType: "text",
    name: "displayResolutionVertical",
    validationKey: "smallInteger",
  };

  const displayResponseTime: StepperChild = {
    inputType: "text",
    name: "displayResponseTime",
    validationKey: "smallInteger",
  };

  const displaySize: StepperChild = {
    inputType: "text",
    name: "displaySize",
    validationKey: "smallInteger",
  };

  const gpuBoostClock: StepperChild = {
    inputType: "text",
    name: "gpuBoostClock",
    validationKey: "mediumInteger",
  };

  const gpuChipset: StepperChild = {
    inputType: "text",
    name: "gpuChipset",
    validationKey: "cpuSocket",
  };

  const gpuCoreClock: StepperChild = {
    inputType: "text",
    name: "gpuCoreClock",
    validationKey: "mediumInteger",
  };

  const gpuMemoryCapacity: StepperChild = {
    inputType: "text",
    name: "gpuMemoryCapacity",
    validationKey: "smallInteger",
  };

  const gpuMemoryCapacityUnit: StepperChild = {
    inputType: "select",
    name: "gpuMemoryCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const gpuTdp: StepperChild = {
    inputType: "text",
    name: "gpuTdp",
    validationKey: "smallInteger",
  };

  const headphoneColor: StepperChild = {
    inputType: "text",
    name: "headphoneColor",
    validationKey: "colorVariant",
  };

  const headphoneDriver: StepperChild = {
    inputType: "text",
    name: "headphoneDriver",
    validationKey: "smallInteger",
  };

  const headphoneFrequencyResponse: StepperChild = {
    inputType: "text",
    name: "headphoneFrequencyResponse",
    validationKey: "frequencyResponse",
  };

  const headphoneImpedance: StepperChild = {
    inputType: "text",
    name: "headphoneImpedance",
    validationKey: "smallInteger",
  };

  const headphoneInterface: StepperChild = {
    inputType: "select",
    name: "headphoneInterface",
    selectInputData: HEADPHONE_INTERFACE_DATA,
  };

  const headphoneType: StepperChild = {
    inputType: "select",
    name: "headphoneType",
    selectInputData: HEADPHONE_TYPE_DATA,
  };

  const keyboardBacklight: StepperChild = {
    inputType: "select",
    name: "keyboardBacklight",
    selectInputData: KEYBOARD_BACKLIGHT_DATA,
  };

  const keyboardInterface: StepperChild = {
    inputType: "select",
    name: "keyboardInterface",
    selectInputData: PERIPHERALS_INTERFACE_DATA,
  };

  const keyboardLayout: StepperChild = {
    inputType: "select",
    name: "keyboardLayout",
    selectInputData: KEYBOARD_LAYOUT_DATA,
  };

  const keyboardSwitch: StepperChild = {
    inputType: "select",
    name: "keyboardSwitch",
    selectInputData: KEYBOARD_SWITCH_DATA,
  };

  const microphoneColor: StepperChild = {
    inputType: "text",
    name: "microphoneColor",
    validationKey: "colorVariant",
  };

  const microphoneFrequencyResponse: StepperChild = {
    inputType: "text",
    name: "microphoneFrequencyResponse",
    validationKey: "frequencyResponse",
  };

  const microphoneInterface: StepperChild = {
    inputType: "select",
    name: "microphoneInterface",
    selectInputData: PERIPHERALS_INTERFACE_DATA,
  };

  const microphonePolarPattern: StepperChild = {
    inputType: "select",
    name: "microphonePolarPattern",
    selectInputData: MICROPHONE_POLAR_PATTERN_DATA,
  };

  const microphoneType: StepperChild = {
    inputType: "select",
    name: "microphoneType",
    selectInputData: MICROPHONE_TYPE_DATA,
  };

  const model: StepperChild = {
    inputType: "text",
    name: "model",
    validationKey: "username",
  };

  const motherboardChipset: StepperChild = {
    inputType: "text",
    name: "motherboardChipset",
    validationKey: "cpuSocket",
  };

  const motherboardFormFactor: StepperChild = {
    inputType: "select",
    name: "motherboardFormFactor",
    selectInputData: MOTHERBOARD_FORM_FACTOR_DATA,
  };

  const motherboardM2Slots: StepperChild = {
    inputType: "number",
    name: "motherboardM2Slots",
    validationKey: "smallInteger",
  };

  const motherboardMemoryMaxCapacity: StepperChild = {
    inputType: "number",
    name: "motherboardMemoryMaxCapacity",
    validationKey: "smallInteger",
  };

  const motherboardMemoryMaxCapacityUnit: StepperChild = {
    inputType: "select",
    name: "motherboardMemoryMaxCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const motherboardMemorySlots: StepperChild = {
    inputType: "number",
    name: "motherboardMemorySlots",
    validationKey: "smallInteger",
  };

  const motherboardMemoryType: StepperChild = {
    inputType: "select",
    name: "motherboardMemoryType",
    selectInputData: MEMORY_TYPE_DATA,
  };

  const motherboardPcie3Slots: StepperChild = {
    inputType: "number",
    name: "motherboardPcie3Slots",
    validationKey: "smallInteger",
  };

  const motherboardPcie4Slots: StepperChild = {
    inputType: "number",
    name: "motherboardPcie4Slots",
    validationKey: "smallInteger",
  };

  const motherboardPcie5Slots: StepperChild = {
    inputType: "number",
    name: "motherboardPcie5Slots",
    validationKey: "smallInteger",
  };

  const motherboardSataPorts: StepperChild = {
    inputType: "number",
    name: "motherboardSataPorts",
    validationKey: "smallInteger",
  };

  const motherboardSocket: StepperChild = {
    inputType: "text",
    name: "motherboardSocket",
    validationKey: "cpuSocket",
  };

  const mouseButtons: StepperChild = {
    inputType: "text",
    name: "mouseButtons",
    validationKey: "smallInteger",
  };

  const mouseColor: StepperChild = {
    inputType: "text",
    name: "mouseColor",
    validationKey: "colorVariant",
  };

  const mouseDpi: StepperChild = {
    inputType: "text",
    name: "mouseDpi",
    validationKey: "largeInteger",
  };

  const mouseInterface: StepperChild = {
    inputType: "select",
    name: "mouseInterface",
    selectInputData: PERIPHERALS_INTERFACE_DATA,
  };

  const mouseSensor: StepperChild = {
    inputType: "select",
    name: "mouseSensor",
    selectInputData: MOUSE_SENSOR_DATA,
  };

  const price: StepperChild = {
    inputType: "text",
    name: "price",
    validationKey: "money",
  };

  const psuEfficiency: StepperChild = {
    inputType: "select",
    name: "psuEfficiency",
    selectInputData: PSU_EFFICIENCY_RATING_DATA,
  };

  const psuFormFactor: StepperChild = {
    inputType: "select",
    name: "psuFormFactor",
    selectInputData: PSU_FORM_FACTOR_DATA,
  };

  const psuModularity: StepperChild = {
    inputType: "select",
    name: "psuModularity",
    selectInputData: PSU_MODULARITY_DATA,
  };

  const psuWattage: StepperChild = {
    inputType: "text",
    name: "psuWattage",
    validationKey: "mediumInteger",
  };

  const quantity: StepperChild = {
    inputType: "text",
    name: "quantity",
    validationKey: "largeInteger",
  };

  const ramColor: StepperChild = {
    inputType: "text",
    name: "ramColor",
    validationKey: "colorVariant",
  };

  const ramDataRate: StepperChild = {
    inputType: "text",
    name: "ramDataRate",
    validationKey: "mediumInteger",
  };

  const ramModulesCapacity: StepperChild = {
    inputType: "text",
    name: "ramModulesCapacity",
    validationKey: "mediumInteger",
  };

  const ramModulesCapacityUnit: StepperChild = {
    inputType: "select",
    name: "ramModulesCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const ramModulesQuantity: StepperChild = {
    inputType: "text",
    name: "ramModulesQuantity",
    validationKey: "smallInteger",
  };

  const ramTiming: StepperChild = {
    inputType: "text",
    name: "ramTiming",
    validationKey: "ramTiming",
  };

  const ramType: StepperChild = {
    inputType: "select",
    name: "ramType",
    selectInputData: MEMORY_TYPE_DATA,
  };

  const ramVoltage: StepperChild = {
    inputType: "text",
    name: "ramVoltage",
    validationKey: "ramVoltage",
  };

  const speakerColor: StepperChild = {
    inputType: "text",
    name: "speakerColor",
    validationKey: "colorVariant",
  };

  const speakerFrequencyResponse: StepperChild = {
    inputType: "text",
    name: "speakerFrequencyResponse",
    validationKey: "frequencyResponse",
  };

  const speakerInterface: StepperChild = {
    inputType: "select",
    name: "speakerInterface",
    selectInputData: SPEAKER_INTERFACE_DATA,
  };

  const speakerTotalWattage: StepperChild = {
    inputType: "text",
    name: "speakerTotalWattage",
    validationKey: "mediumInteger",
  };

  const speakerType: StepperChild = {
    inputType: "select",
    name: "speakerType",
    selectInputData: SPEAKER_TYPE_DATA,
  };

  const storageCacheCapacity: StepperChild = {
    inputType: "text",
    name: "storageCacheCapacity",
    validationKey: "mediumInteger",
  };

  const storageCacheCapacityUnit: StepperChild = {
    inputType: "select",
    name: "storageCacheCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const storageCapacity: StepperChild = {
    inputType: "text",
    name: "storageCapacity",
    validationKey: "mediumInteger",
  };

  const storageCapacityUnit: StepperChild = {
    inputType: "select",
    name: "storageCapacityUnit",
    selectInputData: MEMORY_UNIT_DATA,
  };

  const storageFormFactor: StepperChild = {
    inputType: "select",
    name: "storageFormFactor",
    selectInputData: STORAGE_FORM_FACTOR_DATA,
  };

  const storageInterface: StepperChild = {
    inputType: "select",
    name: "storageInterface",
    selectInputData: STORAGE_INTERFACE_DATA,
  };

  const storageType: StepperChild = {
    inputType: "select",
    name: "storageType",
    selectInputData: STORAGE_TYPE_DATA,
  };

  const webcamColor: StepperChild = {
    inputType: "text",
    name: "webcamColor",
    validationKey: "colorVariant",
  };

  const webcamFrameRate: StepperChild = {
    inputType: "select",
    name: "webcamFrameRate",
    selectInputData: WEBCAM_FRAME_RATE_DATA,
  };

  const webcamInterface: StepperChild = {
    inputType: "select",
    name: "webcamInterface",
    selectInputData: PERIPHERALS_INTERFACE_DATA,
  };

  const webcamMicrophone: StepperChild = {
    inputType: "select",
    name: "webcamMicrophone",
    selectInputData: WEBCAM_MICROPHONE_DATA,
  };

  const webcamResolution: StepperChild = {
    inputType: "select",
    name: "webcamResolution",
    selectInputData: WEBCAM_RESOLUTION_DATA,
  };

  const weight: StepperChild = {
    inputType: "text",
    name: "weight",
    validationKey: "weight",
  };

  const weightUnit: StepperChild = {
    inputType: "select",
    name: "weightUnit",
    selectInputData: WEIGHT_UNIT_DATA,
  };

  return [
    // first page
    {
      children: [
        brand,
        model,
        description,
        price,
        currency,
        availability,
        quantity,
        weight,
        weightUnit,
        dimensionLength,
        dimensionLengthUnit,
        dimensionWidth,
        dimensionWidthUnit,
        dimensionHeight,
        dimensionHeightUnit,
        additionalComments,
      ],
      description: "General product information",
    },

    {
      children: [],
      description: "Product Category",
    },

    {
      children: [
        accessoryType,
        accessoryColor,
        accessoryInterface,
        accessoryFieldName1,
        accessoryFieldValue1,
      ],
      description: "Accessory",
    },

    {
      children: [caseType, caseColor, caseSidePanel],
      description: "Computer Case",
    },

    {
      children: [
        cpuSocket,
        cpuFrequency,
        cpuCores,
        cpuWattage,
        cpuL1CacheCapacity,
        cpuL1CacheCapacityUnit,
        cpuL2CacheCapacity,
        cpuL2CacheCapacityUnit,
        cpuL3CacheCapacity,
        cpuL3CacheCapacityUnit,
      ],
      description: "Central Processing Unit (CPU)",
    },

    {
      children: [
        displaySize,
        displayResolutionHorizontal,
        displayResolutionVertical,
        displayAspectRatio,
        displayRefreshRate,
        displayResponseTime,
        displayPanelType,
      ],
      description: "Display",
    },

    {
      children: [
        gpuChipset,
        gpuCoreClock,
        gpuBoostClock,
        gpuMemoryCapacity,
        gpuMemoryCapacityUnit,
        gpuTdp,
      ],
      description: "Graphics Processing Unit (GPU)",
    },

    {
      children: [
        headphoneType,
        headphoneDriver,
        headphoneImpedance,
        headphoneFrequencyResponse,
        headphoneInterface,
        headphoneColor,
      ],
      description: "Headphone",
    },

    {
      children: [
        keyboardLayout,
        keyboardSwitch,
        keyboardBacklight,
        keyboardInterface,
      ],
      description: "Keyboard",
    },

    {
      children: [
        ramType,
        ramModulesQuantity,
        ramModulesCapacity,
        ramModulesCapacityUnit,
        ramDataRate,
        ramTiming,
        ramVoltage,
        ramColor,
      ],
      description: "Memory (RAM)",
    },

    {
      children: [psuWattage, psuFormFactor, psuEfficiency, psuModularity],
      description: "Power Supply Unit (PSU)",
    },

    {
      children: [
        speakerType,
        speakerTotalWattage,
        speakerInterface,
        speakerFrequencyResponse,
        speakerColor,
      ],
      description: "Speaker",
    },

    {
      children: [
        microphoneType,
        microphonePolarPattern,
        microphoneInterface,
        microphoneFrequencyResponse,
        microphoneColor,
      ],
      description: "Microphone",
    },

    {
      children: [
        mouseButtons,
        mouseDpi,
        mouseSensor,
        mouseInterface,
        mouseColor,
      ],
      description: "Mouse",
    },

    {
      children: [
        motherboardSocket,
        motherboardChipset,
        motherboardFormFactor,
        motherboardMemoryType,
        motherboardMemoryMaxCapacity,
        motherboardMemoryMaxCapacityUnit,
        motherboardMemorySlots,
        motherboardM2Slots,
        motherboardPcie3Slots,
        motherboardPcie4Slots,
        motherboardPcie5Slots,
        motherboardSataPorts,
      ],
      description: "Motherboard",
    },

    {
      children: [
        storageType,
        storageCapacity,
        storageCapacityUnit,
        storageFormFactor,
        storageInterface,
        storageCacheCapacity,
        storageCacheCapacityUnit,
      ],
      description: "Storage",
    },

    {
      children: [
        webcamResolution,
        webcamFrameRate,
        webcamInterface,
        webcamMicrophone,
        webcamColor,
      ],
      description: "Webcam",
    },

    {
      children: [],
      description: "Review",
      kind: "review",
    },
  ];
}

/**
 * - /^(?![0-9])[^"'\s\\]{1,75}$/;
 * - (?![0-9]) ensures that the first character is not a digit.
 * - [^"'\s\\] ensures that the input does not contain any of the following characters: ", ', whitespace, \.
 * - {1,75} matches the preceding token between 1 and 75 times.
 * - ^ and $ ensure that the entire string matches the regex.
 * ex: 'username' or 'username123' or 'username-123' or 'u123-sername'
 */
const OBJECT_KEY_REGEX = /^(?![0-9])[^"'\s\\]{1,75}$/;

/**
 * - /^(?!^\s*$)[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{2,2000}$/i
 * - (?=.*[A-Za-z0-9]) ensures that there is at least one alphanumeric character, preventing the input from consisting entirely of whitespace.
 * - [A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~] matches any alphanumeric character or special character in the range of special characters commonly used in components, part numbers, and ID numbers.
 * - {2,2000} ensures that the text is between 2 and 2000 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const USER_DEFINED_VALUE_REGEX =
  /^(?!^\s*$)[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\w\s]{2,2000}$/i;

/**
 * - /^(?!^$|^0*$)[0-9]{1,6}(\.[0-9]{1,2})?$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - [0-9]{1,6}: Matches one to six digits for the integral part of the weight.
 * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the weight.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 123456.78 or 123456
 */
const WEIGHT_REGEX = /^(?!^$|^0*$)[0-9]{1,6}(\.[0-9]{1,2})?$/;

/**
 * - /^(?!^$|^0*$)[0-9]{1,3}(\.[0-9]{1,2})?$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - (?!^0*\.?0*$): Negative lookahead assertion to ensure that the entire string is not empty (^0*$) or consists entirely of zeroes (^0*), optionally followed by a decimal point (\.?0*$).
 * - [0-9]{1,3}: Matches one to three digits for the integral part of the length, width, or height.
 * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the length, width, or height.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 123.45 or 123
 */
const DIMENSIONS_REGEX = /^(?!^$|^0*$)(?!^0*\.?0*$)[0-9]{1,3}(\.[0-9]{1,2})?$/;

/**
 * - /^(?!^$|^0*$)[0-9]{1,2}(\.[0-9]{1,2})?$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - (?!^0*\.?0*$): Negative lookahead assertion to ensure that the entire string is not empty (^0*$) or consists entirely of zeroes (^0*), optionally followed by a decimal point (\.?0*$).
 * - [0-9]{1,2}: Matches one to two digits for the integral part of the frequency.
 * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the frequency.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 12.34 or 12
 */
const CPU_FREQUENCY_REGEX = /^(?!^$|^0*$)(?!^0*\.?0*$)[0-9]{1}(\.[0-9]{1,2})?$/;

/**
 * - /^(?!^$|^0*$)[0-9]{1,2}$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - [0-9]{1,2}: Matches one to two digits for the integral part
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 12
 */
const SMALL_INTEGER_REGEX = /^(?!^$|^0*$)[0-9]{1,2}$/;

/**
 * - /^(?!^$|^0*$)[0-9]{1,4}$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - [0-9]{1,4}: Matches one to four digits for the integral part
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 1234
 */
const MEDIUM_INTEGER_REGEX = /^(?!^$|^0*$)[0-9]{1,4}$/;

/**
 * - /^(?!^$|^0*$)[0-9]{1,6}$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - [0-9]{1,6}: Matches one to six digits for the integral part of the quantity.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 123456
 */
const LARGE_INTEGER_REGEX = /^(?!^$|^0*$)[0-9]{1,6}$/;

/**
 * - /^(?!^$|^0*$)[0-1]{1}(\.[0-9]{1,2})?$/
 * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
 * - (?!^0*\.?0*$): Negative lookahead assertion to ensure that the entire string is not empty (^0*$) or consists entirely of zeroes (^0*), optionally followed by a decimal point (\.?0*$).
 * - [0-1]{1}: Matches one digit between 0 and 1 for the integral part of the voltage.
 * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the voltage.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 0.12 or 0.1 or 0. or 0 or 1.12 or 1.1 or 1
 */
const RAM_VOLTAGE_REGEX = /^(?!^$|^0*$)(?!^0*\.?0*$)[0-1]{1}(\.[0-9]{1,2})?$/;

/**
 * - /^[a-zA-Z0-9- ]{2,30}$/;
 * - [a-zA-Z0-9\s-] matches any character between a-z, A-Z, 0-9, whitespace and -.
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const BRAND_REGEX = /^[a-zA-Z0-9\s-]{2,30}$/;

/**
 * - /^[a-zA-Z0-9\s.,'()-]{2,30}$/i;
 * - [a-zA-Z0-9\s.,'()-] matches any character between a-z, A-Z, 0-9, whitespace, ., ,, ', (, ), -.
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const CPU_SOCKET_REGEX = /^[a-zA-Z0-9\s.,'()-]{2,30}$/;
const GPU_CHIPSET_REGEX = CPU_SOCKET_REGEX;
const MOTHERBOARD_SOCKET_REGEX = CPU_SOCKET_REGEX;
const MOTHERBOARD_CHIPSET_REGEX = CPU_SOCKET_REGEX;

/**
 * - /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {1,2} matches the preceding token between 1 and 2 times.
 * - matches the character - literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 16-18-18-36 or 16-8-18-6
 */
const RAM_TIMING_REGEX = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}$/;

/**
 * - /^[a-zA-Z0-9#()%,.\s-]{2,30}$/
 * - [a-zA-Z0-9#()%,.\s-] matches any character between a-z, A-Z, 0-9, #, (, ), %, ,, ., whitespace and -.
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: #e0e0e0 or hsl(0, 0%, 88%) or rgb(224, 224, 224) or rgba(224, 224, 224, 0.5) or hsla(0, 0%, 88%, 0.5)
 */
const COLOR_VARIANT_REGEX = /^[a-zA-Z0-9#()%,.\s-]{2,30}$/;

/**
 * - /^[0-9]{1,2}:[0-9]{1,2}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {1,2} matches the preceding token between 1 and 2 times.
 * - matches the character : literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 16:9
 */
const DISPLAY_ASPECT_RATIO_REGEX = /^[0-9]{1,2}:[0-9]{1,2}$/;

/**
 * - /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/
 * - [0-9] matches any digit between 0 and 9.
 * - {1,2} matches the preceding token between 1 and 2 times.
 * - [\s]{0,1} matches the character whitespace literally between 0 and 1 times.
 * - matches the character Hz literally.
 * - matches the character - literally.
 * - matches the character kHz literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 20Hz-20kHz or 20 Hz - 20 kHz or 20 Hz-20 kHz or 20Hz - 20kHz
 */
const FREQUENCY_RESPONSE_REGEX =
  /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/;

const SMARTPHONE_CHIPSET_REGEX = CPU_SOCKET_REGEX;
const TABLET_CHIPSET_REGEX = CPU_SOCKET_REGEX;

/**
 * - /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){1,12}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {1,3} matches the preceding token between 1 and 3 times.
 * - matches the character MP literally.
 * - (?:, ([0-9]{1,3} MP)) matches the characters , and a space literally, followed by a group of 1 to 3 digits, followed by the character MP literally.
 * - {1,12} matches the preceding token between 1 and 12 times.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: '12 MP, 12 MP, 12 MP' or '12 MP'
 */

const MOBILE_CAMERA_REGEX = /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){0,12}$/;

const ACCESSORY_TYPE_REGEX = BRAND_REGEX;

const MAX_ADDITIONAL_FIELDS_AMOUNT = 5;

/** stepper page indexes of product categories */
const PRODUCT_CATEGORY_PAGE_TABLE: Record<ProductCategory, number> = {
  Accessory: 1,
  "Central Processing Unit (CPU)": 2,
  "Computer Case": 3,
  "Desktop Computer": 4,
  Display: 5,
  "Graphics Processing Unit (GPU)": 6,
  Headphone: 7,
  Keyboard: 8,
  "Memory (RAM)": 9,
  "Power Supply Unit (PSU)": 10,
  Speaker: 11,
  Microphone: 12,
  Motherboard: 13,
  Mouse: 14,
  Storage: 15,
  Webcam: 16,
};

const WEIGHT_UNIT_SELECT_INPUT_DATA: CheckboxRadioSelectData<WeightUnit> = [
  { value: "g", label: "gram" },
  { value: "kg", label: "kilogram" },
  { value: "lb", label: "pound" },
];

const WEIGHT_UNIT_DATA: CheckboxRadioSelectData<WeightUnit> = [
  { value: "g", label: "gram" },
  { value: "kg", label: "kilogram" },
  { value: "lb", label: "pound" },
];

const DIMENSION_UNIT_SELECT_INPUT_DATA: CheckboxRadioSelectData<DimensionUnit> =
  [
    { value: "mm", label: "millimetre" },
    { value: "cm", label: "centimetre" },
    { value: "m", label: "metre" },
    { value: "in", label: "inch" },
    { value: "ft", label: "feet" },
  ];

const DIMENSION_UNIT_DATA: CheckboxRadioSelectData<DimensionUnit> = [
  { value: "mm", label: "millimetre" },
  { value: "cm", label: "centimetre" },
  { value: "m", label: "metre" },
  { value: "in", label: "inch" },
  { value: "ft", label: "feet" },
];

const PRODUCT_AVAILABILITY_DATA: CheckboxRadioSelectData<ProductAvailability> =
  [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
    { value: "Pre-order", label: "Pre-order" },
    { value: "Discontinued", label: "Discontinued" },
    { value: "Other", label: "Other" },
  ];

const MEMORY_UNIT_SELECT_INPUT_DATA: CheckboxRadioSelectData = [
  { value: "KB", label: "kilobyte" },
  { value: "MB", label: "megabyte" },
  { value: "GB", label: "gigabyte" },
  { value: "TB", label: "terabyte" },
];

const MEMORY_UNIT_DATA: CheckboxRadioSelectData<MemoryUnit> = [
  { value: "KB", label: "kilobyte" },
  { value: "MB", label: "megabyte" },
  { value: "GB", label: "gigabyte" },
  { value: "TB", label: "terabyte" },
];

const MOTHERBOARD_FORM_FACTOR_DATA: CheckboxRadioSelectData<
  MotherboardFormFactor
> = [
  { value: "Micro ATX", label: "Micro ATX" },
  { value: "Mini ITX", label: "Mini ITX" },
  { value: "E-ATX", label: "E-ATX" },
  { value: "ATX", label: "ATX" },
  { value: "XL-ATX", label: "XL-ATX" },
];

const MEMORY_TYPE_DATA: CheckboxRadioSelectData<MemoryType> = [
  { value: "DDR", label: "DDR" },
  { value: "DDR2", label: "DDR2" },
  { value: "DDR3", label: "DDR3" },
  { value: "DDR4", label: "DDR4" },
  { value: "DDR5", label: "DDR5" },
];

const STORAGE_TYPE_DATA: CheckboxRadioSelectData<StorageType> = [
  { value: "HDD", label: "HDD" },
  { value: "SSD", label: "SSD" },
  { value: "SSHD", label: "SSHD" },
  { value: "Other", label: "Other" },
];

const STORAGE_FORM_FACTOR_DATA: CheckboxRadioSelectData<StorageFormFactor> = [
  { value: '2.5"', label: '2.5"' },
  { value: '3.5"', label: '3.5"' },
  { value: "M.2 2280", label: "M.2 2280" },
  { value: "M.2 22110", label: "M.2 22110" },
  { value: "M.2 2242", label: "M.2 2242" },
  { value: "M.2 2230", label: "M.2 2230" },
  { value: "mSATA", label: "mSATA" },
  { value: "U.2", label: "U.2" },
  { value: "Other", label: "Other" },
];

const STORAGE_INTERFACE_DATA: CheckboxRadioSelectData<StorageInterface> = [
  { value: "SATA III", label: "SATA III" },
  { value: "M.2", label: "M.2" },
  { value: "NVMe", label: "NVMe" },
  { value: "PCIe", label: "PCIe" },
  { value: "SATA-Express", label: "SATA-Express" },
  { value: "U.2", label: "U.2" },
  { value: "mSATA", label: "mSATA" },
  { value: "Other", label: "Other" },
];

const PSU_EFFICIENCY_RATING_DATA: CheckboxRadioSelectData<PsuEfficiency> = [
  { value: "80+", label: "80+" },
  { value: "80+ Bronze", label: "80+ Bronze" },
  { value: "80+ Silver", label: "80+ Silver" },
  { value: "80+ Gold", label: "80+ Gold" },
  { value: "80+ Platinum", label: "80+ Platinum" },
  { value: "80+ Titanium", label: "80+ Titanium" },
];

const PSU_FORM_FACTOR_DATA: CheckboxRadioSelectData<PsuFormFactor> = [
  { value: "ATX", label: "ATX" },
  { value: "SFX", label: "SFX" },
  { value: "SFX-L", label: "SFX-L" },
  { value: "TFX", label: "TFX" },
  { value: "Flex ATX", label: "Flex ATX" },
  { value: "Other", label: "Other" },
];

const PSU_MODULARITY_DATA: CheckboxRadioSelectData<PsuModularity> = [
  { value: "Full", label: "Full" },
  { value: "Semi", label: "Semi" },
  { value: "None", label: "None" },
  { value: "Other", label: "Other" },
];

const CASE_TYPE_DATA: CheckboxRadioSelectData<CaseType> = [
  { value: "Mid Tower", label: "Mid Tower" },
  { value: "Full Tower", label: "Full Tower" },
  { value: "Mini Tower", label: "Mini Tower" },
  { value: "Cube", label: "Cube" },
  { value: "Slim", label: "Slim" },
  { value: "Desktop", label: "Desktop" },
  { value: "Other", label: "Other" },
];

const CASE_SIDE_PANEL_DATA: CheckboxRadioSelectData<CaseSidePanel> = [
  { value: "Windowed", label: "Windowed" },
  { value: "Solid", label: "Solid" },
];

const DISPLAY_PANEL_TYPE_DATA: CheckboxRadioSelectData<DisplayPanelType> = [
  { value: "IPS", label: "IPS" },
  { value: "TN", label: "TN" },
  { value: "VA", label: "VA" },
  { value: "OLED", label: "OLED" },
  { value: "QLED", label: "QLED" },
  { value: "Other", label: "Other" },
];

const KEYBOARD_SWITCH_DATA: CheckboxRadioSelectData<KeyboardSwitch> = [
  { value: "Cherry MX Red", label: "Cherry MX Red" },
  { value: "Cherry MX Blue", label: "Cherry MX Blue" },
  { value: "Cherry MX Brown", label: "Cherry MX Brown" },
  { value: "Cherry MX Silent Red", label: "Cherry MX Silent Red" },
  { value: "Cherry MX Black", label: "Cherry MX Black" },
  { value: "Cherry MX Clear", label: "Cherry MX Clear" },
  { value: "Membrane", label: "Membrane" },
  { value: "Other", label: "Other" },
];

const KEYBOARD_LAYOUT_DATA: CheckboxRadioSelectData<KeyboardLayout> = [
  { value: "QWERTY", label: "QWERTY" },
  { value: "CARPALX", label: "CARPALX" },
  { value: "Colemak", label: "Colemak" },
  { value: "Dvorak", label: "Dvorak" },
  { value: "HHKB", label: "HHKB" },
  { value: "NORMAN", label: "NORMAN" },
  { value: "Workman", label: "Workman" },
  { value: "Other", label: "Other" },
];

const KEYBOARD_BACKLIGHT_DATA: CheckboxRadioSelectData<KeyboardBacklight> = [
  { value: "RGB", label: "RGB" },
  { value: "Single Color", label: "Single Color" },
  { value: "None", label: "None" },
];

const PERIPHERALS_INTERFACE_DATA: CheckboxRadioSelectData<
  PeripheralsInterface
> = [
  { value: "USB", label: "USB" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "PS/2", label: "PS/2" },
  { value: "Wi-Fi", label: "Wi-Fi" },
  { value: "Other", label: "Other" },
];

const MOUSE_SENSOR_DATA: CheckboxRadioSelectData<MouseSensor> = [
  { value: "Optical", label: "Optical" },
  { value: "Laser", label: "Laser" },
  { value: "Infrared", label: "Infrared" },
  { value: "Other", label: "Other" },
];

const HEADPHONE_TYPE_DATA: CheckboxRadioSelectData<HeadphoneType> = [
  { value: "Over-ear", label: "Over-ear" },
  { value: "On-ear", label: "On-ear" },
  { value: "In-ear", label: "In-ear" },
  { value: "Other", label: "Other" },
];

const HEADPHONE_INTERFACE_DATA: CheckboxRadioSelectData<HeadphoneInterface> = [
  { value: "3.5 mm", label: "3.5 mm" },
  { value: "2.5 mm", label: "2.5 mm" },
  { value: "USB", label: "USB" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "MMCX", label: "MMCX" },
  { value: "Other", label: "Other" },
];

const SPEAKER_TYPE_DATA: CheckboxRadioSelectData<SpeakerType> = [
  { value: "2.0", label: "2.0" },
  { value: "2.1", label: "2.1" },
  { value: "3.1", label: "3.1" },
  { value: "4.1", label: "4.1" },
  { value: "5.1", label: "5.1" },
  { value: "7.1", label: "7.1" },
  { value: "Other", label: "Other" },
];

const SPEAKER_INTERFACE_DATA: CheckboxRadioSelectData<SpeakerInterface> = [
  { value: "3.5 mm", label: "3.5 mm" },
  { value: "2.5 mm", label: "2.5 mm" },
  { value: "USB", label: "USB" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Wi-Fi", label: "Wi-Fi" },
  { value: "RCA", label: "RCA" },
  { value: "TRS", label: "TRS" },
  { value: "Other", label: "Other" },
];

const MOBILE_OS_DATA: CheckboxRadioSelectData<MobileOs> = [
  { value: "iOS", label: "iOS" },
  { value: "Android", label: "Android" },
  { value: "Windows", label: "Windows" },
  { value: "Linux", label: "Linux" },
  { value: "Other", label: "Other" },
];

const WEBCAM_RESOLUTION_DATA: CheckboxRadioSelectData<WebcamResolution> = [
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
  { value: "1440p", label: "1440p" },
  { value: "4K", label: "4K" },
  { value: "Other", label: "Other" },
];

const WEBCAM_INTERFACE_DATA: CheckboxRadioSelectData<WebcamInterface> = [
  { value: "USB", label: "USB" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Wi-Fi", label: "Wi-Fi" },
  { value: "Other", label: "Other" },
];

const WEBCAM_FRAME_RATE_DATA: CheckboxRadioSelectData<WebcamFrameRate> = [
  { value: "30 fps", label: "30 fps" },
  { value: "60 fps", label: "60 fps" },
  { value: "120 fps", label: "120 fps" },
  { value: "240 fps", label: "240 fps" },
  { value: "Other", label: "Other" },
];

const WEBCAM_MICROPHONE_DATA: CheckboxRadioSelectData<WebcamMicrophone> = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const MICROPHONE_TYPE_DATA: CheckboxRadioSelectData<MicrophoneType> = [
  { value: "Condenser", label: "Condenser" },
  { value: "Dynamic", label: "Dynamic" },
  { value: "Ribbon", label: "Ribbon" },
  { value: "USB", label: "USB" },
  { value: "Wireless", label: "Wireless" },
  { value: "Other", label: "Other" },
];

const MICROPHONE_POLAR_PATTERN_DATA: CheckboxRadioSelectData<
  MicrophonePolarPattern
> = [
  { value: "Cardioid", label: "Cardioid" },
  { value: "Supercardioid", label: "Supercardioid" },
  { value: "Hypercardioid", label: "Hypercardioid" },
  { value: "Omnidirectional", label: "Omnidirectional" },
  { value: "Bidirectional", label: "Bidirectional" },
  { value: "Other", label: "Other" },
];

const MICROPHONE_INTERFACE_DATA: CheckboxRadioSelectData<MicrophoneInterface> =
  [
    { value: "XLR", label: "XLR" },
    { value: "USB", label: "USB" },
    { value: "3.5mm", label: "3.5mm" },
    { value: "Wireless", label: "Wireless" },
    { value: "Other", label: "Other" },
  ];

const PRODUCT_RATING_DATA: RatingKind[] = [
  "halfStar",
  "oneStar",
  "oneAndHalfStars",
  "twoStars",
  "twoAndHalfStars",
  "threeStars",
  "threeAndHalfStars",
  "fourStars",
  "fourAndHalfStars",
  "fiveStars",
];

/**
 * - contains the correct backend route name for each product category
 * - interpolated inside url string in the form request function
 * - ex: 'Central Processing Unit (CPU)' -> 'cpu'
 */
const PRODUCT_CATEGORY_ROUTE_NAME_OBJ: Record<ProductCategory, string> = {
  Accessory: "accessory",
  "Central Processing Unit (CPU)": "cpu",
  "Computer Case": "computer-case",
  "Desktop Computer": "desktop-computer",
  Display: "display",
  "Graphics Processing Unit (GPU)": "gpu",
  Headphone: "headphone",
  Keyboard: "keyboard",
  "Memory (RAM)": "ram",
  Mouse: "mouse",
  Microphone: "microphone",
  Motherboard: "motherboard",
  "Power Supply Unit (PSU)": "psu",
  Speaker: "speaker",
  Storage: "storage",
  Webcam: "webcam",
};

/**
 * - contains the correct object key for each product category
 * - used to ensure that the create button links to the correct product category page
 * - the object key is split from the location pathname
 */
const LOCATION_PRODUCT_CATEGORY_OBJ: Record<string, ProductCategory> = {
  accessory: "Accessory",
  cpu: "Central Processing Unit (CPU)",
  "computer-case": "Computer Case",
  display: "Display",
  gpu: "Graphics Processing Unit (GPU)",
  headphone: "Headphone",
  keyboard: "Keyboard",
  ram: "Memory (RAM)",
  mouse: "Mouse",
  microphone: "Microphone",
  motherboard: "Motherboard",
  psu: "Power Supply Unit (PSU)",
  speaker: "Speaker",
  storage: "Storage",
  webcam: "Webcam",
};

const CREATE_PRODUCT_MAX_STEPPER_POSITION = 4;

const CREATE_PRODUCT_MAX_IMG_SIZE = 1 * 1024 * 1024; // 1 MB

const CREATE_PRODUCT_MAX_IMG_AMOUNT = 3;

export {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  createProductStepperPages,
  DIMENSION_UNIT_DATA,
  DIMENSION_UNIT_SELECT_INPUT_DATA,
  DIMENSIONS_REGEX,
  DISPLAY_ASPECT_RATIO_REGEX,
  DISPLAY_PANEL_TYPE_DATA,
  FREQUENCY_RESPONSE_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  LARGE_INTEGER_REGEX,
  LOCATION_PRODUCT_CATEGORY_OBJ,
  MAX_ADDITIONAL_FIELDS_AMOUNT,
  MEDIUM_INTEGER_REGEX,
  MEMORY_TYPE_DATA,
  MEMORY_UNIT_DATA,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  MOUSE_SENSOR_DATA,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  PRODUCT_CATEGORY_PAGE_TABLE,
  PRODUCT_CATEGORY_ROUTE_NAME_OBJ,
  PRODUCT_RATING_DATA,
  PRODUCT_ROLE_RESOURCE_PATHS,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_TIMING_REGEX,
  RAM_VOLTAGE_REGEX,
  SMALL_INTEGER_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_INTERFACE_DATA,
  SPEAKER_TYPE_DATA,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  TABLET_CHIPSET_REGEX,
  USER_DEFINED_VALUE_REGEX,
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
  WEIGHT_UNIT_SELECT_INPUT_DATA,
};
