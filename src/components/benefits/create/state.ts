import type { CreateBenefitState } from "./types";

const initialCreateBenefitState: CreateBenefitState = {
  benefitUsername: "",
  planName: "",
  planDescription: "",
  planKind: "Other",
  planStartDate: "",
  isPlanActive: false,
  currency: "CAD",
  employerContribution: "0",
  employeeContribution: "0",
  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialCreateBenefitState };
