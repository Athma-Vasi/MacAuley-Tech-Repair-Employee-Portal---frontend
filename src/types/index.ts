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

type RadioGroupInputData = Array<{
  value: string;
  label: string;
}>;

type CheckboxInputData = Array<{
  value: string;
  label: string;
}>;

type RequestStatus = 'pending' | 'approved' | 'rejected';

/**
 * - Represents the structure of data returned from a query, or the initial display state.
 * - The type includes mandatory fields that are always returned in resource documents.
 * - The 'Partial' type with the generic 'Doc' indicates that the returned fields may vary depending on the query.
 */
type QueryResponseData<Doc> = {
  _id: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
} & Partial<Doc>;

/**
 * Default server response type for all (except GET) REST API requests
 */
type ResourceRequestServerResponse<Doc> = {
  message: string;
  resourceData: QueryResponseData<Doc>[];
};

/**
 * Default server response type for GET REST API requests with query parameters
 */
type GetQueriedResourceRequestServerResponse<Doc> = {
  message: string;
  pages: number;
  totalDocuments: number;
  resourceData: QueryResponseData<Doc>[];
};

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
  RadioGroupInputData,
  RequestStatus,
  ResourceRequestServerResponse,
  SelectInputData,
  SetStepsInErrorPayload,
};
