import { PROVINCES, REQUEST_STATUS, STATES_US } from "../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_FULL_RANGE_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ACKNOWLEDGEMENT_VALIDATIONS } from "../../constants/validations";
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
import {
  ADDRESS_LINE_VALIDATIONS,
  CANADIAN_POSTAL_CODE_VALIDATIONS,
  CITY_VALIDATIONS,
  CONTACT_NUMBER_VALIDATIONS,
  US_POSTAL_CODE_VALIDATIONS,
} from "./create/validations";

const ADDRESS_CHANGE_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/address-change",
  admin: "actions/general/address-change",
  employee: "actions/employee/address-change/user",
};

const ADDRESS_CHANGE_DISPLAY_LOCATION = "/home/company/address-change";

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
    validations: ADDRESS_LINE_VALIDATIONS,
  };

  const city: StepperChild = {
    inputType: "text",
    name: "city",
    validations: CITY_VALIDATIONS,
  };

  const contactNumber: StepperChild = {
    inputType: "text",
    name: "contactNumber",
    validations: CONTACT_NUMBER_VALIDATIONS,
  };

  const postalCode: StepperChild =
    country === "Canada"
      ? {
          inputType: "text",
          name: "postalCode",
          validations: CANADIAN_POSTAL_CODE_VALIDATIONS,
        }
      : {
          inputType: "text",
          name: "postalCode",
          validations: US_POSTAL_CODE_VALIDATIONS,
        };

  const acknowledgement: StepperChild = {
    inputType: "checkbox",
    name: "acknowledgement",
    validations: ACKNOWLEDGEMENT_VALIDATIONS,
  };

  const stepperPages: StepperPage[] = [
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

  return stepperPages;
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
  ADDRESS_CHANGE_DISPLAY_LOCATION,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  ADDRESS_CHANGE_PATHS,
  ADDRESS_CHANGE_QUERY_DATA,
  ADDRESS_CHANGE_ROLE_PATHS,
  COUNTRIES_DATA,
  returnAddressChangeStepperPages,
};
