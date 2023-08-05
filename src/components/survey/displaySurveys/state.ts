import {
  DisplaySurveysAction,
  DisplaySurveysDispatch,
  DisplaySurveysState,
} from './types';

const initialDisplaySurveysState: DisplaySurveysState = {
  responseData: null,
  surveysMap: new Map(),
  surveySubmissions: new Map(),
  currentSurveyId: '',
  response: '',

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const displaySurveysAction: DisplaySurveysAction = {
  setResponseData: 'setResponseData',
  setSurveysMap: 'setSurveysMap',
  setSurveySubmissions: 'setSurveySubmissions',
  setCurrentSurveyId: 'setCurrentSurveyId',
  setResponse: 'setResponse',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function displaySurveysReducer(
  state: DisplaySurveysState,
  action: DisplaySurveysDispatch
): DisplaySurveysState {
  switch (action.type) {
    case displaySurveysAction.setResponseData:
      return {
        ...state,
        responseData: action.payload,
      };
    case displaySurveysAction.setSurveysMap:
      return {
        ...state,
        surveysMap: action.payload,
      };
    case displaySurveysAction.setSurveySubmissions:
      return {
        ...state,
        surveySubmissions: action.payload,
      };
    case displaySurveysAction.setCurrentSurveyId:
      return {
        ...state,
        currentSurveyId: action.payload,
      };
    case displaySurveysAction.setResponse: {
      const {
        surveyResponse: { inputKind, question, response, responseKind },
        surveyId,
        surveyTitle,
      } = action.payload;

      const clonedSurveySubmissions = new Map(state.surveySubmissions);

      // if the surveyId is not in the map, create a new surveySubmission
      const surveySubmission = clonedSurveySubmissions.get(surveyId) ?? {
        surveyId,
        surveyTitle,
        surveyResponses: [
          {
            question,
            responseKind,
            inputKind,
            response,
          },
        ],
      };

      // find the index of the question in the surveyResponses array
      const surveyResponses = surveySubmission.surveyResponses.findIndex(
        (surveyResponse) => surveyResponse.question === question
      );
      // if the question is not found, add it to the end of the array (its a new response)
      if (surveyResponses === -1) {
        surveySubmission.surveyResponses.push({
          question,
          responseKind,
          inputKind,
          response,
        });
      }
      // if the question is found, update the response
      else {
        surveySubmission.surveyResponses[surveyResponses] = {
          question,
          responseKind,
          inputKind,
          response,
        };
      }
      clonedSurveySubmissions.set(surveyId, surveySubmission);

      return {
        ...state,
        surveySubmissions: clonedSurveySubmissions,
      };
    }

    case displaySurveysAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case displaySurveysAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case displaySurveysAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displaySurveysAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displaySurveysAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displaySurveysAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displaySurveysAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displaySurveysAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  displaySurveysAction,
  displaySurveysReducer,
  initialDisplaySurveysState,
};
