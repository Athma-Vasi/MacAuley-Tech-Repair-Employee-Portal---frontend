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
  customerDashboardDailyReturningAction,
  customerDashboardDailyReturningReducer,
  initialCustomerDashboardDailyReturningState,
} from './state';

function CustomerDashboardDailyReturning({
  borderColor,
  chartHeight,
  chartWidth,
  dailyCardsReturning,
  dailyChartsReturning,
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
  dailyCardsReturning: CustomerMetricsCards['dailyCards']['returning'];
  dailyChartsReturning: CustomerMetricsCharts['dailyCharts']['returning'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const { globalDispatch } = useGlobalState();

  const [
    customerDashboardDailyReturningState,
    customerDashboardDailyReturningDispatch,
  ] = useReducer(
    customerDashboardDailyReturningReducer,
    initialCustomerDashboardDailyReturningState
  );

  const navigate = useNavigate();

  const {
    returningBarChartYAxisVariable,
    returningCalendarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardDailyReturningState;

  // returning

  // returning -> statistics
  const statisticsDailyReturning = returnStatistics<CustomerNewReturningObjKey>(
    dailyChartsReturning.barChartsObj
  );

  // returning -> charts -> pie

  // returning -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize returning charts for ${day} ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Returning Customers Charts',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'pie',
            chartData:
              dailyChartsReturning.pieChartObj[returningPieChartYAxisVariable],
            chartTitle: `Returning customers for ${day} ${
              MONTHS[parseInt(month) - 1]
            }, ${year}`,
          },
        });

        navigate('/home/dashboard/daily-customers-returning-pie-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${day} ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningPieChartYAxisVariable,
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
        dailyChartsReturning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize returning charts for ${day} ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Returning Customers Charts',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'bar',
            chartData:
              dailyChartsReturning.barChartsObj[returningBarChartYAxisVariable],
            chartTitle: `Returning customers for ${day} ${
              MONTHS[parseInt(month) - 1]
            }, ${year}`,
          },
        });

        navigate('/home/dashboard/daily-customers-returning-bar-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningBarChartYAxisVariable,
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
        dailyChartsReturning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize returning charts for ${day} ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Returning Customers Charts',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'line',
            chartData:
              dailyChartsReturning.lineChartsObj[
                returningLineChartYAxisVariable
              ],
            chartTitle: `Returning customers for ${day} ${
              MONTHS[parseInt(month) - 1]
            }, ${year}`,
          },
        });

        navigate('/home/dashboard/daily-customers-returning-line-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningLineChartYAxisVariable,
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
        dailyChartsReturning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // returning -> charts -> calendar

  // returning -> charts -> calendar -> expand chart button
  const [createdExpandCalendarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize returning charts for ${day} ${
        MONTHS[parseInt(month) - 1]
      }, ${year}`,
      semanticName: 'Expand Returning Customers Charts',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartKind: 'calendar',
            chartData:
              dailyChartsReturning.calendarChartsObj[
                returningCalendarChartYAxisVariable
              ],
            chartTitle: `Returning customers for ${day} ${
              MONTHS[parseInt(month) - 1]
            }, ${year}`,
          },
        });

        navigate('/home/dashboard/daily-customers-returning-calendar-chart');
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // returning -> charts -> calendar -> heading
  const returningCalendarChartHeading = `${splitCamelCase(
    returningCalendarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> calendar -> y axis variables
  const [createdReturningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyReturningDispatch({
            type: customerDashboardDailyReturningAction.setReturningCalendarChartYAxisVariable,
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
        dailyChartsReturning.calendarChartsObj[
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
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandCalendarChartButton={createdExpandCalendarChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayReturningLineChart}
      lineChartHeading={returningLineChartHeading}
      lineChartYAxisSelectInput={
        createdReturningLineChartYAxisVariablesSelectInput
      }
      overviewCards={dailyCardsReturning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading={`${storeLocation} Daily Returning Customers`}
      statisticsMap={statisticsDailyReturning}
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

export default CustomerDashboardDailyReturning;
