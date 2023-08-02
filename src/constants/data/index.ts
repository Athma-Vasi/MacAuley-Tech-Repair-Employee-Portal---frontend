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
  'Administrative',
  'Sales and Marketing',
  'Information Technology',
  'Repair Technicians',
  'Field Service Technicians',
  'Logistics and Inventory',
  'Customer Service',
  'Quality Control',
  'Training and Development',
  'Janitorial and Maintenance',
  'Security',
];

const JOB_POSITION_DATA: JobPosition[] = [
  'Chief Executive Officer',
  'Chief Operations Officer',
  'Chief Financial Officer',
  'Chief Technology Officer',
  'Chief Marketing Officer',
  'Office Manager',
  'Administrative Assistant',
  'Human Resources Manager',
  'Accountant',
  'Sales Manager',
  'Marketing Manager',
  'Sales Representative',
  'Digital Marketing Specialist',
  'IT Manager',
  'Network Administrator',
  'Systems Administrator',
  'IT Support Specialist',
  'Database Administrator',
  'Electronics Repair Technician',
  'Computer Repair Technician',
  'Smartphone Repair Technician',
  'Tablet Repair Technician',
  'Audio/Video Equipment Repair Technician',
  'On-Site Repair Technician',
  'Mobile Device Technician',
  'Warehouse Manager',
  'Inventory Clerk',
  'Delivery Driver',
  'Customer Service Representative',
  'Technical Support Specialist',
  'Quality Assurance Inspector',
  'Testing and Diagnostics Specialist',
  'Technical Trainer',
  'Janitor/Cleaner',
  'Security Guard',
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
    ],
  ],
  [
    'Administrative',
    [
      'Office Manager',
      'Administrative Assistant',
      'Human Resources Manager',
      'Accountant',
    ],
  ],
  [
    'Sales and Marketing',
    [
      'Sales Manager',
      'Marketing Manager',
      'Sales Representative',
      'Digital Marketing Specialist',
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
    ],
  ],
  [
    'Repair Technicians',
    [
      'Electronics Repair Technician',
      'Computer Repair Technician',
      'Smartphone Repair Technician',
      'Tablet Repair Technician',
      'Audio/Video Equipment Repair Technician',
    ],
  ],
  [
    'Field Service Technicians',
    ['On-Site Repair Technician', 'Mobile Device Technician'],
  ],
  [
    'Logistics and Inventory',
    ['Warehouse Manager', 'Inventory Clerk', 'Delivery Driver'],
  ],
  [
    'Customer Service',
    ['Customer Service Representative', 'Technical Support Specialist'],
  ],
  [
    'Quality Control',
    ['Quality Assurance Inspector', 'Testing and Diagnostics Specialist'],
  ],
  ['Training and Development', ['Technical Trainer']],
  ['Janitorial and Maintenance', ['Janitor/Cleaner']],
  ['Security', ['Security Guard']],
]);

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
  TEXT_OVERFLOW,
  URGENCY_DATA,
};
