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
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { FINANCIAL_OTHER_METRICS_Y_AXIS_DATA } from "../../constants";
import {
  FinancialMetricsCharts,
  FinancialMetricsOtherMetricsChartsKey,
} from "../../utils";
import { FinancialMetricsCards } from "../../utilsTSX";
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

  const statisticsOtherMetrics = returnStatistics<FinancialMetricsOtherMetricsChartsKey>(
    dailyChartsOtherMetrics.bar
  );

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

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Other Metrics Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable],
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

  const [otherMetricsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsOtherMetricsChartsKey,
          });
        },
        value: otherMetricsBarChartYAxisVariable,
      },
    ]);

  const otherMetricsBarChart = (
    <ResponsiveBarChart
      barChartData={dailyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable]}
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

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Other Metrics Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: dailyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable],
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

  const [otherMetricsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsOtherMetricsChartsKey,
          });
        },
        value: otherMetricsLineChartYAxisVariable,
      },
    ]);

  const otherMetricsLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable]}
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
              dailyChartsOtherMetrics.calendar[otherMetricsCalendarChartYAxisVariable],
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

  const [otherMetricsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardDailyOtherMetricsDispatch({
            type: financialDashboardDailyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsOtherMetricsChartsKey,
          });
        },
        value: otherMetricsCalendarChartYAxisVariable,
      },
    ]);

  const otherMetricsCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsOtherMetrics.calendar[otherMetricsCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const financialDashboardDailyOtherMetrics = (
    <DashboardMetricsLayout
      barChart={otherMetricsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={otherMetricsBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      lineChart={otherMetricsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={otherMetricsLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsOtherMetrics}
      padding={padding}
      sectionHeading={`${splitCamelCase(storeLocation)} Daily Other Metrics`}
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
      calendarChart={otherMetricsCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={otherMetricsCalendarChartYAxisVariablesSelectInput}
    />
  );

  return financialDashboardDailyOtherMetrics;
}

export default FinancialDashboardDailyOtherMetrics;
