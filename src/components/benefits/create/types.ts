import {
  Action,
  ActionsCompany,
  Currency,
  RequestStatus,
  SetStepsInErrorPayload,
} from "../../../types";

type BenefitsPlanKind =
  | "Health"
  | "Dental"
  | "Vision"
  | "Life"
  | "Disability"
  | "Retirement"
  | "Education"
  | "Other";

type BenefitsSchema = {
  action: Action;
  category: ActionsCompany;

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
  isValidBenefitUsername: boolean;
  isBenefitUsernameFocused: boolean;

  planName: string;
  isValidPlanName: boolean;
  isPlanNameFocused: boolean;

  planDescription: string;
  isValidPlanDescription: boolean;
  isPlanDescriptionFocused: boolean;

  planStartDate: string;
  isValidPlanStartDate: boolean;
  isPlanStartDateFocused: boolean;

  planKind: BenefitsPlanKind | "";
  isPlanActive: boolean;
  currency: Currency;

  employerContribution: string;
  isValidEmployerContribution: boolean;
  isEmployerContributionFocused: boolean;

  employeeContribution: string;
  isValidEmployeeContribution: boolean;
  isEmployeeContributionFocused: boolean;

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreateBenefitAction = {
  setBenefitUsername: "setBenefitUsername";
  setIsValidBenefitUsername: "setIsValidBenefitUsername";
  setIsBenefitUsernameFocused: "setIsBenefitUsernameFocused";

  setPlanName: "setPlanName";
  setIsValidPlanName: "setIsValidPlanName";
  setIsPlanNameFocused: "setIsPlanNameFocused";

  setPlanDescription: "setPlanDescription";
  setIsValidPlanDescription: "setIsValidPlanDescription";
  setIsPlanDescriptionFocused: "setIsPlanDescriptionFocused";

  setPlanStartDate: "setPlanStartDate";
  setIsValidPlanStartDate: "setIsValidPlanStartDate";
  setIsPlanStartDateFocused: "setIsPlanStartDateFocused";

  setPlanKind: "setPlanKind";
  setIsPlanActive: "setIsPlanActive";
  setCurrency: "setCurrency";

  setEmployerContribution: "setEmployerContribution";
  setIsValidEmployerContribution: "setIsValidEmployerContribution";
  setIsEmployerContributionFocused: "setIsEmployerContributionFocused";

  setEmployeeContribution: "setEmployeeContribution";
  setIsValidEmployeeContribution: "setIsValidEmployeeContribution";
  setIsEmployeeContributionFocused: "setIsEmployeeContributionFocused";

  setTriggerFormSubmit: "setTriggerFormSubmit";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type CreateBenefitDispatch =
  | {
      type:
        | CreateBenefitAction["setBenefitUsername"]
        | CreateBenefitAction["setPlanName"]
        | CreateBenefitAction["setPlanDescription"]
        | CreateBenefitAction["setPlanStartDate"]
        | CreateBenefitAction["setEmployeeContribution"]
        | CreateBenefitAction["setEmployerContribution"]
        | CreateBenefitAction["setSubmitMessage"]
        | CreateBenefitAction["setSuccessMessage"]
        | CreateBenefitAction["setLoadingMessage"];
      payload: string;
    }
  | {
      type:
        | CreateBenefitAction["setIsValidBenefitUsername"]
        | CreateBenefitAction["setIsBenefitUsernameFocused"]
        | CreateBenefitAction["setIsValidPlanName"]
        | CreateBenefitAction["setIsPlanNameFocused"]
        | CreateBenefitAction["setIsValidPlanDescription"]
        | CreateBenefitAction["setIsPlanDescriptionFocused"]
        | CreateBenefitAction["setIsValidPlanStartDate"]
        | CreateBenefitAction["setIsPlanStartDateFocused"]
        | CreateBenefitAction["setIsValidEmployeeContribution"]
        | CreateBenefitAction["setIsEmployeeContributionFocused"]
        | CreateBenefitAction["setIsValidEmployerContribution"]
        | CreateBenefitAction["setIsEmployerContributionFocused"]
        | CreateBenefitAction["setIsPlanActive"]
        | CreateBenefitAction["setTriggerFormSubmit"]
        | CreateBenefitAction["setIsSubmitting"]
        | CreateBenefitAction["setIsSuccessful"]
        | CreateBenefitAction["setIsLoading"];
      payload: boolean;
    }
  | {
      type: CreateBenefitAction["setPlanKind"];
      payload: BenefitsPlanKind | "";
    }
  | {
      type: CreateBenefitAction["setCurrency"];
      payload: Currency;
    }
  | {
      type: CreateBenefitAction["setCurrentStepperPosition"];
      payload: number;
    }
  | {
      type: CreateBenefitAction["setStepsInError"];
      payload: SetStepsInErrorPayload;
    };

type CreateBenefitReducer = (
  state: CreateBenefitState,
  action: CreateBenefitDispatch
) => CreateBenefitState;

export type {
  BenefitsDocument,
  BenefitsPlanKind,
  BenefitsSchema,
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitReducer,
  CreateBenefitState,
  Currency,
};
