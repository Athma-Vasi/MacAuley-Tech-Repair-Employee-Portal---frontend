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
    province: Province | '';
    state: StatesUS | '';
    postalCode: PostalCode;
    country: Country;
  };
  jobPosition: JobPosition;
  department: Department;
  storeLocation: StoreLocation;
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

type Department =
  | 'Executive Management'
  | 'Administrative'
  | 'Sales and Marketing'
  | 'Information Technology'
  | 'Repair Technicians'
  | 'Field Service Technicians'
  | 'Logistics and Inventory'
  | 'Customer Service'
  | 'Quality Control'
  | 'Training and Development'
  | 'Janitorial and Maintenance'
  | 'Security';
type StoreLocation = 'Calgary' | 'Edmonton' | 'Vancouver';

type ExecutiveManagement =
  | 'Chief Executive Officer'
  | 'Chief Operations Officer'
  | 'Chief Financial Officer'
  | 'Chief Technology Officer'
  | 'Chief Marketing Officer'
  | 'Chief Human Resources Officer';

type AdministrativeDepartment =
  | 'Store Manager'
  | 'Assistant Store Manager'
  | 'Shift Supervisor'
  | 'Office Manager'
  | 'Administrative Assistant'
  | 'Accountant';

type SalesAndMarketing =
  | 'Sales Manager'
  | 'Marketing Manager'
  | 'Sales Representative'
  | 'Digital Marketing Specialist';

type InformationTechnology =
  | 'IT Manager'
  | 'Network Administrator'
  | 'Systems Administrator'
  | 'IT Support Specialist'
  | 'Database Administrator';

type RepairTechnicians =
  | 'Electronics Repair Technician'
  | 'Computer Repair Technician'
  | 'Smartphone Repair Technician'
  | 'Tablet Repair Technician'
  | 'Audio/Video Equipment Repair Technician';

type FieldServiceTechnicians =
  | 'On-Site Repair Technician'
  | 'Mobile Device Technician';

type LogisticsAndInventory =
  | 'Warehouse Manager'
  | 'Inventory Clerk'
  | 'Delivery Driver';

type CustomerService =
  | 'Customer Service Representative'
  | 'Technical Support Specialist';

type QualityControl =
  | 'Quality Assurance Inspector'
  | 'Testing and Diagnostics Specialist';

type TrainingAndDevelopment = 'Technical Trainer';

type JanitorialAndMaintenance = 'Janitor/Cleaner';

type Security = 'Security Guard';

type JobPosition =
  | ExecutiveManagement
  | AdministrativeDepartment
  | SalesAndMarketing
  | InformationTechnology
  | RepairTechnicians
  | FieldServiceTechnicians
  | LogisticsAndInventory
  | CustomerService
  | QualityControl
  | TrainingAndDevelopment
  | JanitorialAndMaintenance
  | Security;

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
