import {
  QueryResponseData,
  RequestStatus,
  ResourceRequestServerResponse,
} from '../../../types';
import type { LeaveRequestDocument } from '../types';

type DisplayLeaveRequestsState = {
  leaveRequests: QueryResponseData<LeaveRequestDocument>[];
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

type DisplayLeaveRequestsAction = {
  setLeaveRequests: 'setLeaveRequests';
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

type DisplayLeaveRequestsDispatch =
  | {
      type: DisplayLeaveRequestsAction['setLeaveRequests'];
      payload: QueryResponseData<LeaveRequestDocument>[];
    }
  | {
      type:
        | DisplayLeaveRequestsAction['setPages']
        | DisplayLeaveRequestsAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | DisplayLeaveRequestsAction['setNewQueryFlag']
        | DisplayLeaveRequestsAction['setTriggerRefresh']
        | DisplayLeaveRequestsAction['setIsError']
        | DisplayLeaveRequestsAction['setIsSubmitting']
        | DisplayLeaveRequestsAction['setIsSuccessful']
        | DisplayLeaveRequestsAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | DisplayLeaveRequestsAction['setQueryBuilderString']
        | DisplayLeaveRequestsAction['setPageQueryString']
        | DisplayLeaveRequestsAction['setErrorMessage']
        | DisplayLeaveRequestsAction['setSubmitMessage']
        | DisplayLeaveRequestsAction['setSuccessMessage']
        | DisplayLeaveRequestsAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type: DisplayLeaveRequestsAction['setRequestStatus'];
      payload: {
        id: string;
        status: RequestStatus;
      };
    };

type DisplayLeaveRequestsReducer = (
  state: DisplayLeaveRequestsState,
  action: DisplayLeaveRequestsDispatch
) => DisplayLeaveRequestsState;

export type {
  DisplayLeaveRequestsAction,
  DisplayLeaveRequestsDispatch,
  DisplayLeaveRequestsReducer,
  DisplayLeaveRequestsState,
};
