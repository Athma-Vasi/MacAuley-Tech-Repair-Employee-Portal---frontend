import { ResourceState } from "./types";

const initialResourceState: ResourceState = {
  currentPage: 1,
  isError: false,
  isLoading: true,
  isSubmitting: false,
  isSuccessful: false,
  limitPerPage: "10",
  loadingMessage: "Loading",
  newQueryFlag: false,
  queryString: "",
  resourceData: [],
  totalDocuments: 0,
  totalPages: 10,
};

export { initialResourceState };
