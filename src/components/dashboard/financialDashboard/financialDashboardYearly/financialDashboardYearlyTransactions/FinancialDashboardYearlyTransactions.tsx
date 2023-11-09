import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { globalAction } from '../../../../../context/globalProvider/state';
import { useGlobalState } from '../../../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import { addCommaSeparator, splitCamelCase } from '../../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import {
  returnChartTitleNavigateLinks,
  returnStatistics,
} from '../../../utils';
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
  storeLocation,
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
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

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

  // transactions

  // transactions -> statistics
  const statisticsTransactions = returnStatistics<FinancialMetricBarLineObjKey>(
    yearlyChartsTransactions.barChartsObj
  );

  // transactions -> charts

  // transactions  -> charts -> titles & navlinks
  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Yearly',
    metricCategory: 'Transactions',
    metricsView: 'Financials',
    storeLocation,
    yAxisBarChartVariable: transactionsBarChartYAxisVariable,
    yAxisLineChartVariable: transactionsLineChartYAxisVariable,
    yAxisPieChartVariable: transactionsPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // transactions -> charts -> pie

  // transactions -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: 'Expand Transactions Pie Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyChartsTransactions.pieChartsObj[
                transactionsPieChartYAxisVariable
              ],
            chartTitle: pieChartHeading,
            chartKind: 'pie',
            chartUnitKind: 'number',
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      unitKind="number"
    />
  );

  // transactions -> charts -> bar

  // transactions -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: 'Expand Transactions Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyChartsTransactions.barChartsObj[
                transactionsBarChartYAxisVariable
              ],
            chartTitle: barChartHeading,
            chartKind: 'bar',
            chartUnitKind: 'number',
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // transactions -> charts -> line

  // transactions -> charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Transactions Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyChartsTransactions.lineChartsObj[
                transactionsLineChartYAxisVariable
              ],
            chartTitle: lineChartHeading,
            chartKind: 'line',
            chartUnitKind: 'number',
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      yFormat={(y) => `${addCommaSeparator(y)}`}
      unitKind="number"
    />
  );

  const displayTransactionsSection = (
    <DashboardMetricsLayout
      barChart={displayTransactionsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdTransactionsBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayTransactionsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdTransactionsLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCardsTransactions}
      padding={padding}
      pieChart={displayTransactionsPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={
        createdTransactionsPieChartYAxisVariablesSelectInput
      }
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Transactions`}
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
    />
  );

  return displayTransactionsSection;
}

export default FinancialDashboardYearlyTransactions;
