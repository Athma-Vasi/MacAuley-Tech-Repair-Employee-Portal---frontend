import { Group, Loader, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { globalAction } from '../../context/globalProvider/state';
import { useGlobalState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import CarouselBuilder from '../carouselBuilder/CarouselBuilder';
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

  const { globalDispatch, globalState } = useGlobalState();
  const { errorState } = globalState;
  const navigate = useNavigate();

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

  const slides = [
    <Text>slide 1</Text>,
    <Text>slide 2</Text>,
    <Text>slide 3</Text>,
    <Text>slide 4</Text>,
  ];
  const slideDimensions = {
    width: 500,
    height: 500,
  };

  const displayCarousel = (
    <CarouselBuilder slides={slides} slideDimensions={slideDimensions} />
  );

  return (
    <Group w="100%" position="center" style={{ position: 'relative' }}>
      {displayLoadingOverlay}
      <Text>{`Access token is ${
        accessToken ? 'present' : 'not present'
      }`}</Text>

      <Group style={{ outline: '1px solid teal' }}>{displayCarousel}</Group>
    </Group>
  );
}

export default Dashboard;
