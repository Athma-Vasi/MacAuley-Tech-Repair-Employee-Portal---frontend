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
  ProductMetricBarLineChartObjKey,
  ProductMetricCalendarObjKey,
  returnProductMetricsCharts,
  returnSelectedDateProductMetrics,
} from "../utilsOld";
import {
  initialProductDashboardMonthlyState,
  productDashboardMonthlyAction,
  productDashboardMonthlyReducer,
} from "./state";

function ProductDashboardMonthly({
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

  const [productDashboardMonthlyState, productDashboardMonthlyDispatch] = useReducer(
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

  const { monthlyCharts } = returnProductMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateProductMetrics,
    storeLocation: storeLocationView,
    selectedProductCategory: productMetric,
  });

  const { monthlyCards } = returnProductMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateProductMetrics,
    width,
  });

  // revenue

  // revenue -> statistics
  const monthlyRevenueStatistics = returnStatistics<ProductMetricBarLineChartObjKey>(
    monthlyCharts.revenue.barChartsObj
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
    calendarView: "Monthly",
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
  const [createdExpandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.revenue.pieChartObj,
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
      pieChartData={monthlyCharts.revenue.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // revenue -> charts -> bar

  // revenue -> charts -> bar -> expand chart button
  const [createdExpandRevenueBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueBarChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable],
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
  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricBarLineChartObjKey,
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
      barChartData={monthlyCharts.revenue.barChartsObj[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // revenue -> charts -> line

  // revenue -> charts -> line -> expand chart button
  const [createdExpandRevenueLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueLineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable],
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
  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricBarLineChartObjKey,
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
      lineChartData={monthlyCharts.revenue.lineChartsObj[revenueLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // revenue -> charts -> calendar

  // revenue -> charts -> calendar -> expand chart button
  const [createdExpandRevenueCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueCalendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyCharts.revenue.calendarChartsObj[revenueCalendarChartYAxisVariable],
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
  const [createdRevenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
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
        monthlyCharts.revenue.calendarChartsObj[revenueCalendarChartYAxisVariable]
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
      barChartYAxisSelectInput={createdRevenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandRevenueBarChartButton}
      expandLineChartButton={createdExpandRevenueLineChartButton}
      expandCalendarChartButton={createdExpandRevenueCalendarChartButton}
      expandPieChartButton={createdExpandRevenuePieChartButton}
      isMoney
      lineChart={displayRevenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={createdRevenueLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={monthlyRevenueStatistics}
      width={width}
      calendarChart={displayRevenueCalendarChart}
      calendarChartHeading={revenueCalendarChartHeading}
      calendarChartYAxisSelectInput={createdRevenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  // units sold

  // units sold -> statistics
  const monthlyUnitsSoldStatistics = returnStatistics<ProductMetricBarLineChartObjKey>(
    monthlyCharts.unitsSold.barChartsObj
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
    calendarView: "Monthly",
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
  const [createdExpandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.unitsSold.pieChartObj,
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
      pieChartData={monthlyCharts.unitsSold.pieChartObj}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      unitKind="number"
    />
  );

  // units sold -> charts -> bar

  // units sold -> charts -> bar -> expand chart button
  const [createdExpandUnitsSoldBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartUnitsSoldHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable],
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
  const [createdUnitsSoldBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricBarLineChartObjKey,
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
      barChartData={monthlyCharts.unitsSold.barChartsObj[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // units sold -> charts -> line

  // units sold -> charts -> line -> expand chart button
  const [createdExpandUnitsSoldLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartUnitsSoldHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyCharts.unitsSold.lineChartsObj[unitsSoldLineChartYAxisVariable],
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
  const [createdUnitsSoldLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricBarLineChartObjKey,
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
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
      unitKind="number"
    />
  );

  // units sold -> charts -> calendar

  // units sold -> charts -> calendar -> expand chart button
  const [createdExpandUnitsSoldCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartUnitsSoldHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyCharts.unitsSold.calendarChartsObj[
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
  const [createdUnitsSoldCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
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
        monthlyCharts.unitsSold.calendarChartsObj[unitsSoldCalendarChartYAxisVariable]
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
      barChartYAxisSelectInput={createdUnitsSoldBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandUnitsSoldBarChartButton}
      expandLineChartButton={createdExpandUnitsSoldLineChartButton}
      expandCalendarChartButton={createdExpandUnitsSoldCalendarChartButton}
      expandPieChartButton={createdExpandUnitsSoldPieChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={createdUnitsSoldLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCards.unitsSold}
      padding={padding}
      pieChart={displayUnitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Monthly ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={monthlyUnitsSoldStatistics}
      width={width}
      calendarChart={displayUnitsSoldCalendarChart}
      calendarChartHeading={calendarChartUnitsSoldHeading}
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
