type LoginState = {
  username: string;
  password: string;

  errorMessage: string;
  isSuccessful: boolean;
};

type LoginAction = {
  setUsername: 'setUsername';
  setPassword: 'setPassword';

  setErrorMessage: 'setErrorMessage';
  setIsSuccessful: 'setIsSuccessful';
};

type LoginPayload = string | boolean;

type LoginDispatch = {
  type: LoginAction[keyof LoginAction];
  payload: LoginPayload;
};

type LoginReducer = (state: LoginState, action: LoginDispatch) => LoginState;

export type {
  LoginState,
  LoginAction,
  LoginPayload,
  LoginDispatch,
  LoginReducer,
};
