import { Card, Flex, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  displayAnnouncementsAction,
  displayAnnouncementsReducer,
  initialDisplayAnnouncementsState,
} from './state';
import { logState, urlBuilder } from '../../../../utils';
import { useAuth, useGlobalState } from '../../../../hooks';
import {
  GetQueriedResourceRequestServerResponse,
  ResourceRequestServerResponse,
} from '../../../../types';
import { AnnouncementDocument } from '../../create/types';
import { InvalidTokenError } from 'jwt-decode';
import { CustomNotification } from '../../../customNotification';
import { useNavigate } from 'react-router-dom';
import { globalAction } from '../../../../context/globalProvider/state';

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

    triggerRefresh,

    isError,
    errorMessage,
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
    globalState: { padding, rowGap, width },
    globalDispatch,
  } = useGlobalState();
  const navigate = useNavigate();

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchAnnouncements() {
      const url: URL = urlBuilder({
        path: '/api/v1/actions/outreach/announcement',
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
        const response = await fetch(request);
        const data: GetQueriedResourceRequestServerResponse<AnnouncementDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }

        const { ok } = response;
        if (!ok) {
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setIsLoading,
            payload: false,
          });
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setLoadingMessage,
            payload: '',
          });

          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setIsError,
            payload: true,
          });
          displayAnnouncementsDispatch({
            type: displayAnnouncementsAction.setErrorMessage,
            payload: data.message,
          });
          return;
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
        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setIsLoading,
          payload: false,
        });
        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setLoadingMessage,
          payload: '',
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? displayAnnouncementsDispatch({
              type: displayAnnouncementsAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error?.response
          ? displayAnnouncementsDispatch({
              type: displayAnnouncementsAction.setErrorMessage,
              payload: 'No response from server',
            })
          : displayAnnouncementsDispatch({
              type: displayAnnouncementsAction.setErrorMessage,
              payload:
                error?.message ?? 'Unknown error occurred. Please try again.',
            });

        displayAnnouncementsDispatch({
          type: displayAnnouncementsAction.setIsLoading,
          payload: false,
        });
      }
    }

    fetchAnnouncements();

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logState({
      state: displayAnnouncementsState,
      groupLabel: 'displayAnnouncementsState',
    });
  }, [displayAnnouncementsState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isError || isSubmitting || isSuccessful) {
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

  /** ------------- begin input creators ------------- */

  const createdAnnouncementsCards = responseData?.map(
    (announcement, announcementIdx) => {
      const { _id, bannerImageSrc, bannerImageAlt, title } = announcement;

      const announcementCard = (
        <UnstyledButton
          key={`${_id}-${announcementIdx}`}
          w={350}
          h={217}
          onClick={() => {
            // navigate(`/portal/outreach/announcement/display/${_id}`, {
            //   state: { announcement },
            //   replace: false,
            // });
            globalDispatch({
              type: globalAction.setAnnouncementDocument,
              payload: announcement,
            });

            navigate(`/portal/outreach/announcement/display/${_id}`, {
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
                  opacity: 0.05,
                  width: '100%',
                  height: '100%',
                }}
                radius="md"
                withPlaceholder
              />
            </Card.Section>

            <Text
              size="md"
              p={padding}
              weight={700}
              color="white"
              style={{
                position: 'absolute',
                width: '100%',
                top: '75%',
                left: '0%',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
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
  const displayAnnouncementCards = (
    <Flex
      align="center"
      justify="flex-start"
      w="100%"
      wrap="wrap"
      rowGap={rowGap}
      p={padding}
      columnGap={rowGap}
      style={{
        background: 'white',
        borderRadius: '4px',
      }}
    >
      {createdAnnouncementsCards}
    </Flex>
  );

  /** ------------- end input display ------------- */

  return displayAnnouncementCards;
}

export default DisplayAnnouncements;