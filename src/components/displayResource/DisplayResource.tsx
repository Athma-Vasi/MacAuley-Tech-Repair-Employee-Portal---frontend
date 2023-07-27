import { useEffect, useReducer } from 'react';
import {
  displayResourceAction,
  displayResourceReducer,
  initialDisplayResourceState,
} from './state';
import { DisplayResourceProps, DisplayResourceState } from './types';
import { useGlobalState, useAuth } from '../../hooks';
import { urlBuilder } from '../../utils';
import {
  GetQueriedResourceRequestServerResponse,
  ResourceRequestServerResponse,
} from '../../types';
import { QueryBuilder } from '../queryBuilder';
import { Flex } from '@mantine/core';
import { DisplayQuery } from '../displayQuery';
import { PageBuilder } from '../pageBuilder';

function DisplayResource<Doc>({
  style = {},
  componentQueryData,
  paths,
}: DisplayResourceProps<Doc>) {
  const [displayResourceState, displayResourceDispatch] = useReducer(
    displayResourceReducer,
    initialDisplayResourceState as DisplayResourceState<Doc>
  );
  const {
    resourceData,
    pages,
    totalDocuments,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,

    requestStatus,
    triggerRefresh,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayResourceState;

  const {
    globalState: { padding, rowGap },
  } = useGlobalState();
  const {
    authState: { accessToken, roles },
  } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchResource() {
      // employees can view their own leave requests only
      const path =
        roles.includes('Admin') || roles.includes('Manager')
          ? paths.manager
          : paths.employee;

      const urlString: URL = urlBuilder({
        path,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
      });

      const request: Request = new Request(urlString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

      try {
        const response = await fetch(request);
        const data: GetQueriedResourceRequestServerResponse<Doc> =
          await response.json();
        console.log('response json data', data);
        displayResourceDispatch({
          type: displayResourceAction.setResourceData,
          payload: data.resourceData,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    fetchResource();

    return () => {
      controller.abort();
    };
  }, [newQueryFlag, queryBuilderString, pageQueryString, triggerRefresh]);

  // backend is set to trigger countDocuments scan on a new query only, not on page changes
  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryBuilderString]);
  // set new query flag to false on page changes
  useEffect(() => {
    displayResourceDispatch({
      type: displayResourceAction.setNewQueryFlag,
      payload: false,
    });
  }, [pageQueryString]);

  // submit request status form on change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function updateRequestStatus() {
      const urlString: URL = urlBuilder({
        // path: `/api/v1/actions/company/leave-request/${requestStatus.id}`,
        path: `${paths.manager}/${requestStatus.id}`,
      });

      const body = JSON.stringify({
        leaveRequest: {
          requestStatus: requestStatus.status,
        },
      });

      const request: Request = new Request(urlString, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
        body,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();
        console.log('request status update response', data);
        // trigger component refresh
        displayResourceDispatch({
          type: displayResourceAction.setTriggerRefresh,
          payload: !triggerRefresh,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    // only allow Admin and Manager to update request status
    if (roles.includes('Manager')) {
      if (requestStatus.id !== '') {
        updateRequestStatus();
      }
    }

    return () => {
      controller.abort();
    };
  }, [requestStatus]);

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      h="100%"
      style={{
        backgroundColor: '#fff',
        borderRadius: 4,
      }}
      p={padding}
      rowGap={rowGap}
    >
      <QueryBuilder
        setQueryBuilderString={displayResourceAction.setQueryBuilderString}
        parentComponentDispatch={displayResourceDispatch}
        componentQueryData={componentQueryData}
        collectionName="leave requests"
      />
      <DisplayQuery
        parentComponentName="Leave Requests"
        parentComponentDispatch={displayResourceDispatch}
        componentQueryData={componentQueryData}
        queryResponseData={resourceData}
      />
      <PageBuilder
        total={10}
        setPageQueryString={displayResourceAction.setPageQueryString}
        parentComponentDispatch={displayResourceDispatch}
      />
    </Flex>
  );
}

export { DisplayResource };
