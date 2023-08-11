import { SetStepsInErrorPayload } from '../../../types';
import { DescriptionObjectsArray } from '../../wrappers';
import { SurveyQuestions } from '../surveyBuilder/types';
type PreviewSurveyProps = {
  surveyTitle: string;
  surveyDescription: string;
  surveyQuestions: SurveyQuestions[];
};

/**
 * type SetSurveyQuestionsOutput = {
  question: string;
  responseKind: SurveyResponseKind;
  responseInput: SurveyResponseInput;
  responseDataOptions: string[] | [];
}[];
 */
type PreviewSurveyState = {
  surveyResponsesMap: Map<string, string | string[]>; // Map<question, response>
  questionsResponseInputMap: Map<string, string>; // Map<question, responseInput>
  questionsResponseDataOptionsMap: Map<string, string[]>; // Map<question, responseDataOptions>

  stepperDescriptionsArray: DescriptionObjectsArray;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isLoading: boolean;
  loadingMessage: string;
};

type PreviewSurveyAction = {
  setSurveyResponsesMap: 'setSurveyResponsesMap';
  setQuestionsResponseInputMap: 'setQuestionsResponseInputMap';
  setQuestionsResponseDataOptionsMap: 'setQuestionsResponseDataOptionsMap';

  setStepperDescriptionsArray: 'setStepperDescriptionsArray';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type PreviewSurveyDispatch =
  | {
      type: PreviewSurveyAction['setSurveyResponsesMap'];
      payload: Map<string, string | string[]>;
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
    }
  | {
      type: PreviewSurveyAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: PreviewSurveyAction['setLoadingMessage'];
      payload: string;
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
