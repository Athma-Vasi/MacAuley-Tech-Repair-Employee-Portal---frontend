import { Box, MantineSize, MantineTransition, RangeSlider, Slider } from "@mantine/core";
import { ReactNode, useState } from "react";

import { useGlobalState } from "../../hooks";
import { SliderInputData } from "../../types";
import { returnSliderMarks } from "../../utils";
import { createAccessibleSliderScreenreaderTextElements } from "./utils";

type AccessibleSliderInputAttributes<ValidValueAction extends string = string> = {
  color?: string;
  disabled?: boolean;
  kind?: "slider" | "range-slider";
  label: ReactNode | ((value: number) => ReactNode);
  labelTransition?: MantineTransition;
  labelTransitionDuration?: number;
  labelTransitionTimingFunction?: string;
  marks?: SliderInputData;
  max: number;
  min: number;
  name: string;
  onBlur?: () => void;
  /** use with range-slider */
  onChangeRangeSlider?: (value: [number, number]) => void;
  /** use with slider */
  onChangeSlider?: (value: number) => void;
  onFocus?: () => void;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: number | [number, number];
  }>;
  precision?: number;
  rangeSliderDefaultValues?: [number, number];
  size?: MantineSize;
  sliderDefaultValue?: number;
  step?: number;
  thumbChildren?: ReactNode;
  /** use with range-slider */
  thumbFromLabel?: string;
  /** use with slider */
  thumbLabel?: string;
  thumbSize?: number;
  validValueAction: ValidValueAction;
  value: number;
};

type AccessibleSliderInputProps = {
  attributes: AccessibleSliderInputAttributes;
};

function AccessibleSliderInput({ attributes }: AccessibleSliderInputProps) {
  const {
    color,
    disabled = false,
    kind = "slider",
    label = null,
    labelTransition = "skew-down",
    labelTransitionDuration = 100,
    labelTransitionTimingFunction = "ease",
    marks,
    max,
    min,
    name,
    onBlur,
    onChangeRangeSlider,
    onChangeSlider,
    onFocus,
    parentDispatch,
    precision = 1,
    rangeSliderDefaultValues = [min, max],
    size = "sm",
    sliderDefaultValue = min,
    step,
    thumbChildren,
    thumbFromLabel,
    thumbLabel,
    thumbSize,
    validValueAction,
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const [valueBuffer, setValueBuffer] = useState<number>(value);
  const [rangeValueBuffer, setRangeValueBuffer] = useState<[number, number]>(
    rangeSliderDefaultValues
  );

  const sliderMarks = marks ? marks : disabled ? void 0 : returnSliderMarks({ max, min });

  const { screenreaderTextElement } = createAccessibleSliderScreenreaderTextElements({
    name,
    themeObject,
    value,
  });

  const accessibleSliderInput =
    kind === "slider" ? (
      <Slider
        aria-describedby={`${name}-selected`}
        aria-label={name}
        color={color}
        defaultValue={sliderDefaultValue}
        disabled={disabled}
        label={label}
        labelTransition={labelTransition}
        labelTransitionDuration={labelTransitionDuration}
        labelTransitionTimingFunction={labelTransitionTimingFunction}
        marks={sliderMarks}
        max={max}
        min={min}
        name={name}
        onBlur={() => {
          parentDispatch({
            action: validValueAction,
            payload: valueBuffer,
          });

          onBlur?.();
        }}
        onChange={(value: number) => {
          setValueBuffer(value);
          onChangeSlider?.(value);
        }}
        onFocus={onFocus}
        precision={precision}
        size={size}
        step={step}
        style={{ border: "none", outline: "none" }}
        thumbChildren={thumbChildren}
        thumbLabel={thumbLabel}
        thumbSize={thumbSize}
        value={valueBuffer}
      />
    ) : (
      <RangeSlider
        aria-describedby={`${name}-selected`}
        aria-label={name}
        color={color}
        defaultValue={rangeSliderDefaultValues}
        disabled={disabled}
        label={label}
        marks={marks}
        max={max}
        min={min}
        name={name}
        onBlur={() => {
          parentDispatch({
            action: validValueAction,
            payload: valueBuffer,
          });

          onBlur?.();
        }}
        onChange={(value: [number, number]) => {
          setRangeValueBuffer(value);
          onChangeRangeSlider?.(value);
        }}
        onFocus={onFocus}
        precision={precision}
        size={size}
        step={step}
        style={{ border: "none", outline: "none" }}
        thumbChildren={thumbChildren}
        thumbFromLabel={thumbFromLabel}
        thumbSize={thumbSize}
        value={rangeValueBuffer}
      />
    );

  return (
    <Box>
      {accessibleSliderInput}
      <Box style={{ display: "hidden" }}>{screenreaderTextElement}</Box>
    </Box>
  );
}

export { AccessibleSliderInput };
export type { AccessibleSliderInputAttributes };
