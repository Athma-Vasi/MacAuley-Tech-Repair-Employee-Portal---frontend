import { SetPageInErrorPayload } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
  FilterFieldsOperatorsValuesSetsMap,
  GeneralSearchCase,
  ModifyQueryChainPayload,
  QueryChain,
  QueryChainActions,
  QueryDispatch,
  QueryFilterPayload,
  QueryLink,
  QueryState,
  SearchFieldsValuesSetMap,
  SortDirection,
} from "./types";

function queryReducer(state: QueryState, dispatch: QueryDispatch): QueryState {
  const reducer = queryReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const queryReducers = new Map<
  QueryAction[keyof QueryAction],
  (state: QueryState, dispatch: QueryDispatch) => QueryState
>([
  [queryAction.modifyQueryChains, queryReducer_modifyQueryChains],
  [queryAction.setFilterField, queryReducer_setFilterField],
  [queryAction.setFilterComparisonOperator, queryReducer_setFilterComparisonOperator],
  [
    queryAction.setFilterComparisonOperatorSelectData,
    queryReducer_setFilterComparisonOperatorSelectData,
  ],
  [queryAction.setFilterValue, queryReducer_setFilterValue],
  [
    queryAction.setGeneralSearchExclusionValue,
    queryReducer_setGeneralSearchExclusionValue,
  ],
  [
    queryAction.setGeneralSearchInclusionValue,
    queryReducer_setGeneralSearchInclusionValue,
  ],
  [queryAction.setIsError, queryReducer_setIsError],
  [queryAction.setIsFilterOpened, queryReducer_setIsFilterOpened],
  [queryAction.setGeneralSearchCase, queryReducer_setGeneralSearchCase],
  [queryAction.setIsProjectionOpened, queryReducer_setIsProjectionOpened],
  [queryAction.setIsQueryOpened, queryReducer_setIsQueryOpened],
  [queryAction.setIsQueryChainOpened, queryReducer_setIsQueryChainOpened],
  [queryAction.setIsSearchDisabled, queryReducer_setIsSearchDisabled],
  [queryAction.setIsSearchOpened, queryReducer_setIsSearchOpened],
  [queryAction.setIsSortOpened, queryReducer_setIsSortOpened],
  [queryAction.setProjectionExclusionFields, queryReducer_setProjectionExclusionFields],
  [queryAction.setSearchField, queryReducer_setSearchField],
  [queryAction.setSearchValue, queryReducer_setSearchValue],
  [queryAction.setSortDirection, queryReducer_setSortDirection],
  [queryAction.setSortField, queryReducer_setSortField],
]);

type ModifyFilterChainInput = {
  comparisonOperator: string;
  field: string;
  index: number;
  logicalOperator: string;
  queryChainActions: QueryChainActions;
  queryLink: QueryLink;
  state: QueryState;
  value: string;
};

function modifyFilterChain({
  comparisonOperator,
  field,
  index,
  logicalOperator,
  queryChainActions,
  queryLink,
  state,
  value,
}: ModifyFilterChainInput) {
  const filterFieldsOperatorsValuesSetsMap = structuredClone(
    state.filterFieldsOperatorsValuesSetsMap
  );
  const logicalOperatorChainsMap = structuredClone(state.queryChains.filter);
  const filterChain = logicalOperatorChainsMap.get(logicalOperator);

  if (filterChain === undefined) {
    return state;
  }

  switch (queryChainActions) {
    case "delete": {
      filterChain.splice(index, 1);
      filterFieldsOperatorsValuesSetsMap.delete(field);
      logicalOperatorChainsMap.set(logicalOperator, filterChain);

      return {
        ...state,
        filterField: "createdAt",
        filterFieldsOperatorsValuesSetsMap,
        filterComparisonOperator: "equal to",
        filterValue: new Date().toISOString().split("T")[0],
        queryChains: {
          ...state.queryChains,
          filter: logicalOperatorChainsMap,
        },
      };
    }

    case "insert": {
      console.group("queryReducer_modifyQueryChains");
      console.log("filterChain", filterChain);
      console.log(
        "filterFieldsOperatorsValuesSetsMap",
        filterFieldsOperatorsValuesSetsMap
      );
      console.log("field", field);
      console.log("comparisonOperator", comparisonOperator);
      console.log("logicalOperator", logicalOperator);
      console.log("value", value);

      if (value === "") {
        console.log("value is empty");
        return state;
      }

      const operatorsValuesSets = filterFieldsOperatorsValuesSetsMap.get(field);

      // field is unique
      if (operatorsValuesSets === undefined) {
        filterChain.splice(index, 0, queryLink);
        filterFieldsOperatorsValuesSetsMap.set(field, {
          comparisonOperatorsSet: new Set([comparisonOperator]),
          valuesSet: new Set([value]),
        });

        console.log("field is unique");
        console.log("filterChain", filterChain);
        console.log("filterChain.length", filterChain.length);
        console.log("index", index);

        return {
          ...state,
          filterFieldsOperatorsValuesSetsMap,
          queryChains: {
            ...state.queryChains,
            filter: logicalOperatorChainsMap,
          },
        };
      }

      const { comparisonOperatorsSet, valuesSet } = operatorsValuesSets;

      // field exists, comparisonOperator is unique, value is unique
      if (!comparisonOperatorsSet.has(comparisonOperator) && !valuesSet.has(value)) {
        filterChain.splice(index, 0, queryLink);
        comparisonOperatorsSet.add(comparisonOperator);
        valuesSet.add(value);

        console.log("field exists, comparisonOperator is unique, value is unique");
        console.log("filterChain", filterChain);
      }

      // field exists, comparisonOperator is unique, value is unique
      if (!comparisonOperatorsSet.has(comparisonOperator) && !valuesSet.has(value)) {
        filterChain.splice(index, 0, queryLink);
        comparisonOperatorsSet.add(comparisonOperator);
        valuesSet.add(value);

        console.log("field exists, operator is unique, value is unique");
        console.log("filterChain", filterChain);
      }

      // field exists, operator is unique, value exists
      if (!comparisonOperatorsSet.has(comparisonOperator) && valuesSet.has(value)) {
        const index = filterChain.findIndex(
          ([field_, _, value_]: [string, string, string]) =>
            field_ === field && value_ === value
        );
        filterChain.splice(index, 1, queryLink);
        comparisonOperatorsSet.add(comparisonOperator);

        console.log("field exists, operator is unique, value exists");
        console.log("filterChain", filterChain);
      }

      // field exists, operator exists, value is unique
      if (comparisonOperatorsSet.has(comparisonOperator) && !valuesSet.has(value)) {
        const index = filterChain.findIndex(
          ([field_, comparisonOperator_, _]: [string, string, string]) =>
            field_ === field && comparisonOperator_ === comparisonOperator
        );
        filterChain.splice(index, 1, queryLink);
        valuesSet.add(value);

        console.log("field exists, operator exists, value is unique");
        console.log("filterChain", filterChain);
      }

      console.log("field exists, operator exists, value exists");
      console.log("filterChain", filterChain);
      console.groupEnd();

      filterFieldsOperatorsValuesSetsMap.set(field, {
        comparisonOperatorsSet,
        valuesSet,
      });
      logicalOperatorChainsMap.set(logicalOperator, filterChain);

      // field exists, operator exists, value exists
      return {
        ...state,
        filterFieldsOperatorsValuesSetsMap,
        queryChains: {
          ...state.queryChains,
          filter: logicalOperatorChainsMap,
        },
      };
    }

    case "slideDown": {
      const belowLink = filterChain[index + 1];
      const currentLink = filterChain[index];
      filterChain[index] = belowLink;
      filterChain[index + 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, filterChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, filter: logicalOperatorChainsMap },
      };
    }

    case "slideUp": {
      const aboveLink = filterChain[index - 1];
      const currentLink = filterChain[index];
      filterChain[index] = aboveLink;
      filterChain[index - 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, filterChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, filter: logicalOperatorChainsMap },
      };
    }

    default:
      return state;
  }
}

