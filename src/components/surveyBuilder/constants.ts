import { SelectInputData } from '../../types';

const SURVEY_BUILDER_RECIPIENT_DATA = [
  'All',
  'Active',
  'Inactive',
  'Employees',
  'Admins',
  'Managers',
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
    label: 'Short answer',
    value: 'shortAnswer',
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
        label: 'True/False',
        value: 'trueFalse',
      },
      {
        label: 'Yes/No',
        value: 'yesNo',
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
      {
        label: 'Dropdown',
        value: 'dropdown',
      },
    ],
  ],
  [
    'shortAnswer',
    [
      {
        label: 'Short answer',
        value: 'shortAnswer',
      },
    ],
  ],
  [
    'rating',
    [
      {
        label: 'Scale',
        value: 'scale',
      },
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

const SURVEY_BUILDER_MAX_QUESTION_AMOUNT = 5;

export {
  SURVEY_BUILDER_INPUT_HTML_DATA,
  SURVEY_BUILDER_MAX_QUESTION_AMOUNT,
  SURVEY_BUILDER_RECIPIENT_DATA,
  SURVEY_BUILDER_RESPONSE_KIND_DATA,
};
