import { Validations } from "../../types";

/**
 * - 19[0-9][0-9] matches the years from 1900 to 1999.
 * - 20[0-1][0-9] matches the years from 2000 to 2019.
 * - 202[0-4] matches the years from 2020 to 2024.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_REGEX =
  /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

const DATE_VALIDATIONS = {
  full: DATE_REGEX,
  partials: [
    [
      /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/,
      "Must be a valid year in the range 1900-2024.",
    ],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
    [/^.{10}$/, "Must be 10 characters length."],
  ],
} as Validations;

/**
 * - 19[0-9][0-9] matches the years from 1900 to 1999.
 * - 20[0-9][0-9] matches the years from 2000 to 2099.
 * - 202[0-6] matches the years from 2020 to 2026.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_FULL_RANGE_REGEX =
  /^(?:19[0-9][0-9]|20[0-9][0-9]|202[0-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

const DATE_FULL_RANGE_VALIDATIONS = {
  full: DATE_FULL_RANGE_REGEX,
  partials: [
    [
      /^(?:19[0-9][0-9]|20[0-9][0-9]|202[0-6])$/,
      "Must be a valid year in the range 1900-2099.",
    ],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
    [/^.{10}$/, "Must be 10 characters length."],
  ],
} as Validations;

/**
 * - /^(?:2024-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
 * - 202[4-6] matches the years from 2024 to 2026.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_NEAR_FUTURE_REGEX = /^(?:202[4-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

const DATE_NEAR_FUTURE_VALIDATIONS = {
  full: (value: string) => {
    const isDateInPast = new Date(value) > new Date();
    const isStringValid = DATE_NEAR_FUTURE_REGEX.test(value);
    return isDateInPast && isStringValid;
  },
  partials: [
    [/^(?:202[4-6])$/, "Must be a valid year in the range 2024-2026."],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
    [/^.{10}$/, "Must be 10 characters length."],
    [
      (value: string) => {
        const date = new Date(value);
        return date > new Date();
      },
      "Must be a valid date in the future.",
    ],
  ],
} as Validations;

/**
 * - /^(?:202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
 * - 202[0-3] matches the years from 2020 to 2023.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_NEAR_PAST_REGEX = /^(?:202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

const DATE_NEAR_PAST_VALIDATIONS = {
  full: (value: string) => {
    const isDateInFuture = new Date(value) < new Date();
    const isStringValid = DATE_NEAR_PAST_REGEX.test(value);
    return isDateInFuture && isStringValid;
  },
  partials: [
    [/^(?:202[0-3])$/, "Must be a valid year in the range 2020-2023."],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
    [/^.{10}$/, "Must be 10 characters length."],
    [
      (value: string) => {
        const date = new Date(value);
        return date < new Date();
      },
      "Must be a valid date in the past.",
    ],
  ],
} as Validations;

/**
 * - 19[0-9][0-9] matches the years from 1900 to 1999.
 * - 20[0-1][0-9] matches the years from 2000 to 2019.
 * - 202[0-3] matches the years from 2020 to 2023.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_OF_BIRTH_REGEX =
  /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

const DATE_OF_BIRTH_VALIDATIONS = {
  full: (value: string) => {
    const date = new Date(value);
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
      age -= 1;
    }
    return date < now && age >= 18 && DATE_OF_BIRTH_REGEX.test(value);
  },
  partials: [
    [
      /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/,
      "Must be a valid year in the range 1900-2023.",
    ],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
    [/^.{10}$/, "Must be 10 characters length."],
    [
      (value: string) => {
        const date = new Date(value);
        return date < new Date();
      },
      "Must be a valid date in the past.",
    ],
    [
      (value: string) => {
        const date = new Date(value);
        const now = new Date();
        let age = now.getFullYear() - date.getFullYear();
        const m = now.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
          age -= 1;
        }
        return age >= 18;
      },
      "Must be 18 years or older.",
    ],
  ],
} as Validations;

/**
 * - /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
 * - ^ asserts that the string starts with a digit.
 * - (?=.*[0-9]) is a positive lookahead assertion that requires the presence of at least one digit. This ensures that the string contains at least one digit.
 * - \d{1,6} matches between 1 and 6 digits. This represents the whole number part of a number, allowing for a range of digit lengths from 1 to 6.
 * - (?:[.]\d{0,2})? is a non-capturing group that matches a decimal point followed by between 0 and 2 digits. This represents the decimal part of a number, allowing for a range of digit lengths from 0 to 2. The entire group is optional, allowing for whole numbers.
 * - $ asserts that the string ends with a digit.
 */
