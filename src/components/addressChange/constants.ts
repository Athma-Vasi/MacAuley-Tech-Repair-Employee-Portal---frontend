import { PROVINCES, REQUEST_STATUS, STATES_US } from "../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_FULL_RANGE_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  Country,
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnDateFullRangeValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";

const ADDRESS_CHANGE_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/address-change",
  admin: "actions/general/address-change",
  employee: "actions/employee/address-change/user",
};

const ADDRESS_CHANGE_DISPLAY_LOCATION = "/home/company/address-change";

/** this function exists because country is state field ... */
function returnAddressChangeStepperPages(country: Country): StepperPage[] {
  const countryInput: StepperChild = {
    inputType: "select",
    selectInputData: COUNTRIES_DATA,
    name: "country",
  };

  const province: StepperChild = {
    inputType: "select",
    name: "province",
    selectInputData: PROVINCES,
  };

  const state: StepperChild = {
    inputType: "select",
    name: "state",
    selectInputData: STATES_US,
  };

  const addressLine: StepperChild = {
    inputType: "text",
    name: "addressLine",
    regexes: {
      full: ADDRESS_LINE_REGEX,
      partials: [
        [/^(?=.{2,75}$)/, "Must be between 2 and 75 characters length"],
        [
          /^[A-Za-z0-9\s.,#-]+$/,
          "Must contain only letters, numbers, spaces, and special characters: . , # -",
        ],
      ],
    },
  };

  const city: StepperChild = {
    inputType: "text",
    name: "city",
    regexes: {
      full: CITY_REGEX,
      partials: [
        [/^(?=.{2,75}$)/, "Must be between 2 and 75 characters length"],
        [
          /^[A-Za-z\s.\-']+$/,
          "Can only contain alphabetical characters, spaces, periods, or hyphens.",
        ],
      ],
    },
  };

  const contactNumber: StepperChild = {
    inputType: "text",
    name: "contactNumber",
    regexes: {
      full: /^(?=.{10,15}$)/,
      partials: [
        [/^(?=.{10,15}$)/, "Must be between 10 and 15 digits length."],
        [/^\d{10,15}$/, "Must only contain numbers."],
      ],
    },
  };

  const postalCode: StepperChild =
    country === "Canada"
      ? {
          inputType: "text",
          name: "postalCode",
          regexes: {
            full: POSTAL_CODE_REGEX_CANADA,
            partials: [
              [POSTAL_CODE_REGEX_CANADA, "Must be in the format A1A 1A1."],
              [/^[A-Za-z0-9]+$/, "Must only contain letters and numbers."],
            ],
          },
        }
      : {
          inputType: "text",
          name: "postalCode",
          regexes: {
            full: POSTAL_CODE_REGEX_US,
            partials: [
              [/^\d{5}$/, "Must be a valid US zip code of five digits."],
              [
                /^\d{5}[-]\d{4}$/,
                "Must be a valid US zip code of the ZIP+4 format with five digits, a hyphen, and four additional digits.",
              ],
              [/^[0-9-]+$/, "Must only contain numbers and a hyphen."],
            ],
          },
        };

  const acknowledgement: StepperChild = {
    inputType: "select",
    name: "acknowledgement",
    regexes: {
      full: /^(true)$/,
      partials: [
        [/^(true)$/, "Must acknowledge that the information entered is correct."],
      ],
    },
  };

  const stepperPage: StepperPage[] = [
    {
      children: [
        addressLine,
        city,
        countryInput,
        province,
        state,
        postalCode,
        contactNumber,
        acknowledgement,
      ],
      description: "Update your contact details",
    },
    {
      children: [],
      description: "Review contact details before proceeding",
      kind: "review",
    },
  ];

  return stepperPage;
}

const ADDRESS_CHANGE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Contact Details",
    ariaLabel:
      "Enter country, address line, city, province or state, postal or zip code, and contact number",
  },

  {
    description: "Review and Proceed",
    ariaLabel:
      "Review all the information you have entered and ensure they are correct before proceeding",
  },
];

const ADDRESS_CHANGE_MAX_STEPPER_POSITION = 2;

const COUNTRIES_DATA = ["Canada", "United States"];

const ADDRESS_CHANGE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdDate",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedDate",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Address Line",
    value: "addressLine",
    inputKind: "textInput",
    regex: ADDRESS_LINE_REGEX,
    regexValidationFn: returnAddressValidationText,
  },
  {
    label: "City",
    value: "city",
    inputKind: "textInput",
    regex: CITY_REGEX,
    regexValidationFn: returnCityValidationText,
  },
  {
    label: "Province",
    value: "province",
    inputKind: "selectInput",
    selectData: PROVINCES,
  },
  {
    label: "State",
    value: "state",
    inputKind: "selectInput",
    selectData: STATES_US,
  },
  {
    label: "Postal code",
    value: "postalCode",
    inputKind: "textInput",
  },
  {
    label: "Country",
    value: "country",
    inputKind: "selectInput",
    selectData: COUNTRIES_DATA,
  },
  {
    label: "Acknowledgement",
    value: "acknowledgement",
    inputKind: "selectInput",
    selectData: ["true", "false"],
  },
  {
    label: "Request Status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
];

const ADDRESS_CHANGE_PATHS: ResourceRoutePaths = {
  manager: "actions/company/address-change",
  admin: "actions/general/address-change",
  employee: "actions/employee/address-change/user",
};

export {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  ADDRESS_CHANGE_PATHS,
  ADDRESS_CHANGE_QUERY_DATA,
  ADDRESS_CHANGE_ROLE_PATHS,
  COUNTRIES_DATA,
  returnAddressChangeStepperPages,
  ADDRESS_CHANGE_DISPLAY_LOCATION,
};
