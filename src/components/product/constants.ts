import { SelectInputData } from '../../types';

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
 * - /^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {2} matches the preceding token exactly 2 times.
 * - matches the character - literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 16-16-16-16
 */
const RAM_TIMING_REGEX = /^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/;

/**
 * - /^[a-zA-Z0-9\s-]{2,30}$/;
 * - [a-zA-Z0-9\s-] matches any character between a-z, A-Z, 0-9, whitespace and -.
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const COLOR_VARIANT_REGEX = /^[a-zA-Z0-9\s-]{2,30}$/;

/**
 * - /^[0-9]{2}:[0-9]{2}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {2} matches the preceding token exactly 2 times.
 * - matches the character : literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 16:9
 */
const DISPLAY_ASPECT_RATIO_REGEX = /^[0-9]{2}:[0-9]{2}$/;

/**
 * - /^[0-9]{2} hz - [0-9]{2} kHz$/
 * - [0-9] matches any digit between 0 and 9.
 * - {2} matches the preceding token exactly 2 times.
 * - matches the character hz -  literally.
 * - [0-9] matches any digit between 0 and 9.
 * - {2} matches the preceding token exactly 2 times.
 * - matches the character kHz literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 20 hz - 20 kHz
 */
const HEADPHONE_FREQUENCY_RESPONSE_REGEX = /^[0-9]{2} hz - [0-9]{2} kHz$/;

const SPEAKER_FREQUENCY_RESPONSE_REGEX = HEADPHONE_FREQUENCY_RESPONSE_REGEX;

const SMARTPHONE_CHIPSET_REGEX = CPU_SOCKET_REGEX;
const TABLET_CHIPSET_REGEX = CPU_SOCKET_REGEX;

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
  { value: '80+ Bronze', label: '80+ Bronze' },
  { value: '80+ Gold', label: '80+ Gold' },
  { value: '80+ Platinum', label: '80+ Platinum' },
  { value: '80+ Titanium', label: '80+ Titanium' },
  { value: '80+ Silver', label: '80+ Silver' },
  { value: '80+', label: '80+' },
  { value: '80+ White', label: '80+ White' },
  { value: '80+ Standard', label: '80+ Standard' },
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

export {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_SOCKET_REGEX,
  DIMENSION_UNIT_DATA,
  GPU_CHIPSET_REGEX,
  HEADPHONE_FREQUENCY_RESPONSE_REGEX,
  MEMORY_UNIT_DATA,
  DISPLAY_ASPECT_RATIO_REGEX,
  MONITOR_PANEL_TYPE_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_FREQUENCY_RESPONSE_REGEX,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  TABLET_CHIPSET_REGEX,
  WEIGHT_UNIT_DATA,
};
