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
import { addCommaSeparator, splitCamelCase } from "../../../../../utils";
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
  customerDashboardMonthlyOverviewAction,
  customerDashboardMonthlyOverviewReducer,
  initialCustomerDashboardMonthlyOverviewState,
} from "./state";

function CustomerDashboardMonthlyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsOverview,
  monthlyChartsOverview,
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
  monthlyCardsOverview: CustomerMetricsCards["monthlyCards"]["overview"];
  monthlyChartsOverview: CustomerMetricsCharts["monthlyCharts"]["overview"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardMonthlyOverviewState,
    customerDashboardMonthlyOverviewDispatch,
  ] = useReducer(
    customerDashboardMonthlyOverviewReducer,
    initialCustomerDashboardMonthlyOverviewState
  );

  const {
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
  } = customerDashboardMonthlyOverviewState;

  const statisticsMonthlyOverview = returnStatistics<CustomerMetricsOverviewChartsKey>(
    monthlyChartsOverview.bar
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
    calendarView: "Monthly",
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
      semanticName: "Expand Overview Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsOverview.pie,
            chartTitle: pieChartHeading,
            chartKind: "pie",
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
      pieChartData={monthlyChartsOverview.pie}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Overview Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsOverview.bar[overviewBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
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
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewBarChartYAxisVariable,
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
      barChartData={monthlyChartsOverview.bar[overviewBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Overview Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsOverview.line[overviewLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
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
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewLineChartYAxisVariable,
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
      lineChartData={monthlyChartsOverview.line[overviewLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Overview Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsOverview.calendar[overviewCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartKind: "calendar",
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
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewCalendarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsOverviewChartsKey,
          });
        },
        value: overviewCalendarChartYAxisVariable,
      },
    ]);

  const overviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsOverview.calendar[overviewCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardMonthlyOverview = (
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
      overviewCards={monthlyCardsOverview}
      padding={padding}
      pieChart={overviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly Overview`}
      statisticsMap={statisticsMonthlyOverview}
      width={width}
      calendarChart={overviewCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={overviewCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardMonthlyOverview;
}

export default CustomerDashboardMonthlyOverview;
