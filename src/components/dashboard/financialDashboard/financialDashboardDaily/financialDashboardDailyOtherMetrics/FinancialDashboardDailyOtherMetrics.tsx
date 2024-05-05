import { MantineNumberSize } from "@mantine/core";
import { ChangeEvent, useReducer } from "react";
import { LuExpand } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { globalAction } from "../../../../../context/globalProvider/state";
import { useGlobalState } from "../../../../../hooks";
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from "../../../../../jsxCreators";
import { addCommaSeparator, splitCamelCase } from "../../../../../utils";
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
} from "../../../../charts";
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { FinancialMetricsCards } from "../../../utilsTSX";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { FINANCIAL_OTHER_METRICS_Y_AXIS_DATA } from "../../constants";
import { FinancialMetricsCharts, FinancialOtherMetricsObjKey } from "../../utils";
import {
  financialDashboardDailyOtherMetricsAction,
  financialDashboardDailyOtherMetricsReducer,
  initialFinancialDashboardDailyOtherMetricsState,
} from "./state";

function FinancialDashboardDailyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsOtherMetrics,
  dailyChartsOtherMetrics,
  day,
  month,
  padding,
  storeLocation,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  dailyCardsOtherMetrics: FinancialMetricsCards["dailyCards"]["otherMetrics"];
  dailyChartsOtherMetrics: FinancialMetricsCharts["dailyCharts"]["otherMetrics"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    financialDashboardDailyOtherMetricsState,
    financialDashboardDailyOtherMetricsDispatch,
  ] = useReducer(
    financialDashboardDailyOtherMetricsReducer,
    initialFinancialDashboardDailyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsCalendarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = financialDashboardDailyOtherMetricsState;

  // otherMetrics

  // otherMetrics -> statistics
  const statisticsOtherMetrics = returnStatistics<FinancialOtherMetricsObjKey>(
    dailyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics  -> charts -> titles & navlinks
  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Daily",
    metricCategory: "",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisCalendarChartVariable: otherMetricsCalendarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // otherMetrics -> charts -> bar

  // otherMetrics -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Other Metrics Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
            chartUnitKind:
              otherMetricsBarChartYAxisVariable === "averageOrderValue"
                ? "currency"
                : "percent",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // otherMetrics -> charts -> bar -> y-axis select input
  const [createdOtherMetricsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsBarChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> bar -> display
  const displayOtherMetricsBarChart = (
    <ResponsiveBarChart
      barChartData={
        dailyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable]
      }
      indexBy="Days"
      keys={FINANCIAL_OTHER_METRICS_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      unitKind={
        otherMetricsBarChartYAxisVariable === "averageOrderValue" ? "currency" : "percent"
      }
    />
  );

  // otherMetrics -> charts -> line

  // otherMetrics -> charts -> line -> expand chart button
  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Other Metrics Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsOtherMetrics.lineChartsObj[otherMetricsLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
            chartUnitKind:
              otherMetricsLineChartYAxisVariable === "averageOrderValue"
                ? "currency"
                : "percent",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // otherMetrics -> charts -> line -> y-axis select input
  const [createdOtherMetricsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsLineChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> line -> display
  const displayOtherMetricsLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyChartsOtherMetrics.lineChartsObj[otherMetricsLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) =>
        otherMetricsLineChartYAxisVariable === "averageOrderValue"
          ? `$${addCommaSeparator(y)}`
          : `${addCommaSeparator(y)} %`
      }
      unitKind={
        otherMetricsLineChartYAxisVariable === "averageOrderValue"
          ? "currency"
          : "percent"
      }
    />
  );

  // otherMetrics -> charts -> calendar

  // otherMetrics -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Other Metrics Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              dailyChartsOtherMetrics.calendarChartsObj[
                otherMetricsCalendarChartYAxisVariable
              ],
            chartTitle: calendarChartHeading,
            chartKind: "calendar",
            chartUnitKind:
              otherMetricsCalendarChartYAxisVariable === "averageOrderValue"
                ? "currency"
                : "percent",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // otherMetrics -> charts -> calendar -> y-axis select input
  const [createdOtherMetricsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialOtherMetricsObjKey,
          });
        },
        value: otherMetricsCalendarChartYAxisVariable,
      },
    ]);

  // otherMetrics -> charts -> calendar -> display
  const displayOtherMetricsCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsOtherMetrics.calendarChartsObj[otherMetricsCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayOtherMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayOtherMetricsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdOtherMetricsBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      lineChart={displayOtherMetricsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdOtherMetricsLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsOtherMetrics}
      padding={padding}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Other Metrics`}
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
      calendarChart={displayOtherMetricsCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOtherMetricsCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayOtherMetricsSection;
}

export default FinancialDashboardDailyOtherMetrics;
