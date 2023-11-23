import { Currency, SetStepsInErrorPayload } from '../../../../types';
import {
  DimensionUnit,
  PeripheralsInterface,
  MerchandiseAvailability,
  ProductReview,
  WeightUnit,
} from '../../../../types/productCategory.types';
import {
  AdditionalFieldsPayload,
  AdditionalFieldsValidFocusedPayload,
} from '../../create/types';

type AccessorySchema = {
  userId: string;
  username: string;

  // page 1
  brand: string;
  model: string;
  description: string;
  price: Number;
  currency: Currency;
  availability: MerchandiseAvailability;
  quantity: number;
  weight: number;
  weightUnit: WeightUnit;
  length: number;
  lengthUnit: DimensionUnit;
  width: number;
  widthUnit: DimensionUnit;
  height: number;
  heightUnit: DimensionUnit;
  additionalComments: string;

  // page 2
  accessoryType: string; // Headphones, Speakers, etc.
  accessoryColor: string; // Black, White, etc.
  accessoryInterface: PeripheralsInterface; // USB, Bluetooth, etc.
  additionalFields: {
    [key: string]: string;
  };

  // page 3
  reviews: ProductReview[];
  uploadedFilesIds: string[];
};

type AccessoryDocument = AccessorySchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateAccessoryState = {
  // page 1

  // page 1 -> brand
  brand: string;
  isBrandValid: boolean;
  isBrandFocused: boolean;
  // page 1 -> model
  model: string;
  isModelValid: boolean;
  isModelFocused: boolean;
  // page 1 -> description
  description: string;
  isDescriptionValid: boolean;
  isDescriptionFocused: boolean;
  // page 1 -> price, currency, availability, quantity
  price: string;
  isPriceValid: boolean;
  isPriceFocused: boolean;
  currency: Currency;
  availability: MerchandiseAvailability;
  quantity: string;
  isQuantityValid: boolean;
  isQuantityFocused: boolean;
  // page 1 -> weight
  weight: string;
  isWeightValid: boolean;
  isWeightFocused: boolean;
  weightUnit: WeightUnit;
  // page 1 -> dimensions
  dimensionLength: string;
  isDimensionLengthValid: boolean;
  isDimensionLengthFocused: boolean;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: string;
  isDimensionWidthValid: boolean;
  isDimensionWidthFocused: boolean;
  dimensionWidthUnit: DimensionUnit;
  dimensionHeight: string;
  isDimensionHeightValid: boolean;
  isDimensionHeightFocused: boolean;
  dimensionHeightUnit: DimensionUnit;
  // page 1 -> additional comments
  additionalComments: string;
  isAdditionalCommentsValid: boolean;
  isAdditionalCommentsFocused: boolean;

  // page 2

  // page 2 -> accessory fields
  accessoryType: string;
  isAccessoryTypeValid: boolean;
  isAccessoryTypeFocused: boolean;
  accessoryColor: string;
  isAccessoryColorValid: boolean;
  isAccessoryColorFocused: boolean;
  accessoryInterface: PeripheralsInterface;
  accessoryFieldsAdditionalMap: Map<number, [string, string]>; // Map<index, [key, value]>
  areAccessoryFieldsAdditionalMapValid: Map<number, [boolean, boolean]>; // Map<index, [isKeyValid, isValueValid]>
  areAccessoryFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>; // Map<index, [isKeyFocused, isValueFocused]>
  currentlySelectedAdditionalFieldIndex: number; // currently updating idx

  // page 3
  imgFormDataArray: FormData[];
  areImagesValid: boolean;

  // misc.
  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type CreateAccessoryAction = {
  // page 1
  // page 1 -> brand
  setBrand: 'setBrand';
  setIsBrandValid: 'setIsBrandValid';
  setIsBrandFocused: 'setIsBrandFocused';
  // page 1 -> model, product category
  setModel: 'setModel';
  setIsModelValid: 'setIsModelValid';
  setIsModelFocused: 'setIsModelFocused';
  // page 1 -> description
  setDescription: 'setDescription';
  setIsDescriptionValid: 'setIsDescriptionValid';
  setIsDescriptionFocused: 'setIsDescriptionFocused';
  // page 1 -> price, currency, availability
  setPrice: 'setPrice';
  setIsPriceValid: 'setIsPriceValid';
  setIsPriceFocused: 'setIsPriceFocused';
  setCurrency: 'setCurrency';
  setAvailability: 'setAvailability';
  // page 1 -> quantity
  setQuantity: 'setQuantity';
  setIsQuantityValid: 'setIsQuantityValid';
  setIsQuantityFocused: 'setIsQuantityFocused';
  // page 1 -> weight
  setWeight: 'setWeight';
  setIsWeightValid: 'setIsWeightValid';
  setIsWeightFocused: 'setIsWeightFocused';
  setWeightUnit: 'setWeightUnit';
  // page 1 -> dimensions
  setDimensionLength: 'setDimensionLength';
  setIsDimensionLengthValid: 'setIsDimensionLengthValid';
  setIsDimensionLengthFocused: 'setIsDimensionLengthFocused';
  setDimensionLengthUnit: 'setDimensionLengthUnit';
  setDimensionWidth: 'setDimensionWidth';
  setIsDimensionWidthValid: 'setIsDimensionWidthValid';
  setIsDimensionWidthFocused: 'setIsDimensionWidthFocused';
  setDimensionWidthUnit: 'setDimensionWidthUnit';
  setDimensionHeight: 'setDimensionHeight';
  setIsDimensionHeightValid: 'setIsDimensionHeightValid';
  setIsDimensionHeightFocused: 'setIsDimensionHeightFocused';
  setDimensionHeightUnit: 'setDimensionHeightUnit';
  // page 1 -> additional comments
  setAdditionalComments: 'setAdditionalComments';
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  // page 2 -> specifications -> accessory
  setAccessoryType: 'setAccessoryType';
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid';
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused';
  setAccessoryColor: 'setAccessoryColor';
  setIsAccessoryColorValid: 'setIsAccessoryColorValid';
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused';
  setAccessoryInterface: 'setAccessoryInterface';
  setAccessoryFieldsAdditionalMap: 'setAccessoryFieldsAdditionalMap';
  setAreAccessoryFieldsAdditionalMapValid: 'setAreAccessoryFieldsAdditionalMapValid';
  setAreAccessoryFieldsAdditionalMapFocused: 'setAreAccessoryFieldsAdditionalMapFocused';
  setCurrentlySelectedAdditionalFieldIndex: 'setCurrentlySelectedAdditionalFieldIndex';

  // page 3
  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type CreateAccessoryDispatch =
  | {
      type: CreateAccessoryAction['setBrand'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsBrandValid']
        | CreateAccessoryAction['setIsBrandFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setModel'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsModelValid']
        | CreateAccessoryAction['setIsModelFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setDescription'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsDescriptionValid']
        | CreateAccessoryAction['setIsDescriptionFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setPrice'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsPriceValid']
        | CreateAccessoryAction['setIsPriceFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setCurrency'];
      payload: Currency;
    }
  | {
      type: CreateAccessoryAction['setAvailability'];
      payload: MerchandiseAvailability;
    }
  | {
      type: CreateAccessoryAction['setQuantity'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsQuantityValid']
        | CreateAccessoryAction['setIsQuantityFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setWeight'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsWeightValid']
        | CreateAccessoryAction['setIsWeightFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setWeightUnit'];
      payload: WeightUnit;
    }
  | {
      type: CreateAccessoryAction['setDimensionLength'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsDimensionLengthFocused']
        | CreateAccessoryAction['setIsDimensionLengthValid'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setDimensionLengthUnit'];
      payload: DimensionUnit;
    }
  | {
      type: CreateAccessoryAction['setDimensionWidth'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsDimensionWidthValid']
        | CreateAccessoryAction['setIsDimensionWidthFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setDimensionWidthUnit'];
      payload: DimensionUnit;
    }
  | {
      type: CreateAccessoryAction['setDimensionHeight'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsDimensionHeightValid']
        | CreateAccessoryAction['setIsDimensionHeightFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setDimensionHeightUnit'];
      payload: DimensionUnit;
    }
  | {
      type: CreateAccessoryAction['setAdditionalComments'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsAdditionalCommentsValid']
        | CreateAccessoryAction['setIsAdditionalCommentsFocused'];
      payload: boolean;
    } // specifications -> accessory
  | {
      type: CreateAccessoryAction['setAccessoryType'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsAccessoryTypeValid']
        | CreateAccessoryAction['setIsAccessoryTypeFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setAccessoryColor'];
      payload: string;
    }
  | {
      type:
        | CreateAccessoryAction['setIsAccessoryColorValid']
        | CreateAccessoryAction['setIsAccessoryColorFocused'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setAccessoryInterface'];
      payload: PeripheralsInterface;
    }
  | {
      type: CreateAccessoryAction['setAccessoryFieldsAdditionalMap'];
      payload: AdditionalFieldsPayload;
    }
  | {
      type:
        | CreateAccessoryAction['setAreAccessoryFieldsAdditionalMapValid']
        | CreateAccessoryAction['setAreAccessoryFieldsAdditionalMapFocused'];
      payload: AdditionalFieldsValidFocusedPayload;
    } // page 3
  | {
      type: CreateAccessoryAction['setCurrentlySelectedAdditionalFieldIndex'];
      payload: number;
    }
  | {
      type: CreateAccessoryAction['setImgFormDataArray'];
      payload: FormData[];
    }
  | {
      type: CreateAccessoryAction['setAreImagesValid'];
      payload: boolean;
    }
  //
  | {
      type: CreateAccessoryAction['setTriggerFormSubmit'];
      payload: boolean;
    }
  | {
      type: CreateAccessoryAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateAccessoryAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | CreateAccessoryAction['setIsSubmitting']
        | CreateAccessoryAction['setIsSuccessful'];
      payload: boolean;
    }
  | {
      type:
        | CreateAccessoryAction['setSubmitMessage']
        | CreateAccessoryAction['setSuccessMessage'];
      payload: string;
    };

export type {
  AccessoryDocument,
  AccessorySchema,
  CreateAccessoryAction,
  CreateAccessoryDispatch,
  CreateAccessoryState,
};
