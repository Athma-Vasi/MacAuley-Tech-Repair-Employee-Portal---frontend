import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
  RadioGroupInputData,
  RoleResourceRoutePaths,
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
import { SurveyRecipient, SurveyResponseInput, SurveyResponseKind } from "./types";

const SURVEY_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "actions/outreach/survey",
  employee: "actions/outreach/survey/user",
  manager: "actions/outreach/survey",
};

function returnSurveyStepperPages(): StepperPage[] {
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
    validations: "dateNearFuture",
  };

  const surveyRecipientsChild: StepperChild = {
    inputType: "select",
    name: "surveyRecipients",
    selectInputData: SURVEY_RECIPIENT_DATA,
  };

  const questionsChild: StepperChild = {
    inputType: "text",
    name: "question 1",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const responseKindsChild: StepperChild = {
    inputType: "select",
    name: "responseKinds 1",
    selectInputData: SURVEY_RESPONSE_KIND_DATA,
  };

  const responseInputsChild: StepperChild = {
    inputType: "select",
    name: "responseInputs 1",
    selectInputData: SURVEY_RESPONSE_INPUTS,
  };

  const responseOptionsChild: StepperChild = {
    inputType: "text",
    name: "responseOption 1 A",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
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
        responseInputsChild,
        responseOptionsChild,
      ],
      description: "Question 1",
    },

    {
      children: [],
      description: "Review and proceed",
      kind: "review",
    },
  ];
}

const MAX_INPUTS_AMOUNT = 10;

const INDEX_ALPHABET_TABLE: Record<number, string> = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
};

const SURVEY_RECIPIENT_DATA: SurveyRecipient[] = [
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

const SURVEY_RESPONSE_KIND_DATA: SurveyResponseKind[] = [
  "chooseOne",
  "chooseAny",
  "rating",
];

const SURVEY_INPUT_HTML_DATA: Record<SurveyResponseKind, SurveyResponseInput[]> = {
  chooseOne: ["agreeDisagree", "radio"],
  chooseAny: ["checkbox"],
  rating: ["emotion", "stars"],
};

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

const SURVEY_RESPONSE_INPUTS: SurveyResponseInput[] = [
  "agreeDisagree",
  "radio",
  "checkbox",
  "emotion",
  "stars",
];

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
    selectData: SURVEY_RESPONSE_KIND_DATA,
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
  INDEX_ALPHABET_TABLE,
  MAX_INPUTS_AMOUNT,
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
