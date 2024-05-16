import { Country, PostalCode } from "../../types";

type InputsRegexes = Record<
  string, // input name
  {
    /** must be a superset of partialRegexes. input error state is determined by fullRegex test */
    fullRegex: RegExp;
    /** must be subset(s) of fullRegex. input popover error messages are determined by partialRegexes tests */
    partialRegexes: [RegExp, string][]; // [regex, validationErrorMessage]
  }
>;

type ValidationTexts = {
  valueValidText: string;
  valueInvalidText: string;
};

function validationTexts(name: string, tuples: [boolean, string][]) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  let valueInvalidText = tuples
    .filter(([isValueValid, _]) => !isValueValid)
    .map(([_, text]) => text)
    .join(" ");
  valueInvalidText = `${capitalizedName} is invalid. ${valueInvalidText}`;

  return {
    valueValidText: `${capitalizedName} is valid.`,
    valueInvalidText,
  };
}

/**
 * Performs basic address validation [A-Za-z0-9\s.,#-] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function createAddressValidationTexts({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  // /^[A-Za-z0-9\s.,#-]{2,75}$/i
  const addressLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const addressCharacterRegex = /^[A-Za-z0-9\s.,#-]+$/;

  const tuples: [boolean, string][] = [
    [
      addressLengthRegex.test(value),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      addressCharacterRegex.test(value),
      "Can only contain alphanumeric characters, spaces, periods, commas, hyphens, or pound signs.",
    ],
  ];

  return validationTexts(name, tuples);
}

/**
 * Performs basic city validation [A-Za-z\s.\-'] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function createCityValidationTexts({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  const cityLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const cityCharacterRegex = /^[A-Za-z\s.\-']+$/;

  const tuples: [boolean, string][] = [
    [cityLengthRegex.test(value), "Must be between 2 and 75 characters."],
    [
      cityCharacterRegex.test(value),
      "Can only contain alphabetical characters, spaces, periods, or hyphens.",
    ],
  ];

  return validationTexts(name, tuples);
}

function createPhoneNumberValidationTexts({
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  const phoneNumberLengthRegex = /^(?=.{10,15}$)/;
  const phoneNumberRegex = /^\d{10,15}$/;

  const tuples: [boolean, string][] = [
    [phoneNumberRegex.test(value), "Only numbers are allowed."],
    [phoneNumberLengthRegex.test(value), "Must be between 10 and 15 digits."],
  ];

  return validationTexts(name, tuples);
}

function createPostalCodeValidationTexts({
  country,
  name,
  value,
}: {
  value: PostalCode;
  country: Country;
  name: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  if (country === "United States") {
    const postalCodeUSRegex = /^\d{5}(?:[-]\d{4})?$/;

    const tuples: [boolean, string][] = [
      [
        postalCodeUSRegex.test(value),
        "Invalid zip code. Must be a valid US zip code of either five digits or the ZIP+4 format with five digits, a hyphen, and four additional digits. Only numbers and hyphens are allowed.",
      ],
    ];

    return validationTexts(name, tuples);
  }

  // canada
  const firstPartRegex = /^[A-Za-z]\d[A-Za-z]$/i;
  const firstPart = value.split(" ")[0];

  const lastPartRegex = /^\d[A-Za-z]\d$/i;
  const lastPart = value.split(" ")[1];

  const tuples: [boolean, string][] = [
    [
      firstPartRegex.test(firstPart),
      "Forward Sortation Area must consist of a letter, digit, letter.",
    ],
    [
      lastPartRegex.test(lastPart),
      "Local Delivery Unit must consist of a digit, letter, digit.",
    ],
  ];

  return validationTexts(name, tuples);
}

function createDateValidationText({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/;

  const day = value.split("-")[2];
  const month = value.split("-")[1];
  const year = value.split("-")[0];

  const tuples: [boolean, string][] = [
    [day ? dayRegex.test(day) : true, "Must be a valid day. Cannot be greater than 31."],
    [
      month ? monthRegex.test(month) : true,
      "Must be a valid month. Cannot be greater than 12.",
    ],
    [year ? yearRegex.test(year) : true, "Must be a valid year between 1900 and 2024."],
  ];

  return validationTexts(name, tuples);
}

function createDateNearFutureValidationText({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[3-6])$/;

  const day = value.split("-")[2];
  const month = value.split("-")[1];
  const year = value.split("-")[0];

  const isDayInPast = day ? parseInt(day) < new Date().getDate() : false;
  const isMonthInPast = month ? parseInt(month) < new Date().getMonth() + 1 : false;
  const isYearInPast = year ? parseInt(year) < new Date().getFullYear() : false;

  const isEnteredYearMonthDayInPast = isYearInPast
    ? isMonthInPast
      ? isDayInPast
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInPast = isYearInPast ? (isMonthInPast ? true : false) : false;
  const isEnteredDayInPast = day ? parseInt(day) < new Date().getDate() : false;

  const tuples: [boolean, string][] = [
    [day ? dayRegex.test(day) : true, "Must be a valid day. Cannot be greater than 31."],
    [
      month ? monthRegex.test(month) : true,
      "Must be a valid month. Cannot be greater than 12.",
    ],
    [year ? yearRegex.test(year) : true, "Must be a valid year between 2023 and 2026."],
    [
      isEnteredYearMonthInPast && !isEnteredDayInPast ? false : true,
      `Month of ${month} must be in the future.`,
    ],
    [
      isEnteredDayInPast && !isEnteredYearMonthInPast ? false : true,
      `Day of ${day} must be in the future.`,
    ],
    [
      isEnteredYearMonthDayInPast ? false : true,
      `Date of ${value} must be in the future.`,
    ],
  ];

  return validationTexts(name, tuples);
}

function createDateNearPastValidationText({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  // /^(?:202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[0-3])$/;

  const day = value.split("-")[2];
  const month = value.split("-")[1];
  const year = value.split("-")[0];

  const isDayInFuture = day ? parseInt(day) > new Date().getDate() : false;
  const isMonthInFuture = month ? parseInt(month) > new Date().getMonth() + 1 : false;
  const isYearInFuture = year ? parseInt(year) > new Date().getFullYear() : false;

  const isEnteredYearMonthDayInFuture = isYearInFuture
    ? isMonthInFuture
      ? isDayInFuture
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInFuture = isYearInFuture
    ? isMonthInFuture
      ? true
      : false
    : false;
  const isEnteredDayInFuture = day ? parseInt(day) > new Date().getDate() : false;

  const tuples: [boolean, string][] = [
    [day ? dayRegex.test(day) : true, "Must be a valid day. Cannot be greater than 31."],
    [
      month ? monthRegex.test(month) : true,
      "Must be a valid month. Cannot be greater than 12.",
    ],
    [year ? yearRegex.test(year) : true, "Must be a valid year between 2020 and 2023."],
    [
      isEnteredYearMonthInFuture && !isEnteredDayInFuture ? false : true,
      `Month of ${month} must be in the past.`,
    ],
    [
      isEnteredDayInFuture && !isEnteredYearMonthInFuture ? false : true,
      `Day of ${day} must be in the past.`,
    ],
    [
      isEnteredYearMonthDayInFuture ? false : true,
      `Date of ${value} must be in the past.`,
    ],
  ];

  return validationTexts(name, tuples);
}

function createDateFullRangeValidationText({
  maxLength = 75,
  minLength = 2,
  name,
  value,
}: {
  maxLength?: number;
  minLength?: number;
  name: string;
  value: string;
}): {
  valueValidText: string;
  valueInvalidText: string;
} {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-6])$/;

  const day = value.split("-")[2];
  const month = value.split("-")[1];
  const year = value.split("-")[0];

  const isDayInFuture = day ? parseInt(day) > new Date().getDate() : false;
  const isMonthInFuture = month ? parseInt(month) > new Date().getMonth() + 1 : false;
  const isYearInFuture = year ? parseInt(year) > new Date().getFullYear() : false;

  const isEnteredYearMonthDayInFuture = isYearInFuture
    ? isMonthInFuture
      ? isDayInFuture
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInFuture = isYearInFuture
    ? isMonthInFuture
      ? true
      : false
    : false;
  const isEnteredDayInFuture = day ? parseInt(day) > new Date().getDate() : false;

  const tuples: [boolean, string][] = [
    [day ? dayRegex.test(day) : true, "Must be a valid day. Cannot be greater than 31."],
    [
      month ? monthRegex.test(month) : true,
      "Must be a valid month. Cannot be greater than 12.",
    ],
    [year ? yearRegex.test(year) : true, "Must be a valid year between 1900 and 2026."],
    [
      isEnteredYearMonthInFuture && !isEnteredDayInFuture ? false : true,
      `Month of ${month} must be in the past.`,
    ],
    [
      isEnteredDayInFuture && !isEnteredYearMonthInFuture ? false : true,
      `Day of ${day} must be in the past.`,
    ],
    [
      isEnteredYearMonthDayInFuture ? false : true,
      `Date of ${value} must be in the past.`,
    ],
  ];

  return validationTexts(name, tuples);
}

export {
  createAddressValidationTexts,
  createCityValidationTexts,
  createDateFullRangeValidationText,
  createDateNearFutureValidationText,
  createDateNearPastValidationText,
  createDateValidationText,
  createPhoneNumberValidationTexts,
  createPostalCodeValidationTexts,
};

export type { ValidationTexts, InputsRegexes };
