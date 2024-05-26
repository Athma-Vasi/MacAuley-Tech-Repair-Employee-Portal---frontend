import { SetPageInErrorPayload, StepperChild, StepperPage } from "../../../types";
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

/**
 * type SurveyAction = {
  addQuestion: "addQuestion";
  addStepperChilds: "addStepperChilds";
  addStepperPage: "addStepperPage";
  deleteAllResponseDataOptionsForQuestion: "deleteAllResponseDataOptionsForQuestion";
  deleteQuestion: "deleteQuestion";
  deleteResponseDataOption: "deleteResponseDataOption";
  setExpiryDate: "setExpiryDate";
  setIsSubmitting: "setIsSubmitting";
  setIsSuccessful: "setIsSuccessful";
  setPageInError: "setPageInError";
  setPreviewSurveyProps: "setPreviewSurveyProps";
  setQuestions: "setQuestions";
  setResponseDataOptions: "setResponseDataOptions";
  setResponseInputHtml: "setResponseInputHtml";
  setResponseKinds: "setResponseKinds";
  setSurveyDescription: "setSurveyDescription";
  setSurveyRecipients: "setSurveyRecipients";
  setSurveyStatistics: "setSurveyStatistics";
  setSurveyTitle: "setSurveyTitle";
  setTriggerFormSubmit: "setTriggerFormSubmit";
  setTriggerPreviewSurvey: "setTriggerPreviewSurvey";
};
 */

const surveyReducers = new Map<
  SurveyAction[keyof SurveyAction],
  (state: SurveyState, dispatch: SurveyDispatch) => SurveyState
>([
  [surveyAction.addQuestion, surveyReducer_addQuestion],
  [surveyAction.addStepperChilds, surveyReducer_addStepperChilds],
  [surveyAction.addStepperPage, surveyReducer_addStepperPage],
  [
    surveyAction.deleteAllResponseDataOptionsForQuestion,
    surveyReducer_deleteAllResponseDataOptionsForQuestion,
  ],
  [surveyAction.deleteQuestion, surveyReducer_deleteQuestion],
  [surveyAction.deleteResponseDataOption, surveyReducer_deleteResponseDataOption],
  [surveyAction.setExpiryDate, surveyReducer_setExpiryDate],
  [surveyAction.setIsSubmitting, surveyReducer_setIsSubmitting],
  [surveyAction.setIsSuccessful, surveyReducer_setIsSuccessful],
  [surveyAction.setPageInError, surveyReducer_setPageInError],
  [surveyAction.setPreviewSurveyProps, surveyReducer_setPreviewSurveyProps],
  [surveyAction.setQuestions, surveyReducer_setQuestions],
  [surveyAction.setResponseDataOptions, surveyReducer_setResponseDataOptions],
  [surveyAction.setResponseInputHtml, surveyReducer_setResponseInputHtml],
  [surveyAction.setResponseKinds, surveyReducer_setResponseKinds],
  [surveyAction.setSurveyDescription, surveyReducer_setSurveyDescription],
  [surveyAction.setSurveyRecipients, surveyReducer_setSurveyRecipients],
  [surveyAction.setSurveyStatistics, surveyReducer_setSurveyStatistics],
  [surveyAction.setSurveyTitle, surveyReducer_setSurveyTitle],
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

function surveyReducer_addStepperChilds(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { parentIndex, value } = dispatch.payload as {
    parentIndex: number;
    value: StepperChild[];
  };
  const stepperPages = [...state.stepperPages];
  stepperPages[parentIndex].children = value;

  return {
    ...state,
    stepperPages,
  };
}

function surveyReducer_addStepperPage(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { parentIndex, payload } = dispatch.payload as {
    parentIndex: number;
    payload: StepperPage;
  };
  const first = state.stepperPages.slice(0, parentIndex);
  const last = state.stepperPages.slice(parentIndex);

  return {
    ...state,
    stepperPages: [...first, payload, ...last],
  };
}

function surveyReducer_deleteAllResponseDataOptionsForQuestion(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const index = dispatch.payload as number;
  const responseDataOptionsArray = [...state.responseDataOptionsArray];
  responseDataOptionsArray[index] = [];

  return {
    ...state,
    responseDataOptionsArray,
  };
}

function surveyReducer_deleteQuestion(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const index = dispatch.payload as number;
  const questions = [...state.questions];
  questions.splice(index, 1);

  const responseKinds = [...state.responseKinds];
  responseKinds.splice(index, 1);

  const responseInputHtml = [...state.responseInputHtml];
  responseInputHtml.splice(index, 1);

  const responseDataOptionsArray = [...state.responseDataOptionsArray];
  responseDataOptionsArray.splice(index, 1);

  return {
    ...state,
    questions,
    responseKinds,
    responseInputHtml,
    responseDataOptionsArray,
  };
}

function surveyReducer_deleteResponseDataOption(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { questionIndex, optionsIndex } = dispatch.payload as {
    questionIndex: number;
    optionsIndex: number;
  };
  const responseDataOptionsArray = [...state.responseDataOptionsArray];
  responseDataOptionsArray[questionIndex].splice(optionsIndex, 1);

  return {
    ...state,
    responseDataOptionsArray,
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

function surveyReducer_setResponseDataOptions(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const { inputIndex, parentIndex, value } = dispatch.payload as {
    parentIndex: number;
    inputIndex: number;
    value: string;
  };
  const responseDataOptionsArray = [...state.responseDataOptionsArray];
  responseDataOptionsArray[parentIndex][inputIndex] = value;

  return {
    ...state,
    responseDataOptionsArray,
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
