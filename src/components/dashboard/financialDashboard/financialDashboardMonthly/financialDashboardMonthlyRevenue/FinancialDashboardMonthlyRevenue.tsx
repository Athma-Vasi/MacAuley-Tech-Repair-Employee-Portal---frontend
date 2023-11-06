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
  financialDashboardMonthlyRevenueAction,
  financialDashboardMonthlyRevenueReducer,
  initialFinancialDashboardMonthlyRevenueState,
} from './state';

function FinancialDashboardMonthlyRevenue({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsRevenue,
  monthlyChartsRevenue,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsRevenue: FinancialMetricsCards['monthlyCards']['revenue'];
  monthlyChartsRevenue: FinancialMetricsCharts['monthlyCharts']['revenue'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardMonthlyRevenueState,
    financialDashboardMonthlyRevenueDispatch,
  ] = useReducer(
    financialDashboardMonthlyRevenueReducer,
    initialFinancialDashboardMonthlyRevenueState
  );

  const {
    barChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    revenuePieChartYAxisVariable,
  } = financialDashboardMonthlyRevenueState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue

  // revenue -> statistics
  const statisticsRevenue = returnStatistics<FinancialMetricBarLineObjKey>(
    monthlyChartsRevenue.barChartsObj
  );

  // revenue -> charts

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> heading
  const revenuePieChartHeading = `Revenue for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  //  revenue -> charts -> pie -> y-axis select input
  const [createdRevenuePieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyRevenueDispatch({
            type: financialDashboardMonthlyRevenueAction.setRevenuePieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: revenuePieChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> pie -> display
  const displayRevenuePieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        monthlyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable]
      }
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> heading
  const revenueBarChartHeading = `Revenue for ${year}`;

  // revenue -> charts -> bar -> y-axis select input
  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyRevenueDispatch({
            type: financialDashboardMonthlyRevenueAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: barChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      barChartData={monthlyChartsRevenue.barChartsObj[barChartYAxisVariable]}
      indexBy="Months"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> heading
  const revenueLineChartHeading = `Revenue for ${year}`;

  // revenue -> charts -> line -> y-axis select input
  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyRevenueDispatch({
            type: financialDashboardMonthlyRevenueAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> line -> display
  const displayRevenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `$${y}`}
    />
  );

  // revenue -> charts -> calendar

  // revenue -> charts -> calendar -> heading
  const revenueCalendarChartHeading = `Revenue for ${year}`;

  // revenue -> charts -> calendar -> y-axis select input
  const [createdRevenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyRevenueDispatch({
            type: financialDashboardMonthlyRevenueAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> calendar -> display
  const displayRevenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsRevenue.calendarChartsObj[
          revenueCalendarChartYAxisVariable
        ]
      }
      from={`${year}-01-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayRevenueSection = (
    <DashboardMetricsLayout
      barChart={displayRevenueBarChart}
      barChartHeading={revenueBarChartHeading}
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={
        createdRevenueLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsRevenue}
      padding={padding}
      pieChart={displayRevenuePieChart}
      pieChartHeading={revenuePieChartHeading}
      pieChartYAxisSelectInput={createdRevenuePieChartYAxisVariablesSelectInput}
      sectionHeading="Monthly Revenue"
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
      calendarChart={displayRevenueCalendarChart}
      calendarChartHeading={revenueCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdRevenueCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayRevenueSection;
}

export default FinancialDashboardMonthlyRevenue;
