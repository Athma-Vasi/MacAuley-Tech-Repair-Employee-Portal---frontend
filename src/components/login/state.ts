import { LoginAction, LoginDispatch, LoginState } from './types';

const initialLoginState: LoginState = {
  username: '',
  password: '',
  triggerLoginSubmit: false,

  isError: false,
  errorMessage: '',
  isLoading: true,
  loadingMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const loginAction: LoginAction = {
  setUsername: 'setUsername',
  setPassword: 'setPassword',
  setTriggerLoginSubmit: 'setTriggerLoginSubmit',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function loginReducer(state: LoginState, action: LoginDispatch): LoginState {
  switch (action.type) {
    case loginAction.setUsername:
      return {
        ...state,
        username: action.payload,
      };
    case loginAction.setPassword:
      return {
        ...state,
        password: action.payload,
      };
    case loginAction.setTriggerLoginSubmit:
      return {
        ...state,
        triggerLoginSubmit: action.payload,
      };

    case loginAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case loginAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case loginAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case loginAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case loginAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case loginAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case loginAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case loginAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}

export { initialLoginState, loginAction, loginReducer };
