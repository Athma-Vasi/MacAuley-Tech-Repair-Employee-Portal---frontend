import type {
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
    repairNotes: "",
    testingResults: "",
    finalRepairCost: "",
    finalRepairCostCurrency: "CAD",
    repairStatus: "In progress",
  },

  employeeDocument: null,
  customerDocument: null,
};

const displayQueryMobileAction: DisplayQueryMobileAction = {
  setCurrentDocumentId: "setCurrentDocumentId",
  setCurrentRequestStatus: "setCurrentRequestStatus",

  // for repair notes docs only
  setEditRepairTicketInput: "setEditRepairTicketInput",

  setEmployeeDocument: "setEmployeeDocument",
  setCustomerDocument: "setCustomerDocument",
};

function displayQueryMobileReducer(
  state: DisplayQueryMobileState,
  action: DisplayQueryMobileDispatch,
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

    case displayQueryMobileAction.setCustomerDocument:
      return {
        ...state,
        customerDocument: action.payload,
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
