type DashboardState = {
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  loadingMessage: string;
  submitMessage: string;
  successMessage: string;
  triggerFetchUserData: boolean;
};

type DashboardAction = {
  setIsLoading: 'setIsLoading';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
  setLoadingMessage: 'setLoadingMessage';
  setSubmitMessage: 'setSubmitMessage';
  setSuccessMessage: 'setSuccessMessage';
  setTriggerFetchUserData: 'setTriggerFetchUserData';
};

type DashboardDispatch =
  | {
      type:
        | DashboardAction['setLoadingMessage']
        | DashboardAction['setSubmitMessage']
        | DashboardAction['setSuccessMessage'];

      payload: string;
    }
  | {
      type:
        | DashboardAction['setIsLoading']
        | DashboardAction['setIsSubmitting']
        | DashboardAction['setIsSuccessful']
        | DashboardAction['setTriggerFetchUserData'];

      payload: boolean;
    };

type DashboardReducer = (
  state: DashboardState,
  action: DashboardDispatch
) => DashboardState;

export type {
  DashboardAction,
  DashboardDispatch,
  DashboardReducer,
  DashboardState,
};
