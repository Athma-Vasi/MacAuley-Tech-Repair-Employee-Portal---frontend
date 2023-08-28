import { CSSProperties } from 'react';

import { Department, JobPosition } from '../../types';

const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const STATES_US = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const URGENCY_DATA = ['low', 'medium', 'high'];

const COLORS = {
  darkTextColor: 'dark',
  lightTextColor: '#A7A7A7',
  lightHeaderBGColor: '#333333',
  darkHeaderBGColor: '#8cc3f2',
  lightRowBGColor: '#252525',
  darkRowBGColor: '#F5F5F6',
  darkIconColor: 'dimgrey',
  lightIconColor: '#888888',
  buttonOutlineColor: '1px solid #339af0',
  buttonTextColor: '#339af0',
};

const TEXT_OVERFLOW: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const REQUEST_STATUS = ['pending', 'approved', 'rejected'];

const DEPARTMENT_DATA: Department[] = [
  'Executive Management',
  'Store Administration',
  'Accounting',
  'Human Resources',
  'Sales',
  'Marketing',
  'Information Technology',
  'Repair Technicians',
  'Field Service Technicians',
  'Logistics and Inventory',
  'Customer Service',
  'Maintenance',
];

const JOB_POSITION_DATA: JobPosition[] = [
  // executive management
  'Chief Executive Officer',
  'Chief Operations Officer',
  'Chief Financial Officer',
  'Chief Technology Officer',
  'Chief Marketing Officer',
  'Chief Human Resources Officer',

  // human resources
  'Human Resources Manager',
  'Compensation and Benefits Manager',
  'Compensation and Benefits Specialist',
  'Health and Safety Manager',
  'Health and Safety Specialist',
  'Training Manager',
  'Training Specialist',
  'Recruiting Manager',
  'Recruiting Specialist',

  // store administration
  'Store Manager',
  'Shift Supervisor',
  'Office Manager',

  // accounting
  'Accounting Manager',
  'Accounts Payable Clerk',
  'Accounts Receivable Clerk',
  'Financial Analyst',
  'Tax Specialist',
  'Payroll Specialist',
  'Budget Analyst',
  'Auditor',

  // sales
  'Sales Manager',
  'Sales Representative',
  'Business Development Specialist',
  'Sales Support Specialist',
  'Sales Operations Analyst',

  // marketing
  'Marketing Manager',
  'SEO Specialist',
  'Digital Marketing Specialist',
  'Social Media Specialist',
  'Graphic Designer',
  'Public Relations Specialist',
  'Marketing Analyst',
  'Brand Specialist',

  // information technology
  'IT Manager',
  'Network Administrator',
  'Systems Administrator',
  'IT Support Specialist',
  'Database Administrator',
  'Web Developer',
  'Software Developer',
  'Software Engineer',
  'Infrastructure Architect',
  'IT Security Specialist',
  'Cloud Architect',
  'Data Scientist',
  'IT Training Specialist',

  // repair technicians
  'Repair Technicians Supervisor',
  'Electronics Technician',
  'Computer Technician',
  'Smartphone Technician',
  'Tablet Technician',
  'Audio/Video Equipment Technician',

  // field service technicians
  'Field Service Supervisor',
  'On-Site Technician',

  // logistics and inventory
  'Warehouse Supervisor',
  'Inventory Clerk',
  'Delivery Driver',

  // customer service
  'Customer Service Supervisor',
  'Customer Service Representative',
  'Technical Support Specialist',

  // maintenance
  'Maintenance Supervisor',
  'Maintenance Worker',
  'Custodian',
];

const DEPARTMENT_JOB_POSITION_MAP = new Map([
  [
    'Executive Management',
    [
      'Chief Executive Officer',
      'Chief Operations Officer',
      'Chief Financial Officer',
      'Chief Technology Officer',
      'Chief Marketing Officer',
      'Chief Human Resources Officer',
    ],
  ],

  [
    'Human Resources',
    [
      'Human Resources Manager',
      'Compensation and Benefits Manager',
      'Compensation and Benefits Specialist',
      'Health and Safety Manager',
      'Health and Safety Specialist',
      'Training Manager',
      'Training Specialist',
      'Recruiting Manager',
      'Recruiting Specialist',
    ],
  ],

  [
    'Store Administration',
    ['Store Manager', 'Shift Supervisor', 'Office Manager'],
  ],

  [
    'Accounting',
    [
      'Accounting Manager',
      'Accounts Payable Clerk',
      'Accounts Receivable Clerk',
      'Financial Analyst',
      'Tax Specialist',
      'Payroll Specialist',
      'Budget Analyst',
      'Auditor',
    ],
  ],

  [
    'Sales',
    [
      'Sales Manager',
      'Sales Representative',
      'Business Development Specialist',
      'Sales Support Specialist',
      'Sales Operations Analyst',
    ],
  ],

  [
    'Marketing',
    [
      'Marketing Manager',
      'SEO Specialist',
      'Digital Marketing Specialist',
      'Social Media Specialist',
      'Graphic Designer',
      'Public Relations Specialist',
      'Marketing Analyst',
      'Brand Specialist',
    ],
  ],

  [
    'Information Technology',
    [
      'IT Manager',
      'Network Administrator',
      'Systems Administrator',
      'IT Support Specialist',
      'Database Administrator',
      'Web Developer',
      'Software Developer',
      'Software Engineer',
      'Infrastructure Architect',
      'IT Security Specialist',
      'Cloud Architect',
      'Data Scientist',
      'IT Training Specialist',
    ],
  ],

  [
    'Repair Technicians',
    [
      'Repair Technicians Supervisor',
      'Electronics Technician',
      'Computer Technician',
      'Smartphone Technician',
      'Tablet Technician',
      'Audio/Video Equipment Technician',
    ],
  ],

  [
    'Field Service Technicians',
    ['Field Service Supervisor', 'On-Site Technician'],
  ],

  [
    'Logistics and Inventory',
    ['Warehouse Supervisor', 'Inventory Clerk', 'Delivery Driver'],
  ],

  [
    'Customer Service',
    [
      'Customer Service Supervisor',
      'Customer Service Representative',
      'Technical Support Specialist',
    ],
  ],

  [
    'Maintenance',
    ['Maintenance Supervisor', 'Maintenance Worker', 'Custodian'],
  ],
]);

const STORE_LOCATION_DATA = ['Edmonton', 'Calgary', 'Vancouver'];

/**
 * these are the field names that have date values that are not time stamps.
 * the timestamps are formatted differently from the other date values.
 */
const FIELDNAMES_WITH_DATE_VALUES = new Set([
  // company
  'planStartDate',
  'expenseClaimDate',
  'startDate',
  'endDate',
  'dateNeededBy',
  // general
  'dateOfOccurrence',
  // outreach
  'rsvpDeadline',
  'eventStartDate',
  'eventEndDate',
  // register - user
  'dateofBirth',
]);

export {
  COLORS,
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
  FIELDNAMES_WITH_DATE_VALUES,
  JOB_POSITION_DATA,
  PROVINCES,
  REQUEST_STATUS,
  STATES_US,
  STORE_LOCATION_DATA,
  TEXT_OVERFLOW,
  URGENCY_DATA,
};
