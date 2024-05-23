import { SetPageInErrorPayload } from "../../../types";
import { EndorsementAction, endorsementAction } from "./actions";
import { EmployeeAttributes, EndorsementDispatch, EndorsementState } from "./types";

function endorsementReducer(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  const reducer = endorsementReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const endorsementReducers = new Map<
  EndorsementAction[keyof EndorsementAction],
  (state: EndorsementState, dispatch: EndorsementDispatch) => EndorsementState
>([
  [endorsementAction.setAttributeEndorsed, endorsementReducer_setAttributeEndorsed],
  [endorsementAction.setPersonToBeEndorsed, endorsementReducer_setPersonToBeEndorsed],
  [endorsementAction.setIsSubmitting, endorsementReducer_setIsSubmitting],
  [endorsementAction.setIsSuccessful, endorsementReducer_setIsSuccessful],
  [endorsementAction.setPageInError, endorsementReducer_setPageInError],
  [endorsementAction.setSummaryOfEndorsement, endorsementReducer_setSummaryOfEndorsement],
  [endorsementAction.setTitle, endorsementReducer_setTitle],
]);

function endorsementReducer_setAttributeEndorsed(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, attributeEndorsed: dispatch.payload as EmployeeAttributes[] };
}

function endorsementReducer_setPersonToBeEndorsed(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, personToBeEndorsed: dispatch.payload as string };
}

function endorsementReducer_setIsSubmitting(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

function endorsementReducer_setIsSuccessful(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

function endorsementReducer_setPageInError(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function endorsementReducer_setSummaryOfEndorsement(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, summaryOfEndorsement: dispatch.payload as string };
}

function endorsementReducer_setTitle(
  state: EndorsementState,
  dispatch: EndorsementDispatch
): EndorsementState {
  return { ...state, title: dispatch.payload as string };
}

export { endorsementReducer };
