import type { SetPageInErrorPayload } from "../../../types";
import { type EventAction, eventAction } from "./actions";
import type { EventDispatch, EventKind, EventState } from "./types";

function eventReducer(state: EventState, dispatch: EventDispatch): EventState {
  const reducer = eventReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const eventReducers = new Map<
  EventAction[keyof EventAction],
  (state: EventState, dispatch: EventDispatch) => EventState
>([
  [eventAction.setAttendees, eventReducer_setAttendees],
  [eventAction.setDescription, eventReducer_setDescription],
  [eventAction.setEndDate, eventReducer_setEndDate],
  [eventAction.setEndTime, eventReducer_setEndTime],
  [eventAction.setErrorMessage, eventReducer_setErrorMessage],
  [eventAction.setIsError, eventReducer_setIsError],
  [eventAction.setKind, eventReducer_setKind],
  [eventAction.setLocation, eventReducer_setLocation],
  [eventAction.setStartDate, eventReducer_setStartDate],
  [eventAction.setStartTime, eventReducer_setStartTime],
  [eventAction.setIsSubmitting, eventReducer_setIsSubmitting],
  [eventAction.setIsSuccessful, eventReducer_setIsSuccessful],
  [eventAction.setPageInError, eventReducer_setPageInError],
  [eventAction.setRequiredItems, eventReducer_setRequiredItems],
  [eventAction.setRsvpDeadline, eventReducer_setRsvpDeadline],
  [eventAction.setTitle, eventReducer_setTitle],
  [eventAction.setTriggerFormSubmit, eventReducer_setTriggerFormSubmit],
]);

function eventReducer_setAttendees(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, attendees: dispatch.payload as string };
}

function eventReducer_setDescription(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, description: dispatch.payload as string };
}

function eventReducer_setEndDate(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, endDate: dispatch.payload as string };
}

function eventReducer_setEndTime(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, endTime: dispatch.payload as string };
}

function eventReducer_setErrorMessage(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, errorMessage: dispatch.payload as string };
}

function eventReducer_setIsError(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, isError: dispatch.payload as boolean };
}

function eventReducer_setKind(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, kind: dispatch.payload as EventKind };
}

function eventReducer_setLocation(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, location: dispatch.payload as string };
}

function eventReducer_setStartDate(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, startDate: dispatch.payload as string };
}

function eventReducer_setStartTime(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, startTime: dispatch.payload as string };
}

function eventReducer_setIsSubmitting(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

function eventReducer_setIsSuccessful(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

function eventReducer_setPageInError(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function eventReducer_setRequiredItems(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, requiredItems: dispatch.payload as string };
}

function eventReducer_setRsvpDeadline(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, rsvpDeadline: dispatch.payload as string };
}

function eventReducer_setTitle(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, title: dispatch.payload as string };
}

function eventReducer_setTriggerFormSubmit(
  state: EventState,
  dispatch: EventDispatch,
): EventState {
  return { ...state, triggerFormSubmit: dispatch.payload as boolean };
}

export { eventReducer };
