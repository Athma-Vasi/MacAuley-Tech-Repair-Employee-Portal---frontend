import {
  ProductDashboardMonthlyAction,
  ProductDashboardMonthlyDispatch,
  ProductDashboardMonthlyState,
} from './types';

const initialProductDashboardMonthlyState: ProductDashboardMonthlyState = {
  // revenue
  revenueBarChartYAxisVariable: 'total',
  revenueCalendarChartYAxisVariable: 'total',
  revenueLineChartYAxisVariable: 'total',

  // units sold
  unitsSoldBarChartYAxisVariable: 'total',
  unitsSoldCalendarChartYAxisVariable: 'total',
  unitsSoldLineChartYAxisVariable: 'total',
};

const productDashboardMonthlyAction: ProductDashboardMonthlyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable',
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable',
  setUnitsSoldCalendarChartYAxisVariable:
    'setUnitsSoldCalendarChartYAxisVariable',
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable',
};

function productDashboardMonthlyReducer(
  state: ProductDashboardMonthlyState,
  action: ProductDashboardMonthlyDispatch
): ProductDashboardMonthlyState {
  switch (action.type) {
    // revenue
    case productDashboardMonthlyAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };
    case productDashboardMonthlyAction.setRevenueCalendarChartYAxisVariable:
      return {
        ...state,
        revenueCalendarChartYAxisVariable: action.payload,
      };
    case productDashboardMonthlyAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };

    // units sold
    case productDashboardMonthlyAction.setUnitsSoldBarChartYAxisVariable:
      return {
        ...state,
        unitsSoldBarChartYAxisVariable: action.payload,
      };
    case productDashboardMonthlyAction.setUnitsSoldCalendarChartYAxisVariable:
      return {
        ...state,
        unitsSoldCalendarChartYAxisVariable: action.payload,
      };
    case productDashboardMonthlyAction.setUnitsSoldLineChartYAxisVariable:
      return {
        ...state,
        unitsSoldLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialProductDashboardMonthlyState,
  productDashboardMonthlyAction,
  productDashboardMonthlyReducer,
};
