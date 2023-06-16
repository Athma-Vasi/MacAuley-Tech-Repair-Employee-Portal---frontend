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

function NotesList() {
  const [notesListState, notesListDispatch] = useReducer(
    notesListReducer,
    initialNotesListState
  );
  const { notes, noteToEdit, isLoading, errorMessage } = notesListState;

  const {
    authState: { accessToken },
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

      const axiosConfig = {
        method: 'get',
        url: GET_ALL_NOTES,
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
          ([username, notes]: [string, Note[]]) => {
            return (
              <Flex key={username} direction="column">
                <Flex justify="space-between">
                  <Title order={3}>{username}</Title>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ cursor: 'pointer' }}
                    onClick={openAddNewNote}
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
                    {notes.map((note: Note) => {
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

                      const createdDate = new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      }).format(new Date(createdAt));

                      const updatedDate = new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      }).format(new Date(updatedAt));

                      return (
                        <tr key={_id}>
                          <td>{title}</td>
                          <td>{text}</td>
                          <td>{createdDate}</td>
                          <td>{updatedDate}</td>
                          <td>{completed ? 'Yes' : 'No'}</td>
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
      <AddNewNote />
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
