import {
  DisplayAnnouncementAction,
  DisplayAnnouncementDispatch,
  DisplayAnnouncementState,
} from './types';

const initialDisplayAnnouncementState: DisplayAnnouncementState = {
  announcement: null,
  rating: 0,
  triggerRatingSubmit: false,

  comment: '',
  isCommentValid: false,
  isCommentFocused: false,
  triggerCommentSubmit: false,

  isError: false,
  errorMessage: '',
  isLoading: true,
  loadingMessage: 'Loading announcement...',
  isSuccessful: false,
  successMessage: '',
  isSubmitting: false,
  submitMessage: '',
};

const displayAnnouncementAction: DisplayAnnouncementAction = {
  setAnnouncement: 'setAnnouncement',
  setRating: 'setRating',
  setTriggerRatingSubmit: 'setTriggerRatingSubmit',

  setComment: 'setComment',
  setIsCommentValid: 'setIsCommentValid',
  setIsCommentFocused: 'setIsCommentFocused',
  setTriggerCommentSubmit: 'setTriggerCommentSubmit',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function displayAnnouncementReducer(
  state: DisplayAnnouncementState,
  action: DisplayAnnouncementDispatch
): DisplayAnnouncementState {
  switch (action.type) {
    case displayAnnouncementAction.setAnnouncement:
      return {
        ...state,
        announcement: action.payload,
      };

    case displayAnnouncementAction.setRating:
      return {
        ...state,
        rating: action.payload,
      };

    case displayAnnouncementAction.setTriggerRatingSubmit:
      return {
        ...state,
        triggerRatingSubmit: action.payload,
      };

    case displayAnnouncementAction.setComment:
      return {
        ...state,
        comment: action.payload,
      };

    case displayAnnouncementAction.setIsCommentValid:
      return {
        ...state,
        isCommentValid: action.payload,
      };

    case displayAnnouncementAction.setIsCommentFocused:
      return {
        ...state,
        isCommentFocused: action.payload,
      };

    case displayAnnouncementAction.setTriggerCommentSubmit:
      return {
        ...state,
        triggerCommentSubmit: action.payload,
      };

    case displayAnnouncementAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case displayAnnouncementAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case displayAnnouncementAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayAnnouncementAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case displayAnnouncementAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayAnnouncementAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displayAnnouncementAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayAnnouncementAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  displayAnnouncementAction,
  displayAnnouncementReducer,
  initialDisplayAnnouncementState,
};
