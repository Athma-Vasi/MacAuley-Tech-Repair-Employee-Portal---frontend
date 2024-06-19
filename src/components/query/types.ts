import { CheckboxInputData, SetPageInErrorPayload, StepperPage } from "../../types";
import { QueryAction } from "./actions";

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
  limitPerPage: number;
  projectedFieldsSet: Set<string>;
  projectionArray: string[];
  projectionCheckboxData: CheckboxInputData;
  searchSelectData: string[];
  searchStatements: [string, string][]; // [field, value][]
  selectedFieldsSet: Set<string>;
  sortSelectData: string[];
  sortStatements: [string, string][]; // [field, direction][]
};

type SetFilterStatementsPayload = {
  index: number;
  kind: "field" | "operator" | "value";
  value: string;
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
      action: QueryAction["setFilterOperatorSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["setFilterSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["setFilterStatements"];
      payload: SetFilterStatementsPayload;
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
      action: QueryAction["setProjectionCheckboxData"];
      payload: CheckboxInputData;
    }
  | {
      action: QueryAction["setSearchSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["setSearchStatements"];
      payload: SetSearchStatementsPayload;
    }
  | {
      action: QueryAction["setSelectedFieldsSet"];
      payload: Set<string>;
    }
  | {
      action: QueryAction["setSortSelectData"];
      payload: string[];
    }
  | {
      action: QueryAction["setSortStatements"];
      payload: SetSortStatementsPayload;
    };

export type {
  QueryDispatch,
  QueryProps,
  QueryState,
  SetFilterStatementsPayload,
  SetSearchStatementsPayload,
  SetSortStatementsPayload,
};
