import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { globalAction } from '../../../../../context/globalProvider/state';
import { useGlobalState } from '../../../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import { addCommaSeparator, splitCamelCase } from '../../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { FinancialMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import {
  returnChartTitleNavigateLinks,
  returnStatistics,
} from '../../../utils';
import {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
} from '../../constants';
import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
} from '../../utils';
import {
  financialDashboardMonthlyProfitAction,
  financialDashboardMonthlyProfitReducer,
  initialFinancialDashboardMonthlyProfitState,
} from './state';

function FinancialDashboardMonthlyProfit({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsProfit,
  monthlyChartsProfit,
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
  monthlyCardsProfit: FinancialMetricsCards['monthlyCards']['profit'];
  monthlyChartsProfit: FinancialMetricsCharts['monthlyCharts']['profit'];
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
    financialDashboardMonthlyProfitState,
    financialDashboardMonthlyProfitDispatch,
  ] = useReducer(
    financialDashboardMonthlyProfitReducer,
    initialFinancialDashboardMonthlyProfitState
  );

  const {
    profitBarChartYAxisVariable,
    profitCalendarChartYAxisVariable,
    profitLineChartYAxisVariable,
    profitPieChartYAxisVariable,
  } = financialDashboardMonthlyProfitState;

  // profit

  // profit -> statistics
  const statisticsProfit = returnStatistics<FinancialMetricBarLineObjKey>(
    monthlyChartsProfit.barChartsObj
  );

  // profit -> charts

  // profit  -> charts -> titles & navlinks
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
    calendarView: 'Monthly',
    metricCategory: 'Profit',
    metricsView: 'Financials',
    storeLocation,
    yAxisBarChartVariable: profitBarChartYAxisVariable,
    yAxisCalendarChartVariable: profitCalendarChartYAxisVariable,
    yAxisLineChartVariable: profitLineChartYAxisVariable,
    yAxisPieChartVariable: profitPieChartYAxisVariable,
    year,
    day,
    month,
    months: MONTHS,
  });

  // profit -> charts -> pie

  // profit -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: 'Expand Profit Pie Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsProfit.pieChartsObj[profitPieChartYAxisVariable],
            chartTitle: pieChartHeading,
            chartKind: 'pie',
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  //  profit -> charts -> pie -> y-axis select input
  const [createdProfitPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyProfitDispatch({
            type: financialDashboardMonthlyProfitAction.setProfitPieChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricPieObjKey,
          });
        },
        value: profitPieChartYAxisVariable,
      },
    ]);

  // profit -> charts -> pie -> display
  const displayProfitPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        monthlyChartsProfit.pieChartsObj[profitPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // profit -> charts -> bar

  // profit -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: 'Expand Profit Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsProfit.barChartsObj[profitBarChartYAxisVariable],
            chartTitle: barChartHeading,
            chartKind: 'bar',
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // profit -> charts -> bar -> y-axis select input
  const [createdProfitBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyProfitDispatch({
            type: financialDashboardMonthlyProfitAction.setProfitBarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitBarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> bar -> display
  const displayProfitBarChart = (
    <ResponsiveBarChart
      barChartData={
        monthlyChartsProfit.barChartsObj[profitBarChartYAxisVariable]
      }
      indexBy="Months"
      keys={FINANCIAL_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
    />
  );

  // profit -> charts -> line

  // profit -> charts -> line -> expand chart button
  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Profit Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsProfit.lineChartsObj[profitLineChartYAxisVariable],
            chartTitle: lineChartHeading,
            chartKind: 'line',
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // profit -> charts -> line -> y-axis select input
  const [createdProfitLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyProfitDispatch({
            type: financialDashboardMonthlyProfitAction.setProfitLineChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricBarLineObjKey,
          });
        },
        value: profitLineChartYAxisVariable,
      },
    ]);

  // profit -> charts -> line -> display
  const displayProfitLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyChartsProfit.lineChartsObj[profitLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `$${addCommaSeparator(y)}`}
    />
  );

  // profit -> charts -> calendar

  // profit -> charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${calendarChartHeading}`,
      semanticName: 'Expand Profit Calendar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsProfit.calendarChartsObj[
                profitCalendarChartYAxisVariable
              ],
            chartTitle: calendarChartHeading,
            chartKind: 'calendar',
          },
        });

        navigate(expandCalendarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // profit -> charts -> calendar -> y-axis select input
  const [createdProfitCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: FINANCIAL_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          financialDashboardMonthlyProfitDispatch({
            type: financialDashboardMonthlyProfitAction.setProfitCalendarChartYAxisVariable,
            payload: event.currentTarget.value as FinancialMetricCalendarObjKey,
          });
        },
        value: profitCalendarChartYAxisVariable,
      },
    ]);

  // profit -> charts -> calendar -> display
  const displayProfitCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsProfit.calendarChartsObj[profitCalendarChartYAxisVariable]
      }
      from={`${year}-${month}-01`}
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      hideControls
      to={`${year}-${month}-${day}`}
    />
  );

  const displayProfitSection = (
    <DashboardMetricsLayout
      barChart={displayProfitBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={createdProfitBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      isMoney
      lineChart={displayProfitLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdProfitLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsProfit}
      padding={padding}
      pieChart={displayProfitPieChart}
      pieChartHeading={pieChartHeading}
      pieChartYAxisSelectInput={createdProfitPieChartYAxisVariablesSelectInput}
      sectionHeading={`${splitCamelCase(storeLocation)} Monthly Profit`}
      semanticLabel="profit"
      statisticsMap={statisticsProfit}
      width={width}
      calendarChart={displayProfitCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdProfitCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayProfitSection;
}

export default FinancialDashboardMonthlyProfit;
