import { CSSProperties } from "react";

import { FileUploadDocument, RequestStatus, UserDocument } from "../../../types";
import { CustomerDocument } from "../../customer/types";
import { ComponentQueryData } from "../../queryBuilder/types";
import { EditRepairTicketInput } from "../displayQueryDesktop/types";

type DisplayQueryCardsProps = {
  /**
   * - Query data object containing fields specific to a resource.
   * - Used here to grab the label (camelcased) value for groupedByQueryResponseData (lowercased values)
   */
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
  /** radio data labels used to exclude certain fields from having sort arrows displayed */
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

type DisplayQueryCardsState = {
  currentDocumentId: string;
  currentRequestStatus: RequestStatus;

  // for repair notes docs only
  editRepairTicketInput: EditRepairTicketInput;

  employeeDocument: UserDocument | null;
  customerDocument: Omit<CustomerDocument, "password" | "paymentInformation"> | null;
};

type DisplayQueryCardsAction = {
  setCurrentDocumentId: "setCurrentDocumentId";
  setCurrentRequestStatus: "setCurrentRequestStatus";

  // for repair notes docs only
  setEditRepairTicketInput: "setEditRepairTicketInput";

  setEmployeeDocument: "setEmployeeDocument";
  setCustomerDocument: "setCustomerDocument";
};

type DisplayQueryCardsDispatch =
  | {
      type: DisplayQueryCardsAction["setCurrentDocumentId"];
      payload: string;
    }
  | {
      type: DisplayQueryCardsAction["setCurrentRequestStatus"];
      payload: RequestStatus;
    }
  | {
      type: DisplayQueryCardsAction["setEditRepairTicketInput"];
      payload: EditRepairTicketInput;
    }
  | {
      type: DisplayQueryCardsAction["setEmployeeDocument"];
      payload: UserDocument | null;
    }
  | {
      type: DisplayQueryCardsAction["setCustomerDocument"];
      payload: Omit<CustomerDocument, "password" | "paymentInformation"> | null;
    };

export type {
  DisplayQueryCardsAction,
  DisplayQueryCardsDispatch,
  DisplayQueryCardsProps,
  DisplayQueryCardsState,
};
