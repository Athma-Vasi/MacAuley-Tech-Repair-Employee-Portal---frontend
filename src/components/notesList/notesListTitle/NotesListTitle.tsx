import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

import { NotesListTitleProps } from './types';

function NotesListTitle({
  currentUsername,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListTitleProps) {
  const { usernameForEdit, sortDirection } = notesListState;

  function handleTitleHeadingSortClick(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    notesListDispatch({
      type: notesListAction.setSortKey,
      payload: 'title',
    });

    notesListDispatch({
      type: notesListAction.setSortDirection,
      payload:
        sortDirection === '' ? 'asc' : sortDirection === 'asc' ? 'desc' : '',
    });
  }

  function renderTitleHeading({
    currentUsername,
    usernameForEdit,
    sortDirection,
  }: {
    currentUsername: string;
    usernameForEdit: string;
    sortDirection: string;
  }) {
    if (currentUsername === usernameForEdit) {
      return (
        <th>
          <span>
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
              onClick={handleTitleHeadingSortClick}
            />
            <Text>Title</Text>
          </span>
        </th>
      );
    }
    return (
      <th>
        <span>
          <FontAwesomeIcon
            icon={faSort}
            style={{
              cursor: 'pointer',
              color: 'darkgray',
            }}
            onClick={handleTitleHeadingSortClick}
          />
          <Text>Title</Text>
        </span>
      </th>
    );
  }
  return renderTitleHeading({
    currentUsername,
    usernameForEdit,
    sortDirection,
  });
}

export { NotesListTitle };
