import { NotesListState, NotesListDispatch, NotesListAction } from '../types';

type NotesListTextProps = {
  currentUsername: string;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};

export type { NotesListTextProps };
