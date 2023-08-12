import { Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  displayAnnouncementsAction,
  displayAnnouncementsReducer,
  initialDisplayAnnouncementsState,
} from './state';
import { logState, urlBuilder } from '../../../utils';
import { useAuth } from '../../../hooks';
import {
  GetQueriedResourceRequestServerResponse,
  ResourceRequestServerResponse,
} from '../../../types';
import { AnnouncementDocument } from '../create/types';
import { InvalidTokenError } from 'jwt-decode';
import { CustomNotification } from '../../customNotification';

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
      }
    }

    fetchAnnouncements();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
        errorMessage={errorMessage}
        isLoading={isLoading}
        isError={isError}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={displayAnnouncementsDispatch}
        navigateTo={{
          errorPath: '/portal',
          successPath: '/portal/outreach/announcement/display',
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  return (
    <>
      <Text>display announcement</Text>
    </>
  );
}

export { DisplayAnnouncements };
