import { SelectInputData } from '../../../types';

const BAR_CHART_GROUP_MODE_SELECT_DATA: SelectInputData = [
  { value: 'stacked', label: 'Stacked' },
  { value: 'grouped', label: 'Grouped' },
];

const BAR_CHART_LAYOUT_SELECT_DATA: SelectInputData = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
];

const BAR_CHART_VALUE_SCALE_SELECT_DATA: SelectInputData = [
  { value: 'linear', label: 'Linear' },
  { value: 'symlog', label: 'Symlog' },
];

const BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA: SelectInputData = [
  { value: 'start', label: 'Start' },
  { value: 'middle', label: 'Middle' },
  { value: 'end', label: 'End' },
];

export {
  BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
  BAR_CHART_GROUP_MODE_SELECT_DATA,
  BAR_CHART_LAYOUT_SELECT_DATA,
  BAR_CHART_VALUE_SCALE_SELECT_DATA,
};
