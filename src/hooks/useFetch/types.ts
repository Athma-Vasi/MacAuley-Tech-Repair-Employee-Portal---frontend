type FetchResponseGeneric = {
  message: string;
  pages?: number;
  totalDocuments?: number;
  resourceData: Record<string, any>[];
};

type UseFetchState = {
  data: FetchResponseGeneric | null;
  request: Request | null;
  triggerFetch: boolean;

  isLoading: boolean;
  loadingMessage: string;
  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type FetchDataInput = {
  request: Request;
  signal: AbortSignal;
  isMounted: boolean;
};

type UseFetchAction = {
  setData: 'setData';
  setRequest: 'setRequest';
  setTriggerFetch: 'setTriggerFetch';

  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type UseFetchDispatch =
  | {
      type: UseFetchAction['setData'];
      payload: FetchResponseGeneric;
    }
  | {
      type: UseFetchAction['setRequest'];
      payload: Request;
    }
  | {
      type:
        | UseFetchAction['setLoadingMessage']
        | UseFetchAction['setErrorMessage']
        | UseFetchAction['setSubmitMessage']
        | UseFetchAction['setSuccessMessage'];

      payload: string;
    }
  | {
      type:
        | UseFetchAction['setTriggerFetch']
        | UseFetchAction['setIsLoading']
        | UseFetchAction['setIsError']
        | UseFetchAction['setIsSubmitting']
        | UseFetchAction['setIsSuccessful'];

      payload: boolean;
    };

type UseFetchReducer = {
  state: UseFetchState;
  dispatch: React.Dispatch<UseFetchDispatch>;
};

export type {
  FetchDataInput,
  FetchResponseGeneric,
  UseFetchAction,
  UseFetchDispatch,
  UseFetchReducer,
  UseFetchState,
};
