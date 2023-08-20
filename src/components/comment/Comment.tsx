import {
  Badge,
  Blockquote,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import {
  HiOutlineExclamationCircle,
  HiExclamationCircle,
} from 'react-icons/hi';
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
  TbCornerUpLeft,
  TbUpload,
} from 'react-icons/tb';

import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../constants/regex';
import { useAuth, useGlobalState } from '../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
} from '../../jsxCreators';
import { ResourceRequestServerResponse } from '../../types';
import {
  addFieldsToObject,
  formatDate,
  logState,
  returnGrammarValidationText,
  urlBuilder,
} from '../../utils';
import { CustomNotification } from '../customNotification';
import {
  AccessibleButtonCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
} from '../wrappers';
import { commentAction, commentReducer, initialCommentState } from './state';
import {
  CommentDocument,
  CommentProps,
  CreatedCommentsSectionObject,
  GetCommentsServerResponse,
} from './types';
import { JsxElement } from 'typescript';
import { VscQuote } from 'react-icons/vsc';
import { PageBuilder } from '../pageBuilder';
import {
  COMMENT_LIMIT_PER_PAGE_SELECT_DATA,
  COMMENT_QUERY_DATA,
} from './constants';
import { QueryBuilder } from '../queryBuilder';

function Comment({ parentResourceId = '' }: CommentProps) {
  /** ------------- begin hooks ------------- */
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    initialCommentState
  );
  const {
    newComment,
    isNewCommentValid,
    isNewCommentFocused,

    quotedComment,
    reactedRequestBody,
    totalDocuments,
    numberOfPages,
    limitPerPage,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,
    areCommentsVisible,

    commentIdsToFetch,
    commentsMap,

    triggerCommentUpdate,
    triggerCommentSubmit,

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
    authState: { userId, username, accessToken },
  } = useAuth();

  const {
    globalState: { padding, rowGap, width, userDocument },
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
    let isMounted = true;
    const controller = new AbortController();

    async function fetchComments() {
      commentDispatch({
        type: commentAction.setIsLoading,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: `/api/v1/comment/parentResource/${parentResourceId}/`,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&limit=${limitPerPage}`,
      });

      const request: Request = new Request(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: GetCommentsServerResponse = await response.json();

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

        const { resourceData } = data;

        const commentsMap = resourceData.reduce(
          (commentsMapAcc, commentDoc) => {
            commentsMapAcc.set(commentDoc._id, commentDoc);

            return commentsMapAcc;
          },
          new Map<string, CommentDocument>()
        );
        commentDispatch({
          type: commentAction.setCommentsMap,
          payload: { commentsMap },
        });

        commentDispatch({
          type: commentAction.setTotalDocuments,
          payload: data.totalDocuments ?? totalDocuments,
        });

        commentDispatch({
          type: commentAction.setNumberOfPages,
          payload: data.pages ?? numberOfPages,
        });

        console.log('fetchComments() data', data);
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
  }, [newQueryFlag, pageQueryString, queryBuilderString, limitPerPage]);

  // update user reaction: liked, disliked or reported
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function updateUserReaction() {
      commentDispatch({
        type: commentAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: '/api/v1/comment/',
      });

      const request: Request = new Request(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reactedRequestBody),
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: {
          message: string;
          resourceData: [CommentDocument];
        } = await response.json();

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

        commentDispatch({
          type: commentAction.updateCommentsMap,
          payload: {
            commentDoc: data.resourceData[0],
          },
        });

        console.log('updateUserReaction() data', data);
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
          type: commentAction.setTriggerCommentSubmit,
          payload: false,
        });
      }
    }

    if (triggerCommentUpdate) {
      updateUserReaction();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerCommentUpdate]);

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
        jobPosition: userDocument?.jobPosition,
        department: userDocument?.department,
        profilePictureUrl: userDocument?.profilePictureUrl,
        parentResourceId: parentResourceId,
        comment: newComment,
        quotedComment,
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

        commentDispatch({
          type: commentAction.setIsSuccessful,
          payload: true,
        });
        commentDispatch({
          type: commentAction.setSuccessMessage,
          payload: data.message,
        });

        console.log('submitComment() data', data);
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
          type: commentAction.setTriggerCommentSubmit,
          payload: false,
        });
      }
    }

    if (triggerCommentSubmit) {
      submitComment();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerCommentSubmit]);

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
          successPath: `/portal/outreach/announcement/display/${parentResourceId}`,
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
  const limitPerPageSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: COMMENT_LIMIT_PER_PAGE_SELECT_DATA,
    description: 'Select number of comments to display per page',
    label: 'Comments per page',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      commentDispatch({
        type: commentAction.setLimitPerPage,
        payload: event.currentTarget.value,
      });
    },
    value: limitPerPage,
  };

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
        type: commentAction.setTriggerCommentSubmit,
        payload: true,
      });
      closeCommentModal();
    },
  };

  /** ------------- end input creator info objects ------------- */

  /** ------------- begin input creators ------------- */

  const createdCommentsSectionObjectsArray = Array.from(commentsMap).map(
    ([commentId, commentDoc]: [string, CommentDocument]) => {
      const {
        profilePictureUrl,
        username,
        jobPosition,
        department,
        comment,
        quotedComment,
        likesCount,
        dislikesCount,
        reportsCount,
        isFeatured,
        isDeleted,
        likedUserIds,
        dislikedUserIds,
        reportedUserIds,
        createdAt,
        updatedAt,
      } = commentDoc;

      const usernameElement = (
        <Text color="dark" size="sm">
          {username}
        </Text>
      );
      const jobPositionElement = (
        <Text color="dark" size="sm">
          {jobPosition}
        </Text>
      );
      const departmentElement = (
        <Text color="dark" size="sm">
          {department}
        </Text>
      );
      const profilePicElement = (
        <Image
          maw="auto"
          mx="auto"
          width={width < 480 ? '2rem' : '5rem'}
          radius={9999}
          src={profilePictureUrl}
          alt={`profile pic of ${username}`}
          withPlaceholder
        />
      );

      const commentElement = (
        <Text color="dark" size="sm">
          {isDeleted ? 'Comment has been deleted' : comment}
        </Text>
      );
      const quotedCommentElement = quotedComment ? (
        <Blockquote
          icon={<VscQuote />}
          style={{ borderLeft: '2px solid #e0e0e0' }}
        >
          <Text color="dark" size="sm">
            {quotedComment}
          </Text>
        </Blockquote>
      ) : null;

      const likesCountElement = (
        <Text color="dark" size="sm">
          {likesCount}
        </Text>
      );
      const dislikesCountElement = (
        <Text color="dark" size="sm">
          {dislikesCount}
        </Text>
      );
      const totalLikesDislikesElement = (
        <Text color="dark" size="sm">
          {likesCount + dislikesCount}
        </Text>
      );
      const reportsCountElement = (
        <Text color="dark" size="sm">
          {reportsCount}
        </Text>
      );

      const [
        replyButtonElement,
        likeButtonElement,
        dislikeButtonElement,
        reportButtonElement,
      ] = returnAccessibleButtonElements([
        // reply with quote button
        {
          buttonLabel: 'Quote',
          semanticDescription: 'quote comment button',
          semanticName: 'quoteCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setQuotedComment,
              payload: comment,
            });
            openCommentModal();
          },
          leftIcon: <TbCornerUpLeft />,
        },
        // like button
        {
          buttonLabel: 'Like',
          semanticDescription: 'like comment button',
          semanticName: 'likeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedRequestBody,
              payload: {
                commentId,
                userId,
                field: 'likes',
                value: likedUserIds.includes(userId) ? false : true,
              },
            });
            commentDispatch({
              type: commentAction.setTriggerCommentUpdate,
              payload: true,
            });
          },
          leftIcon: likedUserIds.includes(userId) ? (
            <TbArrowBigUpFilled />
          ) : (
            <TbArrowBigUp />
          ),
        },
        // dislike button
        {
          buttonLabel: 'Dislike',
          semanticDescription: 'dislike comment button',
          semanticName: 'dislikeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedRequestBody,
              payload: {
                commentId,
                userId,
                field: 'dislikes',
                value: dislikedUserIds.includes(userId) ? false : true,
              },
            });
            commentDispatch({
              type: commentAction.setTriggerCommentUpdate,
              payload: true,
            });
          },
          leftIcon: dislikedUserIds.includes(userId) ? (
            <TbArrowBigDownFilled />
          ) : (
            <TbArrowBigDown />
          ),
        },
        // report button
        {
          buttonLabel: 'Report',
          semanticDescription: 'report comment button',
          semanticName: 'reportCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedRequestBody,
              payload: {
                commentId,
                userId,
                field: 'reports',
                value: reportedUserIds.includes(userId) ? false : true,
              },
            });
            commentDispatch({
              type: commentAction.setTriggerCommentUpdate,
              payload: true,
            });
          },
          leftIcon: reportedUserIds.includes(userId) ? (
            <HiExclamationCircle />
          ) : (
            <HiOutlineExclamationCircle />
          ),
        },
      ]);

      const replyButtonWithTooltip = (
        <Tooltip label={`Reply to ${username}'s comment`}>
          <Group>{replyButtonElement}</Group>
        </Tooltip>
      );
      const likeButtonWithTooltip = (
        <Tooltip label={`Like ${username}'s comment`}>
          <Group>{likeButtonElement}</Group>
        </Tooltip>
      );
      const dislikeButtonWithTooltip = (
        <Tooltip label={`Dislike ${username}'s comment`}>
          <Group>{dislikeButtonElement}</Group>
        </Tooltip>
      );
      const reportButtonWithTooltip = (
        <Tooltip label={`Report ${username}'s comment as inappropriate`}>
          <Group>{reportButtonElement}</Group>
        </Tooltip>
      );

      const createdAtDateTime = formatDate({
        date: createdAt,
        locale: 'en-US',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'long',
          hour12: false,
        },
      });
      const updatedAtDateTime = formatDate({
        date: updatedAt,
        locale: 'en-US',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'long',
          hour12: false,
        },
      });
      const createdAtElement = (
        <Text color="dark" size="sm">
          {createdAtDateTime}
        </Text>
      );
      const updatedAtElement = (
        <Text color="dark" size="sm">
          {updatedAtDateTime}
        </Text>
      );

      const isFeaturedElement = isFeatured ? (
        <Badge
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          Featured
        </Badge>
      ) : null;

      const createdCommentsSectionObject =
        addFieldsToObject<CreatedCommentsSectionObject>({
          object: Object.create(null),
          fieldValuesTuples: [
            ['usernameElement', usernameElement],
            ['jobPositionElement', jobPositionElement],
            ['departmentElement', departmentElement],
            ['profilePicElement', profilePicElement],

            ['commentElement', commentElement],
            ['quotedCommentElement', quotedCommentElement],

            ['likesCountElement', likesCountElement],
            ['dislikesCountElement', dislikesCountElement],
            ['totalLikesDislikesElement', totalLikesDislikesElement],
            ['reportsCountElement', reportsCountElement],

            ['replyButtonElement', replyButtonWithTooltip],
            ['likeButtonElement', likeButtonWithTooltip],
            ['dislikeButtonElement', dislikeButtonWithTooltip],
            ['reportButtonElement', reportButtonWithTooltip],

            ['isFeaturedElement', isFeaturedElement],
            ['createdAtElement', createdAtElement],
            ['updatedAtElement', updatedAtElement],
          ],
        });

      return createdCommentsSectionObject;
    }
  );

  const createdLimitPerPageSelectInput = returnAccessibleSelectInputElements([
    limitPerPageSelectInputCreatorInfo,
  ]);

  const [createdCommentTextAreaInput] = returnAccessibleTextAreaInputElements([
    commentTextAreaInputCreatorInfo,
  ]);

  const [createdSubmitCommentButton, createdReplyCommentButton] =
    returnAccessibleButtonElements([
      submitButtonCreatorInfo,
      replyButtonCreatorInfo,
    ]);
  /** ------------- end input creators ------------- */

  /** ------------- begin input displays ------------- */
  const displayCommentsSectionObjects = createdCommentsSectionObjectsArray.map(
    (createdCommentsSectionObject: CreatedCommentsSectionObject, index) => {
      const {
        usernameElement,
        jobPositionElement,
        departmentElement,
        profilePicElement,

        commentElement,
        quotedCommentElement,

        likesCountElement,
        dislikesCountElement,
        totalLikesDislikesElement,
        reportsCountElement,

        replyButtonElement,
        likeButtonElement,
        dislikeButtonElement,
        reportButtonElement,

        isFeaturedElement,
        createdAtElement,
        updatedAtElement,
      } = createdCommentsSectionObject;

      // user info section desktop
      const userInfoSectionDesktop = (
        <Stack
          w="100%"
          h="100%"
          spacing={rowGap}
          align="center"
          justify="center"
          style={{ outline: '1px solid teal' }}
        >
          {profilePicElement}
          {usernameElement}
          {jobPositionElement}
          {departmentElement}
        </Stack>
      );
      // user info section mobile
      const userInfoSectionMobile = (
        <Group w="100%" spacing={rowGap}>
          {profilePicElement}
          <Stack spacing={rowGap} align="center" justify="flex-start">
            {usernameElement}
            {jobPositionElement}
            {departmentElement}
          </Stack>
        </Group>
      );

      // comment section header desktop
      const commentSectionHeaderDesktop = (
        <Group
          w="100%"
          spacing={rowGap}
          align="center"
          style={{ borderBottom: '1px solid #e0e0e0' }}
          p={padding}
        >
          {createdAtElement}
          {updatedAtElement}
          {isFeaturedElement}
        </Group>
      );
      // comment section header mobile
      const commentSectionHeaderMobile = (
        <Stack w="100%" spacing={rowGap} align="center">
          {isFeaturedElement}
          {createdAtElement}
          {updatedAtElement}
        </Stack>
      );

      // comment section desktop
      const commentSectionDesktop = (
        <Stack
          w="100%"
          spacing={rowGap}
          align="center"
          justify="flex-start"
          p={padding}
        >
          {quotedCommentElement}
          <Space h={rowGap} />
          {commentElement}
        </Stack>
      );
      // comment section mobile
      const commentSectionMobile = (
        <Stack w="100%" spacing={rowGap} align="center">
          {quotedCommentElement}
          {commentElement}
        </Stack>
      );

      // comment section footer desktop
      const commentSectionFooterDesktop = (
        <Group
          w="100%"
          spacing={rowGap}
          p={padding}
          align="center"
          style={{ borderTop: '1px solid #e0e0e0' }}
        >
          {likeButtonElement}
          {likesCountElement}
          {dislikeButtonElement}
          {dislikesCountElement}
          {reportButtonElement}
          {reportsCountElement}
          {replyButtonElement}
        </Group>
      );
      // comment section footer mobile
      const commentSectionFooterMobile = (
        <Stack w="100%" spacing={rowGap} align="center">
          {likeButtonElement}
          {likesCountElement}
          {dislikeButtonElement}
          {dislikesCountElement}
          {reportButtonElement}
          {reportsCountElement}
          {replyButtonElement}
        </Stack>
      );

      // comment section full desktop
      const createdCommentSectionDesktop = (
        <Grid columns={10} w="100%">
          <Grid.Col span={3}>{userInfoSectionDesktop}</Grid.Col>
          <Grid.Col span={7}>
            {commentSectionHeaderDesktop}
            {commentSectionDesktop}
            {commentSectionFooterDesktop}
          </Grid.Col>
        </Grid>
      );
      // comment section full mobile
      const createdCommentSectionMobile = (
        <Stack w="100%">
          {userInfoSectionMobile}
          {commentSectionHeaderMobile}
          {commentSectionMobile}
          {commentSectionFooterMobile}
        </Stack>
      );

      return (
        <Group
          key={`${index}`}
          w="100%"
          p={padding}
          style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
        >
          {width < 480
            ? createdCommentSectionMobile
            : createdCommentSectionDesktop}
        </Group>
      );
    }
  );

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

  const createdCommentModal = (
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

  const displayCommentsSection = commentsMap.size ? (
    <Stack>
      {createdReplyCommentButton}
      {displayCommentsSectionObjects}
    </Stack>
  ) : (
    <Group w={width < 480 ? '85%' : '62%'} px={padding}>
      <Text color="dark" size="sm" pr={padding}>
        Be the first to comment!
      </Text>
      {createdReplyCommentButton}
    </Group>
  );

  const displayQueryBuilder = (
    <QueryBuilder
      collectionName="Comments"
      componentQueryData={COMMENT_QUERY_DATA}
      disableProjection={true}
      parentComponentDispatch={commentDispatch}
      setQueryBuilderString={commentAction.setQueryBuilderString}
    />
  );

  const displayPagination = (
    <PageBuilder
      total={numberOfPages}
      setPageQueryString={commentAction.setPageQueryString}
      parentComponentDispatch={commentDispatch}
    />
  );

  const displayPaginationAndLimitPerPageSelectInput = (
    <Group w="100%" position="apart" py={padding}>
      <Group position="left">{displayPagination}</Group>
      <Group position="right" w="38%">
        {createdLimitPerPageSelectInput}
      </Group>
    </Group>
  );

  const displayCommentFormPage = (
    <Group w="100%" position="center" py={padding}>
      {createdCommentModal}
      {/* {displayQueryBuilder} */}
      {displayPaginationAndLimitPerPageSelectInput}
      {displayCommentsSection}
    </Group>
  );
  /** ------------- end input displays ------------- */

  return displayCommentFormPage;
}

export { Comment };
