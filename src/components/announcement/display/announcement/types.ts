import { QueryResponseData } from '../../../../types';
import { PieChartData } from '../../../displayStatistics/types';
import { AnnouncementDocument, RatingResponse } from '../../create/types';

type DisplayAnnouncementState = {
  announcement: QueryResponseData<AnnouncementDocument> | null;
  rating: number;

  triggerRatingSubmit: boolean;
  ratingPieChartDataArray: PieChartData[];

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
  updateRatingResponse: 'updateRatingResponse';
  setTriggerRatingSubmit: 'setTriggerRatingSubmit';
  setRatingPieChartDataArray: 'setRatingPieChartDataArray';

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
      type: DisplayAnnouncementAction['updateRatingResponse'];
      payload: {
        rating: number;
        userId: string;
      };
    }
  | {
      type: DisplayAnnouncementAction['setRatingPieChartDataArray'];
      payload: RatingResponse;
    }
  | {
      type:
        | DisplayAnnouncementAction['setTriggerRatingSubmit']
        | DisplayAnnouncementAction['setIsLoading']
        | DisplayAnnouncementAction['setIsSubmitting']
        | DisplayAnnouncementAction['setIsSuccessful'];

      payload: boolean;
    }
  | {
      type:
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
