import { PreferredPronouns, StoreLocation } from "../../types";
import { DescriptionObjectsArray } from "../wrappers";

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

const STORE_LOCATION_DATA: StoreLocation[] = ["Calgary", "Edmonton", "Vancouver"];

export {
  PREFERRED_PRONOUNS_DATA,
  REGISTER_DESCRIPTION_OBJECTS,
  REGISTER_MAX_STEPPER_POSITION,
  REGISTER_URL,
  STORE_LOCATION_DATA,
};
