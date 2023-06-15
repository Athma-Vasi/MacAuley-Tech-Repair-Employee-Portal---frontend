import { LoginAction, LoginDispatch, LoginState } from './types';

const initialLoginState: LoginState = {
  username: '',
  password: '',
  errorMessage: '',
  isLoading: false,
};

const loginAction: LoginAction = {
  setUsername: 'setUsername',
  setPassword: 'setPassword',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
};

function loginReducer(state: LoginState, action: LoginDispatch): LoginState {
  switch (action.type) {
    case loginAction.setUsername:
      return { ...state, username: action.payload as string };
    case loginAction.setPassword:
      return { ...state, password: action.payload as string };
    case loginAction.setErrorMessage:
      return { ...state, errorMessage: action.payload as string };
    case loginAction.setIsLoading:
      return { ...state, isLoading: action.payload as boolean };
    default:
      return state;
  }
}

export { initialLoginState, loginAction, loginReducer };
