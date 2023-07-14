import {
  Action,
  ActionsOutreach,
  SetStepsInErrorPayload,
  UserRoles,
} from '../../types';
import { DescriptionObjectsArray } from '../wrappers';

type SurveyRecipient =
  | 'All'
  | 'Active'
  | 'Inactive'
  | 'Employees'
  | 'Admins'
  | 'Managers';

type SurveyResponseKind = {
  chooseOne: 'trueFalse' | 'yesNo' | 'radio';
  chooseAny: 'checkbox' | 'dropdown';
  shortAnswer: 'shortAnswer';
  rating: 'scale' | 'emotion' | 'stars';
};

// The mapped type loops over each key in SurveyResponseKind and returns an object, ensuring that the value of `inputHtml` is constrained to the value of `kind` which is a key in the looped object.
type SurveyQuestion = {
  question: string;
  responseKind: {
    [Key in keyof SurveyResponseKind]: {
      kind: Key;
      inputHtml: SurveyResponseKind[Key];
      dataOptions: Array<string>;
    };
  }[keyof SurveyResponseKind];
  required: boolean;
};

type SurveyBuilderSchema = {
  creatorId: string;
  creatorUsername: string;
  creatorRole: UserRoles;
  action: Action;
  category: ActionsOutreach;

  surveyTitle: string;
  sendTo: SurveyRecipient;
  expiryDate: string;
  isAnonymous: boolean;
  questions: Array<SurveyQuestion>;
};

type SurveyBuilderDocument = SurveyBuilderSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  isAnonymous: boolean;

  questions: Array<string>;
  areValidQuestions: Array<boolean>;
  areQuestionsFocused: Array<boolean>;
  isMaxQuestionsReached: boolean;

  responseKinds: Array<string>;
  responseInputHtml: Array<string>;

  stepperDescriptionObjects: DescriptionObjectsArray;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
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
  setIsAnonymous: 'setIsAnonymous';

  setQuestions: 'setQuestions';
  setAreValidQuestions: 'setAreValidQuestions';
  setAreQuestionsFocused: 'setAreQuestionsFocused';
  setIsMaxQuestionsReached: 'setIsMaxQuestionsReached';

  deleteQuestionGroup: 'deleteQuestionGroup';
  addNewQuestionGroup: 'addNewQuestionGroup';

  setResponseKinds: 'setResponseKinds';
  setResponseInputHtml: 'setResponseInputHtml';

  setStepperDescriptionObjects: 'setStepperDescriptionObjects';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
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
        | SurveyBuilderAction['setErrorMessage']
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
        | SurveyBuilderAction['setIsAnonymous']
        | SurveyBuilderAction['setIsMaxQuestionsReached']
        | SurveyBuilderAction['setIsError']
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
      type: SurveyBuilderAction['setAreValidQuestions'];
      payload: boolean[];
    }
  | {
      type: SurveyBuilderAction['setAreQuestionsFocused'];
      payload: {
        index: number;
        value: boolean;
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
      type: SurveyBuilderAction['setStepperDescriptionObjects'];
      payload: {
        description: string;
        ariaLabel: string;
      };
    };

type SurveyBuilderReducer = (
  state: SurveyBuilderState,
  action: SurveyBuilderDispatch
) => SurveyBuilderState;

export type {
  SurveyBuilderAction,
  SurveyBuilderDispatch,
  SurveyBuilderDocument,
  SurveyBuilderReducer,
  SurveyBuilderSchema,
  SurveyBuilderState,
  SurveyQuestion,
  SurveyRecipient,
  SurveyResponseKind,
};
