type AuthState = {
  isLoggedIn: boolean;
  username: string;
  password: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  errorMessage: string;
  accessToken: string;
};

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthAction = {
  setIsLoggedIn: 'setIsLoggedIn';
  setUsername: 'setUsername';
  setPassword: 'setPassword';
  setRoles: 'setRoles';
  setErrorMessage: 'setErrorMessage';
  setAccessToken: 'setAccessToken';
  setAllAuthState: 'setAllAuthState';
};

type AuthPayload =
  | string
  | boolean
  | ('Admin' | 'Employee' | 'Manager')[]
  | {
      username: string;
      password: string;
      isLoggedIn: boolean;
      roles: ('Admin' | 'Employee' | 'Manager')[];
      errorMessage: string;
      accessToken: string;
    };

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
