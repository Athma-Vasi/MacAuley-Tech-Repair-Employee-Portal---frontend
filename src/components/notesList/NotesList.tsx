import {
  Button,
  Flex,
  Grid,
  HoverCard,
  Modal,
  Space,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';

import {
  initialNotesListState,
  notesListAction,
  notesListReducer,
} from './state';
import { GET_ALL_NOTES, NOTE_HEADINGS, textWrap } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { GetAllNotesResponse, Note } from './types';
import { authAction } from '../../context/authProvider';
import { transformNotesForDisplay } from './utils';
import { EditNote } from '../editNote';
import { AddNewNote } from '../addNewNote';
import { formatDate } from '../../utils';
import { Loading } from '../loading';
import { NotesListHeader } from './notesListHeader';
import { CustomError } from '../customError';
import { AxiosRequestConfig } from 'axios';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';

function NotesList() {
  const [notesListState, notesListDispatch] = useReducer(
    notesListReducer,
    initialNotesListState
  );
  const {
    notes,
    noteToEdit,
    userIdForEdit,
    usernameForEdit,
    isLoading,
    errorMessage,
    sortKey,
    sortDirection,
    transformedNotes,
    triggerGetAllNotes,
  } = notesListState;

  const {
    authState: { accessToken, roles, userId, username: loggedInUsername },
    authDispatch,
  } = useAuth();

  const {
    globalState: { colorScheme },
  } = useGlobalState();

  // for opening and closing the edit modal
  const [openedEditNote, { open: openEditNote, close: closeEditNote }] =
    useDisclosure(false);
  // for opening and closing the add new note modal
  const [openedAddNewNote, { open: openAddNewNote, close: closeAddNewNote }] =
    useDisclosure(false);

  // set loading to true upon initial render
  useEffect(() => {
    notesListDispatch({
      type: notesListAction.setIsLoading,
      payload: true,
    });
  }, []);

  // grab notes from database and dispatch to reducer to update state and trigger on refresh button click
  useEffect(() => {
    async function getAllNotes() {
      notesListDispatch({
        type: notesListAction.setIsLoading,
        payload: true,
      });

      const controller = new AbortController();
      const { signal } = controller;

      // if user is admin or manager, get all notes and allow them to edit any note
      // else if user is employee, get only their notes and allow them to edit only their notes
      const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        signal,
        url:
          roles.includes('Admin') || roles.includes('Manager')
            ? GET_ALL_NOTES
            : `${GET_ALL_NOTES}/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };

      try {
        const response = await axiosInstance<GetAllNotesResponse>(axiosConfig);
        const {
          status,
          data: { notes },
        } = response;

        if (status === 200) {
          notesListDispatch({
            type: notesListAction.setAllNotes,
            payload: notes,
          });

          notesListDispatch({
            type: notesListAction.setIsLoading,
            payload: false,
          });
        }
      } catch (error: any) {
        // if there is no response object, it means the server is down
        if (!error?.response) {
          notesListDispatch({
            type: notesListAction.setErrorMessage,
            payload: 'Network Error',
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: 'Network Error',
          });
        }
        // if there is a response object, it means the server is up
        else if (error.response) {
          const {
            response: {
              data: { message },
            },
          } = error;

          notesListDispatch({
            type: notesListAction.setErrorMessage,
            payload: message,
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: message,
          });
        }
        // catch all other errors
        else {
          notesListDispatch({
            type: notesListAction.setErrorMessage,
            payload: 'An unknown error occurred. Please try again.',
          });

          authDispatch({
            type: authAction.setErrorMessage,
            payload: 'An unknown error occurred. Please try again.',
          });
        }
      } finally {
        notesListDispatch({
          type: notesListAction.setIsLoading,
          payload: false,
        });

        controller.abort();
      }
    }

    getAllNotes();
  }, [triggerGetAllNotes]);

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

  const displayLoading = <Loading dataDirection="load" />;

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

  useEffect(() => {
    const transformedNotes = transformNotesForDisplay({
      notes,
      usernameForEdit,
      sortKey,
      sortDirection,
    });

    notesListDispatch({
      type: notesListAction.setTransformedNotes,
      payload: transformedNotes,
    });
  }, [notes, usernameForEdit, sortKey, sortDirection]);

  useEffect(() => {
    console.log({ transformedNotes });
  }, [transformedNotes]);

  const {
    lightTextColor,
    darkTextColor,
    darkHeaderBGColor,
    darkIconColor,
    darkRowBGColor,
    lightHeaderBGColor,
    lightIconColor,
    lightRowBGColor,
    buttonOutlineColor,
    buttonTextColor,
  } = COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const notesHeadersBGColor =
    colorScheme === 'dark' ? lightHeaderBGColor : darkHeaderBGColor;
  const notesRowsBGColorDark =
    colorScheme === 'dark' ? lightRowBGColor : darkRowBGColor;
  const iconColor = colorScheme === 'dark' ? lightIconColor : darkIconColor;
  const buttonOutline = colorScheme === 'dark' ? buttonOutlineColor : '';
  const buttonText = colorScheme === 'dark' ? buttonTextColor : '';
  const buttonBackground = colorScheme === 'dark' ? 'transparent' : '';

  const displayNotes =
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
                    <Button
                      style={{
                        backgroundColor: buttonBackground,
                        color: buttonText,
                        border: buttonOutline,
                      }}
                    >
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
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={openEditNote}
                            style={{
                              cursor: 'pointer',
                              color: iconColor,
                            }}
                          />
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

  const displayError = (
    <CustomError message={errorMessage} isError={errorMessage ? true : false} />
  );

  const displayEditNoteModal = (
    <Modal opened={openedEditNote} onClose={closeEditNote}>
      <Flex direction="column" align="start" justify="space-between">
        <EditNote note={noteToEdit} closeModalCallback={closeEditNote} />
      </Flex>
    </Modal>
  );

  const displayAddNewNoteModal = (
    <Modal opened={openedAddNewNote} onClose={closeAddNewNote}>
      <Flex direction="column" align="start" justify="space-between">
        <AddNewNote
          userId={userIdForEdit}
          username={usernameForEdit}
          closeModalCallback={closeAddNewNote}
        />
      </Flex>
    </Modal>
  );

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="xl"
      w="100%"
    >
      <Flex align="center" justify="space-between" w="100%">
        <Title order={2} color={textColor}>
          Notes List
        </Title>
        <Button
          style={{
            backgroundColor: buttonBackground,
            color: buttonText,
            border: buttonOutline,
          }}
          onClick={() =>
            notesListDispatch({
              type: notesListAction.setTriggerGetAllNotes,
              payload: !triggerGetAllNotes,
            })
          }
        >
          Refresh
        </Button>
      </Flex>
      <Space h="lg" />
      {displayAddNewNoteModal}
      {displayEditNoteModal}
      {errorMessage ? displayError : null}
      {isLoading ? displayLoading : displayNotes}
    </Flex>
  );
}

export { NotesList };
