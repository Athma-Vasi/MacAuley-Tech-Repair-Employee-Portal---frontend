import {
  DisplayLeaveRequestsAction,
  DisplayLeaveRequestsDispatch,
  DisplayLeaveRequestsState,
} from './types';

const initialDisplayLeaveRequestsState: DisplayLeaveRequestsState = {
  leaveRequests: [],
  pages: 0,
  totalDocuments: 0,

  newQueryFlag: true,
  queryBuilderString: '?',
  pageQueryString: '',

  requestStatus: {
    id: '',
    status: 'pending',
  },

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const displayLeaveRequestsAction: DisplayLeaveRequestsAction = {
  setLeaveRequests: 'setLeaveRequests',
  setPages: 'setPages',
  setTotalDocuments: 'setTotalDocuments',

  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',

  setRequestStatus: 'setRequestStatus',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function displayLeaveRequestsReducer(
  state: DisplayLeaveRequestsState,
  action: DisplayLeaveRequestsDispatch
): DisplayLeaveRequestsState {
  switch (action.type) {
    case displayLeaveRequestsAction.setLeaveRequests:
      return {
        ...state,
        leaveRequests: action.payload,
      };
    case displayLeaveRequestsAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case displayLeaveRequestsAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };

    case displayLeaveRequestsAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displayLeaveRequestsAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displayLeaveRequestsAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };

    case displayLeaveRequestsAction.setRequestStatus:
      return {
        ...state,
        requestStatus: action.payload,
      };

    case displayLeaveRequestsAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case displayLeaveRequestsAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case displayLeaveRequestsAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayLeaveRequestsAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displayLeaveRequestsAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayLeaveRequestsAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displayLeaveRequestsAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayLeaveRequestsAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayLeaveRequestsAction,
  displayLeaveRequestsReducer,
  initialDisplayLeaveRequestsState,
};
