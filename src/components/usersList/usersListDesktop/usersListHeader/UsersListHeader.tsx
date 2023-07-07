import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Grid, HoverCard, Text } from '@mantine/core';

import { COLORS } from '../../../../constants/data';
import { useGlobalState } from '../../../../hooks/useGlobalState';
import { textWrap } from '../../constants';
import { UsersListHeaderProps } from './types';

function UsersListHeader({
  heading,
  usersListState,
  usersListAction,
  usersListDispatch,
}: UsersListHeaderProps) {
  const { sortKey, sortDirection } = usersListState;
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  function handleHeadingSortClick(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    usersListDispatch({
      type: usersListAction.setSortKey,
      payload: { data: heading },
    });

    usersListDispatch({
      type: usersListAction.setSortDirection,
      payload: {
        data:
          sortDirection === '' ? 'asc' : sortDirection === 'asc' ? 'desc' : '',
      },
    });
  }

  const { lightIconColor, darkTextColor, lightTextColor } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;

  if (sortKey === heading) {
    return (
      <Grid.Col span={heading === 'active' ? 1 : 2}>
        <Flex justify="start" gap="xs">
          <FontAwesomeIcon
            icon={
              sortDirection === ''
                ? faSort
                : sortDirection === 'asc'
                ? faSortAsc
                : faSortDesc
            }
            style={{
              cursor: 'pointer',
              color: `${
                sortDirection === ''
                  ? lightIconColor
                  : sortDirection === 'asc'
                  ? 'green'
                  : 'red'
              }`,
            }}
            onClick={handleHeadingSortClick}
          />

          <HoverCard width={150} shadow="md" openDelay={382} closeDelay={236}>
            <HoverCard.Target>
              <Text
                color={textColor}
                style={textWrap}
              >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text color={textColor}>
                {heading === 'active'
                  ? "User's active state"
                  : heading === 'created' || heading === 'updated'
                  ? `User ${heading} date`
                  : `User's ${heading}`}
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Flex>
      </Grid.Col>
    );
  } else if (heading === 'edit') {
    return (
      <Grid.Col span={1}>
        <Flex justify="start" gap="xs">
          <HoverCard width={150} shadow="md" openDelay={382} closeDelay={236}>
            <HoverCard.Target>
              <Text color={textColor} style={textWrap}>
                Edit
              </Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text color={textColor}>Edit user details</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Flex>
      </Grid.Col>
    );
  }

  return (
    <Grid.Col span={heading === 'active' ? 1 : 2}>
      <Flex justify="start" gap="xs">
        <FontAwesomeIcon
          icon={faSort}
          style={{
            cursor: 'pointer',
            color: lightIconColor,
          }}
          onClick={handleHeadingSortClick}
        />

        <HoverCard width={150} shadow="md" openDelay={382} closeDelay={236}>
          <HoverCard.Target>
            <Text
              color={textColor}
              style={textWrap}
            >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text color={textColor}>
              {heading === 'active'
                ? "User's active state"
                : heading === 'created' || heading === 'updated'
                ? `User ${heading} date`
                : `User's ${heading}`}
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Flex>
    </Grid.Col>
  );
}

export { UsersListHeader };
