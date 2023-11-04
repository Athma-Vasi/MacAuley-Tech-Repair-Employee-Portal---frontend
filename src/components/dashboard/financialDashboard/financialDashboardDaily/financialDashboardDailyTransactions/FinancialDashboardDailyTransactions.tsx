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
  financialDashboardDailyTransactionsAction,
  financialDashboardDailyTransactionsReducer,
  initialFinancialDashboardDailyTransactionsState,
} from './state';

function FinancialDashboardDailyTransactions({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsTransactions,
  dailyChartsTransactions,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsTransactions: FinancialMetricsCards['dailyCards']['transactions'];
  dailyChartsTransactions: FinancialMetricsCharts['dailyCharts']['transactions'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardDailyTransactionsState,
    financialDashboardDailyTransactionsDispatch,
  ] = useReducer(
    financialDashboardDailyTransactionsReducer,
    initialFinancialDashboardDailyTransactionsState
  );

  const {
    transactionsBarChartYAxisVariable,
    transactionsCalendarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardDailyTransactionsState;

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
    dailyChartsTransactions.barChartsObj
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
          financialDashboardDailyTransactionsDispatch({
            type: financialDashboardDailyTransactionsAction.setTransactionsPieChartYAxisVariable,
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
        dailyChartsTransactions.pieChartsObj[transactionsPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // transactions -> charts -> bar

  // transactions -> charts -> bar -> heading
  const transactionsBarChartHeading = `Transactions for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // transactions -> charts -> bar -> y-axis select input
  const [createdTransactionsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyTransactionsDispatch({
            type: financialDashboardDailyTransactionsAction.setTransactionsBarChartYAxisVariable,
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
        dailyChartsTransactions.barChartsObj[transactionsBarChartYAxisVariable]
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
  const transactionsLineChartHeading = `Transactions for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // transactions -> charts -> line -> y-axis select input
  const [createdTransactionsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyTransactionsDispatch({
            type: financialDashboardDailyTransactionsAction.setTransactionsLineChartYAxisVariable,
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
        dailyChartsTransactions.lineChartsObj[
          transactionsLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y}`}
    />
  );

  // transactions -> charts -> calendar

  // transactions -> charts -> calendar -> heading
  const transactionsCalendarChartHeading = `Transactions for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // transactions -> charts -> calendar -> y-axis select input
  const [createdTransactionsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyTransactionsDispatch({
            type: financialDashboardDailyTransactionsAction.setTransactionsCalendarChartYAxisVariable,
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
        dailyChartsTransactions.calendarChartsObj[
          transactionsCalendarChartYAxisVariable
        ]
      }
      from={`${year}-${month}-01`}
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
      overviewCards={dailyCardsTransactions}
      padding={padding}
      pieChart={displayTransactionsPieChart}
      pieChartHeading={transactionsPieChartHeading}
      pieChartYAxisSelectInput={
        createdTransactionsPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Daily Transactions"
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

export default FinancialDashboardDailyTransactions;
