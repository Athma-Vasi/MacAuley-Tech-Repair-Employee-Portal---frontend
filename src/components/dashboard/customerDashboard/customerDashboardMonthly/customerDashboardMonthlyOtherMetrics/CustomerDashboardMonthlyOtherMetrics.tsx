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
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../../charts';
import { MONTHS } from '../../../constants';
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
  const { globalDispatch } = useGlobalState();
  const navigate = useNavigate();

  const [
    customerDashboardMonthlyOtherMetricsState,
    customerDashboardMonthlyOtherMetricsDispatch,
  ] = useReducer(
    customerDashboardMonthlyOtherMetricsReducer,
    initialCustomerDashboardMonthlyOtherMetricsState
  );

  const {
    otherMetricsBarChartYAxisVariable,
    otherMetricsLineChartYAxisVariable,
  } = customerDashboardMonthlyOtherMetricsState;

  // churn & retention rate

  // churn & retention rate -> statistics
  const statisticsMonthlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      monthlyChartsOtherMetrics.barChartsObj
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
    calendarView: 'Monthly',
    metricCategory: '',
    metricsView: 'Customers',
    storeLocation,
    yAxisBarChartVariable: otherMetricsBarChartYAxisVariable,
    yAxisLineChartVariable: otherMetricsLineChartYAxisVariable,
    yAxisPieChartVariable: 'Churn and Retention Rates',
    year,
    month,
    months: MONTHS,
  });

  // churn & retention rate -> charts -> pie

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
            chartData: monthlyChartsOtherMetrics.pieChartObj,
            chartTitle: pieChartHeading,
            chartKind: 'pie',
            chartUnitKind: 'percent',
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
      pieChartData={monthlyChartsOtherMetrics.pieChartObj}
      hideControls
      unitKind="percent"
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
              monthlyChartsOtherMetrics.barChartsObj[
                otherMetricsBarChartYAxisVariable
              ],
            chartTitle: barChartHeading,
            chartKind: 'bar',
            chartUnitKind: 'percent',
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
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable,
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
        monthlyChartsOtherMetrics.barChartsObj[
          otherMetricsBarChartYAxisVariable
        ]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
      unitKind="percent"
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> expand chart button
  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: `Expand and customize ${lineChartHeading}`,
      semanticName: 'Expand Churn And Retention Rate Line Chart',
      buttonOnClick: () => {
        globalDispatch({
          type: globalAction.setCustomizeChartsPageData,
          payload: {
            chartData:
              monthlyChartsOtherMetrics.lineChartsObj[
                otherMetricsLineChartYAxisVariable
              ],
            chartTitle: lineChartHeading,
            chartKind: 'line',
            chartUnitKind: 'percent',
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
          customerDashboardMonthlyOtherMetricsDispatch({
            type: customerDashboardMonthlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable,
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
        monthlyChartsOtherMetrics.lineChartsObj[
          otherMetricsLineChartYAxisVariable
        ]
      }
      hideControls
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
      expandLineChartButton={createdExpandChartButton}
      expandPieChartButton={createdExpandPieChartButton}
      lineChart={displayChurnRetentionLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdChurnRetentionLineChartYAxisVariablesSelectInput
      }
      overviewCards={[...monthlyCardsOtherMetrics]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading={`${storeLocation} Monthly Churn and Retention Rates`}
      statisticsMap={statisticsMonthlyChurnRetention}
      width={width}
    />
  );

  return displayChurnRetentionSection;
}

export default CustomerDashboardMonthlyOtherMetrics;
