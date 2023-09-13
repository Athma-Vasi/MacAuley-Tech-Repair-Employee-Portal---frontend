import {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileState,
} from './types';

const initialDisplayQueryMobileState: DisplayQueryMobileState = {
  // for repair notes docs only
  editRepairNoteInput: {
    repairNoteFormId: '',
    repairNotes: '',
    testingResults: '',
    finalRepairCost: '',
    finalRepairCostCurrency: 'CAD',
    repairStatus: 'In progress',
  },
};

const displayQueryMobileAction: DisplayQueryMobileAction = {
  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput',
};

function displayQueryMobileReducer(
  state: DisplayQueryMobileState,
  action: DisplayQueryMobileDispatch
): DisplayQueryMobileState {
  switch (action.type) {
    // for repair notes docs only
    case displayQueryMobileAction.setEditRepairNoteInput:
      return {
        ...state,
        editRepairNoteInput: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
};
