import { QueryResponseData, RoleResourceRoutePaths, StepperPage } from "../../types";
import { SortDirection } from "../query/types";
import { ResourceAction } from "./actions";

type LimitPerPage = "10" | "25" | "50" | "75";

type ResourceProps = {
  stepperPages: StepperPage[];
  createResourceLink: string;
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
};

type SortFieldDirection = {
  field: string;
  direction: SortDirection;
};

type ResourceState = {
  currentPage: number;
  isError: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  limitPerPage: LimitPerPage;
  loadingMessage: string;
  newQueryFlag: boolean;
  queryString: string;
  resourceData: Array<QueryResponseData>;
  selectedDocument: QueryResponseData | null;
  selectedField: string;
  sortFieldDirection: SortFieldDirection;
  totalDocuments: number;
  totalPages: number;
};

type ResourceDispatch =
  | {
      action: ResourceAction["setCurrentPage"];
      payload: number;
    }
  | {
      action: ResourceAction["setIsError"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsLoading"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setLimitPerPage"];
      payload: LimitPerPage;
    }
  | {
      action: ResourceAction["setLoadingMessage"];
      payload: string;
    }
  | {
      action: ResourceAction["setNewQueryFlag"];
      payload: boolean;
    }
  | {
      action: ResourceAction["setQueryString"];
      payload: string;
    }
  | {
      action: ResourceAction["setResourceData"];
      payload: Array<QueryResponseData>;
    }
  | {
      action: ResourceAction["setSelectedDocument"];
      payload: QueryResponseData;
    }
  | {
      action: ResourceAction["setSelectedField"];
      payload: string;
    }
  | {
      action: ResourceAction["setSortFieldDirection"];
      payload: SortFieldDirection;
    }
  | {
      action: ResourceAction["setTotalPages"];
      payload: number;
    }
  | {
      action: ResourceAction["setTotalDocuments"];
      payload: number;
    };

export type {
  LimitPerPage,
  ResourceDispatch,
  ResourceProps,
  ResourceState,
  SortFieldDirection,
};
