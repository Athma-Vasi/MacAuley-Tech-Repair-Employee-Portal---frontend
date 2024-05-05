import { CustomerOverviewObjKey } from "../../utilsOld";

type CustomerDashboardDailyOverviewState = {
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  overviewCalendarChartYAxisVariable: CustomerOverviewObjKey;
  overviewLineChartYAxisVariable: CustomerOverviewObjKey;
};

type CustomerDashboardDailyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewCalendarChartYAxisVariable: "setOverviewCalendarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardDailyOverviewDispatch = {
  type:
    | CustomerDashboardDailyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerOverviewObjKey;
};

export type {
  CustomerDashboardDailyOverviewAction,
  CustomerDashboardDailyOverviewDispatch,
  CustomerDashboardDailyOverviewState,
};
