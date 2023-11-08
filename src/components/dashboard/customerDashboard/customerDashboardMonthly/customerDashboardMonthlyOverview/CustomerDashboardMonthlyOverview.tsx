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
import { CUSTOMER_OVERVIEW_Y_AXIS_DATA } from '../../constants';
import { CustomerMetricsCharts, CustomerOverviewObjKey } from '../../utils';
import {
  customerDashboardMonthlyOverviewAction,
  customerDashboardMonthlyOverviewReducer,
  initialCustomerDashboardMonthlyOverviewState,
} from './state';

function CustomerDashboardMonthlyOverview({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsOverview,
  monthlyChartsOverview,
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
  monthlyCardsOverview: CustomerMetricsCards['monthlyCards']['overview'];
  monthlyChartsOverview: CustomerMetricsCharts['monthlyCharts']['overview'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [
    customerDashboardMonthlyOverviewState,
    customerDashboardMonthlyOverviewDispatch,
  ] = useReducer(
    customerDashboardMonthlyOverviewReducer,
    initialCustomerDashboardMonthlyOverviewState
  );

  const {
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
  } = customerDashboardMonthlyOverviewState;

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
  const statisticsMonthlyOverview = returnStatistics<CustomerOverviewObjKey>(
    monthlyChartsOverview.barChartsObj
  );

  // overview -> charts -> pie

  // overview -> charts -> pie -> heading
  const pieChartHeading = `New and returning customers for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // overview -> charts -> pie -> display
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyChartsOverview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar -> heading
  const barChartHeading = `${splitCamelCase(
    overviewBarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewBarChartYAxisVariable,
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
        monthlyChartsOverview.barChartsObj[overviewBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line -> heading
  const lineChartHeading = `${splitCamelCase(
    overviewLineChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewLineChartYAxisVariable,
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
        monthlyChartsOverview.lineChartsObj[overviewLineChartYAxisVariable]
      }
      hideControls
      yFormat={(y) => `${y} Customers`}
    />
  );

  // overview -> charts -> calendar -> heading
  const calendarChartHeading = `${splitCamelCase(
    overviewCalendarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> calendar -> y axis variables
  const [createdOverviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyOverviewDispatch({
            type: customerDashboardMonthlyOverviewAction.setOverviewCalendarChartYAxisVariable,
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
        monthlyChartsOverview.calendarChartsObj[
          overviewCalendarChartYAxisVariable
        ]
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
      overviewCards={monthlyCardsOverview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading="Monthly Overview"
      statisticsMap={statisticsMonthlyOverview}
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

export default CustomerDashboardMonthlyOverview;
