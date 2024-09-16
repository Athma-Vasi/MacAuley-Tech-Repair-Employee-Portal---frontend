import type { DisplayAnnouncementState } from "./types";

const initialDisplayAnnouncementState: DisplayAnnouncementState = {
  triggerRatingSubmit: false,
  isSubmitting: false,
  submitMessage: "",
  isSuccessful: false,
  rating: 0,
};

export { initialDisplayAnnouncementState };
