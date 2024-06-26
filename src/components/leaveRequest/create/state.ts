import type { LeaveRequestState } from "./types";

const initialLeaveRequestState: LeaveRequestState = {
  acknowledgement: false,
  additionalComments: "",
  delegatedResponsibilities: "",
  delegatedToEmployee: "",
  endDate: "",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  reasonForLeave: "Vacation",
  startDate: "",
  triggerFormSubmit: false,
};

export { initialLeaveRequestState };
