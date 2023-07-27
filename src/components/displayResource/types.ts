import { CSSProperties } from 'react';

import { QueryResponseData, RequestStatus } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayResourceProps<Doc> = {
  style?: CSSProperties;
  componentQueryData: ComponentQueryData[];
  paths: {
    employee: string;
    manager: string;
    admin: string;
  };
};

type DisplayResourceState<Doc> = {
  resourceData: QueryResponseData<Doc>[];
  pages: number;
  totalDocuments: number;

  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;

  requestStatus: {
    id: string;
    status: RequestStatus;
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

type DisplayResourceAction = {
  setResourceData: 'setResourceData';
  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';

  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

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
};
