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

  // expenses

  // expenses -> statistics
  const statisticsExpenses = returnStatistics<FinancialMetricBarLineObjKey>(
    dailyChartsExpenses.barChartsObj
  );

  // expenses -> charts

  // expenses  -> charts -> titles & navlinks
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

  // expenses -> charts -> pie

  // expenses -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Expenses Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable],
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

  //  expenses -> charts -> pie -> y-axis select input
  const [createdExpensesPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: expensesPieChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> pie -> display
  const displayExpensesPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]}
      hideControls
    />
  );

  // expenses -> charts -> bar

  // expenses -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Expenses Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable],
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

  // expenses -> charts -> bar -> y-axis select input
  const [createdExpensesBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: expensesBarChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> bar -> display
  const displayExpensesBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]}
      indexBy="Days"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // expenses -> charts -> line

  // expenses -> charts -> line -> expand chart button
  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Expenses Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable],
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

  // expenses -> charts -> line -> y-axis select input
  const [createdExpensesLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: expensesLineChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> line -> display
  const displayExpensesLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // expenses -> charts -> calendar

  // expenses -> charts -> calendar -> expand chart button
  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Expenses Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsExpenses.calendarChartsObj[expensesCalendarChartYAxisVariable],
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

  // expenses -> charts -> calendar -> y-axis select input
  const [createdExpensesCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyExpensesDispatch({
            type: financialDashboardDailyExpensesAction.setExpensesCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: expensesCalendarChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> calendar -> display
  const displayExpensesCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsExpenses.calendarChartsObj[expensesCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayExpensesSection = (
    <DashboardMetricsLayout
      barChart={displayExpensesBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdExpensesBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayExpensesLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdExpensesLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdExpensesPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Expenses`}
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
      calendarChart={displayExpensesCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdExpensesCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayExpensesSection;
}

export default FinancialDashboardDailyExpenses;
