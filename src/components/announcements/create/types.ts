import { SetStepsInErrorPayload } from '../../../types';

type RatingEmotion = {
  ecstatic: number;
  happy: number;
  neutral: number;
  annoyed: number;
  devastated: number;
};

type RatingResponse = {
  ratingEmotion: RatingEmotion;
  ratingCount: number;
};

type AnnouncementSchema = {
  userId: string;
  username: string;
  title: string;
  author: string;
  bannerImageSrc: string;
  bannerImageAlt: string;
  article: string[];
  timeToRead: number;
  ratingResponse: RatingResponse;
  ratedUserIds: string[];
};

type AnnouncementDocument = AnnouncementSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreateAnnouncementState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  author: string;
  isValidAuthor: boolean;
  isAuthorFocused: boolean;

  bannerImageSrc: string;
  isValidBannerImageSrc: boolean;
  isBannerImageSrcFocused: boolean;

  bannerImageAlt: string;
  isValidBannerImageAlt: boolean;
  isBannerImageAltFocused: boolean;

  article: string[];
  areValidArticleParagraphs: boolean[];
  areArticleParagraphsFocused: boolean[];
  isArticleLengthExceeded: boolean;
  timeToRead: number;

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreateAnnouncementAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setAuthor: 'setAuthor';
  setIsValidAuthor: 'setIsValidAuthor';
  setIsAuthorFocused: 'setIsAuthorFocused';

  setBannerImageSrc: 'setBannerImageSrc';
  setIsValidBannerImageSrc: 'setIsValidBannerImageSrc';
  setIsBannerImageSrcFocused: 'setIsBannerImageSrcFocused';

  setBannerImageAlt: 'setBannerImageAlt';
  setIsValidBannerImageAlt: 'setIsValidBannerImageAlt';
  setIsBannerImageAltFocused: 'setIsBannerImageAltFocused';

  setArticle: 'setArticle';
  setAreValidArticleParagraphs: 'setAreValidArticleParagraphs';
  setAreArticleParagraphsFocused: 'setAreArticleParagraphsFocused';
  setIsArticleLengthExceeded: 'setIsArticleLengthExceeded';

  setModifyArticleParagraph: 'setModifyArticleParagraph';
  setTimeToRead: 'setTimeToRead';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type ArticlePayload = {
  index: number;
  value: string;
};

type ArticleParagraphFocusedPayload = {
  index: number;
  value: boolean;
};

type CreateAnnouncementDispatch =
  | {
      type:
        | CreateAnnouncementAction['setTitle']
        | CreateAnnouncementAction['setAuthor']
        | CreateAnnouncementAction['setBannerImageSrc']
        | CreateAnnouncementAction['setBannerImageAlt']
        | CreateAnnouncementAction['setErrorMessage']
        | CreateAnnouncementAction['setSubmitMessage']
        | CreateAnnouncementAction['setSuccessMessage']
        | CreateAnnouncementAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | CreateAnnouncementAction['setIsValidTitle']
        | CreateAnnouncementAction['setIsTitleFocused']
        | CreateAnnouncementAction['setIsValidAuthor']
        | CreateAnnouncementAction['setIsAuthorFocused']
        | CreateAnnouncementAction['setIsValidBannerImageSrc']
        | CreateAnnouncementAction['setIsBannerImageSrcFocused']
        | CreateAnnouncementAction['setIsValidBannerImageAlt']
        | CreateAnnouncementAction['setIsBannerImageAltFocused']
        | CreateAnnouncementAction['setIsArticleLengthExceeded']
        | CreateAnnouncementAction['setTriggerFormSubmit']
        | CreateAnnouncementAction['setIsError']
        | CreateAnnouncementAction['setIsSubmitting']
        | CreateAnnouncementAction['setIsSuccessful']
        | CreateAnnouncementAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateAnnouncementAction['setArticle'];
      payload: ArticlePayload;
    }
  | {
      type: CreateAnnouncementAction['setAreValidArticleParagraphs'];
      payload: boolean[];
    }
  | {
      type: CreateAnnouncementAction['setAreArticleParagraphsFocused'];
      payload: ArticleParagraphFocusedPayload;
    }
  | {
      type:
        | CreateAnnouncementAction['setTimeToRead']
        | CreateAnnouncementAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateAnnouncementAction['setModifyArticleParagraph'];
      payload: {
        index: number;
        kind: 'insert' | 'delete';
      };
    }
  | {
      type: CreateAnnouncementAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type CreateAnnouncementReducer = (
  state: CreateAnnouncementState,
  action: CreateAnnouncementDispatch
) => CreateAnnouncementState;

type CreateAnnouncementResponse = {
  message: string;
};

export type {
  AnnouncementDocument,
  AnnouncementSchema,
  CreateAnnouncementAction,
  CreateAnnouncementDispatch,
  CreateAnnouncementReducer,
  CreateAnnouncementResponse,
  CreateAnnouncementState,
  RatingEmotion,
  RatingResponse,
};
