import { useEffect, useReducer, useRef } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
} from '../../constants/regex';
import {
  returnAccessibleTextElements,
  returnAccessibleTextElementsForDynamicInputs,
} from '../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../utils';
import {
  AccessibleCheckboxInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../wrappers';
import {
  initialSurveyBuilderState,
  surveyBuilderAction,
  surveyBuilderReducer,
} from './state';

function SurveyBuilder() {
  const [surveyBuilderState, surveyBuilderDispatch] = useReducer(
    surveyBuilderReducer,
    initialSurveyBuilderState
  );
  const {
    surveyTitle,
    isValidSurveyTitle,
    isSurveyTitleFocused,

    expiryDate,
    isValidExpiryDate,
    isExpiryDateFocused,

    sendTo,
    isAnonymous,

    questions,
    areValidQuestions,
    areQuestionsFocused,
    isQuestionLengthExceeded,

    responseKinds,
    responseInputHtml,
    responseDataOptions,

    currentStepperPosition,
    stepsInError,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = surveyBuilderState;

  const newQuestionInputRef = useRef<HTMLInputElement>(null);
  // set focus on new question input
  useEffect(() => {
    newQuestionInputRef.current?.focus();
  }, [questions.length]);

  // validate survey title on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(surveyTitle);

    surveyBuilderDispatch({
      type: surveyBuilderAction.setIsValidSurveyTitle,
      payload: isValid,
    });
  }, [surveyTitle]);

  // validate expiry date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(expiryDate);

    surveyBuilderDispatch({
      type: surveyBuilderAction.setIsValidExpiryDate,
      payload: isValid,
    });
  }, [expiryDate]);

  // validate questions on every change
  useEffect(() => {
    const isValid = questions.map((surveyQuestion) =>
      GRAMMAR_TEXT_INPUT_REGEX.test(surveyQuestion)
    );

    surveyBuilderDispatch({
      type: surveyBuilderAction.setAreValidQuestions,
      payload: isValid,
    });
  }, [questions]);

  // validate stepper state on every change
  useEffect(() => {
    const isStepInError =
      isValidSurveyTitle ||
      isValidExpiryDate ||
      areValidQuestions.includes(false);

    surveyBuilderDispatch({
      type: surveyBuilderAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [isValidSurveyTitle, isValidExpiryDate, areValidQuestions]);

  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'title',
      inputText: surveyTitle,
      isInputTextFocused: isSurveyTitleFocused,
      isValidInputText: isValidSurveyTitle,
      regexValidationText: returnGrammarValidationText({
        content: surveyTitle,
        contentKind: 'title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [expiryDateInputErrorText, expiryDateInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'expiryDate',
      inputText: expiryDate,
      isInputTextFocused: isExpiryDateFocused,
      isValidInputText: isValidExpiryDate,
      regexValidationText: returnDateNearFutureValidationText(expiryDate),
    });

  const [questionInputsErrorText, questionInputsValidText] =
    returnAccessibleTextElementsForDynamicInputs({
      semanticName: 'question',
      inputTextArray: questions.map((question) => question),
      areValidInputTexts: areValidQuestions,
      areInputTextsFocused: areQuestionsFocused,
      regexValidationProps: {
        content: questions.map((question) => question).join(' '),
        contentKind: 'question',
        minLength: 2,
        maxLength: 150,
      },
      regexValidationFunction: returnGrammarValidationText,
    });

  // following are info objects for input creators
  const surveyTitleInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: surveyTitle,
    isValidInputText: isValidSurveyTitle,
    label: 'Survey Title',
    onBlur: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsSurveyTitleFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setSurveyTitle,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsSurveyTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter survey title',
    semanticName: 'survey title',
    required: true,
    withAsterisk: true,
  };

  const expiryDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: expiryDateInputErrorText,
      valid: expiryDateInputValidText,
    },
    inputKind: 'date',
    dateKind: 'date near future',
    inputText: expiryDate,
    isValidInputText: isValidExpiryDate,
    label: 'Expiry Date',
    onBlur: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsExpiryDateFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setExpiryDate,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsExpiryDateFocused,
        payload: true,
      });
    },
    placeholder: 'Enter expiry date',
    semanticName: 'expiry date',
    required: true,
    withAsterisk: true,
  };

  const isAnonymousCheckboxCreatorInfo: AccessibleCheckboxInputCreatorInfo = {
    checkboxKind: 'single',
    description: {
      selected: 'Survey will be anonymous',
      deselected: 'Survey will not be anonymous',
    },
    semanticName: 'anonymous survey',
    checked: isAnonymous,
    onChangeSingle: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsAnonymous,
        payload: !isAnonymous,
      });
    },
  };

  const questionsInputCreatorInfo: AccessibleTextInputCreatorInfo[] =
    Array.from({
      length: questions.length,
    }).map((_, index) => {
      const creatorInfoObject: AccessibleTextInputCreatorInfo = {
        description: {
          error: questionInputsErrorText[index],
          valid: questionInputsValidText[index],
        },
        inputText: questions[index],
        isValidInputText: areValidQuestions[index],
        label: `Question ${index + 1}`,
        onBlur: () => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setAreQuestionsFocused,
            payload: {
              index,
              value: false,
            },
          });
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setQuestions,
            payload: {
              index,
              value: event.currentTarget.value,
            },
          });
        },
        onFocus: () => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setAreQuestionsFocused,
            payload: {
              index,
              value: true,
            },
          });
        },
        placeholder: 'Enter question',
        semanticName: `question ${index + 1}`,
        required: true,
        withAsterisk: true,
        dynamicInputProps: {
          dynamicIndex: index,
          dynamicInputOnClick: () => {
            surveyBuilderDispatch({
              type: surveyBuilderAction.setDeleteQuestion,
              payload: index,
            });
          },
          semanticAction: 'delete',
        },
        ref: index === questions.length - 1 ? newQuestionInputRef : null,
      };

      return creatorInfoObject;
    });

  return <h4>SurveyBuilder</h4>;
}

export { SurveyBuilder };
