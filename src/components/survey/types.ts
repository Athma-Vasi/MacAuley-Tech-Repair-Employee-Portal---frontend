import { Action, ActionsOutreach, UserRoles } from "../../types";

type Department =
  | "Executive Management"
  | "Store Administration"
  | "Office Administration"
  | "Accounting"
  | "Human Resources"
  | "Sales"
  | "Marketing"
  | "Information Technology"
  | "Repair Technicians"
  | "Field Service Technicians"
  | "Logistics and Inventory"
  | "Customer Service"
  | "Maintenance";

type SurveyRecipient = "All" | Department;

type SurveyResponseKind = "chooseOne" | "chooseAny" | "rating";
type SurveyResponseInput = "agreeDisagree" | "radio" | "checkbox" | "emotion" | "stars";

type AgreeDisagreeResponse =
  | "Strongly Agree"
  | "Agree"
  | "Neutral"
  | "Disagree"
  | "Strongly Disagree";
type RadioResponse = string;
type CheckboxResponse = Array<string>;
type EmotionResponse = "Upset" | "Annoyed" | "Neutral" | "Happy" | "Ecstatic";
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

type SurveyStatistics = {
  question: string;
  totalResponses: number;
  responseInput: SurveyResponseInput;
  responseDistribution: Record<string, number>;
};

type SurveySchema = {
  creatorId: string;
  creatorUsername: string;
  creatorRole: UserRoles;
  action: Action;
  category: ActionsOutreach;

  surveyTitle: string;
  sendTo: SurveyRecipient;
  expiryDate: string;
  questions: Array<SurveyQuestion>;

  surveyStatistics: SurveyStatistics[];
};

type SurveyDocument = SurveySchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type {
  AgreeDisagreeResponse,
  CheckboxResponse,
  Department,
  EmotionResponse,
  RadioResponse,
  StarsResponse,
  SurveyDocument,
  SurveyQuestion,
  SurveyRecipient,
  SurveyResponseDataOptions,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveySchema,
  SurveyStatistics,
};
