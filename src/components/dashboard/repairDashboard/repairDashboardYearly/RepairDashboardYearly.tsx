import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { globalAction } from '../../../../context/globalProvider/state';
import { useGlobalState } from '../../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { addCommaSeparator, splitCamelCase } from '../../../../utils';
import { ResponsiveBarChart, ResponsiveLineChart } from '../../../charts';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { RepairMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Year,
} from '../../types';
import { returnChartTitleNavigateLinks, returnStatistics } from '../../utils';
import { REPAIR_METRIC_Y_AXIS_DATA } from '../constants';
import { RepairMetricChartsObjKey, RepairMetricsCharts } from '../utils';
import {
  initialRepairDashboardYearlyState,
  repairDashboardYearlyReducer,
} from './state';

function RepairDashboardYearly({
  borderColor,
  businessMetrics,
  yearlyCards,
  yearlyCharts,
  repairMetric,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  yearlyCards: RepairMetricsCards['yearlyCards'];
  yearlyCharts: RepairMetricsCharts['yearlyCharts'];
  repairMetric: DashboardRepairMetric;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

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

  // statistics
  const yearlyStatistics = returnStatistics<RepairMetricChartsObjKey>(
    yearlyCharts.barChartsObj
  );

  // charts

  // charts -> titles & navlinks
  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Yearly',
    metricCategory: splitCamelCase(repairMetric),
    metricsView: 'Repairs',
    storeLocation,
    yAxisBarChartVariable: barChartYAxisVariable,
    yAxisLineChartVariable: lineChartYAxisVariable,
    year,
  });

  // charts -> bar

  // charts -> bar -> expand chart button
  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: 'Expand Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.barChartsObj[barChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: 'bar',
            chartUnitKind:
              barChartYAxisVariable === 'revenue' ? 'currency' : 'number',
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      unitKind={barChartYAxisVariable === 'revenue' ? 'currency' : 'number'}
    />
  );

  // charts -> line

  // charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.lineChartsObj[lineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: 'line',
            chartUnitKind:
              lineChartYAxisVariable === 'revenue' ? 'currency' : 'number',
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) =>
        `${lineChartYAxisVariable === 'revenue' ? '$' : ''}${addCommaSeparator(
          y
        )}`
      }
      unitKind={lineChartYAxisVariable === 'revenue' ? 'currency' : 'number'}
    />
  );

  // charts -> display
  const displayRepairMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandChartButton}
      expandLineChartButton={createdExpandLineChartButton}
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
