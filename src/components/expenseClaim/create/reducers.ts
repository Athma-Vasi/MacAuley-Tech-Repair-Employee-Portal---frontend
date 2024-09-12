import type { Currency, SetPageInErrorPayload } from "../../../types";
import { expenseClaimAction } from "./actions";
import type {
  ExpenseClaimAction,
  ExpenseClaimDispatch,
  ExpenseClaimKind,
  ExpenseClaimState,
} from "./types";

function expenseClaimReducer(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  const reducer = expenseClaimReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const expenseClaimReducersMap = new Map<
  ExpenseClaimAction[keyof ExpenseClaimAction],
  (
    state: ExpenseClaimState,
    dispatch: ExpenseClaimDispatch,
  ) => ExpenseClaimState
>([
  [
    expenseClaimAction.setAcknowledgement,
    expenseClaimReducer_setAcknowledgement,
  ],
  [
    expenseClaimAction.setAdditionalComments,
    expenseClaimReducer_setAdditionalComments,
  ],
  [
    expenseClaimAction.setExpenseClaimAmount,
    expenseClaimReducer_setExpenseClaimAmount,
  ],
  [
    expenseClaimAction.setExpenseClaimCurrency,
    expenseClaimReducer_setExpenseClaimCurrency,
  ],
  [
    expenseClaimAction.setExpenseClaimDate,
    expenseClaimReducer_setExpenseClaimDate,
  ],
  [
    expenseClaimAction.setExpenseClaimDescription,
    expenseClaimReducer_setExpenseClaimDescription,
  ],
  [
    expenseClaimAction.setExpenseClaimKind,
    expenseClaimReducer_setExpenseClaimKind,
  ],
  [expenseClaimAction.setFormData, expenseClaimReducer_setFormData],
  [expenseClaimAction.setIsSubmitting, expenseClaimReducer_setIsSubmitting],
  [expenseClaimAction.setIsSuccessful, expenseClaimReducer_setIsSuccessful],
  [expenseClaimAction.setPageInError, expenseClaimReducer_setStepsInError],
  [
    expenseClaimAction.setTriggerFormSubmit,
    expenseClaimReducer_setTriggerFormSubmit,
  ],
]);

function expenseClaimReducer_setAcknowledgement(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    acknowledgement: dispatch.payload as boolean,
  };
}

function expenseClaimReducer_setAdditionalComments(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    additionalComments: dispatch.payload as string,
  };
}

function expenseClaimReducer_setExpenseClaimAmount(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    expenseClaimAmount: dispatch.payload as string,
  };
}

function expenseClaimReducer_setExpenseClaimCurrency(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    expenseClaimCurrency: dispatch.payload as Currency,
  };
}

function expenseClaimReducer_setExpenseClaimDate(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    expenseClaimDate: dispatch.payload as string,
  };
}

function expenseClaimReducer_setExpenseClaimDescription(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    expenseClaimDescription: dispatch.payload as string,
  };
}

function expenseClaimReducer_setExpenseClaimKind(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    expenseClaimKind: dispatch.payload as ExpenseClaimKind,
  };
}

function expenseClaimReducer_setFormData(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    formData: dispatch.payload as FormData,
  };
}

function expenseClaimReducer_setIsSubmitting(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function expenseClaimReducer_setIsSuccessful(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function expenseClaimReducer_setStepsInError(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function expenseClaimReducer_setTriggerFormSubmit(
  state: ExpenseClaimState,
  dispatch: ExpenseClaimDispatch,
): ExpenseClaimState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

export { expenseClaimReducer, expenseClaimReducersMap };
