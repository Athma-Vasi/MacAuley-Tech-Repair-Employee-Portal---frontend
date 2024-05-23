import { SetPageInErrorPayload } from "../../../types";
import { ReasonForLeave } from "../types";
import { LeaveRequestAction, leaveRequestAction } from "./actions";
import { LeaveRequestDispatch, LeaveRequestState } from "./types";

function leaveRequestReducer(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  const reducer = leaveRequestReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const leaveRequestReducers = new Map<
  LeaveRequestAction[keyof LeaveRequestAction],
  (state: LeaveRequestState, dispatch: LeaveRequestDispatch) => LeaveRequestState
>([
  [leaveRequestAction.setAcknowledgement, leaveRequestReducer_setAcknowledgement],
  [leaveRequestAction.setAdditionalComments, leaveRequestReducer_setAdditionalComments],
  [leaveRequestAction.setAreValidLeaveDates, leaveRequestReducer_setAreValidLeaveDates],
  [
    leaveRequestAction.setDelegatedResponsibilities,
    leaveRequestReducer_setDelegatedResponsibilities,
  ],
  [leaveRequestAction.setDelegatedToEmployee, leaveRequestReducer_setDelegatedToEmployee],
  [leaveRequestAction.setEndDate, leaveRequestReducer_setEndDate],
  [leaveRequestAction.setIsSubmitting, leaveRequestReducer_setIsSubmitting],
  [leaveRequestAction.setIsSuccessful, leaveRequestReducer_setIsSuccessful],
  [leaveRequestAction.setPageInError, leaveRequestReducer_setPageInError],
  [leaveRequestAction.setReasonForLeave, leaveRequestReducer_setReasonForLeave],
  [leaveRequestAction.setStartDate, leaveRequestReducer_setStartDate],
  [leaveRequestAction.setTriggerFormSubmit, leaveRequestReducer_setTriggerFormSubmit],
]);

function leaveRequestReducer_setAcknowledgement(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, acknowledgement: dispatch.payload as boolean };
}

function leaveRequestReducer_setAdditionalComments(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, additionalComments: dispatch.payload as string };
}

function leaveRequestReducer_setAreValidLeaveDates(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, areValidLeaveDates: dispatch.payload as boolean };
}

function leaveRequestReducer_setDelegatedResponsibilities(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, delegatedResponsibilities: dispatch.payload as string };
}

function leaveRequestReducer_setDelegatedToEmployee(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, delegatedToEmployee: dispatch.payload as string };
}

function leaveRequestReducer_setEndDate(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, endDate: dispatch.payload as string };
}

function leaveRequestReducer_setIsSubmitting(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

function leaveRequestReducer_setIsSuccessful(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

function leaveRequestReducer_setPageInError(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function leaveRequestReducer_setReasonForLeave(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, reasonForLeave: dispatch.payload as ReasonForLeave };
}

function leaveRequestReducer_setStartDate(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, startDate: dispatch.payload as string };
}

function leaveRequestReducer_setTriggerFormSubmit(
  state: LeaveRequestState,
  dispatch: LeaveRequestDispatch
): LeaveRequestState {
  return { ...state, triggerFormSubmit: dispatch.payload as boolean };
}

export { leaveRequestReducer };
