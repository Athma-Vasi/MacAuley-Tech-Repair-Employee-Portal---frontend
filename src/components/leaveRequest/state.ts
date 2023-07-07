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

  reasonForLeave: 'Vacation',
  isValidReasonForLeave: false,
  isReasonForLeaveFocused: false,

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
};

const leaveRequestAction: LeaveRequestAction = {
  setStartDate: 'setStartDate',
  setIsValidStartDate: 'setIsValidStartDate',
  setIsStartDateFocused: 'setIsStartDateFocused',

  setEndDate: 'setEndDate',
  setIsValidEndDate: 'setIsValidEndDate',
  setIsEndDateFocused: 'setIsEndDateFocused',

  setReasonForLeave: 'setReasonForLeave',
  setIsValidReasonForLeave: 'setIsValidReasonForLeave',
  setIsReasonForLeaveFocused: 'setIsReasonForLeaveFocused',

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
};

function leaveRequestReducer(
  state: LeaveRequestState,
  action: LeaveRequestDispatch
): LeaveRequestState {
  switch (action.type) {
    case leaveRequestAction.setStartDate:
      return {
        ...state,
        startDate: action.payload as string,
      };
    case leaveRequestAction.setIsValidStartDate:
      return {
        ...state,
        isValidStartDate: action.payload as boolean,
      };
    case leaveRequestAction.setIsStartDateFocused:
      return {
        ...state,
        isStartDateFocused: action.payload as boolean,
      };

    case leaveRequestAction.setEndDate:
      return {
        ...state,
        endDate: action.payload as string,
      };
    case leaveRequestAction.setIsValidEndDate:
      return {
        ...state,
        isValidEndDate: action.payload as boolean,
      };
    case leaveRequestAction.setIsEndDateFocused:
      return {
        ...state,
        isEndDateFocused: action.payload as boolean,
      };

    case leaveRequestAction.setReasonForLeave:
      return {
        ...state,
        reasonForLeave: action.payload as ReasonForLeave,
      };
    case leaveRequestAction.setIsValidReasonForLeave:
      return {
        ...state,
        isValidReasonForLeave: action.payload as boolean,
      };
    case leaveRequestAction.setIsReasonForLeaveFocused:
      return {
        ...state,
        isReasonForLeaveFocused: action.payload as boolean,
      };

    case leaveRequestAction.setDelegatedToEmployee:
      return {
        ...state,
        delegatedToEmployee: action.payload as string,
      };
    case leaveRequestAction.setIsValidDelegatedToEmployee:
      return {
        ...state,
        isValidDelegatedToEmployee: action.payload as boolean,
      };
    case leaveRequestAction.setIsDelegatedToEmployeeFocused:
      return {
        ...state,
        isDelegatedToEmployeeFocused: action.payload as boolean,
      };

    case leaveRequestAction.setDelegatedResponsibilities:
      return {
        ...state,
        delegatedResponsibilities: action.payload as string,
      };
    case leaveRequestAction.setIsValidDelegatedResponsibilities:
      return {
        ...state,
        isValidDelegatedResponsibilities: action.payload as boolean,
      };
    case leaveRequestAction.setIsDelegatedResponsibilitiesFocused:
      return {
        ...state,
        isDelegatedResponsibilitiesFocused: action.payload as boolean,
      };

    case leaveRequestAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload as string,
      };
    case leaveRequestAction.setIsValidAdditionalComments:
      return {
        ...state,
        isValidAdditionalComments: action.payload as boolean,
      };
    case leaveRequestAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload as boolean,
      };

    case leaveRequestAction.setIsAcknowledged:
      return {
        ...state,
        isAcknowledged: action.payload as boolean,
      };

    default:
      return state;
  }
}

export { initialLeaveRequestState, leaveRequestAction, leaveRequestReducer };
