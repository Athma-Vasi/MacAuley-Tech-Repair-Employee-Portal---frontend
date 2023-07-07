import type {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  StatesUS,
} from '../../types';
import type {
  AddressChangeAction,
  AddressChangeDispatch,
  AddressChangeState,
  StepsInErrorPayload,
} from './types';

const initialAddressChangeState: AddressChangeState = {
  contactNumber: '+(1)',
  isValidContactNumber: false,
  isContactNumberFocused: false,

  addressLine: '',
  isValidAddressLine: false,
  isAddressLineFocused: false,

  city: '',
  isValidCity: false,
  isCityFocused: false,

  province: 'Alberta',
  state: 'Alabama',
  country: 'Canada',

  postalCode: '',
  isValidPostalCode: false,
  isPostalCodeFocused: false,
  isAcknowledged: false,

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

const addressChangeAction: AddressChangeAction = {
  setContactNumber: 'setContactNumber',
  setIsValidContactNumber: 'setIsValidContactNumber',
  setIsContactNumberFocused: 'setIsContactNumberFocused',

  setAddressLine: 'setAddressLine',
  setIsAddressLineFocused: 'setIsAddressLineFocused',
  setIsValidAddressLine: 'setIsValidAddressLine',

  setCity: 'setCity',
  setIsValidCity: 'setIsValidCity',
  setIsCityFocused: 'setIsCityFocused',

  setProvince: 'setProvince',
  setState: 'setState',
  setCountry: 'setCountry',

  setPostalCode: 'setPostalCode',
  setIsValidPostalCode: 'setIsValidPostalCode',
  setIsPostalCodeFocused: 'setIsPostalCodeFocused',
  setIsAcknowledged: 'setIsAcknowledged',

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

function addressChangeReducer(
  state: AddressChangeState,
  action: AddressChangeDispatch
): AddressChangeState {
  switch (action.type) {
    case addressChangeAction.setContactNumber:
      return {
        ...state,
        contactNumber: action.payload as PhoneNumber,
      };
    case addressChangeAction.setIsValidContactNumber:
      return {
        ...state,
        isValidContactNumber: action.payload as boolean,
      };
    case addressChangeAction.setIsContactNumberFocused:
      return {
        ...state,
        isContactNumberFocused: action.payload as boolean,
      };

    case addressChangeAction.setAddressLine:
      return {
        ...state,
        addressLine: action.payload as string,
      };
    case addressChangeAction.setIsAddressLineFocused:
      return {
        ...state,
        isAddressLineFocused: action.payload as boolean,
      };
    case addressChangeAction.setIsValidAddressLine:
      return {
        ...state,
        isValidAddressLine: action.payload as boolean,
      };

    case addressChangeAction.setCity:
      return {
        ...state,
        city: action.payload as string,
      };
    case addressChangeAction.setIsValidCity:
      return {
        ...state,
        isValidCity: action.payload as boolean,
      };
    case addressChangeAction.setIsCityFocused:
      return {
        ...state,
        isCityFocused: action.payload as boolean,
      };

    case addressChangeAction.setProvince:
      return {
        ...state,
        province: action.payload as Province,
      };
    case addressChangeAction.setState:
      return {
        ...state,
        state: action.payload as StatesUS,
      };
    case addressChangeAction.setCountry:
      return {
        ...state,
        country: action.payload as Country,
      };

    case addressChangeAction.setPostalCode:
      return {
        ...state,
        postalCode: action.payload as PostalCode,
      };
    case addressChangeAction.setIsValidPostalCode:
      return {
        ...state,
        isValidPostalCode: action.payload as boolean,
      };
    case addressChangeAction.setIsPostalCodeFocused:
      return {
        ...state,
        isPostalCodeFocused: action.payload as boolean,
      };
    case addressChangeAction.setIsAcknowledged:
      return {
        ...state,
        isAcknowledged: action.payload as boolean,
      };

    case addressChangeAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload as number,
      };
    case addressChangeAction.setStepsInError: {
      const { kind, step } = action.payload as StepsInErrorPayload;
      const stepsInError = new Set(state.stepsInError);
      if (kind === 'add') {
        stepsInError.add(step);
      } else {
        stepsInError.delete(step);
      }
      return {
        ...state,
        stepsInError,
      };
    }

    case addressChangeAction.setIsError:
      return {
        ...state,
        isError: action.payload as boolean,
      };
    case addressChangeAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload as string,
      };
    case addressChangeAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload as boolean,
      };
    case addressChangeAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload as string,
      };
    case addressChangeAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload as boolean,
      };
    case addressChangeAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload as string,
      };
    case addressChangeAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case addressChangeAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload as string,
      };

    default:
      return state;
  }
}

export { addressChangeAction, addressChangeReducer, initialAddressChangeState };
