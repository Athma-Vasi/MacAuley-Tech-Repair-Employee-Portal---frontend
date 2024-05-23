import { RequestStatus, SetPageInErrorPayload } from "../../../types";
import { EndorsementAction } from "./actions";

type EmployeeAttributes =
  | "teamwork and collaboration"
  | "leadership and mentorship"
  | "technical expertise"
  | "adaptibility and flexibility"
  | "problem solving"
  | "customer service"
  | "initiative and proactivity"
  | "communication"
  | "reliability and dependability";

type EndorsementSchema = {
  attributeEndorsed: EmployeeAttributes[];
  requestStatus: RequestStatus;
  summaryOfEndorsement: string;
  title: string;
  userId: string;
  personToBeEndorsed: string;
  username: string;
};

type EndorsementDocument = EndorsementSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type EndorsementState = {
  attributeEndorsed: EmployeeAttributes[];
  personToBeEndorsed: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  summaryOfEndorsement: string;
  title: string;
  triggerFormSubmit: boolean;
};

type StepsInErrorPayload = {
  kind: "add" | "delete";
  step: number;
};

type EndorsementDispatch =
  | {
      action: EndorsementAction["setAttributeEndorsed"];
      payload: EmployeeAttributes[];
    }
  | {
      action: EndorsementAction["setPersonToBeEndorsed"];
      payload: string;
    }
  | {
      action: EndorsementAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: EndorsementAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: EndorsementAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: EndorsementAction["setSummaryOfEndorsement"];
      payload: string;
    }
  | {
      action: EndorsementAction["setTitle"];
      payload: string;
    }
  | {
      action: EndorsementAction["setTriggerFormSubmit"];
      payload: boolean;
    };

export type {
  EmployeeAttributes,
  EndorsementDispatch,
  EndorsementDocument,
  EndorsementSchema,
  EndorsementState,
  StepsInErrorPayload,
};
