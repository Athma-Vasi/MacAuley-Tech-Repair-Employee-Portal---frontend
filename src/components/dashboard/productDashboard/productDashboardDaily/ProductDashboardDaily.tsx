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
import { BusinessMetricStoreLocation, DashboardProductMetric, Year } from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import {
  PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
  PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
} from "../constants";
import {
  ProductMetricsCalendarKey,
  ProductMetricsChartKey,
  ProductMetricsCharts,
} from "../utils";
import { ProductMetricsCards } from "../utilsTSX";
import {
  initialProductDashboardDailyState,
  productDashboardDailyAction,
  productDashboardDailyReducer,
} from "./state";

type ProductDashboardDailyProps = {
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  dailyCharts: ProductMetricsCharts["dailyCharts"];
  dailyCards: ProductMetricsCards["dailyCards"];
};

function ProductDashboardDaily({
  day,
  dailyCards,
  dailyCharts,
  month,
  productMetric,
  storeLocation,
  year,
}: ProductDashboardDailyProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

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

  const navigate = useNavigate();

  const componentWidth =
    width < 480
      ? width * 0.93
      : width < 768
      ? width - 40
      : width < 1024
      ? (width - 225) * 0.8
      : width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight = width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const dailyRevenueStatistics = returnStatistics<ProductMetricsChartKey>(
    dailyCharts.revenue.bar
  );

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

  const [expandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.pie,
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

  const pieChart = (
    <ResponsivePieChart
      pieChartData={dailyCharts.revenue.pie}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  const [expandRevenueBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueBarChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.bar[revenueBarChartYAxisVariable],
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

  const revenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.revenue.bar[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  const [expandRevenueLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueLineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.line[revenueLineChartYAxisVariable],
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

  const revenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.revenue.line[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const [expandRevenueCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueCalendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.revenue.calendar[revenueCalendarChartYAxisVariable],
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

  const [revenueCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsCalendarKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  const revenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyCharts.revenue.calendar[revenueCalendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const productDashboardDailyRevenue = (
    <DashboardMetricsLayout
      barChart={revenueBarChart}
      barChartHeading={revenueBarChartHeading}
      barChartYAxisSelectInput={revenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandRevenueBarChartButton}
      expandLineChartButton={expandRevenueLineChartButton}
      expandCalendarChartButton={expandRevenueCalendarChartButton}
      expandPieChartButton={expandRevenuePieChartButton}
      isMoney
      lineChart={revenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={revenueLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards.revenue}
      padding={padding}
      pieChart={pieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={dailyRevenueStatistics}
      width={width}
      calendarChart={revenueCalendarChart}
      calendarChartHeading={revenueCalendarChartHeading}
      calendarChartYAxisSelectInput={revenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  const dailyUnitsSoldStatistics = returnStatistics<ProductMetricsChartKey>(
    dailyCharts.unitsSold.bar
  );

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

  const [expandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.unitsSold.pie,
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

  const unitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={dailyCharts.unitsSold.pie}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      unitKind="number"
    />
  );

  const [expandUnitsSoldBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartUnitsSoldHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable],
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

  const unitsSoldBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandUnitsSoldLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartUnitsSoldHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable],
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

  const unitsSoldLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
      unitKind="number"
    />
  );

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
              dailyCharts.unitsSold.calendar[unitsSoldCalendarChartYAxisVariable],
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

  const [unitsSoldCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardDailyDispatch({
            type: productDashboardDailyAction.setUnitsSoldCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsCalendarKey,
          });
        },
        value: unitsSoldCalendarChartYAxisVariable,
      },
    ]);

  const unitsSoldCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.unitsSold.calendar[unitsSoldCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const productDashboardDailyUnitsSold = (
    <DashboardMetricsLayout
      barChart={unitsSoldBarChart}
      barChartHeading={barChartUnitsSoldHeading}
      barChartYAxisSelectInput={unitsSoldBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandUnitsSoldBarChartButton}
      expandLineChartButton={expandUnitsSoldLineChartButton}
      expandCalendarChartButton={expandUnitsSoldCalendarChartButton}
      expandPieChartButton={expandUnitsSoldPieChartButton}
      lineChart={unitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={unitsSoldLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards.unitsSold}
      padding={padding}
      pieChart={unitsSoldPieChart}
      pieChartHeading={pieChartUnitsSoldHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Daily ${productMetric} Units Sold`}
      semanticLabel={`${productMetric} Units Sold`}
      statisticsMap={dailyUnitsSoldStatistics}
      width={width}
      calendarChart={unitsSoldCalendarChart}
      calendarChartHeading={calendarChartUnitsSoldHeading}
      calendarChartYAxisSelectInput={unitsSoldCalendarChartYAxisVariablesSelectInput}
    />
  );

  const productDashboardDaily = (
    <Stack>
      {productDashboardDailyRevenue}
      {productDashboardDailyUnitsSold}
    </Stack>
  );

  return productDashboardDaily;
}

export default ProductDashboardDaily;
