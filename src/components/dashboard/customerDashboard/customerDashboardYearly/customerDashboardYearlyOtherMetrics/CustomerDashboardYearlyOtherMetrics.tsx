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
import { CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA } from '../../constants';
import {
  CustomerChurnRetentionObjKey,
  CustomerMetricsCharts,
} from '../../utils';
import {
  customerDashboardYearlyOtherMetricsAction,
  customerDashboardYearlyOtherMetricsReducer,
  initialCustomerDashboardYearlyOtherMetricsState,
} from './state';

function CustomerDashboardYearlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  yearlyCardsOtherMetrics,
  yearlyChartsOtherMetrics,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  yearlyCardsOtherMetrics: CustomerMetricsCards['yearlyCards'][
    | 'churnRate'
    | 'retentionRate'];
  yearlyChartsOtherMetrics: CustomerMetricsCharts['yearlyCharts'][
    | 'churnRetention'];
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [
    customerDashboardYearlyOtherMetricsState,
    customerDashboardYearlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardYearlyOtherMetricsReducer,
    initialCustomerDashboardYearlyOtherMetricsState
  );

  const {
    churnRetentionBarChartYAxisVariable,
    churnRetentionLineChartYAxisVariable,
  } = customerDashboardYearlyOtherMetricsState;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // churn & retention rate

  // churn & retention rate -> statistics
  const statisticsYearlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      yearlyChartsOtherMetrics.barChartsObj
    );

  // churn & retention rate -> charts -> pie

  // churn & retention rate -> charts -> pie -> heading
  const churnRetentionPieChartHeading = `Churn and retention rates for ${year} at ${storeLocation}`;

  // churn & retention rate -> charts -> pie -> display
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyChartsOtherMetrics.pieChartObj}
      hideControls
    />
  );

  // churn & retention rate -> charts -> bar

  // churn & retention rate -> charts -> bar -> heading
  const churnRetentionBarChartHeading = `${splitCamelCase(
    churnRetentionBarChartYAxisVariable
  )} vs. Years at ${storeLocation}`;

  // churn & retention rate -> charts -> bar -> y axis variables
  const [createdChurnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setChurnRetentionBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: churnRetentionBarChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> bar -> display
  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyChartsOtherMetrics.barChartsObj[
          churnRetentionBarChartYAxisVariable
        ]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> heading
  const churnRetentionLineChartHeading = `${splitCamelCase(
    churnRetentionLineChartYAxisVariable
  )} vs. Years at ${storeLocation}`;

  // churn & retention rate -> charts -> line -> y axis variables
  const [createdChurnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setChurnRetentionLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: churnRetentionLineChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> line -> display
  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyChartsOtherMetrics.lineChartsObj[
          churnRetentionLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} %`}
    />
  );

  const displayChurnRetentionSection = (
    <DashboardMetricsLayout
      barChart={displayChurnRetentionBarChart}
      barChartHeading={churnRetentionBarChartHeading}
      barChartYAxisSelectInput={
        createdChurnRetentionBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayChurnRetentionLineChart}
      lineChartHeading={churnRetentionLineChartHeading}
      lineChartYAxisSelectInput={
        createdChurnRetentionLineChartYAxisVariablesSelectInput
      }
      overviewCards={[...yearlyCardsOtherMetrics]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={churnRetentionPieChartHeading}
      sectionHeading="Yearly Churn & Retention Rates"
      statisticsMap={statisticsYearlyChurnRetention}
      width={width}
    />
  );

  return displayChurnRetentionSection;
}

export default CustomerDashboardYearlyOtherMetrics;
