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
import { customerDashboardDailyNewAction } from "./actions";
import { customerDashboardDailyNewReducer } from "./reducers";
import { initialCustomerDashboardDailyNewState } from "./state";

function CustomerDashboardDailyNew({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsNew,
  dailyChartsNew,
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
  dailyCardsNew: CustomerMetricsCards["dailyCards"]["new"];
  dailyChartsNew: CustomerMetricsCharts["dailyCharts"]["new"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyNewState, customerDashboardDailyNewDispatch] = useReducer(
    customerDashboardDailyNewReducer,
    initialCustomerDashboardDailyNewState
  );

  const {
    newBarChartYAxisVariable,
    newCalendarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardDailyNewState;

  const statisticsDailyNew = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    dailyChartsNew.bar
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
    metricCategory: "New",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: newBarChartYAxisVariable,
    yAxisCalendarChartVariable: newCalendarChartYAxisVariable,
    yAxisLineChartVariable: newLineChartYAxisVariable,
    yAxisPieChartVariable: newPieChartYAxisVariable,
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
              chartData: dailyChartsNew.pie[newPieChartYAxisVariable],
              chartTitle: pieChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandPieChartNavigateLink);
        },
      }}
    />
  );

  const newPieChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        name: "Y-Axis Pie",
        parentDispatch: customerDashboardDailyNewDispatch,
        validValueAction: customerDashboardDailyNewAction.setNewPieChartYAxisVariable,
        value: newPieChartYAxisVariable,
      }}
    />
  );

  const newPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsNew.pie[newPieChartYAxisVariable]}
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
              chartData: dailyChartsNew.bar[newBarChartYAxisVariable],
              chartTitle: barChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandBarChartNavigateLink);
        },
      }}
    />
  );

  const newBarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        name: "Y-Axis Bar",
        parentDispatch: customerDashboardDailyNewDispatch,
        validValueAction: customerDashboardDailyNewAction.setNewBarChartYAxisVariable,
        value: newBarChartYAxisVariable,
      }}
    />
  );

  const newBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyChartsNew.bar[newBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA}
      unitKind="number"
    />
  );

  const expandChartButton = (
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
              chartData: dailyChartsNew.line[newLineChartYAxisVariable],
              chartTitle: lineChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandLineChartNavigateLink);
        },
      }}
    />
  );

  const newLineChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        name: "Y-Axis Line",
        parentDispatch: customerDashboardDailyNewDispatch,
        validValueAction: customerDashboardDailyNewAction.setNewLineChartYAxisVariable,
        value: newLineChartYAxisVariable,
      }}
    />
  );

  const newLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsNew.line[newLineChartYAxisVariable]}
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
              chartData: dailyChartsNew.calendar[newCalendarChartYAxisVariable],
              chartTitle: calendarChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandCalendarChartNavigateLink);
        },
      }}
    />
  );

  const newCalendarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        name: "Y-Axis Calendar",
        parentDispatch: customerDashboardDailyNewDispatch,
        validValueAction:
          customerDashboardDailyNewAction.setNewCalendarChartYAxisVariable,
        value: newCalendarChartYAxisVariable,
      }}
    />
  );

  const newCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsNew.calendar[newCalendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardDailyNew = (
    <DashboardMetricsLayout
      barChart={newBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={newBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={newLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={newLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsNew}
      padding={padding}
      pieChart={newPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={newPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Daily New Customers`}
      statisticsMap={statisticsDailyNew}
      width={width}
      calendarChart={newCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={newCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardDailyNew;
}

export default CustomerDashboardDailyNew;
