import { AuthAction, AuthDispatch, AuthState } from './types';

const initialAuthState: AuthState = {
  accessToken: '',
  errorMessage: '',
  isAccessTokenExpired: false,
  isFetchingTokens: false,
  isLoggedIn: false,
  password: '',
  roles: [],
  userId: '',
  username: '',
};

const authAction: AuthAction = {
  setAccessToken: 'setAccessToken',
  setAllAuthState: 'setAllAuthState',
  setErrorMessage: 'setErrorMessage',
  setIsAccessTokenExpired: 'setIsAccessTokenExpired',
  setFetchingTokens: 'setFetchingTokens',
  setIsLoggedIn: 'setIsLoggedIn',
  setPassword: 'setPassword',
  setRoles: 'setRoles',
  setUserId: 'setUserId',
  setUsername: 'setUsername',
};

function authReducer(state: AuthState, action: AuthDispatch): AuthState {
  switch (action.type) {
    case authAction.setAccessToken:
      return { ...state, accessToken: action.payload };
    case authAction.setAllAuthState:
      return { ...state, ...action.payload };
    case authAction.setErrorMessage:
      return { ...state, errorMessage: action.payload };
    case authAction.setIsAccessTokenExpired:
      return { ...state, isAccessTokenExpired: action.payload };
    case authAction.setFetchingTokens:
      return { ...state, isFetchingTokens: action.payload };
    case authAction.setIsLoggedIn:
      return { ...state, isLoggedIn: action.payload };
    case authAction.setPassword:
      return { ...state, password: action.payload };
    case authAction.setRoles:
      return { ...state, roles: action.payload };
    case authAction.setUserId:
      return { ...state, userId: action.payload };
    case authAction.setUsername:
      return { ...state, username: action.payload };
    default:
      return state;
  }
}

export { authAction, authReducer, initialAuthState };
