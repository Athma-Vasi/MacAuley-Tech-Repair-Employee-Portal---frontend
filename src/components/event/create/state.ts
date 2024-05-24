import { EventState } from "./types";

const initialEventState: EventState = {
  title: "",
  kind: "Webinar",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  location: "",
  description: "",
  attendees: "",
  requiredItems: "",
  rsvpDeadline: "",
  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialEventState };
