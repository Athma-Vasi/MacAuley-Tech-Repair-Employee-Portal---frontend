import { Flex, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { TbUpload } from 'react-icons/tb';

import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleTextAreaInputElements,
} from '../../jsxCreators';
import { logState, returnGrammarValidationText, urlBuilder } from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  FormLayoutWrapper,
} from '../wrappers';
import { commentAction, commentReducer, initialCommentState } from './state';
import { CommentDocument, CommentProps } from './types';
import { useDisclosure } from '@mantine/hooks';
import { FaRegCommentDots } from 'react-icons/fa';
import { useAuth, useGlobalState } from '../../hooks';
import { CustomNotification } from '../customNotification';
import {
  GetQueriedResourceRequestServerResponse,
  ResourceRequestServerResponse,
} from '../../types';
import { InvalidTokenError } from 'jwt-decode';

function Comment({
  commentIds,
  setNewCommentIdDispatch,
  parentParamId = '',
}: CommentProps) {
  /** ------------- begin hooks ------------- */
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    initialCommentState
  );
  const {
    newComment,
    isNewCommentValid,
    isNewCommentFocused,

    commentsArray,

    triggerFormSubmit,

    pages,
    totalDocuments,
    pageQueryString,
    queryBuilderString,
    newQueryFlag,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isLoading,
    loadingMessage,
    isSuccessful,
    successMessage,
  } = commentState;

  const {
    authState: { username, accessToken },
  } = useAuth();

  const {
    globalState: { padding, rowGap, width },
    globalDispatch,
  } = useGlobalState();

  const [
    openedCommentModal,
    { open: openCommentModal, close: closeCommentModal },
  ] = useDisclosure(false);
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // fetch comments
  useEffect(() => {
    if (!commentIds.length) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    // REFACTOR SO THAT YOU ARE ONLY FETCHING COMMENTS FROM COMMENT IDS

    async function fetchComments() {
      commentDispatch({
        type: commentAction.setIsLoading,
        payload: true,
      });

      const requestObjsArr = commentIds.map((commentId) => {
        const url: URL = urlBuilder({
          path: `/api/v1/comment/${commentId}`,
          // query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`,
        });

        const request: Request = new Request(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        });

        return request;
      });

      try {
        const dataObjArr = await Promise.all(
          requestObjsArr.map(async (requestObj) => {
            const response = await fetch(requestObj);
            const data: ResourceRequestServerResponse<CommentDocument> =
              await response.json();

            return { response, data };
          })
        );

        if (!isMounted) {
          return;
        }

        console.log('dataObjArr', dataObjArr);

        const isAnyResponseNotOk = dataObjArr.find(
          (dataObj) => !dataObj.response.ok
        );
        if (isAnyResponseNotOk) {
          commentDispatch({
            type: commentAction.setIsError,
            payload: true,
          });
          commentDispatch({
            type: commentAction.setErrorMessage,
            payload: isAnyResponseNotOk.data.message,
          });

          return;
        }

        dataObjArr.forEach((dataObj) => {
          const {
            response: { ok },
            data: { message, resourceData },
          } = dataObj;

          resourceData.forEach((commentDoc) => {
            commentDispatch({
              type: commentAction.setCommentsArray,
              payload: commentDoc,
            });
          });
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.name === 'AbortError') {
          return;
        }

        commentDispatch({
          type: commentAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? commentDispatch({
              type: commentAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error.response
          ? commentDispatch({
              type: commentAction.setErrorMessage,
              payload: 'No response from server',
            })
          : commentDispatch({
              type: commentAction.setErrorMessage,
              payload:
                error.message ?? 'Unknown error occurred. Please try again.',
            });
      } finally {
        commentDispatch({
          type: commentAction.setIsLoading,
          payload: false,
        });
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // submit comment
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitComment() {
      commentDispatch({
        type: commentAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: '/api/v1/comment',
      });

      const comment = {
        parentCommentId: [],
        childrenIds: [],
        comment: newComment,
        repliesCount: 0,
        likesCount: 0,
        dislikesCount: 0,
        reportsCount: 0,
        isFeatured: false,
        isDeleted: false,
      };

      const request: Request = new Request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          comment,
        }),
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: ResourceRequestServerResponse<CommentDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }

        const { ok } = response;
        if (!ok) {
          commentDispatch({
            type: commentAction.setIsError,
            payload: true,
          });
          commentDispatch({
            type: commentAction.setErrorMessage,
            payload: data.message,
          });
          return;
        }

        // dispatch new comment id to parent component
        setNewCommentIdDispatch({
          type: 'setNewCommentId',
          payload: data.resourceData[0]._id,
        });

        commentDispatch({
          type: commentAction.setIsSuccessful,
          payload: true,
        });
        commentDispatch({
          type: commentAction.setSuccessMessage,
          payload: data.message,
        });

        console.log('data', data);
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.name === 'AbortError') {
          return;
        }

        commentDispatch({
          type: commentAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? commentDispatch({
              type: commentAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error.response
          ? commentDispatch({
              type: commentAction.setErrorMessage,
              payload: 'No response from server',
            })
          : commentDispatch({
              type: commentAction.setErrorMessage,
              payload:
                error.message ?? 'Unknown error occurred. Please try again.',
            });
      } finally {
        commentDispatch({
          type: commentAction.setIsSubmitting,
          payload: false,
        });
        commentDispatch({
          type: commentAction.setTriggerFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerFormSubmit) {
      submitComment();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFormSubmit]);

  // sets focus to comment text area on page load
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    commentTextAreaRef.current?.focus();
  }, [openedCommentModal]);

  // validate comment on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(newComment);

    commentDispatch({
      type: commentAction.setIsNewCommentValid,
      payload: isValid,
    });
  }, [newComment]);

  useEffect(() => {
    logState({
      state: commentState,
      groupLabel: 'commentState',
    });
  }, [commentState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isError || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        errorMessage={errorMessage}
        isLoading={isLoading}
        isError={isError}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={commentDispatch}
        navigateTo={{
          errorPath: '/portal',
          successPath: `/portal/outreach/announcement/display/${parentParamId}`,
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  /** ------------- begin accessible texts ------------- */
  const [newCommentInputErrorText, newCommentInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'comment',
      inputText: newComment,
      isValidInputText: isNewCommentValid,
      isInputTextFocused: isNewCommentFocused,
      regexValidationText: returnGrammarValidationText({
        content: newComment,
        contentKind: 'comment input',
        minLength: 2,
        maxLength: 2000,
      }),
    });
  /** ------------- end accessible texts ------------- */

  /** ------------- begin input creator info objects ------------- */
  const commentTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: newCommentInputErrorText,
      valid: newCommentInputValidText,
    },
    inputText: newComment,
    isValidInputText: isNewCommentValid,
    onBlur: () => {
      commentDispatch({
        type: commentAction.setIsNewCommentFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      commentDispatch({
        type: commentAction.setNewComment,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      commentDispatch({
        type: commentAction.setIsNewCommentFocused,
        payload: true,
      });
    },
    label: `${username}: `,
    placeholder: 'Enter your comment here',
    ref: openedCommentModal ? commentTextAreaRef : null,
    semanticName: 'comment',
    required: true,
  };

  const replyButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Reply',
    semanticDescription: 'create comment form reply button',
    semanticName: 'reply button',
    leftIcon: <TbUpload />,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      openCommentModal();
    },
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    leftIcon: <FaRegCommentDots />,
    rightIcon: <TbUpload />,
    semanticDescription: 'Button to submit comment',
    semanticName: 'submitCommentButton',
    buttonDisabled: !isNewCommentValid,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      commentDispatch({
        type: commentAction.setTriggerFormSubmit,
        payload: true,
      });
      closeCommentModal();
    },
  };
  /** ------------- end input creator info objects ------------- */

  const [createdCommentTextAreaInput] = returnAccessibleTextAreaInputElements([
    commentTextAreaInputCreatorInfo,
  ]);

  const [createdSubmitCommentButton, createdReplyCommentButton] =
    returnAccessibleButtonElements([
      submitButtonCreatorInfo,
      replyButtonCreatorInfo,
    ]);

  const displayCommentAndSubmit = (
    <Stack
      w="100%"
      p={padding}
      // style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
    >
      {createdCommentTextAreaInput}
      <Group position="right">{createdSubmitCommentButton}</Group>
    </Stack>
  );

  const commentModalTitle = (
    <Title
      order={5}
      style={{ borderBottom: '1px solid #e0e0e0' }}
      color="dark"
      pr={padding}
    >
      You are commenting to:
    </Title>
  );

  const displayCommentModal = (
    <Modal
      opened={openedCommentModal}
      onClose={() => {
        closeCommentModal();
      }}
      centered
      size={width < 480 ? 'calc(100% - 3rem)' : '640px'}
      title={commentModalTitle}
    >
      {displayCommentAndSubmit}
    </Modal>
  );

  const displayCommentsSection = commentIds.length ? (
    <Stack>
      {commentsArray.map((commentDoc, commentIdx) => {
        const displayComment = (
          <Text color="dark" key={`${commentIdx}`}>
            {commentDoc.comment}
          </Text>
        );
        return displayComment;
      })}
      {createdReplyCommentButton}
    </Stack>
  ) : (
    <Group w={width < 480 ? '85%' : '62%'} px={padding}>
      <Title order={5} color="dark" pr={padding}>
        Be the first one to comment!
      </Title>
      {createdReplyCommentButton}
    </Group>
  );

  const displayCommentFormPage = (
    <Group w="100%" position="center" py={padding}>
      {displayCommentModal}
      {displayCommentsSection}
    </Group>
  );

  return displayCommentFormPage;
}

export { Comment };
