import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths, SelectInputData } from "../../types";
import {
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnCpuFrequencyValidationText,
  returnDateFullRangeValidationText,
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnFrequencyResponseValidationText,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnRamTimingValidationText,
  returnRamVoltageValidationText,
  returnSerialIdValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnUsernameRegexValidationText,
  returnWeightValidationText,
} from "../../utils";
import { CURRENCY_DATA } from "../benefits/constants";
import { ProductCategory } from "../dashboard/types";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
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
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
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

const WEIGHT_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: "g", label: "gram" },
  { value: "kg", label: "kilogram" },
  { value: "lb", label: "pound" },
];

const WEIGHT_UNIT_DATA: WeightUnit[] = ["g", "kg", "lb"];

const DIMENSION_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: "mm", label: "millimetre" },
  { value: "cm", label: "centimetre" },
  { value: "m", label: "metre" },
  { value: "in", label: "inch" },
  { value: "ft", label: "feet" },
];

const DIMENSION_UNIT_DATA: DimensionUnit[] = ["mm", "cm", "m", "in", "ft"];

const PRODUCT_AVAILABILITY_DATA = [
  "In Stock",
  "Out of Stock",
  "Pre-order",
  "Discontinued",
  "Other",
];

const MEMORY_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: "KB", label: "kilobyte" },
  { value: "MB", label: "megabyte" },
  { value: "GB", label: "gigabyte" },
  { value: "TB", label: "terabyte" },
];

const MEMORY_UNIT_DATA: MemoryUnit[] = ["KB", "MB", "GB", "TB"];

const MOTHERBOARD_FORM_FACTOR_DATA: MotherboardFormFactor[] = [
  "Micro ATX",
  "Mini ITX",
  "E-ATX",
  "ATX",
  "XL-ATX",
];

const MOTHERBOARD_MEMORY_TYPE_DATA: MemoryType[] = [
  "DDR",
  "DDR2",
  "DDR3",
  "DDR4",
  "DDR5",
];

const RAM_MEMORY_TYPE_DATA: MemoryType[] = ["DDR", "DDR2", "DDR3", "DDR4", "DDR5"];

const STORAGE_TYPE_DATA: StorageType[] = ["HDD", "SSD", "SSHD", "Other"];

const STORAGE_FORM_FACTOR_DATA: StorageFormFactor[] = [
  '2.5"',
  '3.5"',
  "M.2 2280",
  "M.2 22110",
  "M.2 2242",
  "M.2 2230",
  "mSATA",
  "U.2",
  "Other",
];

const STORAGE_INTERFACE_DATA: StorageInterface[] = [
  "SATA III",
  "M.2",
  "NVMe",
  "PCIe",
  "SATA-Express",
  "U.2",
  "mSATA",
  "Other",
];

const PSU_EFFICIENCY_RATING_DATA: PsuEfficiency[] = [
  "80+",
  "80+ Bronze",
  "80+ Silver",
  "80+ Gold",
  "80+ Platinum",
  "80+ Titanium",
];

const PSU_FORM_FACTOR_DATA: PsuFormFactor[] = [
  "ATX",
  "SFX",
  "SFX-L",
  "TFX",
  "Flex ATX",
  "Other",
];

const PSU_MODULARITY_DATA: PsuModularity[] = ["Full", "Semi", "None", "Other"];

const CASE_TYPE_DATA: CaseType[] = [
  "Mid Tower",
  "Full Tower",
  "Mini Tower",
  "Cube",
  "Slim",
  "Desktop",
  "Other",
];

const CASE_SIDE_PANEL_DATA: CaseSidePanel[] = ["Windowed", "Solid"];

const DISPLAY_PANEL_TYPE_DATA: DisplayPanelType[] = [
  "IPS",
  "TN",
  "VA",
  "OLED",
  "QLED",
  "Other",
];

const KEYBOARD_SWITCH_DATA: KeyboardSwitch[] = [
  "Cherry MX Red",
  "Cherry MX Blue",
  "Cherry MX Brown",
  "Cherry MX Silent Red",
  "Cherry MX Black",
  "Cherry MX Clear",
  "Membrane",
  "Other",
];

const KEYBOARD_LAYOUT_DATA: KeyboardLayout[] = [
  "QWERTY",
  "CARPALX",
  "Colemak",
  "Dvorak",
  "HHKB",
  "NORMAN",
  "Workman",
  "Other",
];

