import type { Note } from '../../types';

type GetAllNotesResponse = {
  message: string;
  notes: Note[];
};

type NotesListSort = 'asc' | 'desc' | '';
type NotesListSortKey = 'title' | 'text' | 'completed' | 'created' | 'updated';

type NotesListTransformed = [string, [string, Note[]]];

type TransformNotesForDisplayProps = {
  notes: Note[];
  usernameForEdit: string;
  sortKey: NotesListSortKey;
  sortDirection: NotesListSort;
};

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
  triggerGetAllNotes: boolean;
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
  setTriggerGetAllNotes: 'setTriggerGetAllNotes';
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
  GetAllNotesResponse,
  Note,
  NotesListAction,
  NotesListDispatch,
  NotesListPayload,
  NotesListReducer,
  NotesListSort,
  NotesListSortKey,
  NotesListState,
  NotesListTransformed,
  TransformNotesForDisplayProps,
};
