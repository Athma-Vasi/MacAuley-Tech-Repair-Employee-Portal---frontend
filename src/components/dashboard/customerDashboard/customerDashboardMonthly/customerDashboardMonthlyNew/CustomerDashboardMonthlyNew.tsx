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
  customerDashboardMonthlyNewAction,
  customerDashboardMonthlyNewReducer,
  initialCustomerDashboardMonthlyNewState,
} from "./state";

function CustomerDashboardMonthlyNew({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsNew,
  monthlyChartsNew,
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
  monthlyCardsNew: CustomerMetricsCards["monthlyCards"]["new"];
  monthlyChartsNew: CustomerMetricsCharts["monthlyCharts"]["new"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();

  const navigate = useNavigate();

  const [customerDashboardMonthlyNewState, customerDashboardMonthlyNewDispatch] =
    useReducer(
      customerDashboardMonthlyNewReducer,
      initialCustomerDashboardMonthlyNewState
    );

  const {
    newBarChartYAxisVariable,
    newCalendarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardMonthlyNewState;

  // new

  // new -> statistics
  const statisticsMonthlyNew = returnStatistics<CustomerMetricsNewReturningChartsKey>(
    monthlyChartsNew.bar
  );

  // new -> charts

  // new  -> charts -> titles & navlinks
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

  // new -> charts -> pie

  // new -> charts -> pie -> expand chart button
  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand New Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsNew.pie[newPieChartYAxisVariable],
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
  const [newPieChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
      label: "Y-Axis Pie",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardMonthlyNewDispatch({
          type: customerDashboardMonthlyNewAction.setNewPieChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningPieChartsKey,
        });
      },
      value: newPieChartYAxisVariable,
    },
  ]);

  // new -> charts -> pie -> display
  const newPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyChartsNew.pie[newPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> expand chart button
  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand New Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsNew.bar[newBarChartYAxisVariable],
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
  const [newBarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Bar",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardMonthlyNewDispatch({
          type: customerDashboardMonthlyNewAction.setNewBarChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
        });
      },
      value: newBarChartYAxisVariable,
    },
  ]);

  // new -> charts -> bar -> display
  const newBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyChartsNew.bar[newBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> expand chart button
  const [expandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand New Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsNew.line[newLineChartYAxisVariable],
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
  const [newLineChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
      label: "Y-Axis Line",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardMonthlyNewDispatch({
          type: customerDashboardMonthlyNewAction.setNewLineChartYAxisVariable,
          payload: event.currentTarget.value as CustomerMetricsNewReturningChartsKey,
        });
      },
      value: newLineChartYAxisVariable,
    },
  ]);

  // new -> charts -> line -> display
  const newLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyChartsNew.line[newLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  // new -> charts -> calendar

  // new -> charts -> calendar -> expand chart button
  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand New Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsNew.calendar[newCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartKind: "calendar",
            chartUnitKind: "number",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // new -> charts -> calendar -> y axis variables
  const [newCalendarChartYAxisVariablesSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyNewDispatch({
            type: customerDashboardMonthlyNewAction.setNewCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerMetricsNewReturningCalendarChartsKey,
          });
        },
        value: newCalendarChartYAxisVariable,
      },
    ]
  );

  // new -> charts -> calendar -> display
  const newCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={monthlyChartsNew.calendar[newCalendarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayNewSection = (
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
      overviewCards={monthlyCardsNew}
      padding={padding}
      pieChart={newPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={newPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Monthly New Customers`}
      statisticsMap={statisticsMonthlyNew}
      width={width}
      calendarChart={newCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={newCalendarChartYAxisVariablesSelectInput}
    />
  );

  return displayNewSection;
}

export default CustomerDashboardMonthlyNew;
