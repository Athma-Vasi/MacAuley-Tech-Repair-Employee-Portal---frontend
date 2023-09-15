import { CSSProperties } from 'react';

import type {
  Currency,
  FileUploadDocument,
  RequestStatus,
} from '../../../types';
import type { ComponentQueryData } from '../../queryBuilder';
import { RepairStatus } from '../../repairNote/types';

type DisplayQueryDesktopProps<Doc> = {
  componentQueryData: ComponentQueryData[];
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  groupByRadioData: Array<{ label: string; value: string }>;
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  groupBySelection: string;

  openDeleteAcknowledge: () => void;
  deleteFormIdDispatch: React.Dispatch<{
    type: 'setDeleteFormId';
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

type EditRepairNoteInput = {
  repairNoteFormId: string;
  repairNotes: string;
  testingResults: string;
  finalRepairCost: string;
  finalRepairCostCurrency: Currency;
  repairStatus: RepairStatus;
};

type DisplayQueryDesktopState = {
  fieldToSortBy: string;
  sortDirection: 'asc' | 'desc';

  currentDocumentId: string;
  currentRequestStatus: RequestStatus;

  // for repair notes docs only
  editRepairNoteInput: EditRepairNoteInput;
};

type DisplayQueryDesktopAction = {
  setFieldToSortBy: 'setFieldToSortBy';
  setSortDirection: 'setSortDirection';

  setCurrentDocumentId: 'setCurrentDocumentId';
  setCurrentRequestStatus: 'setCurrentRequestStatus';

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput';
};

type DisplayQueryDesktopReducer = (
  state: DisplayQueryDesktopState,
  action: DisplayQueryDesktopAction
) => DisplayQueryDesktopState;

type DisplayQueryDesktopDispatch =
  | {
      type:
        | DisplayQueryDesktopAction['setFieldToSortBy']
        | DisplayQueryDesktopAction['setCurrentDocumentId'];
      payload: string;
    }
  | {
      type: DisplayQueryDesktopAction['setSortDirection'];
      payload: 'asc' | 'desc';
    }
  | {
      type: DisplayQueryDesktopAction['setCurrentRequestStatus'];
      payload: RequestStatus;
    }
  | {
      type: DisplayQueryDesktopAction['setEditRepairNoteInput'];
      payload: EditRepairNoteInput;
    };

export type {
  DisplayQueryDesktopAction,
  DisplayQueryDesktopDispatch,
  DisplayQueryDesktopProps,
  DisplayQueryDesktopReducer,
  DisplayQueryDesktopState,
  EditRepairNoteInput,
};
