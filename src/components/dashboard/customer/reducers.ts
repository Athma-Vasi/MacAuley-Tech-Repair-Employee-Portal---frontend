import { CustomerMetricsAction, customerMetricsAction } from "./actions";
import { CustomerMetricsDispatch, CustomerMetricsState } from "./types";
import { CustomerMetricsCharts } from "./utils";
import { CustomerMetricsCards } from "./utilsTSX";

function customerMetricsReducer(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch
): CustomerMetricsState {
  const reducer = customerMetricsReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerMetricsReducers = new Map<
  CustomerMetricsAction[keyof CustomerMetricsAction],
  (state: CustomerMetricsState, dispatch: CustomerMetricsDispatch) => CustomerMetricsState
>([
  [
    customerMetricsAction.setCustomerMetricsCards,
    customerMetricsReducer_setCustomerMetricsCards,
  ],
  [
    customerMetricsAction.setCustomerMetricsCharts,
    customerMetricsReducer_setCustomerMetricsCharts,
  ],
  [customerMetricsAction.setIsGenerating, customerMetricsReducer_setIsGenerating],
]);

function customerMetricsReducer_setCustomerMetricsCards(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch
): CustomerMetricsState {
  return {
    ...state,
    customerMetricsCards: dispatch.payload as CustomerMetricsCards,
  };
}

function customerMetricsReducer_setCustomerMetricsCharts(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch
): CustomerMetricsState {
  return {
    ...state,
    customerMetricsCharts: dispatch.payload as CustomerMetricsCharts,
  };
}

function customerMetricsReducer_setIsGenerating(
  state: CustomerMetricsState,
  dispatch: CustomerMetricsDispatch
): CustomerMetricsState {
  return {
    ...state,
    isGenerating: dispatch.payload as boolean,
  };
}

export { customerMetricsReducer };
