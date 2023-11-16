import {
  DATE_FULL_RANGE_REGEX,
  FLOAT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  INTEGER_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import {
  RadioGroupInputData,
  ResourceRoutePaths,
  SelectInputData,
} from '../../types';
import {
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnDateFullRangeValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnIntegerValidationText,
  returnRamTimingValidationText,
  returnSerialIdValidationText,
  returnSocketChipsetValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { CURRENCY_DATA } from '../benefits/constants';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';
import {
  CaseSidePanel,
  CaseType,
  DimensionUnit,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MobileOs,
  MonitorPanelType,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WeightUnit,
} from './create/types';

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
 * - /^[a-zA-Z0-9\s-]{2,30}$/;
 * - [a-zA-Z0-9\s-] matches any character between a-z, A-Z, 0-9, whitespace and -.
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const COLOR_VARIANT_REGEX = /^[a-zA-Z0-9\s-]{2,30}$/;

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

const MOBILE_CAMERA_REGEX = /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){1,12}$/;

const ACCESSORY_TYPE_REGEX = BRAND_REGEX;

const WEIGHT_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: 'g', label: 'gram' },
  { value: 'kg', label: 'kilogram' },
  { value: 'lb', label: 'pound' },
];

const WEIGHT_UNIT_DATA: WeightUnit[] = ['g', 'kg', 'lb'];

const DIMENSION_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: 'mm', label: 'millimetre' },
  { value: 'cm', label: 'centimetre' },
  { value: 'm', label: 'metre' },
  { value: 'in', label: 'inch' },
  { value: 'ft', label: 'feet' },
];

const DIMENSION_UNIT_DATA: DimensionUnit[] = ['mm', 'cm', 'm', 'in', 'ft'];

const PRODUCT_AVAILABILITY_DATA = [
  'In Stock',
  'Out of Stock',
  'Pre-order',
  'Discontinued',
  'Other',
];

const MEMORY_UNIT_SELECT_INPUT_DATA: SelectInputData = [
  { value: 'KB', label: 'kilobyte' },
  { value: 'MB', label: 'megabyte' },
  { value: 'GB', label: 'gigabyte' },
  { value: 'TB', label: 'terabyte' },
];

const MEMORY_UNIT_DATA: MemoryUnit[] = ['KB', 'MB', 'GB', 'TB'];

const MOTHERBOARD_FORM_FACTOR_DATA: MotherboardFormFactor[] = [
  'Micro ATX',
  'Mini ITX',
  'E-ATX',
  'ATX',
  'XL-ATX',
];

const MOTHERBOARD_MEMORY_TYPE_DATA: MemoryType[] = [
  'DDR',
  'DDR2',
  'DDR3',
  'DDR4',
  'DDR5',
];

const RAM_MEMORY_TYPE_DATA: MemoryType[] = [
  'DDR',
  'DDR2',
  'DDR3',
  'DDR4',
  'DDR5',
];

const STORAGE_TYPE_DATA: StorageType[] = [
  'HDD',
  'SSD',
  'SSHD',
  'NVMe SSD',
  'SATA SSD',
  'M.2 SSD',
  'Other',
];

const STORAGE_FORM_FACTOR_DATA: StorageFormFactor[] = [
  '2.5"',
  'M.2 2280',
  'M.2 22110',
  'M.2 2242',
  'M.2 2230',
  'Other',
];

const STORAGE_INTERFACE_DATA: StorageInterface[] = [
  'SATA III',
  'PCIe 3.0 x4',
  'PCIe 4.0 x4',
  'PCIe 3.0 x2',
  'PCIe 3.0 x1',
  'Other',
];

const PSU_EFFICIENCY_RATING_DATA: PsuEfficiency[] = [
  '80+',
  '80+ Standard',
  '80+ White',
  '80+ Bronze',
  '80+ Silver',
  '80+ Gold',
  '80+ Platinum',
  '80+ Titanium',
];

