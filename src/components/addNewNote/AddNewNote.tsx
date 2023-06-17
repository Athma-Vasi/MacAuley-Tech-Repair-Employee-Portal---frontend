import {
  Alert,
  Flex,
  TextInput,
  Title,
  Text,
  Textarea,
  Button,
  Loader,
} from '@mantine/core';
import { useReducer, useRef, useEffect } from 'react';

import '../../index.css';
import {
  addNewNoteAction,
  addNewNoteReducer,
  initialAddNewNoteState,
} from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  returnNoteContentValidationText,
  returnNoteTitleValidationText,
} from '../../utils';
import { NOTE_TEXT_REGEX, NOTE_TITLE_REGEX } from '../../constants';
import { AddNewNoteProps, AddNewNoteResponse } from './types';
import { POST_NEW_NOTE } from './constants';
import { useAuth } from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider';
import {
  screenReaderTextSpecialCharacters,
  screenReaderTitleSpecialCharacters,
} from './domElements';

function AddNewNote({ userId, username, onSubmitModalCB }: AddNewNoteProps) {
  const [addNewNoteState, addNewNoteDispatch] = useReducer(
    addNewNoteReducer,
    initialAddNewNoteState
  );
  const {
    title,
    isValidTitle,
    isTitleFocused,
    text,
    isValidText,
    isTextFocused,
    errorMessage,
    isSubmitting,
    isSuccessful,
  } = addNewNoteState;

  const {
    authState: { accessToken },
    authDispatch,
  } = useAuth();

  const titleRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // focus title input on mount
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // set username prop to state on mount
  useEffect(() => {
    addNewNoteDispatch({
      type: addNewNoteAction.setUsername,
      payload: username,
    });
  }, [username]);

  // set userId prop to state on mount
  useEffect(() => {
    addNewNoteDispatch({
      type: addNewNoteAction.setUserId,
      payload: userId,
    });
  }, [userId]);

  // validate title on user input change
  useEffect(() => {
    const isValid = NOTE_TITLE_REGEX.test(title);

    addNewNoteDispatch({
      type: addNewNoteAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate text on user input change
  useEffect(() => {
    const isValid = NOTE_TEXT_REGEX.test(text);

    addNewNoteDispatch({
      type: addNewNoteAction.setIsValidText,
      payload: isValid,
    });
  }, [text]);

  // clear error message on user input change
  useEffect(() => {
    addNewNoteDispatch({
      type: addNewNoteAction.setErrorMessage,
      payload: '',
    });
  }, [title, text]);

  // for testing
  useEffect(() => {
    console.log({ addNewNoteState });
  }, [addNewNoteState]);

  async function handleAddNewNoteFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // because I'm a little stitious
    const testTitle = NOTE_TITLE_REGEX.test(title);
    const testText = NOTE_TEXT_REGEX.test(text);

    if (!testTitle || !testText) {
      addNewNoteDispatch({
        type: addNewNoteAction.setErrorMessage,
        payload: 'Please enter a valid title and text.',
      });
      return;
    }

    addNewNoteDispatch({
      type: addNewNoteAction.setIsSubmitting,
      payload: true,
    });

    try {
      const axiosConfig = {
        method: 'post',
        url: POST_NEW_NOTE,
        data: {
          user: userId,
          title,
          text,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };

      const response = await axiosInstance<AddNewNoteResponse>(axiosConfig);
      const { status } = response;

      if (status === 201) {
        addNewNoteDispatch({
          type: addNewNoteAction.setIsSuccessful,
          payload: true,
        });

        addNewNoteDispatch({
          type: addNewNoteAction.setErrorMessage,
          payload: '',
        });

        // if successful, close modal
        onSubmitModalCB();

        return;
      }
    } catch (error: any) {
      // if there is no response object, it means the server is down
      if (!error?.response) {
        addNewNoteDispatch({
          type: addNewNoteAction.setErrorMessage,
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

        addNewNoteDispatch({
          type: addNewNoteAction.setErrorMessage,
          payload: message,
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: message,
        });
      }
      // catch all other errors
      else {
        addNewNoteDispatch({
          type: addNewNoteAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });
      }

      // regardless of type of error, do this state update
      addNewNoteDispatch({
        type: addNewNoteAction.setIsSuccessful,
        payload: false,
      });
    } finally {
      // regardless of success or failure, do this state update
      addNewNoteDispatch({
        type: addNewNoteAction.setIsSubmitting,
        payload: false,
      });
    }
  }

  const displayLoading = (
    <Alert
      title="Loading..."
      color="blue"
      className={isSubmitting ? '' : 'offscreen'}
    >
      <Loader />
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
    </Alert>
  );

  const noteTitleRegexValidationText = returnNoteTitleValidationText(title);

  const titleValidationText = (
    <Text
      id="add-new-note-title-error-message"
      className={isTitleFocused && title && !isValidTitle ? '' : 'offscreen'}
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
      id="add-new-note-text-error-message"
      className={isTextFocused && text && !isValidText ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {noteTextRegexValidationText}{' '}
      {noteTextRegexValidationText.includes('punctuation')
        ? screenReaderTextSpecialCharacters
        : null}
    </Text>
  );

  const displayAddNewNoteForm = (
    <>
      <Title>AddNewNote</Title>

      <form onSubmit={handleAddNewNoteFormSubmit}>
        <Flex direction="column">
          <TextInput
            ref={titleRef}
            autoComplete="off"
            label="Title"
            placeholder="Enter title of the note"
            aria-describedby="add-new-note-title-error-message"
            aria-invalid={isValidTitle ? false : true}
            value={title}
            icon={
              isValidTitle ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidTitle && title !== ''}
            description={titleValidationText}
            onChange={(event) => {
              addNewNoteDispatch({
                type: addNewNoteAction.setTitle,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              addNewNoteDispatch({
                type: addNewNoteAction.setIsTitleFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              addNewNoteDispatch({
                type: addNewNoteAction.setIsTitleFocused,
                payload: false,
              });
            }}
            minLength={1}
            maxLength={100}
            withAsterisk
            required
          />

          {/* note content */}
          <Textarea
            autoComplete="off"
            label="Text"
            placeholder="Enter text of the note"
            aria-describedby="add-new-note-text-error-message"
            aria-invalid={isValidText ? false : true}
            value={text}
            icon={
              isValidText ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidText && text !== ''}
            description={contentValidationText}
            onChange={(event) => {
              addNewNoteDispatch({
                type: addNewNoteAction.setText,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              addNewNoteDispatch({
                type: addNewNoteAction.setIsTextFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              addNewNoteDispatch({
                type: addNewNoteAction.setIsTextFocused,
                payload: false,
              });
            }}
            minLength={1}
            maxLength={1000}
            withAsterisk
            required
          />

          {/* submit button */}
          <Flex justify="center">
            <Button type="submit" disabled={!isValidTitle || !isValidText}>
              Submit
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );

  return (
    <Flex direction="column">
      {errorMessage ? displayError : displayAddNewNoteForm}
    </Flex>
  );
}

export { AddNewNote };