import { QueryResponseData, SetStepsInErrorPayload } from "../../../types";
import { DescriptionObjectsArray } from "../../wrappers";
import { SurveyDocument, SurveyResponseKind } from "../types";
import { SurveyResponseInput } from "../types";

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
  responseData: SurveyDocument[];
  surveySubmissions: Map<string, SurveySubmission>;
  surveyToSubmit: SurveySubmission;

  uncompletedSurveys: SurveyDocument[];
  completedSurveys: SurveyDocument[];
  completedSurveyIds: Set<string>;

  stepperDescriptionsMap: Map<string, DescriptionObjectsArray>;
  currentStepperPositions: Map<string, number>;
  pagesInError: Map<string, Set<number>>;

  queryBuilderString: string;
  pageQueryString: string;
  newQueryFlag: boolean;
  totalDocuments: number;
  pages: number;

  triggerSurveyFetch: boolean;
  triggerSurveySubmission: boolean;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type DisplaySurveysAction = {
  setResponseData: "setResponseData";
  setSurveySubmissions: "setSurveySubmissions";
  setSurveyToSubmit: "setSurveyToSubmit";

  setUncompletedSurveys: "setUncompletedSurveys";
  setCompletedSurveys: "setCompletedSurveys";
  setCompletedSurveyIds: "setCompletedSurveyIds";

  setStepperDescriptionsMap: "setStepperDescriptionsMap";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setQueryBuilderString: "setQueryBuilderString";
  setPageQueryString: "setPageQueryString";
  setNewQueryFlag: "setNewQueryFlag";
  setTotalDocuments: "setTotalDocuments";
  setPages: "setPages";

  setTriggerSurveyFetch: "setTriggerSurveyFetch";
  setTriggerSurveySubmission: "setTriggerSurveySubmission";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type DisplaySurveysDispatch =
  | {
      type:
        | DisplaySurveysAction["setResponseData"]
        | DisplaySurveysAction["setUncompletedSurveys"]
        | DisplaySurveysAction["setCompletedSurveys"];
      payload: SurveyDocument[];
    }
  | {
      type: DisplaySurveysAction["setSurveySubmissions"];
      payload: SurveySubmissionPayload;
    }
  | {
      type: DisplaySurveysAction["setSurveyToSubmit"];
      payload: {
        surveyId: string;
      };
    }
  | {
      type: DisplaySurveysAction["setStepperDescriptionsMap"];
      payload: SurveyDocument[];
    }
  | {
      type: DisplaySurveysAction["setCompletedSurveyIds"];
      payload: Array<string>;
    }
  | {
      type:
        | DisplaySurveysAction["setQueryBuilderString"]
        | DisplaySurveysAction["setPageQueryString"]
        | DisplaySurveysAction["setSubmitMessage"]
        | DisplaySurveysAction["setSuccessMessage"]
        | DisplaySurveysAction["setLoadingMessage"];
      payload: string;
    }
  | {
      type:
        | DisplaySurveysAction["setNewQueryFlag"]
        | DisplaySurveysAction["setTriggerSurveyFetch"]
        | DisplaySurveysAction["setTriggerSurveySubmission"]
        | DisplaySurveysAction["setIsSubmitting"]
        | DisplaySurveysAction["setIsSuccessful"]
        | DisplaySurveysAction["setIsLoading"];
      payload: boolean;
    }
  | {
      type: DisplaySurveysAction["setTotalDocuments"] | DisplaySurveysAction["setPages"];
      payload: number;
    }
  | {
      type: DisplaySurveysAction["setCurrentStepperPosition"];
      payload: {
        id: string;
        currentStepperPosition: number;
      };
    }
  | {
      type: DisplaySurveysAction["setStepsInError"];
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
