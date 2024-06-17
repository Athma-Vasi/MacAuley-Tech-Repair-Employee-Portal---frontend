import { Container } from "@mantine/core";
import { useReducer } from "react";

import {
  COLORS_SWATCHES,
  DEPARTMENT_DATA,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { D3Tree } from "../d3Tree/D3Tree";
import { buildD3Tree } from "../d3Tree/utils";
import { DirectoryAction, directoryAction } from "./actions";
import { DIRECTORY_EMPLOYEE_DATA } from "./data";
import { directoryReducer } from "./reducers";
import { initialDirectoryState } from "./state";
import { DepartmentsWithDefaultKey, StoreLocationsWithDefaultKey } from "./types";
import { filterEmployees, returnIsStoreLocationDisabled } from "./utils";

function Directory() {
  const [directoryState, directoryDispatch] = useReducer(
    directoryReducer,
    initialDirectoryState
  );
  const { department, storeLocation } = directoryState;

  const {
    globalState: { themeObject },
  } = useGlobalState();
  const {
    generalColors: { themeColorShade },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const departmentSelectInput = (
    <AccessibleSelectInput<DirectoryAction["setDepartment"], DepartmentsWithDefaultKey>
      attributes={{
        data: ["All Departments", ...DEPARTMENT_DATA],
        name: "department",
        value: department,
        parentDispatch: directoryDispatch,
        validValueAction: directoryAction.setDepartment,
      }}
    />
  );

  const isStoreLocationDisabled = returnIsStoreLocationDisabled(department);
  const storeLocationData = isStoreLocationDisabled
    ? (["All Locations"] as StoreLocationsWithDefaultKey[])
    : (STORE_LOCATION_DATA as StoreLocationsWithDefaultKey[]);

  const storeLocationSelectInput = (
    <AccessibleSelectInput<
      DirectoryAction["setStoreLocation"],
      StoreLocationsWithDefaultKey
    >
      attributes={{
        data: storeLocationData,
        disabled: isStoreLocationDisabled,
        name: "storeLocation",
        value: storeLocation,
        parentDispatch: directoryDispatch,
        validValueAction: directoryAction.setStoreLocation,
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

export default Directory;
