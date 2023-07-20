import { useReducer } from 'react';

import {
  displayLeaveRequestsReducer,
  initialDisplayLeaveRequestsState,
} from './state';
import { Center, Container, Flex } from '@mantine/core';
import { QueryBuilder } from '../../queryBuilder';

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

  const valuesLabelsTypes = {
    startDate: ['Start date', 'date'],
    endDate: ['End date', 'date'],
    reasonForLeave: ['Reason for leave', 'selectData'],
    createdAt: ['Created', 'date'],
    updatedAt: ['Updated', 'date'],
    requestStatus: ['Request status', 'selectData'],
  };

  return (
    <Center>
      <h6>Display leave requests</h6>
      <QueryBuilder />
    </Center>
  );
}

export { DisplayLeaveRequests };
