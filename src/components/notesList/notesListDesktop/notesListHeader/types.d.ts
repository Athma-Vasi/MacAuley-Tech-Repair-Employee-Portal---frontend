import type {
  NotesListState,
  NotesListDispatch,
  NotesListAction,
} from '../../types';

type NotesListHeaderProps = {
  heading: string;
  currentUsername: string;
  notesListState: NotesListState;
  notesListDispatch: React.Dispatch<NotesListDispatch>;
  notesListAction: NotesListAction;
};
