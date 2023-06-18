import { Flex, Modal, Space, Table, Text, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  initialNotesListState,
  notesListAction,
  notesListReducer,
} from './state';
import { GET_ALL_NOTES } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import {
  GetAllNotesResponse,
  Note,
  NotesListSort,
  NotesListSortKey,
  NotesListTransformed,
} from './types';
import { authAction } from '../../context/authProvider';
import { groupNotesByUsername } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faPlus,
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import { EditNote } from '../editNote';
import { AddNewNote } from '../addNewNote';
import { formatDate } from '../../utils';
import { Loading } from '../loading';
import { NotesListTitle } from './notesListTitle';

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

  const displayLoading = <Loading />;

  const displayNotesAbsense = (
    <Flex justify="center">
      {roles.includes('Admin') || roles.includes('Manager') ? (
        <Text>
          No notes are active for any employee! All notes have been completed!
        </Text>
      ) : (
        <Text>You do not have any notes to complete!</Text>
      )}
    </Flex>
  );

  function sortGroupedNotesForUsernameByKey({
    usernameForEdit,
    notesTuple,
    sortKey,
    sortDirection,
  }: {
    usernameForEdit: string;
    notesTuple: NotesListTransformed[];
    sortKey: NotesListSortKey;
    sortDirection: NotesListSort;
  }) {
    return notesTuple.map(
      ([username, [userId, notes]]: [string, [string, Note[]]]) => {
        if (username === usernameForEdit) {
          return [username, [userId, notes.sort(sortNotesComparator)]];
        } else {
          return [username, [userId, notes]];
        }
      }
    ) as NotesListTransformed[];

    function sortNotesComparator(a: Note, b: Note) {
      if (sortKey === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortKey === 'updatedAt') {
        return sortDirection === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortKey === 'completed') {
        return sortDirection === 'asc'
          ? a.completed === b.completed
            ? 0
            : a.completed
            ? 1
            : -1
          : a.completed === b.completed
          ? 0
          : a.completed
          ? -1
          : 1;
      } else if (sortKey === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortKey === 'text') {
        return sortDirection === 'asc'
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text);
      } else {
        return 0;
      }
    }
  }

  function transformNotesForDisplay({
    notes,
    usernameForEdit,
    sortKey,
    sortDirection,
  }: {
    notes: Note[];
    usernameForEdit: string;
    sortKey: NotesListSortKey;
    sortDirection: NotesListSort;
  }) {
    const groupedNotesByUsername = groupNotesByUsername(notes);
    const sortedNotesForUsernameByKey = sortGroupedNotesForUsernameByKey({
      usernameForEdit,
      notesTuple: groupedNotesByUsername,
      sortKey,
      sortDirection,
    });

    return sortedNotesForUsernameByKey;
  }

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
              <Flex key={userName} direction="column">
                <Flex justify="space-between">
                  <Title order={3}>{userName}</Title>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ cursor: 'pointer' }}
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
                        openEditNote();
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === 'Enter') {
                        openEditNote();
                      }
                    }}
                  />
                </Flex>

                <Table striped highlightOnHover>
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
                      <NotesListTitle
                        currentUsername={userName}
                        notesListState={notesListState}
                        notesListDispatch={notesListDispatch}
                        notesListAction={notesListAction}
                      />
                      <th>Text</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Completed</th>
                      <th>Edit</th>
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
                          style={{ cursor: 'pointer' }}
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
                          />
                        </td>
                      );

                      return (
                        <tr key={_id}>
                          <td>{title}</td>
                          <td>{text}</td>
                          <td>{createdDate}</td>
                          <td>{updatedDate}</td>
                          <td>{completed ? 'Yes' : 'No'}</td>
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
      <EditNote note={noteToEdit} onSubmitModalCB={closeEditNote} />
    </Modal>
  );

  const displayAddNewNoteModal = (
    <Modal opened={openedAddNewNote} onClose={closeAddNewNote}>
      <AddNewNote
        userId={userIdForEdit}
        username={usernameForEdit}
        onSubmitModalCB={closeAddNewNote}
      />
    </Modal>
  );

  return (
    <Flex direction="column">
      <Title>NotesList</Title>
      {displayAddNewNoteModal}
      {displayEditNoteModal}
      {isLoading ? displayLoading : displayNotes}
    </Flex>
  );
}

export { NotesList };
