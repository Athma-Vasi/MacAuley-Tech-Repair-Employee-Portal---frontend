import { Container, Stack, Text } from "@mantine/core";
import { useReducer } from "react";

import { Trie } from "../../classes/trie";
import { DEPARTMENT_DATA, STORE_LOCATION_DATA } from "../../constants/data";
import { groupBy, logState } from "../../utils";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleSliderInput } from "../accessibleInputs/AccessibleSliderInput";
import { AccessibleStepper } from "../accessibleInputs/AccessibleStepper";
import { AccessibleSearchInput } from "../accessibleInputs/search/AccessibleSearchInput";
import {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
} from "../directory/constants";
import { Directory1Action, directory1Action } from "./actions";
import { DEPARTMENT_JOB_POSITION_TABLE, returnDirectory1StepperPages } from "./constants";
import { directory1Reducer } from "./reducers";
import { initialDirectory1State } from "./state";
import {
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsWithDefaultKey,
  Directory1UserDocument,
  JobPositionsWithDefaultKey,
  StoreLocationsWithDefaultKey,
} from "./types";
import { USERS_DOCS } from "../devTesting/constants";
import {
  addOrgIds,
  addOrgIdsToUsers,
  createNewMaintenanceSupervisors,
  returnSearchInputData,
} from "./utils";
import { DIRECTORY_EMPLOYEE_DATA } from "./data";
import OrgChartTree from "./testing";

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
    pagesInError,
    search,
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

  console.log(addOrgIds(DIRECTORY_EMPLOYEE_DATA));

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
        data: DEPARTMENT_JOB_POSITION_TABLE[department],
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

  const directory1StepperPages = returnDirectory1StepperPages();

  const searchInput = (
    <AccessibleSearchInput<
      Directory1Action["setSearchValue"],
      Directory1Action["setPageInError"]
    >
      attributes={{
        data: returnSearchInputData(USERS_DOCS as any),
        invalidValueAction: directory1Action.setPageInError,
        name: "search",
        parentDispatch: directory1Dispatch,
        stepperPages: directory1StepperPages,
        validValueAction: directory1Action.setSearchValue,
        value: search,
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

  const directoryFilters = (
    <Stack>
      {departmentSelectInput}
      {jobPositionSelectInput}
      {storeLocationSelectInput}
      {searchInput}
    </Stack>
  );

  const layoutFilters = (
    <Stack>
      {rankerAlgorithmSelectInput}
      {rankDirectionSelectInput}
      {rankAlignmentSelectInput}
      {nodeSeparationSliderInput}
      {rankSeparationSliderInput}
      {minimumLengthSliderInput}
    </Stack>
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: directory1State,
        pageElements: [directoryFilters, layoutFilters],
        stepperPages: directory1StepperPages,
        displayReviewPage: false,
        displaySubmitPage: false,
      }}
    />
  );

  return (
    <Container w={700}>
      {stepper}
      {<OrgChartTree />}
    </Container>
  );
}

export default Directory1;
