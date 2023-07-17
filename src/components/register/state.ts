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
  profilePictureUrl: '',
  isValidProfilePictureUrl: false,
  isProfilePictureUrlFocused: false,

  contactNumber: '+(1)',
  isValidContactNumber: false,
  isContactNumberFocused: false,

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
    isValidFullName: false,
    isFullNameFocused: false,

    phoneNumber: '+(1)',
    isValidPhoneNumber: false,
    isPhoneNumberFocused: false,
  },

  startDate: '',
  isValidStartDate: false,
  isStartDateFocused: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set<number>(),

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
  setProfilePictureUrl: 'setProfilePictureUrl',
  setIsValidProfilePictureUrl: 'setIsValidProfilePictureUrl',
  setIsProfilePictureUrlFocused: 'setIsProfilePictureUrlFocused',

  setContactNumber: 'setContactNumber',
  setIsValidContactNumber: 'setIsValidContactNumber',
  setIsContactNumberFocused: 'setIsContactNumberFocused',

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
  setIsValidEmergencyContactFullName: 'setIsValidEmergencyContactFullName',
  setIsEmergencyContactFullNameFocused: 'setIsEmergencyContactFullNameFocused',

  setEmergencyContactPhoneNumber: 'setEmergencyContactPhoneNumber',
  setIsValidEmergencyContactPhoneNumber:
    'setIsValidEmergencyContactPhoneNumber',
  setIsEmergencyContactPhoneNumberFocused:
    'setIsEmergencyContactPhoneNumberFocused',

  setStartDate: 'setStartDate',
  setIsValidStartDate: 'setIsValidStartDate',
  setIsStartDateFocused: 'setIsStartDateFocused',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

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

    case registerAction.setPreferredName:
      return { ...state, preferredName: action.payload };
    case registerAction.setIsValidPreferredName:
      return { ...state, isValidPreferredName: action.payload };
    case registerAction.setIsPreferredNameFocused:
      return { ...state, isPreferredNameFocused: action.payload };

    case registerAction.setPreferredPronouns:
      return {
        ...state,
        preferredPronouns: action.payload,
      };
    case registerAction.setProfilePictureUrl:
      return { ...state, profilePictureUrl: action.payload };
    case registerAction.setIsValidProfilePictureUrl:
      return {
        ...state,
        isValidProfilePictureUrl: action.payload,
      };
    case registerAction.setIsProfilePictureUrlFocused:
      return {
        ...state,
        isProfilePictureUrlFocused: action.payload,
      };

    case registerAction.setContactNumber:
      return { ...state, contactNumber: action.payload };
    case registerAction.setIsValidContactNumber:
      return { ...state, isValidContactNumber: action.payload };
    case registerAction.setIsContactNumberFocused:
      return { ...state, isContactNumberFocused: action.payload };

    case registerAction.setAddressLine:
      return {
        ...state,
        address: { ...state.address, addressLine: action.payload },
      };
    case registerAction.setIsValidAddressLine:
      return {
        ...state,
        address: {
          ...state.address,
          isValidAddressLine: action.payload,
        },
      };
    case registerAction.setIsAddressLineFocused:
      return {
        ...state,
        address: {
          ...state.address,
          isAddressLineFocused: action.payload,
        },
      };
    case registerAction.setCity:
      return {
        ...state,
        address: { ...state.address, city: action.payload },
      };
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
      return {
        ...state,
        address: { ...state.address, state: action.payload },
      };
    case registerAction.setPostalCode:
      return {
        ...state,
        address: { ...state.address, postalCode: action.payload },
      };
    case registerAction.setIsValidPostalCode:
      return {
        ...state,
        address: {
          ...state.address,
          isValidPostalCode: action.payload,
        },
      };
    case registerAction.setIsPostalCodeFocused:
      return {
        ...state,
        address: {
          ...state.address,
          isPostalCodeFocused: action.payload,
        },
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
    case registerAction.setIsValidEmergencyContactFullName:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          isValidFullName: action.payload,
        },
      };
    case registerAction.setIsEmergencyContactFullNameFocused:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          isFullNameFocused: action.payload,
        },
      };

    case registerAction.setEmergencyContactPhoneNumber:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          phoneNumber: action.payload,
        },
      };
    case registerAction.setIsValidEmergencyContactPhoneNumber:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          isValidPhoneNumber: action.payload,
        },
      };
    case registerAction.setIsEmergencyContactPhoneNumberFocused:
      return {
        ...state,
        emergencyContact: {
          ...state.emergencyContact,
          isPhoneNumberFocused: action.payload,
        },
      };

    case registerAction.setStartDate:
      return { ...state, startDate: action.payload };
    case registerAction.setIsValidStartDate:
      return { ...state, isValidStartDate: action.payload };
    case registerAction.setIsStartDateFocused:
      return { ...state, isStartDateFocused: action.payload };

    case registerAction.setTriggerFormSubmit:
      return { ...state, triggerFormSubmit: action.payload };

    case registerAction.setCurrentStepperPosition:
      return { ...state, currentStepperPosition: action.payload };
    case registerAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = structuredClone(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return { ...state, stepsInError };
    }

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
