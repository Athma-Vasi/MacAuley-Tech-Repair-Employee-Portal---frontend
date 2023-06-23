import type {
  NotesListTransformed,
  NotesListState,
  NotesListDispatch,
  NotesListAction,
} from '../types';

type NotesListDesktopProps = {
  transformedNotes: NotesListTransformed[];
  openEditNote: () => void;
  openAddNewNote: () => void;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};

export type { NotesListDesktopProps };
