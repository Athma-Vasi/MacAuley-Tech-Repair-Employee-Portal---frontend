import type {
  PhoneNumber,
  RequestStatus,
  SetPageInErrorPayload,
  TimeRailway,
  Urgency,
} from "../../../types";
import { PrinterIssueAction } from "./actions";

type PrinterMake =
  | "HP"
  | "Canon"
  | "Epson"
  | "Brother"
  | "Xerox"
  | "Ricoh"
  | "Lexmark"
  | "Dell"
  | "Kyocera"
  | "Sharp"
  | "Konica Minolta"
  | "Toshiba TEC"
  | "OKI"
  | "Panasonic"
  | "Fujitsu"
  | "Zebra Technologies";

type PrinterIssueSchema = {
  additionalInformation: string;
  contactEmail: string;
  contactNumber: PhoneNumber | string;
  dateOfOccurrence: string;
  printerIssueDescription: string;
  printerMake: PrinterMake;
  printerModel: string;
  printerSerialNumber: string;
  requestStatus: RequestStatus;
  timeOfOccurrence: TimeRailway;
  title: string;
  urgency: Urgency;
  userId: string;
  username: string;
};

type PrinterIssueDocument = PrinterIssueSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PrinterIssueState = {
  additionalInformation: string;
  contactEmail: string;
  contactNumber: PhoneNumber | string;
  dateOfOccurrence: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  printerIssueDescription: string;
  printerMake: PrinterMake;
  printerModel: string;
  printerSerialNumber: string;
  timeOfOccurrence: TimeRailway;
  title: string;
  triggerFormSubmit: boolean;
  urgency: Urgency;
};

type SetStepsInErrorPayload = {
  kind: "add" | "delete";
  step: number;
};

type PrinterIssueDispatch =
  | {
      action: PrinterIssueAction["setAdditionalInformation"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setContactEmail"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      action: PrinterIssueAction["setDateOfOccurrence"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: PrinterIssueAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: PrinterIssueAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: PrinterIssueAction["setPrinterIssueDescription"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setPrinterMake"];
      payload: PrinterMake;
    }
  | {
      action: PrinterIssueAction["setPrinterModel"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setPrinterSerialNumber"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setTimeOfOccurrence"];
      payload: TimeRailway;
    }
  | {
      action: PrinterIssueAction["setTitle"];
      payload: string;
    }
  | {
      action: PrinterIssueAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: PrinterIssueAction["setUrgency"];
      payload: Urgency;
    };

export type {
  PrinterIssueAction,
  PrinterIssueDispatch,
  PrinterIssueDocument,
  PrinterIssueSchema,
  PrinterIssueState,
  PrinterMake,
  SetStepsInErrorPayload,
};
