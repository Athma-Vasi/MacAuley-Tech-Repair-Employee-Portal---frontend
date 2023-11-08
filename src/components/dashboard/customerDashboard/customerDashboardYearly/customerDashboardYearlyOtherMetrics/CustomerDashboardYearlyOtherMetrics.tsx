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
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import DashboardMetricsLayout from '../../../DashboardMetricsLayout';
import { CustomerMetricsCards } from '../../../jsxHelpers';
import { BusinessMetricStoreLocation, Year } from '../../../types';
import {
  returnChartTitleNavigateLinks,
  returnStatistics,
} from '../../../utils';
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
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardYearlyOtherMetricsState,
    customerDashboardYearlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardYearlyOtherMetricsReducer,
    initialCustomerDashboardYearlyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = customerDashboardYearlyOtherMetricsState;

  // churn & retention rate

  // churn & retention rate -> statistics
  const statisticsYearlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      yearlyChartsOtherMetrics.barChartsObj
    );

  // churn & retention rate -> charts -> headings & navlinks
  const {
    barChartHeading,
    expandBarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  } = returnChartTitleNavigateLinks({
    calendarView: 'Yearly',
    metricCategory: 'Churn and Retention Rates',
    metricsView: 'Customers',
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    year,
  });

  // churn & retention rate -> charts -> pie -> expand chart button
  const [createdExpandPieChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${pieChartHeading}`,
      semanticName: 'Expand Churn And Retention Rate Pie Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData: yearlyChartsOtherMetrics.pieChartObj,
            chartTitle: pieChartHeading,
            chartKind: 'pie',
          },
        });

        navigate(expandPieChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

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

  // churn & retention rate -> charts -> bar -> expand chart button
  const [createdExpandBarChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${barChartHeading}`,
      semanticName: 'Expand Churn And Retention Rate Bar Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyChartsOtherMetrics.barChartsObj[
                otherMetricsBarChartYAxisVariable
              ],
            chartTitle: barChartHeading,
            chartKind: 'bar',
          },
        });

        navigate(expandBarChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // churn & retention rate -> charts -> bar -> y axis variables
  const [createdChurnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: otherMetricsBarChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> bar -> display
  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyChartsOtherMetrics.barChartsObj[otherMetricsBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> expand chart button
  const [createdExpandLineChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Churn And Retention Rate Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              yearlyChartsOtherMetrics.lineChartsObj[
                otherMetricsLineChartYAxisVariable
              ],
            chartTitle: lineChartHeading,
            chartKind: 'line',
          },
        });

        navigate(expandLineChartNavigateLink);
      },
      leftIcon: <LuExpand />,
    },
  ]);

  // churn & retention rate -> charts -> line -> y axis variables
  const [createdChurnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyOtherMetricsDispatch({
            type: customerDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: otherMetricsLineChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> line -> display
  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyChartsOtherMetrics.lineChartsObj[
          otherMetricsLineChartYAxisVariable
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
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdChurnRetentionBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandBarChartButton={createdExpandBarChartButton}
      expandLineChartButton={createdExpandLineChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayChurnRetentionLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdChurnRetentionLineChartYAxisVariablesSelectInput
      }
      overviewCards={[...yearlyCardsOtherMetrics]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${splitCamelCase(
        storeLocation
      )} Churn and Retention Rates`}
      statisticsMap={statisticsYearlyChurnRetention}
      width={width}
    />
  );

  return displayChurnRetentionSection;
}

export default CustomerDashboardYearlyOtherMetrics;
