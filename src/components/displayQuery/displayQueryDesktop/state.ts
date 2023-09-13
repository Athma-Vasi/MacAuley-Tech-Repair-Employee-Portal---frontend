import {
  DisplayQueryDesktopAction,
  DisplayQueryDesktopDispatch,
  DisplayQueryDesktopState,
} from './types';

const initialDisplayQueryDesktopState: DisplayQueryDesktopState = {
  fieldToSortBy: 'username',
  sortDirection: 'asc',

  // for repair notes docs only
  editRepairNoteInput: {
    id: '',
    repairNotes: '',
    testingResults: '',
    finalRepairCost: '',
    finalRepairCostCurrency: 'CAD',
    repairStatus: 'In progress',
  },
};

const displayQueryDesktopAction: DisplayQueryDesktopAction = {
  setFieldToSortBy: 'setFieldToSortBy',
  setSortDirection: 'setSortDirection',

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput',
};

function displayQueryDesktopReducer(
  state: DisplayQueryDesktopState,
  action: DisplayQueryDesktopDispatch
): DisplayQueryDesktopState {
  switch (action.type) {
    case displayQueryDesktopAction.setFieldToSortBy:
      return {
        ...state,
        fieldToSortBy: action.payload,
      };
    case displayQueryDesktopAction.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload,
      };

    // for repair notes docs only
    case displayQueryDesktopAction.setEditRepairNoteInput:
      return {
        ...state,
        editRepairNoteInput: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayQueryDesktopAction,
  displayQueryDesktopReducer,
  initialDisplayQueryDesktopState,
};
