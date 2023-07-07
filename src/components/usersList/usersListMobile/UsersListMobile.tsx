import {
  faChevronDown,
  faChevronRight,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Select, Text } from '@mantine/core';
import { Fragment, useEffect, useReducer, useState } from 'react';

import { COLORS } from '../../../constants/data';
import { useGlobalState } from '../../../hooks/useGlobalState';
import type { User } from '../../../types';
import { formatDate } from '../../../utils';
import { textWrap } from '../constants';
import {
  initialUsersListMobileState,
  usersListMobileAction,
  usersListMobileReducer,
} from './state';
import type {
  UserDirectionSelectData,
  UserHeadingSelectData,
  UsersListMobileProps,
} from './types';

function UsersListMobile({
  transformedUsers,
  openUserEdit,
  usersListAction,
  usersListDispatch,
  usersListState,
}: UsersListMobileProps) {
  const {
    globalState: { colorScheme, width, scrollYDirection },
  } = useGlobalState();

  const [usersListMobileState, usersListMobileDispatch] = useReducer(
    usersListMobileReducer,
    initialUsersListMobileState
  );

  // dynamically create collapse toggle state for each user
  useEffect(() => {
    transformedUsers.forEach((user: User) => {
      usersListMobileDispatch({
        type: usersListMobileAction.setCollapseToggle,
        payload: {
          id: user._id,
          data: usersListMobileState[user._id]
            ? true
            : !usersListMobileState[user._id],
        },
      });
    });
  }, [transformedUsers]);

  const { sortKey, sortDirection } = usersListState;

  const {
    lightTextColor,
    buttonTextColor,
    darkTextColor,
    lightRowBGColor,
    darkRowBGColor,
    lightHeaderBGColor,
  } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const usersRowsBGColorDark =
    colorScheme === 'dark' ? lightRowBGColor : darkRowBGColor;
  const usersBorder =
    colorScheme === 'dark'
      ? `2px solid ${lightRowBGColor}`
      : `1px solid ${lightTextColor}`;

  const headingSelectData: UserHeadingSelectData[] = [
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
      label="Sort category"
      placeholder="Select a category"
      onChange={(event) => {
        usersListDispatch({
          type: usersListAction.setSortKey,
          payload: { data: event ?? '' },
        });
      }}
      data={headingSelectData}
      size="sm"
      w="62%"
    />
  );

  const directionSelectData: UserDirectionSelectData[] = [
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
      data={directionSelectData}
      size="sm"
      w="62%"
    />
  );

  const selectInputsPosition: React.CSSProperties =
    scrollYDirection === 'up' && window.scrollY > 50
      ? {
          position: 'sticky',
          top: '50px',
          zIndex: 1,
          backgroundColor: colorScheme === 'dark' ? '#1a1b1e' : '#ffffff',
        }
      : {
          position: 'relative',
        };

  const displaySelectInputs =
    width < 768 ? (
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        rowGap="md"
        w="100%"
        p="sm"
        style={selectInputsPosition}
      >
        {displayHeadingSelect}
        {displayDirectionSelect}
      </Flex>
    ) : (
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        columnGap="lg"
        p="sm"
        w="100%"
        h="100px"
        style={selectInputsPosition}
      >
        {displayHeadingSelect}
        {displayDirectionSelect}
      </Flex>
    );

  const displayUsersList = transformedUsers.map((user) => {
    const {
      _id: userID,
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

    const displayEdit = (
      <Fragment key={JSON.stringify(user)}>
        <Flex
          w="100%"
          h="50px"
          p="sm"
          align="center"
          justify="space-between"
          style={{ borderRadius: '4px' }}
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
          <Flex align="center" justify="flex-start" columnGap="lg" w="62%">
            <Button
              type="button"
              w="50px"
              variant="outline"
              onClick={() => {
                usersListMobileDispatch({
                  type: usersListMobileAction.setCollapseToggle,
                  payload: {
                    id: userID,
                    data: !usersListMobileState[userID],
                  },
                });
              }}
            >
              <FontAwesomeIcon
                icon={
                  usersListMobileState[userID] === true
                    ? faChevronRight
                    : faChevronDown
                }
              />
            </Button>
            <Text color={textColor} style={textWrap}>
              {username}
            </Text>
          </Flex>
          <Button type="button" onClick={openUserEdit} variant="outline">
            <FontAwesomeIcon
              style={{
                cursor: 'pointer',
                color: buttonTextColor,
              }}
              icon={faEdit}
            />
          </Button>
        </Flex>
      </Fragment>
    );

    const displayUsername = (
      <Fragment key={`${userID}${username}`}>
        <Flex
          w="100%"
          h="45px"
          align="center"
          justify="flex-start"
          p="sm"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Username
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={textColor} style={textWrap}>
            {username}
          </Text>
        </Flex>
      </Fragment>
    );

    const displayEmail = (
      <Fragment key={`${userID}${email}`}>
        <Flex
          w="100%"
          h="45px"
          p="sm"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Email
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={textColor} style={textWrap}>
            {email}
          </Text>
        </Flex>
      </Fragment>
    );

    const displayRoles = (
      <Fragment key={`${userID}${roles.join(',')}`}>
        <Flex
          w="100%"
          h="45px"
          p="sm"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Roles
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={textColor} style={textWrap}>
            {roles.join(', ')}
          </Text>
        </Flex>
      </Fragment>
    );

    const displayActive = (
      <Fragment key={`${userID}${active}`}>
        <Flex
          w="100%"
          h="45px"
          p="sm"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Active
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={active ? 'green' : 'red'} style={textWrap}>
            {active ? 'Yes' : 'No'}
          </Text>
        </Flex>
      </Fragment>
    );

    const displayCreated = (
      <Fragment key={`${userID}${createdAt}`}>
        <Flex
          w="100%"
          h="45px"
          p="sm"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Created
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={textColor} style={textWrap}>
            {createdDate}
          </Text>
        </Flex>
      </Fragment>
    );

    const displayUpdated = (
      <Fragment key={`${userID}${updatedAt}${userID}`}>
        <Flex
          w="100%"
          h="45px"
          p="sm"
          align="center"
          justify="flex-start"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
        >
          <Text color={textColor} style={textWrap}>
            Updated
          </Text>
        </Flex>
        <Flex w="100%" align="center" justify="flex-end" px="sm">
          <Text color={textColor} style={textWrap}>
            {updatedDate}
          </Text>
        </Flex>
      </Fragment>
    );

    return (
      <Flex
        key={userID}
        direction="column"
        align="center"
        justify="center"
        w="100%"
        rowGap="md"
        p="sm"
        style={{
          border: usersListMobileState[userID] === true ? '' : usersBorder,
          backgroundColor:
            usersListMobileState[userID] === true ? usersRowsBGColorDark : '',
          borderRadius: '4px',
        }}
      >
        {displayEdit}
        {/* if userId for corresponding user in usersListMobileState's collapse state is false, display user */}
        {usersListMobileState[userID] === false && [
          displayUsername,
          displayEmail,
          displayRoles,
          displayActive,
          displayCreated,
          displayUpdated,
        ]}
      </Flex>
    );
  });

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      rowGap="xl"
    >
      {displaySelectInputs}
      {displayUsersList}
    </Flex>
  );
}

export { UsersListMobile };
