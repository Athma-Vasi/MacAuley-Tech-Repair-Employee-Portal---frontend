import { AddNewNoteAction, AddNewNoteDispatch, AddNewNoteState } from './types';

const initialAddNewNoteState: AddNewNoteState = {
  userId: '',
  username: '',

  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  text: '',
  isValidText: false,
  isTextFocused: false,

  errorMessage: '',
  isSubmitting: false,
  isSuccessful: false,
};

const addNewNoteAction: AddNewNoteAction = {
  setUserId: 'setUserId',
  setUsername: 'setUsername',

  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setText: 'setText',
  setIsValidText: 'setIsValidText',
  setIsTextFocused: 'setIsTextFocused',

  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setIsSuccessful: 'setIsSuccessful',
  setAll: 'setAll',
};

function addNewNoteReducer(
  state: AddNewNoteState,
  action: AddNewNoteDispatch
): AddNewNoteState {
  switch (action.type) {
    case addNewNoteAction.setUserId:
      return { ...state, userId: action.payload as string };
    case addNewNoteAction.setUsername:
      return { ...state, username: action.payload as string };

    case addNewNoteAction.setTitle:
      return { ...state, title: action.payload as string };
    case addNewNoteAction.setIsValidTitle:
      return { ...state, isValidTitle: action.payload as boolean };
    case addNewNoteAction.setIsTitleFocused:
      return { ...state, isTitleFocused: action.payload as boolean };

    case addNewNoteAction.setText:
      return { ...state, text: action.payload as string };
    case addNewNoteAction.setIsValidText:
      return { ...state, isValidText: action.payload as boolean };
    case addNewNoteAction.setIsTextFocused:
      return { ...state, isTextFocused: action.payload as boolean };

    case addNewNoteAction.setErrorMessage:
      return { ...state, errorMessage: action.payload as string };
    case addNewNoteAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload as boolean };
    case addNewNoteAction.setIsSuccessful:
      return { ...state, isSuccessful: action.payload as boolean };

    case addNewNoteAction.setAll:
      return { ...(action.payload as AddNewNoteState) };
    default:
      return state;
  }
}

export { initialAddNewNoteState, addNewNoteAction, addNewNoteReducer };
