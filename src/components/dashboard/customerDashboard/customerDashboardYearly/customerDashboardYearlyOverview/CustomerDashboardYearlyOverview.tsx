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
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from '../../constants';
import { CustomerMetricsCharts, CustomerOverviewObjKey } from '../../utils';
import {
  customerDashboardYearlyOverviewAction,
  customerDashboardYearlyOverviewReducer,
  initialCustomerDashboardYearlyOverviewState,
} from './state';

function CustomerDashboardYearlyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOverview,
  yearlyChartsOverview,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsOverview: CustomerMetricsCards['yearlyCards']['overview'];
  yearlyChartsOverview: CustomerMetricsCharts['yearlyCharts']['overview'];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [
    customerDashboardYearlyOverviewState,
    customerDashboardYearlyOverviewDispatch,
  ] = useReducer(
    customerDashboardYearlyOverviewReducer,
    initialCustomerDashboardYearlyOverviewState
  );

  const { overviewBarChartYAxisVariable, overviewLineChartYAxisVariable } =
    customerDashboardYearlyOverviewState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // overview

  // overview -> statistics
  const statisticsYearlyOverview = returnStatistics<CustomerOverviewObjKey>(
    yearlyChartsOverview.barChartsObj
  );

  // overview -> charts -> pie

  // overview -> charts -> pie -> heading
  const pieChartHeading = `New and returning customers for ${year}`;

  // overview -> charts -> pie -> display
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsOverview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar -> heading
  const barChartHeading = `${splitCamelCase(
    overviewBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOverviewDispatch({
            type: customerDashboardYearlyOverviewAction.setOverviewBarChartYAxisVariable,
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
      barChartData={
        yearlyChartsOverview.barChartsObj[overviewBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line -> heading
  const lineChartHeading = `${splitCamelCase(
    overviewLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOverviewDispatch({
            type: customerDashboardYearlyOverviewAction.setOverviewLineChartYAxisVariable,
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
      lineChartData={
        yearlyChartsOverview.lineChartsObj[overviewLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayOverviewSection = (
    <DashboardMetricsLayout
      barChart={displayOverviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdOverviewBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayOverviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdOverviewLineChartYAxisVariablesSelectInput
      }
      overviewCards={yearlyCardsOverview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading="Yearly Overview"
      statisticsMap={statisticsYearlyOverview}
      width={width}
    />
  );

  return displayOverviewSection;
}

export default CustomerDashboardYearlyOverview;
