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
  ResponsiveLineChart,
  ResponsivePieChart,
} from "../../../../charts";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  CustomerMetricsCharts,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import {
  customerDashboardYearlyReturningAction,
  customerDashboardYearlyReturningReducer,
  initialCustomerDashboardYearlyReturningState,
} from "./state";

function CustomerDashboardYearlyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsReturning,
  yearlyChartsReturning,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsReturning: CustomerMetricsCards["yearlyCards"]["returning"];
  yearlyChartsReturning: CustomerMetricsCharts["yearlyCharts"]["returning"];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardYearlyReturningState,
    customerDashboardYearlyReturningDispatch,
  ] = useReducer(
    customerDashboardYearlyReturningReducer,
    initialCustomerDashboardYearlyReturningState
  );

  const {
    returningBarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardYearlyReturningState;

  const statisticsYearlyReturning =
    returnStatistics<CustomerMetricsNewReturningChartsKey>(yearlyChartsReturning.bar);

  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Yearly",
    metricCategory: "Returning",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: returningBarChartYAxisVariable,
    yAxisLineChartVariable: returningLineChartYAxisVariable,
    yAxisPieChartVariable: returningPieChartYAxisVariable,
    year,
  });

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Returning Customers Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "pie",
            chartData: yearlyChartsReturning.pie[returningPieChartYAxisVariable],
            chartTitle: pieChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [returningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningPieChartsKey,
          });
        },
        value: returningPieChartYAxisVariable,
      },
    ]);

  const returningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsReturning.pie[returningPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Returning Customers Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "bar",
            chartData: yearlyChartsReturning.bar[returningBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [returningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
          });
        },
        value: returningBarChartYAxisVariable,
      },
    ]);

  const returningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsReturning.bar[returningBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Returning Customers Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "line",
            chartData: yearlyChartsReturning.line[returningLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [returningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
          });
        },
        value: returningLineChartYAxisVariable,
      },
    ]);

  const returningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsReturning.line[returningLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const customerDashboardYearlyReturning = (
    <DashboardMetricsLayout
      barChart={returningBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={returningBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandChartButton}
      lineChart={returningLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={returningLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsReturning}
      padding={padding}
      pieChart={returningPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={returningPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Returning Customers`}
      statisticsMap={statisticsYearlyReturning}
      width={width}
    />
  );

  return customerDashboardYearlyReturning;
}

export default CustomerDashboardYearlyReturning;
