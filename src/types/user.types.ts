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
    province?: Province;
    state?: StatesUS;
    postalCode: PostalCode;
    country: Country;
  };
  jobPosition: JobPosition;
  department: Department;
  storeLocation?: StoreLocation;
  emergencyContact: {
    fullName: string;
    contactNumber: PhoneNumber | string;
  };
  startDate: string;
  roles: UserRoles;
  active: boolean;

  completedSurveys: string[];
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

type StoreLocation = 'Calgary' | 'Edmonton' | 'Vancouver';

type Department =
  | 'Executive Management'
  | 'Store Administration'
  | 'Accounting'
  | 'Human Resources'
  | 'Sales and Marketing'
  | 'Information Technology'
  | 'Repair Technicians'
  | 'Field Service Technicians'
  | 'Logistics and Inventory'
  | 'Customer Service'
  | 'Maintenance';

type ExecutiveManagement =
  | 'Chief Executive Officer'
  | 'Chief Operations Officer'
  | 'Chief Financial Officer'
  | 'Chief Technology Officer'
  | 'Chief Marketing Officer'
  | 'Chief Human Resources Officer';

type HumanResources =
  | 'Training Manager'
  | 'Training Specialist'
  | 'Recruiting Manager'
  | 'Recruiting Specialist';

type StoreAdministration =
  | 'Store Manager'
  | 'Shift Supervisor'
  | 'Office Manager';

type Accounting =
  | 'Accounting Manager'
  | 'Accounts Payable Clerk'
  | 'Accounts Receivable Clerk';

type SalesAndMarketing =
  | 'Sales Manager'
  | 'Sales Representative'
  | 'Marketing Manager'
  | 'Digital Marketing Specialist';

type InformationTechnology =
  | 'IT Manager'
  | 'Network Administrator'
  | 'Systems Administrator'
  | 'IT Support Specialist'
  | 'Database Administrator';

type RepairTechnicians =
  | 'Repair Technicians Supervisor'
  | 'Electronics Technician'
  | 'Computer Technician'
  | 'Smartphone Technician'
  | 'Tablet Technician'
  | 'Audio/Video Equipment Technician';

type FieldServiceTechnicians =
  | 'Field Service Supervisor'
  | 'On-Site Technician';

type LogisticsAndInventory =
  | 'Warehouse Supervisor'
  | 'Inventory Clerk'
  | 'Delivery Driver';

type CustomerService =
  | 'Customer Service Supervisor'
  | 'Customer Service Representative'
  | 'Technical Support Specialist';

type Maintenance =
  | 'Maintenance Supervisor'
  | 'Maintenance Worker'
  | 'Custodian';

type JobPosition =
  | ExecutiveManagement
  | StoreAdministration
  | SalesAndMarketing
  | InformationTechnology
  | RepairTechnicians
  | FieldServiceTechnicians
  | LogisticsAndInventory
  | CustomerService
  | HumanResources
  | Accounting
  | Maintenance;

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
  StoreLocation,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
};
