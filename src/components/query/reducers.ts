import { SetPageInErrorPayload } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
  QueryDispatch,
  QueryFilterPayload,
  QueryState,
  SetFilterChainPayload,
  SetSearchChainPayload,
  SetSortChainPayload,
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
  [queryAction.setFilterField, queryReducer_setFilterField],
  [queryAction.setFilterOperator, queryReducer_setFilterOperator],
  [queryAction.setFilterOperatorSelectData, queryReducer_setFilterOperatorSelectData],
  [queryAction.modifyFilterChain, queryReducer_modifyFilterChain],
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
  [queryAction.setProjectionArray, queryReducer_setProjectionArray],
  [queryAction.setSearchField, queryReducer_setSearchField],
  [queryAction.setSearchChain, queryReducer_setSearchChain],
  [queryAction.setSearchValue, queryReducer_setSearchValue],
  [queryAction.setSelectedFieldsSet, queryReducer_setSelectedFieldsSet],
  [queryAction.setSortDirection, queryReducer_setSortDirection],
  [queryAction.setSortField, queryReducer_setSortField],
  [queryAction.setSortChain, queryReducer_setSortChain],
]);

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

  if (!operatorTypes) {
    return { ...state, filterField, filterOperator: "In" };
  }

  if (selectInputData) {
    return {
      ...state,
      filterField,
      filterOperator: selectInputData[0].value,
      filterValue: selectInputData[0].value,
    };
  } else {
    const { operators } = operatorTypes;
    const filterOperator = operators[0].label;

    return {
      ...state,
      filterField,
      filterOperator,
      filterValue: new Date().toISOString().split("T")[0],
    };
  }
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

function queryReducer_modifyFilterChain(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetFilterChainPayload;
  const [filterField, filterOperator, filterValue] = value;
  const filterChain = structuredClone(state.filterChain);

  const fieldsSetsMap = filterChain.reduce(
    (
      mapAcc: Map<string, { operatorsSet: Set<string>; valuesSet: Set<string> }>,
      link: [string, string, string]
    ) => {
      const [field, operator, value] = link;
      const { operatorsSet, valuesSet } = mapAcc.get(field) ?? {
        operatorsSet: new Set(),
        valuesSet: new Set(),
      };
      operatorsSet.add(operator);
      valuesSet.add(value);
      mapAcc.set(field, { operatorsSet, valuesSet });

      return mapAcc;
    },
    new Map<string, { operatorsSet: Set<string>; valuesSet: Set<string> }>()
  );

  switch (kind) {
    case "insert": {
      if (filterValue === "") {
        return state;
      }

      const fieldSets = fieldsSetsMap.get(filterField);

      // field is unique
      if (!fieldSets) {
        filterChain.push(value);
        return { ...state, filterChain };
      }

      const { operatorsSet, valuesSet } = fieldSets;

      // field exists, operator is unique, value is unique
      if (!operatorsSet.has(filterOperator) && !valuesSet.has(filterValue)) {
        filterChain.push(value);
        return { ...state, filterChain };
      }

      // field exists, operator is unique, value exists
      if (!operatorsSet.has(filterOperator) && valuesSet.has(filterValue)) {
        // find the first link with the same field and value
        const index = filterChain.findIndex(
          ([field, _, value]: [string, string, string]) =>
            field === filterField && value === filterValue
        );
        filterChain.splice(index, 1, value);
        return { ...state, filterChain };
      }

      // field exists, operator exists, value is unique
      if (operatorsSet.has(filterOperator) && !valuesSet.has(filterValue)) {
        // find the first link with the same field and operator
        const index = filterChain.findIndex(
          ([field, operator, _]: [string, string, string]) =>
            field === filterField && operator === filterOperator
        );
        filterChain.splice(index, 1, value);
        return { ...state, filterChain };
      }

      // field exists, operator exists, value exists
      return { ...state, filterChain: Array.from(new Set(filterChain)) };
    }

    case "delete": {
      filterChain.splice(index, 1);
      return { ...state, filterChain };
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

function queryReducer_setProjectionArray(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, projectionArray: dispatch.payload as string[] };
}

function queryReducer_setSearchField(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, searchField: dispatch.payload as string };
}

function queryReducer_setSearchChain(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetSearchChainPayload;
  const searchChain = [...state.searchChain];

  return { ...state, searchChain };
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
  const { index, kind, value } = dispatch.payload as SetSortChainPayload;
  const sortChain = [...state.sortChain];

  return { ...state, sortChain };
}

export { queryReducer };
