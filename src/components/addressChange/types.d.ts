import type { Country, PostalCode, StatesUS, Province } from '../../types';

type AddressChangeState = {
  contactNumber: PhoneNumber | '+(1)';
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
};

type AddressChangePayload =
  | string
  | boolean
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
  AddressChangeState,
  AddressChangeAction,
  AddressChangePayload,
  AddressChangeDispatch,
  AddressChangeReducer,
};
