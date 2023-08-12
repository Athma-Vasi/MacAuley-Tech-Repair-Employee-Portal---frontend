import {
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
  areValidArticleParagraphs: [false],
  areArticleParagraphsFocused: [false],
  isArticleLengthExceeded: false,

  triggerFormSubmit: false,
  timeToRead: 0,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
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
  setAreValidArticleParagraphs: 'setAreValidArticleParagraphs',
  setAreArticleParagraphsFocused: 'setAreArticleParagraphsFocused',
  setIsArticleLengthExceeded: 'setIsArticleLengthExceeded',

  setModifyArticleParagraph: 'setModifyArticleParagraph',
  setTimeToRead: 'setTimeToRead',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createAnnouncementReducer(
  state: CreateAnnouncementState,
  action: CreateAnnouncementDispatch
): CreateAnnouncementState {
  switch (action.type) {
    case createAnnouncementAction.setTitle:
      return {
        ...state,
        title: action.payload,
      };
    case createAnnouncementAction.setIsValidTitle:
      return {
        ...state,
        isValidTitle: action.payload,
      };
    case createAnnouncementAction.setIsTitleFocused:
      return {
        ...state,
        isTitleFocused: action.payload,
      };

    case createAnnouncementAction.setAuthor:
      return {
        ...state,
        author: action.payload,
      };
    case createAnnouncementAction.setIsValidAuthor:
      return {
        ...state,
        isValidAuthor: action.payload,
      };
    case createAnnouncementAction.setIsAuthorFocused:
      return {
        ...state,
        isAuthorFocused: action.payload,
      };

    case createAnnouncementAction.setBannerImageSrc:
      return {
        ...state,
        bannerImageSrc: action.payload,
      };
    case createAnnouncementAction.setIsValidBannerImageSrc:
      return {
        ...state,
        isValidBannerImageSrc: action.payload,
      };
    case createAnnouncementAction.setIsBannerImageSrcFocused:
      return {
        ...state,
        isBannerImageSrcFocused: action.payload,
      };

    case createAnnouncementAction.setBannerImageAlt:
      return {
        ...state,
        bannerImageAlt: action.payload,
      };
    case createAnnouncementAction.setIsValidBannerImageAlt:
      return {
        ...state,
        isValidBannerImageAlt: action.payload,
      };
    case createAnnouncementAction.setIsBannerImageAltFocused:
      return {
        ...state,
        isBannerImageAltFocused: action.payload,
      };

    case createAnnouncementAction.setArticle: {
      const { index, value } = action.payload;
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
    case createAnnouncementAction.setAreValidArticleParagraphs:
      return {
        ...state,
        areValidArticleParagraphs: action.payload,
      };
    case createAnnouncementAction.setAreArticleParagraphsFocused: {
      const { index, value } = action.payload;
      const areArticleParagraphsFocused = [
        ...state.areArticleParagraphsFocused,
      ];
      if (index >= areArticleParagraphsFocused.length) {
        areArticleParagraphsFocused.push(value);
      }
      areArticleParagraphsFocused[index] = value;

      return {
        ...state,
        areArticleParagraphsFocused,
      };
    }
    case createAnnouncementAction.setIsArticleLengthExceeded:
      return {
        ...state,
        isArticleLengthExceeded: action.payload,
      };

    case createAnnouncementAction.setModifyArticleParagraph: {
      const { index, kind } = action.payload;
      const article = [...state.article];
      const areValidArticleParagraphs = [...state.areValidArticleParagraphs];
      const areArticleParagraphsFocused = [
        ...state.areArticleParagraphsFocused,
      ];

      switch (kind) {
        case 'insert': {
          article.splice(index, 0, '');
          areValidArticleParagraphs.splice(index, 0, false);
          areArticleParagraphsFocused.splice(index, 0, false);
          break;
        }
        case 'delete': {
          article.splice(index, 1);
          areValidArticleParagraphs.splice(index, 1);
          areArticleParagraphsFocused.splice(index, 1);
          break;
        }
        default:
          break;
      }

      return {
        ...state,
        article,
        areValidArticleParagraphs,
        areArticleParagraphsFocused,
      };
    }

    case createAnnouncementAction.setTimeToRead:
      return {
        ...state,
        timeToRead: action.payload,
      };

    case createAnnouncementAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case createAnnouncementAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createAnnouncementAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createAnnouncementAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createAnnouncementAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createAnnouncementAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createAnnouncementAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createAnnouncementAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createAnnouncementAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createAnnouncementAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createAnnouncementAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createAnnouncementAction,
  createAnnouncementReducer,
  initialCreateAnnouncementState,
};

/**
 * case createAnnouncementAction.setArticle: {
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
 */

/**
     * case createAnnouncementAction.setAreArticleParagraphsFocused: {
      const { index, value } = action.payload as ArticleParagraphFocusedPayload;
      const areArticleParagraphsFocused = [...state.areArticleParagraphsFocused];
      if (index >= areArticleParagraphsFocused.length) {
        areArticleParagraphsFocused.push(value);
      } else {
        areArticleParagraphsFocused[index] = value;
      }

      return {
        ...state,
        areArticleParagraphsFocused,
      };
    }
     */
