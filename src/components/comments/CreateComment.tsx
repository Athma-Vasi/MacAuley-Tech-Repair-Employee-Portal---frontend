import { Title } from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { TbUpload } from 'react-icons/tb';

import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleTextAreaInputElements,
} from '../../jsxCreators';
import { returnGrammarValidationText } from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  FormLayoutWrapper,
} from '../wrappers';
import {
  createCommentAction,
  createCommentReducer,
  initialCreateCommentState,
} from './state';

function CreateComment() {
  const [createCommentState, createCommentDispatch] = useReducer(
    createCommentReducer,
    initialCreateCommentState
  );
  const {
    comment,
    isCommentValid,
    isCommentFocused,

    isAnonymous,
    isDeleted,
    triggerFormSubmit,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isLoading,
    loadingMessage,
    isSuccess,
    successMessage,
  } = createCommentState;

  // sets focus to comment text area on page load
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    commentTextAreaRef.current?.focus();
  }, []);

  // validate comment on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(comment);

    createCommentDispatch({
      type: createCommentAction.setIsCommentValid,
      payload: isValid,
    });
  }, [comment]);

  const [commentInputErrorText, commentInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'comment',
      inputText: comment,
      isValidInputText: isCommentValid,
      isInputTextFocused: isCommentFocused,
      regexValidationText: returnGrammarValidationText({
        content: comment,
        contentKind: 'comment input',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const commentInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: commentInputErrorText,
      valid: commentInputValidText,
    },
    inputText: comment,
    isValidInputText: isCommentValid,
    onBlur: () => {
      createCommentDispatch({
        type: createCommentAction.setIsCommentFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      createCommentDispatch({
        type: createCommentAction.setComment,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createCommentDispatch({
        type: createCommentAction.setIsCommentFocused,
        payload: true,
      });
    },
    label: 'Comment',
    placeholder: 'Enter your comment here',
    semanticName: 'comment',
    required: true,
    withAsterisk: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create comment form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createCommentDispatch({
        type: createCommentAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: triggerFormSubmit,
  };

  const [createdCommentTextAreaInput] = returnAccessibleTextAreaInputElements([
    commentInputCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);

  const displayCreateCommentFormPage = (
    <FormLayoutWrapper>
      <Title order={3}>Comment</Title>
      {createdCommentTextAreaInput}
      {createdSubmitButton}
    </FormLayoutWrapper>
  );

  useEffect(() => {
    async function handleCommentFormSubmit() {
      console.log('comment form submitted');
    }

    if (triggerFormSubmit) {
      handleCommentFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displayCreateCommentFormPage}</>;
}

export { CreateComment };
