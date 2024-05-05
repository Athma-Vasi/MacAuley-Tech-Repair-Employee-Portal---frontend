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
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { FinancialMetricsCards } from "../../../jsxHelpers";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from "../../utils";
import {
  financialDashboardYearlyRevenueAction,
  financialDashboardYearlyRevenueReducer,
  initialFinancialDashboardYearlyRevenueState,
} from "./state";

function FinancialDashboardYearlyRevenue({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsRevenue,
  yearlyChartsRevenue,
  day,
  month,
  padding,
  storeLocation,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsRevenue: FinancialMetricsCards["yearlyCards"]["revenue"];
  yearlyChartsRevenue: FinancialMetricsCharts["yearlyCharts"]["revenue"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [financialDashboardYearlyRevenueState, financialDashboardYearlyRevenueDispatch] =
    useReducer(
      financialDashboardYearlyRevenueReducer,
      initialFinancialDashboardYearlyRevenueState
    );

  const {
    revenueBarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    revenuePieChartYAxisVariable,
  } = financialDashboardYearlyRevenueState;

  // revenue

  // revenue -> statistics
  const statisticsRevenue = returnStatistics<FinancialMetricBarLineObjKey>(
    yearlyChartsRevenue.barChartsObj
  );

  // revenue -> charts

  // revenue  -> charts -> titles & navlinks
  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "Revenue",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: revenueBarChartYAxisVariable,
    yAxisLineChartVariable: revenueLineChartYAxisVariable,
    yAxisPieChartVariable: revenuePieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Revenue Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable],
            chartTitle: pieChartHeading,
            chartKind: "pie",
            chartUnitKind: "currency",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  //  revenue -> charts -> pie -> y-axis select input
  const [createdRevenuePieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenuePieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: revenuePieChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> pie -> display
  const displayRevenuePieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable]}
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Revenue Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.barChartsObj[revenueBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
            chartUnitKind: "currency",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue -> charts -> bar -> y-axis select input
  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: revenueBarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsRevenue.barChartsObj[revenueBarChartYAxisVariable]}
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> expand chart button
  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Revenue Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
            chartUnitKind: "currency",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue -> charts -> line -> y-axis select input
  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> line -> display
  const displayRevenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const displayRevenueSection = (
    <DashboardMetricsLayout
      barChart={displayRevenueBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdRevenueLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsRevenue}
      padding={padding}
      pieChart={displayRevenuePieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdRevenuePieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Revenue`}
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
    />
  );

  return displayRevenueSection;
}

export default FinancialDashboardYearlyRevenue;
