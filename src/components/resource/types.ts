import type {
  QueryResponseData,
  RoleResourceRoutePaths,
  SetPageInErrorPayload,
  StepperPage,
} from "../../types";
import type { SortDirection } from "../query/types";
import type { ResourceAction } from "./actions";

type LimitPerPage = "10" | "25" | "50" | "75";

type ResourceProps = {
  stepperPages: StepperPage[];
  createResourceLink: string;
  resourceName: string;
  roleResourceRoutePaths: RoleResourceRoutePaths;
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
  pagesInError: Set<number>;
  queryString: string;
  resourceData: Array<QueryResponseData>;
  selectedDocument: QueryResponseData | null;
  selectedField: string;
  sortField: string; // dispatched from Mobile
  sortDirection: SortDirection; // dispatched from Mobile
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
    action: ResourceAction["setPageInError"];
    payload: SetPageInErrorPayload;
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
    payload: QueryResponseData | null;
  }
  | {
    action: ResourceAction["setSelectedField"];
    payload: string;
  }
  | {
    action: ResourceAction["setSortField"];
    payload: string;
  }
  | {
    action: ResourceAction["setSortDirection"];
    payload: SortDirection;
  }
  | {
    action: ResourceAction["setTotalPages"];
    payload: number;
  }
  | {
    action: ResourceAction["setTotalDocuments"];
    payload: number;
  };

export type { LimitPerPage, ResourceDispatch, ResourceProps, ResourceState };
