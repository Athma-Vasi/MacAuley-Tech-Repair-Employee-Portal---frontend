import { Validations } from "../../../types";

/**
 * - (?=.*[A-Za-z0-9]) ensures that there is at least one alphanumeric character, preventing the input from consisting entirely of whitespace.
 * - [\w\s.,!?():;"'-] matches any word characters (\w includes alphanumeric characters and underscores), whitespace, and a range of allowed punctuation marks commonly used in grammar and punctuation: ., ,, !, ?, (, ), :, ;, ", ', -. The hyphen is placed at the end of the list to prevent it from being interpreted as a range of characters.
 * - {1,300} ensures that the text is between 1 and 300 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const PLAN_DESCRIPTION_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,300}$/i;

const PLAN_DESCRIPTION_VALIDATIONS = {
  full: PLAN_DESCRIPTION_REGEX,
  partials: [
    [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
    [
      /^[\w\s.,!?():;"'-]+$/,
      "Must contain only letters, numbers, spaces, and special characters.",
    ],
    [/[\w\s.,!?():;"'-]{1,300}$/, "Must be between 1 and 300 characters length."],
  ],
} as Validations;

/**
 * - /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,50}$/i
 * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
 * - [\w\s.,!?():;"'-]{1,50} matches any word character, whitespace, or punctuation character between 1 and 50 times. This ensures that the string contains between 1 and 50 word characters, whitespace, or punctuation characters.
 * - The ^ and $ anchors ensure that the entire string is matched.
 * - The i flag makes the regex case insensitive.
 */
const PLAN_NAME_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,50}$/i;

const PLAN_NAME_VALIDATIONS = {
  full: PLAN_NAME_REGEX,
  partials: [
    [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
    [
      /^[\w\s.,!?():;"'-]+$/,
      "Must contain only letters, numbers, spaces, and special characters.",
    ],
    [/[\w\s.,!?():;"'-]{1,50}$/, "Must be between 1 and 50 characters length."],
  ],
} as Validations;

export { PLAN_DESCRIPTION_VALIDATIONS, PLAN_NAME_VALIDATIONS };