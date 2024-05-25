import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  DATE_NEAR_FUTURE_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
  RadioGroupInputData,
  RoleResourceRoutePaths,
  SelectInputData,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";

const SURVEY_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "actions/outreach/survey",
  employee: "actions/outreach/survey/user",
  manager: "actions/outreach/survey",
};

function returnSurveyStepperPages(): StepperPage[] {
  /**
   * type SurveyState = {
  surveyTitle: string;
  surveyDescription: string;
  expiryDate: string;
  surveyRecipients: SurveyRecipient;
  questions: Array<string>;
  responseKinds: Array<string>;
  responseInputHtml: Array<string>;
  responseDataOptionsArray: Array<string[]>;
  surveyStatistics: SurveyStatistics[];
  triggerFormSubmit: boolean;
  triggerPreviewSurvey: boolean;
  previewSurveyProps: {
    surveyTitle: string;
    surveyDescription: string;
    surveyQuestions: SurveyQuestions[];
  };
  pagesInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
};
   */

  const surveyTitleChild: StepperChild = {
    inputType: "text",
    name: "surveyTitle",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const surveyDescriptionChild: StepperChild = {
    inputType: "text",
    name: "surveyDescription",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const expiryDateChild: StepperChild = {
    inputType: "date",
    name: "expiryDate",
    validations: DATE_NEAR_FUTURE_VALIDATIONS,
  };

  const surveyRecipientsChild: StepperChild = {
    inputType: "select",
    name: "surveyRecipients",
    selectInputData: SURVEY_RECIPIENT_DATA,
  };

  const questionsChild: StepperChild = {
    inputType: "text",
    name: "questions",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const responseKindsChild: StepperChild = {
    inputType: "select",
    name: "responseKinds",
    selectInputData: SURVEY_RESPONSE_KIND_DATA.map(
      (responseKindData) => responseKindData.label
    ),
  };

  const responseInputHtmlChild: StepperChild = {
    inputType: "select",
    name: "responseInputHtml",
    selectInputData: SURVEY_RESPONSE_INPUTS,
  };

  const responseDataOptionsArrayChild: StepperChild = {
    inputType: "text",
    name: "responseDataOptionsArray",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  return [
    {
      children: [
        surveyTitleChild,
        surveyDescriptionChild,
        expiryDateChild,
        surveyRecipientsChild,
      ],
      description: "Survey details",
    },

    {
      children: [
        questionsChild,
        responseKindsChild,
        responseInputHtmlChild,
        responseDataOptionsArrayChild,
      ],
      description: "Enter question 1",
    },

    {
      children: [],
      description: "Review and proceed",
      kind: "review",
    },
  ];
}

const SURVEY_RECIPIENT_DATA = [
  "All",
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
];

const SURVEY_RESPONSE_KIND_DATA: SelectInputData = [
  {
    label: "Choose one",
    value: "chooseOne",
  },
  {
    label: "Choose any",
    value: "chooseAny",
  },
  {
    label: "Rating",
    value: "rating",
  },
];

const SURVEY_INPUT_HTML_DATA = new Map([
  [
    "chooseOne",
    [
      {
        label: "Agree/Disagree",
        value: "agreeDisagree",
      },
      {
        label: "Radio",
        value: "radio",
      },
    ],
  ],

  [
    "chooseAny",
    [
      {
        label: "Checkbox",
        value: "checkbox",
      },
    ],
  ],

  [
    "rating",
    [
      {
        label: "Emotion",
        value: "emotion",
      },
      {
        label: "Stars",
        value: "stars",
      },
    ],
  ],
]);

const SURVEY_MAX_QUESTION_AMOUNT = 3;

const SURVEY_MAX_RESPONSE_DATA_OPTIONS = 11;

const SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS: RadioGroupInputData = [
  {
    label: "Strongly agree",
    value: "Strongly agree",
  },
  {
    label: "Agree",
    value: "Agree",
  },
  {
    label: "Neither agree nor disagree",
    value: "Neither agree nor disagree",
  },
  {
    label: "Disagree",
    value: "Disagree",
  },
  {
    label: "Strongly disagree",
    value: "Strongly disagree",
  },
];

const SURVEY_RESPONSE_INPUTS = ["agreeDisagree", "radio", "checkbox", "emotion", "stars"];

const SURVEY_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Survey Title",
    value: "surveyTitle",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Survey Description",
    value: "surveyDescription",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Send To",
    value: "sendTo",
    inputKind: "selectInput",
    selectData: SURVEY_RECIPIENT_DATA,
  },
  {
    label: "Expiry Date",
    value: "expiryDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Question",
    value: "question",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Response Kind",
    value: "responseKind",
    inputKind: "selectInput",
    selectData: SURVEY_RESPONSE_KIND_DATA.map(
      (responseKindData) => responseKindData.label
    ),
  },
  {
    label: "Response Input",
    value: "responseInput",
    inputKind: "selectInput",
    selectData: SURVEY_RESPONSE_INPUTS,
  },
  {
    label: "Response Options",
    value: "responseOptions",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
];

export {
  returnSurveyStepperPages,
  SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
  SURVEY_INPUT_HTML_DATA,
  SURVEY_MAX_QUESTION_AMOUNT,
  SURVEY_MAX_RESPONSE_DATA_OPTIONS,
  SURVEY_QUERY_DATA,
  SURVEY_RECIPIENT_DATA,
  SURVEY_RESPONSE_INPUTS,
  SURVEY_RESPONSE_KIND_DATA,
  SURVEY_ROLE_ROUTE_PATHS,
};
