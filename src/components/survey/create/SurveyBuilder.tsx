import { Flex, Modal, Text, Title } from '@mantine/core';
import { Group, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbChartPie4, TbEye, TbHelp, TbPlus, TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessibleButtonElements,
  returnAccessibleDateTimeElements,
  returnAccessibleDynamicRadioGroupInputsElements,
  returnAccessibleDynamicTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { ResourceRequestServerResponse } from '../../../types';
import {
  addFieldsToObject,
  logState,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  urlBuilder,
} from '../../../utils';
import { CustomNotification } from '../../customNotification';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
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
import PreviewSurvey from '../preview/PreviewSurvey';
import {
  SurveyBuilderDocument,
  SurveyRecipient,
  SurveyStatistics,
} from '../types';
import {
  createSurveyFormReviewObject,
  mergeSurveyQuestionsGroup,
  setSurveyQuestions,
} from '../utils';
import {
  initialSurveyBuilderState,
  surveyBuilderAction,
  surveyBuilderReducer,
} from './state';

function SurveyBuilder() {
  /** ------------- begin hooks ------------- */
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

    surveyStatistics,

    triggerFormSubmit,
    submitButtonDisabled,
    triggerPreviewSurvey,
    previewSurveyProps,

    stepperDescriptionObjects,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = surveyBuilderState;
  const {
    authState: { accessToken },
  } = useAuth();

  const {
    globalState: {
      themeObject: { colorScheme, primaryColor, primaryShade },
    },
    globalDispatch,
  } = useGlobalState();

  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const [openedHelpModal, { open: openHelpModal, close: closeHelpModal }] =
    useDisclosure(false);
  const [
    openedPreviewSurveyModal,
    { open: openPreviewSurveyModal, close: closePreviewSurveyModal },
  ] = useDisclosure(false);

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // submit survey form
  useEffect(() => {
    let isMounted = true;
    const surveyQuestions = setSurveyQuestions({
      questions,
      responseKinds,
      responseInputHtml,
      responseDataOptionsArray,
    });
    const controller = new AbortController();

    async function handleSurveySubmit() {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: 'actions/outreach/survey',
      });

      const body = JSON.stringify({
        survey: {
          surveyTitle,
          surveyDescription,
          sendTo: surveyRecipients,
          expiryDate,
          questions: surveyQuestions,
          surveyStatistics,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<SurveyBuilderDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        surveyBuilderDispatch({
          type: surveyBuilderAction.setIsSuccessful,
          payload: true,
        });
        surveyBuilderDispatch({
          type: surveyBuilderAction.setSuccessMessage,
          payload: data.message,
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          surveyBuilderDispatch({
            type: surveyBuilderAction.setTriggerFormSubmit,
            payload: false,
          });
          surveyBuilderDispatch({
            type: surveyBuilderAction.setIsSubmitting,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleSurveySubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // this effect should only run when triggerFormSubmit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // allows repeated openings of preview modal
  useEffect(() => {
    surveyBuilderDispatch({
      type: surveyBuilderAction.setTriggerPreviewSurvey,
      payload: false,
    });
  }, [openedPreviewSurveyModal]);

  useEffect(() => {
    surveyBuilderDispatch({
      type: surveyBuilderAction.setIsLoading,
      payload: false,
    });
  }, []);

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
  }, [questions, stepperDescriptionObjects.length, width]);

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
  }, [responseDataOptionsArray, currentStepperPosition]);

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

  // create surveyStatistics on every responseDataOptions change
  useEffect(() => {
    if (!questions.length || !questions[0].length) {
      return;
    }

    // each question group has a corresponding surveyStatistics object that is added to the final survey object on submit
    const surveyStatistics = questions.reduce(
      (
        surveyStatisticsAcc: SurveyStatistics[],
        question: string,
        questionIdx
      ) => {
        // the responseDistribution object will differ according to the responseKind
        const responseInput = responseInputHtml[questionIdx];

        // regardless of the responseKind, the surveyStatistics will have the question, totalResponses and responseInput fields
        let surveyStatisticObj = addFieldsToObject({
          object: Object.create(null),
          fieldValuesTuples: [
            ['question', question],
            ['totalResponses', 0],
            ['responseInput', responseInput],
          ],
        });

        if (responseInput === 'checkbox' || responseInput === 'radio') {
          const responseDataOptions = responseDataOptionsArray[questionIdx];
          if (!responseDataOptions) {
            return surveyStatisticsAcc;
          }
          // all questions require an answer before submission, so there are no 'No responses' option

          //for 'checkbox' || 'radio', responseDistribution object has keys that are the response options and values that are the total responses for that option (initialized to 0)
          const responseDistribution = responseDataOptions.reduce(
            (
              responseDistributionAcc: Record<string, 0>,
              responseDataOption: string
            ) => {
              responseDistributionAcc = addFieldsToObject({
                object: responseDistributionAcc,
                fieldValuesTuples: [[responseDataOption, 0]],
              });

              return responseDistributionAcc;
            },
            Object.create(null)
          );

          surveyStatisticObj = addFieldsToObject({
            object: surveyStatisticObj,
            fieldValuesTuples: [['responseDistribution', responseDistribution]],
          });
        }
        // agreeDisagree inputs share the same responseDistribution structure
        else if (responseInput === 'agreeDisagree') {
          const responseDistribution = {
            'Strongly disagree': 0,
            Disagree: 0,
            'Neither agree nor disagree': 0,
            Agree: 0,
            'Strongly agree': 0,
          };

          surveyStatisticObj = addFieldsToObject({
            object: surveyStatisticObj,
            fieldValuesTuples: [['responseDistribution', responseDistribution]],
          });
        } else {
          // for ratings: 'emotion' and 'stars'
          const responseDistribution = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
          };

          surveyStatisticObj = addFieldsToObject({
            object: surveyStatisticObj,
            fieldValuesTuples: [['responseDistribution', responseDistribution]],
          });
        }

        surveyStatisticsAcc.push(surveyStatisticObj as SurveyStatistics);

        return surveyStatisticsAcc;
      },
      []
    );

    surveyBuilderDispatch({
      type: surveyBuilderAction.setSurveyStatistics,
      payload: surveyStatistics,
    });
  }, [questions, responseDataOptionsArray, responseInputHtml]);

  // ensures 'Add option' button's disabled prop always receives the correct state
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

  // check submit button disabled state on every change
  useEffect(() => {
    const isDisabled =
      !isValidSurveyTitle ||
      !isValidExpiryDate ||
      !isValidSurveyDescription ||
      questions.length === 0 ||
      areValidQuestions.includes(false) ||
      responseDataOptionsArray.includes([]) ||
      areResponseDataOptionsValid.flat().includes(false) ||
      isMaxResponseDataOptionsReached.includes(true) ||
      stepsInError.size > 0;

    surveyBuilderDispatch({
      type: surveyBuilderAction.setSubmitButtonDisabled,
      payload: isDisabled,
    });
  }, [
    responseKinds,
    responseInputHtml,
    responseDataOptionsArray,
    isValidSurveyTitle,
    isValidExpiryDate,
    isValidSurveyDescription,
    questions.length,
    areValidQuestions,
    areResponseDataOptionsValid,
    isMaxResponseDataOptionsReached,
    stepsInError.size,
  ]);

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
      // data options must be present for checkbox and radio inputs
      const currentInputHtml = responseInputHtml[index];
      const correspondingDataOptions = responseDataOptionsArray?.[index];
      const isDataOptionsPresent =
        currentInputHtml === 'checkbox' || currentInputHtml === 'radio'
          ? correspondingDataOptions?.length > 0
          : true;

      isValidQuestion && isDataOptionsPresent
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
  }, [
    areValidQuestions,
    currentStepperPosition,
    areResponseDataOptionsValid,
    responseKinds,
    responseInputHtml,
    responseDataOptionsArray,
  ]);

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

  // set preview survey props on trigger preview survey button
  useEffect(() => {
    if (triggerPreviewSurvey) {
      const surveyQuestions = setSurveyQuestions({
        questions,
        responseKinds,
        responseInputHtml,
        responseDataOptionsArray,
      });

      surveyBuilderDispatch({
        type: surveyBuilderAction.setPreviewSurveyProps,
        payload: {
          surveyTitle,
          surveyDescription,
          surveyQuestions,
        },
      });

      openPreviewSurveyModal();
    }
  }, [triggerPreviewSurvey]);

  useEffect(() => {
    logState({
      state: surveyBuilderState,
      groupLabel: 'survey builder state',
    });
  }, [surveyBuilderState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={surveyBuilderDispatch}
        navigateTo={{
          successPath: '/home/outreach/survey-builder/display',
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  /** ------------- begin text inputs validation ------------- */
  const [titleInputErrorText, titleInputValidText] =
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'expiry date',
      inputText: expiryDate,
      isInputTextFocused: isExpiryDateFocused,
      isValidInputText: isValidExpiryDate,
      regexValidationText: returnDateNearFutureValidationText(expiryDate),
    });

  const [questionInputsErrorText, questionInputsValidText] =
    AccessibleErrorValidTextElementsForDynamicInputs({
      semanticName: 'question',
      inputTextArray: questions,
      areValidInputTexts: areValidQuestions,
      areInputTextsFocused: areQuestionsFocused,
      regexValidationProps: questions.map((question) => ({
        content: question,
        contentKind: 'question',
        minLength: 2,
        maxLength: 100,
      })),
      regexValidationFunction: returnGrammarValidationText,
    });

  const responseDataOptionsErrorValidTextArrays: [
    JSX.Element[],
    JSX.Element[]
  ][] = responseDataOptionsArray.map((responseDataOptions, questionIdx) => {
    const [responseDataOptionsErrorTexts, responseDataOptionsValidTexts] =
      AccessibleErrorValidTextElementsForDynamicInputs({
        semanticName: `Question ${questionIdx + 1}: option`,
        inputTextArray: responseDataOptions,
        areValidInputTexts: areResponseDataOptionsValid?.[questionIdx],
        areInputTextsFocused: areResponseDataOptionsFocused?.[questionIdx],
        regexValidationProps: responseDataOptions.map((responseDataOption) => ({
          content: responseDataOption,
          contentKind: 'text',
          minLength: 2,
          maxLength: 100,
        })),
        regexValidationFunction: returnGrammarValidationText,
      });

    return [responseDataOptionsErrorTexts, responseDataOptionsValidTexts];
  });
  /** ------------- end text inputs validation ------------- */

  /** ------------- begin input creators info objects */
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
      const deleteQuestionGroupLabel =
        questions.length === 1
          ? 'Survey must have atleast one question'
          : `Delete ${
              questions[index].length > 11
                ? questions[index].slice(0, 11) + '...'
                : questions[index]
            } ?`;

      const createdDeleteQuestionGroupButton = returnAccessibleButtonElements([
        {
          buttonLabel: 'Delete',
          semanticDescription: `Delete question group ${index + 1}`,
          semanticName: `question ${index + 1}`,
          buttonDisabled: questions.length === 1,
          buttonOnClick: () => {
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
        },
      ]);

      const createdDeleteButtonWithTooltip = (
        <Tooltip label={deleteQuestionGroupLabel}>
          <Group>{createdDeleteQuestionGroupButton}</Group>
        </Tooltip>
      );

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
        minLength: 2,
        maxLength: 100,
        placeholder: 'Enter question',
        semanticName: `question ${index + 1}`,
        required: true,
        // dynamicInputProps: {
        //   dynamicIndex: index,
        //   buttonDisabled: questions.length === 1,
        //   dynamicLabel: dynamicInputLabel,
        //   dynamicInputOnClick: () => {
        //     surveyBuilderDispatch({
        //       type: surveyBuilderAction.deleteQuestionGroup,
        //       payload: index,
        //     });
        //     // enables display of the previous stepper page after deletion
        //     surveyBuilderDispatch({
        //       type: surveyBuilderAction.setCurrentStepperPosition,
        //       payload: currentStepperPosition - 1,
        //     });
        //   },
        //   semanticAction: 'delete',
        // },
        dynamicInputs: [createdDeleteButtonWithTooltip],
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
        description: 'If radio or checkbox, data options must be present',
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
          const deleteResponseDataLabel = `Delete ${
            questions?.[questionIdx]?.length > 11
              ? questions?.[questionIdx].slice(0, 11) + '...'
              : questions?.[questionIdx]
          } ${questions?.[questionIdx]?.length > 0 ? ':' : ''} ${
            responseDataOptionsArray?.[questionIdx]?.[optionIdx]?.length > 11
              ? responseDataOptionsArray?.[questionIdx]?.[optionIdx]?.slice(
                  0,
                  11
                ) + '...'
              : responseDataOptionsArray?.[questionIdx]?.[optionIdx]
          } ?`;

          const createdDeleteResponseDataOptionButton =
            returnAccessibleButtonElements([
              {
                buttonLabel: 'Delete',
                semanticDescription: `Delete response data option ${
                  optionIdx + 1
                } for question ${questionIdx + 1}`,
                semanticName: `response data option ${
                  optionIdx + 1
                } for question ${questionIdx + 1}`,
                buttonOnClick: () => {
                  surveyBuilderDispatch({
                    type: surveyBuilderAction.deleteResponseDataOption,
                    payload: {
                      questionIdx,
                      optionIdx,
                    },
                  });
                },
              },
            ]);

          const createdDeleteButtonWithTooltip = (
            <Tooltip label={deleteResponseDataLabel}>
              <Group>{createdDeleteResponseDataOptionButton}</Group>
            </Tooltip>
          );

          const creatorInfoObject: AccessibleTextInputCreatorInfo = {
            description: {
              error:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[0]?.[
                  optionIdx
                ],
              valid:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[1]?.[
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
            minLength: 2,
            maxLength: 100,
            placeholder: 'Enter a response option answer',
            ref:
              optionIdx === responseDataOptionsArray?.[questionIdx]?.length - 1
                ? newResponseDataOptionInputRef
                : null,
            semanticName: `Question ${questionIdx + 1}: option-${
              optionIdx + 1
            }`,
            required: true,
            // dynamicInputProps: {
            //   dynamicIndex: optionIdx,
            //   dynamicLabel: dynamicInputLabel,
            //   dynamicInputOnClick: () => {
            //     surveyBuilderDispatch({
            //       type: surveyBuilderAction.deleteResponseDataOption,
            //       payload: {
            //         questionIdx,
            //         optionIdx,
            //       },
            //     });
            //   },
            //   semanticAction: 'delete',
            // },
            dynamicInputs: [createdDeleteButtonWithTooltip],
          };

          return creatorInfoObject;
        });

      return responseDataOptionsTextInputCreatorInfo;
    });

  const textColor =
    colorScheme === 'light'
      ? `${primaryColor}.${primaryShade.light}`
      : `${primaryColor}.${primaryShade.dark}`;
  const addNewQuestionButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    // buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new question">
        <Group>
          <Text color={textColor}>Add question</Text>
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
        // buttonVariant: 'outline',
        buttonLabel: (
          <Tooltip
            label={
              isMaxResponseDataOptionsReached?.[index]
                ? 'Max response data options reached'
                : 'Add new response data option'
            }
          >
            <Group>
              <Text color={textColor}>Add option</Text>
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
    rightIcon: <TbChartPie4 />,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    buttonDisabled: submitButtonDisabled,
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

  const previewSurveyButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Preview',
    semanticDescription: 'View survey as it would appear to respondents',
    semanticName: 'preview survey button',
    leftIcon: <TbEye />,
    rightIcon: <TbChartPie4 />,
    buttonOnClick: () => {
      surveyBuilderDispatch({
        type: surveyBuilderAction.setTriggerPreviewSurvey,
        payload: true,
      });
    },
    buttonDisabled: submitButtonDisabled,
  };

  /** ------------- end input creators info objects ------------- */

  /** ------------- begin input creators ------------- */
  const displayHelpTextModal = (
    <Modal
      opened={openedHelpModal}
      onClose={closeHelpModal}
      centered
      title={<Title order={3}>Help</Title>}
    >
      <Flex direction="column" align="center" justify="flex-start" rowGap="xs">
        <Text>
          <strong>Question: </strong>Enter a question for your survey. Your
          survey can have multiple questions (currently a maximum of 3).
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text>Example: How do you typically commute to work?</Text>
        </Group>

        <Text>
          <strong>Response kind:</strong> Select the type of response you want
          to collect for your question from the entered options. Choose 'Choose
          one' for a single response, or 'Choose any' for multiple responses, or
          'Rating' for a rating.
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text>
            Example: 'Choose one' or 'Choose any' for answer relating to
            commute.
          </Text>
        </Group>

        <Text>
          <strong>Input kind</strong>: Select the type of HTML input you want to
          use for your response. Currently, there are 'Agree/Disagree', 'Radio',
          'Checkbox', and 'Emotion', 'Stars'.
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text>
            Example: 'Radio' to constrain response to single choice. 'Checkbox'
            to allow multiple choices.
          </Text>
        </Group>

        <Text>
          <strong>Response data options:</strong> Enter the response data
          options for your question (currently a maximum of 7 options per
          question).
        </Text>
        <Group w="100%" position="left" pl="sm">
          <Text>
            Example: 'Personal vehicle', 'Public transport', 'Ride share', etc.
            Each response data option input corresponds to a choice.
          </Text>
        </Group>
      </Flex>
    </Modal>
  );

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

  const [
    createdAddNewQuestionButton,
    createdHelpButton,
    createdSubmitButton,
    createdPreviewSurveyButton,
  ] = returnAccessibleButtonElements([
    addNewQuestionButtonCreatorInfo,
    helpButtonCreatorInfo,
    submitButtonCreatorInfo,
    previewSurveyButtonCreatorInfo,
  ]);

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

  const previewSurveyModal = (
    <Modal
      opened={openedPreviewSurveyModal}
      onClose={closePreviewSurveyModal}
      centered
      size={
        width < 480 ? 375 : width < 640 ? 640 : width >= 1024 ? 1024 : width
      }
    >
      <PreviewSurvey
        surveyDescription={previewSurveyProps.surveyDescription}
        surveyTitle={previewSurveyProps.surveyTitle}
        surveyQuestions={previewSurveyProps.surveyQuestions}
        closePreviewSurveyModal={closePreviewSurveyModal}
      />
    </Modal>
  );

  /** ------------- end input creators ------------- */

  /** ------------- begin layout ------------- */

  const maxStepperPosition = stepperDescriptionObjects.length;
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

  const SURVEY_BUILDER_REVIEW_OBJECT: FormReviewObject = {
    'Survey Details': [
      {
        inputName: 'Survey Title',
        inputValue: surveyTitle,
        isInputValueValid: isValidSurveyTitle,
      },
      {
        inputName: 'Survey Description',
        inputValue: surveyDescription,
        isInputValueValid: isValidSurveyDescription,
      },
      {
        inputName: 'Survey Recipients',
        inputValue: surveyRecipients,
        isInputValueValid: true,
      },
      {
        inputName: 'Expiry Date',
        inputValue: expiryDate,
        isInputValueValid: isValidExpiryDate,
      },
    ],
  };

  const dynamicSurveyBuilderReviewObject = createSurveyFormReviewObject({
    initialFormReviewObject: SURVEY_BUILDER_REVIEW_OBJECT,
    questions,
    areValidQuestions,
    responseKinds,
    responseInputHtml,
    responseDataOptionsArray,
    areResponseDataOptionsValid,
  });

  const displaySurveyBuilderReviewPage = (
    <FormReviewPage
      formReviewObject={dynamicSurveyBuilderReviewObject}
      formName="Survey Builder"
    />
  );

  const displaySubmitPreviewButtons =
    currentStepperPosition === maxStepperPosition ? (
      <Group w="100%" position="center">
        <Tooltip
          label={
            submitButtonDisabled
              ? 'Please fix errors to enable preview survey button'
              : `Preview survey: ${
                  surveyTitle.length > 23
                    ? surveyTitle.slice(0, 23) + '...'
                    : surveyTitle
                }`
          }
        >
          <Group>{createdPreviewSurveyButton}</Group>
        </Tooltip>
        <Tooltip
          label={
            submitButtonDisabled
              ? 'Please fix errors before submitting'
              : `Submit survey: ${
                  surveyTitle.length > 23
                    ? surveyTitle.slice(0, 23) + '...'
                    : surveyTitle
                }`
          }
        >
          <Group>{createdSubmitButton}</Group>
        </Tooltip>
      </Group>
    ) : null;

  const questionsLength = questions.length;

  const displaySurveyBuilderForm =
    currentStepperPosition === 0 ? (
      displaySurveyDetailsFormPageOne
    ) : currentStepperPosition === 1 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(0, 1)}
      </FormLayoutWrapper>
    ) : currentStepperPosition === maxStepperPosition - 1 ? (
      displaySurveyBuilderReviewPage
    ) : currentStepperPosition === maxStepperPosition ? (
      displaySubmitPreviewButtons
    ) : currentStepperPosition === maxStepperPosition - questionsLength ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(
          maxStepperPosition - questionsLength - 1,
          maxStepperPosition - questionsLength
        )}
      </FormLayoutWrapper>
    ) : currentStepperPosition === maxStepperPosition - questionsLength + 1 ? (
      <FormLayoutWrapper>
        {mergedSurveyQuestionsGroups.slice(
          maxStepperPosition - questionsLength,
          maxStepperPosition - questionsLength + 1
        )}
      </FormLayoutWrapper>
    ) : null;

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
      {previewSurveyModal}
      {displayHelpTextModal}
    </StepperWrapper>
  );
  /** ------------- end layout ------------- */

  return displaySurveyBuilderComponent;
}

export default SurveyBuilder;
