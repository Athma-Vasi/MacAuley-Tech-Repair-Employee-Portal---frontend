import { SetStepsInErrorPayload } from '../../../types';

type RatingFeel = 'estatic' | 'happy' | 'neutral' | 'sad' | 'devastated' | '';

type Comment = {
  userId: string;
  username: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

type AnnouncementSchema = {
  userId: string;
  username: string;
  title: string;
  bannerImageSrc: string;
  bannerImageAlt: string;
  article: string[];
  timeToRead: number;
  rating: {
    feel: RatingFeel;
    count: number;
  };
  comments: Array<Comment>;
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

  setDeleteArticleParagraph: 'setDeleteArticleParagraph';
  setTimeToRead: 'setTimeToRead';

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

type ReturnArticleParagraphInputProps = {
  article: string[];
  areValidArticleParagraphs: boolean[];
  areArticleParagraphsFocused: boolean[];
  returnRegexValidationText?: (paragraph: string) => string;
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
        | CreateAnnouncementAction['setBannerImageAlt'];
      payload: string;
    }
  | {
      type:
        | CreateAnnouncementAction['setIsValidTitle']
        | CreateAnnouncementAction['setIsValidAuthor']
        | CreateAnnouncementAction['setIsValidBannerImageSrc']
        | CreateAnnouncementAction['setIsValidBannerImageAlt'];
      payload: boolean;
    }
  | {
      type:
        | CreateAnnouncementAction['setIsTitleFocused']
        | CreateAnnouncementAction['setIsAuthorFocused']
        | CreateAnnouncementAction['setIsBannerImageSrcFocused']
        | CreateAnnouncementAction['setIsBannerImageAltFocused'];
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
      type: CreateAnnouncementAction['setIsArticleLengthExceeded'];
      payload: boolean;
    }
  | {
      type:
        | CreateAnnouncementAction['setTimeToRead']
        | CreateAnnouncementAction['setCurrentStepperPosition']
        | CreateAnnouncementAction['setDeleteArticleParagraph'];
      payload: number;
    }
  | {
      type: CreateAnnouncementAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | CreateAnnouncementAction['setIsError']
        | CreateAnnouncementAction['setIsSubmitting']
        | CreateAnnouncementAction['setIsSuccessful']
        | CreateAnnouncementAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | CreateAnnouncementAction['setErrorMessage']
        | CreateAnnouncementAction['setSubmitMessage']
        | CreateAnnouncementAction['setSuccessMessage']
        | CreateAnnouncementAction['setLoadingMessage'];
      payload: string;
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
  Comment,
  CreateAnnouncementAction,
  CreateAnnouncementDispatch,
  CreateAnnouncementReducer,
  CreateAnnouncementResponse,
  CreateAnnouncementState,
  RatingFeel,
  ReturnArticleParagraphInputProps,
};
