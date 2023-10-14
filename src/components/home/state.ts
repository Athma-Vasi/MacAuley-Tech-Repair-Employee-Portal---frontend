import { HomeAction, HomeDispatch, HomeState } from './types';

const initialHomeState: HomeState = {
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  loadingMessage: '',
  submitMessage: '',
  successMessage: '',
  triggerFetchActionsDocuments: true,
};

const homeAction: HomeAction = {
  setIsLoading: 'setIsLoading',
  setIsSubmitting: 'setIsSubmitting',
  setIsSuccessful: 'setIsSuccessful',
  setLoadingMessage: 'setLoadingMessage',
  setSubmitMessage: 'setSubmitMessage',
  setSuccessMessage: 'setSuccessMessage',
  triggerFetchActionsDocuments: 'triggerFetchActionsDocuments',
};

function homeReducer(state: HomeState, action: HomeDispatch): HomeState {
  switch (action.type) {
    case homeAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case homeAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload };
    case homeAction.setIsSuccessful:
      return { ...state, isSuccessful: action.payload };
    case homeAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };
    case homeAction.setSubmitMessage:
      return { ...state, submitMessage: action.payload };
    case homeAction.setSuccessMessage:
      return { ...state, successMessage: action.payload };
    case homeAction.triggerFetchActionsDocuments:
      return { ...state, triggerFetchActionsDocuments: action.payload };
    default:
      return state;
  }
}

export { homeAction, homeReducer, initialHomeState };
