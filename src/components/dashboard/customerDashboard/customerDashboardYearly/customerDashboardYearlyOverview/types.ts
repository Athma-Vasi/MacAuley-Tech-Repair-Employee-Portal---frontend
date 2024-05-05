import { CustomerOverviewObjKey } from "../../utilsOld";

type CustomerDashboardYearlyOverviewState = {
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  overviewLineChartYAxisVariable: CustomerOverviewObjKey;
};

type CustomerDashboardYearlyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardYearlyOverviewDispatch = {
  type:
    | CustomerDashboardYearlyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardYearlyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerOverviewObjKey;
};

export type {
  CustomerDashboardYearlyOverviewAction,
  CustomerDashboardYearlyOverviewDispatch,
  CustomerDashboardYearlyOverviewState,
};
