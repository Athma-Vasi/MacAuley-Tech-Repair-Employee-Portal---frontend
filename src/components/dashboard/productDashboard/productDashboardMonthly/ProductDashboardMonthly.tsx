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
import { ProductMetricsCards } from "../../utilsTSX";
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
import {
  initialProductDashboardMonthlyState,
  productDashboardMonthlyAction,
  productDashboardMonthlyReducer,
} from "./state";

type ProductDashboardMonthlyProps = {
  day: string;
  productMetric: DashboardProductMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  monthlyCharts: ProductMetricsCharts["monthlyCharts"];
  monthlyCards: ProductMetricsCards["monthlyCards"];
};

function ProductDashboardMonthly({
  day,
  month,
  productMetric,
  storeLocation,
  year,
  monthlyCards,
  monthlyCharts,
}: ProductDashboardMonthlyProps) {
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

  const monthlyRevenueStatistics = returnStatistics<ProductMetricsChartKey>(
    monthlyCharts.revenue.bar
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

  const [expandRevenuePieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartRevenueHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.revenue.pie,
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
      pieChartData={monthlyCharts.revenue.pie}
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
            chartData: monthlyCharts.revenue.bar[revenueBarChartYAxisVariable],
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
        productDashboardMonthlyDispatch({
          type: productDashboardMonthlyAction.setRevenueBarChartYAxisVariable,
          payload: event.currentTarget.value as ProductMetricsChartKey,
        });
      },
      value: revenueBarChartYAxisVariable,
    },
  ]);

  const displayRevenueBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyCharts.revenue.bar[revenueBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
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
            chartData: monthlyCharts.revenue.line[revenueLineChartYAxisVariable],
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
          });
        },
        value: revenueLineChartYAxisVariable,
      },
    ]
  );

  const displayRevenueLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.revenue.line[revenueLineChartYAxisVariable]}
      hideControls
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
            chartData: monthlyCharts.revenue.calendar[revenueCalendarChartYAxisVariable],
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setRevenueCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsCalendarKey,
          });
        },
        value: revenueCalendarChartYAxisVariable,
      },
    ]);

  const displayRevenueCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.revenue.calendar[revenueCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

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
      calendarChartYAxisSelectInput={revenueCalendarChartYAxisVariablesSelectInput}
    />
  );

  const monthlyUnitsSoldStatistics = returnStatistics<ProductMetricsChartKey>(
    monthlyCharts.unitsSold.bar
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

  const [expandUnitsSoldPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartUnitsSoldHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.unitsSold.pie,
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
      pieChartData={monthlyCharts.unitsSold.pie}
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
            chartData: monthlyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable],
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldBarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
          });
        },
        value: unitsSoldBarChartYAxisVariable,
      },
    ]);

  const displayUnitsSoldBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyCharts.unitsSold.bar[unitsSoldBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
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
            chartData: monthlyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable],
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldLineChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsChartKey,
          });
        },
        value: unitsSoldLineChartYAxisVariable,
      },
    ]);

  const displayUnitsSoldLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.unitsSold.line[unitsSoldLineChartYAxisVariable]}
      hideControls
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
              monthlyCharts.unitsSold.calendar[unitsSoldCalendarChartYAxisVariable],
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
          productDashboardMonthlyDispatch({
            type: productDashboardMonthlyAction.setUnitsSoldCalendarChartYAxisVariable,
            payload: event.currentTarget.value as ProductMetricsCalendarKey,
          });
        },
        value: unitsSoldCalendarChartYAxisVariable,
      },
    ]);

  const displayUnitsSoldCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.unitsSold.calendar[unitsSoldCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

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
      calendarChartYAxisSelectInput={unitsSoldCalendarChartYAxisVariablesSelectInput}
    />
  );

  const productDashboardMonthly = (
    <Stack>
      {displayRevenueSection}
      {displayUnitsSoldSection}
    </Stack>
  );

  return productDashboardMonthly;
}

export default ProductDashboardMonthly;
