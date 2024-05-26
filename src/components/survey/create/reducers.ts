import { SetPageInErrorPayload, StepperPage } from "../../../types";
import {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from "../types";
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
  [surveyAction.addQuestion, surveyReducer_addQuestion],
  [surveyAction.setExpiryDate, surveyReducer_setExpiryDate],
  [surveyAction.setIsSubmitting, surveyReducer_setIsSubmitting],
  [surveyAction.setIsSuccessful, surveyReducer_setIsSuccessful],
  [surveyAction.setPageInError, surveyReducer_setPageInError],
  [surveyAction.setPreviewSurveyProps, surveyReducer_setPreviewSurveyProps],
  [surveyAction.setQuestions, surveyReducer_setQuestions],
  [surveyAction.setResponseInputHtml, surveyReducer_setResponseInputHtml],
  [surveyAction.setResponseKinds, surveyReducer_setResponseKinds],
  [surveyAction.setSurveyDescription, surveyReducer_setSurveyDescription],
  [surveyAction.setSurveyRecipients, surveyReducer_setSurveyRecipients],
  [surveyAction.setSurveyStatistics, surveyReducer_setSurveyStatistics],
  [surveyAction.setSurveyTitle, surveyReducer_setSurveyTitle],
  [surveyAction.setStepperPages, surveyReducer_setStepperPages],
  [surveyAction.setTriggerFormSubmit, surveyReducer_setTriggerFormSubmit],
  [surveyAction.setTriggerPreviewSurvey, surveyReducer_setTriggerPreviewSurvey],
]);

function surveyReducer_addQuestion(
  state: SurveyState,
  _dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    questions: [...state.questions, ""],
    responseKinds: [...state.responseKinds, "chooseAny"],
    responseInputHtml: [...state.responseInputHtml, "checkbox"],
    responseDataOptionsArray: [...state.responseDataOptionsArray, []],
  };
}

function surveyReducer_setStepperPages(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    stepperPages: dispatch.payload as StepperPage[],
  };
}

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
  const { index, payload } = dispatch.payload as {
    index: number;
    payload: string;
  };
  const questions = [...state.questions];
  questions[index] = payload;

  return {
    ...state,
    questions,
  };
}

function surveyReducer_setResponseKinds(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { index, payload } = dispatch.payload as {
    index: number;
    payload: SurveyResponseKind;
  };
  const responseKinds = [...state.responseKinds];
  responseKinds[index] = payload;

  return {
    ...state,
    responseKinds,
  };
}

function surveyReducer_setResponseInputHtml(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { index, payload } = dispatch.payload as {
    index: number;
    payload: SurveyResponseInput;
  };
  const responseInputHtml = [...state.responseInputHtml];
  responseInputHtml[index] = payload;

  return {
    ...state,
    responseInputHtml,
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
