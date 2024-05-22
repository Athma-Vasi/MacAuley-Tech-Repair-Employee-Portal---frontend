import { Dispatch } from "react";

import { SetPageInErrorPayload, StepperPage } from "../../../types";
import { AccessibleImageInputAction } from "./actions";

type AccessibleImageInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  formData: FormData;
  invalidValueAction: InvalidValueAction;
  maxImageSize?: number;
  maxImages?: number;
  page: number;
  parentDispatch: Dispatch<
    | {
        action: ValidValueAction;
        payload: FormData;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  stepperPages: StepperPage[];
  validValueAction: ValidValueAction;
};

type AccessibleImageInputState = {
  currentImageIndex: number;
  imagesBuffer: File[];
  imageFileBlobs: (File | Blob | null)[];
  qualities: number[];
  orientations: number[];
};

type AccessibleImageInputDispatch =
  | {
      action: AccessibleImageInputAction["addImageToBuffer"];
      payload: File | null;
    }
  | {
      action: AccessibleImageInputAction["removeImageFromBuffer"];
      payload: number;
    }
  | {
      action: AccessibleImageInputAction["resetImageFileBlob"];
      payload: number;
    }
  | {
      action: AccessibleImageInputAction["setImageFileBlobs"];
      payload: {
        index: number;
        fileBlob: File | Blob | null;
      };
    }
  | {
      action: AccessibleImageInputAction["setQualities"];
      payload: {
        index: number;
        value: number;
      };
    }
  | {
      action: AccessibleImageInputAction["setOrientations"];
      payload: {
        index: number;
        value: number;
      };
    };

export type {
  AccessibleImageInputAttributes,
  AccessibleImageInputDispatch,
  AccessibleImageInputState,
};
