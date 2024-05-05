import { MantineNumberSize } from "@mantine/core";
import { ChangeEvent, useReducer } from "react";
import { LuExpand } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { globalAction } from "../../../../../context/globalProvider/state";
import { useGlobalState } from "../../../../../hooks";
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from "../../../../../jsxCreators";
import { addCommaSeparator } from "../../../../../utils";
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
import {
  customerDashboardDailyOverviewAction,
  customerDashboardDailyOverviewReducer,
  initialCustomerDashboardDailyOverviewState,
} from "./state";

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

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
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
      leftIcon: <LuExpand />,
    },
  ]);

  const overviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsOverview.pie}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
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
      leftIcon: <LuExpand />,
    },
  ]);

  const [overviewBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsOverviewChartsKey,
          });
        },
        value: overviewBarChartYAxisVariable,
      },
    ]
  );

  const overviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyChartsOverview.bar[overviewBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
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
      leftIcon: <LuExpand />,
    },
  ]);

  const [overviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsOverviewChartsKey,
          });
        },
        value: overviewLineChartYAxisVariable,
      },
    ]);

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

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
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
      leftIcon: <LuExpand />,
    },
  ]);

  const [overviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewCalendarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsOverviewChartsKey,
          });
        },
        value: overviewCalendarChartYAxisVariable,
      },
    ]);

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
