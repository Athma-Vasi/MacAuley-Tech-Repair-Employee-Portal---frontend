import { QueryResponseData } from '../../types';
import {
  CommentAction,
  CommentDispatch,
  CommentDocument,
  CommentState,
  ReactedCommentRequestBody,
} from './types';

const initialCommentState: CommentState = {
  newComment: '',
  isNewCommentValid: false,
  isNewCommentFocused: false,

  quotedUsername: '',
  quotedComment: '',

  reactedCommentId: '',
  reactedRequestBody: {
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
  newQueryFlag: false,
  queryBuilderString: '?',
  pageQueryString: '',
  areCommentsVisible: false,

  commentIdsToFetch: [],
  commentsMap: new Map(),

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
  setReactedRequestBody: 'setReactedRequestBody',

  setTotalDocuments: 'setTotalDocuments',
  setNumberOfPages: 'setNumberOfPages',
  setLimitPerPage: 'setLimitPerPage',
  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',
  setAreCommentsVisible: 'setAreCommentsVisible',

  setCommentIdsToFetch: 'setCommentIdsToFetch',
  setCommentsMap: 'setCommentsMap',
  updateCommentsMap: 'updateCommentsMap',

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
        reactedCommentId: action.payload,
      };

    case commentAction.setReactedRequestBody: {
      const { payload } = action;
      console.log({ payload });
      const { field, commentId, userId, value } = action.payload;
      if (!field) {
        return state;
      }

      const comment = state.commentsMap.get(commentId);
      if (!comment) {
        return state;
      }

      switch (field) {
        case 'likes': {
          const { likedUserIds, likesCount, dislikedUserIds, dislikesCount } =
            comment;

          const likesCountNew = value ? likesCount + 1 : likesCount - 1;
          const likedUserIdsNew = value
            ? Array.from(new Set([...likedUserIds, userId]))
            : likedUserIds.filter((id) => id !== userId);

          // remove from dislikedUserIds and decrement count if liked
          const dislikedUserIdsNew = dislikedUserIds.includes(userId)
            ? dislikedUserIds.filter((id) => id !== userId)
            : dislikedUserIds;
          const dislikesCountNew = dislikedUserIds.includes(userId)
            ? dislikesCount - 1
            : dislikesCount;

          const reactedRequestBody: ReactedCommentRequestBody = {
            fieldsToUpdate: {
              likedUserIds: likedUserIdsNew,
              likesCount: likesCountNew,
              dislikedUserIds: dislikedUserIdsNew,
              dislikesCount: dislikesCountNew,
            },
          };

          return {
            ...state,
            reactedRequestBody,
          };
        }
        case 'dislikes': {
          const { dislikedUserIds, dislikesCount, likedUserIds, likesCount } =
            comment;

          const dislikesCountNew = value
            ? dislikesCount + 1
            : dislikesCount - 1;
          const dislikedUserIdsNew = value
            ? Array.from(new Set([...dislikedUserIds, userId]))
            : dislikedUserIds.filter((id) => id !== userId);

          // remove from likedUserIds and decrement count if disliked
          const likedUserIdsNew = likedUserIds.includes(userId)
            ? likedUserIds.filter((id) => id !== userId)
            : likedUserIds;
          const likesCountNew = likedUserIds.includes(userId)
            ? likesCount - 1
            : likesCount;

          const reactedRequestBody: ReactedCommentRequestBody = {
            fieldsToUpdate: {
              dislikedUserIds: dislikedUserIdsNew,
              dislikesCount: dislikesCountNew,
              likedUserIds: likedUserIdsNew,
              likesCount: likesCountNew,
            },
          };

          return {
            ...state,
            reactedRequestBody,
          };
        }
        case 'reports': {
          const { reportedUserIds, reportsCount } = comment;

          const reportsCountNew = value ? reportsCount + 1 : reportsCount - 1;
          const reportedUserIdsNew = value
            ? Array.from(new Set([...reportedUserIds, userId]))
            : reportedUserIds.filter((id) => id !== userId);

          const reactedRequestBody: ReactedCommentRequestBody = {
            fieldsToUpdate: {
              reportedUserIds: reportedUserIdsNew,
              reportsCount: reportsCountNew,
            },
          };

          return {
            ...state,
            reactedRequestBody,
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