const PSU_FORM_FACTOR_DATA: PsuFormFactor[] = [
  'ATX',
  'SFX',
  'SFX-L',
  'TFX',
  'Flex ATX',
  'Other',
];

const PSU_MODULARITY_DATA: PsuModularity[] = ['Full', 'Semi', 'None', 'Other'];

const CASE_TYPE_DATA: CaseType[] = [
  'Mid Tower',
  'Full Tower',
  'Mini Tower',
  'Cube',
  'Slim',
  'Desktop',
  'Other',
];

const CASE_SIDE_PANEL_DATA: CaseSidePanel[] = ['Windowed', 'Solid'];

const MONITOR_PANEL_TYPE_DATA: MonitorPanelType[] = [
  'IPS',
  'TN',
  'VA',
  'OLED',
  'QLED',
  'Other',
];

const KEYBOARD_SWITCH_DATA: KeyboardSwitch[] = [
  'Cherry MX Red',
  'Cherry MX Blue',
  'Cherry MX Brown',
  'Cherry MX Silent Red',
  'Cherry MX Black',
  'Cherry MX Clear',
  'Membrane',
  'Other',
];

const KEYBOARD_LAYOUT_DATA: KeyboardLayout[] = ['ANSI', 'ISO', 'Other'];

const KEYBOARD_BACKLIGHT_DATA: KeyboardBacklight[] = [
  'RGB',
  'Single Color',
  'None',
];

const PERIPHERALS_INTERFACE_DATA: PeripheralsInterface[] = [
  'USB',
  'Bluetooth',
  'Other',
];

const MOUSE_SENSOR_DATA: MouseSensor[] = [
  'Optical',
  'Laser',
  'Infrared',
  'Other',
];

const HEADPHONE_TYPE_DATA: HeadphoneType[] = [
  'Over-ear',
  'On-ear',
  'In-ear',
  'Other',
];

const HEADPHONE_INTERFACE_DATA: HeadphoneInterface[] = [
  '3.5 mm',
  '2.5 mm',
  'USB',
  'Bluetooth',
  'Other',
];

const SPEAKER_TYPE_DATA: SpeakerType[] = [
  '2.0',
  '2.1',
  '3.1',
  '4.1',
  '5.1',
  '7.1',
  'Other',
];

const SPEAKER_INTERFACE_DATA: SpeakerInterface[] = [
  '3.5 mm',
  '2.5 mm',
  'USB',
  'Bluetooth',
  'Other',
];

const MOBILE_OS_DATA: MobileOs[] = [
  'iOS',
  'Android',
  'Windows',
  'Linux',
  'Other',
];

const CREATE_PRODUCT_MAX_STEPPER_POSITION = 4;

const CREATE_PRODUCT_MAX_IMG_SIZE = 1 * 1024 * 1024; // 1MB

const CREATE_PRODUCT_MAX_IMG_AMOUNT = 3;

const CREATE_PRODUCT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Product Overview',
    ariaLabel:
      'Enter brand, model, price, description, currency, availability, quantity, weight, dimensions and additional details',
  },
  {
    description: 'Product Specifications',
    ariaLabel: 'Enter product specifications',
  },
  {
    description: 'Upload Images',
    ariaLabel: 'Select up to 3 images of product to upload',
  },
  {
    description: 'Review and Proceed',
    ariaLabel: 'Review accuracy of information and proceed',
  },
];

