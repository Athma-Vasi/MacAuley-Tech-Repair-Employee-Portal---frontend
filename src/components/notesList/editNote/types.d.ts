import { Note } from '../../types';

type EditNoteProps = {
  note: Note;
  closeModalCallback: () => void;
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
  isSuccessful: boolean;
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
  setIsSuccessful: 'setIsSuccessful';
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
  EditNoteAction,
  EditNoteDispatch,
  EditNotePayload,
  EditNoteProps,
  EditNoteReducer,
  EditNoteResponse,
  EditNoteState,
};
