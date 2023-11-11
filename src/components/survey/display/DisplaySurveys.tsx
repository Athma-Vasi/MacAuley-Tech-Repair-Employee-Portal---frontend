import {
  Card,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import { Fragment, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbChartPie3, TbNewSection, TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../constants/data';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState, useWrapFetch } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import {
  CheckBoxMultipleData,
  RadioGroupInputData,
  UserDocument,
} from '../../../types';
import {
  filterFieldsFromObject,
  logState,
  replaceLastCommaWithAnd,
  returnThemeColors,
  urlBuilder,
} from '../../../utils';
import { NotificationModal } from '../../notificationModal';
import { CustomRating } from '../../customRating/CustomRating';
import DisplayResourceHeader from '../../displayResourceHeader/DisplayResourceHeader';
import { DisplayStatistics } from '../../displayStatistics';
import { PageBuilder } from '../../pageBuilder';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  StepperWrapper,
  TextWrapper,
} from '../../wrappers';
import { SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS } from '../constants';
import { SurveyBuilderDocument } from '../types';
import {
  displaySurveysAction,
  displaySurveysReducer,
  initialDisplaySurveysState,
} from './state';
import { useDisclosure } from '@mantine/hooks';

function DisplaySurveys() {
  /** ------------- begin hooks ------------- */
  const [displaySurveysState, displaySurveysDispatch] = useReducer(
    displaySurveysReducer,
    initialDisplaySurveysState
  );
  const {
    responseData,
    surveySubmissions,
    surveyToSubmit,

    completedSurveys,
    uncompletedSurveys,
    completedSurveyIds,

    stepperDescriptionsMap,
    currentStepperPositions,
    stepsInError,

    pageQueryString,
    queryBuilderString,
    newQueryFlag,
    totalDocuments,
    pages,

    triggerSurveyFetch,
    triggerSurveySubmission,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displaySurveysState;

  const {
    authState: { accessToken, roles },
  } = useAuth();

  const { wrappedFetch } = useWrapFetch();

  const {
    globalState: { padding, rowGap, userDocument, themeObject, width },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // fetch surveys on mount
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchSurveys(): Promise<void> {
      displaySurveysDispatch({
        type: displaySurveysAction.setIsLoading,
        payload: true,
      });
      const pageNumber = pageQueryString.split('=')[1] ?? '1';
      displaySurveysDispatch({
        type: displaySurveysAction.setLoadingMessage,
        payload: `Loading surveys: page ${pageNumber} ...`,
      });

      const url: URL = urlBuilder({
        path: `actions/outreach/survey${
          roles.includes('Manager') ? '' : '/user'
        }`,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
      });

      const requestInit: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: {
          message: string;
          resourceData: SurveyBuilderDocument[];
          totalDocuments: number;
          pages: number;
        } = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        displaySurveysDispatch({
          type: displaySurveysAction.setResponseData,
          payload: data.resourceData,
        });

        displaySurveysDispatch({
          type: displaySurveysAction.setTotalDocuments,
          payload: data.totalDocuments ?? totalDocuments,
        });

        displaySurveysDispatch({
          type: displaySurveysAction.setPages,
          payload: data.pages ?? pages,
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
          displaySurveysDispatch({
            type: displaySurveysAction.setIsLoading,
            payload: false,
          });
          displaySurveysDispatch({
            type: displaySurveysAction.setLoadingMessage,
            payload: '',
          });
          displaySurveysDispatch({
            type: displaySurveysAction.setTriggerSurveyFetch,
            payload: false,
          });
        }
      }
    }

    if (triggerSurveyFetch) {
      fetchSurveys();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
    // only fetch surveys when the triggerSurveyFetch is true (and initially on mount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSurveyFetch]);

  useEffect(() => {
    displaySurveysDispatch({
      type: displaySurveysAction.setTriggerSurveyFetch,
      payload: true,
    });
  }, [
    accessToken,
    newQueryFlag,
    pageQueryString,
    pages,
    queryBuilderString,
    roles,
    totalDocuments,
  ]);

  // submit survey response
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitSurveyResponse() {
      displaySurveysDispatch({
        type: displaySurveysAction.setIsSubmitting,
        payload: true,
      });
      const { surveyId, surveyResponses, surveyTitle } = surveyToSubmit;
      displaySurveysDispatch({
        type: displaySurveysAction.setSubmitMessage,
        payload: `Submitting survey: ${surveyTitle} ...`,
      });

      const url: URL = urlBuilder({
        path: `actions/outreach/survey/${surveyId}`,
      });

      const filteredSurveyResponses = surveyResponses.map((surveyResponse) => {
        const filteredSurveyResponse = filterFieldsFromObject({
          object: surveyResponse,
          fieldsToFilter: ['responseKind'],
        });

        return filteredSurveyResponse;
      });

      const body = JSON.stringify({
        surveyResponses: filteredSurveyResponses,
      });

      const requestInit: RequestInit = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: {
          message: string;
          resourceData: [SurveyBuilderDocument, UserDocument];
        } = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [_, userDocument] = data.resourceData;
        globalDispatch({
          type: globalAction.setUserDocument,
          payload: userDocument,
        });

        displaySurveysDispatch({
          type: displaySurveysAction.setIsSuccessful,
          payload: true,
        });

        displaySurveysDispatch({
          type: displaySurveysAction.setSuccessMessage,
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
          displaySurveysDispatch({
            type: displaySurveysAction.setIsSubmitting,
            payload: false,
          });
          displaySurveysDispatch({
            type: displaySurveysAction.setSubmitMessage,
            payload: '',
          });
          displaySurveysDispatch({
            type: displaySurveysAction.setTriggerSurveySubmission,
            payload: false,
          });
        }
      }
    }

    if (triggerSurveySubmission) {
      submitSurveyResponse();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSurveySubmission]);

  // allows discrimination between completed and uncompleted surveys
  useEffect(() => {
    if (!userDocument) {
      return;
    }

    const { completedSurveys } = userDocument;
    displaySurveysDispatch({
      type: displaySurveysAction.setCompletedSurveyIds,
      payload: completedSurveys,
    });
  }, [userDocument]);

  // separate responseData into completed and uncompleted surveys
  useEffect(() => {
    if (!responseData?.length) {
      return;
    }

    const [completedSurveys, uncompletedSurveys] = responseData.reduce(
      (acc: [SurveyBuilderDocument[], SurveyBuilderDocument[]], survey) => {
        const { _id: surveyId } = survey;
        completedSurveyIds.has(surveyId)
          ? acc[0].push(survey)
          : acc[1].push(survey);

        return acc;
      },
      [[], []]
    );

    displaySurveysDispatch({
      type: displaySurveysAction.setCompletedSurveys,
      payload: completedSurveys,
    });
    displaySurveysDispatch({
      type: displaySurveysAction.setUncompletedSurveys,
      payload: uncompletedSurveys,
    });

    // set the stepper descriptions map to the uncompleted surveys
    displaySurveysDispatch({
      type: displaySurveysAction.setStepperDescriptionsMap,
      payload: uncompletedSurveys,
    });
    // set the current stepper positions to the uncompleted surveys
    uncompletedSurveys.forEach((survey: SurveyBuilderDocument) => {
      displaySurveysDispatch({
        type: displaySurveysAction.setCurrentStepperPosition,
        payload: {
          id: survey._id,
          currentStepperPosition: 0,
        },
      });
    });
  }, [responseData, completedSurveyIds]);

  // set steps in error for each survey's stepper component
  useEffect(() => {
    Array.from(currentStepperPositions).forEach(
      ([surveyId, currentStepperPosition]) => {
        // get the corresponding survey submission
        const surveySubmission = surveySubmissions.get(surveyId);
        // if there is no survey submission, then set the steps in error from current stepper position to zero (the beginning of the stepper)
        if (!surveySubmission) {
          Array.from({ length: currentStepperPosition }).forEach((_, idx) => {
            displaySurveysDispatch({
              type: displaySurveysAction.setStepsInError,
              payload: {
                surveyId,
                stepInError: {
                  kind: 'add',
                  step: idx,
                },
              },
            });
          });
        }
        // if there is a survey submission, check if any questions were skipped, or if any responses are empty strings, empty arrays or zero numbers
        else {
          const { surveyResponses } = surveySubmission;
          // the user skipped a question
          if (surveyResponses.length < currentStepperPosition) {
            // set the steps in error from the surveyResponses length to the current stepper position
            Array.from({
              length: currentStepperPosition - surveyResponses.length,
            }).forEach((_, idx) => {
              displaySurveysDispatch({
                type: displaySurveysAction.setStepsInError,
                payload: {
                  surveyId,
                  stepInError: {
                    kind: 'add',
                    step: surveyResponses.length + idx,
                  },
                },
              });
            });
          }

          // iterate through responses and add or remove the step from the steps in error
          surveyResponses.forEach(({ response }, idx) => {
            // the user did not respond to the question
            if (
              response === '' || // for 'radio' or 'agreeDisagree'
              (Array.isArray(response) && response.length === 0) || // for 'checkbox'
              response === 0 // for 'rating': 'emotion' or 'stars'
            ) {
              displaySurveysDispatch({
                type: displaySurveysAction.setStepsInError,
                payload: {
                  surveyId,
                  stepInError: {
                    kind: 'add',
                    step: idx,
                  },
                },
              });
            } else {
              displaySurveysDispatch({
                type: displaySurveysAction.setStepsInError,
                payload: {
                  surveyId,
                  stepInError: {
                    kind: 'delete',
                    step: idx,
                  },
                },
              });
            }
          });
        }
      }
    );
  }, [currentStepperPositions, surveySubmissions, stepperDescriptionsMap]);

  useEffect(() => {
    logState({
      state: displaySurveysState,
      groupLabel: 'DisplaySurveys',
    });
  }, [displaySurveysState]);

  // useEffect(() => {
  //   displaySurveysState.responseData.forEach(
  //     (survey: SurveyBuilderDocument) => {
  //       const { questions } = survey;

  //       console.group(`Survey: ${survey._id}`);
  //       questions.forEach(
  //         ({ question, responseDataOptions, responseInput, responseKind }) => {
  //           console.group(`Question: ${question}`);
  //           console.log('responseDataOptions: ', responseDataOptions);
  //           console.log('responseInput: ', responseInput);
  //           console.log('responseKind: ', responseKind);
  //           console.groupEnd();
  //         }
  //       );
  //       console.groupEnd();
  //     }
  //   );
  // }, [displaySurveysState]);

  /** ------------- end useEffects ------------- */

  // if (!uncompletedSurveys.length && !isLoading) {
  //   return (
  //     <Stack w="100%" p={padding}>
  //       <Title order={4}>Completed surveys</Title>
  //       <Text>Congragulations! You have completed all available surveys!</Text>
  //     </Stack>
  //   );
  // }

  /** ------------- end component render bypass ------------- */

  /** ------------- begin surveys creation ------------- */

  // loop through the uncompleted surveys and create the surveys based on the input kind
  const createdSurveys = uncompletedSurveys.reduce(
    (acc: Array<JSX.Element[]>, survey, surveyIdx) => {
      const { questions, _id, surveyTitle } = survey;

      // every survey's inputs are controlled
      questions?.forEach(
        (
          { question, responseDataOptions, responseInput, responseKind },
          questionIdx
        ) => {
          // uniquely identifiers passed to and received from the rating component
          const dynamicComponentProps = {
            setResponseDispatch: displaySurveysDispatch,
            responsePayload: {
              surveyId: _id,
              surveyTitle,
              surveyResponse: {
                question,
                inputKind: responseInput,
                response: 0,
                responseKind,
              },
            },
          };

          // agreeDisagree is a radio group with set values
          switch (responseInput) {
            case 'agreeDisagree': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse?.question === question
                )?.response as string;

              const description = (
                <Text size="sm" aria-label="polite">{`You have selected: ${
                  value ?? 'N/A'
                }`}</Text>
              );

              const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
                {
                  dataObjectArray: SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
                  description,
                  key: `${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`,
                  label: question,
                  onChange: (value: string) => {
                    displaySurveysDispatch({
                      type: displaySurveysAction.setSurveySubmissions,
                      payload: {
                        surveyId: _id,
                        surveyTitle,
                        surveyResponse: {
                          question,
                          inputKind: responseInput,
                          response: value,
                          responseKind,
                        },
                      },
                    });
                  },
                  semanticName: question,
                  value: value ?? '',
                };

              const [createdRadioInput] =
                returnAccessibleRadioGroupInputsElements([
                  radioInputCreatorInfoObj,
                ]);

              const displayRadioInput = (
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdRadioInput}
                </Fragment>
              );

              acc[surveyIdx].push(displayRadioInput);
              break;
            }
            // radio is a radio group with dynamic values with constrained single selection
            case 'radio': {
              const dataObjectArray: RadioGroupInputData =
                responseDataOptions.map((responseDataOption) => ({
                  value: responseDataOption,
                  label: responseDataOption,
                }));

              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse?.question === question
                )?.response as string;

              const description = (
                <Text size="sm" aria-label="polite">{`You have selected: ${
                  value ?? 'N/A'
                }`}</Text>
              );

              const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
                {
                  dataObjectArray,
                  description,
                  key: `${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`,
                  label: question,
                  onChange: (value: string) => {
                    displaySurveysDispatch({
                      type: displaySurveysAction.setSurveySubmissions,
                      payload: {
                        surveyId: _id,
                        surveyTitle,
                        surveyResponse: {
                          question,
                          inputKind: responseInput,
                          response: value,
                          responseKind,
                        },
                      },
                    });
                  },
                  semanticName: question,
                  value: value ?? '',
                };

              const [createdRadioInput] =
                returnAccessibleRadioGroupInputsElements([
                  radioInputCreatorInfoObj,
                ]);

              const displayRadioInput = (
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdRadioInput}
                </Fragment>
              );

              acc[surveyIdx].push(displayRadioInput);
              break;
            }
            // checkbox is a checkbox group with dynamic values with unconstrained multiple selections (array of strings)
            case 'checkbox': {
              const dataObjectArray: CheckBoxMultipleData =
                responseDataOptions.map((responseDataOption) => ({
                  value: responseDataOption,
                  label: responseDataOption,
                }));

              const surveySubmission = surveySubmissions.get(_id);
              const checkboxValue = surveySubmission?.surveyResponses.find(
                (surveyResponse) => surveyResponse?.question === question
              )?.response as string[];

              const description = {
                selected: (
                  <Text
                    size="sm"
                    aria-label="polite"
                  >{`You have selected: ${replaceLastCommaWithAnd(
                    checkboxValue?.join(', ') ?? ''
                  )}`}</Text>
                ),
                deselected: (
                  <Text size="sm" aria-label="polite">
                    Choose as many as you would like.
                  </Text>
                ),
              };

              const checkboxInputCreatorInfoObj: AccessibleCheckboxGroupInputCreatorInfo =
                {
                  dataObjectArray,
                  description,
                  key: `${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`,
                  onChange: (value: string[]) => {
                    displaySurveysDispatch({
                      type: displaySurveysAction.setSurveySubmissions,
                      payload: {
                        surveyId: _id,
                        surveyTitle,
                        surveyResponse: {
                          question,
                          inputKind: responseInput,
                          response: value,
                          responseKind,
                        },
                      },
                    });
                  },
                  semanticName: question,
                  value: checkboxValue ?? [],
                };

              const [createdCheckboxInput] =
                returnAccessibleCheckboxGroupInputsElements([
                  checkboxInputCreatorInfoObj,
                ]);

              const displayCheckboxInput = (
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdCheckboxInput}
                </Fragment>
              );

              acc[surveyIdx].push(displayCheckboxInput);
              break;
            }
            // emotion is a rating component with emojis as values from 1-5
            case 'emotion': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse?.question === question
                )?.response as number;

              const createdEmotionRatingInput = (
                <CustomRating
                  controlledValue={value}
                  question={question}
                  ratingKind="emotion"
                  dynamicComponentProps={dynamicComponentProps}
                />
              );

              const displayEmotionRatingInput = (
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdEmotionRatingInput}
                </Fragment>
              );

              acc[surveyIdx].push(displayEmotionRatingInput);
              break;
            }
            // stars is a rating component with stars as values from 1-5
            case 'stars': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse?.question === question
                )?.response as number;

              const createdStarsRatingInput = (
                <CustomRating
                  controlledValue={value}
                  question={question}
                  ratingKind="stars"
                  dynamicComponentProps={dynamicComponentProps}
                />
              );

              const displayStarsRatingInput = (
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdStarsRatingInput}
                </Fragment>
              );

              acc[surveyIdx].push(displayStarsRatingInput);
              break;
            }

            default:
              break;
          }
        }
      );

      return acc;
    },
    // create an initial array of arrays with the same length as uncompletedSurveys
    Array.from({ length: uncompletedSurveys.length }, () => [])
  );

  // each survey has its own stepper navigation and each question is a step
  const displayCreatedSurveys = uncompletedSurveys.map((survey, idx) => {
    const { surveyTitle, _id } = survey;

    const currentStepperPosition = currentStepperPositions.get(_id) ?? 0;
    const descriptionObjectsArray = stepperDescriptionsMap.get(_id) ?? [];
    const stepInError: Set<number> = stepsInError.get(_id) ?? new Set<number>();
    const dynamicStepperProps = {
      id: _id,
      dynamicSetStepperDispatch: displaySurveysDispatch,
    };
    // display the survey question's input based on the stepper position state
    const displaySurveyQuestion = (
      <Stack w="100%" p={padding}>
        {createdSurveys[idx].slice(
          currentStepperPosition,
          currentStepperPosition + 1
        )}
      </Stack>
    );

    const createdSubmitButton = returnAccessibleButtonElements([
      {
        buttonLabel: 'Submit',
        buttonDisabled:
          surveySubmissions.get(_id) === undefined ||
          stepsInError.get(_id)?.size !== 0,
        semanticDescription: 'Submit survey',
        semanticName: 'Submit survey',
        buttonOnClick: () => {
          displaySurveysDispatch({
            type: displaySurveysAction.setSurveyToSubmit,
            payload: {
              surveyId: _id,
            },
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setTriggerSurveySubmission,
            payload: true,
          });
        },
        leftIcon: <TbChartPie3 />,
        rightIcon: <TbUpload />,
      },
    ]);
    const displaySubmitButton = (
      <Tooltip
        label={
          stepInError.size > 0
            ? 'Please fix errors before submitting'
            : `Submit ${surveyTitle}`
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    );

    // if the stepper position is at the end of the stepper, display the submit button
    const displayPage =
      currentStepperPosition === descriptionObjectsArray.length
        ? displaySubmitButton
        : displaySurveyQuestion;

    const createdStepperWrapper = (
      <StepperWrapper
        key={`${_id}-${idx}-${surveyTitle}`}
        childrenTitle={surveyTitle}
        currentStepperPosition={currentStepperPosition}
        descriptionObjectsArray={descriptionObjectsArray}
        maxStepperPosition={descriptionObjectsArray.length}
        setCurrentStepperPosition={
          displaySurveysAction.setCurrentStepperPosition
        }
        stepsInError={stepInError}
        dynamicStepperProps={dynamicStepperProps}
      >
        <Stack w="100%">{displayPage}</Stack>
      </StepperWrapper>
    );

    return (
      <Card
        shadow="md"
        radius="md"
        withBorder
        w="fit-content"
        key={`${_id}-${idx}-${surveyTitle}`}
      >
        <Card.Section>{createdStepperWrapper}</Card.Section>
      </Card>
    );
  });

  const createdSurveyButton = returnAccessibleButtonElements([
    {
      buttonLabel: 'Create',
      semanticDescription: 'create surveys form button',
      semanticName: 'create survey button',
      leftIcon: <TbNewSection />,
      buttonOnClick: () => {
        navigate('/home/outreach/survey/create');
      },
    },
  ]);

  const displaySurveyButton = (
    <Tooltip label="Create survey">
      <Group>{createdSurveyButton}</Group>
    </Tooltip>
  );
  /** ------------- end surveys creation ------------- */

  /** ------------- begin surveys display ------------- */

  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width * 0.9
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.9
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.9
      : 940;

  const imageSrc =
    'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress';
  const imageAlt = 'Colleagues looking at survey results';
  const resourceDescription =
    'Help improve our company by completing the following surveys.';
  const resourceTitle = 'Surveys';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
      componentWidth={componentWidth}
    />
  );

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayTotalSurveys = (
    <Group
      position="left"
      p={padding}
      style={{ border: borderColor, borderRadius: '4px' }}
    >
      <Text>Total surveys: </Text>
      <Text>{totalDocuments}</Text>
    </Group>
  );

  const displayPageNavigation = (
    <PageBuilder
      total={pages}
      setPageQueryString={displaySurveysAction.setPageQueryString}
      parentComponentDispatch={displaySurveysDispatch}
    />
  );

  const displayTotalAndPageNavigation = (
    <Flex
      w={componentWidth}
      align="center"
      justify="space-between"
      p={padding}
      rowGap={rowGap}
      columnGap={rowGap}
      wrap="wrap"
      bg={backgroundColor}
      style={{ borderBottom: borderColor }}
    >
      <Group>{displayPageNavigation}</Group>
      {displayTotalSurveys}
    </Flex>
  );

  const displayStatistics = (
    <Group w={componentWidth}>
      <DisplayStatistics surveys={completedSurveys} />
    </Group>
  );

  const displayUncompletedSurveys = (
    <Stack
      bg={backgroundColor}
      style={{ borderBottom: borderColor }}
      p={padding}
      w={componentWidth}
    >
      <Title order={3}>Uncompleted surveys</Title>
      <Flex
        w="100%"
        align="baseline"
        justify="flex-start"
        rowGap={rowGap}
        columnGap={rowGap}
        wrap="wrap"
        style={{ borderRadius: '4px' }}
      >
        {!uncompletedSurveys.length && !isLoading ? (
          <Text>
            Congragulations! You have completed all available surveys!
          </Text>
        ) : (
          displayCreatedSurveys
        )}
      </Flex>
    </Stack>
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/outreach/survey-builder/display');
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
      overlayBlur={3}
      overlayOpacity={1}
      radius={4}
      visible={isLoading}
      zIndex={500}
    />
  );

  const displaySurveysSection = (
    <Stack
      w="100%"
      align="center"
      p={padding}
      bg={backgroundColor}
      style={{ position: 'relative' }}
    >
      {displaySubmitSuccessNotificationModal}
      {displayLoadingOverlay}
      {displaySurveyButton}
      {displayTotalAndPageNavigation}
      {displayStatistics}
      {displayUncompletedSurveys}
    </Stack>
  );

  const displaySurveyComponent = (
    <Stack
      w="100%"
      align="center"
      p={padding}
      bg={backgroundColor}
      // style={{ borderRadius: '4px' }}
    >
      {displayResourceHeader}
      {displaySurveysSection}
    </Stack>
  );
  /** ------------- end surveys display ------------- */

  return displaySurveyComponent;
}

export default DisplaySurveys;
