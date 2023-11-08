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
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { CustomerMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import { returnStatistics } from '../../../utils';
import {
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
} from '../../constants';
import {
  CustomerMetricsCharts,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';
import {
  customerDashboardYearlyReturningAction,
  customerDashboardYearlyReturningReducer,
  initialCustomerDashboardYearlyReturningState,
} from './state';

function CustomerDashboardYearlyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsReturning,
  yearlyChartsReturning,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsReturning: CustomerMetricsCards['yearlyCards']['returning'];
  yearlyChartsReturning: CustomerMetricsCharts['yearlyCharts']['returning'];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [
    customerDashboardYearlyReturningState,
    customerDashboardYearlyReturningDispatch,
  ] = useReducer(
    customerDashboardYearlyReturningReducer,
    initialCustomerDashboardYearlyReturningState
  );

  const {
    returningBarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardYearlyReturningState;

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
  const statisticsYearlyReturning =
    returnStatistics<CustomerNewReturningObjKey>(
      yearlyChartsReturning.barChartsObj
    );

  // returning -> charts -> pie

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${year}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningPieChartYAxisVariable,
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
        yearlyChartsReturning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningBarChartYAxisVariable,
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
        yearlyChartsReturning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyReturningDispatch({
            type: customerDashboardYearlyReturningAction.setReturningLineChartYAxisVariable,
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
        yearlyChartsReturning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
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
      overviewCards={yearlyCardsReturning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Yearly Returning"
      statisticsMap={statisticsYearlyReturning}
      width={width}
    />
  );

  return displayReturningSection;
}

export default CustomerDashboardYearlyReturning;
