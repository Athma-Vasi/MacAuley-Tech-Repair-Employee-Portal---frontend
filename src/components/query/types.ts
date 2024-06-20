import { CheckboxInputData, SetPageInErrorPayload, StepperPage } from "../../types";
import { QueryAction } from "./actions";

type ComparisonOperators =
  | "equal to"
  | "greater than or equal to"
  | "greater than"
  | "less than or equal to"
  | "less than";

type FilterInputsType = "boolean" | "date" | "number" | "select" | "time";

type QueryOperators = ComparisonOperators | "in";

type QueryChainActionsKind = "add" | "delete" | "insert" | "slideUp" | "slideDown";

type SortDirection = "ascending" | "descending";

type SortInputsType = "date" | "number" | "time";

type QueryProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  collectionName: string;
  disableProjection?: boolean;
  invalidValueAction: InvalidValueAction;
  parentDispatch: React.Dispatch<
    | {
        action: ValidValueAction;
        payload: string;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  /** only the children steppers objs are used */
  stepperPages: StepperPage[];
  validValueAction: ValidValueAction;
};

type QueryState = {
  filterField: string;
  filterOperator: string;
  filterOperatorSelectData: string[];
  filterStatements: [string, string, string][]; // [field, operator, value][]
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
  searchStatements: [string, string][]; // [field, value][]
  searchValue: string;
  selectedFieldsSet: Set<string>;
  sortDirection: SortDirection;
  sortField: string;
  sortStatements: [string, string][]; // [field, direction][]
};

type SetFilterStatementsPayload = {
  index: number;
  kind: QueryChainActionsKind;
  value: [string, string, string];
};

type SetSearchStatementsPayload = {
  index: number;
  kind: "field" | "value";
  value: string;
};

type SetSortStatementsPayload = {
  index: number;
  kind: "field" | "direction";
  value: string;
};

type QueryDispatch =
  | {
      action: QueryAction["setFilterField"];
      payload: string;
    }
  | {
      action: QueryAction["setFilterOperator"];
      payload: string;
    }
  | {
      action: QueryAction["setFilterOperatorSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["modifyFilterChains"];
      payload: SetFilterStatementsPayload;
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
      action: QueryAction["setSearchStatements"];
      payload: SetSearchStatementsPayload;
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
      action: QueryAction["setSortStatements"];
      payload: SetSortStatementsPayload;
    };

export type {
  ComparisonOperators,
  FilterInputsType,
  QueryChainActionsKind,
  QueryDispatch,
  QueryOperators,
  QueryProps,
  QueryState,
  SetFilterStatementsPayload,
  SetSearchStatementsPayload,
  SetSortStatementsPayload,
  SortDirection,
  SortInputsType,
};
