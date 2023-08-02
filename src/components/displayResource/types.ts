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

  fileUploads: Array<{ fileUploads: FileUploadDocument[] }>;

  requestStatus: {
    id: string;
    status: RequestStatus;
  };

  deleteResource: {
    formId: string;
    fileUploadId?: string;
    kind: 'form' | 'fileUpload' | '';
    value: boolean;
  };

  triggerRefresh: boolean;

  isError: boolean;
  errorMessage: string;
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
  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';

  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

  setDeleteResource: 'setDeleteResource';
  setFileUploads: 'setFileUploads';
  setRequestStatus: 'setRequestStatus';
  setTriggerRefresh: 'setTriggerRefresh';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
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
      type:
        | DisplayResourceAction['setPages']
        | DisplayResourceAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | DisplayResourceAction['setNewQueryFlag']
        | DisplayResourceAction['setTriggerRefresh']
        | DisplayResourceAction['setIsError']
        | DisplayResourceAction['setIsSubmitting']
        | DisplayResourceAction['setIsSuccessful']
        | DisplayResourceAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | DisplayResourceAction['setQueryBuilderString']
        | DisplayResourceAction['setPageQueryString']
        | DisplayResourceAction['setErrorMessage']
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
      payload: Array<{ fileUploads: FileUploadDocument[] }>;
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