const PRODUCTS_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Username',
    value: 'username',
    inputKind: 'textInput',
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: 'Created Date',
    value: 'createdAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Updated Date',
    value: 'updatedAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  // page 1
  {
    label: 'Brand',
    value: 'brand',
    inputKind: 'textInput',
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: 'Model',
    value: 'model',
    inputKind: 'textInput',
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: 'Price',
    value: 'price',
    inputKind: 'textInput',
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Description',
    value: 'description',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Currency',
    value: 'currency',
    inputKind: 'selectInput',
    selectData: CURRENCY_DATA,
  },
  {
    label: 'Availability',
    value: 'availability',
    inputKind: 'selectInput',
    selectData: PRODUCT_AVAILABILITY_DATA,
  },
  {
    label: 'Quantity',
    value: 'quantity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Weight',
    value: 'weight',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Weight Unit',
    value: 'weightUnit',
    inputKind: 'selectInput',
    selectData: WEIGHT_UNIT_DATA,
  },
  {
    label: 'Additional Details',
    value: 'additionalDetails',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },

  // page 2

  // page 2 -> cpu
  {
    label: 'CPU Socket',
    value: 'socket',
    inputKind: 'textInput',
    regex: CPU_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'CPU Frequency (GHz)',
    value: 'frequency',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'CPU Cores',
    value: 'cores',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'CPU L1 Cache',
    value: 'l1Cache',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'CPU L1 Cache Unit',
    value: 'l1CacheUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'CPU L2 Cache',
    value: 'l2Cache',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'CPU L2 Cache Unit',
    value: 'l2CacheUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'CPU L3 Cache',
    value: 'l3Cache',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'CPU L3 Cache Unit',
    value: 'l3CacheUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },

  // page 2 -> gpu
  {
    label: 'GPU Chipset',
    value: 'chipset',
    inputKind: 'textInput',
    regex: GPU_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'GPU Memory (GB)',
    value: 'memory',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'GPU Core Clock (MHz)',
    value: 'coreClock',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'GPU Boost Clock (MHz)',
    value: 'boostClock',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'GPU TDP (W)',
    value: 'tdp',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },

  // page 2 -> motherboard
  {
    label: 'Motherboard Socket',
    value: 'socket',
    inputKind: 'textInput',
    regex: MOTHERBOARD_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'Motherboard Chipset',
    value: 'chipset',
    inputKind: 'textInput',
    regex: MOTHERBOARD_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'Motherboard Form Factor',
    value: 'formFactor',
    inputKind: 'selectInput',
    selectData: MOTHERBOARD_FORM_FACTOR_DATA,
  },
  {
    label: 'Motherboard Memory Max',
    value: 'memoryMax',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard Memory Max Unit',
    value: 'memoryMaxUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'Motherboard Memory Slots',
    value: 'memorySlots',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard Memory Type',
    value: 'memoryType',
    inputKind: 'selectInput',
    selectData: MOTHERBOARD_MEMORY_TYPE_DATA,
  },
  {
    label: 'Motherboard SATA Ports',
    value: 'sataPorts',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard M.2 Slots',
    value: 'm2Slots',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard PCIe 3.0 Slots',
    value: 'pcie3Slots',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard PCIe 4.0 Slots',
    value: 'pcie4Slots',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Motherboard PCIe 5.0 Slots',
    value: 'pcie5Slots',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },

  // page 2 -> ram
  {
    label: 'RAM Data Rate (MT/s)',
    value: 'dataRate',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'RAM Modules Quantity',
    value: 'modulesQuantity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'RAM Mobules Capacity',
    value: 'modulesCapacity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'RAM Modules Capacity Unit',
    value: 'modulesCapacityUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'RAM Memory Type',
    value: 'memoryType',
    inputKind: 'selectInput',
    selectData: RAM_MEMORY_TYPE_DATA,
  },
  {
    label: 'RAM Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'RAM Voltage (V)',
    value: 'voltage',
    inputKind: 'numberInput',
    regex: FLOAT_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'RAM Timing',
    value: 'timing',
    inputKind: 'textInput',
    regex: RAM_TIMING_REGEX,
    regexValidationFn: returnRamTimingValidationText,
  },

  // page 2 -> storage

  {
    label: 'Storage Type',
    value: 'storageType',
    inputKind: 'selectInput',
    selectData: STORAGE_TYPE_DATA,
  },
  {
    label: 'Storage Capacity',
    value: 'capacity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Storage Capacity Unit',
    value: 'capacityUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'Storage Cache',
    value: 'cache',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Storage Cache Unit',
    value: 'cacheUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'Storage Form Factor',
    value: 'formFactor',
    inputKind: 'selectInput',
    selectData: STORAGE_FORM_FACTOR_DATA,
  },
  {
    label: 'Storage Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: STORAGE_INTERFACE_DATA,
  },

  // page 2 -> psu
  {
    label: 'PSU Wattage (W)',
    value: 'wattage',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'PSU Efficiency',
    value: 'efficiency',
    inputKind: 'selectInput',
    selectData: PSU_EFFICIENCY_RATING_DATA,
  },
  {
    label: 'PSU Form Factor',
    value: 'formFactor',
    inputKind: 'selectInput',
    selectData: PSU_FORM_FACTOR_DATA,
  },
  {
    label: 'PSU Modularity',
    value: 'modularity',
    inputKind: 'selectInput',
    selectData: PSU_MODULARITY_DATA,
  },

  // page 2 -> case
  {
    label: 'Case Type',
    value: 'caseType',
    inputKind: 'selectInput',
    selectData: CASE_TYPE_DATA,
  },
  {
    label: 'Case Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Case Side Panel',
    value: 'sidePanel',
    inputKind: 'selectInput',
    selectData: CASE_SIDE_PANEL_DATA,
  },

  // page 2 -> monitor
  {
    label: 'Monitor Size (in)',
    value: 'size',
    inputKind: 'numberInput',
    regex: FLOAT_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Monitor Horizontal Resolution',
    value: 'horizontalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Monitor Vertical Resolution',
    value: 'verticalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Monitor Refresh Rate (Hz)',
    value: 'refreshRate',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Monitor Panel Type',
    value: 'panelType',
    inputKind: 'selectInput',
    selectData: MONITOR_PANEL_TYPE_DATA,
  },
  {
    label: 'Monitor Response Time (ms)',
    value: 'responseTime',
    inputKind: 'numberInput',
    regex: FLOAT_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Monitor Aspect Ratio',
    value: 'aspectRatio',
    inputKind: 'textInput',
    regex: DISPLAY_ASPECT_RATIO_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> keyboard
  {
    label: 'Keyboard Switch',
    value: 'switch',
    inputKind: 'selectInput',
    selectData: KEYBOARD_SWITCH_DATA,
  },
  {
    label: 'Keyboard Layout',
    value: 'layout',
    inputKind: 'selectInput',
    selectData: KEYBOARD_LAYOUT_DATA,
  },
  {
    label: 'Keyboard Backlight',
    value: 'backlight',
    inputKind: 'selectInput',
    selectData: KEYBOARD_BACKLIGHT_DATA,
  },
  {
    label: 'Keyboard Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: PERIPHERALS_INTERFACE_DATA,
  },

  // page 2 -> mouse
  {
    label: 'Mouse Sensor',
    value: 'sensor',
    inputKind: 'selectInput',
    selectData: MOUSE_SENSOR_DATA,
  },
  {
    label: 'Mouse DPI',
    value: 'dpi',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Mouse Buttons',
    value: 'buttons',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Mouse Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Mouse Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: PERIPHERALS_INTERFACE_DATA,
  },

  // page 2 -> headphone
  {
    label: 'Headphone Type',
    value: 'headphoneType',
    inputKind: 'selectInput',
    selectData: HEADPHONE_TYPE_DATA,
  },
  {
    label: 'Headphone Driver (mm)',
    value: 'driver',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Headphone Frequency Response',
    value: 'frequencyResponse',
    inputKind: 'textInput',
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Headphone Impedance (Ohm Ω)',
    value: 'impedance',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Headphone Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Headphone Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: HEADPHONE_INTERFACE_DATA,
  },

  // page 2 -> speaker
  {
    label: 'Speaker Type',
    value: 'speakerType',
    inputKind: 'selectInput',
    selectData: SPEAKER_TYPE_DATA,
  },
  {
    label: 'Speaker Total Wattage (W)',
    value: 'totalWattage',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Speaker Frequency Response',
    value: 'frequencyResponse',
    inputKind: 'textInput',
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Speaker Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Speaker Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: SPEAKER_INTERFACE_DATA,
  },

  // page 2 -> smartphone
  {
    label: 'Smartphone OS',
    value: 'os',
    inputKind: 'selectInput',
    selectData: MOBILE_OS_DATA,
  },
  {
    label: 'Smartphone Chipset',
    value: 'chipset',
    inputKind: 'textInput',
    regex: SMARTPHONE_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'Smartphone Display (in)',
    value: 'display',
    inputKind: 'numberInput',
    regex: FLOAT_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Smartphone Horizontal Resolution',
    value: 'horizontalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Smartphone Vertical Resolution',
    value: 'verticalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Smartphone RAM Capacity',
    value: 'ramCapacity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Smartphone RAM Capacity Unit',
    value: 'ramCapacityUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'Smartphone Storage (GB)',
    value: 'storage',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Smartphone Battery (mAh)',
    value: 'battery',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Smartphone Camera',
    value: 'camera',
    inputKind: 'textInput',
    regex: MOBILE_CAMERA_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Smartphone Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> tablet
  {
    label: 'Tablet OS',
    value: 'os',
    inputKind: 'selectInput',
    selectData: MOBILE_OS_DATA,
  },
  {
    label: 'Tablet Chipset',
    value: 'chipset',
    inputKind: 'textInput',
    regex: TABLET_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: 'Tablet Display (in)',
    value: 'display',
    inputKind: 'numberInput',
    regex: FLOAT_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Tablet Horizontal Resolution',
    value: 'horizontalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Tablet Vertical Resolution',
    value: 'verticalResolution',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Tablet RAM Capacity',
    value: 'ramCapacity',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Tablet RAM Capacity Unit',
    value: 'ramCapacityUnit',
    inputKind: 'selectInput',
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: 'Tablet Storage (GB)',
    value: 'storage',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Tablet Battery (mAh)',
    value: 'battery',
    inputKind: 'numberInput',
    regex: INTEGER_REGEX,
    regexValidationFn: returnIntegerValidationText,
  },
  {
    label: 'Tablet Camera',
    value: 'camera',
    inputKind: 'textInput',
    regex: MOBILE_CAMERA_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Tablet Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },

  // page 2 -> accessory
  /**
   * type AccessorySpecifications = {
  accessoryType: string; // Headphones, Speakers, etc.
  color: string; // Black, White, etc.
  interface: PeripheralsInterface; // USB, Bluetooth, etc.
};
   */
  {
    label: 'Accessory Type',
    value: 'accessoryType',
    inputKind: 'textInput',
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: 'Accessory Color',
    value: 'color',
    inputKind: 'textInput',
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: 'Accessory Interface',
    value: 'interface',
    inputKind: 'selectInput',
    selectData: PERIPHERALS_INTERFACE_DATA,
  },
];

const PRODUCTS_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: 'actions/dashboard/product',
  admin: 'actions/dashboard/product',
  employee: 'actions/dashboard/product/user',
};

export {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_SOCKET_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  DIMENSION_UNIT_SELECT_INPUT_DATA,
  DISPLAY_ASPECT_RATIO_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  MONITOR_PANEL_TYPE_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  MOUSE_SENSOR_DATA,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  PRODUCTS_QUERY_DATA,
  PRODUCTS_RESOURCE_PATHS,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_INTERFACE_DATA,
  SPEAKER_TYPE_DATA,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  TABLET_CHIPSET_REGEX,
  WEIGHT_UNIT_SELECT_INPUT_DATA,
};
