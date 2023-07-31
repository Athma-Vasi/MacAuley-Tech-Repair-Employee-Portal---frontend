import {
  ImageUploadAction,
  ImageUploadDispatch,
  ImageUploadState,
} from './types';

const initialImageUploadState: ImageUploadState = {
  images: [],
  imageCount: 0,
  imagePreviews: [],

  areValidImageSizes: [],
  areValidImageKinds: [],
  areValidImageTypes: [],
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
  removeImage: 'removeImage',
  setImageCount: 'setImageCount',
  setImagePreviews: 'setImagePreviews',

  setAreValidImageSizes: 'setAreValidImageSizes',
  setAreValidImageKinds: 'setAreValidImageKinds',
  setAreValidImageTypes: 'setAreValidImageTypes',
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
    case imageUploadAction.removeImage: {
      const index = action.payload;

      const images = [...state.images];
      images.splice(index, 1);

      const imageCount = state.imageCount - 1;

      const imagePreviews = [...state.imagePreviews];
      imagePreviews.splice(index, 1);

      const areValidImageSizes = [...state.areValidImageSizes];
      areValidImageSizes.splice(index, 1);

      const areValidImageKinds = [...state.areValidImageKinds];
      areValidImageKinds.splice(index, 1);

      const areValidImageTypes = [...state.areValidImageTypes];
      areValidImageTypes.splice(index, 1);

      const areImagesFocused = [...state.areImagesFocused];
      areImagesFocused.splice(index, 1);

      const qualities = [...state.qualities];
      qualities.splice(index, 1);

      const orientations = [...state.orientations];
      orientations.splice(index, 1);

      const scales = [...state.scales];
      scales.splice(index, 1);

      return {
        ...state,
        images,
        imageCount,
        imagePreviews,
        areValidImageSizes,
        areValidImageKinds,
        areValidImageTypes,
        areImagesFocused,
        qualities,
        orientations,
        scales,
      };
    }

    case imageUploadAction.setImagePreviews: {
      const { index, imagePreview } = action.payload;

      const imagePreviews = [...state.imagePreviews];
      imagePreviews[index] = imagePreview;

      return {
        ...state,
        imagePreviews,
      };
    }

    case imageUploadAction.setImageCount:
      return {
        ...state,
        imageCount: action.payload,
      };

    case imageUploadAction.setAreValidImageSizes: {
      const { index, value } = action.payload;

      const areValidImageSizes = [...state.areValidImageSizes];
      areValidImageSizes[index] = value;

      return {
        ...state,
        areValidImageSizes,
      };
    }
    case imageUploadAction.setAreValidImageKinds: {
      const { index, value } = action.payload;

      const areValidImageKinds = [...state.areValidImageKinds];
      areValidImageKinds[index] = value;

      return {
        ...state,
        areValidImageKinds,
      };
    }
    case imageUploadAction.setAreValidImageTypes: {
      const { index, value } = action.payload;

      const areValidImageTypes = [...state.areValidImageTypes];
      areValidImageTypes[index] = value;

      return {
        ...state,
        areValidImageTypes,
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

export { imageUploadAction, imageUploadReducer, initialImageUploadState };