type ModifySearchChainInput = {
  field: string;
  index: number;
  logicalOperator: string;
  queryChainActions: QueryChainActions;
  queryLink: QueryLink;
  state: QueryState;
  value: string;
};

function modifySearchChain({
  field,
  index,
  logicalOperator,
  queryChainActions,
  queryLink,
  state,
  value,
}: ModifySearchChainInput): QueryState {
  const searchFieldsOperatorsValuesSetMap = structuredClone(
    state.searchFieldsOperatorsValuesSetMap
  );
  const logicalOperatorChainsMap = structuredClone(state.queryChains.search);
  const searchChain = logicalOperatorChainsMap.get(logicalOperator);

  if (searchChain === undefined) {
    return state;
  }

  switch (queryChainActions) {
    case "delete": {
      searchChain.splice(index, 1);
      searchFieldsOperatorsValuesSetMap.delete(field);
      logicalOperatorChainsMap.set(logicalOperator, searchChain);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          search: logicalOperatorChainsMap,
        },
        searchField: "username",
        searchFieldsOperatorsValuesSetMap,
        searchValue: "",
      };
    }

    case "insert": {
      console.group("queryReducer_modifySearchChain");
      console.log("searchChain", searchChain);
      console.log("field", field);
      console.log("value", value);

      if (value === "") {
        console.log("searchValue is empty");
        return state;
      }

      const valuesSet = searchFieldsOperatorsValuesSetMap.get(field);

      console.log(
        "state.searchFieldsOperatorsValuesSetMap",
        state.searchFieldsOperatorsValuesSetMap
      );
      console.log("valuesSet", valuesSet);

      // field is unique
      if (valuesSet === undefined) {
        searchChain.splice(index, 0, queryLink);
        searchFieldsOperatorsValuesSetMap.set(field, new Set([value]));

        console.log("field is unique");
        console.log("searchChain", searchChain);
        console.log("searchChain.length", searchChain.length);
        console.log("index", index);

        return {
          ...state,
          queryChains: {
            ...state.queryChains,
            search: logicalOperatorChainsMap,
          },
          searchFieldsOperatorsValuesSetMap,
        };
      }

      // field exists, value is unique
      if (!valuesSet.has(value)) {
        searchChain.splice(index, 0, queryLink);

        console.log("field exists, value is unique");
        console.log("searchChain", searchChain);
      }

      console.log("field exists, value exists");
      console.log("searchChain", searchChain);
      console.groupEnd();

      // field exists, value exists
      searchFieldsOperatorsValuesSetMap.set(field, valuesSet.add(value));
      logicalOperatorChainsMap.set(logicalOperator, searchChain);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          search: logicalOperatorChainsMap,
        },
        searchFieldsOperatorsValuesSetMap,
      };
    }

    case "slideDown": {
      const belowLink = searchChain[index + 1];
      const currentLink = searchChain[index];
      searchChain[index] = belowLink;
      searchChain[index + 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, searchChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, search: logicalOperatorChainsMap },
      };
    }

    case "slideUp": {
      const aboveLink = searchChain[index - 1];
      const currentLink = searchChain[index];
      searchChain[index] = aboveLink;
      searchChain[index - 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, searchChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, search: logicalOperatorChainsMap },
      };
    }

    default:
      return state;
  }
}

