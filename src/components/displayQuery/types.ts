import { CSSProperties } from 'react';

import {
  FileUploadDocument,
  QueryResponseData,
  RadioGroupInputData,
  RequestStatus,
} from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type GroupedByQueryResponseData = Map<
  string | number | boolean | symbol,
  Record<string, any>[]
>;

type DisplayQueryProps<Doc> = {
  componentQueryData: ComponentQueryData[];
  createResourcePath: string;
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  isLoading: boolean;
  loadingMessage?: string;
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
  queryValuesArray: string[]; // simply passed down from DisplayResource to DisplayQueryDesktop and DisplayQueryMobile to highlight the query values in the table
  style?: CSSProperties;
  totalDocuments: number;
};

type DisplayQueryState = {
  groupByRadioData: RadioGroupInputData;
  groupBySelection: string;
  currentSelectionData: string[];
  groupedByQueryResponseData: GroupedByQueryResponseData;

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

  setFileUploadsForAForm: 'setFileUploadsForAForm';

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection';

  setAcknowledgementText: 'setAcknowledgementText';
  setIsValidAcknowledgementText: 'setIsValidAcknowledgementText';
  setIsAcknowledgementTextFocused: 'setIsAcknowledgementTextFocused';

  setDeleteFormId: 'setDeleteFormId';
  setDeleteFileUploadId: 'setDeleteFileUploadId';
  setDeleteResourceKind: 'setDeleteResourceKind';
};

type DisplayQueryDispatch<
  Doc extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >
> =
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
      payload: Map<keyof Doc, Record<keyof Doc, Doc[keyof Doc]>[]>;
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
  GroupedByQueryResponseData,
};
