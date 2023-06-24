import { Flex, Modal, Title, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useReducer } from 'react';

import type { AxiosRequestConfig } from 'axios';
import type { GetAllUsersResponse } from './types';

import {
  initialUsersListState,
  usersListAction,
  usersListReducer,
} from './state';
import { axiosInstance } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { GET_ALL_USERS } from './constants';
import { authAction } from '../../context/authProvider';
import { EditUser } from '../editUser';
import { Loading } from '../loading';
import { sortUsersByKey } from './utils';
import { CustomError } from '../customError';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';
import { UsersListMobile } from './usersListMobile';
import { UsersListDesktop } from './usersListDesktop';

function UsersList() {
  const { authState, authDispatch } = useAuth();
  const { accessToken, roles } = authState;

  const {
    globalState: { colorScheme, width },
  } = useGlobalState();

  const [usersListState, usersListDispatch] = useReducer(
    usersListReducer,
    initialUsersListState
  );

  const [openedUserEdit, { open: openUserEdit, close: closeUserEdit }] =
    useDisclosure(false);

  const {
    errorMessage,
    isLoading,
    users,
    userToEdit,
    sortDirection,
    sortKey,
    transformedUsers,
    triggerGetAllUsers,
  } = usersListState;

  // set loading to true upon initial render
  useEffect(() => {
    usersListDispatch({
      type: usersListAction.setIsLoading,
      payload: { data: true },
    });
  }, []);

  // grab users from database and dispatch to reducer to update state and trigger on refresh button click
  useEffect(() => {
    // get all users from database upon initial render
    async function getAllUsers() {
      const controller = new AbortController();
      const { signal } = controller;

      const axiosRequestConfig: AxiosRequestConfig = {
        method: 'get',
        signal,
        url: GET_ALL_USERS,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };

      // send accessToken with request
      try {
        const response = await axiosInstance<GetAllUsersResponse>(
          axiosRequestConfig
        );
        const {
          status,
          data: { users },
        } = response;

        if (status === 200) {
          usersListDispatch({
            type: usersListAction.setAllUsers,
            payload: { data: users },
          });

          // set loading to false
          usersListDispatch({
            type: usersListAction.setIsLoading,
            payload: { data: false },
          });
        }
      } catch (error: any) {
        // if there is no response object, it means the server is down
        if (!error?.response) {
          usersListDispatch({
            type: usersListAction.setErrorMessage,
            payload: { data: 'Network Error' },
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: 'Network Error',
          });
        }
        // if there is a response object, it means the server is up
        else if (error.response) {
          const {
            response: {
              data: { message },
            },
          } = error;

          usersListDispatch({
            type: usersListAction.setErrorMessage,
            payload: { data: message },
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: message,
          });
        }
        // catch all other errors
        else {
          usersListDispatch({
            type: usersListAction.setErrorMessage,
            payload: { data: 'An unknown error occurred. Please try again.' },
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: 'An unknown error occurred. Please try again.',
          });
        }
      } finally {
        // set loading to false
        usersListDispatch({
          type: usersListAction.setIsLoading,
          payload: { data: false },
        });

        // cleanup function to cancel axios request
        controller.abort();
      }
    }

    // only managers/admins can view this page anyway
    // but...because I'm a little stitious
    if (roles.includes('Admin') || roles.includes('Manager')) {
      getAllUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetAllUsers]);

  const { lightTextColor, darkTextColor, buttonTextColor } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const buttonVariant = colorScheme === 'dark' ? 'outline' : 'filled';

  useEffect(() => {
    const sortedUsers = sortUsersByKey({
      users,
      sortKey,
      sortDirection,
    });

    usersListDispatch({
      type: usersListAction.setTransformedUsers,
      payload: { data: sortedUsers },
    });
  }, [users, sortKey, sortDirection]);

  const displayLoading = <Loading dataDirection="load" />;

  const displayError = (
    <CustomError
      isError={errorMessage ? true : false}
      message={errorMessage}
      link={{ text: 'Go to Home', address: '/' }}
    />
  );

  const displayEditUserModal = (
    <Modal opened={openedUserEdit} onClose={closeUserEdit} w={375}>
      <EditUser user={userToEdit} closeModalCallback={closeUserEdit} />
    </Modal>
  );

  const displayTransformedUsersMobile = (
    <UsersListMobile
      transformedUsers={transformedUsers}
      openUserEdit={openUserEdit}
      usersListDispatch={usersListDispatch}
      usersListAction={usersListAction}
      usersListState={usersListState}
    />
  );

  const displayTransformedUsersDesktop = (
    <UsersListDesktop
      transformedUsers={transformedUsers}
      openUserEdit={openUserEdit}
      usersListDispatch={usersListDispatch}
      usersListAction={usersListAction}
      usersListState={usersListState}
    />
  );

  const displayUsersList =
    width <= 1024
      ? displayTransformedUsersMobile
      : displayTransformedUsersDesktop;

  const displayHeading = (
    <Flex w="100%" align="center" justify="space-between">
      <Title color={buttonTextColor} order={2}>
        Users list
      </Title>

      <Button
        type="button"
        onClick={() =>
          usersListDispatch({
            type: usersListAction.setTriggerGetAllUsers,
            payload: { data: !triggerGetAllUsers },
          })
        }
        variant={buttonVariant}
      >
        Refresh
      </Button>
    </Flex>
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="xl"
      w="100%"
    >
      {displayHeading}
      {displayEditUserModal}
      {errorMessage
        ? displayError
        : isLoading
        ? displayLoading
        : displayUsersList}
    </Flex>
  );
}

export { UsersList };
