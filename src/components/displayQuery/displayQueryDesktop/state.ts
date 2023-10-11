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

  employeeIdToViewProfile: '',
  employeeDocument: null,

  isDisplayQueryDesktopLoading: false,
  displayQueryDesktopLoadingMessage: '',
};

const displayQueryDesktopAction: DisplayQueryDesktopAction = {
  setFieldToSortBy: 'setFieldToSortBy',
  setSortDirection: 'setSortDirection',

  setCurrentDocumentId: 'setCurrentDocumentId',
  setCurrentRequestStatus: 'setCurrentRequestStatus',

  // for repair notes docs only
  setEditRepairNoteInput: 'setEditRepairNoteInput',

  setEmployeeIdToViewProfile: 'setEmployeeIdToViewProfile',
  setEmployeeDocument: 'setEmployeeDocument',

  setIsDisplayQueryDesktopLoading: 'setIsDisplayQueryDesktopLoading',
  setDisplayQueryDesktopLoadingMessage: 'setDisplayQueryDesktopLoadingMessage',
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

    case displayQueryDesktopAction.setEmployeeIdToViewProfile:
      return {
        ...state,
        employeeIdToViewProfile: action.payload,
      };
    case displayQueryDesktopAction.setEmployeeDocument:
      return {
        ...state,
        employeeDocument: action.payload,
      };

    case displayQueryDesktopAction.setIsDisplayQueryDesktopLoading:
      return {
        ...state,
        isDisplayQueryDesktopLoading: action.payload,
      };
    case displayQueryDesktopAction.setDisplayQueryDesktopLoadingMessage:
      return {
        ...state,
        displayQueryDesktopLoadingMessage: action.payload,
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