const KEYBOARD_BACKLIGHT_DATA: KeyboardBacklight[] = ["RGB", "Single Color", "None"];

const PERIPHERALS_INTERFACE_DATA: PeripheralsInterface[] = [
  "USB",
  "Bluetooth",
  "PS/2",
  "Wi-Fi",
  "Other",
];

const MOUSE_SENSOR_DATA: MouseSensor[] = ["Optical", "Laser", "Infrared", "Other"];

const HEADPHONE_TYPE_DATA: HeadphoneType[] = ["Over-ear", "On-ear", "In-ear", "Other"];

const HEADPHONE_INTERFACE_DATA: HeadphoneInterface[] = [
  "3.5 mm",
  "2.5 mm",
  "USB",
  "Bluetooth",
  "MMCX",
  "Other",
];

const SPEAKER_TYPE_DATA: SpeakerType[] = [
  "2.0",
  "2.1",
  "3.1",
  "4.1",
  "5.1",
  "7.1",
  "Other",
];

const SPEAKER_INTERFACE_DATA: SpeakerInterface[] = [
  "3.5 mm",
  "2.5 mm",
  "USB",
  "Bluetooth",
  "Wi-Fi",
  "RCA",
  "TRS",
  "Other",
];

const MOBILE_OS_DATA: MobileOs[] = ["iOS", "Android", "Windows", "Linux", "Other"];

const WEBCAM_RESOLUTION_DATA: WebcamResolution[] = [
  "720p",
  "1080p",
  "1440p",
  "4K",
  "Other",
];

const WEBCAM_INTERFACE_DATA: WebcamInterface[] = ["USB", "Bluetooth", "Wi-Fi", "Other"];

const WEBCAM_FRAME_RATE_DATA: WebcamFrameRate[] = [
  "30 fps",
  "60 fps",
  "120 fps",
  "240 fps",
  "Other",
];

const WEBCAM_MICROPHONE_DATA: WebcamMicrophone[] = ["Yes", "No"];

const MICROPHONE_TYPE_DATA: MicrophoneType[] = [
  "Condenser",
  "Dynamic",
  "Ribbon",
  "USB",
  "Wireless",
  "Other",
];

const MICROPHONE_POLAR_PATTERN_DATA: MicrophonePolarPattern[] = [
  "Cardioid",
  "Supercardioid",
  "Hypercardioid",
  "Omnidirectional",
  "Bidirectional",
  "Other",
];

const MICROPHONE_INTERFACE_DATA: MicrophoneInterface[] = [
  "XLR",
  "USB",
  "3.5mm",
  "Wireless",
  "Other",
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
  Laptop: "laptop",
  "Memory (RAM)": "ram",
  Mouse: "mouse",
  Microphone: "microphone",
  Motherboard: "motherboard",
  "Power Supply Unit (PSU)": "psu",
  Smartphone: "smartphone",
  Speaker: "speaker",
  Storage: "storage",
  Tablet: "tablet",
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
  "desktop-computer": "Desktop Computer",
  display: "Display",
  gpu: "Graphics Processing Unit (GPU)",
  headphone: "Headphone",
  keyboard: "Keyboard",
  laptop: "Laptop",
  ram: "Memory (RAM)",
  mouse: "Mouse",
  microphone: "Microphone",
  motherboard: "Motherboard",
  psu: "Power Supply Unit (PSU)",
  smartphone: "Smartphone",
  speaker: "Speaker",
  storage: "Storage",
  tablet: "Tablet",
  webcam: "Webcam",
};

const CREATE_PRODUCT_MAX_STEPPER_POSITION = 4;

const CREATE_PRODUCT_MAX_IMG_SIZE = 1 * 1024 * 1024; // 1MB

const CREATE_PRODUCT_MAX_IMG_AMOUNT = 3;

const CREATE_PRODUCT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Product Overview",
    ariaLabel:
      "Enter brand, model, price, description, currency, availability, quantity, weight, dimensions and additional details",
  },
  {
    description: "Product Specifications",
    ariaLabel: "Enter product specifications",
  },
  {
    description: "Upload Images",
    ariaLabel: "Select up to 3 images of product to upload",
  },
  {
    description: "Review and Proceed",
    ariaLabel: "Review accuracy of information and proceed",
  },
];

