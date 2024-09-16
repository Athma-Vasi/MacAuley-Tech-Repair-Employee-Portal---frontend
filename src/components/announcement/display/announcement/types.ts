import type { DisplayAnnouncementAction } from "./actions";

type DisplayAnnouncementState = {
  isSubmitting: boolean;
  isSuccessful: boolean;
  rating: number;
  submitMessage: string;
  triggerRatingSubmit: boolean;
};

type DisplayAnnouncementDispatch = {
  action: DisplayAnnouncementAction["setIsSubmitting"];
  payload: boolean;
} | {
  action: DisplayAnnouncementAction["setIsSuccessful"];
  payload: boolean;
} | {
  action: DisplayAnnouncementAction["setSubmitMessage"];
  payload: string;
} | {
  action: DisplayAnnouncementAction["setTriggerRatingSubmit"];
  payload: boolean;
} | {
  action: DisplayAnnouncementAction["setRating"];
  payload: number;
};

export type { DisplayAnnouncementDispatch, DisplayAnnouncementState };
