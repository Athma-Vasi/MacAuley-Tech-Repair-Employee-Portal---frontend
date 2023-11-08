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
  customerDashboardDailyNewAction,
  customerDashboardDailyNewReducer,
  initialCustomerDashboardDailyNewState,
} from './state';

function CustomerDashboardDailyNew({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsNew,
  dailyChartsNew,
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
  dailyCardsNew: CustomerMetricsCards['dailyCards']['new'];
  dailyChartsNew: CustomerMetricsCharts['dailyCharts']['new'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();

  const [customerDashboardDailyNewState, customerDashboardDailyNewDispatch] =
    useReducer(
      customerDashboardDailyNewReducer,
      initialCustomerDashboardDailyNewState
    );

  const navigate = useNavigate();

  const {
    newBarChartYAxisVariable,
    newCalendarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
  } = customerDashboardDailyNewState;

  // new

  // new -> statistics
  const statisticsDailyNew = returnStatistics<CustomerNewReturningObjKey>(
    dailyChartsNew.barChartsObj
  );

  // new -> charts -> pie

  // new -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${newPieChartYAxisVariable} pie chart for ${day} ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Pie Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'pie',
            chartData: dailyChartsNew.pieChartObj[newPieChartYAxisVariable],
            chartTitle: `New customers for ${day} ${
              MONTHS[parseInt(month) - 1]
            }, ${year}`,
          },
        });

        navigate('/home/dashboard/daily-customers-new-pie-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // new -> charts -> pie -> heading
  const newPieChartHeading = `New customers for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyNewDispatch({
            type: customerDashboardDailyNewAction.setNewPieChartYAxisVariable,
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
      pieChartData={dailyChartsNew.pieChartObj[newPieChartYAxisVariable]}
      hideControls
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${newBarChartYAxisVariable} bar chart for ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'bar',
            chartData: dailyChartsNew.barChartsObj[newBarChartYAxisVariable],
            chartTitle: `${splitCamelCase(
              newBarChartYAxisVariable
            )} Customers vs. Days for ${
              MONTHS[parseInt(month) - 1]
            }, ${year} at ${storeLocation}`,
          },
        });

        navigate('/home/dashboard/daily-customers-new-bar-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // new -> charts -> bar -> heading
  const newBarChartHeading = `${splitCamelCase(
    newBarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyNewDispatch({
            type: customerDashboardDailyNewAction.setNewBarChartYAxisVariable,
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
      barChartData={dailyChartsNew.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> expand chart button
  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${newLineChartYAxisVariable} line chart for ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'line',
            chartData: dailyChartsNew.lineChartsObj[newLineChartYAxisVariable],
            chartTitle: `${splitCamelCase(
              newLineChartYAxisVariable
            )} Customers vs. Days for ${
              MONTHS[parseInt(month) - 1]
            }, ${year} at ${storeLocation}`,
          },
        });

        navigate('/home/dashboard/daily-customers-new-line-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // new -> charts -> line -> heading
  const newLineChartHeading = `${splitCamelCase(
    newLineChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyNewDispatch({
            type: customerDashboardDailyNewAction.setNewLineChartYAxisVariable,
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
      lineChartData={dailyChartsNew.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // new -> charts -> calendar

  // new -> charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${newCalendarChartYAxisVariable} calendar chart for ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Calendar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'calendar',
            chartData:
              dailyChartsNew.calendarChartsObj[newCalendarChartYAxisVariable],
            chartTitle: `${splitCamelCase(
              newCalendarChartYAxisVariable
            )} Customers vs. Days for ${
              MONTHS[parseInt(month) - 1]
            }, ${year} at ${storeLocation}`,
          },
        });

        navigate('/home/dashboard/daily-customers-new-calendar-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // new -> charts -> calendar -> heading
  const newCalendarChartHeading = `${splitCamelCase(
    newCalendarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> calendar -> y axis variables
  const [createdNewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyNewDispatch({
            type: customerDashboardDailyNewAction.setNewCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: newCalendarChartYAxisVariable,
      },
    ]);

  // new -> charts -> calendar -> display
  const displayNewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyChartsNew.calendarChartsObj[newCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayNewSection = (
    <DashboardMetricsLayout
      barChart={displayNewBarChart}
      barChartHeading={newBarChartHeading}
      barChartYAxisSelectInput={createdNewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayNewLineChart}
      lineChartHeading={newLineChartHeading}
      lineChartYAxisSelectInput={createdNewLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCardsNew}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={newPieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading={`${storeLocation} Daily New Customers`}
      statisticsMap={statisticsDailyNew}
      width={width}
      calendarChart={displayNewCalendarChart}
      calendarChartHeading={newCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdNewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return displayNewSection;
}

export default CustomerDashboardDailyNew;
