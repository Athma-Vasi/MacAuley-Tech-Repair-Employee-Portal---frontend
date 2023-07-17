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
} from '../../types';

type RegisterState = {
  email: string;
  isValidEmail: boolean;
  isEmailFocused: boolean;

  username: string;
  isValidUsername: boolean;
  isUsernameFocused: boolean;

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

  jobPosition: JobPosition;
  department: Department;
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

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type RegisterAction = {
  setEmail: 'setEmail';
  setIsValidEmail: 'setIsValidEmail';
  setIsEmailFocused: 'setIsEmailFocused';

  setUsername: 'setUsername';
  setIsValidUsername: 'setIsValidUsername';
  setIsUsernameFocused: 'setIsUsernameFocused';

  setPassword: 'setPassword';
  setIsValidPassword: 'setIsValidPassword';
  setIsPasswordFocused: 'setIsPasswordFocused';

  setConfirmPassword: 'setConfirmPassword';
  setIsValidConfirmPassword: 'setIsValidConfirmPassword';
  setIsConfirmPasswordFocused: 'setIsConfirmPasswordFocused';

  setFirstName: 'setFirstName';
  setIsValidFirstName: 'setIsValidFirstName';
  setIsFirstNameFocused: 'setIsFirstNameFocused';

  setMiddleName: 'setMiddleName';
  setIsValidMiddleName: 'setIsValidMiddleName';
  setIsMiddleNameFocused: 'setIsMiddleNameFocused';

  setLastName: 'setLastName';
  setIsValidLastName: 'setIsValidLastName';
  setIsLastNameFocused: 'setIsLastNameFocused';

  setPreferredName: 'setPreferredName';
  setIsValidPreferredName: 'setIsValidPreferredName';
  setIsPreferredNameFocused: 'setIsPreferredNameFocused';

  setPreferredPronouns: 'setPreferredPronouns';
  setProfilePictureUrl: 'setProfilePictureUrl';
  setIsValidProfilePictureUrl: 'setIsValidProfilePictureUrl';
  setIsProfilePictureUrlFocused: 'setIsProfilePictureUrlFocused';

  setContactNumber: 'setContactNumber';
  setIsValidContactNumber: 'setIsValidContactNumber';
  setIsContactNumberFocused: 'setIsContactNumberFocused';

  setAddressLine: 'setAddressLine';
  setIsAddressLineFocused: 'setIsAddressLineFocused';
  setIsValidAddressLine: 'setIsValidAddressLine';
  setCity: 'setCity';
  setIsValidCity: 'setIsValidCity';
  setIsCityFocused: 'setIsCityFocused';
  setProvince: 'setProvince';
  setState: 'setState';
  setPostalCode: 'setPostalCode';
  setIsValidPostalCode: 'setIsValidPostalCode';
  setIsPostalCodeFocused: 'setIsPostalCodeFocused';
  setCountry: 'setCountry';

  setJobPosition: 'setJobPosition';
  setDepartment: 'setDepartment';

  setEmergencyContactFullName: 'setEmergencyContactFullName';
  setIsValidEmergencyContactFullName: 'setIsValidEmergencyContactFullName';
  setIsEmergencyContactFullNameFocused: 'setIsEmergencyContactFullNameFocused';

  setEmergencyContactPhoneNumber: 'setEmergencyContactPhoneNumber';
  setIsValidEmergencyContactPhoneNumber: 'setIsValidEmergencyContactPhoneNumber';
  setIsEmergencyContactPhoneNumberFocused: 'setIsEmergencyContactPhoneNumberFocused';

  setStartDate: 'setStartDate';
  setIsValidStartDate: 'setIsValidStartDate';
  setIsStartDateFocused: 'setIsStartDateFocused';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type RegisterDispatch =
  | {
      type:
        | RegisterAction['setEmail']
        | RegisterAction['setUsername']
        | RegisterAction['setPassword']
        | RegisterAction['setConfirmPassword']
        | RegisterAction['setFirstName']
        | RegisterAction['setMiddleName']
        | RegisterAction['setLastName']
        | RegisterAction['setPreferredName']
        | RegisterAction['setProfilePictureUrl']
        | RegisterAction['setAddressLine']
        | RegisterAction['setCity']
        | RegisterAction['setEmergencyContactFullName']
        | RegisterAction['setStartDate']
        | RegisterAction['setErrorMessage']
        | RegisterAction['setLoadingMessage']
        | RegisterAction['setSuccessMessage']
        | RegisterAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type:
        | RegisterAction['setIsValidEmail']
        | RegisterAction['setIsEmailFocused']
        | RegisterAction['setIsValidUsername']
        | RegisterAction['setIsUsernameFocused']
        | RegisterAction['setIsValidPassword']
        | RegisterAction['setIsPasswordFocused']
        | RegisterAction['setIsValidConfirmPassword']
        | RegisterAction['setIsConfirmPasswordFocused']
        | RegisterAction['setIsValidFirstName']
        | RegisterAction['setIsFirstNameFocused']
        | RegisterAction['setIsValidMiddleName']
        | RegisterAction['setIsMiddleNameFocused']
        | RegisterAction['setIsValidLastName']
        | RegisterAction['setIsLastNameFocused']
        | RegisterAction['setIsValidPreferredName']
        | RegisterAction['setIsPreferredNameFocused']
        | RegisterAction['setIsValidContactNumber']
        | RegisterAction['setIsContactNumberFocused']
        | RegisterAction['setIsValidProfilePictureUrl']
        | RegisterAction['setIsProfilePictureUrlFocused']
        | RegisterAction['setIsValidAddressLine']
        | RegisterAction['setIsAddressLineFocused']
        | RegisterAction['setIsValidCity']
        | RegisterAction['setIsCityFocused']
        | RegisterAction['setIsValidPostalCode']
        | RegisterAction['setIsPostalCodeFocused']
        | RegisterAction['setIsValidEmergencyContactFullName']
        | RegisterAction['setIsEmergencyContactFullNameFocused']
        | RegisterAction['setIsValidEmergencyContactPhoneNumber']
        | RegisterAction['setIsEmergencyContactPhoneNumberFocused']
        | RegisterAction['setIsValidStartDate']
        | RegisterAction['setIsStartDateFocused']
        | RegisterAction['setTriggerFormSubmit']
        | RegisterAction['setIsError']
        | RegisterAction['setIsSubmitting']
        | RegisterAction['setIsSuccessful']
        | RegisterAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: RegisterAction['setProvince'];
      payload: Province;
    }
  | {
      type: RegisterAction['setState'];
      payload: StatesUS;
    }
  | {
      type: RegisterAction['setCountry'];
      payload: Country;
    }
  | {
      type: RegisterAction['setDepartment'];
      payload: Department;
    }
  | {
      type: RegisterAction['setJobPosition'];
      payload: JobPosition;
    }
  | {
      type: RegisterAction['setPostalCode'];
      payload: PostalCode;
    }
  | {
      type: RegisterAction['setPreferredPronouns'];
      payload: PreferredPronouns;
    }
  | {
      type: RegisterAction['setEmergencyContactPhoneNumber'];
      payload: PhoneNumber | string;
    }
  | {
      type: RegisterAction['setContactNumber'];
      payload: PhoneNumber | string;
    }
  | {
      type: RegisterAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type: RegisterAction['setCurrentStepperPosition'];
      payload: number;
    };

type RegisterResponse = {
  message: string;
};

export type {
  RegisterAction,
  RegisterDispatch,
  RegisterResponse,
  RegisterState,
};
