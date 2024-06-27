import { CheckboxRadioSelectData } from "../../types";
import {
  FilterFieldsOperatorsValuesSetsMap,
  QueryState,
  SearchFieldsValuesSetMap,
} from "./types";

function createInitialQueryState(
  searchFieldSelectData: CheckboxRadioSelectData
): QueryState {
  const filterFieldsOperatorsValuesSetsMap = new Map([
    [
      "createdAt",
      {
        comparisonOperatorsSet: new Set(),
        valuesSet: new Set(),
      },
    ],
  ]) as FilterFieldsOperatorsValuesSetsMap;

  const searchFieldsOperatorsValuesSetMap = new Map([
    [searchFieldSelectData[0].value, new Set()],
  ]) as SearchFieldsValuesSetMap;

  const initialQueryState: QueryState = {
    // date input type is guaranteed to exist (all schemas have createdAt & updatedAt)
    filterField: "createdAt",
    filterFieldsOperatorsValuesSetsMap,
    filterComparisonOperator: "equal to",
    filterComparisonOperatorSelectData: [],
    filterLogicalOperator: "and",
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
    projectionExclusionFields: [],
    queryChains: { filter: new Map(), search: new Map(), sort: new Map() },
    searchField: searchFieldSelectData[0].value,
    searchFieldsOperatorsValuesSetMap,
    searchLogicalOperator: "and",
    searchValue: "",
    sortDirection: "descending",
    sortField: "updatedAt",
    sortFieldsSet: new Set(),
  };

  return initialQueryState;
}

export { createInitialQueryState };
