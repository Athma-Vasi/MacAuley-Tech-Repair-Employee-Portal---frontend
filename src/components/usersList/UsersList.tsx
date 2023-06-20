import {
  Alert,
  Flex,
  Grid,
  Loader,
  Modal,
  Table,
  Title,
  Text,
  HoverCard,
  Tooltip,
} from '@mantine/core';
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
import { GET_ALL_USERS, USERS_HEADINGS, textWrap } from './constants';
import {
  GetAllUsersResponse,
  User,
  UsersListSort,
  UsersListSortKey,
} from './types';
import { authAction } from '../../context/authProvider';
import { EditUser } from '../editUser';
import { formatDate } from '../../utils';
import { Loading } from '../loading';
import { sortUsersByKey } from './utils';
import { UsersListHeader } from './usersListHeader';

function UsersList() {
  const { authState, authDispatch } = useAuth();
  const { accessToken, roles, userId } = authState;

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
  } = usersListState;

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
  }, []);

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

  const displayLoading = <Loading />;

  const displayUsers =
    users.length === 0
      ? null
      : transformedUsers.map((user: User, index: number) => {
          const {
            _id: id,
            username,
            email,
            roles,
            active,
            createdAt,
            updatedAt,
          } = user;

          const createdDateShort = formatDate({
            date: createdAt,
            locale: 'en-US',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'short',
            },
          });

          const createdDateFull = formatDate({
            date: createdAt,
            locale: 'en-US',
            formatOptions: {
              dateStyle: 'full',
              timeStyle: 'full',
            },
          });

          const updatedDateShort = formatDate({
            date: updatedAt,
            locale: 'en-US',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'short',
            },
          });

          const updatedDateFull = formatDate({
            date: updatedAt,
            locale: 'en-US',
            formatOptions: {
              dateStyle: 'full',
              timeStyle: 'full',
            },
          });

          const displayUsername = (
            <Grid.Col span={2}>
              <Flex align="center">
                <HoverCard
                  width={250}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {username}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">{username}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayEmail = (
            <Grid.Col span={2}>
              <Flex align="center">
                <HoverCard
                  width={300}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {email}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">{email}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayRoles = (
            <Grid.Col span={2}>
              <Flex align="center">
                <HoverCard
                  width={250}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {roles}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">{roles.join(', ')}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayActive = (
            <Grid.Col span={1}>
              <Flex align="center">
                <HoverCard
                  width={200}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {active ? (
                        <Text color="green">Yes</Text>
                      ) : (
                        <Text color="red">No</Text>
                      )}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">
                      {active ? (
                        <Text color="dark">{`Yes, ${username} is still active.`}</Text>
                      ) : (
                        <Text color="dark">{`No, ${username} is inactive.`}</Text>
                      )}
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayCreatedDate = (
            <Grid.Col span={2}>
              <Flex align="center">
                <HoverCard
                  width={300}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {createdDateShort}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">{createdDateFull}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayUpdatedDate = (
            <Grid.Col span={2}>
              <Flex align="center">
                <HoverCard
                  width={300}
                  shadow="md"
                  openDelay={382}
                  closeDelay={236}
                >
                  <HoverCard.Target>
                    <Text color="dark" style={textWrap}>
                      {updatedDateShort}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color="dark">{updatedDateFull}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            </Grid.Col>
          );

          const displayEditIcon = (
            <Grid.Col
              span={1}
              style={{ cursor: 'pointer' }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  openUserEdit();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  openUserEdit();
                }
              }}
              onClick={() => {
                usersListDispatch({
                  type: usersListAction.setUserToEdit,
                  payload: { data: user },
                });
              }}
            >
              <Tooltip label={`Edit ${username}`}>
                <FontAwesomeIcon
                  style={{
                    cursor: 'pointer',
                    color: 'dimgray',
                  }}
                  icon={faEdit}
                  onClick={openUserEdit}
                />
              </Tooltip>
            </Grid.Col>
          );

          const rows = (
            <Grid
              columns={12}
              key={id}
              w="100%"
              p="xs"
              style={
                index % 2 === 0
                  ? { backgroundColor: 'white' }
                  : {
                      backgroundColor: '#F5F5F6',
                      borderRadius: '4px',
                    }
              }
            >
              {displayUsername}
              {displayEmail}
              {displayRoles}
              {displayActive}
              {displayCreatedDate}
              {displayUpdatedDate}
              {displayEditIcon}
            </Grid>
          );

          return rows;
        });

  const displayTable = (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      rowGap="md"
    >
      <Grid
        columns={12}
        w="100%"
        style={{
          backgroundColor: '#86B7DF',
          opacity: '0.8',
          borderRadius: '4px',
        }}
      >
        {USERS_HEADINGS.map((heading) => {
          return (
            <UsersListHeader
              key={heading}
              heading={heading}
              usersListState={usersListState}
              usersListAction={usersListAction}
              usersListDispatch={usersListDispatch}
            />
          );
        })}
      </Grid>
      {displayUsers}
    </Flex>
  );

  const displayEditUserModal = (
    <Modal opened={openedUserEdit} onClose={closeUserEdit}>
      <EditUser user={userToEdit} />
    </Modal>
  );

  return (
    <Flex direction="column" align="flex-start" justify="center" rowGap="xl">
      <Title color="dark" order={2}>
        UsersList
      </Title>
      {displayEditUserModal}
      {isLoading ? displayLoading : displayTable}
    </Flex>
  );
}

export { UsersList };
