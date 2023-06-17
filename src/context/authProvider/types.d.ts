type AuthState = {
  isLoggedIn: boolean;
  userId: string;
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
  setUserId: 'setUserId';
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
      userId: string;
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
