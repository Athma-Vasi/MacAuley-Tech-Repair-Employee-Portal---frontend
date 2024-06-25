import { SetPageInErrorPayload } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
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
  [queryAction.setFilterOperator, queryReducer_setFilterOperator],
  [queryAction.setFilterOperatorSelectData, queryReducer_setFilterOperatorSelectData],
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
  [queryAction.setProjectedFieldsSet, queryReducer_setProjectedFieldsSet],
  [queryAction.setProjectionFields, queryReducer_setProjectionFields],
  [queryAction.setSearchField, queryReducer_setSearchField],
  [queryAction.setSearchValue, queryReducer_setSearchValue],
  [queryAction.setSelectedFieldsSet, queryReducer_setSelectedFieldsSet],
  [queryAction.setSortDirection, queryReducer_setSortDirection],
  [queryAction.setSortField, queryReducer_setSortField],
]);

type ModifyFilterChainInput = {
  filterChain: QueryChain;
  filterFieldsOperatorsValuesSetsMap: Map<
    string,
    { operatorsSet: Set<string>; valuesSet: Set<string> }
  >;
  index: number;
  queryChainActions: QueryChainActions;
  queryField: string;
  queryOperator: string;
  queryValue: string;
  state: QueryState;
  value: QueryLink;
};

function modifyFilterChain({
  filterChain,
  filterFieldsOperatorsValuesSetsMap,
  index,
  queryChainActions,
  queryField,
  queryOperator,
  queryValue,
  state,
  value,
}: ModifyFilterChainInput) {
  switch (queryChainActions) {
    case "delete": {
      filterChain.splice(index, 1);
      filterFieldsOperatorsValuesSetsMap.delete(queryField);

      return {
        ...state,
        filterField: "createdAt",
        filterFieldsOperatorsValuesSetsMap,
        filterOperator: "equal to",
        filterValue: new Date().toISOString().split("T")[0],
        queryChains: {
          ...state.queryChains,
          filter: filterChain,
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
      console.log("queryField", queryField);
      console.log("queryOperator", queryOperator);
      console.log("queryValue", queryValue);

      if (queryValue === "") {
        console.log("queryValue is empty");
        return state;
      }

      const operatorsValuesSets = filterFieldsOperatorsValuesSetsMap.get(queryField);

      // field is unique
      if (operatorsValuesSets === undefined) {
        filterChain.splice(index, 0, value);
        filterFieldsOperatorsValuesSetsMap.set(queryField, {
          operatorsSet: new Set([queryOperator]),
          valuesSet: new Set([queryValue]),
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
            filter: filterChain,
          },
        };
      }

      const { operatorsSet, valuesSet } = operatorsValuesSets;

      // field exists, operator is unique, value is unique
      if (!operatorsSet.has(queryOperator) && !valuesSet.has(queryValue)) {
        filterChain.splice(index, 0, value);
        operatorsSet.add(queryOperator);
        valuesSet.add(queryValue);

        console.log("field exists, operator is unique, value is unique");
        console.log("filterChain", filterChain);
      }

      // field exists, operator is unique, value exists
      if (!operatorsSet.has(queryOperator) && valuesSet.has(queryValue)) {
        const index = filterChain.findIndex(
          ([field, _, value]: [string, string, string]) =>
            field === queryField && value === queryValue
        );
        filterChain.splice(index, 1, value);
        operatorsSet.add(queryOperator);

        console.log("field exists, operator is unique, value exists");
        console.log("filterChain", filterChain);
      }

      // field exists, operator exists, value is unique
      if (operatorsSet.has(queryOperator) && !valuesSet.has(queryValue)) {
        const index = filterChain.findIndex(
          ([field, operator, _]: [string, string, string]) =>
            field === queryField && operator === queryOperator
        );
        filterChain.splice(index, 1, value);
        valuesSet.add(queryValue);

        console.log("field exists, operator exists, value is unique");
        console.log("filterChain", filterChain);
      }

      console.log("field exists, operator exists, value exists");
      console.log("filterChain", filterChain);
      console.groupEnd();

      filterFieldsOperatorsValuesSetsMap.set(queryField, {
        operatorsSet,
        valuesSet,
      });
      // field exists, operator exists, value exists
      return {
        ...state,
        filterFieldsOperatorsValuesSetsMap,
        queryChains: {
          ...state.queryChains,
          filter: filterChain,
        },
      };
    }

    case "slideDown": {
      const belowLink = filterChain[index + 1];
      const currentLink = filterChain[index];
      filterChain[index] = belowLink;
      filterChain[index + 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, filter: filterChain } };
    }

    case "slideUp": {
      const aboveLink = filterChain[index - 1];
      const currentLink = filterChain[index];
      filterChain[index] = aboveLink;
      filterChain[index - 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, filter: filterChain } };
    }

    default:
      return state;
  }
}

