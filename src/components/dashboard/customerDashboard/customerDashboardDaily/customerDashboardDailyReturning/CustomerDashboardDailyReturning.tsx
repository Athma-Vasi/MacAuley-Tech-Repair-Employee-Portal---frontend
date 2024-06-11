import { MantineNumberSize } from "@mantine/core";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { globalAction } from "../../../../../context/globalProvider/state";
import { useGlobalState } from "../../../../../hooks";
import { addCommaSeparator } from "../../../../../utils";
import { AccessibleButton } from "../../../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../../../accessibleInputs/AccessibleSelectInput";
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../../charts";
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from "../../constants";
import { CustomerMetricsCharts, CustomerMetricsNewReturningChartsKey } from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import { customerDashboardDailyReturningAction } from "./actions";
import { customerDashboardDailyReturningReducer } from "./reducers";
import { initialCustomerDashboardDailyReturningState } from "./state";

function CustomerDashboardDailyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsReturning,
  dailyChartsReturning,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsReturning: CustomerMetricsCards["dailyCards"]["returning"];
  dailyChartsReturning: CustomerMetricsCharts["dailyCharts"]["returning"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyReturningState, customerDashboardDailyReturningDispatch] =
    useReducer(
      customerDashboardDailyReturningReducer,
      initialCustomerDashboardDailyReturningState
    );

  const {
    returningBarChartYAxisVariable,
    returningCalendarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardDailyReturningState;

  const statisticsDailyReturning = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    dailyChartsReturning.bar
  );

  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Daily",
    metricCategory: "Returning",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: returningBarChartYAxisVariable,
    yAxisCalendarChartVariable: returningCalendarChartYAxisVariable,
    yAxisLineChartVariable: returningLineChartYAxisVariable,
    yAxisPieChartVariable: returningPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const expandPieChartButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: `Expand and customize ${pieChartHeading}`,
        kind: "expand",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartKind: "pie",
              chartData: dailyChartsReturning.pie[returningPieChartYAxisVariable],
              chartTitle: pieChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandPieChartNavigateLink);
        },
      }}
    />
  );

  const returningPieChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        name: "Y-Axis Pie",
        parentDispatch: customerDashboardDailyReturningDispatch,
        validValueAction:
          customerDashboardDailyReturningAction.setReturningPieChartYAxisVariable,
        value: returningPieChartYAxisVariable,
      }}
    />
  );

  const returningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsReturning.pie[returningPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  const expandBarChartButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: `Expand and customize ${barChartHeading}`,
        kind: "expand",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartKind: "bar",
              chartData: dailyChartsReturning.bar[returningBarChartYAxisVariable],
              chartTitle: barChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandBarChartNavigateLink);
        },
      }}
    />
  );

  const returningBarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        name: "Y-Axis Bar",
        parentDispatch: customerDashboardDailyReturningDispatch,
        validValueAction:
          customerDashboardDailyReturningAction.setReturningBarChartYAxisVariable,
        value: returningBarChartYAxisVariable,
      }}
    />
  );

  const returningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyChartsReturning.bar[returningBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA}
      unitKind="number"
    />
  );

  const expandLineChartButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: `Expand and customize ${lineChartHeading}`,
        kind: "expand",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartKind: "line",
              chartData: dailyChartsReturning.line[returningLineChartYAxisVariable],
              chartTitle: lineChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandLineChartNavigateLink);
        },
      }}
    />
  );

  const returningLineChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        name: "Y-Axis Line",
        parentDispatch: customerDashboardDailyReturningDispatch,
        validValueAction:
          customerDashboardDailyReturningAction.setReturningLineChartYAxisVariable,
        value: returningLineChartYAxisVariable,
      }}
    />
  );

  const returningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsReturning.line[returningLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const expandCalendarChartButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: `Expand and customize ${calendarChartHeading}`,
        kind: "expand",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartKind: "calendar",
              chartData:
                dailyChartsReturning.calendar[returningCalendarChartYAxisVariable],
              chartTitle: calendarChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandCalendarChartNavigateLink);
        },
      }}
    />
  );

  const returningCalendarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        name: "Y-Axis Calendar",
        parentDispatch: customerDashboardDailyReturningDispatch,
        validValueAction:
          customerDashboardDailyReturningAction.setReturningCalendarChartYAxisVariable,
        value: returningCalendarChartYAxisVariable,
      }}
    />
  );

  const returningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsReturning.calendar[returningCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardDailyReturning = (
    <DashboardMetricsLayout
      barChart={returningBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={returningBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={returningLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={returningLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsReturning}
      padding={padding}
      pieChart={returningPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={returningPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Daily Returning Customers`}
      statisticsMap={statisticsDailyReturning}
      width={width}
      calendarChart={returningCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={returningCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardDailyReturning;
}

export default CustomerDashboardDailyReturning;
