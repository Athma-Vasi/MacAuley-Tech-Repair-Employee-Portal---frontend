import { MantineNumberSize } from '@mantine/core';
import { ChangeEvent, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../../jsxCreators';
import { splitCamelCase } from '../../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import { MONTHS } from '../../../constants';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { CustomerMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import {
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from '../../constants';
import {
  CustomerMetricsCharts,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';
import {
  customerDashboardMonthlyReturningAction,
  customerDashboardMonthlyReturningReducer,
  initialCustomerDashboardMonthlyReturningState,
} from './state';

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
  monthlyCardsReturning: CustomerMetricsCards['monthlyCards']['returning'];
  monthlyChartsReturning: CustomerMetricsCharts['monthlyCharts']['returning'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
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

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // returning

  // returning -> statistics
  const statisticsMonthlyReturning =
    returnStatistics<CustomerNewReturningObjKey>(
      monthlyChartsReturning.barChartsObj
    );

  // returning -> charts -> pie

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningPieChartYAxisVariable,
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
      pieChartData={
        monthlyChartsReturning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningBarChartYAxisVariable,
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
      barChartData={
        monthlyChartsReturning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningLineChartYAxisVariable,
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
      lineChartData={
        monthlyChartsReturning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `${y} Customers`}
    />
  );

  // returning -> charts -> calendar

  // returning -> charts -> calendar -> heading
  const returningCalendarChartHeading = `${splitCamelCase(
    returningCalendarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> calendar -> y axis variables
  const [createdReturningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyReturningDispatch({
            type: customerDashboardMonthlyReturningAction.setReturningCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: returningCalendarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> calendar -> display
  const displayReturningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyChartsReturning.calendarChartsObj[
          returningCalendarChartYAxisVariable
        ]
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
      barChart={displayReturningBarChart}
      barChartHeading={returningBarChartHeading}
      barChartYAxisSelectInput={
        createdReturningBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayReturningLineChart}
      lineChartHeading={returningLineChartHeading}
      lineChartYAxisSelectInput={
        createdReturningLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCardsReturning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Monthly Returning"
      statisticsMap={statisticsMonthlyReturning}
      width={width}
      calendarChart={displayReturningCalendarChart}
      calendarChartHeading={returningCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdReturningCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayReturningSection;
}

export default CustomerDashboardMonthlyReturning;
