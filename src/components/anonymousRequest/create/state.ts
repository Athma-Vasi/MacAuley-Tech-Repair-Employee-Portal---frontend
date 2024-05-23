import { AnonymousRequestState } from "./types";

const initialAnonymousRequestState: AnonymousRequestState = {
  additionalInformation: "",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  requestDescription: "",
  requestKind: "Workplace safety",
  secureContactEmail: "",
  secureContactNumber: "",
  title: "",
  triggerFormSubmit: false,
  urgency: "low",
};

export { initialAnonymousRequestState };
