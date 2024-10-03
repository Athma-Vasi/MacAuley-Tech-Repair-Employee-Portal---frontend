import html2canvas from "html2canvas";
import jwtDecode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

import type { NavigateFunction } from "react-router-dom";
import { Err, Ok } from "ts-results";
import { type ColorsSwatches, PROPERTY_DESCRIPTOR } from "../constants/data";
import type { AuthAction } from "../context/authProvider";
import type { AuthDispatch } from "../context/authProvider/types";
import type { ThemeObject } from "../context/globalProvider/types";
import type {
  Country,
  DecodedToken,
  HttpServerResponse,
  PostalCode,
  QueryResponseData,
  RoleResourceRoutePaths,
  SafeBoxResult,
  UserRoles,
} from "../types";

function returnImageValidationText(image: File | Blob) {
  const imageKind = image.type.split("/")[0];
  const imageType = image.type.split("/")[1];
  const imageSize = image.size;

  const imageKindValidationRegex = /^image$/;
  const imageTypeValidationRegex = /^jpeg|png$/;
  // const imageSizeValidationRegex = /^.{0,1000000}$/;

  const imageRegexTupleArr: [boolean, string][] = [
    [imageKindValidationRegex.test(imageKind), "Must be an image kind."],
    [imageTypeValidationRegex.test(imageType), "Must be a jpeg or png."],
    [imageSize < 1000000, "Must be less than 1 MB."],
  ];

  const validationText = imageRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `${validationText}` : "";
}

type RegexValidationProps = {
  content: string;
  contentKind: string;
  maxLength?: number;
  minLength?: number;
};

function returnFilenameValidationText({
  content,
  contentKind,
  maxLength = 50,
  minLength = 1,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s.,'()-]{1,50}$/i
  const filenameLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const filenameCharacterRegex = /^[a-zA-Z0-9\s.,'()-]+$/;

  const filenameRegexTupleArr: [boolean, string][] = [
    [
      filenameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      filenameCharacterRegex.test(content),
      "Must only contain letters, numbers, spaces, periods, commas, apostrophes, hyphens, and parentheses.",
    ],
  ];

  const validationText = filenameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(" ");

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${
      contentKind.slice(
        1,
      )
    }. ${validationText}`
    : "";
}

function returnCreditCardNumberValidationText({
  content,
  contentKind,
  maxLength = 19,
  minLength = 19,
}: RegexValidationProps): string {
  // /^\d{4} \d{4} \d{4} \d{4}$/
  const creditCardNumberLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`,
  );
  const creditCardNumberCharacterRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

  const creditCardNumberRegexTupleArr: [boolean, string][] = [
    [
      creditCardNumberLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      creditCardNumberCharacterRegex.test(content),
      "Must be a valid credit card number in the format 0000 0000 0000 0000.",
    ],
  ];

  const validationText = creditCardNumberRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `Invalid ${contentKind}. ${validationText}` : "";
}

function returnFileExtensionValidationText({
  content,
  contentKind,
  maxLength = 4,
  minLength = 3,
}: RegexValidationProps): string {
  // /\.(jpg|jpeg|png|webp)$/
  const fileExtensionLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`,
  );
  const fileExtensionCharacterRegex = /\.(jpg|jpeg|png|webp)$/;

  const fileExtensionRegexTupleArr: [boolean, string][] = [
    [
      fileExtensionLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      fileExtensionCharacterRegex.test(content),
      "Must be a valid file extension in the format .jpg, .jpeg, .png, or .webp.",
    ],
  ];

  const validationText = fileExtensionRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `Invalid ${contentKind}. ${validationText}` : "";
}

function returnFileSizeValidationText({
  content,
  contentKind,
  maxLength = 6,
  minLength = 1,
}: RegexValidationProps): string {
  // /^\d{1,6}$/
  const fileSizeLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const fileSizeCharacterRegex = /^\d{1,6}$/;

  const fileSizeRegexTupleArr: [boolean, string][] = [
    [
      fileSizeLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      fileSizeCharacterRegex.test(content),
      "Must be a valid SI file size between 1 and 999_999 bytes (1MB).",
    ],
  ];

  const validationText = fileSizeRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `Invalid ${contentKind}. ${validationText}` : "";
}

function returnFileMimeTypeValidationText({
  content,
  contentKind,
  maxLength = 10,
  minLength = 10,
}: RegexValidationProps): string {
  // /^image\/(jpeg|png|webp)$/
  const fileMimeTypeLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`,
  );
  const fileMimeTypeCharacterRegex = /^image\/(jpeg|png|webp)$/;

  const fileMimeTypeRegexTupleArr: [boolean, string][] = [
    [
      fileMimeTypeLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      fileMimeTypeCharacterRegex.test(content),
      "Must be a valid file MIME type in the format image/jpeg, image/png, or image/webp.",
    ],
  ];

  const validationText = fileMimeTypeRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `Invalid ${contentKind}. ${validationText}` : "";
}

