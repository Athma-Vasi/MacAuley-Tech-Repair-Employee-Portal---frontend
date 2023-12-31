import type {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  StatesUS,
} from '../../../types';
import { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepAddressProps = {
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
  postalCode: PostalCode;
  isValidPostalCode: boolean;
  isPostalCodeFocused: boolean;
  country: Country;

  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { RegisterStepAddressProps };
