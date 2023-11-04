import { MantineNumberSize } from '@mantine/core';
import { Year } from '../../types';
import { FinancialMetricBarObj } from '../utils';

function FinancialDashboardDailyProfit({
  barChartsObj,
  chartHeight,
  chartWidth,
  day,
  month,
  padding,
  year,
}: {
  chartHeight: number;
  chartWidth: number;
  barChartsObj: FinancialMetricBarObj;
  day: string;
  month: string;
  padding: MantineNumberSize;
  year: Year;
}) {
  return <></>;
}

export default FinancialDashboardDailyProfit;
