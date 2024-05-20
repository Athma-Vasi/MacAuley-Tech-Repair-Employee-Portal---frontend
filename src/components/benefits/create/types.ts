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
  benefitUserId: string;
  username: string;
  planName: string;
  planDescription: string;
  planKind: BenefitsPlanKind;
  planStartDate: string;
  isPlanActive: boolean;
  currency: Currency;
  monthlyPremium: number;
  employerContribution: number;
  employeeContribution: number;
  requestStatus: RequestStatus;
};

type BenefitsDocument = BenefitsSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreateBenefitState = {
  benefitUsername: string;
  planName: string;
  planDescription: string;
  planStartDate: string;
  planKind: BenefitsPlanKind;
  isPlanActive: boolean;
  currency: Currency;
  employerContribution: string;
  employeeContribution: string;
  triggerFormSubmit: boolean;
  pagesInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type CreateBenefitDispatch =
  | {
      action: CreateBenefitAction["setBenefitUsername"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanName"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanDescription"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanStartDate"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setPlanKind"];
      payload: BenefitsPlanKind;
    }
  | {
      action: CreateBenefitAction["setIsPlanActive"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setCurrency"];
      payload: Currency;
    }
  | {
      action: CreateBenefitAction["setEmployerContribution"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setEmployeeContribution"];
      payload: string;
    }
  | {
      action: CreateBenefitAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: CreateBenefitAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: CreateBenefitAction["setIsSuccessful"];
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
