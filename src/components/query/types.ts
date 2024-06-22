import { CheckboxInputData, SetPageInErrorPayload, StepperPage } from "../../types";
import { QueryAction } from "./actions";
import { OperatorsInputType } from "./utils";

type ComparisonOperators = "$eq" | "$gte" | "$gt" | "$lte" | "$lt" | "$ne";

type FilterInputsType = "boolean" | "date" | "number" | "select" | "time";

type FilterFieldsOperatorsValuesSetsMap = Map<
  string,
  {
    operatorsSet: Set<string>;
    valuesSet: Set<string>;
  }
>;

type LogicalOperators = "$and" | "$nor" | "$not" | "$or";

type QueryOperators = ComparisonOperators | "in";

type QueryChainActionsKind = "delete" | "insert" | "slideUp" | "slideDown";

type SearchFieldsValuesSetMap = Map<string, Set<string>>;

type SortDirection = "ascending" | "descending";

type SortInputsType = "date" | "number" | "time";

type QueryProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  collectionName: string;
  disableProjection?: boolean;
  // invalidValueAction: InvalidValueAction;
  // parentDispatch: React.Dispatch<
  //   | {
  //       action: ValidValueAction;
  //       payload: string;
  //     }
  //   | {
  //       action: InvalidValueAction;
  //       payload: SetPageInErrorPayload;
  //     }
  // >;
  /** only the children steppers objs are used */
  stepperPages: StepperPage[];
  // validValueAction: ValidValueAction;
};

type QueryState = {
  filterField: string;
  filterFieldsOperatorsValuesSetsMap: FilterFieldsOperatorsValuesSetsMap;
  filterOperator: string;
  filterOperatorSelectData: string[];
  filterChain: Array<[string, string, string]>; // [field, operator, value][]
  filterValue: string;
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  isError: boolean;
  isFilterOpened: boolean;
  isGeneralSearchCaseSensitive: boolean;
  isProjectionOpened: boolean;
  isQueryOpened: boolean;
  isSearchDisabled: boolean;
  isSearchOpened: boolean;
  isSortOpened: boolean;
  limitPerPage: number;
  projectedFieldsSet: Set<string>;
  projectionArray: string[];
  searchField: string;
  searchFieldsValuesSetMap: SearchFieldsValuesSetMap;
  searchChain: Array<[string, string]>; // [field, value][]
  searchValue: string;
  selectedFieldsSet: Set<string>;
  sortDirection: SortDirection;
  sortField: string;
  sortChain: [string, string][]; // [field, direction][]
};

type ModifyFilterChainPayload = {
  index: number;
  kind: QueryChainActionsKind;
  value: [string, string, string];
};

type ModifySearchChainPayload = {
  index: number;
  kind: QueryChainActionsKind;
  value: [string, string];
};

type ModifySortChainPayload = {
  index: number;
  kind: "field" | "direction";
  value: string;
};

type QueryFilterPayload = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  selectInputsDataMap: Map<string, CheckboxInputData>;
  value: string;
};

type QueryDispatch =
  | {
      action: QueryAction["setFilterField"];
      payload: QueryFilterPayload;
    }
  | {
      action: QueryAction["setFilterOperator"];
      payload: QueryFilterPayload;
    }
  | {
      action: QueryAction["setFilterOperatorSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["modifyFilterChain"];
      payload: ModifyFilterChainPayload;
    }
  | {
      action: QueryAction["setFilterValue"];
      payload: QueryFilterPayload;
    }
  | {
      action: QueryAction["setGeneralSearchExclusionValue"];
      payload: string;
    }
  | {
      action: QueryAction["setGeneralSearchInclusionValue"];
      payload: string;
    }
  | {
      action: QueryAction["setIsError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: QueryAction["setIsFilterOpened"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsGeneralSearchCaseSensitive"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsProjectionOpened"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsQueryOpened"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsSearchDisabled"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsSearchOpened"];
      payload: boolean;
    }
  | {
      action: QueryAction["setIsSortOpened"];
      payload: boolean;
    }
  | {
      action: QueryAction["setLimitPerPage"];
      payload: number;
    }
  | {
      action: QueryAction["setProjectedFieldsSet"];
      payload: Set<string>;
    }
  | {
      action: QueryAction["setProjectionArray"];
      payload: string[];
    }
  | {
      action: QueryAction["setSearchField"];
      payload: string;
    }
  | {
      action: QueryAction["modifySearchChain"];
      payload: ModifySearchChainPayload;
    }
  | {
      action: QueryAction["setSearchValue"];
      payload: string;
    }
  | {
      action: QueryAction["setSelectedFieldsSet"];
      payload: Set<string>;
    }
  | {
      action: QueryAction["setSortDirection"];
      payload: SortDirection;
    }
  | {
      action: QueryAction["setSortField"];
      payload: string;
    }
  | {
      action: QueryAction["setSortChain"];
      payload: ModifySortChainPayload;
    };

export type {
  ComparisonOperators,
  FilterFieldsOperatorsValuesSetsMap,
  FilterInputsType,
  LogicalOperators,
  ModifyFilterChainPayload,
  ModifySearchChainPayload,
  ModifySortChainPayload,
  QueryChainActionsKind,
  QueryDispatch,
  QueryFilterPayload,
  QueryOperators,
  QueryProps,
  QueryState,
  SortDirection,
  SortInputsType,
};
