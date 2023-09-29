import React, { CSSProperties } from 'react';

type ImageUploadProps = {
  isParentComponentFormSubmitted: boolean;
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
  style?: CSSProperties;
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

  isLoading: boolean;
  loadingMessage: string;
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
  resetImageToDefault: 'resetImageToDefault';

  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
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
      type:
        | ImageUploadAction['setImageCount']
        | ImageUploadAction['resetImageToDefault'];
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
      type: ImageUploadAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: ImageUploadAction['setLoadingMessage'];
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
