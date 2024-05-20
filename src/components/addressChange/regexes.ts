import { Regexes } from "../../constants/regexes";

/**
 * - /^[A-Za-z0-9\s.,#-]{2,75}$/i
 * - [A-Za-z0-9\s.,#-] matches any letter, number, whitespace, period, comma, hash, or hyphen.
 * - {2,75} ensures that the text is between 2 and 75 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s.,#-]{2,75}$/i;

const ADDRESS_LINE_REGEXES = {
  full: ADDRESS_LINE_REGEX,
  partials: [
    [/^(?=.{2,75}$)/, "Must be between 2 and 75 characters length"],
    [
      /^[A-Za-z0-9\s.,#-]+$/,
      "Must contain only letters, numbers, spaces, and special characters: . , # -",
    ],
  ],
} as Regexes;

/**
 * - /^[A-Za-z\s.\-']{2,75}$/i
 * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
 * - {2,75} ensures that the text is between 2 and 75 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const CITY_REGEX = /^[A-Za-z\s.\-']{2,75}$/i;

const CITY_REGEXES = {
  full: CITY_REGEX,
  partials: [
    [/^(?=.{2,75}$)/, "Must be between 2 and 75 characters length"],
    [
      /^[A-Za-z\s.\-']+$/,
      "Can only contain alphabetical characters, spaces, periods, or hyphens.",
    ],
  ],
} as Regexes;

const CONTACT_NUMBER_REGEXES = {
  full: /^(?=.{10,15}$)/,
  partials: [
    [/^(?=.{10,15}$)/, "Must be between 10 and 15 digits length."],
    [/^\d{10,15}$/, "Must only contain numbers."],
  ],
} as Regexes;

/**
 * - [A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d matches any letter, followed by a digit, followed by a letter, followed by a space, followed by a digit, followed by a letter, followed by a digit.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const POSTAL_CODE_REGEX_CANADA = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/i;

const CANADIAN_POSTAL_CODE_REGEXES = {
  full: POSTAL_CODE_REGEX_CANADA,
  partials: [
    [POSTAL_CODE_REGEX_CANADA, "Must be in the format A1A 1A1."],
    [/^[A-Za-z0-9]+$/, "Must only contain letters and numbers."],
  ],
} as Regexes;

/**
 * - \d{5}(?:[-\s]\d{4})? matches any digit, followed by 5 digits, followed by a hyphen, followed by 4 digits.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const POSTAL_CODE_REGEX_US = /^\d{5}(?:[-]\d{4})?$/;

const US_POSTAL_CODE_REGEXES = {
  full: POSTAL_CODE_REGEX_US,
  partials: [
    [/^\d{5}$/, "Must be a valid US zip code of five digits."],
    [
      /^\d{5}[-]\d{4}$/,
      "Must be a valid US zip code of the ZIP+4 format with five digits, a hyphen, and four additional digits.",
    ],
    [/^[0-9-]+$/, "Must only contain numbers and a hyphen."],
  ],
} as Regexes;

const ACKNOWLEDGEMENT_REGEXES = {
  full: /^(true)$/,
  partials: [[/^(true)$/, "Must acknowledge that the information entered is correct."]],
} as Regexes;

export {
  ACKNOWLEDGEMENT_REGEXES,
  ADDRESS_LINE_REGEXES,
  CANADIAN_POSTAL_CODE_REGEXES,
  CITY_REGEXES,
  CONTACT_NUMBER_REGEXES,
  US_POSTAL_CODE_REGEXES,
};
