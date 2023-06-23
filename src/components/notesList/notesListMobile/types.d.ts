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

type NoteDirectionSelectData = {
  value: 'asc' | 'desc' | '';
  label: 'Ascending' | 'Descending' | 'Default';
};

export type {
  NotesListMobileProps,
  NoteHeadingSelectData,
  NoteDirectionSelectData,
};
