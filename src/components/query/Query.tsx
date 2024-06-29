import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryChainKind, QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { QueryFilter, SetFilterInputValuesDispatch } from "./QueryFilter";
import { QueryAction, queryAction } from "./actions";
import { Accordion, Stack, Text, Timeline } from "@mantine/core";
import { QueryProjection } from "./QueryProjection";
import { Chain, QueryChainDispatch } from "./Chain";
import { QuerySort, QuerySortDispatch } from "./QuerySort";
import { QuerySearch } from "./QuerySearch";

function Query({
  collectionName,
  // invalidValueAction,
  // parentDispatch,
  stepperPages,
  // validValueAction,
  isProjectionDisabled = false,
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

  const {
    filterField,
    filterComparisonOperator,
    filterComparisonOperatorSelectData,
    filterLogicalOperator,
    filterValue,
    generalSearchCase,
    generalSearchExclusionValue,
    generalSearchInclusionValue,
    isError,
    isSearchDisabled,
    limitPerPage,
    projectionExclusionFields,
    queryChains,
    searchField,
    searchValue,
    sortDirection,
    sortField,
  } = queryState;

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
      generalSearchCase={generalSearchCase}
      generalSearchExclusionValue={generalSearchExclusionValue}
      generalSearchInclusionValue={generalSearchInclusionValue}
      projectionExclusionFields={projectionExclusionFields}
      queryAction={queryAction}
      queryChainDispatch={queryDispatch as QueryChainDispatch}
      queryChains={queryChains}
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
      parentDispatch={queryDispatch}
      projectionCheckboxData={projectionCheckboxData}
      projectionExclusionFields={projectionExclusionFields}
      queryAction={queryAction}
    />
  );

  const querySearch = (
    <QuerySearch
      generalSearchCase={generalSearchCase}
      generalSearchExclusionValue={generalSearchExclusionValue}
      generalSearchInclusionValue={generalSearchInclusionValue}
      queryAction={queryAction}
      parentDispatch={queryDispatch}
      inputsValidationsMap={inputsValidationsMap}
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

  return (
    <Stack w={700}>
      {queryChain}
      {queryAccordion}
    </Stack>
  );
}

export { Query };
