type User = UserDocument;

type UserSchema = {
  username: string;
  password: string;
  email: string;

  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  dateOfBirth: string;

  contactNumber: PhoneNumber | string;
  address: {
    addressLine: string;
    city: string;
    province: Province;
    state: StatesUS;
    postalCode: PostalCode;
    country: Country;
  };
  jobPosition: JobPosition;
  department: Department;
  emergencyContact: {
    fullName: string;
    contactNumber: PhoneNumber | string;
  };
  startDate: string;
  roles: UserRoles;
  active: boolean;
};

type UserDocument = UserSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type UserRoles = ('Admin' | 'Employee' | 'Manager')[];

type PreferredPronouns =
  | 'He/Him'
  | 'She/Her'
  | 'They/Them'
  | 'Other'
  | 'Prefer not to say';

type Province =
  | 'Alberta'
  | 'British Columbia'
  | 'Manitoba'
  | 'New Brunswick'
  | 'Newfoundland and Labrador'
  | 'Northwest Territories'
  | 'Nova Scotia'
  | 'Nunavut'
  | 'Ontario'
  | 'Prince Edward Island'
  | 'Quebec'
  | 'Saskatchewan'
  | 'Yukon';

type StatesUS =
  | 'Alabama'
  | 'Alaska'
  | 'Arizona'
  | 'Arkansas'
  | 'California'
  | 'Colorado'
  | 'Connecticut'
  | 'Delaware'
  | 'Florida'
  | 'Georgia'
  | 'Hawaii'
  | 'Idaho'
  | 'Illinois'
  | 'Indiana'
  | 'Iowa'
  | 'Kansas'
  | 'Kentucky'
  | 'Louisiana'
  | 'Maine'
  | 'Maryland'
  | 'Massachusetts'
  | 'Michigan'
  | 'Minnesota'
  | 'Mississippi'
  | 'Missouri'
  | 'Montana'
  | 'Nebraska'
  | 'Nevada'
  | 'New Hampshire'
  | 'New Jersey'
  | 'New Mexico'
  | 'New York'
  | 'North Carolina'
  | 'North Dakota'
  | 'Ohio'
  | 'Oklahoma'
  | 'Oregon'
  | 'Pennsylvania'
  | 'Rhode Island'
  | 'South Carolina'
  | 'South Dakota'
  | 'Tennessee'
  | 'Texas'
  | 'Utah'
  | 'Vermont'
  | 'Virginia'
  | 'Washington'
  | 'West Virginia'
  | 'Wisconsin'
  | 'Wyoming';

type CanadianPostalCode =
  `${string}${string}${string} ${string}${string}${string}`;
type USPostalCode = `${string}${string}${string}${string}${string}`;
type PostalCode = CanadianPostalCode | USPostalCode;

type PhoneNumber =
  `+(${string})(${string}${string}${string}) ${string}${string}${string}-${string}${string}${string}${string}`;
type Country = 'Canada' | 'United States';

type JobPosition = 'Employee' | 'Supervisor' | 'Manager';
type Department =
  | 'Administration'
  | 'Customer Service'
  | 'Human Resources'
  | 'Repair'
  | 'Technical Support'
  | 'Sales'
  | 'Logistics'
  | 'Inventory Management';

export type {
  CanadianPostalCode,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
};
