import { splitCamelCase } from '../../../utils';
import { DescriptionObjectsArray } from '../../wrappers';
import { SurveyBuilderDocument, SurveyQuestion } from '../types';
import {
  DisplaySurveysAction,
  DisplaySurveysDispatch,
  DisplaySurveysState,
  SurveyResponse,
} from './types';

const initialDisplaySurveysState: DisplaySurveysState = {
  responseData: [],
  surveySubmissions: new Map(),
  surveyToSubmit: {
    surveyId: '',
    surveyTitle: '',
    surveyResponses: [],
  },

  uncompletedSurveys: [],
  completedSurveys: [],
  completedSurveyIds: new Set(),

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
  setSurveySubmissions: 'setSurveySubmissions',
  setSurveyToSubmit: 'setSurveyToSubmit',

  setUncompletedSurveys: 'setUncompletedSurveys',
  setCompletedSurveys: 'setCompletedSurveys',
  setCompletedSurveyIds: 'setCompletedSurveyIds',

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

    case displaySurveysAction.setSurveySubmissions: {
      const {
        surveyResponse: { inputKind, question, response, responseKind },
        surveyId,
        surveyTitle,
      } = action.payload;

      const clonedSurveySubmissions = structuredClone(state.surveySubmissions);

      // find the index of the question in response data
      const surveyFromServer = state.responseData.find(
        (surveys) => surveys._id === surveyId
      ) as SurveyBuilderDocument;
      const responseData = surveyFromServer?.questions.findIndex(
        (surveyResponse: SurveyQuestion) =>
          surveyResponse?.question === question
      );

      // if the surveyId is not in the map, create a new surveySubmission
      let surveySubmission = clonedSurveySubmissions.get(surveyId);
      if (!surveySubmission) {
        // insert at the same index as in responseData
        const surveyResponses = [];
        surveyResponses[responseData] = {
          question,
          responseKind,
          inputKind,
          response,
        };

        surveySubmission = {
          surveyId,
          surveyTitle,
          surveyResponses,
        };
        clonedSurveySubmissions.set(surveyId, surveySubmission);

        return {
          ...state,
          surveySubmissions: clonedSurveySubmissions,
        };
      }

      // find the index of the question in the surveyResponses array
      const surveyResponses = surveySubmission.surveyResponses.findIndex(
        (surveyResponse: SurveyResponse) =>
          surveyResponse?.question === question
      );

      // if the question is not found, add it to surveyResponses (it is a new response) at the same index as in responseData
      if (surveyResponses === -1) {
        surveySubmission.surveyResponses[responseData] = {
          question,
          responseKind,
          inputKind,
          response,
        };
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

    case displaySurveysAction.setUncompletedSurveys:
      return {
        ...state,
        uncompletedSurveys: action.payload,
      };

    case displaySurveysAction.setCompletedSurveys:
      return {
        ...state,
        completedSurveys: action.payload,
      };

    case displaySurveysAction.setCompletedSurveyIds: {
      const completedSurveys = action.payload;

      return {
        ...state,
        completedSurveyIds: new Set([...completedSurveys]),
      };
    }

    case displaySurveysAction.setStepperDescriptionsMap: {
      const surveys = action.payload;
      // sets the stepper descriptions for each survey based on the response kind
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
      // find the steps in error for the survey
      const stepInError = clonedStepsInError.get(surveyId) ?? new Set<number>();
      // add or delete the step from the set
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
