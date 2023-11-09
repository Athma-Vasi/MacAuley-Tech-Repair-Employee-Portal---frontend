import { SelectInputData } from '../../../types';

/** from Open Colors
 * @see https://yeun.github.io/open-color/
 */
const NIVO_CALENDAR_CHART_COLORS = ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'];

const NIVO_CALENDAR_DIRECTION_DATA: SelectInputData = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
];

const NIVO_CALENDAR_ALIGN_DATA: SelectInputData = [
  { label: 'Top', value: 'top' },
  { label: 'Top-Right', value: 'top-right' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom-Right', value: 'bottom-right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom-Left', value: 'bottom-left' },
  { label: 'Left', value: 'left' },
  { label: 'Top-Left', value: 'top-left' },
  { label: 'Center', value: 'center' },
];

const NIVO_CALENDAR_LEGEND_POSITION_DATA: SelectInputData = [
  { label: 'Before', value: 'before' },
  { label: 'After', value: 'after' },
];

export {
  NIVO_CALENDAR_ALIGN_DATA,
  NIVO_CALENDAR_CHART_COLORS,
  NIVO_CALENDAR_DIRECTION_DATA,
  NIVO_CALENDAR_LEGEND_POSITION_DATA,
};
