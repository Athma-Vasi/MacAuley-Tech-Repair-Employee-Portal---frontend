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
  financialDashboardDailyProfitAction,
  financialDashboardDailyProfitReducer,
  initialFinancialDashboardDailyProfitState,
} from './state';

function FinancialDashboardDailyProfit({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsProfit,
  dailyChartsProfit,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsProfit: FinancialMetricsCards['dailyCards']['profit'];
  dailyChartsProfit: FinancialMetricsCharts['dailyCharts']['profit'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardDailyProfitState,
    financialDashboardDailyProfitDispatch,
  ] = useReducer(
    financialDashboardDailyProfitReducer,
    initialFinancialDashboardDailyProfitState
  );

  const {
    profitBarChartYAxisVariable,
    profitCalendarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
  } = financialDashboardDailyProfitState;

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
    dailyChartsProfit.barChartsObj
  );

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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitPieChartYAxisVariable,
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
      pieChartData={dailyChartsProfit.pieChartsObj[profitPieChartYAxisVariable]}
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitBarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> bar -> display
  const displayProfitBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsProfit.barChartsObj[profitBarChartYAxisVariable]}
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitLineChartYAxisVariable,
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
        dailyChartsProfit.lineChartsObj[profitLineChartYAxisVariable]
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
          financialDashboardDailyProfitDispatch({
            type: financialDashboardDailyProfitAction.setProfitCalendarChartYAxisVariable,
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
        dailyChartsProfit.calendarChartsObj[profitCalendarChartYAxisVariable]
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
      overviewCards={dailyCardsProfit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={profitPieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading="Daily Profit"
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
      calendarChart={displayProfitCalendarChart}
      calendarChartHeading={profitCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdProfitCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayProfitSection;
}

export default FinancialDashboardDailyProfit;
