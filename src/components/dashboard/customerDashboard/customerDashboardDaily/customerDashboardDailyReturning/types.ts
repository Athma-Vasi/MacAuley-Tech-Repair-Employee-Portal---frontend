import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from "../../utilsOld";

type CustomerDashboardDailyReturningState = {
  returningBarChartYAxisVariable: CustomerNewReturningObjKey;
  returningCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
  returningLineChartYAxisVariable: CustomerNewReturningObjKey;
  returningPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardDailyReturningAction = {
  setReturningBarChartYAxisVariable: "setReturningBarChartYAxisVariable";
  setReturningCalendarChartYAxisVariable: "setReturningCalendarChartYAxisVariable";
  setReturningLineChartYAxisVariable: "setReturningLineChartYAxisVariable";
  setReturningPieChartYAxisVariable: "setReturningPieChartYAxisVariable";
};

type CustomerDashboardDailyReturningDispatch =
  | {
      type:
        | CustomerDashboardDailyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardDailyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardDailyReturningAction["setReturningCalendarChartYAxisVariable"];
      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type: CustomerDashboardDailyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardDailyReturningAction,
  CustomerDashboardDailyReturningDispatch,
  CustomerDashboardDailyReturningState,
};
