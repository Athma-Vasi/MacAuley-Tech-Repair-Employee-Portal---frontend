import {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileState,
} from './types';

const initialDisplayQueryMobileState: DisplayQueryMobileState = {
  currentDocumentId: '',
  currentRequestStatus: 'pending',

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
  setCurrentDocumentId: 'setCurrentDocumentId',
  setCurrentRequestStatus: 'setCurrentRequestStatus',

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput',
};

function displayQueryMobileReducer(
  state: DisplayQueryMobileState,
  action: DisplayQueryMobileDispatch
): DisplayQueryMobileState {
  switch (action.type) {
    case displayQueryMobileAction.setCurrentDocumentId:
      return {
        ...state,
        currentDocumentId: action.payload,
      };
    case displayQueryMobileAction.setCurrentRequestStatus:
      return {
        ...state,
        currentRequestStatus: action.payload,
      };

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
