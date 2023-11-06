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
  financialDashboardYearlyRevenueAction,
  financialDashboardYearlyRevenueReducer,
  initialFinancialDashboardYearlyRevenueState,
} from './state';

function FinancialDashboardYearlyRevenue({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsRevenue,
  yearlyChartsRevenue,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsRevenue: FinancialMetricsCards['yearlyCards']['revenue'];
  yearlyChartsRevenue: FinancialMetricsCharts['yearlyCharts']['revenue'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardYearlyRevenueState,
    financialDashboardYearlyRevenueDispatch,
  ] = useReducer(
    financialDashboardYearlyRevenueReducer,
    initialFinancialDashboardYearlyRevenueState
  );

  const {
    barChartYAxisVariable,
    revenueLineChartYAxisVariable,
    revenuePieChartYAxisVariable,
  } = financialDashboardYearlyRevenueState;

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
    yearlyChartsRevenue.barChartsObj
  );

  // revenue -> charts

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> heading
  const revenuePieChartHeading = `Revenue for ${year}`;

  //  revenue -> charts -> pie -> y-axis select input
  const [createdRevenuePieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenuePieChartYAxisVariable,
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
        yearlyChartsRevenue.pieChartsObj[revenuePieChartYAxisVariable]
      }
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> heading
  const revenueBarChartHeading = 'Revenue for all operating years';

  // revenue -> charts -> bar -> y-axis select input
  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: barChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsRevenue.barChartsObj[barChartYAxisVariable]}
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> heading
  const revenueLineChartHeading = 'Revenue for all operating years';

  // revenue -> charts -> line -> y-axis select input
  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyRevenueDispatch({
            type: financialDashboardYearlyRevenueAction.setRevenueLineChartYAxisVariable,
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
        yearlyChartsRevenue.lineChartsObj[revenueLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  // revenue -> charts -> calendar

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
      overviewCards={yearlyCardsRevenue}
      padding={padding}
      pieChart={displayRevenuePieChart}
      pieChartHeading={revenuePieChartHeading}
      pieChartYAxisSelectInput={createdRevenuePieChartYAxisVariablesSelectInput}
      sectionHeading="Yearly Revenue"
      semanticLabel="revenue"
      statisticsMap={statisticsRevenue}
      width={width}
    />
  );

  return displayRevenueSection;
}

export default FinancialDashboardYearlyRevenue;
