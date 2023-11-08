import {
  ProductDashboardYearlyAction,
  ProductDashboardYearlyDispatch,
  ProductDashboardYearlyState,
} from './types';

const initialProductDashboardYearlyState: ProductDashboardYearlyState = {
  // revenue
  revenueBarChartYAxisVariable: 'total',
  revenueLineChartYAxisVariable: 'total',

  // units sold
  unitsSoldBarChartYAxisVariable: 'total',
  unitsSoldLineChartYAxisVariable: 'total',
};

const productDashboardYearlyAction: ProductDashboardYearlyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable',
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable',
};

function productDashboardYearlyReducer(
  state: ProductDashboardYearlyState,
  action: ProductDashboardYearlyDispatch
): ProductDashboardYearlyState {
  switch (action.type) {
    // revenue
    case productDashboardYearlyAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };
    case productDashboardYearlyAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };

    // units sold
    case productDashboardYearlyAction.setUnitsSoldBarChartYAxisVariable:
      return {
        ...state,
        unitsSoldBarChartYAxisVariable: action.payload,
      };
    case productDashboardYearlyAction.setUnitsSoldLineChartYAxisVariable:
      return {
        ...state,
        unitsSoldLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialProductDashboardYearlyState,
  productDashboardYearlyAction,
  productDashboardYearlyReducer,
};
