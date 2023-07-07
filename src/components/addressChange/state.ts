import { Country, PostalCode, Province, StatesUS } from '../../types';
import {
  AddressChangeAction,
  AddressChangeDispatch,
  AddressChangeState,
} from './types';

const initialAddressChangeState: AddressChangeState = {
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
};

const addressChangeAction: AddressChangeAction = {
  setAddressLine: 'setAddressLine',
  setIsAddressLineFocused: 'setIsAddressLineFocused',
  setIsValidAddressLine: 'setIsValidAddressLine',
  setCity: 'setCity',
  setIsValidCity: 'setIsValidCity',
  setIsCityFocused: 'setIsCityFocused',
  setProvince: 'setProvince',
  setState: 'setState',
  setPostalCode: 'setPostalCode',
  setIsValidPostalCode: 'setIsValidPostalCode',
  setIsPostalCodeFocused: 'setIsPostalCodeFocused',
  setCountry: 'setCountry',
};

function addressChangeReducer(
  state: AddressChangeState,
  action: AddressChangeDispatch
): AddressChangeState {
  switch (action.type) {
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
    case addressChangeAction.setCountry:
      return {
        ...state,
        country: action.payload as Country,
      };
    default:
      return state;
  }
}
