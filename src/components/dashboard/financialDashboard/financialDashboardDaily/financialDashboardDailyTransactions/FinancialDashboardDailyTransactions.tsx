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
  ResponsiveCalendarChart,
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
  storeLocation,
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
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

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

  // transactions

  // transactions -> statistics
  const statisticsTransactions = returnStatistics<FinancialMetricBarLineObjKey>(
    dailyChartsTransactions.barChartsObj
  );

  // transactions -> charts

  // transactions  -> charts -> titles & navlinks
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
    calendarView: 'Daily',
    metricCategory: 'Transactions',
    metricsView: 'Financials',
    storeLocation,
    yAxisBarChartVariable: transactionsBarChartYAxisVariable,
    yAxisCalendarChartVariable: transactionsCalendarChartYAxisVariable,
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
              dailyChartsTransactions.pieChartsObj[
                transactionsPieChartYAxisVariable
              ],
            chartTitle: pieChartHeading,
            chartKind: 'pie',
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
              dailyChartsTransactions.barChartsObj[
                transactionsBarChartYAxisVariable
              ],
            chartTitle: barChartHeading,
            chartKind: 'bar',
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
              dailyChartsTransactions.lineChartsObj[
                transactionsLineChartYAxisVariable
              ],
            chartTitle: lineChartHeading,
            chartKind: 'line',
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
      yFormat={(y) => `${addCommaSeparator(y)}`}
    />
  );

  // transactions -> charts -> calendar

  // transactions -> charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: 'Expand Transactions Calendar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsTransactions.calendarChartsObj[
                transactionsCalendarChartYAxisVariable
              ],
            chartTitle: calendarChartHeading,
            chartKind: 'calendar',
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdTransactionsBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayTransactionsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdTransactionsLineChartYAxisVariablesSelectInput
      }
      overviewCards={dailyCardsTransactions}
      padding={padding}
      pieChart={displayTransactionsPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={
        createdTransactionsPieChartYAxisVariablesSelectInput
      }
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Transactions`}
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
      calendarChart={displayTransactionsCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdTransactionsCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayTransactionsSection;
}

export default FinancialDashboardDailyTransactions;
