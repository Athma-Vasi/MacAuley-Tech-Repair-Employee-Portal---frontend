import { SetPageInErrorPayload } from "../../../types";
import { ReasonForLeave } from "../types";
import { LeaveRequestAction } from "./actions";

type LeaveRequestState = {
  acknowledgement: boolean;
  additionalComments: string;
  areValidLeaveDates: boolean;
  delegatedResponsibilities: string;
  delegatedToEmployee: string;
  endDate: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  reasonForLeave: ReasonForLeave;
  startDate: string;
  triggerFormSubmit: boolean;
};

type LeaveRequestDispatch =
  | {
      action: LeaveRequestAction["setAcknowledgement"];
      payload: boolean;
    }
  | {
      action: LeaveRequestAction["setAdditionalComments"];
      payload: string;
    }
  | {
      action: LeaveRequestAction["setAreValidLeaveDates"];
      payload: boolean;
    }
  | {
      action: LeaveRequestAction["setDelegatedResponsibilities"];
      payload: string;
    }
  | {
      action: LeaveRequestAction["setDelegatedToEmployee"];
      payload: string;
    }
  | {
      action: LeaveRequestAction["setEndDate"];
      payload: string;
    }
  | {
      action: LeaveRequestAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: LeaveRequestAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: LeaveRequestAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: LeaveRequestAction["setReasonForLeave"];
      payload: ReasonForLeave;
    }
  | {
      action: LeaveRequestAction["setStartDate"];
      payload: string;
    }
  | {
      action: LeaveRequestAction["setTriggerFormSubmit"];
      payload: boolean;
    };

export type { LeaveRequestDispatch, LeaveRequestState };
