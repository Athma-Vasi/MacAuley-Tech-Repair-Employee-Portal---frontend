import {
  Alert,
  Flex,
  Title,
  Text,
  Button,
  TextInput,
  Textarea,
  Checkbox,
  Center,
} from '@mantine/core';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useReducer, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css';
import { EditNoteProps, EditNoteResponse } from './types';
import { editNoteAction, editNoteReducer, initialEditNoteState } from './state';
import { NOTE_TEXT_REGEX, NOTE_TITLE_REGEX } from '../../constants';
import { Loading } from '../loading';
import {
  returnNoteContentValidationText,
  returnNoteTitleValidationText,
} from '../../utils';
import {
  screenReaderTitleSpecialCharacters,
  screenReaderTextSpecialCharacters,
} from '../../domElements';
import { addNewNoteAction } from '../addNewNote/state';
import { EDIT_NOTE_URL } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider';

function EditNote({ note, closeModalCallback }: EditNoteProps) {
  const [editNoteState, editNoteDispatch] = useReducer(
    editNoteReducer,
    initialEditNoteState
  );
  const {
    text,
    isTextValid,
    isTextFocused,

    title,
    isTitleValid,
    isTitleFocused,

    completed,
    noteToEdit,
    errorMessage,
    isSubmitting,
    isSuccessful,
  } = editNoteState;

  const {
    authState: { accessToken },
    authDispatch,
  } = useAuth();

  const titleRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // sets focus on title input on first render
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // sets noteToEdit state on first render and sets title, text and completed from passed in note
  useEffect(() => {
    editNoteDispatch({
      type: editNoteAction.setNoteToEdit,
      payload: { data: note },
    });

    editNoteDispatch({
      type: editNoteAction.setTitle,
      payload: { data: note.title },
    });

    editNoteDispatch({
      type: editNoteAction.setText,
      payload: { data: note.text },
    });

    editNoteDispatch({
      type: editNoteAction.setCompleted,
      payload: { data: note.completed },
    });
  }, []);

  // clears error message on title, text or completed change
  useEffect(() => {
    editNoteDispatch({
      type: editNoteAction.setErrorMessage,
      payload: { data: '' },
    });
  }, [title, text, completed]);

  // validates title on every input change
  useEffect(() => {
    const isValid = NOTE_TITLE_REGEX.test(title);

    editNoteDispatch({
      type: editNoteAction.setIsTitleValid,
      payload: { data: isValid },
    });
  }, [title]);

  // validates text on every input change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(text);

    editNoteDispatch({
      type: editNoteAction.setIsTextValid,
      payload: { data: isValid },
    });
  }, [text]);

  // for testing purposes
  useEffect(() => {
    console.log('editNoteState: ', editNoteState);
  }, [editNoteState]);

  async function handleEditNoteFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // because I'm a little stitious
    const testTitle = NOTE_TITLE_REGEX.test(title);
    const testText = NOTE_TEXT_REGEX.test(text);
    const testCompleted = typeof completed === 'boolean';

    if (!testTitle || !testText || !testCompleted) {
      editNoteDispatch({
        type: editNoteAction.setErrorMessage,
        payload: { data: 'Please enter a valid title and text.' },
      });
      return;
    }

    editNoteDispatch({
      type: editNoteAction.setIsSubmitting,
      payload: { data: true },
    });

    const editedNote = {
      id: noteToEdit._id,
      user: noteToEdit.user,
      title,
      text,
      completed,
    };

    const axiosConfig = {
      method: 'patch',
      url: EDIT_NOTE_URL,
      data: editedNote,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axiosInstance<EditNoteResponse>(axiosConfig);
      const { status } = response;

      if (status === 201) {
        editNoteDispatch({
          type: editNoteAction.setErrorMessage,
          payload: { data: '' },
        });

        editNoteDispatch({
          type: editNoteAction.setIsSubmitting,
          payload: { data: false },
        });

        editNoteDispatch({
          type: editNoteAction.setIsSuccessful,
          payload: { data: true },
        });
      }
    } catch (error: any) {
      // if there is no response object, it means the server is down
      if (!error?.response) {
        editNoteDispatch({
          type: editNoteAction.setErrorMessage,
          payload: { data: 'Network Error' },
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

        editNoteDispatch({
          type: editNoteAction.setErrorMessage,
          payload: { data: message },
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: message,
        });
      }
      // catch all other errors
      else {
        editNoteDispatch({
          type: editNoteAction.setErrorMessage,
          payload: { data: 'An unknown error occurred. Please try again.' },
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });
      }

      // regardless of type of error, do this state update
      editNoteDispatch({
        type: editNoteAction.setIsSuccessful,
        payload: { data: false },
      });
    } finally {
      editNoteDispatch({
        type: editNoteAction.setIsSubmitting,
        payload: { data: false },
      });
    }
  }

  const displayLoading = <Loading />;

  const displaySuccess = (
    <Alert
      title="Success!"
      color="green"
      className={isSuccessful ? '' : 'offscreen'}
    >
      <Flex direction="column" rowGap="lg">
        <Text>Successfully edited note.</Text>
        <Button color="green" onClick={closeModalCallback}>
          Close
        </Button>
      </Flex>
    </Alert>
  );

  // allows error message to be read by screen reader instead of removing it from the DOM
  const displayError = (
    <Alert
      title="Warning!"
      color="yellow"
      className={errorMessage ? '' : 'offscreen'}
    >
      <Text ref={errorRef} aria-live="assertive">
        {errorMessage}
      </Text>
      <Button color="yellow" onClick={closeModalCallback}>
        Try Again
      </Button>
    </Alert>
  );

  const noteTitleRegexValidationText = returnNoteTitleValidationText(title);

  const titleValidationText = (
    <Text
      id="edit-note-title-error-message"
      className={isTitleFocused && title && !isTitleValid ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {noteTitleRegexValidationText}{' '}
      {noteTitleRegexValidationText.includes('special characters')
        ? screenReaderTitleSpecialCharacters
        : null}
    </Text>
  );

  const noteTextRegexValidationText = returnNoteContentValidationText(text);

  const contentValidationText = (
    <Text
      id="edit-note-text-error-message"
      className={isTextFocused && text && !isTextValid ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {noteTextRegexValidationText}{' '}
      {noteTextRegexValidationText.includes('punctuation')
        ? screenReaderTextSpecialCharacters
        : null}
    </Text>
  );

  const displayEditNoteForm = (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      w="100%"
      h="100%"
    >
      <Title order={2} color="dark">
        Edit note
      </Title>
      <form onSubmit={handleEditNoteFormSubmit}>
        <Flex
          direction="column"
          align="center"
          justify="space-between"
          rowGap="lg"
          p="lg"
          w={400}
          h="100%"
        >
          <TextInput
            w="100%"
            color="dark"
            ref={titleRef}
            autoComplete="off"
            label="Title"
            placeholder="Enter title of the note"
            aria-describedby="edit-note-title-error-message"
            aria-invalid={isTitleValid ? false : true}
            value={title}
            icon={
              isTitleValid ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isTitleValid && title !== ''}
            description={titleValidationText}
            onChange={(event) => {
              editNoteDispatch({
                type: addNewNoteAction.setTitle,
                payload: { data: event.currentTarget.value },
              });
            }}
            onFocus={() => {
              editNoteDispatch({
                type: editNoteAction.setIsTitleFocused,
                payload: { data: true },
              });
            }}
            onBlur={() => {
              editNoteDispatch({
                type: editNoteAction.setIsTitleFocused,
                payload: { data: false },
              });
            }}
            minLength={1}
            maxLength={100}
            withAsterisk
            required
          />

          {/* note content */}
          <Textarea
            w="100%"
            color="dark"
            autosize
            maxRows={10}
            autoComplete="off"
            label="Text"
            placeholder="Enter text of the note"
            aria-describedby="edit-note-text-error-message"
            aria-invalid={isTextValid ? false : true}
            value={text}
            icon={
              isTextValid ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isTextValid && text !== ''}
            description={contentValidationText}
            onChange={(event) => {
              editNoteDispatch({
                type: editNoteAction.setText,
                payload: { data: event.currentTarget.value },
              });
            }}
            onFocus={() => {
              editNoteDispatch({
                type: editNoteAction.setIsTextFocused,
                payload: { data: true },
              });
            }}
            onBlur={() => {
              editNoteDispatch({
                type: editNoteAction.setIsTextFocused,
                payload: { data: false },
              });
            }}
            minLength={1}
            maxLength={1000}
            withAsterisk
            required
          />

          {/* note completed */}
          <Flex w="100%" align="center" justify="start">
            <Checkbox
              label="Completed"
              description="Check box if note is completed"
              checked={completed}
              onChange={(event) => {
                editNoteDispatch({
                  type: editNoteAction.setCompleted,
                  payload: { data: event.currentTarget.checked },
                });
              }}
            />
          </Flex>

          {/* submit button */}
          <Flex justify="flex-end" align="center" columnGap="lg" w="100%">
            <Button type="submit" disabled={!isTitleValid || !isTextValid}>
              Submit
            </Button>
            <Button
              type="button"
              variant="subtle"
              color="red"
              onClick={closeModalCallback}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );

  return (
    <Center w={400}>
      {isSubmitting
        ? displayLoading
        : isSuccessful
        ? displaySuccess
        : errorMessage
        ? displayError
        : displayEditNoteForm}
    </Center>
  );
}

export { EditNote };
