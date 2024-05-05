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
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsCharts,
  FinancialMetricsPieChartsKey,
} from "../../utils";
import { FinancialMetricsCards } from "../../utilsTSX";
import {
  financialDashboardMonthlyTransactionsAction,
  financialDashboardMonthlyTransactionsReducer,
  initialFinancialDashboardMonthlyTransactionsState,
} from "./state";

function FinancialDashboardMonthlyTransactions({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsTransactions,
  monthlyChartsTransactions,
  day,
  month,
  padding,
  storeLocation,
  year,
  width,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsTransactions: FinancialMetricsCards["monthlyCards"]["transactions"];
  monthlyChartsTransactions: FinancialMetricsCharts["monthlyCharts"]["transactions"];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  width: number;
}) {
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    financialDashboardMonthlyTransactionsState,
    financialDashboardMonthlyTransactionsDispatch,
  ] = useReducer(
    financialDashboardMonthlyTransactionsReducer,
    initialFinancialDashboardMonthlyTransactionsState
  );

  const {
    transactionsBarChartYAxisVariable,
    transactionsCalendarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardMonthlyTransactionsState;

  const statisticsTransactions = returnStatistics<FinancialMetricsBarLineChartsKey>(
    monthlyChartsTransactions.bar
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
    calendarView: "Monthly",
    metricCategory: "Transactions",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: transactionsBarChartYAxisVariable,
    yAxisCalendarChartVariable: transactionsCalendarChartYAxisVariable,
    yAxisLineChartVariable: transactionsLineChartYAxisVariable,
    yAxisPieChartVariable: transactionsPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  const [expandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: "Expand Transactions Pie Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsTransactions.pie[transactionsPieChartYAxisVariable],
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

  const [transactionsPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: "Y-Axis Pie",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsPieChartsKey,
          });
        },
        value: transactionsPieChartYAxisVariable,
      },
    ]);

  const transactionsPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyChartsTransactions.pie[transactionsPieChartYAxisVariable]}
      hideControls
      unitKind="number"
    />
  );

  const [expandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: "Expand Transactions Bar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsTransactions.bar[transactionsBarChartYAxisVariable],
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

  const [transactionsBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Bar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: transactionsBarChartYAxisVariable,
      },
    ]);

  const transactionsBarChart = (
    <ResponsiveBarChart
      barChartData={monthlyChartsTransactions.bar[transactionsBarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      indexBy="Months"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="number"
    />
  );

  const [expandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: "Expand Transactions Line Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: monthlyChartsTransactions.line[transactionsLineChartYAxisVariable],
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

  const [transactionsLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: "Y-Axis Line",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: transactionsLineChartYAxisVariable,
      },
    ]);

  const transactionsLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyChartsTransactions.line[transactionsLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${addCommaSeparator(y)}`}
      unitKind="number"
    />
  );

  const [expandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Expand",
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: "Expand Transactions Calendar Chart",
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsTransactions.calendar[transactionsCalendarChartYAxisVariable],
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

  const [transactionsCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: "Y-Axis Calendar",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyTransactionsDispatch({
            type: financialDashboardMonthlyTransactionsAction.setTransactionsCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsCalendarChartsKey,
          });
        },
        value: transactionsCalendarChartYAxisVariable,
      },
    ]);

  const transactionsCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsTransactions.calendar[transactionsCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const financialDashboardMonthlyTransactions = (
    <DashboardMetricsLayout
      barChart={transactionsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={transactionsBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandCalendarChartButton={expandCalendarChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={transactionsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={transactionsLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCardsTransactions}
      padding={padding}
      pieChart={transactionsPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={transactionsPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly Transactions`}
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
      calendarChart={transactionsCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={transactionsCalendarChartYAxisVariablesSelectInput}
    />
  );

  return financialDashboardMonthlyTransactions;
}

export default FinancialDashboardMonthlyTransactions;
