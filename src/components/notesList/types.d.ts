import type { Note } from '../../types';

type GetAllNotesResponse = {
  message: string;
  notes: Note[];
};

type NotesListSort = 'asc' | 'desc' | '';
type NotesListSortKey =
  | 'title'
  | 'text'
  | 'completed'
  | 'createdAt'
  | 'updatedAt';

type NotesListTransformed = [string, [string, Note[]]];

type NotesListState = {
  notes: Note[];
  noteToEdit: Note;
  userIdForEdit: string;
  usernameForEdit: string;

  sortKey: NotesListSortKey;
  sortDirection: NotesListSort;
  transformedNotes: NotesListTransformed[];

  isLoading: boolean;
  errorMessage: string;
};

type NotesListAction = {
  setUsername: 'setUsername';
  setTitle: 'setTitle';
  setText: 'setText';
  setCompleted: 'setCompleted';

  setSortKey: 'setSortKey';
  setSortDirection: 'setSortDirection';
  setTransformedNotes: 'setTransformedNotes';

  setNoteToEdit: 'setNoteToEdit';
  setUserIdForEdit: 'setUserIdForEdit';
  setUsernameForEdit: 'setUsernameForEdit';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setAllNotes: 'setAllNotes';
};

type NotesListPayload =
  | string
  | boolean
  | Note
  | Note[]
  | NotesListSort
  | NotesListSortKey
  | NotesListTransformed[];

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
  NotesListSort,
  NotesListSortKey,
  NotesListTransformed,
};
