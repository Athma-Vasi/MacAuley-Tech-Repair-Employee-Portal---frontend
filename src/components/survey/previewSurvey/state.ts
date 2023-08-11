import {
  PreviewSurveyAction,
  PreviewSurveyDispatch,
  PreviewSurveyState,
} from './types';

const initialPreviewSurveyState: PreviewSurveyState = {
  surveyResponsesMap: new Map(),
  questionsResponseInputMap: new Map(),
  questionsResponseDataOptionsMap: new Map(),
  genericProps: {
    question: '',
    rating: 0,
  },

  stepperDescriptionsArray: [],
  currentStepperPosition: 0,
  stepsInError: new Set(),
};

const previewSurveyAction: PreviewSurveyAction = {
  setSurveyResponsesMap: 'setSurveyResponsesMap',
  setQuestionsResponseInputMap: 'setQuestionsResponseInputMap',
  setQuestionsResponseDataOptionsMap: 'setQuestionsResponseDataOptionsMap',
  setGenericProps: 'setGenericProps',

  setStepperDescriptionsArray: 'setStepperDescriptionsArray',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',
};

function previewSurveyReducer(
  state: PreviewSurveyState,
  action: PreviewSurveyDispatch
): PreviewSurveyState {
  switch (action.type) {
    case previewSurveyAction.setSurveyResponsesMap: {
      const { question, response } = action.payload;

      const surveyResponsesMap = new Map(state.surveyResponsesMap);
      surveyResponsesMap.set(question, response);

      return {
        ...state,
        surveyResponsesMap,
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

      // find the question in surveyresponses map and update it
      const surveyResponsesMap = new Map(state.surveyResponsesMap);
      surveyResponsesMap.set(question, rating);

      return {
        ...state,
        surveyResponsesMap,
        genericProps: {
          question,
          rating,
        },
      };
    }

    case previewSurveyAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    default:
      return state;
  }
}

export { initialPreviewSurveyState, previewSurveyAction, previewSurveyReducer };
