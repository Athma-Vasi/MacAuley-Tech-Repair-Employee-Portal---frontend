type LoginState = {
  username: string;
  password: string;

  errorMessage: string;
  isLoading: boolean;
};

type LoginAction = {
  setUsername: 'setUsername';
  setPassword: 'setPassword';

  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
};

type LoginPayload = string | boolean;

type LoginDispatch = {
  type: LoginAction[keyof LoginAction];
  payload: LoginPayload;
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
  LoginState,
  LoginAction,
  LoginPayload,
  LoginDispatch,
  LoginReducer,
  LoginResponse,
};
