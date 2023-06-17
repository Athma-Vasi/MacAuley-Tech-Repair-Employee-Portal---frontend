import { Alert, Flex, Loader, Modal, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useReducer } from 'react';
import { axiosInstance } from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import {
  initialUsersListState,
  usersListAction,
  usersListReducer,
} from './state';
import { useAuth } from '../../hooks/useAuth';
import { GET_ALL_USERS } from './constants';
import { GetAllUsersResponse } from './types';
import { authAction } from '../../context/authProvider';
import { EditUser } from '../editUser';
import { formatDate } from '../../utils';
import { Loading } from '../loading';

function UsersList() {
  const { authState, authDispatch } = useAuth();
  const { accessToken, roles, userId } = authState;

  const [usersList, usersListDispatch] = useReducer(
    usersListReducer,
    initialUsersListState
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { errorMessage, isLoading, users, userToEdit } = usersList;

  // set loading to true upon initial render
  useEffect(() => {
    usersListDispatch({
      type: usersListAction.setIsLoading,
      payload: { data: true },
    });
  }, []);

  // grab users from database and dispatch to reducer to update state
  // don't need to check for roles here because only manager or admin can access this page
  useEffect(() => {
    async function getAllUsers() {
      const axiosRequestConfig = {
        method: 'get',
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

        console.log({ status, users });

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
      }
    }

    getAllUsers();
  }, [accessToken, authDispatch]);

  const displayLoading = <Loading />;

  const displayUsers =
    usersList.users.length === 0
      ? null
      : usersList.users.map((user) => {
          const {
            _id: id,
            username,
            email,
            roles,
            active,
            createdAt,
            updatedAt,
          } = user;

          const createdDate = formatDate({
            date: createdAt,
            locale: 'en-US',
          });

          const updatedDate = formatDate({
            date: updatedAt,
            locale: 'en-US',
          });

          const displayEditIcon = (
            <td
              style={{ cursor: 'pointer' }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  open();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  open();
                }
              }}
              onClick={() => {
                usersListDispatch({
                  type: usersListAction.setUserToEdit,
                  payload: { data: user },
                });
              }}
            >
              <FontAwesomeIcon icon={faEdit} onClick={open} />
            </td>
          );

          const rows = (
            <tr key={id}>
              <td>{username}</td>
              <td>{email}</td>
              <td>{roles}</td>
              <td>{active ? 'Yes' : 'No'}</td>
              <td>{createdDate}</td>
              <td>{updatedDate}</td>
              {displayEditIcon}
            </tr>
          );

          return rows;
        });

  const displayTable = (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Active</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>{displayUsers}</tbody>
    </Table>
  );

  const displayEditUserModal = (
    <Modal opened={opened} onClose={close}>
      <EditUser user={userToEdit} />
    </Modal>
  );

  return (
    <Flex direction="column" align="center" justify="center">
      <Title>UsersList</Title>
      {displayEditUserModal}
      {isLoading ? displayLoading : displayTable}
    </Flex>
  );
}

export { UsersList };
