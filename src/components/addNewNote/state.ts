import { AddNewNoteAction, AddNewNoteDispatch, AddNewNoteState } from './types';

const initialAddNewNoteState: AddNewNoteState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  text: '',
  isValidText: false,
  isTextFocused: false,

  completed: false,
  errorMessage: '',
  isSubmitting: false,
  isSuccessful: false,
};

const addNewNoteAction: AddNewNoteAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setText: 'setText',
  setIsValidText: 'setIsValidText',
  setIsTextFocused: 'setIsTextFocused',

  setCompleted: 'setCompleted',
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

    case addNewNoteAction.setCompleted:
      return { ...state, completed: action.payload as boolean };
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
