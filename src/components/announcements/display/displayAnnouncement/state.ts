import { PieChartData } from '../../../displayStatistics/types';
import {
  DisplayAnnouncementAction,
  DisplayAnnouncementDispatch,
  DisplayAnnouncementState,
} from './types';

const initialDisplayAnnouncementState: DisplayAnnouncementState = {
  announcement: null,
  rating: 0,
  triggerRatingSubmit: false,
  ratedAnnouncementsIds: new Set<string>(),
  ratingPieChartDataArray: [],

  newCommentId: '',
  triggerUpdateCommentIds: false,

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
  setRatedAnnouncementsIds: 'setRatedAnnouncementsIds',
  setRatingPieChartDataArray: 'setRatingPieChartDataArray',

  setNewCommentId: 'setNewCommentId',
  setTriggerUpdateCommentIds: 'setTriggerUpdateCommentIds',

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

    case displayAnnouncementAction.setRatedAnnouncementsIds:
      return {
        ...state,
        ratedAnnouncementsIds: new Set<string>([...action.payload]),
      };

    case displayAnnouncementAction.setRatingPieChartDataArray: {
      const ratingResponse = action.payload;
      const { ratingEmotion } = ratingResponse;

      const ratingPieChartDataArray = Object.entries(ratingEmotion).map(
        ([key, value]) => {
          const capsKey = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
          const pieChartData: PieChartData = {
            id: capsKey,
            label: capsKey,
            value,
          };

          return pieChartData;
        }
      );

      return {
        ...state,
        ratingPieChartDataArray,
      };
    }

    case displayAnnouncementAction.setNewCommentId:
      return {
        ...state,
        newCommentId: action.payload,
      };

    case displayAnnouncementAction.setTriggerUpdateCommentIds:
      return {
        ...state,
        triggerUpdateCommentIds: action.payload,
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
