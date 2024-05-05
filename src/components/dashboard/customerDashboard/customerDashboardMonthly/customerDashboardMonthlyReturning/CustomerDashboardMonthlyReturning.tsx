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
  ResponsivePieChart,
} from "../../../../charts";
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  CustomerMetricsCharts,
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { CustomerMetricsCards } from "../../utilsTSX";
import {
  customerDashboardMonthlyReturningAction,
  customerDashboardMonthlyReturningReducer,
  initialCustomerDashboardMonthlyReturningState,
} from "./state";

function CustomerDashboardMonthlyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsReturning,
  monthlyChartsReturning,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsReturning: CustomerMetricsCards["monthlyCards"]["returning"];
  monthlyChartsReturning: CustomerMetricsCharts["monthlyCharts"]["returning"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardMonthlyReturningState,
    customerDashboardMonthlyReturningDispatch,
  ] = useReducer(
    customerDashboardMonthlyReturningReducer,
    initialCustomerDashboardMonthlyReturningState
  );

  const {
    returningBarChartYAxisVariable,
    returningCalendarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardMonthlyReturningState;

  // returning

  // returning -> statistics
  const statisticsMonthlyReturning =
    returnStatistics<CustomerMetricsNewReturningChartsKey>(monthlyChartsReturning.bar);

  // returning -> charts

  // returning  -> charts -> titles & navlinks
  const {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: "Monthly",
    metricCategory: "Returning",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: returningBarChartYAxisVariable,
    yAxisCalendarChartVariable: returningCalendarChartYAxisVariable,
    yAxisLineChartVariable: returningLineChartYAxisVariable,
    yAxisPieChartVariable: returningPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // returning -> charts -> pie

  // returning -> charts -> pie -> expand chart button
  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Returning Customers Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "pie",
            chartData: monthlyChartsReturning.pie[returningPieChartYAxisVariable],
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
  const [returningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningPieChartsKey,
          });
        },
        value: returningPieChartYAxisVariable,
      },
    ]);

  // returning -> charts -> pie -> display
  const returningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyChartsReturning.pie[returningPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar

  // returning -> charts -> bar -> expand chart button
  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Returning Customers Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsReturning.bar[returningBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartUnitKind: "number",
            chartKind: "bar",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> bar -> y axis variables
  const [returningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
          });
        },
        value: returningBarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> bar -> display
  const returningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyChartsReturning.bar[returningBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // returning -> charts -> line

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
            chartData: monthlyChartsReturning.line[returningLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartUnitKind: "number",
            chartKind: "line",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> line -> y axis variables
  const [returningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
          });
        },
        value: returningLineChartYAxisVariable,
      },
    ]);

  // returning -> charts -> line -> display
  const returningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyChartsReturning.line[returningLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  // returning -> charts -> calendar

  // returning -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Returning Customers Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsReturning.calendar[returningCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartUnitKind: "number",
            chartKind: "calendar",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> calendar -> y axis variables
  const [returningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerMetricsNewReturningCalendarChartsKey,
          });
        },
        value: returningCalendarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> calendar -> display
  const returningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsReturning.calendar[returningCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayReturningSection = (
    <DashboardMetricsLayout
      barChart={returningBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={returningBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={returningLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={returningLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCardsReturning}
      padding={padding}
      pieChart={returningPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={returningPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Returning Customers`}
      statisticsMap={statisticsMonthlyReturning}
      width={width}
      calendarChart={returningCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={returningCalendarChartYAxisVariablesSelectInput}
    />
  );

  return displayReturningSection;
}

export default CustomerDashboardMonthlyReturning;
