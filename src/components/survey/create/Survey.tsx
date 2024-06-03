import { Container, Group, Stack } from "@mantine/core";
import { useReducer } from "react";

import { StepperChild, StepperPage } from "../../../types";
import { logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleRadioInputGroup } from "../../accessibleInputs/AccessibleRadioInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  INDEX_ALPHABET_TABLE,
  MAX_INPUTS_AMOUNT,
  SURVEY_MAX_QUESTION_AMOUNT,
  SURVEY_RECIPIENT_DATA,
  SURVEY_RESPONSE_INPUTS,
  SURVEY_RESPONSE_KIND_DATA,
} from "../constants";
import { SurveyRecipient, SurveyResponseKind } from "../types";
import { SurveyAction, surveyAction } from "./actions";
import { surveyReducer } from "./reducers";
import { initialSurveyState } from "./state";
import { makeSurveyStateForStepper, returnCorrectResponseInputData } from "./utils";

function Survey() {
  const [surveyState, surveyDispatch] = useReducer(surveyReducer, initialSurveyState);

  const {
    expiryDate,
    isSubmitting,
    isSuccessful,
    pagesInError,
    previewSurveyProps,
    questions,
    responseOptions,
    responseInputs,
    responseKinds,
    surveyDescription,
    surveyRecipients,
    surveyStatistics,
    surveyTitle,
    stepperPages,
    triggerFormSubmit,
    triggerPreviewSurvey,
  } = surveyState;

  logState({
    state: surveyState,
    groupLabel: "survey state",
  });

  const surveyTitleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: surveyAction.setPageInError,
        name: "surveyTitle",
        parentDispatch: surveyDispatch,
        stepperPages,
        validValueAction: surveyAction.setSurveyTitle,
        value: surveyTitle,
      }}
    />
  );

  const surveyDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: surveyAction.setPageInError,
        name: "surveyDescription",
        parentDispatch: surveyDispatch,
        stepperPages,
        validValueAction: surveyAction.setSurveyDescription,
        value: surveyDescription,
      }}
    />
  );

  const expiryDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: surveyAction.setPageInError,
        name: "expiryDate",
        parentDispatch: surveyDispatch,
        stepperPages,
        validValueAction: surveyAction.setExpiryDate,
        value: expiryDate,
      }}
    />
  );

  const surveyRecipientsSelectInput = (
    <AccessibleSelectInput<SurveyAction["setSurveyRecipients"], SurveyRecipient>
      attributes={{
        data: SURVEY_RECIPIENT_DATA,
        name: "surveyRecipients",
        parentDispatch: surveyDispatch,
        validValueAction: surveyAction.setSurveyRecipients,
        value: surveyRecipients,
      }}
    />
  );

  const questionPages = questions.map(function questionsMapCB(question, questionIndex) {
    const pageIndex = questionIndex + 1;

    const addQuestionButton = (
      <AccessibleButton
        attributes={{
          enabledScreenreaderText: `Add new Question ${pageIndex + 1}`,
          disabledScreenreaderText: "Max question amount reached",
          disabled: questions.length === SURVEY_MAX_QUESTION_AMOUNT,
          kind: "add",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            surveyDispatch({
              action: surveyAction.addQuestion,
              payload: void 0,
            });

            const newQuestion: StepperChild = {
              inputType: "text",
              name: `question ${pageIndex + 1}`,
              validationKey: "textInput",
            };

            const newResponseKind: StepperChild = {
              inputType: "select",
              name: `responseKinds ${pageIndex + 1}`,
              selectInputData: SURVEY_RESPONSE_KIND_DATA,
            };

            const newResponseInput: StepperChild = {
              inputType: "select",
              name: `responseInputs ${pageIndex + 1}`,
              selectInputData: SURVEY_RESPONSE_INPUTS,
            };

            const newResponseOptions: StepperChild = {
              inputType: "text",
              name: `responseOption ${pageIndex + 1} A`,
              validationKey: "textInput",
            };

            const newPage: StepperPage = {
              children: [
                newQuestion,
                newResponseKind,
                newResponseInput,
                newResponseOptions,
              ],
              description: `Question ${questions.length + 1}`,
            };

            surveyDispatch({
              action: surveyAction.addStepperPage,
              payload: {
                dynamicIndexes: [pageIndex + 1],
                value: newPage,
              },
            });
          },
        }}
      />
    );

    const questionTextInput = (
      <AccessibleTextInput
        attributes={{
          dynamicIndexes: [questionIndex],
          invalidValueAction: surveyAction.setPageInError,
          name: `question ${pageIndex}`,
          parentDynamicDispatch: surveyDispatch,
          stepperPages,
          validValueAction: surveyAction.setQuestions,
          value: question,
        }}
      />
    );

    const responseKind = responseKinds[questionIndex];

    const responseKindRadioGroup = (
      <AccessibleRadioInputGroup<SurveyAction["setResponseKinds"], SurveyResponseKind>
        attributes={{
          // data: ["chooseAny", "chooseOne", "rating"],
          data: SURVEY_RESPONSE_KIND_DATA,
          dynamicIndexes: [questionIndex],
          label: "Response Kind",
          name: `responseKinds ${pageIndex}`,
          parentDynamicDispatch: surveyDispatch,
          validValueAction: surveyAction.setResponseKinds,
          value: responseKind,
        }}
      />
    );

    const responseInputData = returnCorrectResponseInputData(responseKind);

    const responseInput = responseInputs[questionIndex];
    const responseInputsRadioGroup = (
      <AccessibleRadioInputGroup
        attributes={{
          data: responseInputData,
          dynamicIndexes: [questionIndex],
          label: "Response Input",
          name: `responseInputs ${pageIndex}`,
          parentDynamicDispatch: surveyDispatch,
          validValueAction: surveyAction.setResponseInputs,
          value: responseInput,
        }}
      />
    );

    const responseOptionArray = responseOptions[questionIndex];

    const responseOptionsTextInputs =
      responseKind === "rating"
        ? null
        : responseOptionArray.map((responseOption, optionIndex) => {
            const responseOptionTextAreaInput = (
              <AccessibleTextAreaInput
                attributes={{
                  dynamicIndexes: [questionIndex, optionIndex],
                  invalidValueAction: surveyAction.setPageInError,
                  name: `responseOption ${pageIndex} ${
                    INDEX_ALPHABET_TABLE[optionIndex] ?? optionIndex + 1
                  }`,
                  parentDynamicDispatch: surveyDispatch,
                  stepperPages,
                  validValueAction: surveyAction.setResponseOptions,
                  value: responseOption,
                }}
              />
            );

            const deleteResponseOptionButton = (
              <AccessibleButton
                attributes={{
                  enabledScreenreaderText: `Delete Response Option ${pageIndex} ${
                    INDEX_ALPHABET_TABLE[optionIndex] ?? optionIndex + 1
                  }`,
                  index: optionIndex,
                  kind: "delete",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    surveyDispatch({
                      action: surveyAction.deleteResponseOption,
                      payload: [questionIndex, optionIndex],
                    });
                  },
                }}
              />
            );

            const insertResponseOptionButton = (
              <AccessibleButton
                attributes={{
                  disabled: optionIndex === MAX_INPUTS_AMOUNT - 1,
                  disabledScreenreaderText: "Max input amount reached",
                  enabledScreenreaderText: `Insert option before Response Option ${pageIndex} ${
                    INDEX_ALPHABET_TABLE[optionIndex] ?? optionIndex + 1
                  }`,
                  index: optionIndex,
                  kind: "insert",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    surveyDispatch({
                      action: surveyAction.insertResponseOption,
                      payload: [questionIndex, optionIndex],
                    });
                  },
                }}
              />
            );

            const slideResponseOptionUpButton = (
              <AccessibleButton
                attributes={{
                  disabled: optionIndex === 0,
                  disabledScreenreaderText: "Cannot move up. Already at the top",
                  enabledScreenreaderText: `Move Response Option ${pageIndex} ${
                    INDEX_ALPHABET_TABLE[optionIndex] ?? optionIndex + 1
                  } up`,
                  index: optionIndex,
                  kind: "up",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    surveyDispatch({
                      action: surveyAction.slideResponseOptionUp,
                      payload: [questionIndex, optionIndex],
                    });
                  },
                }}
              />
            );

            const slideResponseOptionDownButton = (
              <AccessibleButton
                attributes={{
                  disabled: optionIndex === responseOptionArray.length - 1,
                  disabledScreenreaderText: "Cannot move down. Already at the bottom",
                  enabledScreenreaderText: `Move Response Option ${pageIndex} ${
                    INDEX_ALPHABET_TABLE[optionIndex] ?? optionIndex + 1
                  } down`,
                  index: optionIndex,
                  kind: "down",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    surveyDispatch({
                      action: surveyAction.slideResponseOptionDown,
                      payload: [questionIndex, optionIndex],
                    });
                  },
                }}
              />
            );

            return (
              <Stack
                key={`${question}-${questionIndex}-${responseOption}-${optionIndex}`}
              >
                {responseOptionTextAreaInput}
                <Group>
                  {deleteResponseOptionButton}
                  {insertResponseOptionButton}
                  {slideResponseOptionUpButton}
                  {slideResponseOptionDownButton}
                </Group>
              </Stack>
            );
          });

    const addResponseOptionButton =
      responseKind === "rating" ? null : (
        <AccessibleButton
          attributes={{
            disabled: responseOptions.length === MAX_INPUTS_AMOUNT,
            disabledScreenreaderText: "Max inputs amount reached",
            enabledScreenreaderText: `Add new Response Option ${pageIndex} ${
              INDEX_ALPHABET_TABLE[responseOptionArray.length] ??
              responseOptionArray.length + 1
            }`,
            kind: "add",
            onClick: (
              _event:
                | React.MouseEvent<HTMLButtonElement, MouseEvent>
                | React.PointerEvent<HTMLButtonElement>
            ) => {
              surveyDispatch({
                action: surveyAction.addResponseOption,
                payload: [questionIndex],
              });

              // required for popover validation linking to stepper component
              const responseOptionChild: StepperChild = {
                inputType: "text",
                name: `responseOption ${pageIndex} ${
                  INDEX_ALPHABET_TABLE[responseOptionArray.length] ??
                  responseOptionArray.length - 1
                }`,
                validationKey: "textAreaInput",
              };

              surveyDispatch({
                action: surveyAction.addStepperChild,
                payload: {
                  dynamicIndexes: [pageIndex],
                  value: responseOptionChild,
                },
              });
            },
          }}
        />
      );

    return (
      <Stack key={`${question}-${questionIndex}`}>
        {addQuestionButton}
        {questionTextInput}
        {responseKindRadioGroup}
        {responseInputsRadioGroup}
        {addResponseOptionButton}
        {responseOptionsTextInputs}
      </Stack>
    );
  });

  const firstPage = (
    <Stack>
      {surveyTitleTextInput}
      {surveyDescriptionTextAreaInput}
      {expiryDateInput}
      {surveyRecipientsSelectInput}
    </Stack>
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          surveyDispatch({
            action: surveyAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: makeSurveyStateForStepper(surveyState),
        pageElements: [firstPage, ...questionPages],
        stepperPages,
        submitButton,
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default Survey;

/**
 * 
  const { wrappedFetch } = useWrapFetch();

  const {
    authState: { userId, username, roles },
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

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  

  
  // submit survey form
  useEffect(() => {
    let isMounted = true;
    const surveyQuestions = setSurveyQuestions({
      questions,
      responseKinds,
      responseInputs,
      responseOptions,
    });
    const controller = new AbortController();

    async function handleSurveySubmit() {
      surveyDispatch({
        type: surveyAction.setIsSubmitting,
        payload: true,
      });
      surveyDispatch({
        type: surveyAction.setSubmitMessage,
        payload: `Submitting survey: ${surveyTitle}...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/outreach/survey",
      });

      const body = JSON.stringify({
        surveySchema: {
          userId,
          username,
          creatorRole: roles,
          surveyTitle,
          surveyDescription,
          sendTo: surveyRecipients,
          expiryDate,
          questions: surveyQuestions,
          surveyStatistics,
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      try {
        const response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<SurveyDocument> = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        surveyDispatch({
          type: surveyAction.setIsSuccessful,
          payload: true,
        });
        surveyDispatch({
          type: surveyAction.setSuccessMessage,
          payload: data.message,
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          surveyDispatch({
            type: surveyAction.setTriggerFormSubmit,
            payload: false,
          });
          surveyDispatch({
            type: surveyAction.setIsSubmitting,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // allows repeated openings of preview modal
  useEffect(() => {
    surveyDispatch({
      type: surveyAction.setTriggerPreviewSurvey,
      payload: false,
    });
  }, [openedPreviewSurveyModal]);

  useEffect(() => {
    surveyDispatch({
      type: surveyAction.setIsLoading,
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
  }, [responseOptions.length]);

  // validate survey title on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(surveyTitle);

    surveyDispatch({
      type: surveyAction.setIsValidSurveyTitle,
      payload: isValid,
    });
  }, [surveyTitle]);

  // validate survey description on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(surveyDescription);

    surveyDispatch({
      type: surveyAction.setIsValidSurveyDescription,
      payload: isValid,
    });
  }, [surveyDescription]);

  // validate expiry date on every change
  useEffect(() => {
    // check if expiry date is valid and is in the near future
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(expiryDate) && new Date() <= new Date(expiryDate);

    surveyDispatch({
      type: surveyAction.setIsValidExpiryDate,
      payload: isValid,
    });
  }, [expiryDate]);

  // validate questions on every change
  useEffect(() => {
    const isValid = questions.map((surveyQuestion) =>
      GRAMMAR_TEXT_INPUT_REGEX.test(surveyQuestion)
    );

    surveyDispatch({
      type: surveyAction.setAreValidQuestions,
      payload: isValid,
    });

    // update the StepperWrapper description with entered question on every change
    questions.forEach((question, index) => {
      const maxSliceLength =
        width < 1440 && stepperDescriptionObjects.length > 4 ? 23 : 11;

      surveyDispatch({
        type: surveyAction.updateStepperDescriptionObjects,
        payload: {
          index: index + 1,
          value: {
            description: `Question ${index + 1}${
              question.length === 0 ? "" : ":"
            } ${question.slice(0, maxSliceLength)} ${
              question.length > maxSliceLength ? "..." : ""
            }`,
            ariaLabel: `Question ${index + 1} ${question
              .split(" ")
              .slice(0, 3)
              .join(" ")}`,
          },
        },
      });
    });
  }, [questions, stepperDescriptionObjects.length, width]);

  // validate questions length on every change
  useEffect(() => {
    const isExceeded = questions.length === SURVEY_MAX_QUESTION_AMOUNT;

    surveyDispatch({
      type: surveyAction.setIsMaxQuestionsReached,
      payload: isExceeded,
    });
  }, [questions.length]);

  // validate response data options on every change
  useEffect(() => {
    const isValid = responseOptions.map((responseDataOptions: string[]) =>
      responseDataOptions.map((responseDataOption) =>
        GRAMMAR_TEXT_INPUT_REGEX.test(responseDataOption)
      )
    );

    surveyDispatch({
      type: surveyAction.setAreResponseDataOptionsValid,
      payload: isValid,
    });
  }, [responseOptions, currentStepperPosition]);

  // validate max response data options on every change
  useEffect(() => {
    responseOptions.forEach((responseDataOptions, index) => {
      surveyDispatch({
        type: surveyAction.setIsMaxResponseDataOptionsReached,
        payload: {
          index,
          value: responseDataOptions.length === SURVEY_MAX_RESPONSE_DATA_OPTIONS,
        },
      });
    });
  }, [responseOptions]);

  // create surveyStatistics on every responseDataOptions change
  useEffect(() => {
    if (!questions.length || !questions[0].length) {
      return;
    }

    // each question group has a corresponding surveyStatistics object that is added to the final survey object on submit
    const surveyStatistics = questions.reduce(
      (surveyStatisticsAcc: SurveyStatistics[], question: string, questionIdx) => {
        // the responseDistribution object will differ according to the responseKind
        const responseInput = responseInputs[questionIdx];

        // regardless of the responseKind, the surveyStatistics will have the question, totalResponses and responseInput fields
        let surveyStatisticObj = addFieldsToObject({
          object: Object.create(null),
          fieldValuesTuples: [
            ["question", question],
            ["totalResponses", 0],
            ["responseInput", responseInput],
          ],
        });

        if (responseInput === "checkbox" || responseInput === "radio") {
          const responseDataOptions = responseOptions[questionIdx];
          if (!responseDataOptions) {
            return surveyStatisticsAcc;
          }
          // all questions require an answer before submission, so there are no 'No responses' option

          //for 'checkbox' || 'radio', responseDistribution object has keys that are the response options and values that are the total responses for that option (initialized to 0)
          const responseDistribution = responseDataOptions.reduce(
            (responseDistributionAcc: Record<string, 0>, responseDataOption: string) => {
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
            fieldValuesTuples: [["responseDistribution", responseDistribution]],
          });
        }
        // agreeDisagree inputs share the same responseDistribution structure
        else if (responseInput === "agreeDisagree") {
          const responseDistribution = {
            "Strongly disagree": 0,
            Disagree: 0,
            "Neither agree nor disagree": 0,
            Agree: 0,
            "Strongly agree": 0,
          };

          surveyStatisticObj = addFieldsToObject({
            object: surveyStatisticObj,
            fieldValuesTuples: [["responseDistribution", responseDistribution]],
          });
        } else {
          // for ratings: 'emotion' and 'stars'
          const responseDistribution = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
          };

          surveyStatisticObj = addFieldsToObject({
            object: surveyStatisticObj,
            fieldValuesTuples: [["responseDistribution", responseDistribution]],
          });
        }

        surveyStatisticsAcc.push(surveyStatisticObj as SurveyStatistics);

        return surveyStatisticsAcc;
      },
      []
    );

    surveyDispatch({
      type: surveyAction.setSurveyStatistics,
      payload: surveyStatistics,
    });
  }, [questions, responseOptions, responseInputs]);

  // ensures 'Add option' button's disabled prop always receives the correct state
  useEffect(() => {
    // responseKinds.forEach((responseKind, index) => {
    //   switch (responseKind) {
    //     case 'chooseOne': {
    //       surveyDispatch({
    //         type: surveyAction.setResponseInputs,
    //         payload: {
    //           index,
    //           value: 'radio',
    //         },
    //       });
    //       break;
    //     }
    //     case 'chooseAny': {
    //       surveyDispatch({
    //         type: surveyAction.setResponseInputs,
    //         payload: {
    //           index,
    //           value: 'checkbox',
    //         },
    //       });
    //       break;
    //     }
    //     case 'rating': {
    //       surveyDispatch({
    //         type: surveyAction.setResponseInputs,
    //         payload: {
    //           index,
    //           value: 'emotion',
    //         },
    //       });
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // });
  }, [responseKinds]);

  // check submit button disabled state on every change
  useEffect(() => {
    const isDisabled =
      !isValidSurveyTitle ||
      !isValidExpiryDate ||
      !isValidSurveyDescription ||
      questions.length === 0 ||
      areValidQuestions.includes(false) ||
      responseOptions.includes([]) ||
      areResponseDataOptionsValid.flat().includes(false) ||
      pagesInError.size > 0;

    surveyDispatch({
      type: surveyAction.setSubmitButtonDisabled,
      payload: isDisabled,
    });
  }, [
    responseKinds,
    responseInputs,
    responseOptions,
    isValidSurveyTitle,
    isValidExpiryDate,
    isValidSurveyDescription,
    questions.length,
    areValidQuestions,
    areResponseDataOptionsValid,
    isMaxResponseDataOptionsReached,
    pagesInError.size,
  ]);

  // validate stepper state on every change
  useEffect(() => {
    const isStepInError =
      !isValidSurveyTitle || !isValidExpiryDate || !isValidSurveyDescription;

    surveyDispatch({
      type: surveyAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [isValidSurveyTitle, isValidExpiryDate, isValidSurveyDescription]);

  // validate stepper state on every dynamically created question input groups
  useEffect(() => {
    areValidQuestions.forEach((isValidQuestion, index) => {
      // data options must be present for checkbox and radio inputs
      const currentInputHtml = responseInputs[index];
      const correspondingDataOptions = responseOptions?.[index];
      const isDataOptionsPresent =
        currentInputHtml === "checkbox" || currentInputHtml === "radio"
          ? correspondingDataOptions?.length > 0
          : true;

      isValidQuestion && isDataOptionsPresent
        ? surveyDispatch({
            type: surveyAction.setPageInError,
            payload: {
              kind: "delete",
              step: index + 1,
            },
          })
        : surveyDispatch({
            type: surveyAction.setPageInError,
            payload: {
              kind: "add",
              step: index + 1,
            },
          });
    });
  }, [
    areValidQuestions,
    currentStepperPosition,
    areResponseDataOptionsValid,
    responseKinds,
    responseInputs,
    responseOptions,
  ]);

  // validate stepper state on every dynamically created response data options input groups
  useEffect(() => {
    areResponseDataOptionsValid.forEach((areValidResponseDataOptions, index) => {
      const isAnyResponseDataForQuestionInError = areValidResponseDataOptions.some(
        (isValidResponseDataOption) => !isValidResponseDataOption
      );

      isAnyResponseDataForQuestionInError
        ? surveyDispatch({
            type: surveyAction.setPageInError,
            payload: {
              kind: "add",
              step: index + 1,
            },
          })
        : surveyDispatch({
            type: surveyAction.setPageInError,
            payload: {
              kind: "delete",
              step: index + 1,
            },
          });
    });
  }, [areResponseDataOptionsValid]);

  // set preview survey props on trigger preview survey button
  useEffect(() => {
    if (triggerPreviewSurvey) {
      const surveyQuestions = setSurveyQuestions({
        questions,
        responseKinds,
        responseInputs,
        responseOptions,
      });

      surveyDispatch({
        type: surveyAction.setPreviewSurveyProps,
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
      state: surveyState,
      groupLabel: "survey builder state",
    });
  }, [surveyState]);
  

  

  

  
  const [titleInputErrorText, titleInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "survey title",
    inputText: surveyTitle,
    isInputTextFocused: isSurveyTitleFocused,
    isValidInputText: isValidSurveyTitle,
    regexValidationText: returnGrammarValidationText({
      content: surveyTitle,
      contentKind: "survey title",
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [descriptionInputErrorText, descriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "survey description",
      inputText: surveyDescription,
      isInputTextFocused: isSurveyDescriptionFocused,
      isValidInputText: isValidSurveyDescription,
      regexValidationText: returnGrammarValidationText({
        content: surveyDescription,
        contentKind: "survey description",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [expiryDateInputErrorText, expiryDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "expiry date",
      inputText: expiryDate,
      isInputTextFocused: isExpiryDateFocused,
      isValidInputText: isValidExpiryDate,
      regexValidationText: returnDateNearFutureValidationText({
        content: expiryDate,
        contentKind: "expiry date",
      }),
    });

  const [questionInputsErrorText, questionInputsValidText] =
    AccessibleErrorValidTextElementsForDynamicInputs({
      semanticName: "question",
      inputTextArray: questions,
      areValidInputTexts: areValidQuestions,
      areInputTextsFocused: areQuestionsFocused,
      regexValidationProps: questions.map((question) => ({
        content: question,
        contentKind: "question",
        minLength: 2,
        maxLength: 100,
      })),
      regexValidationFunction: returnGrammarValidationText,
    });

  const responseDataOptionsErrorValidTextArrays: [JSX.Element[], JSX.Element[]][] =
    responseOptions.map((responseDataOptions, questionIdx) => {
      const [responseDataOptionsErrorTexts, responseDataOptionsValidTexts] =
        AccessibleErrorValidTextElementsForDynamicInputs({
          semanticName: `Question ${questionIdx + 1}: option`,
          inputTextArray: responseDataOptions,
          areValidInputTexts: areResponseDataOptionsValid?.[questionIdx],
          areInputTextsFocused: areResponseDataOptionsFocused?.[questionIdx],
          regexValidationProps: responseDataOptions.map((responseDataOption) => ({
            content: responseDataOption,
            contentKind: "text",
            minLength: 2,
            maxLength: 100,
          })),
          regexValidationFunction: returnGrammarValidationText,
        });

      return [responseDataOptionsErrorTexts, responseDataOptionsValidTexts];
    });
  

  
  const surveyTitleInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: surveyTitle,
    isValidInputText: isValidSurveyTitle,
    label: "Survey Title",
    onBlur: () => {
      surveyDispatch({
        type: surveyAction.setIsSurveyTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      surveyDispatch({
        type: surveyAction.setSurveyTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      surveyDispatch({
        type: surveyAction.setIsSurveyTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter survey title",
    semanticName: "survey title",
    required: true,
    withAsterisk: true,
  };

  const surveyDescriptionTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: descriptionInputErrorText,
      valid: descriptionInputValidText,
    },
    inputText: surveyDescription,
    isValidInputText: isValidSurveyDescription,
    label: "Survey Description",
    onBlur: () => {
      surveyDispatch({
        type: surveyAction.setIsSurveyDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      surveyDispatch({
        type: surveyAction.setSurveyDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      surveyDispatch({
        type: surveyAction.setIsSurveyDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter survey description",
    semanticName: "survey description",
    required: true,
    withAsterisk: true,
  };

  const surveyRecipientsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: SURVEY_RECIPIENT_DATA,
    description: "Select the target recipients",
    label: "Survey recipients",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      surveyDispatch({
        type: surveyAction.setSurveyRecipients,
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
    inputKind: "date",
    dateKind: "date near future",
    inputText: expiryDate,
    isValidInputText: isValidExpiryDate,
    label: "Expiry Date",
    onBlur: () => {
      surveyDispatch({
        type: surveyAction.setIsExpiryDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      surveyDispatch({
        type: surveyAction.setExpiryDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      surveyDispatch({
        type: surveyAction.setIsExpiryDateFocused,
        payload: true,
      });
    },
    placeholder: "Enter expiry date",
    semanticName: "expiry date",
    required: true,
    withAsterisk: true,
  };

  const customWidth =
    width < 480 // for iPhone 5/SE
      ? 330
      : width < 768 // for iPhone 6/7/8
      ? width * 0.8 - 44
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225 - 44) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300 - 44) * 0.8
      : 900 - 74;

  const questionsInputCreatorInfo: AccessibleTextInputCreatorInfo[] = Array.from({
    length: questions.length,
  }).map((_, index) => {
    const deleteQuestionLabel =
      questions.length === 1
        ? "Survey must have atleast one question"
        : `Delete ${
            questions[index].length > 11
              ? questions[index].slice(0, 11) + "..."
              : questions[index]
          }`;

    const createdDeleteQuestionGroupButton = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        semanticDescription: `Delete question group ${index + 1}`,
        semanticName: `question ${index + 1}`,
        buttonDisabled: questions.length === 1,
        buttonOnClick: () => {
          surveyDispatch({
            type: surveyAction.deleteQuestion,
            payload: index,
          });
          // enables display of the previous stepper page after deletion
          surveyDispatch({
            type: surveyAction.setCurrentStepperPosition,
            payload: currentStepperPosition - 1,
          });
        },
      },
    ]);

    const createdDeleteButtonWithTooltip = (
      <Tooltip label={deleteQuestionLabel}>
        <Group>{createdDeleteQuestionGroupButton}</Group>
      </Tooltip>
    );

    const creatorInfoObject: AccessibleTextInputCreatorInfo = {
      textInputWidth: customWidth,
      description: {
        error: questionInputsErrorText?.[index],
        valid: questionInputsValidText?.[index],
      },
      inputText: questions?.[index],
      isValidInputText: areValidQuestions?.[index],
      label: `Question: ${index + 1}`,
      onBlur: () => {
        surveyDispatch({
          type: surveyAction.setAreQuestionsFocused,
          payload: {
            index,
            value: false,
          },
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        surveyDispatch({
          type: surveyAction.setQuestions,
          payload: {
            index,
            value: event.currentTarget.value,
          },
        });
      },
      onFocus: () => {
        surveyDispatch({
          type: surveyAction.setAreQuestionsFocused,
          payload: {
            index,
            value: true,
          },
        });
      },
      minLength: 2,
      maxLength: 100,
      placeholder: "Enter question",
      semanticName: `question ${index + 1}`,
      required: true,
      withAsterisk: false,
      // dynamicInputProps: {
      //   dynamicIndex: index,
      //   buttonDisabled: questions.length === 1,
      //   dynamicLabel: dynamicInputLabel,
      //   dynamicInputOnClick: () => {
      //     surveyDispatch({
      //       type: surveyAction.deleteQuestion,
      //       payload: index,
      //     });
      //     // enables display of the previous stepper page after deletion
      //     surveyDispatch({
      //       type: surveyAction.setCurrentStepperPosition,
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
        description: "Choose a response type",
        dataObjectArray: SURVEY_RESPONSE_KIND_DATA,
        label: `Response Type for Question ${index + 1}`,
        name: `response type for question ${index + 1}`,
        onChange: (value: string) => {
          surveyDispatch({
            type: surveyAction.setResponseKinds,
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

  const responseInputsRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo[] =
    Array.from({ length: questions.length }).map((_, index) => {
      const creatorInfoObject: AccessibleRadioGroupInputCreatorInfo = {
        description: "If radio or checkbox, data options must be present",
        dataObjectArray: SURVEY_INPUT_HTML_DATA.get(responseKinds?.[index]) as {
          value: string;
          label: string;
        }[],
        label: `Input kind for Question ${index + 1}`,
        name: `html input kind for question ${index + 1}`,
        onChange: (value: string) => {
          surveyDispatch({
            type: surveyAction.setResponseInputs,
            payload: {
              index,
              value,
            },
          });
        },
        semanticName: `html input kind for question ${index + 1}`,
        value: responseInputs?.[index],
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const responseDataOptionsTextInputCreatorInfoArray: AccessibleTextInputCreatorInfo[][] =
    Array.from({
      length: responseOptions?.length,
    }).map((_, questionIdx) => {
      const responseDataOptionsTextInputCreatorInfo: AccessibleTextInputCreatorInfo[] =
        Array.from({
          length: responseOptions?.[questionIdx]?.length,
        }).map((_, optionIdx) => {
          const deleteResponseDataLabel = `Delete ${
            questions?.[questionIdx]?.length > 11
              ? questions?.[questionIdx].slice(0, 11) + "..."
              : questions?.[questionIdx]
          } ${questions?.[questionIdx]?.length > 0 ? ":" : ""} ${
            responseOptions?.[questionIdx]?.[optionIdx]?.length > 11
              ? responseOptions?.[questionIdx]?.[optionIdx]?.slice(0, 11) + "..."
              : responseOptions?.[questionIdx]?.[optionIdx]
          } ?`;

          const createdDeleteResponseDataOptionButton = returnAccessibleButtonElements([
            {
              buttonLabel: "Delete",
              semanticDescription: `Delete response data option ${
                optionIdx + 1
              } for question ${questionIdx + 1}`,
              semanticName: `response data option ${optionIdx + 1} for question ${
                questionIdx + 1
              }`,
              buttonOnClick: () => {
                surveyDispatch({
                  type: surveyAction.deleteResponseOption,
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
            textInputWidth: customWidth,
            description: {
              error:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[0]?.[optionIdx],
              valid:
                responseDataOptionsErrorValidTextArrays?.[questionIdx]?.[1]?.[optionIdx],
            },
            inputText: responseOptions?.[questionIdx]?.[optionIdx],
            isValidInputText: areResponseDataOptionsValid?.[questionIdx]?.[optionIdx],
            label: `Response Option ${optionIdx + 1} for Question ${questionIdx + 1}`,
            onBlur: () => {
              surveyDispatch({
                type: surveyAction.setAreResponseDataOptionsFocused,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: false,
                },
              });
            },
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              surveyDispatch({
                type: surveyAction.setResponseOptions,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: event.currentTarget.value,
                },
              });
            },
            onFocus: () => {
              surveyDispatch({
                type: surveyAction.setAreResponseDataOptionsFocused,
                payload: {
                  questionIdx,
                  optionIdx,
                  value: true,
                },
              });
            },
            minLength: 2,
            maxLength: 100,
            placeholder: "Enter a response option answer",
            ref:
              optionIdx === responseOptions?.[questionIdx]?.length - 1
                ? newResponseDataOptionInputRef
                : null,
            semanticName: `Question ${questionIdx + 1}: option-${optionIdx + 1}`,
            required: true,
            withAsterisk: false,
            // dynamicInputProps: {
            //   dynamicIndex: optionIdx,
            //   dynamicLabel: dynamicInputLabel,
            //   dynamicInputOnClick: () => {
            //     surveyDispatch({
            //       type: surveyAction.deleteResponseOption,
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
    colorScheme === "light"
      ? `${primaryColor}.${primaryShade.light}`
      : `${primaryColor}.${primaryShade.dark}`;
  const addNewQuestionButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    // buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new question">
        <Group>
          <Text size="xs" color={isMaxQuestionsReached ? "gray" : textColor}>
            Add question
          </Text>
        </Group>
      </Tooltip>
    ),
    leftIcon: <TbPlus />,
    buttonOnClick: () => {
      surveyDispatch({
        type: surveyAction.addQuestion,
        payload: questions.length,
      });
      surveyDispatch({
        type: surveyAction.createStepperDescriptionObjects,
        payload: {
          index: currentStepperPosition,
          value: {
            description: `Enter question ${questions.length + 1}`,
            ariaLabel: `Enter question ${questions.length + 1}`,
          },
        },
      });
      // enables display of the newly created survey question page
      surveyDispatch({
        type: surveyAction.setCurrentStepperPosition,
        payload: currentStepperPosition + 1,
      });
    },
    semanticDescription: "add new question text input button",
    semanticName: "add question button",
  };

  const addResponseDataOptionButtonCreatorInfo: AccessibleButtonCreatorInfo[] =
    Array.from({ length: questions.length }).map((_, index) => {
      const creatorInfoObject: AccessibleButtonCreatorInfo = {
        // buttonVariant: 'outline',
        buttonLabel: (
          <Tooltip
            label={
              isMaxResponseDataOptionsReached?.[index]
                ? "Max response data options reached"
                : "Add new response data option"
            }
          >
            <Group>
              <Text
                size="xs"
                color={isMaxResponseDataOptionsReached?.[index] ? "gray" : textColor}
              >
                Add option
              </Text>
            </Group>
          </Tooltip>
        ),
        buttonDisabled: isMaxResponseDataOptionsReached?.[index],
        leftIcon: <TbPlus />,
        buttonOnClick: () => {
          surveyDispatch({
            type: surveyAction.addResponseDataOption,
            payload: {
              questionIdx: index,
            },
          });
          surveyDispatch({
            type: surveyAction.setIsMaxResponseDataOptionsReached,
            payload: {
              index: index,
              value: false,
            },
          });
        },
        semanticDescription: "add new response data option text input button",
        semanticName: "add response data option button",
      };

      return creatorInfoObject;
    });

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "survey builder form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    rightIcon: <TbChartPie4 />,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      surveyDispatch({
        type: surveyAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    buttonDisabled: submitButtonDisabled,
  };

  const helpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Help",
    semanticDescription: "survey builder help button",
    semanticName: "help button",
    leftIcon: <TbHelp />,
    buttonOnClick: () => {
      openHelpModal();
    },
  };

  const previewSurveyButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Preview",
    semanticDescription: "View survey as it would appear to respondents",
    semanticName: "preview survey button",
    leftIcon: <TbEye />,
    rightIcon: <TbChartPie4 />,
    buttonOnClick: () => {
      surveyDispatch({
        type: surveyAction.setTriggerPreviewSurvey,
        payload: true,
      });
    },
    buttonDisabled: submitButtonDisabled,
  };

  

  
  const displayHelpTextModal = (
    <Modal
      opened={openedHelpModal}
      onClose={closeHelpModal}
      centered
      title={<Title order={3}>Survey Builder Help</Title>}
    >
      {SURVEY_HELP_TEXT}
    </Modal>
  );

  const [createdSurveyDescriptionTextAreaInput] = returnAccessibleTextAreaInputElements([
    surveyDescriptionTextAreaInputCreatorInfo,
  ]);

  const [createdSurveyRecipientsSelectInput] = returnAccessibleSelectInputElements([
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
        responseInputs[index] === "checkbox" || responseInputs[index] === "radio"
          ? returnAccessibleDynamicTextInputElements(
              responseDataOptionsTextInputCreatorInfo
            )
          : null
    );

  const createdResponseKindRadioGroups = returnAccessibleDynamicRadioGroupInputsElements(
    responseKindRadioGroupCreatorInfo
  );

  const createdResponseInputHtmlRadioGroups =
    returnAccessibleDynamicRadioGroupInputsElements(
      responseInputsRadioGroupCreatorInfo
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
    addResponseDataOptionButtonCreatorInfo.map(
      (addResponseDataOptionButtonCreatorInfo, index) =>
        responseInputs[index] === "checkbox" || responseInputs[index] === "radio"
          ? returnAccessibleButtonElements([addResponseDataOptionButtonCreatorInfo])
          : null
    );

  const previewSurveyModal = (
    <Modal
      opened={openedPreviewSurveyModal}
      onClose={closePreviewSurveyModal}
      centered
      size={width < 480 ? 375 : width < 640 ? 640 : width >= 1024 ? 1024 : width}
    >
      <PreviewSurvey
        surveyDescription={previewSurveyProps.surveyDescription}
        surveyTitle={previewSurveyProps.surveyTitle}
        surveyQuestions={previewSurveyProps.surveyQuestions}
        closePreviewSurveyModal={closePreviewSurveyModal}
      />
    </Modal>
  );

  

  

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

  const SURVEY_REVIEW_OBJECT: FormReviewObjectArray = {
    "Survey Details": [
      {
        inputName: "Survey Title",
        inputValue: surveyTitle,
        isInputValueValid: isValidSurveyTitle,
      },
      {
        inputName: "Survey Description",
        inputValue: surveyDescription,
        isInputValueValid: isValidSurveyDescription,
      },
      {
        inputName: "Survey Recipients",
        inputValue: surveyRecipients,
        isInputValueValid: true,
      },
      {
        inputName: "Expiry Date",
        inputValue: expiryDate,
        isInputValueValid: isValidExpiryDate,
      },
    ],
  };

  const dynamicSurveyReviewObject = createSurveyFormReviewObject({
    initialFormReviewObject: SURVEY_REVIEW_OBJECT,
    questions,
    areValidQuestions,
    responseKinds,
    responseInputs,
    responseOptions,
    areResponseDataOptionsValid,
  });

  const displaySurveyReviewPage = (
    <FormReviewPage
      formReviewObject={dynamicSurveyReviewObject}
      formName="Survey Builder"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/outreach/survey-builder/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displaySubmitPreviewButtons =
    currentStepperPosition === maxStepperPosition ? (
      <Group w="100%" position="center">
        <Tooltip
          label={
            submitButtonDisabled
              ? "Please fix errors to enable preview survey button"
              : `Preview survey: ${
                  surveyTitle.length > 23 ? surveyTitle.slice(0, 23) + "..." : surveyTitle
                }`
          }
        >
          <Group>{createdPreviewSurveyButton}</Group>
        </Tooltip>
        <Tooltip
          label={
            submitButtonDisabled
              ? "Please fix errors before submitting"
              : `Submit survey: ${
                  surveyTitle.length > 23 ? surveyTitle.slice(0, 23) + "..." : surveyTitle
                }`
          }
        >
          <Group>{createdSubmitButton}</Group>
        </Tooltip>
      </Group>
    ) : null;

  const questionsLength = questions.length;

  const displaySurveyForm =
    currentStepperPosition === 0 ? (
      displaySurveyDetailsFormPageOne
    ) : currentStepperPosition === 1 ? (
      <FormLayoutWrapper>{mergedSurveyQuestionsGroups.slice(0, 1)}</FormLayoutWrapper>
    ) : currentStepperPosition === maxStepperPosition - 1 ? (
      displaySurveyReviewPage
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

  const displaySurveyComponent = (
    <StepperWrapper
      childrenTitle="Survey Builder"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={stepperDescriptionObjects}
      maxStepperPosition={maxStepperPosition}
      parentComponentDispatch={surveyDispatch}
      setCurrentStepperPosition={surveyAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displaySurveyForm}
      {previewSurveyModal}
      {displayHelpTextModal}
    </StepperWrapper>
  );
  

  return displaySurveyComponent;

 */
