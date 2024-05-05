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
import { FinancialMetricsCards } from "../../../jsxHelpers";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from "../../utils";
import {
  financialDashboardDailyProfitAction,
  financialDashboardDailyProfitReducer,
  initialFinancialDashboardDailyProfitState,
} from "./state";

function FinancialDashboardDailyProfit({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsProfit,
  dailyChartsProfit,
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
  dailyCardsProfit: FinancialMetricsCards["dailyCards"]["profit"];
  dailyChartsProfit: FinancialMetricsCharts["dailyCharts"]["profit"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [financialDashboardDailyProfitState, financialDashboardDailyProfitDispatch] =
    useReducer(
      financialDashboardDailyProfitReducer,
      initialFinancialDashboardDailyProfitState
    );

  const {
    profitBarChartYAxisVariable,
    profitCalendarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
  } = financialDashboardDailyProfitState;

  // profit

  // profit -> statistics
  const statisticsProfit = returnStatistics<FinancialMetricBarLineObjKey>(
    dailyChartsProfit.barChartsObj
  );

  // profit -> charts

  // profit  -> charts -> titles & navlinks
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
    metricCategory: "Profit",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: profitBarChartYAxisVariable,
    yAxisCalendarChartVariable: profitCalendarChartYAxisVariable,
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
            chartData: dailyChartsProfit.pieChartsObj[profitPieChartYAxisVariable],
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitPieChartYAxisVariable,
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
      pieChartData={dailyChartsProfit.pieChartsObj[profitPieChartYAxisVariable]}
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
            chartData: dailyChartsProfit.barChartsObj[profitBarChartYAxisVariable],
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitBarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> bar -> display
  const displayProfitBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsProfit.barChartsObj[profitBarChartYAxisVariable]}
      indexBy="Days"
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
            chartData: dailyChartsProfit.lineChartsObj[profitLineChartYAxisVariable],
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitLineChartYAxisVariable,
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
      lineChartData={dailyChartsProfit.lineChartsObj[profitLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // profit -> charts -> calendar

  // profit -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Profit Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsProfit.calendarChartsObj[profitCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartKind: "calendar",
            chartUnitKind: "currency",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // profit -> charts -> calendar -> y-axis select input
  const [createdProfitCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: profitCalendarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> calendar -> display
  const displayProfitCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsProfit.calendarChartsObj[profitCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
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
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayProfitLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdProfitLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsProfit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Profit`}
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
      calendarChart={displayProfitCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={createdProfitCalendarChartYAxisVariablesSelectInput}
    />
  );

  return displayProfitSection;
}

export default FinancialDashboardDailyProfit;
