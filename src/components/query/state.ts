import { CheckboxRadioSelectData } from "../../types";
import { FilterFieldsOperatorsValuesSetsMap, QueryState } from "./types";

function createInitialQueryState(
  projectionCheckboxData: CheckboxRadioSelectData,
  searchFieldSelectData: CheckboxRadioSelectData
): QueryState {
  const filterFieldsOperatorsValuesSetsMap = new Map([
    ["createdAt", { operatorsSet: new Set(), valuesSet: new Set() }],
  ]) as FilterFieldsOperatorsValuesSetsMap;

  const initialQueryState: QueryState = {
    // date input type is guaranteed to exist (all schemas have createdAt & updatedAt)
    filterField: "createdAt",
    filterFieldsOperatorsValuesSetsMap,
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
    projectionFields: [],
    searchField: searchFieldSelectData[0].value,
    searchFieldsValuesSetMap: new Map([[searchFieldSelectData[0].value, new Set()]]),
    searchChain: [],
    searchValue: "",
    selectedFieldsSet: new Set(),
    sortDirection: "descending",
    sortField: "updatedAt",
    sortChain: [],
  };

  // function setSearchDefaults(
  //   queryState: QueryState,
  //   searchFieldSelectData: CheckboxRadioSelectData
  // ): QueryState {
  //   // all but one model has username field
  //   const searchField =
  //     searchFieldSelectData.find((field) => field.label === "Username")?.label ??
  //     searchFieldSelectData[0].label;

  //   return {
  //     ...queryState,
  //     searchField,
  //   };
  // }

  // return setSearchDefaults(initialQueryState, searchFieldSelectData);
  return initialQueryState;
}

export { createInitialQueryState };
