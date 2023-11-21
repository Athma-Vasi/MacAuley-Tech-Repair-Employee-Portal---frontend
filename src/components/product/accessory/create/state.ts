import {
  CreateAccessoryAction,
  CreateAccessoryDispatch,
  CreateAccessoryState,
} from './types';

const initialCreateAccessoryState: CreateAccessoryState = {
  // page 1

  // page 1 -> brand
  brand: '',
  isBrandValid: false,
  isBrandFocused: false,
  // page 1 -> model
  model: '',
  isModelValid: false,
  isModelFocused: false,
  // page 1 -> description
  description: '',
  isDescriptionValid: false,
  isDescriptionFocused: false,
  // page 1 -> price, currency, availability
  price: '',
  isPriceValid: false,
  isPriceFocused: false,
  currency: 'CAD',
  availability: 'In Stock',
  // page 1 -> quantity
  quantity: '',
  isQuantityFocused: false,
  isQuantityValid: false,
  // page 1 -> weight
  weight: '',
  isWeightFocused: false,
  isWeightValid: false,
  weightUnit: 'g',
  // page 1 -> dimension
  dimensionHeight: '',
  isDimensionHeightFocused: false,
  isDimensionHeightValid: false,
  dimensionHeightUnit: 'cm',
  dimensionWidth: '',
  isDimensionWidthFocused: false,
  isDimensionWidthValid: false,
  dimensionWidthUnit: 'cm',
  dimensionLength: '',
  isDimensionLengthFocused: false,
  isDimensionLengthValid: false,
  dimensionLengthUnit: 'cm',
  // page 1 -> additional comments
  additionalComments: '',
  isAdditionalCommentsFocused: false,
  isAdditionalCommentsValid: false,

  // page 2 -> accessories
  accessoryColor: '',
  isAccessoryColorFocused: false,
  isAccessoryColorValid: false,
  accessoryInterface: 'USB',
  accessoryType: '',
  isAccessoryTypeFocused: false,
  isAccessoryTypeValid: false,
  accessoryFieldsAdditional: new Map<number, [string, string]>(),
  areAccessoryFieldsAdditionalFocused: new Map<number, [boolean, boolean]>(),
  areAccessoryFieldsAdditionalValid: new Map<number, [boolean, boolean]>(),
  currentlySelectedAdditionalFieldIndex: 0,

  // page 3
  imgFormDataArray: [],
  areImagesValid: false,

  // misc
  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const createAccessoryAction: CreateAccessoryAction = {
  // page 1

  // page 1 -> brand
  setBrand: 'setBrand',
  setIsBrandValid: 'setIsBrandValid',
  setIsBrandFocused: 'setIsBrandFocused',
  // page 1 -> model, product category
  setModel: 'setModel',
  setIsModelValid: 'setIsModelValid',
  setIsModelFocused: 'setIsModelFocused',
  // page 1 -> description
  setDescription: 'setDescription',
  setIsDescriptionValid: 'setIsDescriptionValid',
  setIsDescriptionFocused: 'setIsDescriptionFocused',
  // page 1 -> price, currency, availability, quantity
  setPrice: 'setPrice',
  setIsPriceValid: 'setIsPriceValid',
  setIsPriceFocused: 'setIsPriceFocused',
  setCurrency: 'setCurrency',
  setAvailability: 'setAvailability',
  // page 1 -> quantity
  setQuantity: 'setQuantity',
  setIsQuantityValid: 'setIsQuantityValid',
  setIsQuantityFocused: 'setIsQuantityFocused',
  // page 1 -> weight
  setWeight: 'setWeight',
  setIsWeightValid: 'setIsWeightValid',
  setIsWeightFocused: 'setIsWeightFocused',
  setWeightUnit: 'setWeightUnit',
  // page 1 -> dimensions
  setDimensionLength: 'setDimensionLength',
  setIsDimensionLengthValid: 'setIsDimensionLengthValid',
  setIsDimensionLengthFocused: 'setIsDimensionLengthFocused',
  setDimensionLengthUnit: 'setDimensionLengthUnit',
  setDimensionWidth: 'setDimensionWidth',
  setIsDimensionWidthValid: 'setIsDimensionWidthValid',
  setIsDimensionWidthFocused: 'setIsDimensionWidthFocused',
  setDimensionWidthUnit: 'setDimensionWidthUnit',
  setDimensionHeight: 'setDimensionHeight',
  setIsDimensionHeightValid: 'setIsDimensionHeightValid',
  setIsDimensionHeightFocused: 'setIsDimensionHeightFocused',
  setDimensionHeightUnit: 'setDimensionHeightUnit',
  // page 1 -> additional comments
  setAdditionalComments: 'setAdditionalComments',
  setIsAdditionalCommentsValid: 'setIsAdditionalCommentsValid',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',

  // page 2 -> accessory
  setAccessoryType: 'setAccessoryType',
  setIsAccessoryTypeValid: 'setIsAccessoryTypeValid',
  setIsAccessoryTypeFocused: 'setIsAccessoryTypeFocused',
  setAccessoryColor: 'setAccessoryColor',
  setIsAccessoryColorValid: 'setIsAccessoryColorValid',
  setIsAccessoryColorFocused: 'setIsAccessoryColorFocused',
  setAccessoryInterface: 'setAccessoryInterface',
  setAccessoryFieldsAdditional: 'setAccessoryFieldsAdditional',
  setAreAccessoryFieldsAdditionalFocused:
    'setAreAccessoryFieldsAdditionalFocused',
  setAreAccessoryFieldsAdditionalValid: 'setAreAccessoryFieldsAdditionalValid',
  setCurrentlySelectedAdditionalFieldIndex:
    'setCurrentlySelectedAdditionalFieldIndex',

  // page 3
  setImgFormDataArray: 'setImgFormDataArray',
  setAreImagesValid: 'setAreImagesValid',

  // misc.
  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function createAccessoryReducer(
  state: CreateAccessoryState,
  action: CreateAccessoryDispatch
): CreateAccessoryState {
  switch (action.type) {
    // page 1
    // page 1 -> brand
    case createAccessoryAction.setBrand:
      return {
        ...state,
        brand: action.payload,
      };
    case createAccessoryAction.setIsBrandValid:
      return {
        ...state,
        isBrandValid: action.payload,
      };
    case createAccessoryAction.setIsBrandFocused:
      return {
        ...state,
        isBrandFocused: action.payload,
      };

    // page 1 -> model
    case createAccessoryAction.setModel:
      return {
        ...state,
        model: action.payload,
      };
    case createAccessoryAction.setIsModelValid:
      return {
        ...state,
        isModelValid: action.payload,
      };
    case createAccessoryAction.setIsModelFocused:
      return {
        ...state,
        isModelFocused: action.payload,
      };

    // page 1 -> description
    case createAccessoryAction.setDescription:
      return {
        ...state,
        description: action.payload,
      };
    case createAccessoryAction.setIsDescriptionValid:
      return {
        ...state,
        isDescriptionValid: action.payload,
      };
    case createAccessoryAction.setIsDescriptionFocused:
      return {
        ...state,
        isDescriptionFocused: action.payload,
      };

    // page 1 -> price
    case createAccessoryAction.setPrice:
      return {
        ...state,
        price: action.payload,
      };
    case createAccessoryAction.setIsPriceValid:
      return {
        ...state,
        isPriceValid: action.payload,
      };
    case createAccessoryAction.setIsPriceFocused:
      return {
        ...state,
        isPriceFocused: action.payload,
      };

    case createAccessoryAction.setCurrency:
      return {
        ...state,
        currency: action.payload,
      };

    case createAccessoryAction.setAvailability:
      return {
        ...state,
        availability: action.payload,
      };

    // page 1 -> quantity
    case createAccessoryAction.setQuantity:
      return {
        ...state,
        quantity: action.payload,
      };
    case createAccessoryAction.setIsQuantityValid:
      return {
        ...state,
        isQuantityValid: action.payload,
      };
    case createAccessoryAction.setIsQuantityFocused:
      return {
        ...state,
        isQuantityFocused: action.payload,
      };

    // page 1 -> weight
    case createAccessoryAction.setWeight:
      return {
        ...state,
        weight: action.payload,
      };
    case createAccessoryAction.setIsWeightValid:
      return {
        ...state,
        isWeightValid: action.payload,
      };
    case createAccessoryAction.setIsWeightFocused:
      return {
        ...state,
        isWeightFocused: action.payload,
      };
    case createAccessoryAction.setWeightUnit:
      return {
        ...state,
        weightUnit: action.payload,
      };

    // page 1 -> dimension

    // page 1 -> dimension -> height
    case createAccessoryAction.setDimensionHeight:
      return {
        ...state,
        dimensionHeight: action.payload,
      };
    case createAccessoryAction.setIsDimensionHeightValid:
      return {
        ...state,
        isDimensionHeightValid: action.payload,
      };
    case createAccessoryAction.setIsDimensionHeightFocused:
      return {
        ...state,
        isDimensionHeightFocused: action.payload,
      };
    case createAccessoryAction.setDimensionHeightUnit:
      return {
        ...state,
        dimensionHeightUnit: action.payload,
      };

    // page 1 -> dimension -> width
    case createAccessoryAction.setDimensionWidth:
      return {
        ...state,
        dimensionWidth: action.payload,
      };
    case createAccessoryAction.setIsDimensionWidthValid:
      return {
        ...state,
        isDimensionWidthValid: action.payload,
      };
    case createAccessoryAction.setIsDimensionWidthFocused:
      return {
        ...state,
        isDimensionWidthFocused: action.payload,
      };
    case createAccessoryAction.setDimensionWidthUnit:
      return {
        ...state,
        dimensionWidthUnit: action.payload,
      };

    // page 1 -> dimension -> length
    case createAccessoryAction.setDimensionLength:
      return {
        ...state,
        dimensionLength: action.payload,
      };
    case createAccessoryAction.setIsDimensionLengthValid:
      return {
        ...state,
        isDimensionLengthValid: action.payload,
      };
    case createAccessoryAction.setIsDimensionLengthFocused:
      return {
        ...state,
        isDimensionLengthFocused: action.payload,
      };
    case createAccessoryAction.setDimensionLengthUnit:
      return {
        ...state,
        dimensionLengthUnit: action.payload,
      };

    // page 1 -> additional comments
    case createAccessoryAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case createAccessoryAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };
    case createAccessoryAction.setIsAdditionalCommentsValid:
      return {
        ...state,
        isAdditionalCommentsValid: action.payload,
      };

    // page 2 -> accessory

    // page 2 -> accessory -> type
    case createAccessoryAction.setAccessoryType:
      return {
        ...state,
        accessoryType: action.payload,
      };
    case createAccessoryAction.setIsAccessoryTypeFocused:
      return {
        ...state,
        isAccessoryTypeFocused: action.payload,
      };
    case createAccessoryAction.setIsAccessoryTypeValid:
      return {
        ...state,
        isAccessoryTypeValid: action.payload,
      };

    // page 2 -> accessory -> color
    case createAccessoryAction.setAccessoryColor:
      return {
        ...state,
        accessoryColor: action.payload,
      };
    case createAccessoryAction.setIsAccessoryColorFocused:
      return {
        ...state,
        isAccessoryColorFocused: action.payload,
      };
    case createAccessoryAction.setIsAccessoryColorValid:
      return {
        ...state,
        isAccessoryColorValid: action.payload,
      };

    // page 2 -> accessory -> interface
    case createAccessoryAction.setAccessoryInterface:
      return {
        ...state,
        accessoryInterface: action.payload,
      };

    // page 2 -> accessory -> additional fields
    case createAccessoryAction.setAccessoryFieldsAdditional: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { data } = action.payload;
          const prevSize = accessoryFieldsAdditionalClone.size;
          accessoryFieldsAdditionalClone.set(prevSize, data);

          return {
            ...state,
            accessoryFieldsAdditional: accessoryFieldsAdditionalClone,
          };
        }
        case 'remove': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { index } = action.payload;
          accessoryFieldsAdditionalClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAccessoryFieldsAdditional = new Map<
            number,
            [string, string]
          >();
          Array.from(accessoryFieldsAdditionalClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [string, string]
              ];

              filteredAccessoryFieldsAdditional.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            accessoryFieldsAdditional: filteredAccessoryFieldsAdditional,
          };
        }
        case 'update': {
          const accessoryFieldsAdditionalClone = structuredClone(
            state.accessoryFieldsAdditional
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = accessoryFieldsAdditionalClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? accessoryFieldsAdditionalClone.set(index, [data, prevValue])
            : accessoryFieldsAdditionalClone.set(index, [prevKey, data]);

          return {
            ...state,
            accessoryFieldsAdditional: accessoryFieldsAdditionalClone,
          };
        }
        default:
          return state;
      }
    }

    case createAccessoryAction.setAreAccessoryFieldsAdditionalFocused: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalFocusedClone.size;
          areAccessoryFieldsAdditionalFocusedClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              areAccessoryFieldsAdditionalFocusedClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalFocusedClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalFocused = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalFocusedClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalFocused.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              filteredAreAccessoryFieldsAdditionalFocused,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
            state.areAccessoryFieldsAdditionalFocused
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal =
            areAccessoryFieldsAdditionalFocusedClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalFocusedClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalFocusedClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalFocused:
              areAccessoryFieldsAdditionalFocusedClone,
          };
        }
        default:
          return state;
      }
    }

    case createAccessoryAction.setAreAccessoryFieldsAdditionalValid: {
      const { operation } = action.payload;

      switch (operation) {
        case 'add': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { data } = action.payload;
          const prevSize = areAccessoryFieldsAdditionalValidClone.size;
          areAccessoryFieldsAdditionalValidClone.set(prevSize, data);

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              areAccessoryFieldsAdditionalValidClone,
          };
        }
        case 'remove': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { index } = action.payload;
          areAccessoryFieldsAdditionalValidClone.delete(index);

          // resets the indices because the indices are used as keys
          const filteredAreAccessoryFieldsAdditionalValid = new Map<
            number,
            [boolean, boolean]
          >();
          Array.from(areAccessoryFieldsAdditionalValidClone).forEach(
            (mapIdxKeyVal, arrayIdx) => {
              const [_mapIdx, keyVal] = mapIdxKeyVal as [
                number,
                [boolean, boolean]
              ];

              filteredAreAccessoryFieldsAdditionalValid.set(arrayIdx, keyVal);
            }
          );

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              filteredAreAccessoryFieldsAdditionalValid,
          };
        }
        case 'update': {
          const areAccessoryFieldsAdditionalValidClone = structuredClone(
            state.areAccessoryFieldsAdditionalValid
          );

          const { data, index, kind } = action.payload;
          const prevKeyVal = areAccessoryFieldsAdditionalValidClone.get(index);

          if (!prevKeyVal) {
            return state;
          }

          const [prevKey, prevValue] = prevKeyVal;
          kind === 'key'
            ? areAccessoryFieldsAdditionalValidClone.set(index, [
                data,
                prevValue,
              ])
            : areAccessoryFieldsAdditionalValidClone.set(index, [
                prevKey,
                data,
              ]);

          return {
            ...state,
            areAccessoryFieldsAdditionalValid:
              areAccessoryFieldsAdditionalValidClone,
          };
        }

        default:
          return state;
      }
    }

    case createAccessoryAction.setCurrentlySelectedAdditionalFieldIndex:
      return {
        ...state,
        currentlySelectedAdditionalFieldIndex: action.payload,
      };

    // page 3
    case createAccessoryAction.setImgFormDataArray:
      return {
        ...state,
        imgFormDataArray: action.payload,
      };
    case createAccessoryAction.setAreImagesValid:
      return {
        ...state,
        areImagesValid: action.payload,
      };

    // misc.
    case createAccessoryAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createAccessoryAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createAccessoryAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createAccessoryAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createAccessoryAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createAccessoryAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createAccessoryAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createAccessoryAction,
  createAccessoryReducer,
  initialCreateAccessoryState,
};
