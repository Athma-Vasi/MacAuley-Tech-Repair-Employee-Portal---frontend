import { z } from "zod";

const httpResponseSchema = z.object({
    accessToken: z.string(),
    // data field is an array of objects that will be merged
    // data: z.array(),
    kind: z.string(),
    message: z.string(),
    pages: z.number(),
    status: z.number(),
    totalDocuments: z.number(),
    triggerLogout: z.boolean(),
});

const HttpResponseKindZodEnum = ["success", "error"] as const;

const UserRolesZodEnum = ["Admin", "Employee", "Manager"] as const;

const PreferredPronounsZodEnum = [
    "He/Him",
    "She/Her",
    "They/Them",
    "Other",
    "Prefer not to say",
] as const;

const ProvinceZodEnum = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
] as const;

const StatesUSZodEnum = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
] as const;

const CountryZodEnum = ["Canada", "United States"] as const;

const StorelocationZodEnum = [
    "Calgary",
    "Edmonton",
    "Vancouver",
] as const;

const DepartmentZodEnum = [
    "Executive Management",
    "Store Administration",
    "Office Administration",
    "Accounting",
    "Human Resources",
    "Sales",
    "Marketing",
    "Information Technology",
    "Repair Technicians",
    "Field Service Technicians",
    "Logistics and Inventory",
    "Customer Service",
    "Maintenance",
] as const;

const ExecutiveManagementZodEnum = [
    "Chief Executive Officer",
    "Chief Operations Officer",
    "Chief Financial Officer",
    "Chief Technology Officer",
    "Chief Marketing Officer",
    "Chief Sales Officer",
    "Chief Human Resources Officer",
] as const;

const HumanResourcesZodEnum = [
    "Human Resources Manager",
    "Compensation and Benefits Specialist",
    "Health and Safety Specialist",
    "Training Specialist",
    "Recruiting Specialist",
] as const;

const StoreAdministrationZodEnum = [
    "Store Manager",
    "Shift Supervisor",
    "Office Manager",
] as const;

const OfficeAdministrationZodEnum = [
    "Office Administrator",
    "Receptionist",
    "Data Entry Specialist",
] as const;

const AccountingZodEnum = [
    "Accounting Manager",
    "Accounts Payable Clerk",
    "Accounts Receivable Clerk",
    "Financial Analyst",
] as const;

const SalesZodEnum = [
    "Sales Manager",
    "Sales Representative",
    "Business Development Specialist",
    "Sales Support Specialist",
    "Sales Operations Analyst",
] as const;

const MarketingZodEnum = [
    "Marketing Manager",
    "Digital Marketing Specialist",
    "Graphic Designer",
    "Public Relations Specialist",
    "Marketing Analyst",
] as const;

const InformationTechnologyZodEnum = [
    "IT Manager",
    "Systems Administrator",
    "IT Support Specialist",
    "Database Administrator",
    "Web Developer",
    "Software Developer",
    "Software Engineer",
] as const;

const RepairTechniciansZodEnum = [
    "Repair Technicians Supervisor",
    "Electronics Technician",
    "Computer Technician",
    "Smartphone Technician",
    "Tablet Technician",
    "Audio/Video Equipment Technician",
] as const;

const FieldServiceTechniciansZodEnum = [
    "Field Service Supervisor",
    "On-Site Technician",
] as const;

const LogisticsAndInventoryZodEnum = [
    "Warehouse Supervisor",
    "Inventory Clerk",
    "Delivery Driver",
    "Parts and Materials Handler",
    "Shipper/Receiver",
] as const;

const CustomerServiceZodEnum = [
    "Customer Service Supervisor",
    "Customer Service Representative",
    "Technical Support Specialist",
] as const;

const MaintenanceZodEnum = [
    "Maintenance Supervisor",
    "Maintenance Worker",
    "Custodian",
] as const;

const JobPositionZodEnum = [
    ...ExecutiveManagementZodEnum,
    ...StoreAdministrationZodEnum,
    ...OfficeAdministrationZodEnum,
    ...SalesZodEnum,
    ...MarketingZodEnum,
    ...InformationTechnologyZodEnum,
    ...RepairTechniciansZodEnum,
    ...FieldServiceTechniciansZodEnum,
    ...LogisticsAndInventoryZodEnum,
    ...CustomerServiceZodEnum,
    ...HumanResourcesZodEnum,
    ...AccountingZodEnum,
    ...MaintenanceZodEnum,
] as const;

export {
    AccountingZodEnum,
    CountryZodEnum,
    CustomerServiceZodEnum,
    DepartmentZodEnum,
    ExecutiveManagementZodEnum,
    FieldServiceTechniciansZodEnum,
    HttpResponseKindZodEnum,
    httpResponseSchema,
    HumanResourcesZodEnum,
    InformationTechnologyZodEnum,
    JobPositionZodEnum,
    LogisticsAndInventoryZodEnum,
    MaintenanceZodEnum,
    MarketingZodEnum,
    OfficeAdministrationZodEnum,
    PreferredPronounsZodEnum,
    ProvinceZodEnum,
    RepairTechniciansZodEnum,
    SalesZodEnum,
    StatesUSZodEnum,
    StoreAdministrationZodEnum,
    StorelocationZodEnum,
    UserRolesZodEnum,
};
