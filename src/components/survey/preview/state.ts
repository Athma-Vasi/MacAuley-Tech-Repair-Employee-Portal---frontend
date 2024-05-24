import { addFieldsToObject } from "../../../utils";
import {
  PreviewSurveyAction,
  PreviewSurveyDispatch,
  PreviewSurveyResponse,
  PreviewSurveyState,
} from "./types";

const initialPreviewSurveyState: PreviewSurveyState = {
  surveyQuestions: [],
  surveyResponsesArray: [],
  questionsResponseInputMap: new Map(),
  questionsResponseDataOptionsMap: new Map(),
  genericProps: {
    question: "",
    rating: 0,
  },

  stepperDescriptionsArray: [],
  currentStepperPosition: 0,
  pagesInError: new Set(),
};

const previewSurveyAction: PreviewSurveyAction = {
  setSurveyQuestions: "setSurveyQuestions",
  setSurveyResponsesArray: "setSurveyResponsesArray",
  setQuestionsResponseInputMap: "setQuestionsResponseInputMap",
  setQuestionsResponseDataOptionsMap: "setQuestionsResponseDataOptionsMap",
  setGenericProps: "setGenericProps",

  setStepperDescriptionsArray: "setStepperDescriptionsArray",
  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",
};

function previewSurveyReducer(
  state: PreviewSurveyState,
  action: PreviewSurveyDispatch
): PreviewSurveyState {
  switch (action.type) {
    case previewSurveyAction.setSurveyQuestions:
      return {
        ...state,
        surveyQuestions: action.payload,
      };

    case previewSurveyAction.setSurveyResponsesArray: {
      const { question, response } = action.payload;

      const surveyResponsesArray = structuredClone(state.surveyResponsesArray);

      // find the question location in surveyQuestions
      const questionIndex = state.surveyQuestions.findIndex(
        (q) => q?.question === question
      );

      // update the survey response at the same location
      const newResponse = addFieldsToObject({
        object: Object.create(null),
        fieldValuesTuples: [
          ["question", question],
          ["response", response],
        ],
      }) as PreviewSurveyResponse;

      surveyResponsesArray[questionIndex] = newResponse;

      return {
        ...state,
        surveyResponsesArray,
      };
    }
    case previewSurveyAction.setQuestionsResponseInputMap:
      return {
        ...state,
        questionsResponseInputMap: action.payload,
      };
    case previewSurveyAction.setQuestionsResponseDataOptionsMap:
      return {
        ...state,
        questionsResponseDataOptionsMap: action.payload,
      };

    case previewSurveyAction.setStepperDescriptionsArray:
      return {
        ...state,
        stepperDescriptionsArray: action.payload,
      };
    case previewSurveyAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };

    case previewSurveyAction.setGenericProps: {
      const { question, rating } = action.payload;

      // find the question in survey responses array
      const questionIndex = state.surveyQuestions.findIndex(
        (q) => q?.question === question
      );

      // update the survey response at the same location
      const surveyResponsesArray = structuredClone(state.surveyResponsesArray);
      const newResponse = addFieldsToObject({
        object: Object.create(null),
        fieldValuesTuples: [
          ["question", question],
          ["response", rating],
        ],
      }) as PreviewSurveyResponse;
      surveyResponsesArray[questionIndex] = newResponse;

      return {
        ...state,
        surveyResponsesArray,
        genericProps: {
          question,
          rating,
        },
      };
    }

    case previewSurveyAction.setStepsInError: {
      const { kind, step } = action.payload;
      const pagesInError = new Set(state.pagesInError);
      kind === "add" ? pagesInError.add(step) : pagesInError.delete(step);

      return {
        ...state,
        pagesInError,
      };
    }

    default:
      return state;
  }
}

export { initialPreviewSurveyState, previewSurveyAction, previewSurveyReducer };
