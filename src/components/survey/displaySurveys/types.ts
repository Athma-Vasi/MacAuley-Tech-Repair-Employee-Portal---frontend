import { QueryResponseData } from '../../../types';
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
  responseData: QueryResponseData<SurveyBuilderDocument> | null;
  surveysMap: Map<string, SurveyBuilderDocument>;
  surveySubmissions: Map<string, SurveySubmission>;
  currentSurveyId: string;
  response: string[] | string | number;

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
      payload: QueryResponseData<SurveyBuilderDocument> | null;
    }
  | {
      type: DisplaySurveysAction['setSurveysMap'];
      payload: Map<string, SurveyBuilderDocument>;
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
      type:
        | DisplaySurveysAction['setCurrentSurveyId']
        | DisplaySurveysAction['setErrorMessage']
        | DisplaySurveysAction['setSubmitMessage']
        | DisplaySurveysAction['setSuccessMessage']
        | DisplaySurveysAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | DisplaySurveysAction['setIsError']
        | DisplaySurveysAction['setIsSubmitting']
        | DisplaySurveysAction['setIsSuccessful']
        | DisplaySurveysAction['setIsLoading'];
      payload: boolean;
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
