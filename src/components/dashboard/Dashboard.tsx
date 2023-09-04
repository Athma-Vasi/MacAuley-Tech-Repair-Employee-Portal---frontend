import { Group, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { globalAction } from '../../context/globalProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { UserDocument } from '../../types';
import { logState, urlBuilder } from '../../utils';
import { dashboardReducer, initialDashboardState } from './state';
import { InvalidTokenError } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  // const {
  //   errorMessage,
  //   isError,
  //   isLoading,
  //   isSubmitting,
  //   isSuccessful,
  //   loadingMessage,
  //   submitMessage,
  //   successMessage,
  // } = dashboardState;
  const { globalState, globalDispatch } = useGlobalState();
  const {
    authState: { accessToken, userId },
  } = useAuth();

  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getUserData() {
      const url: URL = urlBuilder({
        path: `user/${userId}`,
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
      }
    }

    if (accessToken) {
      getUserData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log('accessToken in dashboard: ', accessToken);
    logState({
      state: globalState,
      groupLabel: 'globalState in Dashboard',
    });
  }, [accessToken, globalState]);

  return (
    <Group w="100%" position="center">
      <Text color="dark">{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>
    </Group>
  );
}

export { Dashboard };
