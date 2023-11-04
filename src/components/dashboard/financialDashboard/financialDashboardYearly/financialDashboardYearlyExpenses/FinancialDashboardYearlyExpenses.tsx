import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import {
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from '../../constants';
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from '../../utils';
import {
  financialDashboardYearlyExpensesAction,
  financialDashboardYearlyExpensesReducer,
  initialFinancialDashboardYearlyExpensesState,
} from './state';

function FinancialDashboardYearlyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsExpenses,
  yearlyChartsExpenses,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsExpenses: FinancialMetricsCards['yearlyCards']['expenses'];
  yearlyChartsExpenses: FinancialMetricsCharts['yearlyCharts']['expenses'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
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

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // expenses

  // expenses -> statistics
  const statisticsExpenses = returnStatistics<FinancialMetricBarLineObjKey>(
    yearlyChartsExpenses.barChartsObj
  );

  // expenses -> charts

  // expenses -> charts -> pie

  // expenses -> charts -> pie -> heading
  const expensesPieChartHeading = `Expenses for ${year}`;

  //  expenses -> charts -> pie -> y-axis select input
  const [createdExpensesPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
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
      pieChartData={
        yearlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // expenses -> charts -> bar

  // expenses -> charts -> bar -> heading
  const expensesBarChartHeading = 'Expenses for all operating years';

  // expenses -> charts -> bar -> y-axis select input
  const [createdExpensesBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
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
      barChartData={
        yearlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]
      }
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // expenses -> charts -> line

  // expenses -> charts -> line -> heading
  const expensesLineChartHeading = 'Expenses for all operating years';

  // expenses -> charts -> line -> y-axis select input
  const [createdExpensesLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
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
      lineChartData={
        yearlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  const displayExpensesSection = (
    <DashboardMetricsLayout
      barChart={displayExpensesBarChart}
      barChartHeading={expensesBarChartHeading}
      barChartYAxisSelectInput={
        createdExpensesBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayExpensesLineChart}
      lineChartHeading={expensesLineChartHeading}
      lineChartYAxisSelectInput={
        createdExpensesLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={expensesPieChartHeading}
      pieChartYAxisSelectInput={
        createdExpensesPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Yearly Expenses"
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
    />
  );

  return displayExpensesSection;
}

export default FinancialDashboardYearlyExpenses;
