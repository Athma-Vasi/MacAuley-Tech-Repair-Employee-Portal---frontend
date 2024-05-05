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

  // expenses

  // expenses -> statistics
  const statisticsExpenses = returnStatistics<FinancialMetricBarLineObjKey>(
    yearlyChartsExpenses.barChartsObj
  );

  // expenses -> charts

  // expenses  -> charts -> titles & navlinks
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
            chartData: yearlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesPieChartYAxisVariable,
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
      pieChartData={yearlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]}
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
            chartData: yearlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: expensesBarChartYAxisVariable,
      },
    ]);

  // expenses -> charts -> bar -> display
  const displayExpensesBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]}
      indexBy="Years"
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
            chartData: yearlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable],
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
          financialDashboardYearlyExpensesDispatch({
            type: financialDashboardYearlyExpensesAction.setExpensesLineChartYAxisVariable,
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
      lineChartData={yearlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
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
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayExpensesLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdExpensesLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdExpensesPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Expenses`}
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
    />
  );

  return displayExpensesSection;
}

export default FinancialDashboardYearlyExpenses;
