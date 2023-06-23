import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Tooltip, Button, Grid, HoverCard, Text } from '@mantine/core';
import { formatDate } from '../../../utils';
import { NOTE_HEADINGS, textWrap } from '../constants';
import { NotesListHeader } from './notesListHeader';
import { Note } from '../types';
import { NotesListDesktopProps } from './types';
import { COLORS } from '../../../constants';
import { useGlobalState } from '../../../hooks/useGlobalState';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

function NotesListDesktop({
  transformedNotes,
  openAddNewNote,
  openEditNote,
  notesListAction,
  notesListDispatch,
  notesListState,
}: NotesListDesktopProps) {
  const {
    globalState: { colorScheme },
  } = useGlobalState();

  const {
    authState: { roles, userId, username: loggedInUsername },
  } = useAuth();

  useEffect(() => {
    console.log('notesListDesktop');
  }, [notesListState]);

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
  const notesHeadersBGColor =
    colorScheme === 'dark' ? lightHeaderBGColor : darkHeaderBGColor;
  const notesRowsBGColorDark =
    colorScheme === 'dark' ? lightRowBGColor : darkRowBGColor;
  const iconColor = colorScheme === 'dark' ? lightIconColor : darkIconColor;

  const addNoteButton = (
    <Button
      type="button"
      onClick={() => {
        openAddNewNote();
        notesListDispatch({
          type: notesListAction.setUserIdForEdit,
          payload: userId,
        });
        notesListDispatch({
          type: notesListAction.setUsernameForEdit,
          payload: loggedInUsername,
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
    >
      Add Note
    </Button>
  );

  const displayNotesAbsense =
    roles.includes('Admin') || roles.includes('Manager') ? (
      <Flex direction="column" rowGap="lg" align="center" justify="center">
        <Text color="dark">
          No notes are active for any employee! All notes have been completed!
        </Text>
        {addNoteButton}
      </Flex>
    ) : (
      <Flex direction="column" rowGap="lg" align="center" justify="center">
        <Text color="dark">You do not have any notes to complete!</Text>
        {addNoteButton}
      </Flex>
    );

  const displayNotesDesktop =
    transformedNotes.length === 0
      ? displayNotesAbsense
      : transformedNotes.map(
          ([userName, [userID, notesArr]]: [string, [string, Note[]]]) => {
            return notesArr.length === 0 ? (
              <Text color="dark">{`${userName} does not have any notes to display`}</Text>
            ) : (
              <Flex
                key={userName}
                direction="column"
                align="center"
                justify="center"
                rowGap="lg"
                w="100%"
                p="md"
              >
                <Flex justify="space-between" align="center" w="100%">
                  <Text color={textColor} size="lg">
                    {userName}
                  </Text>
                  <Tooltip label={`Add new note for ${userName}`}>
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
                  </Tooltip>
                </Flex>
                {/* headings */}
                <Grid
                  columns={10}
                  h="45px"
                  align="center"
                  style={{
                    backgroundColor: notesHeadersBGColor,
                    opacity: colorScheme === 'light' ? '0.8' : '1',
                    borderRadius: '4px',
                  }}
                  w="100%"
                >
                  {NOTE_HEADINGS.map((heading) => {
                    return (
                      <NotesListHeader
                        key={heading}
                        currentUsername={userName}
                        notesListState={notesListState}
                        notesListDispatch={notesListDispatch}
                        notesListAction={notesListAction}
                        heading={heading}
                      />
                    );
                  })}
                </Grid>
                {/* notes */}
                <Flex
                  direction="column"
                  w="100%"
                  rowGap="lg"
                  p="xs"
                  justify="center"
                  align="space-between"
                >
                  {notesArr.map((note: Note, index: number) => {
                    const {
                      _id,
                      title,
                      text,
                      createdAt,
                      updatedAt,
                      completed,
                    } = note;

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

                    const displayTitle = (
                      <Grid.Col span={2}>
                        <Flex align="center">
                          <HoverCard
                            width={350}
                            shadow="md"
                            openDelay={382}
                            closeDelay={236}
                          >
                            <HoverCard.Target>
                              <Text color={textColor} style={textWrap}>
                                {title}
                              </Text>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text color={textColor}>{title}</Text>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        </Flex>
                      </Grid.Col>
                    );

                    const displayText = (
                      <Grid.Col span={2}>
                        <Flex align="center">
                          <HoverCard
                            width={350}
                            shadow="md"
                            openDelay={382}
                            closeDelay={236}
                          >
                            <HoverCard.Target>
                              <Text color={textColor} style={textWrap}>
                                {text}
                              </Text>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text color={textColor}>{text}</Text>
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

                    const displayCompleted = (
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
                                {completed ? (
                                  <Text color="green">Yes</Text>
                                ) : (
                                  <Text color="red">No</Text>
                                )}
                              </Text>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text color={textColor}>
                                {completed ? (
                                  <Text color={textColor}>
                                    Yes, note has been marked completed.
                                  </Text>
                                ) : (
                                  <Text color={textColor}>
                                    No, note is still active.
                                  </Text>
                                )}
                              </Text>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        </Flex>
                      </Grid.Col>
                    );

                    const displayEditIcon = (
                      <Grid.Col
                        span={1}
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
                        <Flex align="center">
                          <Tooltip
                            label={`Edit ${title}`}
                            style={{
                              ...textWrap,
                              backgroundColor:
                                colorScheme === 'dark'
                                  ? lightRowBGColor
                                  : 'white',
                              color:
                                colorScheme === 'dark'
                                  ? textColor
                                  : 'darkslategray',
                              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={openEditNote}
                              style={{
                                cursor: 'pointer',
                                color: iconColor,
                              }}
                            />
                          </Tooltip>
                        </Flex>
                      </Grid.Col>
                    );

                    // returns a row of Grid.Col of note data
                    return (
                      <Grid
                        key={_id}
                        columns={10}
                        style={
                          index % 2 === 0
                            ? {
                                borderRadius: '4px',
                              }
                            : {
                                backgroundColor: notesRowsBGColorDark,

                                borderRadius: '4px',
                              }
                        }
                      >
                        {displayTitle}
                        {displayText}
                        {displayCreatedDate}
                        {displayUpdatedDate}
                        {displayCompleted}
                        {displayEditIcon}
                      </Grid>
                    );
                  })}
                </Flex>
              </Flex>
            );
          }
        );

  return <>{displayNotesDesktop}</>;
}

export { NotesListDesktop };
