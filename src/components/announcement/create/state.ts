import type { AnnouncementState } from "./types";

const initialAnnouncementState: AnnouncementState = {
  article: [""],
  author: "",
  bannerImageAlt: "",
  bannerImageSrc: "",
  errorMessage: "",
  isError: false,
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  title: "",
  triggerFormSubmit: false,
};

export { initialAnnouncementState };
