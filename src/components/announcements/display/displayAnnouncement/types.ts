import { QueryResponseData } from '../../../../types';
import { PieChartData } from '../../../displayStatistics/types';
import { AnnouncementDocument, RatingResponse } from '../../create/types';

type DisplayAnnouncementState = {
  announcement: QueryResponseData<AnnouncementDocument> | null;
  rating: number;
  triggerRatingSubmit: boolean;
  ratedAnnouncementsIds: Set<string>;
  ratingPieChartDataArray: PieChartData[];

  comment: string;
  isCommentValid: boolean;
  isCommentFocused: boolean;
  triggerCommentSubmit: boolean;

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type DisplayAnnouncementAction = {
  setAnnouncement: 'setAnnouncement';

  setRating: 'setRating';
  setTriggerRatingSubmit: 'setTriggerRatingSubmit';
  setRatedAnnouncementsIds: 'setRatedAnnouncementsIds';
  setRatingPieChartDataArray: 'setRatingPieChartDataArray';

  setComment: 'setComment';
  setIsCommentValid: 'setIsCommentValid';
  setIsCommentFocused: 'setIsCommentFocused';
  setTriggerCommentSubmit: 'setTriggerCommentSubmit';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type DisplayAnnouncementDispatch =
  | {
      type: DisplayAnnouncementAction['setAnnouncement'];
      payload: QueryResponseData<AnnouncementDocument>;
    }
  | {
      type: DisplayAnnouncementAction['setRating'];
      payload: number;
    }
  | {
      type: DisplayAnnouncementAction['setRatedAnnouncementsIds'];
      payload: string[];
    }
  | {
      type: DisplayAnnouncementAction['setRatingPieChartDataArray'];
      payload: RatingResponse;
    }
  | {
      type:
        | DisplayAnnouncementAction['setTriggerRatingSubmit']
        | DisplayAnnouncementAction['setIsCommentValid']
        | DisplayAnnouncementAction['setIsCommentFocused']
        | DisplayAnnouncementAction['setTriggerCommentSubmit']
        | DisplayAnnouncementAction['setIsError']
        | DisplayAnnouncementAction['setIsLoading']
        | DisplayAnnouncementAction['setIsSubmitting']
        | DisplayAnnouncementAction['setIsSuccessful'];

      payload: boolean;
    }
  | {
      type:
        | DisplayAnnouncementAction['setComment']
        | DisplayAnnouncementAction['setErrorMessage']
        | DisplayAnnouncementAction['setLoadingMessage']
        | DisplayAnnouncementAction['setSubmitMessage']
        | DisplayAnnouncementAction['setSuccessMessage'];

      payload: string;
    };

type DisplayAnnouncementReducer = (
  state: DisplayAnnouncementState,
  action: DisplayAnnouncementDispatch
) => DisplayAnnouncementState;

export type {
  DisplayAnnouncementAction,
  DisplayAnnouncementDispatch,
  DisplayAnnouncementReducer,
  DisplayAnnouncementState,
};
