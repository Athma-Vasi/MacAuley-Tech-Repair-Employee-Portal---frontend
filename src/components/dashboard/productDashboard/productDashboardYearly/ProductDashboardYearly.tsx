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
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../charts";
import { MONTHS } from "../../constants";
import DashboardMetricsLayout from "../../DashboardMetricsLayout";
import { ProductMetricsCards } from "../../jsxHelpers";
import { BusinessMetricStoreLocation, DashboardProductMetric, Year } from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import { PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA } from "../constants";
import { ProductMetricChartKey, ProductMetricsCharts } from "../utils";
import {
  initialProductDashboardYearlyState,
  productDashboardYearlyAction,
  productDashboardYearlyReducer,
} from "./state";

type ProductDashboardYearlyProps = {
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  yearlyCharts: ProductMetricsCharts["yearlyCharts"];
  yearlyCards: ProductMetricsCards["yearlyCards"];
};

function ProductDashboardYearly({
  day,
  month,
  productMetric,
  storeLocation,
  year,
  yearlyCards,
  yearlyCharts,
}: ProductDashboardYearlyProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const [productDashboardYearlyState, productDashboardYearlyDispatch] = useReducer(
    productDashboardYearlyReducer,
    initialProductDashboardYearlyState
  );

  const {
    revenueBarChartYAxisVariable,
    revenueLineChartYAxisVariable,
    unitsSoldBarChartYAxisVariable,
    unitsSoldLineChartYAxisVariable,
  } = productDashboardYearlyState;

  const navigate = useNavigate();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

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

  const yearlyRevenueStatistics = returnStatistics<ProductMetricChartKey>(
    yearlyCharts.revenue.bar
  );

  const {
    barChartHeading: revenueBarChartHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkRevenue,
    expandLineChartNavigateLink: expandLineChartNavigateLinkRevenue,
    lineChartHeading: revenueLineChartHeading,
    pieChartHeading: pieChartRevenueHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkRevenue,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "Revenue",
    metricsView: "Products",
    productMetric,
    storeLocation,
    yAxisBarChartVariable: revenueBarChartYAxisVariable,
    yAxisLineChartVariable: revenueLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [createdExpandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.revenue.pie,
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

  const displayPieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.revenue.pie}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  const [createdExpandRevenueBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueBarChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.revenue.bar[revenueBarChartYAxisVariable],
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

  const [createdRevenueBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setRevenueBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricChartKey,
          });
        },
        value: revenueBarChartYAxisVariable,
      },
    ]);

  const displayRevenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyCharts.revenue.bar[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  const [createdExpandRevenueLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${revenueLineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.revenue.line[revenueLineChartYAxisVariable],
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

  const [createdRevenueLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricChartKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]);

  const displayRevenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.revenue.line[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

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
      lineChartYAxisSelectInput={createdRevenueLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCards.revenue}
      padding={padding}
      pieChart={displayPieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={yearlyRevenueStatistics}
      width={width}
    />
  );

  const yearlyUnitsSoldStatistics = returnStatistics<ProductMetricChartKey>(
    yearlyCharts.unitsSold.bar
  );

  const {
    barChartHeading: barChartUnitsSoldHeading,
    expandBarChartNavigateLink: expandBarChartNavigateLinkUnitsSold,
    expandLineChartNavigateLink: expandLineChartNavigateLinkUnitsSold,
    lineChartHeading: lineChartUnitsSoldHeading,
    pieChartHeading: pieChartUnitsSoldHeading,
    expandPieChartNavigateLink: expandPieChartNavigateLinkUnitsSold,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "Units Sold",
    metricsView: "Products",
    productMetric,
    storeLocation,
    yAxisBarChartVariable: unitsSoldBarChartYAxisVariable,
    yAxisLineChartVariable: unitsSoldLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [createdExpandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.unitsSold.pie,
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

  const displayUnitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.unitsSold.pie}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      unitKind="number"
    />
  );

  const [createdExpandUnitsSoldBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartUnitsSoldHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable],
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

  const [createdUnitsSoldBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricChartKey,
          });
        },
        value: unitsSoldBarChartYAxisVariable,
      },
    ]);

  const displayUnitsSoldBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [createdExpandUnitsSoldLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartUnitsSoldHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable],
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

  const [createdUnitsSoldLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricChartKey,
          });
        },
        value: unitsSoldLineChartYAxisVariable,
      },
    ]);

  const displayUnitsSoldLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
      unitKind="number"
    />
  );

  const displayUnitsSoldSection = (
    <DashboardMetricsLayout
      barChart={displayUnitsSoldBarChart}
      barChartHeading={barChartUnitsSoldHeading}
      barChartYAxisSelectInput={createdUnitsSoldBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandUnitsSoldBarChartButton}
      expandLineChartButton={createdExpandUnitsSoldLineChartButton}
      expandPieChartButton={createdExpandUnitsSoldPieChartButton}
      lineChart={displayUnitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={createdUnitsSoldLineChartYAxisVariablesSelectInput}
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

  const productDashboardYearly = (
    <Stack>
      {displayRevenueSection}
      {displayUnitsSoldSection}
    </Stack>
  );

  return productDashboardYearly;
}

export default ProductDashboardYearly;
