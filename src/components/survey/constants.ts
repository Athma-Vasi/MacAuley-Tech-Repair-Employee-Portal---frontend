import { SelectInputData } from '../../types';

const SURVEY_BUILDER_RECIPIENT_DATA = [
  'All',
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

const SURVEY_BUILDER_RESPONSE_KIND_DATA: SelectInputData = [
  {
    label: 'Choose one',
    value: 'chooseOne',
  },
  {
    label: 'Choose any',
    value: 'chooseAny',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
];

const SURVEY_BUILDER_INPUT_HTML_DATA = new Map([
  [
    'chooseOne',
    [
      {
        label: 'Agree/Disagree',
        value: 'agreeDisagree',
      },
      {
        label: 'Radio',
        value: 'radio',
      },
    ],
  ],

  [
    'chooseAny',
    [
      {
        label: 'Checkbox',
        value: 'checkbox',
      },
    ],
  ],

  [
    'rating',
    [
      {
        label: 'Emotion',
        value: 'emotion',
      },
      {
        label: 'Stars',
        value: 'stars',
      },
    ],
  ],
]);

const SURVEY_BUILDER_MAX_QUESTION_AMOUNT = 3;

const SURVEY_MAX_RESPONSE_DATA_OPTIONS = 7;

export {
  SURVEY_BUILDER_INPUT_HTML_DATA,
  SURVEY_BUILDER_MAX_QUESTION_AMOUNT,
  SURVEY_BUILDER_RECIPIENT_DATA,
  SURVEY_BUILDER_RESPONSE_KIND_DATA,
  SURVEY_MAX_RESPONSE_DATA_OPTIONS,
};
