import { NotesListState, NotesListDispatch, NotesListAction } from '../types';

type NotesListTitleProps = {
  currentUsername: string;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};

export type { NotesListTitleProps };
