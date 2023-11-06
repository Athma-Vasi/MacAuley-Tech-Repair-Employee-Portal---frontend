import {
  ProductDashboardDailyAction,
  ProductDashboardDailyDispatch,
  ProductDashboardDailyState,
} from './types';

const initialProductDashboardDailyState: ProductDashboardDailyState = {
  // revenue
  barChartYAxisVariable: 'total',
  revenueCalendarChartYAxisVariable: 'total',
  revenueLineChartYAxisVariable: 'total',

  // units sold
  unitsSoldBarChartYAxisVariable: 'total',
  unitsSoldCalendarChartYAxisVariable: 'total',
  unitsSoldLineChartYAxisVariable: 'total',
};

const productDashboardDailyAction: ProductDashboardDailyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable',
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable',
  setUnitsSoldCalendarChartYAxisVariable:
    'setUnitsSoldCalendarChartYAxisVariable',
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable',
};

function productDashboardDailyReducer(
  state: ProductDashboardDailyState,
  action: ProductDashboardDailyDispatch
): ProductDashboardDailyState {
  switch (action.type) {
    // revenue
    case productDashboardDailyAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        barChartYAxisVariable: action.payload,
      };
    case productDashboardDailyAction.setRevenueCalendarChartYAxisVariable:
      return {
        ...state,
        revenueCalendarChartYAxisVariable: action.payload,
      };
    case productDashboardDailyAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };

    // units sold
    case productDashboardDailyAction.setUnitsSoldBarChartYAxisVariable:
      return {
        ...state,
        unitsSoldBarChartYAxisVariable: action.payload,
      };
    case productDashboardDailyAction.setUnitsSoldCalendarChartYAxisVariable:
      return {
        ...state,
        unitsSoldCalendarChartYAxisVariable: action.payload,
      };
    case productDashboardDailyAction.setUnitsSoldLineChartYAxisVariable:
      return {
        ...state,
        unitsSoldLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialProductDashboardDailyState,
  productDashboardDailyAction,
  productDashboardDailyReducer,
};
