type ImageUploadState = {
  images: File[];
  areValidImageSizes: boolean[];
  areImagesFocused: boolean[];

  qualities: number[];
  orientations: number[];
  scales: number[];

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSuccess: boolean;
  successMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
};

type ImageUploadAction = {
  setImages: 'setImages';
  setAreValidImageSizes: 'setAreValidImageSizes';
  setAreImagesFocused: 'setAreImagesFocused';

  setQualities: 'setQualities';
  setOrientations: 'setOrientations';
  setScales: 'setScales';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSuccess: 'setIsSuccess';
  setSuccessMessage: 'setSuccessMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
};

type ImageUploadDispatch =
  | {
      type: ImageUploadAction['setImages'];
      payload: {
        index: number;
        image: File;
      };
    }
  | {
      type:
        | ImageUploadAction['setAreValidImageSizes']
        | ImageUploadAction['setAreImagesFocused'];
      payload: {
        index: number;
        value: boolean;
      };
    }
  | {
      type:
        | ImageUploadAction['setQualities']
        | ImageUploadAction['setOrientations']
        | ImageUploadAction['setScales'];
      payload: {
        index: number;
        value: number;
      };
    }
  | {
      type:
        | ImageUploadAction['setIsError']
        | ImageUploadAction['setIsLoading']
        | ImageUploadAction['setIsSuccess']
        | ImageUploadAction['setIsSubmitting'];
      payload: boolean;
    }
  | {
      type:
        | ImageUploadAction['setErrorMessage']
        | ImageUploadAction['setLoadingMessage']
        | ImageUploadAction['setSuccessMessage']
        | ImageUploadAction['setSubmitMessage'];
      payload: string;
    };

type ImageUploadReducer = (
  state: ImageUploadState,
  action: ImageUploadDispatch
) => ImageUploadState;

export type {
  ImageUploadAction,
  ImageUploadDispatch,
  ImageUploadReducer,
  ImageUploadState,
};
