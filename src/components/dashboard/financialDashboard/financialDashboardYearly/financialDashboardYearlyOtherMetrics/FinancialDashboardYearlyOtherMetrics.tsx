import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import { ResponsiveBarChart, ResponsiveLineChart } from '../../../../charts';
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
  financialDashboardYearlyOtherMetricsAction,
  financialDashboardYearlyOtherMetricsReducer,
  initialFinancialDashboardYearlyOtherMetricsState,
} from './state';

function FinancialDashboardYearlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOtherMetrics,
  yearlyChartsOtherMetrics,
  day,
  month,
  padding,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsOtherMetrics: FinancialMetricsCards['yearlyCards']['otherMetrics'];
  yearlyChartsOtherMetrics: FinancialMetricsCharts['yearlyCharts']['otherMetrics'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
  width: number;
}) {
  const [
    financialDashboardYearlyOtherMetricsState,
    financialDashboardYearlyOtherMetricsDispatch,
  ] = useReducer(
    financialDashboardYearlyOtherMetricsReducer,
    initialFinancialDashboardYearlyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = financialDashboardYearlyOtherMetricsState;

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
    yearlyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics -> charts -> bar

  // otherMetrics -> charts -> bar -> heading
  const otherMetricsBarChartHeading = 'Other Metrics for all operating years';

  // otherMetrics -> charts -> bar -> y-axis select input
  const [createdOtherMetricsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyOtherMetricsDispatch({
            type: financialDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
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
        yearlyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable]
      }
      indexBy="Years"
      keys={FINANCIAL_OTHER_METRICS_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // otherMetrics -> charts -> line

  // otherMetrics -> charts -> line -> heading
  const otherMetricsLineChartHeading = 'Other Metrics for all operating years';

  // otherMetrics -> charts -> line -> y-axis select input
  const [createdOtherMetricsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardYearlyOtherMetricsDispatch({
            type: financialDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
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
        yearlyChartsOtherMetrics.lineChartsObj[
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
      overviewCards={yearlyCardsOtherMetrics}
      padding={padding}
      sectionHeading="Yearly Other Metrics"
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
    />
  );

  return displayOtherMetricsSection;
}

export default FinancialDashboardYearlyOtherMetrics;
