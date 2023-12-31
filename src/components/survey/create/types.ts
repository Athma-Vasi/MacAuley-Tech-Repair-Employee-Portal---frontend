import { SetStepsInErrorPayload } from '../../../types';
import { DescriptionObjectsArray } from '../../wrappers';
import { PreviewSurveyProps } from '../preview/types';
import {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from '../types';

type SurveyQuestions = {
  question: string;
  responseKind: SurveyResponseKind;
  responseInput: SurveyResponseInput;
  responseDataOptions: string[] | [];
};

type SurveyBuilderState = {
  surveyTitle: string;
  isValidSurveyTitle: boolean;
  isSurveyTitleFocused: boolean;

  surveyDescription: string;
  isValidSurveyDescription: boolean;
  isSurveyDescriptionFocused: boolean;

  expiryDate: string;
  isValidExpiryDate: boolean;
  isExpiryDateFocused: boolean;

  surveyRecipients: SurveyRecipient;

  questions: Array<string>;
  areValidQuestions: Array<boolean>;
  areQuestionsFocused: Array<boolean>;
  isMaxQuestionsReached: boolean;

  responseKinds: Array<string>;
  responseInputHtml: Array<string>;

  responseDataOptionsArray: Array<string[]>;
  areResponseDataOptionsValid: Array<boolean[]>;
  areResponseDataOptionsFocused: Array<boolean[]>;
  isMaxResponseDataOptionsReached: Array<boolean>;

  surveyStatistics: SurveyStatistics[];

  triggerFormSubmit: boolean;
  submitButtonDisabled: boolean;
  triggerPreviewSurvey: boolean;
  previewSurveyProps: {
    surveyTitle: string;
    surveyDescription: string;
    surveyQuestions: SurveyQuestions[];
  };

  stepperDescriptionObjects: DescriptionObjectsArray;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type SurveyBuilderAction = {
  setSurveyTitle: 'setSurveyTitle';
  setIsValidSurveyTitle: 'setIsValidSurveyTitle';
  setIsSurveyTitleFocused: 'setIsSurveyTitleFocused';

  setSurveyDescription: 'setSurveyDescription';
  setIsValidSurveyDescription: 'setIsValidSurveyDescription';
  setIsSurveyDescriptionFocused: 'setIsSurveyDescriptionFocused';

  setExpiryDate: 'setExpiryDate';
  setIsValidExpiryDate: 'setIsValidExpiryDate';
  setIsExpiryDateFocused: 'setIsExpiryDateFocused';

  setSurveyRecipients: 'setSurveyRecipients';

  setQuestions: 'setQuestions';
  setAreValidQuestions: 'setAreValidQuestions';
  setAreQuestionsFocused: 'setAreQuestionsFocused';
  setIsMaxQuestionsReached: 'setIsMaxQuestionsReached';

  deleteQuestionGroup: 'deleteQuestionGroup';
  addNewQuestionGroup: 'addNewQuestionGroup';

  setResponseKinds: 'setResponseKinds';
  setResponseInputHtml: 'setResponseInputHtml';

  setResponseDataOptions: 'setResponseDataOptions';
  setAreResponseDataOptionsValid: 'setAreResponseDataOptionsValid';
  setAreResponseDataOptionsFocused: 'setAreResponseDataOptionsFocused';
  setIsMaxResponseDataOptionsReached: 'setIsMaxResponseDataOptionsReached';

  deleteResponseDataOption: 'deleteResponseDataOption';
  addNewResponseDataOption: 'addNewResponseDataOption';
  deleteAllResponseDataOptionsForQuestion: 'deleteAllResponseDataOptionsForQuestion';

  setSurveyStatistics: 'setSurveyStatistics';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setSubmitButtonDisabled: 'setSubmitButtonDisabled';
  setTriggerPreviewSurvey: 'setTriggerPreviewSurvey';
  setPreviewSurveyProps: 'setPreviewSurveyProps';

  updateStepperDescriptionObjects: 'updateStepperDescriptionObjects';
  createStepperDescriptionObjects: 'createStepperDescriptionObjects';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type SurveyBuilderDispatch =
  | {
      type:
        | SurveyBuilderAction['setSurveyTitle']
        | SurveyBuilderAction['setSurveyDescription']
        | SurveyBuilderAction['setExpiryDate']
        | SurveyBuilderAction['setSubmitMessage']
        | SurveyBuilderAction['setSuccessMessage']
        | SurveyBuilderAction['setLoadingMessage'];

      payload: string;
    }
  | {
      type:
        | SurveyBuilderAction['setIsValidSurveyTitle']
        | SurveyBuilderAction['setIsSurveyTitleFocused']
        | SurveyBuilderAction['setIsValidSurveyDescription']
        | SurveyBuilderAction['setIsSurveyDescriptionFocused']
        | SurveyBuilderAction['setIsValidExpiryDate']
        | SurveyBuilderAction['setIsExpiryDateFocused']
        | SurveyBuilderAction['setIsMaxQuestionsReached']
        | SurveyBuilderAction['setTriggerFormSubmit']
        | SurveyBuilderAction['setSubmitButtonDisabled']
        | SurveyBuilderAction['setTriggerPreviewSurvey']
        | SurveyBuilderAction['setIsSubmitting']
        | SurveyBuilderAction['setIsSuccessful']
        | SurveyBuilderAction['setIsLoading'];

      payload: boolean;
    }
  | {
      type: SurveyBuilderAction['setSurveyRecipients'];
      payload: SurveyRecipient;
    }
  | {
      type:
        | SurveyBuilderAction['setQuestions']
        | SurveyBuilderAction['setResponseKinds']
        | SurveyBuilderAction['setResponseInputHtml'];

      payload: {
        index: number;
        value: string;
      };
    }
  | {
      type: SurveyBuilderAction['setResponseDataOptions'];
      payload: {
        questionIdx: number;
        optionIdx: number;
        value: string;
      };
    }
  | {
      type: SurveyBuilderAction['setAreResponseDataOptionsValid'];
      payload: Array<boolean[]>;
    }
  | {
      type: SurveyBuilderAction['setAreResponseDataOptionsFocused'];
      payload: {
        questionIdx: number;
        optionIdx: number;
        value: boolean;
      };
    }
  | {
      type: SurveyBuilderAction['setAreValidQuestions'];
      payload: boolean[];
    }
  | {
      type:
        | SurveyBuilderAction['setAreQuestionsFocused']
        | SurveyBuilderAction['setIsMaxResponseDataOptionsReached'];
      payload: {
        index: number;
        value: boolean;
      };
    }
  | {
      type: SurveyBuilderAction['deleteResponseDataOption'];

      payload: {
        questionIdx: number;
        optionIdx: number;
      };
    }
  | {
      type:
        | SurveyBuilderAction['addNewResponseDataOption']
        | SurveyBuilderAction['deleteAllResponseDataOptionsForQuestion'];
      payload: {
        questionIdx: number;
      };
    }
  | {
      type:
        | SurveyBuilderAction['setCurrentStepperPosition']
        | SurveyBuilderAction['deleteQuestionGroup']
        | SurveyBuilderAction['addNewQuestionGroup'];
      payload: number;
    }
  | {
      type: SurveyBuilderAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | SurveyBuilderAction['createStepperDescriptionObjects']
        | SurveyBuilderAction['updateStepperDescriptionObjects'];
      payload: {
        index: number;
        value: {
          description: string;
          ariaLabel: string;
        };
      };
    }
  | {
      type: SurveyBuilderAction['setSurveyStatistics'];
      payload: SurveyStatistics[];
    }
  | {
      type: SurveyBuilderAction['setPreviewSurveyProps'];
      payload: Omit<PreviewSurveyProps, 'closePreviewSurveyModal'>;
    };

type SurveyBuilderReducer = (
  state: SurveyBuilderState,
  action: SurveyBuilderDispatch
) => SurveyBuilderState;

export type {
  SurveyBuilderAction,
  SurveyBuilderDispatch,
  SurveyBuilderReducer,
  SurveyBuilderState,
  SurveyQuestions,
};
