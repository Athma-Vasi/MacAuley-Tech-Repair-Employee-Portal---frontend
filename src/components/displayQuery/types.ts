import { CSSProperties } from 'react';

import {
  FileUploadDocument,
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
} from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayQueryProps<Doc> = {
  componentQueryData: ComponentQueryData[];
  createResourcePath: string;
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  parentComponentName: string;
  parentRequestStatusDispatch: React.Dispatch<{
    type: 'setRequestStatus';
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
  parentDeleteResourceDispatch: React.Dispatch<{
    type: 'setDeleteResource';
    payload: {
      formId: string;
      fileUploadId?: string;
      kind: 'form' | 'fileUpload' | '';
      value: boolean;
    };
  }>;

  queryResponseData: QueryResponseData<Doc>[];
  style?: CSSProperties;
  totalDocuments: number;
};

type DisplayQueryState = {
  groupByRadioData: RadioGroupInputData;
  groupBySelection: string;
  currentSelectionData: string[];
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  restOfGroupedQueryResponseData: Record<string, any>[];

  fileUploadsForAForm: FileUploadDocument[];

  currentSegmentedSelection: 'expanded' | 'condensed';

  acknowledgementText: string;
  isValidAcknowledgementText: boolean;
  isAcknowledgementTextFocused: boolean;

  deleteFormId: string;
  deleteFileUploadId: string;
  deleteResourceKind: 'form' | 'fileUpload' | '';
};

type DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData';
  setGroupBySelection: 'setGroupBySelection';
  setCurrentSelectionData: 'setCurrentSelectionData';

  setGroupedByQueryResponseData: 'setGroupedByQueryResponseData';
  setRestOfGroupedQueryResponseData: 'setRestOfGroupedQueryResponseData';

  setFileUploadsForAForm: 'setFileUploadsForAForm';

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection';

  setAcknowledgementText: 'setAcknowledgementText';
  setIsValidAcknowledgementText: 'setIsValidAcknowledgementText';
  setIsAcknowledgementTextFocused: 'setIsAcknowledgementTextFocused';

  setDeleteFormId: 'setDeleteFormId';
  setDeleteFileUploadId: 'setDeleteFileUploadId';
  setDeleteResourceKind: 'setDeleteResourceKind';
};

type DisplayQueryDispatch =
  | {
      type: DisplayQueryAction['setGroupByRadioData'];
      payload: RadioGroupInputData;
    }
  | {
      type:
        | DisplayQueryAction['setGroupBySelection']
        | DisplayQueryAction['setAcknowledgementText']
        | DisplayQueryAction['setDeleteFormId']
        | DisplayQueryAction['setDeleteFileUploadId'];
      payload: string;
    }
  | {
      type:
        | DisplayQueryAction['setIsValidAcknowledgementText']
        | DisplayQueryAction['setIsAcknowledgementTextFocused'];
      payload: boolean;
    }
  | {
      type: DisplayQueryAction['setCurrentSegmentedSelection'];
      payload: 'expanded' | 'condensed';
    }
  | {
      type: DisplayQueryAction['setCurrentSelectionData'];
      payload: string[];
    }
  | {
      type: DisplayQueryAction['setGroupedByQueryResponseData'];
      payload: Map<string | number, Record<string, any>[]>;
    }
  | {
      type: DisplayQueryAction['setRestOfGroupedQueryResponseData'];
      payload: Record<string, any>[];
    }
  | {
      type: DisplayQueryAction['setFileUploadsForAForm'];
      payload: FileUploadDocument[];
    }
  | {
      type: DisplayQueryAction['setDeleteResourceKind'];
      payload: 'form' | 'fileUpload' | '';
    };

export type {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryProps,
  DisplayQueryState,
};
