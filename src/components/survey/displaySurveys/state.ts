import { splitCamelCase } from '../../../utils';
import { DescriptionObjectsArray } from '../../wrappers';
import {
  DisplaySurveysAction,
  DisplaySurveysDispatch,
  DisplaySurveysState,
} from './types';

const initialDisplaySurveysState: DisplaySurveysState = {
  responseData: [],
  surveysMap: new Map(),
  surveySubmissions: new Map(),
  surveyToSubmit: {
    surveyId: '',
    surveyTitle: '',
    surveyResponses: [],
  },
  currentSurveyId: '',

  response: '',

  stepperDescriptionsMap: new Map(),
  currentStepperPositions: new Map(),
  stepsInError: new Map(),

  queryBuilderString: '?',
  pageQueryString: '',
  newQueryFlag: false,
  totalDocuments: 0,
  pages: 0,

  triggerSurveySubmission: false,

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: true,
  loadingMessage: '',
};

const displaySurveysAction: DisplaySurveysAction = {
  setResponseData: 'setResponseData',
  setSurveysMap: 'setSurveysMap',
  setSurveySubmissions: 'setSurveySubmissions',
  setSurveyToSubmit: 'setSurveyToSubmit',
  setCurrentSurveyId: 'setCurrentSurveyId',

  setResponse: 'setResponse',

  setStepperDescriptionsMap: 'setStepperDescriptionsMap',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',
  setNewQueryFlag: 'setNewQueryFlag',
  setTotalDocuments: 'setTotalDocuments',
  setPages: 'setPages',

  setTriggerSurveySubmission: 'setTriggerSurveySubmission',

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
    case displaySurveysAction.setSurveysMap: {
      const surveys = action.payload;

      const surveysMap = surveys.reduce((acc, survey) => {
        acc.set(survey._id, survey);

        return acc;
      }, new Map());

      return {
        ...state,
        surveysMap: surveysMap,
      };
    }

    case displaySurveysAction.setSurveySubmissions:
      return {
        ...state,
        surveySubmissions: action.payload,
      };

    case displaySurveysAction.setSurveyToSubmit: {
      const { surveyId } = action.payload;
      const surveySubmissions = new Map(state.surveySubmissions);

      const surveySubmission = surveySubmissions.get(surveyId) ?? {
        surveyId,
        surveyTitle: '',
        surveyResponses: [],
      };

      return {
        ...state,
        surveyToSubmit: surveySubmission,
      };
    }

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
      // if the question is not found, add it to surveyResponses (it is a new response)
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

    case displaySurveysAction.setStepperDescriptionsMap: {
      const surveys = action.payload;

      const stepperDescriptionsMap = surveys.reduce(
        (acc: Map<string, DescriptionObjectsArray>, survey) => {
          const descriptionObjectsArray = survey.questions.map(
            ({ question, responseKind }) => {
              return {
                ariaLabel: question,
                description: splitCamelCase(responseKind),
              };
            }
          );

          acc.set(survey._id, descriptionObjectsArray);

          return acc;
        },
        new Map()
      );

      return {
        ...state,
        stepperDescriptionsMap,
      };
    }
    case displaySurveysAction.setCurrentStepperPosition: {
      const { id, currentStepperPosition } = action.payload;
      const clonedCurrentStepperPositions = new Map(
        state.currentStepperPositions
      );
      clonedCurrentStepperPositions.set(id, currentStepperPosition);

      return {
        ...state,
        currentStepperPositions: clonedCurrentStepperPositions,
      };
    }
    case displaySurveysAction.setStepsInError: {
      const {
        surveyId,
        stepInError: { kind, step },
      } = action.payload;

      const clonedStepsInError = structuredClone(state.stepsInError);
      const stepInError = clonedStepsInError.get(surveyId) ?? new Set<number>();
      kind === 'add' ? stepInError.add(step) : stepInError.delete(step);
      clonedStepsInError.set(surveyId, stepInError);

      return {
        ...state,
        stepsInError: clonedStepsInError,
      };
    }

    case displaySurveysAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displaySurveysAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };
    case displaySurveysAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displaySurveysAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };
    case displaySurveysAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };

    case displaySurveysAction.setTriggerSurveySubmission:
      return {
        ...state,
        triggerSurveySubmission: action.payload,
      };

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
