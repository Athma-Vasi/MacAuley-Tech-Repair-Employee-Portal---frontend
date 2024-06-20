import { CheckboxRadioSelectData } from "../../types";
import { QueryState } from "./types";

function createInitialQueryState(
  searchFieldSelectData: CheckboxRadioSelectData
): QueryState {
  const initialQueryState: QueryState = {
    // date input type is guaranteed to exist (all schemas have createdAt & updatedAt)
    filterField: "createdAt",
    filterOperator: "equal to",
    filterOperatorSelectData: [],
    filterChain: [],
    filterValue: new Date().toISOString().split("T")[0],
    generalSearchExclusionValue: "",
    generalSearchInclusionValue: "",
    isError: false,
    isFilterOpened: false,
    isGeneralSearchCaseSensitive: false,
    isProjectionOpened: false,
    isQueryOpened: false,
    isSearchDisabled: false,
    isSearchOpened: false,
    isSortOpened: false,
    limitPerPage: 10,
    projectedFieldsSet: new Set(),
    projectionArray: [],
    searchField: "",
    searchChain: [],
    searchValue: "",
    selectedFieldsSet: new Set(),
    sortDirection: "descending",
    sortField: "updatedAt",
    sortChain: [],
  };

  function setSearchDefaults(
    queryState: QueryState,
    searchFieldSelectData: CheckboxRadioSelectData
  ): QueryState {
    // all but one model has username field
    const searchField =
      searchFieldSelectData.find((field) => field.label === "username")?.label ??
      searchFieldSelectData[0].label;

    return {
      ...queryState,
      searchField,
    };
  }

  return setSearchDefaults(initialQueryState, searchFieldSelectData);
}

export { createInitialQueryState };
