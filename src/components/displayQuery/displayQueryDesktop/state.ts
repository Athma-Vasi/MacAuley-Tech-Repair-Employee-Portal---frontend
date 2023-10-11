import {
  DisplayQueryDesktopAction,
  DisplayQueryDesktopDispatch,
  DisplayQueryDesktopState,
} from './types';

const initialDisplayQueryDesktopState: DisplayQueryDesktopState = {
  fieldToSortBy: 'username',
  sortDirection: 'asc',

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

  employeeDocument: null,
};

const displayQueryDesktopAction: DisplayQueryDesktopAction = {
  setFieldToSortBy: 'setFieldToSortBy',
  setSortDirection: 'setSortDirection',

  setCurrentDocumentId: 'setCurrentDocumentId',
  setCurrentRequestStatus: 'setCurrentRequestStatus',

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput',

  setEmployeeDocument: 'setEmployeeDocument',
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

    case displayQueryDesktopAction.setCurrentDocumentId:
      return {
        ...state,
        currentDocumentId: action.payload,
      };
    case displayQueryDesktopAction.setCurrentRequestStatus:
      return {
        ...state,
        currentRequestStatus: action.payload,
      };

    // for repair notes docs only
    case displayQueryDesktopAction.setEditRepairNoteInput:
      return {
        ...state,
        editRepairNoteInput: action.payload,
      };

    case displayQueryDesktopAction.setEmployeeDocument:
      return {
        ...state,
        employeeDocument: action.payload,
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
