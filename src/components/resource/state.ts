import { ResourceState } from "./types";

const initialResourceState: ResourceState = {
  isError: false,
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  newQueryFlag: false,
  paginationsAmount: 0,
  queryString: "",
  totalDocuments: 0,
};

export { initialResourceState };
