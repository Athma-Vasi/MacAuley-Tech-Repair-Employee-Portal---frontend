type AuthState = {
  isLoggedIn: boolean;
  username: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  errorMessage: string;
};

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthAction = {
  setIsLoggedIn: 'setIsLoggedIn';
  setUsername: 'setUsername';
  setRoles: 'setRoles';
  setErrorMessage: 'setErrorMessage';
};

type AuthPayload = string | boolean | ('Admin' | 'Employee' | 'Manager')[];

type AuthDispatch = {
  type: AuthAction[keyof AuthAction];
  payload: AuthPayload;
};

type AuthReducer = (state: AuthState, action: AuthDispatch) => AuthState;

export type {
  AuthState,
  AuthAction,
  AuthPayload,
  AuthDispatch,
  AuthReducer,
  AuthProviderProps,
};
