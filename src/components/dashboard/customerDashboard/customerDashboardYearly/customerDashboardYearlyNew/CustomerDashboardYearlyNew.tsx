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
  customerDashboardYearlyNewAction,
  customerDashboardYearlyNewReducer,
  initialCustomerDashboardYearlyNewState,
} from './state';

function CustomerDashboardYearlyNew({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsNew,
  yearlyChartsNew,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsNew: CustomerMetricsCards['yearlyCards']['new'];
  yearlyChartsNew: CustomerMetricsCharts['yearlyCharts']['new'];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [customerDashboardYearlyNewState, customerDashboardYearlyNewDispatch] =
    useReducer(
      customerDashboardYearlyNewReducer,
      initialCustomerDashboardYearlyNewState
    );

  const {
    newBarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardYearlyNewState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // new

  // new -> statistics
  const statisticsYearlyNew = returnStatistics<CustomerNewReturningObjKey>(
    yearlyChartsNew.barChartsObj
  );

  // new -> charts -> pie

  // new -> charts -> pie -> heading
  const newPieChartHeading = `New customers for ${year}`;

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: newPieChartYAxisVariable,
      },
    ]);

  // new -> charts -> pie -> display
  const displayNewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsNew.pieChartObj[newPieChartYAxisVariable]}
      hideControls
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> heading
  const newBarChartHeading = `${splitCamelCase(
    newBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newBarChartYAxisVariable,
      },
    ]);

  // new -> charts -> bar -> display
  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyChartsNew.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> heading
  const newLineChartHeading = `${splitCamelCase(
    newLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyNewDispatch({
            type: customerDashboardYearlyNewAction.setNewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newLineChartYAxisVariable,
      },
    ]);

  // new -> charts -> line -> display
  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyChartsNew.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayNewSection = (
    <DashboardMetricsLayout
      barChart={displayNewBarChart}
      barChartHeading={newBarChartHeading}
      barChartYAxisSelectInput={createdNewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayNewLineChart}
      lineChartHeading={newLineChartHeading}
      lineChartYAxisSelectInput={createdNewLineChartYAxisVariablesSelectInput}
      overviewCards={yearlyCardsNew}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={newPieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading="Yearly New"
      statisticsMap={statisticsYearlyNew}
      width={width}
    />
  );

  return displayNewSection;
}

export default CustomerDashboardYearlyNew;
