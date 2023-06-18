import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Text } from '@mantine/core';

import { NotesListTextProps } from './types';

function NotesListText({
  currentUsername,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListTextProps) {
  const { usernameForEdit, sortDirection, sortKey } = notesListState;

  function handleTextHeadingSortClick(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    notesListDispatch({
      type: notesListAction.setSortKey,
      payload: 'text',
    });

    notesListDispatch({
      type: notesListAction.setSortDirection,
      payload:
        sortDirection === '' ? 'asc' : sortDirection === 'asc' ? 'desc' : '',
    });
  }

  function renderTextHeading({
    currentUsername,
    usernameForEdit,
    sortDirection,
  }: {
    currentUsername: string;
    usernameForEdit: string;
    sortDirection: string;
  }) {
    if (currentUsername === usernameForEdit && sortKey === 'text') {
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
              onClick={handleTextHeadingSortClick}
            />
            <Text>Text</Text>
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
            onClick={handleTextHeadingSortClick}
          />
          <Text>Text</Text>
        </Flex>
      </th>
    );
  }

  return renderTextHeading({
    currentUsername,
    usernameForEdit,
    sortDirection,
  });
}

export { NotesListText };
