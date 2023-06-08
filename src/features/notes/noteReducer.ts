type NoteReturn = {
  _id: string;
  user: string;
  username: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type NoteState = {
  notes: NoteReturn[];
  isLoading: boolean;
  error: string;
  isSuccess?: boolean;
};

type NoteDispatch = {
  type: FetchNoteAction[keyof FetchNoteAction];
  payload: NoteState;
};

type FetchNoteAction = {
  FETCH_NOTES_SUCCESS: 'FETCH_NOTES_SUCCESS';
  FETCH_NOTES_FAILURE: 'FETCH_NOTES_FAILURE';
};

const fetchNoteAction: FetchNoteAction = {
  FETCH_NOTES_SUCCESS: 'FETCH_NOTES_SUCCESS',
  FETCH_NOTES_FAILURE: 'FETCH_NOTES_FAILURE',
};

const initialFetchNotesState: NoteState = {
  notes: [],
  isLoading: false,
  error: '',
  isSuccess: false,
};

function fetchNotesReducer(
  state: NoteState,
  dispatch: NoteDispatch
): NoteState {
  switch (dispatch.type) {
    case fetchNoteAction.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: dispatch.payload.notes,
        isLoading: false,
        error: '',
        isSuccess: true,
      };
    case fetchNoteAction.FETCH_NOTES_FAILURE:
      return {
        ...state,
        notes: [],
        isLoading: false,
        error: dispatch.payload.error,
        isSuccess: false,
      };
    default:
      return state;
  }
}

export { fetchNotesReducer, initialFetchNotesState, fetchNoteAction };
export type { NoteState, NoteDispatch, NoteReturn, FetchNoteAction };
