import { useReducer } from "react";
import { directory1Reducer } from "./reducers";
import { initialDirectory1State } from "./state";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { Directory1Action, directory1Action } from "./actions";
import { Department } from "../../types";
import {
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  JobPositionsWithDefaultKey,
  StoreLocationsWithDefaultKey,
} from "./types";
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
} from "../directory/constants";
import { AccessibleSliderInput } from "../accessibleInputs/AccessibleSliderInput";
import { Container, Stack, Text } from "@mantine/core";
import { logState } from "../../utils";
import { generateIdMap, generateTrees, generateTree } from "../../classes/trie";

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

  logState({
    state: directory1State,
    groupLabel: "directory1State",
  });

  // list of albertan towns
  const towns = [
    "Airdrie",
    "Beaumont",
    "Brooks",
    "Calgary",
    "Camrose",
    "Chestermere",
    "Cold Lake",
    "Edmonton",
    "Fort Saskatchewan",
    "Grande Prairie",
    "Lacombe",
    "Leduc",
    "Lethbridge",
    "Lloydminster",
    "Medicine Hat",
    "Red Deer",
    "Spruce Grove",
    "St. Albert",
    "Wetaskiwin",
  ];

  const treesArray = generateTrees(towns);
  const idIndexMap = generateIdMap(treesArray);
  const tree = generateTree(idIndexMap, treesArray);

  console.group("TRIE");
  console.log("treesArray", treesArray);
  console.log("idIndexMap", idIndexMap);
  console.log("tree", tree);
  console.groupEnd();

  const departmentSelectInput = (
    <AccessibleSelectInput<Directory1Action["setDepartment"], DepartmentsWithDefaultKey>
      attributes={{
        data: ["All Departments", ...DEPARTMENT_DATA],
        name: "department",
        value: department,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setDepartment,
      }}
    />
  );

  const jobPositionSelectInput = (
    <AccessibleSelectInput<Directory1Action["setJobPosition"], JobPositionsWithDefaultKey>
      attributes={{
        data: ["All Job Positions", ...JOB_POSITION_DATA],
        name: "jobPosition",
        value: jobPosition,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setJobPosition,
      }}
    />
  );

  const storeLocationSelectInput = (
    <AccessibleSelectInput<
      Directory1Action["setStoreLocation"],
      StoreLocationsWithDefaultKey
    >
      attributes={{
        data: ["All Store Locations", ...STORE_LOCATION_DATA],
        name: "storeLocation",
        value: storeLocation,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setStoreLocation,
      }}
    />
  );

  const rankerAlgorithmSelectInput = (
    <AccessibleSelectInput<Directory1Action["setDagreRanker"], DagreRankerAlgorithm>
      attributes={{
        data: DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
        name: "rankerAlgorithm",
        value: dagreRanker,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setDagreRanker,
      }}
    />
  );

  const rankDirectionSelectInput = (
    <AccessibleSelectInput<Directory1Action["setDagreRankDir"], DagreRankDir>
      attributes={{
        data: DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
        name: "rankDirection",
        value: dagreRankDir,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setDagreRankDir,
      }}
    />
  );

  const rankAlignmentSelectInput = (
    <AccessibleSelectInput<Directory1Action["setDagreRankAlign"], DagreRankAlign>
      attributes={{
        data: DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
        name: "rankAlignment",
        value: dagreRankAlign,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setDagreRankAlign,
      }}
    />
  );

  const nodeSeparationSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => <Text style={{ color: "lightgray" }}>{value} px</Text>,
        max: 300,
        min: 25,
        name: "nodeSeparation",
        validValueAction: directory1Action.setDagreNodeSep,
        value: dagreNodeSep,
      }}
    />
  );

  const rankSeparationSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => <Text style={{ color: "lightgray" }}>{value} px</Text>,
        max: 300,
        min: 25,
        name: "rankSeparation",
        validValueAction: directory1Action.setDagreRankSep,
        value: dagreRankSep,
      }}
    />
  );

  const minimumLengthSliderInput = (
    <AccessibleSliderInput
      attributes={{
        label: (value) => <Text style={{ color: "lightgray" }}>{value}</Text>,
        max: 10,
        min: 1,
        name: "minimumLength",
        validValueAction: directory1Action.setDagreMinLen,
        value: dagreMinLen,
      }}
    />
  );

  const graphControls = (
    <Stack>
      {departmentSelectInput}
      {jobPositionSelectInput}
      {storeLocationSelectInput}
      {rankerAlgorithmSelectInput}
      {rankDirectionSelectInput}
      {rankAlignmentSelectInput}
      {nodeSeparationSliderInput}
      {rankSeparationSliderInput}
      {minimumLengthSliderInput}
    </Stack>
  );

  return <Container w={700}>{graphControls}</Container>;
}

export default Directory1;
