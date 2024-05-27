import { PROPERTY_DESCRIPTOR } from "../../../constants/data";
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

const surveyReducers = new Map<
  SurveyAction[keyof SurveyAction],
  (state: SurveyState, dispatch: SurveyDispatch) => SurveyState
>([
  [surveyAction.addQuestion, surveyReducer_addQuestion],
  [surveyAction.addResponseOption, surveyReducer_addResponseOption],
  [surveyAction.addStepperChild, surveyReducer_addStepperChild],
  [surveyAction.addStepperPage, surveyReducer_addStepperPage],
  [
    surveyAction.deleteAllResponseOptionsForQuestion,
    surveyReducer_deleteAllResponseOptionsForQuestion,
  ],
  [surveyAction.deleteQuestion, surveyReducer_deleteQuestion],
  [surveyAction.deleteResponseOption, surveyReducer_deleteResponseOption],
  [surveyAction.insertResponseOption, surveyReducer_insertResponseOption],
  [surveyAction.setExpiryDate, surveyReducer_setExpiryDate],
  [surveyAction.setIsSubmitting, surveyReducer_setIsSubmitting],
  [surveyAction.setIsSuccessful, surveyReducer_setIsSuccessful],
  [surveyAction.setPageInError, surveyReducer_setPageInError],
  [surveyAction.setPreviewSurveyProps, surveyReducer_setPreviewSurveyProps],
  [surveyAction.setQuestions, surveyReducer_setQuestions],
  [surveyAction.setResponseOptions, surveyReducer_setResponseOptions],
  [surveyAction.setResponseInputs, surveyReducer_setResponseInputs],
  [surveyAction.setResponseKinds, surveyReducer_setResponseKinds],
  [surveyAction.setSurveyDescription, surveyReducer_setSurveyDescription],
  [surveyAction.setSurveyRecipients, surveyReducer_setSurveyRecipients],
  [surveyAction.setSurveyStatistics, surveyReducer_setSurveyStatistics],
  [surveyAction.setSurveyTitle, surveyReducer_setSurveyTitle],
  [surveyAction.setTriggerFormSubmit, surveyReducer_setTriggerFormSubmit],
  [surveyAction.setTriggerPreviewSurvey, surveyReducer_setTriggerPreviewSurvey],
  [surveyAction.slideResponseOptionDown, surveyReducer_slideResponseOptionDown],
  [surveyAction.slideResponseOptionUp, surveyReducer_slideResponseOptionUp],
]);

function surveyReducer_addQuestion(
  state: SurveyState,
  _dispatch: SurveyDispatch
): SurveyState {
  return {
    ...state,
    questions: [...state.questions, ""],
    responseKinds: [...state.responseKinds, "chooseAny"],
    responseInputs: [...state.responseInputs, "checkbox"],
    responseOptions: [...state.responseOptions, [""]],
  };
}

