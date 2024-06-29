import {
  CheckboxInputData,
  CheckboxRadioSelectData,
  SetPageInErrorPayload,
  StepperPage,
} from "../../types";
import { QueryAction } from "./actions";
import { OperatorsInputType } from "./utils";

type ComparisonOperator =
  | "equal to"
  | "greater than or equal to"
  | "greater than"
  | "less than or equal to"
  | "less than"
  | "not equal to";

type FilterInputsType = "boolean" | "date" | "number" | "select" | "time";

type FilterFieldsOperatorsValuesSetsMap = Map<
  string,
  {
    comparisonOperatorsSet: Set<string>;
    valuesSet: Set<string>;
  }
>;

type GeneralSearchCase = "case-sensitive" | "case-insensitive";

type GeneralSearchKind = "inclusion" | "exclusion";

type LogicalOperator = "and" | "nor" | "or";

type LogicalOperatorChainsSets = {
  fieldsSet: Set<string>;
  comparisonOperatorsSet: Set<QueryOperator>;
  valuesSet: Set<string>;
};

type LogicalOperatorChainsSetsMap = Map<LogicalOperator, LogicalOperatorChainsSets>;

type QueryChain = Array<QueryLink>;

type QueryChainActions = "delete" | "insert" | "slideUp" | "slideDown";

type QueryChainKind = "filter" | "sort";

type QueryChains = Record<QueryChainKind, Map<LogicalOperator, QueryChain>>; // Map<logicalOperator, ...

type QueryLink = [string, QueryOperator, string]; // [field, comparisonOperator, value]

type QueryOperator = ComparisonOperator | "in";

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
  filterLogicalOperator: LogicalOperator;
  filterComparisonOperator: QueryOperator;
  filterComparisonOperatorSelectData: string[];
  filterValue: string;
  generalSearchCase: GeneralSearchCase;
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  isError: boolean;
  isSearchDisabled: boolean;
  limitPerPage: number;
  logicalOperatorChainsSetsMap: LogicalOperatorChainsSetsMap;
  projectionExclusionFields: string[];
  queryChains: QueryChains;
  searchField: string;
  searchFieldsOperatorsValuesSetMap: SearchFieldsValuesSetMap;
  searchLogicalOperator: LogicalOperator;
  searchValue: string;
  sortDirection: SortDirection;
  sortField: string;
  sortFieldsSet: Set<string>;
};

type ModifyQueryChainPayload = {
  index: number;
  logicalOperator: LogicalOperator;
  queryChainActions: QueryChainActions;
  queryChainKind: QueryChainKind;
  queryLink: QueryLink;
};

type ModifyQueryChainsDispatch = React.Dispatch<{
  action: QueryAction["modifyQueryChains"];
  payload: ModifyQueryChainPayload;
}>;

type QueryFilterPayload = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  searchFieldSelectInputData: CheckboxRadioSelectData;
  selectInputsDataMap: Map<string, CheckboxInputData>;
  value: string;
};

type QueryDispatch =
  | {
      action: QueryAction["modifyQueryChains"];
      payload: ModifyQueryChainPayload;
    }
  | {
      action: QueryAction["setFilterField"];
      payload: QueryFilterPayload;
    }
  | {
      action: QueryAction["setFilterComparisonOperator"];
      payload: QueryOperator;
    }
  | {
      action: QueryAction["setFilterComparisonOperatorSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["setFilterLogicalOperator"];
      payload: LogicalOperator;
    }
  | {
      action: QueryAction["setFilterValue"];
      payload: string;
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
      action: QueryAction["setGeneralSearchCase"];
      payload: GeneralSearchCase;
    }
  | {
      action: QueryAction["setIsSearchDisabled"];
      payload: boolean;
    }
  | {
      action: QueryAction["setLimitPerPage"];
      payload: number;
    }
  | {
      action: QueryAction["setProjectionExclusionFields"];
      payload: string[];
    }
  | {
      action: QueryAction["setSearchField"];
      payload: string;
    }
  | {
      action: QueryAction["setSearchLogicalOperator"];
      payload: LogicalOperator;
    }
  | {
      action: QueryAction["setSearchValue"];
      payload: string;
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
  ComparisonOperator,
  FilterFieldsOperatorsValuesSetsMap,
  FilterInputsType,
  GeneralSearchCase,
  GeneralSearchKind,
  LogicalOperator,
  LogicalOperatorChainsSets,
  LogicalOperatorChainsSetsMap,
  ModifyQueryChainPayload,
  ModifyQueryChainsDispatch,
  QueryChain,
  QueryChainActions,
  QueryChainKind,
  QueryChains,
  QueryDispatch,
  QueryFilterPayload,
  QueryLink,
  QueryOperator,
  QueryProps,
  QueryState,
  SearchFieldsValuesSetMap,
  SortDirection,
  SortInputsType,
};
