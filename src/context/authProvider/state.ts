import { AuthAction, AuthDispatch, AuthState } from './types';

const initialAuthState: AuthState = {
  isLoggedIn: false,
  username: '',
  password: '',
  userId: '',
  roles: [],
  errorMessage: '',
  accessToken: '',
};

const authAction: AuthAction = {
  setIsLoggedIn: 'setIsLoggedIn',
  setUsername: 'setUsername',
  setUserId: 'setUserId',
  setPassword: 'setPassword',
  setRoles: 'setRoles',
  setErrorMessage: 'setErrorMessage',
  setAccessToken: 'setAccessToken',
  setAllAuthState: 'setAllAuthState',
};

function authReducer(state: AuthState, action: AuthDispatch): AuthState {
  switch (action.type) {
    case authAction.setIsLoggedIn:
      return { ...state, isLoggedIn: action.payload as boolean };
    case authAction.setUsername:
      return { ...state, username: action.payload as string };
    case authAction.setPassword:
      return { ...state, password: action.payload as string };
    case authAction.setUserId:
      return { ...state, userId: action.payload as string };
    case authAction.setRoles:
      return {
        ...state,
        roles: action.payload as ('Admin' | 'Employee' | 'Manager')[],
      };
    case authAction.setErrorMessage:
      return { ...state, errorMessage: action.payload as string };
    case authAction.setAccessToken:
      return { ...state, accessToken: action.payload as string };
    case authAction.setAllAuthState:
      return { ...state, ...(action.payload as AuthState) };
    default:
      return state;
  }
}

export { authAction, authReducer,initialAuthState };
