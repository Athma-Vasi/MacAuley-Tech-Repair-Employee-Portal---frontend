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
import { CustomerMetricsCards } from "../../../utilsTSX";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  CustomerMetricsCharts,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from "../../utils";
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

  // returning

  // returning -> statistics
  const statisticsYearlyReturning = returnStatistics<CustomerNewReturningObjKey>(
    yearlyChartsReturning.barChartsObj
  );

  // returning -> charts

  // returning  -> charts -> titles & navlinks
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

  // returning -> charts -> pie

  // returning -> charts -> pie -> expand chart button
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
            chartData: yearlyChartsReturning.pieChartObj[returningPieChartYAxisVariable],
            chartTitle: pieChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: returningPieChartYAxisVariable,
      },
    ]);

  // returning -> charts -> pie -> display
  const displayReturningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsReturning.pieChartObj[returningPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Returning Customers Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "bar",
            chartData: yearlyChartsReturning.barChartsObj[returningBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningBarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> bar -> display
  const displayReturningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsReturning.barChartsObj[returningBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> expand chart button
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
            chartData:
              yearlyChartsReturning.lineChartsObj[returningLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningLineChartYAxisVariable,
      },
    ]);

  // returning -> charts -> line -> display
  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsReturning.lineChartsObj[returningLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const displayReturningSection = (
    <DashboardMetricsLayout
      barChart={displayReturningBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdReturningBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandChartButton}
      lineChart={displayReturningLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdReturningLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsReturning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdReturningPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Returning Customers`}
      statisticsMap={statisticsYearlyReturning}
      width={width}
    />
  );

  return displayReturningSection;
}

export default CustomerDashboardYearlyReturning;
