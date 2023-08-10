import { RangeSlider, Slider } from '@mantine/core';
import { ReactNode } from 'react';

import { SliderInputData } from '../../types';

type AccessibleSliderInputCreatorInfo = {
  ariaLabel: string;
  ariaDescribedBy?: string;
  thumbLabel?: string; // slider
  thumbFromLabel?: string; // range slider
  color?: string;
  kind?: 'slider' | 'range-slider';
  label?: React.ReactNode | ((value: number) => React.ReactNode);
  min: number;
  max: number;
  marks?: SliderInputData;
  onChangeSlider?: (value: number) => void;
  onChangeRangeSlider?: (value: [number, number]) => void;
  precision?: number;
  rangeSliderDefaultValues?: [number, number];
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sliderDefaultValue?: number;
  step: number;
  thumbChildren?: ReactNode;
  thumbSize?: number;
  value: number;
  width?: number | string;
};

type SliderWrapperProps = {
  creatorInfoObject: AccessibleSliderInputCreatorInfo;
};

function SliderWrapper({ creatorInfoObject }: SliderWrapperProps) {
  const {
    ariaLabel,
    ariaDescribedBy,
    thumbLabel,
    thumbFromLabel,
    color,
    label = null,
    kind = 'slider',
    min,
    max,
    marks,
    onChangeSlider = () => {},
    onChangeRangeSlider = () => {},
    precision = 1,
    rangeSliderDefaultValues = [min, max],
    size = 'xs',
    sliderDefaultValue = min,
    step,
    thumbChildren,
    thumbSize,
    value,
    width = '100%',
  } = creatorInfoObject;

  return kind === 'slider' ? (
    <Slider
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      thumbLabel={thumbLabel}
      color={color}
      label={label}
      max={max}
      min={min}
      marks={marks}
      onChange={onChangeSlider}
      precision={precision}
      size={size}
      defaultValue={sliderDefaultValue}
      step={step}
      thumbChildren={thumbChildren}
      thumbSize={thumbSize}
      value={value}
      w={width}
      style={{ border: 'none', outline: 'none' }}
    />
  ) : (
    <RangeSlider
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      thumbFromLabel={thumbFromLabel}
      color={color}
      label={label}
      max={max}
      min={min}
      marks={marks}
      onChange={onChangeRangeSlider}
      precision={precision}
      size={size}
      step={step}
      thumbChildren={thumbChildren}
      thumbSize={thumbSize}
      defaultValue={rangeSliderDefaultValues}
      value={rangeSliderDefaultValues}
      w={width}
      style={{ border: 'none', outline: 'none' }}
    />
  );
}

export { SliderWrapper };
export type { AccessibleSliderInputCreatorInfo };
