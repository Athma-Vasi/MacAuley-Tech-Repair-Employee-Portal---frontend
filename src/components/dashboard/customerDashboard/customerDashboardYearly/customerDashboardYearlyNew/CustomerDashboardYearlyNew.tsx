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
  customerDashboardYearlyNewAction,
  customerDashboardYearlyNewReducer,
  initialCustomerDashboardYearlyNewState,
} from "./state";

function CustomerDashboardYearlyNew({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsNew,
  yearlyChartsNew,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsNew: CustomerMetricsCards["yearlyCards"]["new"];
  yearlyChartsNew: CustomerMetricsCharts["yearlyCharts"]["new"];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardYearlyNewState, customerDashboardYearlyNewDispatch] =
    useReducer(customerDashboardYearlyNewReducer, initialCustomerDashboardYearlyNewState);

  const {
    newBarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardYearlyNewState;

  const statisticsYearlyNew = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    yearlyChartsNew.bar
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
    metricCategory: "New",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: newBarChartYAxisVariable,
    yAxisLineChartVariable: newLineChartYAxisVariable,
    yAxisPieChartVariable: newPieChartYAxisVariable,
    year,
  });

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.pie[newPieChartYAxisVariable],
            chartTitle: pieChartHeading,
            chartKind: "pie",
            chartUnitKind: "number",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [newPieChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
      label: "Y-Axis Pie",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardYearlyNewDispatch({
          type: customerDashboardYearlyNewAction.setNewPieChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningPieChartsKey,
        });
      },
      value: newPieChartYAxisVariable,
    },
  ]);

  const newPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsNew.pie[newPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.bar[newBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: "bar",
            chartUnitKind: "number",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [newBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardYearlyNewDispatch({
          type: customerDashboardYearlyNewAction.setNewBarChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
        });
      },
      value: newBarChartYAxisVariable,
    },
  ]);

  const newBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsNew.bar[newBarChartYAxisVariable]}
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
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.line[newLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: "line",
            chartUnitKind: "number",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [newLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Line",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardYearlyNewDispatch({
          type: customerDashboardYearlyNewAction.setNewLineChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
        });
      },
      value: newLineChartYAxisVariable,
    },
  ]);

  const newLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsNew.line[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const customerDashboardYearlyNew = (
    <DashboardMetricsLayout
      barChart={newBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={newBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={newLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={newLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsNew}
      padding={padding}
      pieChart={newPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={newPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} New Customers`}
      statisticsMap={statisticsYearlyNew}
      width={width}
    />
  );

  return customerDashboardYearlyNew;
}

export default CustomerDashboardYearlyNew;
