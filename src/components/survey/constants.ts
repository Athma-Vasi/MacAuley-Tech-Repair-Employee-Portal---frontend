import { RadioGroupInputData, SelectInputData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

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

const SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS: RadioGroupInputData = [
  {
    label: 'Strongly agree',
    value: 'Strongly agree',
  },
  {
    label: 'Agree',
    value: 'Agree',
  },
  {
    label: 'Neither agree nor disagree',
    value: 'Neither agree nor disagree',
  },
  {
    label: 'Disagree',
    value: 'Disagree',
  },
  {
    label: 'Strongly disagree',
    value: 'Strongly disagree',
  },
];

const SURVEY_RESPONSE_INPUTS = [
  'agreeDisagree',
  'radio',
  'checkbox',
  'emotion',
  'stars',
];

const SURVEY_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Survey title',
    value: 'surveyTitle',
    inputKind: 'textInput',
  },
  {
    label: 'Survey description',
    value: 'surveyDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Send to',
    value: 'sendTo',
    inputKind: 'selectInput',
    selectData: SURVEY_BUILDER_RECIPIENT_DATA,
  },
  {
    label: 'Expiry date',
    value: 'expiryDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Question',
    value: 'question',
    inputKind: 'textInput',
  },
  {
    label: 'Response kind',
    value: 'responseKind',
    inputKind: 'selectInput',
    selectData: SURVEY_BUILDER_RESPONSE_KIND_DATA.map(
      (responseKindData) => responseKindData.label
    ),
  },
  {
    label: 'Response input',
    value: 'responseInput',
    inputKind: 'selectInput',
    selectData: SURVEY_RESPONSE_INPUTS,
  },
  {
    label: 'Response options',
    value: 'responseOptions',
    inputKind: 'textInput',
  },
  {
    label: 'Created at',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated at',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

export {
  SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
  SURVEY_BUILDER_INPUT_HTML_DATA,
  SURVEY_BUILDER_MAX_QUESTION_AMOUNT,
  SURVEY_BUILDER_RECIPIENT_DATA,
  SURVEY_BUILDER_RESPONSE_KIND_DATA,
  SURVEY_MAX_RESPONSE_DATA_OPTIONS,
  SURVEY_QUERY_DATA,
  SURVEY_RESPONSE_INPUTS,
};
