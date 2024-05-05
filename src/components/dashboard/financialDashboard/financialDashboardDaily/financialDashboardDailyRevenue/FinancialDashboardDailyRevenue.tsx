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
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsCharts,
  FinancialMetricsPieChartsKey,
} from "../../utils";
import { FinancialMetricsCards } from "../../utilsTSX";
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

  const statisticsRevenue = returnStatistics<FinancialMetricsBarLineChartsKey>(
    dailyChartsRevenue.bar
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

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Revenue Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsRevenue.pie[revenuePieChartYAxisVariable],
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
        financialDashboardDailyRevenueDispatch({
          type: financialDashboardDailyRevenueAction.setRevenuePieChartYAxisVariable,
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
      pieChartData={dailyChartsRevenue.pie[revenuePieChartYAxisVariable]}
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
            chartData: dailyChartsRevenue.bar[revenueBarChartYAxisVariable],
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
        financialDashboardDailyRevenueDispatch({
          type: financialDashboardDailyRevenueAction.setRevenueBarChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
        });
      },
      value: revenueBarChartYAxisVariable,
    },
  ]);

  const revenueBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsRevenue.bar[revenueBarChartYAxisVariable]}
      indexBy="Days"
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
            chartData: dailyChartsRevenue.line[revenueLineChartYAxisVariable],
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
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenueLineChartYAxisVariable,
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
      lineChartData={dailyChartsRevenue.line[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Revenue Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsRevenue.calendar[revenueCalendarChartYAxisVariable],
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

  const [revenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyRevenueDispatch({
            type: financialDashboardDailyRevenueAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsCalendarChartsKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  const revenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsRevenue.calendar[revenueCalendarChartYAxisVariable]}
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const financialDashboardDailyRevenue = (
    <DashboardMetricsLayout
      barChart={revenueBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={revenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={revenueLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={revenueLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsRevenue}
      padding={padding}
      pieChart={revenuePieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={revenuePieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Revenue`}
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
      calendarChart={revenueCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={revenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  return financialDashboardDailyRevenue;
}

export default FinancialDashboardDailyRevenue;
