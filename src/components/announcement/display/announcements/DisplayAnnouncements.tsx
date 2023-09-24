import { Card, Flex, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import { useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../../constants/data';
import { globalAction } from '../../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../../hooks';
import { GetQueriedResourceRequestServerResponse } from '../../../../types';
import { logState, returnThemeColors, urlBuilder } from '../../../../utils';
import { CustomNotification } from '../../../customNotification';
import DisplayResourceHeader from '../../../displayResourceHeader/DisplayResourceHeader';
import { AnnouncementDocument } from '../../create/types';
import {
  displayAnnouncementsAction,
  displayAnnouncementsReducer,
  initialDisplayAnnouncementsState,
} from './state';
import { QueryBuilder } from '../../../queryBuilder';
import { ANNOUNCEMENT_QUERY_DATA } from '../../create/constants';

function DisplayAnnouncements() {
  /** ------------- begin hooks ------------- */
  const [displayAnnouncementsState, displayAnnouncementsDispatch] = useReducer(
    displayAnnouncementsReducer,
    initialDisplayAnnouncementsState
  );
  const {
    responseData,
    pages,
    totalDocuments,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,

    triggerFetchAnnouncements,

    isLoading,
    loadingMessage,
    isSuccessful,
    successMessage,
    isSubmitting,
    submitMessage,
  } = displayAnnouncementsState;

  const {
    authState: { accessToken },
  } = useAuth();

  const {
    globalState: { padding, rowGap, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchAnnouncements() {
      displayAnnouncementsDispatch({
        type: displayAnnouncementsAction.setIsLoading,
        payload: true,
      });
      displayAnnouncementsDispatch({
        type: displayAnnouncementsAction.setLoadingMessage,
        payload: 'Fetching announcements from server...',
      });

      const url: URL = urlBuilder({
        path: 'actions/outreach/announcement',
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
      });

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
        const data: GetQueriedResourceRequestServerResponse<AnnouncementDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setResponseData,
          payload: data.resourceData,
        });
        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setPages,
          payload: data.pages ?? pages,
        });
        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setTotalDocuments,
          payload: data.totalDocuments ?? totalDocuments,
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
              navigate('/home');

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
        if (isMounted) {
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setIsLoading,
            payload: false,
          });
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setLoadingMessage,
            payload: '',
          });
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setTriggerFetchAnnouncements,
            payload: false,
          });
        }
      }
    }

    if (triggerFetchAnnouncements) {
      fetchAnnouncements();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetchAnnouncements]);

  useEffect(() => {
    displayAnnouncementsDispatch({
      type: displayAnnouncementsAction.setNewQueryFlag,
      payload: true,
    });

    displayAnnouncementsDispatch({
      type: displayAnnouncementsAction.setTriggerFetchAnnouncements,
      payload: true,
    });
  }, [queryBuilderString]);

  useEffect(() => {
    logState({
      state: displayAnnouncementsState,
      groupLabel: 'displayAnnouncementsState',
    });
  }, [displayAnnouncementsState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={displayAnnouncementsDispatch}
        navigateTo={{
          successPath: '/home/outreach/announcement/display',
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  const {
    appThemeColors: { backgroundColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  /** ------------- begin input creators ------------- */

  const createdAnnouncementsCards = responseData?.map(
    (announcement, announcementIdx) => {
      const { _id, bannerImageSrc, bannerImageAlt, title } = announcement;

      // required to avoid breadcrumbs showing '%20' instead of spaces
      const dynamicPath = title ? title.replace(/ /g, '-') : _id;
      const announcementCard = (
        <UnstyledButton
          key={`${_id}-${announcementIdx}`}
          w={350}
          h={217}
          onClick={() => {
            globalDispatch({
              type: globalAction.setAnnouncementDocument,
              payload: announcement,
            });

            navigate(`/home/outreach/announcement/display/${dynamicPath}`, {
              replace: false,
            });
          }}
        >
          <Card shadow="sm" radius="md" withBorder w="100%" h="100%">
            <Card.Section>
              <Image
                src={bannerImageSrc}
                alt={bannerImageAlt}
                fit="fill"
                style={{
                  position: 'relative',
                  // opacity: 0.4,
                  width: '100%',
                  height: '100%',
                }}
                radius="md"
                withPlaceholder
              />
            </Card.Section>

            <Text
              size="md"
              color="white"
              p={padding}
              weight={700}
              style={{
                position: 'absolute',
                width: '100%',
                top: '75%',
                left: '0%',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
              }}
            >
              {title}
            </Text>
          </Card>
        </UnstyledButton>
      );

      return announcementCard;
    }
  );

  /** ------------- end input creators ------------- */

  /** ------------- begin input display ------------- */

  const imageSrc =
    'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress';
  const imageAlt = 'Cheerful young woman holding a megaphone';
  const resourceDescription = 'Explore MacAuley Company Announcements';
  const resourceTitle = 'Announcements';

  const displayAnnouncementHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayAnnouncementCards = (
    <Flex
      align="flex-start"
      bg={backgroundColor}
      justify="center"
      w="100%"
      wrap="wrap"
      rowGap={rowGap}
      p={padding}
      columnGap={rowGap}
      style={{ borderRadius: '4px' }}
    >
      {createdAnnouncementsCards}
    </Flex>
  );

  const displayQueryBuilder = (
    <Group w="100%" bg={backgroundColor} position="center">
      <QueryBuilder
        collectionName="announcement"
        componentQueryData={ANNOUNCEMENT_QUERY_DATA}
        queryBuilderStringDispatch={displayAnnouncementsDispatch}
        setQueryBuilderString={displayAnnouncementsAction.setQueryBuilderString}
        disableProjection={true}
      />
    </Group>
  );

  const displayAnnouncementsComponent = (
    <Flex direction="column" w="100%">
      {displayAnnouncementHeader}
      {displayQueryBuilder}
      {displayAnnouncementCards}
    </Flex>
  );

  /** ------------- end input display ------------- */

  return displayAnnouncementsComponent;
}

export default DisplayAnnouncements;
