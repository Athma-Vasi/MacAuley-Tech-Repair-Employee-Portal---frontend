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
  financialDashboardYearlyProfitAction,
  financialDashboardYearlyProfitReducer,
  initialFinancialDashboardYearlyProfitState,
} from "./state";

function FinancialDashboardYearlyProfit({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsProfit,
  yearlyChartsProfit,
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
  yearlyCardsProfit: FinancialMetricsCards["yearlyCards"]["profit"];
  yearlyChartsProfit: FinancialMetricsCharts["yearlyCharts"]["profit"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [financialDashboardYearlyProfitState, financialDashboardYearlyProfitDispatch] =
    useReducer(
      financialDashboardYearlyProfitReducer,
      initialFinancialDashboardYearlyProfitState
    );

  const {
    profitBarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
  } = financialDashboardYearlyProfitState;

  const statisticsProfit = returnStatistics<FinancialMetricsBarLineChartsKey>(
    yearlyChartsProfit.bar
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
    metricCategory: "Profit",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: profitBarChartYAxisVariable,
    yAxisLineChartVariable: profitLineChartYAxisVariable,
    yAxisPieChartVariable: profitPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Profit Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.pie[profitPieChartYAxisVariable],
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

  const [profitPieChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: FINANCIAL_PIE_Y_AXIS_DATA,
      label: "Y-Axis Pie",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        financialDashboardYearlyProfitDispatch({
          type: financialDashboardYearlyProfitAction.setProfitPieChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsPieChartsKey,
        });
      },
      value: profitPieChartYAxisVariable,
    },
  ]);

  const profitPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsProfit.pie[profitPieChartYAxisVariable]}
      hideControls
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Profit Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.bar[profitBarChartYAxisVariable],
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

  const [profitBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        financialDashboardYearlyProfitDispatch({
          type: financialDashboardYearlyProfitAction.setProfitBarChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
        });
      },
      value: profitBarChartYAxisVariable,
    },
  ]);

  const profitBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsProfit.bar[profitBarChartYAxisVariable]}
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Profit Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.line[profitLineChartYAxisVariable],
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

  const [profitLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Line",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        financialDashboardYearlyProfitDispatch({
          type: financialDashboardYearlyProfitAction.setProfitLineChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
        });
      },
      value: profitLineChartYAxisVariable,
    },
  ]);

  const profitLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsProfit.line[profitLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const financialDashboardYearlyProfit = (
    <DashboardMetricsLayout
      barChart={profitBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={profitBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={profitLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={profitLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsProfit}
      padding={padding}
      pieChart={profitPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={profitPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Profit`}
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
    />
  );

  return financialDashboardYearlyProfit;
}

export default FinancialDashboardYearlyProfit;
