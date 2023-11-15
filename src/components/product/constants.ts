import { RadioGroupInputData, SelectInputData } from '../../types';
import { DescriptionObjectsArray } from '../wrappers';

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

const WEIGHT_UNIT_DATA: SelectInputData = [
  { value: 'g', label: 'gram' },
  { value: 'kg', label: 'kilogram' },
  { value: 'lb', label: 'pound' },
];

const DIMENSION_UNIT_DATA: SelectInputData = [
  { value: 'mm', label: 'millimetre' },
  { value: 'cm', label: 'centimetre' },
  { value: 'm', label: 'metre' },
  { value: 'in', label: 'inch' },
  { value: 'ft', label: 'feet' },
];

const PRODUCT_AVAILABILITY_DATA: RadioGroupInputData = [
  { value: 'In Stock', label: 'In Stock' },
  { value: 'Out of Stock', label: 'Out of Stock' },
  { value: 'Pre-order', label: 'Pre-order' },
  { value: 'Discontinued', label: 'Discontinued' },
  { value: 'Other', label: 'Other' },
];

const MEMORY_UNIT_DATA: SelectInputData = [
  { value: 'KB', label: 'kilobyte' },
  { value: 'MB', label: 'megabyte' },
  { value: 'GB', label: 'gigabyte' },
  { value: 'TB', label: 'terabyte' },
];

const MOTHERBOARD_FORM_FACTOR_DATA: SelectInputData = [
  { value: 'Micro ATX', label: 'Micro ATX' },
  { value: 'Mini ITX', label: 'Mini ITX' },
  { value: 'E-ATX', label: 'E-ATX' },
  { value: 'ATX', label: 'ATX' },
  { value: 'XL-ATX', label: 'XL-ATX' },
];

const MOTHERBOARD_MEMORY_TYPE_DATA: SelectInputData = [
  { value: 'DDR', label: 'DDR' },
  { value: 'DDR2', label: 'DDR2' },
  { value: 'DDR3', label: 'DDR3' },
  { value: 'DDR4', label: 'DDR4' },
  { value: 'DDR5', label: 'DDR5' },
];

const RAM_MEMORY_TYPE_DATA: SelectInputData = [
  { value: 'DDR', label: 'DDR' },
  { value: 'DDR2', label: 'DDR2' },
  { value: 'DDR3', label: 'DDR3' },
  { value: 'DDR4', label: 'DDR4' },
  { value: 'DDR5', label: 'DDR5' },
];

const STORAGE_TYPE_DATA: SelectInputData = [
  { value: 'HDD', label: 'HDD' },
  { value: 'SSD', label: 'SSD' },
  { value: 'SSHD', label: 'SSHD' },
  { value: 'NVMe SSD', label: 'NVMe SSD' },
  { value: 'SATA SSD', label: 'SATA SSD' },
  { value: 'M.2 SSD', label: 'M.2 SSD' },
  { value: 'Other', label: 'Other' },
];

const STORAGE_FORM_FACTOR_DATA: SelectInputData = [
  { value: '2.5"', label: '2.5"' },
  { value: 'M.2 2280', label: 'M.2 2280' },
  { value: 'M.2 22110', label: 'M.2 22110' },
  { value: 'M.2 2242', label: 'M.2 2242' },
  { value: 'M.2 2230', label: 'M.2 2230' },
  { value: 'Other', label: 'Other' },
];

const STORAGE_INTERFACE_DATA: SelectInputData = [
  { value: 'SATA III', label: 'SATA III' },
  { value: 'PCIe 3.0 x4', label: 'PCIe 3.0 x4' },
  { value: 'PCIe 4.0 x4', label: 'PCIe 4.0 x4' },
  { value: 'PCIe 3.0 x2', label: 'PCIe 3.0 x2' },
  { value: 'PCIe 3.0 x1', label: 'PCIe 3.0 x1' },
  { value: 'Other', label: 'Other' },
];

const PSU_EFFICIENCY_RATING_DATA: SelectInputData = [
  { value: '80+', label: '80+' },
  { value: '80+ Standard', label: '80+ Standard' },
  { value: '80+ White', label: '80+ White' },
  { value: '80+ Bronze', label: '80+ Bronze' },
  { value: '80+ Silver', label: '80+ Silver' },
  { value: '80+ Gold', label: '80+ Gold' },
  { value: '80+ Platinum', label: '80+ Platinum' },
  { value: '80+ Titanium', label: '80+ Titanium' },
];

const PSU_FORM_FACTOR_DATA: SelectInputData = [
  { value: 'ATX', label: 'ATX' },
  { value: 'SFX', label: 'SFX' },
  { value: 'SFX-L', label: 'SFX-L' },
  { value: 'TFX', label: 'TFX' },
  { value: 'Flex ATX', label: 'Flex ATX' },
  { value: 'Other', label: 'Other' },
];

