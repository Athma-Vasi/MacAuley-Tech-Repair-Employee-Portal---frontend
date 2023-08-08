import { QueryResponseData, SetStepsInErrorPayload } from '../../../types';
import { DescriptionObjectsArray } from '../../wrappers';
import { SurveyBuilderDocument, SurveyResponseKind } from '../types';
import { SurveyResponseInput } from '../types';

type SurveyResponse = {
  question: string;
  responseKind: SurveyResponseKind;
  inputKind: SurveyResponseInput;
  response: string[] | string | number;
};

type SurveySubmission = {
  surveyId: string;
  surveyTitle: string;
  surveyResponses: SurveyResponse[];
};

type SurveySubmissionPayload = {
  surveyId: string;
  surveyTitle: string;
  surveyResponse: {
    question: string;
    responseKind: SurveyResponseKind;
    inputKind: SurveyResponseInput;
    response: string[] | string | number;
  };
};

type DisplaySurveysState = {
  responseData: SurveyBuilderDocument[];
  surveySubmissions: Map<string, SurveySubmission>;
  surveyToSubmit: SurveySubmission;

  uncompletedSurveys: SurveyBuilderDocument[];
  completedSurveys: SurveyBuilderDocument[];
  completedSurveyIds: Set<string>;

  stepperDescriptionsMap: Map<string, DescriptionObjectsArray>;
  currentStepperPositions: Map<string, number>;
  stepsInError: Map<string, Set<number>>;

  queryBuilderString: string;
  pageQueryString: string;
  newQueryFlag: boolean;
  totalDocuments: number;
  pages: number;

  triggerSurveySubmission: boolean;

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
  setSurveySubmissions: 'setSurveySubmissions';
  setSurveyToSubmit: 'setSurveyToSubmit';

  setUncompletedSurveys: 'setUncompletedSurveys';
  setCompletedSurveys: 'setCompletedSurveys';
  setCompletedSurveyIds: 'setCompletedSurveyIds';

  setStepperDescriptionsMap: 'setStepperDescriptionsMap';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';
  setNewQueryFlag: 'setNewQueryFlag';
  setTotalDocuments: 'setTotalDocuments';
  setPages: 'setPages';

  setTriggerSurveySubmission: 'setTriggerSurveySubmission';

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
      type:
        | DisplaySurveysAction['setResponseData']
        | DisplaySurveysAction['setUncompletedSurveys']
        | DisplaySurveysAction['setCompletedSurveys'];
      payload: SurveyBuilderDocument[];
    }
  | {
      type: DisplaySurveysAction['setSurveySubmissions'];
      payload: SurveySubmissionPayload;
    }
  | {
      type: DisplaySurveysAction['setSurveyToSubmit'];
      payload: {
        surveyId: string;
      };
    }
  | {
      type: DisplaySurveysAction['setStepperDescriptionsMap'];
      payload: SurveyBuilderDocument[];
    }
  | {
      type: DisplaySurveysAction['setCompletedSurveyIds'];
      payload: Array<string>;
    }
  | {
      type:
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
        | DisplaySurveysAction['setTriggerSurveySubmission']
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
      type: DisplaySurveysAction['setCurrentStepperPosition'];
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
  SurveySubmissionPayload,
  SurveyResponse,
  SurveySubmission,
};
