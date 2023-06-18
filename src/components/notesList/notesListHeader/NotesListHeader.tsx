import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Text } from '@mantine/core';

import { NotesListHeaderProps } from './types';

function NotesListHeader({
  heading,
  currentUsername,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListHeaderProps) {
  const { usernameForEdit, sortDirection, sortKey } = notesListState;

  function handleHeadingSortClick(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    notesListDispatch({
      type: notesListAction.setSortKey,
      payload: heading,
    });

    notesListDispatch({
      type: notesListAction.setSortDirection,
      payload:
        sortDirection === '' ? 'asc' : sortDirection === 'asc' ? 'desc' : '',
    });
  }

  if (currentUsername === usernameForEdit && sortKey === heading) {
    return (
      <th>
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
                  ? 'darkgrey'
                  : sortDirection === 'asc'
                  ? 'green'
                  : 'red'
              }`,
            }}
            onClick={handleHeadingSortClick}
          />
          <Text>{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
        </Flex>
      </th>
    );
  } else if (heading === 'edit') {
    return (
      <th>
        <Flex justify="start" gap="xs">
          <Text>Edit</Text>
        </Flex>
      </th>
    );
  }

  return (
    <th>
      <Flex justify="start" gap="xs">
        <FontAwesomeIcon
          icon={faSort}
          style={{
            cursor: 'pointer',
            color: 'darkgray',
          }}
          onClick={handleHeadingSortClick}
        />
        <Text>{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
      </Flex>
    </th>
  );
}

export { NotesListHeader };
