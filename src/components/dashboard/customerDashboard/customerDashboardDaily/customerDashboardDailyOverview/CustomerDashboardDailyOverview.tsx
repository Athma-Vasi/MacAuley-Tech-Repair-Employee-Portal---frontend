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
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from "../../constants";
import { CustomerMetricsCharts, CustomerMetricsOverviewChartsKey } from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import { customerDashboardDailyOverviewAction } from "./actions";
import { customerDashboardDailyOverviewReducer } from "./reducers";
import { initialCustomerDashboardDailyOverviewState } from "./state";

function CustomerDashboardDailyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsOverview,
  dailyChartsOverview,
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
  dailyCardsOverview: CustomerMetricsCards["dailyCards"]["overview"];
  dailyChartsOverview: CustomerMetricsCharts["dailyCharts"]["overview"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyOverviewState, customerDashboardDailyOverviewDispatch] =
    useReducer(
      customerDashboardDailyOverviewReducer,
      initialCustomerDashboardDailyOverviewState
    );

  const {
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
  } = customerDashboardDailyOverviewState;

  const statisticsDailyOverview = returnStatistics<CustomerMetricsOverviewChartsKey>(
    dailyChartsOverview.bar
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
    metricCategory: "Overview",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: overviewBarChartYAxisVariable,
    yAxisCalendarChartVariable: overviewCalendarChartYAxisVariable,
    yAxisLineChartVariable: overviewLineChartYAxisVariable,
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
              chartData: dailyChartsOverview.pie,
              chartTitle: pieChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandPieChartNavigateLink);
        },
      }}
    />
  );

  const overviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsOverview.pie}
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
              chartData: dailyChartsOverview.bar[overviewBarChartYAxisVariable],
              chartTitle: barChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandBarChartNavigateLink);
        },
      }}
    />
  );

  const overviewBarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        name: "Y-Axis Bar",
        parentDispatch: customerDashboardDailyOverviewDispatch,
        validValueAction:
          customerDashboardDailyOverviewAction.setOverviewBarChartYAxisVariable,
        value: overviewBarChartYAxisVariable,
      }}
    />
  );

  const overviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyChartsOverview.bar[overviewBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA}
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
              chartData: dailyChartsOverview.line[overviewLineChartYAxisVariable],
              chartTitle: lineChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandLineChartNavigateLink);
        },
      }}
    />
  );

  const overviewLineChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        name: "Y-Axis Line",
        parentDispatch: customerDashboardDailyOverviewDispatch,
        validValueAction:
          customerDashboardDailyOverviewAction.setOverviewLineChartYAxisVariable,
        value: overviewLineChartYAxisVariable,
      }}
    />
  );

  const overviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsOverview.line[overviewLineChartYAxisVariable]}
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
              chartData: dailyChartsOverview.calendar[overviewCalendarChartYAxisVariable],
              chartTitle: calendarChartHeading,
              chartUnitKind: "number",
            },
          });

          navigate(expandCalendarChartNavigateLink);
        },
      }}
    />
  );

  const overviewCalendarChartYAxisVariablesSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        name: "Y-Axis Calendar",
        parentDispatch: customerDashboardDailyOverviewDispatch,
        validValueAction:
          customerDashboardDailyOverviewAction.setOverviewCalendarChartYAxisVariable,
        value: overviewCalendarChartYAxisVariable,
      }}
    />
  );

  const overviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsOverview.calendar[overviewCalendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardDailyOverview = (
    <DashboardMetricsLayout
      barChart={overviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={overviewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={overviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={overviewLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsOverview}
      padding={padding}
      pieChart={overviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${storeLocation} Daily Overview Customers`}
      statisticsMap={statisticsDailyOverview}
      width={width}
      calendarChart={overviewCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={overviewCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardDailyOverview;
}

export default CustomerDashboardDailyOverview;
