import type {
  NotesListState,
  NotesListTransformed,
  NotesListAction,
  NotesListDispatch,
  NotesListSortKey,
} from '../types';

type NotesListMobileProps = {
  transformedNotes: NotesListTransformed[];
  openEditNote: () => void;
  openAddNewNote: () => void;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};

type NoteHeadingSelectData = {
  value: NotesListSortKey;
  label: Capitalize<NotesListSortKey>;
};

type NotesListMobileState = Record<string, boolean>;

type NotesListMobileAction = {
  setCollapseToggle: 'setCollapseToggle';
};

type NotesListMobilePayload = {
  id: string;
  data: boolean;
};

type NotesListMobileDispatch = {
  type: NotesListMobileAction[keyof NotesListMobileAction];
  payload: NotesListMobilePayload;
};

type NotesListMobileReducer = (
  state: NotesListMobileState,
  action: NotesListMobileDispatch
) => NotesListMobileState;

type NoteDirectionSelectData = {
  value: 'asc' | 'desc' | '';
  label: 'Ascending' | 'Descending' | 'Default';
};

export type {
  NotesListMobileProps,
  NoteHeadingSelectData,
  NoteDirectionSelectData,
  NotesListMobileState,
  NotesListMobileAction,
  NotesListMobilePayload,
  NotesListMobileDispatch,
  NotesListMobileReducer,
};
