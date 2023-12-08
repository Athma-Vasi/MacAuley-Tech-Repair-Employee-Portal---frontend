import {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileState,
} from "./types";

const initialDisplayQueryMobileState: DisplayQueryMobileState = {
  currentDocumentId: "",
  currentRequestStatus: "pending",

  // for repair notes docs only
  editRepairTicketInput: {
    repairTicketFormId: "",
    repairTickets: "",
    testingResults: "",
    finalRepairCost: "",
    finalRepairCostCurrency: "CAD",
    repairStatus: "In progress",
  },

  employeeDocument: null,
};

const displayQueryMobileAction: DisplayQueryMobileAction = {
  setCurrentDocumentId: "setCurrentDocumentId",
  setCurrentRequestStatus: "setCurrentRequestStatus",

  // for repair notes docs only
  setEditRepairTicketInput: "setEditRepairTicketInput",

  setEmployeeDocument: "setEmployeeDocument",
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
    case displayQueryMobileAction.setEditRepairTicketInput:
      return {
        ...state,
        editRepairTicketInput: action.payload,
      };

    case displayQueryMobileAction.setEmployeeDocument:
      return {
        ...state,
        employeeDocument: action.payload,
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
