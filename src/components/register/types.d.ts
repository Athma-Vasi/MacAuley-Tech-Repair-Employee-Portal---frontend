import {
  Province,
  StatesUS,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
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

  contactNumber: PhoneNumber;
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
    country: Country;
  };

  jobPosition: JobPosition;
  department: Department;
  emergencyContact: {
    fullName: string;
    contactNumber: string;
  };
  startDate: Date;

  currentStepperPosition: number;
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

  setContactNumber: 'setContactNumber';
  setAddressLine: 'setAddressLine';
  setIsAddressLineFocused: 'setIsAddressLineFocused';
  setIsValidAddressLine: 'setIsValidAddressLine';
  setCity: 'setCity';
  setIsValidCity: 'setIsValidCity';
  setIsCityFocused: 'setIsCityFocused';
  setProvince: 'setProvince';
  setState: 'setState';
  setPostalCode: 'setPostalCode';
  setCountry: 'setCountry';

  setJobPosition: 'setJobPosition';
  setDepartment: 'setDepartment';
  setEmergencyContactFullName: 'setEmergencyContactFullName';
  setEmergencyContactNumber: 'setEmergencyContactNumber';
  setStartDate: 'setStartDate';

  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type RegisterPayload =
  | string
  | number
  | boolean
  | PhoneNumber
  | Province
  | StatesUS
  | Country
  | Department
  | JobPosition
  | PostalCode
  | Date;

type RegisterDispatch = {
  type: RegisterAction[keyof RegisterAction];
  payload: RegisterPayload;
};

type RegisterResponse = {
  message: string;
};

export type {
  RegisterState,
  RegisterAction,
  RegisterPayload,
  RegisterDispatch,
  RegisterResponse,
};
