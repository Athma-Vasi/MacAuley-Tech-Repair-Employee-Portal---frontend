import { Currency } from '../../types';
import { ProductCategory } from '../dashboard/types';
import { StepsInErrorPayload } from '../endorsements/create/types';
import {
  AdditionalFieldsAdd,
  AdditionalFieldsPayload,
  AdditionalFieldsRemove,
  AdditionalFieldsUpdate,
  AdditionalFieldsValidFocusedAdd,
  AdditionalFieldsValidFocusedPayload,
  AdditionalFieldsValidFocusedRemove,
  AdditionalFieldsValidFocusedUpdate,
  CreateProductDispatch,
} from './dispatches';
import { createProductAction } from './state';
import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
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
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  ProductAvailability,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
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
// - each reducer function is mapped to an action type
// - type ComponentReducer = (state: ComponentState, action: ComponentDispatch) => ComponentState
// - Map<ComponentAction[keyof ComponentAction], ComponentReducer>
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   REDUCER FUNCTIONS => STEPPER PAGE 1
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

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
    availability: action.payload as ProductAvailability,
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

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   REDUCER FUNCTIONS => STEPPER PAGE 2
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

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

// ╔═════════════════════════════════════════════════════════════════╗
//   ACCESSORY
// ╚═════════════════════════════════════════════════════════════════╝

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
 * accessoryFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the accessoryFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the accessoryFieldsAdditionalMap state
 */
function setAccessoryFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = accessoryFieldsAdditionalMapClone.size;
      accessoryFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        accessoryFieldsAdditionalMap: accessoryFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      accessoryFieldsAdditionalMapClone.delete(index);

      const filteredAccessoryFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(accessoryFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredAccessoryFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        accessoryFieldsAdditionalMap: filteredAccessoryFieldsAdditionalMap,
      };
    }
    case 'update': {
      const accessoryFieldsAdditionalMapClone = structuredClone(
        state.accessoryFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = accessoryFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? accessoryFieldsAdditionalMapClone.set(index, [data, prevValue])
        : accessoryFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        accessoryFieldsAdditionalMap: accessoryFieldsAdditionalMapClone,
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
 * areAccessoryFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areAccessoryFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over accessoryFieldsAdditionalMap state to generate the text elements
   - that access the areAccessoryFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areAccessoryFieldsAdditionalMapFocused state
 */
function setAreAccessoryFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areAccessoryFieldsAdditionalMapFocusedClone.size;
      areAccessoryFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areAccessoryFieldsAdditionalMapFocused:
          areAccessoryFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areAccessoryFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreAccessoryFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areAccessoryFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreAccessoryFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areAccessoryFieldsAdditionalMapFocused:
          filteredAreAccessoryFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areAccessoryFieldsAdditionalMapFocusedClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areAccessoryFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areAccessoryFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areAccessoryFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areAccessoryFieldsAdditionalMapFocused:
          areAccessoryFieldsAdditionalMapFocusedClone,
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
 * areAccessoryFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areAccessoryFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over accessoryFieldsAdditionalMap state to generate the text elements
   - that access the areAccessoryFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areAccessoryFieldsAdditionalMapValid state
 */
function setAreAccessoryFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areAccessoryFieldsAdditionalMapValidClone.size;
      areAccessoryFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areAccessoryFieldsAdditionalMapValid:
          areAccessoryFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areAccessoryFieldsAdditionalMapValidClone.delete(index);

      const filteredAreAccessoryFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areAccessoryFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreAccessoryFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areAccessoryFieldsAdditionalMapValid:
          filteredAreAccessoryFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areAccessoryFieldsAdditionalMapValidClone = structuredClone(
        state.areAccessoryFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areAccessoryFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areAccessoryFieldsAdditionalMapValidClone.set(index, [
            data,
            prevValue,
          ])
        : areAccessoryFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areAccessoryFieldsAdditionalMapValid:
          areAccessoryFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   CPU
// ╚═════════════════════════════════════════════════════════════════╝

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
 * cpuFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the cpuFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the cpuFieldsAdditionalMap state
 */
function setCpuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const cpuFieldsAdditionalMapClone = structuredClone(
        state.cpuFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = cpuFieldsAdditionalMapClone.size;
      cpuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        cpuFieldsAdditionalMap: cpuFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const cpuFieldsAdditionalMapClone = structuredClone(
        state.cpuFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      cpuFieldsAdditionalMapClone.delete(index);

      const filteredCpuFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(cpuFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredCpuFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        cpuFieldsAdditionalMap: filteredCpuFieldsAdditionalMap,
      };
    }
    case 'update': {
      const cpuFieldsAdditionalMapClone = structuredClone(
        state.cpuFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = cpuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? cpuFieldsAdditionalMapClone.set(index, [data, prevValue])
        : cpuFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        cpuFieldsAdditionalMap: cpuFieldsAdditionalMapClone,
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
 * areCpuFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areCpuFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over cpuFieldsAdditionalMap state to generate the text elements
   - that access the areCpuFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areCpuFieldsAdditionalMapFocused state
 */
function setAreCpuFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCpuFieldsAdditionalMapFocusedClone.size;
      areCpuFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areCpuFieldsAdditionalMapFocused: areCpuFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCpuFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreCpuFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areCpuFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCpuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCpuFieldsAdditionalMapFocused:
          filteredAreCpuFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areCpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCpuFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCpuFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCpuFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areCpuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCpuFieldsAdditionalMapFocused: areCpuFieldsAdditionalMapFocusedClone,
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
 * areCpuFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areCpuFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over cpuFieldsAdditionalMap state to generate the text elements
   - that access the areCpuFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areCpuFieldsAdditionalMapValid state
 */
function setAreCpuFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCpuFieldsAdditionalMapValidClone = structuredClone(
        state.areCpuFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCpuFieldsAdditionalMapValidClone.size;
      areCpuFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areCpuFieldsAdditionalMapValid: areCpuFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areCpuFieldsAdditionalMapValidClone = structuredClone(
        state.areCpuFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCpuFieldsAdditionalMapValidClone.delete(index);

      const filteredAreCpuFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areCpuFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCpuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCpuFieldsAdditionalMapValid: filteredAreCpuFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areCpuFieldsAdditionalMapValidClone = structuredClone(
        state.areCpuFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCpuFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCpuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areCpuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCpuFieldsAdditionalMapValid: areCpuFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   CASE
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => TYPE
// ╰─────────────────────────────────────────────────────────────────╯
function setCaseType_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseType: action.payload as CaseType,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => COLOR
// ╰─────────────────────────────────────────────────────────────────╯
function setCaseColor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseColor: action.payload as string,
  };
}

function setIsCaseColorFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCaseColorFocused: action.payload as boolean,
  };
}

function setIsCaseColorValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isCaseColorValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => SIDE PANEL
// ╰─────────────────────────────────────────────────────────────────╯
function setCaseSidePanel_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    caseSidePanel: action.payload as CaseSidePanel,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * caseFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the caseFieldsAdditionalMap state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the caseFieldsAdditionalMap state
 */

function setCaseFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const caseFieldsAdditionalMapClone = structuredClone(
        state.caseFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = caseFieldsAdditionalMapClone.size;
      caseFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        caseFieldsAdditionalMap: caseFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const caseFieldsAdditionalMapClone = structuredClone(
        state.caseFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      caseFieldsAdditionalMapClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredCaseFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();
      Array.from(caseFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredCaseFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        caseFieldsAdditionalMap: filteredCaseFieldsAdditionalMap,
      };
    }
    case 'update': {
      const caseFieldsAdditionalMapClone = structuredClone(
        state.caseFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = caseFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? caseFieldsAdditionalMapClone.set(index, [data, prevValue])
        : caseFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        caseFieldsAdditionalMap: caseFieldsAdditionalMapClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areCaseFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areCaseFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over caseFieldsAdditionalMap state to generate the text elements
 * - that access the areCaseFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areCaseFieldsAdditionalMapFocused state
 */
function setAreCaseFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCaseFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCaseFieldsAdditionalMapFocusedClone.size;
      areCaseFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areCaseFieldsAdditionalMapFocused:
          areCaseFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCaseFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCaseFieldsAdditionalMapFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreCaseFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areCaseFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCaseFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCaseFieldsAdditionalMapFocused:
          filteredAreCaseFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areCaseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areCaseFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCaseFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCaseFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areCaseFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCaseFieldsAdditionalMapFocused:
          areCaseFieldsAdditionalMapFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CASE => ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * areCaseFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areCaseFieldsAdditionalMapValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over caseFieldsAdditionalMap state to generate the text elements
 * - that access the areCaseFieldsAdditionalMapValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areCaseFieldsAdditionalMapValid state
 */
function setAreCaseFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areCaseFieldsAdditionalMapValidClone = structuredClone(
        state.areCaseFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areCaseFieldsAdditionalMapValidClone.size;
      areCaseFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areCaseFieldsAdditionalMapValid: areCaseFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areCaseFieldsAdditionalMapValidClone = structuredClone(
        state.areCaseFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areCaseFieldsAdditionalMapValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreCaseFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areCaseFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreCaseFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areCaseFieldsAdditionalMapValid:
          filteredAreCaseFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areCaseFieldsAdditionalMapValidClone = structuredClone(
        state.areCaseFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areCaseFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areCaseFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areCaseFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areCaseFieldsAdditionalMapValid: areCaseFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   DISPLAY
// ╚═════════════════════════════════════════════════════════════════╝

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
 * displayFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the displayFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the displayFieldsAdditionalMap state
 */
function setDisplayFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = displayFieldsAdditionalMapClone.size;
      displayFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        displayFieldsAdditionalMap: displayFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      displayFieldsAdditionalMapClone.delete(index);

      const filteredDisplayFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(displayFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredDisplayFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        displayFieldsAdditionalMap: filteredDisplayFieldsAdditionalMap,
      };
    }
    case 'update': {
      const displayFieldsAdditionalMapClone = structuredClone(
        state.displayFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = displayFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? displayFieldsAdditionalMapClone.set(index, [data, prevValue])
        : displayFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        displayFieldsAdditionalMap: displayFieldsAdditionalMapClone,
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
 * areDisplayFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areDisplayFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over displayFieldsAdditionalMap state to generate the text elements
   - that access the areDisplayFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areDisplayFieldsAdditionalMapFocused state
 */
function setAreDisplayFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areDisplayFieldsAdditionalMapFocusedClone.size;
      areDisplayFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areDisplayFieldsAdditionalMapFocused:
          areDisplayFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areDisplayFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreDisplayFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areDisplayFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreDisplayFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areDisplayFieldsAdditionalMapFocused:
          filteredAreDisplayFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areDisplayFieldsAdditionalMapFocusedClone = structuredClone(
        state.areDisplayFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areDisplayFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areDisplayFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areDisplayFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areDisplayFieldsAdditionalMapFocused:
          areDisplayFieldsAdditionalMapFocusedClone,
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
 * areDisplayFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areDisplayFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over displayFieldsAdditionalMap state to generate the text elements
   - that access the areDisplayFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areDisplayFieldsAdditionalMapValid state
 */
function setAreDisplayFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areDisplayFieldsAdditionalMapValidClone = structuredClone(
        state.areDisplayFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areDisplayFieldsAdditionalMapValidClone.size;
      areDisplayFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areDisplayFieldsAdditionalMapValid:
          areDisplayFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areDisplayFieldsAdditionalMapValidClone = structuredClone(
        state.areDisplayFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areDisplayFieldsAdditionalMapValidClone.delete(index);

      const filteredAreDisplayFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areDisplayFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreDisplayFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areDisplayFieldsAdditionalMapValid:
          filteredAreDisplayFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areDisplayFieldsAdditionalMapValidClone = structuredClone(
        state.areDisplayFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areDisplayFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areDisplayFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areDisplayFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areDisplayFieldsAdditionalMapValid:
          areDisplayFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   GPU
// ╚═════════════════════════════════════════════════════════════════╝

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
 * gpuFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the gpuFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the gpuFieldsAdditionalMap state
 */
function setGpuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const gpuFieldsAdditionalMapClone = structuredClone(
        state.gpuFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = gpuFieldsAdditionalMapClone.size;
      gpuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        gpuFieldsAdditionalMap: gpuFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const gpuFieldsAdditionalMapClone = structuredClone(
        state.gpuFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      gpuFieldsAdditionalMapClone.delete(index);

      const filteredGpuFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(gpuFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredGpuFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        gpuFieldsAdditionalMap: filteredGpuFieldsAdditionalMap,
      };
    }
    case 'update': {
      const gpuFieldsAdditionalMapClone = structuredClone(
        state.gpuFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = gpuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? gpuFieldsAdditionalMapClone.set(index, [data, prevValue])
        : gpuFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        gpuFieldsAdditionalMap: gpuFieldsAdditionalMapClone,
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
 * areGpuFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areGpuFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over gpuFieldsAdditionalMap state to generate the text elements
   - that access the areGpuFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areGpuFieldsAdditionalMapFocused state
 */
function setAreGpuFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areGpuFieldsAdditionalMapFocusedClone.size;
      areGpuFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areGpuFieldsAdditionalMapFocused: areGpuFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areGpuFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreGpuFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areGpuFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreGpuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areGpuFieldsAdditionalMapFocused:
          filteredAreGpuFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areGpuFieldsAdditionalMapFocusedClone = structuredClone(
        state.areGpuFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areGpuFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areGpuFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areGpuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areGpuFieldsAdditionalMapFocused: areGpuFieldsAdditionalMapFocusedClone,
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
 * areGpuFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areGpuFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over gpuFieldsAdditionalMap state to generate the text elements
   - that access the areGpuFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areGpuFieldsAdditionalMapValid state
 */
function setAreGpuFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areGpuFieldsAdditionalMapValidClone = structuredClone(
        state.areGpuFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areGpuFieldsAdditionalMapValidClone.size;
      areGpuFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areGpuFieldsAdditionalMapValid: areGpuFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areGpuFieldsAdditionalMapValidClone = structuredClone(
        state.areGpuFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areGpuFieldsAdditionalMapValidClone.delete(index);

      const filteredAreGpuFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areGpuFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreGpuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areGpuFieldsAdditionalMapValid: filteredAreGpuFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areGpuFieldsAdditionalMapValidClone = structuredClone(
        state.areGpuFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areGpuFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areGpuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areGpuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areGpuFieldsAdditionalMapValid: areGpuFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   HEADPHONE
// ╚═════════════════════════════════════════════════════════════════╝

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
 * headphoneFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the headphoneFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the headphoneFieldsAdditionalMap state
 */
function setHeadphoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = headphoneFieldsAdditionalMapClone.size;
      headphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        headphoneFieldsAdditionalMap: headphoneFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      headphoneFieldsAdditionalMapClone.delete(index);

      const filteredHeadphoneFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(headphoneFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredHeadphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        headphoneFieldsAdditionalMap: filteredHeadphoneFieldsAdditionalMap,
      };
    }
    case 'update': {
      const headphoneFieldsAdditionalMapClone = structuredClone(
        state.headphoneFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = headphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? headphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
        : headphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        headphoneFieldsAdditionalMap: headphoneFieldsAdditionalMapClone,
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
 * areHeadphoneFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areHeadphoneFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over headphoneFieldsAdditionalMap state to generate the text elements
   - that access the areHeadphoneFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areHeadphoneFieldsAdditionalMapFocused state
 */
function setAreHeadphoneFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areHeadphoneFieldsAdditionalMapFocusedClone.size;
      areHeadphoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapFocused:
          areHeadphoneFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areHeadphoneFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreHeadphoneFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areHeadphoneFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreHeadphoneFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapFocused:
          filteredAreHeadphoneFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areHeadphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areHeadphoneFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areHeadphoneFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areHeadphoneFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapFocused:
          areHeadphoneFieldsAdditionalMapFocusedClone,
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
 * areHeadphoneFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areHeadphoneFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over headphoneFieldsAdditionalMap state to generate the text elements
   - that access the areHeadphoneFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areHeadphoneFieldsAdditionalMapValid state
 */
function setAreHeadphoneFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areHeadphoneFieldsAdditionalMapValidClone.size;
      areHeadphoneFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapValid:
          areHeadphoneFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areHeadphoneFieldsAdditionalMapValidClone.delete(index);

      const filteredAreHeadphoneFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areHeadphoneFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreHeadphoneFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapValid:
          filteredAreHeadphoneFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areHeadphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areHeadphoneFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areHeadphoneFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areHeadphoneFieldsAdditionalMapValidClone.set(index, [
            data,
            prevValue,
          ])
        : areHeadphoneFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areHeadphoneFieldsAdditionalMapValid:
          areHeadphoneFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   KEYBOARD
// ╚═════════════════════════════════════════════════════════════════╝

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
 * keyboardFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the keyboardFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the keyboardFieldsAdditionalMap state
 */
function setKeyboardFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = keyboardFieldsAdditionalMapClone.size;
      keyboardFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        keyboardFieldsAdditionalMap: keyboardFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      keyboardFieldsAdditionalMapClone.delete(index);

      const filteredKeyboardFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(keyboardFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredKeyboardFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        keyboardFieldsAdditionalMap: filteredKeyboardFieldsAdditionalMap,
      };
    }
    case 'update': {
      const keyboardFieldsAdditionalMapClone = structuredClone(
        state.keyboardFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = keyboardFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? keyboardFieldsAdditionalMapClone.set(index, [data, prevValue])
        : keyboardFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        keyboardFieldsAdditionalMap: keyboardFieldsAdditionalMapClone,
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
 * areKeyboardFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areKeyboardFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over keyboardFieldsAdditionalMap state to generate the text elements
   - that access the areKeyboardFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areKeyboardFieldsAdditionalMapFocused state
 */
function setAreKeyboardFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areKeyboardFieldsAdditionalMapFocusedClone.size;
      areKeyboardFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areKeyboardFieldsAdditionalMapFocused:
          areKeyboardFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areKeyboardFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreKeyboardFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areKeyboardFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreKeyboardFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areKeyboardFieldsAdditionalMapFocused:
          filteredAreKeyboardFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areKeyboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areKeyboardFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areKeyboardFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areKeyboardFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areKeyboardFieldsAdditionalMapFocused:
          areKeyboardFieldsAdditionalMapFocusedClone,
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
 * areKeyboardFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areKeyboardFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over keyboardFieldsAdditionalMap state to generate the text elements
   - that access the areKeyboardFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areKeyboardFieldsAdditionalMapValid state
 */
function setAreKeyboardFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areKeyboardFieldsAdditionalMapValidClone.size;
      areKeyboardFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areKeyboardFieldsAdditionalMapValid:
          areKeyboardFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areKeyboardFieldsAdditionalMapValidClone.delete(index);

      const filteredAreKeyboardFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areKeyboardFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreKeyboardFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areKeyboardFieldsAdditionalMapValid:
          filteredAreKeyboardFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areKeyboardFieldsAdditionalMapValidClone = structuredClone(
        state.areKeyboardFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areKeyboardFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areKeyboardFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areKeyboardFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areKeyboardFieldsAdditionalMapValid:
          areKeyboardFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   MEMORY (RAM)
// ╚═════════════════════════════════════════════════════════════════╝

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
 * ramFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the ramFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the ramFieldsAdditionalMap state
 */
function setRamFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const ramFieldsAdditionalMapClone = structuredClone(
        state.ramFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = ramFieldsAdditionalMapClone.size;
      ramFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        ramFieldsAdditionalMap: ramFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const ramFieldsAdditionalMapClone = structuredClone(
        state.ramFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      ramFieldsAdditionalMapClone.delete(index);

      const filteredRamFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(ramFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredRamFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        ramFieldsAdditionalMap: filteredRamFieldsAdditionalMap,
      };
    }
    case 'update': {
      const ramFieldsAdditionalMapClone = structuredClone(
        state.ramFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = ramFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? ramFieldsAdditionalMapClone.set(index, [data, prevValue])
        : ramFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        ramFieldsAdditionalMap: ramFieldsAdditionalMapClone,
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
 * areRamFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areRamFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over ramFieldsAdditionalMap state to generate the text elements
   - that access the areRamFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areRamFieldsAdditionalMapFocused state
 */
function setAreRamFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const areRamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areRamFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areRamFieldsAdditionalMapFocusedClone.size;
      areRamFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areRamFieldsAdditionalMapFocused: areRamFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areRamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areRamFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areRamFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreRamFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areRamFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreRamFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areRamFieldsAdditionalMapFocused:
          filteredAreRamFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areRamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areRamFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areRamFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areRamFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areRamFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areRamFieldsAdditionalMapFocused: areRamFieldsAdditionalMapFocusedClone,
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
 * areRamFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areRamFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over ramFieldsAdditionalMap state to generate the text elements
   - that access the areRamFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areRamFieldsAdditionalMapValid state
 */
function setAreRamFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areRamFieldsAdditionalMapValidClone = structuredClone(
        state.areRamFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areRamFieldsAdditionalMapValidClone.size;
      areRamFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areRamFieldsAdditionalMapValid: areRamFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areRamFieldsAdditionalMapValidClone = structuredClone(
        state.areRamFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areRamFieldsAdditionalMapValidClone.delete(index);

      const filteredAreRamFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areRamFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreRamFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areRamFieldsAdditionalMapValid: filteredAreRamFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areRamFieldsAdditionalMapValidClone = structuredClone(
        state.areRamFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areRamFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areRamFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areRamFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areRamFieldsAdditionalMapValid: areRamFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   MICROPHONE
// ╚═════════════════════════════════════════════════════════════════╝

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
 * microphoneFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the microphoneFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the microphoneFieldsAdditionalMap state
 */
function setMicrophoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = microphoneFieldsAdditionalMapClone.size;
      microphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        microphoneFieldsAdditionalMap: microphoneFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      microphoneFieldsAdditionalMapClone.delete(index);

      const filteredMicrophoneFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(microphoneFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMicrophoneFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        microphoneFieldsAdditionalMap: filteredMicrophoneFieldsAdditionalMap,
      };
    }
    case 'update': {
      const microphoneFieldsAdditionalMapClone = structuredClone(
        state.microphoneFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = microphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? microphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
        : microphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        microphoneFieldsAdditionalMap: microphoneFieldsAdditionalMapClone,
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
 * areMicrophoneFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areMicrophoneFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over microphoneFieldsAdditionalMap state to generate the text elements
   - that access the areMicrophoneFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMicrophoneFieldsAdditionalMapFocused state
 */
function setAreMicrophoneFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMicrophoneFieldsAdditionalMapFocusedClone.size;
      areMicrophoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapFocused:
          areMicrophoneFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMicrophoneFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreMicrophoneFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMicrophoneFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMicrophoneFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapFocused:
          filteredAreMicrophoneFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areMicrophoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal =
        areMicrophoneFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMicrophoneFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areMicrophoneFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapFocused:
          areMicrophoneFieldsAdditionalMapFocusedClone,
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
 * areMicrophoneFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areMicrophoneFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over microphoneFieldsAdditionalMap state to generate the text elements
   - that access the areMicrophoneFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMicrophoneFieldsAdditionalMapValid state
 */
function setAreMicrophoneFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMicrophoneFieldsAdditionalMapValidClone.size;
      areMicrophoneFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapValid:
          areMicrophoneFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMicrophoneFieldsAdditionalMapValidClone.delete(index);

      const filteredAreMicrophoneFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMicrophoneFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMicrophoneFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapValid:
          filteredAreMicrophoneFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areMicrophoneFieldsAdditionalMapValidClone = structuredClone(
        state.areMicrophoneFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMicrophoneFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMicrophoneFieldsAdditionalMapValidClone.set(index, [
            data,
            prevValue,
          ])
        : areMicrophoneFieldsAdditionalMapValidClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areMicrophoneFieldsAdditionalMapValid:
          areMicrophoneFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   MOTHERBOARD
// ╚═════════════════════════════════════════════════════════════════╝

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
 * motherboardFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the motherboardFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *  - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the motherboardFieldsAdditionalMap state
 */
function setMotherboardFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = motherboardFieldsAdditionalMapClone.size;
      motherboardFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        motherboardFieldsAdditionalMap: motherboardFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      motherboardFieldsAdditionalMapClone.delete(index);

      const filteredMotherboardFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(motherboardFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMotherboardFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        motherboardFieldsAdditionalMap: filteredMotherboardFieldsAdditionalMap,
      };
    }
    case 'update': {
      const motherboardFieldsAdditionalMapClone = structuredClone(
        state.motherboardFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = motherboardFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? motherboardFieldsAdditionalMapClone.set(index, [data, prevValue])
        : motherboardFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        motherboardFieldsAdditionalMap: motherboardFieldsAdditionalMapClone,
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
 * areMotherboardFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areMotherboardFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over motherboardFieldsAdditionalMap state to generate the text elements
   - that access the areMotherboardFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMotherboardFieldsAdditionalMapFocused state
 */
function setAreMotherboardFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMotherboardFieldsAdditionalMapFocusedClone.size;
      areMotherboardFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMotherboardFieldsAdditionalMapFocused:
          areMotherboardFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMotherboardFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreMotherboardFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMotherboardFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMotherboardFieldsAdditionalMapFocused.set(
            arrayIdx,
            keyVal
          );
        }
      );

      return {
        ...state,
        areMotherboardFieldsAdditionalMapFocused:
          filteredAreMotherboardFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areMotherboardFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal =
        areMotherboardFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMotherboardFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areMotherboardFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areMotherboardFieldsAdditionalMapFocused:
          areMotherboardFieldsAdditionalMapFocusedClone,
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
 * areMotherboardFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areMotherboardFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over motherboardFieldsAdditionalMap state to generate the text elements
   - that access the areMotherboardFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMotherboardFieldsAdditionalMapValid state
 */
function setAreMotherboardFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMotherboardFieldsAdditionalMapValidClone.size;
      areMotherboardFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areMotherboardFieldsAdditionalMapValid:
          areMotherboardFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMotherboardFieldsAdditionalMapValidClone.delete(index);

      const filteredAreMotherboardFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMotherboardFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMotherboardFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMotherboardFieldsAdditionalMapValid:
          filteredAreMotherboardFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areMotherboardFieldsAdditionalMapValidClone = structuredClone(
        state.areMotherboardFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMotherboardFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMotherboardFieldsAdditionalMapValidClone.set(index, [
            data,
            prevValue,
          ])
        : areMotherboardFieldsAdditionalMapValidClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areMotherboardFieldsAdditionalMapValid:
          areMotherboardFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   MOUSE
// ╚═════════════════════════════════════════════════════════════════╝

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
 * mouseFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the mouseFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *   - with the callback fn index to use as the key for the new map
 *  - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the mouseFieldsAdditionalMap state
 */
function setMouseFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = mouseFieldsAdditionalMapClone.size;
      mouseFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        mouseFieldsAdditionalMap: mouseFieldsAdditionalMapClone,
      };
    }

    case 'remove': {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      mouseFieldsAdditionalMapClone.delete(index);

      const filteredMouseFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(mouseFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredMouseFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        mouseFieldsAdditionalMap: filteredMouseFieldsAdditionalMap,
      };
    }
    case 'update': {
      const mouseFieldsAdditionalMapClone = structuredClone(
        state.mouseFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = mouseFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? mouseFieldsAdditionalMapClone.set(index, [data, prevValue])
        : mouseFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        mouseFieldsAdditionalMap: mouseFieldsAdditionalMapClone,
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
 * areMouseFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areMouseFieldsAdditionalMapFocused state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over mouseFieldsAdditionalMap state to generate the text elements
   - that access the areMouseFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
   - and must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMouseFieldsAdditionalMapFocused state
 */
function setAreMouseFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMouseFieldsAdditionalMapFocusedClone.size;
      areMouseFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areMouseFieldsAdditionalMapFocused:
          areMouseFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMouseFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreMouseFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMouseFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMouseFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMouseFieldsAdditionalMapFocused:
          filteredAreMouseFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areMouseFieldsAdditionalMapFocusedClone = structuredClone(
        state.areMouseFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMouseFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMouseFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areMouseFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMouseFieldsAdditionalMapFocused:
          areMouseFieldsAdditionalMapFocusedClone,
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
 * areMouseFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areMouseFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over mouseFieldsAdditionalMap state to generate the text elements
   - that access the areMouseFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areMouseFieldsAdditionalMapValid state
 */
function setAreMouseFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areMouseFieldsAdditionalMapValidClone = structuredClone(
        state.areMouseFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areMouseFieldsAdditionalMapValidClone.size;
      areMouseFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areMouseFieldsAdditionalMapValid: areMouseFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areMouseFieldsAdditionalMapValidClone = structuredClone(
        state.areMouseFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areMouseFieldsAdditionalMapValidClone.delete(index);

      const filteredAreMouseFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areMouseFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreMouseFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areMouseFieldsAdditionalMapValid:
          filteredAreMouseFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areMouseFieldsAdditionalMapValidClone = structuredClone(
        state.areMouseFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areMouseFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areMouseFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areMouseFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areMouseFieldsAdditionalMapValid: areMouseFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   PSU
// ╚═════════════════════════════════════════════════════════════════╝

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU WATTAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setPsuWattage_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuWattage: action.payload as string,
  };
}

function setIsPsuWattageFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isPsuWattageFocused: action.payload as boolean,
  };
}

function setIsPsuWattageValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    isPsuWattageValid: action.payload as boolean,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU EFFICIENCY
// ╰─────────────────────────────────────────────────────────────────╯
function setPsuEfficiency_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuEfficiency: action.payload as PsuEfficiency,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU FORM FACTOR
// ╰─────────────────────────────────────────────────────────────────╯
function setPsuFormFactor_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuFormFactor: action.payload as PsuFormFactor,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU MODULARITY
// ╰─────────────────────────────────────────────────────────────────╯
function setPsuModularity_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  return {
    ...state,
    psuModularity: action.payload as PsuModularity,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU ADDITIONAL FIELDS
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * psuFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the psuFieldsAdditionalMap state
 * @description remove: clones the state, deletes the key-value pair, and iterates over the map
 *  - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the psuFieldsAdditionalMap state
 */

function setPsuFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const psuFieldsAdditionalMapClone = structuredClone(
        state.psuFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = psuFieldsAdditionalMapClone.size;
      psuFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        psuFieldsAdditionalMap: psuFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const psuFieldsAdditionalMapClone = structuredClone(
        state.psuFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      psuFieldsAdditionalMapClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredPsuFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();
      Array.from(psuFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredPsuFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        psuFieldsAdditionalMap: filteredPsuFieldsAdditionalMap,
      };
    }
    case 'update': {
      const psuFieldsAdditionalMapClone = structuredClone(
        state.psuFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = psuFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? psuFieldsAdditionalMapClone.set(index, [data, prevValue])
        : psuFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        psuFieldsAdditionalMap: psuFieldsAdditionalMapClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU ADDITIONAL FIELDS => FOCUSED
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * arePsuFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the arePsuFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over psuFieldsAdditionalMap state to generate the text elements
 * - that access the arePsuFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the arePsuFieldsAdditionalMapFocused state
 */
function setArePsuFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
        state.arePsuFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = arePsuFieldsAdditionalMapFocusedClone.size;
      arePsuFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        arePsuFieldsAdditionalMapFocused: arePsuFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
        state.arePsuFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      arePsuFieldsAdditionalMapFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredArePsuFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(arePsuFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredArePsuFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        arePsuFieldsAdditionalMapFocused:
          filteredArePsuFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const arePsuFieldsAdditionalMapFocusedClone = structuredClone(
        state.arePsuFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = arePsuFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? arePsuFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : arePsuFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        arePsuFieldsAdditionalMapFocused: arePsuFieldsAdditionalMapFocusedClone,
      };
    }
    default:
      return state;
  }
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PSU ADDITIONAL FIELDS => VALID
// ╰─────────────────────────────────────────────────────────────────╯

/**
 * This reducer function contains three operations that are used to update the
 * arePsuFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the arePsuFieldsAdditionalMapValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over psuFieldsAdditionalMap state to generate the text elements
 * - that access the arePsuFieldsAdditionalMapValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the arePsuFieldsAdditionalMapValid state
 */
function setArePsuFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const arePsuFieldsAdditionalMapValidClone = structuredClone(
        state.arePsuFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = arePsuFieldsAdditionalMapValidClone.size;
      arePsuFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        arePsuFieldsAdditionalMapValid: arePsuFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const arePsuFieldsAdditionalMapValidClone = structuredClone(
        state.arePsuFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      arePsuFieldsAdditionalMapValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredArePsuFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(arePsuFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredArePsuFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        arePsuFieldsAdditionalMapValid: filteredArePsuFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const arePsuFieldsAdditionalMapValidClone = structuredClone(
        state.arePsuFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = arePsuFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? arePsuFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : arePsuFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        arePsuFieldsAdditionalMapValid: arePsuFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   SMARTPHONE
// ╚═════════════════════════════════════════════════════════════════╝

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
 * smartphoneFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the smartphoneFieldsAdditionalMap state
 * @description remove:
    - clones the state, deletes the key-value pair, and iterates over the map
    - with the callback fn index to use as the key for the new map
    - this is done because the indices are used as the keys that access the error/valid elements array
    - and must be consecutive as removal of a key-value pair will leave a gap in the indices    
  * @description update: updates either the key or value from the smartphoneFieldsAdditionalMap state
 */
function setSmartphoneFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = smartphoneFieldsAdditionalMapClone.size;
      smartphoneFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        smartphoneFieldsAdditionalMap: smartphoneFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      smartphoneFieldsAdditionalMapClone.delete(index);

      const filteredSmartphoneFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(smartphoneFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredSmartphoneFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        smartphoneFieldsAdditionalMap: filteredSmartphoneFieldsAdditionalMap,
      };
    }
    case 'update': {
      const smartphoneFieldsAdditionalMapClone = structuredClone(
        state.smartphoneFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = smartphoneFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? smartphoneFieldsAdditionalMapClone.set(index, [data, prevValue])
        : smartphoneFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        smartphoneFieldsAdditionalMap: smartphoneFieldsAdditionalMapClone,
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
 * areSmartphoneFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areSmartphoneFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over smartphoneFieldsAdditionalMap state to generate the text elements
 * - that access the areSmartphoneFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areSmartphoneFieldsAdditionalMapFocused state
 */
function setAreSmartphoneFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSmartphoneFieldsAdditionalMapFocusedClone.size;
      areSmartphoneFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapFocused:
          areSmartphoneFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSmartphoneFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreSmartphoneFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSmartphoneFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSmartphoneFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapFocused:
          filteredAreSmartphoneFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areSmartphoneFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal =
        areSmartphoneFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSmartphoneFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areSmartphoneFieldsAdditionalMapFocusedClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapFocused:
          areSmartphoneFieldsAdditionalMapFocusedClone,
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
 * areSmartphoneFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areSmartphoneFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over smartphoneFieldsAdditionalMap state to generate the text elements
   - that access the areSmartphoneFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areSmartphoneFieldsAdditionalMapValid state
 */
function setAreSmartphoneFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSmartphoneFieldsAdditionalMapValidClone.size;
      areSmartphoneFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapValid:
          areSmartphoneFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSmartphoneFieldsAdditionalMapValidClone.delete(index);

      const filteredAreSmartphoneFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSmartphoneFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSmartphoneFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapValid:
          filteredAreSmartphoneFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areSmartphoneFieldsAdditionalMapValidClone = structuredClone(
        state.areSmartphoneFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSmartphoneFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSmartphoneFieldsAdditionalMapValidClone.set(index, [
            data,
            prevValue,
          ])
        : areSmartphoneFieldsAdditionalMapValidClone.set(index, [
            prevKey,
            data,
          ]);

      return {
        ...state,
        areSmartphoneFieldsAdditionalMapValid:
          areSmartphoneFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   SPEAKER
// ╚═════════════════════════════════════════════════════════════════╝

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
 * speakerFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the speakerFieldsAdditionalMap state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the speakerFieldsAdditionalMap state
 */
function setSpeakerFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = speakerFieldsAdditionalMapClone.size;
      speakerFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        speakerFieldsAdditionalMap: speakerFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      speakerFieldsAdditionalMapClone.delete(index);

      const filteredSpeakerFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(speakerFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredSpeakerFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        speakerFieldsAdditionalMap: filteredSpeakerFieldsAdditionalMap,
      };
    }
    case 'update': {
      const speakerFieldsAdditionalMapClone = structuredClone(
        state.speakerFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = speakerFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? speakerFieldsAdditionalMapClone.set(index, [data, prevValue])
        : speakerFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        speakerFieldsAdditionalMap: speakerFieldsAdditionalMapClone,
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
 * areSpeakerFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areSpeakerFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over speakerFieldsAdditionalMap state to generate the text elements
 * - that access the areSpeakerFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areSpeakerFieldsAdditionalMapFocused state
 */
function setAreSpeakerFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSpeakerFieldsAdditionalMapFocusedClone.size;
      areSpeakerFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areSpeakerFieldsAdditionalMapFocused:
          areSpeakerFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSpeakerFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreSpeakerFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSpeakerFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSpeakerFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSpeakerFieldsAdditionalMapFocused:
          filteredAreSpeakerFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areSpeakerFieldsAdditionalMapFocusedClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSpeakerFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSpeakerFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areSpeakerFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSpeakerFieldsAdditionalMapFocused:
          areSpeakerFieldsAdditionalMapFocusedClone,
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
 * areSpeakerFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areSpeakerFieldsAdditionalMapValid state
 * @description remove:
   - clones the state, deletes the key-value pair, and iterates over the map
   - with the callback fn index to use as the key for the new map
   - this is done because the indices are used as the keys by the mapped over speakerFieldsAdditionalMap state to generate the text elements
   - that access the areSpeakerFieldsAdditionalMapValid state Map based on said element's error state
   - to display the text contained in the screenreader accessible error/valid text elements array
   - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
  * @description update: updates either the key or value from the areSpeakerFieldsAdditionalMapValid state
 */
function setAreSpeakerFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areSpeakerFieldsAdditionalMapValidClone.size;
      areSpeakerFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areSpeakerFieldsAdditionalMapValid:
          areSpeakerFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areSpeakerFieldsAdditionalMapValidClone.delete(index);

      const filteredAreSpeakerFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areSpeakerFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreSpeakerFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areSpeakerFieldsAdditionalMapValid:
          filteredAreSpeakerFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areSpeakerFieldsAdditionalMapValidClone = structuredClone(
        state.areSpeakerFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areSpeakerFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areSpeakerFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areSpeakerFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areSpeakerFieldsAdditionalMapValid:
          areSpeakerFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   STORAGE
// ╚═════════════════════════════════════════════════════════════════╝

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
 * storageFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the storageFieldsAdditionalMap state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the storageFieldsAdditionalMap state
 */
function setStorageFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = storageFieldsAdditionalMapClone.size;
      storageFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        storageFieldsAdditionalMap: storageFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      storageFieldsAdditionalMapClone.delete(index);

      const filteredStorageFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();

      Array.from(storageFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];
          filteredStorageFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        storageFieldsAdditionalMap: filteredStorageFieldsAdditionalMap,
      };
    }
    case 'update': {
      const storageFieldsAdditionalMapClone = structuredClone(
        state.storageFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = storageFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? storageFieldsAdditionalMapClone.set(index, [data, prevValue])
        : storageFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        storageFieldsAdditionalMap: storageFieldsAdditionalMapClone,
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
 * areStorageFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areStorageFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over storageFieldsAdditionalMap state to generate the text elements
 * - that access the areStorageFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areStorageFieldsAdditionalMapFocused state
 */
function setAreStorageFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areStorageFieldsAdditionalMapFocusedClone.size;
      areStorageFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areStorageFieldsAdditionalMapFocused:
          areStorageFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areStorageFieldsAdditionalMapFocusedClone.delete(index);

      const filteredAreStorageFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();

      Array.from(areStorageFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreStorageFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areStorageFieldsAdditionalMapFocused:
          filteredAreStorageFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areStorageFieldsAdditionalMapFocusedClone = structuredClone(
        state.areStorageFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areStorageFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areStorageFieldsAdditionalMapFocusedClone.set(index, [
            data,
            prevValue,
          ])
        : areStorageFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areStorageFieldsAdditionalMapFocused:
          areStorageFieldsAdditionalMapFocusedClone,
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
 * areStorageFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areStorageFieldsAdditionalMapValid state
 * @description remove:
 *  - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over storageFieldsAdditionalMap state to generate the text elements
 * - that access the areStorageFieldsAdditionalMapValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areStorageFieldsAdditionalMapValid state
 */
function setAreStorageFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areStorageFieldsAdditionalMapValidClone = structuredClone(
        state.areStorageFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areStorageFieldsAdditionalMapValidClone.size;
      areStorageFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areStorageFieldsAdditionalMapValid:
          areStorageFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areStorageFieldsAdditionalMapValidClone = structuredClone(
        state.areStorageFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areStorageFieldsAdditionalMapValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreStorageFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areStorageFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreStorageFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areStorageFieldsAdditionalMapValid:
          filteredAreStorageFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areStorageFieldsAdditionalMapValidClone = structuredClone(
        state.areStorageFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areStorageFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areStorageFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areStorageFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areStorageFieldsAdditionalMapValid:
          areStorageFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   TABLET
// ╚═════════════════════════════════════════════════════════════════╝
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
 * tabletFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the tabletFieldsAdditionalMap state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the tabletFieldsAdditionalMap state
 */
function setTabletFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = tabletFieldsAdditionalMapClone.size;
      tabletFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        tabletFieldsAdditionalMap: tabletFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      tabletFieldsAdditionalMapClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredTabletFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();
      Array.from(tabletFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredTabletFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        tabletFieldsAdditionalMap: filteredTabletFieldsAdditionalMap,
      };
    }
    case 'update': {
      const tabletFieldsAdditionalMapClone = structuredClone(
        state.tabletFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = tabletFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? tabletFieldsAdditionalMapClone.set(index, [data, prevValue])
        : tabletFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        tabletFieldsAdditionalMap: tabletFieldsAdditionalMapClone,
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
 * areTabletFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areTabletFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over tabletFieldsAdditionalMap state to generate the text elements
 * - that access the areTabletFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areTabletFieldsAdditionalMapFocused state
 */
function setAreTabletFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areTabletFieldsAdditionalMapFocusedClone.size;
      areTabletFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areTabletFieldsAdditionalMapFocused:
          areTabletFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areTabletFieldsAdditionalMapFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreTabletFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areTabletFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreTabletFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areTabletFieldsAdditionalMapFocused:
          filteredAreTabletFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areTabletFieldsAdditionalMapFocusedClone = structuredClone(
        state.areTabletFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areTabletFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areTabletFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areTabletFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areTabletFieldsAdditionalMapFocused:
          areTabletFieldsAdditionalMapFocusedClone,
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
 * areTabletFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areTabletFieldsAdditionalMapValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over tabletFieldsAdditionalMap state to generate the text elements
 * - that access the areTabletFieldsAdditionalMapValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areTabletFieldsAdditionalMapValid state
 */
function setAreTabletFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areTabletFieldsAdditionalMapValidClone = structuredClone(
        state.areTabletFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areTabletFieldsAdditionalMapValidClone.size;
      areTabletFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areTabletFieldsAdditionalMapValid:
          areTabletFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areTabletFieldsAdditionalMapValidClone = structuredClone(
        state.areTabletFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areTabletFieldsAdditionalMapValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreTabletFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areTabletFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreTabletFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areTabletFieldsAdditionalMapValid:
          filteredAreTabletFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areTabletFieldsAdditionalMapValidClone = structuredClone(
        state.areTabletFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areTabletFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areTabletFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areTabletFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areTabletFieldsAdditionalMapValid:
          areTabletFieldsAdditionalMapValidClone,
      };
    }
    default:
      return state;
  }
}

// ╔═════════════════════════════════════════════════════════════════╗
//   WEBCAM
// ╚═════════════════════════════════════════════════════════════════╝

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
 * webcamFieldsAdditionalMap state.
 * @description add: adds a new key-value pair to the webcamFieldsAdditionalMap state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys that access the error/valid elements array
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the webcamFieldsAdditionalMap state
 */
function setWebcamFieldsAdditionalMap_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsPayload;

  switch (operation) {
    case 'add': {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { data } = action.payload as AdditionalFieldsAdd;
      const prevSize = webcamFieldsAdditionalMapClone.size;
      webcamFieldsAdditionalMapClone.set(prevSize, data);

      return {
        ...state,
        webcamFieldsAdditionalMap: webcamFieldsAdditionalMapClone,
      };
    }
    case 'remove': {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { index } = action.payload as AdditionalFieldsRemove;
      webcamFieldsAdditionalMapClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredWebcamFieldsAdditionalMap = new Map<
        number,
        [string, string]
      >();
      Array.from(webcamFieldsAdditionalMapClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [number, [string, string]];

          filteredWebcamFieldsAdditionalMap.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        webcamFieldsAdditionalMap: filteredWebcamFieldsAdditionalMap,
      };
    }
    case 'update': {
      const webcamFieldsAdditionalMapClone = structuredClone(
        state.webcamFieldsAdditionalMap
      );

      const { data, index, kind } = action.payload as AdditionalFieldsUpdate;
      const prevKeyVal = webcamFieldsAdditionalMapClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? webcamFieldsAdditionalMapClone.set(index, [data, prevValue])
        : webcamFieldsAdditionalMapClone.set(index, [prevKey, data]);

      return {
        ...state,
        webcamFieldsAdditionalMap: webcamFieldsAdditionalMapClone,
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
 * areWebcamFieldsAdditionalMapFocused state.
 * @description add: adds a new key-value pair to the areWebcamFieldsAdditionalMapFocused state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over webcamFieldsAdditionalMap state to generate the text elements
 * - that access the areWebcamFieldsAdditionalMapFocused state Map to determine if the appropriate text element should be focused/blurred
 * - and must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areWebcamFieldsAdditionalMapFocused state
 */
function setAreWebcamFieldsAdditionalMapFocused_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalMapFocused
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areWebcamFieldsAdditionalMapFocusedClone.size;
      areWebcamFieldsAdditionalMapFocusedClone.set(prevSize, data);

      return {
        ...state,
        areWebcamFieldsAdditionalMapFocused:
          areWebcamFieldsAdditionalMapFocusedClone,
      };
    }
    case 'remove': {
      const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalMapFocused
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areWebcamFieldsAdditionalMapFocusedClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreWebcamFieldsAdditionalMapFocused = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areWebcamFieldsAdditionalMapFocusedClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreWebcamFieldsAdditionalMapFocused.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areWebcamFieldsAdditionalMapFocused:
          filteredAreWebcamFieldsAdditionalMapFocused,
      };
    }
    case 'update': {
      const areWebcamFieldsAdditionalMapFocusedClone = structuredClone(
        state.areWebcamFieldsAdditionalMapFocused
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areWebcamFieldsAdditionalMapFocusedClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areWebcamFieldsAdditionalMapFocusedClone.set(index, [data, prevValue])
        : areWebcamFieldsAdditionalMapFocusedClone.set(index, [prevKey, data]);

      return {
        ...state,
        areWebcamFieldsAdditionalMapFocused:
          areWebcamFieldsAdditionalMapFocusedClone,
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
 * areWebcamFieldsAdditionalMapValid state.
 * @description add: adds a new key-value pair to the areWebcamFieldsAdditionalMapValid state
 * @description remove:
 * - clones the state, deletes the key-value pair, and iterates over the map
 * - with the callback fn index to use as the key for the new map
 * - this is done because the indices are used as the keys by the mapped over webcamFieldsAdditionalMap state to generate the text elements
 * - that access the areWebcamFieldsAdditionalMapValid state Map based on said element's error state
 * - to display the text contained in the screenreader accessible error/valid text elements array
 * - map keys must be consecutive as removal of a key-value pair will leave a gap in the indices
 * @description update: updates either the key or value from the areWebcamFieldsAdditionalMapValid state
 */
function setAreWebcamFieldsAdditionalMapValid_CreateProductReducer(
  state: CreateProductState,
  action: CreateProductDispatch
): CreateProductState {
  const { operation } = action.payload as AdditionalFieldsValidFocusedPayload;

  switch (operation) {
    case 'add': {
      const areWebcamFieldsAdditionalMapValidClone = structuredClone(
        state.areWebcamFieldsAdditionalMapValid
      );

      const { data } = action.payload as AdditionalFieldsValidFocusedAdd;
      const prevSize = areWebcamFieldsAdditionalMapValidClone.size;
      areWebcamFieldsAdditionalMapValidClone.set(prevSize, data);

      return {
        ...state,
        areWebcamFieldsAdditionalMapValid:
          areWebcamFieldsAdditionalMapValidClone,
      };
    }
    case 'remove': {
      const areWebcamFieldsAdditionalMapValidClone = structuredClone(
        state.areWebcamFieldsAdditionalMapValid
      );

      const { index } = action.payload as AdditionalFieldsValidFocusedRemove;
      areWebcamFieldsAdditionalMapValidClone.delete(index);

      // resets the indices because the indices are used as keys
      const filteredAreWebcamFieldsAdditionalMapValid = new Map<
        number,
        [boolean, boolean]
      >();
      Array.from(areWebcamFieldsAdditionalMapValidClone).forEach(
        (mapIdxKeyVal, arrayIdx) => {
          const [_mapIdx, keyVal] = mapIdxKeyVal as [
            number,
            [boolean, boolean]
          ];

          filteredAreWebcamFieldsAdditionalMapValid.set(arrayIdx, keyVal);
        }
      );

      return {
        ...state,
        areWebcamFieldsAdditionalMapValid:
          filteredAreWebcamFieldsAdditionalMapValid,
      };
    }
    case 'update': {
      const areWebcamFieldsAdditionalMapValidClone = structuredClone(
        state.areWebcamFieldsAdditionalMapValid
      );

      const { data, index, kind } =
        action.payload as AdditionalFieldsValidFocusedUpdate;
      const prevKeyVal = areWebcamFieldsAdditionalMapValidClone.get(index);

      if (!prevKeyVal) {
        return state;
      }

      const [prevKey, prevValue] = prevKeyVal;
      kind === 'key'
        ? areWebcamFieldsAdditionalMapValidClone.set(index, [data, prevValue])
        : areWebcamFieldsAdditionalMapValidClone.set(index, [prevKey, data]);

      return {
        ...state,
        areWebcamFieldsAdditionalMapValid:
          areWebcamFieldsAdditionalMapValidClone,
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

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCERS MAP
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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

  // brand
  [createProductAction.setBrand, setBrand_CreateProductReducer],
  [createProductAction.setIsBrandValid, setIsBrandValid_CreateProductReducer],
  [
    createProductAction.setIsBrandFocused,
    setIsBrandFocused_CreateProductReducer,
  ],
  // model
  [createProductAction.setModel, setModel_CreateProductReducer],
  [createProductAction.setIsModelValid, setIsModelValid_CreateProductReducer],
  [
    createProductAction.setIsModelFocused,
    setIsModelFocused_CreateProductReducer,
  ],
  // description
  [createProductAction.setDescription, setDescription_CreateProductReducer],
  [
    createProductAction.setIsDescriptionValid,
    setIsDescriptionValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsDescriptionFocused,
    setIsDescriptionFocused_CreateProductReducer,
  ],
  // price
  [createProductAction.setPrice, setPrice_CreateProductReducer],
  [createProductAction.setIsPriceValid, setIsPriceValid_CreateProductReducer],
  [
    createProductAction.setIsPriceFocused,
    setIsPriceFocused_CreateProductReducer,
  ],
  // currency
  [createProductAction.setCurrency, setCurrency_CreateProductReducer],

  // availability
  [createProductAction.setAvailability, setAvailability_CreateProductReducer],

  // quantity
  [createProductAction.setQuantity, setQuantity_CreateProductReducer],
  [
    createProductAction.setIsQuantityValid,
    setIsQuantityValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsQuantityFocused,
    setIsQuantityFocused_CreateProductReducer,
  ],
  // weight
  [createProductAction.setWeight, setWeight_CreateProductReducer],
  [createProductAction.setIsWeightValid, setIsWeightValid_CreateProductReducer],
  [
    createProductAction.setIsWeightFocused,
    setIsWeightFocused_CreateProductReducer,
  ],
  // weight unit
  [createProductAction.setWeightUnit, setWeightUnit_CreateProductReducer],
  // dimension height
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
  // dimension height unit
  [
    createProductAction.setDimensionHeightUnit,
    setDimensionHeightUnit_CreateProductReducer,
  ],
  // dimension width
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
  // dimension width unit
  [
    createProductAction.setDimensionWidthUnit,
    setDimensionWidthUnit_CreateProductReducer,
  ],
  // dimension length
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
  // dimension length unit
  [
    createProductAction.setDimensionLengthUnit,
    setDimensionLengthUnit_CreateProductReducer,
  ],
  // additional comments
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
    createProductAction.setAccessoryFieldsAdditionalMap,
    setAccessoryFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
    setAreAccessoryFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreAccessoryFieldsAdditionalMapValid,
    setAreAccessoryFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setCpuFieldsAdditionalMap,
    setCpuFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreCpuFieldsAdditionalMapFocused,
    setAreCpuFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreCpuFieldsAdditionalMapValid,
    setAreCpuFieldsAdditionalMapValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE
  // ╰─────────────────────────────────────────────────────────────────╯

  // case -> type
  [createProductAction.setCaseType, setCaseType_CreateProductReducer],
  // case -> color
  [createProductAction.setCaseColor, setCaseColor_CreateProductReducer],
  [
    createProductAction.setIsCaseColorValid,
    setIsCaseColorValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsCaseColorFocused,
    setIsCaseColorFocused_CreateProductReducer,
  ],
  // case -> side panel
  [createProductAction.setCaseSidePanel, setCaseSidePanel_CreateProductReducer],
  // case -> additional fields
  [
    createProductAction.setCaseFieldsAdditionalMap,
    setCaseFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreCaseFieldsAdditionalMapFocused,
    setAreCaseFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreCaseFieldsAdditionalMapValid,
    setAreCaseFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setDisplayFieldsAdditionalMap,
    setDisplayFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreDisplayFieldsAdditionalMapFocused,
    setAreDisplayFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreDisplayFieldsAdditionalMapValid,
    setAreDisplayFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setGpuFieldsAdditionalMap,
    setGpuFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreGpuFieldsAdditionalMapFocused,
    setAreGpuFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreGpuFieldsAdditionalMapValid,
    setAreGpuFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setHeadphoneFieldsAdditionalMap,
    setHeadphoneFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
    setAreHeadphoneFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
    setAreHeadphoneFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setKeyboardFieldsAdditionalMap,
    setKeyboardFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
    setAreKeyboardFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreKeyboardFieldsAdditionalMapValid,
    setAreKeyboardFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setMicrophoneFieldsAdditionalMap,
    setMicrophoneFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
    setAreMicrophoneFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
    setAreMicrophoneFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setMotherboardFieldsAdditionalMap,
    setMotherboardFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
    setAreMotherboardFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMotherboardFieldsAdditionalMapValid,
    setAreMotherboardFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setMouseFieldsAdditionalMap,
    setMouseFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreMouseFieldsAdditionalMapFocused,
    setAreMouseFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreMouseFieldsAdditionalMapValid,
    setAreMouseFieldsAdditionalMapValid_CreateProductReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU
  // ╰─────────────────────────────────────────────────────────────────╯

  // psu -> wattage
  [createProductAction.setPsuWattage, setPsuWattage_CreateProductReducer],
  [
    createProductAction.setIsPsuWattageValid,
    setIsPsuWattageValid_CreateProductReducer,
  ],
  [
    createProductAction.setIsPsuWattageFocused,
    setIsPsuWattageFocused_CreateProductReducer,
  ],
  // psu -> efficiency
  [createProductAction.setPsuEfficiency, setPsuEfficiency_CreateProductReducer],
  // psu -> form factor
  [createProductAction.setPsuFormFactor, setPsuFormFactor_CreateProductReducer],
  // psu -> modularity
  [createProductAction.setPsuModularity, setPsuModularity_CreateProductReducer],
  // psu -> additional fields
  [
    createProductAction.setPsuFieldsAdditionalMap,
    setPsuFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setArePsuFieldsAdditionalMapFocused,
    setArePsuFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setArePsuFieldsAdditionalMapValid,
    setArePsuFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setRamFieldsAdditionalMap,
    setRamFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreRamFieldsAdditionalMapFocused,
    setAreRamFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreRamFieldsAdditionalMapValid,
    setAreRamFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setSmartphoneFieldsAdditionalMap,
    setSmartphoneFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
    setAreSmartphoneFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
    setAreSmartphoneFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setSpeakerFieldsAdditionalMap,
    setSpeakerFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
    setAreSpeakerFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreSpeakerFieldsAdditionalMapValid,
    setAreSpeakerFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setStorageFieldsAdditionalMap,
    setStorageFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreStorageFieldsAdditionalMapFocused,
    setAreStorageFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreStorageFieldsAdditionalMapValid,
    setAreStorageFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setTabletFieldsAdditionalMap,
    setTabletFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreTabletFieldsAdditionalMapFocused,
    setAreTabletFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreTabletFieldsAdditionalMapValid,
    setAreTabletFieldsAdditionalMapValid_CreateProductReducer,
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
    createProductAction.setWebcamFieldsAdditionalMap,
    setWebcamFieldsAdditionalMap_CreateProductReducer,
  ],
  [
    createProductAction.setAreWebcamFieldsAdditionalMapFocused,
    setAreWebcamFieldsAdditionalMapFocused_CreateProductReducer,
  ],
  [
    createProductAction.setAreWebcamFieldsAdditionalMapValid,
    setAreWebcamFieldsAdditionalMapValid_CreateProductReducer,
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
  setAccessoryFieldsAdditionalMap_CreateProductReducer,
  setAccessoryInterface_CreateProductReducer,
  setAccessoryType_CreateProductReducer,
  setAdditionalComments_CreateProductReducer,
  setAreAccessoryFieldsAdditionalMapFocused_CreateProductReducer,
  setAreAccessoryFieldsAdditionalMapValid_CreateProductReducer,
  setAreCpuFieldsAdditionalMapFocused_CreateProductReducer,
  setAreCpuFieldsAdditionalMapValid_CreateProductReducer,
  setAreDisplayFieldsAdditionalMapFocused_CreateProductReducer,
  setAreDisplayFieldsAdditionalMapValid_CreateProductReducer,
  setAreGpuFieldsAdditionalMapFocused_CreateProductReducer,
  setAreGpuFieldsAdditionalMapValid_CreateProductReducer,
  setAreHeadphoneFieldsAdditionalMapFocused_CreateProductReducer,
  setAreHeadphoneFieldsAdditionalMapValid_CreateProductReducer,
  setAreImagesValid_CreateProductReducer,
  setAreKeyboardFieldsAdditionalMapFocused_CreateProductReducer,
  setAreKeyboardFieldsAdditionalMapValid_CreateProductReducer,
  setAreMicrophoneFieldsAdditionalMapFocused_CreateProductReducer,
  setAreMicrophoneFieldsAdditionalMapValid_CreateProductReducer,
  setAreMotherboardFieldsAdditionalMapFocused_CreateProductReducer,
  setAreMotherboardFieldsAdditionalMapValid_CreateProductReducer,
  setAreMouseFieldsAdditionalMapFocused_CreateProductReducer,
  setAreMouseFieldsAdditionalMapValid_CreateProductReducer,
  setAreRamFieldsAdditionalMapFocused_CreateProductReducer,
  setAreRamFieldsAdditionalMapValid_CreateProductReducer,
  setAreSmartphoneFieldsAdditionalMapFocused_CreateProductReducer,
  setAreSmartphoneFieldsAdditionalMapValid_CreateProductReducer,
  setAreSpeakerFieldsAdditionalMapFocused_CreateProductReducer,
  setAreSpeakerFieldsAdditionalMapValid_CreateProductReducer,
  setAreStorageFieldsAdditionalMapFocused_CreateProductReducer,
  setAreStorageFieldsAdditionalMapValid_CreateProductReducer,
  setAreTabletFieldsAdditionalMapFocused_CreateProductReducer,
  setAreTabletFieldsAdditionalMapValid_CreateProductReducer,
  setAvailability_CreateProductReducer,
  setBrand_CreateProductReducer,
  setCpuCores_CreateProductReducer,
  setCpuFieldsAdditionalMap_CreateProductReducer,
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
  setDisplayFieldsAdditionalMap_CreateProductReducer,
  setDisplayPanelType_CreateProductReducer,
  setDisplayRefreshRate_CreateProductReducer,
  setDisplayResolutionHorizontal_CreateProductReducer,
  setDisplayResolutionVertical_CreateProductReducer,
  setDisplayResponseTime_CreateProductReducer,
  setDisplaySize_CreateProductReducer,
  setGpuBoostClock_CreateProductReducer,
  setGpuChipset_CreateProductReducer,
  setGpuCoreClock_CreateProductReducer,
  setGpuFieldsAdditionalMap_CreateProductReducer,
  setGpuMemoryCapacity_CreateProductReducer,
  setGpuMemoryCapacityUnit_CreateProductReducer,
  setGpuTdp_CreateProductReducer,
  setHeadphoneColor_CreateProductReducer,
  setHeadphoneDriver_CreateProductReducer,
  setHeadphoneFieldsAdditionalMap_CreateProductReducer,
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
  setKeyboardFieldsAdditionalMap_CreateProductReducer,
  setKeyboardInterface_CreateProductReducer,
  setKeyboardLayout_CreateProductReducer,
  setKeyboardSwitch_CreateProductReducer,
  setMicrophoneColor_CreateProductReducer,
  setMicrophoneFieldsAdditionalMap_CreateProductReducer,
  setMicrophoneFrequencyResponse_CreateProductReducer,
  setMicrophoneInterface_CreateProductReducer,
  setMicrophonePolarPattern_CreateProductReducer,
  setMicrophoneType_CreateProductReducer,
  setModel_CreateProductReducer,
  setMotherboardChipset_CreateProductReducer,
  setMotherboardFieldsAdditionalMap_CreateProductReducer,
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
  setMouseFieldsAdditionalMap_CreateProductReducer,
  setMouseInterface_CreateProductReducer,
  setMouseSensor_CreateProductReducer,
  setPrice_CreateProductReducer,
  setProductCategory_CreateProductReducer,
  setQuantity_CreateProductReducer,
  setRamColor_CreateProductReducer,
  setRamDataRate_CreateProductReducer,
  setRamFieldsAdditionalMap_CreateProductReducer,
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
  setSmartphoneFieldsAdditionalMap_CreateProductReducer,
  setSmartphoneOs_CreateProductReducer,
  setSmartphoneRamCapacity_CreateProductReducer,
  setSmartphoneRamCapacityUnit_CreateProductReducer,
  setSmartphoneResolutionHorizontal_CreateProductReducer,
  setSmartphoneResolutionVertical_CreateProductReducer,
  setSmartphoneStorageCapacity_CreateProductReducer,
  setSpeakerColor_CreateProductReducer,
  setSpeakerFieldsAdditionalMap_CreateProductReducer,
  setSpeakerFrequencyResponse_CreateProductReducer,
  setSpeakerInterface_CreateProductReducer,
  setSpeakerTotalWattage_CreateProductReducer,
  setSpeakerType_CreateProductReducer,
  setStepsInError_CreateProductReducer,
  setStorageCacheCapacity_CreateProductReducer,
  setStorageCacheCapacityUnit_CreateProductReducer,
  setStorageCapacity_CreateProductReducer,
  setStorageCapacityUnit_CreateProductReducer,
  setStorageFieldsAdditionalMap_CreateProductReducer,
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
  setTabletFieldsAdditionalMap_CreateProductReducer,
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
