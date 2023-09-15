import { Currency, SetStepsInErrorPayload } from '../../../types';
import { RepairStatus } from '../../repairNote/types';

type EditRepairNoteState = {
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

type EditRepairNoteAction = {
  setRepairNotes: 'setRepairNotes';
  setIsRepairNotesValid: 'setIsRepairNotesValid';
  setIsRepairNotesFocused: 'setIsRepairNotesFocused';

  setTestingResults: 'setTestingResults';
  setIsTestingResultsValid: 'setIsTestingResultsValid';
  setIsTestingResultsFocused: 'setIsTestingResultsFocused';

  setFinalRepairCost: 'setFinalRepairCost';
  setIsFinalRepairCostValid: 'setIsFinalRepairCostValid';
  setIsFinalRepairCostFocused: 'setIsFinalRepairCostFocused';

  setFinalRepairCostCurrency: 'setFinalRepairCostCurrency';
  setRepairStatus: 'setRepairStatus';

  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setTriggerFormSubmit: 'setTriggerFormSubmit';

  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type EditRepairNoteDispatch =
  | {
      type:
        | EditRepairNoteAction['setRepairNotes']
        | EditRepairNoteAction['setTestingResults']
        | EditRepairNoteAction['setFinalRepairCost']
        | EditRepairNoteAction['setLoadingMessage']
        | EditRepairNoteAction['setSubmitMessage']
        | EditRepairNoteAction['setSuccessMessage'];

      payload: string;
    }
  | {
      type:
        | EditRepairNoteAction['setIsRepairNotesValid']
        | EditRepairNoteAction['setIsTestingResultsValid']
        | EditRepairNoteAction['setIsFinalRepairCostValid']
        | EditRepairNoteAction['setIsRepairNotesFocused']
        | EditRepairNoteAction['setIsTestingResultsFocused']
        | EditRepairNoteAction['setIsFinalRepairCostFocused']
        | EditRepairNoteAction['setTriggerFormSubmit']
        | EditRepairNoteAction['setIsLoading']
        | EditRepairNoteAction['setIsSubmitting']
        | EditRepairNoteAction['setIsSuccessful'];

      payload: boolean;
    }
  | {
      type: EditRepairNoteAction['setFinalRepairCostCurrency'];
      payload: Currency;
    }
  | {
      type: EditRepairNoteAction['setRepairStatus'];
      payload: RepairStatus;
    }
  | {
      type: EditRepairNoteAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: EditRepairNoteAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

export type {
  EditRepairNoteAction,
  EditRepairNoteDispatch,
  EditRepairNoteState,
};
