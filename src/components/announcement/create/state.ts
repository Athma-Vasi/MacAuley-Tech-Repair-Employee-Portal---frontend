import { AnnouncementState } from "./types";

const initialAnnouncementState: AnnouncementState = {
  title: "",
  author: "",
  bannerImageSrc: "",
  bannerImageAlt: "",
  article: [""],
  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialAnnouncementState };
