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
} from '../../../../charts';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import { FINANCIAL_OTHER_METRICS_Y_AXIS_DATA } from '../../constants';
import {
  FinancialMetricsCharts,
  FinancialOtherMetricsObjKey,
} from '../../utils';
import {
  financialDashboardMonthlyOtherMetricsAction,
  financialDashboardMonthlyOtherMetricsReducer,
  initialFinancialDashboardMonthlyOtherMetricsState,
} from './state';

function FinancialDashboardMonthlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsOtherMetrics,
  monthlyChartsOtherMetrics,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsOtherMetrics: FinancialMetricsCards['monthlyCards']['otherMetrics'];
  monthlyChartsOtherMetrics: FinancialMetricsCharts['monthlyCharts']['otherMetrics'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardMonthlyOtherMetricsState,
    financialDashboardMonthlyOtherMetricsDispatch,
  ] = useReducer(
    financialDashboardMonthlyOtherMetricsReducer,
    initialFinancialDashboardMonthlyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsCalendarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = financialDashboardMonthlyOtherMetricsState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // otherMetrics

  // otherMetrics -> statistics
  const statisticsOtherMetrics = returnStatistics<FinancialOtherMetricsObjKey>(
    monthlyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics -> charts -> bar

  // otherMetrics -> charts -> bar -> heading
  const otherMetricsBarChartHeading = `Other Metrics for ${year}`;

  // otherMetrics -> charts -> bar -> y-axis select input
  const [createdOtherMetricsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyOtherMetricsDispatch({
            type: financialDashboardMonthlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsBarChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> bar -> display
  const displayOtherMetricsBarChart = (
    <ResponsiveBarChart
      barChartData={
        monthlyChartsOtherMetrics.barChartsObj[
          otherMetricsBarChartYAxisVariable
        ]
      }
      indexBy="Months"
      keys={FINANCIAL_OTHER_METRICS_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // otherMetrics -> charts -> line

  // otherMetrics -> charts -> line -> heading
  const otherMetricsLineChartHeading = `Other Metrics for ${year}`;

  // otherMetrics -> charts -> line -> y-axis select input
  const [createdOtherMetricsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyOtherMetricsDispatch({
            type: financialDashboardMonthlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsLineChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> line -> display
  const displayOtherMetricsLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyChartsOtherMetrics.lineChartsObj[
          otherMetricsLineChartYAxisVariable
        ]
      }
      hideControls
      yFormat={(y) =>
        otherMetricsLineChartYAxisVariable === 'averageOrderValue'
          ? `$${y}`
          : `${y} %`
      }
    />
  );

  // otherMetrics -> charts -> calendar

  // otherMetrics -> charts -> calendar -> heading
  const otherMetricsCalendarChartHeading = `Other Metrics for ${year}`;

  // otherMetrics -> charts -> calendar -> y-axis select input
  const [createdOtherMetricsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyOtherMetricsDispatch({
            type: financialDashboardMonthlyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsCalendarChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> calendar -> display
  const displayOtherMetricsCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsOtherMetrics.calendarChartsObj[
          otherMetricsCalendarChartYAxisVariable
        ]
      }
      from={`${year}-01-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayOtherMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayOtherMetricsBarChart}
      barChartHeading={otherMetricsBarChartHeading}
      barChartYAxisSelectInput={
        createdOtherMetricsBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayOtherMetricsLineChart}
      lineChartHeading={otherMetricsLineChartHeading}
      lineChartYAxisSelectInput={
        createdOtherMetricsLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsOtherMetrics}
      padding={padding}
      sectionHeading="Monthly Other Metrics"
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
      calendarChart={displayOtherMetricsCalendarChart}
      calendarChartHeading={otherMetricsCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOtherMetricsCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayOtherMetricsSection;
}

export default FinancialDashboardMonthlyOtherMetrics;
