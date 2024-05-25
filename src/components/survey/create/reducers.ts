import { SetPageInErrorPayload } from "../../../types";
import { SurveyRecipient, SurveyStatistics } from "../types";
import { SurveyAction, surveyAction } from "./actions";
import { SurveyDispatch, SurveyQuestions, SurveyState } from "./types";

function surveyReducer(state: SurveyState, dispatch: SurveyDispatch): SurveyState {
  const reducer = surveyReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const surveyReducers = new Map<
  SurveyAction[keyof SurveyAction],
  (state: SurveyState, dispatch: SurveyDispatch) => SurveyState
>([
  [surveyAction.setSurveyTitle, surveyReducer_setSurveyTitle],
  [surveyAction.setSurveyDescription, surveyReducer_setSurveyDescription],
  [surveyAction.setExpiryDate, surveyReducer_setExpiryDate],
  [surveyAction.setSurveyRecipients, surveyReducer_setSurveyRecipients],
  [surveyAction.setQuestions, surveyReducer_setQuestions],
  [surveyAction.setResponseKinds, surveyReducer_setResponseKinds],
  [surveyAction.setResponseInputHtml, surveyReducer_setResponseInputHtml],
  [surveyAction.setSurveyStatistics, surveyReducer_setSurveyStatistics],
  [surveyAction.setTriggerFormSubmit, surveyReducer_setTriggerFormSubmit],
  [surveyAction.setTriggerPreviewSurvey, surveyReducer_setTriggerPreviewSurvey],
  [surveyAction.setPreviewSurveyProps, surveyReducer_setPreviewSurveyProps],
  [surveyAction.setPageInError, surveyReducer_setPageInError],
  [surveyAction.setIsSubmitting, surveyReducer_setIsSubmitting],
  [surveyAction.setIsSuccessful, surveyReducer_setIsSuccessful],
]);

function surveyReducer_setSurveyTitle(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    surveyTitle: dispatch.payload as string,
  };
}

function surveyReducer_setSurveyDescription(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    surveyDescription: dispatch.payload as string,
  };
}

function surveyReducer_setExpiryDate(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    expiryDate: dispatch.payload as string,
  };
}

function surveyReducer_setSurveyRecipients(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    surveyRecipients: dispatch.payload as SurveyRecipient,
  };
}

function surveyReducer_setQuestions(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    questions: dispatch.payload as string[],
  };
}

function surveyReducer_setResponseKinds(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    responseKinds: dispatch.payload as string[],
  };
}

function surveyReducer_setResponseInputHtml(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    responseInputHtml: dispatch.payload as string[],
  };
}

function surveyReducer_setSurveyStatistics(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    surveyStatistics: dispatch.payload as SurveyStatistics[],
  };
}

function surveyReducer_setTriggerFormSubmit(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function surveyReducer_setTriggerPreviewSurvey(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    triggerPreviewSurvey: dispatch.payload as boolean,
  };
}

function surveyReducer_setPreviewSurveyProps(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    previewSurveyProps: dispatch.payload as {
      surveyTitle: string;
      surveyDescription: string;
      surveyQuestions: SurveyQuestions[];
    },
  };
}

function surveyReducer_setPageInError(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function surveyReducer_setIsSubmitting(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function surveyReducer_setIsSuccessful(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

export { surveyReducer };
