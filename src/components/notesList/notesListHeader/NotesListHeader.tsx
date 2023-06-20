import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Grid, HoverCard, Text } from '@mantine/core';

import { NotesListHeaderProps } from './types';
import { textWrap } from '../constants';

function NotesListHeader({
  heading,
  currentUsername,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListHeaderProps) {
  const { usernameForEdit, sortDirection, sortKey } = notesListState;

  function handleHeadingSortClick(
    _event: React.MouseEvent<SVGSVGElement, MouseEvent>
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
      <Grid.Col
        span={heading === 'completed' ? 1 : 2}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            notesListDispatch({
              type: notesListAction.setUsernameForEdit,
              payload: currentUsername,
            });
          }
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            notesListDispatch({
              type: notesListAction.setUsernameForEdit,
              payload: currentUsername,
            });
          }
        }}
        onClick={() => {
          notesListDispatch({
            type: notesListAction.setUsernameForEdit,
            payload: currentUsername,
          });
        }}
      >
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
          <HoverCard width={150} shadow="md" openDelay={382} closeDelay={236}>
            <HoverCard.Target>
              <Text
                color="dark"
                style={textWrap}
              >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text color="dark">{`Note ${heading}`}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Flex>
      </Grid.Col>
    );
  } else if (heading === 'edit') {
    return (
      <Grid.Col
        span={1}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            notesListDispatch({
              type: notesListAction.setUsernameForEdit,
              payload: currentUsername,
            });
          }
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            notesListDispatch({
              type: notesListAction.setUsernameForEdit,
              payload: currentUsername,
            });
          }
        }}
        onClick={() => {
          notesListDispatch({
            type: notesListAction.setUsernameForEdit,
            payload: currentUsername,
          });
        }}
      >
        <Flex justify="start" gap="xs">
          {/* <Text color="dark" style={textWrap}>
            Edit
          </Text> */}
          <HoverCard width={100} shadow="md" openDelay={382} closeDelay={236}>
            <HoverCard.Target>
              <Text color="dark" style={textWrap}>
                Edit
              </Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text color="dark">Edit note</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Flex>
      </Grid.Col>
    );
  }

  // default heading return that sets icon to ↕️ with darkgray color
  return (
    <Grid.Col
      span={heading === 'completed' ? 1 : 2}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          notesListDispatch({
            type: notesListAction.setUsernameForEdit,
            payload: currentUsername,
          });
        }
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          notesListDispatch({
            type: notesListAction.setUsernameForEdit,
            payload: currentUsername,
          });
        }
      }}
      onClick={() => {
        notesListDispatch({
          type: notesListAction.setUsernameForEdit,
          payload: currentUsername,
        });
      }}
    >
      <Flex justify="start" gap="xs">
        <FontAwesomeIcon
          icon={faSort}
          style={{
            cursor: 'pointer',
            color: 'darkgray',
          }}
          onClick={handleHeadingSortClick}
        />

        <HoverCard width={150} shadow="md" openDelay={382} closeDelay={236}>
          <HoverCard.Target>
            <Text
              color="dark"
              style={textWrap}
            >{`${heading[0].toUpperCase()}${heading.slice(1)}`}</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text color="dark">{`Note ${heading}`}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Flex>
    </Grid.Col>
  );
}

export { NotesListHeader };
