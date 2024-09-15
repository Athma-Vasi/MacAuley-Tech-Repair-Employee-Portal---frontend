import type { CSSProperties } from "react";

import type {
  FileUploadDocument,
  RequestStatus,
  UserDocument,
} from "../../../types";
import type { EditRepairTicketInput } from "../displayQueryDesktop/types";
import type { GroupedByQueryResponseData } from "../types";
import type { CustomerDocument } from "../../customer/types";

type DisplayQueryMobileProps = {
  // componentQueryData: ComponentQueryData[];
  deleteFormIdDispatch: React.Dispatch<{
    type: "setDeleteFormId";
    payload: string;
  }>;
  deleteResourceKindDispatch: React.Dispatch<{
    type: "setDeleteResourceKind";
    payload: "form" | "fileUpload" | "";
  }>;
  fileUploadsData?: Array<{ [key: string]: FileUploadDocument[] }>;
  groupedByQueryResponseData: GroupedByQueryResponseData;
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

type DisplayQueryMobileState = {
  currentDocumentId: string;
  currentRequestStatus: RequestStatus;

  // for repair notes docs only
  editRepairTicketInput: EditRepairTicketInput;

  employeeDocument: UserDocument | null;
  customerDocument:
    | Omit<CustomerDocument, "password" | "paymentInformation">
    | null;
};

type DisplayQueryMobileAction = {
  setCurrentDocumentId: "setCurrentDocumentId";
  setCurrentRequestStatus: "setCurrentRequestStatus";

  // for repair notes docs only
  setEditRepairTicketInput: "setEditRepairTicketInput";

  setEmployeeDocument: "setEmployeeDocument";
  setCustomerDocument: "setCustomerDocument";
};

type DisplayQueryMobileDispatch =
  | {
    type: DisplayQueryMobileAction["setCurrentDocumentId"];
    payload: string;
  }
  | {
    type: DisplayQueryMobileAction["setCurrentRequestStatus"];
    payload: RequestStatus;
  }
  | {
    type: DisplayQueryMobileAction["setEditRepairTicketInput"];
    payload: EditRepairTicketInput;
  }
  | {
    type: DisplayQueryMobileAction["setEmployeeDocument"];
    payload: UserDocument | null;
  }
  | {
    type: DisplayQueryMobileAction["setCustomerDocument"];
    payload: Omit<CustomerDocument, "password" | "paymentInformation"> | null;
  };

export type {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileProps,
  DisplayQueryMobileState,
};
