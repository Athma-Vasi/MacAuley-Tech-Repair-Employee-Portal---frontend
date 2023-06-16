type Note = {
  _id: string; // note id
  user: string; // user id
  username: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type GetAllNotesResponse = {
  message: string;
  notes: Note[];
};

type NotesListState = {
  notes: Note[];
  noteToEdit: Note;
  isLoading: boolean;
  errorMessage: string;
};

type NotesListAction = {
  setUsername: 'setUsername';
  setTitle: 'setTitle';
  setText: 'setText';
  setCompleted: 'setCompleted';
  setNoteToEdit: 'setNoteToEdit';
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
