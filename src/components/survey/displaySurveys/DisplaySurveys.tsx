import {
  Center,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ChangeEvent, Fragment, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth, useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { CheckBoxMultipleData, RadioGroupInputData } from '../../../types';
import { filterFieldsFromObject, logState, urlBuilder } from '../../../utils';
import { CustomNotification } from '../../customNotification';
import { CustomRating } from '../../customRating/CustomRating';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  StepperWrapper,
} from '../../wrappers';
import { SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS } from '../constants';
import { SurveyBuilderDocument } from '../types';
import {
  displaySurveysAction,
  displaySurveysReducer,
  initialDisplaySurveysState,
} from './state';
import { ResponsePayload } from './types';
import { TbChartPie3, TbChartPie4, TbUpload } from 'react-icons/tb';
import localforage from 'localforage';
import { idText } from 'typescript';

function DisplaySurveys() {
  /** ------------- begin hooks ------------- */
  const [displaySurveysState, displaySurveysDispatch] = useReducer(
    displaySurveysReducer,
    initialDisplaySurveysState
  );
  const {
    responseData,
    surveysMap,
    surveySubmissions,
    surveyToSubmit,
    currentSurveyId,
    response,

    stepperDescriptionsMap,
    currentStepperPositions,
    stepsInError,

    pageQueryString,
    queryBuilderString,
    newQueryFlag,
    totalDocuments,
    pages,

    triggerSurveySubmission,

    isError,
    errorMessage,
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
  const {
    globalState: { padding, rowGap, width },
  } = useGlobalState();
  const navigate = useNavigate();
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // fetch surveys on mount
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchSurveys() {
      displaySurveysDispatch({
        type: displaySurveysAction.setIsLoading,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: `/api/v1/actions/outreach/survey-builder${
          roles.includes('Manager') ? '' : '/user'
        }`,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
      });

      const request: Request = new Request(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: {
          message: string;
          resourceData: SurveyBuilderDocument[];
          totalDocuments: number;
          pages: number;
        } = await response.json();

        if (!isMounted) {
          return;
        }

        if (response.ok) {
          displaySurveysDispatch({
            type: displaySurveysAction.setResponseData,
            payload: data.resourceData,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setSurveysMap,
            payload: data.resourceData,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setStepperDescriptionsMap,
            payload: data.resourceData,
          });

          data.resourceData.forEach((survey: SurveyBuilderDocument) => {
            displaySurveysDispatch({
              type: displaySurveysAction.setCurrentStepperPosition,
              payload: {
                id: survey._id,
                currentStepperPosition: 0,
              },
            });
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setTotalDocuments,
            payload: data.totalDocuments ?? totalDocuments,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setPages,
            payload: data.pages ?? pages,
          });
        } else {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsError,
            payload: true,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setErrorMessage,
            payload: data.message,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsError,
            payload: true,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setErrorMessage,
            payload:
              error?.message ?? 'Unknown error occurred. Please try again.',
          });
        }
      } finally {
        if (isMounted) {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsLoading,
            payload: false,
          });
        }
      }
    }

    if (isMounted) {
      fetchSurveys();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
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

      const url: URL = urlBuilder({
        path: `/api/v1/actions/outreach/survey-builder/${surveyId}`,
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

      const request: Request = new Request(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: { message: string; resourceData: SurveyBuilderDocument } =
          await response.json();

        if (!isMounted) {
          return;
        }

        if (response.ok) {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsSuccessful,
            payload: true,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setSuccessMessage,
            payload: data.message,
          });
        } else {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsError,
            payload: true,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setErrorMessage,
            payload: data.message,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsError,
            payload: true,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setErrorMessage,
            payload:
              error?.message ?? 'Unknown error occurred. Please try again.',
          });
        }
      } finally {
        if (isMounted) {
          displaySurveysDispatch({
            type: displaySurveysAction.setIsSubmitting,
            payload: false,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setTriggerSurveySubmission,
            payload: false,
          });
        }
      }
    }

    if (isMounted && triggerSurveySubmission) {
      submitSurveyResponse();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerSurveySubmission]);

  // set steps in error for stepper
  useEffect(() => {
    Array.from(currentStepperPositions).forEach(
      ([surveyId, currentStepperPosition]) => {
        // get the corresponding survey submission
        const surveySubmission = surveySubmissions.get(surveyId);
        // if there is no survey submission, then set the steps in error from current stepper position to zero
        if (!surveySubmission) {
          // for (let idx = currentStepperPosition; idx > 0; idx -= 1) {
          //   displaySurveysDispatch({
          //     type: displaySurveysAction.setStepsInError,
          //     payload: {
          //       surveyId,
          //       stepInError: {
          //         kind: 'add',
          //         step: idx,
          //       },
          //     },
          //   });
          // }
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
        // if there is a survey submission, iterate through it and see if any responses are an empty string, or if an array, are empty, or if a number, is not zero
        else {
          const { surveyResponses } = surveySubmission;
          surveyResponses.forEach(({ response }, idx) => {
            if (
              response === '' ||
              (Array.isArray(response) && response.length === 0) ||
              response === 0
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

  // TODO: implement filtering based on survey sendTo and user's department

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

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isError || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        errorMessage={errorMessage}
        isLoading={isLoading}
        isError={isError}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        onClose={() => {
          navigate('/portal');
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  const createdSurveys = responseData.reduce(
    (acc: Array<JSX.Element[]>, survey, surveyIdx) => {
      const { questions, _id, surveyTitle } = survey;

      questions.forEach(
        (
          { question, responseDataOptions, responseInput, responseKind },
          questionIdx
        ) => {
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

          switch (responseInput) {
            case 'agreeDisagree': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse.question === question
                )?.response as string;

              const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
                {
                  dataObjectArray: SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
                  description: question,
                  key: `${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`,
                  onChange: (value: string) => {
                    displaySurveysDispatch({
                      type: displaySurveysAction.setResponse,
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

              acc[surveyIdx].push(
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdRadioInput}
                </Fragment>
              );
              break;
            }

            case 'radio': {
              const dataObjectArray: RadioGroupInputData =
                responseDataOptions.map((responseDataOption) => ({
                  value: responseDataOption,
                  label: responseDataOption,
                }));

              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse.question === question
                )?.response as string;

              const description = (
                <Text size="sm" aria-label="polite">{`You have selected: ${
                  surveySubmissions
                    .get(_id)
                    ?.surveyResponses.find(
                      (surveyResponse) => surveyResponse.question === question
                    )?.response ?? 'N/A'
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
                      type: displaySurveysAction.setResponse,
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

              acc[surveyIdx].push(
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdRadioInput}
                </Fragment>
              );
              break;
            }

            case 'checkbox': {
              const dataObjectArray: CheckBoxMultipleData =
                responseDataOptions.map((responseDataOption) => ({
                  value: responseDataOption,
                  label: responseDataOption,
                }));

              const surveySubmission = surveySubmissions.get(_id);
              const checkboxValue = surveySubmission?.surveyResponses.find(
                (surveyResponse) => surveyResponse.question === question
              )?.response as string[];

              const checkboxInputCreatorInfoObj: AccessibleCheckboxGroupInputCreatorInfo =
                {
                  dataObjectArray,
                  description: {
                    selected: (
                      <Text
                        size="sm"
                        aria-label="polite"
                      >{`You have selected: ${checkboxValue?.join(
                        ', '
                      )}`}</Text>
                    ),
                    deselected: (
                      <Text size="sm" aria-label="polite">
                        Choose as many as you would like.
                      </Text>
                    ),
                  },
                  key: `${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`,
                  onChange: (value: string[]) => {
                    displaySurveysDispatch({
                      type: displaySurveysAction.setResponse,
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

              acc[surveyIdx].push(
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdCheckboxInput}
                </Fragment>
              );
              break;
            }

            case 'emotion': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse.question === question
                )?.response as number;

              const createdEmotionRatingInput = (
                <CustomRating
                  controlledValue={value}
                  question={question}
                  ratingKind="emotion"
                  dynamicComponentProps={dynamicComponentProps}
                />
              );

              acc[surveyIdx].push(
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdEmotionRatingInput}
                </Fragment>
              );
              break;
            }

            case 'stars': {
              const value = surveySubmissions
                .get(_id)
                ?.surveyResponses.find(
                  (surveyResponse) => surveyResponse.question === question
                )?.response as number;

              const createdStarsRatingInput = (
                <CustomRating
                  controlledValue={value}
                  question={question}
                  ratingKind="stars"
                  dynamicComponentProps={dynamicComponentProps}
                />
              );

              acc[surveyIdx].push(
                <Fragment
                  key={`${_id}-${surveyIdx}-${questionIdx}-${question}-${responseInput}-${responseKind}`}
                >
                  {createdStarsRatingInput}
                </Fragment>
              );
              break;
            }

            default:
              break;
          }
        }
      );

      return acc;
    },
    // create an array of arrays with the same length as responseData
    Array.from({ length: responseData.length }).map(() => [])
  );

  const displayCreatedSurveys = responseData.map((responseData, idx) => {
    const { surveyTitle, _id } = responseData;

    const currentStepperPosition = currentStepperPositions.get(_id) ?? 0;
    const descriptionObjectsArray = stepperDescriptionsMap.get(_id) ?? [];
    const stepInError = stepsInError.get(_id) ?? new Set();
    const dynamicStepperProps = {
      id: _id,
      dynamicSetStepperDispatch: displaySurveysDispatch,
    };
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
      <Tooltip label={`Submit ${surveyTitle}`}>
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    );

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
        <Stack p={padding} w="100%">
          {displayPage}
        </Stack>
      </StepperWrapper>
    );

    return (
      <Stack
        w={width < 480 ? 350 : 640}
        style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
        key={`${_id}-${idx}-${surveyTitle}`}
      >
        {createdStepperWrapper}
      </Stack>
    );
  });

  return (
    <Flex
      w="100%"
      align="baseline"
      justify="center"
      p={padding}
      rowGap={rowGap}
      columnGap={rowGap}
      wrap="wrap"
      style={{ backgroundColor: 'white', borderRadius: '4px' }}
    >
      {displayCreatedSurveys}
    </Flex>
  );
}

export { DisplaySurveys };
