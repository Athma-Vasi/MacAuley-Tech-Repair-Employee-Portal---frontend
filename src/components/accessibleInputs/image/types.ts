import { Dispatch } from "react";

import { SetPageInErrorPayload, StepperPage } from "../../../types";
import { ProductCategory } from "../../dashboard/types";
import { AdditionalFieldsFormDataPayload } from "../../product/dispatch";
import { AccessibleImageInputAction } from "./actions";

type AccessibleImageInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  disabled?: boolean;
  formData: FormData | undefined;
  invalidValueAction: InvalidValueAction;
  maxImageSize?: number;
  maxImages?: number;
  page: number;
  parentDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: FormData;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  productCategory?: ProductCategory;
  productCategoryDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: AdditionalFieldsFormDataPayload;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  stepperPages: StepperPage[];
  validValueAction: ValidValueAction;
};

type AccessibleImageInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleImageInputAttributes<ValidValueAction, InvalidValueAction>;
};

type AccessibleImageInputState = {
  currentImageIndex: number;
  imagesBuffer: File[];
  imageFileBlobs: (File | Blob | null)[];
  isLoading: boolean;
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
      action: AccessibleImageInputAction["setIsLoading"];
      payload: boolean;
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
  AccessibleImageInputProps,
  AccessibleImageInputState,
};
