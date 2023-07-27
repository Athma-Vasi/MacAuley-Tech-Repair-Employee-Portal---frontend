import {
  DisplayResourceAction,
  DisplayResourceDispatch,
  DisplayResourceState,
} from './types';

const displayResourceAction: DisplayResourceAction = {
  setResourceData: 'setResourceData',
  setPages: 'setPages',
  setTotalDocuments: 'setTotalDocuments',

  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',

  setRequestStatus: 'setRequestStatus',
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

function displayResourceReducer<Doc>(
  state: DisplayResourceState<Doc>,
  action: DisplayResourceDispatch<Doc>
): DisplayResourceState<Doc> {
  switch (action.type) {
    case displayResourceAction.setResourceData:
      return {
        ...state,
        resourceData: action.payload,
      };
    case displayResourceAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case displayResourceAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };

    case displayResourceAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displayResourceAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displayResourceAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };

    case displayResourceAction.setRequestStatus:
      return {
        ...state,
        requestStatus: action.payload,
      };
    case displayResourceAction.setTriggerRefresh:
      return {
        ...state,
        triggerRefresh: action.payload,
      };

    case displayResourceAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case displayResourceAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case displayResourceAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayResourceAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displayResourceAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayResourceAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displayResourceAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayResourceAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { displayResourceAction, displayResourceReducer };
