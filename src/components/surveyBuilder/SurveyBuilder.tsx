import { Flex, Text } from '@mantine/core';
import { Group, Tooltip } from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleDynamicRadioGroupInputsElements,
  returnAccessibleDynamicTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextElementsForDynamicInputs,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../utils';
import { createAnnouncementAction } from '../announcements/createAnnouncement/state';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../wrappers';
import {
  SURVEY_BUILDER_INPUT_HTML_DATA,
  SURVEY_BUILDER_RECIPIENT_DATA,
  SURVEY_BUILDER_RESPONSE_KIND_DATA,
} from './constants';
import {
  initialSurveyBuilderState,
  surveyBuilderAction,
  surveyBuilderReducer,
} from './state';
import { SurveyRecipient } from './types';

function SurveyBuilder() {
  const [surveyBuilderState, surveyBuilderDispatch] = useReducer(
    surveyBuilderReducer,
    initialSurveyBuilderState
  );
  const {
    surveyTitle,
    isValidSurveyTitle,
    isSurveyTitleFocused,

    surveyDescription,
    isValidSurveyDescription,
    isSurveyDescriptionFocused,

    expiryDate,
    isValidExpiryDate,
    isExpiryDateFocused,

    surveyRecipients,
    isAnonymous,

    questions,
    areValidQuestions,
    areQuestionsFocused,
    isQuestionLengthExceeded,

    responseKinds,
    responseInputHtml,

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

  // validate survey description on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(surveyDescription);

    surveyBuilderDispatch({
      type: surveyBuilderAction.setIsValidSurveyDescription,
      payload: isValid,
    });
  }, [surveyDescription]);

  // validate expiry date on every change
  useEffect(() => {
    // check if expiry date is valid and is in the near future
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(expiryDate) &&
      new Date() <= new Date(expiryDate);

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
      inputElementKind: 'survey title',
      inputText: surveyTitle,
      isInputTextFocused: isSurveyTitleFocused,
      isValidInputText: isValidSurveyTitle,
      regexValidationText: returnGrammarValidationText({
        content: surveyTitle,
        contentKind: 'survey title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [descriptionInputErrorText, descriptionInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'survey description',
      inputText: surveyDescription,
      isInputTextFocused: isSurveyDescriptionFocused,
      isValidInputText: isValidSurveyDescription,
      regexValidationText: returnGrammarValidationText({
        content: surveyDescription,
        contentKind: 'survey description',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [expiryDateInputErrorText, expiryDateInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'expiry date',
      inputText: expiryDate,
      isInputTextFocused: isExpiryDateFocused,
      isValidInputText: isValidExpiryDate,
      regexValidationText: returnDateNearFutureValidationText(expiryDate),
    });

  const [questionInputsErrorText, questionInputsValidText] =
    returnAccessibleTextElementsForDynamicInputs({
      semanticName: 'question',
      inputTextArray: questions,
      areValidInputTexts: areValidQuestions,
      areInputTextsFocused: areQuestionsFocused,
      regexValidationProps: {
        content: questions.map((question) => question).join(' '),
        contentKind: 'question',
        minLength: 2,
        maxLength: 75,
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

  const surveyDescriptionTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: descriptionInputErrorText,
        valid: descriptionInputValidText,
      },
      inputText: surveyDescription,
      isValidInputText: isValidSurveyDescription,
      label: 'Survey Description',
      onBlur: () => {
        surveyBuilderDispatch({
          type: surveyBuilderAction.setIsSurveyDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        surveyBuilderDispatch({
          type: surveyBuilderAction.setSurveyDescription,
          payload: event.target.value,
        });
      },
      onFocus: () => {
        surveyBuilderDispatch({
          type: surveyBuilderAction.setIsSurveyDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter survey description',
      semanticName: 'survey description',
      required: true,
      withAsterisk: true,
    };

  const surveyRecipientsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: SURVEY_BUILDER_RECIPIENT_DATA,
      description: 'Select the target recipients',
      label: 'Survey recipients',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        surveyBuilderDispatch({
          type: surveyBuilderAction.setSurveyRecipients,
          payload: event.currentTarget.value as SurveyRecipient,
        });
      },
      value: surveyRecipients,
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
              type: surveyBuilderAction.deleteQuestionGroup,
              payload: index,
            });
          },
          semanticAction: 'delete',
        },
        ref: index === questions.length - 1 ? newQuestionInputRef : null,
      };

      return creatorInfoObject;
    });

  const responseKindRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo[] =
    Array.from({ length: questions.length }).map((_, index) => {
      const creatorInfoObject: AccessibleRadioGroupInputCreatorInfo = {
        description: 'Choose a response type for your question',
        dataObjectArray: SURVEY_BUILDER_RESPONSE_KIND_DATA,
        label: `Response Type for Question ${index + 1}`,
        name: `response type for question ${index + 1}`,
        onChange: (value: string) => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseKinds,
            payload: {
              index,
              value,
            },
          });
        },
        semanticName: `response type for question ${index + 1}`,
        value: responseKinds[index],
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const responseInputHtmlRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo[] =
    Array.from({ length: questions.length }).map((_, index) => {
      const creatorInfoObject: AccessibleRadioGroupInputCreatorInfo = {
        description: 'Choose a html input type for your question',
        dataObjectArray: SURVEY_BUILDER_INPUT_HTML_DATA.get(
          responseKinds[index]
        ) as {
          value: string;
          label: string;
        }[],
        label: `Html input Type for Question ${index + 1}`,
        name: `html input type for question ${index + 1}`,
        onChange: (value: string) => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseInputHtml,
            payload: {
              index,
              value,
            },
          });
        },
        semanticName: `html input type for question ${index + 1}`,
        value: responseInputHtml[index],
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const addNewQuestionButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new article paragraph">
        <Group>
          <MdOutlineAdd size={20} />
          <Text color="gray">Add</Text>
        </Group>
      </Tooltip>
    ),
    buttonOnClick: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.addNewQuestionGroup,
        payload: questions.length,
      });
    },
    semanticDescription: 'add new article paragraph text input button',
    semanticName: 'add paragraph button',
  };

  const createdQuestionsTextInputs = returnAccessibleDynamicTextInputElements(
    questionsInputCreatorInfo
  );

  const [createdSurveyDescriptionTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      surveyDescriptionTextAreaInputCreatorInfo,
    ]);

  const [createdSurveyRecipientsSelectInput] =
    returnAccessibleSelectInputElements([
      surveyRecipientsSelectInputCreatorInfo,
    ]);

  const createdResponseKindRadioGroups =
    returnAccessibleDynamicRadioGroupInputsElements(
      responseKindRadioGroupCreatorInfo
    );

  const createdResponseInputHtmlRadioGroups =
    returnAccessibleDynamicRadioGroupInputsElements(
      responseInputHtmlRadioGroupCreatorInfo
    );

  const [createdNewQuestionButton] = returnAccessibleButtonElements([
    addNewQuestionButtonCreatorInfo,
  ]);

  const [createdIsAnonymousCheckbox] = returnAccessibleCheckboxInputElements([
    isAnonymousCheckboxCreatorInfo,
  ]);

  const [createdExpiryDateInput] = returnAccessibleDateTimeElements([
    expiryDateInputCreatorInfo,
  ]);

  const [createdSurveyTitleInput] = returnAccessibleTextInputElements([
    surveyTitleInputCreatorInfo,
  ]);

  const mergedSurveyQuestionsResponseKindsHtmlInputTypes = questions
    .reduce(
      (acc: [JSX.Element, JSX.Element, JSX.Element][], _: string, index) => {
        acc.push([
          createdQuestionsTextInputs[index],
          createdResponseKindRadioGroups[index],
          createdResponseInputHtmlRadioGroups[index],
        ]);

        return acc;
      },
      []
    )
    .map(
      ([
        createdQuestionsTextInput,
        createdResponseKindRadioGroupInput,
        createdResponseInputHtmlRadioGroupInput,
      ]) => (
        <>
          {createdQuestionsTextInput}
          {createdResponseKindRadioGroupInput}
          {createdResponseInputHtmlRadioGroupInput}
        </>
      )
    );

  const displaySurveyBuilderForm = (
    <>
      {createdSurveyTitleInput}
      {createdSurveyDescriptionTextAreaInput}
      {createdSurveyRecipientsSelectInput}
      {createdExpiryDateInput}
      {createdIsAnonymousCheckbox}
      {mergedSurveyQuestionsResponseKindsHtmlInputTypes}
      {createdNewQuestionButton}
    </>
  );

  useEffect(() => {
    console.group('surveyBuilderState');
    Object.entries(surveyBuilderState).forEach(([key, value]) => {
      console.log(`${key}: `, value);
    });
    console.groupEnd();
  }, [surveyBuilderState]);

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
    >
      {displaySurveyBuilderForm}
    </Flex>
  );
}

export { SurveyBuilder };
