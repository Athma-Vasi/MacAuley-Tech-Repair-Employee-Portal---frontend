type LoginState = {
  username: string;
  password: string;
  triggerLoginSubmit: boolean;

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
};

type LoginAction = {
  setUsername: 'setUsername';
  setPassword: 'setPassword';
  setTriggerLoginSubmit: 'setTriggerLoginSubmit';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
};

type LoginDispatch =
  | {
      type:
        | LoginAction['setUsername']
        | LoginAction['setPassword']
        | LoginAction['setErrorMessage']
        | LoginAction['setLoadingMessage']
        | LoginAction['setSubmitMessage'];

      payload: string;
    }
  | {
      type:
        | LoginAction['setTriggerLoginSubmit']
        | LoginAction['setIsError']
        | LoginAction['setIsLoading']
        | LoginAction['setIsSubmitting'];

      payload: boolean;
    };

type LoginReducer = (state: LoginState, action: LoginDispatch) => LoginState;

type LoginResponse = {
  message: string;
  accessToken?: string | undefined;
};

type DecodedToken = {
  userInfo: {
    userId: string;
    username: string;
    roles: ('Admin' | 'Employee' | 'Manager')[];
  };
};

export type {
  DecodedToken,
  LoginAction,
  LoginDispatch,
  LoginReducer,
  LoginResponse,
  LoginState,
};
