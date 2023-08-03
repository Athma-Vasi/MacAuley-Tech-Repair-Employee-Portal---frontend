import { Text } from '@mantine/core';
import { Group, Tooltip } from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { TbUpload } from 'react-icons/tb';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleDynamicRadioGroupInputsElements,
  returnAccessibleDynamicTextInputElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  SURVEY_BUILDER_INPUT_HTML_DATA,
  SURVEY_BUILDER_MAX_QUESTION_AMOUNT,
  SURVEY_BUILDER_RECIPIENT_DATA,
  SURVEY_BUILDER_RESPONSE_KIND_DATA,
} from '../constants';
import { mergeSurveyQuestionsGroup } from '../utils';
import {
  initialSurveyBuilderState,
  surveyBuilderAction,
  surveyBuilderReducer,
} from './state';
import { SurveyRecipient } from './types';

function SurveyBuilder() {
  const {
    globalState: { width },
  } = useGlobalState();
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
    isMaxQuestionsReached,

    responseKinds,
    responseInputHtml,

    responseDataOptionsArray,
    areResponseDataOptionsValid,
    areResponseDataOptionsFocused,
    isMaxResponseDataOptionsReached,

    triggerFormSubmit,
    stepperDescriptionObjects,
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

    // update the StepperWrapper description with entered question on every change
    questions.forEach((question, index) => {
      const maxSliceLength =
        width < 1440 && stepperDescriptionObjects.length > 4 ? 23 : 11;

      surveyBuilderDispatch({
        type: surveyBuilderAction.updateStepperDescriptionObjects,
        payload: {
          index: index + 1,
          value: {
            description: `Question ${index + 1}${
              question.length === 0 ? '' : ':'
            } ${question.slice(0, maxSliceLength)} ${
              question.length > maxSliceLength ? '...' : ''
            }`,
            ariaLabel: `Question ${index + 1} ${question
              .split(' ')
              .slice(0, 3)
              .join(' ')}`,
          },
        },
      });
    });
  }, [questions, width]);

  // validate questions length on every change
  useEffect(() => {
    const isExceeded = questions.length === SURVEY_BUILDER_MAX_QUESTION_AMOUNT;

    surveyBuilderDispatch({
      type: surveyBuilderAction.setIsMaxQuestionsReached,
      payload: isExceeded,
    });
  }, [questions.length]);

  // validate response data options on every change
  useEffect(() => {
    const isValid = responseDataOptionsArray.map(
      (responseDataOptions: string[]) =>
        responseDataOptions.map((responseDataOption) =>
          GRAMMAR_TEXT_INPUT_REGEX.test(responseDataOption)
        )
    );

    surveyBuilderDispatch({
      type: surveyBuilderAction.setAreResponseDataOptionsValid,
      payload: isValid,
    });
  }, []);

  // validate stepper state on every change
  useEffect(() => {
    const isStepInError =
      !isValidSurveyTitle || !isValidExpiryDate || !isValidSurveyDescription;

    surveyBuilderDispatch({
      type: surveyBuilderAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [isValidSurveyTitle, isValidExpiryDate, isValidSurveyDescription]);

  // validate stepper state on every dynamically created question input groups
  useEffect(() => {
    areValidQuestions.forEach((isValidQuestion, index) => {
      isValidQuestion
        ? surveyBuilderDispatch({
            type: surveyBuilderAction.setStepsInError,
            payload: {
              kind: 'delete',
              step: index + 1,
            },
          })
        : surveyBuilderDispatch({
            type: surveyBuilderAction.setStepsInError,
            payload: {
              kind: 'add',
              step: index + 1,
            },
          });
    });
  }, [areValidQuestions]);

  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleErrorValidTextElements({
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
    returnAccessibleErrorValidTextElements({
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
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'expiry date',
      inputText: expiryDate,
      isInputTextFocused: isExpiryDateFocused,
      isValidInputText: isValidExpiryDate,
      regexValidationText: returnDateNearFutureValidationText(expiryDate),
    });

  const [questionInputsErrorText, questionInputsValidText] =
    returnAccessibleErrorValidTextElementsForDynamicInputs({
      semanticName: 'question',
      inputTextArray: questions,
      areValidInputTexts: areValidQuestions,
      areInputTextsFocused: areQuestionsFocused,
      // regexValidationProps: {
      //   content: questions.map((question) => question).join(' '),
      //   contentKind: 'question',
      //   minLength: 2,
      //   maxLength: 75,
      // },
      regexValidationProps: questions.map((question) => ({
        content: question,
        contentKind: 'question',
        minLength: 2,
        maxLength: 75,
      })),
      regexValidationFunction: returnGrammarValidationText,
    });

  // const [responseDataOptionsErrorTextArray, responseDataOptionsValidTextArray] =
  //   responseDataOptionsArray.reduce(
  //     (acc, responseDataOptions, index) => {
  //       const [responseDataOptionsErrorTexts, responseDataOptionsValidTexts] =
  //         returnAccessibleErrorValidTextElementsForDynamicInputs({
  //           semanticName: 'response data option',
  //           inputTextArray: responseDataOptions,
  //           areValidInputTexts: areResponseDataOptionsValid[index],
  //           areInputTextsFocused: areResponseDataOptionsFocused[index],
  //           regexValidationProps: {
  //             content: responseDataOptions
  //               .map((responseDataOption) => responseDataOption)
  //               .join(' '),
  //             contentKind: 'response data option',
  //             minLength: 2,
  //             maxLength: 75,
  //           },
  //           regexValidationFunction: returnGrammarValidationText,
  //         });

  //       // acc[0].push(responseDataOptionsErrorTexts);
  //       // acc[1].push(responseDataOptionsValidTexts);
  //       acc.push([
  //         responseDataOptionsErrorTexts,
  //         responseDataOptionsValidTexts,
  //       ]);

  //       return acc;
  //     },
  //     // Array.from({ length: responseDataOptionsArray.length }).map(
  //     //   (_, idx) =>
  //     //     Array.from({ length: responseDataOptionsArray[idx].length }) as [
  //     //       JSX.Element[],
  //     //       JSX.Element[]
  //     //     ]
  //     // )
  //     [] as [JSX.Element[], JSX.Element[]][]
  //   );

  const [
    responseDataOptionsErrorTextArrays,
    responseDataOptionsValidTextArrays,
  ]: [JSX.Element[], JSX.Element[]][] = responseDataOptionsArray.map(
    (responseDataOptions, questionIdx) => {
      const [responseDataOptionsErrorTexts, responseDataOptionsValidTexts] =
        returnAccessibleErrorValidTextElementsForDynamicInputs({
          semanticName: `option ${questionIdx + 1}`,
          inputTextArray: responseDataOptions,
          areValidInputTexts: areResponseDataOptionsValid[questionIdx],
          areInputTextsFocused: areResponseDataOptionsFocused[questionIdx],
          regexValidationProps: responseDataOptions.map(
            (responseDataOption, optionIdx) => ({
              content: responseDataOption,
              contentKind: `${questions[questionIdx]}: ${responseDataOption}`,
              minLength: 2,
              maxLength: 75,
            })
          ),
          regexValidationFunction: returnGrammarValidationText,
        });

      return [responseDataOptionsErrorTexts, responseDataOptionsValidTexts];
    }
  );

  console.log(
    'responseDataOptionsErrorTextArrays: ',
    responseDataOptionsErrorTextArrays
  );
  console.log(
    'responseDataOptionsValidTextArrays: ',
    responseDataOptionsValidTextArrays
  );

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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setSurveyTitle,
        payload: event.currentTarget.value,
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
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        surveyBuilderDispatch({
          type: surveyBuilderAction.setSurveyDescription,
          payload: event.currentTarget.value,
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
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setExpiryDate,
        payload: event.currentTarget.value,
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
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
            // enables display of the previous stepper page after deletion
            surveyBuilderDispatch({
              type: surveyBuilderAction.setCurrentStepperPosition,
              payload: currentStepperPosition - 1,
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
        description: 'Choose a response type',
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
        description: 'Choose an input kind',
        dataObjectArray: SURVEY_BUILDER_INPUT_HTML_DATA.get(
          responseKinds[index]
        ) as {
          value: string;
          label: string;
        }[],
        label: `Input kind for Question ${index + 1}`,
        name: `html input kind for question ${index + 1}`,
        onChange: (value: string) => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseInputHtml,
            payload: {
              index,
              value,
            },
          });
        },
        semanticName: `html input kind for question ${index + 1}`,
        value: responseInputHtml[index],
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const responseDataOptionsTextInputCreatorInfoArray: AccessibleTextInputCreatorInfo[][] =
    Array.from({
      length: responseDataOptionsArray.length,
    }).map((_, questionIdx) => {
      const responseDataOptionsTextInputCreatorInfo: AccessibleTextInputCreatorInfo[] =
        Array.from({
          length: responseDataOptionsArray?.[questionIdx]?.length,
        }).map((_, optionIdx) => {
          const creatorInfoObject: AccessibleTextInputCreatorInfo = {
            description: {
              error:
                responseDataOptionsErrorTextArrays?.[questionIdx]?.[optionIdx],
              valid:
                responseDataOptionsValidTextArrays?.[questionIdx]?.[optionIdx],
            },
            inputText: responseDataOptionsArray?.[questionIdx]?.[optionIdx],
            isValidInputText:
              areResponseDataOptionsValid?.[questionIdx]?.[optionIdx],
            label: `Response Data Option ${optionIdx + 1} for Question ${
              questionIdx + 1
            }`,
            onBlur: () => {
              surveyBuilderDispatch({
                type: surveyBuilderAction.setAreResponseDataOptionsFocused,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: false,
                },
              });
            },
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              surveyBuilderDispatch({
                type: surveyBuilderAction.setResponseDataOptions,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: event.currentTarget.value,
                },
              });
            },
            onFocus: () => {
              surveyBuilderDispatch({
                type: surveyBuilderAction.setAreResponseDataOptionsFocused,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: true,
                },
              });
            },
            placeholder: 'Enter response data option',
            semanticName: `option ${questionIdx + 1} ${optionIdx + 1}`,
            required: true,
            withAsterisk: true,
            dynamicInputProps: {
              dynamicIndex: optionIdx,
              dynamicInputOnClick: () => {
                surveyBuilderDispatch({
                  type: surveyBuilderAction.deleteResponseDataOption,
                  payload: {
                    questionIdx,
                    optionIdx,
                  },
                });
              },
              semanticAction: 'delete',
            },
          };

          return creatorInfoObject;
        });

      return responseDataOptionsTextInputCreatorInfo;
    });

  console.log(
    'responseDataOptionsTextInputCreatorInfoArray',
    responseDataOptionsTextInputCreatorInfoArray
  );

  const addNewQuestionButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new question">
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
      surveyBuilderDispatch({
        type: surveyBuilderAction.createStepperDescriptionObjects,
        payload: {
          index: currentStepperPosition,
          value: {
            description: `Enter question ${questions.length + 1}`,
            ariaLabel: `Enter question ${questions.length + 1}`,
          },
        },
      });

      // enables display of the newly created survey question page
      surveyBuilderDispatch({
        type: surveyBuilderAction.setCurrentStepperPosition,
        payload: currentStepperPosition + 1,
      });
    },
    semanticDescription: 'add new question text input button',
    semanticName: 'add question button',
  };

  const addNewResponseDataOptionButtonCreatorInfo: AccessibleButtonCreatorInfo[] =
    Array.from({ length: questions.length }).map((_, index) => {
      const creatorInfoObject: AccessibleButtonCreatorInfo = {
        buttonVariant: 'outline',
        buttonLabel: (
          <Tooltip label="Add new response data option">
            <Group>
              <MdOutlineAdd size={20} />
              <Text color="gray">Add new data</Text>
            </Group>
          </Tooltip>
        ),
        buttonOnClick: () => {
          surveyBuilderDispatch({
            type: surveyBuilderAction.addNewResponseDataOption,
            payload: {
              questionIdx: index,
            },
          });
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseDataOptionsCounts,
            payload: {
              questionIdx: index,
              kind: 'increment',
            },
          });
        },
        semanticDescription: 'add new response data option text input button',
        semanticName: 'add response data option button',
      };

      return creatorInfoObject;
    });

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'survey builder form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const createdQuestionsTextInputs = returnAccessibleDynamicTextInputElements(
    questionsInputCreatorInfo
  );

  const createdResponseDataOptionsTextInputs =
    responseDataOptionsTextInputCreatorInfoArray.map(
      (responseDataOptionsTextInputCreatorInfo) =>
        returnAccessibleDynamicTextInputElements(
          responseDataOptionsTextInputCreatorInfo
        )
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

  const [createdExpiryDateInput] = returnAccessibleDateTimeElements([
    expiryDateInputCreatorInfo,
  ]);

  const [createdSurveyTitleInput] = returnAccessibleTextInputElements([
    surveyTitleInputCreatorInfo,
  ]);

  const [createdAddNewQuestionButton, createdSubmitButton] =
    returnAccessibleButtonElements([
      addNewQuestionButtonCreatorInfo,
      submitButtonCreatorInfo,
    ]);

  const createdAddNewResponseDataOptionButtons =
    addNewResponseDataOptionButtonCreatorInfo.map(
      (addNewResponseDataOptionButtonCreatorInfo) =>
        returnAccessibleButtonElements([
          addNewResponseDataOptionButtonCreatorInfo,
        ])
    );

  const maxStepperPosition = stepperDescriptionObjects.length + 1;
  const displaySubmitButton =
    currentStepperPosition === maxStepperPosition ? createdSubmitButton : null;

  const displayAddNewQuestionButton = isMaxQuestionsReached
    ? null
    : createdAddNewQuestionButton;

  const mergedSurveyQuestionsGroups = mergeSurveyQuestionsGroup({
    createdQuestionsTextInputs,
    createdResponseKindRadioGroups,
    createdResponseInputHtmlRadioGroups,
    createdResponseDataOptionsTextInputs,
    createdAddNewResponseDataOptionButtons,
    displayAddNewQuestionButton,
  });

  const displaySurveyDetailsFormPageOne = (
    <FormLayoutWrapper>
      {createdSurveyTitleInput}
      {createdSurveyDescriptionTextAreaInput}
      {createdSurveyRecipientsSelectInput}
      {createdExpiryDateInput}
    </FormLayoutWrapper>
  );

  const displaySurveyBuilderReviewPage = <h4>survey builder review page</h4>;

  const displaySurveyBuilderForm =
    currentStepperPosition === maxStepperPosition - 2 ? (
      displaySurveyBuilderReviewPage
    ) : currentStepperPosition ===
      maxStepperPosition - 1 ? null : currentStepperPosition === 0 ? (
      displaySurveyDetailsFormPageOne
    ) : currentStepperPosition === 1 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(0, 1)}
      </FormLayoutWrapper>
    ) : currentStepperPosition === 2 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(1, 2)}
      </FormLayoutWrapper>
    ) : currentStepperPosition === 3 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(2, 3)}
      </FormLayoutWrapper>
    ) : currentStepperPosition === 4 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(3, 4)}
      </FormLayoutWrapper>
    ) : currentStepperPosition === 5 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(4, 5)}
      </FormLayoutWrapper>
    ) : (
      displaySubmitButton
    );

  useEffect(() => {
    console.group('SurveyBuilder');
    Object.entries(surveyBuilderState).forEach(([key, value]) => {
      console.log(`${key}:  `, JSON.stringify(value, null, 2));
    });
    console.log('maxStepperPosition', maxStepperPosition);
    console.groupEnd();
  }, [surveyBuilderState, maxStepperPosition]);

  const displaySurveyBuilderComponent = (
    <StepperWrapper
      childrenTitle="Survey Builder"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={stepperDescriptionObjects}
      maxStepperPosition={maxStepperPosition}
      parentComponentDispatch={surveyBuilderDispatch}
      setCurrentStepperPosition={surveyBuilderAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displaySurveyBuilderForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function handleExpenseClaimFormSubmit() {
      console.log('handleExpenseClaimFormSubmit');
    }

    if (triggerFormSubmit) {
      handleExpenseClaimFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displaySurveyBuilderComponent}</>;
}

export { SurveyBuilder };
