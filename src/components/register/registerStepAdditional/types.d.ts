import type { Department, JobPosition, PhoneNumber } from '../../../types';
import { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepAdditionalProps = {
  jobPosition: JobPosition;
  department: Department;

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
