import React, { CSSProperties } from 'react';

type ImageUploadProps = {
  style?: CSSProperties;
  maxImages: number;
  maxImageSize: number; // in kb
  parentComponentName: string;
  setImgFormDataArray: 'setImgFormDataArray';
  setImgFormDataArrayDispatch: React.Dispatch<{
    type: 'setImgFormDataArray';
    payload: FormData[];
  }>;
  setAreImagesValid: 'setAreImagesValid';
  setAreImagesValidDispatch: React.Dispatch<{
    type: 'setAreImagesValid';
    payload: boolean;
  }>;
  isParentComponentFormSubmitted: boolean;
};

type ImageUploadState = {
  images: File[];
  imageCount: number;
  imagePreviews: (File | Blob)[];

  areValidImageSizes: boolean[];
  areValidImageKinds: boolean[];
  areValidImageTypes: boolean[];

  qualities: number[];
  orientations: number[];

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSuccess: boolean;
  successMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
};

type ImageUploadLocalForage = {
  imageCount: number;
  images: File[];
  imagePreviews: (File | Blob)[];
  qualities: number[];
  orientations: number[];
};

type ImageUploadAction = {
  setImages: 'setImages';
  removeImage: 'removeImage';
  setImageCount: 'setImageCount';
  setImagePreviews: 'setImagePreviews';

  setAreValidImageSizes: 'setAreValidImageSizes';
  setAreValidImageKinds: 'setAreValidImageKinds';
  setAreValidImageTypes: 'setAreValidImageTypes';

  setQualities: 'setQualities';
  setOrientations: 'setOrientations';

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
        image: File | null;
      };
    }
  | {
      type: ImageUploadAction['setImagePreviews'];
      payload: {
        index: number;
        imagePreview: File | Blob | null;
      };
    }
  | {
      type: ImageUploadAction['removeImage'];
      payload: number;
    }
  | {
      type: ImageUploadAction['setImageCount'];
      payload: number;
    }
  | {
      type:
        | ImageUploadAction['setAreValidImageSizes']
        | ImageUploadAction['setAreValidImageKinds']
        | ImageUploadAction['setAreValidImageTypes'];
      payload: {
        index: number;
        value: boolean;
      };
    }
  | {
      type:
        | ImageUploadAction['setQualities']
        | ImageUploadAction['setOrientations'];
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
  ImageUploadLocalForage,
  ImageUploadProps,
  ImageUploadReducer,
  ImageUploadState,
};
