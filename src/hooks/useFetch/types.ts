type UseFetchProps = {
  request: Request;
  initialUrl: URL;
};

type UseFetchState = {
  data: Record<string, any>[];
  url: URL | string;
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
  url: URL;
};

type UseFetchAction = {
  setData: 'setData';
  setUrl: 'setUrl';
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
      payload: Record<string, any>[];
    }
  | {
      type: 'setUrl';
      payload: URL;
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
  UseFetchAction,
  UseFetchDispatch,
  UseFetchProps,
  UseFetchReducer,
  UseFetchState,
};
