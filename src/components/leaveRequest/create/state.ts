import type {
  CreateLeaveRequestAction,
  CreateLeaveRequestDispatch,
  CreateLeaveRequestState,
} from './types';

const initialCreateLeaveRequestState: CreateLeaveRequestState = {
  startDate: '',
  isValidStartDate: false,
  isStartDateFocused: false,

  endDate: '',
  isValidEndDate: false,
  isEndDateFocused: false,

  areValidLeaveDates: false,
  reasonForLeave: 'Vacation',

  delegatedToEmployee: '',
  isValidDelegatedToEmployee: false,
  isDelegatedToEmployeeFocused: false,

  delegatedResponsibilities: '',
  isValidDelegatedResponsibilities: false,
  isDelegatedResponsibilitiesFocused: false,

  additionalComments: '',
  isValidAdditionalComments: false,
  isAdditionalCommentsFocused: false,

  isAcknowledged: false,
  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const createLeaveRequestAction: CreateLeaveRequestAction = {
  setStartDate: 'setStartDate',
  setIsValidStartDate: 'setIsValidStartDate',
  setIsStartDateFocused: 'setIsStartDateFocused',

  setEndDate: 'setEndDate',
  setIsValidEndDate: 'setIsValidEndDate',
  setIsEndDateFocused: 'setIsEndDateFocused',

  setAreValidLeaveDates: 'setAreValidLeaveDates',
  setReasonForLeave: 'setReasonForLeave',

  setDelegatedToEmployee: 'setDelegatedToEmployee',
  setIsValidDelegatedToEmployee: 'setIsValidDelegatedToEmployee',
  setIsDelegatedToEmployeeFocused: 'setIsDelegatedToEmployeeFocused',

  setDelegatedResponsibilities: 'setDelegatedResponsibilities',
  setIsValidDelegatedResponsibilities: 'setIsValidDelegatedResponsibilities',
  setIsDelegatedResponsibilitiesFocused:
    'setIsDelegatedResponsibilitiesFocused',

  setAdditionalComments: 'setAdditionalComments',
  setIsValidAdditionalComments: 'setIsValidAdditionalComments',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',

  setIsAcknowledged: 'setIsAcknowledged',
  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createLeaveRequestReducer(
  state: CreateLeaveRequestState,
  action: CreateLeaveRequestDispatch
): CreateLeaveRequestState {
  switch (action.type) {
    case createLeaveRequestAction.setStartDate:
      return {
        ...state,
        startDate: action.payload,
      };
    case createLeaveRequestAction.setIsValidStartDate:
      return {
        ...state,
        isValidStartDate: action.payload,
      };
    case createLeaveRequestAction.setIsStartDateFocused:
      return {
        ...state,
        isStartDateFocused: action.payload,
      };

    case createLeaveRequestAction.setEndDate:
      return {
        ...state,
        endDate: action.payload,
      };
    case createLeaveRequestAction.setIsValidEndDate:
      return {
        ...state,
        isValidEndDate: action.payload,
      };
    case createLeaveRequestAction.setIsEndDateFocused:
      return {
        ...state,
        isEndDateFocused: action.payload,
      };

    case createLeaveRequestAction.setAreValidLeaveDates:
      return {
        ...state,
        areValidLeaveDates: action.payload,
      };
    case createLeaveRequestAction.setReasonForLeave:
      return {
        ...state,
        reasonForLeave: action.payload,
      };

    case createLeaveRequestAction.setDelegatedToEmployee:
      return {
        ...state,
        delegatedToEmployee: action.payload,
      };
    case createLeaveRequestAction.setIsValidDelegatedToEmployee:
      return {
        ...state,
        isValidDelegatedToEmployee: action.payload,
      };
    case createLeaveRequestAction.setIsDelegatedToEmployeeFocused:
      return {
        ...state,
        isDelegatedToEmployeeFocused: action.payload,
      };

    case createLeaveRequestAction.setDelegatedResponsibilities:
      return {
        ...state,
        delegatedResponsibilities: action.payload,
      };
    case createLeaveRequestAction.setIsValidDelegatedResponsibilities:
      return {
        ...state,
        isValidDelegatedResponsibilities: action.payload,
      };
    case createLeaveRequestAction.setIsDelegatedResponsibilitiesFocused:
      return {
        ...state,
        isDelegatedResponsibilitiesFocused: action.payload,
      };

    case createLeaveRequestAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case createLeaveRequestAction.setIsValidAdditionalComments:
      return {
        ...state,
        isValidAdditionalComments: action.payload,
      };
    case createLeaveRequestAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };

    case createLeaveRequestAction.setIsAcknowledged:
      return {
        ...state,
        isAcknowledged: action.payload,
      };
    case createLeaveRequestAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createLeaveRequestAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createLeaveRequestAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createLeaveRequestAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createLeaveRequestAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createLeaveRequestAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createLeaveRequestAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createLeaveRequestAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createLeaveRequestAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createLeaveRequestAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createLeaveRequestAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  createLeaveRequestAction,
  createLeaveRequestReducer,
  initialCreateLeaveRequestState,
};
