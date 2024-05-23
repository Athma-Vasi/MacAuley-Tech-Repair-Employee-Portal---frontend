import type { RequestResourceState } from "./types";

const initialRequestResourceState: RequestResourceState = {
  additionalInformation: "",
  dateNeededBy: "",
  department: "Store Administration",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  reasonForRequest: "",
  resourceDescription: "",
  resourceQuantity: "0",
  resourceType: "Access",
  triggerFormSubmit: false,
  urgency: "low",
};

export { initialRequestResourceState };
