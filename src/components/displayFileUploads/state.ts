import {
  DisplayFileUploadsAction,
  DisplayFileUploadsDispatch,
  DisplayFileUploadsState,
} from './types';

const initialDisplayFileUploadsState: DisplayFileUploadsState = {
  fileUploadsData: [],
  pages: 0,
  totalDocuments: 0,

  newQueryFlag: false,
  queryBuilderString: '',
  pageQueryString: '',

  deleteFile: {
    id: '',
    value: false,
  },
  triggerRefresh: false,

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const displayFileUploadsAction: DisplayFileUploadsAction = {
  setFileUploadsData: 'setFileUploadsData',
  setPages: 'setPages',
  setTotalDocuments: 'setTotalDocuments',

  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',

  setDeleteFile: 'setDeleteFile',
  setTriggerRefresh: 'setTriggerRefresh',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function displayFileUploadsReducer(
  state: DisplayFileUploadsState,
  action: DisplayFileUploadsDispatch
): DisplayFileUploadsState {
  switch (action.type) {
    case displayFileUploadsAction.setFileUploadsData:
      return {
        ...state,
        fileUploadsData: action.payload,
      };
    case displayFileUploadsAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case displayFileUploadsAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };
    case displayFileUploadsAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displayFileUploadsAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displayFileUploadsAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };
    case displayFileUploadsAction.setDeleteFile:
      return {
        ...state,
        deleteFile: action.payload,
      };
    case displayFileUploadsAction.setTriggerRefresh:
      return {
        ...state,
        triggerRefresh: action.payload,
      };
    case displayFileUploadsAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case displayFileUploadsAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case displayFileUploadsAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayFileUploadsAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displayFileUploadsAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayFileUploadsAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displayFileUploadsAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayFileUploadsAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayFileUploadsAction,
  displayFileUploadsReducer,
  initialDisplayFileUploadsState,
};
