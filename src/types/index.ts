/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import type { MantineSize } from "@mantine/core";

import type { ValidationKey } from "../constants/validations";

import type { Result } from "ts-results";
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
} from "./user.types";

type BreakPoints = MantineSize;
type Urgency = "low" | "medium" | "high";
type SetStepsInErrorPayload = {
  kind: "add" | "delete";
  step: number;
};

type Currency = "USD" | "CAD";

type CheckboxRadioSelectData<Payload extends string = string> = Array<{
  label: string;
  value: Payload;
}>;

type RadioGroupInputData<Value extends string = string> = Array<{
  label: Capitalize<Value> | string;
  value: Value;
}>;

type CheckboxInputData<Value extends string = string> = Array<{
  label: Capitalize<Value> | string;
  value: Value;
}>;

type SliderMarksData = Array<{
  label: string;
  value: number;
}>;

type FileUploadSchema = {
  userId: string;
  uploadedFile: Buffer;
  username: string;
  fileExtension: AllowedFileExtensions;
  fileName: string;
  fileSize: number;
  fileMimeType: AllowedFileMimeTypes;
  fileEncoding: AllowedFileEncodings;
};

type FileUploadDocument = FileUploadSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RequestStatus = "pending" | "approved" | "rejected";

/**
 * - Represents the structure of data returned from a query, or the initial display state.
 * - The type includes mandatory fields that are always returned in resource documents.
 * - The 'Partial' type with the generic 'Doc' indicates that the returned fields may vary depending on the query.
 */
type QueryResponseData<
  Doc extends Record<string, unknown> = Record<string, unknown>,
> = {
  _id: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
} & Partial<Doc>;

/**
 * Default server response type for most (except GET multiple docs) REST API requests
 */
type ResourceRequestServerResponse<
  Doc extends Record<string, unknown> = Record<string, unknown>,
> = {
  message: string;
  resourceData: [QueryResponseData<Doc>];
};

/**
 * Default server response type for GET(multiple docs) REST API requests with query parameters
 */
type GetQueriedResourceRequestServerResponse<
  Doc extends Record<string, unknown> = Record<string, unknown>,
> = {
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

type ScreenshotImageType = "image/png" | "image/jpeg" | "image/webp";

/**
 * Used in the update${resource}ByIdService default PATCH request service functions for all resources.
 */
type DocumentUpdateOperation<
  Document extends Record<Key, Value>,
  Key extends keyof Document = keyof Document,
  Value extends Document[Key] = Document[Key],
> =
  | DocumentFieldUpdateOperation<Document, Key, Value>
  | DocumentArrayUpdateOperation<Document, Key, Value>;

type FieldOperators =
  | "$currentDate"
  | "$inc"
  | "$min"
  | "$max"
  | "$mul"
  | "$rename"
  | "$set"
  | "$setOnInsert"
  | "$unset";

type DocumentFieldUpdateOperation<
  Document extends Record<Key, Value>,
  Key extends keyof Document = keyof Document,
  Value extends Document[Key] = Document[Key],
> = {
  updateKind: "field";
  updateOperator: FieldOperators;
  fields: Record<Key, Value>;
};

type ArrayOperators = "$addToSet" | "$pop" | "$pull" | "$push" | "$pullAll";

type DocumentArrayUpdateOperation<
  Document extends Record<Key, Value>,
  Key extends keyof Document = keyof Document,
  Value extends Document[Key] = Document[Key],
> = {
  updateKind: "array";
  updateOperator: ArrayOperators;
  fields: Record<Key, Value>;
};

type AllowedFileExtensions = ".jpg" | ".jpeg" | ".png" | ".webp";

type AllowedFileMimeTypes =
  | "image/jpg"
  | "image/jpeg"
  | "image/png"
  | "image/webp";

type AllowedFileEncodings =
  | "7bit"
  | "8bit"
  | "binary"
  | "base64"
  | "quoted-printable";

type ErrorLogSchema = {
  expireAt?: Date;
  userId: string;
  username: string;
  sessionId: string;
  message: string;
  stack: string;
  requestBody: string;
  status: number;
  timestamp: string;
};

type InputType =
  | "boolean"
  | "checkbox"
  | "date"
  | "file"
  | "number"
  | "select"
  | "slider"
  | "switch"
  | "text"
  | "time";

type SliderInputData = {
  marks?: SliderMarksData;
  max: number;
  min: number;
};

type StepperChild = {
  inputType: InputType;
  isRequired?: boolean;
  name: string;
  validationKey?: ValidationKey;
  selectInputData?: CheckboxRadioSelectData;
  checkboxInputData?: CheckboxRadioSelectData;
  sliderInputData?: SliderInputData;
};

type ValidationFunctionsTable = Record<ValidationKey, Validation>;

/** input popover error messages are determined by partials tests */
type Validation = [RegExp | ((value: string) => boolean), string][];

type StepperPage = {
  kind?: "form" | "review";
  preventErrorStateDisplay?: boolean;
  description: string;
  children: Array<StepperChild>;
};

type SetPageInErrorPayload = {
  kind: "add" | "delete";
  page: number;
};

type UserRole = "admin" | "manager" | "employee";

type RoleResourceRoutePaths = Record<UserRole, string>;

type DecodedToken = {
  userInfo: {
    userId: string;
    username: string;
    roles: ("Admin" | "Employee" | "Manager")[];
  };
  sessionId: string;
  iat: number;
  exp: number;
  jti: string;
};

type HttpServerResponse<Data = unknown> = {
  accessToken: string;
  data: Array<Data>;
  kind: "error" | "success";
  message: string;
  pages: number;
  status: number;
  totalDocuments: number;
  triggerLogout: boolean;
};

type SafeBox<Data = unknown> = {
  data?: Data;
  kind: "error" | "notFound" | "success";
  message?: string;
};

type SafeBoxResult<Data = unknown> = Result<SafeBox<Data>, SafeBox>;

export type {
  AllowedFileEncodings,
  AllowedFileExtensions,
  AllowedFileMimeTypes,
  ArrayOperators,
  BreakPoints,
  CanadianPostalCode,
  CheckboxInputData,
  CheckboxRadioSelectData,
  Country,
  Currency,
  DecodedToken,
  Department,
  DocumentUpdateOperation,
  ErrorLogSchema,
  FieldOperators,
  FileUploadDocument,
  FileUploadSchema,
  GetQueriedResourceRequestServerResponse,
  HttpServerResponse,
  InputType,
  JobPosition,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
  ResourceRequestServerResponse,
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  SafeBox,
  SafeBoxResult,
  ScreenshotImageType,
  SetPageInErrorPayload,
  SetStepsInErrorPayload,
  SliderInputData,
  SliderMarksData,
  StatesUS,
  StepperChild,
  StepperPage,
  StoreLocation,
  TimeRailway,
  Urgency,
  User,
  UserDocument,
  UserRole,
  UserRoles,
  UserSchema,
  USPostalCode,
  Validation,
  ValidationFunctionsTable,
};
