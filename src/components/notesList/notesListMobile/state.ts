import {
  NotesListMobileAction,
  NotesListMobileDispatch,
  NotesListMobileState,
} from './types';

const initialNotesListMobileState: NotesListMobileState = {};

const notesListMobileAction: NotesListMobileAction = {
  setCollapseToggle: 'setCollapseToggle',
};

function notesListMobileReducer(
  state: NotesListMobileState,
  action: NotesListMobileDispatch
): NotesListMobileState {
  switch (action.type) {
    case notesListMobileAction.setCollapseToggle:
      return {
        ...state,
        [action.payload.id]: action.payload.data,
      };
    default:
      return state;
  }
}

export {
  initialNotesListMobileState,
  notesListMobileAction,
  notesListMobileReducer,
};
