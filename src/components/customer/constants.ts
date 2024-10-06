import { COUNTRIES_DATA, PROVINCES, STATES_US } from "../../constants/data";
import type { RoleResourceRoutePaths, StepperChild } from "../../types";
import { BOOLEAN_VALUES_DATA } from "../query/constants";
import { PREFERRED_PRONOUNS_DATA } from "../register/constants";

function returnCustomerStepperPages() {
  const emailTextInputChild: StepperChild = {
    inputType: "text",
    name: "email",
    validationKey: "email",
  };

  const firstNameTextInputChild: StepperChild = {
    inputType: "text",
    name: "firstName",
    validationKey: "name",
  };

  const middleNameTextInputChild: StepperChild = {
    inputType: "text",
    name: "middleName",
    validationKey: "name",
  };

  const lastNameTextInputChild: StepperChild = {
    inputType: "text",
    name: "lastName",
    validationKey: "name",
  };

  const preferredNameTextInputChild: StepperChild = {
    inputType: "text",
    name: "preferredName",
    validationKey: "name",
  };

  const preferredPronounsSelectChild: StepperChild = {
    inputType: "select",
    name: "preferredPronouns",
    selectInputData: PREFERRED_PRONOUNS_DATA,
  };

  const profilePictureUrlTextInputChild: StepperChild = {
    inputType: "text",
    name: "profilePictureUrl",
    validationKey: "url",
  };

  const dateOfBirthDateChild: StepperChild = {
    inputType: "date",
    name: "dateOfBirth",
    validationKey: "dateOfBirth",
  };

  const contactNumberTextInputChild: StepperChild = {
    inputType: "text",
    name: "contactNumber",
    validationKey: "phoneNumber",
  };

  const addressLineTextInputChild: StepperChild = {
    inputType: "text",
    name: "addressLine",
    validationKey: "addressLine",
  };

  const cityTextInputChild: StepperChild = {
    inputType: "text",
    name: "city",
    validationKey: "city",
  };

  const stateSelectChild: StepperChild = {
    inputType: "select",
    name: "state",
    selectInputData: STATES_US,
  };

  const provinceSelectChild: StepperChild = {
    inputType: "select",
    name: "province",
    selectInputData: PROVINCES,
  };

  const countrySelectChild: StepperChild = {
    inputType: "select",
    name: "country",
    selectInputData: COUNTRIES_DATA,
  };

  const postalCodeTextInputChild: StepperChild = {
    inputType: "text",
    name: "postalCode",
    validationKey: "userDefinedValue",
  };

  const isActiveSelectChild: StepperChild = {
    inputType: "select",
    name: "isActive",
    selectInputData: BOOLEAN_VALUES_DATA,
  };

  return [
    {
      children: [
        emailTextInputChild,
        firstNameTextInputChild,
        middleNameTextInputChild,
        lastNameTextInputChild,
        preferredNameTextInputChild,
        preferredPronounsSelectChild,
        profilePictureUrlTextInputChild,
        dateOfBirthDateChild,
        contactNumberTextInputChild,
        addressLineTextInputChild,
        cityTextInputChild,
        stateSelectChild,
        provinceSelectChild,
        countrySelectChild,
        postalCodeTextInputChild,
        isActiveSelectChild,
      ],
      description: "Customer",
    },
  ];
}

const CUSTOMER_RESOURCE_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "customer",
  manager: "customer",
  employee: "customer",
};

const CREATE_CUSTOMER_MAX_STEPPER_POSITION = 3;

const CREATE_CUSTOMER_DESCRIPTION_OBJECTS = [
  {
    description: "Personal Details",
    ariaLabel:
      "Enter customer's username, email, password, first name, middle name, last name, preferred name, preferred pronouns, profile picture url and date of birth",
  },
  {
    description: "Contact & Payment Information",
    ariaLabel:
      "Enter customer's contact number, address and payment information",
  },
  {
    description: "Review and Proceed",
    ariaLabel: "Review all the information you have entered",
  },
];

export {
  CREATE_CUSTOMER_DESCRIPTION_OBJECTS,
  CREATE_CUSTOMER_MAX_STEPPER_POSITION,
  CUSTOMER_RESOURCE_ROUTE_PATHS,
  returnCustomerStepperPages,
};
