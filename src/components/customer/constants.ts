import { PROVINCES, STATES_US } from "../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_FULL_RANGE_REGEX,
  DATE_OF_BIRTH_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnDateFullRangeValidationText,
  returnDateOfBirthValidationText,
  returnEmailValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { COUNTRIES_DATA } from "../addressChange/constants";
import { ComponentQueryData } from "../queryBuilder";
import { PREFERRED_PRONOUNS_DATA } from "../register/constants";
import { DescriptionObjectsArray } from "../wrappers";

const CUSTOMER_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Email",
    value: "email",
    inputKind: "textInput",
    regex: EMAIL_REGEX,
    regexValidationFn: returnEmailValidationText,
  },
  {
    label: "First Name",
    value: "firstName",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Middle Name",
    value: "middleName",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Last Name",
    value: "lastName",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Preferred Name",
    value: "preferredName",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Preferred Pronouns",
    value: "preferredPronouns",
    inputKind: "selectInput",
    selectData: PREFERRED_PRONOUNS_DATA,
  },
  {
    label: "Profile Picture URL",
    value: "profilePictureUrl",
    inputKind: "textInput",
    regex: URL_REGEX,
    regexValidationFn: returnUrlValidationText,
  },
  {
    label: "Date of Birth",
    value: "dateOfBirth",
    inputKind: "dateInput",
    regex: DATE_OF_BIRTH_REGEX,
    regexValidationFn: returnDateOfBirthValidationText,
  },
  {
    label: "Contact Number",
    value: "contactNumber",
    inputKind: "textInput",
    regex: PHONE_NUMBER_REGEX,
    regexValidationFn: returnPhoneNumberValidationText,
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
    label: "State",
    value: "state",
    inputKind: "selectInput",
    selectData: STATES_US,
  },
  {
    label: "Province",
    value: "province",
    inputKind: "selectInput",
    selectData: PROVINCES,
  },
  {
    label: "Country",
    value: "country",
    inputKind: "selectInput",
    selectData: COUNTRIES_DATA,
  },
  {
    label: "Postal Code",
    value: "postalCode",
    inputKind: "textInput",
  },
  {
    label: "Is Active",
    value: "isActive",
    inputKind: "selectInput",
    selectData: ["true", "false"],
  },
];

const CUSTOMER_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "customer",
  manager: "customer",
  employee: "customer",
};

const CREATE_CUSTOMER_MAX_STEPPER_POSITION = 3;

const CREATE_CUSTOMER_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Personal Details",
    ariaLabel:
      "Enter customer's username, email, password, first name, middle name, last name, preferred name, preferred pronouns, profile picture url and date of birth",
  },
  {
    description: "Contact & Payment Information",
    ariaLabel: "Enter customer's contact number, address and payment information",
  },
  {
    description: "Review and Proceed",
    ariaLabel: "Review all the information you have entered",
  },
];

export {
  CREATE_CUSTOMER_DESCRIPTION_OBJECTS,
  CREATE_CUSTOMER_MAX_STEPPER_POSITION,
  CUSTOMER_QUERY_DATA,
  CUSTOMER_RESOURCE_ROUTE_PATHS,
};
