import { AuthAction, AuthDispatch, AuthState } from './types';

const initialAuthState: AuthState = {
  accessToken: '',
  errorMessage: '',
  isLoggedIn: false,
  password: '',
  roles: [],
  sessionId: '',
  userId: '',
  username: '',
};

const authAction: AuthAction = {
  setAccessToken: 'setAccessToken',
  setAllAuthState: 'setAllAuthState',
  setErrorMessage: 'setErrorMessage',
  setIsLoggedIn: 'setIsLoggedIn',
  setPassword: 'setPassword',
  setRoles: 'setRoles',
  setSessionId: 'setSessionId',
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
    case authAction.setIsLoggedIn:
      return { ...state, isLoggedIn: action.payload };
    case authAction.setPassword:
      return { ...state, password: action.payload };
    case authAction.setRoles:
      return { ...state, roles: action.payload };
    case authAction.setSessionId:
      return { ...state, sessionId: action.payload };
    case authAction.setUserId:
      return { ...state, userId: action.payload };
    case authAction.setUsername:
      return { ...state, username: action.payload };
    default:
      return state;
  }
}

export { authAction, authReducer, initialAuthState };
