import {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
} from '../../../types';
import { RegisterState } from '../types';

type RegisterStepReviewProps = {
  email: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  contactNumber: PhoneNumber | '+(1)';
  addressLine: string;
  city: string;
  province: Province;
  state: StatesUS;
  postalCode: PostalCode;
  country: Country;
  jobPosition: JobPosition;
  department: Department;
  fullName: string;
  phoneNumber: PhoneNumber | '+(1)';
  startDate: string;
};

export type { RegisterStepReviewProps };
