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
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../../charts";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from "../../constants";
import { CustomerMetricsCharts, CustomerMetricsOverviewChartsKey } from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import {
  customerDashboardYearlyOverviewAction,
  customerDashboardYearlyOverviewReducer,
  initialCustomerDashboardYearlyOverviewState,
} from "./state";

function CustomerDashboardYearlyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOverview,
  yearlyChartsOverview,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsOverview: CustomerMetricsCards["yearlyCards"]["overview"];
  yearlyChartsOverview: CustomerMetricsCharts["yearlyCharts"]["overview"];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardYearlyOverviewState, customerDashboardYearlyOverviewDispatch] =
    useReducer(
      customerDashboardYearlyOverviewReducer,
      initialCustomerDashboardYearlyOverviewState
    );

  const { overviewBarChartYAxisVariable, overviewLineChartYAxisVariable } =
    customerDashboardYearlyOverviewState;

  const statisticsYearlyOverview = returnStatistics<CustomerMetricsOverviewChartsKey>(
    yearlyChartsOverview.bar
  );

  const {
    barChartHeading,
    expandBarChartNavigateLink,
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
    yAxisLineChartVariable: overviewLineChartYAxisVariable,
    year,
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
            chartData: yearlyChartsOverview.pie,
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
      pieChartData={yearlyChartsOverview.pie}
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
            chartData: yearlyChartsOverview.bar[overviewBarChartYAxisVariable],
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
          customerDashboardYearlyOverviewDispatch({
            type: customerDashboardYearlyOverviewAction.setOverviewBarChartYAxisVariable,
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
      barChartData={yearlyChartsOverview.bar[overviewBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
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
            chartData: yearlyChartsOverview.line[overviewLineChartYAxisVariable],
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
          customerDashboardYearlyOverviewDispatch({
            type: customerDashboardYearlyOverviewAction.setOverviewLineChartYAxisVariable,
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
      lineChartData={yearlyChartsOverview.line[overviewLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const customerDashboardYearlyOverview = (
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
      overviewCards={yearlyCardsOverview}
      padding={padding}
      pieChart={overviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Overview`}
      statisticsMap={statisticsYearlyOverview}
      width={width}
    />
  );

  return customerDashboardYearlyOverview;
}

export default CustomerDashboardYearlyOverview;
