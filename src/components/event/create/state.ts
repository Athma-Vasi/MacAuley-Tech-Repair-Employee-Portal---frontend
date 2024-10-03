import type { EventState } from "./types";

const initialEventState: EventState = {
  attendees: "",
  description: "",
  endDate: "",
  endTime: "",
  errorMessage: "",
  isError: false,
  isSubmitting: false,
  isSuccessful: false,
  kind: "Webinar",
  location: "",
  pagesInError: new Set(),
  requiredItems: "",
  rsvpDeadline: "",
  startDate: "",
  startTime: "",
  title: "",
  triggerFormSubmit: false,
};

export { initialEventState };
