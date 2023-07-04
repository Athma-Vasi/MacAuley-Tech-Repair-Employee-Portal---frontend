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

  preferredName: '',
  isValidPreferredName: false,
  isPreferredNameFocused: false,

  preferredPronouns: 'Prefer not to say',

  contactNumber: '+(1)(234) 567-8901',
  address: {
    addressLine: '',
    isValidAddressLine: false,
    isAddressLineFocused: false,
    city: '',
    isValidCity: false,
    isCityFocused: false,
    province: 'Alberta',
    state: 'Alabama',
    postalCode: '',
    isValidPostalCode: false,
    isPostalCodeFocused: false,
    country: 'Canada',
  },

  jobPosition: 'Employee',
  department: 'Administration',
  emergencyContact: {
    fullName: '',
    contactNumber: '+(1)(234) 567-8901',
  },
  startDate: new Date(),

  currentStepperPosition: 1,
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

  setPreferredName: 'setPreferredName',
  setIsValidPreferredName: 'setIsValidPreferredName',
  setIsPreferredNameFocused: 'setIsPreferredNameFocused',

  setPreferredPronouns: 'setPreferredPronouns',

  setContactNumber: 'setContactNumber',
  setAddressLine: 'setAddressLine',
  setIsValidAddressLine: 'setIsValidAddressLine',
  setIsAddressLineFocused: 'setIsAddressLineFocused',
  setCity: 'setCity',
  setIsValidCity: 'setIsValidCity',
  setIsCityFocused: 'setIsCityFocused',
  setProvince: 'setProvince',
  setState: 'setState',
  setPostalCode: 'setPostalCode',
  setIsValidPostalCode: 'setIsValidPostalCode',
  setIsPostalCodeFocused: 'setIsPostalCodeFocused',
  setCountry: 'setCountry',

  setJobPosition: 'setJobPosition',
  setDepartment: 'setDepartment',
  setEmergencyContactFullName: 'setEmergencyContactFullName',
  setEmergencyContactNumber: 'setEmergencyContactNumber',
  setStartDate: 'setStartDate',

  setCurrentStepperPosition: 'setCurrentStepperPosition',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function registerReducer(
  state: RegisterState,
  action: RegisterDispatch
): RegisterState {
  switch (action.type) {
    case registerAction.setEmail:
      return { ...state, email: action.payload as string };
    case registerAction.setIsValidEmail:
      return { ...state, isValidEmail: action.payload as boolean };
    case registerAction.setIsEmailFocused:
      return { ...state, isEmailFocused: action.payload as boolean };

    case registerAction.setUsername:
      return { ...state, username: action.payload as string };
    case registerAction.setIsValidUsername:
      return { ...state, isValidUsername: action.payload as boolean };
    case registerAction.setIsUsernameFocused:
      return { ...state, isUsernameFocused: action.payload as boolean };

    case registerAction.setPassword:
      return { ...state, password: action.payload as string };
    case registerAction.setIsValidPassword:
      return { ...state, isValidPassword: action.payload as boolean };
    case registerAction.setIsPasswordFocused:
      return { ...state, isPasswordFocused: action.payload as boolean };

    case registerAction.setConfirmPassword:
      return { ...state, confirmPassword: action.payload as string };
    case registerAction.setIsValidConfirmPassword:
      return { ...state, isValidConfirmPassword: action.payload as boolean };
    case registerAction.setIsConfirmPasswordFocused:
      return { ...state, isConfirmPasswordFocused: action.payload as boolean };

    case registerAction.setFirstName:
      return { ...state, firstName: action.payload as string };
    case registerAction.setIsValidFirstName:
      return { ...state, isValidFirstName: action.payload as boolean };
    case registerAction.setIsFirstNameFocused:
      return { ...state, isFirstNameFocused: action.payload as boolean };

    case registerAction.setMiddleName:
      return { ...state, middleName: action.payload as string };
    case registerAction.setIsValidMiddleName:
      return { ...state, isValidMiddleName: action.payload as boolean };
    case registerAction.setIsMiddleNameFocused:
      return { ...state, isMiddleNameFocused: action.payload as boolean };

    case registerAction.setLastName:
      return { ...state, lastName: action.payload as string };
    case registerAction.setIsValidLastName:
      return { ...state, isValidLastName: action.payload as boolean };
    case registerAction.setIsLastNameFocused:
      return { ...state, isLastNameFocused: action.payload as boolean };

    case registerAction.setPreferredName:
      return { ...state, preferredName: action.payload as string };
    case registerAction.setIsValidPreferredName:
      return { ...state, isValidPreferredName: action.payload as boolean };
    case registerAction.setIsPreferredNameFocused:
      return { ...state, isPreferredNameFocused: action.payload as boolean };

    case registerAction.setPreferredPronouns:
      return {
        ...state,
        preferredPronouns: action.payload as PreferredPronouns,
      };

    case registerAction.setContactNumber:
      return { ...state, contactNumber: action.payload as PhoneNumber };

    case registerAction.setAddressLine:
      return {
        ...state,
        address: { ...state.address, addressLine: action.payload as string },
      };
    case registerAction.setIsValidAddressLine:
      return {
        ...state,
        address: {
          ...state.address,
          isValidAddressLine: action.payload as boolean,
        },
      };
    case registerAction.setIsAddressLineFocused:
      return {
        ...state,
        address: {
          ...state.address,
          isAddressLineFocused: action.payload as boolean,
        },
      };
    case registerAction.setCity:
      return {
        ...state,
        address: { ...state.address, city: action.payload as string },
      };
    case registerAction.setIsValidCity:
      return {
        ...state,
        address: { ...state.address, isValidCity: action.payload as boolean },
      };
    case registerAction.setIsCityFocused:
      return {
        ...state,
        address: { ...state.address, isCityFocused: action.payload as boolean },
      };
    case registerAction.setProvince:
      return {
        ...state,
        address: { ...state.address, province: action.payload as Province },
      };
    case registerAction.setState:
      return {
        ...state,
        address: { ...state.address, state: action.payload as StatesUS },
      };
    case registerAction.setPostalCode:
      return {
        ...state,
        address: { ...state.address, postalCode: action.payload as PostalCode },
      };
    case registerAction.setIsValidPostalCode:
      return {
        ...state,
        address: {
          ...state.address,
          isValidPostalCode: action.payload as boolean,
        },
      };
    case registerAction.setIsPostalCodeFocused:
      return {
        ...state,
        address: {
          ...state.address,
          isPostalCodeFocused: action.payload as boolean,
        },
      };
    case registerAction.setCountry:
      return {
        ...state,
        address: { ...state.address, country: action.payload as Country },
      };

    case registerAction.setJobPosition:
      return { ...state, jobPosition: action.payload as JobPosition };
    case registerAction.setDepartment:
      return { ...state, department: action.payload as Department };
    case registerAction.setEmergencyContactFullName:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          fullName: action.payload as string,
        },
      };
    case registerAction.setEmergencyContactNumber:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          contactNumber: action.payload as PhoneNumber,
        },
      };
    case registerAction.setStartDate:
      return { ...state, startDate: action.payload as Date };

    case registerAction.setCurrentStepperPosition:
      return { ...state, currentStepperPosition: action.payload as number };

    case registerAction.setIsError:
      return { ...state, isError: action.payload as boolean };
    case registerAction.setErrorMessage:
      return { ...state, errorMessage: action.payload as string };
    case registerAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload as boolean };
    case registerAction.setSubmitMessage:
      return { ...state, submitMessage: action.payload as string };
    case registerAction.setIsSuccessful:
      return { ...state, isSuccessful: action.payload as boolean };
    case registerAction.setSuccessMessage:
      return { ...state, successMessage: action.payload as string };
    case registerAction.setIsLoading:
      return { ...state, isLoading: action.payload as boolean };
    case registerAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload as string };

    default:
      return state;
  }
}

export { initialRegisterState, registerAction, registerReducer };
