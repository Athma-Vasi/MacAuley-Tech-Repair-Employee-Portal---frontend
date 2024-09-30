import type { ResourceState } from "./types";

const initialResourceState: ResourceState = {
  currentPage: 1,
  isError: false,
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  limitPerPage: "10",
  loadingMessage: "Loading",
  newQueryFlag: false,
  pagesInError: new Set(),
  queryString: "",
  resourceData: [],
  selectedDocument: null,
  selectedField: "",
  sortField: "createdAt",
  sortDirection: "ascending",
  totalDocuments: 0,
  totalPages: 1,
};

export { initialResourceState };
