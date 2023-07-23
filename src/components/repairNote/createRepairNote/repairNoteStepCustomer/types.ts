import {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  StatesUS,
} from '../../../../types';
import { CreateRepairNoteAction, CreateRepairNoteDispatch } from '../types';

type RepairNoteStepCustomerProps = {
  customerName: string;
  isValidCustomerName: boolean;
  isCustomerNameFocused: boolean;

  customerPhone: PhoneNumber | string;
  isValidCustomerPhone: boolean;
  isCustomerPhoneFocused: boolean;

  customerEmail: string;
  isValidCustomerEmail: boolean;
  isCustomerEmailFocused: boolean;

  customerAddressLine: string;
  isValidCustomerAddressLine: boolean;
  isCustomerAddressLineFocused: boolean;

  customerCity: string;
  isValidCustomerCity: boolean;
  isCustomerCityFocused: boolean;

  customerState: StatesUS;
  customerProvince: Province;
  customerCountry: Country;

  customerPostalCode: PostalCode;
  isValidCustomerPostalCode: boolean;
  isCustomerPostalCodeFocused: boolean;

  createRepairNoteAction: CreateRepairNoteAction;
  createRepairNoteDispatch: React.Dispatch<CreateRepairNoteDispatch>;
};

export type { RepairNoteStepCustomerProps };
