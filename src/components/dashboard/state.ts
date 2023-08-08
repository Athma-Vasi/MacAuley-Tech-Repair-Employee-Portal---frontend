import { DashboardAction, DashboardDispatch, DashboardState } from './types';

const initialDashboardState: DashboardState = {
  isError: false,
  errorMessage: '',
  isLoading: true,
  loadingMessage: 'Fetching user data...',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const dashboardAction: DashboardAction = {
  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardDispatch
): DashboardState {
  switch (action.type) {
    case dashboardAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case dashboardAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case dashboardAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case dashboardAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case dashboardAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case dashboardAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case dashboardAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case dashboardAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
