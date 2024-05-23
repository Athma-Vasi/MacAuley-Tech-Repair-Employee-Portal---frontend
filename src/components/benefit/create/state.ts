import type { BenefitState } from "./types";

const initialBenefitState: BenefitState = {
  currency: "CAD",
  employeeContribution: "0",
  employerContribution: "0",
  isPlanActive: false,
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  planDescription: "",
  planKind: "Other",
  planName: "",
  planStartDate: "",
  triggerFormSubmit: false,
};

export { initialBenefitState };
