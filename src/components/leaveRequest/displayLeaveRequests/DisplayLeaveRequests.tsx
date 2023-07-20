import { useReducer } from 'react';

import {
  displayLeaveRequestsReducer,
  initialDisplayLeaveRequestsState,
} from './state';
import { Center, Container, Flex } from '@mantine/core';
import { QueryBuilder } from '../../queryBuilder';
import { ComponentQueryData } from '../../queryBuilder/types';

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

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = displayLeaveRequestsState;

  const componentQueryData: ComponentQueryData[] = [
    {
      label: 'Start date',
      value: 'startDate',
      type: 'date',
    },
    {
      label: 'End date',
      value: 'endDate',
      type: 'date',
    },
    {
      label: 'Reason for leave',
      value: 'reasonForLeave',
      type: 'selectData',
    },
    {
      label: 'Created',
      value: 'createdAt',
      type: 'date',
    },
    {
      label: 'Updated',
      value: 'updatedAt',
      type: 'date',
    },
    {
      label: 'Request status',
      value: 'requestStatus',
      type: 'selectData',
    },
  ];
  return (
    <Flex direction="column" align="center" justify="center">
      <h6>Display leave requests</h6>
      <QueryBuilder
        componentQueryData={componentQueryData}
        collectionName="leave requests"
      />
    </Flex>
  );
}

export { DisplayLeaveRequests };

/**
 * {
    startDate: ['Start date', 'date'],
    endDate: ['End date', 'date'],
    reasonForLeave: ['Reason for leave', 'selectData'],
    createdAt: ['Created', 'date'],
    updatedAt: ['Updated', 'date'],
    requestStatus: ['Request status', 'selectData'],
  };

 */