const PRODUCTS_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Brand",
    value: "brand",
    inputKind: "textInput",
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: "Model",
    value: "model",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Price",
    value: "price",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Description",
    value: "description",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Currency",
    value: "currency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Availability",
    value: "availability",
    inputKind: "selectInput",
    selectData: PRODUCT_AVAILABILITY_DATA,
  },
  {
    label: "Quantity",
    value: "quantity",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Weight",
    value: "weight",
    inputKind: "numberInput",
    regex: WEIGHT_REGEX,
    regexValidationFn: returnWeightValidationText,
  },
  {
    label: "Weight Unit",
    value: "weightUnit",
    inputKind: "selectInput",
    selectData: WEIGHT_UNIT_DATA,
  },
  {
    label: "Length",
    value: "length",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Length Unit",
    value: "lengthUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Width",
    value: "width",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Width Unit",
    value: "widthUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Height",
    value: "height",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Height Unit",
    value: "heightUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Additional Details",
    value: "additionalDetails",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },

  // page 2

  // page 2 -> cpu
  {
    label: "CPU Socket",
    value: "cpuSocket",
    inputKind: "textInput",
    regex: CPU_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "CPU Frequency (GHz)",
    value: "cpuFrequency",
    inputKind: "numberInput",
    regex: CPU_FREQUENCY_REGEX,
    regexValidationFn: returnCpuFrequencyValidationText,
  },
  {
    label: "CPU Cores",
    value: "cpuCores",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "CPU L1 Cache",
    value: "cpuL1Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L1 Cache Unit",
    value: "cpuL1CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "CPU L2 Cache",
    value: "cpuL2Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L2 Cache Unit",
    value: "cpuL2CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "CPU L3 Cache",
    value: "cpuL3Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L3 Cache Unit",
    value: "cpuL3CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },

  // page 2 -> gpu
  {
    label: "GPU Chipset",
    value: "cpuChipset",
    inputKind: "textInput",
    regex: GPU_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "GPU Memory (GB)",
    value: "gpuMemory",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "GPU Core Clock (MHz)",
    value: "gpuCoreClock",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "GPU Boost Clock (MHz)",
    value: "gpuBoostClock",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "GPU TDP (W)",
    value: "gpuTdp",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },

  // page 2 -> motherboard
  {
    label: "Motherboard Socket",
    value: "motherboardSocket",
    inputKind: "textInput",
    regex: MOTHERBOARD_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Motherboard Chipset",
    value: "motherboardChipset",
    inputKind: "textInput",
    regex: MOTHERBOARD_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Motherboard Form Factor",
    value: "motherboardFormFactor",
    inputKind: "selectInput",
    selectData: MOTHERBOARD_FORM_FACTOR_DATA,
  },
  {
    label: "Motherboard Memory Max",
    value: "motherboardMemoryMax",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Motherboard Memory Max Unit",
    value: "motherboardMemoryMaxUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Motherboard Memory Slots",
    value: "motherboardMemorySlots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard Memory Type",
    value: "motherboardMemoryType",
    inputKind: "selectInput",
    selectData: MOTHERBOARD_MEMORY_TYPE_DATA,
  },
  {
    label: "Motherboard SATA Ports",
    value: "motherboardSataPorts",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard M.2 Slots",
    value: "motherboardM2Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 3.0 Slots",
    value: "motherboardPcie3Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 4.0 Slots",
    value: "motherboardPcie4Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 5.0 Slots",
    value: "motherboardPcie5Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },

  // page 2 -> ram
  {
    label: "RAM Data Rate (MT/s)",
    value: "ramDataRate",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "RAM Modules Quantity",
    value: "ramModulesQuantity",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "RAM Modules Capacity",
    value: "ramModulesCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "RAM Modules Capacity Unit",
    value: "ramModulesCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "RAM Memory Type",
    value: "ramMemoryType",
    inputKind: "selectInput",
    selectData: RAM_MEMORY_TYPE_DATA,
  },
  {
    label: "RAM Color",
    value: "ramColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "RAM Voltage (V)",
    value: "ramVoltage",
    inputKind: "numberInput",
    regex: RAM_VOLTAGE_REGEX,
    regexValidationFn: returnRamVoltageValidationText,
  },
  {
    label: "RAM Timing",
    value: "ramTiming",
    inputKind: "textInput",
    regex: RAM_TIMING_REGEX,
    regexValidationFn: returnRamTimingValidationText,
  },

  // page 2 -> storage

  {
    label: "Storage Type",
    value: "storageType",
    inputKind: "selectInput",
    selectData: STORAGE_TYPE_DATA,
  },
  {
    label: "Storage Capacity",
    value: "storageCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Storage Capacity Unit",
    value: "storageCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Storage Cache",
    value: "storageCache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Storage Cache Unit",
    value: "storageCacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Storage Form Factor",
    value: "storageFormFactor",
    inputKind: "selectInput",
    selectData: STORAGE_FORM_FACTOR_DATA,
  },
  {
    label: "Storage Interface",
    value: "storageInterface",
    inputKind: "selectInput",
    selectData: STORAGE_INTERFACE_DATA,
  },

  // page 2 -> psu
  {
    label: "PSU Wattage (W)",
    value: "psuWattage",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "PSU Efficiency",
    value: "psuEfficiency",
    inputKind: "selectInput",
    selectData: PSU_EFFICIENCY_RATING_DATA,
  },
  {
    label: "PSU Form Factor",
    value: "psuFormFactor",
    inputKind: "selectInput",
    selectData: PSU_FORM_FACTOR_DATA,
  },
  {
    label: "PSU Modularity",
    value: "psuModularity",
    inputKind: "selectInput",
    selectData: PSU_MODULARITY_DATA,
  },

  // page 2 -> case
  {
    label: "Case Type",
    value: "caseType",
    inputKind: "selectInput",
    selectData: CASE_TYPE_DATA,
  },
  {
    label: "Case Color",
    value: "caseColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Case Side Panel",
    value: "caseSidePanel",
    inputKind: "selectInput",
    selectData: CASE_SIDE_PANEL_DATA,
  },

  // page 2 -> display
  {
    label: "Display Size (in)",
    value: "displaySize",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Display Horizontal Resolution",
    value: "displayHorizontalResolution",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Display Vertical Resolution",
    value: "displayVerticalResolution",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Display Refresh Rate (Hz)",
    value: "displayRefreshRate",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Display Panel Type",
    value: "displayPanelType",
    inputKind: "selectInput",
    selectData: DISPLAY_PANEL_TYPE_DATA,
  },
  {
    label: "Display Response Time (ms)",
    value: "displayResponseTime",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Display Aspect Ratio",
    value: "displayAspectRatio",
    inputKind: "textInput",
    regex: DISPLAY_ASPECT_RATIO_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> keyboard
  {
    label: "Keyboard Switch",
    value: "keyboardSwitch",
    inputKind: "selectInput",
    selectData: KEYBOARD_SWITCH_DATA,
  },
  {
    label: "Keyboard Layout",
    value: "keyboardLayout",
    inputKind: "selectInput",
    selectData: KEYBOARD_LAYOUT_DATA,
  },
  {
    label: "Keyboard Backlight",
    value: "keyboardBacklight",
    inputKind: "selectInput",
    selectData: KEYBOARD_BACKLIGHT_DATA,
  },
  {
    label: "Keyboard Interface",
    value: "keyboardInterface",
    inputKind: "selectInput",
    selectData: PERIPHERALS_INTERFACE_DATA,
  },

  // page 2 -> mouse
  {
    label: "Mouse Sensor",
    value: "mouseSensor",
    inputKind: "selectInput",
    selectData: MOUSE_SENSOR_DATA,
  },
  {
    label: "Mouse DPI",
    value: "mouseDpi",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Mouse Buttons",
    value: "mouseButtons",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Mouse Color",
    value: "mouseColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Mouse Interface",
    value: "mouseInterface",
    inputKind: "selectInput",
    selectData: PERIPHERALS_INTERFACE_DATA,
  },

  // page 2 -> headphone
  {
    label: "Headphone Type",
    value: "headphoneType",
    inputKind: "selectInput",
    selectData: HEADPHONE_TYPE_DATA,
  },
  {
    label: "Headphone Driver (mm)",
    value: "headphoneDriver",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Headphone Frequency Response",
    value: "headphoneFrequencyResponse",
    inputKind: "textInput",
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Headphone Impedance (Ohm Ω)",
    value: "headphoneImpedance",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Headphone Color",
    value: "headphoneColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Headphone Interface",
    value: "headphoneInterface",
    inputKind: "selectInput",
    selectData: HEADPHONE_INTERFACE_DATA,
  },

  // page 2 -> speaker
  {
    label: "Speaker Type",
    value: "speakerType",
    inputKind: "selectInput",
    selectData: SPEAKER_TYPE_DATA,
  },
  {
    label: "Speaker Total Wattage (W)",
    value: "speakerTotalWattage",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Speaker Frequency Response",
    value: "speakerFrequencyResponse",
    inputKind: "textInput",
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Speaker Color",
    value: "speakerColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Speaker Interface",
    value: "speakerInterface",
    inputKind: "selectInput",
    selectData: SPEAKER_INTERFACE_DATA,
  },

  // page 2 -> smartphone
  {
    label: "Smartphone OS",
    value: "smartphoneOs",
    inputKind: "selectInput",
    selectData: MOBILE_OS_DATA,
  },
  {
    label: "Smartphone Chipset",
    value: "smartphoneChipset",
    inputKind: "textInput",
    regex: SMARTPHONE_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Smartphone Display (in)",
    value: "smartphoneDisplay",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Smartphone Horizontal Resolution",
    value: "smartphoneHorizontalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Smartphone Vertical Resolution",
    value: "smartphoneVerticalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Smartphone RAM Capacity",
    value: "smartphoneRamCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Smartphone RAM Capacity Unit",
    value: "smartphoneRamCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Smartphone Storage (GB)",
    value: "smartphoneStorage",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Smartphone Battery (mAh)",
    value: "smartphoneBattery",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Smartphone Camera",
    value: "smartphoneCamera",
    inputKind: "textInput",
    regex: MOBILE_CAMERA_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Smartphone Color",
    value: "smartphoneColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> tablet
  {
    label: "Tablet OS",
    value: "tabletOs",
    inputKind: "selectInput",
    selectData: MOBILE_OS_DATA,
  },
  {
    label: "Tablet Chipset",
    value: "tabletChipset",
    inputKind: "textInput",
    regex: TABLET_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Tablet Display (in)",
    value: "tabletDisplay",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Tablet Horizontal Resolution",
    value: "tabletHorizontalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet Vertical Resolution",
    value: "tabletVerticalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet RAM Capacity",
    value: "tabletRamCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet RAM Capacity Unit",
    value: "tabletRamCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Tablet Storage (GB)",
    value: "tabletStorage",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet Battery (mAh)",
    value: "tabletBattery",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Tablet Camera",
    value: "tabletCamera",
    inputKind: "textInput",
    regex: MOBILE_CAMERA_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Tablet Color",
    value: "tabletColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> accessory
  {
    label: "Accessory Type",
    value: "accessoryType",
    inputKind: "textInput",
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: "Accessory Color",
    value: "accessoryColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Accessory Interface",
    value: "accessoryInterface",
    inputKind: "selectInput",
    selectData: PERIPHERALS_INTERFACE_DATA,
  },

  // page 2 -> webcam
  {
    label: "Webcam Resolution",
    value: "webcamResolution",
    inputKind: "selectInput",
    selectData: WEBCAM_RESOLUTION_DATA,
  },
  {
    label: "Webcam Color",
    value: "webcamColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Webcam Interface",
    value: "webcamInterface",
    inputKind: "selectInput",
    selectData: WEBCAM_INTERFACE_DATA,
  },
  {
    label: "Webcam Microphone",
    value: "webcamMicrophone",
    inputKind: "selectInput",
    selectData: WEBCAM_MICROPHONE_DATA,
  },
  {
    label: "Webcam Frame Rate",
    value: "webcamFrameRate",
    inputKind: "selectInput",
    selectData: WEBCAM_FRAME_RATE_DATA,
  },

  // page 2 -> microphone
  {
    label: "Microphone Type",
    value: "microphoneType",
    inputKind: "selectInput",
    selectData: MICROPHONE_TYPE_DATA,
  },
  {
    label: "Microphone Polar Pattern",
    value: "microphonePolarPattern",
    inputKind: "selectInput",
    selectData: MICROPHONE_POLAR_PATTERN_DATA,
  },
  {
    label: "Microphone Frequency Response",
    value: "microphoneFrequencyResponse",
    inputKind: "textInput",
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnFrequencyResponseValidationText,
  },
  {
    label: "Microphone Color",
    value: "microphoneColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Microphone Interface",
    value: "microphoneInterface",
    inputKind: "selectInput",
    selectData: MICROPHONE_INTERFACE_DATA,
  },
];

const PRODUCTS_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: "product-category",
  admin: "product-category",
  employee: "product-category", // all roles have access to this resource
};

export {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
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
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_DATA,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  MOUSE_SENSOR_DATA,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  PRODUCT_CATEGORY_ROUTE_NAME_OBJ,
  PRODUCT_RATING_DATA,
  PRODUCTS_QUERY_DATA,
  PRODUCTS_RESOURCE_PATHS,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
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
