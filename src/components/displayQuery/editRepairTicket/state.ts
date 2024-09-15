import type {
  EditRepairTicketAction,
  EditRepairTicketDispatch,
  EditRepairTicketState,
} from "./types";

const editRepairTicketAction: EditRepairTicketAction = {
  setRepairNotes: "setRepairNotes",
  setIsRepairNotesValid: "setIsRepairNotesValid",
  setIsRepairNotesFocused: "setIsRepairNotesFocused",

  setTestingResults: "setTestingResults",
  setIsTestingResultsValid: "setIsTestingResultsValid",
  setIsTestingResultsFocused: "setIsTestingResultsFocused",

  setFinalRepairCost: "setFinalRepairCost",
  setIsFinalRepairCostValid: "setIsFinalRepairCostValid",
  setIsFinalRepairCostFocused: "setIsFinalRepairCostFocused",

  setFinalRepairCostCurrency: "setFinalRepairCostCurrency",
  setRepairStatus: "setRepairStatus",

  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",

  setTriggerFormSubmit: "setTriggerFormSubmit",

  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
};

function editRepairTicketReducer(
  state: EditRepairTicketState,
  action: EditRepairTicketDispatch,
): EditRepairTicketState {
  switch (action.type) {
    case editRepairTicketAction.setRepairNotes:
      return {
        ...state,
        repairNotes: action.payload,
      };
    case editRepairTicketAction.setIsRepairNotesValid:
      return {
        ...state,
        isRepairNotesValid: action.payload,
      };
    case editRepairTicketAction.setIsRepairNotesFocused:
      return {
        ...state,
        isRepairNotesFocused: action.payload,
      };
    case editRepairTicketAction.setTestingResults:
      return {
        ...state,
        testingResults: action.payload,
      };
    case editRepairTicketAction.setIsTestingResultsValid:
      return {
        ...state,
        isTestingResultsValid: action.payload,
      };
    case editRepairTicketAction.setIsTestingResultsFocused:
      return {
        ...state,
        isTestingResultsFocused: action.payload,
      };
    case editRepairTicketAction.setFinalRepairCost:
      return {
        ...state,
        finalRepairCost: action.payload,
      };
    case editRepairTicketAction.setIsFinalRepairCostValid:
      return {
        ...state,
        isFinalRepairCostValid: action.payload,
      };
    case editRepairTicketAction.setIsFinalRepairCostFocused:
      return {
        ...state,
        isFinalRepairCostFocused: action.payload,
      };
    case editRepairTicketAction.setFinalRepairCostCurrency:
      return {
        ...state,
        finalRepairCostCurrency: action.payload,
      };
    case editRepairTicketAction.setRepairStatus:
      return {
        ...state,
        repairStatus: action.payload,
      };

    case editRepairTicketAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };

    case editRepairTicketAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case editRepairTicketAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case editRepairTicketAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case editRepairTicketAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case editRepairTicketAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case editRepairTicketAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case editRepairTicketAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case editRepairTicketAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}

export { editRepairTicketAction, editRepairTicketReducer };
