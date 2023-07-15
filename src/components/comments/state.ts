import {
  CreateCommentAction,
  CreateCommentDispatch,
  CreateCommentState,
} from './types';

const initialCreateCommentState: CreateCommentState = {
  comment: '',
  isCommentValid: false,
  isCommentFocused: false,

  isAnonymous: false,
  isDeleted: false,

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isLoading: false,
  loadingMessage: '',
  isSuccess: false,
  successMessage: '',
};

const createCommentAction: CreateCommentAction = {
  setComment: 'setComment',
  setIsCommentValid: 'setIsCommentValid',
  setIsCommentFocused: 'setIsCommentFocused',

  setIsAnonymous: 'setIsAnonymous',
  setIsDeleted: 'setIsDeleted',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSuccess: 'setIsSuccess',
  setSuccessMessage: 'setSuccessMessage',
};

function createCommentReducer(
  state: CreateCommentState,
  action: CreateCommentDispatch
): CreateCommentState {
  switch (action.type) {
    case createCommentAction.setComment:
      return {
        ...state,
        comment: action.payload,
      };
    case createCommentAction.setIsCommentValid:
      return {
        ...state,
        isCommentValid: action.payload,
      };
    case createCommentAction.setIsCommentFocused:
      return {
        ...state,
        isCommentFocused: action.payload,
      };
    case createCommentAction.setIsAnonymous:
      return {
        ...state,
        isAnonymous: action.payload,
      };
    case createCommentAction.setIsDeleted:
      return {
        ...state,
        isDeleted: action.payload,
      };
    case createCommentAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createCommentAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createCommentAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createCommentAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createCommentAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createCommentAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case createCommentAction.setIsSuccess:
      return {
        ...state,
        isSuccess: action.payload,
      };
    case createCommentAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}

export { createCommentAction, createCommentReducer, initialCreateCommentState };
