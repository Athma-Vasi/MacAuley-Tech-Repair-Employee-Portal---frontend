import type {
  NotesListAction,
  NotesListDispatch,
  NotesListState,
} from '../../types';

type NotesListHeaderProps = {
  heading: string;
  currentUsername: string;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};
