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
import { returnChartTitleNavigateLinks, returnStatistics } from '../../utils';
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
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [productDashboardYearlyState, productDashboardYearlyDispatch] =
    useReducer(
      productDashboardYearlyReducer,
      initialProductDashboardYearlyState
    );

  const {
    revenueBarChartYAxisVariable,
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

  // revenue

  // revenue -> statistics
  const yearlyRevenueStatistics =
    returnStatistics<ProductMetricBarLineChartObjKey>(
      yearlyCharts.revenue.barChartsObj
    );

  // revenue -> charts

  // revenue -> charts -> titles & navlinks
  const {
    barChartHeading: revenueBarChartHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkRevenue,
    expandLineChartNavigateLink: expandLineChartNavigateLinkRevenue,
    lineChartHeading: revenueLineChartHeading,
    pieChartHeading: pieChartRevenueHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkRevenue,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Yearly',
    metricCategory: 'Revenue',
    metricsView: 'Products',
    productMetric,
    storeLocation,
    yAxisBarChartVariable: revenueBarChartYAxisVariable,
    yAxisLineChartVariable: revenueLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> expand chart button
  const [createdExpandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: 'Expand Pie Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.revenue.pieChartObj,
            chartTitle: pieChartRevenueHeading,
            chartKind: 'pie',
          },
        });

        navigate(expandPieChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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

  // revenue -> charts -> bar -> expand chart button
  const [createdExpandRevenueBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${revenueBarChartHeading}`,
      semanticName: 'Expand Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable],
            chartTitle: revenueBarChartHeading,
            chartKind: 'bar',
          },
        });

        navigate(expandBarChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
        value: revenueBarChartYAxisVariable,
      },
    ]);

  // revenue -> charts -> bar -> display
  const displayRevenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> expand chart button
  const [createdExpandRevenueLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${revenueLineChartHeading}`,
      semanticName: 'Expand Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable],
            chartTitle: revenueLineChartHeading,
            chartKind: 'line',
          },
        });

        navigate(expandLineChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // charts -> revenue -> display
  const displayRevenueSection = (
    <DashboardMetricsLayout
      barChart={displayRevenueBarChart}
      barChartHeading={revenueBarChartHeading}
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandRevenueBarChartButton}
      expandLineChartButton={createdExpandRevenueLineChartButton}
      expandPieChartButton={createdExpandRevenuePieChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={
        createdRevenueLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Yearly ${productMetric} Revenue`}
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

  // units sold -> charts -> titles & navlinks
  const {
    barChartHeading: barChartUnitsSoldHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkUnitsSold,
    expandLineChartNavigateLink: expandLineChartNavigateLinkUnitsSold,
    lineChartHeading: lineChartUnitsSoldHeading,
    pieChartHeading: pieChartUnitsSoldHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkUnitsSold,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Yearly',
    metricCategory: 'Units Sold',
    metricsView: 'Products',
    productMetric,
    storeLocation,
    yAxisBarChartVariable: unitsSoldBarChartYAxisVariable,
    yAxisLineChartVariable: unitsSoldLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // units sold -> charts -> pie

  // units sold -> charts -> pie -> expand chart button
  const [createdExpandUnitsSoldPieChartButton] = returnAccessibleButtonElements(
    [
      {
        buttonLabel: 'Expand',
        semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
        semanticName: 'Expand Pie Chart',
        buttonOnClick: () => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartData: yearlyCharts.unitsSold.pieChartObj,
              chartTitle: pieChartUnitsSoldHeading,
              chartKind: 'pie',
            },
          });

          navigate(expandPieChartNavigateLinkUnitsSold);
        },
        leftIcon: <LuExpand />,
      },
    ]
  );

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

  // units sold -> charts -> bar -> expand chart button
  const [createdExpandUnitsSoldBarChartButton] = returnAccessibleButtonElements(
    [
      {
        buttonLabel: 'Expand',
        semanticDescription: `Expand and customize ${barChartUnitsSoldHeading}`,
        semanticName: 'Expand Bar Chart',
        buttonOnClick: () => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartData:
                yearlyCharts.unitsSold.barChartsObj[
                  unitsSoldBarChartYAxisVariable
                ],
              chartTitle: barChartUnitsSoldHeading,
              chartKind: 'bar',
            },
          });

          navigate(expandBarChartNavigateLinkUnitsSold);
        },
        leftIcon: <LuExpand />,
      },
    ]
  );

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

  // units sold -> charts -> line -> expand chart button
  const [createdExpandUnitsSoldLineChartButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Expand',
        semanticDescription: `Expand and customize ${lineChartUnitsSoldHeading}`,
        semanticName: 'Expand Line Chart',
        buttonOnClick: () => {
          globalDispatch({
            type: globalAction.setCustomizeChartsPageData,
            payload: {
              chartData:
                yearlyCharts.unitsSold.lineChartsObj[
                  unitsSoldLineChartYAxisVariable
                ],
              chartTitle: lineChartUnitsSoldHeading,
              chartKind: 'line',
            },
          });

          navigate(expandLineChartNavigateLinkUnitsSold);
        },
        leftIcon: <LuExpand />,
      },
    ]);

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
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
    />
  );

  // charts -> units sold -> display
  const displayUnitsSoldSection = (
    <DashboardMetricsLayout
      barChart={displayUnitsSoldBarChart}
      barChartHeading={barChartUnitsSoldHeading}
      barChartYAxisSelectInput={
        createdUnitsSoldBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandBarChartButton={createdExpandUnitsSoldBarChartButton}
      expandLineChartButton={createdExpandUnitsSoldLineChartButton}
      expandPieChartButton={createdExpandUnitsSoldPieChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={
        createdUnitsSoldLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Yearly ${productMetric} Units Sold`}
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
