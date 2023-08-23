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
  StoreLocation,
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
  label: string;
  value: string;
}[];
type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY';

type SelectInputData = Array<{
  label: string;
  value: string;
}>;

type RadioGroupInputData = Array<{
  label: string;
  value: string;
}>;

type CheckboxInputData = Array<{
  label: string;
  value: string;
}>;

type SliderInputData = Array<{
  label: string;
  value: number;
}>;

type FileExtension = '.jpg' | 'jpeg' | 'png' | 'gif' | 'pdf';

type FileUploadSchema = {
  userId: string;
  uploadedFile: Buffer;
  username: string;
  fileExtension: FileExtension;
  fileName: string;
  fileSize: number;
  fileMimeType: string;
  fileEncoding: string;
};

type AssociatedResourceKind =
  | ActionsCompany
  | ActionsGeneral
  | ActionsOutreach
  | 'user'
  | 'repairNote';

type FileUploadDocument = FileUploadSchema & {
  _id: string;
  // some fileUploads may not be associated with any resource
  associatedResource?: AssociatedResourceKind | undefined;
  // some fileUploads may not be associated with any document
  associatedDocumentId?: string | undefined;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

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
 * Default server response type for most (except GET many) REST API requests
 */
type ResourceRequestServerResponse<Doc> = {
  message: string;
  resourceData: QueryResponseData<Doc>[];
};

/**
 * Default server response type for GET(many) REST API requests with query parameters
 */
type GetQueriedResourceRequestServerResponse<Doc> = {
  message: string;
  pages: number;
  totalDocuments: number;
  resourceData: QueryResponseData<Doc>[];
};

type ResourceRoutePaths = {
  manager: string;
  admin: string;
  employee: string;
};

type TimeRailway = `${number}${number}:${number}${number}`;

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
  ResourceRoutePaths,
  StatesUS,
  StoreLocation,
  Urgency,
  User,
  UserDocument,
  UserRoles,
  UserSchema,
  USPostalCode,
};

export type {
  AssociatedResourceKind,
  BreakPoints,
  CheckBoxMultipleData,
  Currency,
  FileExtension,
  FileUploadDocument,
  FileUploadSchema,
  GetQueriedResourceRequestServerResponse,
  Note,
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
  ResourceRequestServerResponse,
  SelectInputData,
  SetStepsInErrorPayload,
  SliderInputData,
  TimeRailway,
};
