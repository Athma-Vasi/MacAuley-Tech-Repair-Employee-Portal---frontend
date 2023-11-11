import { Burger, Flex, Header, MediaQuery, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalState } from '../../hooks/useGlobalState';
import { logState, returnThemeColors } from '../../utils';
import { PortalHeaderProps } from './types';
import { UserAvatar } from './userAvatar/UserAvatar';

function PortalHeader({ openedHeader, setOpenedHeader }: PortalHeaderProps) {
  const { authState } = useAuth();
  const { accessToken, username } = authState;

  const {
    globalState: { themeObject, width, userDocument },
    globalDispatch,
  } = useGlobalState();
  const matchesPrefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );

  const navigate = useNavigate();

  // useEffect(() => {
  //   const { isAccessTokenExpired } = returnIsAccessTokenExpired(accessToken);

  //   if (isAccessTokenExpired) {
  //     authDispatch({
  //       type: authAction.setIsAccessTokenExpired,
  //       payload: isAccessTokenExpired,
  //     });
  //   }
  // }, [authDispatch, pathname]);

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  // // every time location changes, check access token is valid and if expired, fetch new access & refresh tokens
  // useEffect(() => {
  //   if (!accessToken) {
  //     return;
  //   }
  //   const decodedToken = jwtDecode<DecodedToken>(accessToken);
  //   // check if access token is expired with buffer of 5 seconds
  //   const isAccessTokenExpired = decodedToken.exp * 1000 < Date.now() + 5000;

  //   // if access token is expired, call refresh endpoint
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   async function fetchAccessAndRefreshTokens() {
  //     authDispatch({
  //       type: authAction.setFetchingTokens,
  //       payload: true,
  //     });

  //     const refreshUrl: URL = new URL(REFRESH_URL);
  //     const request: Request = new Request(refreshUrl.toString(), {
  //       body: JSON.stringify({ sessionId }),
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       method: 'POST',
  //       mode: 'cors',
  //       signal: controller.signal,
  //     });

  //     try {
  //       const response: Response = await fetch(request);
  //       const data: { message?: string; accessToken?: string } =
  //         await response.json();

  //       if (!isMounted) {
  //         return;
  //       }
  //       const { status } = response;
  //       if (status !== 200) {
  //         throw new Error('Your session has expired. Please log in again.');
  //       }

  //       const { accessToken: newAccessToken } = data;
  //       if (!newAccessToken) {
  //         throw new Error('Error refreshing tokens');
  //       }
  //       authDispatch({
  //         type: authAction.setAccessToken,
  //         payload: newAccessToken,
  //       });
  //       authDispatch({
  //         type: authAction.setIsAccessTokenExpired,
  //         payload: false,
  //       });
  //       authDispatch({
  //         type: authAction.setIsLoggedIn,
  //         payload: true,
  //       });
  //     } catch (error: any) {
  //       if (!isMounted || error.name === 'AbortError') {
  //         return;
  //       }

  //       globalDispatch({
  //         type: globalAction.setErrorState,
  //         payload: {
  //           isError: true,
  //           errorMessage: error?.message,
  //           errorCallback: () => {
  //             globalDispatch({
  //               type: globalAction.setErrorState,
  //               payload: {
  //                 isError: false,
  //                 errorMessage: '',
  //                 errorCallback: () => {},
  //               },
  //             });

  //             navigate('/');
  //           },
  //         },
  //       });

  //       showBoundary(error);
  //     } finally {
  //       if (isMounted) {
  //         authDispatch({
  //           type: authAction.setFetchingTokens,
  //           payload: false,
  //         });
  //       }
  //     }
  //   }

  //   if (isAccessTokenExpired) {
  //     fetchAccessAndRefreshTokens();
  //   }

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, [pathname, isAccessTokenExpired]);

  useEffect(() => {
    if (!matchesPrefersReducedMotion) {
      return;
    }
    globalDispatch({
      type: globalAction.setPrefersReducedMotion,
      payload: matchesPrefersReducedMotion,
    });
  }, [globalDispatch, matchesPrefersReducedMotion]);

  useEffect(() => {
    logState({
      state: authState,
      groupLabel: 'auth state in PortalHeader',
    });
  }, [authState]);

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  return (
    <Header height={{ base: 50, md: 70 }} p="md" bg={backgroundColor}>
      <Flex justify="space-between" align="center" h="100%">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={openedHeader}
            onClick={() => setOpenedHeader((open) => !open)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        {/* title */}
        {width < 768 ? null : (
          <Flex columnGap="xl" align="center">
            <Flex align="center" justify="center">
              <Title order={3} style={{ letterSpacing: '0.30rem' }}>
                MACAULEY
              </Title>
              <Title order={3} color="red">
                TECH
              </Title>
              <Title order={3} color="green">
                REPAIR
              </Title>
            </Flex>

            <Text>Welcome {userDocument?.firstName ?? username}</Text>
          </Flex>
        )}

        <Flex align="center" justify="flex-end">
          <UserAvatar />
        </Flex>
      </Flex>
    </Header>
  );
}

export { PortalHeader };
