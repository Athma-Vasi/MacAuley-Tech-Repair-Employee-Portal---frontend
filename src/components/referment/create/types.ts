import {
  Department,
  JobPosition,
  PhoneNumber,
  RequestStatus,
  SetPageInErrorPayload,
} from "../../../types";
import { RefermentAction } from "./actions";

type RefermentSchema = {
  additionalInformation: string;
  candidateContactNumber: PhoneNumber;
  candidateCurrentCompany: string;
  candidateCurrentJobTitle: string;
  candidateEmail: string;
  candidateFullName: string;
  candidateProfileUrl: string;
  departmentReferredFor: Department;
  positionJobDescription: string;
  positionReferredFor: JobPosition;
  privacyConsent: boolean;
  referralReason: string;
  userId: string;
  username: string;
  requestStatus: RequestStatus;
};

type RefermentDocument = RefermentSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RefermentState = {
  additionalInformation: string;
  candidateContactNumber: PhoneNumber | string;
  candidateCurrentCompany: string;
  candidateCurrentJobTitle: string;
  candidateEmail: string;
  candidateFullName: string;
  candidateProfileUrl: string;
  departmentReferredFor: Department;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  positionJobDescription: string;
  positionReferredFor: JobPosition;
  privacyConsent: boolean;
  referralReason: string;
  triggerFormSubmit: boolean;
};

type RefermentDispatch =
  | {
      action: RefermentAction["setAdditionalInformation"];
      payload: string;
    }
  | {
      action: RefermentAction["setCandidateContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      action: RefermentAction["setCandidateCurrentCompany"];
      payload: string;
    }
  | {
      action: RefermentAction["setCandidateCurrentJobTitle"];
      payload: string;
    }
  | {
      action: RefermentAction["setCandidateEmail"];
      payload: string;
    }
  | {
      action: RefermentAction["setCandidateFullName"];
      payload: string;
    }
  | {
      action: RefermentAction["setCandidateProfileUrl"];
      payload: string;
    }
  | {
      action: RefermentAction["setDepartmentReferredFor"];
      payload: Department;
    }
  | {
      action: RefermentAction["setPositionJobDescription"];
      payload: string;
    }
  | {
      action: RefermentAction["setPositionReferredFor"];
      payload: JobPosition;
    }
  | {
      action: RefermentAction["setPrivacyConsent"];
      payload: boolean;
    }
  | {
      action: RefermentAction["setReferralReason"];
      payload: string;
    }
  | {
      action: RefermentAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: RefermentAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: RefermentAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: RefermentAction["setIsSuccessful"];
      payload: boolean;
    };

export type { RefermentDispatch, RefermentDocument, RefermentSchema, RefermentState };
