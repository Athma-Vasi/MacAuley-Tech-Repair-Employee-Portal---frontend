import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import { MONTHS } from '../../constants';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { ProductMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardProductMetric,
  Year,
} from '../../types';
import { returnStatistics } from '../../utils';
import { PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA } from '../constants';
import {
  ProductMetricBarLineChartObjKey,
  ProductMetricsCharts,
} from '../utils';
import {
  initialProductDashboardYearlyState,
  productDashboardYearlyAction,
  productDashboardYearlyReducer,
} from './state';

function ProductDashboardYearly({
  borderColor,
  businessMetrics,
  yearlyCards,
  yearlyCharts,
  day,
  productMetric,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  yearlyCards: ProductMetricsCards['yearlyCards'];
  yearlyCharts: ProductMetricsCharts['yearlyCharts'];
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [productDashboardYearlyState, productDashboardYearlyDispatch] =
    useReducer(
      productDashboardYearlyReducer,
      initialProductDashboardYearlyState
    );

  const {
    barChartYAxisVariable,
    revenueLineChartYAxisVariable,
    unitsSoldBarChartYAxisVariable,
    unitsSoldLineChartYAxisVariable,
  } = productDashboardYearlyState;

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

  // heading

  // heading -> revenue

  // heading -> revenue -> pie
  const pieChartRevenueHeading = `${productMetric} Revenue for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> revenue -> bar, line
  const barLineChartRevenueHeading = `${productMetric} Revenue for ${year} at ${storeLocation}`;

  // heading -> units sold

  // heading -> units sold -> pie
  const pieChartUnitsSoldHeading = `${productMetric} Units Sold for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> units sold -> bar, line
  const barLineChartUnitsSoldHeading = `${productMetric} Units Sold for ${year} at ${storeLocation}`;

  // revenue

  // revenue -> statistics
  const yearlyRevenueStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      yearlyCharts.revenue.barChartsObj
    );

  // revenue -> charts

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> display
  const displayPieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.revenue.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> y-axis select input
  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget
              .value as ProductMetricBarLineChartObjKey,
          });
        },
        value: barChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyCharts.revenue.barChartsObj[barChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> y-axis select input
  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget
              .value as ProductMetricBarLineChartObjKey,
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
        yearlyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `$${y}`}
    />
  );

  // charts -> revenue -> display
  const displayRevenueSection = (
    <DashboardMetricsLayout
      barChart={displayRevenueBarChart}
      barChartHeading={barLineChartRevenueHeading}
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={barLineChartRevenueHeading}
      lineChartYAxisSelectInput={
        createdRevenueLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`Yearly ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={yearlyRevenueStatistics}
      width={width}
    />
  );

  // units sold

  // units sold -> statistics
  const yearlyUnitsSoldStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      yearlyCharts.unitsSold.barChartsObj
    );

  // units sold -> charts

  // units sold -> charts -> pie

  // units sold -> charts -> pie -> display
  const displayUnitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.unitsSold.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // units sold -> charts -> bar

  // units sold -> charts -> bar -> y-axis select input
  const [createdUnitsSoldBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldBarChartYAxisVariable,
            payload: event.currentTarget
              .value as ProductMetricBarLineChartObjKey,
          });
        },
        value: unitsSoldBarChartYAxisVariable,
      },
    ]);

  // units sold -> charts -> bar -> display
  const displayUnitsSoldBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // units sold -> charts -> line

  // units sold -> charts -> line -> y-axis select input
  const [createdUnitsSoldLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldLineChartYAxisVariable,
            payload: event.currentTarget
              .value as ProductMetricBarLineChartObjKey,
          });
        },
        value: unitsSoldLineChartYAxisVariable,
      },
    ]);

  // units sold -> charts -> line -> display
  const displayUnitsSoldLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `${y} Units Sold`}
    />
  );

  // charts -> units sold -> display
  const displayUnitsSoldSection = (
    <DashboardMetricsLayout
      barChart={displayUnitsSoldBarChart}
      barChartHeading={barLineChartUnitsSoldHeading}
      barChartYAxisSelectInput={
        createdUnitsSoldBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={barLineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={
        createdUnitsSoldLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`Yearly ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={yearlyUnitsSoldStatistics}
      width={width}
    />
  );

  const displayProductDashboardYearly = (
    <Stack>
      {displayRevenueSection}
      {displayUnitsSoldSection}
    </Stack>
  );

  return displayProductDashboardYearly;
}

export default ProductDashboardYearly;
