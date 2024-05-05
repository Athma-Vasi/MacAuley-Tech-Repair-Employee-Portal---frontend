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
import { ResponsiveBarChart, ResponsiveLineChart } from "../../../../charts";
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { FinancialMetricsCards } from "../../../utilsTSX";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { FINANCIAL_OTHER_METRICS_Y_AXIS_DATA } from "../../constants";
import { FinancialMetricsCharts, FinancialOtherMetricsObjKey } from "../../utils";
import {
  financialDashboardYearlyOtherMetricsAction,
  financialDashboardYearlyOtherMetricsReducer,
  initialFinancialDashboardYearlyOtherMetricsState,
} from "./state";

function FinancialDashboardYearlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOtherMetrics,
  yearlyChartsOtherMetrics,
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
  yearlyCardsOtherMetrics: FinancialMetricsCards["yearlyCards"]["otherMetrics"];
  yearlyChartsOtherMetrics: FinancialMetricsCharts["yearlyCharts"]["otherMetrics"];
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
    financialDashboardYearlyOtherMetricsState,
    financialDashboardYearlyOtherMetricsDispatch,
  ] = useReducer(
    financialDashboardYearlyOtherMetricsReducer,
    initialFinancialDashboardYearlyOtherMetricsState
  );

  const { otherMetricsBarChartYAxisVariable, otherMetricsLineChartYAxisVariable } =
    financialDashboardYearlyOtherMetricsState;

  // otherMetrics

  // otherMetrics -> statistics
  const statisticsOtherMetrics = returnStatistics<FinancialOtherMetricsObjKey>(
    yearlyChartsOtherMetrics.barChartsObj
  );

  // otherMetrics -> charts

  // otherMetrics  -> charts -> titles & navlinks
  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    lineChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
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
              yearlyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable],
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
          financialDashboardYearlyOtherMetricsDispatch({
            type: financialDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
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
        yearlyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable]
      }
      indexBy="Years"
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
              yearlyChartsOtherMetrics.lineChartsObj[otherMetricsLineChartYAxisVariable],
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
          financialDashboardYearlyOtherMetricsDispatch({
            type: financialDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
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
        yearlyChartsOtherMetrics.lineChartsObj[otherMetricsLineChartYAxisVariable]
      }
      hideControls
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

  const displayOtherMetricsSection = (
    <DashboardMetricsLayout
      barChart={displayOtherMetricsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdOtherMetricsBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      lineChart={displayOtherMetricsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdOtherMetricsLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsOtherMetrics}
      padding={padding}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Other Metrics`}
      semanticLabel=""
      statisticsMap={statisticsOtherMetrics}
      width={width}
    />
  );

  return displayOtherMetricsSection;
}

export default FinancialDashboardYearlyOtherMetrics;
