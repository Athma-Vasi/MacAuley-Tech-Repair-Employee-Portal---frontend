import { SetPageInErrorPayload } from "../../../types";
import {
  AccessibleTextInputsDynamicAction,
  accessibleTextInputsDynamicAction,
} from "./actions";
import {
  AccessibleTextInputsDynamicDispatch,
  AccessibleTextInputsDynamicState,
} from "./types";

function accessibleTextInputsDynamicReducer(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const reducer = accessibleTextInputsDynamicReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const accessibleTextInputsDynamicReducers = new Map<
  AccessibleTextInputsDynamicAction[keyof AccessibleTextInputsDynamicAction],
  (
    state: AccessibleTextInputsDynamicState,
    dispatch: AccessibleTextInputsDynamicDispatch
  ) => AccessibleTextInputsDynamicState
>([
  [
    accessibleTextInputsDynamicAction.addInput,
    accessibleTextInputsDynamicReducer_addInput,
  ],
  [
    accessibleTextInputsDynamicAction.deleteInput,
    accessibleTextInputsDynamicReducer_deleteInput,
  ],
  [
    accessibleTextInputsDynamicAction.insertInput,
    accessibleTextInputsDynamicReducer_insertInput,
  ],
  [
    accessibleTextInputsDynamicAction.setInputValue,
    accessibleTextInputsDynamicReducer_setInputValue,
  ],
  [
    accessibleTextInputsDynamicAction.setPageInError,
    accessibleTextInputsDynamicReducer_setPageInError,
  ],
  [
    accessibleTextInputsDynamicAction.slideInputUp,
    accessibleTextInputsDynamicReducer_slideInputUp,
  ],
  [
    accessibleTextInputsDynamicAction.slideInputDown,
    accessibleTextInputsDynamicReducer_slideInputDown,
  ],
]);

function accessibleTextInputsDynamicReducer_addInput(
  state: AccessibleTextInputsDynamicState,
  _dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  return {
    ...state,
    textValues: [...state.textValues, ""],
  };
}

function accessibleTextInputsDynamicReducer_deleteInput(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const index = dispatch.payload as number;
  const clonedState = structuredClone(state);
  clonedState.textValues.splice(index, 1);

  return clonedState;
}

function accessibleTextInputsDynamicReducer_insertInput(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const index = dispatch.payload as number;
  const clonedState = structuredClone(state);
  const left = clonedState.textValues.slice(0, index);
  const right = clonedState.textValues.slice(index);
  clonedState.textValues = [...left, "", ...right];

  return clonedState;
}

function accessibleTextInputsDynamicReducer_setInputValue(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const { index, value } = dispatch.payload as { index: number; value: string };
  const clonedState = structuredClone(state);
  clonedState.textValues[index] = value;

  return clonedState;
}

function accessibleTextInputsDynamicReducer_setPageInError(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function accessibleTextInputsDynamicReducer_slideInputUp(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const index = dispatch.payload as number;
  const clonedState = structuredClone(state);
  const [removed] = clonedState.textValues.splice(index, 1);
  clonedState.textValues.splice(index - 1, 0, removed);

  return clonedState;
}

function accessibleTextInputsDynamicReducer_slideInputDown(
  state: AccessibleTextInputsDynamicState,
  dispatch: AccessibleTextInputsDynamicDispatch
): AccessibleTextInputsDynamicState {
  const index = dispatch.payload as number;
  const clonedState = structuredClone(state);
  const [removed] = clonedState.textValues.splice(index, 1);
  clonedState.textValues.splice(index + 1, 0, removed);

  return clonedState;
}

export { accessibleTextInputsDynamicReducer };
