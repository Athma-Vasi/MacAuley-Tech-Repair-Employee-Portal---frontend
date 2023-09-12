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
  Spoiler,
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
  TbTrash,
  TbStar,
  TbFlag2Filled,
  TbFlag2,
  TbStarOff,
  TbTrashOff,
  TbArrowDown,
  TbArrowUp,
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
  AccessibleErrorValidTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
} from '../../jsxCreators';
import { ResourceRequestServerResponse } from '../../types';
import {
  addFieldsToObject,
  formatDate,
  logState,
  returnGrammarValidationText,
  returnThemeColors,
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
import { PageBuilder } from '../pageBuilder';
import {
  COMMENT_LIMIT_PER_PAGE_SELECT_DATA,
  COMMENT_QUERY_DATA,
} from './constants';
import { QueryBuilder } from '../queryBuilder';
import { COLORS_SWATCHES } from '../../constants/data';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { VscQuote } from 'react-icons/vsc';
import { globalAction } from '../../context/globalProvider/state';

function Comment({
  parentResourceId = '',
  parentResourceTitle = '',
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

    quotedUsername,
    quotedComment,

    updateCommentId,
    updateCommentRequestBody,

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
    globalState: { padding, rowGap, width, userDocument, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

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
      commentDispatch({
        type: commentAction.setLoadingMessage,
        payload: 'Fetching comments from server...',
      });

      const url: URL = urlBuilder({
        path: `comment/parentResource/${parentResourceId}/`,
        query: `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&limit=${limitPerPage}`,
      });

      const request: Request = new Request(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: GetCommentsServerResponse = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const { resourceData } = data;

        const commentsMap = new Map<string, CommentDocument>();
        resourceData.forEach((commentDoc) => {
          commentsMap.set(commentDoc._id, commentDoc);
        });

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
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
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
    }

    if (triggerCommentFetch) {
      fetchComments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only fetch comments when triggerCommentFetch is true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCommentFetch]);

  // whenever the following changes, trigger comment fetch
  useEffect(() => {
    commentDispatch({
      type: commentAction.setTriggerCommentFetch,
      payload: true,
    });
  }, [newQueryFlag, queryBuilderString, pageQueryString]);

  // update user reaction: liked, disliked, reported, deleted or featured
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function updateUserReaction() {
      const url: URL = urlBuilder({
        path: `comment/${updateCommentId}`,
      });

      const request: Request = new Request(url.toString(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updateCommentRequestBody),
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: {
          message: string;
          resourceData: [CommentDocument];
        } = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [commentDoc] = data.resourceData;
        commentDispatch({
          type: commentAction.updateCommentsMap,
          payload: { commentDoc },
        });

        console.log('updateUserReaction() data', data);
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
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

    // only update user reaction when triggerCommentUpdate is true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCommentUpdate]);

  // submit comment
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitComment() {
      if (!userDocument) {
        return;
      }

      commentDispatch({
        type: commentAction.setIsSubmitting,
        payload: true,
      });
      commentDispatch({
        type: commentAction.setSubmitMessage,
        payload: 'Sending comment to server...',
      });

      const url: URL = urlBuilder({
        path: 'comment/',
      });

      const comment = {
        jobPosition: userDocument.jobPosition,
        department: userDocument.department,
        profilePictureUrl: userDocument.profilePictureUrl,
        parentResourceId: parentResourceId,
        comment: newComment,
        quotedUsername,
        quotedComment,
        likesCount: 0,
        dislikesCount: 0,
        reportsCount: 0,
        isFeatured: false,
        isDeleted: false,
        likedUserIds: [],
        dislikedUserIds: [],
        reportedUserIds: [],
      };

      const request: Request = new Request(url.toString(), {
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
        const response: Response = await fetch(request);
        const data: {
          message: string;
          resourceData: [CommentDocument];
        } = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [commentDoc] = data.resourceData;
        commentDispatch({
          type: commentAction.updateCommentsMap,
          payload: { commentDoc },
        });
        commentDispatch({
          type: commentAction.setIsSuccessful,
          payload: true,
        });
        commentDispatch({
          type: commentAction.setSuccessMessage,
          payload: data.message ?? 'Comment submitted successfully!',
        });

        console.log('submitComment() data', data);
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        commentDispatch({
          type: commentAction.setIsSubmitting,
          payload: false,
        });
        commentDispatch({
          type: commentAction.setSubmitMessage,
          payload: '',
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

    // only submit comment when triggerCommentSubmit is true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCommentSubmit]);

  // when limit per page changes, trigger reset page
  useEffect(() => {
    commentDispatch({
      type: commentAction.setResetPage,
      payload: false,
    });
    commentDispatch({
      type: commentAction.setNewQueryFlag,
      payload: true,
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
  if (isLoading || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={commentDispatch}
        navigateTo={{
          successPath: `/home/outreach/announcement/display/${parentResourceTitle}`,
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  /** ------------- begin accessible texts ------------- */
  const [newCommentInputErrorText, newCommentInputValidText] =
    AccessibleErrorValidTextElements({
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
    disabled: commentsMap.size === 0,
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
    textAreaWidth: '100%',
  };

  const replyButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Reply',
    semanticDescription: 'create comment form reply button',
    semanticName: 'reply button',
    leftIcon: <TbUpload />,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      commentDispatch({
        type: commentAction.setQuotedUsername,
        payload: '',
      });
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

  const {
    directoryGraphThemeColors: { nodeTextColor },
    generalColors: { themeColorShades },
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

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

      const [
        replyButtonElement,
        likeButtonElement,
        dislikeButtonElement,
        reportButtonElement,
        showMoreSpoilerButtonElement,
        showLessSpoilerButtonElement,
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
          buttonVariant: likedUserIds.includes(userId) ? 'outline' : 'subtle',
          buttonStyle: { borderRadius: '9999px 4px 4px 9999px' },
          semanticDescription: 'like comment button',
          semanticName: 'likeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
            commentDispatch({
              type: commentAction.setUpdateCommentRequestBody,
              payload: {
                commentId,
                userId,
                kind: 'like',
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
          buttonStyle: { borderRadius: '4px 9999px 9999px 4px' },
          semanticDescription: 'dislike comment button',
          semanticName: 'dislikeCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
            commentDispatch({
              type: commentAction.setUpdateCommentRequestBody,
              payload: {
                commentId,
                userId,
                kind: 'dislike',
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
            <TbFlag2Filled />
          ) : (
            <TbFlag2 />
          ),
          buttonVariant: reportedUserIds.includes(userId)
            ? 'outline'
            : 'subtle',
          buttonStyle: { borderRadius: '9999px 4px 4px 9999px' },
          semanticDescription: 'report comment button',
          semanticName: 'reportCommentButton',
          buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
            commentDispatch({
              type: commentAction.setReactedCommentId,
              payload: commentId,
            });
            commentDispatch({
              type: commentAction.setUpdateCommentRequestBody,
              payload: {
                commentId,
                userId,
                kind: 'report',
                value: reportedUserIds.includes(userId) ? false : true,
              },
            });
            commentDispatch({
              type: commentAction.setTriggerCommentUpdate,
              payload: true,
            });
          },
        },
        // show more spoiler button
        {
          buttonLabel: 'Show',
          leftIcon: <TbArrowDown />,
          semanticDescription: 'show more comment button',
          semanticName: 'showMoreCommentButton',
        },
        // show less spoiler button
        {
          buttonLabel: 'Hide',
          leftIcon: <TbArrowUp />,
          semanticDescription: 'hide comment button',
          semanticName: 'hideCommentButton',
        },
      ]);

      const replyButtonWithTooltip = (
        <Tooltip
          label={
            userId === commentDoc.userId
              ? 'Reply to your comment'
              : `Reply to ${username}'s comment`
          }
        >
          <Group>{replyButtonElement}</Group>
        </Tooltip>
      );
      const likeButtonWithTooltip = (
        <Tooltip
          label={
            likedUserIds.includes(userId)
              ? `Undo like of ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
              : `Like ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
          }
        >
          <Group>{likeButtonElement}</Group>
        </Tooltip>
      );
      const dislikeButtonWithTooltip = (
        <Tooltip
          label={
            dislikedUserIds.includes(userId)
              ? `Undo dislike of ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
              : `Dislike ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
          }
        >
          <Group>{dislikeButtonElement}</Group>
        </Tooltip>
      );
      const reportButtonWithTooltip = (
        <Tooltip
          label={
            reportedUserIds.includes(userId)
              ? `Undo report of ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
              : `Report ${
                  userId === commentDoc.userId ? 'your' : `${username}'s`
                } comment`
          }
        >
          <Group>{reportButtonElement}</Group>
        </Tooltip>
      );

      // only comment owners are allowed to delete comments
      const [deleteButtonElement] =
        userId === commentDoc.userId
          ? returnAccessibleButtonElements([
              {
                buttonLabel: isDeleted ? 'Undelete' : 'Delete',
                leftIcon: isDeleted ? <TbTrashOff /> : <TbTrash />,
                semanticDescription: 'delete comment button',
                semanticName: 'deleteCommentButton',
                buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
                  commentDispatch({
                    type: commentAction.setReactedCommentId,
                    payload: commentId,
                  });
                  commentDispatch({
                    type: commentAction.setUpdateCommentRequestBody,
                    payload: {
                      commentId,
                      userId,
                      kind: 'delete',
                      value: true,
                    },
                  });
                  commentDispatch({
                    type: commentAction.setTriggerCommentUpdate,
                    payload: true,
                  });
                },
              },
            ])
          : [null];

      const deleteButtonWithTooltip = deleteButtonElement ? (
        <Tooltip
          label={isDeleted ? 'Undelete your comment' : 'Delete your comment'}
        >
          <Group>{deleteButtonElement}</Group>
        </Tooltip>
      ) : null;

      // only managers/admins are allowed to feature comments
      const [featureButtonElement] =
        userDocument?.roles.includes('Manager') ||
        userDocument?.roles.includes('Admin')
          ? returnAccessibleButtonElements([
              {
                buttonLabel: isFeatured ? 'Unfeature' : 'Feature',
                leftIcon: isFeatured ? <TbStarOff /> : <TbStar />,
                buttonVariant: 'outline',
                semanticDescription: 'feature comment button',
                semanticName: 'featureCommentButton',
                buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
                  commentDispatch({
                    type: commentAction.setReactedCommentId,
                    payload: commentId,
                  });
                  commentDispatch({
                    type: commentAction.setUpdateCommentRequestBody,
                    payload: {
                      commentId,
                      userId,
                      kind: 'feature',
                      value: true,
                    },
                  });
                  commentDispatch({
                    type: commentAction.setTriggerCommentUpdate,
                    payload: true,
                  });
                },
              },
            ])
          : [null];

      const featureButtonWithTooltip = featureButtonElement ? (
        <Tooltip
          label={
            isFeatured
              ? `Unfeature ${username}'s comment`
              : `Feature ${username}'s comment`
          }
        >
          <Group>{featureButtonElement}</Group>
        </Tooltip>
      ) : null;

      const usernameElementWithTooltip = (
        <Tooltip label={`Filter comments by ${username}`}>
          <Title
            order={5}
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&username[in]=${username}`,
              });
            }}
          >
            {username}
          </Title>
        </Tooltip>
      );
      const jobPositionElementWithTooltip = (
        <Tooltip label={`Filter comments by ${jobPosition}s`}>
          <Text
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
          // alt={`profile pic of ${username}`}
          withPlaceholder
          placeholder={<TbPhotoOff size={width < 640 ? 16 : 28} />}
        />
      );

      const createdSocialMediaIcons = (
        <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
          <Tooltip label={`View ${commentDoc.username}'s Github profile`}>
            <Group>
              <TiSocialGithub
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: nodeTextColor }}
              />
            </Group>
          </Tooltip>

          <Tooltip label={`View ${commentDoc.username}'s Mastodon profile`}>
            <Group>
              <TbBrandMastodon
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: nodeTextColor }}
              />
            </Group>
          </Tooltip>

          <Tooltip label={`View ${commentDoc.username}'s LinkedIn profile`}>
            <Group>
              <TiSocialLinkedin
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: nodeTextColor }}
              />
            </Group>
          </Tooltip>

          <Tooltip label={`View ${commentDoc.username}'s Flickr profile`}>
            <Group>
              <TiSocialFlickr
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: nodeTextColor }}
              />
            </Group>
          </Tooltip>

          <Tooltip label={`View ${commentDoc.username}'s Dribbble profile`}>
            <Group>
              <TiSocialDribbble
                size={width < 640 ? 20 : 24}
                style={{ cursor: 'pointer', color: nodeTextColor }}
              />
            </Group>
          </Tooltip>
        </Flex>
      );

      const commentElement = (
        <Spoiler
          maxHeight={217}
          showLabel={showMoreSpoilerButtonElement}
          hideLabel={showLessSpoilerButtonElement}
        >
          <Text>{isDeleted ? 'Comment has been deleted' : comment}</Text>
        </Spoiler>
      );
      const quotedUsernameElement = quotedUsername ? (
        <Text>{quotedUsername} commented:</Text>
      ) : null;
      const quotedCommentElement = quotedComment ? (
        <Blockquote icon={<VscQuote />}>
          <Spoiler
            maxHeight={217}
            showLabel={showMoreSpoilerButtonElement}
            hideLabel={showLessSpoilerButtonElement}
          >
            <Text>{quotedComment}</Text>
          </Spoiler>
        </Blockquote>
      ) : null;

      const likesCountWithTooltipElement = (
        <Tooltip label={`${likesCount} people have liked this comment`}>
          <Text>{likesCount}</Text>
        </Tooltip>
      );
      const dislikesCountWithTooltipElement = (
        <Tooltip label={`${dislikesCount} people have disliked this comment`}>
          <Text>{dislikesCount}</Text>
        </Tooltip>
      );
      const totalLikesDislikesWithTooltipElement = (
        <Tooltip label="Overall feeling towards this comment">
          <Text>{likesCount + dislikesCount}</Text>
        </Tooltip>
      );
      const reportsCountWithTooltipElement = (
        <Tooltip label={`${reportsCount} people have reported this comment`}>
          <Text>{reportsCount}</Text>
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
          <Text>Created: {createdAtDateTime}</Text>
        </Tooltip>
      );
      const updatedAtElementWithTooltip =
        new Date(createdAt).getTime() ===
        new Date(updatedAt).getTime() ? null : (
          <Tooltip label="Comment last updated">
            <Text>Updated: {updatedAtDateTime}</Text>
          </Tooltip>
        );

      const fromColor = themeColorShades?.[3] ?? 'teal';
      const toColor = themeColorShades?.[6] ?? 'blue';

      const isFeaturedElement = isFeatured ? (
        <Badge
          variant="gradient"
          gradient={{ from: fromColor, to: toColor, deg: 60 }}
          style={{ borderRadius: '0px 4px 0px 4px' }}
        >
          Featured
        </Badge>
      ) : null;

      const createdCommentsSectionObject: CreatedCommentsSectionObject = {
        usernameElement: usernameElementWithTooltip,
        jobPositionElement: jobPositionElementWithTooltip,
        departmentElement: departmentElementWithTooltip,
        profilePicElement: profilePicElement,
        socialMediaIconsElement: createdSocialMediaIcons,

        commentElement,
        quotedUsernameElement,
        quotedCommentElement,

        likesCountElement: likesCountWithTooltipElement,
        dislikesCountElement: dislikesCountWithTooltipElement,
        totalLikesDislikesElement: totalLikesDislikesWithTooltipElement,
        reportsCountElement: reportsCountWithTooltipElement,

        replyButtonElement: replyButtonWithTooltip,
        likeButtonElement: likeButtonWithTooltip,
        dislikeButtonElement: dislikeButtonWithTooltip,
        reportButtonElement: reportButtonWithTooltip,

        isFeaturedElement: isFeaturedElement,
        createdAtElement: createdAtElementWithTooltip,
        updatedAtElement: updatedAtElementWithTooltip,
        deleteButtonElement: deleteButtonWithTooltip,
        featureButtonElement: featureButtonWithTooltip,
      };

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

        createdAtElement,
        updatedAtElement,
        deleteButtonElement,
        featureButtonElement,
        isFeaturedElement,
      } = createdCommentsSectionObject;

      // user info section desktop
      const userInfoSectionDesktop = (
        <Stack
          w="100%"
          h="100%"
          px={padding}
          spacing={rowGap}
          align="center"
          justify="center"
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
          position={width < 480 ? 'center' : 'left'}
          spacing={rowGap}
        >
          {profilePicElement}
          <Flex
            direction="column"
            wrap="wrap"
            rowGap={4}
            align={width < 480 ? 'center' : 'flex-start'}
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
          rowGap="xs"
          style={{
            borderBottom: borderColor,
          }}
          py={padding}
          ml={padding}
        >
          <Group style={{ position: 'absolute', top: 0, right: 0 }}>
            {isFeaturedElement}
          </Group>
          <Group pt={padding}>{createdAtElement}</Group>
          {updatedAtElement ? (
            <span>
              <Space w="lg" />
              {updatedAtElement}
            </span>
          ) : null}
        </Flex>
      );
      // comment section header mobile
      const commentSectionHeaderMobile = (
        <Grid columns={10} py={padding} w="100%">
          <Grid.Col span={6} style={{ borderRight: borderColor }}>
            {userInfoSectionMobile}
          </Grid.Col>
          <Grid.Col span={4} w="100%">
            <Stack w="100%" h="100%" align="center" justify="center">
              <Group style={{ position: 'absolute', top: 0, right: 0 }}>
                {isFeaturedElement}
              </Group>

              <Group pt={padding} position="right">
                {createdAtElement}
                {updatedAtElement}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      );

      const quotedSection = (
        <Stack w="100%" px={padding}>
          {quotedUsernameElement}
          {quotedCommentElement}
        </Stack>
      );

      // comment section desktop and mobile
      const commentQuoteSection = (
        <Stack w="100%" p={padding}>
          {quotedSection}
          <Space h="xs" />
          {commentElement}
        </Stack>
      );

      // comment section footer desktop and mobile
      const commentSectionFooter = (
        <Group
          w="100%"
          spacing={rowGap}
          pt={padding}
          ml={width < 640 ? undefined : padding}
          position="right"
          style={{ borderTop: borderColor }}
        >
          <Group pr={18} style={{ border: borderColor, borderRadius: 9999 }}>
            {reportButtonElement} {reportsCountElement}
          </Group>
          <Group style={{ border: borderColor, borderRadius: 9999 }}>
            <Group position="left">{likeButtonElement}</Group>
            <Group position="center">
              {totalLikesDislikesElement} ({likesCountElement} /
              {dislikesCountElement})
            </Group>
            <Group position="right">{dislikeButtonElement}</Group>
          </Group>
          <Group position="right" spacing={padding}>
            <Group position="right">
              {featureButtonElement} {deleteButtonElement}
              {replyButtonElement}
            </Group>
          </Group>
        </Group>
      );

      // comment section full desktop
      const createdCommentSectionDesktop = (
        <Grid columns={10} w="100%" py={padding}>
          <Grid.Col span={3} style={{ borderRight: borderColor }}>
            {userInfoSectionDesktop}
          </Grid.Col>
          <Grid.Col span={7}>
            {commentSectionHeaderDesktop}
            {commentQuoteSection}
            {commentSectionFooter}
          </Grid.Col>
        </Grid>
      );
      // comment section full mobile
      const createdCommentSectionMobile = (
        <Stack w="100%" py={padding}>
          <Group pb={padding} style={{ borderBottom: borderColor }}>
            {commentSectionHeaderMobile}
          </Group>
          {commentQuoteSection}
          {commentSectionFooter}
        </Stack>
      );

      const displayCommentSection = (
        <Group
          key={`${index}`}
          w="100%"
          px={padding}
          style={{
            border: borderColor,
            borderRadius: '4px',
            position: 'relative',
          }}
          bg={backgroundColor}
        >
          {width < 640
            ? createdCommentSectionMobile
            : createdCommentSectionDesktop}
        </Group>
      );

      return displayCommentSection;
    }
  );

  const displayCommentAndSubmit = (
    <Stack w="100%" p={padding} style={{ borderTop: borderColor }}>
      {createdCommentTextAreaInput}
      <Group position="right">{createdSubmitCommentButton}</Group>
    </Stack>
  );

  const commentModalTitle = (
    <Group w="100%">
      <Text pr={padding}>
        {quotedUsername
          ? `You are commenting to: ${quotedUsername}`
          : parentResourceTitle
          ? `You are commenting on: ${parentResourceTitle}`
          : 'Create a comment'}
      </Text>
    </Group>
  );

  const commentModalQuotedComment = quotedComment ? (
    <Group p={padding} style={{ borderTop: borderColor }}>
      <Blockquote icon={<VscQuote />} style={{ borderLeft: borderColor }}>
        <Text size="sm">
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
    <Group
      w={width < 480 ? '85%' : '62%'}
      px={padding}
      pb={padding}
      position="left"
    >
      <Text size="md">Let the MacAuley family know your thoughts!</Text>
      <Tooltip label="Share your thoughts">
        <Group>{createdReplyCommentButton}</Group>
      </Tooltip>
    </Group>
  );

  const commentsWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width - 40
      : // at 768vw the navbar appears at width of 200px
      width < 1024
      ? (width - 200) * 0.85
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.85
      : 900 - 40;

  const displayCommentsSection = commentsMap.size ? (
    <Stack w={commentsWidth} py={padding}>
      {displayCommentsSectionObjects}
    </Stack>
  ) : (
    <Group w={commentsWidth} py={padding}>
      <Text size="sm" pr={padding}>
        No comments found
      </Text>
    </Group>
  );

  const displayQueryBuilder = commentsMap.size ? (
    <QueryBuilder
      collectionName="Comments"
      componentQueryData={COMMENT_QUERY_DATA}
      disableProjection={true}
      parentComponentDispatch={commentDispatch}
      setQueryBuilderString={commentAction.setQueryBuilderString}
    />
  ) : null;

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
      w={commentsWidth}
      py={padding}
      position="apart"
      style={{ borderTop: borderColor }}
    >
      <Group position="left">{displayPagination}</Group>
      <Group position="right" w="38%">
        {createdLimitPerPageSelectInput}
      </Group>
    </Group>
  );

  const displayCommentFormPage = (
    <Group w="100%" position="center" pb={padding}>
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
