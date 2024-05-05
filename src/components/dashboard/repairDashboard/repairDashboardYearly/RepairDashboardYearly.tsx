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
import { ResponsiveBarChart, ResponsiveLineChart } from "../../../charts";
import DashboardMetricsLayout from "../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, DashboardRepairMetric, Year } from "../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../utils";
import { REPAIR_METRIC_Y_AXIS_DATA } from "../constants";
import { RepairMetricChartsKey, RepairMetricsCharts } from "../utils";
import { RepairMetricsCards } from "../utilsTSX";
import { initialRepairDashboardYearlyState, repairDashboardYearlyReducer } from "./state";

type RepairDashboardYearlyProps = {
  day: string;
  repairMetric: DashboardRepairMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  yearlyCharts: RepairMetricsCharts["yearlyCharts"];
  yearlyCards: RepairMetricsCards["yearlyCards"];
};

function RepairDashboardYearly({
  repairMetric,
  day,
  month,
  yearlyCards,
  yearlyCharts,
  storeLocation,
  year,
}: RepairDashboardYearlyProps) {
  const {
    globalState: { padding, width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const [repairDashboardYearlyState, dispatchRepairDashboardYearlyState] = useReducer(
    repairDashboardYearlyReducer,
    initialRepairDashboardYearlyState
  );

  const { barChartYAxisVariable, lineChartYAxisVariable } = repairDashboardYearlyState;

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

  const yearlyStatistics = returnStatistics<RepairMetricChartsKey>(yearlyCharts.bar);

  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: splitCamelCase(repairMetric),
    metricsView: "Repairs",
    storeLocation,
    yAxisBarChartVariable: barChartYAxisVariable,
    yAxisLineChartVariable: lineChartYAxisVariable,
    year,
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
            chartData: yearlyCharts.bar[barChartYAxisVariable],
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
        dispatchRepairDashboardYearlyState({
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
      barChartData={yearlyCharts.bar[barChartYAxisVariable]}
      hideControls
      indexBy="Years"
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
            chartData: yearlyCharts.line[lineChartYAxisVariable],
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
        dispatchRepairDashboardYearlyState({
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
      lineChartData={yearlyCharts.line[lineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) =>
        `${lineChartYAxisVariable === "revenue" ? "$" : ""}${addCommaSeparator(y)}`
      }
      unitKind={lineChartYAxisVariable === "revenue" ? "currency" : "number"}
    />
  );

  const repairDashboardYearly = (
    <DashboardMetricsLayout
      barChart={barChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={barChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandChartButton}
      expandLineChartButton={expandLineChartButton}
      lineChart={lineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={lineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCards}
      padding={padding}
      sectionHeading={`Yearly ${repairMetric} Metrics`}
      semanticLabel={repairMetric}
      statisticsMap={yearlyStatistics}
      width={width}
    />
  );

  return <Stack>{repairDashboardYearly}</Stack>;
}

export default RepairDashboardYearly;
