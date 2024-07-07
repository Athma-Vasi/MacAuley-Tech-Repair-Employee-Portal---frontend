import { QueryResponseData, SetPageInErrorPayload } from "../../types";
import { SortDirection } from "../query/types";
import { ResourceAction, resourceAction } from "./actions";
import {
  LimitPerPage,
  ResourceDispatch,
  ResourceState,
  SortFieldDirection,
} from "./types";

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
  [resourceAction.setEditFieldValue, resourceReducer_setEditFieldValue],
  [resourceAction.setEditFieldValues, resourceReducer_setEditFieldValues],
  [resourceAction.setIsError, resourceReducer_setIsError],
  [resourceAction.setIsLoading, resourceReducer_setIsLoading],
  [resourceAction.setIsSubmitting, resourceReducer_setIsSubmitting],
  [resourceAction.setIsSuccessful, resourceReducer_setIsSuccessful],
  [resourceAction.setLimitPerPage, resourceReducer_setLimitPerPage],
  [resourceAction.setLoadingMessage, resourceReducer_setLoadingMessage],
  [resourceAction.setNewQueryFlag, resourceReducer_setNewQueryFlag],
  [resourceAction.setPageInError, resourceReducer_setPageInError],
  [resourceAction.setQueryString, resourceReducer_setQueryString],
  [resourceAction.setResourceData, resourceReducer_setResourceData],
  [resourceAction.setSelectedDocument, resourceReducer_setSelectedDocument],
  [resourceAction.setSelectedField, resourceReducer_setSelectedField],
  [resourceAction.setSortField, resourceReducer_setSortField],
  [resourceAction.setSortFieldDirection, resourceReducer_setSortFieldDirection],
  [resourceAction.setSortDirection, resourceReducer_setSortDirection],
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

function resourceReducer_setEditFieldValue(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, editFieldValue: dispatch.payload as string };
}

function resourceReducer_setEditFieldValues(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, editFieldValues: dispatch.payload as Array<string> };
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

function resourceReducer_setPageInError(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
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

function resourceReducer_setSelectedDocument(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, selectedDocument: dispatch.payload as QueryResponseData };
}

function resourceReducer_setSelectedField(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, selectedField: dispatch.payload as string };
}

function resourceReducer_setSortField(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  const field = dispatch.payload as string;
  const direction = state.sortDirection;
  const clonedData = structuredClone(state.resourceData);

  const sortedData = clonedData.sort((a: QueryResponseData, b: QueryResponseData) => {
    const left = a[field] as string;
    const right = b[field] as string;

    return direction === "ascending"
      ? left < right
        ? -1
        : left > right
        ? 1
        : 0
      : left > right
      ? -1
      : left < right
      ? 1
      : 0;
  });

  return { ...state, resourceData: sortedData, sortField: field };
}

function resourceReducer_setSortFieldDirection(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  const { field, direction } = dispatch.payload as SortFieldDirection;
  const clonedData = structuredClone(state.resourceData);

  const sortedData = clonedData.sort((a: QueryResponseData, b: QueryResponseData) => {
    const left = a[field] as string;
    const right = b[field] as string;

    return direction === "ascending"
      ? left < right
        ? -1
        : left > right
        ? 1
        : 0
      : left > right
      ? -1
      : left < right
      ? 1
      : 0;
  });

  return { ...state, resourceData: sortedData, sortFieldDirection: { field, direction } };
}

function resourceReducer_setSortDirection(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  const direction = dispatch.payload as SortDirection;
  const field = state.sortField;
  const clonedData = structuredClone(state.resourceData);

  const sortedData = clonedData.sort((a: QueryResponseData, b: QueryResponseData) => {
    const left = a[field] as string;
    const right = b[field] as string;

    return direction === "ascending"
      ? left < right
        ? -1
        : left > right
        ? 1
        : 0
      : left > right
      ? -1
      : left < right
      ? 1
      : 0;
  });

  return { ...state, resourceData: sortedData, sortDirection: direction };
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
