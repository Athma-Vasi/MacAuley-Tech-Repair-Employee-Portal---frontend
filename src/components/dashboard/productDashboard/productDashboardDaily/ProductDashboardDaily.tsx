import { MantineNumberSize, Stack } from '@mantine/core';
import { ProductMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardProductMetric,
  Year,
} from '../../types';
import {
  ProductMetricBarLineChartObjKey,
  ProductMetricCalendarObjKey,
  ProductMetricsCharts,
} from '../utils';
import { ChangeEvent, useReducer } from 'react';
import {
  initialProductDashboardDailyState,
  productDashboardDailyAction,
  productDashboardDailyReducer,
} from './state';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { LuExpand } from 'react-icons/lu';
import { returnStatistics } from '../../utils';
import { MONTHS } from '../../constants';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import {
  PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
  PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
} from '../constants';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';

function ProductDashboardDaily({
  borderColor,
  businessMetrics,
  dailyCards,
  dailyCharts,
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
  dailyCards: ProductMetricsCards['dailyCards'];
  dailyCharts: ProductMetricsCharts['dailyCharts'];
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [productDashboardDailyState, productDashboardDailyDispatch] =
    useReducer(productDashboardDailyReducer, initialProductDashboardDailyState);

  const {
    revenueBarChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    unitsSoldBarChartYAxisVariable,
    unitsSoldCalendarChartYAxisVariable,
    unitsSoldLineChartYAxisVariable,
  } = productDashboardDailyState;

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
  const pieChartRevenueHeading = `${productMetric} Revenue for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> revenue -> bar, line, calendar
  const barCalendarLineChartRevenueHeading = `${productMetric} Revenue for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> units sold

  // heading -> units sold -> pie
  const pieChartUnitsSoldHeading = `${productMetric} Units Sold for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // heading -> units sold -> bar, line, calendar
  const barCalendarLineChartUnitsSoldHeading = `${productMetric} Units Sold for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // revenue

  // revenue -> statistics
  const dailyRevenueStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      dailyCharts.revenue.barChartsObj
    );

  // revenue -> charts

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> display
  const displayPieChart = (
    <ResponsivePieChart
      pieChartData={dailyCharts.revenue.pieChartObj}
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setRevenueBarChartYAxisVariable,
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
        dailyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable]
      }
      hideControls
      indexBy="Days"
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setRevenueLineChartYAxisVariable,
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
        dailyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setRevenueCalendarChartYAxisVariable,
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
        dailyCharts.revenue.calendarChartsObj[revenueCalendarChartYAxisVariable]
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
      overviewCards={dailyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`Daily ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={dailyRevenueStatistics}
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
  const dailyUnitsSoldStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      dailyCharts.unitsSold.barChartsObj
    );

  // units sold -> charts

  // units sold -> charts -> pie

  // units sold -> charts -> pie -> display
  const displayUnitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={dailyCharts.unitsSold.pieChartObj}
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldBarChartYAxisVariable,
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
        dailyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable]
      }
      hideControls
      indexBy="Days"
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldLineChartYAxisVariable,
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
        dailyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
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
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldCalendarChartYAxisVariable,
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
        dailyCharts.unitsSold.calendarChartsObj[
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
      overviewCards={dailyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`Daily ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={dailyUnitsSoldStatistics}
      width={width}
      calendarChart={displayUnitsSoldCalendarChart}
      calendarChartHeading={barCalendarLineChartUnitsSoldHeading}
      calendarChartYAxisSelectInput={
        createdUnitsSoldCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  const displayProductDashboardDaily = (
    <Stack>
      {displayRevenueSection}
      {displayUnitsSoldSection}
    </Stack>
  );

  return displayProductDashboardDaily;
}

export default ProductDashboardDaily;
