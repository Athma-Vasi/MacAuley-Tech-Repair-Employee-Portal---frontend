import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
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
import {
  PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
  PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
} from '../constants';
import {
  ProductMetricBarLineChartObjKey,
  ProductMetricCalendarObjKey,
  ProductMetricsCharts,
} from '../utils';
import {
  initialProductDashboardMonthlyState,
  productDashboardMonthlyAction,
  productDashboardMonthlyReducer,
} from './state';

function ProductDashboardMonthly({
  borderColor,
  businessMetrics,
  monthlyCards,
  monthlyCharts,
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
  monthlyCards: ProductMetricsCards['monthlyCards'];
  monthlyCharts: ProductMetricsCharts['monthlyCharts'];
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [productDashboardMonthlyState, productDashboardMonthlyDispatch] =
    useReducer(
      productDashboardMonthlyReducer,
      initialProductDashboardMonthlyState
    );

  const {
    revenueBarChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    unitsSoldBarChartYAxisVariable,
    unitsSoldCalendarChartYAxisVariable,
    unitsSoldLineChartYAxisVariable,
  } = productDashboardMonthlyState;

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

  // heading -> revenue -> bar, line, calendar
  const barCalendarLineChartRevenueHeading = `${productMetric} Revenue for ${year} at ${storeLocation}`;

  // heading -> units sold

  // heading -> units sold -> pie
  const pieChartUnitsSoldHeading = `${productMetric} Units Sold for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> units sold -> bar, line, calendar
  const barCalendarLineChartUnitsSoldHeading = `${productMetric} Units Sold for ${year} at ${storeLocation}`;

  // revenue

  // revenue -> statistics
  const monthlyRevenueStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      monthlyCharts.revenue.barChartsObj
    );

  // revenue -> charts

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> display
  const displayPieChart = (
    <ResponsivePieChart
      pieChartData={monthlyCharts.revenue.pieChartObj}
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget
              .value as ProductMetricBarLineChartObjKey,
          });
        },
        value: revenueBarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        monthlyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueLineChartYAxisVariable,
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
        monthlyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `$${y}`}
    />
  );

  // revenue -> charts -> calendar

  // revenue -> charts -> calendar -> y-axis select input
  const [createdRevenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricCalendarObjKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> calendar -> display
  const displayRevenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.revenue.calendarChartsObj[
          revenueCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  // charts -> revenue -> display
  const displayRevenueSection = (
    <DashboardMetricsLayout
      barChart={displayRevenueBarChart}
      barChartHeading={barCalendarLineChartRevenueHeading}
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={barCalendarLineChartRevenueHeading}
      lineChartYAxisSelectInput={
        createdRevenueLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`Monthly ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={monthlyRevenueStatistics}
      width={width}
      calendarChart={displayRevenueCalendarChart}
      calendarChartHeading={barCalendarLineChartRevenueHeading}
      calendarChartYAxisSelectInput={
        createdRevenueCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  // units sold

  // units sold -> statistics
  const monthlyUnitsSoldStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      monthlyCharts.unitsSold.barChartsObj
    );

  // units sold -> charts

  // units sold -> charts -> pie

  // units sold -> charts -> pie -> display
  const displayUnitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={monthlyCharts.unitsSold.pieChartObj}
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldBarChartYAxisVariable,
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
        monthlyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldLineChartYAxisVariable,
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
        monthlyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `${y} Units Sold`}
    />
  );

  // units sold -> charts -> calendar

  // units sold -> charts -> calendar -> y-axis select input
  const [createdUnitsSoldCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricCalendarObjKey,
          });
        },
        value: unitsSoldCalendarChartYAxisVariable,
      },
    ]);

  // units sold -> charts -> calendar -> display
  const displayUnitsSoldCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.unitsSold.calendarChartsObj[
          unitsSoldCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  // charts -> units sold -> display
  const displayUnitsSoldSection = (
    <DashboardMetricsLayout
      barChart={displayUnitsSoldBarChart}
      barChartHeading={barCalendarLineChartUnitsSoldHeading}
      barChartYAxisSelectInput={
        createdUnitsSoldBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={barCalendarLineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={
        createdUnitsSoldLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`Monthly ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={monthlyUnitsSoldStatistics}
      width={width}
      calendarChart={displayUnitsSoldCalendarChart}
      calendarChartHeading={barCalendarLineChartUnitsSoldHeading}
      calendarChartYAxisSelectInput={
        createdUnitsSoldCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  const displayProductDashboardMonthly = (
    <Stack>
      {displayRevenueSection}
      {displayUnitsSoldSection}
    </Stack>
  );

  return displayProductDashboardMonthly;
}

export default ProductDashboardMonthly;
