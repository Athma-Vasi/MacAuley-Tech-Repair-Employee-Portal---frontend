import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { QueryFilter, QueryFilterDispatch } from "./QueryFilter";
import { QueryAction, queryAction } from "./actions";
import { Stack } from "@mantine/core";

function Query({
  collectionName,
  // invalidValueAction,
  // parentDispatch,
  stepperPages,
  // validValueAction,
  disableProjection = false,
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
    createInitialQueryState(searchFieldSelectData)
  );

  const {
    filterField,
    filterOperator,
    filterOperatorSelectData,
    filterChain,
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
    projectionArray,
    searchField,
    searchChain,
    searchValue,
    selectedFieldsSet,
    sortDirection,
    sortField,
    sortChain,
  } = queryState;

  console.group("Query");
  console.log("stepperPages", stepperPages);
  console.log("fieldNamesOperatorsTypesMap", fieldNamesOperatorsTypesMap);
  console.log("filterField", filterField);
  console.log("filterOperator", filterOperator);
  console.log("filterValue", filterValue);
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
      filterChain={filterChain}
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

  return <Stack>{queryFilter}</Stack>;
}

export { Query };
