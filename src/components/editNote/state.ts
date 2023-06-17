import { Note } from '../../types';
import { EditNoteAction, EditNoteDispatch, EditNoteState } from './types';

const initialEditNoteState: EditNoteState = {
  noteToEdit: {
    _id: '', // this is the note id
    user: '', // this is the user id
    title: '',
    text: '',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    username: '',
    __v: 0,
  },
  title: '',
  isTitleValid: false,
  isTitleFocused: false,

  text: '',
  isTextValid: false,
  isTextFocused: false,

  completed: false,
  errorMessage: '',
  isSubmitting: false,
};

const editNoteAction: EditNoteAction = {
  setTitle: 'setTitle',
  setIsTitleValid: 'setIsTitleValid',
  setIsTitleFocused: 'setIsTitleFocused',

  setText: 'setText',
  setIsTextValid: 'setIsTextValid',
  setIsTextFocused: 'setIsTextFocused',

  setCompleted: 'setCompleted',
  setNoteToEdit: 'setNoteToEdit',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
};

function editNoteReducer(
  state: EditNoteState,
  action: EditNoteDispatch
): EditNoteState {
  switch (action.type) {
    case editNoteAction.setNoteToEdit:
      return { ...state, noteToEdit: action.payload.data as Note };

    case editNoteAction.setTitle:
      return { ...state, title: action.payload.data as string };
    case editNoteAction.setIsTitleFocused:
      return { ...state, isTitleFocused: action.payload.data as boolean };
    case editNoteAction.setIsTitleValid:
      return { ...state, isTitleValid: action.payload.data as boolean };

    case editNoteAction.setText:
      return { ...state, text: action.payload.data as string };
    case editNoteAction.setIsTextFocused:
      return { ...state, isTextFocused: action.payload.data as boolean };
    case editNoteAction.setIsTextValid:
      return { ...state, isTextValid: action.payload.data as boolean };

    case editNoteAction.setCompleted:
      return { ...state, completed: action.payload.data as boolean };
    case editNoteAction.setErrorMessage:
      return { ...state, errorMessage: action.payload.data as string };
    case editNoteAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload.data as boolean };
    default:
      return state;
  }
}

export { initialEditNoteState, editNoteAction, editNoteReducer };
