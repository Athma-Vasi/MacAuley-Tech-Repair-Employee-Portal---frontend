import { PhoneNumber, SetPageInErrorPayload, Urgency } from "../../../types";
import { AnonymousRequestAction, anonymousRequestAction } from "./actions";
import {
  AnonymousRequestDispatch,
  AnonymousRequestKind,
  AnonymousRequestState,
} from "./types";

function anonymousRequestReducer(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  const reducer = anonymousRequestReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const anonymousRequestReducers = new Map<
  AnonymousRequestAction[keyof AnonymousRequestAction],
  (
    state: AnonymousRequestState,
    dispatch: AnonymousRequestDispatch
  ) => AnonymousRequestState
>([
  [
    anonymousRequestAction.setAdditionalInformation,
    anonymousRequestReducer_setAdditionalInformation,
  ],
  [anonymousRequestAction.setIsSubmitting, anonymousRequestReducer_setIsSubmitting],
  [anonymousRequestAction.setIsSuccessful, anonymousRequestReducer_setIsSuccessful],
  [anonymousRequestAction.setPageInError, anonymousRequestReducer_setPageInError],
  [
    anonymousRequestAction.setRequestDescription,
    anonymousRequestReducer_setRequestDescription,
  ],
  [anonymousRequestAction.setRequestKind, anonymousRequestReducer_setRequestKind],
  [
    anonymousRequestAction.setSecureContactEmail,
    anonymousRequestReducer_setSecureContactEmail,
  ],
  [
    anonymousRequestAction.setSecureContactNumber,
    anonymousRequestReducer_setSecureContactNumber,
  ],
  [anonymousRequestAction.setTitle, anonymousRequestReducer_setTitle],
  [
    anonymousRequestAction.setTriggerFormSubmit,
    anonymousRequestReducer_setTriggerFormSubmit,
  ],
  [anonymousRequestAction.setUrgency, anonymousRequestReducer_setUrgency],
]);

function anonymousRequestReducer_setAdditionalInformation(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    additionalInformation: dispatch.payload as string,
  };
}

function anonymousRequestReducer_setIsSubmitting(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function anonymousRequestReducer_setIsSuccessful(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function anonymousRequestReducer_setPageInError(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function anonymousRequestReducer_setRequestDescription(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    requestDescription: dispatch.payload as string,
  };
}

function anonymousRequestReducer_setRequestKind(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    requestKind: dispatch.payload as AnonymousRequestKind,
  };
}

function anonymousRequestReducer_setSecureContactEmail(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    secureContactEmail: dispatch.payload as string,
  };
}

function anonymousRequestReducer_setSecureContactNumber(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    secureContactNumber: dispatch.payload as PhoneNumber | string,
  };
}

function anonymousRequestReducer_setTitle(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    title: dispatch.payload as string,
  };
}

function anonymousRequestReducer_setTriggerFormSubmit(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function anonymousRequestReducer_setUrgency(
  state: AnonymousRequestState,
  dispatch: AnonymousRequestDispatch
): AnonymousRequestState {
  return {
    ...state,
    urgency: dispatch.payload as Urgency,
  };
}

export { anonymousRequestReducer };
