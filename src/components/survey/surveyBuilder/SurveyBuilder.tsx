import {
  Accordion,
  Button,
  Flex,
  HoverCard,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { Group, Tooltip } from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { TbHelp, TbPlus, TbUpload } from 'react-icons/tb';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
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
  logState,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
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
  SURVEY_MAX_RESPONSE_DATA_OPTIONS,
} from '../constants';
import { mergeSurveyQuestionsGroup } from '../utils';
import {
  initialSurveyBuilderState,
  surveyBuilderAction,
  surveyBuilderReducer,
} from './state';
import { SurveyRecipient } from './types';
import { useDisclosure } from '@mantine/hooks';

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

  const [openedHelpModal, { open: openHelpModal, close: closeHelpModal }] =
    useDisclosure(false);

  const newQuestionInputRef = useRef<HTMLInputElement>(null);
  // set focus on new question input
  useEffect(() => {
    newQuestionInputRef.current?.focus();
  }, [questions.length]);
  const newResponseDataOptionInputRef = useRef<HTMLInputElement>(null);
  // set focus on new response data option input
  useEffect(() => {
    newResponseDataOptionInputRef.current?.focus();
  }, [responseDataOptionsArray.length]);

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
  }, [responseDataOptionsArray]);

  // validate max response data options on every change
  useEffect(() => {
    responseDataOptionsArray.forEach((responseDataOptions, index) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsMaxResponseDataOptionsReached,
        payload: {
          index,
          value:
            responseDataOptions.length === SURVEY_MAX_RESPONSE_DATA_OPTIONS,
        },
      });
    });
  }, [responseDataOptionsArray]);

  // on every response type change, set the corresponding input kind as default
  // as logic for display of 'Add option' button depends on a state change and component rerender
  useEffect(() => {
    responseKinds.forEach((responseKind, index) => {
      switch (responseKind) {
        case 'chooseOne': {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseInputHtml,
            payload: {
              index,
              value: 'radio',
            },
          });
          break;
        }
        case 'chooseAny': {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseInputHtml,
            payload: {
              index,
              value: 'checkbox',
            },
          });
          break;
        }
        case 'rating': {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setResponseInputHtml,
            payload: {
              index,
              value: 'emotion',
            },
          });
          break;
        }
        default:
          break;
      }
    });
  }, [responseKinds]);

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

  // validate stepper state on every dynamically created response data options input groups
  useEffect(() => {
    areResponseDataOptionsValid.forEach(
      (areValidResponseDataOptions, index) => {
        const isAnyResponseDataForQuestionInError =
          areValidResponseDataOptions.some(
            (isValidResponseDataOption) => !isValidResponseDataOption
          );

        isAnyResponseDataForQuestionInError
          ? surveyBuilderDispatch({
              type: surveyBuilderAction.setStepsInError,
              payload: {
                kind: 'add',
                step: index + 1,
              },
            })
          : surveyBuilderDispatch({
              type: surveyBuilderAction.setStepsInError,
              payload: {
                kind: 'delete',
                step: index + 1,
              },
            });
      }
    );
  }, [areResponseDataOptionsValid]);

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
      regexValidationProps: questions.map((question) => ({
        content: question,
        contentKind: 'question',
        minLength: 2,
        maxLength: 75,
      })),
      regexValidationFunction: returnGrammarValidationText,
    });

  const responseDataOptionsErrorValidTextArrays: [
    JSX.Element[],
    JSX.Element[]
  ][] = responseDataOptionsArray.map((responseDataOptions, questionIdx) => {
    const [responseDataOptionsErrorTexts, responseDataOptionsValidTexts] =
      returnAccessibleErrorValidTextElementsForDynamicInputs({
        semanticName: `Question ${questionIdx + 1}: option`,
        inputTextArray: responseDataOptions,
        areValidInputTexts: areResponseDataOptionsValid?.[questionIdx],
        areInputTextsFocused: areResponseDataOptionsFocused?.[questionIdx],
        regexValidationProps: responseDataOptions.map((responseDataOption) => ({
          content: responseDataOption,
          contentKind: 'text',
          minLength: 2,
          maxLength: 75,
        })),
        regexValidationFunction: returnGrammarValidationText,
      });

    return [responseDataOptionsErrorTexts, responseDataOptionsValidTexts];
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
      const dynamicInputLabel =
        questions.length === 1
          ? 'Survey must have atleast one question'
          : `Delete ${
              questions[index].length > 11
                ? // rome-ignore lint/style/useTemplate: <explanation>
                  questions[index].slice(0, 11) + '...'
                : questions[index]
            } ?`;

      const creatorInfoObject: AccessibleTextInputCreatorInfo = {
        description: {
          error: questionInputsErrorText?.[index],
          valid: questionInputsValidText?.[index],
        },
        inputText: questions?.[index],
        isValidInputText: areValidQuestions?.[index],
        label: `Question: ${index + 1}`,
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
        dynamicInputProps: {
          dynamicIndex: index,
          buttonDisabled: questions.length === 1,
          dynamicLabel: dynamicInputLabel,
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
        value: responseKinds?.[index],
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
          responseKinds?.[index]
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
        value: responseInputHtml?.[index],
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const responseDataOptionsTextInputCreatorInfoArray: AccessibleTextInputCreatorInfo[][] =
    Array.from({
      length: responseDataOptionsArray?.length,
    }).map((_, questionIdx) => {
      const responseDataOptionsTextInputCreatorInfo: AccessibleTextInputCreatorInfo[] =
        Array.from({
          length: responseDataOptionsArray?.[questionIdx]?.length,
        }).map((_, optionIdx) => {
          const dynamicInputLabel = `Delete ${
            questions[questionIdx].length > 11
              ? // rome-ignore lint/style/useTemplate: <explanation>
                questions[questionIdx].slice(0, 11) + '...'
              : questions[questionIdx]
          } ${questions[questionIdx].length > 0 ? ':' : ''} ${
            responseDataOptionsArray?.[questionIdx]?.[optionIdx].length > 11
              ? // rome-ignore lint/style/useTemplate: <explanation>
                responseDataOptionsArray?.[questionIdx]?.[optionIdx].slice(
                  0,
                  11
                ) + '...'
              : responseDataOptionsArray?.[questionIdx]?.[optionIdx]
          } ?`;

          const creatorInfoObject: AccessibleTextInputCreatorInfo = {
            description: {
              error:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[0][
                  optionIdx
                ],
              valid:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[1][
                  optionIdx
                ],
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
            placeholder: 'Enter a response option answer',
            ref:
              optionIdx === responseDataOptionsArray?.[questionIdx]?.length - 1
                ? newResponseDataOptionInputRef
                : null,
            semanticName: `Question ${questionIdx + 1}: option-${
              optionIdx + 1
            }`,
            required: true,
            dynamicInputProps: {
              dynamicIndex: optionIdx,
              dynamicLabel: dynamicInputLabel,
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

  const addNewQuestionButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonVariant: 'outline',

    buttonLabel: (
      <Tooltip label="Add new question">
        <Group>
          <Text>Add question</Text>
        </Group>
      </Tooltip>
    ),
    leftIcon: <TbPlus />,
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

      surveyBuilderDispatch({
        type: surveyBuilderAction.setResponseDataOptionsCounts,
        payload: {
          questionIdx: questions.length,
          kind: 'increment',
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
          <Tooltip
            label={
              isMaxResponseDataOptionsReached?.[index]
                ? 'Max response data options reached'
                : 'Add new response data option'
            }
          >
            <Group>
              <Text>Add option</Text>
            </Group>
          </Tooltip>
        ),
        buttonDisabled: isMaxResponseDataOptionsReached?.[index],
        leftIcon: <TbPlus />,
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
          surveyBuilderDispatch({
            type: surveyBuilderAction.setIsMaxResponseDataOptionsReached,
            payload: {
              index: index,
              value: false,
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

  const helpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Help',
    semanticDescription: 'survey builder help button',
    semanticName: 'help button',
    leftIcon: <TbHelp />,
    buttonOnClick: () => {
      openHelpModal();
    },
  };

  const [createdSurveyDescriptionTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      surveyDescriptionTextAreaInputCreatorInfo,
    ]);

  const [createdSurveyRecipientsSelectInput] =
    returnAccessibleSelectInputElements([
      surveyRecipientsSelectInputCreatorInfo,
    ]);

  const [createdExpiryDateInput] = returnAccessibleDateTimeElements([
    expiryDateInputCreatorInfo,
  ]);

  const [createdSurveyTitleInput] = returnAccessibleTextInputElements([
    surveyTitleInputCreatorInfo,
  ]);

  const createdQuestionsTextInputs = returnAccessibleDynamicTextInputElements(
    questionsInputCreatorInfo
  );

  const createdResponseDataOptionsTextInputs =
    responseDataOptionsTextInputCreatorInfoArray.map(
      (responseDataOptionsTextInputCreatorInfo, index) =>
        responseInputHtml[index] === 'checkbox' ||
        responseInputHtml[index] === 'radio'
          ? returnAccessibleDynamicTextInputElements(
              responseDataOptionsTextInputCreatorInfo
            )
          : null
    );

  const createdResponseKindRadioGroups =
    returnAccessibleDynamicRadioGroupInputsElements(
      responseKindRadioGroupCreatorInfo
    );

  const createdResponseInputHtmlRadioGroups =
    returnAccessibleDynamicRadioGroupInputsElements(
      responseInputHtmlRadioGroupCreatorInfo
    );

  const [createdAddNewQuestionButton, createdHelpButton, createdSubmitButton] =
    returnAccessibleButtonElements([
      addNewQuestionButtonCreatorInfo,
      helpButtonCreatorInfo,
      submitButtonCreatorInfo,
    ]);

  const displayHelpTextModal = (
    <Modal
      opened={openedHelpModal}
      onClose={closeHelpModal}
      centered
      title={
        <Text size="xl" color="dark">
          Help
        </Text>
      }
    >
      <Flex direction="column" align="center" justify="flex-start" rowGap="xs">
        <Text size="sm" color="dark">
          <strong>Question: </strong>Enter a question for your survey. Your
          survey can have multiple questions (currently a maximum of 3).
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text size="sm" color="dark">
            Example: How do you typically commute to work?
          </Text>
        </Group>

        <Text size="sm" color="dark">
          <strong>Response kind:</strong> Select the type of response you want
          to collect for your question from the entered options. Choose 'Choose
          one' for a single response, or 'Choose any' for multiple responses, or
          'Rating' for a rating.
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text size="sm" color="dark">
            Example: 'Choose one' or 'Choose any' for answer relating to
            commute.
          </Text>
        </Group>

        <Text size="sm" color="dark">
          <strong>Input kind</strong>: Select the type of HTML input you want to
          use for your response. Currently, there are 'Agree/Disagree', 'Radio',
          'Checkbox', and 'Emotion', 'Stars'.
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text size="sm" color="dark">
            Example: 'Radio' to constrain response to single choice. 'Checkbox'
            to allow multiple choices.
          </Text>
        </Group>

        <Text size="sm" color="dark">
          <strong>Response data options:</strong> Enter the response data
          options for your question (currently a maximum of 7 options per
          question).
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text size="sm" color="dark">
            Example: 'Personal vehicle', 'Public transport', 'Ride share ', etc.
            Each response data option input corresponds to a choice.
          </Text>
        </Group>
      </Flex>
    </Modal>
  );

  const createdAddNewResponseDataOptionButtons =
    addNewResponseDataOptionButtonCreatorInfo.map(
      (addNewResponseDataOptionButtonCreatorInfo, index) =>
        responseInputHtml[index] === 'checkbox' ||
        responseInputHtml[index] === 'radio'
          ? returnAccessibleButtonElements([
              addNewResponseDataOptionButtonCreatorInfo,
            ])
          : null
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
    createdHelpButton,
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
    logState({
      state: surveyBuilderState,
      groupLabel: 'survey builder state',
    });
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
      {displayHelpTextModal}
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
