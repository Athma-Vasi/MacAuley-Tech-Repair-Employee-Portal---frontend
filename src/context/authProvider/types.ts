import { ReactNode } from 'react';

type AuthState = {
  accessToken: string;
  errorMessage: string;
  isAccessTokenExpired: boolean;
  isFetchingTokens: boolean;
  isLoggedIn: boolean;
  password: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  sessionId: string;
  userId: string;
  username: string;
};

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthAction = {
  setAccessToken: 'setAccessToken';
  setAllAuthState: 'setAllAuthState';
  setErrorMessage: 'setErrorMessage';
  setIsAccessTokenExpired: 'setIsAccessTokenExpired';
  setFetchingTokens: 'setFetchingTokens';
  setIsLoggedIn: 'setIsLoggedIn';
  setPassword: 'setPassword';
  setRoles: 'setRoles';
  setSessionId: 'setSessionId';
  setUserId: 'setUserId';
  setUsername: 'setUsername';
};

type AuthDispatch =
  | {
      type: AuthAction['setAccessToken'];
      payload: string;
    }
  | {
      type: AuthAction['setAllAuthState'];
      payload: AuthState;
    }
  | {
      type: AuthAction['setErrorMessage'];
      payload: string;
    }
  | {
      type: AuthAction['setIsAccessTokenExpired'];
      payload: boolean;
    }
  | {
      type: AuthAction['setFetchingTokens'];
      payload: boolean;
    }
  | {
      type: AuthAction['setIsLoggedIn'];
      payload: boolean;
    }
  | {
      type: AuthAction['setPassword'];
      payload: string;
    }
  | {
      type: AuthAction['setRoles'];
      payload: ('Admin' | 'Employee' | 'Manager')[];
    }
  | {
      type: AuthAction['setSessionId'];
      payload: string;
    }
  | {
      type: AuthAction['setUserId'];
      payload: string;
    }
  | {
      type: AuthAction['setUsername'];
      payload: string;
    };

type AuthReducer = (state: AuthState, action: AuthDispatch) => AuthState;

export type {
  AuthAction,
  AuthDispatch,
  AuthProviderProps,
  AuthReducer,
  AuthState,
};
