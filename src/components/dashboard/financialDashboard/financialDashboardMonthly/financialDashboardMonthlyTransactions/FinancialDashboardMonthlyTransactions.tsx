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
  financialDashboardMonthlyTransactionsAction,
  financialDashboardMonthlyTransactionsReducer,
  initialFinancialDashboardMonthlyTransactionsState,
} from './state';

function FinancialDashboardMonthlyTransactions({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsTransactions,
  monthlyChartsTransactions,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsTransactions: FinancialMetricsCards['monthlyCards']['transactions'];
  monthlyChartsTransactions: FinancialMetricsCharts['monthlyCharts']['transactions'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardMonthlyTransactionsState,
    financialDashboardMonthlyTransactionsDispatch,
  ] = useReducer(
    financialDashboardMonthlyTransactionsReducer,
    initialFinancialDashboardMonthlyTransactionsState
  );

  const {
    transactionsBarChartYAxisVariable,
    transactionsCalendarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardMonthlyTransactionsState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // transactions

  // transactions -> statistics
  const statisticsTransactions = returnStatistics<FinancialMetricBarLineObjKey>(
    monthlyChartsTransactions.barChartsObj
  );

  // transactions -> charts

  // transactions -> charts -> pie

  // transactions -> charts -> pie -> heading
  const transactionsPieChartHeading = `Transactions for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  //  transactions -> charts -> pie -> y-axis select input
  const [createdTransactionsPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: transactionsPieChartYAxisVariable,
      },
    ]);

  // transactions -> charts -> pie -> display
  const displayTransactionsPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        monthlyChartsTransactions.pieChartsObj[
          transactionsPieChartYAxisVariable
        ]
      }
      hideControls
    />
  );

  // transactions -> charts -> bar

  // transactions -> charts -> bar -> heading
  const transactionsBarChartHeading = `Transactions for ${year}`;

  // transactions -> charts -> bar -> y-axis select input
  const [createdTransactionsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: transactionsBarChartYAxisVariable,
      },
    ]);

  // transactions -> charts -> bar -> display
  const displayTransactionsBarChart = (
    <ResponsiveBarChart
      barChartData={
        monthlyChartsTransactions.barChartsObj[
          transactionsBarChartYAxisVariable
        ]
      }
      indexBy="Days"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // transactions -> charts -> line

  // transactions -> charts -> line -> heading
  const transactionsLineChartHeading = `Transactions for ${year}`;

  // transactions -> charts -> line -> y-axis select input
  const [createdTransactionsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: transactionsLineChartYAxisVariable,
      },
    ]);

  // transactions -> charts -> line -> display
  const displayTransactionsLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyChartsTransactions.lineChartsObj[
          transactionsLineChartYAxisVariable
        ]
      }
      hideControls
      yFormat={(y) => `${y}`}
    />
  );

  // transactions -> charts -> calendar

  // transactions -> charts -> calendar -> heading
  const transactionsCalendarChartHeading = `Transactions for ${year}`;

  // transactions -> charts -> calendar -> y-axis select input
  const [createdTransactionsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: transactionsCalendarChartYAxisVariable,
      },
    ]);

  // transactions -> charts -> calendar -> display
  const displayTransactionsCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsTransactions.calendarChartsObj[
          transactionsCalendarChartYAxisVariable
        ]
      }
      from={`${year}-01-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayTransactionsSection = (
    <DashboardMetricsLayout
      barChart={displayTransactionsBarChart}
      barChartHeading={transactionsBarChartHeading}
      barChartYAxisSelectInput={
        createdTransactionsBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayTransactionsLineChart}
      lineChartHeading={transactionsLineChartHeading}
      lineChartYAxisSelectInput={
        createdTransactionsLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsTransactions}
      padding={padding}
      pieChart={displayTransactionsPieChart}
      pieChartHeading={transactionsPieChartHeading}
      pieChartYAxisSelectInput={
        createdTransactionsPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Monthly Transactions"
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
      calendarChart={displayTransactionsCalendarChart}
      calendarChartHeading={transactionsCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdTransactionsCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayTransactionsSection;
}

export default FinancialDashboardMonthlyTransactions;
