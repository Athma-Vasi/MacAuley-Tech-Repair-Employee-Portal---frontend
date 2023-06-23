import { Button, Flex, Select, Text } from '@mantine/core';
import {
  faChevronDown,
  faChevronRight,
  faEdit,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type {
  NoteDirectionSelectData,
  NoteHeadingSelectData,
  NotesListMobileProps,
} from './types';
import type { Note } from '../../../types';

import { COLORS } from '../../../constants';
import { useGlobalState } from '../../../hooks/useGlobalState';
import { formatDate } from '../../../utils';
import { textWrap } from '../constants';
import { useEffect, useReducer, useRef, useState } from 'react';
import {
  initialNotesListMobileState,
  notesListMobileAction,
  notesListMobileReducer,
} from './state';

function NotesListMobile({
  transformedNotes,
  openAddNewNote,
  openEditNote,
  notesListState,
  notesListAction,
  notesListDispatch,
}: NotesListMobileProps) {
  const {
    globalState: { colorScheme, width, scrollYDirection },
  } = useGlobalState();

  const [notesListMobileState, notesListMobileDispatch] = useReducer(
    notesListMobileReducer,
    initialNotesListMobileState
  );

  useEffect(() => {
    console.log({ scrollYDirection });
  }, [scrollYDirection]);

  const { sortKey, sortDirection } = notesListState;

  // dynamically create collapse toggle state for each user and their respective notes
  useEffect(() => {
    transformedNotes.forEach(
      ([_username, [userId, notes]]: [string, [string, Note[]]]) => {
        // set collapse toggle state for each user and note id, if it exists set to opposite and if not set to false
        notesListMobileDispatch({
          type: notesListMobileAction.setCollapseToggle,
          payload: {
            id: userId,
            data: notesListMobileState[userId]
              ? true
              : !notesListMobileState[userId],
          },
        });

        notes.forEach((note: Note) => {
          notesListMobileDispatch({
            type: notesListMobileAction.setCollapseToggle,
            payload: {
              id: note._id,
              data: notesListMobileState[userId]
                ? true
                : !notesListMobileState[userId],
            },
          });
        });
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transformedNotes]);

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

  const selectInputsPosition: React.CSSProperties =
    scrollYDirection === 'down'
      ? {
          position: 'sticky',
          top: '50px',
          zIndex: 1,
          backgroundColor:
            colorScheme === 'dark'
              ? 'hsla(0, 0%, 0%, 0.5)'
              : 'hsla(0, 0%, 100%, 0.9)',
        }
      : { position: 'relative' };

  const displaySelectInputs =
    width < 768 ? (
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        rowGap="md"
        p="sm"
        w="100%"
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

  const displayNotesList = transformedNotes.map(
    ([userName, [userID, notesArr]]: [string, [string, Note[]]]) => {
      return (
        <Flex
          key={userID}
          direction="column"
          align="center"
          justify="center"
          rowGap="sm"
          w="100%"
          p="md"
          style={{
            border: notesBorder,
            borderRadius: '4px',
            // boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* heading: username and add new note icon */}
          <Flex justify="space-between" align="center" w="100%">
            <Flex align="center" justify="center" columnGap="lg">
              <Button
                type="button"
                w="50px"
                variant="outline"
                onClick={() => {
                  notesListMobileDispatch({
                    type: notesListMobileAction.setCollapseToggle,
                    payload: {
                      id: userID,
                      data: !notesListMobileState[userID],
                    },
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={
                    notesListMobileState[userID] === true
                      ? faChevronRight
                      : faChevronDown
                  }
                />
              </Button>
              <Text color={textColor} size="lg">
                {userName}
              </Text>
            </Flex>
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

          {/* below are all the notes for each user */}
          <Flex
            direction="column"
            w="100%"
            justify="center"
            align="center"
            rowGap="lg"
          >
            {notesListMobileState[userID] === false &&
              notesArr.map((note: Note) => {
                const {
                  _id: noteID,
                  title,
                  text,
                  completed,
                  createdAt,
                  updatedAt,
                } = note;

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
                  <>
                    <Flex
                      key={`${userName}${noteID}`}
                      w="100%"
                      h="50px"
                      p="sm"
                      align="center"
                      justify="space-between"
                      style={{
                        // backgroundColor: usersRowsBGColorDark,
                        borderRadius: '4px',
                      }}
                    >
                      <Flex
                        align="center"
                        justify="flex-start"
                        columnGap="lg"
                        w="62%"
                      >
                        <Button
                          type="button"
                          w="50px"
                          variant="outline"
                          onClick={() => {
                            notesListMobileDispatch({
                              type: notesListMobileAction.setCollapseToggle,
                              payload: {
                                id: noteID,
                                data: !notesListMobileState[noteID],
                              },
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={
                              notesListMobileState[noteID] === true
                                ? faChevronRight
                                : faChevronDown
                            }
                          />
                        </Button>
                        <Text color={textColor} style={textWrap}>
                          {title}
                        </Text>
                      </Flex>
                      <Button
                        type="button"
                        variant="outline"
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
                          openEditNote();
                          notesListDispatch({
                            type: notesListAction.setNoteToEdit,
                            payload: note,
                          });
                        }}
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
                  </>
                );

                const displayTitle = (
                  <>
                    <Flex
                      key={`${noteID}${title}`}
                      w="100%"
                      h="45px"
                      align="center"
                      justify="space-between"
                      p="sm"
                      columnGap="lg"
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
                  </>
                );

                const displayText = (
                  <>
                    <Flex
                      key={`${noteID}${text}`}
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
                      <Text color={textColor}>{text}</Text>
                    </Flex>
                  </>
                );

                const displayCompleted = (
                  <>
                    <Flex
                      key={`${noteID}${completed}`}
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
                      <Text
                        color={completed ? 'green' : 'red'}
                        style={textWrap}
                      >
                        {completed ? 'Yes' : 'No'}
                      </Text>
                    </Flex>
                  </>
                );

                const displayCreated = (
                  <>
                    <Flex
                      key={`${noteID}${createdAt}`}
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
                  </>
                );

                const displayUpdated = (
                  <>
                    <Flex
                      key={`${noteID}${updatedAt}`}
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
                  </>
                );

                return (
                  <Flex
                    key={noteID}
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
                    {displayEdit}

                    {/* if noteId for corresponding note in notesListMobileState's collapse state is false, display note */}
                    {notesListMobileState[noteID] === false && [
                      displayTitle,
                      displayText,
                      displayCompleted,
                      displayCreated,
                      displayUpdated,
                    ]}
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
