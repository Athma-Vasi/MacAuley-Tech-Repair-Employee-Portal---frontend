import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Flex, HoverCard, Tooltip, Text } from '@mantine/core';

import { COLORS } from '../../../constants';
import { useGlobalState } from '../../../hooks/useGlobalState';
import { formatDate } from '../../../utils';
import { textWrap, USERS_HEADINGS } from '../constants';
import { User } from '../types';
import { UsersListDesktopProps } from './types';
import { UsersListHeader } from './usersListHeader';

function UsersListDesktop({
  transformedUsers,
  openUserEdit,
  usersListAction,
  usersListDispatch,
  usersListState,
}: UsersListDesktopProps) {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  const { sortKey, sortDirection } = usersListState;

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

  const displayUsersDesktop =
    transformedUsers.length === 0
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

  const displayUsersTable = (
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
      {displayUsersDesktop}
    </Flex>
  );

  return displayUsersTable;
}

export { UsersListDesktop };
