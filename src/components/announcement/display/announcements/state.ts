import type { DisplayAnnouncementsState } from "./types";

const initialDisplayAnnouncementsState: DisplayAnnouncementsState = {
  currentPage: 1,
  errorMessage: "",
  isError: false,
  isLoading: true,
  loadingMessage: "",
  newQueryFlag: false,
  pages: 0,
  responseData: null,
  totalDocuments: 0,
};

export { initialDisplayAnnouncementsState };
