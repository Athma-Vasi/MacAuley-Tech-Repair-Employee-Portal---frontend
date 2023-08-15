import { CommentAction, CommentDispatch, CommentState } from './types';

const initialCommentState: CommentState = {
  newComment: '',
  isNewCommentValid: false,
  isNewCommentFocused: false,

  commentsArray: [],

  triggerFormSubmit: false,

  pages: 0,
  totalDocuments: 0,
  pageQueryString: '',
  queryBuilderString: '?',
  newQueryFlag: false,

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

  setCommentsArray: 'setCommentsArray',

  setTriggerFormSubmit: 'setTriggerFormSubmit',

  setPages: 'setPages',
  setTotalDocuments: 'setTotalDocuments',
  setNewQueryFlag: 'setNewQueryFlag',
  setQueryBuilderString: 'setQueryBuilderString',
  setPageQueryString: 'setPageQueryString',

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

    case commentAction.setCommentsArray:
      return {
        ...state,
        commentsArray: [...state.commentsArray, action.payload],
      };

    case commentAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case commentAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case commentAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
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
