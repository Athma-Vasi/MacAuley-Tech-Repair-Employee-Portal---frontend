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
import { BusinessMetricStoreLocation, DashboardRepairMetric, Year } from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import { REPAIR_METRIC_Y_AXIS_DATA } from "../constants";
import { RepairMetricChartsKey, RepairMetricsCharts } from "../utils";
import { RepairMetricsCards } from "../utilsTSX";
import {
  initialRepairDashboardMonthlyState,
  repairDashboardMonthlyReducer,
} from "./state";

type RepairDashboardMonthlyProps = {
  day: string;
  repairMetric: DashboardRepairMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  monthlyCharts: RepairMetricsCharts["monthlyCharts"];
  monthlyCards: RepairMetricsCards["monthlyCards"];
};

function RepairDashboardMonthly({
  day,
  month,
  monthlyCards,
  monthlyCharts,
  repairMetric,
  storeLocation,
  year,
}: RepairDashboardMonthlyProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const [repairDashboardMonthlyState, dispatchRepairDashboardMonthlyState] = useReducer(
    repairDashboardMonthlyReducer,
    initialRepairDashboardMonthlyState
  );

  const { barChartYAxisVariable, calendarChartYAxisVariable, lineChartYAxisVariable } =
    repairDashboardMonthlyState;

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

  const monthlyStatistics = returnStatistics<RepairMetricChartsKey>(monthlyCharts.bar);

  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Monthly",
    metricCategory: splitCamelCase(repairMetric),
    metricsView: "Repairs",
    storeLocation,
    yAxisBarChartVariable: barChartYAxisVariable,
    yAxisCalendarChartVariable: calendarChartYAxisVariable,
    yAxisLineChartVariable: lineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.bar[barChartYAxisVariable],
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

  const [barChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: REPAIR_METRIC_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dispatchRepairDashboardMonthlyState({
          type: "setBarChartYAxisVariable",
          payload: event.currentTarget.value as RepairMetricChartsKey,
        });
      },
      value: barChartYAxisVariable,
    },
  ]);

  const barChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyCharts.bar[barChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={REPAIR_METRIC_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind={barChartYAxisVariable === "revenue" ? "currency" : "number"}
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.line[lineChartYAxisVariable],
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

  const [lineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: REPAIR_METRIC_Y_AXIS_DATA,
      label: "Y-Axis Line",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dispatchRepairDashboardMonthlyState({
          type: "setLineChartYAxisVariable",
          payload: event.currentTarget.value as RepairMetricChartsKey,
        });
      },
      value: lineChartYAxisVariable,
    },
  ]);

  const lineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.line[lineChartYAxisVariable]}
      hideControls
      yFormat={(y) =>
        `${lineChartYAxisVariable === "revenue" ? "$" : ""}${addCommaSeparator(y)}`
      }
      unitKind={lineChartYAxisVariable === "revenue" ? "currency" : "number"}
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyCharts.calendar[calendarChartYAxisVariable],
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

  const [calendarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: REPAIR_METRIC_Y_AXIS_DATA,
      label: "Y-Axis Calendar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dispatchRepairDashboardMonthlyState({
          type: "setCalendarChartYAxisVariable",
          payload: event.currentTarget.value as RepairMetricChartsKey,
        });
      },
      value: calendarChartYAxisVariable,
    },
  ]);

  const calendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={monthlyCharts.calendar[calendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const repairDashboardMonthly = (
    <DashboardMetricsLayout
      barChart={barChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={barChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      lineChart={lineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={lineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCards}
      padding={padding}
      sectionHeading={`Monthly ${repairMetric} Metrics`}
      semanticLabel={repairMetric}
      statisticsMap={monthlyStatistics}
      width={width}
      calendarChart={calendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={calendarChartYAxisVariablesSelectInput}
    />
  );

  return <Stack>{repairDashboardMonthly}</Stack>;
}

export default RepairDashboardMonthly;
