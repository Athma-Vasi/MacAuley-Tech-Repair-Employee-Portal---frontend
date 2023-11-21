import { Currency } from '../../../types';
import { createProductAction } from './state';
import {
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
  DimensionUnit,
  MerchandiseAvailability,
  WeightUnit,
} from './types';

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ╭────────────────────────────────────────────────────────────────╮
//  │  REDUCER FUNCTIONS                                             │
//  ╰────────────────────────────────────────────────────────────────╯
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// - contains all reducer functions for create product component
// - each reducer function is mapped to an action type

//  ╭────────────────────────────────────────────────────────────────╮
//  │  PAGE 1                                                        │
//  ╰────────────────────────────────────────────────────────────────╯

// page 1 -> brand
function setBrand_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    brand: action.payload as string,
  };
}

function setIsBrandValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isBrandValid: action.payload as boolean,
  };
}

function setIsBrandFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isBrandFocused: action.payload as boolean,
  };
}

// page 1 -> model
function setModel_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    model: action.payload as string,
  };
}

function setIsModelValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isModelValid: action.payload as boolean,
  };
}

function setIsModelFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isModelFocused: action.payload as boolean,
  };
}

// page 1 -> description
function setDescription_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    description: action.payload as string,
  };
}

function setIsDescriptionValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDescriptionValid: action.payload as boolean,
  };
}

function setIsDescriptionFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDescriptionFocused: action.payload as boolean,
  };
}

// page 1 -> price
function setPrice_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    price: action.payload as string,
  };
}

function setIsPriceValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isPriceValid: action.payload as boolean,
  };
}

function setIsPriceFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isPriceFocused: action.payload as boolean,
  };
}

// page 1 -> currency
function setCurrency_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currency: action.payload as Currency,
  };
}

// page 1 -> availability
function setAvailability_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    availability: action.payload as MerchandiseAvailability,
  };
}

// page 1 -> quantity
function setQuantity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    quantity: action.payload as string,
  };
}

function setIsQuantityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isQuantityValid: action.payload as boolean,
  };
}

function setIsQuantityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isQuantityFocused: action.payload as boolean,
  };
}

// page 1 -> weight
function setWeight_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weight: action.payload as string,
  };
}

function setIsWeightValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isWeightValid: action.payload as boolean,
  };
}

function setIsWeightFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isWeightFocused: action.payload as boolean,
  };
}

// page 1 -> weight unit
function setWeightUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weightUnit: action.payload as WeightUnit,
  };
}

// page 1 -> dimension height
function setDimensionHeight_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeight: action.payload as string,
  };
}

function setIsDimensionHeightValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionHeightValid: action.payload as boolean,
  };
}

function setIsDimensionHeightFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionHeightFocused: action.payload as boolean,
  };
}

// page 1 -> dimension height unit
function setDimensionHeightUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeightUnit: action.payload as DimensionUnit,
  };
}

// page 1 -> dimension width
function setDimensionWidth_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidth: action.payload as string,
  };
}

function setIsDimensionWidthValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionWidthValid: action.payload as boolean,
  };
}

function setIsDimensionWidthFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionWidthFocused: action.payload as boolean,
  };
}

// page 1 -> dimension width unit
function setDimensionWidthUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidthUnit: action.payload as DimensionUnit,
  };
}

// page 1 -> dimension length
function setDimensionLength_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLength: action.payload as string,
  };
}

function setIsDimensionLengthValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionLengthValid: action.payload as boolean,
  };
}

function setIsDimensionLengthFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDimensionLengthFocused: action.payload as boolean,
  };
}

// page 1 -> dimension length unit
function setDimensionLengthUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLengthUnit: action.payload as DimensionUnit,
  };
}

// page 1 -> additional comments
function setAdditionalComments_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    additionalComments: action.payload as string,
  };
}

function setIsAdditionalCommentsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAdditionalCommentsFocused: action.payload as boolean,
  };
}

function setIsAdditionalCommentsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAdditionalCommentsValid: action.payload as boolean,
  };
}

const createProductReducerMap = new Map<
  CreateProductAction[keyof CreateProductAction],
  (
    state: CreateProductState,
    action: CreateProductDispatch
  ) => CreateProductState
