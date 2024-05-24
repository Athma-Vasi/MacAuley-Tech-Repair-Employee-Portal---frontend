import type { RefermentState } from "./types";

const initialRefermentState: RefermentState = {
  candidateFullName: "",
  candidateEmail: "",
  candidateContactNumber: "",
  candidateCurrentJobTitle: "",
  candidateCurrentCompany: "",
  candidateProfileUrl: "",
  departmentReferredFor: "Store Administration",
  positionReferredFor: "Accounting Manager",
  positionJobDescription: "",
  referralReason: "",
  additionalInformation: "",
  privacyConsent: false,
  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialRefermentState };
