import type {
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
} from '../../../types';

type RegisterStepReviewProps = {
  email: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  contactNumber: PhoneNumber | string;
  addressLine: string;
  city: string;
  province: Province;
  state: StatesUS;
  postalCode: PostalCode;
  country: Country;
  jobPosition: JobPosition;
  department: Department;
  fullName: string;
  phoneNumber: PhoneNumber | string;
  startDate: string;
};

export type { RegisterStepReviewProps };
