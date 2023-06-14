import { AuthAction, AuthDispatch, AuthState } from './types';

const initialAuthState: AuthState = {
  isLoggedIn: false,
  username: '',
  roles: [],
  errorMessage: '',
};

const authAction: AuthAction = {
  setIsLoggedIn: 'setIsLoggedIn',
  setUsername: 'setUsername',
  setRoles: 'setRoles',
  setErrorMessage: 'setErrorMessage',
};

function authReducer(state: AuthState, action: AuthDispatch): AuthState {
  switch (action.type) {
    case authAction.setIsLoggedIn:
      return { ...state, isLoggedIn: action.payload as boolean };
    case authAction.setUsername:
      return { ...state, username: action.payload as string };
    case authAction.setRoles:
      return {
        ...state,
        roles: action.payload as ('Admin' | 'Employee' | 'Manager')[],
      };
    case authAction.setErrorMessage:
      return { ...state, errorMessage: action.payload as string };
    default:
      return state;
  }
}

export { initialAuthState, authAction, authReducer };
