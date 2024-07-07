import { ResourceState } from "./types";

const initialResourceState: ResourceState = {
  currentPage: 1,
  editFieldValue: "",
  editFieldValues: [],
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
  sortFieldDirection: {
    field: "createdAt",
    direction: "ascending",
  },
  sortDirection: "ascending",
  totalDocuments: 0,
  totalPages: 10,
};

export { initialResourceState };