type ModifySortChainInput = {
  index: number;
  logicalOperator: string;
  queryChainActions: QueryChainActions;
  field: string;
  value: string;
  state: QueryState;
  queryLink: QueryLink;
};

function modifySortChain({
  index,
  logicalOperator,
  queryChainActions,
  field,
  value,
  state,
  queryLink,
}: ModifySortChainInput): QueryState {
  const sortFieldsSet = structuredClone(state.sortFieldsSet);
  const logicalOperatorChainsMap = structuredClone(state.queryChains.sort);
  const queryChain = logicalOperatorChainsMap.get(logicalOperator);

  if (queryChain === undefined) {
    return state;
  }

  switch (queryChainActions) {
    case "delete": {
      queryChain.splice(index, 1);
      sortFieldsSet.delete(field);

      logicalOperatorChainsMap.set(logicalOperator, queryChain);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          sort: logicalOperatorChainsMap,
        },
        sortField: "updatedAt",
        sortFieldsSet,
        sortDirection: "descending",
      };
    }

    case "insert": {
      console.group("queryReducer_modifySortChain");
      console.log("queryChain", queryChain);
      console.log("field", field);
      console.log("value", value);

      if (value === "") {
        console.log("value is empty");
        return state;
      }

      console.log("state.sortFieldsSet", state.sortFieldsSet);

      if (sortFieldsSet.has(field)) {
        const spliceIndex = queryChain.findIndex(
          ([field_, _, direction]: [string, string, string]) =>
            field_ === field && direction === value
        );
        queryChain.splice(spliceIndex, 1, queryLink);
      }

      queryChain.splice(index, 0, queryLink);
      sortFieldsSet.add(field);
      logicalOperatorChainsMap.set(logicalOperator, queryChain);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          sort: logicalOperatorChainsMap,
        },
        sortFieldsSet,
      };
    }

    case "slideDown": {
      const belowLink = queryChain[index + 1];
      const currentLink = queryChain[index];
      queryChain[index] = belowLink;
      queryChain[index + 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, queryChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, sort: logicalOperatorChainsMap },
      };
    }

    case "slideUp": {
      const aboveLink = queryChain[index - 1];
      const currentLink = queryChain[index];
      queryChain[index] = aboveLink;
      queryChain[index - 1] = currentLink;
      logicalOperatorChainsMap.set(logicalOperator, queryChain);

      return {
        ...state,
        queryChains: { ...state.queryChains, sort: logicalOperatorChainsMap },
      };
    }

    default:
      return state;
  }
}

