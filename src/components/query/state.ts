import { QueryState } from "./types";

const initialQueryState: QueryState = {
  filterOperatorSelectData: [],
  filterSelectData: [],
  filterStatements: [],
  generalSearchExclusionValue: "",
  generalSearchInclusionValue: "",
  isFilterOpened: false,
  isGeneralSearchCaseSensitive: false,
  isProjectionOpened: false,
  isQueryOpened: false,
  isSearchOpened: false,
  isSortOpened: false,
  limitPerPage: 10,
  projectedFieldsSet: new Set(),
  projectionArray: [],
  projectionCheckboxData: [],
  searchSelectData: [],
  searchStatements: [],
  selectedFieldsSet: new Set(),
  sortSelectData: [],
  sortStatements: [],
};

export { initialQueryState };
