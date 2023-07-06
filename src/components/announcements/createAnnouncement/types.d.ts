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
  isValidArticleParagraph: boolean[];
  isArticleParagraphFocused: boolean[];
  isArticleLengthExceeded: boolean;
  timeToRead: number;
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
  setIsValidArticleParagraph: 'setIsValidArticleParagraph';
  setIsArticleParagraphFocused: 'setIsArticleParagraphFocused';
  setIsArticleLengthExceeded: 'setIsArticleLengthExceeded';

  setTimeToRead: 'setTimeToRead';
};

type ReturnArticleParagraphInputProps = {
  article: string[];
  isValidArticleParagraph: boolean[];
  isArticleParagraphFocused: boolean[];
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

type CreateAnnouncementPayload =
  | string
  | number
  | boolean
  | string[]
  | boolean[]
  | ArticlePayload
  | ArticleParagraphFocusedPayload;

type CreateAnnouncementDispatch = {
  type: CreateAnnouncementAction[keyof CreateAnnouncementAction];
  payload: CreateAnnouncementPayload;
};

type CreateAnnouncementReducer = (
  state: CreateAnnouncementState,
  action: CreateAnnouncementDispatch
) => CreateAnnouncementState;

type CreateAnnouncementResponse = {
  message: string;
};

export type {
  AnnouncementSchema,
  AnnouncementDocument,
  Comment,
  RatingFeel,
  ArticlePayload,
  ReturnArticleParagraphInputProps,
  ArticleParagraphFocusedPayload,
  CreateAnnouncementState,
  CreateAnnouncementAction,
  CreateAnnouncementPayload,
  CreateAnnouncementDispatch,
  CreateAnnouncementReducer,
  CreateAnnouncementResponse,
};