function surveyReducer_addResponseOption(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const [questionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[questionIndex].push("");

  console.group("surveyReducer_addResponseOption");
  console.log("questionIndex", questionIndex);
  console.log("responseOptions[questionIndex]", responseOptions[questionIndex]);
  console.groupEnd();

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_addStepperChild(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { parentIndex, value } = dispatch.payload as {
  //   parentIndex: number;
  //   value: StepperChild[];
  // };
  // const stepperPages = [...state.stepperPages];
  // stepperPages[parentIndex].children = value;

  // console.group("surveyReducer_addStepperChild");
  // console.log("parentIndex", parentIndex);
  // console.log("value", value);
  // console.log("stepperPages[parentIndex].children", stepperPages[parentIndex].children);
  // console.groupEnd();

  // return {
  //   ...state,
  //   stepperPages,
  // };

  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: StepperChild };

  const stepperPages = structuredClone(state.stepperPages);
  stepperPages[pageIndex].children.push(value);

  console.group("surveyReducer_addStepperChild");
  console.log("pageIndex", pageIndex);
  console.log("value", value);
  console.log("stepperPages[pageIndex].children", stepperPages[pageIndex].children);
  console.groupEnd();

  return {
    ...state,
    stepperPages,
  };
}

function surveyReducer_addStepperPage(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { parentIndex, payload } = dispatch.payload as {
  //   parentIndex: number;
  //   payload: StepperPage;
  // };
  // const first = state.stepperPages.slice(0, parentIndex);
  // const last = state.stepperPages.slice(parentIndex);

  // return {
  //   ...state,
  //   stepperPages: [...first, payload, ...last],
  // };
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: StepperPage };
  const stepperPages = structuredClone(state.stepperPages);
  const first = stepperPages.slice(0, pageIndex);
  const last = stepperPages.slice(pageIndex);

  console.group("surveyReducer_addStepperPage");
  console.log("pageIndex", pageIndex);
  console.log("value", value);
  console.log("first", first);
  console.log("last", last);
  console.groupEnd();

  return {
    ...state,
    stepperPages: [...first, value, ...last],
  };
}

function surveyReducer_deleteAllResponseOptionsForQuestion(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const index = dispatch.payload as number;
  // const responseOptions = [...state.responseOptions];
  // responseOptions[index] = [];

  // return {
  //   ...state,
  //   responseOptions,
  // };
  const [pageIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[pageIndex] = [];

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_deleteQuestion(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const index = dispatch.payload as number;
  // const questions = [...state.questions];
  // questions.splice(index, 1);

  // const responseKinds = [...state.responseKinds];
  // responseKinds.splice(index, 1);

  // const responseInputs = [...state.responseInputs];
  // responseInputs.splice(index, 1);

  // const responseOptions = [...state.responseOptions];
  // responseOptions.splice(index, 1);

  // return {
  //   ...state,
  //   questions,
  //   responseKinds,
  //   responseInputs,
  //   responseOptions,
  // };
  const [pageIndex] = dispatch.payload as number[];
  const questions = structuredClone(state.questions);
  questions.splice(pageIndex, 1);

  const responseKinds = structuredClone(state.responseKinds);
  responseKinds.splice(pageIndex, 1);

  const responseInputs = structuredClone(state.responseInputs);
  responseInputs.splice(pageIndex, 1);

  const responseOptions = structuredClone(state.responseOptions);
  responseOptions.splice(pageIndex, 1);

  return {
    ...state,
    questions,
    responseKinds,
    responseInputs,
    responseOptions,
  };
}

function surveyReducer_deleteResponseOption(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { questionIndex, optionsIndex } = dispatch.payload as {
  //   questionIndex: number;
  //   optionsIndex: number;
  // };
  // const responseOptions = [...state.responseOptions];
  // responseOptions[questionIndex].splice(optionsIndex, 1);

  // return {
  //   ...state,
  //   responseOptions,
  // };

  const [pageIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[pageIndex].splice(optionIndex, 1);

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_insertResponseOption(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const [pageIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[pageIndex].splice(optionIndex, 0, "");

  return {
    ...state,
    responseOptions,
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
  // const { index, payload } = dispatch.payload as {
  //   index: number;
  //   payload: string;
  // };
  // const questions = [...state.questions];
  // questions[index] = payload;

  // return {
  //   ...state,
  //   questions,
  // };
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as {
    dynamicIndexes: number[];
    value: string;
  };

  const questions = structuredClone(state.questions);
  questions[pageIndex] = value;

  return {
    ...state,
    questions,
  };
}

function surveyReducer_setResponseOptions(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { inputIndex, parentIndex, value } = dispatch.payload as {
  //   parentIndex: number;
  //   inputIndex: number;
  //   value: string;
  // };
  // const responseOptions = [...state.responseOptions];
  // const prevValue = responseOptions[parentIndex][inputIndex];
  // Array.isArray(prevValue)
  //   ? prevValue.push(value)
  //   : (responseOptions[parentIndex][inputIndex] = value);

  // console.group("surveyReducer_setResponseOptions");
  // console.log("parentIndex", parentIndex);
  // console.log("inputIndex", inputIndex);
  // console.log("value", value);
  // console.groupEnd();

  // return {
  //   ...state,
  //   responseOptions,
  // };

  const {
    dynamicIndexes: [questionIndex, optionIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: string };

  console.group("surveyReducer_setResponseOptions");
  console.log("questionIndex", questionIndex);
  console.log("optionIndex", optionIndex);
  console.log("value", value);
  console.groupEnd();

  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[questionIndex][optionIndex] = value;

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_setResponseKinds(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { index, payload } = dispatch.payload as {
  //   index: number;
  //   payload: SurveyResponseKind;
  // };
  // const responseKinds = [...state.responseKinds];
  // responseKinds[index] = payload;

  // return {
  //   ...state,
  //   responseKinds,
  // };
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as {
    dynamicIndexes: number[];
    value: SurveyResponseKind;
  };
  const responseKinds = structuredClone(state.responseKinds);
  responseKinds[pageIndex] = value;

  return {
    ...state,
    responseKinds,
  };
}

function surveyReducer_setResponseInputs(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  // const { index, payload } = dispatch.payload as {
  //   index: number;
  //   payload: SurveyResponseInput;
  // };
  // const responseInputs = [...state.responseInputs];
  // responseInputs[index] = payload;

  // return {
  //   ...state,
  //   responseInputs,
  // };
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: SurveyResponseInput };
  const responseInputs = structuredClone(state.responseInputs);
  responseInputs[pageIndex] = value;

  return {
    ...state,
    responseInputs,
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

function surveyReducer_slideResponseOptionDown(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const [pageIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  const option = responseOptions[pageIndex].splice(optionIndex, 1)[0];
  responseOptions[pageIndex].splice(optionIndex + 1, 0, option);

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_slideResponseOptionUp(
  state: SurveyState,
  dispatch: SurveyDispatch
): SurveyState {
  const [pageIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  const option = responseOptions[pageIndex].splice(optionIndex, 1)[0];
  responseOptions[pageIndex].splice(optionIndex - 1, 0, option);

  return {
    ...state,
    responseOptions,
  };
}

export { surveyReducer };
