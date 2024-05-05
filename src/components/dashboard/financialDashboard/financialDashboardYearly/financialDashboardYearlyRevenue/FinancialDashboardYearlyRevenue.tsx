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
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCharts,
  FinancialMetricsPieChartsKey,
} from "../../utils";
import { FinancialMetricsCards } from "../../utilsTSX";
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

  const statisticsRevenue = returnStatistics<FinancialMetricsBarLineChartsKey>(
    yearlyChartsRevenue.bar
  );

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

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Revenue Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.pie[revenuePieChartYAxisVariable],
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

  const [revenuePieChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: FINANCIAL_PIE_Y_AXIS_DATA,
      label: "Y-Axis Pie",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        financialDashboardYearlyRevenueDispatch({
          type: financialDashboardYearlyRevenueAction.setRevenuePieChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsPieChartsKey,
        });
      },
      value: revenuePieChartYAxisVariable,
    },
  ]);

  const revenuePieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsRevenue.pie[revenuePieChartYAxisVariable]}
      hideControls
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Revenue Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.bar[revenueBarChartYAxisVariable],
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

  const [revenueBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        financialDashboardYearlyRevenueDispatch({
          type: financialDashboardYearlyRevenueAction.setRevenueBarChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
        });
      },
      value: revenueBarChartYAxisVariable,
    },
  ]);

  const revenueBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsRevenue.bar[revenueBarChartYAxisVariable]}
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Revenue Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsRevenue.line[revenueLineChartYAxisVariable],
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

  const [revenueLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]
  );

  const revenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsRevenue.line[revenueLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const financialDashboardYearlyRevenue = (
    <DashboardMetricsLayout
      barChart={revenueBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={revenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={revenueLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={revenueLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsRevenue}
      padding={padding}
      pieChart={revenuePieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={revenuePieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Revenue`}
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
    />
  );

  return financialDashboardYearlyRevenue;
}

export default FinancialDashboardYearlyRevenue;
