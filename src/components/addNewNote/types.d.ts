import type { Note } from '../../types';

type AddNewNoteProps = {
  username: string;
};

type AddNewNoteState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  text: string;
  isValidText: boolean;
  isTextFocused: boolean;

  completed: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type AddNewNoteAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setText: 'setText';
  setIsValidText: 'setIsValidText';
  setIsTextFocused: 'setIsTextFocused';

  setCompleted: 'setCompleted';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
  setAll: 'setAll';
};

type AddNewNotePayload = string | boolean | Note | AddNewNoteState;

type AddNewNoteDispatch = {
  type: AddNewNoteAction[keyof AddNewNoteAction];
  payload: AddNewNotePayload;
};

type AddNewNoteReducer = (
  state: AddNewNoteState,
  action: AddNewNoteDispatch
) => AddNewNoteState;

type AddNewNoteResponse = {
  message: string;
};

export type {
  AddNewNoteProps,
  AddNewNoteState,
  AddNewNoteAction,
  AddNewNotePayload,
  AddNewNoteDispatch,
  AddNewNoteReducer,
  AddNewNoteResponse,
};
