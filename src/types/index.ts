/**
 * This barrel index file is used to import/export types from backend and frontend
 */

/**
 * Imports
 */
import { MantineSize } from '@mantine/core';

import { AddressChangeDocument } from '../components/addressChange/create/types';
import { AnnouncementDocument } from '../components/announcement/create/types';
import { AnonymousRequestDocument } from '../components/anonymousRequest/create/types';
import { BenefitsDocument } from '../components/benefits/create/types';
import { EndorsementDocument } from '../components/endorsements/create/types';
import { EventCreatorDocument } from '../components/event/create/types';
import { ExpenseClaimDocument } from '../components/expenseClaim/create/types';
import { LeaveRequestDocument } from '../components/leaveRequest/types';
import { PrinterIssueDocument } from '../components/printerIssue/create/types';
import { RefermentDocument } from '../components/referment/create/types';
import { RepairNoteDocument } from '../components/repairNote/types';
import { RequestResourceDocument } from '../components/requestResource/create/types';
import { SurveyBuilderDocument } from '../components/survey/types';
import type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
} from './actions.types';
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

type BreakPoints = MantineSize;
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
  repairNoteData: RepairNoteDocument[];
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
    surveyData: SurveyBuilderDocument[];
    eventData: EventCreatorDocument[];
  };
  employeeData: UserDocument[];
};

type ResourceRoutePaths = {
  manager: string;
  admin: string;
  employee: string;
};

type TimeRailway = `${number}${number}:${number}${number}`;

type ScreenshotImageType = 'image/png' | 'image/jpeg' | 'image/webp';

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
  ScreenshotImageType,
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
  ActionsResourceRequestServerResponse,
  AssociatedResourceKind,
  BreakPoints,
  CheckBoxMultipleData,
  Currency,
  FileExtension,
  FileUploadDocument,
  FileUploadSchema,
  GetQueriedResourceRequestServerResponse,
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
  ResourceRequestServerResponse,
  SelectInputData,
  SetStepsInErrorPayload,
  SliderInputData,
  TimeRailway,
};
