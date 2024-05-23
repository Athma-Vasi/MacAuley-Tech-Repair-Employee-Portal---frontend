import { EndorsementState } from "./types";

const initialEndorsementState: EndorsementState = {
  title: "",
  personToBeEndorsed: "",
  summaryOfEndorsement: "",
  attributeEndorsed: [],
  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialEndorsementState };
