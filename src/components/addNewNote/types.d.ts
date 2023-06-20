import type { Note } from '../../types';

type AddNewNoteProps = {
  userId: string;
  username: string;
  closeModalCallback: () => void;
};

type AddNewNoteState = {
  userId: string;
  username: string;
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  text: string;
  isValidText: boolean;
  isTextFocused: boolean;

  errorMessage: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type AddNewNoteAction = {
  setUserId: 'setUserId';
  setUsername: 'setUsername';
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setText: 'setText';
  setIsValidText: 'setIsValidText';
  setIsTextFocused: 'setIsTextFocused';

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
