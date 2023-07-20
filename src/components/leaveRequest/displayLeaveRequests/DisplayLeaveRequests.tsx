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
      label: 'Created date',
      value: 'createdAt',
      inputKind: 'dateInput',
    },
    {
      label: 'Updated date',
      value: 'updatedAt',
      inputKind: 'dateInput',
    },
    {
      label: 'Start date',
      value: 'startDate',
      inputKind: 'dateInput',
    },
    {
      label: 'End date',
      value: 'endDate',
      inputKind: 'dateInput',
    },
    {
      label: 'Reason for leave',
      value: 'reasonForLeave',
      inputKind: 'selectInput',
      selectData: [
        'Vacation',
        'Medical',
        'Parental',
        'Bereavement',
        'Jury Duty',
        'Military',
        'Education',
        'Religious',
        'Other',
      ],
    },
    {
      label: 'Request status',
      value: 'requestStatus',
      inputKind: 'selectInput',
      selectData: ['pending', 'approved', 'rejected'],
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
