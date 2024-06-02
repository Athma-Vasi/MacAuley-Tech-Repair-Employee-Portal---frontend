import { Container, Stack, Text } from "@mantine/core";
import { useReducer, useState } from "react";

import { DEPARTMENT_DATA, STORE_LOCATION_DATA } from "../../constants/data";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { Directory1Action, directory1Action } from "./actions";
import { directory1Reducer } from "./reducers";
import { initialDirectory1State } from "./state";
import { DepartmentsWithDefaultKey } from "./types";
import { returnIsStoreLocationDisabled } from "./utils";
import { StoreLocation } from "../../types";

function Directory1() {
  const [directory1State, directory1Dispatch] = useReducer(
    directory1Reducer,
    initialDirectory1State
  );

  const { department, storeLocation } = directory1State;

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

  const storeLocationSelectInput = (
    <AccessibleSelectInput<Directory1Action["setStoreLocation"], StoreLocation>
      attributes={{
        data: STORE_LOCATION_DATA,
        disabled: returnIsStoreLocationDisabled(department),
        name: "storeLocation",
        value: storeLocation,
        parentDispatch: directory1Dispatch,
        validValueAction: directory1Action.setStoreLocation,
      }}
    />
  );

  return (
    <Container w={700}>
      {departmentSelectInput}
      {storeLocationSelectInput}
    </Container>
  );
}

export default Directory1;
