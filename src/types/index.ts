/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
} from './actions.types';
import type { Note } from './notes.types';
import type {
  CanadianPostalCode,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
} from './user.types';

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Urgency = 'low' | 'medium' | 'high';
type SetStepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};
type CheckBoxMultipleData = {
  value: string;
  label: string;
}[];
type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY';

type SelectInputData = Array<{
  value: string;
  label: string;
}>;

type CheckboxInputData = Array<{
  value: string;
  label: string;
}>;

/**
 * Default server response type for all (except GET) REST API requests
 */
type ResourceRequestServerResponse<Document> = {
  message: string;
  resourceData: Array<Omit<Document, '__v'>>;
};

/**
 * Default server response type for GET REST API requests with query parameters
 */
type GetQueriedResourceRequestServerResponse<Document> = {
  message: string;
  pages: number;
  totalDocuments: number;
  resourceData: Array<Partial<Document>>;
};

/**
 * - Represents the structure of data returned from a query, or the initial display state.
 * - The type includes mandatory fields that are always returned, while the other declared fields are optional and usually returned.
 * - The 'Partial' type with the generic 'Doc' indicates the optional fields present in resource documents.
 * - In summary, the type represents the structure of data returned from a query with optional fields present in resource documents.
 */
type QueryResponseData<Doc> = {
  _id: string;
  userId: string;
  username: string;
  action?: Action;
  category?: ActionsCompany | ActionsGeneral | ActionsOutreach;
  createdAt: string;
  updatedAt: string;
  __v?: number;
} & Partial<Doc>;

export type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
  CanadianPostalCode,
  CheckboxInputData,
  Country,
  Department,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
  Urgency,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
};

export type {
  BreakPoints,
  CheckBoxMultipleData,
  Currency,
  GetQueriedResourceRequestServerResponse,
  Note,
  QueryResponseData,
  ResourceRequestServerResponse,
  SelectInputData,
  SetStepsInErrorPayload,
};
