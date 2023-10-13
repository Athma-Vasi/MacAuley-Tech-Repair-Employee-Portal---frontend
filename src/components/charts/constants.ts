import { SelectInputData } from '../../types';

const NIVO_LEGEND_ANCHOR_DATA: SelectInputData = [
  { value: 'top', label: 'Top' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'right', label: 'Right' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'left', label: 'Left' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'center', label: 'Center' },
];

const NIVO_LEGEND_DIRECTION_DATA: SelectInputData = [
  { value: 'row', label: 'Row' },
  { value: 'column', label: 'Column' },
];

const NIVO_LEGEND_ITEM_DIRECTION_DATA: SelectInputData = [
  { value: 'left-to-right', label: 'Left to Right' },
  { value: 'right-to-left', label: 'Right to Left' },
  { value: 'top-to-bottom', label: 'Top to Bottom' },
  { value: 'bottom-to-top', label: 'Bottom to Top' },
];

const NIVO_LEGEND_SYMBOL_SHAPE_DATA: SelectInputData = [
  { value: 'circle', label: 'Circle' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'square', label: 'Square' },
  { value: 'triangle', label: 'Triangle' },
];

const NIVO_MOTION_CONFIG_DATA: SelectInputData = [
  { label: 'Default', value: 'default' },
  { label: 'Gentle', value: 'gentle' },
  { label: 'Wobbly', value: 'wobbly' },
  { label: 'Stiff', value: 'stiff' },
  { label: 'Slow', value: 'slow' },
  { label: 'Molasses', value: 'molasses' },
];

const NIVO_COLOR_SCHEME_DATA: SelectInputData = [
  { label: 'Nivo', value: 'nivo' },
  { label: 'Category 10', value: 'category10' },
  { label: 'Accent', value: 'accent' },
  { label: 'Dark 2', value: 'dark2' },
  { label: 'Paired', value: 'paired' },
  { label: 'Pastel 1', value: 'pastel1' },
  { label: 'Pastel 2', value: 'pastel2' },
  { label: 'Set 1', value: 'set1' },
  { label: 'Set 2', value: 'set2' },
  { label: 'Set 3', value: 'set3' },
  { label: 'Brown Blue Green', value: 'brown_blueGreen' },
  { label: 'Purple Red Green', value: 'purpleRed_green' },
  { label: 'Pink Yellow Green', value: 'pink_yellowGreen' },
  { label: 'Purple Orange', value: 'purple_orange' },
  { label: 'Red Blue', value: 'red_blue' },
  { label: 'Red Grey', value: 'red_grey' },
  { label: 'Red Yellow Blue', value: 'red_yellow_blue' },
  { label: 'Red Yellow Green', value: 'red_yellow_green' },
  { label: 'Spectral', value: 'spectral' },
  { label: 'Blues', value: 'blues' },
  { label: 'Greens', value: 'greens' },
  { label: 'Greys', value: 'greys' },
  { label: 'Oranges', value: 'oranges' },
  { label: 'Purples', value: 'purples' },
  { label: 'Reds', value: 'reds' },
  { label: 'Blue Green', value: 'blue_green' },
  { label: 'Blue Purple', value: 'blue_purple' },
  { label: 'Green Blue', value: 'green_blue' },
  { label: 'Orange Red', value: 'orange_red' },
  { label: 'Purple Blue Green', value: 'purple_blue_green' },
  { label: 'Purple Blue', value: 'purple_blue' },
  { label: 'Purple Red', value: 'purple_red' },
  { label: 'Red Purple', value: 'red_purple' },
  { label: 'Yellow Green Blue', value: 'yellow_green_blue' },
  { label: 'Yellow Green', value: 'yellow_green' },
  { label: 'Yellow Orange Brown', value: 'yellow_orange_brown' },
  { label: 'Yellow Orange Red', value: 'yellow_orange_red' },
];

const NIVO_TRANSITION_MODE_DATA: SelectInputData = [
  { label: 'Start Angle', value: 'startAngle' },
  { label: 'Middle Angle', value: 'middleAngle' },
  { label: 'End Angle', value: 'endAngle' },
  { label: 'Inner Radius', value: 'innerRadius' },
  { label: 'Center Radius', value: 'centerRadius' },
  { label: 'Outer Radius', value: 'outerRadius' },
  { label: 'Push In', value: 'pushIn' },
  { label: 'Push Out', value: 'pushOut' },
];

const NIVO_CHART_PATTERN_DEFS = [
  {
    id: 'dots',
    type: 'patternDots',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: 'lines',
    type: 'patternLines',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    rotation: -45,
    lineWidth: 6,
    spacing: 10,
  },
];

export {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
};
