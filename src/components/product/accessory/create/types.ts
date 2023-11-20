import { Currency } from '../../../../types';
import {
  DimensionUnit,
  PeripheralsInterface,
  ProductAvailability,
  ProductReview,
  WeightUnit,
} from '../../../../types/productCategory.types';

type AccessorySchema = {
  userId: string;
  username: string;

  // page 1
  brand: string;
  model: string;
  description: string;
  price: Number;
  currency: Currency;
  availability: ProductAvailability;
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
  availability: ProductAvailability;
  quantity: number;
  // page 1 -> weight
  weight: number;
  weightUnit: WeightUnit;
  // page 1 -> dimensions
  dimensionLength: number;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: number;
  dimensionWidthUnit: DimensionUnit;
  dimensionHeight: number;
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
  accessoryFieldsAdditional: Map<number, [string, string]>; // Map<index, [field, value]>
  areAccessoryFieldsAdditionalValid: Map<number, [boolean, boolean]>; // Map<index, [isFieldValid, isValueValid]>
  areAccessoryFieldsAdditionalFocused: Map<number, [boolean, boolean]>; // Map<index, [isFieldFocused, isValueFocused]>

  // page 3
  imgFormDataArray: FormData[];
  areImagesValid: boolean;

  currentlySelectedAdditionalFieldIndex: number; // currently updating idx
  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreateAccessoryAction = {};

type CreateAccessoryDispatch = {};
