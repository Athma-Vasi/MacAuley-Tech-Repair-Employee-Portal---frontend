import { Currency, RequestStatus, SetPageInErrorPayload } from "../../../types";
import { CreateBenefitAction } from "./actions";

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

type CreateBenefitState = {
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

type CreateBenefitDispatch =
  | {
      action: CreateBenefitAction["setCurrency"];
      payload: Currency;
    }
  | {
      action: CreateBenefitAction["setEmployeeContribution"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setEmployerContribution"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setIsPlanActive"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: CreateBenefitAction["setPlanDescription"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanKind"];
      payload: BenefitsPlanKind;
    }
  | {
      action: CreateBenefitAction["setPlanName"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanStartDate"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setTriggerFormSubmit"];
      payload: boolean;
    };

export type {
  BenefitsDocument,
  BenefitsPlanKind,
  BenefitsSchema,
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitState,
  Currency,
};
