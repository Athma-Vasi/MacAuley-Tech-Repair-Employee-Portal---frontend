import {
  Badge,
  Blockquote,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Pagination,
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
  useState,
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
  TbPhotoOff,
  TbUpload,
  TbUser,
  TbBrandFacebook,
  TbBrandMastodon,
  TbBrandWhatsapp,
  TbFilter,
} from 'react-icons/tb';

import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialGithub,
  TiSocialInstagram,
  TiSocialLinkedin,
} from 'react-icons/ti';

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

    quotedUsername,
    quotedComment,

    reactedCommentId,
    reactedRequestBody,

    totalDocuments,
    numberOfPages,
    limitPerPage,
    resetPage,
    newQueryFlag,
    queryBuilderString,
    pageQueryString,
    areCommentsVisible,

    commentIdsToFetch,
    commentsMap,

    triggerCommentFetch,
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

  // const hasFetchedComments = useRef(false);
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
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=0&limit=${limitPerPage}`,
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
          payload: data.pages ? data.pages : 1,
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
        commentDispatch({
          type: commentAction.setNewQueryFlag,
          payload: false,
        });
        commentDispatch({
          type: commentAction.setTriggerCommentFetch,
          payload: false,
        });
      }
    }

    if (triggerCommentFetch) {
      fetchComments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerCommentFetch]);

  // on component mount, set trigger comment fetch to true
  useEffect(() => {
    commentDispatch({
      type: commentAction.setTriggerCommentFetch,
      payload: true,
    });
  }, []);

  // whenever the following changes, trigger comment fetch
  useEffect(() => {
    commentDispatch({
      type: commentAction.setTriggerCommentFetch,
      payload: true,
    });
  }, [newQueryFlag, queryBuilderString, pageQueryString]);

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
        path: `/api/v1/comment/${reactedCommentId}`,
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
          type: commentAction.setTriggerCommentUpdate,
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
        path: '/api/v1/comment/',
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

  // when limit per page changes, trigger reset page
  useEffect(() => {
    commentDispatch({
      type: commentAction.setResetPage,
      payload: false,
    });
  }, [limitPerPage]);

  // whenever query builder string changes, trigger new query flag
  useEffect(() => {
    commentDispatch({
      type: commentAction.setNewQueryFlag,
      payload: true,
    });
  }, [queryBuilderString]);

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
  // if (isLoading || isError || isSubmitting || isSuccessful) {
  //   return (
  //     <CustomNotification
  //       errorMessage={errorMessage}
  //       isLoading={isLoading}
  //       isError={isError}
  //       isSubmitting={isSubmitting}
  //       isSuccessful={isSuccessful}
  //       loadingMessage={loadingMessage}
  //       successMessage={successMessage}
  //       submitMessage={submitMessage}
  //       parentDispatch={commentDispatch}
  //       navigateTo={{
  //         errorPath: '/portal',
  //         successPath: `/portal/outreach/announcement/display/${parentResourceId}`,
  //       }}
  //     />
  //   );
  // }
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
      commentDispatch({
        type: commentAction.setResetPage,
        payload: true,
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
      commentDispatch({
        type: commentAction.setQuotedComment,
        payload: '',
      });
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
        quotedUsername,
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

      const usernameElementWithTooltip = (
        <Tooltip label={`Filter comments by ${username}`}>
          <Text
            color="dark"
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&username[in]=${username}`,
              });
            }}
          >
            <strong>{username}</strong>
          </Text>
        </Tooltip>
      );
      const jobPositionElementWithTooltip = (
        <Tooltip label={`Filter comments by ${jobPosition}s`}>
          <Text
            color="dark"
            size="sm"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&jobPosition[in]=${jobPosition}`,
              });
            }}
          >
            {jobPosition}
          </Text>
        </Tooltip>
      );

      const departmentElementWithTooltip = (
        <Tooltip label={`Filter comments by ${department} members`}>
          <Text
            color="dark"
            size="sm"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&department[in]=${department}`,
              });
            }}
          >
            {department}
          </Text>
        </Tooltip>
      );

      const profilePicElement = (
        <Image
          width={width < 640 ? 48 : 96}
          height={width < 640 ? 48 : 96}
          radius={9999}
          src={profilePictureUrl}
          alt={`profile pic of ${username}`}
          withPlaceholder
          placeholder={<TbPhotoOff size={width < 640 ? 16 : 28} />}
        />
      );

      const createdSocialMediaIcons = (
        <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
          <Tooltip label="Github">
            <Group>
              <TiSocialGithub
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="Mastodon">
            <Group>
              <TbBrandMastodon
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="Facebook">
            <Group>
              <TbBrandFacebook
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="WhatsApp">
            <Group>
              <TbBrandWhatsapp
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="LinkedIn">
            <Group>
              <TiSocialLinkedin
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="Instagram">
            <Group>
              <TiSocialInstagram
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="Flickr">
            <Group>
              <TiSocialFlickr
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>

          <Tooltip label="Dribbble">
            <Group>
              <TiSocialDribbble
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: 'dimgray' }}
              />
            </Group>
          </Tooltip>
        </Flex>
      );

      const commentElement = (
        <Text color="dark" size="sm">
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
          {isDeleted ? 'Comment has been deleted' : comment}
        </Text>
      );
      const quotedUsernameElement = quotedUsername ? (
        <Text color="teal" size="sm">
          {quotedUsername} commented:
        </Text>
      ) : null;
      const quotedCommentElement = quotedComment ? (
        <Blockquote icon={<VscQuote />}>
          <Text color="dark" size="sm">
            {quotedComment}
            {quotedComment}
            {quotedComment}
            {quotedComment}
          </Text>
        </Blockquote>
      ) : null;

      const likesCountWithTooltipElement = (
        <Tooltip label={`${likesCount} people have liked this comment`}>
          <Text color="dark" size="sm">
            {likesCount}
          </Text>
        </Tooltip>
      );
      const dislikesCountWithTooltipElement = (
        <Tooltip label={`${dislikesCount} people have disliked this comment`}>
          <Text color="dark" size="sm">
            {dislikesCount}
          </Text>
        </Tooltip>
      );
      const totalLikesDislikesWithTooltipElement = (
        <Tooltip label="Overall feeling towards this comment">
          <Text color="dark" size="sm">
            {likesCount + dislikesCount}
          </Text>
        </Tooltip>
      );
      const reportsCountWithTooltipElement = (
        <Tooltip label={`${reportsCount} people have reported this comment`}>
          <Text color="dark" size="sm">
            {reportsCount}
          </Text>
        </Tooltip>
      );

      const [
        replyButtonElement,
        likeButtonElement,
        dislikeButtonElement,
        reportButtonElement,
        filterByUserButtonElement,
      ] = returnAccessibleButtonElements([
        // reply with quote button
        {
          buttonLabel: 'Quote',
          semanticDescription: 'quote comment button',
          semanticName: 'quoteCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setQuotedUsername,
              payload: username,
            });
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
          buttonLabel: likedUserIds.includes(userId) ? (
            <TbArrowBigUpFilled />
          ) : (
            <TbArrowBigUp />
          ),
          // buttonDisabled: likedUserIds.includes(userId),
          buttonVariant: likedUserIds.includes(userId) ? 'outline' : 'subtle',
          buttonStyle: { borderRadius: 9999 },
          semanticDescription: 'like comment button',
          semanticName: 'likeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
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
        },
        // dislike button
        {
          buttonLabel: dislikedUserIds.includes(userId) ? (
            <TbArrowBigDownFilled />
          ) : (
            <TbArrowBigDown />
          ),
          // buttonDisabled: dislikedUserIds.includes(userId),
          buttonVariant: dislikedUserIds.includes(userId)
            ? 'outline'
            : 'subtle',
          buttonStyle: { borderRadius: 9999 },
          semanticDescription: 'dislike comment button',
          semanticName: 'dislikeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
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
        },
        // report button
        {
          buttonLabel: reportedUserIds.includes(userId) ? (
            <HiExclamationCircle />
          ) : (
            <HiOutlineExclamationCircle />
          ),
          // buttonDisabled: reportedUserIds.includes(userId),
          buttonVariant: reportedUserIds.includes(userId)
            ? 'outline'
            : 'subtle',
          buttonStyle: { borderRadius: 9999 },
          semanticDescription: 'report comment button',
          semanticName: 'reportCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
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
        },
      ]);

      const replyButtonWithTooltip = (
        <Tooltip label={`Reply to ${username}'s comment`}>
          <Group>{replyButtonElement}</Group>
        </Tooltip>
      );
      const likeButtonWithTooltip = (
        <Tooltip
          label={
            likedUserIds.includes(userId)
              ? `Undo like of ${username}'s comment`
              : `Like ${username}'s comment`
          }
        >
          <Group>{likeButtonElement}</Group>
        </Tooltip>
      );
      const dislikeButtonWithTooltip = (
        <Tooltip
          label={
            dislikedUserIds.includes(userId)
              ? `Undo dislike of ${username}'s comment`
              : `Dislike ${username}'s comment`
          }
        >
          <Group>{dislikeButtonElement}</Group>
        </Tooltip>
      );
      const reportButtonWithTooltip = (
        <Tooltip
          label={
            reportedUserIds.includes(userId)
              ? `Undo report of ${username}'s comment`
              : `Report ${username}'s comment`
          }
        >
          <Group>{reportButtonElement}</Group>
        </Tooltip>
      );

      const [createdAtDateTime, updatedAtDateTime] = [createdAt, updatedAt].map(
        (date: string) =>
          formatDate({
            date,
            locale: 'en-US',
            formatOptions: {
              dateStyle: width < 640 ? 'short' : 'full',
              timeStyle: width < 640 ? 'short' : 'long',
              hour12: false,
            },
          })
      );

      const createdAtElementWithTooltip = (
        <Tooltip label="Comment created">
          <Text color="dark" size="sm">
            Created: {createdAtDateTime}
          </Text>
        </Tooltip>
      );
      const updatedAtElementWithTooltip =
        new Date(createdAt).getTime() ===
        new Date(updatedAt).getTime() ? null : (
          <Tooltip label="Comment last updated">
            <Text color="dark" size="sm">
              Updated: {updatedAtDateTime}
            </Text>
          </Tooltip>
        );

      const filterByUserButtonWithTooltip = (
        <Tooltip label={`Filter by ${username}`}>
          <Group>{filterByUserButtonElement}</Group>
        </Tooltip>
      );

      const isFeaturedElement = isFeatured ? (
        <Badge
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          style={{ borderRadius: '0px 4px 0px 4px' }}
        >
          Featured
        </Badge>
      ) : null;

      const createdCommentsSectionObject =
        addFieldsToObject<CreatedCommentsSectionObject>({
          object: Object.create(null),
          fieldValuesTuples: [
            ['usernameElement', usernameElementWithTooltip],
            ['jobPositionElement', jobPositionElementWithTooltip],
            ['departmentElement', departmentElementWithTooltip],
            ['profilePicElement', profilePicElement],
            ['socialMediaIconsElement', createdSocialMediaIcons],

            ['commentElement', commentElement],
            ['quotedUsernameElement', quotedUsernameElement],
            ['quotedCommentElement', quotedCommentElement],

            ['likesCountElement', likesCountWithTooltipElement],
            ['dislikesCountElement', dislikesCountWithTooltipElement],
            ['totalLikesDislikesElement', totalLikesDislikesWithTooltipElement],
            ['reportsCountElement', reportsCountWithTooltipElement],

            ['replyButtonElement', replyButtonWithTooltip],
            ['likeButtonElement', likeButtonWithTooltip],
            ['dislikeButtonElement', dislikeButtonWithTooltip],
            ['reportButtonElement', reportButtonWithTooltip],

            ['isFeaturedElement', isFeaturedElement],
            ['createdAtElement', createdAtElementWithTooltip],
            ['updatedAtElement', updatedAtElementWithTooltip],
            ['filterByUserElement', filterByUserButtonWithTooltip],
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
        socialMediaIconsElement,

        commentElement,
        quotedUsernameElement,
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
          px={padding}
          spacing={rowGap}
          align="flex-start"
          justify="center"
          style={{ borderRight: '1px solid #e0e0e0' }}
        >
          {profilePicElement}
          {usernameElement}
          {jobPositionElement}
          {departmentElement}
          {socialMediaIconsElement}
        </Stack>
      );
      // user info section mobile
      const userInfoSectionMobile = (
        <Group
          w="100%"
          position="left"
          // h={128}
          style={{ borderRight: '1px solid #e0e0e0' }}
        >
          {profilePicElement}
          <Flex
            direction="column"
            wrap="wrap"
            rowGap={4}
            align="flex-start"
            justify="center"
            h="100%"
          >
            {usernameElement}
            {jobPositionElement}
            {departmentElement}
            {socialMediaIconsElement}
          </Flex>
        </Group>
      );

      // comment section header desktop
      const commentSectionHeaderDesktop = (
        <Flex
          w="100%"
          wrap="wrap"
          align="baseline"
          justify="flex-end"
          columnGap={rowGap}
          rowGap={rowGap}
          style={{ borderBottom: '1px solid #e0e0e0' }}
          py={padding}
        >
          {createdAtElement}
          {updatedAtElement ? (
            <span>
              <Space w="lg" />
              {updatedAtElement}
            </span>
          ) : null}

          <Group style={{ position: 'absolute', top: 0, right: 0 }}>
            {isFeaturedElement}
          </Group>
        </Flex>
      );
      // comment section header mobile
      const commentSectionHeaderMobile = (
        <Grid columns={10}>
          <Grid.Col span={6}>{userInfoSectionMobile}</Grid.Col>
          <Grid.Col span={4}>
            <Group style={{ position: 'absolute', top: 0, right: 0 }}>
              {isFeaturedElement}
            </Group>
            <Stack
              w="100%"
              h="100%"
              spacing={rowGap}
              align="center"
              justify="center"
            >
              {createdAtElement}
              {updatedAtElement}
            </Stack>
          </Grid.Col>
        </Grid>
      );

      const quotedSection = (
        <Stack
          w="100%"
          style={{ borderLeft: '2px solid #e0e0e0' }}
          px={padding}
        >
          {quotedUsernameElement}
          {quotedCommentElement}
        </Stack>
      );

      // comment section desktop
      const commentSectionDesktop = (
        <Stack w="100%" align="flex-start" justify="flex-start" p={padding}>
          {quotedSection}
          <Space h={rowGap} />
          {commentElement}
        </Stack>
      );
      // comment section mobile
      const commentSectionMobile = (
        <Stack
          w="100%"
          spacing={rowGap}
          align="center"
          style={{ borderTop: '1px solid #e0e0e0' }}
          p={padding}
        >
          {quotedSection}
          {commentElement}
        </Stack>
      );

      // comment section footer desktop
      const commentSectionFooterDesktop = (
        <Flex w="100%" align="center" justify="center" wrap="wrap">
          <Group
            w="100%"
            spacing={rowGap}
            pt={padding}
            align="center"
            position="right"
            style={{ borderTop: '1px solid #e0e0e0' }}
          >
            <Group
              py={2}
              pl={2}
              pr={18}
              style={{ border: '1px solid #e0e0e0', borderRadius: 9999 }}
            >
              {reportButtonElement} {reportsCountElement}
            </Group>
            <Group
              p={2}
              style={{ border: '1px solid #e0e0e0', borderRadius: 9999 }}
            >
              <Group position="left">{likeButtonElement}</Group>
              <Group position="center">
                {totalLikesDislikesElement} ({likesCountElement} /
                {dislikesCountElement})
              </Group>
              <Group position="right">{dislikeButtonElement}</Group>
            </Group>
            {replyButtonElement}
          </Group>
        </Flex>
      );
      // comment section footer mobile
      const commentSectionFooterMobile = (
        <Group
          w="100%"
          spacing={rowGap}
          py={padding}
          position="right"
          style={{ borderTop: '1px solid #e0e0e0' }}
        >
          <Group
            p={2}
            style={{ border: '1px solid #e0e0e0', borderRadius: 9999 }}
          >
            <Group position="left">{likeButtonElement}</Group>
            <Group position="center">
              {totalLikesDislikesElement} ({likesCountElement} /
              {dislikesCountElement})
            </Group>
            <Group position="right">{dislikeButtonElement}</Group>
          </Group>
          <Group position="right" spacing={padding}>
            <Group
              py={2}
              pl={2}
              pr={18}
              style={{ border: '1px solid #e0e0e0', borderRadius: 9999 }}
            >
              {reportButtonElement} {reportsCountElement}
            </Group>
            {replyButtonElement}
          </Group>
        </Group>
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
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            position: 'relative',
          }}
        >
          {width < 640
            ? createdCommentSectionMobile
            : createdCommentSectionDesktop}
        </Group>
      );
    }
  );

  const displayCommentAndSubmit = (
    <Stack w="100%" p={padding} style={{ borderTop: '1px solid #e0e0e0' }}>
      {createdCommentTextAreaInput}
      <Group position="right">{createdSubmitCommentButton}</Group>
    </Stack>
  );

  const commentModalTitle = (
    <Group w="100%">
      <Text color="dark" pr={padding}>
        {quotedUsername
          ? `You are commenting to: ${quotedUsername}`
          : 'Create comment'}
      </Text>
    </Group>
  );

  const commentModalQuotedComment = quotedComment ? (
    <Group px={padding}>
      <Blockquote
        icon={<VscQuote />}
        style={{ borderLeft: '2px solid #e0e0e0' }}
      >
        <Text color="dark" size="sm">
          {quotedComment}
          {quotedComment}
          {quotedComment}
          {quotedComment}
        </Text>
      </Blockquote>
    </Group>
  ) : null;

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
      {commentModalQuotedComment}
      {displayCommentAndSubmit}
    </Modal>
  );

  const displayReplyCommentSection = (
    <Group w={width < 480 ? '85%' : '62%'} px={padding} position="left">
      <Text color="dark">
        {queryBuilderString.length > 1
          ? 'Let the MacAuley family know your thoughts!'
          : 'Be the first to comment!'}
      </Text>
      {createdReplyCommentButton}
    </Group>
  );

  const displayCommentsSection = commentsMap.size ? (
    <Stack w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'} py={padding}>
      {displayCommentsSectionObjects}
    </Stack>
  ) : (
    <Group w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'} py={padding}>
      <Text color="dark" size="sm" pr={padding}>
        No comments found that match query parameters
      </Text>
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
      resetPage={resetPage}
      setPageQueryString={commentAction.setPageQueryString}
      parentComponentDispatch={commentDispatch}
    />
  );

  const displayPaginationAndLimitPerPageSelectInput = (
    <Group
      w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
      py={padding}
      position="apart"
    >
      <Group position="left">{displayPagination}</Group>
      <Group position="right" w="38%">
        {createdLimitPerPageSelectInput}
      </Group>
    </Group>
  );

  const displayCommentFormPage = (
    <Group w="100%" position="center" py={padding}>
      {createdCommentModal}
      {displayReplyCommentSection}
      {displayQueryBuilder}
      {displayPaginationAndLimitPerPageSelectInput}

      {displayCommentsSection}
    </Group>
  );
  /** ------------- end input displays ------------- */

  return displayCommentFormPage;
}

export { Comment };
