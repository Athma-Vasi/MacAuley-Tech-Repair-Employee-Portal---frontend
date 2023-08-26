import { Group, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { globalAction } from '../../context/globalProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { UserDocument } from '../../types';
import { logState, urlBuilder } from '../../utils';
import { dashboardReducer, initialDashboardState } from './state';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  const {
    errorMessage,
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    loadingMessage,
    submitMessage,
    successMessage,
  } = dashboardState;
  const { globalState, globalDispatch } = useGlobalState();
  const {
    authState: { accessToken, userId },
  } = useAuth();

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
        if (ok) {
          globalDispatch({
            type: globalAction.setUserDocument,
            payload: resourceData[0],
          });
        } else {
          dashboardDispatch({
            type: 'setErrorMessage',
            payload: message,
          });

          dashboardDispatch({
            type: 'setIsError',
            payload: true,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          dashboardDispatch({
            type: 'setErrorMessage',
            payload: error?.message ?? 'Unknown error occurred.',
          });

          dashboardDispatch({
            type: 'setIsError',
            payload: true,
          });
        }
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
