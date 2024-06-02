import { Container, Stack, Text } from "@mantine/core";
import { useReducer, useState } from "react";

import {
  COLORS_SWATCHES,
  DEPARTMENT_DATA,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { Directory1Action, directory1Action } from "./actions";
import { directory1Reducer } from "./reducers";
import { initialDirectory1State } from "./state";
import { DepartmentsWithDefaultKey, StoreLocationsWithDefaultKey } from "./types";
import { filterEmployees, returnIsStoreLocationDisabled } from "./utils";
import { StoreLocation } from "../../types";
import { DIRECTORY_EMPLOYEE_DATA } from "./data";
import { buildD3Tree } from "../d3Tree/utils";
import { D3Tree } from "../d3Tree/D3Tree";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";

function Directory1() {
  const [directory1State, directory1Dispatch] = useReducer(
    directory1Reducer,
    initialDirectory1State
  );
  const { department, storeLocation } = directory1State;

  const {
    globalState: { themeObject },
  } = useGlobalState();
  const {
    generalColors: { themeColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

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

  const isStoreLocationDisabled = returnIsStoreLocationDisabled(department);
  const storeLocationData = isStoreLocationDisabled
    ? (["All Locations"] as StoreLocationsWithDefaultKey[])
    : (STORE_LOCATION_DATA as StoreLocationsWithDefaultKey[]);

  const storeLocationSelectInput = (
    <AccessibleSelectInput<
      Directory1Action["setStoreLocation"],
      StoreLocationsWithDefaultKey
    >
      attributes={{
        data: storeLocationData,
        disabled: isStoreLocationDisabled,
        name: "storeLocation",
        value: storeLocation,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setStoreLocation,
      }}
    />
  );

  const filteredEmployees = filterEmployees({
    department,
    employees: DIRECTORY_EMPLOYEE_DATA,
    isStoreLocationDisabled,
    storeLocation,
  });
  const d3Tree = <D3Tree data={buildD3Tree(filteredEmployees, themeColorShade)} />;

  return (
    <Container w={700}>
      {departmentSelectInput}
      {storeLocationSelectInput}
      {d3Tree}
    </Container>
  );
}

export default Directory1;
