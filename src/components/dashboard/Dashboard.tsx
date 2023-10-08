import {
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import { useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';

import { globalAction } from '../../context/globalProvider/state';
import { useGlobalState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import { ActionsResourceRequestServerResponse } from '../../types';
import CarouselBuilder from '../carouselBuilder/CarouselBuilder';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  const {
    successMessage,
    submitMessage,
    loadingMessage,
    isSuccessful,
    isSubmitting,
    isLoading,
    triggerFetchActionsDocuments,
  } = dashboardState;

  const {
    authState: { accessToken, isAccessTokenExpired, roles, userId },
  } = useAuth();

  const {
    globalDispatch,
    globalState: { padding, width, themeObject, actionsDocuments },
  } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchActionsDocuments() {
      dashboardDispatch({
        type: dashboardAction.setIsLoading,
        payload: true,
      });
      dashboardDispatch({
        type: dashboardAction.setLoadingMessage,
        payload: 'Fetching recent company, general and outreach documents...',
      });

      const url: URL = new URL(
        `http://localhost:5500/api/v1/actions/dashboard${
          roles.includes('Employee') ? `/${userId}` : ''
        }?&limit=5&totalDocuments=0`
      );

      const request: Request = new Request(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ActionsResourceRequestServerResponse =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        console.log({ data });
        const { companyData, generalData, outreachData } = data;
        const actionsDocuments = {
          companyData,
          generalData,
          outreachData,
        };
        globalDispatch({
          type: globalAction.setActionsDocuments,
          payload: actionsDocuments,
        });
        dashboardDispatch({
          type: dashboardAction.setIsSuccessful,
          payload: true,
        });
        dashboardDispatch({
          type: dashboardAction.setSuccessMessage,
          payload:
            'Successfully fetched recent company, general and outreach documents',
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
              navigate('/');

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
        dashboardDispatch({
          type: dashboardAction.setIsLoading,
          payload: false,
        });
        dashboardDispatch({
          type: dashboardAction.setLoadingMessage,
          payload: '',
        });
        dashboardDispatch({
          type: dashboardAction.triggerFetchActionsDocuments,
          payload: false,
        });
      }
    }

    if (triggerFetchActionsDocuments && !actionsDocuments) {
      fetchActionsDocuments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFetchActionsDocuments, isAccessTokenExpired]);

  // useEffect(() => {
  //   logState({
  //     state: dashboardState,
  //     groupLabel: 'dashboard state in Dashboard',
  //   });
  // }, [accessToken, globalState]);

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  return (
    <Stack w="100%" align="center" style={{ position: 'relative' }}>
      {displayLoadingOverlay}
      <Text>{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>
    </Stack>
  );
}

export default Dashboard;
