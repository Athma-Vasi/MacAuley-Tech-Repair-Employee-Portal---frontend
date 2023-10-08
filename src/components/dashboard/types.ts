type DashboardState = {
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  loadingMessage: string;
  submitMessage: string;
  successMessage: string;
  triggerFetchActionsDocuments: boolean;
};

type DashboardAction = {
  setIsLoading: 'setIsLoading';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
  setLoadingMessage: 'setLoadingMessage';
  setSubmitMessage: 'setSubmitMessage';
  setSuccessMessage: 'setSuccessMessage';
  triggerFetchActionsDocuments: 'triggerFetchActionsDocuments';
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
        | DashboardAction['triggerFetchActionsDocuments'];

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
