import { SetStepsInErrorPayload } from '../../../types';
import { DescriptionObjectsArray } from '../../wrappers';
import { SurveyQuestions } from '../surveyBuilder/types';
type PreviewSurveyProps = {
  surveyTitle: string;
  surveyDescription: string;
  surveyQuestions: SurveyQuestions[];
  closePreviewSurveyModal: () => void;
};

type PreviewSurveyState = {
  surveyResponsesMap: Map<string, string | string[] | number>; // Map<question, response>
  questionsResponseInputMap: Map<string, string>; // Map<question, responseInput>
  questionsResponseDataOptionsMap: Map<string, string[]>; // Map<question, responseDataOptions>
  genericProps: {
    question: string;
    rating: number;
  }; // for rating

  stepperDescriptionsArray: DescriptionObjectsArray;
  currentStepperPosition: number;
  stepsInError: Set<number>;
};

type PreviewSurveyAction = {
  setSurveyResponsesMap: 'setSurveyResponsesMap';
  setQuestionsResponseInputMap: 'setQuestionsResponseInputMap';
  setQuestionsResponseDataOptionsMap: 'setQuestionsResponseDataOptionsMap';
  setGenericProps: 'setGenericProps'; // for rating

  setStepperDescriptionsArray: 'setStepperDescriptionsArray';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';
};

type PreviewSurveyDispatch =
  | {
      type: PreviewSurveyAction['setSurveyResponsesMap'];
      payload: {
        question: string;
        response: string | string[] | number;
      };
    }
  | {
      type: PreviewSurveyAction['setQuestionsResponseInputMap'];
      payload: Map<string, string>;
    }
  | {
      type: PreviewSurveyAction['setQuestionsResponseDataOptionsMap'];
      payload: Map<string, string[]>;
    }
  | {
      type: PreviewSurveyAction['setGenericProps'];
      payload: {
        question: string;
        rating: number;
      };
    }
  | {
      type: PreviewSurveyAction['setStepperDescriptionsArray'];
      payload: DescriptionObjectsArray;
    }
  | {
      type: PreviewSurveyAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: PreviewSurveyAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type PreviewSurveyReducer = (
  state: PreviewSurveyState,
  action: PreviewSurveyDispatch
) => PreviewSurveyState;

export type {
  PreviewSurveyAction,
  PreviewSurveyDispatch,
  PreviewSurveyProps,
  PreviewSurveyReducer,
  PreviewSurveyState,
};
