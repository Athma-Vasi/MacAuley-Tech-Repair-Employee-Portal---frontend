import { accessibleTextInputAction } from "./actions";
import { AccessibleTextInputDispatch, AccessibleTextInputState } from "./types";

function accessibleTextInputReducer(
  state: AccessibleTextInputState,
  dispatch: AccessibleTextInputDispatch
): AccessibleTextInputState {
  const reducer = accessibleTextInputReducersMap.get(dispatch.type);
  return reducer ? reducer(state, dispatch) : state;
}

const accessibleTextInputReducersMap = new Map<
  AccessibleTextInputDispatch["type"],
  (
    state: AccessibleTextInputState,
    dispatch: AccessibleTextInputDispatch
  ) => AccessibleTextInputState
>([
  [
    accessibleTextInputAction.setPopoverOpened,
    accessibleTextInputReducer_setPopoverOpened,
  ],
  [accessibleTextInputAction.setValueBuffer, accessibleTextInputReducer_setValueBuffer],
  [
    accessibleTextInputAction.setIsInputFocused,
    accessibleTextInputReducer_setIsInputFocused,
  ],
]);

function accessibleTextInputReducer_setPopoverOpened(
  state: AccessibleTextInputState,
  dispatch: AccessibleTextInputDispatch
): AccessibleTextInputState {
  return {
    ...state,
    popoverOpened: dispatch.payload as boolean,
  };
}

function accessibleTextInputReducer_setValueBuffer(
  state: AccessibleTextInputState,
  dispatch: AccessibleTextInputDispatch
): AccessibleTextInputState {
  return {
    ...state,
    valueBuffer: dispatch.payload as string,
  };
}

function accessibleTextInputReducer_setIsInputFocused(
  state: AccessibleTextInputState,
  dispatch: AccessibleTextInputDispatch
): AccessibleTextInputState {
  return {
    ...state,
    isInputFocused: dispatch.payload as boolean,
  };
}

export { accessibleTextInputReducer, accessibleTextInputReducersMap };
