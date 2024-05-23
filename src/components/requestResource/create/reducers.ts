import { Department, SetPageInErrorPayload } from "../../../types";
import { RequestResourceAction, requestResourceAction } from "./actions";
import {
  RequestResourceDispatch,
  RequestResourceState,
  RequestResourceType,
  Urgency,
} from "./types";

function requestResourceReducer(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  const reducer = requestResourceReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const requestResourceReducers = new Map<
  RequestResourceAction[keyof RequestResourceAction],
  (state: RequestResourceState, dispatch: RequestResourceDispatch) => RequestResourceState
>([
  [
    requestResourceAction.setAdditionalInformation,
    requestResourceReducer_setAdditionalInformation,
  ],
  [requestResourceAction.setDateNeededBy, requestResourceReducer_setDateNeededBy],
  [requestResourceAction.setDepartment, requestResourceReducer_setDepartment],
  [requestResourceAction.setIsSubmitting, requestResourceReducer_setIsSubmitting],
  [requestResourceAction.setIsSuccessful, requestResourceReducer_setIsSuccessful],
  [requestResourceAction.setPageInError, requestResourceReducer_setPageInError],
  [requestResourceAction.setReasonForRequest, requestResourceReducer_setReasonForRequest],
  [
    requestResourceAction.setResourceDescription,
    requestResourceReducer_setResourceDescription,
  ],
  [requestResourceAction.setResourceQuantity, requestResourceReducer_setResourceQuantity],
  [requestResourceAction.setResourceType, requestResourceReducer_setResourceType],
  [
    requestResourceAction.setTriggerFormSubmit,
    requestResourceReducer_setTriggerFormSubmit,
  ],
  [requestResourceAction.setUrgency, requestResourceReducer_setUrgency],
]);

function requestResourceReducer_setAdditionalInformation(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, additionalInformation: dispatch.payload as string };
}

function requestResourceReducer_setDateNeededBy(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, dateNeededBy: dispatch.payload as string };
}

function requestResourceReducer_setDepartment(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, department: dispatch.payload as Department };
}

function requestResourceReducer_setIsSubmitting(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

function requestResourceReducer_setIsSuccessful(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

function requestResourceReducer_setPageInError(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function requestResourceReducer_setReasonForRequest(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, reasonForRequest: dispatch.payload as string };
}

function requestResourceReducer_setResourceDescription(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, resourceDescription: dispatch.payload as string };
}

function requestResourceReducer_setResourceQuantity(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, resourceQuantity: dispatch.payload as string };
}

function requestResourceReducer_setResourceType(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, resourceType: dispatch.payload as RequestResourceType };
}

function requestResourceReducer_setTriggerFormSubmit(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, triggerFormSubmit: dispatch.payload as boolean };
}

function requestResourceReducer_setUrgency(
  state: RequestResourceState,
  dispatch: RequestResourceDispatch
): RequestResourceState {
  return { ...state, urgency: dispatch.payload as Urgency };
}

export { requestResourceReducer };
