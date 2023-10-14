type HomeState = {
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  loadingMessage: string;
  submitMessage: string;
  successMessage: string;
  triggerFetchActionsDocuments: boolean;
};

type HomeAction = {
  setIsLoading: 'setIsLoading';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
  setLoadingMessage: 'setLoadingMessage';
  setSubmitMessage: 'setSubmitMessage';
  setSuccessMessage: 'setSuccessMessage';
  triggerFetchActionsDocuments: 'triggerFetchActionsDocuments';
};

type HomeDispatch =
  | {
      type:
        | HomeAction['setLoadingMessage']
        | HomeAction['setSubmitMessage']
        | HomeAction['setSuccessMessage'];

      payload: string;
    }
  | {
      type:
        | HomeAction['setIsLoading']
        | HomeAction['setIsSubmitting']
        | HomeAction['setIsSuccessful']
        | HomeAction['triggerFetchActionsDocuments'];

      payload: boolean;
    };

type HomeReducer = (state: HomeState, action: HomeDispatch) => HomeState;

export type { HomeAction, HomeDispatch, HomeReducer, HomeState };
