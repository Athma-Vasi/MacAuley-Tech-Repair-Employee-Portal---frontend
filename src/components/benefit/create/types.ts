import { Currency, RequestStatus, SetPageInErrorPayload } from "../../../types";
import { BenefitAction } from "./actions";

type BenefitsPlanKind =
  | "Dental"
  | "Disability"
  | "Education"
  | "Health"
  | "Life"
  | "Other"
  | "Retirement"
  | "Vision";

type BenefitsSchema = {
  currency: Currency;
  employeeContribution: number;
  employerContribution: number;
  isPlanActive: boolean;
  monthlyPremium: number;
  planDescription: string;
  planKind: BenefitsPlanKind;
  planName: string;
  planStartDate: string;
  requestStatus: RequestStatus;
  userId: string;
  username: string;
};

type BenefitsDocument = BenefitsSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type BenefitState = {
  currency: Currency;
  employeeContribution: string;
  employerContribution: string;
  isPlanActive: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  planDescription: string;
  planKind: BenefitsPlanKind;
  planName: string;
  planStartDate: string;
  triggerFormSubmit: boolean;
};

type BenefitDispatch =
  | {
      action: BenefitAction["setCurrency"];
      payload: Currency;
    }
  | {
      action: BenefitAction["setEmployeeContribution"];
      payload: string;
    }
  | {
      action: BenefitAction["setEmployerContribution"];
      payload: string;
    }
  | {
      action: BenefitAction["setIsPlanActive"];
      payload: boolean;
    }
  | {
      action: BenefitAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: BenefitAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: BenefitAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: BenefitAction["setPlanDescription"];
      payload: string;
    }
  | {
      action: BenefitAction["setPlanKind"];
      payload: BenefitsPlanKind;
    }
  | {
      action: BenefitAction["setPlanName"];
      payload: string;
    }
  | {
      action: BenefitAction["setPlanStartDate"];
      payload: string;
    }
  | {
      action: BenefitAction["setTriggerFormSubmit"];
      payload: boolean;
    };

export type {
  BenefitAction,
  BenefitDispatch,
  BenefitsDocument,
  BenefitsPlanKind,
  BenefitsSchema,
  BenefitState,
  Currency,
};
