import { EditUserAction, EditUserDispatch, EditUserState } from './types';

const initialEditUserState: EditUserState = {
  email: '',
  isValidEmail: false,
  isEmailFocused: false,

  username: '',
  isValidUsername: false,
  isUsernameFocused: false,

  id: '',
  roles: [],
  active: false,
  errorMessage: '',
  isSubmitting: false,
  isSuccessful: false,
};

const editUserAction: EditUserAction = {
  setEmail: 'setEmail',
  setIsValidEmail: 'setIsValidEmail',
  setIsEmailFocused: 'setIsEmailFocused',

  setUsername: 'setUsername',
  setIsValidUsername: 'setIsValidUsername',
  setIsUsernameFocused: 'setIsUsernameFocused',

  setRoles: 'setRoles',
  setActive: 'setActive',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setIsSuccessful: 'setIsSuccessful',
  setAll: 'setAll',
};

function editUserReducer(
  state: EditUserState,
  action: EditUserDispatch
): EditUserState {
  switch (action.type) {
    case editUserAction.setEmail:
      return {
        ...state,
        email: action.payload as string,
      };

    case editUserAction.setIsValidEmail:
      return {
        ...state,
        isValidEmail: action.payload as boolean,
      };

    case editUserAction.setIsEmailFocused:
      return {
        ...state,
        isEmailFocused: action.payload as boolean,
      };

    case editUserAction.setUsername:
      return {
        ...state,
        username: action.payload as string,
      };

    case editUserAction.setIsValidUsername:
      return {
        ...state,
        isValidUsername: action.payload as boolean,
      };

    case editUserAction.setIsUsernameFocused:
      return {
        ...state,
        isUsernameFocused: action.payload as boolean,
      };

    case editUserAction.setRoles:
      return {
        ...state,
        roles: action.payload as ('Admin' | 'Employee' | 'Manager')[],
      };

    case editUserAction.setActive:
      return {
        ...state,
        active: action.payload as boolean,
      };

    case editUserAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload as string,
      };

    case editUserAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload as boolean,
      };

    case editUserAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload as boolean,
      };

    case editUserAction.setAll:
      return action.payload as EditUserState;

    default:
      return state;
  }
}

export { editUserAction, editUserReducer,initialEditUserState };
