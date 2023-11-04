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
  financialDashboardYearlyTransactionsAction,
  financialDashboardYearlyTransactionsReducer,
  initialFinancialDashboardYearlyTransactionsState,
} from './state';

function FinancialDashboardYearlyTransactions({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsTransactions,
  yearlyChartsTransactions,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsTransactions: FinancialMetricsCards['yearlyCards']['transactions'];
  yearlyChartsTransactions: FinancialMetricsCharts['yearlyCharts']['transactions'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardYearlyTransactionsState,
    financialDashboardYearlyTransactionsDispatch,
  ] = useReducer(
    financialDashboardYearlyTransactionsReducer,
    initialFinancialDashboardYearlyTransactionsState
  );

  const {
    transactionsBarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardYearlyTransactionsState;

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
    yearlyChartsTransactions.barChartsObj
  );

  // transactions -> charts

  // transactions -> charts -> pie

  // transactions -> charts -> pie -> heading
  const transactionsPieChartHeading = `Transactions for ${year}`;

  //  transactions -> charts -> pie -> y-axis select input
  const [createdTransactionsPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsPieChartYAxisVariable,
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
        yearlyChartsTransactions.pieChartsObj[transactionsPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // transactions -> charts -> bar

  // transactions -> charts -> bar -> heading
  const transactionsBarChartHeading = 'Transactions for all operating years';

  // transactions -> charts -> bar -> y-axis select input
  const [createdTransactionsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsBarChartYAxisVariable,
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
        yearlyChartsTransactions.barChartsObj[transactionsBarChartYAxisVariable]
      }
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // transactions -> charts -> line

  // transactions -> charts -> line -> heading
  const transactionsLineChartHeading = 'Transactions for all operating years';

  // transactions -> charts -> line -> y-axis select input
  const [createdTransactionsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsLineChartYAxisVariable,
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
        yearlyChartsTransactions.lineChartsObj[
          transactionsLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y}`}
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
      overviewCards={yearlyCardsTransactions}
      padding={padding}
      pieChart={displayTransactionsPieChart}
      pieChartHeading={transactionsPieChartHeading}
      pieChartYAxisSelectInput={
        createdTransactionsPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Yearly Transactions"
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
    />
  );

  return displayTransactionsSection;
}

export default FinancialDashboardYearlyTransactions;
