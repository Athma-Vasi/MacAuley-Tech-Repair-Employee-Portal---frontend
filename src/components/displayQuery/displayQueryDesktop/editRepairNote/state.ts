import {
  EditRepairNoteAction,
  EditRepairNoteDispatch,
  EditRepairNoteState,
} from './types';

const editRepairNoteAction: EditRepairNoteAction = {
  setRepairNotes: 'setRepairNotes',
  setIsRepairNotesValid: 'setIsRepairNotesValid',
  setIsRepairNotesFocused: 'setIsRepairNotesFocused',

  setTestingResults: 'setTestingResults',
  setIsTestingResultsValid: 'setIsTestingResultsValid',
  setIsTestingResultsFocused: 'setIsTestingResultsFocused',

  setFinalRepairCost: 'setFinalRepairCost',
  setIsFinalRepairCostValid: 'setIsFinalRepairCostValid',
  setIsFinalRepairCostFocused: 'setIsFinalRepairCostFocused',

  setFinalRepairCostCurrency: 'setFinalRepairCostCurrency',
  setRepairStatus: 'setRepairStatus',

  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setTriggerFormSubmit: 'setTriggerFormSubmit',

  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function editRepairNoteReducer(
  state: EditRepairNoteState,
  action: EditRepairNoteDispatch
): EditRepairNoteState {
  switch (action.type) {
    case editRepairNoteAction.setRepairNotes:
      return {
        ...state,
        repairNotes: action.payload,
      };
    case editRepairNoteAction.setIsRepairNotesValid:
      return {
        ...state,
        isRepairNotesValid: action.payload,
      };
    case editRepairNoteAction.setIsRepairNotesFocused:
      return {
        ...state,
        isRepairNotesFocused: action.payload,
      };
    case editRepairNoteAction.setTestingResults:
      return {
        ...state,
        testingResults: action.payload,
      };
    case editRepairNoteAction.setIsTestingResultsValid:
      return {
        ...state,
        isTestingResultsValid: action.payload,
      };
    case editRepairNoteAction.setIsTestingResultsFocused:
      return {
        ...state,
        isTestingResultsFocused: action.payload,
      };
    case editRepairNoteAction.setFinalRepairCost:
      return {
        ...state,
        finalRepairCost: action.payload,
      };
    case editRepairNoteAction.setIsFinalRepairCostValid:
      return {
        ...state,
        isFinalRepairCostValid: action.payload,
      };
    case editRepairNoteAction.setIsFinalRepairCostFocused:
      return {
        ...state,
        isFinalRepairCostFocused: action.payload,
      };
    case editRepairNoteAction.setFinalRepairCostCurrency:
      return {
        ...state,
        finalRepairCostCurrency: action.payload,
      };
    case editRepairNoteAction.setRepairStatus:
      return {
        ...state,
        repairStatus: action.payload,
      };

    case editRepairNoteAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };

    case editRepairNoteAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case editRepairNoteAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case editRepairNoteAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case editRepairNoteAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case editRepairNoteAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case editRepairNoteAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case editRepairNoteAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case editRepairNoteAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}

export { editRepairNoteAction, editRepairNoteReducer };
