import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { logState } from '../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import { MONTHS } from '../../constants';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../jsxHelpers';
import { BusinessMetric, BusinessMetricStoreLocation } from '../../types';
import { returnStatistics } from '../../utils';
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from '../constants';
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricBarObj,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from '../utils';
import {
  financialDashboardDailyAction,
  financialDashboardDailyReducer,
  initialFinancialDashboardDailyState,
} from './state';

function FinancialDashboardDaily({
  borderColor,
  businessMetrics,
  dailyCards,
  dailyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  dailyCards: FinancialMetricsCards['dailyCards'];
  dailyCharts: FinancialMetricsCharts['dailyCharts'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: string;
}) {
  const [financialDashboardDailyState, financialDashboardDailyDispatch] =
    useReducer(
      financialDashboardDailyReducer,
      initialFinancialDashboardDailyState
    );

  const {
    expensesBarChartYAxisVariable,
    expensesCalendarChartYAxisVariable,
    expensesLineChartYAxisVariable,
    expensesPieChartYAxisVariable,
    otherMetricsBarChartYAxisVariable,
    otherMetricsCalendarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
    profitBarChartYAxisVariable,
    profitCalendarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
    revenueBarChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    revenuePieChartYAxisVariable,
    transactionsBarChartYAxisVariable,
    transactionsCalendarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardDailyState;

  useEffect(() => {
    logState({
      state: financialDashboardDailyState,
      groupLabel: 'financialDashboardDailyState',
    });
  }, [financialDashboardDailyState]);

  if (!businessMetrics.length) {
    return null;
  }

  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight =
    width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // profit

  // profit -> statistics
  const statisticsProfit = returnStatistics<FinancialMetricBarLineObjKey>(
    dailyCharts.profit.barChartsObj
  );
  console.log('statisticsProfit', statisticsProfit);

  // profit -> charts

  // profit -> charts -> pie

  // profit -> charts -> pie -> heading
  const profitPieChartHeading = `Profit for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  //  profit -> charts -> pie -> y-axis select input
  const [createdProfitPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyDispatch({
            type: financialDashboardDailyAction.setProfitPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: profitPieChartYAxisVariable,
      },
    ]);

  // profit -> charts -> pie -> display
  const displayProfitPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        dailyCharts.profit.pieChartsObj[profitPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // profit -> charts -> bar

  // profit -> charts -> bar -> heading
  const profitBarChartHeading = `Profit for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // profit -> charts -> bar -> y-axis select input
  const [createdProfitBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyDispatch({
            type: financialDashboardDailyAction.setProfitBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitBarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> bar -> display
  const displayProfitBarChart = (
    <ResponsiveBarChart
      barChartData={
        dailyCharts.profit.barChartsObj[profitBarChartYAxisVariable]
      }
      indexBy="Days"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // profit -> charts -> line

  // profit -> charts -> line -> heading
  const profitLineChartHeading = `Profit for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // profit -> charts -> line -> y-axis select input
  const [createdProfitLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyDispatch({
            type: financialDashboardDailyAction.setProfitLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitLineChartYAxisVariable,
      },
    ]);

  // profit -> charts -> line -> display
  const displayProfitLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyCharts.profit.lineChartsObj[profitLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  // profit -> charts -> calendar

  // profit -> charts -> calendar -> heading
  const profitCalendarChartHeading = `Profit for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // profit -> charts -> calendar -> y-axis select input
  const [createdProfitCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyDispatch({
            type: financialDashboardDailyAction.setProfitCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: profitCalendarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> calendar -> display
  const displayProfitCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.profit.calendarChartsObj[profitCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayProfitSection = (
    <DashboardMetricsLayout
      barChart={displayProfitBarChart}
      barChartHeading={profitBarChartHeading}
      barChartYAxisSelectInput={createdProfitBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayProfitLineChart}
      lineChartHeading={profitLineChartHeading}
      lineChartYAxisSelectInput={
        createdProfitLineChartYAxisVariablesSelectInput
      }
      overviewCards={dailyCards.profit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={profitPieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading="Daily Profit"
      statisticsMap={statisticsProfit}
      width={width}
      calendarChart={displayProfitCalendarChart}
      calendarChartHeading={profitCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdProfitCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  const displayFinancialDashboardDaily = (
    <Stack w="100%">{displayProfitSection}</Stack>
  );

  return displayFinancialDashboardDaily;
}

export default FinancialDashboardDaily;
