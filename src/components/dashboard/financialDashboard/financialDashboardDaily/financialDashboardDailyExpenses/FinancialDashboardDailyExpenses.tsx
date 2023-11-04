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
  financialDashboardDailyExpensesAction,
  financialDashboardDailyExpensesReducer,
  initialFinancialDashboardDailyExpensesState,
} from './state';

function FinancialDashboardDailyExpenses({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsExpenses,
  dailyChartsExpenses,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsExpenses: FinancialMetricsCards['dailyCards']['expenses'];
  dailyChartsExpenses: FinancialMetricsCharts['dailyCharts']['expenses'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardDailyExpensesState,
    financialDashboardDailyExpensesDispatch,
  ] = useReducer(
    financialDashboardDailyExpensesReducer,
    initialFinancialDashboardDailyExpensesState
  );

  const {
    expensesBarChartYAxisVariable,
    expensesCalendarChartYAxisVariable,
    expensesLineChartYAxisVariable,
    expensesPieChartYAxisVariable,
  } = financialDashboardDailyExpensesState;

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
    dailyChartsExpenses.barChartsObj
  );

  // expenses -> charts

  // expenses -> charts -> pie

  // expenses -> charts -> pie -> heading
  const expensesPieChartHeading = `Expenses for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  //  expenses -> charts -> pie -> y-axis select input
  const [createdExpensesPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
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
      pieChartData={
        dailyChartsExpenses.pieChartsObj[expensesPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // expenses -> charts -> bar

  // expenses -> charts -> bar -> heading
  const expensesBarChartHeading = `Expenses for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // expenses -> charts -> bar -> y-axis select input
  const [createdExpensesBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
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
      barChartData={
        dailyChartsExpenses.barChartsObj[expensesBarChartYAxisVariable]
      }
      indexBy="Days"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // expenses -> charts -> line

  // expenses -> charts -> line -> heading
  const expensesLineChartHeading = `Expenses for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // expenses -> charts -> line -> y-axis select input
  const [createdExpensesLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
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
      lineChartData={
        dailyChartsExpenses.lineChartsObj[expensesLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  // expenses -> charts -> calendar

  // expenses -> charts -> calendar -> heading
  const expensesCalendarChartHeading = `Expenses for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // expenses -> charts -> calendar -> y-axis select input
  const [createdExpensesCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
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
        dailyChartsExpenses.calendarChartsObj[
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
      overviewCards={dailyCardsExpenses}
      padding={padding}
      pieChart={displayExpensesPieChart}
      pieChartHeading={expensesPieChartHeading}
      pieChartYAxisSelectInput={
        createdExpensesPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Daily Expenses"
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

export default FinancialDashboardDailyExpenses;
