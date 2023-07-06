import {
  ArticleParagraphFocusedPayload,
  ArticlePayload,
  CreateAnnouncementAction,
  CreateAnnouncementDispatch,
  CreateAnnouncementState,
} from './types';

const initialCreateAnnouncementState: CreateAnnouncementState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  author: '',
  isValidAuthor: false,
  isAuthorFocused: false,

  bannerImageSrc: '',
  isValidBannerImageSrc: false,
  isBannerImageSrcFocused: false,

  bannerImageAlt: '',
  isValidBannerImageAlt: false,
  isBannerImageAltFocused: false,

  article: [''],
  isValidArticleParagraph: [false],
  isArticleParagraphFocused: [false],

  timeToRead: 0,
};

const createAnnouncementAction: CreateAnnouncementAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setAuthor: 'setAuthor',
  setIsValidAuthor: 'setIsValidAuthor',
  setIsAuthorFocused: 'setIsAuthorFocused',

  setBannerImageSrc: 'setBannerImageSrc',
  setIsValidBannerImageSrc: 'setIsValidBannerImageSrc',
  setIsBannerImageSrcFocused: 'setIsBannerImageSrcFocused',

  setBannerImageAlt: 'setBannerImageAlt',
  setIsValidBannerImageAlt: 'setIsValidBannerImageAlt',
  setIsBannerImageAltFocused: 'setIsBannerImageAltFocused',

  setArticle: 'setArticle',
  setIsValidArticleParagraph: 'setIsValidArticleParagraph',
  setIsArticleParagraphFocused: 'setIsArticleParagraphFocused',

  setTimeToRead: 'setTimeToRead',
};

function createAnnouncementReducer(
  state: CreateAnnouncementState,
  action: CreateAnnouncementDispatch
): CreateAnnouncementState {
  switch (action.type) {
    case createAnnouncementAction.setTitle:
      return {
        ...state,
        title: action.payload as string,
      };
    case createAnnouncementAction.setIsValidTitle:
      return {
        ...state,
        isValidTitle: action.payload as boolean,
      };
    case createAnnouncementAction.setIsTitleFocused:
      return {
        ...state,
        isTitleFocused: action.payload as boolean,
      };

    case createAnnouncementAction.setAuthor:
      return {
        ...state,
        author: action.payload as string,
      };
    case createAnnouncementAction.setIsValidAuthor:
      return {
        ...state,
        isValidAuthor: action.payload as boolean,
      };
    case createAnnouncementAction.setIsAuthorFocused:
      return {
        ...state,
        isAuthorFocused: action.payload as boolean,
      };

    case createAnnouncementAction.setBannerImageSrc:
      return {
        ...state,
        bannerImageSrc: action.payload as string,
      };
    case createAnnouncementAction.setIsValidBannerImageSrc:
      return {
        ...state,
        isValidBannerImageSrc: action.payload as boolean,
      };
    case createAnnouncementAction.setIsBannerImageSrcFocused:
      return {
        ...state,
        isBannerImageSrcFocused: action.payload as boolean,
      };

    case createAnnouncementAction.setBannerImageAlt:
      return {
        ...state,
        bannerImageAlt: action.payload as string,
      };
    case createAnnouncementAction.setIsValidBannerImageAlt:
      return {
        ...state,
        isValidBannerImageAlt: action.payload as boolean,
      };
    case createAnnouncementAction.setIsBannerImageAltFocused:
      return {
        ...state,
        isBannerImageAltFocused: action.payload as boolean,
      };

    case createAnnouncementAction.setArticle: {
      const { index, value } = action.payload as ArticlePayload;
      const article = [...state.article];
      if (index >= article.length) {
        article.push(value);
      } else {
        article[index] = value;
      }

      return {
        ...state,
        article,
      };
    }
    case createAnnouncementAction.setIsValidArticleParagraph: {
      return {
        ...state,
        isValidArticleParagraph: action.payload as boolean[],
      };
    }
    case createAnnouncementAction.setIsArticleParagraphFocused: {
      const { index, value } = action.payload as ArticleParagraphFocusedPayload;
      const isArticleParagraphFocused = [...state.isArticleParagraphFocused];
      if (index >= isArticleParagraphFocused.length) {
        isArticleParagraphFocused.push(value);
      } else {
        isArticleParagraphFocused[index] = value;
      }

      return {
        ...state,
        isArticleParagraphFocused,
      };
    }

    case createAnnouncementAction.setTimeToRead:
      return {
        ...state,
        timeToRead: action.payload as number,
      };
    default:
      return state;
  }
}

export {
  initialCreateAnnouncementState,
  createAnnouncementAction,
  createAnnouncementReducer,
};
