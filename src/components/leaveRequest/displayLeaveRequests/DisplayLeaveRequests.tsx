import { Flex, Group, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useAuth, useGlobalState } from '../../../hooks';
import { logState } from '../../../utils';
import { PageBuilder } from '../../pageBuilder';
import { QueryBuilder } from '../../queryBuilder';
import { FormLayoutWrapper } from '../../wrappers';
import { LEAVE_REQUESTS_QUERY_DATA } from './constants';
import {
  displayLeaveRequestsAction,
  displayLeaveRequestsReducer,
  initialDisplayLeaveRequestsState,
} from './state';

function DisplayLeaveRequests() {
  const [displayLeaveRequestsState, displayLeaveRequestsDispatch] = useReducer(
    displayLeaveRequestsReducer,
    initialDisplayLeaveRequestsState
  );
  const {
    leaveRequests,
    pages,
    totalDocuments,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayLeaveRequestsState;

  const {
    globalState: { padding },
  } = useGlobalState();
  const {
    authState: { accessToken },
  } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchLeaveRequests() {
      const urlString = `http://localhost:3500/actions/company/leave-request${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`;
      console.log('urlString:', urlString);

      try {
        const newRequest: Request = new Request(urlString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });

        const response = await fetch(newRequest);
        const data = await response.json();
        displayLeaveRequestsDispatch({
          type: displayLeaveRequestsAction.setLeaveRequests,
          payload: data.leaveRequestsData,
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    }

    fetchLeaveRequests();

    return () => {
      controller.abort();
    };
  }, [newQueryFlag]);

  // backend is set to trigger countDocuments scan on a new query only, not on page changes
  useEffect(() => {
    displayLeaveRequestsDispatch({
      type: displayLeaveRequestsAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryBuilderString]);
  // set new query flag to false on page changes
  useEffect(() => {
    displayLeaveRequestsDispatch({
      type: displayLeaveRequestsAction.setNewQueryFlag,
      payload: false,
    });
  }, [pageQueryString]);

  useEffect(() => {
    logState({
      state: displayLeaveRequestsState,
      groupLabel: 'DisplayLeaveRequests',
    });
  }, [displayLeaveRequestsState]);

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
    >
      <h6>Display leave requests</h6>
      {leaveRequests.length > 0
        ? leaveRequests.map((leaveRequest, index) => (
            <Group
              key={`leave-request-${index}`}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: 4,
              }}
              p={padding}
            >
              <FormLayoutWrapper>
                <Text size="xs">{JSON.stringify(leaveRequest, null, 2)}</Text>
              </FormLayoutWrapper>
            </Group>
          ))
        : null}
      <QueryBuilder
        setQueryBuilderString={displayLeaveRequestsAction.setQueryBuilderString}
        parentComponentDispatch={displayLeaveRequestsDispatch}
        componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
        collectionName="leave requests"
      />
      <PageBuilder
        total={10}
        setPageQueryString={displayLeaveRequestsAction.setPageQueryString}
        parentComponentDispatch={displayLeaveRequestsDispatch}
      />
    </Flex>
  );
}

export { DisplayLeaveRequests };