function queryReducer_modifyQueryChains(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, logicalOperator, queryChainActions, queryLink, queryChainKind } =
    dispatch.payload as ModifyQueryChainPayload;
  const [field, comparisonOperator, value] = queryLink;

  switch (queryChainKind) {
    case "filter": {
      return modifyFilterChain({
        comparisonOperator,
        field,
        index,
        logicalOperator,
        queryChainActions,
        queryLink,
        state,
        value,
      });
    }

    case "search": {
      return modifySearchChain({
        field,
        index,
        logicalOperator,
        queryChainActions,
        queryLink,
        state,
        value,
      });
    }

    case "sort": {
      return modifySortChain({
        field,
        index,
        logicalOperator,
        queryChainActions,
        queryLink,
        state,
        value,
      });
    }

    default:
      return state;
  }
}

function queryReducer_setFilterField(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { fieldNamesOperatorsTypesMap, value, selectInputsDataMap } =
    dispatch.payload as QueryFilterPayload;
  const filterField = value;
  const operatorTypes = fieldNamesOperatorsTypesMap.get(value);
  const selectInputData = selectInputsDataMap.get(value);

  console.group("queryReducer_setFilterField");
  console.log({ filterField, operatorTypes, selectInputData });
  console.groupEnd();

  if (operatorTypes === undefined) {
    return { ...state, filterField, filterComparisonOperator: "in", filterValue: "" };
  }

  if (selectInputData === undefined) {
    return {
      ...state,
      filterField,
      filterComparisonOperator: operatorTypes.operators[0].label,
      filterValue: new Date().toISOString().split("T")[0],
    };
  }

  const { operators } = operatorTypes;
  const filterComparisonOperator = operators[0].label;
  const filterValue = selectInputData[0].value;

  return {
    ...state,
    filterField,
    filterComparisonOperator,
    filterValue,
  };
}

function queryReducer_setFilterComparisonOperator(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { value } = dispatch.payload as QueryFilterPayload;
  return { ...state, filterComparisonOperator: value };
}

function queryReducer_setFilterComparisonOperatorSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterComparisonOperatorSelectData: dispatch.payload as string[] };
}

function queryReducer_setFilterValue(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { value } = dispatch.payload as QueryFilterPayload;
  return { ...state, filterValue: value };
}

function queryReducer_setGeneralSearchCase(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, generalSearchCase: dispatch.payload as GeneralSearchCase };
}

function queryReducer_setGeneralSearchExclusionValue(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, generalSearchExclusionValue: dispatch.payload as string };
}

function queryReducer_setGeneralSearchInclusionValue(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, generalSearchInclusionValue: dispatch.payload as string };
}

function queryReducer_setIsError(state: QueryState, dispatch: QueryDispatch): QueryState {
  const { kind } = dispatch.payload as SetPageInErrorPayload;
  return { ...state, isError: kind === "add" };
}

function queryReducer_setIsFilterOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isFilterOpened: dispatch.payload as boolean };
}

function queryReducer_setIsProjectionOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isProjectionOpened: dispatch.payload as boolean };
}

function queryReducer_setIsQueryOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isQueryOpened: dispatch.payload as boolean };
}

function queryReducer_setIsQueryChainOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isQueryChainOpened: dispatch.payload as boolean };
}

function queryReducer_setIsSearchDisabled(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isSearchDisabled: dispatch.payload as boolean };
}

function queryReducer_setIsSearchOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isSearchOpened: dispatch.payload as boolean };
}

function queryReducer_setIsSortOpened(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isSortOpened: dispatch.payload as boolean };
}

function queryReducer_setProjectionExclusionFields(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, projectionExclusionFields: dispatch.payload as string[] };
}

function queryReducer_setSearchField(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, searchField: dispatch.payload as string };
}

function queryReducer_setSearchValue(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, searchValue: dispatch.payload as string };
}

function queryReducer_setSortDirection(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, sortDirection: dispatch.payload as SortDirection };
}

function queryReducer_setSortField(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, sortField: dispatch.payload as string };
}

export { queryReducer };
