import {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  SetStepsInErrorPayload,
  StatesUS,
  StoreLocation,
} from "../../types";

type RegisterState = {
  email: string;
  isValidEmail: boolean;
  isEmailFocused: boolean;
  isEmailExists: boolean;

  username: string;
  isValidUsername: boolean;
  isUsernameFocused: boolean;
  isUsernameExists: boolean;

  password: string;
  isValidPassword: boolean;
  isPasswordFocused: boolean;

  confirmPassword: string;
  isValidConfirmPassword: boolean;
  isConfirmPasswordFocused: boolean;

  firstName: string;
  isValidFirstName: boolean;
  isFirstNameFocused: boolean;

  middleName: string;
  isValidMiddleName: boolean;
  isMiddleNameFocused: boolean;

  lastName: string;
  isValidLastName: boolean;
  isLastNameFocused: boolean;

  preferredName: string;
  isValidPreferredName: boolean;
  isPreferredNameFocused: boolean;

  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  isValidProfilePictureUrl: boolean;
  isProfilePictureUrlFocused: boolean;

  dateOfBirth: string;
  isValidDateOfBirth: boolean;
  isDateOfBirthFocused: boolean;

  contactNumber: PhoneNumber | string;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  address: {
    addressLine: string;
    isValidAddressLine: boolean;
    isAddressLineFocused: boolean;
    city: string;
    isValidCity: boolean;
    isCityFocused: boolean;
    province: Province;
    state: StatesUS;
    postalCode: PostalCode;
    isValidPostalCode: boolean;
    isPostalCodeFocused: boolean;
    country: Country;
  };

  department: Department;
  jobPosition: JobPosition;
  storeLocation: StoreLocation;

  emergencyContact: {
    fullName: string;
    isValidFullName: boolean;
    isFullNameFocused: boolean;

    phoneNumber: PhoneNumber | string;
    isValidPhoneNumber: boolean;
    isPhoneNumberFocused: boolean;
  };

  startDate: string;
  isValidStartDate: boolean;
  isStartDateFocused: boolean;

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type RegisterAction = {
  setEmail: "setEmail";
  setIsValidEmail: "setIsValidEmail";
  setIsEmailFocused: "setIsEmailFocused";
  setIsEmailExists: "setIsEmailExists";

  setUsername: "setUsername";
  setIsValidUsername: "setIsValidUsername";
  setIsUsernameFocused: "setIsUsernameFocused";
  setIsUsernameExists: "setIsUsernameExists";

  setPassword: "setPassword";
  setIsValidPassword: "setIsValidPassword";
  setIsPasswordFocused: "setIsPasswordFocused";

  setConfirmPassword: "setConfirmPassword";
  setIsValidConfirmPassword: "setIsValidConfirmPassword";
  setIsConfirmPasswordFocused: "setIsConfirmPasswordFocused";

  setFirstName: "setFirstName";
  setIsValidFirstName: "setIsValidFirstName";
  setIsFirstNameFocused: "setIsFirstNameFocused";

  setMiddleName: "setMiddleName";
  setIsValidMiddleName: "setIsValidMiddleName";
  setIsMiddleNameFocused: "setIsMiddleNameFocused";

  setLastName: "setLastName";
  setIsValidLastName: "setIsValidLastName";
  setIsLastNameFocused: "setIsLastNameFocused";

  setPreferredName: "setPreferredName";
  setIsValidPreferredName: "setIsValidPreferredName";
  setIsPreferredNameFocused: "setIsPreferredNameFocused";

  setPreferredPronouns: "setPreferredPronouns";
  setProfilePictureUrl: "setProfilePictureUrl";
  setIsValidProfilePictureUrl: "setIsValidProfilePictureUrl";
  setIsProfilePictureUrlFocused: "setIsProfilePictureUrlFocused";

  setDateOfBirth: "setDateOfBirth";
  setIsValidDateOfBirth: "setIsValidDateOfBirth";
  setIsDateOfBirthFocused: "setIsDateOfBirthFocused";

  setContactNumber: "setContactNumber";
  setIsValidContactNumber: "setIsValidContactNumber";
  setIsContactNumberFocused: "setIsContactNumberFocused";

  setAddressLine: "setAddressLine";
  setIsAddressLineFocused: "setIsAddressLineFocused";
  setIsValidAddressLine: "setIsValidAddressLine";
  setCity: "setCity";
  setIsValidCity: "setIsValidCity";
  setIsCityFocused: "setIsCityFocused";
  setProvince: "setProvince";
  setState: "setState";
  setPostalCode: "setPostalCode";
  setIsValidPostalCode: "setIsValidPostalCode";
  setIsPostalCodeFocused: "setIsPostalCodeFocused";
  setCountry: "setCountry";

  setDepartment: "setDepartment";
  setJobPosition: "setJobPosition";
  setStoreLocation: "setStoreLocation";

  setEmergencyContactFullName: "setEmergencyContactFullName";
  setIsValidEmergencyContactFullName: "setIsValidEmergencyContactFullName";
  setIsEmergencyContactFullNameFocused: "setIsEmergencyContactFullNameFocused";

  setEmergencyContactPhoneNumber: "setEmergencyContactPhoneNumber";
  setIsValidEmergencyContactPhoneNumber: "setIsValidEmergencyContactPhoneNumber";
  setIsEmergencyContactPhoneNumberFocused: "setIsEmergencyContactPhoneNumberFocused";

  setStartDate: "setStartDate";
  setIsValidStartDate: "setIsValidStartDate";
  setIsStartDateFocused: "setIsStartDateFocused";

  setTriggerFormSubmit: "setTriggerFormSubmit";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
};

type RegisterDispatch =
  | {
      type:
        | RegisterAction["setEmail"]
        | RegisterAction["setUsername"]
        | RegisterAction["setPassword"]
        | RegisterAction["setConfirmPassword"]
        | RegisterAction["setFirstName"]
        | RegisterAction["setMiddleName"]
        | RegisterAction["setLastName"]
        | RegisterAction["setPreferredName"]
        | RegisterAction["setProfilePictureUrl"]
        | RegisterAction["setDateOfBirth"]
        | RegisterAction["setAddressLine"]
        | RegisterAction["setCity"]
        | RegisterAction["setEmergencyContactFullName"]
        | RegisterAction["setStartDate"]
        | RegisterAction["setSuccessMessage"]
        | RegisterAction["setSubmitMessage"];
      payload: string;
    }
  | {
      type:
        | RegisterAction["setIsValidEmail"]
        | RegisterAction["setIsEmailFocused"]
        | RegisterAction["setIsEmailExists"]
        | RegisterAction["setIsValidUsername"]
        | RegisterAction["setIsUsernameFocused"]
        | RegisterAction["setIsUsernameExists"]
        | RegisterAction["setIsValidPassword"]
        | RegisterAction["setIsPasswordFocused"]
        | RegisterAction["setIsValidConfirmPassword"]
        | RegisterAction["setIsConfirmPasswordFocused"]
        | RegisterAction["setIsValidFirstName"]
        | RegisterAction["setIsFirstNameFocused"]
        | RegisterAction["setIsValidMiddleName"]
        | RegisterAction["setIsMiddleNameFocused"]
        | RegisterAction["setIsValidLastName"]
        | RegisterAction["setIsLastNameFocused"]
        | RegisterAction["setIsValidPreferredName"]
        | RegisterAction["setIsPreferredNameFocused"]
        | RegisterAction["setIsValidContactNumber"]
        | RegisterAction["setIsContactNumberFocused"]
        | RegisterAction["setIsValidProfilePictureUrl"]
        | RegisterAction["setIsProfilePictureUrlFocused"]
        | RegisterAction["setIsValidDateOfBirth"]
        | RegisterAction["setIsDateOfBirthFocused"]
        | RegisterAction["setIsValidAddressLine"]
        | RegisterAction["setIsAddressLineFocused"]
        | RegisterAction["setIsValidCity"]
        | RegisterAction["setIsCityFocused"]
        | RegisterAction["setIsValidPostalCode"]
        | RegisterAction["setIsPostalCodeFocused"]
        | RegisterAction["setIsValidEmergencyContactFullName"]
        | RegisterAction["setIsEmergencyContactFullNameFocused"]
        | RegisterAction["setIsValidEmergencyContactPhoneNumber"]
        | RegisterAction["setIsEmergencyContactPhoneNumberFocused"]
        | RegisterAction["setIsValidStartDate"]
        | RegisterAction["setIsStartDateFocused"]
        | RegisterAction["setTriggerFormSubmit"]
        | RegisterAction["setIsSubmitting"]
        | RegisterAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      type: RegisterAction["setProvince"];
      payload: Province;
    }
  | {
      type: RegisterAction["setState"];
      payload: StatesUS;
    }
  | {
      type: RegisterAction["setCountry"];
      payload: Country;
    }
  | {
      type: RegisterAction["setDepartment"];
      payload: Department;
    }
  | {
      type: RegisterAction["setJobPosition"];
      payload: JobPosition;
    }
  | {
      type: RegisterAction["setStoreLocation"];
      payload: StoreLocation;
    }
  | {
      type: RegisterAction["setPostalCode"];
      payload: PostalCode;
    }
  | {
      type: RegisterAction["setPreferredPronouns"];
      payload: PreferredPronouns;
    }
  | {
      type:
        | RegisterAction["setEmergencyContactPhoneNumber"]
        | RegisterAction["setContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      type: RegisterAction["setStepsInError"];
      payload: SetStepsInErrorPayload;
    }
  | {
      type: RegisterAction["setCurrentStepperPosition"];
      payload: number;
    };

export type { RegisterAction, RegisterDispatch, RegisterState };
