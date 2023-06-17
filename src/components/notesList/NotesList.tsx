import { Flex, Modal, Table, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  initialNotesListState,
  notesListAction,
  notesListReducer,
} from './state';
import { GET_ALL_NOTES } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { GetAllNotesResponse, Note } from './types';
import { authAction } from '../../context/authProvider';
import { groupNotesByUsername } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import { EditNote } from '../editNote';
import { AddNewNote } from '../addNewNote';
import { formatDate } from '../../utils';

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
  } = notesListState;

  const {
    authState: { accessToken, roles, userId },
    authDispatch,
  } = useAuth();

  // for opening and closing the edit modal
  const [openedEditNote, { open: openEditNote, close: closeEditNote }] =
    useDisclosure(false);

  // for opening and closing the add new note modal
  const [openedAddNewNote, { open: openAddNewNote, close: closeAddNewNote }] =
    useDisclosure(false);

  // grab notes from database and dispatch to reducer to update state
  useEffect(() => {
    async function getAllNotes() {
      notesListDispatch({
        type: notesListAction.setIsLoading,
        payload: true,
      });

      console.log({ roles, userIdForEdit });

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

  useEffect(() => {
    const groupedNotes = groupNotesByUsername(notes);

    console.log({ groupedNotes });
  }, [notesListState]);

  const displayNotes =
    notes.length === 0
      ? null
      : groupNotesByUsername(notes).map(
          ([username, [userId, notesArr]]: [string, [string, Note[]]]) => {
            return (
              <Flex key={username} direction="column">
                <Flex justify="space-between">
                  <Title order={3}>{username}</Title>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      openAddNewNote();
                      notesListDispatch({
                        type: notesListAction.setUserIdForEdit,
                        payload: userId,
                      });
                      notesListDispatch({
                        type: notesListAction.setUsernameForEdit,
                        payload: username,
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
                  <thead>
                    <tr key={username}>
                      <th>Title</th>
                      <th>Text</th>
                      <th>Created At</th>
                      <th>Updated At</th>
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
      <EditNote note={noteToEdit} />
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
      {displayNotes}
    </Flex>
  );
}

export { NotesList };
