import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryProps } from "./types";
import { separateQueryInputsData } from "./utils";

function Query({
  collectionName,
  invalidValueAction,
  parentDispatch,
  stepperPages,
  validValueAction,
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
  } = separateQueryInputsData(stepperPages);

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
}

export { Query };
