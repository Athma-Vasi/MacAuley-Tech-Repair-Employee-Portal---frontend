import type {
  Department,
  JobPosition,
  PhoneNumber,
  StoreLocation,
} from '../../../types';
import { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepAdditionalProps = {
  jobPosition: JobPosition;
  department: Department;
  storeLocation: StoreLocation;

  fullName: string;
  isValidFullName: boolean;
  isFullNameFocused: boolean;

  phoneNumber: PhoneNumber | string;
  isValidPhoneNumber: boolean;
  isPhoneNumberFocused: boolean;

  startDate: string;
  isValidStartDate: boolean;
  isStartDateFocused: boolean;

  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { RegisterStepAdditionalProps };
