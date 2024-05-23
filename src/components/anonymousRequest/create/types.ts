import {
  PhoneNumber,
  RequestStatus,
  SetPageInErrorPayload,
  Urgency,
} from "../../../types";
import { AnonymousRequestAction } from "./actions";

type AnonymousRequestKind =
  | "Benefits and compensation"
  | "Bullying and intimidation"
  | "Company security"
  | "Customer service"
  | "Discrimination"
  | "Diversity and inclusion"
  | "Employee conflict"
  | "Ethical concerns"
  | "LGBTQIA+"
  | "Managerial issues"
  | "Environmental concerns"
  | "Workload and stress"
  | "Workplace safety"
  | "Workplace harassment";

type AnonymousRequestSchema = {
  additionalInformation: string;
  requestDescription: string;
  requestKind: AnonymousRequestKind;
  requestStatus: RequestStatus;
  secureContactEmail: string;
  secureContactNumber: string;
  title: string;
  urgency: Urgency;
};

type AnonymousRequestDocument = AnonymousRequestSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AnonymousRequestState = {
  additionalInformation: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  requestDescription: string;
  requestKind: AnonymousRequestKind;
  secureContactEmail: string;
  secureContactNumber: PhoneNumber | string;
  title: string;
  triggerFormSubmit: boolean;
  urgency: Urgency;
};

type AnonymousRequestDispatch =
  | {
      action: AnonymousRequestAction["setAdditionalInformation"];
      payload: string;
    }
  | {
      action: AnonymousRequestAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: AnonymousRequestAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: AnonymousRequestAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: AnonymousRequestAction["setRequestDescription"];
      payload: string;
    }
  | {
      action: AnonymousRequestAction["setRequestKind"];
      payload: AnonymousRequestKind;
    }
  | {
      action: AnonymousRequestAction["setSecureContactEmail"];
      payload: string;
    }
  | {
      action: AnonymousRequestAction["setSecureContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      action: AnonymousRequestAction["setTitle"];
      payload: string;
    }
  | {
      action: AnonymousRequestAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: AnonymousRequestAction["setUrgency"];
      payload: Urgency;
    };

export type {
  AnonymousRequestDispatch,
  AnonymousRequestDocument,
  AnonymousRequestKind,
  AnonymousRequestSchema,
  AnonymousRequestState,
};
