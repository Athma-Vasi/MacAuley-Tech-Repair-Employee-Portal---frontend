import { Button, Flex, Select, Text } from '@mantine/core';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type {
  NoteDirectionSelectData,
  NoteHeadingSelectData,
  NotesListMobileProps,
} from './types';
import type { Note } from '../types';

import { COLORS } from '../../../constants';
import { useGlobalState } from '../../../hooks/useGlobalState';
import { formatDate } from '../../../utils';
import { textWrap } from '../constants';
import { useEffect } from 'react';

function NotesListMobile({
  transformedNotes,
  openAddNewNote,
  openEditNote,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListMobileProps) {
  const {
    globalState: { colorScheme, width },
  } = useGlobalState();

  const { sortKey, sortDirection } = notesListState;

  // useEffect(() => {
  //   const transformedNotes = transformNotesForDisplay({
  //     notes,
  //     usernameForEdit,
  //     sortKey,
  //     sortDirection,
  //   });

  //   notesListDispatch({
  //     type: notesListAction.setTransformedNotes,
  //     payload: transformedNotes,
  //   });
  // }, [notes, usernameForEdit, sortKey, sortDirection]);

  const {
    lightTextColor,
    buttonTextColor,
    darkTextColor,
    lightRowBGColor,
    darkRowBGColor,
  } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const usersRowsBGColorDark =
    colorScheme === 'dark' ? lightRowBGColor : darkRowBGColor;
  const notesBorder =
    colorScheme === 'dark'
      ? `2px solid ${lightRowBGColor}`
      : `1px solid ${lightTextColor}`;

  const headingSelectData: NoteHeadingSelectData[] = [
    { value: 'title', label: 'Title' },
    { value: 'text', label: 'Text' },
    { value: 'completed', label: 'Completed' },
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
  ];

  const displayHeadingSelect = (
    <Select
      value={sortKey}
      label="Sort category"
      placeholder="Select a category"
      onChange={(event) => {
        notesListDispatch({
          type: notesListAction.setSortKey,
          payload: event ?? '',
        });
      }}
      data={headingSelectData}
      size="md"
      w="62%"
    />
  );

  const directionSelectData: NoteDirectionSelectData[] = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
    { value: '', label: 'Default' },
  ];

  const displayDirectionSelect = (
    <Select
      value={sortDirection}
      label="Sort direction"
      placeholder="Select a direction"
      onChange={(event) => {
        notesListDispatch({
          type: notesListAction.setSortDirection,
          payload: event ?? '',
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

  const displayNotesList = transformedNotes.map(
    ([userName, [userID, notesArr]]: [string, [string, Note[]]]) => {
      return (
        <Flex
          key={userID}
          direction="column"
          align="center"
          justify="center"
          rowGap="lg"
          w="100%"
          p="md"
          style={{
            border: notesBorder,
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* heading: username and add new note icon */}
          <Flex justify="space-between" align="center" w="100%">
            <Text color={textColor} size="lg">
              {userName}
            </Text>
            <Button variant="outline">
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  cursor: 'pointer',
                }}
                size="lg"
                onClick={() => {
                  openAddNewNote();
                  notesListDispatch({
                    type: notesListAction.setUserIdForEdit,
                    payload: userID,
                  });
                  notesListDispatch({
                    type: notesListAction.setUsernameForEdit,
                    payload: userName,
                  });
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    openAddNewNote();
                  }
                }}
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    openAddNewNote();
                  }
                }}
              />
            </Button>
          </Flex>
          <Flex
            direction="column"
            w="100%"
            justify="center"
            align="center"
            rowGap="lg"
          >
            {notesArr.map((note: Note) => {
              const { _id, title, text, completed, createdAt, updatedAt } =
                note;

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
                    border: notesBorder,
                    borderRadius: '4px',
                  }}
                >
                  {/* title */}
                  <Flex
                    w="100%"
                    h="45px"
                    align="center"
                    justify="flex-start"
                    p="sm"
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
                  >
                    <Text color={textColor} style={textWrap}>
                      Title
                    </Text>
                  </Flex>
                  <Flex w="100%" align="center" justify="flex-end" px="sm">
                    <Text color={textColor} style={textWrap}>
                      {title}
                    </Text>
                  </Flex>

                  {/* text */}
                  <Flex
                    w="100%"
                    h="45px"
                    p="sm"
                    align="center"
                    justify="flex-start"
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
                  >
                    <Text color={textColor} style={textWrap}>
                      Text
                    </Text>
                  </Flex>
                  <Flex w="100%" align="center" justify="flex-end" px="sm">
                    <Text color={textColor} style={textWrap}>
                      {text}
                    </Text>
                  </Flex>

                  {/* completed */}
                  <Flex
                    w="100%"
                    h="45px"
                    p="sm"
                    align="center"
                    justify="flex-start"
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
                  >
                    <Text color={textColor} style={textWrap}>
                      Completed
                    </Text>
                  </Flex>
                  <Flex w="100%" align="center" justify="flex-end" px="sm">
                    <Text color={completed ? 'green' : 'red'} style={textWrap}>
                      {completed ? 'Yes' : 'No'}
                    </Text>
                  </Flex>

                  {/* created */}
                  <Flex
                    w="100%"
                    h="45px"
                    p="sm"
                    align="center"
                    justify="flex-start"
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
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
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
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
                    style={{
                      backgroundColor: usersRowsBGColorDark,
                      borderRadius: '4px',
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        openEditNote();
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === 'Enter') {
                        openEditNote();
                      }
                    }}
                    onClick={() => {
                      notesListDispatch({
                        type: notesListAction.setNoteToEdit,
                        payload: note,
                      });
                    }}
                  >
                    <Text
                      color={textColor}
                      style={textWrap}
                    >{`Edit ${title}`}</Text>
                    <Button
                      type="button"
                      onClick={openEditNote}
                      variant="outline"
                    >
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
            })}
          </Flex>
        </Flex>
      );
    }
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="100%"
      rowGap="lg"
    >
      {displaySelectInputs}
      {displayNotesList}
    </Flex>
  );
}

export { NotesListMobile };
