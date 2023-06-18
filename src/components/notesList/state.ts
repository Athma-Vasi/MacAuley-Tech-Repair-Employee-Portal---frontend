import {
  Note,
  NotesListAction,
  NotesListDispatch,
  NotesListSort,
  NotesListState,
  NotesListSortKey,
  NotesListTransformed,
} from './types';

const initialNotesListState: NotesListState = {
  notes: [],
  noteToEdit: {
    _id: '',
    user: '',
    username: '',
    title: '',
    text: '',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },

  sortKey: 'title',
  sortDirection: 'asc',
  transformedNotes: [],

  userIdForEdit: '',
  usernameForEdit: '',
  isLoading: false,
  errorMessage: '',
};

const notesListAction: NotesListAction = {
  setUsername: 'setUsername',
  setTitle: 'setTitle',
  setText: 'setText',
  setCompleted: 'setCompleted',
  setNoteToEdit: 'setNoteToEdit',
  setUserIdForEdit: 'setUserIdForEdit',
  setUsernameForEdit: 'setUsernameForEdit',

  setSortKey: 'setSortKey',
  setSortDirection: 'setSortDirection',
  setTransformedNotes: 'setTransformedNotes',

  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setAllNotes: 'setAllNotes',
};

function notesListReducer(
  state: NotesListState,
  action: NotesListDispatch
): NotesListState {
  switch (action.type) {
    case notesListAction.setUsername:
      return {
        ...state,
        noteToEdit: {
          ...state.noteToEdit,
          username: action.payload as string,
        },
      };
    case notesListAction.setTitle:
      return {
        ...state,
        noteToEdit: {
          ...state.noteToEdit,
          title: action.payload as string,
        },
      };
    case notesListAction.setText:
      return {
        ...state,
        noteToEdit: {
          ...state.noteToEdit,
          text: action.payload as string,
        },
      };
    case notesListAction.setCompleted:
      return {
        ...state,
        noteToEdit: {
          ...state.noteToEdit,
          completed: action.payload as boolean,
        },
      };
    case notesListAction.setNoteToEdit:
      return {
        ...state,
        noteToEdit: action.payload as Note,
      };
    case notesListAction.setUserIdForEdit:
      return {
        ...state,
        userIdForEdit: action.payload as string,
      };
    case notesListAction.setUsernameForEdit:
      return {
        ...state,
        usernameForEdit: action.payload as string,
      };

    case notesListAction.setSortKey:
      return {
        ...state,
        sortKey: action.payload as NotesListSortKey,
      };
    case notesListAction.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload as NotesListSort,
      };
    case notesListAction.setTransformedNotes:
      return {
        ...state,
        transformedNotes: action.payload as NotesListTransformed[],
      };

    case notesListAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload as string,
      };
    case notesListAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case notesListAction.setAllNotes:
      return {
        ...state,
        notes: action.payload as Note[],
      };
    default:
      return state;
  }
}

export { initialNotesListState, notesListAction, notesListReducer };
