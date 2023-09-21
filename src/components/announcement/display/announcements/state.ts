import {
  DisplayAnnouncementsAction,
  DisplayAnnouncementsDispatch,
  DisplayAnnouncementsState,
} from './types';

const initialDisplayAnnouncementsState: DisplayAnnouncementsState = {
  responseData: null,
  pages: 0,
  totalDocuments: 0,
  newQueryFlag: false,
  queryBuilderString: '?',
  pageQueryString: '',

  triggerFetchAnnouncements: true,

  isLoading: true,
  loadingMessage: 'Please wait. Fetching announcements...',
  isSuccessful: false,
  successMessage: '',
  isSubmitting: false,
  submitMessage: '',
};

const displayAnnouncementsAction: DisplayAnnouncementsAction = {
  setResponseData: 'setResponseData',
  setPages: 'setPages',
  setTotalDocuments: 'setTotalDocuments',
  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',

  setTriggerFetchAnnouncements: 'setTriggerFetchAnnouncements',

  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
};

function displayAnnouncementsReducer(
  state: DisplayAnnouncementsState,
  action: DisplayAnnouncementsDispatch
): DisplayAnnouncementsState {
  switch (action.type) {
    case displayAnnouncementsAction.setResponseData:
      return {
        ...state,
        responseData: action.payload,
      };
    case displayAnnouncementsAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case displayAnnouncementsAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };
    case displayAnnouncementsAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displayAnnouncementsAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displayAnnouncementsAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };

    case displayAnnouncementsAction.setTriggerFetchAnnouncements:
      return {
        ...state,
        triggerFetchAnnouncements: action.payload,
      };

    case displayAnnouncementsAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayAnnouncementsAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case displayAnnouncementsAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayAnnouncementsAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displayAnnouncementsAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayAnnouncementsAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayAnnouncementsAction,
  displayAnnouncementsReducer,
  initialDisplayAnnouncementsState,
};
