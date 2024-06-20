import { CheckboxInputData, SetPageInErrorPayload } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
  QueryDispatch,
  QueryState,
  SetFilterStatementsPayload,
  SetSearchStatementsPayload,
  SetSortStatementsPayload,
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
  [queryAction.modifyFilterChains, queryReducer_modifyFilterStatements],
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
  [queryAction.setSearchStatements, queryReducer_setSearchStatements],
  [queryAction.setSearchValue, queryReducer_setSearchValue],
  [queryAction.setSelectedFieldsSet, queryReducer_setSelectedFieldsSet],
  [queryAction.setSortDirection, queryReducer_setSortDirection],
  [queryAction.setSortField, queryReducer_setSortField],
  [queryAction.setSortStatements, queryReducer_setSortStatements],
]);

function queryReducer_setFilterField(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterField: dispatch.payload as string };
}

function queryReducer_setFilterOperator(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterOperator: dispatch.payload as string };
}

function queryReducer_setFilterOperatorSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterOperatorSelectData: dispatch.payload as string[] };
}

function queryReducer_modifyFilterStatements(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetFilterStatementsPayload;
  const filterStatements = [...state.filterStatements];

  return { ...state, filterStatements };
}

function queryReducer_setFilterValue(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterValue: dispatch.payload as string };
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

function queryReducer_setSearchStatements(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetSearchStatementsPayload;
  const searchStatements = [...state.searchStatements];

  return { ...state, searchStatements };
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

function queryReducer_setSortStatements(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetSortStatementsPayload;
  const sortStatements = [...state.sortStatements];

  return { ...state, sortStatements };
}

export { queryReducer };