function returnFileEncodingValidationText({
  content,
  contentKind,
  maxLength = 15,
  minLength = 4,
}: RegexValidationProps): string {
  // /^(7bit|8bit|binary|quoted-printable|base64)$/
  const fileEncodingLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`,
  );
  const fileEncodingCharacterRegex =
    /^(7bit|8bit|binary|quoted-printable|base64)$/;

  const fileEncodingRegexTupleArr: [boolean, string][] = [
    [
      fileEncodingLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      fileEncodingCharacterRegex.test(content),
      "Must be a valid file encoding in the format 7bit, 8bit, binary, quoted-printable, or base64.",
    ],
  ];

  const validationText = fileEncodingRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(" ");

  return validationText ? `Invalid ${contentKind}. ${validationText}` : "";
}

function logState({
  state,
  groupLabel = "state",
  isStringify = false,
}: {
  state: Record<string, any>;
  groupLabel?: string;
  isStringify?: boolean;
}) {
  console.group(groupLabel);
  Object.entries(state).forEach(([key, value]) => {
    let identifyKey = `${key}: `;
    if (value instanceof Map) {
      identifyKey = `🗺️ Map : ${key}: `;
      value = Array.from(value.entries());
    } else if (value instanceof Set) {
      identifyKey = `⚝ Set : ${key}: `;
      value = Array.from(value);
    }

    isStringify
      ? console.log(identifyKey, JSON.stringify(value, null, 2))
      : console.log(identifyKey, value);
  });
  console.groupEnd();
}

type FilterFieldsFromObjectInput<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >,
> = {
  object: Obj;
  fieldsToFilter: Array<keyof Obj>;
};
/**
 * Pure function: Removes specified fields from an object and returns a new object with the remaining fields.
 */
function filterFieldsFromObject<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >,
  Keys extends keyof Obj = keyof Obj,
>(
  { object, fieldsToFilter }: FilterFieldsFromObjectInput<Obj>,
): Omit<Obj, Keys> {
  return Object.entries(object).reduce((obj, [key, value]) => {
    if (fieldsToFilter.includes(key)) {
      return obj;
    }
    obj[key] = value;

    return obj;
  }, Object.create(null));
}

type AddFieldsToObjectInput<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >,
> = {
  object: Obj;
  fieldValuesTuples: [keyof Obj, Obj[keyof Obj]][]; // [key, value][]
  options?: PropertyDescriptor;
};
/**
 * Pure function: Adds fields to an object using the specified key-value pairs and options.
 */
function addFieldsToObject<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >,
>({
  object,
  fieldValuesTuples,
  options = {
    writable: true,
    enumerable: true,
    configurable: true,
  },
}: AddFieldsToObjectInput<Obj>): Obj {
  return fieldValuesTuples.reduce((obj, [key, value]) => {
    Object.defineProperty(obj, key, {
      value,
      ...options,
    });

    return obj;
  }, structuredClone(object));
}

/**
 * - pure function. only works on 1st level of object
 */
function updateObjectPure<
  Obj extends Record<string | number | symbol, unknown> = Record<
    string | number | symbol,
    unknown
  >,
>(oldObject: Obj, keyValueTuples: Array<[string, unknown]>): Obj {
  return Object.entries(oldObject).reduce<Obj>(
    (newObject, [oldObjKey, oldObjValue]) => {
      const [key, value] = keyValueTuples.find(([key]) => key === oldObjKey) ??
        [
          oldObjKey,
          oldObjValue,
        ];

      Object.defineProperty(newObject, key, {
        value,
        ...PROPERTY_DESCRIPTOR,
      });

      return newObject;
    },
    Object.create(null),
  );
}

type UrlBuilderInput = {
  protocol?: string;
  host?: string;
  port?: string;
  path?: string;
  query?: string;
  hash?: string;
};
function urlBuilder({
  hash = "",
  host = "localhost",
  path = "",
  port = "5500",
  protocol = "http",
  query = "",
}: UrlBuilderInput): URL {
  return new URL(`${protocol}://${host}:${port}/api/v1/${path}${query}${hash}`);
}

type GroupQueryResponseInput = {
  queryResponseData: QueryResponseData[];
  groupBySelection: string;
  currentSelectionData: string[];
};
type GroupQueryResponseOutput = {
  groupedBy: Map<string | number, QueryResponseData[]>;
  // rest: Record<string, number>[];
};

function groupQueryResponse({
  queryResponseData,
  groupBySelection,
  currentSelectionData,
}: GroupQueryResponseInput): GroupQueryResponseOutput {
  if (groupBySelection === "none") {
    const groupedBy = queryResponseData.reduce(
      (
        acc: Map<string | number, QueryResponseData[]>,
        queryResponseObj: QueryResponseData,
      ) => {
        // acc.set('results', [...(acc.get('results') ?? []), queryResponseObj]);
        const prevResults = acc.get("results") ?? [];
        acc.set("results", [...prevResults, queryResponseObj]);

        return acc;
      },
      new Map(),
    );

    return {
      groupedBy,
    };
  }

  const groupedBy = queryResponseData.reduce(
    (
      acc: Map<string | number, Array<QueryResponseData>>,
      queryResponseObj: QueryResponseData,
    ) => {
      // find the value of the groupBySelection field
      const groupBySelectionValue = (Object.entries(queryResponseObj).find(
        ([key, _]) => key === groupBySelection,
      )?.[1] as string | number) ?? "";

      // if the groupBySelection field exists in the queryResponseObj
      if (Object.hasOwn(queryResponseObj, groupBySelection)) {
        // if groupedBy map does not have the groupBySelectionValue as a key
        if (!acc.has(groupBySelectionValue)) {
          // if groupBySelectionValue is a string[] (checkbox data)
          if (Array.isArray(groupBySelectionValue)) {
            groupBySelectionValue.forEach((value) => {
              // create it with an array as value and push the object to the array

              acc.set(value, [queryResponseObj]);
            });
          } else {
            // create it with an array as value and push the object to the array
            acc.set(groupBySelectionValue, [queryResponseObj]);
          }
        } else {
          // if it has key already, push the object to the array
          acc.get(groupBySelectionValue)?.push(queryResponseObj);
        }
      }

      return acc;
    },
    new Map(),
  );

  const sortedGroupedBy = new Map(
    [...groupedBy.entries()].sort((a, b) => {
      const aKey = a[0];
      const bKey = b[0];

      return typeof aKey === "string" && typeof bKey === "string"
        ? aKey.localeCompare(bKey)
        : typeof aKey === "number" && typeof bKey === "number"
        ? aKey - bKey
        : 0;
    }),
  );

  return {
    groupedBy: sortedGroupedBy,
  };
}

