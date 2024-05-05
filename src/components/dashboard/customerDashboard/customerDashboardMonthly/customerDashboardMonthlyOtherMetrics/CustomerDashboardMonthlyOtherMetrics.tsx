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
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../../charts";
import { MONTHS } from "../../../constants";
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
  customerDashboardMonthlyOtherMetricsAction,
  customerDashboardMonthlyOtherMetricsReducer,
  initialCustomerDashboardMonthlyOtherMetricsState,
} from "./state";

function CustomerDashboardMonthlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsOtherMetrics,
  monthlyChartsOtherMetrics,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsOtherMetrics: CustomerMetricsCards["monthlyCards"][
    | "churnRate"
    | "retentionRate"];
  monthlyChartsOtherMetrics: CustomerMetricsCharts["monthlyCharts"]["churnRetention"];
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardMonthlyOtherMetricsState,
    customerDashboardMonthlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardMonthlyOtherMetricsReducer,
    initialCustomerDashboardMonthlyOtherMetricsState
  );

  const { otherMetricsBarChartYAxisVariable, otherMetricsLineChartYAxisVariable } =
    customerDashboardMonthlyOtherMetricsState;

  const statisticsMonthlyChurnRetention =
    returnStatistics<CustomerMetricsChurnRetentionChartsKey>(
      monthlyChartsOtherMetrics.bar
    );

  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Monthly",
    metricCategory: "",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    yAxisPieChartVariable: "Churn and Retention Rates",
    year,
    month,
    months: MONTHS,
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
            chartData: monthlyChartsOtherMetrics.pie,
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
      pieChartData={monthlyChartsOtherMetrics.pie}
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
            chartData: monthlyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable],
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
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
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
      barChartData={monthlyChartsOtherMetrics.bar[otherMetricsBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="percent"
    />
  );

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Churn And Retention Rate Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable],
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
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
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
      lineChartData={monthlyChartsOtherMetrics.line[otherMetricsLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${y} %`}
      unitKind="percent"
    />
  );

  const customerDashboardMonthlyOtherMetrics = (
    <DashboardMetricsLayout
      barChart={churnRetentionBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={churnRetentionBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={churnRetentionLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={churnRetentionLineChartYAxisVariablesSelectInput}
      overviewCards={[...monthlyCardsOtherMetrics]}
      padding={padding}
      pieChart={churnRetentionPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${storeLocation} Monthly Churn and Retention Rates`}
      statisticsMap={statisticsMonthlyChurnRetention}
      width={width}
    />
  );

  return customerDashboardMonthlyOtherMetrics;
}

export default CustomerDashboardMonthlyOtherMetrics;
