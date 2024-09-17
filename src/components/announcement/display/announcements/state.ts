import type { DisplayAnnouncementsState } from "./types";

const initialDisplayAnnouncementsState: DisplayAnnouncementsState = {
  currentPage: 1,
  isLoading: true,
  pages: 0,
  responseData: null,
  totalDocuments: 0,
};

export { initialDisplayAnnouncementsState };
