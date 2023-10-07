import {
  Badge,
  Blockquote,
  Flex,
  Grid,
  Group,
  Highlight,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { FaRegCommentDots } from 'react-icons/fa';
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
  TbArrowDown,
  TbArrowUp,
  TbBrandMastodon,
  TbClearAll,
  TbCornerUpLeft,
  TbFlag2,
  TbFlag2Filled,
  TbPhotoOff,
  TbStar,
  TbStarOff,
  TbTrash,
  TbTrashOff,
  TbUpload,
  TbZoomReset,
} from 'react-icons/tb';
import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialGithub,
  TiSocialLinkedin,
} from 'react-icons/ti';
import { VscQuote } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../constants/data';
import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../constants/regex';
import { globalAction } from '../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleImageElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
} from '../../jsxCreators';
import {
  formatDate,
  logState,
  replaceLastCommaWithAnd,
  replaceLastCommaWithOr,
  returnGrammarValidationText,
  returnThemeColors,
  urlBuilder,
} from '../../utils';
import { returnHighlightedText } from '../displayQuery/displayQueryDesktop/utils';
import { NotificationModal } from '../notificationModal';
import { PageBuilder } from '../pageBuilder';
import { QueryBuilder } from '../queryBuilder';
import {
  AccessibleButtonCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
} from '../wrappers';
import {
  COMMENT_LIMIT_PER_PAGE_SELECT_DATA,
  COMMENT_QUERY_DATA,
} from './constants';
import { commentAction, commentReducer, initialCommentState } from './state';
import {
  CommentDocument,
  CommentProps,
  CreatedCommentsSectionObject,
  GetCommentsServerResponse,
} from './types';

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
    queryValuesArray,

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
    authState: { userId, username, accessToken, isAccessTokenExpired },
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

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */

  // fetch comments
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchComments() {
      commentDispatch({
        type: commentAction.setIsLoading,
        payload: true,
      });
      const pageNumber = pageQueryString.split('=')[1] ?? '1';
      commentDispatch({
        type: commentAction.setLoadingMessage,
        payload: `Loading comments for ${parentResourceTitle}  page: ${pageNumber} ...`,
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
  }, [triggerCommentFetch, isAccessTokenExpired]);

  // whenever the following changes, trigger comment fetch
  useEffect(() => {
    commentDispatch({
      type: commentAction.setTriggerCommentFetch,
      payload: true,
    });
  }, [newQueryFlag, queryBuilderString, pageQueryString]);

  // update user reaction: liked, disliked, reported, deleted or featured
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

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
  }, [triggerCommentUpdate, isAccessTokenExpired]);

  // submit comment
  useEffect(() => {
    if (isAccessTokenExpired) {
      return;
    }

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
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: 'comment/',
      });

      const comment = {
        firstName: userDocument.firstName,
        middleName: userDocument.middleName,
        lastName: userDocument.lastName,
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
  }, [triggerCommentSubmit, isAccessTokenExpired]);

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
    width: 150,
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
    textAreaWidth:
      width < 480 ? 350 - 30 : width > 1024 ? 640 - 33 : width * 0.8 - 33,
    dropdownWidth:
      width < 480 ? 350 - 30 : width > 1024 ? 640 - 33 : width * 0.8 - 33,
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
    tablesThemeColors: { textHighlightColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const regex = queryValuesArray.length
    ? new RegExp(
        queryValuesArray
          .filter((value) => value) // remove empty strings
          .flatMap((value) => value.split(' ')) // split strings into words
          .join('|'),
        'gi'
      )
    : null;

  console.log('regex', regex);

  const createdCommentsSectionObjectsArray: CreatedCommentsSectionObject[] =
    Array.from(commentsMap).map(
      ([commentId, commentDoc]: [string, CommentDocument]) => {
        const {
          profilePictureUrl,
          username,
          firstName,
          middleName,
          lastName,
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

        const wrappedUsername = (
          <Flex w="100%" wrap="wrap">
            {username.split('').map((letter, index) => (
              <Text weight={600} key={`${index}-${letter}`}>
                {letter}
              </Text>
            ))}
          </Flex>
        );
        const isUsernameInQueryValuesArray = regex?.test(username);
        const highlightedUsername = isUsernameInQueryValuesArray ? (
          <Highlight
            highlightStyles={{ backgroundColor: textHighlightColor }}
            highlight={username}
          >
            {username}
          </Highlight>
        ) : (
          wrappedUsername
        );
        const usernameElement = (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&username[in]=${username}`,
              });
            }}
          >
            {highlightedUsername}
          </Flex>
        );
        const usernameElementWithTooltip = (
          <Tooltip label={`Filter by ${username}`}>{usernameElement}</Tooltip>
        );

        // first name
        const isFirstNameInQueryValuesArray = regex?.test(firstName);
        console.log({ queryValuesArray });
        const highlightedFirstName = isFirstNameInQueryValuesArray ? (
          <Highlight
            highlightStyles={{ backgroundColor: textHighlightColor }}
            highlight={firstName}
          >
            {firstName}
          </Highlight>
        ) : (
          <Text>{firstName}</Text>
        );
        const firstNameElement = (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&firstName[eq]=${firstName}`,
              });
            }}
          >
            {highlightedFirstName}
          </Flex>
        );
        const firstNameElementWithTooltip = (
          <Tooltip label={`Filter first names by ${firstName}`}>
            {firstNameElement}
          </Tooltip>
        );

        // middle name
        const isMiddleNameInQueryValuesArray = regex?.test(middleName);
        const highlightedMiddleName = isMiddleNameInQueryValuesArray ? (
          <Highlight
            highlightStyles={{ backgroundColor: textHighlightColor }}
            highlight={middleName}
          >
            {middleName}
          </Highlight>
        ) : middleName ? (
          <Text>{middleName}</Text>
        ) : null;
        const middleNameElement = middleName ? (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&middleName[eq]=${middleName}`,
              });
            }}
          >
            {highlightedMiddleName}
          </Flex>
        ) : null;
        const middleNameElementWithTooltip = middleName ? (
          <Tooltip label={`Filter middle names by ${middleName}`}>
            {middleNameElement}
          </Tooltip>
        ) : null;

        // last name
        const isLastNameInQueryValuesArray = regex?.test(lastName);
        const highlightedLastName = isLastNameInQueryValuesArray ? (
          <Highlight
            highlightStyles={{ backgroundColor: textHighlightColor }}
            highlight={lastName}
          >
            {lastName}
          </Highlight>
        ) : (
          <Text>{lastName}</Text>
        );
        const lastNameElement = (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&lastName[eq]=${lastName}`,
              });
            }}
          >
            {highlightedLastName}
          </Flex>
        );
        const lastNameElementWithTooltip = (
          <Tooltip label={`Filter last names by ${lastName}`}>
            {lastNameElement}
          </Tooltip>
        );

        const wrappedJobPosition = (
          <Flex w="100%" wrap="wrap" gap={4} align="center" justify="center">
            {jobPosition.split(' ').map((word, wordIdx) => (
              <Text key={`${wordIdx}-${word}`}>{word}</Text>
            ))}
          </Flex>
        );
        const isJobPositionInQueryValuesArray = jobPosition
          .split(' ')
          .some((value) => regex?.test(value));
        const highlightedJobPosition = isJobPositionInQueryValuesArray
          ? returnHighlightedText({
              backgroundColor: textHighlightColor,
              fieldValue: jobPosition,
              queryValuesArray,
            })
          : wrappedJobPosition;
        const jobPositionElement = (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&jobPosition[eq]=${jobPosition}`,
              });
            }}
          >
            {highlightedJobPosition}
          </Flex>
        );
        const jobPositionElementWithTooltip = (
          <Tooltip label={`Filter job positions by ${jobPosition}`}>
            {jobPositionElement}
          </Tooltip>
        );

        const wrappedDepartment = (
          <Flex w="100%" wrap="wrap" gap={4} align="center" justify="center">
            {department.split(' ').map((word, wordIdx) => (
              <Text key={`${wordIdx}-${word}`}>{word}</Text>
            ))}
          </Flex>
        );
        const isDepartmentInQueryValuesArray = department
          .split(' ')
          .some((value) => regex?.test(value));
        const highlightedDepartment = isDepartmentInQueryValuesArray
          ? returnHighlightedText({
              backgroundColor: textHighlightColor,
              fieldValue: department,
              queryValuesArray,
            })
          : wrappedDepartment;
        const departmentElement = (
          <Flex
            gap={4}
            wrap="wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&department[eq]=${department}`,
              });
            }}
          >
            {highlightedDepartment}
          </Flex>
        );
        const departmentElementWithTooltip = (
          <Tooltip label={`Filter departments by ${department}`}>
            {departmentElement}
          </Tooltip>
        );

        const [profilePicElement] = returnAccessibleImageElements([
          {
            customWidth: width < 640 ? 48 : 96,
            customHeight: width < 640 ? 48 : 96,
            customRadius: 9999,
            fit: 'cover',
            imageSrc: profilePictureUrl,
            imageAlt: `Picture of ${username}`,
            isCard: false,
            isOverlay: false,
            isLoader: true,
            withPlaceholder: true,
          },
        ]);

        const createdSocialMediaIcons = (
          <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
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

        const isCommentInQueryValuesArray = regex?.test(comment);
        const highlightedComment = isCommentInQueryValuesArray ? (
          <Flex gap={4} wrap="wrap">
            {returnHighlightedText({
              backgroundColor: textHighlightColor,
              fieldValue: comment,
              queryValuesArray,
            })}
          </Flex>
        ) : (
          <Text>{comment}</Text>
        );
        const commentElement = (
          <Spoiler
            maxHeight={135}
            showLabel={showMoreSpoilerButtonElement}
            hideLabel={showLessSpoilerButtonElement}
          >
            {isDeleted ? (
              <Text>Comment has been deleted</Text>
            ) : (
              highlightedComment
            )}
          </Spoiler>
        );

        const isQuotedUsernameInQueryValuesArray = regex?.test(quotedUsername);
        const highlightedQuotedUsername = isQuotedUsernameInQueryValuesArray ? (
          <Highlight
            highlightStyles={{ backgroundColor: textHighlightColor }}
            highlight={quotedUsername}
          >
            {quotedUsername}
          </Highlight>
        ) : (
          <Text weight={600}>{quotedUsername}</Text>
        );
        const quotedUsernameElement = quotedUsername ? (
          <Group>
            {highlightedQuotedUsername}
            <Text>commented: </Text>
          </Group>
        ) : null;

        // is quoted comment in query values array
        const isQuotedCommentInQueryValuesArray = regex?.test(quotedComment);
        const highlightedQuotedComment = isQuotedCommentInQueryValuesArray ? (
          <Flex gap={4} wrap="wrap">
            {returnHighlightedText({
              backgroundColor: textHighlightColor,
              fieldValue: quotedComment,
              queryValuesArray,
            })}
          </Flex>
        ) : (
          <Text>{quotedComment}</Text>
        );
        const quotedCommentElement = quotedComment ? (
          <Blockquote icon={<VscQuote />}>
            <Spoiler
              maxHeight={135}
              showLabel={showMoreSpoilerButtonElement}
              hideLabel={showLessSpoilerButtonElement}
            >
              {highlightedQuotedComment}
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

        const [createdAtDateTime, updatedAtDateTime] = [
          createdAt,
          updatedAt,
        ].map((date: string) =>
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

        const createdAtElement = <Text>Created: {createdAtDateTime}</Text>;
        const updatedAtElement =
          new Date(createdAt).getTime() ===
          new Date(updatedAt).getTime() ? null : (
            <Text>Updated: {updatedAtDateTime}</Text>
          );

        const fromColor = themeColorShades?.[8] ?? 'teal';
        const toColor = themeColorShades?.[4] ?? 'blue';

        const isFeaturedElement = isFeatured ? (
          <Badge
            variant="gradient"
            gradient={{ from: fromColor, to: toColor, deg: 60 }}
            style={{ borderRadius: '0px 4px 0px 4px', cursor: 'pointer' }}
            onClick={() => {
              commentDispatch({
                type: commentAction.setQueryBuilderString,
                payload: `?&isFeatured[eq]=${isFeatured}`,
              });
            }}
          >
            Featured
          </Badge>
        ) : null;

        const isFeaturedWithTooltip = isFeatured ? (
          <Tooltip label="Filter comments by featured">
            {isFeaturedElement}
          </Tooltip>
        ) : null;

        const createdCommentsSectionObject: CreatedCommentsSectionObject = {
          usernameElement: usernameElementWithTooltip,
          firstNameElement: firstNameElementWithTooltip,
          middleNameElement: middleNameElementWithTooltip,
          lastNameElement: lastNameElementWithTooltip,
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

          isFeaturedElement: isFeaturedWithTooltip,
          createdAtElement: createdAtElement,
          updatedAtElement: updatedAtElement,
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
        firstNameElement,
        middleNameElement,
        lastNameElement,
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

      const groupedNameElement = (
        <Flex gap={4} w="100%" wrap="wrap" align="center" justify="center">
          {firstNameElement} {middleNameElement} {lastNameElement}
        </Flex>
      );

      // user info section desktop
      const userInfoSectionDesktop = (
        <Flex
          direction="column"
          w="100%"
          // h="100%"
          p={padding}
          gap="xs"
          align="center"
          // justify="center"
        >
          {profilePicElement}
          {usernameElement}
          {groupedNameElement}
          {jobPositionElement}
          {departmentElement}
          {socialMediaIconsElement}
        </Flex>
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
            {groupedNameElement}
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
        <Flex direction="column" w="100%" px={padding}>
          {quotedUsernameElement}
          {quotedCommentElement}
        </Flex>
      );

      // comment section desktop and mobile
      const commentQuoteSection = (
        <Stack w="100%" p={padding} h="fit">
          {quotedSection}
          <Space h="xs" />
          <Group>{commentElement}</Group>
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
          align="flex-end"
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
        <Grid columns={11} w="100%" py={padding}>
          <Grid.Col span={3} style={{ borderRight: borderColor }}>
            {userInfoSectionDesktop}
          </Grid.Col>
          <Grid.Col
            span={8}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridTemplateRows: '125px 1fr 125px',
            }}
          >
            <div
              style={{
                gridColumn: '1 / 2',
                gridRow: '1 / 2',
              }}
            >
              {commentSectionHeaderDesktop}
            </div>

            <div
              style={{
                gridColumn: '1 / 2',
                gridRow: '2 / 3',
              }}
            >
              {commentQuoteSection}
            </div>

            <div
              style={{
                gridColumn: '1 / 2',
                gridRow: '3 / 4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {commentSectionFooter}
            </div>
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
    <Stack w="100%" py={padding} style={{ borderTop: borderColor }}>
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
        <Text>{quotedComment}</Text>
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
      size={width < 480 ? 350 : width > 1024 ? 640 : width * 0.8}
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
      ? width * 0.95
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
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
      queryBuilderStringDispatch={commentDispatch}
      setQueryBuilderString={commentAction.setQueryBuilderString}
      queryValuesArrayDispatch={commentDispatch}
    />
  ) : null;

  const [createdClearButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Clear',
      leftIcon: <TbClearAll />,
      semanticDescription: 'clear comment filters button to original state',
      semanticName: 'clear comment filters button',
      buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
        commentDispatch({
          type: commentAction.setQueryBuilderString,
          payload: '?',
        });
        commentDispatch({
          type: commentAction.setQueryValuesArray,
          payload: {
            kind: 'clear',
            value: '',
          },
        });
      },
    },
  ]);

  const displayClearButton = (
    <Tooltip label="Clear comment filters">
      <Group position="right">{createdClearButton}</Group>
    </Tooltip>
  );

  const displayPagination = (
    <PageBuilder
      total={numberOfPages}
      resetPage={resetPage}
      setPageQueryString={commentAction.setPageQueryString}
      parentComponentDispatch={commentDispatch}
    />
  );

  const displayTotalComments = <Text>Total comments: {totalDocuments}</Text>;

  const displayTotalCommentsAndLimitPerPageSelectInput = (
    <Group
      w={commentsWidth}
      py={padding}
      position="apart"
      style={{ borderTop: borderColor }}
      align="flex-end"
    >
      <Group position="left">{createdLimitPerPageSelectInput}</Group>
      <Group position="right">
        {displayTotalComments}
        <Space w="xl" />
        {displayClearButton}
      </Group>
    </Group>
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitSuccessNotificationModal]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={500}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
    />
  );

  const displayCommentFormPage = (
    <Stack
      w="100%"
      align="center"
      pb={padding}
      style={{ position: 'relative' }}
    >
      {displayLoadingOverlay}
      {createdCommentModal}
      {displaySubmitSuccessNotificationModal}
      {displayReplyCommentSection}
      {displayQueryBuilder}
      {displayTotalCommentsAndLimitPerPageSelectInput}
      {displayCommentsSection}
      {displayPagination}
    </Stack>
  );
  /** ------------- end input displays ------------- */

  return displayCommentFormPage;
}

export { Comment };
