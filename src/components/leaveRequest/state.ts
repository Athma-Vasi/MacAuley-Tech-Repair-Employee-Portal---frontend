import type { SetStepsInErrorPayload } from '../../types';
import type {
  LeaveRequestAction,
  LeaveRequestDispatch,
  LeaveRequestState,
  ReasonForLeave,
} from './types';

const initialLeaveRequestState: LeaveRequestState = {
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

const leaveRequestAction: LeaveRequestAction = {
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

function leaveRequestReducer(
  state: LeaveRequestState,
  action: LeaveRequestDispatch
): LeaveRequestState {
  switch (action.type) {
    case leaveRequestAction.setStartDate:
      return {
        ...state,
        startDate: action.payload,
      };
    case leaveRequestAction.setIsValidStartDate:
      return {
        ...state,
        isValidStartDate: action.payload,
      };
    case leaveRequestAction.setIsStartDateFocused:
      return {
        ...state,
        isStartDateFocused: action.payload,
      };

    case leaveRequestAction.setEndDate:
      return {
        ...state,
        endDate: action.payload,
      };
    case leaveRequestAction.setIsValidEndDate:
      return {
        ...state,
        isValidEndDate: action.payload,
      };
    case leaveRequestAction.setIsEndDateFocused:
      return {
        ...state,
        isEndDateFocused: action.payload,
      };

    case leaveRequestAction.setAreValidLeaveDates:
      return {
        ...state,
        areValidLeaveDates: action.payload,
      };
    case leaveRequestAction.setReasonForLeave:
      return {
        ...state,
        reasonForLeave: action.payload,
      };

    case leaveRequestAction.setDelegatedToEmployee:
      return {
        ...state,
        delegatedToEmployee: action.payload,
      };
    case leaveRequestAction.setIsValidDelegatedToEmployee:
      return {
        ...state,
        isValidDelegatedToEmployee: action.payload,
      };
    case leaveRequestAction.setIsDelegatedToEmployeeFocused:
      return {
        ...state,
        isDelegatedToEmployeeFocused: action.payload,
      };

    case leaveRequestAction.setDelegatedResponsibilities:
      return {
        ...state,
        delegatedResponsibilities: action.payload,
      };
    case leaveRequestAction.setIsValidDelegatedResponsibilities:
      return {
        ...state,
        isValidDelegatedResponsibilities: action.payload,
      };
    case leaveRequestAction.setIsDelegatedResponsibilitiesFocused:
      return {
        ...state,
        isDelegatedResponsibilitiesFocused: action.payload,
      };

    case leaveRequestAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case leaveRequestAction.setIsValidAdditionalComments:
      return {
        ...state,
        isValidAdditionalComments: action.payload,
      };
    case leaveRequestAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };

    case leaveRequestAction.setIsAcknowledged:
      return {
        ...state,
        isAcknowledged: action.payload,
      };
    case leaveRequestAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case leaveRequestAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case leaveRequestAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case leaveRequestAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case leaveRequestAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case leaveRequestAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case leaveRequestAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case leaveRequestAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case leaveRequestAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case leaveRequestAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { initialLeaveRequestState, leaveRequestAction, leaveRequestReducer };
