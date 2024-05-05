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
  financialDashboardDailyExpensesAction,
  financialDashboardDailyExpensesReducer,
  initialFinancialDashboardDailyExpensesState,
} from "./state";

function FinancialDashboardDailyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsExpenses,
  dailyChartsExpenses,
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
  dailyCardsExpenses: FinancialMetricsCards["dailyCards"]["expenses"];
  dailyChartsExpenses: FinancialMetricsCharts["dailyCharts"]["expenses"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [financialDashboardDailyExpensesState, financialDashboardDailyExpensesDispatch] =
    useReducer(
      financialDashboardDailyExpensesReducer,
      initialFinancialDashboardDailyExpensesState
    );

  const {
    expensesBarChartYAxisVariable,
    expensesCalendarChartYAxisVariable,
    expensesLineChartYAxisVariable,
    expensesPieChartYAxisVariable,
  } = financialDashboardDailyExpensesState;

  const statisticsExpenses = returnStatistics<FinancialMetricsBarLineChartsKey>(
    dailyChartsExpenses.bar
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
    metricCategory: "Expenses",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: expensesBarChartYAxisVariable,
    yAxisCalendarChartVariable: expensesCalendarChartYAxisVariable,
    yAxisLineChartVariable: expensesLineChartYAxisVariable,
    yAxisPieChartVariable: expensesPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Expenses Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.pie[expensesPieChartYAxisVariable],
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

  const [expensesPieChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsPieChartsKey,
          });
        },
        value: expensesPieChartYAxisVariable,
      },
    ]
  );

  const expensesPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsExpenses.pie[expensesPieChartYAxisVariable]}
      hideControls
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Expenses Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.bar[expensesBarChartYAxisVariable],
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

  const [expensesBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: expensesBarChartYAxisVariable,
      },
    ]
  );

  const expensesBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsExpenses.bar[expensesBarChartYAxisVariable]}
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
      semanticName: "Expand Expenses Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.line[expensesLineChartYAxisVariable],
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

  const [expensesLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: expensesLineChartYAxisVariable,
      },
    ]);

  const expensesLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsExpenses.line[expensesLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Expenses Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.calendar[expensesCalendarChartYAxisVariable],
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

  const [expensesCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsCalendarChartsKey,
          });
        },
        value: expensesCalendarChartYAxisVariable,
      },
    ]);

  const expensesCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsExpenses.calendar[expensesCalendarChartYAxisVariable]}
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const financialDashboardDailyExpenses = (
    <DashboardMetricsLayout
      barChart={expensesBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={expensesBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={expensesLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={expensesLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsExpenses}
      padding={padding}
      pieChart={expensesPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={expensesPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Expenses`}
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
      calendarChart={expensesCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={expensesCalendarChartYAxisVariablesSelectInput}
    />
  );

  return financialDashboardDailyExpenses;
}

export default FinancialDashboardDailyExpenses;
