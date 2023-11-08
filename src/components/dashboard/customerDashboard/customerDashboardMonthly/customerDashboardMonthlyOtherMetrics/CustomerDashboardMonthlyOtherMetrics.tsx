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
import { MONTHS } from '../../../constants';
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
  customerDashboardMonthlyOtherMetricsAction,
  customerDashboardMonthlyOtherMetricsReducer,
  initialCustomerDashboardMonthlyOtherMetricsState,
} from './state';

function CustomerDashboardMonthlyOtherMetrics({
  borderColor,
  chartHeight,
  chartWidth,
  monthlyCardsOtherMetrics,
  monthlyChartsOtherMetrics,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  chartHeight: number;
  chartWidth: number;
  monthlyCardsOtherMetrics: CustomerMetricsCards['monthlyCards'][
    | 'churnRate'
    | 'retentionRate'];
  monthlyChartsOtherMetrics: CustomerMetricsCharts['monthlyCharts'][
    | 'churnRetention'];
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  const [
    customerDashboardMonthlyOtherMetricsState,
    customerDashboardMonthlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardMonthlyOtherMetricsReducer,
    initialCustomerDashboardMonthlyOtherMetricsState
  );

  const {
    churnRetentionBarChartYAxisVariable,
    churnRetentionLineChartYAxisVariable,
  } = customerDashboardMonthlyOtherMetricsState;

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
  const statisticsMonthlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      monthlyChartsOtherMetrics.barChartsObj
    );

  // churn & retention rate -> charts -> pie

  // churn & retention rate -> charts -> pie -> heading
  const churnRetentionPieChartHeading = `Churn and retention rates for ${
    MONTHS[parseInt(month) - 1]
  } at ${storeLocation}`;

  // churn & retention rate -> charts -> pie -> display
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyChartsOtherMetrics.pieChartObj}
      hideControls
    />
  );

  // churn & retention rate -> charts -> bar

  // churn & retention rate -> charts -> bar -> heading
  const churnRetentionBarChartHeading = `${splitCamelCase(
    churnRetentionBarChartYAxisVariable
  )} vs. Months for ${year} at ${storeLocation}`;

  // churn & retention rate -> charts -> bar -> y axis variables
  const [createdChurnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setChurnRetentionBarChartYAxisVariable,
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
        monthlyChartsOtherMetrics.barChartsObj[
          churnRetentionBarChartYAxisVariable
        ]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> heading
  const churnRetentionLineChartHeading = `${splitCamelCase(
    churnRetentionLineChartYAxisVariable
  )} vs. Months for ${year} at ${storeLocation}`;

  // churn & retention rate -> charts -> line -> y axis variables
  const [createdChurnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setChurnRetentionLineChartYAxisVariable,
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
        monthlyChartsOtherMetrics.lineChartsObj[
          churnRetentionLineChartYAxisVariable
        ]
      }
      hideControls
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
      overviewCards={[...monthlyCardsOtherMetrics]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={churnRetentionPieChartHeading}
      sectionHeading="Monthly Churn & Retention Rates"
      statisticsMap={statisticsMonthlyChurnRetention}
      width={width}
    />
  );

  return displayChurnRetentionSection;
}

export default CustomerDashboardMonthlyOtherMetrics;
