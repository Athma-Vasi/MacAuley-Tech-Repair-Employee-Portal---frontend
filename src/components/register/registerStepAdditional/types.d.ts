import type { JobPosition, Department, PhoneNumber } from '../../../types';
import { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepAdditionalProps = {
  jobPosition: JobPosition;
  department: Department;

  fullName: string;
  isValidFullName: boolean;
  isFullNameFocused: boolean;

  phoneNumber: PhoneNumber | '+(1)';
  isValidPhoneNumber: boolean;
  isPhoneNumberFocused: boolean;

  startDate: string;
  isValidStartDate: boolean;
  isStartDateFocused: boolean;

  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { RegisterStepAdditionalProps };
