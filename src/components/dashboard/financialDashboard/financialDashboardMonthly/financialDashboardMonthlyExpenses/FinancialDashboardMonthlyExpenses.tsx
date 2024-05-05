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
  financialDashboardMonthlyExpensesAction,
  financialDashboardMonthlyExpensesReducer,
  initialFinancialDashboardMonthlyExpensesState,
} from "./state";

function FinancialDashboardMonthlyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsExpenses,
  monthlyChartsExpenses,
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
  monthlyCardsExpenses: FinancialMetricsCards["monthlyCards"]["expenses"];
  monthlyChartsExpenses: FinancialMetricsCharts["monthlyCharts"]["expenses"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    financialDashboardMonthlyExpensesState,
    financialDashboardMonthlyExpensesDispatch,
  ] = useReducer(
    financialDashboardMonthlyExpensesReducer,
    initialFinancialDashboardMonthlyExpensesState
  );

  const {
    expensesBarChartYAxisVariable,
    expensesCalendarChartYAxisVariable,
    expensesLineChartYAxisVariable,
    expensesPieChartYAxisVariable,
  } = financialDashboardMonthlyExpensesState;

  // expenses

  // expenses -> statistics
  const statisticsExpenses = returnStatistics<FinancialMetricBarLineObjKey>(
    monthlyChartsExpenses.barChartsObj
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
    calendarView: "Monthly",
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
            chartData: monthlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable],
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
          financialDashboardMonthlyExpensesDispatch({
            type: financialDashboardMonthlyExpensesAction.setExpensesPieChartYAxisVariable,
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
      pieChartData={monthlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]}
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
            chartData: monthlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable],
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
          financialDashboardMonthlyExpensesDispatch({
            type: financialDashboardMonthlyExpensesAction.setExpensesBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: expensesBarChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> bar -> display
  const displayExpensesBarChart = (
    <ResponsiveBarChart
      barChartData={monthlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]}
      indexBy="Months"
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
            chartData:
              monthlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable],
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
          financialDashboardMonthlyExpensesDispatch({
            type: financialDashboardMonthlyExpensesAction.setExpensesLineChartYAxisVariable,
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
      lineChartData={monthlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // expenses -> charts -> calendar

  // expenses -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Expenses Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsExpenses.calendarChartsObj[expensesCalendarChartYAxisVariable],
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
          financialDashboardMonthlyExpensesDispatch({
            type: financialDashboardMonthlyExpensesAction.setExpensesCalendarChartYAxisVariable,
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
        monthlyChartsExpenses.calendarChartsObj[expensesCalendarChartYAxisVariable]
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
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayExpensesLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdExpensesLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdExpensesPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly Expenses`}
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

export default FinancialDashboardMonthlyExpenses;
