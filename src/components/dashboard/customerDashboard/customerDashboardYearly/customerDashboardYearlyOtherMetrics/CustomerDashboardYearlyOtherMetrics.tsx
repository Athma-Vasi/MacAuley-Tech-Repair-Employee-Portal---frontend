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
import { splitCamelCase } from "../../../../../utils";
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../../charts";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA } from "../../constants";
import {
  CustomerMetricsCharts,
  CustomerMetricsChurnRetentionChartsKey,
} from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import {
  customerDashboardYearlyOtherMetricsAction,
  customerDashboardYearlyOtherMetricsReducer,
  initialCustomerDashboardYearlyOtherMetricsState,
} from "./state";

function CustomerDashboardYearlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOtherMetrics,
  yearlyChartsOtherMetrics,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsOtherMetrics: CustomerMetricsCards["yearlyCards"][
    | "churnRate"
    | "retentionRate"];
  yearlyChartsOtherMetrics: CustomerMetricsCharts["yearlyCharts"]["churnRetention"];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardYearlyOtherMetricsState,
    customerDashboardYearlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardYearlyOtherMetricsReducer,
    initialCustomerDashboardYearlyOtherMetricsState
  );

  const { otherMetricsBarChartYAxisVariable, otherMetricsLineChartYAxisVariable } =
    customerDashboardYearlyOtherMetricsState;

  const statisticsYearlyChurnRetention =
    returnStatistics<CustomerMetricsChurnRetentionChartsKey>(
      yearlyChartsOtherMetrics.bar
    );

  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    yAxisPieChartVariable: "Churn and Retention Rates",
    year,
  });

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Churn And Retention Rate Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsOtherMetrics.pie,
            chartTitle: pieChartHeading,
            chartKind: "pie",
            chartUnitKind: "percent",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const churnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsOtherMetrics.pie}
      hideControls
      unitKind="percent"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Churn And Retention Rate Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
            chartUnitKind: "percent",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [churnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsChurnRetentionChartsKey,
          });
        },
        value: otherMetricsBarChartYAxisVariable,
      },
    ]);

  const churnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="percent"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Churn And Retention Rate Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
            chartUnitKind: "percent",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [churnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsChurnRetentionChartsKey,
          });
        },
        value: otherMetricsLineChartYAxisVariable,
      },
    ]);

  const churnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} %`}
      unitKind="percent"
    />
  );

  const customerDashboardYearlyOtherMetrics = (
    <DashboardMetricsLayout
      barChart={churnRetentionBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={churnRetentionBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={churnRetentionLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={churnRetentionLineChartYAxisVariablesSelectInput}
      overviewCards={[...yearlyCardsOtherMetrics]}
      padding={padding}
      pieChart={churnRetentionPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${splitCamelCase(storeLocation)} Churn and Retention Rates`}
      statisticsMap={statisticsYearlyChurnRetention}
      width={width}
    />
  );

  return customerDashboardYearlyOtherMetrics;
}

export default CustomerDashboardYearlyOtherMetrics;
