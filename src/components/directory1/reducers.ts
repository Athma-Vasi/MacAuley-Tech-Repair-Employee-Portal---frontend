import { StoreLocation } from "../../types";
import { directory1Action } from "./actions";
import {
  DepartmentsWithDefaultKey,
  Directory1Action,
  Directory1Dispatch,
  Directory1State,
} from "./types";

function directory1Reducer(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  const reducer = directory1Reducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const directory1Reducers = new Map<
  Directory1Action[keyof Directory1Action],
  (state: Directory1State, dispatch: Directory1Dispatch) => Directory1State
>([
  [directory1Action.setDepartment, directory1Reducer_setDepartment],
  [directory1Action.setStoreLocation, directory1Reducer_setStoreLocation],
]);

function directory1Reducer_setDepartment(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    department: dispatch.payload as DepartmentsWithDefaultKey,
  };
}

function directory1Reducer_setStoreLocation(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    storeLocation: dispatch.payload as StoreLocation,
  };
}

export { directory1Reducer };
