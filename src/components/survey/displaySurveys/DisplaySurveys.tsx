import { useEffect, useReducer } from 'react';
import { CustomRating } from '../../customRating/CustomRating';
import {
  displaySurveysAction,
  displaySurveysReducer,
  initialDisplaySurveysState,
} from './state';
import { logState, urlBuilder } from '../../../utils';
import { useAuth } from '../../../hooks';
import { GetQueriedResourceRequestServerResponse } from '../../../types';
import { SurveyBuilderDocument } from '../types';
import { CustomNotification } from '../../customNotification';
import { useNavigate } from 'react-router-dom';

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
            payload: responseData,
          });

          displaySurveysDispatch({
            type: displaySurveysAction.setStepperDescriptionsMap,
            payload: responseData,
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

  // useEffect(() => {
  //   displaySurveysDispatch({
  //     type: displaySurveysAction.setSurveysMap,
  //     payload: responseData,
  //   });

  //   displaySurveysDispatch({
  //     type: displaySurveysAction.setStepperDescriptionsMap,
  //     payload: responseData,
  //   });
  // }, [responseData]);

  useEffect(() => {
    logState({
      state: displaySurveysState,
      groupLabel: 'DisplaySurveys',
    });
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

  return (
    <>
      <CustomRating ratingKind="emotion" />
    </>
  );
}

export { DisplaySurveys };
