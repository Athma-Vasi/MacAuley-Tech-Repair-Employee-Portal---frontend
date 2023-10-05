import { Group, Loader, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { dashboardReducer, initialDashboardState } from './state';

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

  const {
    authState: { accessToken, isAccessTokenExpired },
  } = useAuth();

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
    <Group w="100%" position="center" style={{ position: 'relative' }}>
      {displayLoadingOverlay}
      <Text>{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>
    </Group>
  );
}

export default Dashboard;
