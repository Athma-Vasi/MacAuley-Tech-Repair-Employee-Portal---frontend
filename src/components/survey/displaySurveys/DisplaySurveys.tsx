import { ChangeEvent, useEffect, useReducer } from 'react';
import { CustomRating } from '../../customRating/CustomRating';
import {
  displaySurveysAction,
  displaySurveysReducer,
  initialDisplaySurveysState,
} from './state';
import { logState, urlBuilder } from '../../../utils';
import { useAuth } from '../../../hooks';
import {
  CheckBoxMultipleData,
  GetQueriedResourceRequestServerResponse,
  RadioGroupInputData,
} from '../../../types';
import { SurveyBuilderDocument } from '../types';
import { CustomNotification } from '../../customNotification';
import { useNavigate } from 'react-router-dom';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
} from '../../wrappers';
import {
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS } from '../constants';
import { Stack, Text } from '@mantine/core';

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
    currentSurveyId,
    response,
    stepperDescriptionsMap,

    pageQueryString,
    queryBuilderString,
    newQueryFlag,
    totalDocuments,
    pages,

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
              type: displaySurveysAction.setCurrentStepperPositions,
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

  // TODO: implement filtering based on survey sendTo and user's department

  useEffect(() => {
    logState({
      state: displaySurveysState,
      groupLabel: 'DisplaySurveys',
    });
  }, [displaySurveysState]);

  useEffect(() => {
    displaySurveysState.responseData.forEach(
      (survey: SurveyBuilderDocument) => {
        const { questions } = survey;

        console.group(`Survey: ${survey._id}`);
        questions.forEach(
          ({ question, responseDataOptions, responseInput, responseKind }) => {
            console.group(`Question: ${question}`);
            console.log('responseDataOptions: ', responseDataOptions);
            console.log('responseInput: ', responseInput);
            console.log('responseKind: ', responseKind);
            console.groupEnd();
          }
        );
        console.groupEnd();
      }
    );
  }, [displaySurveysState]);

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
        ({ question, responseDataOptions, responseInput, responseKind }) => {
          switch (responseInput) {
            case 'agreeDisagree': {
              const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
                {
                  dataObjectArray: SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
                  description: question,
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
                };

              const [createdRadioInput] =
                returnAccessibleRadioGroupInputsElements([
                  radioInputCreatorInfoObj,
                ]);

              acc[surveyIdx].push(createdRadioInput);
              break;
            }

            case 'radio': {
              const dataObjectArray: RadioGroupInputData =
                responseDataOptions.map((responseDataOption) => ({
                  value: responseDataOption,
                  label: responseDataOption,
                }));

              const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
                {
                  dataObjectArray,
                  description: question,
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
                };

              const [createdRadioInput] =
                returnAccessibleRadioGroupInputsElements([
                  radioInputCreatorInfoObj,
                ]);

              acc[surveyIdx].push(createdRadioInput);
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
                    selected: <Text>Selected</Text>,
                    deselected: <Text>Deselected</Text>,
                  },
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

              acc[surveyIdx].push(createdCheckboxInput);
              break;
            }

            case 'emotion': {
              break;
            }

            case 'stars': {
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

  return (
    <Stack>
      {createdSurveys.map((survey, idx) => (
        <Stack key={`${idx}`}>{survey}</Stack>
      ))}
    </Stack>
  );
}

export { DisplaySurveys };
