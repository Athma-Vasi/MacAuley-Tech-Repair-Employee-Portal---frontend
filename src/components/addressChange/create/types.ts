import type {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  SetStepsInErrorPayload,
  StatesUS,
} from '../../../types';

type AddressChangeState = {
  contactNumber: PhoneNumber | string;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  addressLine: string;
  isValidAddressLine: boolean;
  isAddressLineFocused: boolean;

  city: string;
  isValidCity: boolean;
  isCityFocused: boolean;

  province: Province;
  state: StatesUS;
  country: Country;

  postalCode: PostalCode;
  isValidPostalCode: boolean;
  isPostalCodeFocused: boolean;
  isAcknowledged: boolean;

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

type AddressChangeAction = {
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
  setCountry: 'setCountry';

  setPostalCode: 'setPostalCode';
  setIsValidPostalCode: 'setIsValidPostalCode';
  setIsPostalCodeFocused: 'setIsPostalCodeFocused';
  setIsAcknowledged: 'setIsAcknowledged';

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

type AddressChangeDispatch =
  | {
      type:
        | AddressChangeAction['setAddressLine']
        | AddressChangeAction['setCity']
        | AddressChangeAction['setErrorMessage']
        | AddressChangeAction['setLoadingMessage']
        | AddressChangeAction['setSubmitMessage']
        | AddressChangeAction['setSuccessMessage'];
      payload: string;
    }
  | {
      type:
        | AddressChangeAction['setIsAddressLineFocused']
        | AddressChangeAction['setIsValidAddressLine']
        | AddressChangeAction['setIsCityFocused']
        | AddressChangeAction['setIsValidCity']
        | AddressChangeAction['setIsContactNumberFocused']
        | AddressChangeAction['setIsValidContactNumber']
        | AddressChangeAction['setIsPostalCodeFocused']
        | AddressChangeAction['setIsValidPostalCode']
        | AddressChangeAction['setIsAcknowledged']
        | AddressChangeAction['setTriggerFormSubmit']
        | AddressChangeAction['setIsSuccessful']
        | AddressChangeAction['setIsSubmitting']
        | AddressChangeAction['setIsError']
        | AddressChangeAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: AddressChangeAction['setContactNumber'];
      payload: PhoneNumber | string;
    }
  | {
      type: AddressChangeAction['setProvince'];
      payload: Province;
    }
  | {
      type: AddressChangeAction['setState'];
      payload: StatesUS;
    }
  | {
      type: AddressChangeAction['setCountry'];
      payload: Country;
    }
  | {
      type: AddressChangeAction['setPostalCode'];
      payload: PostalCode;
    }
  | {
      type: AddressChangeAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: AddressChangeAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type AddressChangeReducer = (
  state: AddressChangeState,
  action: AddressChangeDispatch
) => AddressChangeState;

export type {
  AddressChangeAction,
  AddressChangeDispatch,
  AddressChangeReducer,
  AddressChangeState,
};