type ModifySearchChainInput = {
  index: number;
  queryChainActions: QueryChainActions;
  queryField: string;
  queryValue: string;
  searchChain: QueryChain;
  searchFieldsValuesSetMap: SearchFieldsValuesSetMap;
  state: QueryState;
  value: QueryLink;
};

function modifySearchChain({
  index,
  queryChainActions,
  queryField,
  queryValue,
  searchChain,
  searchFieldsValuesSetMap,
  state,
  value,
}: ModifySearchChainInput) {
  switch (queryChainActions) {
    case "delete": {
      searchChain.splice(index, 1);
      searchFieldsValuesSetMap.delete(queryField);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          search: searchChain,
        },
        searchField: "username",
        searchFieldsValuesSetMap,
        searchValue: "",
      };
    }

    case "insert": {
      console.group("queryReducer_modifySearchChain");
      console.log("searchChain", searchChain);
      console.log("queryField", queryField);
      console.log("queryValue", queryValue);

      if (queryValue === "") {
        console.log("searchValue is empty");
        return state;
      }

      const valuesSet = searchFieldsValuesSetMap.get(queryField);

      console.log("state.searchFieldsValuesSetMap", state.searchFieldsValuesSetMap);
      console.log("valuesSet", valuesSet);

      // field is unique
      if (valuesSet === undefined) {
        searchChain.splice(index, 0, value);
        searchFieldsValuesSetMap.set(queryField, new Set([queryValue]));

        console.log("field is unique");
        console.log("searchChain", searchChain);
        console.log("searchChain.length", searchChain.length);
        console.log("index", index);

        return {
          ...state,
          queryChains: {
            ...state.queryChains,
            search: searchChain,
          },
          searchFieldsValuesSetMap,
        };
      }

      // field exists, value is unique
      if (!valuesSet.has(queryValue)) {
        searchChain.splice(index, 0, value);

        console.log("field exists, value is unique");
        console.log("searchChain", searchChain);
      }

      console.log("field exists, value exists");
      console.log("searchChain", searchChain);
      console.groupEnd();

      // field exists, value exists
      searchFieldsValuesSetMap.set(queryField, valuesSet.add(queryValue));

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          search: searchChain,
        },
        searchFieldsValuesSetMap,
      };
    }

    case "slideDown": {
      const belowLink = searchChain[index + 1];
      const currentLink = searchChain[index];
      searchChain[index] = belowLink;
      searchChain[index + 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, search: searchChain } };
    }

    case "slideUp": {
      const aboveLink = searchChain[index - 1];
      const currentLink = searchChain[index];
      searchChain[index] = aboveLink;
      searchChain[index - 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, search: searchChain } };
    }

    default:
      return state;
  }
}

type ModifySortChainInput = {
  index: number;
  queryChainActions: QueryChainActions;
  queryField: string;
  queryValue: string;
  sortChain: QueryChain;
  sortFieldsSet: Set<string>;
  state: QueryState;
  value: QueryLink;
};

