import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { splitCamelCase } from '../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import { MONTHS } from '../../constants';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { RepairMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Year,
} from '../../types';
import { returnStatistics } from '../../utils';
import { REPAIR_METRIC_Y_AXIS_DATA } from '../constants';
import { RepairMetricChartsObjKey, RepairMetricsCharts } from '../utils';
import {
  initialRepairDashboardDailyState,
  repairDashboardDailyReducer,
} from './state';

function RepairDashboardDaily({
  borderColor,
  businessMetrics,
  dailyCards,
  dailyCharts,
  day,
  repairMetric,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  dailyCards: RepairMetricsCards['dailyCards'];
  dailyCharts: RepairMetricsCharts['dailyCharts'];
  day: string;
  repairMetric: DashboardRepairMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [repairDashboardDailyState, dispatchRepairDashboardDailyState] =
    useReducer(repairDashboardDailyReducer, initialRepairDashboardDailyState);

  const {
    barChartYAxisVariable,
    calendarChartYAxisVariable,
    lineChartYAxisVariable,
  } = repairDashboardDailyState;

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

  // statistics
  const dailyStatistics = returnStatistics<RepairMetricChartsObjKey>(
    dailyCharts.barChartsObj
  );

  // charts

  // charts -> bar

  // charts -> bar -> heading
  const barChartHeading = `${repairMetric} ${splitCamelCase(
    barChartYAxisVariable
  )} for ${MONTHS[parseInt(month) - 1]}, ${year} at ${storeLocation}`;

  // charts -> bar -> y-axis select input
  const [createdBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardDailyState({
            type: 'setBarChartYAxisVariable',
            payload: event.currentTarget.value as RepairMetricChartsObjKey,
          });
        },
        value: barChartYAxisVariable,
      },
    ]);

  // charts -> bar -> display
  const displayBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.barChartsObj[barChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={REPAIR_METRIC_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // charts -> line

  // charts -> line -> heading
  const lineChartHeading = `${repairMetric} ${splitCamelCase(
    lineChartYAxisVariable
  )} for ${MONTHS[parseInt(month) - 1]}, ${year} at ${storeLocation}`;

  // charts -> line -> y-axis select input
  const [createdLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardDailyState({
            type: 'setLineChartYAxisVariable',
            payload: event.currentTarget.value as RepairMetricChartsObjKey,
          });
        },
        value: lineChartYAxisVariable,
      },
    ]);

  // charts -> line -> display
  const displayLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.lineChartsObj[lineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${y}`}
    />
  );

  // charts -> calendar

  // charts -> calendar -> heading
  const calendarChartHeading = `${repairMetric} ${splitCamelCase(
    calendarChartYAxisVariable
  )} for ${MONTHS[parseInt(month) - 1]}, ${year} at ${storeLocation}`;

  // charts -> calendar -> y-axis select input
  const [createdCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardDailyState({
            type: 'setCalendarChartYAxisVariable',
            payload: event.currentTarget.value as RepairMetricChartsObjKey,
          });
        },
        value: calendarChartYAxisVariable,
      },
    ]);

  // charts -> calendar -> display
  const displayCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.calendarChartsObj[calendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  // charts -> display
  const displayRepairMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards}
      padding={padding}
      sectionHeading={`Daily ${repairMetric} Metrics`}
      semanticLabel={repairMetric}
      statisticsMap={dailyStatistics}
      width={width}
      calendarChart={displayCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  const displayRepairDashboardDaily = (
    <Stack>{displayRepairMetricsSection}</Stack>
  );

  return displayRepairDashboardDaily;
}

export default RepairDashboardDaily;