/**
 * Splits a camelCase or PascalCase string into words and capitalizes the first letter.
 *
 * This function takes a camelCase or PascalCase string as input and splits it into words
 * by inserting spaces between lowercase and uppercase letters. The first letter of the
 * resulting string is then capitalized.
 *
 * @param {string} word - The camelCase or PascalCase string to be processed.
 * @returns {string} A new string with words separated and the first letter capitalized.
 */
function splitCamelCase(word: string): string {
  // Replace lowercase-uppercase pairs with a space in between
  const splitStr = word.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Capitalize the first letter of the resulting string
  return splitStr.charAt(0).toUpperCase() + splitStr.slice(1);
}

/**
 * Replaces the last comma in a string with ' and ' if needed.
 *
 * This function takes a string as input and replaces the last comma in the string with ' and '
 * if the string contains at least one comma. It then returns the modified string.
 *
 * @param {string} str - The input string to process.
 * @returns {string} A new string with the last comma replaced by ' and ' if applicable.
 */
function replaceLastCommaWithAnd(str: string): string {
  // returns an array of matches of all occurrences of a comma
  const commaCount = str.match(/,/g)?.length ?? 0;
  // /(?=[^,]*$)/: matches a comma that is followed by zero or more non-comma characters until the end of the string, using a positive lookahead assertion (?=...).
  const strWithAnd = str.replace(/,(?=[^,]*$)/, commaCount > 0 ? " and" : "");

  return strWithAnd;
}

function replaceLastCommaWithOr(str: string): string {
  // returns an array of matches of all occurrences of a comma
  const commaCount = str.match(/,/g)?.length ?? 0;
  // /(?=[^,]*$)/: matches a comma that is followed by zero or more non-comma characters until the end of the string, using a positive lookahead assertion (?=...).
  const strWithOr = str.replace(/,(?=[^,]*$)/, commaCount > 0 ? " or" : "");

  return strWithOr;
}

function flattenObjectIterative<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >,
>(obj: Obj): Obj {
  const queue = [obj] as Record<string | symbol | number, any>[];
  const flatObj = Object.create(null);

  while (queue.length > 0) {
    const shifted = queue.shift();
    if (!shifted) {
      break;
    }

    Object.entries(shifted).forEach(([key, value]) => {
      if (
        typeof value === "object" && value !== null && !Array.isArray(value)
      ) {
        queue.push(value);
      } else {
        flatObj[key] = value;
      }
    });
  }

  return flatObj;
}

/**
 * - less than proficient implementation of Object.groupBy based on mdn docs
 * - only works on 1st level of object
 * - complexity: O(n^2)
 */
function groupBy<T = unknown>(
  iterable: Iterable<T>,
  callbackFn: (value: T) => string | symbol,
) {
  const clone = structuredClone(iterable);

  const keysSet = Array.from(clone).reduce<Set<string | symbol>>(
    (keysAcc, value) => {
      const key = callbackFn(value as T);
      keysAcc.add(key);

      return keysAcc;
    },
    new Set(),
  );

  return Array.from(keysSet).reduce<Record<string | symbol, T[]>>(
    (groupedAcc, key) => {
      const values = Array.from(clone).filter((value) =>
        callbackFn(value as T) === key
      );

      Object.defineProperty(groupedAcc, key, {
        value: values,
        ...PROPERTY_DESCRIPTOR,
      });

      return groupedAcc;
    },
    Object.create(null),
  );
}

type GroupByFieldInput<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >,
> = {
  objectArray: Obj[];
  field?: keyof Obj;
  callbackFn?: (obj: Obj) => string | number;
};

function groupByField<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >,
>({
  objectArray,
  field,
  callbackFn,
}: GroupByFieldInput<Obj>): Record<string | symbol | number, Obj[]> {
  if (!objectArray.length) {
    return Object.create(null);
  }
  if (!field && !callbackFn) {
    return Object.create(null);
  }

  return objectArray.reduce(
    (objAcc: Record<string | symbol | number, Obj[]>, obj) => {
      const objField = callbackFn ? callbackFn(obj) : field ? obj[field] : "";
      const propertyDescriptor: PropertyDescriptor = {
        writable: true,
        enumerable: true,
        configurable: true,
      };

      Object.hasOwn(objAcc, objField)
        ? Object.defineProperty(objAcc, objField, {
          value: [...objAcc[objField], obj],
          ...propertyDescriptor,
        })
        : Object.defineProperty(objAcc, objField, {
          value: [obj],
          ...propertyDescriptor,
        });

      return objAcc;
    },
    Object.create(null),
  );
}

/**
 * @desc Consolidates all the theme colors/strings creation logic used throughout into a single creator function (DRY).
 * @param {ThemeObject} themeObject - The theme object (from GlobalState)
 * @param {ColorsSwatches} colorsSwatches - The colors swatches object: implements the Open-Color color scheme. @see https://yeun.github.io/open-color/
 * @returns An object containing the theme colors.
 */
