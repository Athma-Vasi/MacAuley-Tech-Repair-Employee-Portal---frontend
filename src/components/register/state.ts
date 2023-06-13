import { RegisterAction, RegisterDispatch, RegisterState } from './types';

const initialRegisterState: RegisterState = {
  email: '',
  isValidEmail: false,
  isEmailFocused: false,

  username: '',
  isValidUsername: false,
  isUsernameFocused: false,

  password: '',
  isValidPassword: false,
  isPasswordFocused: false,

  confirmPassword: '',
  isValidConfirmPassword: false,
  isConfirmPasswordFocused: false,

  errorMessage: '',
  isSubmitting: false,
  isSuccessful: false,
};

const registerAction: RegisterAction = {
  setEmail: 'setEmail',
  setIsValidEmail: 'setIsValidEmail',
  setIsEmailFocused: 'setIsEmailFocused',

  setUsername: 'setUsername',
  setIsValidUsername: 'setIsValidUsername',
  setIsUsernameFocused: 'setIsUsernameFocused',

  setPassword: 'setPassword',
  setIsValidPassword: 'setIsValidPassword',
  setIsPasswordFocused: 'setIsPasswordFocused',

  setConfirmPassword: 'setConfirmPassword',
  setIsValidConfirmPassword: 'setIsValidConfirmPassword',
  setIsConfirmPasswordFocused: 'setIsConfirmPasswordFocused',

  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setIsSuccessful: 'setIsSuccessful',
};

function registerReducer(state: RegisterState, action: RegisterDispatch) {
  switch (action.type) {
    case registerAction.setEmail:
      return {
        ...state,
        email: action.payload as string,
      };
    case registerAction.setIsValidEmail:
      return {
        ...state,
        isValidEmail: action.payload as boolean,
      };
    case registerAction.setIsEmailFocused:
      return {
        ...state,
        isEmailFocused: action.payload as boolean,
      };
    case registerAction.setUsername:
      return {
        ...state,
        username: action.payload as string,
      };
    case registerAction.setIsValidUsername:
      return {
        ...state,
        isValidUsername: action.payload as boolean,
      };
    case registerAction.setIsUsernameFocused:
      return {
        ...state,
        isUsernameFocused: action.payload as boolean,
      };
    case registerAction.setPassword:
      return {
        ...state,
        password: action.payload as string,
      };
    case registerAction.setIsValidPassword:
      return {
        ...state,
        isValidPassword: action.payload as boolean,
      };
    case registerAction.setIsPasswordFocused:
      return {
        ...state,
        isPasswordFocused: action.payload as boolean,
      };
    case registerAction.setConfirmPassword:
      return {
        ...state,
        confirmPassword: action.payload as string,
      };
    case registerAction.setIsValidConfirmPassword:
      return {
        ...state,
        isValidConfirmPassword: action.payload as boolean,
      };
    case registerAction.setIsConfirmPasswordFocused:
      return {
        ...state,
        isConfirmPasswordFocused: action.payload as boolean,
      };
    case registerAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload as string,
      };
    case registerAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload as boolean,
      };
    case registerAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload as boolean,
      };
    default:
      return state;
  }
}

export { initialRegisterState, registerAction, registerReducer };
