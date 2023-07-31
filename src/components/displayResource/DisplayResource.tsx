import { Flex, Modal } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth, useGlobalState } from '../../hooks';
import {
  GetQueriedResourceRequestServerResponse,
  RequestStatus,
  ResourceRequestServerResponse,
  ResourceRoutePaths,
} from '../../types';
import { logState, splitCamelCase, urlBuilder } from '../../utils';
import { DisplayQuery } from '../displayQuery';
import { PageBuilder } from '../pageBuilder';
import { QueryBuilder } from '../queryBuilder';
import { displayResourceAction, displayResourceReducer } from './state';
import {
  DisplayResourceProps,
  DisplayResourceState,
  UpdateRequestStatusInput,
} from './types';
import { useDisclosure } from '@mantine/hooks';

function DisplayResource<Doc>({
  style = {},
  componentQueryData,
  requestBodyHeading,
  paths,
}: DisplayResourceProps<Doc>) {
  const initialDisplayResourceState: DisplayResourceState<Doc> = {
    resourceData: [],
    pages: 0,
    totalDocuments: 0,

    newQueryFlag: true,
    queryBuilderString: '?',
    pageQueryString: '',

    requestStatus: {
      id: '',
      status: 'pending',
    },
    deleteForm: {
      id: '',
      value: false,
    },
    triggerRefresh: false,

    isError: false,
    errorMessage: '',
    isSubmitting: false,
    submitMessage: '',
    isSuccessful: false,
    successMessage: '',
    isLoading: false,
    loadingMessage: '',
  };

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
    deleteForm,
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
        displayResourceDispatch({
          type: displayResourceAction.setPages,
          payload: data.pages ?? pages,
        });
        displayResourceDispatch({
          type: displayResourceAction.setTotalDocuments,
          payload: data.totalDocuments,
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

    async function updateRequestStatus({
      accessToken,
      paths,
      requestStatus: { id, status },
      requestBodyHeading,
      signal,
    }: UpdateRequestStatusInput) {
      const urlString: URL = urlBuilder({
        path: `${paths.manager}/${id}`,
      });

      const resourceBody = Object.create(null);
      Object.defineProperty(resourceBody, requestBodyHeading, {
        value: {
          requestStatus: status,
        },
        writable: true,
        enumerable: true,
        configurable: true,
      });
      const body = JSON.stringify(resourceBody);

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
        updateRequestStatus({
          accessToken,
          requestStatus,
          paths,
          requestBodyHeading,
          signal,
        });
      }
    }

    return () => {
      controller.abort();
    };
  }, [requestStatus]);

  // delete form on deleteForm status change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function deleteResource() {
      const urlString: URL = urlBuilder({
        path: `${paths.manager}/${deleteForm.id}`,
      });

      const request: Request = new Request(urlString, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<Doc> = await response.json();
        console.log('delete response', data);
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

    // only allow Managers to delete forms
    if (roles.includes('Manager')) {
      if (deleteForm.id !== '' && deleteForm.value === true) {
        deleteResource();
      }
    }

    return () => {
      controller.abort();
    };
  }, [deleteForm]);

  useEffect(() => {
    logState({
      state: displayResourceState,
      groupLabel: 'displayResourceState',
    });
  }, [displayResourceState]);

  // prevent display of option to groupBy/projection exclusion of username field if the resource is anonymousRequest
  const filteredComponentQueryData =
    requestBodyHeading === 'anonymousRequest'
      ? componentQueryData.filter((obj) => obj.value !== 'username')
      : componentQueryData;

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      h="100%"
      style={{
        ...style,
        backgroundColor: '#fff',
        borderRadius: 4,
      }}
      p={padding}
      rowGap={rowGap}
    >
      <QueryBuilder
        setQueryBuilderString={displayResourceAction.setQueryBuilderString}
        parentComponentDispatch={displayResourceDispatch}
        componentQueryData={filteredComponentQueryData}
        collectionName={splitCamelCase(requestBodyHeading)}
      />

      <DisplayQuery
        totalDocuments={totalDocuments}
        parentComponentName={splitCamelCase(requestBodyHeading)}
        parentRequestStatusDispatch={displayResourceDispatch}
        parentDeleteFormDispatch={displayResourceDispatch}
        componentQueryData={filteredComponentQueryData}
        queryResponseData={resourceData}
      />
      <PageBuilder
        total={pages}
        setPageQueryString={displayResourceAction.setPageQueryString}
        parentComponentDispatch={displayResourceDispatch}
      />
    </Flex>
  );
}

export { DisplayResource };