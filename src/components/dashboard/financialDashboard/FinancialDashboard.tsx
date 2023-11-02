import { Text } from '@mantine/core';

import { BusinessMetric } from '../types';
import { useEffect } from 'react';
import {
  returnFinancialChartsData,
  returnSelectedDateFinancialMetrics,
} from './utils';
import { MONTHS } from '../constants';

function FinancialDashboard({
  businessMetrics,
}: {
  businessMetrics: BusinessMetric[];
}) {
  // useEffect(() => {
  //   const selectedFinancialMetrics = returnSelectedDateFinancialMetrics({
  //     businessMetrics,
  //     day: '01',
  //     month: 'January',
  //     months: MONTHS,
  //     storeLocation: 'All Locations',
  //     year: '2021',
  //   });
  //   console.log('selectedFinancialMetrics', selectedFinancialMetrics);
  //   const financialChartsData = returnFinancialChartsData({
  //     businessMetrics,
  //     months: MONTHS,
  //     selectedFinancialMetrics,
  //     storeLocation: 'All Locations',
  //   });
  //   console.log('financialChartsData', financialChartsData);
  // }, []);

  return <Text>Financial Dashboard</Text>;
}

export default FinancialDashboard;
