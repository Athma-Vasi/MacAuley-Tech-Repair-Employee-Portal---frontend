import { CSSProperties } from 'react';

const JOB_POSITIONS = ['Employee', 'Supervisor', 'Manager'];

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

const DEPARTMENTS = [
  'Administration',
  'Customer Service',
  'Human Resources',
  'Repair',
  'Technical Support',
  'Sales',
  'Logistics',
  'Inventory Management',
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

export {
  COLORS,
  DEPARTMENTS,
  JOB_POSITIONS,
  PROVINCES,
  REQUEST_STATUS,
  STATES_US,
  TEXT_OVERFLOW,
  URGENCY_DATA,
};
