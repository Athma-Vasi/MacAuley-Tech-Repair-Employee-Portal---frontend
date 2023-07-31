import {
  ImageUploadAction,
  ImageUploadDispatch,
  ImageUploadState,
} from './types';

const initialImageUploadState: ImageUploadState = {
  images: [],
  areValidImageSizes: [],
  areImagesFocused: [],

  qualities: [],
  orientations: [],
  scales: [],

  isError: false,
  errorMessage: '',
  isLoading: false,
  loadingMessage: '',
  isSuccess: false,
  successMessage: '',
  isSubmitting: false,
  submitMessage: '',
};

const imageUploadAction: ImageUploadAction = {
  setImages: 'setImages',
  setAreValidImageSizes: 'setAreValidImageSizes',
  setAreImagesFocused: 'setAreImagesFocused',

  setQualities: 'setQualities',
  setOrientations: 'setOrientations',
  setScales: 'setScales',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSuccess: 'setIsSuccess',
  setSuccessMessage: 'setSuccessMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
};

function imageUploadReducer(
  state: ImageUploadState,
  action: ImageUploadDispatch
): ImageUploadState {
  switch (action.type) {
    case imageUploadAction.setImages: {
      const { index, image } = action.payload;

      const images = [...state.images];
      images[index] = image;

      return {
        ...state,
        images,
      };
    }
    case imageUploadAction.setAreValidImageSizes: {
      const { index, value } = action.payload;

      const areValidImageSizes = [...state.areValidImageSizes];
      areValidImageSizes[index] = value;

      return {
        ...state,
        areValidImageSizes,
      };
    }
    case imageUploadAction.setAreImagesFocused: {
      const { index, value } = action.payload;

      const areImagesFocused = [...state.areImagesFocused];
      areImagesFocused[index] = value;

      return {
        ...state,
        areImagesFocused,
      };
    }
    case imageUploadAction.setQualities: {
      const { index, value } = action.payload;

      const qualities = [...state.qualities];
      qualities[index] = value;

      return {
        ...state,
        qualities,
      };
    }
    case imageUploadAction.setOrientations: {
      const { index, value } = action.payload;

      const orientations = [...state.orientations];
      orientations[index] = value;

      return {
        ...state,
        orientations,
      };
    }
    case imageUploadAction.setScales: {
      const { index, value } = action.payload;

      const scales = [...state.scales];
      scales[index] = value;

      return {
        ...state,
        scales,
      };
    }

    case imageUploadAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case imageUploadAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case imageUploadAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case imageUploadAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case imageUploadAction.setIsSuccess:
      return {
        ...state,
        isSuccess: action.payload,
      };
    case imageUploadAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case imageUploadAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case imageUploadAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    default:
      return state;
  }
}
