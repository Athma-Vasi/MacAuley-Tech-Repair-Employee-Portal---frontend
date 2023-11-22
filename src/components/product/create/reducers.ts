import { Currency } from '../../../types';
import { ProductCategory } from '../../dashboard/types';
import { StepsInErrorPayload } from '../../endorsements/create/types';
import { createProductAction } from './state';
import {
  AdditionalFieldsAdd,
  AdditionalFieldsPayload,
  AdditionalFieldsRemove,
  AdditionalFieldsUpdate,
  AdditionalFieldsValidFocusedAdd,
  AdditionalFieldsValidFocusedPayload,
  AdditionalFieldsValidFocusedRemove,
  AdditionalFieldsValidFocusedUpdate,
  CreateProductAction,
  CreateProductDispatch,
  CreateProductState,
  DimensionUnit,
  DisplayPanelType,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MerchandiseAvailability,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
  WeightUnit,
} from './types';

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCER FUNCTIONS
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// - contains all reducer functions for CreateProduct component
// - each reducer function is mapped to an action type
// - type Reducer = (state: CreateProductState, action: CreateProductDispatch) => CreateProductState
// - Map<CreateProductAction[keyof CreateProductAction], Reducer>
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ╔═════════════════════════════════════════════════════════════════╗
//   REDUCER FUNCTIONS => STEPPER PAGE 1
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    BRAND
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    MODEL
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DESCRIPTION
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    PRICE
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    CURRENCY
// ╰─────────────────────────────────────────────────────────────────╯
function setCurrency_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currency: action.payload as Currency,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    AVAILABILITY
// ╰─────────────────────────────────────────────────────────────────╯
function setAvailability_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    availability: action.payload as MerchandiseAvailability,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    QUANTITY
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    WEIGHT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    WEIGHT UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setWeightUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    weightUnit: action.payload as WeightUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION HEIGHT
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION HEIGHT UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setDimensionHeightUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionHeightUnit: action.payload as DimensionUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION WIDTH
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION WIDTH UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setDimensionWidthUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionWidthUnit: action.payload as DimensionUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION LENGTH
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╭─────────────────────────────────────────────────────────────────╮
//    DIMENSION LENGTH UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setDimensionLengthUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    dimensionLengthUnit: action.payload as DimensionUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ADDITIONAL COMMENTS
// ╰─────────────────────────────────────────────────────────────────╯
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

// ╔═════════════════════════════════════════════════════════════════╗
//   REDUCER FUNCTIONS => STEPPER PAGE 2
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    PRODUCT CATEGORY
// ╰─────────────────────────────────────────────────────────────────╯
function setProductCategory_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    productCategory: action.payload as ProductCategory,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setAccessoryType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryType: action.payload as string,
  };
}

function setIsAccessoryTypeFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAccessoryTypeFocused: action.payload as boolean,
  };
}

function setIsAccessoryTypeValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAccessoryTypeValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setAccessoryColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryColor: action.payload as string,
  };
}

function setIsAccessoryColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAccessoryColorFocused: action.payload as boolean,
  };
}

function setIsAccessoryColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isAccessoryColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setAccessoryInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    accessoryInterface: action.payload as PeripheralsInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯
/**
 * This reducer function contains three operations that are used to update the
 * accessoryFieldsAdditional state.
 * @description add: adds a new key-value pair to the accessoryFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the accessoryFieldsAdditional state
 */
function setAccessoryFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const accessoryFieldsAdditionalClone = structuredClone(
        state.accessoryFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
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

      const { index } = action.payload as AdditionalFieldsRemove;
      accessoryFieldsAdditionalClone.delete(index);

      const filteredAccessoryFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(accessoryFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
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

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
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

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areAccessoryFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areAccessoryFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over accessoryFieldsAdditional state to generate the text elements
   - that access the areAccessoryFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areAccessoryFieldsAdditionalFocused state
 */
function setAreAccessoryFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areAccessoryFieldsAdditionalFocusedClone = structuredClone(
        state.areAccessoryFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
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

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areAccessoryFieldsAdditionalFocusedClone.delete(index);

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

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areAccessoryFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areAccessoryFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areAccessoryFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

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

// ╭─────────────────────────────────────────────────────────────────╮
//    ACCESSORY => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areAccessoryFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areAccessoryFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over accessoryFieldsAdditional state to generate the text elements
   - that access the areAccessoryFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areAccessoryFieldsAdditionalValid state
 */
function setAreAccessoryFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areAccessoryFieldsAdditionalValidClone = structuredClone(
        state.areAccessoryFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
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

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areAccessoryFieldsAdditionalValidClone.delete(index);

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

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areAccessoryFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areAccessoryFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areAccessoryFieldsAdditionalValidClone.set(index, [prevKey, data]);

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

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => SOCKET
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuSocket_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuSocket: action.payload as string,
  };
}

function setIsCpuSocketFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuSocketFocused: action.payload as boolean,
  };
}

function setIsCpuSocketValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuSocketValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => FREQUENCY
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuFrequency_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuFrequency: action.payload as string,
  };
}

function setIsCpuFrequencyFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuFrequencyFocused: action.payload as boolean,
  };
}

function setIsCpuFrequencyValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuFrequencyValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CORES
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuCores_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuCores: action.payload as string,
  };
}

function setIsCpuCoresFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuCoresFocused: action.payload as boolean,
  };
}

function setIsCpuCoresValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuCoresValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L1
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL1CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacity: action.payload as string,
  };
}

function setIsCpuL1CacheCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL1CacheCapacityFocused: action.payload as boolean,
  };
}

function setIsCpuL1CacheCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL1CacheCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L1 => UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL1CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL1CacheCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L2
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL2CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacity: action.payload as string,
  };
}

function setIsCpuL2CacheCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL2CacheCapacityFocused: action.payload as boolean,
  };
}

function setIsCpuL2CacheCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL2CacheCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L2 => UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL2CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL2CacheCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L3
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL3CacheCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacity: action.payload as string,
  };
}

function setIsCpuL3CacheCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL3CacheCapacityFocused: action.payload as boolean,
  };
}

function setIsCpuL3CacheCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuL3CacheCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => CACHE => L3 => UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuL3CacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuL3CacheCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => WATTAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setCpuWattage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    cpuWattage: action.payload as string,
  };
}

function setIsCpuWattageFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuWattageFocused: action.payload as boolean,
  };
}

function setIsCpuWattageValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCpuWattageValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * cpuFieldsAdditional state.
 * @description add: adds a new key-value pair to the cpuFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the cpuFieldsAdditional state
 */
function setCpuFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const cpuFieldsAdditionalClone = structuredClone(
        state.cpuFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = cpuFieldsAdditionalClone.size;
      cpuFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        cpuFieldsAdditional: cpuFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const cpuFieldsAdditionalClone = structuredClone(
        state.cpuFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      cpuFieldsAdditionalClone.delete(index);

      const filteredCpuFieldsAdditional = new Map<number, [string, string]>();

      Array.from(cpuFieldsAdditionalClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredCpuFieldsAdditional.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        cpuFieldsAdditional: filteredCpuFieldsAdditional,
      };
    }
    case 'update': {
      const cpuFieldsAdditionalClone = structuredClone(
        state.cpuFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = cpuFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? cpuFieldsAdditionalClone.set(index, [data, prevValue])
        : cpuFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        cpuFieldsAdditional: cpuFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areCpuFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areCpuFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over cpuFieldsAdditional state to generate the text elements
   - that access the areCpuFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areCpuFieldsAdditionalFocused state
 */
function setAreCpuFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCpuFieldsAdditionalFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCpuFieldsAdditionalFocusedClone.size;
      areCpuFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areCpuFieldsAdditionalFocused: areCpuFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areCpuFieldsAdditionalFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCpuFieldsAdditionalFocusedClone.delete(index);

      const filteredAreCpuFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areCpuFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCpuFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCpuFieldsAdditionalFocused: filteredAreCpuFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areCpuFieldsAdditionalFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCpuFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCpuFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areCpuFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCpuFieldsAdditionalFocused: areCpuFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CPU => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areCpuFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areCpuFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over cpuFieldsAdditional state to generate the text elements
   - that access the areCpuFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areCpuFieldsAdditionalValid state
 */
function setAreCpuFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCpuFieldsAdditionalValidClone = structuredClone(
        state.areCpuFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCpuFieldsAdditionalValidClone.size;
      areCpuFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areCpuFieldsAdditionalValid: areCpuFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areCpuFieldsAdditionalValidClone = structuredClone(
        state.areCpuFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCpuFieldsAdditionalValidClone.delete(index);

      const filteredAreCpuFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areCpuFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCpuFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCpuFieldsAdditionalValid: filteredAreCpuFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areCpuFieldsAdditionalValidClone = structuredClone(
        state.areCpuFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCpuFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCpuFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areCpuFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCpuFieldsAdditionalValid: areCpuFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => CHIPSET
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuChipset_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuChipset: action.payload as string,
  };
}

function setIsGpuChipsetFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuChipsetFocused: action.payload as boolean,
  };
}

function setIsGpuChipsetValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuChipsetValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => MEMORY => CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuMemoryCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacity: action.payload as string,
  };
}

function setIsGpuMemoryCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuMemoryCapacityFocused: action.payload as boolean,
  };
}

function setIsGpuMemoryCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuMemoryCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => MEMORY => CAPACITY => UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuMemoryCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuMemoryCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => CORE CLOCK
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuCoreClock_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuCoreClock: action.payload as string,
  };
}

function setIsGpuCoreClockFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuCoreClockFocused: action.payload as boolean,
  };
}

function setIsGpuCoreClockValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuCoreClockValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => BOOST CLOCK
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuBoostClock_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuBoostClock: action.payload as string,
  };
}

function setIsGpuBoostClockFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuBoostClockFocused: action.payload as boolean,
  };
}

function setIsGpuBoostClockValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuBoostClockValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => TDP
// ╰─────────────────────────────────────────────────────────────────╯
function setGpuTdp_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    gpuTdp: action.payload as string,
  };
}

function setIsGpuTdpFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuTdpFocused: action.payload as boolean,
  };
}

function setIsGpuTdpValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isGpuTdpValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * gpuFieldsAdditional state.
 * @description add: adds a new key-value pair to the gpuFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the gpuFieldsAdditional state
 */
function setGpuFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const gpuFieldsAdditionalClone = structuredClone(
        state.gpuFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = gpuFieldsAdditionalClone.size;
      gpuFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        gpuFieldsAdditional: gpuFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const gpuFieldsAdditionalClone = structuredClone(
        state.gpuFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      gpuFieldsAdditionalClone.delete(index);

      const filteredGpuFieldsAdditional = new Map<number, [string, string]>();

      Array.from(gpuFieldsAdditionalClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredGpuFieldsAdditional.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        gpuFieldsAdditional: filteredGpuFieldsAdditional,
      };
    }
    case 'update': {
      const gpuFieldsAdditionalClone = structuredClone(
        state.gpuFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = gpuFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? gpuFieldsAdditionalClone.set(index, [data, prevValue])
        : gpuFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        gpuFieldsAdditional: gpuFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areGpuFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areGpuFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over gpuFieldsAdditional state to generate the text elements
   - that access the areGpuFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areGpuFieldsAdditionalFocused state
 */
function setAreGpuFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areGpuFieldsAdditionalFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areGpuFieldsAdditionalFocusedClone.size;
      areGpuFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areGpuFieldsAdditionalFocused: areGpuFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areGpuFieldsAdditionalFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areGpuFieldsAdditionalFocusedClone.delete(index);

      const filteredAreGpuFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areGpuFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreGpuFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areGpuFieldsAdditionalFocused: filteredAreGpuFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areGpuFieldsAdditionalFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areGpuFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areGpuFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areGpuFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areGpuFieldsAdditionalFocused: areGpuFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    GPU => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areGpuFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areGpuFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over gpuFieldsAdditional state to generate the text elements
   - that access the areGpuFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areGpuFieldsAdditionalValid state
 */
function setAreGpuFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areGpuFieldsAdditionalValidClone = structuredClone(
        state.areGpuFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areGpuFieldsAdditionalValidClone.size;
      areGpuFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areGpuFieldsAdditionalValid: areGpuFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areGpuFieldsAdditionalValidClone = structuredClone(
        state.areGpuFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areGpuFieldsAdditionalValidClone.delete(index);

      const filteredAreGpuFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areGpuFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreGpuFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areGpuFieldsAdditionalValid: filteredAreGpuFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areGpuFieldsAdditionalValidClone = structuredClone(
        state.areGpuFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areGpuFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areGpuFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areGpuFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areGpuFieldsAdditionalValid: areGpuFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneType: action.payload as HeadphoneType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => DRIVER
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneDriver_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneDriver: action.payload as string,
  };
}

function setIsHeadphoneDriverFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneDriverFocused: action.payload as boolean,
  };
}

function setIsHeadphoneDriverValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneDriverValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => FREQUENCY RESPONSE
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneFrequencyResponse: action.payload as string,
  };
}

function setIsHeadphoneFrequencyResponseFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneFrequencyResponseFocused: action.payload as boolean,
  };
}

function setIsHeadphoneFrequencyResponseValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneFrequencyResponseValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => IMPEDANCE
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneImpedance_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneImpedance: action.payload as string,
  };
}

function setIsHeadphoneImpedanceFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneImpedanceFocused: action.payload as boolean,
  };
}

function setIsHeadphoneImpedanceValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneImpedanceValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneColor: action.payload as string,
  };
}

function setIsHeadphoneColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneColorFocused: action.payload as boolean,
  };
}

function setIsHeadphoneColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isHeadphoneColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setHeadphoneInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    headphoneInterface: action.payload as HeadphoneInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * headphoneFieldsAdditional state.
 * @description add: adds a new key-value pair to the headphoneFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the headphoneFieldsAdditional state
 */
function setHeadphoneFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const headphoneFieldsAdditionalClone = structuredClone(
        state.headphoneFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = headphoneFieldsAdditionalClone.size;
      headphoneFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        headphoneFieldsAdditional: headphoneFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const headphoneFieldsAdditionalClone = structuredClone(
        state.headphoneFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      headphoneFieldsAdditionalClone.delete(index);

      const filteredHeadphoneFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(headphoneFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredHeadphoneFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        headphoneFieldsAdditional: filteredHeadphoneFieldsAdditional,
      };
    }
    case 'update': {
      const headphoneFieldsAdditionalClone = structuredClone(
        state.headphoneFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = headphoneFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? headphoneFieldsAdditionalClone.set(index, [data, prevValue])
        : headphoneFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        headphoneFieldsAdditional: headphoneFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areHeadphoneFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areHeadphoneFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over headphoneFieldsAdditional state to generate the text elements
   - that access the areHeadphoneFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areHeadphoneFieldsAdditionalFocused state
 */
function setAreHeadphoneFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areHeadphoneFieldsAdditionalFocusedClone.size;
      areHeadphoneFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areHeadphoneFieldsAdditionalFocused:
          areHeadphoneFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areHeadphoneFieldsAdditionalFocusedClone.delete(index);

      const filteredAreHeadphoneFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areHeadphoneFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreHeadphoneFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areHeadphoneFieldsAdditionalFocused:
          filteredAreHeadphoneFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areHeadphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areHeadphoneFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areHeadphoneFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areHeadphoneFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areHeadphoneFieldsAdditionalFocused:
          areHeadphoneFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    HEADPHONES => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areHeadphoneFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areHeadphoneFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over headphoneFieldsAdditional state to generate the text elements
   - that access the areHeadphoneFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areHeadphoneFieldsAdditionalValid state
 */
function setAreHeadphoneFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areHeadphoneFieldsAdditionalValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areHeadphoneFieldsAdditionalValidClone.size;
      areHeadphoneFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areHeadphoneFieldsAdditionalValid:
          areHeadphoneFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areHeadphoneFieldsAdditionalValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areHeadphoneFieldsAdditionalValidClone.delete(index);

      const filteredAreHeadphoneFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areHeadphoneFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreHeadphoneFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areHeadphoneFieldsAdditionalValid:
          filteredAreHeadphoneFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areHeadphoneFieldsAdditionalValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areHeadphoneFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areHeadphoneFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areHeadphoneFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areHeadphoneFieldsAdditionalValid:
          areHeadphoneFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => SWITCH
// ╰─────────────────────────────────────────────────────────────────╯
function setKeyboardSwitch_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardSwitch: action.payload as KeyboardSwitch,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => LAYOUT
// ╰─────────────────────────────────────────────────────────────────╯
function setKeyboardLayout_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardLayout: action.payload as KeyboardLayout,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => BACKLIGHT
// ╰─────────────────────────────────────────────────────────────────╯
function setKeyboardBacklight_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardBacklight: action.payload as KeyboardBacklight,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setKeyboardInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    keyboardInterface: action.payload as PeripheralsInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * keyboardFieldsAdditional state.
 * @description add: adds a new key-value pair to the keyboardFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the keyboardFieldsAdditional state
 */
function setKeyboardFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const keyboardFieldsAdditionalClone = structuredClone(
        state.keyboardFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = keyboardFieldsAdditionalClone.size;
      keyboardFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        keyboardFieldsAdditional: keyboardFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const keyboardFieldsAdditionalClone = structuredClone(
        state.keyboardFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      keyboardFieldsAdditionalClone.delete(index);

      const filteredKeyboardFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(keyboardFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredKeyboardFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        keyboardFieldsAdditional: filteredKeyboardFieldsAdditional,
      };
    }
    case 'update': {
      const keyboardFieldsAdditionalClone = structuredClone(
        state.keyboardFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = keyboardFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? keyboardFieldsAdditionalClone.set(index, [data, prevValue])
        : keyboardFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        keyboardFieldsAdditional: keyboardFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areKeyboardFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areKeyboardFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over keyboardFieldsAdditional state to generate the text elements
   - that access the areKeyboardFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areKeyboardFieldsAdditionalFocused state
 */
function setAreKeyboardFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areKeyboardFieldsAdditionalFocusedClone.size;
      areKeyboardFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areKeyboardFieldsAdditionalFocused:
          areKeyboardFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areKeyboardFieldsAdditionalFocusedClone.delete(index);

      const filteredAreKeyboardFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areKeyboardFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreKeyboardFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areKeyboardFieldsAdditionalFocused:
          filteredAreKeyboardFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areKeyboardFieldsAdditionalFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areKeyboardFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areKeyboardFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areKeyboardFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areKeyboardFieldsAdditionalFocused:
          areKeyboardFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    KEYBOARD => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areKeyboardFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areKeyboardFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over keyboardFieldsAdditional state to generate the text elements
   - that access the areKeyboardFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areKeyboardFieldsAdditionalValid state
 */
function setAreKeyboardFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areKeyboardFieldsAdditionalValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areKeyboardFieldsAdditionalValidClone.size;
      areKeyboardFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areKeyboardFieldsAdditionalValid: areKeyboardFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areKeyboardFieldsAdditionalValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areKeyboardFieldsAdditionalValidClone.delete(index);

      const filteredAreKeyboardFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areKeyboardFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreKeyboardFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areKeyboardFieldsAdditionalValid:
          filteredAreKeyboardFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areKeyboardFieldsAdditionalValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areKeyboardFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areKeyboardFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areKeyboardFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areKeyboardFieldsAdditionalValid: areKeyboardFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => DATA RATE
// ╰─────────────────────────────────────────────────────────────────╯
function setRamDataRate_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramDataRate: action.payload as string,
  };
}

function setIsRamDataRateFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamDataRateFocused: action.payload as boolean,
  };
}

function setIsRamDataRateValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamDataRateValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => MODULES QUANTITY
// ╰─────────────────────────────────────────────────────────────────╯
function setRamModulesQuantity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesQuantity: action.payload as string,
  };
}

function setIsRamModulesQuantityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamModulesQuantityFocused: action.payload as boolean,
  };
}

function setIsRamModulesQuantityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamModulesQuantityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => MODULES CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setRamModulesCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacity: action.payload as string,
  };
}

function setIsRamModulesCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamModulesCapacityFocused: action.payload as boolean,
  };
}

function setIsRamModulesCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamModulesCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => MODULES CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setRamModulesCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramModulesCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setRamType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramType: action.payload as MemoryType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setRamColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramColor: action.payload as string,
  };
}

function setIsRamColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamColorFocused: action.payload as boolean,
  };
}

function setIsRamColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => VOLTAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setRamVoltage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramVoltage: action.payload as string,
  };
}

function setIsRamVoltageFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamVoltageFocused: action.payload as boolean,
  };
}

function setIsRamVoltageValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamVoltageValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => TIMING
// ╰─────────────────────────────────────────────────────────────────╯
function setRamTiming_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    ramTiming: action.payload as string,
  };
}

function setIsRamTimingFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamTimingFocused: action.payload as boolean,
  };
}

function setIsRamTimingValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isRamTimingValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * ramFieldsAdditional state.
 * @description add: adds a new key-value pair to the ramFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the ramFieldsAdditional state
 */
function setRamFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const ramFieldsAdditionalClone = structuredClone(
        state.ramFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = ramFieldsAdditionalClone.size;
      ramFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        ramFieldsAdditional: ramFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const ramFieldsAdditionalClone = structuredClone(
        state.ramFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      ramFieldsAdditionalClone.delete(index);

      const filteredRamFieldsAdditional = new Map<number, [string, string]>();

      Array.from(ramFieldsAdditionalClone).forEach((mapIdxKeyVal, arrayIdx) => {
        const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
        filteredRamFieldsAdditional.set(arrayIdx, keyVal);
      });

      return {
        ...state,
        ramFieldsAdditional: filteredRamFieldsAdditional,
      };
    }
    case 'update': {
      const ramFieldsAdditionalClone = structuredClone(
        state.ramFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = ramFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? ramFieldsAdditionalClone.set(index, [data, prevValue])
        : ramFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        ramFieldsAdditional: ramFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areRamFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areRamFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over ramFieldsAdditional state to generate the text elements
   - that access the areRamFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areRamFieldsAdditionalFocused state
 */
function setAreRamFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const areRamFieldsAdditionalFocusedClone = structuredClone(
        state.areRamFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areRamFieldsAdditionalFocusedClone.size;
      areRamFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areRamFieldsAdditionalFocused: areRamFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areRamFieldsAdditionalFocusedClone = structuredClone(
        state.areRamFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areRamFieldsAdditionalFocusedClone.delete(index);

      const filteredAreRamFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areRamFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreRamFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areRamFieldsAdditionalFocused: filteredAreRamFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areRamFieldsAdditionalFocusedClone = structuredClone(
        state.areRamFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areRamFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areRamFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areRamFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areRamFieldsAdditionalFocused: areRamFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    RAM => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areRamFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areRamFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over ramFieldsAdditional state to generate the text elements
   - that access the areRamFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areRamFieldsAdditionalValid state
 */
function setAreRamFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areRamFieldsAdditionalValidClone = structuredClone(
        state.areRamFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areRamFieldsAdditionalValidClone.size;
      areRamFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areRamFieldsAdditionalValid: areRamFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areRamFieldsAdditionalValidClone = structuredClone(
        state.areRamFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areRamFieldsAdditionalValidClone.delete(index);

      const filteredAreRamFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areRamFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreRamFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areRamFieldsAdditionalValid: filteredAreRamFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areRamFieldsAdditionalValidClone = structuredClone(
        state.areRamFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areRamFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areRamFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areRamFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areRamFieldsAdditionalValid: areRamFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => SENSOR
// ╰─────────────────────────────────────────────────────────────────╯
function setMouseSensor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseSensor: action.payload as MouseSensor,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => DPI
// ╰─────────────────────────────────────────────────────────────────╯
function setMouseDpi_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseDpi: action.payload as string,
  };
}

function setIsMouseDpiFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseDpiFocused: action.payload as boolean,
  };
}

function setIsMouseDpiValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseDpiValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => BUTTONS
// ╰─────────────────────────────────────────────────────────────────╯
function setMouseButtons_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseButtons: action.payload as string,
  };
}

function setIsMouseButtonsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseButtonsFocused: action.payload as boolean,
  };
}

function setIsMouseButtonsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseButtonsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setMouseColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseColor: action.payload as string,
  };
}

function setIsMouseColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseColorFocused: action.payload as boolean,
  };
}

function setIsMouseColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMouseColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setMouseInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    mouseInterface: action.payload as PeripheralsInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * mouseFieldsAdditional state.
 * @description add: adds a new key-value pair to the mouseFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the mouseFieldsAdditional state
 */
function setMouseFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const mouseFieldsAdditionalClone = structuredClone(
        state.mouseFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = mouseFieldsAdditionalClone.size;
      mouseFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        mouseFieldsAdditional: mouseFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const mouseFieldsAdditionalClone = structuredClone(
        state.mouseFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      mouseFieldsAdditionalClone.delete(index);

      const filteredMouseFieldsAdditional = new Map<number, [string, string]>();

      Array.from(mouseFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMouseFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        mouseFieldsAdditional: filteredMouseFieldsAdditional,
      };
    }
    case 'update': {
      const mouseFieldsAdditionalClone = structuredClone(
        state.mouseFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = mouseFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? mouseFieldsAdditionalClone.set(index, [data, prevValue])
        : mouseFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        mouseFieldsAdditional: mouseFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMouseFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areMouseFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over mouseFieldsAdditional state to generate the text elements
   - that access the areMouseFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMouseFieldsAdditionalFocused state
 */
function setAreMouseFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMouseFieldsAdditionalFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMouseFieldsAdditionalFocusedClone.size;
      areMouseFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMouseFieldsAdditionalFocused: areMouseFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areMouseFieldsAdditionalFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMouseFieldsAdditionalFocusedClone.delete(index);

      const filteredAreMouseFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMouseFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMouseFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMouseFieldsAdditionalFocused:
          filteredAreMouseFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areMouseFieldsAdditionalFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMouseFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMouseFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areMouseFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMouseFieldsAdditionalFocused: areMouseFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOUSE => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMouseFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areMouseFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over mouseFieldsAdditional state to generate the text elements
   - that access the areMouseFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMouseFieldsAdditionalValid state
 */
function setAreMouseFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMouseFieldsAdditionalValidClone = structuredClone(
        state.areMouseFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMouseFieldsAdditionalValidClone.size;
      areMouseFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areMouseFieldsAdditionalValid: areMouseFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areMouseFieldsAdditionalValidClone = structuredClone(
        state.areMouseFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMouseFieldsAdditionalValidClone.delete(index);

      const filteredAreMouseFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMouseFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMouseFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMouseFieldsAdditionalValid: filteredAreMouseFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areMouseFieldsAdditionalValidClone = structuredClone(
        state.areMouseFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMouseFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMouseFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areMouseFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMouseFieldsAdditionalValid: areMouseFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setMicrophoneType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneType: action.payload as MicrophoneType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => POLAR PATTERN
// ╰─────────────────────────────────────────────────────────────────╯
function setMicrophonePolarPattern_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphonePolarPattern: action.payload as MicrophonePolarPattern,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => FREQUENCY RESPONSE
// ╰─────────────────────────────────────────────────────────────────╯
function setMicrophoneFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneFrequencyResponse: action.payload as string,
  };
}

function setIsMicrophoneFrequencyResponseFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMicrophoneFrequencyResponseFocused: action.payload as boolean,
  };
}

function setIsMicrophoneFrequencyResponseValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMicrophoneFrequencyResponseValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setMicrophoneInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneInterface: action.payload as MicrophoneInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setMicrophoneColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    microphoneColor: action.payload as string,
  };
}

function setIsMicrophoneColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMicrophoneColorFocused: action.payload as boolean,
  };
}

function setIsMicrophoneColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMicrophoneColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * microphoneFieldsAdditional state.
 * @description add: adds a new key-value pair to the microphoneFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the microphoneFieldsAdditional state
 */
function setMicrophoneFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const microphoneFieldsAdditionalClone = structuredClone(
        state.microphoneFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = microphoneFieldsAdditionalClone.size;
      microphoneFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        microphoneFieldsAdditional: microphoneFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const microphoneFieldsAdditionalClone = structuredClone(
        state.microphoneFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      microphoneFieldsAdditionalClone.delete(index);

      const filteredMicrophoneFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(microphoneFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMicrophoneFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        microphoneFieldsAdditional: filteredMicrophoneFieldsAdditional,
      };
    }
    case 'update': {
      const microphoneFieldsAdditionalClone = structuredClone(
        state.microphoneFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = microphoneFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? microphoneFieldsAdditionalClone.set(index, [data, prevValue])
        : microphoneFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        microphoneFieldsAdditional: microphoneFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMicrophoneFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areMicrophoneFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over microphoneFieldsAdditional state to generate the text elements
   - that access the areMicrophoneFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMicrophoneFieldsAdditionalFocused state
 */
function setAreMicrophoneFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMicrophoneFieldsAdditionalFocusedClone.size;
      areMicrophoneFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMicrophoneFieldsAdditionalFocused:
          areMicrophoneFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMicrophoneFieldsAdditionalFocusedClone.delete(index);

      const filteredAreMicrophoneFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMicrophoneFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMicrophoneFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMicrophoneFieldsAdditionalFocused:
          filteredAreMicrophoneFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areMicrophoneFieldsAdditionalFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMicrophoneFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMicrophoneFieldsAdditionalFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areMicrophoneFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMicrophoneFieldsAdditionalFocused:
          areMicrophoneFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MICROPHONE => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMicrophoneFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areMicrophoneFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over microphoneFieldsAdditional state to generate the text elements
   - that access the areMicrophoneFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMicrophoneFieldsAdditionalValid state
 */
function setAreMicrophoneFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMicrophoneFieldsAdditionalValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMicrophoneFieldsAdditionalValidClone.size;
      areMicrophoneFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areMicrophoneFieldsAdditionalValid:
          areMicrophoneFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areMicrophoneFieldsAdditionalValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMicrophoneFieldsAdditionalValidClone.delete(index);

      const filteredAreMicrophoneFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMicrophoneFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMicrophoneFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMicrophoneFieldsAdditionalValid:
          filteredAreMicrophoneFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areMicrophoneFieldsAdditionalValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMicrophoneFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMicrophoneFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areMicrophoneFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMicrophoneFieldsAdditionalValid:
          areMicrophoneFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => SIZE (INCHES)
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplaySize_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displaySize: action.payload as string,
  };
}

function setIsDisplaySizeFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplaySizeFocused: action.payload as boolean,
  };
}

function setIsDisplaySizeValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplaySizeValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => RESOLUTION (HORIZONTAL)
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionHorizontal: action.payload as string,
  };
}

function setIsDisplayResolutionHorizontalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResolutionHorizontalFocused: action.payload as boolean,
  };
}

function setIsDisplayResolutionHorizontalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResolutionHorizontalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => RESOLUTION (VERTICAL)
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResolutionVertical: action.payload as string,
  };
}

function setIsDisplayResolutionVerticalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResolutionVerticalFocused: action.payload as boolean,
  };
}

function setIsDisplayResolutionVerticalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResolutionVerticalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => REFRESH RATE
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayRefreshRate_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayRefreshRate: action.payload as string,
  };
}

function setIsDisplayRefreshRateFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayRefreshRateFocused: action.payload as boolean,
  };
}

function setIsDisplayRefreshRateValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayRefreshRateValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => PANEL TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayPanelType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayPanelType: action.payload as DisplayPanelType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => RESPONSE TIME
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayResponseTime_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayResponseTime: action.payload as string,
  };
}

function setIsDisplayResponseTimeFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResponseTimeFocused: action.payload as boolean,
  };
}

function setIsDisplayResponseTimeValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayResponseTimeValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => ASPECT RATIO
// ╰─────────────────────────────────────────────────────────────────╯
function setDisplayAspectRatio_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    displayAspectRatio: action.payload as string,
  };
}

function setIsDisplayAspectRatioFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayAspectRatioFocused: action.payload as boolean,
  };
}

function setIsDisplayAspectRatioValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isDisplayAspectRatioValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * displayFieldsAdditional state.
 * @description add: adds a new key-value pair to the displayFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the displayFieldsAdditional state
 */
function setDisplayFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const displayFieldsAdditionalClone = structuredClone(
        state.displayFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = displayFieldsAdditionalClone.size;
      displayFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        displayFieldsAdditional: displayFieldsAdditionalClone,
      };
    }

    case 'remove': {
      const displayFieldsAdditionalClone = structuredClone(
        state.displayFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      displayFieldsAdditionalClone.delete(index);

      const filteredDisplayFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(displayFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredDisplayFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        displayFieldsAdditional: filteredDisplayFieldsAdditional,
      };
    }
    case 'update': {
      const displayFieldsAdditionalClone = structuredClone(
        state.displayFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = displayFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? displayFieldsAdditionalClone.set(index, [data, prevValue])
        : displayFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        displayFieldsAdditional: displayFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areDisplayFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areDisplayFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over displayFieldsAdditional state to generate the text elements
   - that access the areDisplayFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areDisplayFieldsAdditionalFocused state
 */
function setAreDisplayFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areDisplayFieldsAdditionalFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areDisplayFieldsAdditionalFocusedClone.size;
      areDisplayFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areDisplayFieldsAdditionalFocused:
          areDisplayFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areDisplayFieldsAdditionalFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areDisplayFieldsAdditionalFocusedClone.delete(index);

      const filteredAreDisplayFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areDisplayFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreDisplayFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areDisplayFieldsAdditionalFocused:
          filteredAreDisplayFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areDisplayFieldsAdditionalFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areDisplayFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areDisplayFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areDisplayFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areDisplayFieldsAdditionalFocused:
          areDisplayFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DISPLAY => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areDisplayFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areDisplayFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over displayFieldsAdditional state to generate the text elements
   - that access the areDisplayFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areDisplayFieldsAdditionalValid state
 */
function setAreDisplayFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areDisplayFieldsAdditionalValidClone = structuredClone(
        state.areDisplayFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areDisplayFieldsAdditionalValidClone.size;
      areDisplayFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areDisplayFieldsAdditionalValid: areDisplayFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areDisplayFieldsAdditionalValidClone = structuredClone(
        state.areDisplayFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areDisplayFieldsAdditionalValidClone.delete(index);

      const filteredAreDisplayFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areDisplayFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreDisplayFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areDisplayFieldsAdditionalValid:
          filteredAreDisplayFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areDisplayFieldsAdditionalValidClone = structuredClone(
        state.areDisplayFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areDisplayFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areDisplayFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areDisplayFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areDisplayFieldsAdditionalValid: areDisplayFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => SOCKET
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardSocket_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSocket: action.payload as string,
  };
}

function setIsMotherboardSocketFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardSocketFocused: action.payload as boolean,
  };
}

function setIsMotherboardSocketValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardSocketValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => CHIPSET
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardChipset_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardChipset: action.payload as string,
  };
}

function setIsMotherboardChipsetFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardChipsetFocused: action.payload as boolean,
  };
}

function setIsMotherboardChipsetValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardChipsetValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => FORM FACTOR
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardFormFactor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardFormFactor: action.payload as MotherboardFormFactor,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => MEMORY MAX CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardMemoryMaxCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacity: action.payload as string,
  };
}

function setIsMotherboardMemoryMaxCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardMemoryMaxCapacityFocused: action.payload as boolean,
  };
}

function setIsMotherboardMemoryMaxCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardMemoryMaxCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => MEMORY MAX CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardMemoryMaxCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryMaxCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => MEMORY SLOTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardMemorySlots_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemorySlots: action.payload as string,
  };
}

function setIsMotherboardMemorySlotsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardMemorySlotsFocused: action.payload as boolean,
  };
}

function setIsMotherboardMemorySlotsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardMemorySlotsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => MEMORY TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardMemoryType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardMemoryType: action.payload as MemoryType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => SATA PORTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardSataPorts_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardSataPorts: action.payload as string,
  };
}

function setIsMotherboardSataPortsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardSataPortsFocused: action.payload as boolean,
  };
}

function setIsMotherboardSataPortsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardSataPortsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => M2 SLOTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardM2Slots_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardM2Slots: action.payload as string,
  };
}

function setIsMotherboardM2SlotsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardM2SlotsFocused: action.payload as boolean,
  };
}

function setIsMotherboardM2SlotsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardM2SlotsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => PCIE3 SLOTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardPcie3Slots_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie3Slots: action.payload as string,
  };
}

function setIsMotherboardPcie3SlotsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie3SlotsFocused: action.payload as boolean,
  };
}

function setIsMotherboardPcie3SlotsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie3SlotsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => PCIE4 SLOTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardPcie4Slots_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie4Slots: action.payload as string,
  };
}

function setIsMotherboardPcie4SlotsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie4SlotsFocused: action.payload as boolean,
  };
}

function setIsMotherboardPcie4SlotsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie4SlotsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => PCIE5 SLOTS
// ╰─────────────────────────────────────────────────────────────────╯
function setMotherboardPcie5Slots_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    motherboardPcie5Slots: action.payload as string,
  };
}

function setIsMotherboardPcie5SlotsFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie5SlotsFocused: action.payload as boolean,
  };
}

function setIsMotherboardPcie5SlotsValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isMotherboardPcie5SlotsValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * motherboardFieldsAdditional state.
 * @description add: adds a new key-value pair to the motherboardFieldsAdditional state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *  - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the motherboardFieldsAdditional state
 */
function setMotherboardFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const motherboardFieldsAdditionalClone = structuredClone(
        state.motherboardFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = motherboardFieldsAdditionalClone.size;
      motherboardFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        motherboardFieldsAdditional: motherboardFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const motherboardFieldsAdditionalClone = structuredClone(
        state.motherboardFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      motherboardFieldsAdditionalClone.delete(index);

      const filteredMotherboardFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(motherboardFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMotherboardFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        motherboardFieldsAdditional: filteredMotherboardFieldsAdditional,
      };
    }
    case 'update': {
      const motherboardFieldsAdditionalClone = structuredClone(
        state.motherboardFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = motherboardFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? motherboardFieldsAdditionalClone.set(index, [data, prevValue])
        : motherboardFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        motherboardFieldsAdditional: motherboardFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMotherboardFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areMotherboardFieldsAdditionalFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over motherboardFieldsAdditional state to generate the text elements
   - that access the areMotherboardFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMotherboardFieldsAdditionalFocused state
 */
function setAreMotherboardFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMotherboardFieldsAdditionalFocusedClone.size;
      areMotherboardFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMotherboardFieldsAdditionalFocused:
          areMotherboardFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMotherboardFieldsAdditionalFocusedClone.delete(index);

      const filteredAreMotherboardFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMotherboardFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMotherboardFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMotherboardFieldsAdditionalFocused:
          filteredAreMotherboardFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areMotherboardFieldsAdditionalFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMotherboardFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMotherboardFieldsAdditionalFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areMotherboardFieldsAdditionalFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areMotherboardFieldsAdditionalFocused:
          areMotherboardFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MOTHERBOARD => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areMotherboardFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areMotherboardFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over motherboardFieldsAdditional state to generate the text elements
   - that access the areMotherboardFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMotherboardFieldsAdditionalValid state
 */
function setAreMotherboardFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMotherboardFieldsAdditionalValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMotherboardFieldsAdditionalValidClone.size;
      areMotherboardFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areMotherboardFieldsAdditionalValid:
          areMotherboardFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areMotherboardFieldsAdditionalValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMotherboardFieldsAdditionalValidClone.delete(index);

      const filteredAreMotherboardFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMotherboardFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMotherboardFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMotherboardFieldsAdditionalValid:
          filteredAreMotherboardFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areMotherboardFieldsAdditionalValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMotherboardFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMotherboardFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areMotherboardFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMotherboardFieldsAdditionalValid:
          areMotherboardFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => OS
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneOs_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneOs: action.payload as MobileOs,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => CHIPSET
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneChipset_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneChipset: action.payload as string,
  };
}

function setIsSmartphoneChipsetFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneChipsetFocused: action.payload as boolean,
  };
}

function setIsSmartphoneChipsetValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneChipsetValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneDisplay_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneDisplay: action.payload as string,
  };
}

function setIsSmartphoneDisplayFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneDisplayFocused: action.payload as boolean,
  };
}

function setIsSmartphoneDisplayValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneDisplayValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => RESOLUTION => HORIZONTAL
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneResolutionHorizontal: action.payload as string,
  };
}

function setIsSmartphoneResolutionHorizontalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneResolutionHorizontalFocused: action.payload as boolean,
  };
}

function setIsSmartphoneResolutionHorizontalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneResolutionHorizontalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => RESOLUTION => VERTICAL
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneResolutionVertical: action.payload as string,
  };
}

function setIsSmartphoneResolutionVerticalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneResolutionVerticalFocused: action.payload as boolean,
  };
}

function setIsSmartphoneResolutionVerticalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneResolutionVerticalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => RAM CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneRamCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneRamCapacity: action.payload as string,
  };
}

function setIsSmartphoneRamCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneRamCapacityFocused: action.payload as boolean,
  };
}

function setIsSmartphoneRamCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneRamCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => RAM CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneRamCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneRamCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => STORAGE CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneStorageCapacity: action.payload as string,
  };
}

function setIsSmartphoneStorageCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneStorageCapacityFocused: action.payload as boolean,
  };
}

function setIsSmartphoneStorageCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneStorageCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => BATTERY CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneBatteryCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneBatteryCapacity: action.payload as string,
  };
}

function setIsSmartphoneBatteryCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneBatteryCapacityFocused: action.payload as boolean,
  };
}

function setIsSmartphoneBatteryCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneBatteryCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => CAMERA
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneCamera_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneCamera: action.payload as string,
  };
}

function setIsSmartphoneCameraFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneCameraFocused: action.payload as boolean,
  };
}

function setIsSmartphoneCameraValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneCameraValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setSmartphoneColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    smartphoneColor: action.payload as string,
  };
}

function setIsSmartphoneColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneColorFocused: action.payload as boolean,
  };
}

function setIsSmartphoneColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSmartphoneColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * smartphoneFieldsAdditional state.
 * @description add: adds a new key-value pair to the smartphoneFieldsAdditional state
 * @description remove:
    - clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices    
  * @description update: updates either the key or value from the smartphoneFieldsAdditional state
 */
function setSmartphoneFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const smartphoneFieldsAdditionalClone = structuredClone(
        state.smartphoneFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = smartphoneFieldsAdditionalClone.size;
      smartphoneFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        smartphoneFieldsAdditional: smartphoneFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const smartphoneFieldsAdditionalClone = structuredClone(
        state.smartphoneFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      smartphoneFieldsAdditionalClone.delete(index);

      const filteredSmartphoneFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(smartphoneFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredSmartphoneFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        smartphoneFieldsAdditional: filteredSmartphoneFieldsAdditional,
      };
    }
    case 'update': {
      const smartphoneFieldsAdditionalClone = structuredClone(
        state.smartphoneFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = smartphoneFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? smartphoneFieldsAdditionalClone.set(index, [data, prevValue])
        : smartphoneFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        smartphoneFieldsAdditional: smartphoneFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areSmartphoneFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areSmartphoneFieldsAdditionalFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over smartphoneFieldsAdditional state to generate the text elements
 * - that access the areSmartphoneFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areSmartphoneFieldsAdditionalFocused state
 */
function setAreSmartphoneFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSmartphoneFieldsAdditionalFocusedClone.size;
      areSmartphoneFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areSmartphoneFieldsAdditionalFocused:
          areSmartphoneFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSmartphoneFieldsAdditionalFocusedClone.delete(index);

      const filteredAreSmartphoneFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSmartphoneFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSmartphoneFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSmartphoneFieldsAdditionalFocused:
          filteredAreSmartphoneFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areSmartphoneFieldsAdditionalFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSmartphoneFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSmartphoneFieldsAdditionalFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areSmartphoneFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSmartphoneFieldsAdditionalFocused:
          areSmartphoneFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SMARTPHONE => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areSmartphoneFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areSmartphoneFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over smartphoneFieldsAdditional state to generate the text elements
   - that access the areSmartphoneFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areSmartphoneFieldsAdditionalValid state
 */
function setAreSmartphoneFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSmartphoneFieldsAdditionalValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSmartphoneFieldsAdditionalValidClone.size;
      areSmartphoneFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areSmartphoneFieldsAdditionalValid:
          areSmartphoneFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areSmartphoneFieldsAdditionalValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSmartphoneFieldsAdditionalValidClone.delete(index);

      const filteredAreSmartphoneFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSmartphoneFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSmartphoneFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSmartphoneFieldsAdditionalValid:
          filteredAreSmartphoneFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areSmartphoneFieldsAdditionalValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSmartphoneFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSmartphoneFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areSmartphoneFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSmartphoneFieldsAdditionalValid:
          areSmartphoneFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setSpeakerType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerType: action.payload as SpeakerType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => TOTAL WATTAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setSpeakerTotalWattage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerTotalWattage: action.payload as string,
  };
}

function setIsSpeakerTotalWattageFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerTotalWattageFocused: action.payload as boolean,
  };
}

function setIsSpeakerTotalWattageValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerTotalWattageValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => FREQUENCY RESPONSE
// ╰─────────────────────────────────────────────────────────────────╯
function setSpeakerFrequencyResponse_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerFrequencyResponse: action.payload as string,
  };
}

function setIsSpeakerFrequencyResponseFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerFrequencyResponseFocused: action.payload as boolean,
  };
}

function setIsSpeakerFrequencyResponseValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerFrequencyResponseValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setSpeakerColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerColor: action.payload as string,
  };
}

function setIsSpeakerColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerColorFocused: action.payload as boolean,
  };
}

function setIsSpeakerColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSpeakerColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setSpeakerInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    speakerInterface: action.payload as SpeakerInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * speakerFieldsAdditional state.
 * @description add: adds a new key-value pair to the speakerFieldsAdditional state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the speakerFieldsAdditional state
 */
function setSpeakerFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const speakerFieldsAdditionalClone = structuredClone(
        state.speakerFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = speakerFieldsAdditionalClone.size;
      speakerFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        speakerFieldsAdditional: speakerFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const speakerFieldsAdditionalClone = structuredClone(
        state.speakerFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      speakerFieldsAdditionalClone.delete(index);

      const filteredSpeakerFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(speakerFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredSpeakerFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        speakerFieldsAdditional: filteredSpeakerFieldsAdditional,
      };
    }
    case 'update': {
      const speakerFieldsAdditionalClone = structuredClone(
        state.speakerFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = speakerFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? speakerFieldsAdditionalClone.set(index, [data, prevValue])
        : speakerFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        speakerFieldsAdditional: speakerFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areSpeakerFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areSpeakerFieldsAdditionalFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over speakerFieldsAdditional state to generate the text elements
 * - that access the areSpeakerFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areSpeakerFieldsAdditionalFocused state
 */
function setAreSpeakerFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSpeakerFieldsAdditionalFocusedClone.size;
      areSpeakerFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areSpeakerFieldsAdditionalFocused:
          areSpeakerFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSpeakerFieldsAdditionalFocusedClone.delete(index);

      const filteredAreSpeakerFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSpeakerFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSpeakerFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSpeakerFieldsAdditionalFocused:
          filteredAreSpeakerFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areSpeakerFieldsAdditionalFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSpeakerFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSpeakerFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areSpeakerFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSpeakerFieldsAdditionalFocused:
          areSpeakerFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SPEAKER => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areSpeakerFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areSpeakerFieldsAdditionalValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over speakerFieldsAdditional state to generate the text elements
   - that access the areSpeakerFieldsAdditionalValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areSpeakerFieldsAdditionalValid state
 */
function setAreSpeakerFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSpeakerFieldsAdditionalValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSpeakerFieldsAdditionalValidClone.size;
      areSpeakerFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areSpeakerFieldsAdditionalValid: areSpeakerFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areSpeakerFieldsAdditionalValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSpeakerFieldsAdditionalValidClone.delete(index);

      const filteredAreSpeakerFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSpeakerFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSpeakerFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSpeakerFieldsAdditionalValid:
          filteredAreSpeakerFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areSpeakerFieldsAdditionalValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSpeakerFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSpeakerFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areSpeakerFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSpeakerFieldsAdditionalValid: areSpeakerFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageType: action.payload as StorageType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacity: action.payload as string,
  };
}

function setIsStorageCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isStorageCapacityFocused: action.payload as boolean,
  };
}

function setIsStorageCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isStorageCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => CACHE CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageCacheCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacity: action.payload as string,
  };
}

function setIsStorageCacheCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isStorageCacheCapacityFocused: action.payload as boolean,
  };
}

function setIsStorageCacheCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isStorageCacheCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => CACHE CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageCacheCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageCacheCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => FORM FACTOR
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageFormFactor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageFormFactor: action.payload as StorageFormFactor,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setStorageInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    storageInterface: action.payload as StorageInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * storageFieldsAdditional state.
 * @description add: adds a new key-value pair to the storageFieldsAdditional state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the storageFieldsAdditional state
 */
function setStorageFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const storageFieldsAdditionalClone = structuredClone(
        state.storageFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = storageFieldsAdditionalClone.size;
      storageFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        storageFieldsAdditional: storageFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const storageFieldsAdditionalClone = structuredClone(
        state.storageFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      storageFieldsAdditionalClone.delete(index);

      const filteredStorageFieldsAdditional = new Map<
        number,
        [string, string]
      >();

      Array.from(storageFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredStorageFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        storageFieldsAdditional: filteredStorageFieldsAdditional,
      };
    }
    case 'update': {
      const storageFieldsAdditionalClone = structuredClone(
        state.storageFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = storageFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? storageFieldsAdditionalClone.set(index, [data, prevValue])
        : storageFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        storageFieldsAdditional: storageFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areStorageFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areStorageFieldsAdditionalFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over storageFieldsAdditional state to generate the text elements
 * - that access the areStorageFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areStorageFieldsAdditionalFocused state
 */
function setAreStorageFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areStorageFieldsAdditionalFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areStorageFieldsAdditionalFocusedClone.size;
      areStorageFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areStorageFieldsAdditionalFocused:
          areStorageFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areStorageFieldsAdditionalFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areStorageFieldsAdditionalFocusedClone.delete(index);

      const filteredAreStorageFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areStorageFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreStorageFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areStorageFieldsAdditionalFocused:
          filteredAreStorageFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areStorageFieldsAdditionalFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areStorageFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areStorageFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areStorageFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areStorageFieldsAdditionalFocused:
          areStorageFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STORAGE => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areStorageFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areStorageFieldsAdditionalValid state
 * @description remove:
 *  - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over storageFieldsAdditional state to generate the text elements
 * - that access the areStorageFieldsAdditionalValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areStorageFieldsAdditionalValid state
 */
function setAreStorageFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const arePsuFieldsAdditionalValidClone = structuredClone(
        state.arePsuFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = arePsuFieldsAdditionalValidClone.size;
      arePsuFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        arePsuFieldsAdditionalValid: arePsuFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const arePsuFieldsAdditionalValidClone = structuredClone(
        state.arePsuFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      arePsuFieldsAdditionalValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredArePsuFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(arePsuFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredArePsuFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        arePsuFieldsAdditionalValid: filteredArePsuFieldsAdditionalValid,
      };
    }
    case 'update': {
      const arePsuFieldsAdditionalValidClone = structuredClone(
        state.arePsuFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = arePsuFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? arePsuFieldsAdditionalValidClone.set(index, [data, prevValue])
        : arePsuFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        arePsuFieldsAdditionalValid: arePsuFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => OS
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletOs_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletOs: action.payload as MobileOs,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => CHIPSET
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletChipset_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletChipset: action.payload as string,
  };
}

function setIsTabletChipsetFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletChipsetFocused: action.payload as boolean,
  };
}

function setIsTabletChipsetValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletChipsetValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => DISPLAY
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletDisplay_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletDisplay: action.payload as string,
  };
}

function setIsTabletDisplayFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletDisplayFocused: action.payload as boolean,
  };
}

function setIsTabletDisplayValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletDisplayValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => RESOLUTION => HORIZONTAL
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletResolutionHorizontal_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletResolutionHorizontal: action.payload as string,
  };
}

function setIsTabletResolutionHorizontalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletResolutionHorizontalFocused: action.payload as boolean,
  };
}

function setIsTabletResolutionHorizontalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletResolutionHorizontalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => RESOLUTION => VERTICAL
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletResolutionVertical_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletResolutionVertical: action.payload as string,
  };
}

function setIsTabletResolutionVerticalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletResolutionVerticalFocused: action.payload as boolean,
  };
}

function setIsTabletResolutionVerticalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletResolutionVerticalValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => RAM
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletRamCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletRamCapacity: action.payload as string,
  };
}

function setIsTabletRamCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletRamCapacityFocused: action.payload as boolean,
  };
}

function setIsTabletRamCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletRamCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => RAM CAPACITY UNIT
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletRamCapacityUnit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletRamCapacityUnit: action.payload as MemoryUnit,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => STORAGE CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletStorageCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletStorageCapacity: action.payload as string,
  };
}

function setIsTabletStorageCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletStorageCapacityFocused: action.payload as boolean,
  };
}

function setIsTabletStorageCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletStorageCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => BATTERY CAPACITY
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletBatteryCapacity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletBatteryCapacity: action.payload as string,
  };
}

function setIsTabletBatteryCapacityFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletBatteryCapacityFocused: action.payload as boolean,
  };
}

function setIsTabletBatteryCapacityValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletBatteryCapacityValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => CAMERA
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletCamera_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletCamera: action.payload as string,
  };
}

function setIsTabletCameraFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletCameraFocused: action.payload as boolean,
  };
}

function setIsTabletCameraValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletCameraValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setTabletColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    tabletColor: action.payload as string,
  };
}

function setIsTabletColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletColorFocused: action.payload as boolean,
  };
}

function setIsTabletColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isTabletColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * tabletFieldsAdditional state.
 * @description add: adds a new key-value pair to the tabletFieldsAdditional state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the tabletFieldsAdditional state
 */
function setTabletFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const tabletFieldsAdditionalClone = structuredClone(
        state.tabletFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = tabletFieldsAdditionalClone.size;
      tabletFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        tabletFieldsAdditional: tabletFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const tabletFieldsAdditionalClone = structuredClone(
        state.tabletFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      tabletFieldsAdditionalClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredTabletFieldsAdditional = new Map<
        number,
        [string, string]
      >();
      Array.from(tabletFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredTabletFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        tabletFieldsAdditional: filteredTabletFieldsAdditional,
      };
    }
    case 'update': {
      const tabletFieldsAdditionalClone = structuredClone(
        state.tabletFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = tabletFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? tabletFieldsAdditionalClone.set(index, [data, prevValue])
        : tabletFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        tabletFieldsAdditional: tabletFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areTabletFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areTabletFieldsAdditionalFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over tabletFieldsAdditional state to generate the text elements
 * - that access the areTabletFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areTabletFieldsAdditionalFocused state
 */
function setAreTabletFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areTabletFieldsAdditionalFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areTabletFieldsAdditionalFocusedClone.size;
      areTabletFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areTabletFieldsAdditionalFocused: areTabletFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areTabletFieldsAdditionalFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areTabletFieldsAdditionalFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreTabletFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areTabletFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreTabletFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areTabletFieldsAdditionalFocused:
          filteredAreTabletFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areTabletFieldsAdditionalFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areTabletFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areTabletFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areTabletFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areTabletFieldsAdditionalFocused: areTabletFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TABLET => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areTabletFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areTabletFieldsAdditionalValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over tabletFieldsAdditional state to generate the text elements
 * - that access the areTabletFieldsAdditionalValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areTabletFieldsAdditionalValid state
 */
function setAreTabletFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areTabletFieldsAdditionalValidClone = structuredClone(
        state.areTabletFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areTabletFieldsAdditionalValidClone.size;
      areTabletFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areTabletFieldsAdditionalValid: areTabletFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areTabletFieldsAdditionalValidClone = structuredClone(
        state.areTabletFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areTabletFieldsAdditionalValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreTabletFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areTabletFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreTabletFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areTabletFieldsAdditionalValid: filteredAreTabletFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areTabletFieldsAdditionalValidClone = structuredClone(
        state.areTabletFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areTabletFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areTabletFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areTabletFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areTabletFieldsAdditionalValid: areTabletFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => RESOLUTION
// ╰─────────────────────────────────────────────────────────────────╯
function setWebcamResolution_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamResolution: action.payload as WebcamResolution,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => INTERFACE
// ╰─────────────────────────────────────────────────────────────────╯
function setWebcamInterface_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamInterface: action.payload as WebcamInterface,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => MICROPHONE
// ╰─────────────────────────────────────────────────────────────────╯
function setWebcamMicrophone_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamMicrophone: action.payload as WebcamMicrophone,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => FRAME RATE
// ╰─────────────────────────────────────────────────────────────────╯
function setWebcamFrameRate_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamFrameRate: action.payload as WebcamFrameRate,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setWebcamColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    webcamColor: action.payload as string,
  };
}

function setIsWebcamColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isWebcamColorFocused: action.payload as boolean,
  };
}

function setIsWebcamColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isWebcamColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * webcamFieldsAdditional state.
 * @description add: adds a new key-value pair to the webcamFieldsAdditional state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the webcamFieldsAdditional state
 */
function setWebcamFieldsAdditional_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const webcamFieldsAdditionalClone = structuredClone(
        state.webcamFieldsAdditional
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = webcamFieldsAdditionalClone.size;
      webcamFieldsAdditionalClone.set(prevSize, data);

      return {
        ...state,
        webcamFieldsAdditional: webcamFieldsAdditionalClone,
      };
    }
    case 'remove': {
      const webcamFieldsAdditionalClone = structuredClone(
        state.webcamFieldsAdditional
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      webcamFieldsAdditionalClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredWebcamFieldsAdditional = new Map<
        number,
        [string, string]
      >();
      Array.from(webcamFieldsAdditionalClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredWebcamFieldsAdditional.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        webcamFieldsAdditional: filteredWebcamFieldsAdditional,
      };
    }
    case 'update': {
      const webcamFieldsAdditionalClone = structuredClone(
        state.webcamFieldsAdditional
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = webcamFieldsAdditionalClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? webcamFieldsAdditionalClone.set(index, [data, prevValue])
        : webcamFieldsAdditionalClone.set(index, [prevKey, data]);

      return {
        ...state,
        webcamFieldsAdditional: webcamFieldsAdditionalClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areWebcamFieldsAdditionalFocused state.
 * @description add: adds a new key-value pair to the areWebcamFieldsAdditionalFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over webcamFieldsAdditional state to generate the text elements
 * - that access the areWebcamFieldsAdditionalFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areWebcamFieldsAdditionalFocused state
 */
function setAreWebcamFieldsAdditionalFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areWebcamFieldsAdditionalFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areWebcamFieldsAdditionalFocusedClone.size;
      areWebcamFieldsAdditionalFocusedClone.set(prevSize, data);

      return {
        ...state,
        areWebcamFieldsAdditionalFocused: areWebcamFieldsAdditionalFocusedClone,
      };
    }
    case 'remove': {
      const areWebcamFieldsAdditionalFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areWebcamFieldsAdditionalFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreWebcamFieldsAdditionalFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areWebcamFieldsAdditionalFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreWebcamFieldsAdditionalFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areWebcamFieldsAdditionalFocused:
          filteredAreWebcamFieldsAdditionalFocused,
      };
    }
    case 'update': {
      const areWebcamFieldsAdditionalFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areWebcamFieldsAdditionalFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areWebcamFieldsAdditionalFocusedClone.set(index, [data, prevValue])
        : areWebcamFieldsAdditionalFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areWebcamFieldsAdditionalFocused: areWebcamFieldsAdditionalFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//   WEBCAM => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areWebcamFieldsAdditionalValid state.
 * @description add: adds a new key-value pair to the areWebcamFieldsAdditionalValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over webcamFieldsAdditional state to generate the text elements
 * - that access the areWebcamFieldsAdditionalValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areWebcamFieldsAdditionalValid state
 */
function setAreWebcamFieldsAdditionalValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areWebcamFieldsAdditionalValidClone = structuredClone(
        state.areWebcamFieldsAdditionalValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areWebcamFieldsAdditionalValidClone.size;
      areWebcamFieldsAdditionalValidClone.set(prevSize, data);

      return {
        ...state,
        areWebcamFieldsAdditionalValid: areWebcamFieldsAdditionalValidClone,
      };
    }
    case 'remove': {
      const areWebcamFieldsAdditionalValidClone = structuredClone(
        state.areWebcamFieldsAdditionalValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areWebcamFieldsAdditionalValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreWebcamFieldsAdditionalValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areWebcamFieldsAdditionalValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreWebcamFieldsAdditionalValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areWebcamFieldsAdditionalValid: filteredAreWebcamFieldsAdditionalValid,
      };
    }
    case 'update': {
      const areWebcamFieldsAdditionalValidClone = structuredClone(
        state.areWebcamFieldsAdditionalValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areWebcamFieldsAdditionalValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areWebcamFieldsAdditionalValidClone.set(index, [data, prevValue])
        : areWebcamFieldsAdditionalValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areWebcamFieldsAdditionalValid: areWebcamFieldsAdditionalValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   REDUCER FUNCTIONS => STEPPER PAGE 3
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//   IMAGES => FORM DATA ARRAY
// ╰─────────────────────────────────────────────────────────────────╯
function setImgFormDataArray_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    imgFormDataArray: action.payload as FormData[],
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   IMAGES => VALID
// ╰─────────────────────────────────────────────────────────────────╯
function setAreImagesValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    areImagesValid: action.payload as boolean,
  };
}

// ╔═════════════════════════════════════════════════════════════════╗
//   REDUCER FUNCTIONS => MISC.
// ╚═════════════════════════════════════════════════════════════════╝

/**
 * // misc.
    case createProductAction.setCurrentlySelectedAdditionalFieldIndex:
      return {
        ...state,
        currentlySelectedAdditionalFieldIndex: action.payload,
      };

    case createProductAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createProductAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createProductAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createProductAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createProductAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createProductAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createProductAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
 */

// ╭─────────────────────────────────────────────────────────────────╮
//   CURRENTLY SELECTED ADDITIONAL FIELD INDEX
// ╰─────────────────────────────────────────────────────────────────╯
function setCurrentlySelectedAdditionalFieldIndex_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currentlySelectedAdditionalFieldIndex: action.payload as number,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   TRIGGER FORM SUBMIT
// ╰─────────────────────────────────────────────────────────────────╯
function setTriggerFormSubmit_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    triggerFormSubmit: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   CURRENT STEPPER POSITION
// ╰─────────────────────────────────────────────────────────────────╯
function setCurrentStepperPosition_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    currentStepperPosition: action.payload as number,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   STEPS IN ERROR
// ╰─────────────────────────────────────────────────────────────────╯
function setStepsInError_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { kind, step } = action.payload as StepsInErrorPayload;
  const stepsInError = new Set(state.stepsInError);
  kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

  return {
    ...state,
    stepsInError,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   IS SUBMITTING
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSubmitting_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSubmitting: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   SUBMIT MESSAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setSubmitMessage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    submitMessage: action.payload as string,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   IS SUCCESSFUL
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSuccessful_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isSuccessful: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//   SUCCESS MESSAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setSuccessMessage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    successMessage: action.payload as string,
  };
}

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCERS MAP
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

const createProductReducersMap = new Map<
  CreateProductAction[keyof CreateProductAction],
  (
    state: CreateProductState,
    action: CreateProductDispatch
  ) => CreateProductState
>([
  // ╔═════════════════════════════════════════════════════════════════╗
  //   REDUCERS MAP => STEPPER PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝

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

  // ╔═════════════════════════════════════════════════════════════════╗
  //   REDUCERS MAP => STEPPER PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PRODUCT CATEGORY
  // ╰─────────────────────────────────────────────────────────────────╯

  // product category
  [
    createProductAction.setProductCategory,
    setProductCategory_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯

  // accessory -> type
  [createProductAction.setAccessoryType, setAccessoryType_CreateProductReducer],
  [
    createProductAction.setIsAccessoryTypeValid,
    setIsAccessoryTypeValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsAccessoryTypeFocused,
    setIsAccessoryTypeFocused_CreateProductReducer,
  ],
  // accessory -> color
  [
    createProductAction.setAccessoryColor,
    setAccessoryColor_CreateProductReducer,
  ],
  [
    createProductAction.setIsAccessoryColorValid,
    setIsAccessoryColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsAccessoryColorFocused,
    setIsAccessoryColorFocused_CreateProductReducer,
  ],
  // accessory -> interface
  [
    createProductAction.setAccessoryInterface,
    setAccessoryInterface_CreateProductReducer,
  ],
  // accessory -> additional fields
  [
    createProductAction.setAccessoryFieldsAdditional,
    setAccessoryFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreAccessoryFieldsAdditionalFocused,
    setAreAccessoryFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreAccessoryFieldsAdditionalValid,
    setAreAccessoryFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU
  // ╰─────────────────────────────────────────────────────────────────╯

  // cpu -> socket
  [createProductAction.setCpuSocket, setCpuSocket_CreateProductReducer],
  [
    createProductAction.setIsCpuSocketValid,
    setIsCpuSocketValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuSocketFocused,
    setIsCpuSocketFocused_CreateProductReducer,
  ],
  // cpu -> frequency
  [createProductAction.setCpuFrequency, setCpuFrequency_CreateProductReducer],
  [
    createProductAction.setIsCpuFrequencyValid,
    setIsCpuFrequencyValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuFrequencyFocused,
    setIsCpuFrequencyFocused_CreateProductReducer,
  ],
  // cpu -> cores
  [createProductAction.setCpuCores, setCpuCores_CreateProductReducer],
  [
    createProductAction.setIsCpuCoresValid,
    setIsCpuCoresValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuCoresFocused,
    setIsCpuCoresFocused_CreateProductReducer,
  ],
  // cpu -> l1 cache capacity
  [
    createProductAction.setCpuL1CacheCapacity,
    setCpuL1CacheCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL1CacheCapacityValid,
    setIsCpuL1CacheCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL1CacheCapacityFocused,
    setIsCpuL1CacheCapacityFocused_CreateProductReducer,
  ],
  // cpu -> l1 cache capacity unit
  [
    createProductAction.setCpuL1CacheCapacityUnit,
    setCpuL1CacheCapacityUnit_CreateProductReducer,
  ],
  // cpu -> l2 cache capacity
  [
    createProductAction.setCpuL2CacheCapacity,
    setCpuL2CacheCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL2CacheCapacityValid,
    setIsCpuL2CacheCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL2CacheCapacityFocused,
    setIsCpuL2CacheCapacityFocused_CreateProductReducer,
  ],
  // cpu -> l2 cache capacity unit
  [
    createProductAction.setCpuL2CacheCapacityUnit,
    setCpuL2CacheCapacityUnit_CreateProductReducer,
  ],
  // cpu -> l3 cache capacity
  [
    createProductAction.setCpuL3CacheCapacity,
    setCpuL3CacheCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL3CacheCapacityValid,
    setIsCpuL3CacheCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuL3CacheCapacityFocused,
    setIsCpuL3CacheCapacityFocused_CreateProductReducer,
  ],
  // cpu -> l3 cache capacity unit
  [
    createProductAction.setCpuL3CacheCapacityUnit,
    setCpuL3CacheCapacityUnit_CreateProductReducer,
  ],
  // cpu -> wattage
  [createProductAction.setCpuWattage, setCpuWattage_CreateProductReducer],
  [
    createProductAction.setIsCpuWattageValid,
    setIsCpuWattageValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCpuWattageFocused,
    setIsCpuWattageFocused_CreateProductReducer,
  ],
  // cpu -> additional fields
  [
    createProductAction.setCpuFieldsAdditional,
    setCpuFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreCpuFieldsAdditionalFocused,
    setAreCpuFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreCpuFieldsAdditionalValid,
    setAreCpuFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU
  // ╰─────────────────────────────────────────────────────────────────╯

  // gpu -> chipset
  [createProductAction.setGpuChipset, setGpuChipset_CreateProductReducer],
  [
    createProductAction.setIsGpuChipsetValid,
    setIsGpuChipsetValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsGpuChipsetFocused,
    setIsGpuChipsetFocused_CreateProductReducer,
  ],
  // gpu -> memory capacity
  [
    createProductAction.setGpuMemoryCapacity,
    setGpuMemoryCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsGpuMemoryCapacityValid,
    setIsGpuMemoryCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsGpuMemoryCapacityFocused,
    setIsGpuMemoryCapacityFocused_CreateProductReducer,
  ],
  // gpu -> memory capacity unit
  [
    createProductAction.setGpuMemoryCapacityUnit,
    setGpuMemoryCapacityUnit_CreateProductReducer,
  ],
  // gpu -> core clock
  [createProductAction.setGpuCoreClock, setGpuCoreClock_CreateProductReducer],
  [
    createProductAction.setIsGpuCoreClockValid,
    setIsGpuCoreClockValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsGpuCoreClockFocused,
    setIsGpuCoreClockFocused_CreateProductReducer,
  ],
  // gpu -> boost clock
  [createProductAction.setGpuBoostClock, setGpuBoostClock_CreateProductReducer],
  [
    createProductAction.setIsGpuBoostClockValid,
    setIsGpuBoostClockValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsGpuBoostClockFocused,
    setIsGpuBoostClockFocused_CreateProductReducer,
  ],
  // gpu -> tdp
  [createProductAction.setGpuTdp, setGpuTdp_CreateProductReducer],
  [createProductAction.setIsGpuTdpValid, setIsGpuTdpValid_CreateProductReducer],
  [
    createProductAction.setIsGpuTdpFocused,
    setIsGpuTdpFocused_CreateProductReducer,
  ],
  // gpu -> additional fields
  [
    createProductAction.setGpuFieldsAdditional,
    setGpuFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreGpuFieldsAdditionalFocused,
    setAreGpuFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreGpuFieldsAdditionalValid,
    setAreGpuFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONES
  // ╰─────────────────────────────────────────────────────────────────╯

  // headphones -> type
  [createProductAction.setHeadphoneType, setHeadphoneType_CreateProductReducer],
  // headphones -> driver
  [
    createProductAction.setHeadphoneDriver,
    setHeadphoneDriver_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneDriverValid,
    setIsHeadphoneDriverValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneDriverFocused,
    setIsHeadphoneDriverFocused_CreateProductReducer,
  ],
  // headphones -> frequency response
  [
    createProductAction.setHeadphoneFrequencyResponse,
    setHeadphoneFrequencyResponse_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneFrequencyResponseValid,
    setIsHeadphoneFrequencyResponseValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneFrequencyResponseFocused,
    setIsHeadphoneFrequencyResponseFocused_CreateProductReducer,
  ],
  // headphones -> impedance
  [
    createProductAction.setHeadphoneImpedance,
    setHeadphoneImpedance_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneImpedanceValid,
    setIsHeadphoneImpedanceValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneImpedanceFocused,
    setIsHeadphoneImpedanceFocused_CreateProductReducer,
  ],
  // headphones -> color
  [
    createProductAction.setHeadphoneColor,
    setHeadphoneColor_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneColorValid,
    setIsHeadphoneColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsHeadphoneColorFocused,
    setIsHeadphoneColorFocused_CreateProductReducer,
  ],
  // headphones -> interface
  [
    createProductAction.setHeadphoneInterface,
    setHeadphoneInterface_CreateProductReducer,
  ],
  // headphones -> additional fields
  [
    createProductAction.setHeadphoneFieldsAdditional,
    setHeadphoneFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreHeadphoneFieldsAdditionalFocused,
    setAreHeadphoneFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreHeadphoneFieldsAdditionalValid,
    setAreHeadphoneFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // keyboard -> switch
  [
    createProductAction.setKeyboardSwitch,
    setKeyboardSwitch_CreateProductReducer,
  ],
  // keyboard -> layout
  [
    createProductAction.setKeyboardLayout,
    setKeyboardLayout_CreateProductReducer,
  ],
  // keyboard -> backlight
  [
    createProductAction.setKeyboardBacklight,
    setKeyboardBacklight_CreateProductReducer,
  ],
  // keyboard -> interface
  [
    createProductAction.setKeyboardInterface,
    setKeyboardInterface_CreateProductReducer,
  ],
  // keyboard -> additional fields
  [
    createProductAction.setKeyboardFieldsAdditional,
    setKeyboardFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreKeyboardFieldsAdditionalFocused,
    setAreKeyboardFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreKeyboardFieldsAdditionalValid,
    setAreKeyboardFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM
  // ╰─────────────────────────────────────────────────────────────────╯

  // ram -> data rate
  [createProductAction.setRamDataRate, setRamDataRate_CreateProductReducer],
  [
    createProductAction.setIsRamDataRateValid,
    setIsRamDataRateValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamDataRateFocused,
    setIsRamDataRateFocused_CreateProductReducer,
  ],
  // ram -> modules quantity
  [
    createProductAction.setRamModulesQuantity,
    setRamModulesQuantity_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamModulesQuantityValid,
    setIsRamModulesQuantityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamModulesQuantityFocused,
    setIsRamModulesQuantityFocused_CreateProductReducer,
  ],
  // ram -> modules capacity
  [
    createProductAction.setRamModulesCapacity,
    setRamModulesCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamModulesCapacityValid,
    setIsRamModulesCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamModulesCapacityFocused,
    setIsRamModulesCapacityFocused_CreateProductReducer,
  ],
  // ram -> modules capacity unit
  [
    createProductAction.setRamModulesCapacityUnit,
    setRamModulesCapacityUnit_CreateProductReducer,
  ],
  // ram -> type
  [createProductAction.setRamType, setRamType_CreateProductReducer],
  // ram -> color
  [createProductAction.setRamColor, setRamColor_CreateProductReducer],
  [
    createProductAction.setIsRamColorValid,
    setIsRamColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamColorFocused,
    setIsRamColorFocused_CreateProductReducer,
  ],
  // ram -> voltage
  [createProductAction.setRamVoltage, setRamVoltage_CreateProductReducer],
  [
    createProductAction.setIsRamVoltageValid,
    setIsRamVoltageValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamVoltageFocused,
    setIsRamVoltageFocused_CreateProductReducer,
  ],
  // ram -> timing
  [createProductAction.setRamTiming, setRamTiming_CreateProductReducer],
  [
    createProductAction.setIsRamTimingValid,
    setIsRamTimingValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsRamTimingFocused,
    setIsRamTimingFocused_CreateProductReducer,
  ],
  // ram -> additional fields
  [
    createProductAction.setRamFieldsAdditional,
    setRamFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreRamFieldsAdditionalFocused,
    setAreRamFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreRamFieldsAdditionalValid,
    setAreRamFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // mouse -> sensor
  [createProductAction.setMouseSensor, setMouseSensor_CreateProductReducer],
  // mouse -> dpi
  [createProductAction.setMouseDpi, setMouseDpi_CreateProductReducer],
  [
    createProductAction.setIsMouseDpiValid,
    setIsMouseDpiValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMouseDpiFocused,
    setIsMouseDpiFocused_CreateProductReducer,
  ],
  // mouse -> buttons
  [createProductAction.setMouseButtons, setMouseButtons_CreateProductReducer],
  [
    createProductAction.setIsMouseButtonsValid,
    setIsMouseButtonsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMouseButtonsFocused,
    setIsMouseButtonsFocused_CreateProductReducer,
  ],
  // mouse -> color
  [createProductAction.setMouseColor, setMouseColor_CreateProductReducer],
  [
    createProductAction.setIsMouseColorValid,
    setIsMouseColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMouseColorFocused,
    setIsMouseColorFocused_CreateProductReducer,
  ],
  // mouse -> interface
  [
    createProductAction.setMouseInterface,
    setMouseInterface_CreateProductReducer,
  ],
  // mouse -> additional fields
  [
    createProductAction.setMouseFieldsAdditional,
    setMouseFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreMouseFieldsAdditionalFocused,
    setAreMouseFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMouseFieldsAdditionalValid,
    setAreMouseFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // microphone -> type
  [
    createProductAction.setMicrophoneType,
    setMicrophoneType_CreateProductReducer,
  ],
  // mirophone -> polar pattern
  [
    createProductAction.setMicrophonePolarPattern,
    setMicrophonePolarPattern_CreateProductReducer,
  ],
  // microphone -> interface
  [
    createProductAction.setMicrophoneInterface,
    setMicrophoneInterface_CreateProductReducer,
  ],
  // microphone -> color
  [
    createProductAction.setMicrophoneColor,
    setMicrophoneColor_CreateProductReducer,
  ],
  [
    createProductAction.setIsMicrophoneColorValid,
    setIsMicrophoneColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMicrophoneColorFocused,
    setIsMicrophoneColorFocused_CreateProductReducer,
  ],
  // microphone -> frequency response
  [
    createProductAction.setMicrophoneFrequencyResponse,
    setMicrophoneFrequencyResponse_CreateProductReducer,
  ],
  [
    createProductAction.setIsMicrophoneFrequencyResponseValid,
    setIsMicrophoneFrequencyResponseValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMicrophoneFrequencyResponseFocused,
    setIsMicrophoneFrequencyResponseFocused_CreateProductReducer,
  ],
  // microphone -> additional fields
  [
    createProductAction.setMicrophoneFieldsAdditional,
    setMicrophoneFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreMicrophoneFieldsAdditionalFocused,
    setAreMicrophoneFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMicrophoneFieldsAdditionalValid,
    setAreMicrophoneFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // display -> size
  [createProductAction.setDisplaySize, setDisplaySize_CreateProductReducer],
  [
    createProductAction.setIsDisplaySizeValid,
    setIsDisplaySizeValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplaySizeFocused,
    setIsDisplaySizeFocused_CreateProductReducer,
  ],
  // display -> resolution -> horizontal
  [
    createProductAction.setDisplayResolutionHorizontal,
    setDisplayResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResolutionHorizontalValid,
    setIsDisplayResolutionHorizontalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResolutionHorizontalFocused,
    setIsDisplayResolutionHorizontalFocused_CreateProductReducer,
  ],
  // display -> resolution -> vertical
  [
    createProductAction.setDisplayResolutionVertical,
    setDisplayResolutionVertical_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResolutionVerticalValid,
    setIsDisplayResolutionVerticalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResolutionVerticalFocused,
    setIsDisplayResolutionVerticalFocused_CreateProductReducer,
  ],
  // display -> refresh rate
  [
    createProductAction.setDisplayRefreshRate,
    setDisplayRefreshRate_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayRefreshRateValid,
    setIsDisplayRefreshRateValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayRefreshRateFocused,
    setIsDisplayRefreshRateFocused_CreateProductReducer,
  ],
  // display -> panel type
  [
    createProductAction.setDisplayPanelType,
    setDisplayPanelType_CreateProductReducer,
  ],
  // display -> response time
  [
    createProductAction.setDisplayResponseTime,
    setDisplayResponseTime_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResponseTimeValid,
    setIsDisplayResponseTimeValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayResponseTimeFocused,
    setIsDisplayResponseTimeFocused_CreateProductReducer,
  ],
  // display -> aspect ratio
  [
    createProductAction.setDisplayAspectRatio,
    setDisplayAspectRatio_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayAspectRatioValid,
    setIsDisplayAspectRatioValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDisplayAspectRatioFocused,
    setIsDisplayAspectRatioFocused_CreateProductReducer,
  ],
  // display -> additional fields
  [
    createProductAction.setDisplayFieldsAdditional,
    setDisplayFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreDisplayFieldsAdditionalFocused,
    setAreDisplayFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreDisplayFieldsAdditionalValid,
    setAreDisplayFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯

  // motherboard -> socket
  [
    createProductAction.setMotherboardSocket,
    setMotherboardSocket_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardSocketValid,
    setIsMotherboardSocketValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardSocketFocused,
    setIsMotherboardSocketFocused_CreateProductReducer,
  ],
  // motherboard -> chipset
  [
    createProductAction.setMotherboardChipset,
    setMotherboardChipset_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardChipsetValid,
    setIsMotherboardChipsetValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardChipsetFocused,
    setIsMotherboardChipsetFocused_CreateProductReducer,
  ],
  // motherboard -> form factor
  [
    createProductAction.setMotherboardFormFactor,
    setMotherboardFormFactor_CreateProductReducer,
  ],
  // motherboard -> memory max capacity
  [
    createProductAction.setMotherboardMemoryMaxCapacity,
    setMotherboardMemoryMaxCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardMemoryMaxCapacityValid,
    setIsMotherboardMemoryMaxCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardMemoryMaxCapacityFocused,
    setIsMotherboardMemoryMaxCapacityFocused_CreateProductReducer,
  ],
  // motherboard -> memory max capacity unit
  [
    createProductAction.setMotherboardMemoryMaxCapacityUnit,
    setMotherboardMemoryMaxCapacityUnit_CreateProductReducer,
  ],
  // motherboard -> memory slots
  [
    createProductAction.setMotherboardMemorySlots,
    setMotherboardMemorySlots_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardMemorySlotsValid,
    setIsMotherboardMemorySlotsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardMemorySlotsFocused,
    setIsMotherboardMemorySlotsFocused_CreateProductReducer,
  ],
  // motherboard -> memory type
  [
    createProductAction.setMotherboardMemoryType,
    setMotherboardMemoryType_CreateProductReducer,
  ],
  // motherboard -> sata ports
  [
    createProductAction.setMotherboardSataPorts,
    setMotherboardSataPorts_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardSataPortsValid,
    setIsMotherboardSataPortsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardSataPortsFocused,
    setIsMotherboardSataPortsFocused_CreateProductReducer,
  ],
  // motherboard -> m2 slots
  [
    createProductAction.setMotherboardM2Slots,
    setMotherboardM2Slots_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardM2SlotsValid,
    setIsMotherboardM2SlotsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardM2SlotsFocused,
    setIsMotherboardM2SlotsFocused_CreateProductReducer,
  ],
  // motherboard -> pcie3 slots
  [
    createProductAction.setMotherboardPcie3Slots,
    setMotherboardPcie3Slots_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie3SlotsValid,
    setIsMotherboardPcie3SlotsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie3SlotsFocused,
    setIsMotherboardPcie3SlotsFocused_CreateProductReducer,
  ],
  // motherboard -> pcie4 slots
  [
    createProductAction.setMotherboardPcie4Slots,
    setMotherboardPcie4Slots_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie4SlotsValid,
    setIsMotherboardPcie4SlotsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie4SlotsFocused,
    setIsMotherboardPcie4SlotsFocused_CreateProductReducer,
  ],
  // motherboard -> pcie5 slots
  [
    createProductAction.setMotherboardPcie5Slots,
    setMotherboardPcie5Slots_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie5SlotsValid,
    setIsMotherboardPcie5SlotsValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsMotherboardPcie5SlotsFocused,
    setIsMotherboardPcie5SlotsFocused_CreateProductReducer,
  ],
  // motherboard -> additional fields
  [
    createProductAction.setMotherboardFieldsAdditional,
    setMotherboardFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreMotherboardFieldsAdditionalFocused,
    setAreMotherboardFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMotherboardFieldsAdditionalValid,
    setAreMotherboardFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯

  // smartphone -> os
  [createProductAction.setSmartphoneOs, setSmartphoneOs_CreateProductReducer],
  // smartphone -> chipset
  [
    createProductAction.setSmartphoneChipset,
    setSmartphoneChipset_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneChipsetValid,
    setIsSmartphoneChipsetValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneChipsetFocused,
    setIsSmartphoneChipsetFocused_CreateProductReducer,
  ],
  // smartphone -> display
  [
    createProductAction.setSmartphoneDisplay,
    setSmartphoneDisplay_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneDisplayValid,
    setIsSmartphoneDisplayValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneDisplayFocused,
    setIsSmartphoneDisplayFocused_CreateProductReducer,
  ],
  // smartphone -> resolution -> horizontal
  [
    createProductAction.setSmartphoneResolutionHorizontal,
    setSmartphoneResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneResolutionHorizontalValid,
    setIsSmartphoneResolutionHorizontalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneResolutionHorizontalFocused,
    setIsSmartphoneResolutionHorizontalFocused_CreateProductReducer,
  ],
  // smartphone -> resolution -> vertical
  [
    createProductAction.setSmartphoneResolutionVertical,
    setSmartphoneResolutionVertical_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneResolutionVerticalValid,
    setIsSmartphoneResolutionVerticalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneResolutionVerticalFocused,
    setIsSmartphoneResolutionVerticalFocused_CreateProductReducer,
  ],
  // smartphone -> ram capacity
  [
    createProductAction.setSmartphoneRamCapacity,
    setSmartphoneRamCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneRamCapacityValid,
    setIsSmartphoneRamCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneRamCapacityFocused,
    setIsSmartphoneRamCapacityFocused_CreateProductReducer,
  ],
  // smartphone -> ram capacity unit
  [
    createProductAction.setSmartphoneRamCapacityUnit,
    setSmartphoneRamCapacityUnit_CreateProductReducer,
  ],
  // smartphone -> storage capacity
  [
    createProductAction.setSmartphoneStorageCapacity,
    setSmartphoneStorageCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneStorageCapacityValid,
    setIsSmartphoneStorageCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneStorageCapacityFocused,
    setIsSmartphoneStorageCapacityFocused_CreateProductReducer,
  ],
  // smartphone -> battery capacity
  [
    createProductAction.setSmartphoneBatteryCapacity,
    setSmartphoneBatteryCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneBatteryCapacityValid,
    setIsSmartphoneBatteryCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneBatteryCapacityFocused,
    setIsSmartphoneBatteryCapacityFocused_CreateProductReducer,
  ],
  // smartphone -> camera
  [
    createProductAction.setSmartphoneCamera,
    setSmartphoneCamera_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneCameraValid,
    setIsSmartphoneCameraValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneCameraFocused,
    setIsSmartphoneCameraFocused_CreateProductReducer,
  ],
  // smartphone -> color
  [
    createProductAction.setSmartphoneColor,
    setSmartphoneColor_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneColorValid,
    setIsSmartphoneColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSmartphoneColorFocused,
    setIsSmartphoneColorFocused_CreateProductReducer,
  ],
  // smartphone -> additional fields
  [
    createProductAction.setSmartphoneFieldsAdditional,
    setSmartphoneFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreSmartphoneFieldsAdditionalFocused,
    setAreSmartphoneFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreSmartphoneFieldsAdditionalValid,
    setAreSmartphoneFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯

  // speaker -> type
  [createProductAction.setSpeakerType, setSpeakerType_CreateProductReducer],
  // speaker -> total wattage
  [
    createProductAction.setSpeakerTotalWattage,
    setSpeakerTotalWattage_CreateProductReducer,
  ],
  [
    createProductAction.setIsSpeakerTotalWattageValid,
    setIsSpeakerTotalWattageValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSpeakerTotalWattageFocused,
    setIsSpeakerTotalWattageFocused_CreateProductReducer,
  ],
  // speaker -> frequency response
  [
    createProductAction.setSpeakerFrequencyResponse,
    setSpeakerFrequencyResponse_CreateProductReducer,
  ],
  [
    createProductAction.setIsSpeakerFrequencyResponseValid,
    setIsSpeakerFrequencyResponseValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSpeakerFrequencyResponseFocused,
    setIsSpeakerFrequencyResponseFocused_CreateProductReducer,
  ],
  // speaker -> color
  [createProductAction.setSpeakerColor, setSpeakerColor_CreateProductReducer],
  [
    createProductAction.setIsSpeakerColorValid,
    setIsSpeakerColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsSpeakerColorFocused,
    setIsSpeakerColorFocused_CreateProductReducer,
  ],
  // speaker -> interface
  [
    createProductAction.setSpeakerInterface,
    setSpeakerInterface_CreateProductReducer,
  ],
  // speaker -> additional fields
  [
    createProductAction.setSpeakerFieldsAdditional,
    setSpeakerFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreSpeakerFieldsAdditionalFocused,
    setAreSpeakerFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreSpeakerFieldsAdditionalValid,
    setAreSpeakerFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // storage -> type
  [createProductAction.setStorageType, setStorageType_CreateProductReducer],
  // storage -> capacity
  [
    createProductAction.setStorageCapacity,
    setStorageCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsStorageCapacityValid,
    setIsStorageCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsStorageCapacityFocused,
    setIsStorageCapacityFocused_CreateProductReducer,
  ],
  // storage -> capacity unit
  [
    createProductAction.setStorageCapacityUnit,
    setStorageCapacityUnit_CreateProductReducer,
  ],
  // storage -> cache capacity
  [
    createProductAction.setStorageCacheCapacity,
    setStorageCacheCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsStorageCacheCapacityValid,
    setIsStorageCacheCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsStorageCacheCapacityFocused,
    setIsStorageCacheCapacityFocused_CreateProductReducer,
  ],
  // storage -> cache capacity unit
  [
    createProductAction.setStorageCacheCapacityUnit,
    setStorageCacheCapacityUnit_CreateProductReducer,
  ],
  // storage -> form factor
  [
    createProductAction.setStorageFormFactor,
    setStorageFormFactor_CreateProductReducer,
  ],
  // storage -> interface
  [
    createProductAction.setStorageInterface,
    setStorageInterface_CreateProductReducer,
  ],
  // storage -> additional fields
  [
    createProductAction.setStorageFieldsAdditional,
    setStorageFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreStorageFieldsAdditionalFocused,
    setAreStorageFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreStorageFieldsAdditionalValid,
    setAreStorageFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET
  // ╰─────────────────────────────────────────────────────────────────╯

  // tablet -> os
  [createProductAction.setTabletOs, setTabletOs_CreateProductReducer],
  // tablet -> chipset
  [createProductAction.setTabletChipset, setTabletChipset_CreateProductReducer],
  [
    createProductAction.setIsTabletChipsetValid,
    setIsTabletChipsetValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletChipsetFocused,
    setIsTabletChipsetFocused_CreateProductReducer,
  ],
  // tablet -> display
  [createProductAction.setTabletDisplay, setTabletDisplay_CreateProductReducer],
  [
    createProductAction.setIsTabletDisplayValid,
    setIsTabletDisplayValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletDisplayFocused,
    setIsTabletDisplayFocused_CreateProductReducer,
  ],
  // tablet -> resolution -> horizontal
  [
    createProductAction.setTabletResolutionHorizontal,
    setTabletResolutionHorizontal_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletResolutionHorizontalValid,
    setIsTabletResolutionHorizontalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletResolutionHorizontalFocused,
    setIsTabletResolutionHorizontalFocused_CreateProductReducer,
  ],
  // tablet -> resolution -> vertical
  [
    createProductAction.setTabletResolutionVertical,
    setTabletResolutionVertical_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletResolutionVerticalValid,
    setIsTabletResolutionVerticalValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletResolutionVerticalFocused,
    setIsTabletResolutionVerticalFocused_CreateProductReducer,
  ],
  // tablet -> ram capacity
  [
    createProductAction.setTabletRamCapacity,
    setTabletRamCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletRamCapacityValid,
    setIsTabletRamCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletRamCapacityFocused,
    setIsTabletRamCapacityFocused_CreateProductReducer,
  ],
  // tablet -> ram capacity unit
  [
    createProductAction.setTabletRamCapacityUnit,
    setTabletRamCapacityUnit_CreateProductReducer,
  ],
  // tablet -> storage capacity
  [
    createProductAction.setTabletStorageCapacity,
    setTabletStorageCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletStorageCapacityValid,
    setIsTabletStorageCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletStorageCapacityFocused,
    setIsTabletStorageCapacityFocused_CreateProductReducer,
  ],
  // tablet -> battery capacity
  [
    createProductAction.setTabletBatteryCapacity,
    setTabletBatteryCapacity_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletBatteryCapacityValid,
    setIsTabletBatteryCapacityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletBatteryCapacityFocused,
    setIsTabletBatteryCapacityFocused_CreateProductReducer,
  ],
  // tablet -> camera
  [createProductAction.setTabletCamera, setTabletCamera_CreateProductReducer],
  [
    createProductAction.setIsTabletCameraValid,
    setIsTabletCameraValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletCameraFocused,
    setIsTabletCameraFocused_CreateProductReducer,
  ],
  // tablet -> color
  [createProductAction.setTabletColor, setTabletColor_CreateProductReducer],
  [
    createProductAction.setIsTabletColorValid,
    setIsTabletColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsTabletColorFocused,
    setIsTabletColorFocused_CreateProductReducer,
  ],
  // tablet -> additional fields
  [
    createProductAction.setTabletFieldsAdditional,
    setTabletFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreTabletFieldsAdditionalFocused,
    setAreTabletFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreTabletFieldsAdditionalValid,
    setAreTabletFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //   WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯

  // webcam -> resolution
  [
    createProductAction.setWebcamResolution,
    setWebcamResolution_CreateProductReducer,
  ],
  // webcam -> interface
  [
    createProductAction.setWebcamInterface,
    setWebcamInterface_CreateProductReducer,
  ],
  // webcam -> microphone
  [
    createProductAction.setWebcamMicrophone,
    setWebcamMicrophone_CreateProductReducer,
  ],
  // webcam -> frame rate
  [
    createProductAction.setWebcamFrameRate,
    setWebcamFrameRate_CreateProductReducer,
  ],
  // webcam -> color
  [createProductAction.setWebcamColor, setWebcamColor_CreateProductReducer],
  [
    createProductAction.setIsWebcamColorValid,
    setIsWebcamColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsWebcamColorFocused,
    setIsWebcamColorFocused_CreateProductReducer,
  ],
  // webcam -> additional fields
  [
    createProductAction.setWebcamFieldsAdditional,
    setWebcamFieldsAdditional_CreateProductReducer,
  ],
  [
    createProductAction.setAreWebcamFieldsAdditionalFocused,
    setAreWebcamFieldsAdditionalFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreWebcamFieldsAdditionalValid,
    setAreWebcamFieldsAdditionalValid_CreateProductReducer,
  ],

  // ╔═════════════════════════════════════════════════════════════════╗
  //   REDUCERS MAP => STEPPER PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    IMAGES
  // ╰─────────────────────────────────────────────────────────────────╯

  // images -> form data array
  [
    createProductAction.setImgFormDataArray,
    setImgFormDataArray_CreateProductReducer,
  ],
  // images -> valid
  [
    createProductAction.setAreImagesValid,
    setAreImagesValid_CreateProductReducer,
  ],

  // ╔═════════════════════════════════════════════════════════════════╗
  //   REDUCERS MAP => MISC.
  // ╚═════════════════════════════════════════════════════════════════╝

  // currently selected additional field index
  [
    createProductAction.setCurrentlySelectedAdditionalFieldIndex,
    setCurrentlySelectedAdditionalFieldIndex_CreateProductReducer,
  ],
  // trigger form submit
  [
    createProductAction.setTriggerFormSubmit,
    setTriggerFormSubmit_CreateProductReducer,
  ],
  // current stepper position
  [
    createProductAction.setCurrentStepperPosition,
    setCurrentStepperPosition_CreateProductReducer,
  ],
  // set steps in error
  [createProductAction.setStepsInError, setStepsInError_CreateProductReducer],
  // is submitting
  [createProductAction.setIsSubmitting, setIsSubmitting_CreateProductReducer],
  // submit message
  [createProductAction.setSubmitMessage, setSubmitMessage_CreateProductReducer],
  // is successful
  [createProductAction.setIsSuccessful, setIsSuccessful_CreateProductReducer],
  // success message
  [
    createProductAction.setSuccessMessage,
    setSuccessMessage_CreateProductReducer,
  ],
]);

function createProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const reducer = createProductReducersMap.get(action.type);
  return reducer ? reducer(state, action) : state;
}

export {
  createProductReducer,
  createProductReducersMap,
  setAccessoryColor_CreateProductReducer,
  setAccessoryFieldsAdditional_CreateProductReducer,
  setAccessoryInterface_CreateProductReducer,
  setAccessoryType_CreateProductReducer,
  setAdditionalComments_CreateProductReducer,
  setAreAccessoryFieldsAdditionalFocused_CreateProductReducer,
  setAreAccessoryFieldsAdditionalValid_CreateProductReducer,
  setAreCpuFieldsAdditionalFocused_CreateProductReducer,
  setAreCpuFieldsAdditionalValid_CreateProductReducer,
  setAreDisplayFieldsAdditionalFocused_CreateProductReducer,
  setAreDisplayFieldsAdditionalValid_CreateProductReducer,
  setAreGpuFieldsAdditionalFocused_CreateProductReducer,
  setAreGpuFieldsAdditionalValid_CreateProductReducer,
  setAreHeadphoneFieldsAdditionalFocused_CreateProductReducer,
  setAreHeadphoneFieldsAdditionalValid_CreateProductReducer,
  setAreImagesValid_CreateProductReducer,
  setAreKeyboardFieldsAdditionalFocused_CreateProductReducer,
  setAreKeyboardFieldsAdditionalValid_CreateProductReducer,
  setAreMicrophoneFieldsAdditionalFocused_CreateProductReducer,
  setAreMicrophoneFieldsAdditionalValid_CreateProductReducer,
  setAreMotherboardFieldsAdditionalFocused_CreateProductReducer,
  setAreMotherboardFieldsAdditionalValid_CreateProductReducer,
  setAreMouseFieldsAdditionalFocused_CreateProductReducer,
  setAreMouseFieldsAdditionalValid_CreateProductReducer,
  setAreRamFieldsAdditionalFocused_CreateProductReducer,
  setAreRamFieldsAdditionalValid_CreateProductReducer,
  setAreSmartphoneFieldsAdditionalFocused_CreateProductReducer,
  setAreSmartphoneFieldsAdditionalValid_CreateProductReducer,
  setAreSpeakerFieldsAdditionalFocused_CreateProductReducer,
  setAreSpeakerFieldsAdditionalValid_CreateProductReducer,
  setAreStorageFieldsAdditionalFocused_CreateProductReducer,
  setAreStorageFieldsAdditionalValid_CreateProductReducer,
  setAreTabletFieldsAdditionalFocused_CreateProductReducer,
  setAreTabletFieldsAdditionalValid_CreateProductReducer,
  setAvailability_CreateProductReducer,
  setBrand_CreateProductReducer,
  setCpuCores_CreateProductReducer,
  setCpuFieldsAdditional_CreateProductReducer,
  setCpuFrequency_CreateProductReducer,
  setCpuL1CacheCapacity_CreateProductReducer,
  setCpuL1CacheCapacityUnit_CreateProductReducer,
  setCpuL2CacheCapacity_CreateProductReducer,
  setCpuL2CacheCapacityUnit_CreateProductReducer,
  setCpuL3CacheCapacity_CreateProductReducer,
  setCpuL3CacheCapacityUnit_CreateProductReducer,
  setCpuSocket_CreateProductReducer,
  setCpuWattage_CreateProductReducer,
  setCurrency_CreateProductReducer,
  setCurrentlySelectedAdditionalFieldIndex_CreateProductReducer,
  setCurrentStepperPosition_CreateProductReducer,
  setDescription_CreateProductReducer,
  setDimensionHeight_CreateProductReducer,
  setDimensionHeightUnit_CreateProductReducer,
  setDimensionLength_CreateProductReducer,
  setDimensionLengthUnit_CreateProductReducer,
  setDimensionWidth_CreateProductReducer,
  setDimensionWidthUnit_CreateProductReducer,
  setDisplayAspectRatio_CreateProductReducer,
  setDisplayFieldsAdditional_CreateProductReducer,
  setDisplayPanelType_CreateProductReducer,
  setDisplayRefreshRate_CreateProductReducer,
  setDisplayResolutionHorizontal_CreateProductReducer,
  setDisplayResolutionVertical_CreateProductReducer,
  setDisplayResponseTime_CreateProductReducer,
  setDisplaySize_CreateProductReducer,
  setGpuBoostClock_CreateProductReducer,
  setGpuChipset_CreateProductReducer,
  setGpuCoreClock_CreateProductReducer,
  setGpuFieldsAdditional_CreateProductReducer,
  setGpuMemoryCapacity_CreateProductReducer,
  setGpuMemoryCapacityUnit_CreateProductReducer,
  setGpuTdp_CreateProductReducer,
  setHeadphoneColor_CreateProductReducer,
  setHeadphoneDriver_CreateProductReducer,
  setHeadphoneFieldsAdditional_CreateProductReducer,
  setHeadphoneFrequencyResponse_CreateProductReducer,
  setHeadphoneImpedance_CreateProductReducer,
  setHeadphoneInterface_CreateProductReducer,
  setHeadphoneType_CreateProductReducer,
  setImgFormDataArray_CreateProductReducer,
  setIsAccessoryColorFocused_CreateProductReducer,
  setIsAccessoryColorValid_CreateProductReducer,
  setIsAccessoryTypeFocused_CreateProductReducer,
  setIsAccessoryTypeValid_CreateProductReducer,
  setIsAdditionalCommentsFocused_CreateProductReducer,
  setIsAdditionalCommentsValid_CreateProductReducer,
  setIsBrandFocused_CreateProductReducer,
  setIsBrandValid_CreateProductReducer,
  setIsCpuCoresFocused_CreateProductReducer,
  setIsCpuCoresValid_CreateProductReducer,
  setIsCpuFrequencyFocused_CreateProductReducer,
  setIsCpuFrequencyValid_CreateProductReducer,
  setIsCpuL1CacheCapacityFocused_CreateProductReducer,
  setIsCpuL1CacheCapacityValid_CreateProductReducer,
  setIsCpuL2CacheCapacityFocused_CreateProductReducer,
  setIsCpuL2CacheCapacityValid_CreateProductReducer,
  setIsCpuL3CacheCapacityFocused_CreateProductReducer,
  setIsCpuL3CacheCapacityValid_CreateProductReducer,
  setIsCpuSocketFocused_CreateProductReducer,
  setIsCpuSocketValid_CreateProductReducer,
  setIsCpuWattageFocused_CreateProductReducer,
  setIsCpuWattageValid_CreateProductReducer,
  setIsDescriptionFocused_CreateProductReducer,
  setIsDescriptionValid_CreateProductReducer,
  setIsDimensionHeightFocused_CreateProductReducer,
  setIsDimensionHeightValid_CreateProductReducer,
  setIsDimensionLengthFocused_CreateProductReducer,
  setIsDimensionLengthValid_CreateProductReducer,
  setIsDimensionWidthFocused_CreateProductReducer,
  setIsDimensionWidthValid_CreateProductReducer,
  setIsDisplayAspectRatioFocused_CreateProductReducer,
  setIsDisplayAspectRatioValid_CreateProductReducer,
  setIsDisplayRefreshRateFocused_CreateProductReducer,
  setIsDisplayRefreshRateValid_CreateProductReducer,
  setIsDisplayResolutionHorizontalFocused_CreateProductReducer,
  setIsDisplayResolutionHorizontalValid_CreateProductReducer,
  setIsDisplayResolutionVerticalFocused_CreateProductReducer,
  setIsDisplayResolutionVerticalValid_CreateProductReducer,
  setIsDisplayResponseTimeFocused_CreateProductReducer,
  setIsDisplayResponseTimeValid_CreateProductReducer,
  setIsDisplaySizeFocused_CreateProductReducer,
  setIsDisplaySizeValid_CreateProductReducer,
  setIsGpuBoostClockFocused_CreateProductReducer,
  setIsGpuBoostClockValid_CreateProductReducer,
  setIsGpuChipsetFocused_CreateProductReducer,
  setIsGpuChipsetValid_CreateProductReducer,
  setIsGpuCoreClockFocused_CreateProductReducer,
  setIsGpuCoreClockValid_CreateProductReducer,
  setIsGpuMemoryCapacityFocused_CreateProductReducer,
  setIsGpuMemoryCapacityValid_CreateProductReducer,
  setIsGpuTdpFocused_CreateProductReducer,
  setIsGpuTdpValid_CreateProductReducer,
  setIsHeadphoneColorFocused_CreateProductReducer,
  setIsHeadphoneColorValid_CreateProductReducer,
  setIsHeadphoneDriverFocused_CreateProductReducer,
  setIsHeadphoneDriverValid_CreateProductReducer,
  setIsHeadphoneFrequencyResponseFocused_CreateProductReducer,
  setIsHeadphoneFrequencyResponseValid_CreateProductReducer,
  setIsHeadphoneImpedanceFocused_CreateProductReducer,
  setIsHeadphoneImpedanceValid_CreateProductReducer,
  setIsMicrophoneColorFocused_CreateProductReducer,
  setIsMicrophoneColorValid_CreateProductReducer,
  setIsMicrophoneFrequencyResponseFocused_CreateProductReducer,
  setIsMicrophoneFrequencyResponseValid_CreateProductReducer,
  setIsModelFocused_CreateProductReducer,
  setIsModelValid_CreateProductReducer,
  setIsMotherboardChipsetFocused_CreateProductReducer,
  setIsMotherboardChipsetValid_CreateProductReducer,
  setIsMotherboardM2SlotsFocused_CreateProductReducer,
  setIsMotherboardM2SlotsValid_CreateProductReducer,
  setIsMotherboardMemoryMaxCapacityFocused_CreateProductReducer,
  setIsMotherboardMemoryMaxCapacityValid_CreateProductReducer,
  setIsMotherboardMemorySlotsFocused_CreateProductReducer,
  setIsMotherboardMemorySlotsValid_CreateProductReducer,
  setIsMotherboardPcie3SlotsFocused_CreateProductReducer,
  setIsMotherboardPcie3SlotsValid_CreateProductReducer,
  setIsMotherboardPcie4SlotsFocused_CreateProductReducer,
  setIsMotherboardPcie4SlotsValid_CreateProductReducer,
  setIsMotherboardPcie5SlotsFocused_CreateProductReducer,
  setIsMotherboardPcie5SlotsValid_CreateProductReducer,
  setIsMotherboardSataPortsFocused_CreateProductReducer,
  setIsMotherboardSataPortsValid_CreateProductReducer,
  setIsMotherboardSocketFocused_CreateProductReducer,
  setIsMotherboardSocketValid_CreateProductReducer,
  setIsMouseButtonsFocused_CreateProductReducer,
  setIsMouseButtonsValid_CreateProductReducer,
  setIsMouseColorFocused_CreateProductReducer,
  setIsMouseColorValid_CreateProductReducer,
  setIsMouseDpiFocused_CreateProductReducer,
  setIsMouseDpiValid_CreateProductReducer,
  setIsPriceFocused_CreateProductReducer,
  setIsPriceValid_CreateProductReducer,
  setIsQuantityFocused_CreateProductReducer,
  setIsQuantityValid_CreateProductReducer,
  setIsRamColorFocused_CreateProductReducer,
  setIsRamColorValid_CreateProductReducer,
  setIsRamDataRateFocused_CreateProductReducer,
  setIsRamDataRateValid_CreateProductReducer,
  setIsRamModulesCapacityFocused_CreateProductReducer,
  setIsRamModulesCapacityValid_CreateProductReducer,
  setIsRamModulesQuantityFocused_CreateProductReducer,
  setIsRamModulesQuantityValid_CreateProductReducer,
  setIsRamTimingFocused_CreateProductReducer,
  setIsRamTimingValid_CreateProductReducer,
  setIsRamVoltageFocused_CreateProductReducer,
  setIsRamVoltageValid_CreateProductReducer,
  setIsSmartphoneBatteryCapacityFocused_CreateProductReducer,
  setIsSmartphoneBatteryCapacityValid_CreateProductReducer,
  setIsSmartphoneCameraFocused_CreateProductReducer,
  setIsSmartphoneCameraValid_CreateProductReducer,
  setIsSmartphoneChipsetFocused_CreateProductReducer,
  setIsSmartphoneChipsetValid_CreateProductReducer,
  setIsSmartphoneColorFocused_CreateProductReducer,
  setIsSmartphoneColorValid_CreateProductReducer,
  setIsSmartphoneDisplayFocused_CreateProductReducer,
  setIsSmartphoneDisplayValid_CreateProductReducer,
  setIsSmartphoneRamCapacityFocused_CreateProductReducer,
  setIsSmartphoneRamCapacityValid_CreateProductReducer,
  setIsSmartphoneResolutionHorizontalFocused_CreateProductReducer,
  setIsSmartphoneResolutionHorizontalValid_CreateProductReducer,
  setIsSmartphoneResolutionVerticalFocused_CreateProductReducer,
  setIsSmartphoneResolutionVerticalValid_CreateProductReducer,
  setIsSmartphoneStorageCapacityFocused_CreateProductReducer,
  setIsSmartphoneStorageCapacityValid_CreateProductReducer,
  setIsSpeakerColorFocused_CreateProductReducer,
  setIsSpeakerColorValid_CreateProductReducer,
  setIsSpeakerFrequencyResponseFocused_CreateProductReducer,
  setIsSpeakerFrequencyResponseValid_CreateProductReducer,
  setIsSpeakerTotalWattageFocused_CreateProductReducer,
  setIsSpeakerTotalWattageValid_CreateProductReducer,
  setIsStorageCacheCapacityFocused_CreateProductReducer,
  setIsStorageCacheCapacityValid_CreateProductReducer,
  setIsStorageCapacityFocused_CreateProductReducer,
  setIsStorageCapacityValid_CreateProductReducer,
  setIsSubmitting_CreateProductReducer,
  setIsSuccessful_CreateProductReducer,
  setIsTabletBatteryCapacityFocused_CreateProductReducer,
  setIsTabletBatteryCapacityValid_CreateProductReducer,
  setIsTabletCameraFocused_CreateProductReducer,
  setIsTabletCameraValid_CreateProductReducer,
  setIsTabletChipsetFocused_CreateProductReducer,
  setIsTabletChipsetValid_CreateProductReducer,
  setIsTabletColorFocused_CreateProductReducer,
  setIsTabletColorValid_CreateProductReducer,
  setIsTabletDisplayFocused_CreateProductReducer,
  setIsTabletDisplayValid_CreateProductReducer,
  setIsTabletRamCapacityFocused_CreateProductReducer,
  setIsTabletRamCapacityValid_CreateProductReducer,
  setIsTabletResolutionHorizontalFocused_CreateProductReducer,
  setIsTabletResolutionHorizontalValid_CreateProductReducer,
  setIsTabletResolutionVerticalFocused_CreateProductReducer,
  setIsTabletResolutionVerticalValid_CreateProductReducer,
  setIsTabletStorageCapacityFocused_CreateProductReducer,
  setIsTabletStorageCapacityValid_CreateProductReducer,
  setIsWeightFocused_CreateProductReducer,
  setIsWeightValid_CreateProductReducer,
  setKeyboardBacklight_CreateProductReducer,
  setKeyboardFieldsAdditional_CreateProductReducer,
  setKeyboardInterface_CreateProductReducer,
  setKeyboardLayout_CreateProductReducer,
  setKeyboardSwitch_CreateProductReducer,
  setMicrophoneColor_CreateProductReducer,
  setMicrophoneFieldsAdditional_CreateProductReducer,
  setMicrophoneFrequencyResponse_CreateProductReducer,
  setMicrophoneInterface_CreateProductReducer,
  setMicrophonePolarPattern_CreateProductReducer,
  setMicrophoneType_CreateProductReducer,
  setModel_CreateProductReducer,
  setMotherboardChipset_CreateProductReducer,
  setMotherboardFieldsAdditional_CreateProductReducer,
  setMotherboardFormFactor_CreateProductReducer,
  setMotherboardM2Slots_CreateProductReducer,
  setMotherboardMemoryMaxCapacity_CreateProductReducer,
  setMotherboardMemoryMaxCapacityUnit_CreateProductReducer,
  setMotherboardMemorySlots_CreateProductReducer,
  setMotherboardMemoryType_CreateProductReducer,
  setMotherboardPcie3Slots_CreateProductReducer,
  setMotherboardPcie4Slots_CreateProductReducer,
  setMotherboardPcie5Slots_CreateProductReducer,
  setMotherboardSataPorts_CreateProductReducer,
  setMotherboardSocket_CreateProductReducer,
  setMouseButtons_CreateProductReducer,
  setMouseColor_CreateProductReducer,
  setMouseDpi_CreateProductReducer,
  setMouseFieldsAdditional_CreateProductReducer,
  setMouseInterface_CreateProductReducer,
  setMouseSensor_CreateProductReducer,
  setPrice_CreateProductReducer,
  setProductCategory_CreateProductReducer,
  setQuantity_CreateProductReducer,
  setRamColor_CreateProductReducer,
  setRamDataRate_CreateProductReducer,
  setRamFieldsAdditional_CreateProductReducer,
  setRamModulesCapacity_CreateProductReducer,
  setRamModulesCapacityUnit_CreateProductReducer,
  setRamModulesQuantity_CreateProductReducer,
  setRamTiming_CreateProductReducer,
  setRamType_CreateProductReducer,
  setRamVoltage_CreateProductReducer,
  setSmartphoneBatteryCapacity_CreateProductReducer,
  setSmartphoneCamera_CreateProductReducer,
  setSmartphoneChipset_CreateProductReducer,
  setSmartphoneColor_CreateProductReducer,
  setSmartphoneDisplay_CreateProductReducer,
  setSmartphoneFieldsAdditional_CreateProductReducer,
  setSmartphoneOs_CreateProductReducer,
  setSmartphoneRamCapacity_CreateProductReducer,
  setSmartphoneRamCapacityUnit_CreateProductReducer,
  setSmartphoneResolutionHorizontal_CreateProductReducer,
  setSmartphoneResolutionVertical_CreateProductReducer,
  setSmartphoneStorageCapacity_CreateProductReducer,
  setSpeakerColor_CreateProductReducer,
  setSpeakerFieldsAdditional_CreateProductReducer,
  setSpeakerFrequencyResponse_CreateProductReducer,
  setSpeakerInterface_CreateProductReducer,
  setSpeakerTotalWattage_CreateProductReducer,
  setSpeakerType_CreateProductReducer,
  setStepsInError_CreateProductReducer,
  setStorageCacheCapacity_CreateProductReducer,
  setStorageCacheCapacityUnit_CreateProductReducer,
  setStorageCapacity_CreateProductReducer,
  setStorageCapacityUnit_CreateProductReducer,
  setStorageFieldsAdditional_CreateProductReducer,
  setStorageFormFactor_CreateProductReducer,
  setStorageInterface_CreateProductReducer,
  setStorageType_CreateProductReducer,
  setSubmitMessage_CreateProductReducer,
  setSuccessMessage_CreateProductReducer,
  setTabletBatteryCapacity_CreateProductReducer,
  setTabletCamera_CreateProductReducer,
  setTabletChipset_CreateProductReducer,
  setTabletColor_CreateProductReducer,
  setTabletDisplay_CreateProductReducer,
  setTabletFieldsAdditional_CreateProductReducer,
  setTabletOs_CreateProductReducer,
  setTabletRamCapacity_CreateProductReducer,
  setTabletRamCapacityUnit_CreateProductReducer,
  setTabletResolutionHorizontal_CreateProductReducer,
  setTabletResolutionVertical_CreateProductReducer,
  setTabletStorageCapacity_CreateProductReducer,
  setTriggerFormSubmit_CreateProductReducer,
  setWeight_CreateProductReducer,
  setWeightUnit_CreateProductReducer,
};
