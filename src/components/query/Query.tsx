import { Accordion, Stack } from "@mantine/core";
import React from "react";

import { Chain, QueryChainDispatch } from "./Chain";
import { QueryFilter, SetFilterInputValuesDispatch } from "./QueryFilter";
import { QueryProjection } from "./QueryProjection";
import { QuerySearch } from "./QuerySearch";
import { QuerySort, QuerySortDispatch } from "./QuerySort";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { queryAction } from "./actions";
import { LIMIT_PER_PAGE_DATA } from "./constants";

function Query({
  collectionName,
  // invalidValueAction,
  // parentDispatch,
  stepperPages,
  // validValueAction,
  hideProjection = false,
}: QueryProps) {
  const {
    fieldNamesOperatorsTypesMap,
    filterFieldSelectInputData,
    projectionCheckboxData,
    searchFieldSelectInputData,
    selectInputsDataMap,
    sortFieldSelectData,
    inputsValidationsMap,
  } = createQueryInputsData(stepperPages);

  const [queryState, queryDispatch] = React.useReducer(
    queryReducer,
    createInitialQueryState(searchFieldSelectInputData)
  );

  console.group("Query");
  console.log("queryState", queryState);
  console.log("stepperPages", stepperPages);
  console.log("fieldNamesOperatorsTypesMap", fieldNamesOperatorsTypesMap);
  console.log("filterFieldSelectInputData", filterFieldSelectInputData);
  console.log("projectionCheckboxData", projectionCheckboxData);
  console.log("searchFieldSelectInputData", searchFieldSelectInputData);
  console.log("selectInputsDataMap", selectInputsDataMap);
  console.log("sortFieldSelectData", sortFieldSelectData);
  console.log("inputsValidationsMap", inputsValidationsMap);
  console.groupEnd();

  const queryChain = (
    <Chain
      collectionName={collectionName}
      queryChainDispatch={queryDispatch as QueryChainDispatch}
      queryState={queryState}
    />
  );

  const queryFilter = (
    <QueryFilter
      fieldNamesOperatorsTypesMap={fieldNamesOperatorsTypesMap}
      filterFieldSelectInputData={filterFieldSelectInputData}
      inputsValidationsMap={inputsValidationsMap}
      modifyQueryChainsDispatch={queryDispatch}
      parentDispatch={queryDispatch}
      queryState={queryState}
      searchFieldSelectInputData={searchFieldSelectInputData}
      selectInputsDataMap={selectInputsDataMap}
      setFilterInputValuesDispatch={queryDispatch as SetFilterInputValuesDispatch}
    />
  );

  const queryProjection = (
    <QueryProjection
      hideProjection={hideProjection}
      parentDispatch={queryDispatch}
      projectionCheckboxData={projectionCheckboxData}
      queryState={queryState}
    />
  );

  const querySearch = (
    <QuerySearch
      inputsValidationsMap={inputsValidationsMap}
      parentDispatch={queryDispatch}
      queryState={queryState}
    />
  );

  const querySort = (
    <QuerySort
      querySortDispatch={queryDispatch as QuerySortDispatch}
      queryState={queryState}
      sortChainDispatch={queryDispatch}
      sortFieldSelectData={sortFieldSelectData}
    />
  );

  const queryAccordion = (
    <Accordion>
      <Accordion.Item value="Filter">
        <Accordion.Control>Filter</Accordion.Control>
        <Accordion.Panel>{queryFilter}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Search">
        <Accordion.Control>Search</Accordion.Control>
        <Accordion.Panel>{querySearch}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Projection">
        <Accordion.Control>Projection</Accordion.Control>
        <Accordion.Panel>{queryProjection}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Sort">
        <Accordion.Control>Sort</Accordion.Control>
        <Accordion.Panel>{querySort}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const limitPerPageSegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: LIMIT_PER_PAGE_DATA,
        name: "limitPerPage",
        parentDispatch: queryDispatch,
        validValueAction: queryAction.setLimitPerPage,
        value: queryState.limitPerPage,
      }}
    />
  );

  return (
    <Stack w={700}>
      {queryChain}
      {limitPerPageSegmentedControl}
      {queryAccordion}
    </Stack>
  );
}

export { Query };
