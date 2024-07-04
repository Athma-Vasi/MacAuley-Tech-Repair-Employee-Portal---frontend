import { QueryResponseData } from "../../types";
import { ResourceAction, resourceAction } from "./actions";
import { LimitPerPage, ResourceDispatch, ResourceState } from "./types";

function resourceReducer(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  const reducer = resourceReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const resourceReducers = new Map<
  ResourceAction[keyof ResourceAction],
  (state: ResourceState, dispatch: ResourceDispatch) => ResourceState
>([
  [resourceAction.setCurrentPage, resourceReducer_setCurrentPage],
  [resourceAction.setIsError, resourceReducer_setIsError],
  [resourceAction.setIsLoading, resourceReducer_setIsLoading],
  [resourceAction.setIsSubmitting, resourceReducer_setIsSubmitting],
  [resourceAction.setIsSuccessful, resourceReducer_setIsSuccessful],
  [resourceAction.setLimitPerPage, resourceReducer_setLimitPerPage],
  [resourceAction.setLoadingMessage, resourceReducer_setLoadingMessage],
  [resourceAction.setNewQueryFlag, resourceReducer_setNewQueryFlag],
  [resourceAction.setQueryString, resourceReducer_setQueryString],
  [resourceAction.setResourceData, resourceReducer_setResourceData],
  [resourceAction.setTotalPages, resourceReducer_setTotalPages],
  [resourceAction.setTotalDocuments, resourceReducer_setTotalDocuments],
]);

function resourceReducer_setCurrentPage(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  // const currentPage = (dispatch.payload as number) + 1;
  // const newPage = currentPage > state.totalPages ? state.totalPages : currentPage;
  // return { ...state, currentPage: newPage };
  return { ...state, currentPage: dispatch.payload as number };
}

function resourceReducer_setIsError(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, isError: dispatch.payload as boolean };
}

function resourceReducer_setIsLoading(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, isLoading: dispatch.payload as boolean };
}

function resourceReducer_setIsSubmitting(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

function resourceReducer_setIsSuccessful(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

function resourceReducer_setLimitPerPage(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, limitPerPage: dispatch.payload as LimitPerPage };
}

function resourceReducer_setLoadingMessage(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, loadingMessage: dispatch.payload as string };
}

function resourceReducer_setNewQueryFlag(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, newQueryFlag: dispatch.payload as boolean };
}

function resourceReducer_setQueryString(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, queryString: dispatch.payload as string };
}

function resourceReducer_setResourceData(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, resourceData: dispatch.payload as Array<QueryResponseData> };
}

function resourceReducer_setTotalPages(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, totalPages: dispatch.payload as number };
}

function resourceReducer_setTotalDocuments(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, totalDocuments: dispatch.payload as number };
}

export { resourceReducer };
