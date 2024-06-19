import { CheckboxInputData } from "../../types";
import { QueryAction, queryAction } from "./actions";
import {
  QueryDispatch,
  QueryState,
  SetFilterStatementsPayload,
  SetSearchStatementsPayload,
  SetSortStatementsPayload,
} from "./types";

function queryReducer(state: QueryState, dispatch: QueryDispatch): QueryState {
  const reducer = queryReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const queryReducers = new Map<
  QueryAction[keyof QueryAction],
  (state: QueryState, dispatch: QueryDispatch) => QueryState
>([
  [queryAction.setFilterOperatorSelectData, queryReducer_setFilterOperatorSelectData],
  [queryAction.setFilterSelectData, queryReducer_setFilterSelectData],
  [queryAction.setFilterStatements, queryReducer_setFilterStatements],
  [
    queryAction.setGeneralSearchExclusionValue,
    queryReducer_setGeneralSearchExclusionValue,
  ],
  [
    queryAction.setGeneralSearchInclusionValue,
    queryReducer_setGeneralSearchInclusionValue,
  ],
  [queryAction.setIsFilterOpened, queryReducer_setIsFilterOpened],
  [
    queryAction.setIsGeneralSearchCaseSensitive,
    queryReducer_setIsGeneralSearchCaseSensitive,
  ],
  [queryAction.setIsProjectionOpened, queryReducer_setIsProjectionOpened],
  [queryAction.setIsQueryOpened, queryReducer_setIsQueryOpened],
  [queryAction.setIsSearchOpened, queryReducer_setIsSearchOpened],
  [queryAction.setIsSortOpened, queryReducer_setIsSortOpened],
  [queryAction.setProjectedFieldsSet, queryReducer_setProjectedFieldsSet],
  [queryAction.setProjectionArray, queryReducer_setProjectionArray],
  [queryAction.setProjectionCheckboxData, queryReducer_setProjectionCheckboxData],
  [queryAction.setSearchSelectData, queryReducer_setSearchSelectData],
  [queryAction.setSearchStatements, queryReducer_setSearchStatements],
  [queryAction.setSelectedFieldsSet, queryReducer_setSelectedFieldsSet],
  [queryAction.setSortSelectData, queryReducer_setSortSelectData],
  [queryAction.setSortStatements, queryReducer_setSortStatements],
]);

/**
 * type QueryState = {
  filterOperatorSelectData: string[];
  filterSelectData: string[];
  filterStatements: [string, string, string][]; // [field, operator, value][]
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  isFilterOpened: boolean;
  isGeneralSearchCaseSensitive: boolean;
  isProjectionOpened: boolean;
  isQueryOpened: boolean;
  isSearchOpened: boolean;
  isSortOpened: boolean;
  projectedFieldsSet: Set<string>;
  projectionArray: string[];
  projectionCheckboxData: CheckboxInputData;
  searchSelectData: string[];
  searchStatements: [string, string][]; // [field, value][]
  selectedFieldsSet: Set<string>;
  sortSelectData: string[];
  sortStatements: [string, string][]; // [field, direction][]
};
 */

function queryReducer_setFilterOperatorSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterOperatorSelectData: dispatch.payload as string[] };
}

function queryReducer_setFilterSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, filterSelectData: dispatch.payload as string[] };
}

function queryReducer_setFilterStatements(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetFilterStatementsPayload;
  const filterStatements = [...state.filterStatements];

  return { ...state, filterStatements };
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

function queryReducer_setProjectionCheckboxData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, projectionCheckboxData: dispatch.payload as CheckboxInputData };
}

function queryReducer_setSearchSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, searchSelectData: dispatch.payload as string[] };
}

function queryReducer_setSearchStatements(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  const { index, kind, value } = dispatch.payload as SetSearchStatementsPayload;
  const searchStatements = [...state.searchStatements];

  return { ...state, searchStatements };
}

function queryReducer_setSelectedFieldsSet(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  //   const selectedFieldsSet = new Set(state.selectedFieldsSet);

  //   return { ...state, selectedFieldsSet };
  return state;
}

function queryReducer_setSortSelectData(
  state: QueryState,
  dispatch: QueryDispatch
): QueryState {
  return { ...state, sortSelectData: dispatch.payload as string[] };
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
