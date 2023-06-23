import { Button, Flex, Modal, Space, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import { useDisclosure } from '@mantine/hooks';

import type { AxiosRequestConfig } from 'axios';
import type { GetAllNotesResponse } from './types';

import {
  initialNotesListState,
  notesListAction,
  notesListReducer,
} from './state';
import { GET_ALL_NOTES } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider';
import { transformNotesForDisplay } from './utils';
import { EditNote } from '../editNote';
import { AddNewNote } from '../addNewNote';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { useGlobalState } from '../../hooks/useGlobalState';
import { COLORS } from '../../constants';
import { NotesListMobile } from './notesListMobile';
import { NotesListDesktop } from './notesListDesktop';

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
    authState: { accessToken, roles, userId },
    authDispatch,
  } = useAuth();

  const {
    globalState: { colorScheme, width },
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

  const displayLoading = <Loading dataDirection="load" />;

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
    console.log('notesList');
  }, [notesListState]);

  const { lightTextColor, darkTextColor, buttonOutlineColor, buttonTextColor } =
    COLORS;
  const textColor = colorScheme === 'dark' ? lightTextColor : darkTextColor;
  const buttonOutline = colorScheme === 'dark' ? buttonOutlineColor : '';
  const buttonText = colorScheme === 'dark' ? buttonTextColor : '';
  const buttonBackground = colorScheme === 'dark' ? 'transparent' : '';

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

  const displayNotes =
    width <= 1024 ? (
      <NotesListMobile
        transformedNotes={transformedNotes}
        notesListAction={notesListAction}
        notesListDispatch={notesListDispatch}
        notesListState={notesListState}
        openAddNewNote={openAddNewNote}
        openEditNote={openEditNote}
      />
    ) : (
      <NotesListDesktop
        transformedNotes={transformedNotes}
        notesListAction={notesListAction}
        notesListDispatch={notesListDispatch}
        notesListState={notesListState}
        openAddNewNote={openAddNewNote}
        openEditNote={openEditNote}
      />
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
