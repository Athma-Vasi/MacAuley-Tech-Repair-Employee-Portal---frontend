import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { StepperChild, StepperPage } from "../../types";
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
} from "../directory/constants";
import { DepartmentsWithDefaultKey } from "./types";

/** Directory does not implement Stepper, the inputs require it however */
function returnDirectory1StepperPages(): StepperPage[] {
  const departmentChild: StepperChild = {
    inputType: "select",
    name: "department",
    selectInputData: DEPARTMENT_DATA,
  };

  const jobPositionChild: StepperChild = {
    inputType: "select",
    name: "jobPosition",
    selectInputData: JOB_POSITION_DATA,
  };

  const storeLocationChild: StepperChild = {
    inputType: "select",
    name: "storeLocation",
    selectInputData: STORE_LOCATION_DATA,
  };

  const searchChild: StepperChild = {
    inputType: "text",
    name: "search",
    validationKey: "search",
  };

  const rankerAlgorithmChild: StepperChild = {
    inputType: "select",
    name: "rankerAlgorithm",
    selectInputData: DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
  };

  const rankDirectionChild: StepperChild = {
    inputType: "select",
    name: "rankDirection",
    selectInputData: DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  };

  const rankAlignmentChild: StepperChild = {
    inputType: "select",
    name: "rankAlignment",
    selectInputData: DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  };

  const nodeSeparationChild: StepperChild = {
    inputType: "slider",
    name: "nodeSeparation",
    sliderInputData: { max: 300, min: 25 },
  };

  const rankSeparationChild: StepperChild = {
    inputType: "slider",
    name: "rankSeparation",
    sliderInputData: { max: 300, min: 25 },
  };

  const minLengthChild: StepperChild = {
    inputType: "slider",
    name: "minLength",
    sliderInputData: { max: 10, min: 1 },
  };

  return [
    {
      children: [departmentChild, jobPositionChild, storeLocationChild, searchChild],
      description: "Directory Filters",
      preventErrorStateDisplay: true,
    },
    {
      children: [
        rankerAlgorithmChild,
        rankDirectionChild,
        rankAlignmentChild,
        nodeSeparationChild,
        rankSeparationChild,
        minLengthChild,
      ],
      description: "Layout Filters",
    },
  ];
}

const DEPARTMENT_JOB_POSITION_TABLE: Record<DepartmentsWithDefaultKey, string[]> = {
  "All Departments": [
    "All Job Positions",
    "Chief Executive Officer",
    "Chief Operations Officer",
    "Chief Financial Officer",
    "Chief Technology Officer",
    "Chief Marketing Officer",
    "Chief Human Resources Officer",
    "Human Resources Manager",
    "Compensation and Benefits Specialist",
    "Health and Safety Specialist",
    "Training Specialist",
    "Recruiting Specialist",
    "Store Manager",
    "Shift Supervisor",
    "Office Manager",
    "Office Administrator",
    "Receptionist",
    "Data Entry Specialist",
    "Accounting Manager",
    "Accounts Payable Clerk",
    "Accounts Receivable Clerk",
    "Financial Analyst",
    "Sales Manager",
    "Sales Representative",
    "Business Development Specialist",
    "Sales Support Specialist",
    "Sales Operations Analyst",
    "Marketing Manager",
    "Digital Marketing Specialist",
    "Graphic Designer",
    "Public Relations Specialist",
    "Marketing Analyst",
    "IT Manager",
    "Systems Administrator",
    "IT Support Specialist",
    "Database Administrator",
    "Web Developer",
    "Software Developer",
    "Software Engineer",
    "Repair Technicians Supervisor",
    "Electronics Technician",
    "Computer Technician",
    "Smartphone Technician",
    "Tablet Technician",
    "Audio/Video Equipment Technician",
    "Field Service Supervisor",
    "On-Site Technician",
    "Warehouse Supervisor",
    "Inventory Clerk",
    "Delivery Driver",
    "Parts and Materials Handler",
    "Shipper/Receiver",
    "Customer Service Supervisor",
    "Customer Service Representative",
    "Technical Support Specialist",
    "Maintenance Supervisor",
    "Maintenance Worker",
    "Custodian",
  ],
  "Executive Management": [
    "Chief Executive Officer",
    "Chief Operations Officer",
    "Chief Financial Officer",
    "Chief Technology Officer",
    "Chief Marketing Officer",
    "Chief Human Resources Officer",
  ],
  "Human Resources": [
    "Human Resources Manager",
    "Compensation and Benefits Specialist",
    "Health and Safety Specialist",
    "Training Specialist",
    "Recruiting Specialist",
  ],
  "Store Administration": ["Store Manager", "Shift Supervisor", "Office Manager"],
  "Office Administration": [
    "Office Administrator",
    "Receptionist",
    "Data Entry Specialist",
  ],
  Accounting: [
    "Accounting Manager",
    "Accounts Payable Clerk",
    "Accounts Receivable Clerk",
    "Financial Analyst",
  ],
  Sales: [
    "Sales Manager",
    "Sales Representative",
    "Business Development Specialist",
    "Sales Support Specialist",
    "Sales Operations Analyst",
  ],
  Marketing: [
    "Marketing Manager",
    "Digital Marketing Specialist",
    "Graphic Designer",
    "Public Relations Specialist",
    "Marketing Analyst",
  ],
  "Information Technology": [
    "IT Manager",
    "Systems Administrator",
    "IT Support Specialist",
    "Database Administrator",
    "Web Developer",
    "Software Developer",
    "Software Engineer",
  ],
  "Repair Technicians": [
    "Repair Technicians Supervisor",
    "Electronics Technician",
    "Computer Technician",
    "Smartphone Technician",
    "Tablet Technician",
    "Audio/Video Equipment Technician",
  ],
  "Field Service Technicians": ["Field Service Supervisor", "On-Site Technician"],
  "Logistics and Inventory": [
    "Warehouse Supervisor",
    "Inventory Clerk",
    "Delivery Driver",
    "Parts and Materials Handler",
    "Shipper/Receiver",
  ],
  "Customer Service": [
    "Customer Service Supervisor",
    "Customer Service Representative",
    "Technical Support Specialist",
  ],
  Maintenance: ["Maintenance Supervisor", "Maintenance Worker", "Custodian"],
};

export { DEPARTMENT_JOB_POSITION_TABLE, returnDirectory1StepperPages };
