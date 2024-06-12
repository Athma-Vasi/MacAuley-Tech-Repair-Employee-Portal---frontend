import { MantineNumberSize } from "@mantine/core";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { globalAction } from "../../../../context/globalProvider/state";
import { useGlobalState } from "../../../../hooks";
import { addCommaSeparator } from "../../../../utils";
import { AccessibleButton } from "../../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../../accessibleInputs/AccessibleSelectInput";
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../charts";
import { MONTHS } from "../../constants";
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from "../../customerDashboard/constants";
import DashboardMetricsLayout from "../../DashboardMetricsLayout";
import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardMetricsView,
  Year,
} from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import {
  CustomerMetricsCharts,
  CustomerMetricsOverviewChartsKey,
  returnCalendarViewCustomerCards,
  returnCalendarViewCustomerCharts,
} from "../utils";
import { CustomerMetricsCards } from "../utilsTSX";
import { customerMetricsOverviewAction } from "./actions";
import { customerMetricsOverviewReducer } from "./reducers";
import { initialCustomerMetricsOverviewState } from "./state";

function CustomerMetricsOverview({
  borderColor,
  calendarView,
  chartHeight,
  chartWidth,
  customerMetricsCards,
  customerMetricsCharts,
  day,
  metricCategory,
  metricsView,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  calendarView: DashboardCalendarView;
  chartHeight: number;
  chartWidth: number;
  customerMetricsCards: CustomerMetricsCards;
  customerMetricsCharts: CustomerMetricsCharts;
  day: string;
  metricCategory: CustomerMetricsOverviewChartsKey;
  metricsView: DashboardMetricsView;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerMetricsOverviewState, customerMetricsOverviewDispatch] = useReducer(
    customerMetricsOverviewReducer,
    initialCustomerMetricsOverviewState
  );

  const {
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
  } = customerMetricsOverviewState;

  const { overview } = returnCalendarViewCustomerCharts(
    calendarView,
    customerMetricsCharts
  );
  const { bar: barCharts, line: lineCharts, pie: pieCharts } = overview;

  const statisticsDailyOverview =
    returnStatistics<CustomerMetricsOverviewChartsKey>(barCharts);

  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView,
    metricCategory,
    metricsView,
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
              chartData: pieCharts,
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
      pieChartData={pieCharts}
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
              chartData: barCharts[overviewBarChartYAxisVariable],
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
        parentDispatch: customerMetricsOverviewDispatch,
        validValueAction: customerMetricsOverviewAction.setOverviewBarChartYAxisVariable,
        value: overviewBarChartYAxisVariable,
      }}
    />
  );

  const overviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={barCharts[overviewBarChartYAxisVariable]}
      hideControls
      indexBy={
        calendarView === "Daily"
          ? "Days"
          : calendarView === "Monthly"
          ? "Months"
          : "Years"
      }
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
              chartData: lineCharts[overviewLineChartYAxisVariable],
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
        parentDispatch: customerMetricsOverviewDispatch,
        validValueAction: customerMetricsOverviewAction.setOverviewLineChartYAxisVariable,
        value: overviewLineChartYAxisVariable,
      }}
    />
  );

  const overviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={lineCharts[overviewLineChartYAxisVariable]}
      hideControls
      xFormat={(x) =>
        `${
          calendarView === "Daily" ? "Day" : calendarView === "Monthly" ? "Month" : "Year"
        } - ${x}`
      }
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const { overview: overviewCards } = returnCalendarViewCustomerCards(
    calendarView,
    customerMetricsCards
  );

  const customerMetricsOverview = (
    <DashboardMetricsLayout
      barChart={overviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={overviewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={overviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={overviewLineChartYAxisVariablesSelectInput}
      overviewCards={overviewCards}
      padding={padding}
      pieChart={overviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${storeLocation} Daily Overview Customers`}
      statisticsMap={statisticsDailyOverview}
      width={width}
    />
  );

  return customerMetricsOverview;
}

export default CustomerMetricsOverview;
