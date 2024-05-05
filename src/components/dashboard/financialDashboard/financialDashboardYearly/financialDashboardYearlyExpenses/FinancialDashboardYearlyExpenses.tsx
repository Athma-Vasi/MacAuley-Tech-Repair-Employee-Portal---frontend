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
  financialDashboardYearlyExpensesAction,
  financialDashboardYearlyExpensesReducer,
  initialFinancialDashboardYearlyExpensesState,
} from "./state";

function FinancialDashboardYearlyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsExpenses,
  yearlyChartsExpenses,
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
  yearlyCardsExpenses: FinancialMetricsCards["yearlyCards"]["expenses"];
  yearlyChartsExpenses: FinancialMetricsCharts["yearlyCharts"]["expenses"];
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
    financialDashboardYearlyExpensesState,
    financialDashboardYearlyExpensesDispatch,
  ] = useReducer(
    financialDashboardYearlyExpensesReducer,
    initialFinancialDashboardYearlyExpensesState
  );

  const {
    expensesBarChartYAxisVariable,
    expensesLineChartYAxisVariable,
    expensesPieChartYAxisVariable,
  } = financialDashboardYearlyExpensesState;

  const statisticsExpenses = returnStatistics<FinancialMetricsBarLineChartsKey>(
    yearlyChartsExpenses.bar
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
    metricCategory: "Expenses",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: expensesBarChartYAxisVariable,
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
            chartData: yearlyChartsExpenses.pie[expensesPieChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesPieChartYAxisVariable,
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
      pieChartData={yearlyChartsExpenses.pie[expensesPieChartYAxisVariable]}
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
            chartData: yearlyChartsExpenses.bar[expensesBarChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: expensesBarChartYAxisVariable,
      },
    ]
  );

  const expensesBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsExpenses.bar[expensesBarChartYAxisVariable]}
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
      semanticName: "Expand Expenses Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsExpenses.line[expensesLineChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesLineChartYAxisVariable,
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
      lineChartData={yearlyChartsExpenses.line[expensesLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const financialDashboardYearlyExpenses = (
    <DashboardMetricsLayout
      barChart={expensesBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={expensesBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      isMoney
      lineChart={expensesLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={expensesLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsExpenses}
      padding={padding}
      pieChart={expensesPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={expensesPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Expenses`}
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
    />
  );

  return financialDashboardYearlyExpenses;
}

export default FinancialDashboardYearlyExpenses;