>([
  // page 1

  // page 1 -> brand
  [createProductAction.setBrand, setBrand_CreateProductReducer],
  [createProductAction.setIsBrandValid, setIsBrandValid_CreateProductReducer],
  [
    createProductAction.setIsBrandFocused,
    setIsBrandFocused_CreateProductReducer,
  ],

  // page 1 -> model
  [createProductAction.setModel, setModel_CreateProductReducer],
  [createProductAction.setIsModelValid, setIsModelValid_CreateProductReducer],
  [
    createProductAction.setIsModelFocused,
    setIsModelFocused_CreateProductReducer,
  ],

  // page 1 -> description
  [createProductAction.setDescription, setDescription_CreateProductReducer],
  [
    createProductAction.setIsDescriptionValid,
    setIsDescriptionValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDescriptionFocused,
    setIsDescriptionFocused_CreateProductReducer,
  ],

  // page 1 -> price
  [createProductAction.setPrice, setPrice_CreateProductReducer],
  [createProductAction.setIsPriceValid, setIsPriceValid_CreateProductReducer],
  [
    createProductAction.setIsPriceFocused,
    setIsPriceFocused_CreateProductReducer,
  ],

  // page 1 -> currency
  [createProductAction.setCurrency, setCurrency_CreateProductReducer],

  // page 1 -> availability
  [createProductAction.setAvailability, setAvailability_CreateProductReducer],

  // page 1 -> quantity
  [createProductAction.setQuantity, setQuantity_CreateProductReducer],
  [
    createProductAction.setIsQuantityValid,
    setIsQuantityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsQuantityFocused,
    setIsQuantityFocused_CreateProductReducer,
  ],

  // page 1 -> weight
  [createProductAction.setWeight, setWeight_CreateProductReducer],
  [createProductAction.setIsWeightValid, setIsWeightValid_CreateProductReducer],
  [
    createProductAction.setIsWeightFocused,
    setIsWeightFocused_CreateProductReducer,
  ],

  // page 1 -> weight unit
  [createProductAction.setWeightUnit, setWeightUnit_CreateProductReducer],

  // page 1 -> dimension height
  [
    createProductAction.setDimensionHeight,
    setDimensionHeight_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionHeightValid,
    setIsDimensionHeightValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionHeightFocused,
    setIsDimensionHeightFocused_CreateProductReducer,
  ],

  // page 1 -> dimension height unit
  [
    createProductAction.setDimensionHeightUnit,
    setDimensionHeightUnit_CreateProductReducer,
  ],

  // page 1 -> dimension width
  [
    createProductAction.setDimensionWidth,
    setDimensionWidth_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionWidthValid,
    setIsDimensionWidthValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionWidthFocused,
    setIsDimensionWidthFocused_CreateProductReducer,
  ],

  // page 1 -> dimension width unit
  [
    createProductAction.setDimensionWidthUnit,
    setDimensionWidthUnit_CreateProductReducer,
  ],

  // page 1 -> dimension length
  [
    createProductAction.setDimensionLength,
    setDimensionLength_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionLengthValid,
    setIsDimensionLengthValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDimensionLengthFocused,
    setIsDimensionLengthFocused_CreateProductReducer,
  ],

  // page 1 -> dimension length unit
  [
    createProductAction.setDimensionLengthUnit,
    setDimensionLengthUnit_CreateProductReducer,
  ],

  // page 1 -> additional comments
  [
    createProductAction.setAdditionalComments,
    setAdditionalComments_CreateProductReducer,
  ],
  [
    createProductAction.setIsAdditionalCommentsFocused,
    setIsAdditionalCommentsFocused_CreateProductReducer,
  ],
  [
    createProductAction.setIsAdditionalCommentsValid,
    setIsAdditionalCommentsValid_CreateProductReducer,
  ],
]);

// function createProductReducer(
//   state: CreateProductState,
//   action: CreateProductDispatch
// ): CreateProductState {
//   const reducer = createProductReducerMap.get(action.type);
//   return reducer ? reducer(state, action) : state;
// }

export {
  createProductReducerMap,
  setAdditionalComments_CreateProductReducer,
  setAvailability_CreateProductReducer,
  setBrand_CreateProductReducer,
  setCurrency_CreateProductReducer,
  setDescription_CreateProductReducer,
  setDimensionHeight_CreateProductReducer,
  setDimensionHeightUnit_CreateProductReducer,
  setDimensionLength_CreateProductReducer,
  setDimensionLengthUnit_CreateProductReducer,
  setDimensionWidth_CreateProductReducer,
  setDimensionWidthUnit_CreateProductReducer,
  setIsAdditionalCommentsFocused_CreateProductReducer,
  setIsAdditionalCommentsValid_CreateProductReducer,
  setIsBrandFocused_CreateProductReducer,
  setIsBrandValid_CreateProductReducer,
  setIsDescriptionFocused_CreateProductReducer,
  setIsDescriptionValid_CreateProductReducer,
  setIsDimensionHeightFocused_CreateProductReducer,
  setIsDimensionHeightValid_CreateProductReducer,
  setIsDimensionLengthFocused_CreateProductReducer,
  setIsDimensionLengthValid_CreateProductReducer,
  setIsDimensionWidthFocused_CreateProductReducer,
  setIsDimensionWidthValid_CreateProductReducer,
  setIsModelFocused_CreateProductReducer,
  setIsModelValid_CreateProductReducer,
  setIsPriceFocused_CreateProductReducer,
  setIsPriceValid_CreateProductReducer,
  setIsQuantityFocused_CreateProductReducer,
  setIsQuantityValid_CreateProductReducer,
  setIsWeightFocused_CreateProductReducer,
  setIsWeightValid_CreateProductReducer,
  setModel_CreateProductReducer,
  setPrice_CreateProductReducer,
  setQuantity_CreateProductReducer,
  setWeight_CreateProductReducer,
  setWeightUnit_CreateProductReducer,
};
