import { DescriptionObjectsArray } from '../../wrappers';
import {
  SurveyBuilderAction,
  SurveyBuilderDispatch,
  SurveyBuilderState,
} from './types';

const initialDescriptionObjects: DescriptionObjectsArray = [
  {
    description: 'Enter survey details',
    ariaLabel:
      'Enter survey title, description, expiry date, recipients and anonymity',
  },

  {
    description: 'Enter question 1',
    ariaLabel:
      'Enter question 1, response kind and corresponding html input type',
  },

  {
    description: 'Review and proceed',
    ariaLabel: 'Review survey questions and associated input types and proceed',
  },
];

const initialSurveyBuilderState: SurveyBuilderState = {
  surveyTitle: '',
  isValidSurveyTitle: false,
  isSurveyTitleFocused: false,

  surveyDescription: '',
  isValidSurveyDescription: false,
  isSurveyDescriptionFocused: false,

  expiryDate: '',
  isValidExpiryDate: false,
  isExpiryDateFocused: false,

  surveyRecipients: 'All',
  isAnonymous: false,

  questions: [''],
  areValidQuestions: [false],
  areQuestionsFocused: [false],
  isMaxQuestionsReached: false,

  responseKinds: ['chooseAny'],
  responseInputHtml: ['checkbox'],

  responseDataOptionsArray: [['Please enter (an) option(s) for your question']],
  areResponseDataOptionsValid: [[false]],
  areResponseDataOptionsFocused: [[false]],
  responseDataOptionsCounts: [1],
  isMaxResponseDataOptionsReached: [false],

  triggerFormSubmit: false,
  stepperDescriptionObjects: initialDescriptionObjects,
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

  setSurveyDescription: 'setSurveyDescription',
  setIsValidSurveyDescription: 'setIsValidSurveyDescription',
  setIsSurveyDescriptionFocused: 'setIsSurveyDescriptionFocused',

  setExpiryDate: 'setExpiryDate',
  setIsValidExpiryDate: 'setIsValidExpiryDate',
  setIsExpiryDateFocused: 'setIsExpiryDateFocused',

  setSurveyRecipients: 'setSurveyRecipients',
  setIsAnonymous: 'setIsAnonymous',

  setQuestions: 'setQuestions',
  setAreValidQuestions: 'setAreValidQuestions',
  setAreQuestionsFocused: 'setAreQuestionsFocused',
  setResponseDataOptionsCounts: 'setResponseDataOptionsCounts',
  setIsMaxQuestionsReached: 'setIsMaxQuestionsReached',

  deleteQuestionGroup: 'deleteQuestionGroup',
  addNewQuestionGroup: 'addNewQuestionGroup',

  setResponseKinds: 'setResponseKinds',
  setResponseInputHtml: 'setResponseInputHtml',

  setResponseDataOptions: 'setResponseDataOptions',
  setAreResponseDataOptionsValid: 'setAreResponseDataOptionsValid',
  setAreResponseDataOptionsFocused: 'setAreResponseDataOptionsFocused',
  setIsMaxResponseDataOptionsReached: 'setIsMaxResponseDataOptionsReached',
  deleteResponseDataOption: 'deleteResponseDataOption',
  addNewResponseDataOption: 'addNewResponseDataOption',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  updateStepperDescriptionObjects: 'updateStepperDescriptionObjects',
  createStepperDescriptionObjects: 'createStepperDescriptionObjects',
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

    case surveyBuilderAction.setAreValidQuestions:
      return {
        ...state,
        areValidQuestions: action.payload,
      };

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
    case surveyBuilderAction.setIsMaxQuestionsReached:
      return {
        ...state,
        isMaxQuestionsReached: action.payload,
      };

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

      // delete the description object
      const stepperDescriptionObjects = [...state.stepperDescriptionObjects];
      stepperDescriptionObjects.splice(index + 1, 1);

      return {
        ...state,
        questions,
        areValidQuestions,
        areQuestionsFocused,
        responseKinds,
        responseInputHtml,
        stepperDescriptionObjects,
      };
    }

    case surveyBuilderAction.addNewQuestionGroup: {
      // // create new description object
      // const stepperDescriptionObjects = [...state.stepperDescriptionObjects];
      // const lastObject = stepperDescriptionObjects.splice(-1)[0];
      // stepperDescriptionObjects.push(
      //   {
      //     description: `Enter question ${stepperDescriptionObjects.length}`,
      //     ariaLabel: `Enter question ${stepperDescriptionObjects.length}`,
      //   },
      //   lastObject
      // );

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

      return {
        ...state,
        questions,
        areValidQuestions,
        areQuestionsFocused,
        responseKinds,
        responseInputHtml,
        // stepperDescriptionObjects,
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
      const { questionIdx, optionIdx, value } = action.payload;
      const responseDataOptionsArray = structuredClone(
        state.responseDataOptionsArray
      );

      if (questionIdx >= responseDataOptionsArray.length) {
        responseDataOptionsArray.push([value]);
      } else {
        const questionOptions = responseDataOptionsArray[questionIdx];
        if (optionIdx >= questionOptions.length) {
          questionOptions.push(value);
        } else {
          questionOptions[optionIdx] = value;
        }
      }

      return {
        ...state,
        responseDataOptionsArray,
      };
    }

    case surveyBuilderAction.setAreResponseDataOptionsValid: {
      // const { questionIdx, optionIdx, value } = action.payload;
      // const areResponseDataOptionsValid = structuredClone(
      //   state.areResponseDataOptionsValid
      // );
      // if (questionIdx >= areResponseDataOptionsValid.length) {
      //   areResponseDataOptionsValid.push([value]);
      // } else {
      //   const questionOptions = areResponseDataOptionsValid[questionIdx];
      //   if (optionIdx >= questionOptions.length) {
      //     questionOptions.push(value);
      //   } else {
      //     questionOptions[optionIdx] = value;
      //   }
      // }
      // return {
      //   ...state,
      //   areResponseDataOptionsValid,
      // };

      return {
        ...state,
        areResponseDataOptionsValid: action.payload,
      };
    }

    case surveyBuilderAction.setAreResponseDataOptionsFocused: {
      const { questionIdx, optionIdx, value } = action.payload;
      const areResponseDataOptionsFocused = structuredClone(
        state.areResponseDataOptionsFocused
      );

      if (questionIdx >= areResponseDataOptionsFocused.length) {
        areResponseDataOptionsFocused.push([value]);
      } else {
        const questionOptions = areResponseDataOptionsFocused[questionIdx];
        if (optionIdx >= questionOptions.length) {
          questionOptions.push(value);
        } else {
          questionOptions[optionIdx] = value;
        }
      }

      return {
        ...state,
        areResponseDataOptionsFocused,
      };
    }

    case surveyBuilderAction.setResponseDataOptionsCounts: {
      const { questionIdx, kind } = action.payload;
      const responseDataOptionsCounts = structuredClone(
        state.responseDataOptionsCounts
      );

      const currentCount = responseDataOptionsCounts[questionIdx];
      const newCount =
        kind === 'increment' ? currentCount + 1 : currentCount - 1;

      // assign the new count to the question
      responseDataOptionsCounts[questionIdx] = newCount;

      return {
        ...state,
        responseDataOptionsCounts,
      };
    }

    case surveyBuilderAction.setIsMaxResponseDataOptionsReached: {
      const { index, value } = action.payload;
      const isMaxResponseDataOptionsReached = [
        ...state.isMaxResponseDataOptionsReached,
      ];

      if (index >= isMaxResponseDataOptionsReached.length) {
        isMaxResponseDataOptionsReached.push(value);
      } else {
        isMaxResponseDataOptionsReached[index] = value;
      }

      return {
        ...state,
        isMaxResponseDataOptionsReached,
      };
    }

    case surveyBuilderAction.deleteResponseDataOption: {
      const { questionIdx, optionIdx } = action.payload;
      const responseDataOptionsArray = structuredClone(
        state.responseDataOptionsArray
      );

      // delete the option belonging to the question
      const questionOptions = responseDataOptionsArray[questionIdx];
      questionOptions.splice(optionIdx, 1);
      responseDataOptionsArray[questionIdx] = questionOptions;

      // delete the option's validity
      const areResponseDataOptionsValid = structuredClone(
        state.areResponseDataOptionsValid
      );
      const questionValidity = areResponseDataOptionsValid[questionIdx];
      questionValidity.splice(optionIdx, 1);
      areResponseDataOptionsValid[questionIdx] = questionValidity;

      // delete the option's focus
      const areResponseDataOptionsFocused = structuredClone(
        state.areResponseDataOptionsFocused
      );
      const questionFocus = areResponseDataOptionsFocused[questionIdx];
      questionFocus.splice(optionIdx, 1);
      areResponseDataOptionsFocused[questionIdx] = questionFocus;

      // decrement the responseDataOptionsCount
      const responseDataOptionsCounts = [...state.responseDataOptionsCounts];
      responseDataOptionsCounts[questionIdx] -= 1;

      return {
        ...state,
        responseDataOptionsArray,
        areResponseDataOptionsValid,
        areResponseDataOptionsFocused,
        responseDataOptionsCounts,
      };
    }

    case surveyBuilderAction.addNewResponseDataOption: {
      console.log('addNewResponseDataOption payload', action.payload);
      const { questionIdx } = action.payload;
      const responseDataOptionsArray = structuredClone(
        state.responseDataOptionsArray
      );

      // add a new option to the question
      const questionOptions = responseDataOptionsArray[questionIdx] ?? [];
      questionOptions.push('');
      responseDataOptionsArray[questionIdx] = questionOptions;

      // add new option's validity
      const areResponseDataOptionsValid = structuredClone(
        state.areResponseDataOptionsValid
      );
      const questionValidity = areResponseDataOptionsValid[questionIdx] ?? [];
      questionValidity.push(false);
      areResponseDataOptionsValid[questionIdx] = questionValidity;

      // add new option's focus
      const areResponseDataOptionsFocused = structuredClone(
        state.areResponseDataOptionsFocused
      );
      const questionFocus = areResponseDataOptionsFocused[questionIdx] ?? [];
      questionFocus.push(false);
      areResponseDataOptionsFocused[questionIdx] = questionFocus;

      // // increment the responseDataOptionsCount
      // const responseDataOptionsCounts = [...state.responseDataOptionsCounts];
      // responseDataOptionsCounts[questionIdx] += 1;

      return {
        ...state,
        responseDataOptionsArray,
        areResponseDataOptionsValid,
        areResponseDataOptionsFocused,
        // responseDataOptionsCounts,
      };
    }

    case surveyBuilderAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case surveyBuilderAction.createStepperDescriptionObjects: {
      const { value } = action.payload;

      // only update the middle objects
      const stepperDescriptionObjects = [...state.stepperDescriptionObjects];
      const lastStep = stepperDescriptionObjects.splice(-1)[0];
      stepperDescriptionObjects.push(value, lastStep);

      return {
        ...state,
        stepperDescriptionObjects,
      };
    }
    case surveyBuilderAction.updateStepperDescriptionObjects: {
      const { index, value } = action.payload;

      const stepperDescriptionObjects = [...state.stepperDescriptionObjects];
      stepperDescriptionObjects[index] = value;

      return {
        ...state,
        stepperDescriptionObjects,
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

    case surveyBuilderAction.setSurveyDescription:
      return {
        ...state,
        surveyDescription: action.payload,
      };
    case surveyBuilderAction.setIsValidSurveyDescription:
      return {
        ...state,
        isValidSurveyDescription: action.payload,
      };
    case surveyBuilderAction.setIsSurveyDescriptionFocused:
      return {
        ...state,
        isSurveyDescriptionFocused: action.payload,
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

    case surveyBuilderAction.setSurveyRecipients:
      return {
        ...state,
        surveyRecipients: action.payload,
      };
    case surveyBuilderAction.setIsAnonymous:
      return {
        ...state,
        isAnonymous: action.payload,
      };

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
