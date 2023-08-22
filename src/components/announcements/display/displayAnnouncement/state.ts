import { PieChartData } from '../../../displayStatistics/types';
import { RatingResponse } from '../../create/types';
import {
  DisplayAnnouncementAction,
  DisplayAnnouncementDispatch,
  DisplayAnnouncementState,
} from './types';

const initialDisplayAnnouncementState: DisplayAnnouncementState = {
  announcement: null,
  rating: 0,
  triggerRatingSubmit: false,
  ratingPieChartDataArray: [],

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
  updateRatingResponse: 'updateRatingResponse',
  setTriggerRatingSubmit: 'setTriggerRatingSubmit',
  setRatingPieChartDataArray: 'setRatingPieChartDataArray',

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

    case displayAnnouncementAction.updateRatingResponse: {
      const { rating, userId } = action.payload;

      const prevAnnouncement = structuredClone(state.announcement);
      if (!prevAnnouncement) {
        return state;
      }

      const prevRatingResponse = structuredClone(
        prevAnnouncement.ratingResponse
      );
      if (!prevRatingResponse) {
        return state;
      }

      const prevRatingEmotion = prevRatingResponse.ratingEmotion;
      switch (rating) {
        case 1: {
          prevRatingEmotion.devastated += 1;
          break;
        }
        case 2: {
          prevRatingEmotion.annoyed += 1;
          break;
        }
        case 3: {
          prevRatingEmotion.neutral += 1;
          break;
        }
        case 4: {
          prevRatingEmotion.happy += 1;
          break;
        }
        case 5: {
          prevRatingEmotion.ecstatic += 1;
          break;
        }
        default:
          break;
      }

      const ratingResponse: RatingResponse = {
        ratingEmotion: prevRatingEmotion,
        ratingCount: prevRatingResponse.ratingCount + 1,
      };

      const prevRatedUserIds = prevAnnouncement.ratedUserIds;
      if (!prevRatedUserIds) {
        return state;
      }
      const updatedRatedUserIds = Array.from(
        new Set([...prevRatedUserIds, userId])
      );

      const updatedAnnouncement = {
        ...prevAnnouncement,
        ratingResponse,
        ratedUserIds: updatedRatedUserIds,
      };

      return {
        ...state,
        announcement: updatedAnnouncement,
      };
    }

    case displayAnnouncementAction.setTriggerRatingSubmit:
      return {
        ...state,
        triggerRatingSubmit: action.payload,
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
