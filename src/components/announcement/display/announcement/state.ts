import type { DisplayAnnouncementState } from "./types";

const initialDisplayAnnouncementState: DisplayAnnouncementState = {
  errorMessage: "",
  isError: false,
  isSubmitting: false,
  isSuccessful: false,
  rating: 0,
  submitMessage: "",
  triggerRatingSubmit: false,
};

export { initialDisplayAnnouncementState };
