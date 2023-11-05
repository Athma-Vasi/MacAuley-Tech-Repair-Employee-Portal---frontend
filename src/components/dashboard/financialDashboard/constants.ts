import { SelectInputData } from '../../../types';

const FINANCIAL_LINE_BAR_Y_AXIS_DATA: SelectInputData = [
  { label: 'Total', value: 'total' },
  { label: 'All', value: 'all' },
  { label: 'Overview', value: 'overview' },
  { label: 'Repair', value: 'repair' },
  { label: 'Sales', value: 'sales' },
  { label: 'In-Store', value: 'inStore' },
  { label: 'Online', value: 'online' },
];

const FINANCIAL_CALENDAR_Y_AXIS_DATA: SelectInputData = [
  { label: 'Total', value: 'total' },
  { label: 'Repair', value: 'repair' },
  { label: 'Sales', value: 'sales' },
  { label: 'In-Store', value: 'inStore' },
  { label: 'Online', value: 'online' },
];

const FINANCIAL_PIE_Y_AXIS_DATA: SelectInputData = [
  { label: 'Overview', value: 'overview' },
  { label: 'All', value: 'all' },
  { label: 'Sales', value: 'sales' },
];

const FINANCIAL_OTHER_METRICS_Y_AXIS_DATA: SelectInputData = [
  { label: 'Net Profit Margin', value: 'netProfitMargin' },
  { label: 'Average Order Value', value: 'averageOrderValue' },
  { label: 'Conversion Rate', value: 'conversionRate' },
];

const FINANCIALS_VIEW_SEGMENTED_CONTROL_DATA = [
  'Profit',
  'Revenue',
  'Expenses',
  'Transactions',
  'Units Sold',
  'Other Metrics',
];

export {
  FINANCIAL_CALENDAR_Y_AXIS_DATA,
  FINANCIAL_LINE_BAR_Y_AXIS_DATA,
  FINANCIAL_OTHER_METRICS_Y_AXIS_DATA,
  FINANCIAL_PIE_Y_AXIS_DATA,
  FINANCIALS_VIEW_SEGMENTED_CONTROL_DATA,
};
