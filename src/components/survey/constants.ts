import { REQUEST_STATUS_DATA } from "../../constants/data";
import type {
  CheckboxRadioSelectData,
  RadioGroupInputData,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import type {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
} from "./types";

const SURVEY_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "actions/outreach/survey",
  employee: "actions/outreach/survey/user",
  manager: "actions/outreach/survey",
};

function returnSurveyStepperPages(): StepperPage[] {
  const surveyTitleChild: StepperChild = {
    inputType: "text",
    name: "surveyTitle",
    validationKey: "textInput",
  };

  const surveyDescriptionChild: StepperChild = {
    inputType: "text",
    name: "surveyDescription",
    validationKey: "textAreaInput",
  };

  const expiryDateChild: StepperChild = {
    inputType: "date",
    name: "expiryDate",
    validationKey: "dateNearFuture",
  };

  const surveyRecipientsChild: StepperChild = {
    inputType: "select",
    name: "surveyRecipients",
    selectInputData: SURVEY_RECIPIENT_DATA,
  };

  const questionsChild: StepperChild = {
    inputType: "text",
    name: "question 1",
    validationKey: "textInput",
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
    validationKey: "textAreaInput",
  };

  const requestStatusChild: StepperChild = {
    inputType: "select",
    name: "requestStatus",
    selectInputData: REQUEST_STATUS_DATA,
  };

  return [
    {
      children: [
        surveyTitleChild,
        surveyDescriptionChild,
        expiryDateChild,
        surveyRecipientsChild,
        requestStatusChild,
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

const SURVEY_RECIPIENT_DATA: CheckboxRadioSelectData<SurveyRecipient> = [
  { label: "All", value: "All" },
  { label: "Executive Management", value: "Executive Management" },
  { label: "Store Administration", value: "Store Administration" },
  { label: "Office Administration", value: "Office Administration" },
  { label: "Accounting", value: "Accounting" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Sales", value: "Sales" },
  { label: "Marketing", value: "Marketing" },
  { label: "Information Technology", value: "Information Technology" },
  { label: "Repair Technicians", value: "Repair Technicians" },
  { label: "Field Service Technicians", value: "Field Service Technicians" },
  { label: "Logistics and Inventory", value: "Logistics and Inventory" },
  { label: "Customer Service", value: "Customer Service" },
  { label: "Maintenance", value: "Maintenance" },
];

const SURVEY_RESPONSE_KIND_DATA: CheckboxRadioSelectData<SurveyResponseKind> = [
  { label: "Choose One", value: "chooseOne" },
  { label: "Choose Any", value: "chooseAny" },
  { label: "Rating", value: "rating" },
];

const SURVEY_INPUT_HTML_DATA: Record<
  SurveyResponseKind,
  SurveyResponseInput[]
> = {
  chooseOne: ["agreeDisagree", "radio"],
  chooseAny: ["checkbox"],
  rating: ["emotion", "stars"],
};

const SURVEY_MAX_QUESTION_AMOUNT = 3;

const SURVEY_MAX_RESPONSE_DATA_OPTIONS = 11;

const SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS: RadioGroupInputData = [
  { label: "Strongly agree", value: "Strongly agree" },
  { label: "Agree", value: "Agree" },
  { label: "Neither agree nor disagree", value: "Neither agree nor disagree" },
  { label: "Disagree", value: "Disagree" },
  { label: "Strongly disagree", value: "Strongly disagree" },
];

const SURVEY_RESPONSE_INPUTS: CheckboxRadioSelectData<SurveyResponseInput> = [
  { label: "Agree/Disagree", value: "agreeDisagree" },
  { label: "Radio", value: "radio" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Emotion", value: "emotion" },
  { label: "Stars", value: "stars" },
];

export {
  INDEX_ALPHABET_TABLE,
  MAX_INPUTS_AMOUNT,
  returnSurveyStepperPages,
  SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
  SURVEY_INPUT_HTML_DATA,
  SURVEY_MAX_QUESTION_AMOUNT,
  SURVEY_MAX_RESPONSE_DATA_OPTIONS,
  SURVEY_RECIPIENT_DATA,
  SURVEY_RESPONSE_INPUTS,
  SURVEY_RESPONSE_KIND_DATA,
  SURVEY_ROLE_ROUTE_PATHS,
};
