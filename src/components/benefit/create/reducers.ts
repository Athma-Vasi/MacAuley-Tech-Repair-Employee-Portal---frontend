import { SetPageInErrorPayload } from "../../../types";
import { createBenefitAction } from "./actions";
import {
  BenefitsPlanKind,
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitState,
  Currency,
} from "./types";

function createBenefitReducer(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  const reducer = createBenefitReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const createBenefitReducersMap = new Map<
  CreateBenefitAction[keyof CreateBenefitAction],
  (state: CreateBenefitState, dispatch: CreateBenefitDispatch) => CreateBenefitState
>([
  [createBenefitAction.setCurrency, createBenefitReducer_setCurrency],
  [
    createBenefitAction.setEmployeeContribution,
    createBenefitReducer_setEmployeeContribution,
  ],
  [
    createBenefitAction.setEmployerContribution,
    createBenefitReducer_setEmployerContribution,
  ],
  [createBenefitAction.setIsPlanActive, createBenefitReducer_setIsPlanActive],
  [createBenefitAction.setIsSubmitting, createBenefitReducer_setIsSubmitting],
  [createBenefitAction.setIsSuccessful, createBenefitReducer_setIsSuccessful],
  [createBenefitAction.setPageInError, createBenefitReducer_setPageInError],
  [createBenefitAction.setPlanDescription, createBenefitReducer_setPlanDescription],
  [createBenefitAction.setPlanKind, createBenefitReducer_setPlanKind],
  [createBenefitAction.setPlanName, createBenefitReducer_setPlanName],
  [createBenefitAction.setPlanStartDate, createBenefitReducer_setPlanStartDate],
  [createBenefitAction.setTriggerFormSubmit, createBenefitReducer_setTriggerFormSubmit],
]);

function createBenefitReducer_setPlanName(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    planName: dispatch.payload as string,
  };
}

function createBenefitReducer_setPlanDescription(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    planDescription: dispatch.payload as string,
  };
}

function createBenefitReducer_setPlanStartDate(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    planStartDate: dispatch.payload as string,
  };
}

function createBenefitReducer_setPlanKind(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    planKind: dispatch.payload as BenefitsPlanKind,
  };
}

function createBenefitReducer_setIsPlanActive(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    isPlanActive: dispatch.payload as boolean,
  };
}

function createBenefitReducer_setCurrency(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    currency: dispatch.payload as Currency,
  };
}

function createBenefitReducer_setEmployerContribution(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    employerContribution: dispatch.payload as string,
  };
}

function createBenefitReducer_setEmployeeContribution(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    employeeContribution: dispatch.payload as string,
  };
}

function createBenefitReducer_setTriggerFormSubmit(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function createBenefitReducer_setPageInError(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function createBenefitReducer_setIsSubmitting(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function createBenefitReducer_setIsSuccessful(
  state: CreateBenefitState,
  dispatch: CreateBenefitDispatch
): CreateBenefitState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

export { createBenefitReducer };
