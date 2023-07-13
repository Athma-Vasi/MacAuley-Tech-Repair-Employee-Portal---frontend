import {
  Action,
  ActionsOutreach,
  SetStepsInErrorPayload,
  UserRoles,
} from '../../types';

type SurveyRecipient =
  | 'all'
  | 'active'
  | 'inactive'
  | 'employees'
  | 'admins'
  | 'managers';

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

  expiryDate: string;
  isValidExpiryDate: boolean;
  isExpiryDateFocused: boolean;

  sendTo: SurveyRecipient;
  isAnonymous: boolean;

  questions: Array<SurveyQuestion>;
  areValidQuestions: Array<boolean>;
  areQuestionsFocused: Array<boolean>;
  isQuestionLengthExceeded: boolean;

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

  setExpiryDate: 'setExpiryDate';
  setIsValidExpiryDate: 'setIsValidExpiryDate';
  setIsExpiryDateFocused: 'setIsExpiryDateFocused';

  setSendTo: 'setSendTo';
  setIsAnonymous: 'setIsAnonymous';

  setQuestions: 'setQuestions';
  setAreValidQuestions: 'setAreValidQuestions';
  setAreQuestionsFocused: 'setAreQuestionsFocused';
  setIsQuestionLengthExceeded: 'setIsQuestionLengthExceeded';

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
        | SurveyBuilderAction['setIsValidExpiryDate']
        | SurveyBuilderAction['setIsExpiryDateFocused']
        | SurveyBuilderAction['setIsAnonymous']
        | SurveyBuilderAction['setIsQuestionLengthExceeded']
        | SurveyBuilderAction['setIsError']
        | SurveyBuilderAction['setIsSubmitting']
        | SurveyBuilderAction['setIsSuccessful']
        | SurveyBuilderAction['setIsLoading'];

      payload: boolean;
    }
  | {
      type: SurveyBuilderAction['setSendTo'];
      payload: SurveyRecipient;
    }
  | {
      type: SurveyBuilderAction['setQuestions'];
      payload: Array<SurveyQuestion>;
    }
  | {
      type:
        | SurveyBuilderAction['setAreValidQuestions']
        | SurveyBuilderAction['setAreQuestionsFocused'];
      payload: Array<boolean>;
    }
  | {
      type: SurveyBuilderAction['setCurrentStepperPosition'];

      payload: number;
    }
  | {
      type: SurveyBuilderAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
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
