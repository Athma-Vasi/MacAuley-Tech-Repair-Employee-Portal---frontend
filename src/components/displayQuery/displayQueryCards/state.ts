import type {
  DisplayQueryCardsAction,
  DisplayQueryCardsDispatch,
  DisplayQueryCardsState,
} from "./types";

const initialDisplayQueryCardsState: DisplayQueryCardsState = {
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

const displayQueryCardsAction: DisplayQueryCardsAction = {
  setCurrentDocumentId: "setCurrentDocumentId",
  setCurrentRequestStatus: "setCurrentRequestStatus",

  // for repair notes docs only
  setEditRepairTicketInput: "setEditRepairTicketInput",

  setEmployeeDocument: "setEmployeeDocument",
  setCustomerDocument: "setCustomerDocument",
};

function displayQueryCardsReducer(
  state: DisplayQueryCardsState,
  action: DisplayQueryCardsDispatch,
): DisplayQueryCardsState {
  switch (action.type) {
    case displayQueryCardsAction.setCurrentDocumentId:
      return {
        ...state,
        currentDocumentId: action.payload,
      };
    case displayQueryCardsAction.setCurrentRequestStatus:
      return {
        ...state,
        currentRequestStatus: action.payload,
      };

    // for repair notes docs only
    case displayQueryCardsAction.setEditRepairTicketInput:
      return {
        ...state,
        editRepairTicketInput: action.payload,
      };

    case displayQueryCardsAction.setEmployeeDocument:
      return {
        ...state,
        employeeDocument: action.payload,
      };

    case displayQueryCardsAction.setCustomerDocument:
      return {
        ...state,
        customerDocument: action.payload,
      };

    default:
      return state;
  }
}

export {
  displayQueryCardsAction,
  displayQueryCardsReducer,
  initialDisplayQueryCardsState,
};
