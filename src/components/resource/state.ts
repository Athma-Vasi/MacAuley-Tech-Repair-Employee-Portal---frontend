import { ResourceState } from "./types";

const initialResourceState: ResourceState = {
  currentPage: 1,
  isError: false,
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  limitPerPage: "10",
  loadingMessage: "Loading",
  newQueryFlag: false,
  queryString: "",
  resourceData: [],
  selectedDocument: null,
  selectedField: "",
  sortFieldDirection: {
    field: "",
    direction: "ascending",
  },
  totalDocuments: 0,
  totalPages: 10,
};

export { initialResourceState };
