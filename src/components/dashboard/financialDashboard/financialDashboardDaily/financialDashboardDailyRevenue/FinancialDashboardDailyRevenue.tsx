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
import { FinancialMetricsCards } from "../../../utilsTSX";
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
  financialDashboardDailyRevenueAction,
  financialDashboardDailyRevenueReducer,
  initialFinancialDashboardDailyRevenueState,
} from "./state";

function FinancialDashboardDailyRevenue({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsRevenue,
  dailyChartsRevenue,
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
  dailyCardsRevenue: FinancialMetricsCards["dailyCards"]["revenue"];
  dailyChartsRevenue: FinancialMetricsCharts["dailyCharts"]["revenue"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [financialDashboardDailyRevenueState, financialDashboardDailyRevenueDispatch] =
    useReducer(
      financialDashboardDailyRevenueReducer,
      initialFinancialDashboardDailyRevenueState
    );

  const {
    revenueBarChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    revenuePieChartYAxisVariable,
  } = financialDashboardDailyRevenueState;

  // revenue

  // revenue -> statistics
  const statisticsRevenue = returnStatistics<FinancialMetricBarLineObjKey>(
    dailyChartsRevenue.barChartsObj
  );

  // revenue -> charts

  // revenue  -> charts -> titles & navlinks
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
    metricCategory: "Revenue",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: revenueBarChartYAxisVariable,
    yAxisCalendarChartVariable: revenueCalendarChartYAxisVariable,
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
            chartData: dailyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable],
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
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenuePieChartYAxisVariable,
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
      pieChartData={dailyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable]}
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
            chartData: dailyChartsRevenue.barChartsObj[revenueBarChartYAxisVariable],
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
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: revenueBarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsRevenue.barChartsObj[revenueBarChartYAxisVariable]}
      indexBy="Days"
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
            chartData: dailyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable],
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
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenueLineChartYAxisVariable,
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
      lineChartData={dailyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // revenue -> charts -> calendar

  // revenue -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Revenue Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsRevenue.calendarChartsObj[revenueCalendarChartYAxisVariable],
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

  // revenue -> charts -> calendar -> y-axis select input
  const [createdRevenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> calendar -> display
  const displayRevenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsRevenue.calendarChartsObj[revenueCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
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
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdRevenueLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsRevenue}
      padding={padding}
      pieChart={displayRevenuePieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdRevenuePieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Revenue`}
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
      calendarChart={displayRevenueCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={createdRevenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  return displayRevenueSection;
}

export default FinancialDashboardDailyRevenue;
