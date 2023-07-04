import { RegisterAction, RegisterDispatch, RegisterState } from './types';

const initialRegisterState: RegisterState = {
  email: '',
  isValidEmail: false,
  isEmailFocused: false,

  username: '',
  isValidUsername: false,
  isUsernameFocused: false,

  password: '',
  isValidPassword: false,
  isPasswordFocused: false,

  confirmPassword: '',
  isValidConfirmPassword: false,
  isConfirmPasswordFocused: false,

  firstName: '',
  isValidFirstName: false,
  isFirstNameFocused: false,

  middleName: '',
  isValidMiddleName: false,
  isMiddleNameFocused: false,

  lastName: '',
  isValidLastName: false,
  isLastNameFocused: false,

  contactNumber: '+(1)(234) 567-8901',

  address: {
    addressLine1: '',
    city: '',
    province: 'Alberta',
    state: 'Alabama',
    postalCode: 'A1A 1A1',
    country: 'Canada',
  },

  jobPosition: 'Employee',
  department: 'Administration',
  emergencyContact: {
    fullName: '',
    contactNumber: '+(1)(234) 567-8901',
  },
  startDate: new Date(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const registerAction: RegisterAction = {
  setEmail: 'setEmail',
  setIsValidEmail: 'setIsValidEmail',
  setIsEmailFocused: 'setIsEmailFocused',

  setUsername: 'setUsername',
  setIsValidUsername: 'setIsValidUsername',
  setIsUsernameFocused: 'setIsUsernameFocused',

  setPassword: 'setPassword',
  setIsValidPassword: 'setIsValidPassword',
  setIsPasswordFocused: 'setIsPasswordFocused',

  setConfirmPassword: 'setConfirmPassword',
  setIsValidConfirmPassword: 'setIsValidConfirmPassword',
  setIsConfirmPasswordFocused: 'setIsConfirmPasswordFocused',

  setFirstName: 'setFirstName',
  setIsValidFirstName: 'setIsValidFirstName',
  setIsFirstNameFocused: 'setIsFirstNameFocused',

  setMiddleName: 'setMiddleName',
  setIsValidMiddleName: 'setIsValidMiddleName',
  setIsMiddleNameFocused: 'setIsMiddleNameFocused',

  setLastName: 'setLastName',
  setIsValidLastName: 'setIsValidLastName',
  setIsLastNameFocused: 'setIsLastNameFocused',

  setContactNumber: 'setContactNumber',

  setAddressLine1: 'setAddressLine1',
  setCity: 'setCity',
  setIsValidCity: 'setIsValidCity',
  setIsCityFocused: 'setIsCityFocused',
  setProvince: 'setProvince',
  setState: 'setState',
  setPostalCode: 'setPostalCode',
  setCountry: 'setCountry',

  setJobPosition: 'setJobPosition',
  setDepartment: 'setDepartment',
  setEmergencyContactFullName: 'setEmergencyContactFullName',
  setEmergencyContactNumber: 'setEmergencyContactNumber',
  setStartDate: 'setStartDate',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function registerReducer(state: RegisterState, action: RegisterDispatch) {
  switch (action.type) {
    case registerAction.setEmail:
      return { ...state, email: action.payload };
    case registerAction.setIsValidEmail:
      return { ...state, isValidEmail: action.payload };
    case registerAction.setIsEmailFocused:
      return { ...state, isEmailFocused: action.payload };

    case registerAction.setUsername:
      return { ...state, username: action.payload };
    case registerAction.setIsValidUsername:
      return { ...state, isValidUsername: action.payload };
    case registerAction.setIsUsernameFocused:
      return { ...state, isUsernameFocused: action.payload };

    case registerAction.setPassword:
      return { ...state, password: action.payload };
    case registerAction.setIsValidPassword:
      return { ...state, isValidPassword: action.payload };
    case registerAction.setIsPasswordFocused:
      return { ...state, isPasswordFocused: action.payload };

    case registerAction.setConfirmPassword:
      return { ...state, confirmPassword: action.payload };
    case registerAction.setIsValidConfirmPassword:
      return { ...state, isValidConfirmPassword: action.payload };
    case registerAction.setIsConfirmPasswordFocused:
      return { ...state, isConfirmPasswordFocused: action.payload };

    case registerAction.setFirstName:
      return { ...state, firstName: action.payload };
    case registerAction.setIsValidFirstName:
      return { ...state, isValidFirstName: action.payload };
    case registerAction.setIsFirstNameFocused:
      return { ...state, isFirstNameFocused: action.payload };

    case registerAction.setMiddleName:
      return { ...state, middleName: action.payload };
    case registerAction.setIsValidMiddleName:
      return { ...state, isValidMiddleName: action.payload };
    case registerAction.setIsMiddleNameFocused:
      return { ...state, isMiddleNameFocused: action.payload };

    case registerAction.setLastName:
      return { ...state, lastName: action.payload };
    case registerAction.setIsValidLastName:
      return { ...state, isValidLastName: action.payload };
    case registerAction.setIsLastNameFocused:
      return { ...state, isLastNameFocused: action.payload };

    case registerAction.setContactNumber:
      return { ...state, contactNumber: action.payload };

    case registerAction.setAddressLine1:
      return {
        ...state,
        address: { ...state.address, addressLine1: action.payload },
      };
    case registerAction.setCity:
      return { ...state, address: { ...state.address, city: action.payload } };
    case registerAction.setIsValidCity:
      return {
        ...state,
        address: { ...state.address, isValidCity: action.payload },
      };
    case registerAction.setIsCityFocused:
      return {
        ...state,
        address: { ...state.address, isCityFocused: action.payload },
      };
    case registerAction.setProvince:
      return {
        ...state,
        address: { ...state.address, province: action.payload },
      };
    case registerAction.setState:
      return { ...state, address: { ...state.address, state: action.payload } };
    case registerAction.setPostalCode:
      return {
        ...state,
        address: { ...state.address, postalCode: action.payload },
      };
    case registerAction.setCountry:
      return {
        ...state,
        address: { ...state.address, country: action.payload },
      };

    case registerAction.setJobPosition:
      return { ...state, jobPosition: action.payload };
    case registerAction.setDepartment:
      return { ...state, department: action.payload };
    case registerAction.setEmergencyContactFullName:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          fullName: action.payload,
        },
      };
    case registerAction.setEmergencyContactNumber:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          contactNumber: action.payload,
        },
      };
    case registerAction.setStartDate:
      return { ...state, startDate: action.payload };

    case registerAction.setIsError:
      return { ...state, isError: action.payload };
    case registerAction.setErrorMessage:
      return { ...state, errorMessage: action.payload };
    case registerAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload };
    case registerAction.setSubmitMessage:
      return { ...state, submitMessage: action.payload };
    case registerAction.setIsSuccessful:
      return { ...state, isSuccessful: action.payload };
    case registerAction.setSuccessMessage:
      return { ...state, successMessage: action.payload };
    case registerAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case registerAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };

    default:
      return state;
  }
}

export { initialRegisterState, registerAction, registerReducer };
