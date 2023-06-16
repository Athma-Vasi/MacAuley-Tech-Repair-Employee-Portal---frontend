import type { Note } from '../../types';

type GetAllNotesResponse = {
  message: string;
  notes: Note[];
};

type NotesListState = {
  notes: Note[];
  noteToEdit: Note;
  usernameForEdit: string;
  isLoading: boolean;
  errorMessage: string;
};

type NotesListAction = {
  setUsername: 'setUsername';
  setTitle: 'setTitle';
  setText: 'setText';
  setCompleted: 'setCompleted';
  setNoteToEdit: 'setNoteToEdit';
  setUsernameForEdit: 'setUsernameForEdit';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setAllNotes: 'setAllNotes';
};

type NotesListPayload = string | boolean | Note | Note[];

type NotesListDispatch = {
  type: NotesListAction[keyof NotesListAction];
  payload: NotesListPayload;
};

type NotesListReducer = (
  state: NotesListState,
  action: NotesListDispatch
) => NotesListState;

export type {
  Note,
  GetAllNotesResponse,
  NotesListState,
  NotesListAction,
  NotesListPayload,
  NotesListDispatch,
  NotesListReducer,
};
