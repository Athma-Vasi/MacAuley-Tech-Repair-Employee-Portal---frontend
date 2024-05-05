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
import { BusinessMetricStoreLocation, DashboardProductMetric, Year } from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import { PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA } from "../constants";
import { ProductMetricsChartKey, ProductMetricsCharts } from "../utils";
import { ProductMetricsCards } from "../utilsTSX";
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

  const yearlyRevenueStatistics = returnStatistics<ProductMetricsChartKey>(
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

  const [expandRevenuePieChartButton] = returnAccessibleButtonElements([
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

  const pieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.revenue.pie}
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

  const [revenueBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        productDashboardYearlyDispatch({
          type: productDashboardYearlyAction.setRevenueBarChartYAxisVariable,
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
      barChartData={yearlyCharts.revenue.bar[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
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

  const [revenueLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setRevenueLineChartYAxisVariable,
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
      lineChartData={yearlyCharts.revenue.line[revenueLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  const productDashboardYearlyRevenue = (
    <DashboardMetricsLayout
      barChart={revenueBarChart}
      barChartHeading={revenueBarChartHeading}
      barChartYAxisSelectInput={revenueBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandRevenueBarChartButton}
      expandLineChartButton={expandRevenueLineChartButton}
      expandPieChartButton={expandRevenuePieChartButton}
      isMoney
      lineChart={revenueLineChart}
      lineChartHeading={revenueLineChartHeading}
      lineChartYAxisSelectInput={revenueLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCards.revenue}
      padding={padding}
      pieChart={pieChart}
      pieChartHeading={pieChartRevenueHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly ${productMetric} Revenue`}
      semanticLabel={`${productMetric} Revenue`}
      statisticsMap={yearlyRevenueStatistics}
      width={width}
    />
  );

  const yearlyUnitsSoldStatistics = returnStatistics<ProductMetricsChartKey>(
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

  const [expandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
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

  const unitsSoldPieChart = (
    <ResponsivePieChart
      pieChartData={yearlyCharts.unitsSold.pie}
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

  const [unitsSoldBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldBarChartYAxisVariable,
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
      barChartData={yearlyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
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

  const [unitsSoldLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_METRIC_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          productDashboardYearlyDispatch({
            type: productDashboardYearlyAction.setUnitsSoldLineChartYAxisVariable,
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
      lineChartData={yearlyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Units Sold`}
      unitKind="number"
    />
  );

  const productDashboardYearlyUnitsSold = (
    <DashboardMetricsLayout
      barChart={unitsSoldBarChart}
      barChartHeading={barChartUnitsSoldHeading}
      barChartYAxisSelectInput={unitsSoldBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandUnitsSoldBarChartButton}
      expandLineChartButton={expandUnitsSoldLineChartButton}
      expandPieChartButton={expandUnitsSoldPieChartButton}
      lineChart={unitsSoldLineChart}
      lineChartHeading={lineChartUnitsSoldHeading}
      lineChartYAxisSelectInput={unitsSoldLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCards.unitsSold}
      padding={padding}
      pieChart={unitsSoldPieChart}
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
      {productDashboardYearlyRevenue}
      {productDashboardYearlyUnitsSold}
    </Stack>
  );

  return productDashboardYearly;
}

export default ProductDashboardYearly;
