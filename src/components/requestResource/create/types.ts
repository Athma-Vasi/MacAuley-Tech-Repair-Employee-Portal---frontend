import type { Department, SetPageInErrorPayload, Urgency } from "../../../types";
import { RequestStatus } from "../../../types";
import { RequestResourceAction } from "./actions";

type RequestResourceType = "Hardware" | "Software" | "Access" | "Other";

type RequestResourceSchema = {
  additionalInformation: string;
  dateNeededBy: string;
  department: Department;
  reasonForRequest: string;
  requestStatus: RequestStatus;
  resourceDescription: string;
  resourceQuantity: number;
  resourceType: RequestResourceType;
  urgency: Urgency;
  userId: string;
  username: string;
};

type RequestResourceDocument = RequestResourceSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RequestResourceState = {
  additionalInformation: string;
  dateNeededBy: string;
  department: Department;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  reasonForRequest: string;
  resourceDescription: string;
  resourceQuantity: string;
  resourceType: RequestResourceType;
  triggerFormSubmit: boolean;
  urgency: Urgency;
};

type RequestResourceDispatch =
  | {
      action: RequestResourceAction["setAdditionalInformation"];
      payload: string;
    }
  | {
      action: RequestResourceAction["setDateNeededBy"];
      payload: string;
    }
  | {
      action: RequestResourceAction["setDepartment"];
      payload: Department;
    }
  | {
      action: RequestResourceAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: RequestResourceAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: RequestResourceAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: RequestResourceAction["setReasonForRequest"];
      payload: string;
    }
  | {
      action: RequestResourceAction["setResourceDescription"];
      payload: string;
    }
  | {
      action: RequestResourceAction["setResourceQuantity"];
      payload: string;
    }
  | {
      action: RequestResourceAction["setResourceType"];
      payload: RequestResourceType;
    }
  | {
      action: RequestResourceAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: RequestResourceAction["setUrgency"];
      payload: Urgency;
    };

export type {
  RequestResourceDispatch,
  RequestResourceDocument,
  RequestResourceSchema,
  RequestResourceState,
  RequestResourceType,
  Urgency,
};
