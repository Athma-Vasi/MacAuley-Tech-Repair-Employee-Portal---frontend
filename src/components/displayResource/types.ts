import { CSSProperties } from 'react';

import {
  FileUploadDocument,
  QueryResponseData,
  RequestStatus,
  ResourceRoutePaths,
} from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayResourceProps<Doc> = {
  style?: CSSProperties;
  componentQueryData: ComponentQueryData[];
  isDisplayFilesOnly?: boolean;
  isFileUploadsWithResource?: boolean;
  fileUploadFieldName?: string;
  fileUploadIdFieldName?: string;
  paths: {
    employee: string;
    manager: string;
    admin: string;
  };
  requestBodyHeading: string;
};

type DisplayResourceState<Doc> = {
  resourceData: QueryResponseData<Doc>[];
  pages: number;
  totalDocuments: number;

  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;
  limitPerPage: string;
  resetPage: boolean;

  fileUploads: Array<{ [key: string]: FileUploadDocument[] }>;

  requestStatus: {
    id: string;
    status: RequestStatus;
  };

  // updateResourceData: {
  //   id: string;
  //   kind: 'update' | 'delete';
  //   data: Partial<Doc>;
  // };

  deleteResource: {
    formId: string;
    fileUploadId?: string;
    kind: 'form' | 'fileUpload' | '';
    value: boolean;
  };

  triggerRefresh: boolean;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type UpdateRequestStatusInput = {
  accessToken: string;
  paths: ResourceRoutePaths;
  requestStatus: {
    id: string;
    status: RequestStatus;
  };
  requestBodyHeading: string;
  signal: AbortSignal;
};

type DisplayResourceAction = {
  setResourceData: 'setResourceData';
  updateResourceData: 'updateResourceData';
  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';

  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';
  setLimitPerPage: 'setLimitPerPage';
  setResetPage: 'setResetPage';

  setDeleteResource: 'setDeleteResource';
  setFileUploads: 'setFileUploads';
  setRequestStatus: 'setRequestStatus';
  setTriggerRefresh: 'setTriggerRefresh';

  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type DisplayResourceDispatch<Doc> =
  | {
      type: DisplayResourceAction['setResourceData'];
      payload: QueryResponseData<Doc>[];
    }
  | {
      type: DisplayResourceAction['updateResourceData'];
      payload: {
        id: string;
        kind: 'update' | 'delete';
        data: Partial<Doc>;
      };
    }
  | {
      type:
        | DisplayResourceAction['setPages']
        | DisplayResourceAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | DisplayResourceAction['setNewQueryFlag']
        | DisplayResourceAction['setResetPage']
        | DisplayResourceAction['setTriggerRefresh']
        | DisplayResourceAction['setIsSubmitting']
        | DisplayResourceAction['setIsSuccessful']
        | DisplayResourceAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | DisplayResourceAction['setQueryBuilderString']
        | DisplayResourceAction['setPageQueryString']
        | DisplayResourceAction['setLimitPerPage']
        | DisplayResourceAction['setSubmitMessage']
        | DisplayResourceAction['setSuccessMessage']
        | DisplayResourceAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type: DisplayResourceAction['setRequestStatus'];
      payload: {
        id: string;
        status: RequestStatus;
      };
    }
  | {
      type: DisplayResourceAction['setDeleteResource'];
      payload: {
        formId: string;
        fileUploadId?: string;
        kind: 'form' | 'fileUpload' | '';
        value: boolean;
      };
    }
  | {
      type: DisplayResourceAction['setFileUploads'];
      payload: Array<{ [key: string]: FileUploadDocument[] }>;
    };

type DisplayResourceReducer = <Doc>(
  state: DisplayResourceState<Doc>,
  action: DisplayResourceDispatch<Doc>
) => DisplayResourceState<Doc>;

export type {
  DisplayResourceAction,
  DisplayResourceDispatch,
  DisplayResourceProps,
  DisplayResourceReducer,
  DisplayResourceState,
  UpdateRequestStatusInput,
};
