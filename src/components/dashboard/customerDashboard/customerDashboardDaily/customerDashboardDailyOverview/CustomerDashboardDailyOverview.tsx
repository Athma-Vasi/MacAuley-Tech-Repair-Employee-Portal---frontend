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
import { CustomerMetricsCards } from "../../../jsxHelpers";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from "../../constants";
import { CustomerMetricsCharts, CustomerOverviewObjKey } from "../../utils";
import {
  customerDashboardDailyOverviewAction,
  customerDashboardDailyOverviewReducer,
  initialCustomerDashboardDailyOverviewState,
} from "./state";

function CustomerDashboardDailyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsOverview,
  dailyChartsOverview,
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
  dailyCardsOverview: CustomerMetricsCards["dailyCards"]["overview"];
  dailyChartsOverview: CustomerMetricsCharts["dailyCharts"]["overview"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [customerDashboardDailyOverviewState, customerDashboardDailyOverviewDispatch] =
    useReducer(
      customerDashboardDailyOverviewReducer,
      initialCustomerDashboardDailyOverviewState
    );

  const {
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
  } = customerDashboardDailyOverviewState;

  // overview

  // overview -> statistics
  const statisticsDailyOverview = returnStatistics<CustomerOverviewObjKey>(
    dailyChartsOverview.barChartsObj
  );

  // overview  -> charts -> titles & navlinks
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
    metricCategory: "Overview",
    metricsView: "Customers",
    storeLocation,
    yAxisBarChartVariable: overviewBarChartYAxisVariable,
    yAxisCalendarChartVariable: overviewCalendarChartYAxisVariable,
    yAxisLineChartVariable: overviewLineChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // overview -> charts -> pie

  // overview -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "pie",
            chartData: dailyChartsOverview.pieChartObj,
            chartTitle: pieChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // overview -> charts -> pie -> display
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyChartsOverview.pieChartObj}
      hideControls
      unitKind="number"
    />
  );

  // overview -> charts -> bar

  // overview -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "bar",
            chartData: dailyChartsOverview.barChartsObj[overviewBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewBarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> bar -> display
  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyChartsOverview.barChartsObj[overviewBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  // overview -> charts -> line

  // overview -> charts -> line -> expand chart button
  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: "line",
            chartData: dailyChartsOverview.lineChartsObj[overviewLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewLineChartYAxisVariable,
      },
    ]);

  // overview -> charts -> line -> display
  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyChartsOverview.lineChartsObj[overviewLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${addCommaSeparator(y)} Customers`}
      unitKind="number"
    />
  );

  // overview -> charts -> calendar

  // overview -> charts -> calendar -> expand chart button
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
            chartData:
              dailyChartsOverview.calendarChartsObj[overviewCalendarChartYAxisVariable],
            chartTitle: calendarChartHeading,
            chartUnitKind: "number",
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // overview -> charts -> calendar -> y axis variables
  const [createdOverviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyOverviewDispatch({
            type: customerDashboardDailyOverviewAction.setOverviewCalendarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewCalendarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> calendar -> display
  const displayOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsOverview.calendarChartsObj[overviewCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayOverviewSection = (
    <DashboardMetricsLayout
      barChart={displayOverviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdOverviewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayOverviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={createdOverviewLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsOverview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${storeLocation} Daily Overview Customers`}
      statisticsMap={statisticsDailyOverview}
      width={width}
      calendarChart={displayOverviewCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOverviewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayOverviewSection;
}

export default CustomerDashboardDailyOverview;
