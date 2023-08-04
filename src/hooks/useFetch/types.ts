import { QueryResponseData, ResourceRoutePaths, UserRoles } from '../../types';

type UseFetchMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type UseFetchRoleFlags = 'Employee' | 'Manager' | 'Admin';

type UseFetchProps = {
  body?: string;
  method: UseFetchMethods;
  initialUrl: URL;
  //   fileUploadFieldName: string;
  //   fileUploadIdFieldName: string;
  //   isFileUploadsWithResource: boolean;
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
  body?: string | null;
  signal: AbortSignal;
  isMounted: boolean;
  url: URL;
  method: UseFetchMethods;
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
  UseFetchMethods,
  UseFetchProps,
  UseFetchReducer,
  UseFetchRoleFlags,
  UseFetchState,
};
