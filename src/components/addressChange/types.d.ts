import type { Country, PostalCode, StatesUS, Province } from '../../types';

type AddressChangeState = {
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

type AddressChangeAction = {
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
};

type AddressChangePayload =
  | string
  | boolean
  | Province
  | StatesUS
  | Country
  | PostalCode;

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
