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

function dateNearFuture(value: string) {
  const isDateInPast = new Date(value) > new Date();
  const isStringValid = DATE_NEAR_FUTURE_REGEX.test(value);
  return isDateInPast && isStringValid;
}
const DATE_NEAR_FUTURE_VALIDATIONS = {
  full: dateNearFuture,
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
 * - /^(?:202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
 * - 202[0-3] matches the years from 2020 to 2024.
 * - - matches a hyphen.
 * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
 * - - matches a hyphen.
 * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const DATE_NEAR_PAST_REGEX = /^(?:202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
function dateNearPast(value: string) {
  const isDateInFuture = new Date(value) < new Date();
  const isStringValid = DATE_NEAR_PAST_REGEX.test(value);
  return isDateInFuture && isStringValid;
}
const DATE_NEAR_PAST_VALIDATIONS = {
  full: dateNearPast,
  partials: [
    [/^(?:202[0-4])$/, "Must be a valid year in the range 2020-2024."],
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
  full: function dateOfBirth(value: string) {
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

const PRIVACY_CONSENT_VALIDATIONS = {
  full: /^(true)$/,
  partials: [[/^(true)$/, "Must consent to share details."]],
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

/**
 * Per the W3C HTML5 specification: https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
 * - Note: This requirement is a willful violation of RFC 5322, which defines a syntax for e-mail addresses that is simultaneously too strict (before the “@” character), too vague (after the “@” character), and too lax (allowing comments, whitespace characters, and quoted strings in manners unfamiliar to most users) to be of practical use here.
 *
 * - [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]  Captures one or more characters that are allowed in the username part of the email address. This includes alphanumeric characters, special characters, and certain punctuation marks.
 * - @ Matches the @ symbol that separates the username and domain.
 * - [a-zA-Z0-9] Captures a single alphanumeric character, representing the first character of the domain name.
 * - (?: Starts a non-capturing group for optional domain sections.
 * - [a-zA-Z0-9-]{0,61}[a-zA-Z0-9]  Captures a domain section that consists of alphanumeric characters and hyphens. It allows between 0 and 61 characters, ensuring that the total length does not exceed 63 characters.
 * - )?  Ends the non-capturing group for the optional domain section, making it optional.
 * - (?:  Starts a non-capturing group for optional subdomains.
 * - \.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?  Captures a subdomain section that starts with a dot (.) followed by an alphanumeric character. It allows between 0 and 61 characters of alphanumeric characters and hyphens. The entire subdomain section is optional.
 * - )*  Ends the non-capturing group for the optional subdomains. This allows for zero or more occurrences of subdomain sections.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const EMAIL_VALIDATIONS = {
  full: EMAIL_REGEX,
  partials: [
    [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/, "Must be a valid username."],
    [/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/, "Must be a valid domain name."],
    [/^\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/, "Must be a valid subdomain."],
  ],
} as Validations;

// /**
//  * - \+\(1\) matches "+(1)".
//  * - \(\d{3}\) matches exactly 3 digits surrounded by parentheses.
//  * - [ ] matches a space.
//  * - \d{3}-\d{4} matches exactly 3 digits, followed by a hyphen, followed by exactly 4 digits.
//  * - ^ and $ ensure that the entire string matches the regex.
//  */
// const PHONE_NUMBER_REGEX = /^\+\(1\)\(\d{3}\)[ ]\d{3}-\d{4}$/;

// regex for 10-15 digit phone number
const PHONE_NUMBER_REGEX = /^\d{10,15}$/;

const PHONE_NUMBER_VALIDATIONS = {
  full: PHONE_NUMBER_REGEX,
  partials: [
    [/^\d{10,15}$/, "Must be a valid phone number."],
    [/^.{10,15}$/, "Must be between 10 and 15 characters length."],
  ],
} as Validations;

/**
 * @see https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 * - https? matches "http" or "https". The "?" makes the "s" character optional, allowing for both "http" and "https" protocols.
 * - :\/\/ matches "://".
 * - (www\.)? matches "www." or nothing.
 * - [-a-zA-Z0-9@:%._+~#=]{1,256} matches any letter, number, or symbol in the brackets, between 1 and 256 times.
 * - \. matches ".".
 * - [a-zA-Z0-9()]{1,6} matches any letter, number, or symbol in the brackets, between 1 and 6 times.
 * - \b ensures that the URL ends at a word boundary.
 * - ([-a-zA-Z0-9()@:%_+.~#?&//=]*) matches any letter, number, or symbol in the brackets, between 0 and infinity times.
 */
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const URL_VALIDATIONS = {
  full: URL_REGEX,
  partials: [
    [/^https?:\/\//, "Must start with 'http://' or 'https://'."],
    [/^.{1,256}/, "Must be between 1 and 256 characters length."],
    [
      /^[-a-zA-Z0-9()@:%_+.~#?&//=]*$/,
      "Must contain only letters, numbers, and special characters.",
    ],
  ],
} as Validations;

export {
  ACKNOWLEDGEMENT_VALIDATIONS,
  DATE_FULL_RANGE_VALIDATIONS,
  DATE_NEAR_FUTURE_VALIDATIONS,
  DATE_NEAR_PAST_VALIDATIONS,
  DATE_OF_BIRTH_VALIDATIONS,
  DATE_VALIDATIONS,
  EMAIL_VALIDATIONS,
  FULL_NAME_VALIDATIONS,
  MONEY_VALIDATIONS,
  PHONE_NUMBER_VALIDATIONS,
  PRIVACY_CONSENT_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
  URL_VALIDATIONS,
};
