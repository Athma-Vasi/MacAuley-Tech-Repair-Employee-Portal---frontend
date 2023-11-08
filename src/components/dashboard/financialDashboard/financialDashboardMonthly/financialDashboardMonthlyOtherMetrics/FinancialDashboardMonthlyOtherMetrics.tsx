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
} from '../../../../charts';
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import {
  returnChartTitleNavigateLinks,
  returnStatistics,
} from '../../../utils';
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
  storeLocation,
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
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

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

  // otherMetrics

  // otherMetrics -> statistics
  const statisticsOtherMetrics = returnStatistics<FinancialOtherMetricsObjKey>(
    monthlyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics  -> charts -> titles & navlinks
  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Monthly',
    metricCategory: 'Other Metrics',
    metricsView: 'Financials',
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisCalendarChartVariable: otherMetricsCalendarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // otherMetrics -> charts -> bar

  // otherMetrics -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: 'Expand Other Metrics Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsOtherMetrics.barChartsObj[
                otherMetricsBarChartYAxisVariable
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

  // otherMetrics -> charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Other Metrics Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsOtherMetrics.lineChartsObj[
                otherMetricsLineChartYAxisVariable
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
          ? `$${addCommaSeparator(y)}`
          : `${addCommaSeparator(y)} %`
      }
    />
  );

  // otherMetrics -> charts -> calendar

  // otherMetrics -> charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: 'Expand Other Metrics Calendar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsOtherMetrics.calendarChartsObj[
                otherMetricsCalendarChartYAxisVariable
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
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdOtherMetricsBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      lineChart={displayOtherMetricsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdOtherMetricsLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsOtherMetrics}
      padding={padding}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly Other Metrics`}
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
      calendarChart={displayOtherMetricsCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOtherMetricsCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayOtherMetricsSection;
}

export default FinancialDashboardMonthlyOtherMetrics;
