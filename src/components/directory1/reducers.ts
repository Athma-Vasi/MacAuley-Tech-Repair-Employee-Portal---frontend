import { directory1Action } from "./actions";
import {
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  Directory1Action,
  Directory1Dispatch,
  Directory1State,
  JobPositionsWithDefaultKey,
  StoreLocationsWithDefaultKey,
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
  [directory1Action.setDagreMinLen, directory1Reducer_setDagreMinLen],
  [directory1Action.setDagreNodeSep, directory1Reducer_setDagreNodeSep],
  [directory1Action.setDagreRankAlign, directory1Reducer_setDagreRankAlign],
  [directory1Action.setDagreRankDir, directory1Reducer_setDagreRankDir],
  [directory1Action.setDagreRankSep, directory1Reducer_setDagreRankSep],
  [directory1Action.setDagreRanker, directory1Reducer_setDagreRanker],
  [directory1Action.setDepartment, directory1Reducer_setDepartment],
  [directory1Action.setIsLoading, directory1Reducer_setIsLoading],
  [directory1Action.setJobPosition, directory1Reducer_setJobPosition],
  [directory1Action.setStoreLocation, directory1Reducer_setStoreLocation],
]);

function directory1Reducer_setDagreMinLen(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreMinLen: dispatch.payload as number,
  };
}

function directory1Reducer_setDagreNodeSep(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreNodeSep: dispatch.payload as number,
  };
}

function directory1Reducer_setDagreRankAlign(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreRankAlign: dispatch.payload as DagreRankAlign,
  };
}

function directory1Reducer_setDagreRankDir(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreRankDir: dispatch.payload as DagreRankDir,
  };
}

function directory1Reducer_setDagreRankSep(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreRankSep: dispatch.payload as number,
  };
}

function directory1Reducer_setDagreRanker(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    dagreRanker: dispatch.payload as DagreRankerAlgorithm,
  };
}

function directory1Reducer_setDepartment(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    department: dispatch.payload as DepartmentsWithDefaultKey,
  };
}

function directory1Reducer_setIsLoading(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    isLoading: dispatch.payload as boolean,
  };
}

function directory1Reducer_setJobPosition(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    jobPosition: dispatch.payload as JobPositionsWithDefaultKey,
  };
}

function directory1Reducer_setStoreLocation(
  state: Directory1State,
  dispatch: Directory1Dispatch
): Directory1State {
  return {
    ...state,
    storeLocation: dispatch.payload as StoreLocationsWithDefaultKey,
  };
}

export { directory1Reducer };
