import { CSSProperties } from "react";

import type {
  Currency,
  FileUploadDocument,
  QueryResponseData,
  RequestStatus,
  UserDocument,
} from "../../../types";
import type { ComponentQueryData } from "../../queryBuilder";
import { RepairStatus } from "../../repairTicket/types";

type DisplayQueryDesktopProps = {
  componentQueryData: ComponentQueryData[];
  deleteFormIdDispatch: React.Dispatch<{
    type: "setDeleteFormId";
    payload: string;
  }>;
  deleteResourceKindDispatch: React.Dispatch<{
    type: "setDeleteResourceKind";
    payload: "form" | "fileUpload" | "";
  }>;
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  groupByRadioData: Array<{ label: string; value: string }>;
  groupedByQueryResponseData: Map<
    string | number | boolean | symbol,
    Record<string, any>[]
  >;
  groupBySelection: string;
  isLoading: boolean;
  loadingMessage?: string;
  openDeleteAcknowledge: () => void;
  openFileUploads: () => void;
  queryValuesArray: string[];
  requestStatusDispatch: React.Dispatch<{
    type: "setRequestStatus";
    payload: {
      id: string;
      status: RequestStatus;
    };
  }>;
  setFileUploadsForAFormDispatch: React.Dispatch<{
    type: "setFileUploadsForAForm";
    payload: FileUploadDocument[];
  }>;
  style?: CSSProperties;
};

type EditRepairTicketInput = {
  repairTicketFormId: string;
  repairTickets: string;
  testingResults: string;
  finalRepairCost: string;
  finalRepairCostCurrency: Currency;
  repairStatus: RepairStatus;
};

type DisplayQueryDesktopState = {
  fieldToSortBy: string;
  sortDirection: "asc" | "desc";

  currentDocumentId: string;
  currentRequestStatus: RequestStatus;

  // for repair notes docs only
  editRepairTicketInput: EditRepairTicketInput;

  employeeDocument: UserDocument | null;
};

type DisplayQueryDesktopAction = {
  setFieldToSortBy: "setFieldToSortBy";
  setSortDirection: "setSortDirection";

  setCurrentDocumentId: "setCurrentDocumentId";
  setCurrentRequestStatus: "setCurrentRequestStatus";

  setEditRepairTicketInput: "setEditRepairTicketInput";

  setEmployeeDocument: "setEmployeeDocument";
};

type DisplayQueryDesktopReducer = (
  state: DisplayQueryDesktopState,
  action: DisplayQueryDesktopAction
) => DisplayQueryDesktopState;

type DisplayQueryDesktopDispatch =
  | {
      type:
        | DisplayQueryDesktopAction["setFieldToSortBy"]
        | DisplayQueryDesktopAction["setCurrentDocumentId"];

      payload: string;
    }
  | {
      type: DisplayQueryDesktopAction["setSortDirection"];
      payload: "asc" | "desc";
    }
  | {
      type: DisplayQueryDesktopAction["setCurrentRequestStatus"];
      payload: RequestStatus;
    }
  | {
      type: DisplayQueryDesktopAction["setEditRepairTicketInput"];
      payload: EditRepairTicketInput;
    }
  | {
      type: DisplayQueryDesktopAction["setEmployeeDocument"];
      payload: UserDocument | null;
    };

export type {
  DisplayQueryDesktopAction,
  DisplayQueryDesktopDispatch,
  DisplayQueryDesktopProps,
  DisplayQueryDesktopReducer,
  DisplayQueryDesktopState,
  EditRepairTicketInput,
};
