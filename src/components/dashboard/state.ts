import { DashboardAction, DashboardDispatch, DashboardState } from './types';

const initialDashboardState: DashboardState = {
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  loadingMessage: '',
  submitMessage: '',
  successMessage: '',
  triggerFetchUserData: true,
};

const dashboardAction: DashboardAction = {
  setIsLoading: 'setIsLoading',
  setIsSubmitting: 'setIsSubmitting',
  setIsSuccessful: 'setIsSuccessful',
  setLoadingMessage: 'setLoadingMessage',
  setSubmitMessage: 'setSubmitMessage',
  setSuccessMessage: 'setSuccessMessage',
  setTriggerFetchUserData: 'setTriggerFetchUserData',
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardDispatch
): DashboardState {
  switch (action.type) {
    case dashboardAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case dashboardAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload };
    case dashboardAction.setIsSuccessful:
      return { ...state, isSuccessful: action.payload };
    case dashboardAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };
    case dashboardAction.setSubmitMessage:
      return { ...state, submitMessage: action.payload };
    case dashboardAction.setSuccessMessage:
      return { ...state, successMessage: action.payload };
    case dashboardAction.setTriggerFetchUserData:
      return { ...state, triggerFetchUserData: action.payload };
    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
