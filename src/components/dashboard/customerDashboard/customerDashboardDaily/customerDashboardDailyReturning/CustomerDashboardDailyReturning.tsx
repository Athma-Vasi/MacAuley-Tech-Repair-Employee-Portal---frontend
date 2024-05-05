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
import { addCommaSeparator } from "../../../../../utils";
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
  customerDashboardDailyReturningAction,
  customerDashboardDailyReturningReducer,
  initialCustomerDashboardDailyReturningState,
} from "./state";

function CustomerDashboardDailyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsReturning,
  dailyChartsReturning,
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
  dailyCardsReturning: CustomerMetricsCards["dailyCards"]["returning"];
  dailyChartsReturning: CustomerMetricsCharts["dailyCharts"]["returning"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyReturningState, customerDashboardDailyReturningDispatch] =
    useReducer(
      customerDashboardDailyReturningReducer,
      initialCustomerDashboardDailyReturningState
    );

  const {
    returningBarChartYAxisVariable,
    returningCalendarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardDailyReturningState;

  const statisticsDailyReturning = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    dailyChartsReturning.bar
  );

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
    calendarView: "Daily",
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

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Returning Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "pie",
            chartData: dailyChartsReturning.pie[returningPieChartYAxisVariable],
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
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningPieChartYAxisVariable,
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
      pieChartData={dailyChartsReturning.pie[returningPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Returning Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "bar",
            chartData: dailyChartsReturning.bar[returningBarChartYAxisVariable],
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
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningBarChartYAxisVariable,
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
      barChartData={dailyChartsReturning.bar[returningBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Returning Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "line",
            chartData: dailyChartsReturning.line[returningLineChartYAxisVariable],
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
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningLineChartYAxisVariable,
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
      lineChartData={dailyChartsReturning.line[returningLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Returning Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "calendar",
            chartData: dailyChartsReturning.calendar[returningCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [returningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerMetricsNewReturningCalendarChartsKey,
          });
        },
        value: returningCalendarChartYAxisVariable,
      },
    ]);

  const returningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsReturning.calendar[returningCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardDailyReturning = (
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
      overviewCards={dailyCardsReturning}
      padding={padding}
      pieChart={returningPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={returningPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Daily Returning Customers`}
      statisticsMap={statisticsDailyReturning}
      width={width}
      calendarChart={returningCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={returningCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardDailyReturning;
}

export default CustomerDashboardDailyReturning;
