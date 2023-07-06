import {
  CreateAnnouncementAction,
  CreateAnnouncementDispatch,
  CreateAnnouncementState,
} from './types';

const initialCreateAnnouncementState: CreateAnnouncementState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  bannerImageSrc: '',
  isValidBannerImageSrc: false,
  isBannerImageSrcFocused: false,

  bannerImageAlt: '',
  isValidBannerImageAlt: false,
  isBannerImageAltFocused: false,

  article: [],
  timeToRead: 0,
};

const createAnnouncementAction: CreateAnnouncementAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setBannerImageSrc: 'setBannerImageSrc',
  setIsValidBannerImageSrc: 'setIsValidBannerImageSrc',
  setIsBannerImageSrcFocused: 'setIsBannerImageSrcFocused',

  setBannerImageAlt: 'setBannerImageAlt',
  setIsValidBannerImageAlt: 'setIsValidBannerImageAlt',
  setIsBannerImageAltFocused: 'setIsBannerImageAltFocused',

  setArticle: 'setArticle',
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
    case createAnnouncementAction.setArticle:
      return {
        ...state,
        article: action.payload as string[],
      };
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
