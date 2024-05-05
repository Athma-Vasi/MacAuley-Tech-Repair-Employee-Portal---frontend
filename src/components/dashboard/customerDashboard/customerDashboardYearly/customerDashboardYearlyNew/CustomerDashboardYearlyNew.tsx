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

  // new

  // new -> statistics
  const statisticsYearlyNew = returnStatistics<CustomerNewReturningObjKey>(
    yearlyChartsNew.barChartsObj
  );

  // new -> charts

  // new  -> charts -> titles & navlinks
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

  // new -> charts -> pie

  // new -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.pieChartObj[newPieChartYAxisVariable],
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

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: newPieChartYAxisVariable,
      },
    ]);

  // new -> charts -> pie -> display
  const displayNewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsNew.pieChartObj[newPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.barChartsObj[newBarChartYAxisVariable],
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

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newBarChartYAxisVariable,
      },
    ]);

  // new -> charts -> bar -> display
  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsNew.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> expand chart button
  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsNew.lineChartsObj[newLineChartYAxisVariable],
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

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newLineChartYAxisVariable,
      },
    ]);

  // new -> charts -> line -> display
  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsNew.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const displayNewSection = (
    <DashboardMetricsLayout
      barChart={displayNewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdNewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayNewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdNewLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsNew}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} New Customers`}
      statisticsMap={statisticsYearlyNew}
      width={width}
    />
  );

  return displayNewSection;
}

export default CustomerDashboardYearlyNew;
