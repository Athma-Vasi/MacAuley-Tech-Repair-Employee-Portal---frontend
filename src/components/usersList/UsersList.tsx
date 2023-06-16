import { Flex, Modal, Table, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import { axiosInstance } from '../../api/axios';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDisclosure } from '@mantine/hooks';
import { Register } from '../register';
import { EditUser } from '../editUser';

function UsersList() {
  const { authState, authDispatch } = useAuth();
  const { accessToken } = authState;

  const [usersList, usersListDispatch] = useReducer(
    usersListReducer,
    initialUsersListState
  );

  const [opened, { open, close }] = useDisclosure(false);

  const { errorMessage, isLoading, users, userToEdit } = usersList;

  // grab users from database and dispatch to reducer to update state
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
      }
    }

    getAllUsers();
  }, [accessToken, authDispatch]);

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

          const createdDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(createdAt));

          const updatedDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(updatedAt));

          const rows = (
            <tr key={id}>
              <td>{username}</td>
              <td>{email}</td>
              <td>{roles}</td>
              <td>{active ? 'Yes' : 'No'}</td>
              <td>{createdDate}</td>
              <td>{updatedDate}</td>
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

  const displayModal = (
    <Modal opened={opened} onClose={close}>
      <EditUser user={userToEdit} />
    </Modal>
  );

  return (
    <Flex direction="column" align="center" justify="center">
      <Title>UsersList</Title>
      {displayModal}
      {displayTable}
    </Flex>
  );
}

export { UsersList };