function returnThemeColors({
  themeObject,
  colorsSwatches,
}: {
  themeObject: ThemeObject;
  colorsSwatches: ColorsSwatches;
}) {
  const { colorScheme, primaryColor, primaryShade } = themeObject;
  const { dark, gray, red, green, cyan, yellow, blue, orange } = colorsSwatches;

  const lightSchemeGray = gray[8];
  const darkSchemeGray = gray[5];
  const textColor = colorScheme === "light" ? lightSchemeGray : darkSchemeGray;
  const iconGray = textColor;
  const chartTextColor = colorScheme === "light" ? gray[8] : dark[7];

  const colorShade = colorScheme === "light"
    ? primaryShade.light
    : primaryShade.dark;
  const themeColorShades = Object.entries(colorsSwatches).find(
    ([color, _shades]) => color === primaryColor,
  )?.[1];
  const themeColorShade = themeColorShades
    ? themeColorShades[colorShade]
    : gray[5];
  // all color shades
  const grayColorShade = gray[colorShade];
  const grayBorderShade = colorScheme === "light" ? gray[2] : gray[8];
  const redColorShade = red[colorShade];
  const greenColorShade = green[colorShade];
  const cyanColorShade = cyan[colorShade];
  const yellowColorShade = yellow[colorShade];
  const orangeColorShade = orange[colorShade];
  const blueColorShade = blue[colorShade];
  const sliderLabelColor = gray[3];
  const navLinkHoverShade = colorScheme === "light" ? gray[2] : gray[8];
  const navLinkActiveShade = themeColorShades
    ? colorScheme === "light" ? themeColorShades[1] : ""
    : gray[5];

  const generalColors = {
    blueColorShade,
    chartTextColor,
    cyanColorShade,
    darkSchemeGray,
    grayBorderShade,
    grayColorShade,
    greenColorShade,
    iconGray,
    lightSchemeGray,
    navLinkActiveShade,
    navLinkHoverShade,
    orangeColorShade,
    redColorShade,
    sliderLabelColor,
    textColor,
    themeColorShade,
    themeColorShades,
    yellowColorShade,
  };

  // app colors
  const borderColor = colorScheme === "light"
    ? `1px solid ${gray[3]}`
    : `1px solid ${gray[8]}`;
  const backgroundColor = colorScheme === "light"
    // ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
    ? "#f5f5f5"
    : dark[6];
  const redBorderColor = `1px solid ${redColorShade}`;
  const appThemeColors = {
    borderColor,
    backgroundColor,
    redBorderColor,
  };

  // for table display
  const tableHeadersBgColor = colorScheme === "light" ? gray[4] : gray[8];
  const headersIconColor = colorScheme === "light" ? gray[5] : gray[7];
  const headerBorderColor = colorScheme === "light"
    ? `2px solid ${gray[2]}`
    : `2px solid ${gray[7]}`;
  const rowsBorderColor = colorScheme === "light"
    ? `1px solid ${gray[2]}`
    : `1px solid ${gray[8]}`;
  const textHighlightColor = colorScheme === "light" ? gray[3] : gray[6];
  const tablesThemeColors = {
    tableHeadersBgColor,
    headerBorderColor,
    headersIconColor,
    rowsBorderColor,
    textHighlightColor,
  };

  // directory graph colors
  const edgeStrokeColor = colorScheme === "light" ? dark[5] : gray[8];
  const nodeBackgroundColor = colorScheme === "light"
    // ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
    ? "#f5f5f5"
    : dark[6];
  const nodeBorderColor = colorScheme === "light"
    ? `1px solid ${dark[1]}`
    : `1px solid ${gray[8]}`;
  const nodeTextColor = colorScheme === "light" ? gray[8] : gray[5];
  const directoryGraphThemeColors = {
    edgeStrokeColor,
    nodeBackgroundColor,
    nodeBorderColor,
    nodeTextColor,
  };

  // for ScrollArea styles
  const scrollBarStyle = {
    scrollbar: {
      "&, &:hover": {
        background: colorScheme === "dark" ? dark[6] : gray[0],
      },

      '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
        backgroundColor: themeColorShade,
      },

      '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
        backgroundColor: themeColorShade,
      },
    },

    corner: {
      opacity: 1,
      background: colorScheme === "dark" ? dark[6] : gray[0],
    },
  };

  return {
    appThemeColors,
    directoryGraphThemeColors,
    generalColors,
    scrollBarStyle,
    tablesThemeColors,
  };
}

/**
 * @description Pure function. Shuffles an array using the Fisher-Yates algorithm. @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray<T>(array: T[]): T[] {
  if (!array.length) {
    return array;
  }

  let currentIndex = array.length;
  let randomIndex = 0;
  const clonedArray = structuredClone(array);

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [clonedArray[currentIndex], clonedArray[randomIndex]] = [
      clonedArray[randomIndex],
      clonedArray[currentIndex],
    ];
  }

  return clonedArray;
}

type ToggleNavlinksActiveInput<
  State extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >,
> = {
  navlinksState: State;
  toggledNavlink: keyof State;
  payload: State[keyof State];
};
/**
 * @description Toggles the currently clicked navlink to active and all other navlinks to inactive
 */
function toggleNavlinksActive<
  State extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >,
>(
  { navlinksState, toggledNavlink, payload }: ToggleNavlinksActiveInput<State>,
): State {
  return Object.keys(navlinksState).reduce(
    (acc: State, navlink) => {
      navlink === toggledNavlink
        ? Object.defineProperty(acc, navlink, {
          value: payload,
          ...PROPERTY_DESCRIPTOR,
        })
        : Object.defineProperty(acc, navlink, {
          value: false,
          ...PROPERTY_DESCRIPTOR,
        });

      return acc;
    },
    Object.create(null),
  );
}

// function to display elapsed time from given date
function returnElapsedTime(date: string) {
  const now = new Date();
  const then = new Date(date);
  const elapsed = now.getTime() - then.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }
  if (hours === 24) {
    return "1 day ago";
  }
  if (hours >= 1) {
    return `${hours} hours ago`;
  }
  if (minutes >= 1) {
    return `${minutes} minutes ago`;
  }
  if (seconds >= 1) {
    return `${seconds} seconds ago`;
  }
  return "just now";
}

