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

  const statisticsProfit = returnStatistics<FinancialMetricsBarLineChartsKey>(
    dailyChartsProfit.bar
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

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Profit Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsProfit.pie[profitPieChartYAxisVariable],
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
        financialDashboardDailyProfitDispatch({
          type: financialDashboardDailyProfitAction.setProfitPieChartYAxisVariable,
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
      pieChartData={dailyChartsProfit.pie[profitPieChartYAxisVariable]}
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
            chartData: dailyChartsProfit.bar[profitBarChartYAxisVariable],
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
        financialDashboardDailyProfitDispatch({
          type: financialDashboardDailyProfitAction.setProfitBarChartYAxisVariable,
          payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
        });
      },
      value: profitBarChartYAxisVariable,
    },
  ]);

  const profitBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsProfit.bar[profitBarChartYAxisVariable]}
      indexBy="Days"
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
            chartData: dailyChartsProfit.line[profitLineChartYAxisVariable],
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
        financialDashboardDailyProfitDispatch({
          type: financialDashboardDailyProfitAction.setProfitLineChartYAxisVariable,
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
      lineChartData={dailyChartsProfit.line[profitLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Profit Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsProfit.calendar[profitCalendarChartYAxisVariable],
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

  const [profitCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsCalendarChartsKey,
          });
        },
        value: profitCalendarChartYAxisVariable,
      },
    ]);

  const profitCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsProfit.calendar[profitCalendarChartYAxisVariable]}
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const financialDashboardDailyProfit = (
    <DashboardMetricsLayout
      barChart={profitBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={profitBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={profitLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={profitLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsProfit}
      padding={padding}
      pieChart={profitPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={profitPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Profit`}
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
      calendarChart={profitCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={profitCalendarChartYAxisVariablesSelectInput}
    />
  );

  return financialDashboardDailyProfit;
}

export default FinancialDashboardDailyProfit;
