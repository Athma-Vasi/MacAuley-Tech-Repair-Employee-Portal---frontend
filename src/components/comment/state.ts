import { QueryResponseData } from '../../types';
import {
  CommentAction,
  CommentDispatch,
  CommentDocument,
  CommentState,
  UpdateCommentRequestBody,
} from './types';

const initialCommentState: CommentState = {
  newComment: '',
  isNewCommentValid: false,
  isNewCommentFocused: false,

  quotedUsername: '',
  quotedComment: '',

  updateCommentId: '',
  updateCommentRequestBody: {
    fieldsToUpdate: {
      dislikedUserIds: [],
      dislikesCount: 0,
      likedUserIds: [],
      likesCount: 0,
      reportedUserIds: [],
      reportsCount: 0,
    },
  },

  totalDocuments: 0,
  numberOfPages: 0,
  limitPerPage: '10',
  resetPage: false,
  newQueryFlag: false,
  queryBuilderString: '?',
  pageQueryString: '',
  areCommentsVisible: false,

  commentIdsToFetch: [],
  commentsMap: new Map(),

  triggerCommentFetch: false,
  triggerCommentUpdate: false,
  triggerCommentSubmit: false,

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isLoading: false,
  loadingMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const commentAction: CommentAction = {
  setNewComment: 'setNewComment',
  setIsNewCommentValid: 'setIsNewCommentValid',
  setIsNewCommentFocused: 'setIsNewCommentFocused',

  setQuotedUsername: 'setQuotedUsername',
  setQuotedComment: 'setQuotedComment',

  setReactedCommentId: 'setReactedCommentId',
  setUpdateCommentRequestBody: 'setUpdateCommentRequestBody',

  setTotalDocuments: 'setTotalDocuments',
  setNumberOfPages: 'setNumberOfPages',
  setLimitPerPage: 'setLimitPerPage',
  setResetPage: 'setResetPage',
  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',
  setAreCommentsVisible: 'setAreCommentsVisible',

  setCommentIdsToFetch: 'setCommentIdsToFetch',
  setCommentsMap: 'setCommentsMap',
  updateCommentsMap: 'updateCommentsMap',

  setTriggerCommentFetch: 'setTriggerCommentFetch',
  setTriggerCommentUpdate: 'setTriggerCommentUpdate',
  setTriggerCommentSubmit: 'setTriggerCommentSubmit',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function commentReducer(
  state: CommentState,
  action: CommentDispatch
): CommentState {
  switch (action.type) {
    case commentAction.setNewComment:
      return {
        ...state,
        newComment: action.payload,
      };
    case commentAction.setIsNewCommentValid:
      return {
        ...state,
        isNewCommentValid: action.payload,
      };
    case commentAction.setIsNewCommentFocused:
      return {
        ...state,
        isNewCommentFocused: action.payload,
      };

    case commentAction.setQuotedUsername:
      return {
        ...state,
        quotedUsername: action.payload,
      };

    case commentAction.setQuotedComment:
      return {
        ...state,
        quotedComment: action.payload,
      };

    case commentAction.setReactedCommentId:
      return {
        ...state,
        updateCommentId: action.payload,
      };

    case commentAction.setUpdateCommentRequestBody: {
      const { payload } = action;
      console.log({ payload });
      const { kind, commentId, userId, value } = action.payload;
      if (!kind) {
        return state;
      }

      const comment = state.commentsMap.get(commentId);
      if (!comment) {
        return state;
      }

      switch (kind) {
        case 'like': {
          const { likedUserIds, likesCount, dislikedUserIds, dislikesCount } =
            comment;
          const likesCountUpdated = value ? likesCount + 1 : likesCount - 1;
          const likedUserIdsUpdated = value
            ? Array.from(new Set([...likedUserIds, userId]))
            : likedUserIds.filter((id) => id !== userId);

          // remove from dislikedUserIds and decrement count if liked
          const dislikedUserIdsUpdated = dislikedUserIds.includes(userId)
            ? dislikedUserIds.filter((id) => id !== userId)
            : dislikedUserIds;
          const dislikesCountUpdated = dislikedUserIds.includes(userId)
            ? dislikesCount - 1
            : dislikesCount;

          const updateCommentRequestBody: UpdateCommentRequestBody = {
            fieldsToUpdate: {
              likedUserIds: likedUserIdsUpdated,
              likesCount: likesCountUpdated,
              dislikedUserIds: dislikedUserIdsUpdated,
              dislikesCount: dislikesCountUpdated,
            },
          };

          return {
            ...state,
            updateCommentRequestBody,
          };
        }
        case 'dislike': {
          const { dislikedUserIds, dislikesCount, likedUserIds, likesCount } =
            comment;
          const dislikesCountUpdated = value
            ? dislikesCount + 1
            : dislikesCount - 1;
          const dislikedUserIdsUpdated = value
            ? Array.from(new Set([...dislikedUserIds, userId]))
            : dislikedUserIds.filter((id) => id !== userId);

          // remove from likedUserIds and decrement count if disliked
          const likedUserIdsUpdated = likedUserIds.includes(userId)
            ? likedUserIds.filter((id) => id !== userId)
            : likedUserIds;
          const likesCountUpdated = likedUserIds.includes(userId)
            ? likesCount - 1
            : likesCount;

          const updateCommentRequestBody: UpdateCommentRequestBody = {
            fieldsToUpdate: {
              dislikedUserIds: dislikedUserIdsUpdated,
              dislikesCount: dislikesCountUpdated,
              likedUserIds: likedUserIdsUpdated,
              likesCount: likesCountUpdated,
            },
          };

          return {
            ...state,
            updateCommentRequestBody,
          };
        }
        case 'report': {
          const { reportedUserIds, reportsCount } = comment;
          const reportsCountUpdated = value
            ? reportsCount + 1
            : reportsCount - 1;
          const reportedUserIdsUpdated = value
            ? Array.from(new Set([...reportedUserIds, userId]))
            : reportedUserIds.filter((id) => id !== userId);

          const updateCommentRequestBody: UpdateCommentRequestBody = {
            fieldsToUpdate: {
              reportedUserIds: reportedUserIdsUpdated,
              reportsCount: reportsCountUpdated,
            },
          };

          return {
            ...state,
            updateCommentRequestBody,
          };
        }
        case 'delete': {
          const { isDeleted } = comment;
          const updateCommentRequestBody: UpdateCommentRequestBody = {
            fieldsToUpdate: {
              isDeleted: !isDeleted,
            },
          };

          return {
            ...state,
            updateCommentRequestBody,
          };
        }
        case 'feature': {
          const { isFeatured } = comment;
          const updateCommentRequestBody: UpdateCommentRequestBody = {
            fieldsToUpdate: {
              isFeatured: !isFeatured,
            },
          };

          return {
            ...state,
            updateCommentRequestBody,
          };
        }
        default:
          return state;
      }
    }

    case commentAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };

    case commentAction.setNumberOfPages:
      return {
        ...state,
        numberOfPages: action.payload,
      };

    case commentAction.setLimitPerPage:
      return {
        ...state,
        limitPerPage: action.payload,
      };

    case commentAction.setResetPage:
      return {
        ...state,
        resetPage: action.payload,
      };

    case commentAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };

    case commentAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };

    case commentAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };

    case commentAction.setAreCommentsVisible:
      return {
        ...state,
        areCommentsVisible: action.payload,
      };

    case commentAction.setCommentIdsToFetch:
      return {
        ...state,
        commentIdsToFetch: action.payload,
      };

    case commentAction.setCommentsMap: {
      const { commentsMap } = action.payload;

      return {
        ...state,
        commentsMap,
      };
    }

    case commentAction.updateCommentsMap: {
      const { commentDoc } = action.payload;
      const { _id } = commentDoc;

      const commentsMap = structuredClone(state.commentsMap);
      commentsMap.set(_id, commentDoc);

      return {
        ...state,
        commentsMap,
      };
    }

    case commentAction.setTriggerCommentFetch:
      return {
        ...state,
        triggerCommentFetch: action.payload,
      };

    case commentAction.setTriggerCommentUpdate:
      return {
        ...state,
        triggerCommentUpdate: action.payload,
      };

    case commentAction.setTriggerCommentSubmit:
      return {
        ...state,
        triggerCommentSubmit: action.payload,
      };

    case commentAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case commentAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case commentAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case commentAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case commentAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case commentAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case commentAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case commentAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}

export { commentAction, commentReducer, initialCommentState };
