import {
  Flex,
  Grid,
  Modal,
  Title,
  Text,
  HoverCard,
  Tooltip,
  Button,
  Space,
  Select,
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
  SelectDirectionDataProps,
  SelectHeadingDataProps,
  User,
} from './types';
import { authAction } from '../../context/authProvider';
import { EditUser } from '../editUser';
import { formatDate } from '../../utils';
import { Loading } from '../loading';
import { sortUsersByKey } from './utils';
import { UsersListHeader } from './usersListHeader';
import { CustomError } from '../customError';
import { AxiosRequestConfig } from 'axios';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';

function UsersList() {
  const { authState, authDispatch } = useAuth();
  const { accessToken, roles, userId } = authState;

  const {
    globalState: { colorScheme },
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
  // don't need to check for roles here because only manager or admin can access this page
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

    getAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetAllUsers]);

  const {
    lightTextColor,
    darkTextColor,
    darkHeaderBGColor,
    darkIconColor,
    darkRowBGColor,
    lightHeaderBGColor,
    lightIconColor,
    lightRowBGColor,
  } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const usersHeadersBGColor =
    colorScheme === 'dark' ? lightHeaderBGColor : darkHeaderBGColor;
  const usersRowsBGColorDark =
    colorScheme === 'dark' ? lightRowBGColor : darkRowBGColor;
  const iconColor = colorScheme === 'dark' ? lightIconColor : darkIconColor;
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
                    <Text color={textColor} style={textWrap}>
                      {username}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>{username}</Text>
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
                    <Text color={textColor} style={textWrap}>
                      {email}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>{email}</Text>
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
                    <Text color={textColor} style={textWrap}>
                      {roles}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>{roles.join(', ')}</Text>
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
                    <Text color={textColor} style={textWrap}>
                      {active ? (
                        <Text color="green">Yes</Text>
                      ) : (
                        <Text color="red">No</Text>
                      )}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>
                      {active ? (
                        <Text
                          color={textColor}
                        >{`Yes, ${username} is still active.`}</Text>
                      ) : (
                        <Text
                          color={textColor}
                        >{`No, ${username} is inactive.`}</Text>
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
                    <Text color={textColor} style={textWrap}>
                      {createdDateShort}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>{createdDateFull}</Text>
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
                    <Text color={textColor} style={textWrap}>
                      {updatedDateShort}
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text color={textColor}>{updatedDateFull}</Text>
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
              <Tooltip
                label={`Edit ${username}`}
                style={{
                  backgroundColor:
                    colorScheme === 'dark' ? lightRowBGColor : 'white',
                  color: colorScheme === 'dark' ? textColor : 'darkslategray',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                }}
              >
                <FontAwesomeIcon
                  style={{
                    cursor: 'pointer',
                    color: iconColor,
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
              // p="xs"
              style={
                index % 2 === 0
                  ? {
                      borderRadius: '4px',
                    }
                  : {
                      backgroundColor: usersRowsBGColorDark,

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
      align="center"
      justify="center"
      w="100%"
      rowGap="md"
    >
      <Grid
        columns={12}
        w="100%"
        h="45px"
        align="center"
        style={{
          backgroundColor: usersHeadersBGColor,
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
      <EditUser user={userToEdit} closeModalCallback={closeUserEdit} />
    </Modal>
  );

  const selectHeadingData: SelectHeadingDataProps[] = [
    { value: 'username', label: 'Username' },
    { value: 'email', label: 'Email' },
    { value: 'roles', label: 'Roles' },
    { value: 'active', label: 'Active' },
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
  ];

  const displayHeadingSelect = (
    <Select
      value={sortKey}
      label="Display category"
      placeholder="Select a category"
      onChange={(event) => {
        usersListDispatch({
          type: usersListAction.setSortKey,
          payload: { data: event ?? '' },
        });
      }}
      data={selectHeadingData}
    />
  );

  const selectDirectionData: SelectDirectionDataProps[] = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  const displayDirectionSelect = (
    <Select
      value={sortDirection}
      label="Sort by"
      placeholder="Select a direction"
      onChange={(event) => {
        usersListDispatch({
          type: usersListAction.setSortDirection,
          payload: { data: event ?? '' },
        });
      }}
      data={selectDirectionData}
    />
  );

  useEffect(() => {
    console.log({ sortDirection, sortKey });
  }, [sortDirection, sortKey]);

  const displayTransformedUsersMobile = transformedUsers.map((user: User) => {
    const { _id, username, email, roles, active, createdAt, updatedAt, __v } =
      user;

    const createdDate = formatDate({
      date: createdAt,
      locale: 'en-US',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'long',
      },
    });

    const updatedDate = formatDate({
      date: updatedAt,
      locale: 'en-US',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'long',
      },
    });

    return (
      <Flex
        key={_id}
        direction="column"
        align="center"
        justify="center"
        w="100%"
        rowGap="md"
        style={{ outline: '1px solid teal' }}
      >
        {/* username */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Username
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={textColor} style={textWrap}>
            {username}
          </Text>
        </Flex>

        {/* email */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Email
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={textColor} style={textWrap}>
            {email}
          </Text>
        </Flex>

        {/* roles */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Roles
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={textColor} style={textWrap}>
            {roles.join(', ')}
          </Text>
        </Flex>

        {/* active */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Active
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={active ? 'green' : 'red'} style={textWrap}>
            {active ? 'Yes' : 'No'}
          </Text>
        </Flex>

        {/* created */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Created
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={textColor} style={textWrap}>
            {createdDate}
          </Text>
        </Flex>

        {/* updated */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
        >
          <Text color={textColor} style={textWrap}>
            Updated
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end">
          <Text color={textColor} style={textWrap}>
            {updatedDate}
          </Text>
        </Flex>

        {/* edit */}
        <Flex
          w="100%"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark }}
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
          <FontAwesomeIcon
            style={{
              cursor: 'pointer',
              color: iconColor,
            }}
            icon={faEdit}
            onClick={openUserEdit}
          />
        </Flex>
      </Flex>
    );
  });

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="xl"
      w="100%"
    >
      <Flex w="100%" align="center" justify="space-between">
        <Title color={textColor} order={2}>
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
      <Space h="lg" />
      {displayHeadingSelect}
      {displayDirectionSelect}
      <Space h="lg" />
      {displayTransformedUsersMobile}
      {displayEditUserModal}
      {errorMessage ? displayError : isLoading ? displayLoading : displayTable}
    </Flex>
  );
}

export { UsersList };
