import { ValidationFunctionsTable } from "../../types";

type ValidationKey =
  | "acknowledgement"
  | "addressLine"
  | "allowAll"
  | "city"
  | "date"
  | "dateNearFuture"
  | "dateFullRange"
  | "dateNearPast"
  | "dateOfBirth"
  | "email"
  | "fullName"
  | "money"
  | "name"
  | "password"
  | "phoneNumber"
  | "planDescription"
  | "planName"
  | "postalCodeCanada"
  | "postalCodeUS"
  | "printerMakeModel"
  | "printerSerial"
  | "privacyConsent"
  | "search"
  | "textInput"
  | "textAreaInput"
  | "timeRailway"
  | "url"
  | "username";

/**
 * this table contains the validation objects consumed by validator functions in Accessible${Inputs} components, allowing safe deep copying in reducers.
 */
const VALIDATION_FUNCTIONS_TABLE: ValidationFunctionsTable = {
  acknowledgement: {
    full: function acknowledgementValidation(value: string) {
      return /^(true)$/.test(value);
    },

    partials: [[/^(true)$/, "Must acknowledge that the information entered is correct."]],
  },

  addressLine: {
    full: function addressLineValidation(value: string) {
      return /^[A-Za-z0-9\s.,#-]{2,75}$/i.test(value);
    },

    partials: [
      [/^(?=.{2,75}$)/, "Must be between 2 and 75 characters length"],
      [
        /^[A-Za-z0-9\s.,#-]+$/,
        "Must contain only letters, numbers, spaces, and special characters: . , # -",
      ],
    ],
  },

  allowAll: { full: (_value: string) => true, partials: [] },

  city: {
    full: function cityValidation(value: string) {
      /**
       * - /^[A-Za-z\s.\-']{2,75}$/i
       * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
       * - {2,75} ensures that the text is between 2 and 75 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[A-Za-z\s.\-']{2,75}$/i.test(value);
    },

    partials: [
      [
        /^[A-Za-z\s.\-']$/,
        "Must contain only letters, spaces, periods, hyphens, and apostrophes.",
      ],
      [/^.{2,75}$/, "Must be between 2 and 75 characters length."],
    ],
  },

  date: {
    full: function dateValidation(value: string) {
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
      return /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(
        value
      );
    },

    partials: [
      [
        /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/,
        "Must be a valid year in the range 1900-2024.",
      ],
      [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
      [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
      [/^.{10}$/, "Must be 10 characters length."],
    ],
  },

  dateNearFuture: {
    full: function dateNearFutureValidation(value: string) {
      /**
       * - /^(?:2024-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
       * - 202[4-6] matches the years from 2024 to 2026.
       * - - matches a hyphen.
       * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
       * - - matches a hyphen.
       * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
       * - ^ and $ ensure that the entire string matches the regex.
       */

      const isDateInPast = new Date(value) > new Date();
      const isStringValid = /^(?:202[4-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(
        value
      );
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
  },

  dateFullRange: {
    full: function dateFullRangeValidation(value: string) {
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
      return /^(?:19[0-9][0-9]|20[0-9][0-9]|202[0-6])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(
        value
      );
    },

    partials: [
      [
        /^(?:19[0-9][0-9]|20[0-9][0-9]|202[0-6])$/,
        "Must be a valid year in the range 1900-2099.",
      ],
      [/-(0[1-9]|1[0-2])-/, "Must be a valid month in the range 01-12."],
      [/-(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day in the range 01-31."],
      [/^.{10}$/, "Must be 10 characters length."],
    ],
  },

  dateNearPast: {
    full: function dateNearPastValidation(value: string) {
      /**
       * - /^(?:202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
       * - 202[0-3] matches the years from 2020 to 2024.
       * - - matches a hyphen.
       * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
       * - - matches a hyphen.
       * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      const isDateInFuture = new Date(value) < new Date();
      const isStringValid = /^(?:202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(
        value
      );
      return isDateInFuture && isStringValid;
    },

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
  },

  dateOfBirth: {
    full: function dateOfBirthValidation(value: string) {
      /**
       * - /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
       * - 19[0-9][0-9] matches the years from 1900 to 1999.
       * - 20[0-1][0-9] matches the years from 2000 to 2019.
       * - 202[0-3] matches the years from 2020 to 2023.
       * - - matches a hyphen.
       * - (0[1-9]|1[0-2]) month: matches either 0 followed by a digit between 1 and 9, or 1 followed by a digit between 0 and 2.
       * - - matches a hyphen.
       * - (0[1-9]|[12][0-9]|3[01]) day: matches either 0 followed by a digit between 1 and 9, or 1 or 2 followed by a digit between 0 and 9, or 3 followed by a digit between 0 and 1.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      const date = new Date(value);
      const now = new Date();
      let age = now.getFullYear() - date.getFullYear();
      const m = now.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
        age -= 1;
      }
      return (
        date < now &&
        age >= 18 &&
        /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(
          value
        )
      );
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
  },

  email: {
    full: function emailValidation(value: string) {
      /**
       * @see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
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

      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
      );
    },

    partials: [
      [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/, "Must be a valid username."],
      [/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/, "Must be a valid domain name."],
      [
        /^\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
        "Must be a valid subdomain.",
      ],
    ],
  },

  fullName: {
    full: function fullNameValidation(value: string) {
      /**
       * - /^[A-Za-z\s.\-']{2,75}$/i
       * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
       * - {2,75} ensures that the text is between 2 and 75 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[A-Za-z\s.\-']{2,75}$/i.test(value);
    },

    partials: [
      [
        /^[A-Za-z\s.\-']$/,
        "Must contain only letters, spaces, periods, hyphens, and apostrophes.",
      ],
      [/^.{2,75}$/, "Must be between 2 and 75 characters length."],
    ],
  },

  money: {
    full: function moneyValidation(value: string) {
      /**
       * - /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
       * - ^ asserts that the string starts with a digit.
       * - (?=.*[0-9]) is a positive lookahead assertion that requires the presence of at least one digit. This ensures that the string contains at least one digit.
       * - \d{1,6} matches between 1 and 6 digits. This represents the whole number part of a number, allowing for a range of digit lengths from 1 to 6.
       * - (?:[.]\d{0,2})? is a non-capturing group that matches a decimal point followed by between 0 and 2 digits. This represents the decimal part of a number, allowing for a range of digit lengths from 0 to 2. The entire group is optional, allowing for whole numbers.
       * - $ asserts that the string ends with a digit.
       */
      return /^(?=.*[0-9])\d{1,6}(?:[.]\d{0,2})?$/.test(value);
    },

    partials: [
      [/^(?=.*[0-9])/, "Must contain at least one number."],
      [/^.{1,9}$/, "Must be between 1 and 9 characters length."],
      [/^[0-9]*\\.?[0-9]+$/, "Must contain only numbers and decimal point."],
    ],
  },

  name: {
    full: function nameValidation(value: string) {
      /**
       * - /^[A-Za-z\s.\-']{2,30}$/i
       * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
       * - {2,30} ensures that the text is between 2 and 30 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[A-Za-z\s.\-']{2,30}$/i.test(value);
    },

    partials: [
      [
        /^[A-Za-z\s.\-']$/,
        "Must contain only letters, spaces, periods, hyphens, and apostrophes.",
      ],
      [/^.{2,30}$/, "Must be between 2 and 30 characters length."],
    ],
  },

  password: {
    full: function passwordValidation(value: string) {
      /**
       * - /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,32}$/
       * - (?=.*[A-Z]) ensures that there is at least one uppercase letter.
       * - (?=.*[a-z]) ensures that there is at least one lowercase letter.
       * - (?=.*[0-9]) ensures that there is at least one number.
       * - (?=.*[!@#$%^&*]) ensures that there is at least one special character.
       * - (?!.*\s) ensures that there are no spaces.
       * - .{8,32} ensures that the password is between 8 and 32 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,32}$/.test(
        value
      );
    },
    partials: [
      [/^.{8,32}$/i, "Must be between 8 and 32 characters."],
      [/^(?=.*[A-Z])/, "Must contain at least one uppercase letter."],
      [/^(?=.*[a-z])/, "Must contain at least one lowercase letter."],
      [/^(?=.*[0-9])/, "Must contain at least one number."],
      [/^(?=.*[!@#$%^&*])/, "Must contain at least one special character."],
      [/^(?!.*\s)/, "Cannot contain spaces."],
    ],
  },

  planDescription: {
    full: function planDescriptionValidation(value: string) {
      /**
       * - (?=.*[A-Za-z0-9]) ensures that there is at least one alphanumeric character, preventing the input from consisting entirely of whitespace.
       * - [\w\s.,!?():;"'-] matches any word characters (\w includes alphanumeric characters and underscores), whitespace, and a range of allowed punctuation marks commonly used in grammar and punctuation: ., ,, !, ?, (, ), :, ;, ", ', -. The hyphen is placed at the end of the list to prevent it from being interpreted as a range of characters.
       * - {1,300} ensures that the text is between 1 and 300 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,300}$/i.test(value);
    },
    partials: [
      [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
      [
        /^[\w\s.,!?():;"'-]+$/,
        "Must contain only letters, numbers, spaces, and special characters.",
      ],
      [/[\w\s.,!?():;"'-]{1,300}$/, "Must be between 1 and 300 characters length."],
    ],
  },

  planName: {
    full: function planNameValidation(value: string) {
      /**
       * - /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,50}$/i
       * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
       * - [\w\s.,!?():;"'-]{1,50} matches any word character, whitespace, or punctuation character between 1 and 50 times. This ensures that the string contains between 1 and 50 word characters, whitespace, or punctuation characters.
       * - The ^ and $ anchors ensure that the entire string is matched.
       * - The i flag makes the regex case insensitive.
       */
      return /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,50}$/i.test(value);
    },

    partials: [
      [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
      [
        /^[\w\s.,!?():;"'-]+$/,
        "Must contain only letters, numbers, spaces, and special characters.",
      ],
      [/[\w\s.,!?():;"'-]{1,50}$/, "Must be between 1 and 50 characters length."],
    ],
  },

  phoneNumber: {
    full: function phoneNumberValidation(value: string) {
      return /^\d{10,15}$/.test(value);
    },

    partials: [
      [/^\d{10,15}$/, "Must be a valid phone number."],
      [/^.{10,15}$/, "Must be between 10 and 15 characters length."],
    ],
  },

  postalCodeCanada: {
    full: function postalCodeCanadaValidation(value: string) {
      /**
       * - [A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d matches any letter, followed by a digit, followed by a letter, followed by a space, followed by a digit, followed by a letter, followed by a digit.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/i.test(value);
    },

    partials: [
      [/^[A-Za-z]\d[A-Za-z]$/, "Must be in the format A1A."],
      [/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/, "Must be in the format A1A 1A1."],
      [/^[A-Za-z0-9]+$/, "Must only contain letters and numbers."],
    ],
  },

  postalCodeUS: {
    full: function postalCodeUSValidation(value: string) {
      /**
       * - \d{5}(?:[-\s]\d{4})? matches any digit, followed by 5 digits, followed by a hyphen, followed by 4 digits.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^\d{5}(?:[-]\d{4})?$/.test(value);
    },

    partials: [
      [/^\d{5}$/, "Must be a valid US zip code of five digits."],
      [
        /^\d{5}[-]\d{4}$/,
        "Must be a valid US zip code of the ZIP+4 format with five digits, a hyphen, and four additional digits.",
      ],
      [/^[0-9-]+$/, "Must only contain numbers and a hyphen."],
    ],
  },

  printerMakeModel: {
    full: function printerMakeModelValidation(value: string) {
      /**
       * - ^[A-Za-z0-9\s.,'()-]{1,50}$/i
       * - [A-Za-z0-9\s.,'()-] matches any letter, digit, whitespace, period, comma, single quotation mark, hyphen, or parentheses.
       * - {1,50} ensures that the text is between 1 and 50 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[a-zA-Z0-9\s.,'()-]{1,50}$/i.test(value);
    },

    partials: [
      [/^.{1,50}$/, "Must be between 1 and 50 characters long."],
      [
        /^[a-zA-Z0-9\s.,'()-]+$/,
        "Only letters, digits, whitespace, period, comma, single quotation mark, hyphen, and parentheses are allowed.",
      ],
    ],
  },

  printerSerial: {
    full: function printerSerialValidation(value: string) {
      /**
       * - ^[A-Za-z0-9\s.,'()-]{1,50}$/i
       * - [A-Za-z0-9\s.,'()-] matches any letter, digit, whitespace, period, comma, single quotation mark, hyphen, or parentheses.
       * - {1,50} ensures that the text is between 1 and 50 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[a-zA-Z0-9]{1,50}$/i.test(value);
    },

    partials: [
      [/^.{1,50}$/, "Must be between 1 and 50 characters long."],
      [/^[a-zA-Z0-9]+$/, "Must contain only letters and numbers."],
    ],
  },

  privacyConsent: {
    full: function privacyConsentValidation(value: string) {
      return /^(true)$/.test(value);
    },

    partials: [[/^(true)$/, "Must consent to share details."]],
  },

  search: {
    full: function searchValidation(value: string) {
      /**
       * - /^[A-Za-z0-9\w\s.,!?():;"'-]{1,100}$/i
       * - [A-Za-z0-9\w\s.,!?():;"'-] matches any letter, number, whitespace, word character, period, comma, exclamation mark, question mark, parentheses, colon, semicolon, double quotation marks, single quotation marks, or hyphen.
       * - {1,100} ensures that the text is between 1 and 100 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       */

      // breaks the superset rule for the search component
      return /^[A-Za-z0-9\w\s.,!?():;"'-]{1,100}$/i.test(value);
    },

    partials: [
      // [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
      [
        /^[\w\s.,!?():;"'-]+$/,
        "Can only contain letters, numbers, spaces, and special characters: . , ! ? ( ) : ; \" ' -",
      ],
    ],
  },

  textInput: {
    full: function textInputValidation(value: string) {
      /**
       * - /^[A-Za-z0-9\s.,#-]{2,75}$/i
       * - [A-Za-z0-9\s.,#-] matches any letter, number, whitespace, period, comma, hash, or hyphen.
       * - {2,75} ensures that the text is between 2 and 75 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^[A-Za-z0-9\s.,#-]{2,75}$/i.test(value);
    },

    partials: [
      [
        /^[A-Za-z0-9\s.,#-]+$/,
        "Must contain only letters, numbers, spaces, and special characters: . , # -",
      ],
      [/^.{2,75}$/, "Must be between 2 and 75 characters length."],
    ],
  },

  textAreaInput: {
    full: function textAreaInputValidation(value: string) {
      /**
       * - /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i
       * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
       * - [\w\s.,!?():;"'-] matches one or more word characters (letters, digits, or underscores), whitespace characters, period, comma, exclamation mark, question mark, parentheses, colon, semicolon, double quotation marks, single quotation marks, or hyphen.
       * - {2,2000} ensures that the text is between 2 and 2000 characters long.
       * - ^ and $ ensure that the entire string matches the regex.
       * - i makes the regex case-insensitive.
       */
      return /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,2000}$/i.test(value);
    },

    partials: [
      [/^(?=.*[A-Za-z0-9])/, "Must contain at least one alphanumeric character."],
      [/^.{2,2000}$/, "Must be between 2 and 2000 characters length."],
      [
        /^[\w\s.,!?():;"'-]+$/,
        "Can only contain letters, numbers, spaces, and special characters: . , ! ? ( ) : ; \" ' -",
      ],
    ],
  },

  timeRailway: {
    full: function timeRailwayValidation(value: string) {
      /**
       * - /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
       * ([0-1]?[0-9]|2[0-3]) matches either 0 followed by a digit between 0 and 9, or 1 followed by a digit between 0 and 9, or 2 followed by a digit between 0 and 3.
       * : matches a colon.
       * [0-5][0-9] matches a digit between 0 and 5 followed by a digit between 0 and 9.
       * ^ and $ ensure that the entire string matches the regex.
       */
      return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    },

    partials: [
      [/^.{4,5}$/i, "Must be between 4 and 5 characters long."],
      [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Must be a valid time in 24-hour format."],
    ],
  },

  url: {
    full: function urlValidation(value: string) {
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

      return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value
      );
    },

    partials: [
      [/^https?:\/\//, "Must start with 'http://' or 'https://'."],
      [/^.{1,256}/, "Must be between 1 and 256 characters length."],
      [
        /^[-a-zA-Z0-9()@:%_+.~#?&//=]*$/,
        "Must contain only letters, numbers, and special characters.",
      ],
    ],
  },

  username: {
    full: function usernameValidation(value: string) {
      /**
       * - /^(?=.{3,20}$)(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$/
       * - (?=.{3,20}$) enforces a minimum of 3 characters and a maximum of 20 characters.
       * - (?![-_.]) ensures that the username does not start with a hyphen, underscore, or period.
       * - (?!.*[-_.]{2}) ensures that the username does not contain two hyphens, underscores, or periods in a row.
       * - [a-zA-Z0-9-_.]+ matches any alphanumeric character, hyphen, underscore, or period.
       * - (?<![-_.]) ensures that the username does not end with a hyphen, underscore, or period.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^(?=.{3,20}$)(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$/.test(value);
    },

    partials: [
      [/^.{3,20}$/i, "Must be between 3 and 20 characters."],
      [/^(?![-_.])/, "Cannot start with a hyphen, underscore, or period."],
      [
        /^(?!.*[-_.]{2})/,
        "Cannot contain two hyphens, underscores, or periods in a row.",
      ],
      [
        /^[a-zA-Z0-9-_.]+$/,
        "Can only contain alphanumeric characters, hyphens, underscores, and periods.",
      ],
      [/^(?<![-_.])$/, "Cannot end with a hyphen, underscore, or period."],
    ],
  },
};

export { VALIDATION_FUNCTIONS_TABLE };
export type { ValidationKey };
