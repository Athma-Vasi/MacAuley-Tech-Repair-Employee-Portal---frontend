import { MantineSize, RangeSlider, Slider } from '@mantine/core';
import { ReactNode } from 'react';

import { SliderInputData } from '../../types';

type AccessibleSliderInputCreatorInfo = {
  ariaDescribedBy?: string;
  ariaLabel: string;
  color?: string;
  disabled?: boolean;
  kind?: 'slider' | 'range-slider';
  label?: ReactNode | ((value: number) => ReactNode);
  marks?: SliderInputData;
  max: number;
  min: number;
  onChangeRangeSlider?: (value: [number, number]) => void;
  onChangeSlider?: (value: number) => void;
  precision?: number;
  rangeSliderDefaultValues?: [number, number];
  size?: MantineSize;
  sliderDefaultValue?: number;
  step: number;
  thumbChildren?: ReactNode;
  thumbFromLabel?: string; // range slider
  thumbLabel?: string; // slider
  thumbSize?: number;
  value: number;
  width?: number | string;
};

type SliderWrapperProps = {
  creatorInfoObject: AccessibleSliderInputCreatorInfo;
};

function SliderWrapper({ creatorInfoObject }: SliderWrapperProps) {
  const {
    ariaDescribedBy,
    ariaLabel,
    color,
    disabled = false,
    kind = 'slider',
    label = null,
    marks,
    max,
    min,
    onChangeRangeSlider = () => {},
    onChangeSlider = () => {},
    precision = 1,
    rangeSliderDefaultValues = [min, max],
    size = 'sm',
    sliderDefaultValue = min,
    step,
    thumbChildren,
    thumbFromLabel,
    thumbLabel,
    thumbSize,
    value,
    width = '100%',
  } = creatorInfoObject;

  return kind === 'slider' ? (
    <Slider
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      color={color}
      defaultValue={sliderDefaultValue}
      disabled={disabled}
      label={label}
      marks={marks}
      max={max}
      min={min}
      onChange={onChangeSlider}
      precision={precision}
      size={size}
      step={step}
      style={{ border: 'none', outline: 'none' }}
      thumbChildren={thumbChildren}
      thumbLabel={thumbLabel}
      thumbSize={thumbSize}
      value={value}
      w={width}
    />
  ) : (
    <RangeSlider
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      color={color}
      defaultValue={rangeSliderDefaultValues}
      disabled={disabled}
      label={label}
      marks={marks}
      max={max}
      min={min}
      onChange={onChangeRangeSlider}
      precision={precision}
      size={size}
      step={step}
      style={{ border: 'none', outline: 'none' }}
      thumbChildren={thumbChildren}
      thumbFromLabel={thumbFromLabel}
      thumbSize={thumbSize}
      value={rangeSliderDefaultValues}
      w={width}
    />
  );
}

export { SliderWrapper };
export type { AccessibleSliderInputCreatorInfo };
