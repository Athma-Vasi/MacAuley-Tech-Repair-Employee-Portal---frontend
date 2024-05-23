import { SetPageInErrorPayload } from "../../../types";
import { benefitAction } from "./actions";
import {
  BenefitAction,
  BenefitDispatch,
  BenefitsPlanKind,
  BenefitState,
  Currency,
} from "./types";

function benefitReducer(state: BenefitState, dispatch: BenefitDispatch): BenefitState {
  const reducer = benefitReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const benefitReducers = new Map<
  BenefitAction[keyof BenefitAction],
  (state: BenefitState, dispatch: BenefitDispatch) => BenefitState
>([
  [benefitAction.setCurrency, benefitReducer_setCurrency],
  [benefitAction.setEmployeeContribution, benefitReducer_setEmployeeContribution],
  [benefitAction.setEmployerContribution, benefitReducer_setEmployerContribution],
  [benefitAction.setIsPlanActive, benefitReducer_setIsPlanActive],
  [benefitAction.setIsSubmitting, benefitReducer_setIsSubmitting],
  [benefitAction.setIsSuccessful, benefitReducer_setIsSuccessful],
  [benefitAction.setPageInError, benefitReducer_setPageInError],
  [benefitAction.setPlanDescription, benefitReducer_setPlanDescription],
  [benefitAction.setPlanKind, benefitReducer_setPlanKind],
  [benefitAction.setPlanName, benefitReducer_setPlanName],
  [benefitAction.setPlanStartDate, benefitReducer_setPlanStartDate],
  [benefitAction.setTriggerFormSubmit, benefitReducer_setTriggerFormSubmit],
]);

function benefitReducer_setPlanName(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    planName: dispatch.payload as string,
  };
}

function benefitReducer_setPlanDescription(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    planDescription: dispatch.payload as string,
  };
}

function benefitReducer_setPlanStartDate(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    planStartDate: dispatch.payload as string,
  };
}

function benefitReducer_setPlanKind(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    planKind: dispatch.payload as BenefitsPlanKind,
  };
}

function benefitReducer_setIsPlanActive(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    isPlanActive: dispatch.payload as boolean,
  };
}

function benefitReducer_setCurrency(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    currency: dispatch.payload as Currency,
  };
}

function benefitReducer_setEmployerContribution(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    employerContribution: dispatch.payload as string,
  };
}

function benefitReducer_setEmployeeContribution(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    employeeContribution: dispatch.payload as string,
  };
}

function benefitReducer_setTriggerFormSubmit(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function benefitReducer_setPageInError(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function benefitReducer_setIsSubmitting(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function benefitReducer_setIsSuccessful(
  state: BenefitState,
  dispatch: BenefitDispatch
): BenefitState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

export { benefitReducer };
