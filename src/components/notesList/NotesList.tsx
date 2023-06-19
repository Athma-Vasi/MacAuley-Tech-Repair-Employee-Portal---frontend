import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  Table,
  Text,
  Title,
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
import { GET_ALL_NOTES, NOTE_HEADINGS } from './constants';
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
  } = notesListState;

  const {
    authState: { accessToken, roles, userId, username: loggedInUsername },
    authDispatch,
  } = useAuth();

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

  // grab notes from database and dispatch to reducer to update state
  useEffect(() => {
    async function getAllNotes() {
      notesListDispatch({
        type: notesListAction.setIsLoading,
        payload: true,
      });

      // if user is admin or manager, get all notes and allow them to edit any note
      let axiosConfig = {};
      if (roles.includes('Admin') || roles.includes('Manager')) {
        axiosConfig = {
          method: 'get',
          url: GET_ALL_NOTES,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
      }
      // if user is not admin or manager, get only their notes and allow them to edit only their notes
      else {
        axiosConfig = {
          method: 'get',
          url: `${GET_ALL_NOTES}/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        };
      }

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

        notesListDispatch({
          type: notesListAction.setIsLoading,
          payload: false,
        });
      }
    }

    getAllNotes();
  }, []);

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

  const displayLoading = <Loading />;

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

  const displayNotes =
    notes.length === 0
      ? displayNotesAbsense
      : transformedNotes.map(
          ([userName, [userID, notesArr]]: [string, [string, Note[]]]) => {
            return (
              <Flex
                key={userName}
                direction="column"
                align="center"
                justify="center"
                rowGap="lg"
              >
                <Flex
                  justify="flex-start"
                  align="flex-start"
                  w="100%"
                  columnGap="lg"
                >
                  <Title order={3} color="dark">
                    {userName}
                  </Title>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      cursor: 'pointer',
                      color: 'dimgray',
                      paddingTop: '4px',
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
                </Flex>

                <Table
                  striped
                  highlightOnHover
                  horizontalSpacing="xs"
                  verticalSpacing="md"
                >
                  <thead
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        notesListDispatch({
                          type: notesListAction.setUsernameForEdit,
                          payload: userName,
                        });
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === 'Enter') {
                        notesListDispatch({
                          type: notesListAction.setUsernameForEdit,
                          payload: userName,
                        });
                      }
                    }}
                    onClick={() => {
                      notesListDispatch({
                        type: notesListAction.setUsernameForEdit,
                        payload: userName,
                      });
                    }}
                  >
                    <tr key={userName}>
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
                    </tr>
                  </thead>
                  <tbody>
                    {notesArr.map((note: Note) => {
                      const {
                        _id,
                        title,
                        text,
                        createdAt,
                        updatedAt,
                        user,
                        completed,
                        __v,
                        username,
                      } = note;

                      const createdDate = formatDate({
                        date: createdAt,
                        locale: 'en-US',
                      });

                      const updatedDate = formatDate({
                        date: updatedAt,
                        locale: 'en-US',
                      });

                      const displayEditIcon = (
                        <td
                          style={{
                            cursor: 'pointer',
                            color: 'dimgray',
                            outline: '1px solid red',
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
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={openEditNote}
                            style={{
                              outline: '1px solid blue',
                            }}
                          />
                        </td>
                      );

                      const displayCompleted = completed ? (
                        <Text color="green">Yes</Text>
                      ) : (
                        <Text color="red">No</Text>
                      );

                      return (
                        <tr key={_id}>
                          <td
                            style={{
                              outline: '1px solid red',
                            }}
                          >
                            <Text
                              color="dark"
                              style={{ outline: '1px solid blue' }}
                            >
                              {title}
                            </Text>
                          </td>
                          <td
                            style={{
                              outline: '1px solid red',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <Text color="dark">{text}</Text>
                          </td>
                          <td
                            style={{
                              outline: '1px solid red',
                            }}
                          >
                            <Text color="dark">{createdDate}</Text>
                          </td>
                          <td
                            style={{
                              outline: '1px solid red',
                            }}
                          >
                            <Text color="dark">{updatedDate}</Text>
                          </td>
                          <td
                            style={{
                              outline: '1px solid black',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {displayCompleted}
                          </td>
                          {displayEditIcon}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Flex>
            );
          }
        );

  const displayEditNoteModal = (
    <Modal opened={openedEditNote} onClose={closeEditNote}>
      <Flex direction="column" align="start" justify="space-between">
        <EditNote note={noteToEdit} onSubmitModalCB={closeEditNote} />
      </Flex>
    </Modal>
  );

  const displayAddNewNoteModal = (
    <Modal opened={openedAddNewNote} onClose={closeAddNewNote}>
      <Flex direction="column" align="start" justify="space-between">
        <AddNewNote
          userId={userIdForEdit}
          username={usernameForEdit}
          onSubmitModalCB={closeAddNewNote}
        />
      </Flex>
    </Modal>
  );

  return (
    <Flex direction="column" rowGap="xl">
      <Title order={2} color="dark">
        Notes List
      </Title>
      {displayAddNewNoteModal}
      {displayEditNoteModal}
      {isLoading ? displayLoading : displayNotes}
    </Flex>
  );
}

export { NotesList };
