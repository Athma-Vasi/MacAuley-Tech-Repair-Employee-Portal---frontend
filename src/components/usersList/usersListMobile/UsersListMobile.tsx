import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Button, Text, Select } from '@mantine/core';
import { formatDate } from '../../../utils';
import { textWrap } from '../constants';
import {
  UserDirectionSelectData,
  UserHeadingSelectData,
  UsersListMobileProps,
} from './types';
import { COLORS } from '../../../constants';
import { useGlobalState } from '../../../hooks/useGlobalState';

function UsersListMobile({
  transformedUsers,
  openUserEdit,
  usersListAction,
  usersListDispatch,
  usersListState,
}: UsersListMobileProps) {
  const {
    globalState: { colorScheme, width },
  } = useGlobalState();

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
      size="md"
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
      size="md"
      w="62%"
    />
  );

  const displaySelectInputs =
    width < 768 ? (
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        rowGap="md"
        w="100%"
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
        w="100%"
      >
        {displayHeadingSelect}
        {displayDirectionSelect}
      </Flex>
    );

  const displayUsersList = transformedUsers.map((user) => {
    const { _id, username, email, roles, active, createdAt, updatedAt } = user;

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
        p="sm"
        style={{
          border: `1px solid ${lightHeaderBGColor}`,
          borderRadius: '4px',
        }}
      >
        {/* username */}
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

        {/* email */}
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

        {/* roles */}
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

        {/* active */}
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

        {/* created */}
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

        {/* updated */}
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

        {/* edit */}
        <Flex
          w="100%"
          h="50px"
          p="sm"
          align="center"
          justify="space-between"
          style={{ backgroundColor: usersRowsBGColorDark, borderRadius: '4px' }}
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
          <Text color={textColor} style={textWrap}>{`Edit ${username}`}</Text>
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
