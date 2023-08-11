import {
  PreviewSurveyAction,
  PreviewSurveyDispatch,
  PreviewSurveyState,
} from './types';

const initialPreviewSurveyState: PreviewSurveyState = {
  surveyResponsesMap: new Map(),
  questionsResponseInputMap: new Map(),
  questionsResponseDataOptionsMap: new Map(),

  stepperDescriptionsArray: [],
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isLoading: true,
  loadingMessage: 'Loading...',
};

const previewSurveyAction: PreviewSurveyAction = {
  setSurveyResponsesMap: 'setSurveyResponsesMap',
  setQuestionsResponseInputMap: 'setQuestionsResponseInputMap',
  setQuestionsResponseDataOptionsMap: 'setQuestionsResponseDataOptionsMap',

  setStepperDescriptionsArray: 'setStepperDescriptionsArray',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function previewSurveyReducer(
  state: PreviewSurveyState,
  action: PreviewSurveyDispatch
): PreviewSurveyState {
  switch (action.type) {
    case previewSurveyAction.setSurveyResponsesMap:
      return {
        ...state,
        surveyResponsesMap: action.payload,
      };
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
    case previewSurveyAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case previewSurveyAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case previewSurveyAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export { initialPreviewSurveyState, previewSurveyAction, previewSurveyReducer };