function returnTimeRemaining(date: string) {
  const now = new Date();
  const then = new Date(date);
  const remaining = then.getTime() - now.getTime();
  const seconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} days left`;
  }
  if (hours === 24) {
    return "1 day left";
  }
  if (hours >= 1) {
    return `${hours} hours left`;
  }
  if (minutes >= 1) {
    return `${minutes} minutes left`;
  }
  if (seconds >= 1) {
    return `${seconds} seconds left`;
  }
  return "just now";
}

function returnIsAccessTokenExpired(accessToken: string): {
  isAccessTokenExpired: boolean;
} {
  const decodedToken: DecodedToken = jwtDecode(accessToken);
  const { exp: accessTokenExpiration } = decodedToken;
  // buffer of 10 seconds to refresh access token
  const isAccessTokenExpired =
    accessTokenExpiration * 1000 - 10000 < Date.now();

  return { isAccessTokenExpired };
}

/**
 * @description replaces hyphens & underscores with spaces and capitalizes the first letter of each word
 */
function splitWordIntoUpperCasedSentence(sentence: string): string {
  return sentence
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * @description creates marks for slider wrapper component
 */
function returnSliderMarks({
  max,
  min,
  precision = 0,
  steps = 2,
  symbol = "",
}: {
  max: number;
  min: number;
  steps?: number;
  precision?: number;
  symbol?: string;
}): { value: number; label: string }[] {
  const step = (max - min) / steps;

  return Array.from({ length: steps + 1 }, (_, i) => {
    const value = min + step * i;
    const valueFormatted = value.toFixed(precision);

    return {
      value: Number.parseInt(valueFormatted),
      label: `${valueFormatted}${symbol}`,
    };
  });
}

type CaptureScreenshotInput = {
  chartRef: any;
  screenshotFilename: string;
  screenshotImageQuality: number;
  screenshotImageType: string;
};
/**
 * Captures a screenshot of a chart rendered in the browser and triggers a download.
 * @see https://medium.com/@pro.grb.studio/how-to-screencapture-in-reactjs-step-by-step-guide-b435e8b53e11
 * @param {CaptureScreenshotInput} options - Options for capturing the screenshot.
 * @param {any} options.chartRef - A reference to the chart element to capture.
 * @param {string} options.screenshotFilename - The desired filename for the screenshot.
 * @param {number} options.screenshotImageQuality - The quality of the screenshot image (0-1).
 * @param {string} options.screenshotImageType - The type of the image (image/webp, 'image/png', 'image/jpeg').
 * @returns {Promise<void>}
 */
async function captureScreenshot({
  chartRef,
  screenshotFilename,
  screenshotImageQuality,
  screenshotImageType,
}: CaptureScreenshotInput): Promise<void> {
  const canvasPromise = html2canvas(chartRef.current, {
    useCORS: true,
  });
  canvasPromise.then((canvas) => {
    const dataURL = canvas.toDataURL(
      screenshotImageType,
      screenshotImageQuality,
    );
    // Create an image element from the data URL
    const img = new Image();
    img.src = dataURL;
    // Create a link element
    const a = document.createElement("a");
    // Set the href of the link to the data URL of the image
    a.href = img.src;

    const filename = screenshotFilename ? screenshotFilename : uuidv4();
    const extension = screenshotImageType.split("/")[1];

    // Set the download attribute of the link
    a.download = `${filename}.${extension}`;
    // Append the link to the page
    document.body.appendChild(a);
    // Click the link to trigger the download
    a.click();
    // Remove the link from the page
    document.body.removeChild(a);
  });
}

function addCommaSeparator(numStr: string | number): string {
  return numStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFixedFloat(num: number, precision = 4): number {
  return Number(num.toFixed(precision));
}

function removeUndefinedAndNull<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

function capitalizeAll(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function capitalizeJoinWithAnd(strings: string[]): string {
  const joined = strings
    // .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .map((string) => splitCamelCase(string))
    .join(", ");
  return replaceLastCommaWithAnd(joined);
}

function returnTimeToRead(string: string) {
  const wordsPerMinute = 200;
  const textLength = string.split(" ").length;
  return Math.ceil(textLength / wordsPerMinute);
}

async function decodeJWTSafe<Decoded extends DecodedToken = DecodedToken>(
  token: string,
): Promise<SafeBoxResult<Decoded>> {
  try {
    const decoded: Decoded = jwtDecode(token);
    return new Ok({ data: decoded, kind: "success" });
  } catch (error: unknown) {
    return new Err({ data: error, kind: "error" });
  }
}

async function fetchSafe(input: RequestInfo | URL, init?: RequestInit): Promise<
  SafeBoxResult<Response>
> {
  try {
    const response: Response = await fetch(input, init);
    return new Ok({ data: response, kind: "success" });
  } catch (error: unknown) {
    return new Err({ data: error, kind: "error" });
  }
}

async function responseToJSONSafe<Data = unknown>(
  response: Response,
): Promise<SafeBoxResult<Data>> {
  try {
    const data: Data = await response.json();
    return new Ok({ data, kind: "success" });
  } catch (error: unknown) {
    return new Err({ data: error, kind: "error" });
  }
}

async function fetchRequestGETTokensSafe(
  {
    accessToken,
    authAction,
    authDispatch,
    customUrl,
    fetchAbortController,
    isComponentMounted,
    refreshToken,
  }: {
    accessToken: string;
    authAction: AuthAction;
    authDispatch: React.Dispatch<AuthDispatch>;
    customUrl:
      | URL
      | string;
    /** must be defined outside useEffect */
    fetchAbortController: AbortController;
    /** must be defined outside useEffect */
    isComponentMounted: boolean;
    refreshToken: string;
  },
) {
  const requestInit: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    method: "GET",
    signal: fetchAbortController.signal,
  };

  try {
    const responseResult = await fetchSafe(customUrl, requestInit);

    if (responseResult.err) {
      return new Err({
        data: responseResult.val.data ??
          new Error("Network error", {
            cause: responseResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const responseUnwrapped = responseResult.safeUnwrap().data;
    if (responseUnwrapped === undefined) {
      return new Ok({ kind: "error", message: "Response is undefined" });
    }

    if (!responseUnwrapped.ok) {
      return new Ok({ kind: "error", message: responseUnwrapped.statusText });
    }

    const jsonResult = await responseToJSONSafe<HttpServerResponse>(
      responseUnwrapped,
    );

    if (jsonResult.err) {
      return new Err({
        data: jsonResult.val.data ??
          new Error("Network error", {
            cause: jsonResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const serverResponse = jsonResult.safeUnwrap().data;
    if (serverResponse === undefined) {
      return new Ok({ kind: "error", message: "JSON data is undefined" });
    }

    authDispatch({
      action: authAction.setAccessToken,
      payload: serverResponse.accessToken,
    });
    authDispatch({
      action: authAction.setRefreshToken,
      payload: serverResponse.refreshToken,
    });
    authDispatch({
      action: authAction.setIsLoggedIn,
      payload: true,
    });

    return new Ok({ data: serverResponse, kind: "success" });
  } catch (error: unknown) {
    return new Err({ data: error, kind: "error" });
  }
}

async function fetchRequestPOSTSafe<
  DBRecord = Record<string, unknown> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  },
  IsSubmittingAction extends string = string,
  IsSuccessfulAction extends string = string,
  TriggerFormSubmitAction extends string = string,
>(
  {
    accessToken = "",
    authAction,
    authDispatch,
    closeSubmitFormModal,
    customUrl,
    dispatch,
    fetchAbortController,
    isComponentMounted,
    isSubmittingAction,
    isSuccessfulAction,
    navigateFn,
    openSubmitFormModal,
    queryString,
    requestBody,
    roleResourceRoutePaths,
    roles,
    schema,
    triggerFormSubmitAction,
  }: {
    accessToken?: string;
    authAction: AuthAction;
    authDispatch: React.Dispatch<AuthDispatch>;
    closeSubmitFormModal: () => void;
    customUrl?: URL | string;
    dispatch: React.Dispatch<{
      action: IsSubmittingAction | IsSuccessfulAction | TriggerFormSubmitAction;
      payload: boolean;
    }>;
    /** must be defined outside useEffect */
    fetchAbortController: AbortController;
    /** must be defined outside useEffect */
    isComponentMounted: boolean;
    isSubmittingAction: IsSubmittingAction;
    isSuccessfulAction: IsSuccessfulAction;
    navigateFn: NavigateFunction;
    openSubmitFormModal: () => void;
    queryString?: string;
    requestBody?: string | FormData;
    roleResourceRoutePaths?: RoleResourceRoutePaths;
    roles: UserRoles;
    schema?: Record<string, unknown>;
    triggerFormSubmitAction: TriggerFormSubmitAction;
  },
): Promise<SafeBoxResult<HttpServerResponse<DBRecord>>> {
  openSubmitFormModal();

  dispatch({
    action: isSubmittingAction,
    payload: true,
  });

  const userRole = roles.includes("Manager")
    ? "manager"
    : roles.includes("Admin")
    ? "admin"
    : "employee";

  const url = customUrl ??
    urlBuilder({
      path: roleResourceRoutePaths?.[userRole],
      query: queryString,
    });

  const body = requestBody ??
    JSON.stringify({ schema: schema ?? {} });

  const requestInit: RequestInit = {
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    signal: fetchAbortController.signal,
  };

  try {
    const responseResult = await fetchSafe(url, requestInit);

    if (responseResult.err) {
      return new Err({
        data: responseResult.val.data ??
          new Error("Network error", {
            cause: responseResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const responseUnwrapped = responseResult.safeUnwrap().data;
    if (responseUnwrapped === undefined) {
      return new Ok({ kind: "error", message: "Response is undefined" });
    }

    if (!responseUnwrapped.ok) {
      return new Ok({ kind: "error", message: responseUnwrapped.statusText });
    }

    const jsonResult = await responseToJSONSafe<HttpServerResponse<DBRecord>>(
      responseUnwrapped,
    );

    if (jsonResult.err) {
      return new Err({
        data: jsonResult.val.data ??
          new Error("Network error", {
            cause: jsonResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const serverResponse = jsonResult.safeUnwrap().data;
    if (serverResponse === undefined) {
      return new Ok({ kind: "error", message: "JSON data is undefined" });
    }

    if (serverResponse.triggerLogout) {
      authDispatch({
        action: authAction.setAccessToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setRefreshToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setIsLoggedIn,
        payload: false,
      });
      authDispatch({
        action: authAction.setDecodedToken,
        payload: Object.create(null),
      });
      authDispatch({
        action: authAction.setUserDocument,
        payload: Object.create(null),
      });

      navigateFn("/login");

      return new Err({
        data: new Error("Unauthorized access", {
          cause: "Invalid token",
        }),
        kind: "error",
      });
    }

    dispatch({
      action: isSuccessfulAction,
      payload: true,
    });
    dispatch({
      action: isSubmittingAction,
      payload: false,
    });
    dispatch({
      action: triggerFormSubmitAction,
      payload: false,
    });

    return new Ok({ data: serverResponse, kind: "success" });
  } catch (error: unknown) {
    if (
      !isComponentMounted ||
      error instanceof Error && error?.name === "AbortError"
    ) {
      return new Ok({ kind: "error" });
    }

    return new Err({ data: error, kind: "error" });
  } finally {
    closeSubmitFormModal();
  }
}

async function fetchRequestGETSafe<
  DBRecord = Record<string, unknown> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  },
  SetIsLoadingAction extends string = string,
  SetResourceDataAction extends string = string,
  SetTotalDocumentsAction extends string = string,
  SetTotalPagesAction extends string = string,
  SetLoadingMessageAction extends string = string,
  TriggerFormSubmitAction extends string = string,
>({
  accessToken,
  authAction,
  authDispatch,
  closeSubmitFormModal,
  customUrl,
  fetchAbortController,
  isComponentMounted,
  loadingMessage,
  navigateFn,
  openSubmitFormModal,
  parentDispatch,
  queryString,
  roleResourceRoutePaths,
  roles,
  setIsLoadingAction,
  setLoadingMessageAction,
  setResourceDataAction,
  setTotalDocumentsAction,
  setTotalPagesAction,
  triggerFormSubmitAction,
}: {
  accessToken: string;
  authAction: AuthAction;
  authDispatch: React.Dispatch<AuthDispatch>;
  closeSubmitFormModal: () => void;
  customUrl?: URL | string;
  fetchAbortController: AbortController;
  isComponentMounted: boolean;
  loadingMessage: string;
  navigateFn: NavigateFunction;
  openSubmitFormModal: () => void;
  parentDispatch: React.Dispatch<
    | {
      action: SetIsLoadingAction | TriggerFormSubmitAction;
      payload: boolean;
    }
    | {
      action: SetLoadingMessageAction;
      payload: string;
    }
    | {
      action: SetResourceDataAction;
      payload: Array<DBRecord>;
    }
    | {
      action: SetTotalDocumentsAction | SetTotalPagesAction;
      payload: number;
    }
  >;
  queryString: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
  roles: UserRoles;
  setResourceDataAction: SetResourceDataAction;
  setIsLoadingAction: SetIsLoadingAction;
  setLoadingMessageAction: SetLoadingMessageAction;
  setTotalDocumentsAction: SetTotalDocumentsAction;
  setTotalPagesAction: SetTotalPagesAction;
  triggerFormSubmitAction?: TriggerFormSubmitAction;
}): Promise<SafeBoxResult<HttpServerResponse<DBRecord>>> {
  openSubmitFormModal();

  parentDispatch({
    action: setIsLoadingAction,
    payload: true,
  });
  parentDispatch({
    action: setLoadingMessageAction,
    payload: loadingMessage,
  });

  const userRole = roles.includes("Manager")
    ? "manager"
    : roles.includes("Admin")
    ? "admin"
    : "employee";

  const url = customUrl ??
    urlBuilder({ path: roleResourceRoutePaths[userRole], query: queryString });

  const requestInit: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
    signal: fetchAbortController.signal,
  };

  try {
    const responseResult = await fetchSafe(url, requestInit);

    if (responseResult.err) {
      return new Err({
        data: responseResult.val.data ??
          new Error("Network error", {
            cause: responseResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const responseUnwrapped = responseResult.safeUnwrap().data;
    if (responseUnwrapped === undefined) {
      return new Ok({ kind: "error", message: "Response is undefined" });
    }

    if (!responseUnwrapped.ok) {
      return new Ok({ kind: "error", message: responseUnwrapped.statusText });
    }

    const jsonResult = await responseToJSONSafe<HttpServerResponse<DBRecord>>(
      responseUnwrapped,
    );

    if (jsonResult.err) {
      return new Err({
        data: jsonResult.val.data ??
          new Error("Network error", {
            cause: jsonResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const serverResponse = jsonResult.safeUnwrap().data;
    if (serverResponse === undefined) {
      return new Ok({ kind: "error", message: "JSON data is undefined" });
    }

    if (serverResponse.triggerLogout) {
      authDispatch({
        action: authAction.setAccessToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setRefreshToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setIsLoggedIn,
        payload: false,
      });
      authDispatch({
        action: authAction.setDecodedToken,
        payload: Object.create(null),
      });
      authDispatch({
        action: authAction.setUserDocument,
        payload: Object.create(null),
      });

      navigateFn("/login");

      return new Err({
        data: new Error("Unauthorized access", {
          cause: "Invalid token",
        }),
        kind: "error",
      });
    }

    parentDispatch({
      action: setResourceDataAction,
      payload: serverResponse.data,
    });
    parentDispatch({
      action: setTotalDocumentsAction,
      payload: serverResponse.totalDocuments,
    });
    parentDispatch({
      action: setTotalPagesAction,
      payload: serverResponse.pages,
    });
    parentDispatch({
      action: setIsLoadingAction,
      payload: false,
    });

    if (triggerFormSubmitAction) {
      parentDispatch({
        action: triggerFormSubmitAction,
        payload: false,
      });
    }

    return new Ok({ kind: "success", data: serverResponse });
  } catch (error: unknown) {
    if (
      !isComponentMounted ||
      error instanceof Error && error?.name === "AbortError"
    ) {
      return new Ok({ kind: "error" });
    }

    return new Err({ data: error, kind: "error" });
  } finally {
    closeSubmitFormModal();
  }
}

async function fetchRequestPATCHSafe<
  DBRecord = Record<string, unknown> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  },
  SetIsSubmittingAction extends string = string,
  SetSubmittingMessageAction extends string = string,
  SetResourceDataAction extends string = string,
  SetTotalDocumentsAction extends string = string,
  SetTotalPagesAction extends string = string,
  TriggerFormSubmitAction extends string = string,
>({
  accessToken,
  authAction,
  authDispatch,
  closeSubmitFormModal,
  customUrl,
  fetchAbortController,
  isComponentMounted,
  navigateFn,
  openSubmitFormModal,
  parentDispatch,
  requestBody,
  roleResourceRoutePaths,
  roles,
  setIsSubmittingAction,
  setResourceDataAction,
  setSubmittingMessageAction,
  submitMessage,
  triggerFormSubmitAction,
}: {
  accessToken: string;
  authAction: AuthAction;
  authDispatch: React.Dispatch<AuthDispatch>;
  closeSubmitFormModal: () => void;
  customUrl?: URL | string;
  fetchAbortController: AbortController;
  isComponentMounted: boolean;
  navigateFn: NavigateFunction;
  openSubmitFormModal: () => void;
  parentDispatch: React.Dispatch<
    | {
      action: SetIsSubmittingAction | TriggerFormSubmitAction;
      payload: boolean;
    }
    | {
      action: SetSubmittingMessageAction;
      payload: string;
    }
    | {
      action: SetResourceDataAction;
      payload: Array<DBRecord>;
    }
    | {
      action: SetTotalDocumentsAction | SetTotalPagesAction;
      payload: number;
    }
  >;
  requestBody: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
  roles: UserRoles;
  setIsSubmittingAction: SetIsSubmittingAction;
  setResourceDataAction?: SetResourceDataAction;
  setSubmittingMessageAction: SetSubmittingMessageAction;
  submitMessage: string;
  triggerFormSubmitAction: TriggerFormSubmitAction;
}): Promise<SafeBoxResult<HttpServerResponse<DBRecord>>> {
  openSubmitFormModal();

  parentDispatch({
    action: setSubmittingMessageAction,
    payload: submitMessage,
  });

  const userRole = roles.includes("Manager")
    ? "manager"
    : roles.includes("Admin")
    ? "admin"
    : "employee";

  const url = customUrl ??
    urlBuilder({ path: roleResourceRoutePaths[userRole] });

  const requestInit: RequestInit = {
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "PATCH",
    mode: "cors",
    signal: fetchAbortController.signal,
  };

  try {
    const responseResult = await fetchSafe(url, requestInit);

    if (responseResult.err) {
      return new Err({
        data: responseResult.val.data ??
          new Error("Network error", {
            cause: responseResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const responseUnwrapped = responseResult.safeUnwrap().data;
    if (responseUnwrapped === undefined) {
      return new Ok({ kind: "error", message: "Response is undefined" });
    }

    if (!responseUnwrapped.ok) {
      return new Ok({ kind: "error", message: responseUnwrapped.statusText });
    }

    const jsonResult = await responseToJSONSafe<HttpServerResponse<DBRecord>>(
      responseUnwrapped,
    );

    if (jsonResult.err) {
      return new Err({
        data: jsonResult.val.data ??
          new Error("Network error", {
            cause: jsonResult.val.message ?? "Unknown error",
          }),
        kind: "error",
      });
    }

    if (!isComponentMounted) {
      return new Ok({ kind: "error", message: "Component is not mounted" });
    }

    const serverResponse = jsonResult.safeUnwrap().data;
    if (serverResponse === undefined) {
      return new Ok({ kind: "error", message: "JSON data is undefined" });
    }

    if (serverResponse.triggerLogout) {
      authDispatch({
        action: authAction.setAccessToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setRefreshToken,
        payload: "",
      });
      authDispatch({
        action: authAction.setIsLoggedIn,
        payload: false,
      });
      authDispatch({
        action: authAction.setDecodedToken,
        payload: Object.create(null),
      });
      authDispatch({
        action: authAction.setUserDocument,
        payload: Object.create(null),
      });

      navigateFn("/login");

      return new Err({
        data: new Error("Unauthorized access", {
          cause: "Invalid token",
        }),
        kind: "error",
      });
    }

    if (setResourceDataAction) {
      parentDispatch({
        action: setResourceDataAction,
        payload: serverResponse.data,
      });
    }

    parentDispatch({
      action: setIsSubmittingAction,
      payload: false,
    });
    parentDispatch({
      action: triggerFormSubmitAction,
      payload: false,
    });

    return new Ok({ kind: "success" });
  } catch (error: unknown) {
    if (
      !isComponentMounted ||
      error instanceof Error && error?.name === "AbortError"
    ) {
      return new Ok({ kind: "error" });
    }

    return new Err({ data: error, kind: "error" });
  } finally {
    closeSubmitFormModal();
  }
}

export {
  addCommaSeparator,
  addFieldsToObject,
  capitalizeAll,
  capitalizeJoinWithAnd,
  captureScreenshot,
  decodeJWTSafe,
  fetchRequestGETSafe,
  fetchRequestGETTokensSafe,
  fetchRequestPATCHSafe,
  fetchRequestPOSTSafe,
  fetchSafe,
  filterFieldsFromObject,
  flattenObjectIterative,
  groupBy,
  groupByField,
  groupQueryResponse,
  logState,
  removeUndefinedAndNull,
  replaceLastCommaWithAnd,
  replaceLastCommaWithOr,
  responseToJSONSafe,
  returnCreditCardNumberValidationText,
  returnElapsedTime,
  returnFileEncodingValidationText,
  returnFileExtensionValidationText,
  returnFileMimeTypeValidationText,
  returnFilenameValidationText,
  returnFileSizeValidationText,
  returnImageValidationText,
  returnIsAccessTokenExpired,
  returnSliderMarks,
  returnThemeColors,
  returnTimeRemaining,
  returnTimeToRead,
  shuffleArray,
  splitCamelCase,
  splitWordIntoUpperCasedSentence,
  toFixedFloat,
  toggleNavlinksActive,
  updateObjectPure,
  urlBuilder,
};

export type { RegexValidationProps };
