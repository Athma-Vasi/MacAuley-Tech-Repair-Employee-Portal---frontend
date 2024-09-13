import type {
  SetPageInErrorPayload,
  StepperChild,
  StepperPage,
} from "../../../types";
import type {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from "../types";
import { type SurveyAction, surveyAction } from "./actions";
import type { SurveyDispatch, SurveyState } from "./types";

function surveyReducer(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
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
  _dispatch: SurveyDispatch,
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
  dispatch: SurveyDispatch,
): SurveyState {
  const [questionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[questionIndex].push("");

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_addStepperChild(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: StepperChild };

  const stepperPages = structuredClone(state.stepperPages);
  stepperPages[pageIndex].children.push(value);

  return {
    ...state,
    stepperPages,
  };
}

function surveyReducer_addStepperPage(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: StepperPage };
  const stepperPages = structuredClone(state.stepperPages);
  const first = stepperPages.slice(0, pageIndex);
  const last = stepperPages.slice(pageIndex);

  return {
    ...state,
    stepperPages: [...first, value, ...last],
  };
}

function surveyReducer_deleteAllResponseOptionsForQuestion(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
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
  dispatch: SurveyDispatch,
): SurveyState {
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
  dispatch: SurveyDispatch,
): SurveyState {
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
  dispatch: SurveyDispatch,
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
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    surveyTitle: dispatch.payload as string,
  };
}

function surveyReducer_setSurveyDescription(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    surveyDescription: dispatch.payload as string,
  };
}

function surveyReducer_setExpiryDate(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    expiryDate: dispatch.payload as string,
  };
}

function surveyReducer_setSurveyRecipients(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    surveyRecipients: dispatch.payload as SurveyRecipient,
  };
}

function surveyReducer_setQuestions(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
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
  dispatch: SurveyDispatch,
): SurveyState {
  const {
    dynamicIndexes: [questionIndex, optionIndex],
    value,
  } = dispatch.payload as { dynamicIndexes: number[]; value: string };

  const responseOptions = structuredClone(state.responseOptions);
  responseOptions[questionIndex][optionIndex] = value;

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_setResponseKinds(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
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
  dispatch: SurveyDispatch,
): SurveyState {
  const {
    dynamicIndexes: [pageIndex],
    value,
  } = dispatch.payload as {
    dynamicIndexes: number[];
    value: SurveyResponseInput;
  };
  const responseInputs = structuredClone(state.responseInputs);
  responseInputs[pageIndex] = value;

  return {
    ...state,
    responseInputs,
  };
}

function surveyReducer_setSurveyStatistics(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    surveyStatistics: dispatch.payload as SurveyStatistics[],
  };
}

function surveyReducer_setTriggerFormSubmit(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function surveyReducer_setTriggerPreviewSurvey(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    triggerPreviewSurvey: dispatch.payload as boolean,
  };
}

// function surveyReducer_setPreviewSurveyProps(
//   state: SurveyState,
//   dispatch: SurveyDispatch,
// ): SurveyState {
//   return {
//     ...state,
//     previewSurveyProps: dispatch.payload as {
//       surveyTitle: string;
//       surveyDescription: string;
//       surveyQuestions: SurveyQuestions[];
//     },
//   };
// }

function surveyReducer_setPageInError(
  state: SurveyState,
  dispatch: SurveyDispatch,
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
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function surveyReducer_setIsSuccessful(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function surveyReducer_slideResponseOptionDown(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  const [questionIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  const currentOption = responseOptions[questionIndex][optionIndex];
  const nextOption = responseOptions[questionIndex][optionIndex + 1];
  responseOptions[questionIndex][optionIndex] = nextOption;
  responseOptions[questionIndex][optionIndex + 1] = currentOption;

  return {
    ...state,
    responseOptions,
  };
}

function surveyReducer_slideResponseOptionUp(
  state: SurveyState,
  dispatch: SurveyDispatch,
): SurveyState {
  const [questionIndex, optionIndex] = dispatch.payload as number[];
  const responseOptions = structuredClone(state.responseOptions);
  const currentOption = responseOptions[questionIndex][optionIndex];
  const previousOption = responseOptions[questionIndex][optionIndex - 1];
  responseOptions[questionIndex][optionIndex] = previousOption;
  responseOptions[questionIndex][optionIndex - 1] = currentOption;

  return {
    ...state,
    responseOptions,
  };
}

export { surveyReducer };
