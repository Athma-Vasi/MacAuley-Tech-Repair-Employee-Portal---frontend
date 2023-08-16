import {
  CommentAction,
  CommentDispatch,
  CommentState,
  CustomCommentObject,
} from './types';

const initialCommentState: CommentState = {
  newComment: '',
  isNewCommentValid: false,
  isNewCommentFocused: false,

  commentIdsToFetch: [],
  commentIdsTreeArray: [],
  customCommentObjectsMap: new Map(),

  triggerFormSubmit: false,

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

  setCommentIdsToFetch: 'setCommentIdsToFetch',
  setInitialCommentIdsTreeArray: 'setInitialCommentIdsTreeArray',
  setCustomCommentObjectsMap: 'setCustomCommentObjectsMap',

  setTriggerFormSubmit: 'setTriggerFormSubmit',

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

    case commentAction.setCommentIdsToFetch:
      return {
        ...state,
        commentIdsToFetch: action.payload,
      };

    /**
 * type CustomCommentObject = {
  commentDoc: QueryResponseData<CommentDocument>;
  childCommentsArray: CustomCommentObject[];
  childPagesCount: number;
  childLimitPerPage: number;
  totalChildComments: number;
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;
  isShowChildComments: boolean;
};
 */

    case commentAction.setInitialCommentIdsTreeArray:
      return {
        ...state,
        commentIdsTreeArray: action.payload,
      };

    case commentAction.setCustomCommentObjectsMap: {
      const { payload } = action;
      const customCommentObject: CustomCommentObject = {
        commentDoc: payload,
        childPagesCount: 0,
        childLimitPerPage: 10,
        totalChildComments: 0,
        newQueryFlag: false,
        queryBuilderString: '',
        pageQueryString: '',
        isShowChildComments: false,
      };

      const customCommentObjectsMap = structuredClone(
        state.customCommentObjectsMap
      );
      customCommentObjectsMap.set(payload._id, customCommentObject);

      return {
        ...state,
        customCommentObjectsMap,
      };
    }

    case commentAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
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
