import { MantineNumberSize, Stack } from '@mantine/core';
import { RepairMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Year,
} from '../../types';
import { RepairMetricChartsObjKey, RepairMetricsCharts } from '../utils';
import { ChangeEvent, useReducer } from 'react';
import {
  initialRepairDashboardYearlyState,
  repairDashboardYearlyReducer,
} from './state';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { LuExpand } from 'react-icons/lu';
import { MONTHS } from '../../constants';
import { returnStatistics } from '../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import { REPAIR_METRIC_Y_AXIS_DATA } from '../constants';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { splitCamelCase } from '../../../../utils';

function RepairDashboardYearly({
  borderColor,
  businessMetrics,
  yearlyCards,
  yearlyCharts,
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
  yearlyCards: RepairMetricsCards['yearlyCards'];
  yearlyCharts: RepairMetricsCharts['yearlyCharts'];
  day: string;
  repairMetric: DashboardRepairMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [repairDashboardYearlyState, dispatchRepairDashboardYearlyState] =
    useReducer(repairDashboardYearlyReducer, initialRepairDashboardYearlyState);

  const { barChartYAxisVariable, lineChartYAxisVariable } =
    repairDashboardYearlyState;

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
  const yearlyStatistics = returnStatistics<RepairMetricChartsObjKey>(
    yearlyCharts.barChartsObj
  );

  // charts

  // charts -> bar

  // charts -> bar -> heading
  const barChartHeading = `${repairMetric} ${splitCamelCase(
    barChartYAxisVariable
  )} at ${storeLocation} for all operating years`;

  // charts -> bar -> y-axis select input
  const [createdBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardYearlyState({
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
      barChartData={yearlyCharts.barChartsObj[barChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={REPAIR_METRIC_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // charts -> line

  // charts -> line -> heading
  const lineChartHeading = `${repairMetric} ${splitCamelCase(
    lineChartYAxisVariable
  )} at ${storeLocation} for all operating years`;

  // charts -> line -> y-axis select input
  const [createdLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardYearlyState({
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
      lineChartData={yearlyCharts.lineChartsObj[lineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${y}`}
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
      overviewCards={yearlyCards}
      padding={padding}
      sectionHeading={`Yearly ${repairMetric} Metrics`}
      semanticLabel={repairMetric}
      statisticsMap={yearlyStatistics}
      width={width}
    />
  );

  const displayRepairDashboardYearly = (
    <Stack>{displayRepairMetricsSection}</Stack>
  );

  return displayRepairDashboardYearly;
}

export default RepairDashboardYearly;
