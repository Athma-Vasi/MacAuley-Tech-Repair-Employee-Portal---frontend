import { Validations } from "../../../types";

/**
 * - ^[A-Za-z0-9\s.,'()-]{1,50}$/i
 * - [A-Za-z0-9\s.,'()-] matches any letter, digit, whitespace, period, comma, single quotation mark, hyphen, or parentheses.
 * - {1,50} ensures that the text is between 1 and 50 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const PRINTER_MAKE_MODEL_REGEX = /^[a-zA-Z0-9\s.,'()-]{1,50}$/i;

const PRINTER_MAKE_MODEL_VALIDATIONS = {
  full: PRINTER_MAKE_MODEL_REGEX,
  partials: [
    [/^.{1,50}$/, "Must be between 1 and 50 characters long."],
    [
      /^[a-zA-Z0-9\s.,'()-]+$/,
      "Only letters, digits, whitespace, period, comma, single quotation mark, hyphen, and parentheses are allowed.",
    ],
  ],
} as Validations;

/**
 * - ^[A-Za-z0-9\s.,'()-]{1,50}$/i
 * - [A-Za-z0-9\s.,'()-] matches any letter, digit, whitespace, period, comma, single quotation mark, hyphen, or parentheses.
 * - {1,50} ensures that the text is between 1 and 50 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const PRINTER_SERIAL_NUMBER_REGEX = /^[a-zA-Z0-9]{1,50}$/i;

const PRINTER_SERIAL_NUMBER_VALIDATIONS = {
  full: PRINTER_SERIAL_NUMBER_REGEX,
  partials: [
    [/^.{1,50}$/, "Must be between 1 and 50 characters long."],
    [
      /^[a-zA-Z0-9\s.,'()-]+$/,
      "Must only contain letters, numbers, spaces, periods, commas, apostrophes, hyphens, and parentheses.",
    ],
  ],
} as Validations;

/**
 * - /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
 * ([0-1]?[0-9]|2[0-3]) matches either 0 followed by a digit between 0 and 9, or 1 followed by a digit between 0 and 9, or 2 followed by a digit between 0 and 3.
 * : matches a colon.
 * [0-5][0-9] matches a digit between 0 and 5 followed by a digit between 0 and 9.
 * ^ and $ ensure that the entire string matches the regex.
 */
const TIME_RAILWAY_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const TIME_RAILWAY_VALIDATIONS = {
  full: TIME_RAILWAY_REGEX,
  partials: [
    [/^.{4,5}$/i, "Must be between 4 and 5 characters long."],
    [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Must be a valid time in 24-hour format."],
  ],
} as Validations;

export {
  PRINTER_MAKE_MODEL_VALIDATIONS,
  PRINTER_SERIAL_NUMBER_VALIDATIONS,
  TIME_RAILWAY_VALIDATIONS,
};
