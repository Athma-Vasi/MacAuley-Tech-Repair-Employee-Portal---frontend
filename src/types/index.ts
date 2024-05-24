/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import { MantineSize } from "@mantine/core";

import { AddressChangeDocument } from "../components/addressChange/create/types";
import { AnnouncementDocument } from "../components/announcement/create/types";
import { AnonymousRequestDocument } from "../components/anonymousRequest/create/types";
import { BenefitsDocument } from "../components/benefit/create/types";
import { CustomerDocument } from "../components/customer/types";
import { EndorsementDocument } from "../components/endorsement/create/types";
import { EventDocument } from "../components/event/create/types";
import { ExpenseClaimDocument } from "../components/expenseClaim/create/types";
import { LeaveRequestDocument } from "../components/leaveRequest/types";
import { PrinterIssueDocument } from "../components/printerIssue/create/types";
import { RefermentDocument } from "../components/referment/create/types";
import { RepairTicketDocument } from "../components/repairTicket/types";
import { RequestResourceDocument } from "../components/requestResource/create/types";
import { SurveyDocument } from "../components/survey/types";
import type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
} from "./actions.types";
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
type CheckBoxMultipleData = {
  label: string;
  value: string;
}[];

type Currency = "USD" | "CAD";

type SelectInputData = Array<{
  label: string;
  value: string;
}>;

type RadioGroupInputData<Value extends string = string> = Array<{
  label: Capitalize<Value> | string;
  value: Value;
}>;

type CheckboxInputData<Value extends string = string> = Array<{
  label: Capitalize<Value> | string;
  value: Value;
}>;

type SliderInputData = Array<{
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
type QueryResponseData<Doc> = {
  _id: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
} & Partial<Doc>;

/**
 * Default server response type for most (except GET multiple docs) REST API requests
 */
type ResourceRequestServerResponse<Doc> = {
  message: string;
  resourceData: [QueryResponseData<Doc>];
};

/**
 * Default server response type for GET(multiple docs) REST API requests with query parameters
 */
type GetQueriedResourceRequestServerResponse<Doc> = {
  message: string;
  pages: number;
  totalDocuments: number;
  resourceData: QueryResponseData<Doc>[];
};

/**
 * Default server response type for GET(multiple docs) REST API requests without query parameters (actions/dashboard route)
 */
type ActionsResourceRequestServerResponse = {
  message: string;
  repairTicketData: RepairTicketDocument[];
  companyData: {
    addressChangeData: AddressChangeDocument[];
    expenseClaimData: ExpenseClaimDocument[];
    requestResourceData: RequestResourceDocument[];
    leaveRequestData: LeaveRequestDocument[];
    benefitData: BenefitsDocument[];
  };
  generalData: {
    endorsementData: EndorsementDocument[];
    printerIssueData: PrinterIssueDocument[];
    anonymousRequestData?: AnonymousRequestDocument[];
    refermentData: RefermentDocument[];
  };
  outreachData: {
    announcementData: AnnouncementDocument[];
    surveyData: SurveyDocument[];
    eventData: EventDocument[];
  };
  employeeData: UserDocument[];
  customerData: Omit<CustomerDocument, "password" | "paymentInformation">[];
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
  Value extends Document[Key] = Document[Key]
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
  Value extends Document[Key] = Document[Key]
> = {
  updateKind: "field";
  updateOperator: FieldOperators;
  fields: Record<Key, Value>;
};

type ArrayOperators = "$addToSet" | "$pop" | "$pull" | "$push" | "$pullAll";

type DocumentArrayUpdateOperation<
  Document extends Record<Key, Value>,
  Key extends keyof Document = keyof Document,
  Value extends Document[Key] = Document[Key]
> = {
  updateKind: "array";
  updateOperator: ArrayOperators;
  fields: Record<Key, Value>;
};

type AllowedFileExtensions = ".jpg" | ".jpeg" | ".png" | ".webp";

type AllowedFileMimeTypes = "image/jpg" | "image/jpeg" | "image/png" | "image/webp";

type AllowedFileEncodings = "7bit" | "8bit" | "binary" | "base64" | "quoted-printable";

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
  | "switch"
  | "text"
  | "time";

type StepperChild = {
  inputType: InputType;
  name: string;
  validations?: Validations;
  selectInputData?: string[];
  checkboxInputData?: CheckBoxMultipleData;
};

type Validations = {
  /** must be a superset of partials. input error state is determined by full test */
  full: RegExp | ((value: string) => boolean);
  /** must be subset(s) of full. input popover error messages are determined by partials tests */
  partials: [RegExp | ((value: string) => boolean), string][];
};

type StepperPage = {
  kind?: "form" | "review";
  description: string;
  children: Array<StepperChild>;
};

type SetPageInErrorPayload = {
  kind: "add" | "delete";
  page: number;
};

type UserRole = "admin" | "manager" | "employee";

type RoleResourceRoutePaths = Record<UserRole, string>;

export type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
  ActionsResourceRequestServerResponse,
  AllowedFileEncodings,
  AllowedFileExtensions,
  AllowedFileMimeTypes,
  ArrayOperators,
  BreakPoints,
  CanadianPostalCode,
  CheckboxInputData,
  CheckBoxMultipleData,
  Country,
  Currency,
  Department,
  DocumentUpdateOperation,
  ErrorLogSchema,
  FieldOperators,
  FileUploadDocument,
  FileUploadSchema,
  GetQueriedResourceRequestServerResponse,
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
  ScreenshotImageType,
  SelectInputData,
  SetPageInErrorPayload,
  SetStepsInErrorPayload,
  SliderInputData,
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
  Validations,
};
