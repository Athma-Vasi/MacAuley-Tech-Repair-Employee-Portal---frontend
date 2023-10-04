import { Group, Loader, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { globalAction } from '../../context/globalProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { UserDocument } from '../../types';
import { logState, urlBuilder } from '../../utils';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import { InvalidTokenError } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

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
    triggerFetchUserData,
  } = dashboardState;

  const { globalState, globalDispatch } = useGlobalState();
  const {
    authState: { accessToken, userId, username, isAccessTokenExpired },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function getUserData() {
      dashboardDispatch({
        type: dashboardAction.setIsLoading,
        payload: true,
      });
      dashboardDispatch({
        type: dashboardAction.setLoadingMessage,
        payload: `Fetching ${username}'s data...`,
      });

      const url: URL = urlBuilder({ path: `user/${userId}` });

      const request: Request = new Request(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: {
          message: string;
          resourceData: [Omit<UserDocument, '__v' | 'password'>];
        } = await response.json();
        const { message, resourceData } = data;

        if (!isMounted) {
          return;
        }
        const { ok } = response;
        if (!ok) {
          throw new Error(data.message);
        }

        globalDispatch({
          type: globalAction.setUserDocument,
          payload: resourceData[0],
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
            : error.message ?? 'Unknown error occured. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/portal');

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
          type: 'setIsLoading',
          payload: false,
        });
        dashboardDispatch({
          type: 'setLoadingMessage',
          payload: '',
        });
        dashboardDispatch({
          type: 'setTriggerFetchUserData',
          payload: false,
        });
      }
    }

    if (triggerFetchUserData) {
      getUserData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isAccessTokenExpired]);

  useEffect(() => {
    console.log({ isAccessTokenExpired });
    logState({
      state: dashboardState,
      groupLabel: 'dashboard state in Dashboard',
    });
  }, [accessToken, globalState]);

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
    <Group w="100%" position="center" style={{ position: 'relative' }}>
      {displayLoadingOverlay}
      <Text>{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>
    </Group>
  );
}

export default Dashboard;
