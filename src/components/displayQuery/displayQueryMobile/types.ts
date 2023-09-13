import { type } from 'os';
import { CSSProperties } from 'react';

import { FileUploadDocument, RequestStatus } from '../../../types';
import { ComponentQueryData } from '../../queryBuilder';
import { EditRepairNoteInput } from '../displayQueryDesktop/types';

type DisplayQueryMobileProps = {
  componentQueryData: ComponentQueryData[];
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  groupBySelection: string;

  openDeleteAcknowledge: () => void;
  deleteFormIdDispatch: React.Dispatch<{
    type: 'setDeleteFormId';
    payload: string;
  }>;
  deleteFileUploadIdDispatch: React.Dispatch<{
    type: 'setDeleteFileUploadId';
    payload: string;
  }>;
  deleteResourceKindDispatch: React.Dispatch<{
    type: 'setDeleteResourceKind';
    payload: 'form' | 'fileUpload' | '';
  }>;

  openFileUploads: () => void;
  setFileUploadsForAFormDispatch: React.Dispatch<{
    type: 'setFileUploadsForAForm';
    payload: FileUploadDocument[];
  }>;

  popoversOpenCloseState: Map<string, boolean[]>;
  popoversStateDispatch: React.Dispatch<{
    type: 'setPopoversOpenCloseState';
    payload: {
      key: string;
      popoverState: {
        index: number;
        value: boolean;
      };
    };
  }>;

  requestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
  restOfGroupedQueryResponseData: Record<string, any>[];
  style?: CSSProperties;
  tableViewSelection: 'expanded' | 'condensed';
};

type DisplayQueryMobileState = {
  // for repair notes docs only
  editRepairNoteInput: EditRepairNoteInput;
};

type DisplayQueryMobileAction = {
  setEditRepairNoteInput: 'setEditRepairNoteInput';
};

type DisplayQueryMobileDispatch = {
  type: DisplayQueryMobileAction['setEditRepairNoteInput'];
  payload: EditRepairNoteInput;
};

export type {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileProps,
  DisplayQueryMobileState,
};
