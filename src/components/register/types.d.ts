import {
  Province,
  User,
  StatesUS,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  UserRoles,
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

  contactNumber: PhoneNumber;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  address: {
    addressLine1: string;
    city: string;
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

  setContactNumber: 'setContactNumber';

  setAddressLine1: 'setAddressLine1';
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

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type RegisterPayload = string | boolean;

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
