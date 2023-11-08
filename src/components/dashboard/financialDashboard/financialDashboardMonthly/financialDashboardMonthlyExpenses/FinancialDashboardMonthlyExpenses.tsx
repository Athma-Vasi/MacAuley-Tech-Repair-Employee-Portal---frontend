import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from '../../constants';
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from '../../utils';
import {
  financialDashboardMonthlyExpensesAction,
  financialDashboardMonthlyExpensesReducer,
  initialFinancialDashboardMonthlyExpensesState,
} from './state';

function FinancialDashboardMonthlyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsExpenses,
  monthlyChartsExpenses,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsExpenses: FinancialMetricsCards['monthlyCards']['expenses'];
  monthlyChartsExpenses: FinancialMetricsCharts['monthlyCharts']['expenses'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
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
    monthlyChartsExpenses.barChartsObj
  );

  // expenses -> charts

  // expenses -> charts -> pie

  // expenses -> charts -> pie -> heading
  const expensesPieChartHeading = `Expenses for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  //  expenses -> charts -> pie -> y-axis select input
  const [createdExpensesPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
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
      pieChartData={
        monthlyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // expenses -> charts -> bar

  // expenses -> charts -> bar -> heading
  const expensesBarChartHeading = `Expenses for ${year}`;

  // expenses -> charts -> bar -> y-axis select input
  const [createdExpensesBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
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
      barChartData={
        monthlyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]
      }
      indexBy="Months"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // expenses -> charts -> line

  // expenses -> charts -> line -> heading
  const expensesLineChartHeading = `Expenses for ${year}`;

  // expenses -> charts -> line -> y-axis select input
  const [createdExpensesLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
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
      lineChartData={
        monthlyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `$${y}`}
    />
  );

  // expenses -> charts -> calendar

  // expenses -> charts -> calendar -> heading
  const expensesCalendarChartHeading = `Expenses for ${year}`;

  // expenses -> charts -> calendar -> y-axis select input
  const [createdExpensesCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
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
        monthlyChartsExpenses.calendarChartsObj[
          expensesCalendarChartYAxisVariable
        ]
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
      overviewCards={monthlyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={expensesPieChartHeading}
      pieChartYAxisSelectInput={
        createdExpensesPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Monthly Expenses"
      semanticLabel="expenses"
      statisticsMap={statisticsExpenses}
      width={width}
      calendarChart={displayExpensesCalendarChart}
      calendarChartHeading={expensesCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdExpensesCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayExpensesSection;
}

export default FinancialDashboardMonthlyExpenses;
