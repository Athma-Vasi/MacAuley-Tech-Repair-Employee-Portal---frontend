import type { CSSProperties } from "react";

import type {
  FileUploadDocument,
  QueryResponseData,
  RequestStatus,
  ResourceRoutePaths,
} from "../../types";

type DisplayResourceProps = {
  // componentQueryData: ComponentQueryData[];
  createResourcePath: string;
  fileUploadFieldName?: string;
  fileUploadIdFieldName?: string;
  isDisplayFilesOnly?: boolean;
  isFileUploadsWithResource?: boolean;
  requestBodyHeading: string;
  resourceUrlPaths: {
    employee: string;
    manager: string;
    admin: string;
  };
  style?: CSSProperties;
};

type DisplayResourceState<
  Doc extends Record<string, unknown> = Record<string, unknown>,
> = {
  /** The resource data fetched from backend. */
  resourceData: QueryResponseData<Doc>[];
  /** The number of pages to display in the pagination component. */
  pages: number;
  /** The total number of documents in the database. */
  totalDocuments: number;

  queryValuesArray: string[]; // values from queryBuilder are passed down to DisplayQueryDesktop and DisplayQueryMobile to highlight the query values in the table
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;
  limitPerPage: string;
  resetPage: boolean;

  fileUploads: Array<{ [key: string]: FileUploadDocument[] }>;

  requestStatus: {
    id: string;
    status: RequestStatus;
  };

  deleteResource: {
    formId: string;
    fileUploadId?: string;
    kind: "form" | "fileUpload" | "";
    value: boolean;
  };

  triggerRefresh: boolean;
  triggerUpdateRequestStatus: boolean;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type UpdateRequestStatusInput = {
  accessToken: string;
  paths: ResourceRoutePaths;
  requestStatus: {
    id: string;
    status: RequestStatus;
  };
  requestBodyHeading: string;
  signal: AbortSignal;
};

type DisplayResourceAction = {
  setResourceData: "setResourceData";
  updateResourceData: "updateResourceData";
  setPages: "setPages";
  setTotalDocuments: "setTotalDocuments";

  setQueryValuesArray: "setQueryValuesArray";
  setNewQueryFlag: "setNewQueryFlag";
  setQueryBuilderString: "setQueryBuilderString";
  setPageQueryString: "setPageQueryString";
  setLimitPerPage: "setLimitPerPage";
  setResetPage: "setResetPage";

  setDeleteResource: "setDeleteResource";
  setFileUploads: "setFileUploads";
  setRequestStatus: "setRequestStatus";
  setTriggerRefresh: "setTriggerRefresh";
  setTriggerUpdateRequestStatus: "setTriggerUpdateRequestStatus";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type DisplayResourceDispatch<
  Doc extends Record<string, unknown> = Record<string, unknown>,
> =
  | {
    type: DisplayResourceAction["setResourceData"];
    payload: QueryResponseData<Doc>[];
  }
  | {
    type: DisplayResourceAction["updateResourceData"];
    payload: {
      id: string;
      kind: "update" | "delete";
      data: Partial<Doc>;
    };
  }
  | {
    type:
      | DisplayResourceAction["setPages"]
      | DisplayResourceAction["setTotalDocuments"];
    payload: number;
  }
  | {
    type:
      | DisplayResourceAction["setNewQueryFlag"]
      | DisplayResourceAction["setResetPage"]
      | DisplayResourceAction["setTriggerRefresh"]
      | DisplayResourceAction["setTriggerUpdateRequestStatus"]
      | DisplayResourceAction["setIsSubmitting"]
      | DisplayResourceAction["setIsSuccessful"]
      | DisplayResourceAction["setIsLoading"];
    payload: boolean;
  }
  | {
    type:
      | DisplayResourceAction["setQueryBuilderString"]
      | DisplayResourceAction["setPageQueryString"]
      | DisplayResourceAction["setLimitPerPage"]
      | DisplayResourceAction["setSubmitMessage"]
      | DisplayResourceAction["setSuccessMessage"]
      | DisplayResourceAction["setLoadingMessage"];
    payload: string;
  }
  | {
    type: DisplayResourceAction["setQueryValuesArray"];
    payload: {
      kind: "add" | "remove" | "clear";
      value: string;
    };
  }
  | {
    type: DisplayResourceAction["setRequestStatus"];
    payload: {
      id: string;
      status: RequestStatus;
    };
  }
  | {
    type: DisplayResourceAction["setDeleteResource"];
    payload: {
      formId: string;
      fileUploadId?: string;
      kind: "form" | "fileUpload" | "";
      value: boolean;
    };
  }
  | {
    type: DisplayResourceAction["setFileUploads"];
    payload: Array<{ [key: string]: FileUploadDocument[] }>;
  };

type DisplayResourceReducer = <
  Doc extends Record<string, unknown> = Record<string, unknown>,
>(
  state: DisplayResourceState<Doc>,
  action: DisplayResourceDispatch<Doc>,
) => DisplayResourceState<Doc>;

export type {
  DisplayResourceAction,
  DisplayResourceDispatch,
  DisplayResourceProps,
  DisplayResourceReducer,
  DisplayResourceState,
  UpdateRequestStatusInput,
};
