import { QueryResponseData, SetStepsInErrorPayload } from '../../../types';
import { DescriptionObjectsArray } from '../../wrappers';
import { SurveyBuilderDocument, SurveyResponseKind } from '../types';
import { SurveyResponseInput } from '../types';

type SurveySubmission = {
  surveyId: string;
  surveyTitle: string;
  surveyResponses: {
    question: string;
    responseKind: SurveyResponseKind;
    inputKind: SurveyResponseInput;
    response: string[] | string | number;
  }[];
};

type DisplaySurveysState = {
  responseData: SurveyBuilderDocument[];
  surveysMap: Map<string, SurveyBuilderDocument>;
  surveySubmissions: Map<string, SurveySubmission>;
  currentSurveyId: string;
  response: string[] | string | number;

  stepperDescriptionsMap: Map<string, DescriptionObjectsArray>;
  currentStepperPositions: Map<string, number>;
  stepsInError: Map<string, Set<number>>;

  queryBuilderString: string;
  pageQueryString: string;
  newQueryFlag: boolean;
  totalDocuments: number;
  pages: number;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type DisplaySurveysAction = {
  setResponseData: 'setResponseData';
  setSurveysMap: 'setSurveysMap';
  setSurveySubmissions: 'setSurveySubmissions';
  setCurrentSurveyId: 'setCurrentSurveyId';
  setResponse: 'setResponse';

  setStepperDescriptionsMap: 'setStepperDescriptionsMap';
  setCurrentStepperPositions: 'setCurrentStepperPositions';
  setStepsInError: 'setStepsInError';

  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';
  setNewQueryFlag: 'setNewQueryFlag';
  setTotalDocuments: 'setTotalDocuments';
  setPages: 'setPages';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type DisplaySurveysDispatch =
  | {
      type: DisplaySurveysAction['setResponseData'];
      payload: SurveyBuilderDocument[];
    }
  | {
      type: DisplaySurveysAction['setSurveysMap'];
      payload: SurveyBuilderDocument[];
    }
  | {
      type: DisplaySurveysAction['setSurveySubmissions'];
      payload: Map<string, SurveySubmission>;
    }
  | {
      type: DisplaySurveysAction['setResponse'];
      payload: {
        surveyId: string;
        surveyTitle: string;
        surveyResponse: {
          question: string;
          responseKind: SurveyResponseKind;
          inputKind: SurveyResponseInput;
          response: string[] | string | number;
        };
      };
    }
  | {
      type: DisplaySurveysAction['setStepperDescriptionsMap'];
      payload: SurveyBuilderDocument[];
    }
  | {
      type:
        | DisplaySurveysAction['setCurrentSurveyId']
        | DisplaySurveysAction['setQueryBuilderString']
        | DisplaySurveysAction['setPageQueryString']
        | DisplaySurveysAction['setErrorMessage']
        | DisplaySurveysAction['setSubmitMessage']
        | DisplaySurveysAction['setSuccessMessage']
        | DisplaySurveysAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | DisplaySurveysAction['setNewQueryFlag']
        | DisplaySurveysAction['setIsError']
        | DisplaySurveysAction['setIsSubmitting']
        | DisplaySurveysAction['setIsSuccessful']
        | DisplaySurveysAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | DisplaySurveysAction['setTotalDocuments']
        | DisplaySurveysAction['setPages'];
      payload: number;
    }
  | {
      type: DisplaySurveysAction['setCurrentStepperPositions'];
      payload: {
        id: string;
        currentStepperPosition: number;
      };
    }
  | {
      type: DisplaySurveysAction['setStepsInError'];
      payload: {
        surveyId: string;
        stepInError: SetStepsInErrorPayload;
      };
    };

type DisplaySurveysReducer = (
  state: DisplaySurveysState,
  action: DisplaySurveysDispatch
) => DisplaySurveysState;

export type {
  DisplaySurveysAction,
  DisplaySurveysDispatch,
  DisplaySurveysReducer,
  DisplaySurveysState,
  SurveySubmission,
};
