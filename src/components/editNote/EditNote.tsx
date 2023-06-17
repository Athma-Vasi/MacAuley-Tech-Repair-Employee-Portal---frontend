import { Flex, Title } from '@mantine/core';
import { EditNoteProps } from './types';
import { useEffect, useReducer, useRef } from 'react';
import { editNoteAction, editNoteReducer, initialEditNoteState } from './state';
import { NOTE_TEXT_REGEX, NOTE_TITLE_REGEX } from '../../constants';
import { Loading } from '../loading';

function EditNote({ note }: EditNoteProps) {
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
  } = editNoteState;

  const titleRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // sets focus on title input on first render
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // sets noteToEdit state on first render
  useEffect(() => {
    editNoteDispatch({
      type: editNoteAction.setNoteToEdit,
      payload: { data: noteToEdit },
    });
  }, [noteToEdit]);

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

  async function handleEditNoteFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  const displayLoading = <Loading />;

  const displayEditNoteForm = (
    <Flex direction="column">
      <Title>EditNote</Title>

      <form onSubmit={handleEditNoteFormSubmit}></form>
    </Flex>
  );

  return <Flex direction="column"></Flex>;
}

export { EditNote };
