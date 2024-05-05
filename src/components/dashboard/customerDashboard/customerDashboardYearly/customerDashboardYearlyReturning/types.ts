import {
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from "../../utilsOld";

type CustomerDashboardYearlyReturningState = {
  returningBarChartYAxisVariable: CustomerNewReturningObjKey;
  returningLineChartYAxisVariable: CustomerNewReturningObjKey;
  returningPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardYearlyReturningAction = {
  setReturningBarChartYAxisVariable: "setReturningBarChartYAxisVariable";
  setReturningLineChartYAxisVariable: "setReturningLineChartYAxisVariable";
  setReturningPieChartYAxisVariable: "setReturningPieChartYAxisVariable";
};

type CustomerDashboardYearlyReturningDispatch =
  | {
      type:
        | CustomerDashboardYearlyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardYearlyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardYearlyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardYearlyReturningAction,
  CustomerDashboardYearlyReturningDispatch,
  CustomerDashboardYearlyReturningState,
};
