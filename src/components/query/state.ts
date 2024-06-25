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
    filterValue: new Date().toISOString().split("T")[0],
    generalSearchCase: "case-insensitive",
    generalSearchExclusionValue: "",
    generalSearchInclusionValue: "",
    isError: false,
    isFilterOpened: false,
    isProjectionOpened: false,
    isQueryOpened: false,
    isQueryChainOpened: false,
    isSearchDisabled: false,
    isSearchOpened: false,
    isSortOpened: false,
    limitPerPage: 10,
    projectedFieldsSet: new Set(),
    projectionFields: [],
    queryChains: { filter: [], search: [], sort: [] },
    searchField: searchFieldSelectData[0].value,
    searchFieldsValuesSetMap: new Map([[searchFieldSelectData[0].value, new Set()]]),
    searchValue: "",
    selectedFieldsSet: new Set(),
    sortDirection: "descending",
    sortField: "updatedAt",
    sortFieldsSet: new Set(),
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
