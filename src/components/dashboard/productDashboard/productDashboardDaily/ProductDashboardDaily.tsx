import { Stack } from "@mantine/core";
import { ChangeEvent, useReducer } from "react";
import { LuExpand } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { globalAction } from "../../../../context/globalProvider/state";
import { useGlobalState } from "../../../../hooks";
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from "../../../../jsxCreators";
import { addCommaSeparator, returnThemeColors, splitCamelCase } from "../../../../utils";
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../charts";
import { MONTHS } from "../../constants";
import DashboardMetricsLayout from "../../DashboardMetricsLayout";
import { returnProductMetricsCards } from "../../jsxHelpers";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import {
  PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
  PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
} from "../constants";
import { ProductDashboardChildrenProps } from "../types";
import {
  ProductMetricsChartKey,
  ProductMetricCalendarObjKey,
  returnProductMetricsCharts,
  returnSelectedDateProductMetrics,
} from "../utilsOld";
import {
  initialProductDashboardDailyState,
  productDashboardDailyAction,
  productDashboardDailyReducer,
} from "./state";

function ProductDashboardDaily({
  businessMetrics,
  day,
  month,
  productMetric,
  selectedDate,
  selectedMonth,
  selectedYear,
  storeLocation,
  storeLocationView,
  year,
}: ProductDashboardChildrenProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const [productDashboardDailyState, productDashboardDailyDispatch] = useReducer(
    productDashboardDailyReducer,
    initialProductDashboardDailyState
  );

  const {
    revenueBarChartYAxisVariable,
    revenueCalendarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    unitsSoldBarChartYAxisVariable,
    unitsSoldCalendarChartYAxisVariable,
    unitsSoldLineChartYAxisVariable,
  } = productDashboardDailyState;

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
  const chartHeight = width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

  const {
    appThemeColors: { borderColor },
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const selectedDateProductMetrics = returnSelectedDateProductMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    selectedProductCategory: productMetric,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  const { dailyCharts } = returnProductMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateProductMetrics,
    storeLocation: storeLocationView,
    selectedProductCategory: productMetric,
  });

  const { dailyCards } = returnProductMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateProductMetrics,
    width,
  });

  // revenue

  // revenue -> statistics
  const dailyRevenueStatistics = returnStatistics<ProductMetricsChartKey>(
    dailyCharts.revenue.barChartsObj
  );

  // revenue -> charts

  // revenue -> charts -> titles & navlinks
  const {
    barChartHeading: revenueBarChartHeading,
    calendarChartHeading: revenueCalendarChartHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkRevenue,
    expandCalendarChartNavigateLink: expandCalendarChartNavigateLinkRevenue,
    expandLineChartNavigateLink: expandLineChartNavigateLinkRevenue,
    lineChartHeading: revenueLineChartHeading,
    pieChartHeading: pieChartRevenueHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkRevenue,
  } = returnChartTitleNavigateLinks({
    calendarView: "Daily",
    metricCategory: "Revenue",
    metricsView: "Products",
    productMetric,
    storeLocation,
    yAxisBarChartVariable: revenueBarChartYAxisVariable,
    yAxisCalendarChartVariable: revenueCalendarChartYAxisVariable,
    yAxisLineChartVariable: revenueLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // revenue -> charts -> pie

  // revenue -> charts -> pie -> expand chart button
  const [expandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.pieChartObj,
            chartTitle: pieChartRevenueHeading,
            chartKind: "pie",
            chartUnitKind: "currency",
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
      pieChartData={dailyCharts.revenue.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> expand chart button
  const [expandRevenueBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueBarChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable],
            chartTitle: revenueBarChartHeading,
            chartKind: "bar",
            chartUnitKind: "currency",
          },
        });

        navigate(expandBarChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue -> charts -> bar -> y-axis select input
  const [revenueBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        productDashboardDailyDispatch({
          type: productDashboardDailyAction.setRevenueBarChartYAxisVariable,
          payload: event.currentTarget.value as ProductMetricsChartKey,
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
      barChartData={dailyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> expand chart button
  const [expandRevenueLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueLineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable],
            chartTitle: revenueLineChartHeading,
            chartKind: "line",
            chartUnitKind: "currency",
          },
        });

        navigate(expandLineChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue -> charts -> line -> y-axis select input
  const [revenueLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]
  );

  // revenue -> charts -> line -> display
  const displayRevenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // revenue -> charts -> calendar

  // revenue -> charts -> calendar -> expand chart button
  const [expandRevenueCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueCalendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyCharts.revenue.calendarChartsObj[revenueCalendarChartYAxisVariable],
            chartTitle: revenueCalendarChartHeading,
            chartKind: "calendar",
            chartUnitKind: "currency",
          },
        });

        navigate(expandCalendarChartNavigateLinkRevenue);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // revenue -> charts -> calendar -> y-axis select input
  const [revenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
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
      barChartHeading={revenueBarChartHeading}
      barChartYAxisSelectInput={revenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandRevenueBarChartButton}
      expandLineChartButton={expandRevenueLineChartButton}
      expandCalendarChartButton={expandRevenueCalendarChartButton}
      expandPieChartButton={expandRevenuePieChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={revenueLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={dailyRevenueStatistics}
      width={width}
      calendarChart={displayRevenueCalendarChart}
      calendarChartHeading={revenueCalendarChartHeading}
      calendarChartYAxisSelectInput={revenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  // units sold

  // units sold -> statistics
  const dailyUnitsSoldStatistics = returnStatistics<ProductMetricsChartKey>(
    dailyCharts.unitsSold.barChartsObj
  );

  // units sold -> charts

  // units sold -> charts -> titles & navlinks
  const {
    barChartHeading: barChartUnitsSoldHeading,
    calendarChartHeading: calendarChartUnitsSoldHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkUnitsSold,
    expandCalendarChartNavigateLink: expandCalendarChartNavigateLinkUnitsSold,
    expandLineChartNavigateLink: expandLineChartNavigateLinkUnitsSold,
    lineChartHeading: lineChartUnitsSoldHeading,
    pieChartHeading: pieChartUnitsSoldHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkUnitsSold,
  } = returnChartTitleNavigateLinks({
    calendarView: "Daily",
    metricCategory: "Units Sold",
    metricsView: "Products",
    productMetric,
    storeLocation,
    yAxisBarChartVariable: unitsSoldBarChartYAxisVariable,
    yAxisCalendarChartVariable: unitsSoldCalendarChartYAxisVariable,
    yAxisLineChartVariable: unitsSoldLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // units sold -> charts -> pie

  // units sold -> charts -> pie -> expand chart button
  const [expandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.unitsSold.pieChartObj,
            chartTitle: pieChartUnitsSoldHeading,
            chartKind: "pie",
            chartUnitKind: "number",
          },
        });

        navigate(expandPieChartNavigateLinkUnitsSold);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // units sold -> charts -> pie -> display
  const displayUnitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={dailyCharts.unitsSold.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      unitKind="number"
    />
  );

  // units sold -> charts -> bar

  // units sold -> charts -> bar -> expand chart button
  const [expandUnitsSoldBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartUnitsSoldHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable],
            chartTitle: barChartUnitsSoldHeading,
            chartKind: "bar",
            chartUnitKind: "number",
          },
        });

        navigate(expandBarChartNavigateLinkUnitsSold);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // units sold -> charts -> bar -> y-axis select input
  const [unitsSoldBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
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
      barChartData={dailyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // units sold -> charts -> line

  // units sold -> charts -> line -> expand chart button
  const [expandUnitsSoldLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartUnitsSoldHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable],
            chartTitle: lineChartUnitsSoldHeading,
            chartKind: "line",
            chartUnitKind: "number",
          },
        });

        navigate(expandLineChartNavigateLinkUnitsSold);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // units sold -> charts -> line -> y-axis select input
  const [unitsSoldLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
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
      lineChartData={dailyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
      unitKind="number"
    />
  );

  // units sold -> charts -> calendar

  // units sold -> charts -> calendar -> expand chart button
  const [expandUnitsSoldCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartUnitsSoldHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyCharts.unitsSold.calendarChartsObj[
                unitsSoldCalendarChartYAxisVariable
              ],
            chartTitle: calendarChartUnitsSoldHeading,
            chartKind: "calendar",
            chartUnitKind: "number",
          },
        });

        navigate(expandCalendarChartNavigateLinkUnitsSold);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // units sold -> charts -> calendar -> y-axis select input
  const [unitsSoldCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
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
        dailyCharts.unitsSold.calendarChartsObj[unitsSoldCalendarChartYAxisVariable]
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
      barChartHeading={barChartUnitsSoldHeading}
      barChartYAxisSelectInput={unitsSoldBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandUnitsSoldBarChartButton}
      expandLineChartButton={expandUnitsSoldLineChartButton}
      expandCalendarChartButton={expandUnitsSoldCalendarChartButton}
      expandPieChartButton={expandUnitsSoldPieChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={unitsSoldLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Daily ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={dailyUnitsSoldStatistics}
      width={width}
      calendarChart={displayUnitsSoldCalendarChart}
      calendarChartHeading={calendarChartUnitsSoldHeading}
      calendarChartYAxisSelectInput={unitsSoldCalendarChartYAxisVariablesSelectInput}
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
