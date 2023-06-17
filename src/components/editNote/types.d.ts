import { Note } from '../../types';

type EditNoteProps = {
  note: Note;
};

type EditNoteState = {
  title: string;
  isTitleValid: boolean;
  isTitleFocused: boolean;

  text: string;
  isTextValid: boolean;
  isTextFocused: boolean;

  noteToEdit: Note;
  completed: boolean;
  errorMessage: string;
  isSubmitting: boolean;
};

type EditNoteAction = {
  setTitle: 'setTitle';
  setIsTitleValid: 'setIsTitleValid';
  setIsTitleFocused: 'setIsTitleFocused';

  setText: 'setText';
  setIsTextValid: 'setIsTextValid';
  setIsTextFocused: 'setIsTextFocused';

  setNoteToEdit: 'setNoteToEdit';
  setCompleted: 'setCompleted';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
};

type EditNotePayload = {
  _id?: string;
  data: string | boolean | Note;
};

type EditNoteDispatch = {
  type: EditNoteAction[keyof EditNoteAction];
  payload: EditNotePayload;
};

type EditNoteReducer = (
  state: EditNoteState,
  action: EditNoteDispatch
) => EditNoteState;

type EditNoteResponse = {
  message: string;
};

export type {
  EditNoteProps,
  EditNoteState,
  EditNoteAction,
  EditNotePayload,
  EditNoteDispatch,
  EditNoteReducer,
  EditNoteResponse,
};
