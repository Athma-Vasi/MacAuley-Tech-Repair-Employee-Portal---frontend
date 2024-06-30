import { ResourceAction, resourceAction } from "./actions";
import { ResourceDispatch, ResourceState } from "./types";

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
  [resourceAction.setIsError, resourceReducer_setIsError],
  [resourceAction.setIsLoading, resourceReducer_setIsLoading],
  [resourceAction.setIsSubmitting, resourceReducer_setIsSubmitting],
  [resourceAction.setIsSuccessful, resourceReducer_setIsSuccessful],
  [resourceAction.setNewQueryFlag, resourceReducer_setNewQueryFlag],
  [resourceAction.setPaginationsAmount, resourceReducer_setPaginationsAmount],
  [resourceAction.setQueryString, resourceReducer_setQueryString],
  [resourceAction.setTotalDocuments, resourceReducer_setTotalDocuments],
]);

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

function resourceReducer_setNewQueryFlag(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, newQueryFlag: dispatch.payload as boolean };
}

function resourceReducer_setPaginationsAmount(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, paginationsAmount: dispatch.payload as number };
}

function resourceReducer_setQueryString(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, queryString: dispatch.payload as string };
}

function resourceReducer_setTotalDocuments(
  state: ResourceState,
  dispatch: ResourceDispatch
): ResourceState {
  return { ...state, totalDocuments: dispatch.payload as number };
}

export { resourceReducer };
