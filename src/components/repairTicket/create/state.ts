import {
  CreateRepairTicketAction,
  CreateRepairTicketDispatch,
  CreateRepairTicketState,
} from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  customerId: "",
  // part information
  partName: "",
  isValidPartName: false,
  isPartNameFocused: false,

  partSerialId: "",
  isValidPartSerialId: false,
  isPartSerialIdFocused: false,

  dateReceived: "",
  isValidDateReceived: false,
  isDateReceivedFocused: false,

  descriptionOfIssue: "",
  isValidDescriptionOfIssue: false,
  isDescriptionOfIssueFocused: false,

  initialInspectionNotes: "",
  isValidInitialInspectionNotes: false,
  isInitialInspectionNotesFocused: false,

  // repair information
  repairCategory: "Accessory",
  requiredRepairs: [],
  partsNeeded: [],
  partsNeededModels: "",
  isValidPartsNeededModels: false,
  isPartsNeededModelsFocused: false,

  partUnderWarranty: false,
  estimatedRepairCost: "",
  isValidEstimatedRepairCost: false,
  estimatedRepairCostCurrency: "CAD",
  isEstimatedRepairCostFocused: false,

  estimatedCompletionDate: "",
  isValidEstimatedCompletionDate: false,
  isEstimatedCompletionDateFocused: false,

  repairPriority: "low",

  // rest of the information is updated by the repair technician after the initial repair note is created

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: "",
  isSuccessful: false,
  successMessage: "",
  isLoading: false,
  loadingMessage: "",
};

