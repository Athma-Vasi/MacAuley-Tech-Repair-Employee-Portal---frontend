import { Currency, SetStepsInErrorPayload } from "../../../types";
import { RepairStatus } from "../../repairTicket/types";

type EditRepairTicketState = {
  repairNotes: string;
  isRepairNotesValid: boolean;
  isRepairNotesFocused: boolean;

  testingResults: string;
  isTestingResultsValid: boolean;
  isTestingResultsFocused: boolean;

  finalRepairCost: string;
  isFinalRepairCostValid: boolean;
  isFinalRepairCostFocused: boolean;

  finalRepairCostCurrency: Currency;
  repairStatus: RepairStatus;

  currentStepperPosition: number;
  stepsInError: Set<number>;

  triggerFormSubmit: boolean;

  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type EditRepairTicketAction = {
  setRepairNotes: "setRepairNotes";
  setIsRepairNotesValid: "setIsRepairNotesValid";
  setIsRepairNotesFocused: "setIsRepairNotesFocused";

  setTestingResults: "setTestingResults";
  setIsTestingResultsValid: "setIsTestingResultsValid";
  setIsTestingResultsFocused: "setIsTestingResultsFocused";

  setFinalRepairCost: "setFinalRepairCost";
  setIsFinalRepairCostValid: "setIsFinalRepairCostValid";
  setIsFinalRepairCostFocused: "setIsFinalRepairCostFocused";

  setFinalRepairCostCurrency: "setFinalRepairCostCurrency";
  setRepairStatus: "setRepairStatus";

  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setTriggerFormSubmit: "setTriggerFormSubmit";

  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
};

type EditRepairTicketDispatch =
  | {
      type:
        | EditRepairTicketAction["setRepairNotes"]
        | EditRepairTicketAction["setTestingResults"]
        | EditRepairTicketAction["setFinalRepairCost"]
        | EditRepairTicketAction["setLoadingMessage"]
        | EditRepairTicketAction["setSubmitMessage"]
        | EditRepairTicketAction["setSuccessMessage"];

      payload: string;
    }
  | {
      type:
        | EditRepairTicketAction["setIsRepairNotesValid"]
        | EditRepairTicketAction["setIsTestingResultsValid"]
        | EditRepairTicketAction["setIsFinalRepairCostValid"]
        | EditRepairTicketAction["setIsRepairNotesFocused"]
        | EditRepairTicketAction["setIsTestingResultsFocused"]
        | EditRepairTicketAction["setIsFinalRepairCostFocused"]
        | EditRepairTicketAction["setTriggerFormSubmit"]
        | EditRepairTicketAction["setIsLoading"]
        | EditRepairTicketAction["setIsSubmitting"]
        | EditRepairTicketAction["setIsSuccessful"];

      payload: boolean;
    }
  | {
      type: EditRepairTicketAction["setFinalRepairCostCurrency"];
      payload: Currency;
    }
  | {
      type: EditRepairTicketAction["setRepairStatus"];
      payload: RepairStatus;
    }
  | {
      type: EditRepairTicketAction["setCurrentStepperPosition"];
      payload: number;
    }
  | {
      type: EditRepairTicketAction["setStepsInError"];
      payload: SetStepsInErrorPayload;
    };

export type { EditRepairTicketAction, EditRepairTicketDispatch, EditRepairTicketState };
