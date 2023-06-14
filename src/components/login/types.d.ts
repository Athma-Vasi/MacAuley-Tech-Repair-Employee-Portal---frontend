type LoginState = {
  username: string;
  password: string;

  errorMessage: string;
  isSuccessful: boolean;
  isLoading: boolean;
};

type LoginAction = {
  setUsername: 'setUsername';
  setPassword: 'setPassword';

  setErrorMessage: 'setErrorMessage';
  setIsSuccessful: 'setIsSuccessful';
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