function modifySortChain({
  index,
  queryChainActions,
  queryField,
  queryValue,
  sortChain,
  sortFieldsSet,
  state,
  value,
}: ModifySortChainInput): QueryState {
  switch (queryChainActions) {
    case "delete": {
      sortChain.splice(index, 1);
      sortFieldsSet.delete(queryField);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          sort: sortChain,
        },
        sortField: "updatedAt",
        sortFieldsSet,
        sortDirection: "descending",
      };
    }

    case "insert": {
      console.group("queryReducer_modifySortChain");
      console.log("sortChain", sortChain);
      console.log("queryField", queryField);
      console.log("queryValue", queryValue);

      if (queryValue === "") {
        console.log("queryValue is empty");
        return state;
      }

      console.log("state.sortFieldsSet", state.sortFieldsSet);

      if (sortFieldsSet.has(queryField)) {
        const spliceIndex = sortChain.findIndex(
          ([field, _, direction]: [string, string, string]) =>
            field === queryField && direction === queryValue
        );
        sortChain.splice(spliceIndex, 1, value);
      }

      sortChain.splice(index, 0, value);
      sortFieldsSet.add(queryField);

      return {
        ...state,
        queryChains: {
          ...state.queryChains,
          sort: sortChain,
        },
        sortFieldsSet,
      };
    }

    case "slideDown": {
      const belowLink = sortChain[index + 1];
      const currentLink = sortChain[index];
      sortChain[index] = belowLink;
      sortChain[index + 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, sort: sortChain } };
    }

    case "slideUp": {
      const aboveLink = sortChain[index - 1];
      const currentLink = sortChain[index];
      sortChain[index] = aboveLink;
      sortChain[index - 1] = currentLink;

      return { ...state, queryChains: { ...state.queryChains, sort: sortChain } };
    }

    default:
      return state;
  }
}

function queryReducer_modifyQueryChains(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, queryChainActions, value, queryChainKind } =
    dispatch.payload as ModifyQueryChainPayload;
  const [queryField, queryOperator, queryValue] = value;
  const {
    filter: filterChain,
    search: searchChain,
    sort: sortChain,
  } = structuredClone(state.queryChains);

  switch (queryChainKind) {
    case "filter": {
      return modifyFilterChain({
        filterChain,
        filterFieldsOperatorsValuesSetsMap: structuredClone(
          state.filterFieldsOperatorsValuesSetsMap
        ),
        index,
        queryChainActions,
        queryField,
        queryOperator,
        queryValue,
        state,
        value,
      });
    }

    case "search": {
      return modifySearchChain({
        index,
        queryChainActions,
        queryField,
        queryValue,
        searchChain,
        searchFieldsValuesSetMap: structuredClone(state.searchFieldsValuesSetMap),
        state,
        value,
      });
    }

    case "sort": {
      const sortFieldsSet = structuredClone(state.sortFieldsSet);

      return modifySortChain({
        index,
        queryChainActions,
        queryField,
        queryValue,
        sortChain,
        sortFieldsSet,
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
    return { ...state, filterField, filterOperator: "in", filterValue: "" };
  }

  if (selectInputData === undefined) {
    return {
      ...state,
      filterField,
      filterOperator: operatorTypes.operators[0].label,
      filterValue: new Date().toISOString().split("T")[0],
    };
  }

  const { operators } = operatorTypes;
  const filterOperator = operators[0].label;
  const filterValue = selectInputData[0].value;

  return {
    ...state,
    filterField,
    filterOperator,
    filterValue,
  };
}

function queryReducer_setFilterOperator(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { value } = dispatch.payload as QueryFilterPayload;
  return { ...state, filterOperator: value };
}

function queryReducer_setFilterOperatorSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterOperatorSelectData: dispatch.payload as string[] };
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

function queryReducer_setProjectedFieldsSet(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, projectedFieldsSet: dispatch.payload as Set<string> };
}

function queryReducer_setProjectionFields(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, projectionFields: dispatch.payload as string[] };
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

function queryReducer_setSelectedFieldsSet(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  //   const selectedFieldsSet = new Set(state.selectedFieldsSet);

  //   return { ...state, selectedFieldsSet };
  return state;
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
