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

  // profit

  // profit -> statistics
  const statisticsProfit = returnStatistics<FinancialMetricBarLineObjKey>(
    yearlyChartsProfit.barChartsObj
  );

  // profit -> charts

  // profit  -> charts -> titles & navlinks
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

  // profit -> charts -> pie

  // profit -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Profit Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.pieChartsObj[profitPieChartYAxisVariable],
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

  //  profit -> charts -> pie -> y-axis select input
  const [createdProfitPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: profitPieChartYAxisVariable,
      },
    ]);

  // profit -> charts -> pie -> display
  const displayProfitPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsProfit.pieChartsObj[profitPieChartYAxisVariable]}
      hideControls
    />
  );

  // profit -> charts -> bar

  // profit -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Profit Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.barChartsObj[profitBarChartYAxisVariable],
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

  // profit -> charts -> bar -> y-axis select input
  const [createdProfitBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitBarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> bar -> display
  const displayProfitBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsProfit.barChartsObj[profitBarChartYAxisVariable]}
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // profit -> charts -> line

  // profit -> charts -> line -> expand chart button
  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Profit Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsProfit.lineChartsObj[profitLineChartYAxisVariable],
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

  // profit -> charts -> line -> y-axis select input
  const [createdProfitLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitLineChartYAxisVariable,
      },
    ]);

  // profit -> charts -> line -> display
  const displayProfitLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsProfit.lineChartsObj[profitLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const displayProfitSection = (
    <DashboardMetricsLayout
      barChart={displayProfitBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdProfitBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayProfitLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdProfitLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsProfit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Profit`}
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
    />
  );

  return displayProfitSection;
}

export default FinancialDashboardYearlyProfit;
