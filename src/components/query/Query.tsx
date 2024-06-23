import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryChainKind, QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { QueryFilter, QueryFilterDispatch } from "./QueryFilter";
import { QueryAction, queryAction } from "./actions";
import { Accordion, Stack, Text, Timeline } from "@mantine/core";
import { QuerySearch, QuerySearchDispatch, SearchChainDispatch } from "./QuerySearch";
import { TbChevronDown } from "react-icons/tb";
import { QueryProjection, QueryProjectionDispatch } from "./QueryProjection";
import { Chain } from "./Chain";

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
    searchFieldSelectData,
    selectInputsDataMap,
    sortFieldSelectData,
    validatedInputsKeyMap,
  } = createQueryInputsData(stepperPages);

  const [queryState, queryDispatch] = React.useReducer(
    queryReducer,
    createInitialQueryState(projectionCheckboxData, searchFieldSelectData)
  );

  const {
    filterField,
    filterOperator,
    filterOperatorSelectData,
    filterValue,
    generalSearchExclusionValue,
    generalSearchInclusionValue,
    isError,
    isFilterOpened,
    isGeneralSearchCaseSensitive,
    isProjectionOpened,
    isQueryOpened,
    isSearchDisabled,
    isSearchOpened,
    isSortOpened,
    limitPerPage,
    projectedFieldsSet,
    projectionFields,
    queryChains,
    searchField,
    searchValue,
    selectedFieldsSet,
    sortDirection,
    sortField,
  } = queryState;

  console.group("Query");
  console.log("queryState", queryState);
  console.log("stepperPages", stepperPages);
  console.log("fieldNamesOperatorsTypesMap", fieldNamesOperatorsTypesMap);
  console.log("filterFieldSelectInputData", filterFieldSelectInputData);
  console.log("projectionCheckboxData", projectionCheckboxData);
  console.log("searchFieldSelectData", searchFieldSelectData);
  console.log("selectInputsDataMap", selectInputsDataMap);
  console.log("sortFieldSelectData", sortFieldSelectData);
  console.log("validatedInputsKeyMap", validatedInputsKeyMap);
  console.groupEnd();

  const queryFilter = (
    <QueryFilter
      fieldNamesOperatorsTypesMap={fieldNamesOperatorsTypesMap}
      filterChain={queryChains.filter}
      filterField={filterField}
      filterFieldSelectInputData={filterFieldSelectInputData}
      filterOperator={filterOperator}
      filterValue={filterValue}
      projectedFieldsSet={projectedFieldsSet}
      queryAction={queryAction}
      selectInputsDataMap={selectInputsDataMap}
      validatedInputsKeyMap={validatedInputsKeyMap}
      filterChainDispatch={queryDispatch}
      queryFilterDispatch={queryDispatch as QueryFilterDispatch}
    />
  );

  const querySearch = (
    <QuerySearch
      generalSearchExclusionValue={generalSearchExclusionValue}
      generalSearchInclusionValue={generalSearchInclusionValue}
      queryAction={queryAction}
      querySearchDispatch={queryDispatch as QuerySearchDispatch}
      searchChain={queryChains.search}
      searchChainDispatch={queryDispatch as SearchChainDispatch}
      searchField={searchField}
      searchFieldSelectData={searchFieldSelectData}
      searchValue={searchValue}
      validatedInputsKeyMap={validatedInputsKeyMap}
    />
  );

  const queryProjection = (
    <QueryProjection
      parentDispatch={queryDispatch as any}
      projectionCheckboxData={projectionCheckboxData}
      projectionFields={projectionFields}
      queryAction={queryAction}
    />
  );

  const queryChain = (
    <Chain
      collectionName={collectionName}
      queryAction={queryAction}
      queryChainDispatch={queryDispatch}
      queryChains={queryChains}
    />
  );

  return (
    <Stack>
      {queryChain}
      {queryFilter}
      {queryProjection}
      {querySearch}
    </Stack>
  );
}

export { Query };
