import { ChangeEvent, useEffect, useReducer, useRef } from 'react';

import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../constants/regex';
import {
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
} from '../../jsxCreators';
import { returnGrammarValidationText } from '../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../wrappers';
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

  // following are the accessible text elements for screen readers to read out based on the state of the input
  //  const [planNameInputErrorText, planNameInputValidText] =
  //  returnAccessibleTextElements({
  //    inputElementKind: 'plan name',
  //    inputText: planName,
  //    isValidInputText: isValidPlanName,
  //    isInputTextFocused: isPlanNameFocused,
  //    regexValidationText: returnGrammarValidationText({
  //      content: planName,
  //      contentKind: 'plan name input',
  //      minLength: 1,
  //      maxLength: 50,
  //    }),
  //  });

  const [commentInputErrorText, commentInputValidText] =
    returnAccessibleTextElements({
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
    placeholder: 'Enter your comment here',
    semanticName: 'comment',
    required: true,
    withAsterisk: true,
  };

  return <h6>CreateComment</h6>;
}

export { CreateComment };