const createRepairTicketAction: CreateRepairTicketAction = {
  setCustomerId: "setCustomerId",
  // part information
  setPartName: "setPartName",
  setIsValidPartName: "setIsValidPartName",
  setIsPartNameFocused: "setIsPartNameFocused",

  setPartSerialId: "setPartSerialId",
  setIsValidPartSerialId: "setIsValidPartSerialId",
  setIsPartSerialIdFocused: "setIsPartSerialIdFocused",

  setDateReceived: "setDateReceived",
  setIsValidDateReceived: "setIsValidDateReceived",
  setIsDateReceivedFocused: "setIsDateReceivedFocused",

  setDescriptionOfIssue: "setDescriptionOfIssue",
  setIsValidDescriptionOfIssue: "setIsValidDescriptionOfIssue",
  setIsDescriptionOfIssueFocused: "setIsDescriptionOfIssueFocused",

  setInitialInspectionNotes: "setInitialInspectionNotes",
  setIsValidInitialInspectionNotes: "setIsValidInitialInspectionNotes",
  setIsInitialInspectionNotesFocused: "setIsInitialInspectionNotesFocused",

  // repair information
  setRepairCategory: "setRepairCategory",
  setRequiredRepairs: "setRequiredRepairs",
  setPartsNeeded: "setPartsNeeded",
  setPartsNeededModels: "setPartsNeededModels",
  setIsValidPartsNeededModels: "setIsValidPartsNeededModels",
  setIsPartsNeededModelsFocused: "setIsPartsNeededModelsFocused",

  setPartUnderWarranty: "setPartUnderWarranty",
  setEstimatedRepairCost: "setEstimatedRepairCost",
  setIsValidEstimatedRepairCost: "setIsValidEstimatedRepairCost",
  setIsEstimatedRepairCostFocused: "setIsEstimatedRepairCostFocused",

  setEstimatedRepairCostCurrency: "setEstimatedRepairCostCurrency",
  setEstimatedCompletionDate: "setEstimatedCompletionDate",
  setIsValidEstimatedCompletionDate: "setIsValidEstimatedCompletionDate",
  setIsEstimatedCompletionDateFocused: "setIsEstimatedCompletionDateFocused",

  setRepairPriority: "setRepairPriority",

  setTriggerFormSubmit: "setTriggerFormSubmit",
  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",

  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function createRepairTicketReducer(
  state: CreateRepairTicketState,
  action: CreateRepairTicketDispatch
): CreateRepairTicketState {
  switch (action.type) {
    case createRepairTicketAction.setCustomerId:
      return {
        ...state,
        customerId: action.payload,
      };
    // part information
    case createRepairTicketAction.setPartName:
      return {
        ...state,
        partName: action.payload,
      };
    case createRepairTicketAction.setIsValidPartName:
      return {
        ...state,
        isValidPartName: action.payload,
      };
    case createRepairTicketAction.setIsPartNameFocused:
      return {
        ...state,
        isPartNameFocused: action.payload,
      };

    case createRepairTicketAction.setPartSerialId:
      return {
        ...state,
        partSerialId: action.payload,
      };
    case createRepairTicketAction.setIsValidPartSerialId:
      return {
        ...state,
        isValidPartSerialId: action.payload,
      };
    case createRepairTicketAction.setIsPartSerialIdFocused:
      return {
        ...state,
        isPartSerialIdFocused: action.payload,
      };

    case createRepairTicketAction.setDateReceived:
      return {
        ...state,
        dateReceived: action.payload,
      };
    case createRepairTicketAction.setIsValidDateReceived:
      return {
        ...state,
        isValidDateReceived: action.payload,
      };
    case createRepairTicketAction.setIsDateReceivedFocused:
      return {
        ...state,
        isDateReceivedFocused: action.payload,
      };

    case createRepairTicketAction.setDescriptionOfIssue:
      return {
        ...state,
        descriptionOfIssue: action.payload,
      };
    case createRepairTicketAction.setIsValidDescriptionOfIssue:
      return {
        ...state,
        isValidDescriptionOfIssue: action.payload,
      };
    case createRepairTicketAction.setIsDescriptionOfIssueFocused:
      return {
        ...state,
        isDescriptionOfIssueFocused: action.payload,
      };

    case createRepairTicketAction.setInitialInspectionNotes:
      return {
        ...state,
        initialInspectionNotes: action.payload,
      };
    case createRepairTicketAction.setIsValidInitialInspectionNotes:
      return {
        ...state,
        isValidInitialInspectionNotes: action.payload,
      };
    case createRepairTicketAction.setIsInitialInspectionNotesFocused:
      return {
        ...state,
        isInitialInspectionNotesFocused: action.payload,
      };

    // repair information
    case createRepairTicketAction.setRepairCategory:
      return {
        ...state,
        repairCategory: action.payload,
      };
    case createRepairTicketAction.setRequiredRepairs:
      return {
        ...state,
        requiredRepairs: action.payload,
      };
    case createRepairTicketAction.setPartsNeeded:
      return {
        ...state,
        partsNeeded: action.payload,
      };
    case createRepairTicketAction.setPartsNeededModels:
      return {
        ...state,
        partsNeededModels: action.payload,
      };
    case createRepairTicketAction.setIsValidPartsNeededModels:
      return {
        ...state,
        isValidPartsNeededModels: action.payload,
      };
    case createRepairTicketAction.setIsPartsNeededModelsFocused:
      return {
        ...state,
        isPartsNeededModelsFocused: action.payload,
      };

    case createRepairTicketAction.setPartUnderWarranty:
      return {
        ...state,
        partUnderWarranty: action.payload,
      };
    case createRepairTicketAction.setEstimatedRepairCost:
      return {
        ...state,
        estimatedRepairCost: action.payload,
      };
    case createRepairTicketAction.setIsValidEstimatedRepairCost:
      return {
        ...state,
        isValidEstimatedRepairCost: action.payload,
      };
    case createRepairTicketAction.setIsEstimatedRepairCostFocused:
      return {
        ...state,
        isEstimatedRepairCostFocused: action.payload,
      };

    case createRepairTicketAction.setEstimatedRepairCostCurrency:
      return {
        ...state,
        estimatedRepairCostCurrency: action.payload,
      };
    case createRepairTicketAction.setEstimatedCompletionDate:
      return {
        ...state,
        estimatedCompletionDate: action.payload,
      };
    case createRepairTicketAction.setIsValidEstimatedCompletionDate:
      return {
        ...state,
        isValidEstimatedCompletionDate: action.payload,
      };
    case createRepairTicketAction.setIsEstimatedCompletionDateFocused:
      return {
        ...state,
        isEstimatedCompletionDateFocused: action.payload,
      };

    case createRepairTicketAction.setRepairPriority:
      return {
        ...state,
        repairPriority: action.payload,
      };

    case createRepairTicketAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createRepairTicketAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createRepairTicketAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = structuredClone(state.stepsInError);
      kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

      return { ...state, stepsInError };
    }

    case createRepairTicketAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createRepairTicketAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createRepairTicketAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createRepairTicketAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createRepairTicketAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createRepairTicketAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createRepairTicketAction,
  createRepairTicketReducer,
  initialCreateRepairTicketState,
};
