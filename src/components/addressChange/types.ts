import type { Country, PostalCode, Province, StatesUS } from '../../types';

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

type AddressChangePayload =
  | string
  | boolean
  | number
  | StepsInErrorPayload
  | Province
  | StatesUS
  | Country
  | PostalCode
  | PhoneNumber;

type AddressChangeDispatch = {
  type: AddressChangeAction[keyof AddressChangeAction];
  payload: AddressChangePayload;
};

type AddressChangeReducer = (
  state: AddressChangeState,
  action: AddressChangeDispatch
) => AddressChangeState;

export type {
  AddressChangeAction,
  AddressChangeDispatch,
  AddressChangePayload,
  AddressChangeReducer,
  AddressChangeState,
  StepsInErrorPayload,
};
