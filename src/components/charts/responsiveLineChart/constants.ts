import { SelectInputData } from '../../../types';

const NIVO_LINE_AXES_SCALE: SelectInputData = [
  { label: 'linear', value: 'linear' },
  { label: 'point', value: 'point' },
];

const NIVO_LINE_CURVE_DATA: SelectInputData = [
  { label: 'basis', value: 'basis' },
  { label: 'cardinal', value: 'cardinal' },
  { label: 'catmullRom', value: 'catmullRom' },
  { label: 'linear', value: 'linear' },
  { label: 'monotoneX', value: 'monotoneX' },
  { label: 'monotoneY', value: 'monotoneY' },
  { label: 'natural', value: 'natural' },
  { label: 'step', value: 'step' },
  { label: 'stepAfter', value: 'stepAfter' },
  { label: 'stepBefore', value: 'stepBefore' },
];

const NIVO_LINE_AREA_BLEND_MODE_DATA: SelectInputData = [
  { label: 'normal', value: 'normal' },
  { label: 'multiply', value: 'multiply' },
  { label: 'screen', value: 'screen' },
  { label: 'overlay', value: 'overlay' },
  { label: 'darken', value: 'darken' },
  { label: 'lighten', value: 'lighten' },
  { label: 'color-dodge', value: 'color-dodge' },
  { label: 'color-burn', value: 'color-burn' },
  { label: 'hard-light', value: 'hard-light' },
  { label: 'soft-light', value: 'soft-light' },
  { label: 'difference', value: 'difference' },
  { label: 'exclusion', value: 'exclusion' },
  { label: 'hue', value: 'hue' },
  { label: 'saturation', value: 'saturation' },
  { label: 'color', value: 'color' },
  { label: 'luminosity', value: 'luminosity' },
];

const NIVO_LINE_POINT_LABEL_DATA: SelectInputData = [
  { label: 'X', value: 'x' },
  { label: 'Y', value: 'y' },
];

const NIVO_LINE_CROSSHAIR_TYPE_DATA: SelectInputData = [
  { label: 'x', value: 'x' },
  { label: 'y', value: 'y' },
  { label: 'top-left', value: 'top-left' },
  { label: 'top', value: 'top' },
  { label: 'top-right', value: 'top-right' },
  { label: 'right', value: 'right' },
  { label: 'bottom-right', value: 'bottom-right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'bottom-left', value: 'bottom-left' },
  { label: 'left', value: 'left' },
  { label: 'cross', value: 'cross' },
];

export {
  NIVO_LINE_AREA_BLEND_MODE_DATA,
  NIVO_LINE_AXES_SCALE,
  NIVO_LINE_CROSSHAIR_TYPE_DATA,
  NIVO_LINE_CURVE_DATA,
  NIVO_LINE_POINT_LABEL_DATA,
};
