import {
  COUNTRIES_DATA,
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  PROVINCES,
  STATES_US,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { Country, PreferredPronouns, StepperChild, StepperPage } from "../../types";
import { DescriptionObjectsArray } from "../wrappers";

function returnRegisterStepperPages(country: Country): StepperPage[] {
  const addressLine: StepperChild = {
    inputType: "text",
    name: "addressLine",
    validationKey: "addressLine",
  };

  const city: StepperChild = {
    inputType: "text",
    name: "city",
    validationKey: "city",
  };

  const confirmPassword: StepperChild = {
    inputType: "text",
    name: "confirmPassword",
    validationKey: "password",
  };

  const contactNumber: StepperChild = {
    inputType: "text",
    name: "contactNumber",
    validationKey: "phoneNumber",
  };

  const countryChild: StepperChild = {
    inputType: "select",
    name: "country",
    selectInputData: COUNTRIES_DATA,
  };

  const dateOfBirth: StepperChild = {
    inputType: "date",
    name: "dateOfBirth",
    validationKey: "dateOfBirth",
  };

  const department: StepperChild = {
    inputType: "select",
    name: "department",
    selectInputData: DEPARTMENT_DATA,
  };

  const email: StepperChild = {
    inputType: "text",
    name: "email",
    validationKey: "email",
  };

  const emergencyContactName: StepperChild = {
    inputType: "text",
    name: "emergencyContactName",
    validationKey: "fullName",
  };

  const emergencyContactNumber: StepperChild = {
    inputType: "text",
    name: "emergencyContactNumber",
    validationKey: "phoneNumber",
  };

  const firstName: StepperChild = {
    inputType: "text",
    name: "firstName",
    validationKey: "name",
  };

  const jobPosition: StepperChild = {
    inputType: "select",
    name: "jobPosition",
    selectInputData: JOB_POSITION_DATA,
  };

  const lastName: StepperChild = {
    inputType: "text",
    name: "lastName",
    validationKey: "name",
  };

  const middleName: StepperChild = {
    inputType: "text",
    name: "middleName",
    validationKey: "name",
  };

  const password: StepperChild = {
    inputType: "text",
    name: "password",
    validationKey: "password",
  };

  const postalCode: StepperChild =
    country === "Canada"
      ? {
          inputType: "text",
          name: "postalCode",
          validationKey: "postalCodeCanada",
        }
      : {
          inputType: "text",
          name: "postalCode",
          validationKey: "postalCodeUS",
        };

  const preferredName: StepperChild = {
    inputType: "text",
    name: "preferredName",
    validationKey: "fullName",
  };

  const preferredPronouns: StepperChild = {
    inputType: "select",
    name: "preferredPronouns",
    selectInputData: PREFERRED_PRONOUNS_DATA,
  };

  const profilePictureUrl: StepperChild = {
    inputType: "text",
    name: "profilePictureUrl",
    validationKey: "url",
  };

  const province: StepperChild = {
    inputType: "select",
    name: "province",
    selectInputData: PROVINCES,
  };

  const startDate: StepperChild = {
    inputType: "date",
    name: "startDate",
    validationKey: "date",
  };

  const state: StepperChild = {
    inputType: "select",
    name: "state",
    selectInputData: STATES_US,
  };

  const storeLocation: StepperChild = {
    inputType: "select",
    name: "storeLocation",
    selectInputData: STORE_LOCATION_DATA,
  };

  const username: StepperChild = {
    inputType: "text",
    name: "username",
    validationKey: "username",
  };

  return [
    {
      children: [username, email, password, confirmPassword],
      description: "Authentication",
    },

    {
      children: [
        firstName,
        middleName,
        lastName,
        preferredName,
        preferredPronouns,
        profilePictureUrl,
        dateOfBirth,
      ],
      description: "Personal information",
    },

    {
      children: [
        countryChild,
        addressLine,
        city,
        province,
        state,
        postalCode,
        contactNumber,
      ],
      description: "Contact details",
    },

    {
      children: [
        jobPosition,
        department,
        storeLocation,
        emergencyContactName,
        emergencyContactNumber,
        startDate,
      ],
      description: "Additional information",
    },

    {
      children: [],
      description: "Review and proceed",
      kind: "review",
    },
  ];
}

const REGISTER_URL = "http://localhost:5500/api/v1/user";

const REGISTER_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Authentication",
    ariaLabel: "Enter email, username, password and confirm password",
  },

  {
    description: "Personal information",
    ariaLabel:
      "Enter first name, middle name, last name, preferred name, profile picture url, and (optionally) preferred pronouns",
  },

  {
    description: "Contact details",
    ariaLabel:
      "Enter country, address line, city, province or state, postal or zip code, and contact number",
  },

  {
    description: "Additional information",
    ariaLabel:
      "Enter job position, department, store location, emergency contact name, emergency contact number, and start date",
  },

  {
    description: "Review and proceed",
    ariaLabel: "Review all the information you have entered",
  },
];

const REGISTER_MAX_STEPPER_POSITION = 5;

const PREFERRED_PRONOUNS_DATA: PreferredPronouns[] = [
  "Prefer not to say",
  "He/Him",
  "She/Her",
  "They/Them",
  "Other",
];

export {
  PREFERRED_PRONOUNS_DATA,
  REGISTER_DESCRIPTION_OBJECTS,
  REGISTER_MAX_STEPPER_POSITION,
  REGISTER_URL,
  returnRegisterStepperPages,
};
