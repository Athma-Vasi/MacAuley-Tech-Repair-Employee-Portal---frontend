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
  customerDashboardDailyNewAction,
  customerDashboardDailyNewReducer,
  initialCustomerDashboardDailyNewState,
} from "./state";

function CustomerDashboardDailyNew({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsNew,
  dailyChartsNew,
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
  dailyCardsNew: CustomerMetricsCards["dailyCards"]["new"];
  dailyChartsNew: CustomerMetricsCharts["dailyCharts"]["new"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyNewState, customerDashboardDailyNewDispatch] = useReducer(
    customerDashboardDailyNewReducer,
    initialCustomerDashboardDailyNewState
  );

  const {
    newBarChartYAxisVariable,
    newCalendarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardDailyNewState;

  const statisticsDailyNew = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    dailyChartsNew.bar
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
    metricCategory: "New",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: newBarChartYAxisVariable,
    yAxisCalendarChartVariable: newCalendarChartYAxisVariable,
    yAxisLineChartVariable: newLineChartYAxisVariable,
    yAxisPieChartVariable: newPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
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
            chartKind: "pie",
            chartData: dailyChartsNew.pie[newPieChartYAxisVariable],
            chartTitle: pieChartHeading,
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
        customerDashboardDailyNewDispatch({
          type: customerDashboardDailyNewAction.setNewPieChartYAxisVariable,
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
      pieChartData={dailyChartsNew.pie[newPieChartYAxisVariable]}
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
            chartKind: "bar",
            chartData: dailyChartsNew.bar[newBarChartYAxisVariable],
            chartTitle: barChartHeading,
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
        customerDashboardDailyNewDispatch({
          type: customerDashboardDailyNewAction.setNewBarChartYAxisVariable,
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
      barChartData={dailyChartsNew.bar[newBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "line",
            chartData: dailyChartsNew.line[newLineChartYAxisVariable],
            chartTitle: lineChartHeading,
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
        customerDashboardDailyNewDispatch({
          type: customerDashboardDailyNewAction.setNewLineChartYAxisVariable,
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
      lineChartData={dailyChartsNew.line[newLineChartYAxisVariable]}
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
      semanticName: "Expand Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "calendar",
            chartData: dailyChartsNew.calendar[newCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  const [newCalendarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyNewDispatch({
            type: customerDashboardDailyNewAction.setNewCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerMetricsNewReturningCalendarChartsKey,
          });
        },
        value: newCalendarChartYAxisVariable,
      },
    ]
  );

  const newCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={dailyChartsNew.calendar[newCalendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const customerDashboardDailyNew = (
    <DashboardMetricsLayout
      barChart={newBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={newBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={newLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={newLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsNew}
      padding={padding}
      pieChart={newPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={newPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Daily New Customers`}
      statisticsMap={statisticsDailyNew}
      width={width}
      calendarChart={newCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={newCalendarChartYAxisVariablesSelectInput}
    />
  );

  return customerDashboardDailyNew;
}

export default CustomerDashboardDailyNew;
