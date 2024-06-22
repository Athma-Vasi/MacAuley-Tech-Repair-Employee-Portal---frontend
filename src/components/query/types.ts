import {
  CheckboxInputData,
  CheckboxRadioSelectData,
  SetPageInErrorPayload,
  StepperPage,
} from "../../types";
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

type QueryChain = Array<QueryLink>;

type QueryLink = [string, string, string];

type QueryOperators = ComparisonOperators | "in";

type QueryChainActionsKind = "delete" | "insert" | "slideUp" | "slideDown";

type QueryChainKind = "filter" | "search" | "sort";

type SearchFieldsValuesSetMap = Map<string, Set<string>>;

type SortDirection = "ascending" | "descending";

type SortInputsType = "date" | "number" | "time";

type QueryProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  collectionName: string;
  isProjectionDisabled?: boolean;
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
  filterChain: QueryChain; // [field, operator, value][]
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
  projectionFields: string[];
  searchField: string;
  searchFieldsValuesSetMap: SearchFieldsValuesSetMap;
  searchChain: QueryChain; // [field, _, value][]
  searchValue: string;
  selectedFieldsSet: Set<string>;
  sortDirection: SortDirection;
  sortField: string;
  sortChain: QueryChain; // [field, _, direction][]
};

type ModifyQueryChainPayload = {
  index: number;
  kind: QueryChainActionsKind;
  query: QueryChainKind;
  value: QueryLink;
};

type QueryFilterPayload = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  selectInputsDataMap: Map<string, CheckboxInputData>;
  value: string;
};

type QueryDispatch =
  | {
      action: QueryAction["modifyQueryChain"];
      payload: ModifyQueryChainPayload;
    }
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
      action: QueryAction["setProjectionFields"];
      payload: string[];
    }
  | {
      action: QueryAction["setSearchField"];
      payload: string;
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
    };

export type {
  ComparisonOperators,
  FilterFieldsOperatorsValuesSetsMap,
  FilterInputsType,
  LogicalOperators,
  ModifyQueryChainPayload,
  QueryChain,
  QueryChainActionsKind,
  QueryChainKind,
  QueryDispatch,
  QueryFilterPayload,
  QueryLink,
  QueryOperators,
  QueryProps,
  QueryState,
  SortDirection,
  SortInputsType,
};
