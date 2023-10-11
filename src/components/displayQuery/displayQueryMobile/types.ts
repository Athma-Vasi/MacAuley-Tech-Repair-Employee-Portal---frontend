import { type } from 'os';
import { CSSProperties } from 'react';

import {
  FileUploadDocument,
  RequestStatus,
  UserDocument,
} from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';
import { EditRepairNoteInput } from '../displayQueryDesktop/types';
import { GroupedByQueryResponseData } from '../types';

type DisplayQueryMobileProps = {
  componentQueryData: ComponentQueryData[];
  deleteFormIdDispatch: React.Dispatch<{
    type: 'setDeleteFormId';
    payload: string;
  }>;
  deleteResourceKindDispatch: React.Dispatch<{
    type: 'setDeleteResourceKind';
    payload: 'form' | 'fileUpload' | '';
  }>;
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  groupedByQueryResponseData: GroupedByQueryResponseData;
  groupBySelection: string;
  isLoading: boolean;
  loadingMessage?: string;
  openDeleteAcknowledge: () => void;
  openFileUploads: () => void;
  queryValuesArray: string[];
  requestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
  setFileUploadsForAFormDispatch: React.Dispatch<{
    type: 'setFileUploadsForAForm';
    payload: FileUploadDocument[];
  }>;
  style?: CSSProperties;
};

type DisplayQueryMobileState = {
  currentDocumentId: string;
  currentRequestStatus: RequestStatus;

  // for repair notes docs only
  editRepairNoteInput: EditRepairNoteInput;

  employeeDocument: UserDocument | null;
};

type DisplayQueryMobileAction = {
  setCurrentDocumentId: 'setCurrentDocumentId';
  setCurrentRequestStatus: 'setCurrentRequestStatus';

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput';

  setEmployeeDocument: 'setEmployeeDocument';
};

type DisplayQueryMobileDispatch =
  | {
      type: DisplayQueryMobileAction['setCurrentDocumentId'];
      payload: string;
    }
  | {
      type: DisplayQueryMobileAction['setCurrentRequestStatus'];
      payload: RequestStatus;
    }
  | {
      type: DisplayQueryMobileAction['setEditRepairNoteInput'];
      payload: EditRepairNoteInput;
    }
  | {
      type: DisplayQueryMobileAction['setEmployeeDocument'];
      payload: UserDocument | null;
    };

export type {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileProps,
  DisplayQueryMobileState,
};
