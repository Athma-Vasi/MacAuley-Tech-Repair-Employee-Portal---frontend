import { CustomerOverviewObjKey } from "../../utilsOld";

type CustomerDashboardMonthlyOverviewState = {
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  overviewCalendarChartYAxisVariable: CustomerOverviewObjKey;
  overviewLineChartYAxisVariable: CustomerOverviewObjKey;
};

type CustomerDashboardMonthlyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewCalendarChartYAxisVariable: "setOverviewCalendarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardMonthlyOverviewDispatch = {
  type:
    | CustomerDashboardMonthlyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardMonthlyOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerDashboardMonthlyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerOverviewObjKey;
};

export type {
  CustomerDashboardMonthlyOverviewAction,
  CustomerDashboardMonthlyOverviewDispatch,
  CustomerDashboardMonthlyOverviewState,
};
