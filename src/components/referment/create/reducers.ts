import { Department, JobPosition, SetPageInErrorPayload } from "../../../types";
import { RefermentAction, refermentAction } from "./actions";
import { RefermentDispatch, RefermentState } from "./types";

function refermentReducer(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  const reducer = refermentReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const refermentReducers = new Map<
  RefermentAction[keyof RefermentAction],
  (state: RefermentState, dispatch: RefermentDispatch) => RefermentState
>([
  [refermentAction.setAdditionalInformation, refermentReducer_setAdditionalInformation],
  [
    refermentAction.setCandidateCurrentCompany,
    refermentReducer_setCandidateCurrentCompany,
  ],
  [
    refermentAction.setCandidateCurrentJobTitle,
    refermentReducer_setCandidateCurrentJobTitle,
  ],
  [refermentAction.setCandidateEmail, refermentReducer_setCandidateEmail],
  [refermentAction.setCandidateFullName, refermentReducer_setCandidateFullName],
  [refermentAction.setCandidateProfileUrl, refermentReducer_setCandidateProfileUrl],
  [refermentAction.setDepartmentReferredFor, refermentReducer_setDepartmentReferredFor],
  [refermentAction.setPositionJobDescription, refermentReducer_setPositionJobDescription],
  [refermentAction.setPositionReferredFor, refermentReducer_setPositionReferredFor],
  [refermentAction.setPrivacyConsent, refermentReducer_setPrivacyConsent],
  [refermentAction.setReferralReason, refermentReducer_setReferralReason],
  [refermentAction.setPageInError, refermentReducer_setPageInError],
  [refermentAction.setTriggerFormSubmit, refermentReducer_setTriggerFormSubmit],
  [refermentAction.setIsSubmitting, refermentReducer_setIsSubmitting],
  [refermentAction.setIsSuccessful, refermentReducer_setIsSuccessful],
]);

function refermentReducer_setCandidateCurrentCompany(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    candidateCurrentCompany: dispatch.payload as string,
  };
}

function refermentReducer_setCandidateCurrentJobTitle(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    candidateCurrentJobTitle: dispatch.payload as string,
  };
}

function refermentReducer_setCandidateEmail(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    candidateEmail: dispatch.payload as string,
  };
}

function refermentReducer_setCandidateFullName(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    candidateFullName: dispatch.payload as string,
  };
}

function refermentReducer_setCandidateProfileUrl(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    candidateProfileUrl: dispatch.payload as string,
  };
}

function refermentReducer_setDepartmentReferredFor(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    departmentReferredFor: dispatch.payload as Department,
  };
}

function refermentReducer_setPositionJobDescription(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    positionJobDescription: dispatch.payload as string,
  };
}

function refermentReducer_setPositionReferredFor(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    positionReferredFor: dispatch.payload as JobPosition,
  };
}

function refermentReducer_setPrivacyConsent(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    privacyConsent: dispatch.payload as boolean,
  };
}

function refermentReducer_setReferralReason(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    referralReason: dispatch.payload as string,
  };
}

function refermentReducer_setPageInError(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function refermentReducer_setTriggerFormSubmit(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function refermentReducer_setIsSubmitting(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function refermentReducer_setIsSuccessful(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function refermentReducer_setAdditionalInformation(
  state: RefermentState,
  dispatch: RefermentDispatch
): RefermentState {
  return {
    ...state,
    additionalInformation: dispatch.payload as string,
  };
}

export { refermentReducer };
