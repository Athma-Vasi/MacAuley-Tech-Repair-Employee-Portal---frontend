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
import { MONTHS } from "../../../constants";
import DashboardMetricsLayout from "../../../DashboardMetricsLayout";
import { BusinessMetricStoreLocation, Year } from "../../../types";
import { returnChartTitleNavigateLinks, returnStatistics } from "../../../utils";
import {
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from "../../constants";
import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCharts,
  FinancialMetricsPieChartsKey,
} from "../../utils";
import { FinancialMetricsCards } from "../../utilsTSX";
import {
  financialDashboardYearlyTransactionsAction,
  financialDashboardYearlyTransactionsReducer,
  initialFinancialDashboardYearlyTransactionsState,
} from "./state";

function FinancialDashboardYearlyTransactions({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsTransactions,
  yearlyChartsTransactions,
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
  yearlyCardsTransactions: FinancialMetricsCards["yearlyCards"]["transactions"];
  yearlyChartsTransactions: FinancialMetricsCharts["yearlyCharts"]["transactions"];
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
    financialDashboardYearlyTransactionsState,
    financialDashboardYearlyTransactionsDispatch,
  ] = useReducer(
    financialDashboardYearlyTransactionsReducer,
    initialFinancialDashboardYearlyTransactionsState
  );

  const {
    transactionsBarChartYAxisVariable,
    transactionsLineChartYAxisVariable,
    transactionsPieChartYAxisVariable,
  } = financialDashboardYearlyTransactionsState;

  const statisticsTransactions = returnStatistics<FinancialMetricsBarLineChartsKey>(
    yearlyChartsTransactions.bar
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
    metricCategory: "Transactions",
    metricsView: "Financials",
    storeLocation,
    yAxisBarChartVariable: transactionsBarChartYAxisVariable,
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
            chartData: yearlyChartsTransactions.pie[transactionsPieChartYAxisVariable],
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
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsPieChartYAxisVariable,
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
      pieChartData={yearlyChartsTransactions.pie[transactionsPieChartYAxisVariable]}
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
            chartData: yearlyChartsTransactions.bar[transactionsBarChartYAxisVariable],
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
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricsBarLineChartsKey,
          });
        },
        value: transactionsBarChartYAxisVariable,
      },
    ]);

  const transactionsBarChart = (
    <ResponsiveBarChart
      barChartData={yearlyChartsTransactions.bar[transactionsBarChartYAxisVariable]}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      indexBy="Years"
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
            chartData: yearlyChartsTransactions.line[transactionsLineChartYAxisVariable],
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
          financialDashboardYearlyTransactionsDispatch({
            type: financialDashboardYearlyTransactionsAction.setTransactionsLineChartYAxisVariable,
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
      lineChartData={yearlyChartsTransactions.line[transactionsLineChartYAxisVariable]}
      hideControls
      yFormat={(y) => `${addCommaSeparator(y)}`}
      unitKind="number"
    />
  );

  const financialDashboardYearlyTransactions = (
    <DashboardMetricsLayout
      barChart={transactionsBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={transactionsBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={expandBarChartButton}
      expandLineChartButton={expandLineChartButton}
      expandPieChartButton={expandPieChartButton}
      lineChart={transactionsLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={transactionsLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsTransactions}
      padding={padding}
      pieChart={transactionsPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={transactionsPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Yearly Transactions`}
      semanticLabel="transactions"
      statisticsMap={statisticsTransactions}
      width={width}
    />
  );

  return financialDashboardYearlyTransactions;
}

export default FinancialDashboardYearlyTransactions;
