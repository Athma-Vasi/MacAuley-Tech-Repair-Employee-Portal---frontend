import { CSSProperties } from 'react';

import { Department, JobPosition, StoreLocation } from '../../types';

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

const TEXT_OVERFLOW: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const REQUEST_STATUS = ['pending', 'approved', 'rejected'];

const DEPARTMENT_DATA: Department[] = [
  'Executive Management',
  'Store Administration',
  'Office Administration',
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
  'Compensation and Benefits Specialist',
  'Health and Safety Specialist',
  'Training Specialist',
  'Recruiting Specialist',

  // store administration
  'Store Manager',
  'Shift Supervisor',
  'Office Manager',

  // office administration
  'Office Administrator',
  'Receptionist',
  'Data Entry Specialist',

  // accounting
  'Accounting Manager',
  'Accounts Payable Clerk',
  'Accounts Receivable Clerk',
  'Financial Analyst',

  // sales
  'Sales Manager',
  'Sales Representative',
  'Business Development Specialist',
  'Sales Support Specialist',
  'Sales Operations Analyst',

  // marketing
  'Marketing Manager',
  'Digital Marketing Specialist',
  'Graphic Designer',
  'Public Relations Specialist',
  'Marketing Analyst',

  // information technology
  'IT Manager',
  'Systems Administrator',
  'IT Support Specialist',
  'Database Administrator',
  'Web Developer',
  'Software Developer',
  'Software Engineer',

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
  'Parts and Materials Handler',
  'Shipper/Receiver',

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
      'Compensation and Benefits Specialist',
      'Health and Safety Specialist',
      'Training Specialist',
      'Recruiting Specialist',
    ],
  ],

  [
    'Store Administration',
    ['Store Manager', 'Shift Supervisor', 'Office Manager'],
  ],

  [
    'Office Administration',
    ['Office Administrator', 'Receptionist', 'Data Entry Specialist'],
  ],

  [
    'Accounting',
    [
      'Accounting Manager',
      'Accounts Payable Clerk',
      'Accounts Receivable Clerk',
      'Financial Analyst',
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
      'Digital Marketing Specialist',
      'Graphic Designer',
      'Public Relations Specialist',
      'Marketing Analyst',
    ],
  ],

  [
    'Information Technology',
    [
      'IT Manager',
      'Systems Administrator',
      'IT Support Specialist',
      'Database Administrator',
      'Web Developer',
      'Software Developer',
      'Software Engineer',
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
    [
      'Warehouse Supervisor',
      'Inventory Clerk',
      'Delivery Driver',
      'Parts and Materials Handler',
      'Shipper/Receiver',
    ],
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

const STORE_LOCATION_DATA: StoreLocation[] = [
  'Edmonton',
  'Calgary',
  'Vancouver',
];

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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
const PROPERTY_DESCRIPTOR: PropertyDescriptor = {
  writable: true,
  enumerable: true,
  configurable: false,
};

/**
 * Mantine uses open-color in default theme with some additions (dark). Each color has 10 shades. 0 is the lightest one and 9 is the darkest one.
 * https://yeun.github.io/open-color/
 */
const COLORS_SWATCHES = {
  dark: [
    '#C1C2C5',
    '#A6A7AB',
    '#909296',
    '#5c5f66',
    '#373A40',
    '#2C2E33',
    '#25262b',
    '#1A1B1E',
    '#141517',
    '#101113',
  ],
  gray: [
    '#f8f9fa',
    '#f1f3f5',
    '#e9ecef',
    '#dee2e6',
    '#ced4da',
    '#adb5bd',
    '#868e96',
    '#495057',
    '#343a40',
    '#212529',
  ],
  red: [
    '#fff5f5',
    '#ffe3e3',
    '#ffc9c9',
    '#ffa8a8',
    '#ff8787',
    '#ff6b6b',
    '#fa5252',
    '#f03e3e',
    '#e03131',
    '#c92a2a',
  ],
  pink: [
    '#fff0f6',
    '#ffdeeb',
    '#fcc2d7',
    '#faa2c1',
    '#f783ac',
    '#f06595',
    '#e64980',
    '#d6336c',
    '#c2255c',
    '#a61e4d',
  ],
  grape: [
    '#f8f0fc',
    '#f3d9fa',
    '#eebefa',
    '#e599f7',
    '#da77f2',
    '#cc5de8',
    '#be4bdb',
    '#ae3ec9',
    '#9c36b5',
    '#862e9c',
  ],
  violet: [
    '#f3f0ff',
    '#e5dbff',
    '#d0bfff',
    '#b197fc',
    '#9775fa',
    '#845ef7',
    '#7950f2',
    '#7048e8',
    '#6741d9',
    '#5f3dc4',
  ],
  indigo: [
    '#edf2ff',
    '#dbe4ff',
    '#bac8ff',
    '#91a7ff',
    '#748ffc',
    '#5c7cfa',
    '#4c6ef5',
    '#4263eb',
    '#3b5bdb',
    '#364fc7',
  ],
  blue: [
    '#e7f5ff',
    '#d0ebff',
    '#a5d8ff',
    '#74c0fc',
    '#4dabf7',
    '#339af0',
    '#228be6',
    '#1c7ed6',
    '#1971c2',
    '#1864ab',
  ],
  cyan: [
    '#e3fafc',
    '#c5f6fa',
    '#99e9f2',
    '#66d9e8',
    '#3bc9db',
    '#22b8cf',
    '#15aabf',
    '#1098ad',
    '#0c8599',
    '#0b7285',
  ],
  teal: [
    '#e6fcf5',
    '#c3fae8',
    '#96f2d7',
    '#63e6be',
    '#38d9a9',
    '#20c997',
    '#12b886',
    '#0ca678',
    '#099268',
    '#087f5b',
  ],
  green: [
    '#ebfbee',
    '#d3f9d8',
    '#b2f2bb',
    '#8ce99a',
    '#69db7c',
    '#51cf66',
    '#40c057',
    '#37b24d',
    '#2f9e44',
    '#2b8a3e',
  ],
  lime: [
    '#f4fce3',
    '#e9fac8',
    '#d8f5a2',
    '#c0eb75',
    '#a9e34b',
    '#94d82d',
    '#82c91e',
    '#74b816',
    '#66a80f',
    '#5c940d',
  ],
  yellow: [
    '#fff9db',
    '#fff3bf',
    '#ffec99',
    '#ffe066',
    '#ffd43b',
    '#fcc419',
    '#fab005',
    '#f59f00',
    '#f08c00',
    '#e67700',
  ],
  orange: [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#ff922b',
    '#fd7e14',
    '#f76707',
    '#e8590c',
    '#d9480f',
  ],
};

export {
  COLORS_SWATCHES,
  DEPARTMENT_DATA,
  DEPARTMENT_JOB_POSITION_MAP,
  FIELDNAMES_WITH_DATE_VALUES,
  JOB_POSITION_DATA,
  PROPERTY_DESCRIPTOR,
  PROVINCES,
  REQUEST_STATUS,
  STATES_US,
  STORE_LOCATION_DATA,
  TEXT_OVERFLOW,
  URGENCY_DATA,
};
