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
} from "../../../charts";
import { MONTHS } from "../../constants";
import DashboardMetricsLayout from "../../DashboardMetricsLayout";
import { returnRepairMetricsCards } from "../../jsxHelpers";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import { REPAIR_METRIC_Y_AXIS_DATA } from "../constants";
import { RepairDashboardChildrenProps } from "../types";
import {
  RepairMetricChartsObjKey,
  returnRepairMetricsCharts,
  returnSelectedDateRepairMetrics,
} from "../utils";
import { initialRepairDashboardDailyState, repairDashboardDailyReducer } from "./state";

function RepairDashboardDaily({
  businessMetrics,
  day,
  month,
  repairMetric,
  storeLocation,
  year,
  selectedDate,
  selectedMonth,
  selectedYear,
  storeLocationView,
}: RepairDashboardChildrenProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const [repairDashboardDailyState, dispatchRepairDashboardDailyState] = useReducer(
    repairDashboardDailyReducer,
    initialRepairDashboardDailyState
  );

  const { barChartYAxisVariable, calendarChartYAxisVariable, lineChartYAxisVariable } =
    repairDashboardDailyState;

  const {
    appThemeColors: { borderColor },
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

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

  const selectedDateRepairMetrics = returnSelectedDateRepairMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    selectedRepairCategory: repairMetric,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  const { dailyCharts } = returnRepairMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateRepairMetrics,
    storeLocation: storeLocationView,
    selectedRepairCategory: repairMetric,
  });

  const { dailyCards } = returnRepairMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateRepairMetrics,
    width,
  });

  // statistics
  const dailyStatistics = returnStatistics<RepairMetricChartsObjKey>(
    dailyCharts.barChartsObj
  );

  // charts

  // charts -> titles & navlinks
  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Daily",
    metricCategory: splitCamelCase(repairMetric),
    metricsView: "Repairs",
    // repairMetric,
    storeLocation,
    yAxisBarChartVariable: barChartYAxisVariable,
    yAxisCalendarChartVariable: calendarChartYAxisVariable,
    yAxisLineChartVariable: lineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // charts -> bar

  // charts -> bar -> expand chart button
  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.barChartsObj[barChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
            chartUnitKind: barChartYAxisVariable === "revenue" ? "currency" : "number",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // charts -> bar -> y-axis select input
  const [createdBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: REPAIR_METRIC_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dispatchRepairDashboardDailyState({
          type: "setBarChartYAxisVariable",
          payload: event.currentTarget.value as RepairMetricChartsObjKey,
        });
      },
      value: barChartYAxisVariable,
    },
  ]);

  // charts -> bar -> display
  const displayBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.barChartsObj[barChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={REPAIR_METRIC_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind={barChartYAxisVariable === "revenue" ? "currency" : "number"}
    />
  );

  // charts -> line

  // charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.lineChartsObj[lineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
            chartUnitKind: lineChartYAxisVariable === "revenue" ? "currency" : "number",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // charts -> line -> y-axis select input
  const [createdLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardDailyState({
            type: "setLineChartYAxisVariable",
            payload: event.currentTarget.value as RepairMetricChartsObjKey,
          });
        },
        value: lineChartYAxisVariable,
      },
    ]
  );

  // charts -> line -> display
  const displayLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.lineChartsObj[lineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) =>
        `${lineChartYAxisVariable === "revenue" ? "$" : ""}${addCommaSeparator(y)}`
      }
      unitKind={lineChartYAxisVariable === "revenue" ? "currency" : "number"}
    />
  );

  // charts -> calendar

  // charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyCharts.calendarChartsObj[calendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartKind: "calendar",
            chartUnitKind:
              calendarChartYAxisVariable === "revenue" ? "currency" : "number",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // charts -> calendar -> y-axis select input
  const [createdCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: REPAIR_METRIC_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          dispatchRepairDashboardDailyState({
            type: "setCalendarChartYAxisVariable",
            payload: event.currentTarget.value as RepairMetricChartsObjKey,
          });
        },
        value: calendarChartYAxisVariable,
      },
    ]);

  // charts -> calendar -> display
  const displayCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyCharts.calendarChartsObj[calendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  // charts -> display
  const displayRepairMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      lineChart={displayLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards}
      padding={padding}
      sectionHeading={`Daily ${repairMetric} Metrics`}
      semanticLabel={repairMetric}
      statisticsMap={dailyStatistics}
      width={width}
      calendarChart={displayCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={createdCalendarChartYAxisVariablesSelectInput}
    />
  );

  const displayRepairDashboardDaily = <Stack>{displayRepairMetricsSection}</Stack>;

  return displayRepairDashboardDaily;
}

export default RepairDashboardDaily;
