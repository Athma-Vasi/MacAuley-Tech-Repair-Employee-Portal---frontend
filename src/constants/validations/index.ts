import { ValidationFunctionsTable } from "../../types";

type ValidationKey =
  | "objectKey"
  | "accessoryType"
  | "acknowledgement"
  | "addressLine"
  | "allowAll"
  | "brand"
  | "city"
  | "colorVariant"
  | "cpuFrequency"
  | "cpuSocket" // | "gpuChipset" | "motherboardSocket" | "motherboardChipset"
  | "date"
  | "dateFullRange"
  | "dateNearFuture"
  | "dateNearPast"
  | "dateOfBirth"
  | "dimensions"
  | "displayAspectRatio"
  | "email"
  | "frequencyResponse"
  | "fullName"
  | "largeInteger"
  | "mediumInteger"
  | "mobileCamera"
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
  | "ramTiming"
  | "ramVoltage"
  | "search"
  | "smallInteger"
  | "textAreaInput"
  | "textInput"
  | "timeRailway"
  | "url"
  | "userDefinedValue"
  | "userId"
  | "username"
  | "weight";

/**
 * this table contains the validation objects consumed by validator functions in Accessible${Inputs} components, allowing safe deep copying in reducers.
 */
const VALIDATION_FUNCTIONS_TABLE: ValidationFunctionsTable = {
  accessoryType: {
    full: function accessoryTypeValidation(value: string) {
      /**
       * - /^[a-zA-Z0-9\s-]{2,30}$/
       * - [a-zA-Z0-9\s-] matches any character between a-z, A-Z, 0-9, whitespace and -.
       * - {2,30} matches between 2 and 30 of the preceding token.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^[a-zA-Z0-9\s-]{2,30}$/.test(value);
    },

    partials: [
      [
        /^[a-zA-Z0-9\s-]{2,30}$/,
        "Must contain only letters, numbers, spaces, periods, commas, hyphens, and apostrophes.",
      ],
      [/^.{2,30}$/, "Must be between 2 and 30 characters length."],
    ],
  },

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

  brand: {
    full: function brandValidation(value: string) {
      /**
       * - /^[a-zA-Z0-9\s-]{2,30}$/
       * - [a-zA-Z0-9\s-] matches any character between a-z, A-Z, 0-9, whitespace and -.
       * - {2,30} matches between 2 and 30 of the preceding token.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^[a-zA-Z0-9\s-]{2,30}$/.test(value);
    },

    partials: [
      [
        /^[a-zA-Z0-9\s-]{2,30}$/,
        "Must contain only letters, numbers, spaces, periods, commas, hyphens, and apostrophes.",
      ],
      [/^.{2,30}$/, "Must be between 2 and 30 characters length."],
    ],
  },

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

  colorVariant: {
    full: function colorVariantValidation(value: string) {
      /**
       * - /^[a-zA-Z0-9#()%,.\s-]{2,30}$/
       * - [a-zA-Z0-9#()%,.\s-] matches any character between a-z, A-Z, 0-9, #, (, ), %, ,, ., whitespace and -.
       * - {2,30} matches between 2 and 30 of the preceding token.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: #e0e0e0 or hsl(0, 0%, 88%) or rgb(224, 224, 224) or rgba(224, 224, 224, 0.5) or hsla(0, 0%, 88%, 0.5)
       */
      return /^[a-zA-Z0-9#()%,.\s-]{2,30}$/.test(value);
    },

    partials: [
      [
        /^[a-zA-Z0-9#()%,.\s-]{2,30}$/,
        "Must contain only letters, numbers, spaces, periods, commas, hyphens, and apostrophes. Ex: #e0e0e0 or rgb(224, 224, 224) or hsla(0, 0%, 88%, 0.5)",
      ],
      [/^.{2,30}$/, "Must be between 2 and 30 characters length."],
    ],
  },

  cpuFrequency: {
    full: function cpuFrequencyValidation(value: string) {
      /**
       * - /^(?!^$|^0*$)[0-9]{1}(\.[0-9]{1,2})?$/
       * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
       * - [0-9]{1}: Matches one digit for the integral part of the frequency.
       * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the frequency.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 1.2 or 1
       */
      return /^(?!^$|^0*$)[0-9]{1}(\.[0-9]{1,2})?$/.test(value);
    },

    partials: [
      [/^(?!^$|^0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^[0-9]{1}(\.[0-9]{1,2})?$/, "Must contain only numbers."],
      [/^.{1,4}$/, "Must be between 1 and 4 characters length."],
      [
        /^[0-9]{1}(\.[0-9]{1,2})?$/,
        "Must contain only numbers with an optional decimal point.",
      ],
    ],
  },

  cpuSocket: {
    full: function cpuSocketValidation(value: string) {
      /**
       * - /^[a-zA-Z0-9\s.,'()-]{2,30}$/i;
       * - [a-zA-Z0-9\s.,'()-] matches any character between a-z, A-Z, 0-9, whitespace, ., ,, ', (, ), -.
       * - {2,30} matches between 2 and 30 of the preceding token.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^[a-zA-Z0-9\s.,'()-]{2,30}$/i.test(value);
    },

    partials: [
      [
        /^[a-zA-Z0-9\s.,'()-]{2,30}$/,
        "Must contain only letters, numbers, spaces, periods, commas, hyphens, and apostrophes.",
      ],
      [/^.{2,30}$/, "Must be between 2 and 30 characters length."],
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
        `Must be a valid year in the range 1900-${new Date().getFullYear() - 18}.`,
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

  dimensions: {
    full: function dimensionsValidation(value: string) {
      /**
       * - /^(?!^$|^0*$)(?!^0*\.?0*$)[0-9]{1,3}(\.[0-9]{1,2})?$/
       * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
       * - (?!^0*\.?0*$): Negative lookahead assertion to ensure that the entire string is not empty (^0*$) or consists entirely of zeroes (^0*), optionally followed by a decimal point (\.?0*$).
       * - [0-9]{1,3}: Matches one to three digits for the integral part of the length, width, or height.
       * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the length, width, or height.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 123.45 or 123
       */
      return /^(?!^$|^0*$)(?!^0*\.?0*$)[0-9]{1,3}(\.[0-9]{1,2})?$/.test(value);
    },

    partials: [
      [/^(?!^$|^0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^(?!^0*\.?0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^[0-9]{1,3}(\.[0-9]{1,2})?$/, "Must contain only numbers."],
      [/^.{1,6}$/, "Must be between 1 and 6 characters length."],
      [
        /^[0-9]{1,3}(\.[0-9]{1,2})?$/,
        "Must contain only numbers with an optional decimal point.",
      ],
    ],
  },

  displayAspectRatio: {
    full: function displayAspectRatioValidation(value: string) {
      /**
       * - /^[0-9]{1,2}:[0-9]{1,2}$/
       * - [0-9] matches any digit between 0 and 9.
       * - {1,2} matches the preceding token between 1 and 2 times.
       * - matches the character : literally.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 16:9
       */
      return /^[0-9]{1,2}:[0-9]{1,2}$/.test(value);
    },

    partials: [
      [
        /^[0-9]{1,2}:[0-9]{1,2}$/,
        "Must be a valid display aspect ratio in the format 00:00.",
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

  frequencyResponse: {
    full: function frequencyResponseValidation(value: string) {
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
      return /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/.test(
        value
      );
    },

    partials: [
      [
        /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/,
        "Must be a valid speaker frequency response in the format 00Hz-00kHz with optional single spaces.",
      ],
    ],
  },

  largeInteger: {
    full: function largeIntegerValidation(value: string) {
      /**
       * - /^(?!^$|^0*$)[0-9]{1,6}$/
       * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
       * - [0-9]{1,6}: Matches one to six digits for the integral part of the quantity.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 123456
       */
      return /^(?!^$|^0*$)[0-9]{1,6}$/.test(value);
    },

    partials: [
      [/^(?!^$|^0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^[0-9]{1,6}$/, "Must contain only numbers."],
    ],
  },

  mediumInteger: {
    full: function mediumIntegerValidation(value: string) {
      /**
       * - /^(?!^$|^0*$)[0-9]{1,4}$/
       * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
       * - [0-9]{1,4}: Matches one to four digits for the integral part
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 1234
       */
      return /^(?!^$|^0*$)[0-9]{1,4}$/.test(value);
    },

    partials: [
      [/^(?!^$|^0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^[0-9]{1,4}$/, "Must contain only numbers."],
    ],
  },

  mobileCamera: {
    full: function mobileCameraValidation(value: string) {
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
      return /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){0,12}$/.test(value);
    },

    partials: [
      [
        /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){0,12}$/,
        "Must be a valid mobile camera resolution in the format 0 MP, 00 MP, etc.",
      ],
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

  objectKey: {
    full: function objectKeyValidation(value: string) {
      /**
       * - /^[a-zA-Z0-9_]{1,30}$/
       * - [a-zA-Z0-9_] matches any character between a-z, A-Z, 0-9, or _.
       * - {1,30} matches between 1 and 30 of the preceding token.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^[a-zA-Z0-9_]{1,30}$/.test(value);
    },

    partials: [
      [/^[a-zA-Z0-9_]$/, "Must contain only letters, numbers, and underscores."],
      [/^.{1,30}$/, "Must be between 1 and 30 characters length."],
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

  ramTiming: {
    full: function ramTimingValidation(value: string) {
      /**
       * - /^[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}$/
       * - [0-9] matches any digit between 0 and 9.
       * - {1,3} matches the preceding token between 1 and 3 times.
       * - [-] matches the character - literally.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 16-18-18-38
       */
      return /^[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}$/.test(value);
    },

    partials: [
      [
        /^[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}$/,
        "Must be a valid RAM timing in the format 00-00-00-00.",
      ],
      [/^.{11}$/, "Must be 11 characters length."],
    ],
  },

  ramVoltage: {
    full: function ramVoltageValidation(value: string) {
      /**
       * - /^[0-9]{1}[.]{1}[0-9]{1,2}$/
       * - [0-9] matches any digit between 0 and 9.
       * - {1} matches the preceding token exactly 1 time.
       * - [.] matches the character . literally.
       * - {1} matches the preceding token exactly 1 time.
       * - [0-9] matches any digit between 0 and 9.
       * - {1,2} matches the preceding token between 1 and 2 times.
       * - ^ and $ ensure that the entire string matches the regex.
       */
      return /^[0-9]{1}[.]{1}[0-9]{1,2}$/.test(value);
    },

    partials: [
      [
        /^[0-9]{1}[.]{1}[0-9]{1,2}$/,
        "Must only contain numbers and a period in the format 0.0 or 0.00.",
      ],
      [/^.{4}$/, "Must be 4 characters length."],
      [/^[0-9]+[.][0-9]+$/, "Must not be empty or have zero value."],
      [
        /^[0-9]{1}[.]{1}[0-9]{1,2}$/,
        "Must only have single digit before decimal and two digits after decimal.",
      ],
    ],
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

  smallInteger: {
    full: function smallIntegerValidation(value: string) {
      /**
       * - /^(?!^$|^0*$)[0-9]{1,2}$/
       * - (?!^$|^0*$): Negative lookahead assertion to ensure that the entire string is not empty (^$) or consists entirely of zeroes (^0*$).
       * - [0-9]{1,2}: Matches one to two digits for the integral part of the quantity.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 12
       */
      return /^(?!^$|^0*$)[0-9]{1,2}$/.test(value);
    },

    partials: [
      [/^(?!^$|^0*$)/, "Must not be empty or consist entirely of zeroes."],
      [/^[0-9]{1,2}$/, "Must contain only numbers."],
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

  userDefinedValue: {
    full: function userDefinedValueValidation(value: string) {
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
        "Must contain only letters, numbers, spaces, and special characters.",
      ],
      [/^.{2,75}$/, "Must be between 2 and 75 characters length."],
    ],
  },

  userId: {
    full: function userIdValidation(value: string) {
      /**
       * - a valid MongoDB ObjectId is a 24-character hexadecimal string.
       * - /^[0-9a-fA-F]{24}$/
       * - [0-9a-fA-F] matches any digit or letter between a-f or A-F.
       * - {24} matches the preceding token exactly 24 times.
       */
      return /^[0-9a-fA-F]{24}$/.test(value);
    },
    partials: [
      [/^[0-9a-fA-F]$/, "Must contain only hexadecimal characters."],
      [/^.{24}$/, "Must be 24 characters length."],
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

  weight: {
    full: function weightValidation(value: string) {
      /**
       * - /^[0-9]{1,3}(\.[0-9]{1,2})?$/
       * - [0-9]{1,3}: Matches one to three digits for the integral part of the weight.
       * - (\.[0-9]{1,2})?: This part is in a capturing group and is optional (?). It allows for an optional decimal point followed by one or two digits, representing the decimal part of the weight.
       * - ^ and $ ensure that the entire string matches the regex.
       * - ex: 123.45 or 123
       */
      return /^[0-9]{1,3}(\.[0-9]{1,2})?$/.test(value);
    },

    partials: [
      [
        /^[0-9]{1,3}(\.[0-9]{1,2})?$/,
        "Must contain only numbers with an optional decimal point.",
      ],
      [/^.{1,6}$/, "Must be between 1 and 6 characters length."],
    ],
  },
};

export { VALIDATION_FUNCTIONS_TABLE };
export type { ValidationKey };
