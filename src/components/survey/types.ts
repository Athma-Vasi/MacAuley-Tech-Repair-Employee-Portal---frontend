import { UserRoles, Action, ActionsOutreach } from '../../types';

type SurveyRecipient =
  | 'All'
  | 'Executive Management'
  | 'Administrative'
  | 'Sales and Marketing'
  | 'Information Technology'
  | 'Repair Technicians'
  | 'Field Service Technicians'
  | 'Logistics and Inventory'
  | 'Customer Service'
  | 'Quality Control'
  | 'Training and Development'
  | 'Janitorial and Maintenance'
  | 'Security';

type SurveyResponseKind = 'chooseOne' | 'chooseAny' | 'rating';
type SurveyResponseInput =
  | 'agreeDisagree'
  | 'radio'
  | 'checkbox'
  | 'emotion'
  | 'stars';

type AgreeDisagreeResponse =
  | 'Strongly Agree'
  | 'Agree'
  | 'Neutral'
  | 'Disagree'
  | 'Strongly Disagree';
type RadioResponse = string;
type CheckboxResponse = Array<string>;
type EmotionResponse = 'Upset' | 'Annoyed' | 'Neutral' | 'Happy' | 'Ecstatic';
type StarsResponse = 1 | 2 | 3 | 4 | 5;

type SurveyResponseDataOptions =
  | AgreeDisagreeResponse
  | RadioResponse
  | CheckboxResponse
  | EmotionResponse
  | StarsResponse;

type SurveyQuestion = {
  question: string;
  responseKind: SurveyResponseKind;
  responseInput: SurveyResponseInput;
  responseDataOptions: string[] | [];
};

type SurveyBuilderSchema = {
  creatorId: string;
  creatorUsername: string;
  creatorRole: UserRoles;
  action: Action;
  category: ActionsOutreach;

  surveyTitle: string;
  sendTo: SurveyRecipient;
  expiryDate: string;
  questions: Array<SurveyQuestion>;
};

type SurveyBuilderDocument = SurveyBuilderSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type {
  AgreeDisagreeResponse,
  CheckboxResponse,
  EmotionResponse,
  RadioResponse,
  StarsResponse,
  SurveyBuilderDocument,
  SurveyBuilderSchema,
  SurveyQuestion,
  SurveyRecipient,
  SurveyResponseDataOptions,
  SurveyResponseInput,
  SurveyResponseKind,
};
