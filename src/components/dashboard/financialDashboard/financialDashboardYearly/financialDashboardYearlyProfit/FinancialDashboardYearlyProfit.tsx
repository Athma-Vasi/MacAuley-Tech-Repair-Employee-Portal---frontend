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
  financialDashboardYearlyProfitAction,
  financialDashboardYearlyProfitReducer,
  initialFinancialDashboardYearlyProfitState,
} from './state';

function FinancialDashboardYearlyProfit({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsProfit,
  yearlyChartsProfit,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsProfit: FinancialMetricsCards['yearlyCards']['profit'];
  yearlyChartsProfit: FinancialMetricsCharts['yearlyCharts']['profit'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardYearlyProfitState,
    financialDashboardYearlyProfitDispatch,
  ] = useReducer(
    financialDashboardYearlyProfitReducer,
    initialFinancialDashboardYearlyProfitState
  );

  const {
    profitBarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
  } = financialDashboardYearlyProfitState;

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
    yearlyChartsProfit.barChartsObj
  );

  // profit -> charts

  // profit -> charts -> pie

  // profit -> charts -> pie -> heading
  const profitPieChartHeading = `Profit for ${year}`;

  //  profit -> charts -> pie -> y-axis select input
  const [createdProfitPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitPieChartYAxisVariable,
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
        yearlyChartsProfit.pieChartsObj[profitPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // profit -> charts -> bar

  // profit -> charts -> bar -> heading
  const profitBarChartHeading = 'Profit for all operating years';

  // profit -> charts -> bar -> y-axis select input
  const [createdProfitBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitBarChartYAxisVariable,
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
        yearlyChartsProfit.barChartsObj[profitBarChartYAxisVariable]
      }
      indexBy="Years"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // profit -> charts -> line

  // profit -> charts -> line -> heading
  const profitLineChartHeading = 'Profit for all operating years';

  // profit -> charts -> line -> y-axis select input
  const [createdProfitLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyProfitDispatch({
            type: financialDashboardYearlyProfitAction.setProfitLineChartYAxisVariable,
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
        yearlyChartsProfit.lineChartsObj[profitLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  // profit -> charts -> calendar

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
      overviewCards={yearlyCardsProfit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={profitPieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading="Yearly Profit"
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
    />
  );

  return displayProfitSection;
}

export default FinancialDashboardYearlyProfit;
