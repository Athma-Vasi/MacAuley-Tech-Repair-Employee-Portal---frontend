type DashboardState = {
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type DashboardAction = {
  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type DashboardDispatch =
  | {
      type:
        | DashboardAction['setErrorMessage']
        | DashboardAction['setLoadingMessage']
        | DashboardAction['setSubmitMessage']
        | DashboardAction['setSuccessMessage'];

      payload: string;
    }
  | {
      type:
        | DashboardAction['setIsError']
        | DashboardAction['setIsLoading']
        | DashboardAction['setIsSubmitting']
        | DashboardAction['setIsSuccessful'];

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
