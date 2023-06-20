import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Grid, Text } from '@mantine/core';
import { UsersListHeaderProps } from './types';
import { textWrap } from '../constants';

function UsersListHeader({
  heading,
  usersListState,
  usersListAction,
  usersListDispatch,
}: UsersListHeaderProps) {
  const { sortKey, sortDirection } = usersListState;

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
                  ? '#989C9F'
                  : sortDirection === 'asc'
                  ? 'green'
                  : 'red'
              }`,
            }}
            onClick={handleHeadingSortClick}
          />
          <Text
            style={textWrap}
            color="dark"
          >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
        </Flex>
      </Grid.Col>
    );
  } else if (heading === 'edit') {
    return (
      <Grid.Col span={1}>
        <Flex justify="start" gap="xs">
          <Text style={textWrap} color="dark">
            Edit
          </Text>
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
            color: '#989C9F',
          }}
          onClick={handleHeadingSortClick}
        />
        <Text
          style={textWrap}
          color="dark"
        >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
      </Flex>
    </Grid.Col>
  );
}

export { UsersListHeader };