const PSU_MODULARITY_DATA: SelectInputData = [
  { value: 'Full', label: 'Full' },
  { value: 'Semi', label: 'Semi' },
  { value: 'None', label: 'None' },
  { value: 'Other', label: 'Other' },
];

const CASE_TYPE_DATA: SelectInputData = [
  { value: 'Mid Tower', label: 'Mid Tower' },
  { value: 'Full Tower', label: 'Full Tower' },
  { value: 'Mini Tower', label: 'Mini Tower' },
  { value: 'Cube', label: 'Cube' },
  { value: 'Slim', label: 'Slim' },
  { value: 'Desktop', label: 'Desktop' },
  { value: 'Other', label: 'Other' },
];

const CASE_SIDE_PANEL_DATA: SelectInputData = [
  { label: 'Windowed', value: 'Windowed' },
  { label: 'Solid', value: 'Solid' },
];

const MONITOR_PANEL_TYPE_DATA: SelectInputData = [
  { value: 'IPS', label: 'IPS' },
  { value: 'TN', label: 'TN' },
  { value: 'VA', label: 'VA' },
  { value: 'OLED', label: 'OLED' },
  { value: 'QLED', label: 'QLED' },
  { value: 'Other', label: 'Other' },
];

const KEYBOARD_SWITCH_DATA: SelectInputData = [
  { value: 'Cherry MX Red', label: 'Cherry MX Red' },
  { value: 'Cherry MX Blue', label: 'Cherry MX Blue' },
  { value: 'Cherry MX Brown', label: 'Cherry MX Brown' },
  { value: 'Cherry MX Silent Red', label: 'Cherry MX Silent Red' },
  { value: 'Cherry MX Black', label: 'Cherry MX Black' },
  { value: 'Cherry MX Clear', label: 'Cherry MX Clear' },
  { value: 'Membrane', label: 'Membrane' },
  { value: 'Other', label: 'Other' },
];

const KEYBOARD_LAYOUT_DATA: SelectInputData = [
  { value: 'ANSI', label: 'ANSI' },
  { value: 'ISO', label: 'ISO' },
  { value: 'Other', label: 'Other' },
];

const KEYBOARD_BACKLIGHT_DATA: SelectInputData = [
  { value: 'RGB', label: 'RGB' },
  { value: 'Single Color', label: 'Single Color' },
  { value: 'None', label: 'None' },
];

const PERIPHERALS_INTERFACE_DATA: SelectInputData = [
  { value: 'USB', label: 'USB' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Other', label: 'Other' },
];

const MOUSE_SENSOR_DATA: SelectInputData = [
  { value: 'Optical', label: 'Optical' },
  { value: 'Laser', label: 'Laser' },
  { value: 'Infrared', label: 'Infrared' },
  { value: 'Other', label: 'Other' },
];

const HEADPHONE_TYPE_DATA: SelectInputData = [
  { value: 'Over-ear', label: 'Over-ear' },
  { value: 'On-ear', label: 'On-ear' },
  { value: 'In-ear', label: 'In-ear' },
  { value: 'Other', label: 'Other' },
];

const HEADPHONE_INTERFACE_DATA: SelectInputData = [
  { value: '3.5 mm', label: '3.5 mm' },
  { value: '2.5 mm', label: '2.5 mm' },
  { value: 'USB', label: 'USB' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Other', label: 'Other' },
];

const SPEAKER_TYPE_DATA: SelectInputData = [
  { value: '2.0', label: '2.0' },
  { value: '2.1', label: '2.1' },
  { value: '3.1', label: '3.1' },
  { value: '4.1', label: '4.1' },
  { value: '5.1', label: '5.1' },
  { value: '7.1', label: '7.1' },
  { value: 'Other', label: 'Other' },
];

const SPEAKER_INTERFACE_DATA: SelectInputData = [
  { value: '3.5 mm', label: '3.5 mm' },
  { value: '2.5 mm', label: '2.5 mm' },
  { value: 'USB', label: 'USB' },
  { value: 'Bluetooth', label: 'Bluetooth' },
  { value: 'Other', label: 'Other' },
];

const MOBILE_OS_DATA: SelectInputData = [
  { value: 'iOS', label: 'iOS' },
  { value: 'Android', label: 'Android' },
  { value: 'Windows', label: 'Windows' },
  { value: 'Linux', label: 'Linux' },
  { value: 'Other', label: 'Other' },
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
  DIMENSION_UNIT_DATA,
  DISPLAY_ASPECT_RATIO_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  MEMORY_UNIT_DATA,
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
  WEIGHT_UNIT_DATA,
};
