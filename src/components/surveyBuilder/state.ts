import {
  SurveyBuilderAction,
  SurveyBuilderDispatch,
  SurveyBuilderState,
} from './types';

const initialSurveyBuilderState: SurveyBuilderState = {
  surveyTitle: '',
  isValidSurveyTitle: false,
  isSurveyTitleFocused: false,

  expiryDate: '',
  isValidExpiryDate: false,
  isExpiryDateFocused: false,

  sendTo: 'all',
  isAnonymous: false,

  questions: [''],
  areValidQuestions: [false],
  areQuestionsFocused: [false],
  isQuestionLengthExceeded: [false],

  responseKinds: ['chooseOne'],
  responseInputHtml: ['trueFalse'],
  responseDataOptions: [[]],

  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const surveyBuilderAction: SurveyBuilderAction = {
  setSurveyTitle: 'setSurveyTitle',
  setIsValidSurveyTitle: 'setIsValidSurveyTitle',
  setIsSurveyTitleFocused: 'setIsSurveyTitleFocused',

  setExpiryDate: 'setExpiryDate',
  setIsValidExpiryDate: 'setIsValidExpiryDate',
  setIsExpiryDateFocused: 'setIsExpiryDateFocused',

  setSendTo: 'setSendTo',
  setIsAnonymous: 'setIsAnonymous',

  setQuestions: 'setQuestions',
  setAreValidQuestions: 'setAreValidQuestions',
  setAreQuestionsFocused: 'setAreQuestionsFocused',
  setIsQuestionLengthExceeded: 'setIsQuestionLengthExceeded',

  deleteQuestionGroup: 'deleteQuestionGroup',
  addNewQuestionGroup: 'addNewQuestionGroup',

  setResponseKinds: 'setResponseKinds',
  setResponseInputHtml: 'setResponseInputHtml',
  setResponseDataOptions: 'setResponseDataOptions',

  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function surveyBuilderReducer(
  state: SurveyBuilderState,
  action: SurveyBuilderDispatch
): SurveyBuilderState {
  switch (action.type) {
    case surveyBuilderAction.setSurveyTitle:
      return {
        ...state,
        surveyTitle: action.payload,
      };
    case surveyBuilderAction.setIsValidSurveyTitle:
      return {
        ...state,
        isValidSurveyTitle: action.payload,
      };
    case surveyBuilderAction.setIsSurveyTitleFocused:
      return {
        ...state,
        isSurveyTitleFocused: action.payload,
      };
    case surveyBuilderAction.setExpiryDate:
      return {
        ...state,
        expiryDate: action.payload,
      };
    case surveyBuilderAction.setIsValidExpiryDate:
      return {
        ...state,
        isValidExpiryDate: action.payload,
      };
    case surveyBuilderAction.setIsExpiryDateFocused:
      return {
        ...state,
        isExpiryDateFocused: action.payload,
      };
    case surveyBuilderAction.setSendTo:
      return {
        ...state,
        sendTo: action.payload,
      };
    case surveyBuilderAction.setIsAnonymous:
      return {
        ...state,
        isAnonymous: action.payload,
      };

    case surveyBuilderAction.setQuestions: {
      const { index, value } = action.payload;

      const questions = [...state.questions];
      if (index >= questions.length) {
        questions.push(value);
      } else {
        questions[index] = value;
      }

      return {
        ...state,
        questions,
      };
    }

    case surveyBuilderAction.setAreValidQuestions: {
      // const { index, value } = action.payload;
      // const areValidQuestions = [...state.areValidQuestions];
      // if (index >= areValidQuestions.length) {
      //   areValidQuestions.push(value);
      // } else {
      //   areValidQuestions[index] = value;
      // }

      // return {
      //   ...state,
      //   areValidQuestions,
      // };

      return {
        ...state,
        areValidQuestions: action.payload,
      };
    }

    case surveyBuilderAction.setAreQuestionsFocused: {
      const { index, value } = action.payload;
      const areQuestionsFocused = [...state.areQuestionsFocused];
      if (index >= areQuestionsFocused.length) {
        areQuestionsFocused.push(value);
      } else {
        areQuestionsFocused[index] = value;
      }

      return {
        ...state,
        areQuestionsFocused,
      };
    }
    case surveyBuilderAction.setIsQuestionLengthExceeded: {
      const { index, value } = action.payload;
      const isQuestionLengthExceeded = [...state.isQuestionLengthExceeded];
      if (index >= isQuestionLengthExceeded.length) {
        isQuestionLengthExceeded.push(value);
      } else {
        isQuestionLengthExceeded[index] = value;
      }

      return {
        ...state,
        isQuestionLengthExceeded,
      };
    }
    case surveyBuilderAction.deleteQuestionGroup: {
      const index = action.payload;
      // delete the question
      const questions = [...state.questions];
      questions.splice(index, 1);
      const areValidQuestions = [...state.areValidQuestions];
      areValidQuestions.splice(index, 1);
      const areQuestionsFocused = [...state.areQuestionsFocused];
      areQuestionsFocused.splice(index, 1);

      // delete the response kind, input html, and data options
      const responseKinds = [...state.responseKinds];
      responseKinds.splice(index, 1);
      const responseInputHtml = [...state.responseInputHtml];
      responseInputHtml.splice(index, 1);
      const responseDataOptions = [...state.responseDataOptions];
      responseDataOptions.splice(index, 1);

      return {
        ...state,
        questions,
        areValidQuestions,
        areQuestionsFocused,
        responseKinds,
        responseInputHtml,
        responseDataOptions,
      };
    }

    case surveyBuilderAction.addNewQuestionGroup: {
      const questions = [...state.questions];
      questions.push('');
      const areValidQuestions = [...state.areValidQuestions];
      areValidQuestions.push(false);
      const areQuestionsFocused = [...state.areQuestionsFocused];
      areQuestionsFocused.push(false);
      const responseKinds = [...state.responseKinds];
      responseKinds.push('chooseOne');
      const responseInputHtml = [...state.responseInputHtml];
      responseInputHtml.push('trueFalse');
      const responseDataOptions = [...state.responseDataOptions];
      responseDataOptions.push([]);

      return {
        ...state,
        questions,
        areValidQuestions,
        areQuestionsFocused,
        responseKinds,
        responseInputHtml,
        responseDataOptions,
      };
    }

    case surveyBuilderAction.setResponseKinds: {
      const { index, value } = action.payload;
      const responseKinds = [...state.responseKinds];
      if (index >= responseKinds.length) {
        responseKinds.push(value);
      } else {
        responseKinds[index] = value;
      }

      return {
        ...state,
        responseKinds,
      };
    }

    case surveyBuilderAction.setResponseInputHtml: {
      const { index, value } = action.payload;
      const responseInputHtml = [...state.responseInputHtml];
      if (index >= responseInputHtml.length) {
        responseInputHtml.push(value);
      } else {
        responseInputHtml[index] = value;
      }

      return {
        ...state,
        responseInputHtml,
      };
    }

    case surveyBuilderAction.setResponseDataOptions: {
      const { index, value } = action.payload;
      const responseDataOptions = [...state.responseDataOptions];
      if (index >= responseDataOptions.length) {
        responseDataOptions.push(value);
      } else {
        responseDataOptions[index] = value;
      }

      return {
        ...state,
        responseDataOptions,
      };
    }

    case surveyBuilderAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case surveyBuilderAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }
    case surveyBuilderAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case surveyBuilderAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case surveyBuilderAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case surveyBuilderAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case surveyBuilderAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case surveyBuilderAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case surveyBuilderAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case surveyBuilderAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { initialSurveyBuilderState, surveyBuilderAction, surveyBuilderReducer };