const MONEY_REGEX = /^(?=.*[0-9])\d{1,6}(?:[.]\d{0,2})?$/;

const MONEY_VALIDATIONS = {
  full: MONEY_REGEX, //  /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
  partials: [
    [/^(?=.*[0-9])/, "Must contain at least one number."],
    [/^.{1,9}$/, "Must be between 1 and 9 characters length."],
    [/^[0-9]*\\.?[0-9]+$/, "Must contain only numbers and decimal point."],
  ],
} as Validations;

const ACKNOWLEDGEMENT_VALIDATIONS = {
  full: /^(true)$/,
  partials: [[/^(true)$/, "Must acknowledge that the information entered is correct."]],
} as Validations;

/**
 * - /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i
 * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
 * - [\w\s.,!?():;"'-] matches one or more word characters (letters, digits, or underscores), whitespace characters, period, comma, exclamation mark, question mark, parentheses, colon, semicolon, double quotation marks, single quotation marks, or hyphen.
 * - {2,2000} ensures that the text is between 2 and 2000 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const TEXT_AREA_INPUT_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i;

const TEXT_AREA_INPUT_VALIDATIONS = {
  full: TEXT_AREA_INPUT_REGEX,
  partials: [
    [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
    [/^.{2,2000}$/, "Must be between 2 and 2000 characters length."],
    [
      /^[\w\s.,!?():;"'-]+$/,
      "Can only contain letters, numbers, spaces, and special characters: . , ! ? ( ) : ; \" ' -",
    ],
  ],
} as Validations;

/**
 * - /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,100}$/i
 * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
 * - [\w\s.,!?():;"'-] matches one or more word characters (letters, digits, or underscores), whitespace characters, period, comma, exclamation mark, question mark, parentheses, colon, semicolon, double quotation marks, single quotation marks, or hyphen.
 * - {2,100} ensures that the text is between 2 and 100 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const TEXT_INPUT_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,100}$/i;

const TEXT_INPUT_VALIDATIONS = {
  full: TEXT_INPUT_REGEX,
  partials: [
    [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
    [/^.{2,100}$/, "Must be between 2 and 100 characters length."],
    [
      /^[\w\s.,!?():;"'-]+$/,
      "Can only contain letters, numbers, spaces, and special characters: . , ! ? ( ) : ; \" ' -",
    ],
  ],
} as Validations;

/**
 * - /^[A-Za-z\s.\-']{2,100}$/i
 * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
 * - {2,100} ensures that the text is between 2 and 100 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const FULL_NAME_REGEX = /^[A-Za-z\s.\-']{2,100}$/i;

const FULL_NAME_VALIDATIONS = {
  full: FULL_NAME_REGEX,
  partials: [
    [
      /^[A-Za-z\s.\-']$/,
      "Must contain only letters, spaces, periods, hyphens, and apostrophes.",
    ],
    [/^.{2,100}$/, "Must be between 2 and 100 characters length."],
  ],
} as Validations;

export {
  ACKNOWLEDGEMENT_VALIDATIONS,
  DATE_FULL_RANGE_VALIDATIONS,
  DATE_NEAR_FUTURE_VALIDATIONS,
  DATE_NEAR_PAST_VALIDATIONS,
  DATE_OF_BIRTH_VALIDATIONS,
  DATE_VALIDATIONS,
  FULL_NAME_VALIDATIONS,
  MONEY_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
};
