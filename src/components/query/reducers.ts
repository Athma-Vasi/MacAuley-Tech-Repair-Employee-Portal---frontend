import { CheckboxRadioSelectData, SetPageInErrorPayload } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
  QueryDispatch,
  QueryFilterPayload,
  QueryState,
  ModifyFilterChainPayload,
  ModifySearchChainPayload,
  ModifySortChainPayload,
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
  [queryAction.modifyFilterChain, queryReducer_modifyFilterChain],
  [queryAction.modifySearchChain, queryReducer_modifySearchChain],
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
  [
    queryAction.setIsGeneralSearchCaseSensitive,
    queryReducer_setIsGeneralSearchCaseSensitive,
  ],
  [queryAction.setIsProjectionOpened, queryReducer_setIsProjectionOpened],
  [queryAction.setIsQueryOpened, queryReducer_setIsQueryOpened],
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
  [queryAction.setSortChain, queryReducer_setSortChain],
]);

function queryReducer_modifyFilterChain(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as ModifyFilterChainPayload;
  const [filterField, filterOperator, filterValue] = value;
  const filterChain = structuredClone(state.filterChain);
  const filterFieldsOperatorsValuesSetsMap = structuredClone(
    state.filterFieldsOperatorsValuesSetsMap
  );

  switch (kind) {
    case "delete": {
      filterChain.splice(index, 1);

      filterFieldsOperatorsValuesSetsMap.delete(filterField);

      return {
        ...state,
        filterChain,
        filterField: "createdAt",
        filterFieldsOperatorsValuesSetsMap,
        filterOperator: "equal to",
        filterValue: new Date().toISOString().split("T")[0],
      };
    }

    case "insert": {
      console.group("queryReducer_modifyFilterChain");
      console.log("filterChain", filterChain);
      console.log(
        "filterFieldsOperatorsValuesSetsMap",
        filterFieldsOperatorsValuesSetsMap
      );
      console.log("filterField", filterField);
      console.log("filterOperator", filterOperator);
      console.log("filterValue", filterValue);

      if (filterValue === "") {
        console.log("filterValue is empty");
        return state;
      }

      const operatorsValuesSets = filterFieldsOperatorsValuesSetsMap.get(filterField);

      // field is unique
      if (operatorsValuesSets === undefined) {
        filterChain.splice(index, 0, value);
        filterFieldsOperatorsValuesSetsMap.set(filterField, {
          operatorsSet: new Set([filterOperator]),
          valuesSet: new Set([filterValue]),
        });
        console.log("field is unique");
        console.log("filterChain", filterChain);
        console.log("filterChain.length", filterChain.length);
        console.log("index", index);
        return { ...state, filterChain, filterFieldsOperatorsValuesSetsMap };
      }

      const { operatorsSet, valuesSet } = operatorsValuesSets;

      // field exists, operator is unique, value is unique
      if (!operatorsSet.has(filterOperator) && !valuesSet.has(filterValue)) {
        filterChain.splice(index, 0, value);
        operatorsSet.add(filterOperator);
        valuesSet.add(filterValue);

        console.log("field exists, operator is unique, value is unique");
        console.log("filterChain", filterChain);
      }

      // field exists, operator is unique, value exists
      if (!operatorsSet.has(filterOperator) && valuesSet.has(filterValue)) {
        const index = filterChain.findIndex(
          ([field, _, value]: [string, string, string]) =>
            field === filterField && value === filterValue
        );
        filterChain.splice(index, 1, value);
        operatorsSet.add(filterOperator);

        console.log("field exists, operator is unique, value exists");
        console.log("filterChain", filterChain);
      }

      // field exists, operator exists, value is unique
      if (operatorsSet.has(filterOperator) && !valuesSet.has(filterValue)) {
        const index = filterChain.findIndex(
          ([field, operator, _]: [string, string, string]) =>
            field === filterField && operator === filterOperator
        );
        filterChain.splice(index, 1, value);
        valuesSet.add(filterValue);
        console.log("field exists, operator exists, value is unique");
        console.log("filterChain", filterChain);
      }

      console.log("field exists, operator exists, value exists");
      console.log("filterChain", filterChain);
      console.groupEnd();

      filterFieldsOperatorsValuesSetsMap.set(filterField, {
        operatorsSet,
        valuesSet,
      });
      // field exists, operator exists, value exists
      return { ...state, filterChain, filterFieldsOperatorsValuesSetsMap };
    }

    case "slideDown": {
      const belowLink = filterChain[index + 1];
      const currentLink = filterChain[index];
      filterChain[index] = belowLink;
      filterChain[index + 1] = currentLink;
      return { ...state, filterChain };
    }

    case "slideUp": {
      const aboveLink = filterChain[index - 1];
      const currentLink = filterChain[index];
      filterChain[index] = aboveLink;
      filterChain[index - 1] = currentLink;
      return { ...state, filterChain };
    }

    default:
      return state;
  }
}

function queryReducer_modifySearchChain(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as ModifySearchChainPayload;
  const [searchField, searchValue] = value;

  const searchChain = structuredClone(state.searchChain);
  const searchFieldsValuesSetMap = structuredClone(state.searchFieldsValuesSetMap);

  switch (kind) {
    case "delete": {
      searchChain.splice(index, 1);
      searchFieldsValuesSetMap.delete(searchField);

      return {
        ...state,
        searchChain,
        searchField: "username",
        searchFieldsValuesSetMap,
        searchValue: "",
      };
    }

    case "insert": {
      console.group("queryReducer_modifySearchChain");
      console.log("searchChain", searchChain);
      console.log("searchField", searchField);
      console.log("searchValue", searchValue);

      if (searchValue === "") {
        console.log("searchValue is empty");
        return state;
      }

      const valuesSet = searchFieldsValuesSetMap.get(searchField);

      console.log("state.searchFieldsValuesSetMap", state.searchFieldsValuesSetMap);
      console.log("valuesSet", valuesSet);

      // field is unique
      if (valuesSet === undefined) {
        searchChain.splice(index, 0, value);
        searchFieldsValuesSetMap.set(searchField, new Set([searchValue]));
        console.log("field is unique");
        console.log("searchChain", searchChain);
        console.log("searchChain.length", searchChain.length);
        console.log("index", index);
        return { ...state, searchChain, searchFieldsValuesSetMap };
      }

      // field exists, value is unique
      if (!valuesSet.has(searchValue)) {
        searchChain.splice(index, 0, value);
        console.log("field exists, value is unique");
        console.log("searchChain", searchChain);
      }

      console.log("field exists, value exists");
      console.log("searchChain", searchChain);
      console.groupEnd();
      // field exists, value exists
      searchFieldsValuesSetMap.set(searchField, valuesSet.add(searchValue));
      return { ...state, searchChain, searchFieldsValuesSetMap };
    }

    case "slideDown": {
      const belowLink = searchChain[index + 1];
      const currentLink = searchChain[index];
      searchChain[index] = belowLink;
      searchChain[index + 1] = currentLink;
      return { ...state, searchChain };
    }

    case "slideUp": {
      const aboveLink = searchChain[index - 1];
      const currentLink = searchChain[index];
      searchChain[index] = aboveLink;
      searchChain[index - 1] = currentLink;
      return { ...state, searchChain };
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

function queryReducer_setIsGeneralSearchCaseSensitive(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, isGeneralSearchCaseSensitive: dispatch.payload as boolean };
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

function queryReducer_setSortChain(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as ModifySortChainPayload;
  const sortChain = [...state.sortChain];

  return { ...state, sortChain };
}

export { queryReducer };
