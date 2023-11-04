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
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
} from '../../constants';
import {
  FinancialMetricsCharts,
  FinancialOtherMetricsObjKey,
} from '../../utils';
import {
  financialDashboardDailyOtherMetricsAction,
  financialDashboardDailyOtherMetricsReducer,
  initialFinancialDashboardDailyOtherMetricsState,
} from './state';

function FinancialDashboardDailyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsOtherMetrics,
  dailyChartsOtherMetrics,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsOtherMetrics: FinancialMetricsCards['dailyCards']['otherMetrics'];
  dailyChartsOtherMetrics: FinancialMetricsCharts['dailyCharts']['otherMetrics'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardDailyOtherMetricsState,
    financialDashboardDailyOtherMetricsDispatch,
  ] = useReducer(
    financialDashboardDailyOtherMetricsReducer,
    initialFinancialDashboardDailyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsCalendarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = financialDashboardDailyOtherMetricsState;

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
    dailyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics -> charts -> bar

  // otherMetrics -> charts -> bar -> heading
  const otherMetricsBarChartHeading = `Other Metrics for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // otherMetrics -> charts -> bar -> y-axis select input
  const [createdOtherMetricsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
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
        dailyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable]
      }
      indexBy="Days"
      keys={FINANCIAL_OTHER_METRICS_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // otherMetrics -> charts -> line

  // otherMetrics -> charts -> line -> heading
  const otherMetricsLineChartHeading = `Other Metrics for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // otherMetrics -> charts -> line -> y-axis select input
  const [createdOtherMetricsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
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
        dailyChartsOtherMetrics.lineChartsObj[
          otherMetricsLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) =>
        otherMetricsLineChartYAxisVariable === 'averageOrderValue'
          ? `$${y}`
          : `${y} %`
      }
    />
  );

  // otherMetrics -> charts -> calendar

  // otherMetrics -> charts -> calendar -> heading
  const otherMetricsCalendarChartHeading = `Other Metrics for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // otherMetrics -> charts -> calendar -> y-axis select input
  const [createdOtherMetricsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable,
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
        dailyChartsOtherMetrics.calendarChartsObj[
          otherMetricsCalendarChartYAxisVariable
        ]
      }
      from={`${year}-${month}-01`}
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
      overviewCards={dailyCardsOtherMetrics}
      padding={padding}
      sectionHeading="Daily Other Metrics"
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

export default FinancialDashboardDailyOtherMetrics;
