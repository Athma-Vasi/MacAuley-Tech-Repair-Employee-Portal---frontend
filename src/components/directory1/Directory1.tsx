import { useReducer } from "react";
import { directory1Reducer } from "./reducers";
import { initialDirectory1State } from "./state";

function Directory1() {
  const [directory1State, directory1Dispatch] = useReducer(
    directory1Reducer,
    initialDirectory1State
  );

  const {
    dagreMinLen,
    dagreNodeSep,
    dagreRankAlign,
    dagreRankDir,
    dagreRankSep,
    dagreRanker,
    department,
    isLoading,
    jobPosition,
    storeLocation,
  } = directory1State;

  return <></>;
}

export default Directory1;
