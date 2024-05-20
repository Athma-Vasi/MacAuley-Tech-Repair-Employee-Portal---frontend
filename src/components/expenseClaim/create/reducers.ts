import { Currency, SetPageInErrorPayload } from "../../../types";
import { createExpenseClaimAction } from "./actions";
import {
  CreateExpenseClaimAction,
  CreateExpenseClaimDispatch,
  CreateExpenseClaimState,
  ExpenseClaimKind,
} from "./types";

function createExpenseClaimReducer(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  const reducer = createExpenseClaimReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const createExpenseClaimReducersMap = new Map<
  CreateExpenseClaimAction[keyof CreateExpenseClaimAction],
  (
    state: CreateExpenseClaimState,
    dispatch: CreateExpenseClaimDispatch
  ) => CreateExpenseClaimState
>([
  [
    createExpenseClaimAction.setAcknowledgement,
    createExpenseClaimReducer_setAcknowledgement,
  ],
  [
    createExpenseClaimAction.setAdditionalComments,
    createExpenseClaimReducer_setAdditionalComments,
  ],
  [
    createExpenseClaimAction.setAreImagesValid,
    createExpenseClaimReducer_setAreImagesValid,
  ],
  [
    createExpenseClaimAction.setExpenseClaimAmount,
    createExpenseClaimReducer_setExpenseClaimAmount,
  ],
  [
    createExpenseClaimAction.setExpenseClaimCurrency,
    createExpenseClaimReducer_setExpenseClaimCurrency,
  ],
  [
    createExpenseClaimAction.setExpenseClaimDate,
    createExpenseClaimReducer_setExpenseClaimDate,
  ],
  [
    createExpenseClaimAction.setExpenseClaimDescription,
    createExpenseClaimReducer_setExpenseClaimDescription,
  ],
  [
    createExpenseClaimAction.setExpenseClaimKind,
    createExpenseClaimReducer_setExpenseClaimKind,
  ],
  [
    createExpenseClaimAction.setImgFormDataArray,
    createExpenseClaimReducer_setImgFormDataArray,
  ],
  [createExpenseClaimAction.setIsSubmitting, createExpenseClaimReducer_setIsSubmitting],
  [createExpenseClaimAction.setIsSuccessful, createExpenseClaimReducer_setIsSuccessful],
  [createExpenseClaimAction.setPageInError, createExpenseClaimReducer_setStepsInError],
  [
    createExpenseClaimAction.setTriggerFormSubmit,
    createExpenseClaimReducer_setTriggerFormSubmit,
  ],
]);

function createExpenseClaimReducer_setAcknowledgement(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    acknowledgement: dispatch.payload as boolean,
  };
}

function createExpenseClaimReducer_setAdditionalComments(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    additionalComments: dispatch.payload as string,
  };
}

function createExpenseClaimReducer_setAreImagesValid(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    areImagesValid: dispatch.payload as boolean,
  };
}

function createExpenseClaimReducer_setExpenseClaimAmount(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    expenseClaimAmount: dispatch.payload as string,
  };
}

function createExpenseClaimReducer_setExpenseClaimCurrency(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    expenseClaimCurrency: dispatch.payload as Currency,
  };
}

function createExpenseClaimReducer_setExpenseClaimDate(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    expenseClaimDate: dispatch.payload as string,
  };
}

function createExpenseClaimReducer_setExpenseClaimDescription(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    expenseClaimDescription: dispatch.payload as string,
  };
}

function createExpenseClaimReducer_setExpenseClaimKind(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    expenseClaimKind: dispatch.payload as ExpenseClaimKind,
  };
}

function createExpenseClaimReducer_setImgFormDataArray(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    files: dispatch.payload as FormData[],
  };
}

function createExpenseClaimReducer_setIsSubmitting(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function createExpenseClaimReducer_setIsSuccessful(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function createExpenseClaimReducer_setStepsInError(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function createExpenseClaimReducer_setTriggerFormSubmit(
  state: CreateExpenseClaimState,
  dispatch: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

export { createExpenseClaimReducer, createExpenseClaimReducersMap };
