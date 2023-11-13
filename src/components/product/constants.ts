/**
 * - /^[a-zA-Z0-9\d- ]{2,30}$/;
 * - [a-zA-Z0-9\d- ] matches a single character in the list a-z (case sensitive), A-Z (case sensitive), 0-9, \d (same as 0-9), - (case sensitive),  (case sensitive).
 * - {2,30} matches between 2 and 30 of the preceding token.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const BRAND_REGEX = /^[a-zA-Z0-9\d- ]{2,30}$/;

const CPU_SOCKET_REGEX = BRAND_REGEX;
const GPU_CHIPSET_REGEX = BRAND_REGEX;
const MOTHERBOARD_SOCKET_REGEX = BRAND_REGEX;
const MOTHERBOARD_CHIPSET_REGEX = BRAND_REGEX;

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
 * - /^[0-9]{2}:[0-9]{2}$/
 * - [0-9] matches any digit between 0 and 9.
 * - {2} matches the preceding token exactly 2 times.
 * - matches the character : literally.
 * - ^ and $ ensure that the entire string matches the regex.
 * - ex: 16:9
 */
const MONITOR_ASPECT_RATIO_REGEX = /^[0-9]{2}:[0-9]{2}$/;

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

const SMARTPHONE_CHIPSET_REGEX = BRAND_REGEX;
const TABLET_CHIPSET_REGEX = BRAND_REGEX;

const ACCESSORY_TYPE_REGEX = BRAND_REGEX;

export {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CPU_SOCKET_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_FREQUENCY_RESPONSE_REGEX,
  MONITOR_ASPECT_RATIO_REGEX,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_SOCKET_REGEX,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_FREQUENCY_RESPONSE_REGEX,
  TABLET_CHIPSET_REGEX,
};
