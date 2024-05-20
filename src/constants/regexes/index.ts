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

const DATE_REGEXES = {
  full: DATE_REGEX,
  partials: [
    [
      /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-6])$/,
      "Must be a valid year in the range 1900-2026",
    ],
    [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12"],
    [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31"],
  ],
} as Regexes;

/**
 * - /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
 * - ^ asserts that the string starts with a digit.
 * - (?=.*[0-9]) is a positive lookahead assertion that requires the presence of at least one digit. This ensures that the string contains at least one digit.
 * - \d{1,6} matches between 1 and 6 digits. This represents the whole number part of a number, allowing for a range of digit lengths from 1 to 6.
 * - (?:[.]\d{0,2})? is a non-capturing group that matches a decimal point followed by between 0 and 2 digits. This represents the decimal part of a number, allowing for a range of digit lengths from 0 to 2. The entire group is optional, allowing for whole numbers.
 * - $ asserts that the string ends with a digit.
 */
const MONEY_REGEX = /^(?=.*[0-9])\d{1,6}(?:[.]\d{0,2})?$/;

const MONEY_REGEXES = {
  full: MONEY_REGEX, //  /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
  partials: [
    [/^(?=.*[0-9])/, "Must contain at least one number"],
    [/^(?=.{1,9}$)/, "Must be between 1 and 9 characters length"],
    [/^[0-9]*\\.?[0-9]+$/, "Must contain only numbers and decimal point"],
  ],
} as Regexes;

export { DATE_REGEXES, MONEY_REGEXES };

type Regexes = {
  full: RegExp;
  partials: [RegExp, string][];
};

export type { Regexes };
