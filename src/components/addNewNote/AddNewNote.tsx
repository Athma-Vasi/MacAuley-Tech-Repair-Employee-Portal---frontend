import {
  Alert,
  Flex,
  TextInput,
  Title,
  Text,
  Textarea,
  Button,
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
import { AddNewNoteProps } from './types';

function AddNewNote({ username }: AddNewNoteProps) {
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
    completed,
    errorMessage,
    isSubmitting,
    isSuccessful,
  } = addNewNoteState;

  const titleRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // focus title input on mount
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

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

  function handleAddNewNoteFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const titleValidationText = (
    <Text
      id="add-new-note-title-error-message"
      className={isTitleFocused && title && !isValidTitle ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNoteTitleValidationText(title)}
    </Text>
  );

  const contentValidationText = (
    <Text
      id="add-new-note-text-error-message"
      className={isTextFocused && text && !isValidText ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnNoteContentValidationText(text)}
    </Text>
  );

  return (
    <Flex direction="column">
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
            <Button
              type="submit"
              disabled={!isValidTitle || !isValidText}
              onClick={() => {
                addNewNoteDispatch({
                  type: addNewNoteAction.setIsSubmitting,
                  payload: true,
                });
              }}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export { AddNewNote };
