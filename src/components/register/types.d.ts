import {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  Province,
  StatesUS,
} from '../../types';
import { PreferredPronouns } from '../../types/user.types';

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

  contactNumber: PhoneNumber | '+(1)';
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

    phoneNumber: PhoneNumber | '+(1)';
    isValidPhoneNumber: boolean;
    isPhoneNumberFocused: boolean;
  };

  startDate: string;
  isValidStartDate: boolean;
  isStartDateFocused: boolean;

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

type StepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type RegisterPayload =
  | string
  | number
  | StepsInErrorPayload
  | boolean
  | PhoneNumber
  | Province
  | StatesUS
  | Country
  | Department
  | JobPosition
  | PostalCode
  | PreferredPronouns;

type RegisterDispatch = {
  type: RegisterAction[keyof RegisterAction];
  payload: RegisterPayload;
};

type RegisterResponse = {
  message: string;
};

export type {
  RegisterAction,
  RegisterDispatch,
  RegisterPayload,
  RegisterResponse,
  RegisterState,
  StepsInErrorPayload,
};
