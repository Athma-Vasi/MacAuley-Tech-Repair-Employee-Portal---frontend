import { RegisterState } from "./types";

const initialRegisterState: RegisterState = {
  addressLine: "",
  city: "",
  confirmPassword: "",
  contactNumber: "",
  country: "Canada",
  dateOfBirth: "",
  department: "Accounting",
  email: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  firstName: "",
  isSubmitting: false,
  isSuccessful: false,
  jobPosition: "Accounting Manager",
  lastName: "",
  middleName: "",
  pagesInError: new Set<number>(),
  password: "",
  postalCode: "",
  preferredName: "",
  preferredPronouns: "Prefer not to say",
  profilePictureFormData: void 0,
  province: "Alberta",
  startDate: "",
  state: "Alabama",
  storeLocation: "Edmonton",
  triggerFormSubmit: false,
  username: "",
};

export { initialRegisterState };
