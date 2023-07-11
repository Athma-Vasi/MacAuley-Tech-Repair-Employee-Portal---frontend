import { CheckBoxMultipleData } from '../../../types';
import { DescriptionMap } from '../../stepperWrapper';

const CREATE_ENDORSEMENT_MAX_STEPPER_POSITION = 3;

const CREATE_ENDORSEMENT_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Employee endorsement',
      ariaLabel: 'Enter title, user to be endorsed and summary of endorsement',
    },
  ],
  [
    2,
    {
      description: 'Attribute(s) endorsed',
      ariaLabel: 'Select attributes to be endorsed',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review accuracy of entered information before proceeding',
    },
  ],
]);

const EMPLOYEE_ATTRIBUTES_DATA: CheckBoxMultipleData = [
  { value: 'teamwork and collaboration', label: 'Teamwork and collaboration' },
  { value: 'leadership and mentorship', label: 'Leadership and mentorship' },
  { value: 'technical expertise', label: 'Technical expertise' },
  {
    value: 'adaptibility and flexibility',
    label: 'Adaptibility and flexibility',
  },
  { value: 'problem solving', label: 'Problem solving' },
  { value: 'customer service', label: 'Customer service' },
  { value: 'initiative and proactivity', label: 'Initiative and proactivity' },
  { value: 'communication', label: 'Communication' },
  {
    value: 'reliability and dependability',
    label: 'Reliability and dependability',
  },
];

export {
  CREATE_ENDORSEMENT_DESCRIPTION_MAP,
  CREATE_ENDORSEMENT_MAX_STEPPER_POSITION,
  EMPLOYEE_ATTRIBUTES_DATA,
};
